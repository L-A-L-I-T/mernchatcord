const express = require("express");

const passport = require("passport");

const CLIENT_URL = "http://localhost:3000/chat";

const router = express.Router();
const Conversation = require("../models/ConversationModel");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

//@description     Get or Search all users
//@route           GET /api/user?search=
//@access          Public
// router.get("/?search=", async (req, res) => {
// 	console.log("req body", req.body);
// 	const keyword = req.body.username
// 		? {
// 				$or: [{ username: { $regex: req.body.username, $options: "i" } }],
// 		  }
// 		: {};

// 	const users = await User.find(keyword).find({
// 		_id: { $ne: req.body.userId },
// 	});
// 	res.send(users);
// });
router.get("/", async (req, res) => {
	const userId = req.query.userId;
	console.log(userId);
	try {
		const user = await User.findById(userId);
		const { password, updatedAt, ...other } = user._doc;
		res.status(200).json(other);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get("/login/success", (req, res) => {
	if (req.user) {
		res.status(200).json({
			success: true,
			message: "successfull",
			user: req.user,
			//   cookies: req.cookies
		});
	}
});
router.get(
	"/google",
	passport.authenticate("google", { scope: ["profile"] })
	// (req, res) => {
	// 	res.json({ user });
	// }
);
router.get(
	"/google/callback",
	passport.authenticate("google", {
		successRedirect: CLIENT_URL,
		failureRedirect: "http://localhost:3000",
		passReqToCallback: true,
	})
	// (req, res) => {
	// 	res.json({ user });
	// }
);

//Add a friend

router.put("/:id/addFriend", async (req, res) => {
	console.log("Adding Friend ", req.params.id);
	console.log("req ", JSON.stringify(req.body));
	try {
		const user = await User.findById(req.params.id);
		const friend = await User.findOne({ username: req.body?.username });
		if (friend) {
			if (friend._id !== req.params.id) {
				if (!user.friends.includes(friend._id)) {
					await user.updateOne({ $push: { friends: friend._id.toString() } });
					await friend.updateOne({ $push: { friends: user._id.toString() } });
					const newConversation = new Conversation({
						members: [friend._id.toString(), user._id.toString()],
					});

					try {
						const savedConversation = await newConversation.save();
						console.log("user has been added to friends");
						res.status(200).json("user has been added to friends");
					} catch (err) {
						res.status(500).json(err);
					}
				} else {
					console.log("you are already friends");
					res.status(403).json("you are already friends");
				}
			} else {
				console.log("you cant add yourself");
				res.status(403).json("you cant add yourself");
			}
		} else {
			console.log("User dosen't exists!!");
			res.status(403).json("User dosen't exists!!");
		}
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

module.exports = router;
