const express = require('express');
const cors = require('cors');
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo").default;
const http = require("http");
const { Server } = require("socket.io");
require('dotenv').config();

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

  ],
  msg: [
    {
      from: { type: String },
      message: { type: String }
    }
  ]

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
        userid: sessionuser.userid,
        email: sessionuser.email,
        chatto: ""
      };

      return res.json({
        "auth": false,
        "shm": true
      })
    }
  } else {
    console.log('user not exist');
  }
})

app.post('/finduser', async (req, res) => {
  const userid = req.body.userid;
  console.log(req.session.user, "s");

  if (req.session.user) {
    console.log(req.session.user, "s");
    const userexist = await User.findOne({ userid: userid }); //checking whether userid alredy exist
    const ssuserid = await User.findOne({ userid: req.session.user.userid });
    const checkalraedy = ssuserid.friend.some(function (a) {
      return a === userid
    })
    if (req.session.user.userid === userid) {
      console.log(req.session.user.userid, userid, "id's");
      return res.json({
        "auth": false,
        "shm": true,
        "isuser": true,
        "userprofilename": userexist.username,
        "add": false,
        "remove": false
      })
    }

    if (userexist) {
      // if(userid===)
      if (!checkalraedy) {
        return res.json({
          "auth": false,
          "shm": true,
          "isuser": true,
          // "userprofile":userexist.username,
          "userprofilename": userexist.username,
          "add": true,
          "remove": false
        })
      }
      else {
        return res.json({
          "auth": false,
          "shm": true,
          "isuser": true,
          // "userprofile":userexist.username,
          "userprofilename": userexist.username,
          "add": false,
          "remove": true
        })
      }

    } else {
      return res.json({
        isuser: false,
        add: false,
        remove: false
      });
    }
  } else {
    return res.json({
      isuser: false,
      add: false,
      remove: false,
    });
  }
})

app.get('/myfriends', async (req, res) => {
  if (!req.session.user) {
    return res.json({
      "auth": true,
      msg: "Please login first"
    });
  }
  const user = await User.findOne(
    { email: req.session.user.email }
  );
  return res.json({
    "auth": false,
    "shm": true,
    "friends": user.friend
  });
});



app.post('/addfriend', async (req, res) => {
  console.log("api reaching");
  const sessiondata = req.session.user
  if (req.session.user) {
    console.log("session is active", sessiondata);
    const userid = req.body.userid;
    const p1 = await User.findOne({ email: req.session.user.email });
    const userexist = await User.findOne({ userid: userid });
    if (userexist) {
      console.log(p1.friend, "p1");
      console.log(req.session.user.userid);
      const alreadyfriendp1 = userexist.friend.some(f => f === req.session.user.userid)
      console.log(alreadyfriendp1);
      await User.updateOne(
        { email: req.session.user.email },
        { $push: { friend: userid } }
      );
      // const exists = friend.some(friend => friend.userid === req.session.user.userid); 
      // if (!exists) {
      console.log(userexist.friend, "p2");
      if (!alreadyfriendp1) {
        await User.updateOne(
          { email: userexist.email },
          { $push: { friend: req.session.user.userid } }
        );
      } else {
        console.log("already a friend");

      }

      // }
      return res.json({
        "add": false,
        "remove": true
      })
    }
  }
});

app.post('/removefriend', async (req, res) => {
  console.log("api reaching");
  const sessiondata = req.session.user
  if (req.session.user) {
    console.log("session is active", sessiondata);
    const userid = req.body.userid;
    const userexist = await User.findOne({ userid: userid });
    if (userexist) {
      await User.updateOne(
        { email: req.session.user.email },
        { $pull: { friend: userid } }
      );
      return res.json({
        "add": true,
        "remove": false
      })
    }
  }
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

app.get('/userid', (req, res) => {
  if (req.session.user) {
    res.json({
      userid: req.session.user.userid
    })
  }
});

// msgdata
app.get('/msgdata', async (req, res) => {
  if (req.session.user) {
    const checkforuser = await User.findOne({ userid: req.session.user.userid });
    const messages = checkforuser.msg; 
    console.log("msgdata");
    return res.json({messages})
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