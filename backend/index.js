const express = require('express');
const cors = require('cors');
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo").default;
const http = require("http");
const { Server } = require("socket.io");
const cloudinary = require("cloudinary").v2;
require('dotenv').config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage });

const FRONTEND_URL = process.env.NODE_ENV === "production"
  ? process.env.FRONTEND_URL_PROD
  : process.env.FRONTEND_URL;

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 5000;

const io = new Server(server, {
  cors: {
    origin: FRONTEND_URL,
    credentials: true
  }
});

app.use(cors({
  origin: FRONTEND_URL,
  credentials: true
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const path = require("path");
app.use(express.static(path.join(__dirname, "../CTF/dist")));

app.set("trust proxy", 1);

app.use(session({
  secret: "mySecretKey",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URL,
    ttl: 14 * 24 * 60 * 60 // 14 days
  }),
  cookie: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
  }
}));



const mongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
  } catch (e) {
    console.log(e);

  }
}

mongoDB();

const userSchma = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  userid: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  pass: {
    type: String,
    required: true
  },
  friend: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  profileImage: {
    type: String,
    default: ""
  }

})

const User = mongoose.model("User", userSchma);


app.post('/signup', async (req, res) => {
  const { username, userid, email, pass } = req.body;
  const user = new User(req.body);
  const checkuserexist = await User.findOne({ email: email }); //checking whether email alredy exist
  const checkuserexistforid = await User.findOne({ userid: userid }); //checking whether userid alredy exist

  if (checkuserexistforid) {
    return res.json({
      "iserrormsgforuserid": true,
      "errormsgforuserid": "userid already ocupied",
      "auth": true,
      "shm": false
    })
  }

  if (checkuserexist) {
    return res.json({
      "iserrormsgforemail": true,
      "errormsgforemail": "emailid already exist",
      "auth": true,
      "shm": false
    })
  }

  else {                               //uservalid hai account babane ke liyw

    await user.save();
    const sessionuser = await User.findOne({ email: email }); //checking whether email alredy exist
    req.session.user = {
      userid: sessionuser.userid,
      email: sessionuser.email,
      chatto: ""

    };
    return res.json({
      "auth": false,
      "shm": true
    })
  }
  // console.log(username, 'working');

})

app.post('/login', async (req, res) => {
  const { email, pass } = req.body;
  const checkuserexist = await User.findOne({ email: email }); //checking whether email alredy exist
  if (checkuserexist) {
    if (pass === checkuserexist.pass) {
      const sessionuser = await User.findOne({ email: email }); //checking whether email alredy exist
      req.session.user = {
        id: sessionuser._id,
        chatto: ""
      };
      // localStorage.setItem("isLoggedInCTF", `${sessionuser.userid}`);
      return res.json({
        "auth": false,
        "shm": true
      })
    }
  } else {
    console.log('user not exist');
  }
})






app.post("/uploadprofimg", upload.single("image"), async (req, res) => {
  try {
    if (req.session.user) {
      if (req.file) {
        const result = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "profile_images" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          stream.end(req.file.buffer);
        });
        await User.updateOne(
          { _id: req.session.user.id },
          { profileImage: result.secure_url }
        );
        res.json({ imageUrl: result.secure_url });
      }
    }
  } catch (err) {
    res.status(500).json({ error: "Upload failed" });
  }
});

app.get('/userdata', async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: "Not logged in" });
  }

  const userdata = await User.findOne({ _id: req.session.user.id });

  res.json({
    username: userdata.username,
    userid: userdata.userid,
    useremail: userdata.email,
    profileImage: userdata.profileImage   // 👈 IMPORTANT
  });
});

app.post('/changeusername', async (req, res) => {
  if (req.session.user) {
    await User.updateOne(
      { _id: req.session.user.id },
      { $set: { username: req.body.username } }
    );
  }
})

app.post('/changeuserid', async (req, res) => {
  if (req.session.user) {
    const userinfo = await User.findOne({ userid: req.body.userid })
    if (!userinfo && req.session.user.id.userid !== req.body.userid) {
      await User.updateOne(
        { _id: req.session.user.id },
        { $set: { userid: req.body.userid } }

      );
    }
    else if (userinfo && req.session.user.id.userid !== req.body.userid) {
      console.log('This id is already in use');

      return res.json({
        'usermsgid': 'This id is already in use'
      })
    }
  }
})

app.post('/changeuseremail', async (req, res) => {
  if (req.session.user) {

    const userinfo = await User.findOne({ email: req.body.useremail })
    const userinfoinsession = await User.findOne({ _id: req.session.user.id })

    if (!userinfo && userinfoinsession.email !== req.body.useremail) {
      await User.updateOne(
        { _id: req.session.user.id },
        { $set: { email: req.body.useremail } }
      );
    }
    else if (userinfo && req.session.user.id !== req.body.userid) {
      return res.json({
        'usermsgid': 'This email is already in use'
      })
    }
  }
})

app.get("/remainlogin", (req, res) => {
  if (req.session.user) {
    return res.json({
      auth: true,
      user: req.session.user
    });
  }
  console.log(req.session.user);

  return res.status(401).json({
    auth: false
  });
});

app.post('/finduser', async (req, res) => {
  const userid = req.body.userid;

  if (!req.session.user) {
    return res.json({ isuser: false, add: false, remove: false });
  }

  const userexist = await User.findOne({ userid: userid });
  const ssuserid = await User.findById(req.session.user.id);

  // Ensure friend array exists
  const friendsArray = ssuserid.friend || [];

  const checkalready = friendsArray.some(f => f.toString() === (userexist?._id.toString()));

  if (ssuserid.userid === userid) {
    return res.json({
      auth: false,
      shm: true,
      isuser: true,
      userprofilename: userexist.username,
      add: false,
      remove: false
    });
  }

  if (userexist) {
    if (!checkalready) {
      return res.json({
        auth: false,
        shm: true,
        isuser: true,
        userprofilename: userexist.username,
        add: true,
        remove: false
      });
    } else {
      return res.json({
        auth: false,
        shm: true,
        isuser: true,
        userprofilename: userexist.username,
        add: false,
        remove: true
      });
    }
  } else {
    return res.json({ isuser: false, add: false, remove: false });
  }
});

app.get('/myfriends', async (req, res) => {
  if (!req.session.user)
    return res.json({ auth: true, msg: "Please login first" });

  const user = await User.findById(req.session.user.id)
    .populate("friend", "username userid profileImage"); // populate only needed fields


  return res.json({
    auth: false,
    shm: true,
    friends: user.friend || []
  });
});


app.post('/addfriend', async (req, res) => {
  console.log("api reaching");

  if (!req.session.user) return res.status(401).json({ error: "Not logged in" });

  const userid = req.body.userid;
  const p1 = await User.findById(req.session.user.id);
  const userexist = await User.findOne({ userid: userid });

  if (!userexist) return res.status(404).json({ error: "User not found" });

  // Ensure friend arrays exist
  const p1Friends = p1.friend || [];
  const userexistFriends = userexist.friend || [];

  // Check if already friends
  const alreadyfriendp1 = userexistFriends.some(f => f.toString() === p1._id.toString());

  // Add friend to p1
  if (!p1Friends.some(f => f.toString() === userexist._id.toString())) {
    await User.updateOne({ _id: p1._id }, { $push: { friend: userexist._id } });
  }

  // Add p1 to userexist if not already there
  if (!alreadyfriendp1) {
    await User.updateOne({ _id: userexist._id }, { $push: { friend: p1._id } });
  }

  return res.json({ add: false, remove: true });
});

app.post('/removefriend', async (req, res) => {
  console.log("api reaching");

  if (!req.session.user) {
    return res.status(401).json({ error: "Not logged in" });
  }

  console.log("session is active", req.session.user);

  const userid = req.body.userid;
  const userexist = await User.findOne({ userid: userid });

  if (!userexist) {
    return res.status(404).json({ error: "User not found" });
  }

  // Remove userexist from current user's friends
  await User.updateOne(
    { _id: req.session.user.id },
    { $pull: { friend: userexist._id } }
  );

  // Optionally remove current user from userexist's friends
  const currentUser = await User.findById(req.session.user.id);
  if ((userexist.friend || []).some(f => f.toString() === currentUser._id.toString())) {
    await User.updateOne(
      { _id: userexist._id },
      { $pull: { friend: currentUser._id } }
    );
  }

  return res.json({
    add: true,
    remove: false
  });
});

app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    return res.json({
      auth: true, // user is now logged out
      shm: false
    });
  });
});

app.get('/userid', async (req, res) => {
  if (req.session.user) {
    const userid = await User.findOne({ _id: req.session.user.id });
    res.json({
      userid: userid.userid
    })
  }
});

// msgdata
app.get('/msgdata', async (req, res) => {
  if (req.session.user) {
    const userid = await User.findOne({ _id: req.session.user.id });
    const checkforuser = await User.findOne({ userid: userid.userid });
    const messages = checkforuser.msg;
    console.log("msgdata");
    return res.json({ messages })
  }
});

const onlineUsers = {};

io.on("connection", (socket) => {
  socket.on("registerUser", (userID) => {
    onlineUsers[userID] = socket.id;
    console.log("connection established");
  });

  socket.on("sendMessageToUser", async ({ chatto, fromUserID, message }) => {
    const targetSocket = onlineUsers[chatto];
    console.log("yes emitting", chatto, fromUserID, message);

    if (targetSocket) {
      // If the user is online, send real-time message
      io.to(targetSocket).emit("receiveMessage", { fromUserID, message });
    } else {
      // If the user is offline, save the message in DB
      const checkForUser = await User.findOne({ userid: chatto });
      if (checkForUser) {
        await User.updateOne(
          { userid: chatto },   // receiver
          { $push: { msg: { from: fromUserID, message } } } // use fromUserID from client
        );
      } else {
        console.log("Receiver not found in DB:", chatto);
      }
    }
  });

  socket.on("disconnect", () => {
    for (let userID in onlineUsers) {
      if (onlineUsers[userID] === socket.id) {
        delete onlineUsers[userID];
      }
    }
    console.log("User disconnected. Online users:", onlineUsers);
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../CTF/dist/index.html"));
});


server.listen(port, () => {
  console.log("Server running on port ");
});