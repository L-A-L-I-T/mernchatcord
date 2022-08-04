const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const conversationRoutes = require("./routes/conversations");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const path = require("path");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const passport = require("passport");
dotenv.config();
// passport config
require("./config/passport");
connectDB();
const app = express();
app.use(
	cookieSession({
		name: "session",
		keys: ["lalit"],
		maxAge: 24 * 60 * 60 * 1000,
	})
);

app.use(express.json()); // to accept json data

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(
	cors({
		origin: "http://localhost:3000",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/conversation", conversationRoutes);

// --------------------------deployment------------------------------

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname1, "/client/build")));

	app.get("*", (req, res) =>
		res.sendFile(path.resolve(__dirname1, "client", "build", "index.html"))
	);
} else {
	app.get("/", (req, res) => {
		res.send("API is running..");
	});
}

// --------------------------deployment------------------------------

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

const server = app.listen(
	PORT,
	console.log(`Server running on PORT ${PORT}...`.yellow.bold)
);

const io = require("socket.io")(server, {
	pingTimeout: 60000,
	cors: {
		origin: "http://localhost:3000",
		// credentials: true,
	},
});

//?-------------------Old Socket io code------------------------------

let users = [];

const addUser = (userId, socketId) => {
	!users.some((user) => user.userId === userId) &&
		users.push({ userId, socketId });
};

const removeUser = (socketId) => {
	users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
	return users.find((user) => user.userId == userId);
};

io.on("connection", (socket) => {
	console.log("A user connected..", socket.id);

	io.emit("welcome", "Hello this is socket server");

	socket.on("addUser", (userId) => {
		if (userId) {
			addUser(userId, socket.id);
			io.emit("getUsers", users);
		}
		console.log("users ", users);
	});

	socket.on("sendMessage", ({ senderId, receiverId, text }) => {
		const user = getUser(receiverId);
		io.to(user?.socketId).emit("getMessage", {
			senderId,
			text,
		});
		console.log("sendMessage ", user);
	});

	socket.on("disconnect", () => {
		console.log("A user disconnected");
		removeUser(socket.id);
		io.emit("getUsers", users);
	});
});

//?-------------------------------------------------------------------

// io.on("connection", (socket) => {
// 	console.log("Connected to socket.io");
// 	socket.on("setup", (userData) => {
// 		socket.join(userData._id);
// 		socket.emit("connected");
// 	});

// 	socket.on("join chat", (room) => {
// 		socket.join(room);
// 		console.log("User Joined Room: " + room);
// 	});
// 	socket.on("typing", (room) => socket.in(room).emit("typing"));
// 	socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

// 	socket.on("new message", (newMessageRecieved) => {
// 		var chat = newMessageRecieved.chat;

// 		if (!chat.users) return console.log("chat.users not defined");

// 		chat.users.forEach((user) => {
// 			if (user._id == newMessageRecieved.sender._id) return;

// 			socket.in(user._id).emit("message recieved", newMessageRecieved);
// 		});
// 	});

// 	socket.off("setup", () => {
// 		console.log("USER DISCONNECTED");
// 		socket.leave(userData._id);
// 	});
// });
