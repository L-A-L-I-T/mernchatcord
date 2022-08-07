require("dotenv").config();
var GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const User = require("../models/userModel");
var generator = require("generate-password");
const { uniqueUsernameGenerator } = require("unique-username-generator");
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const APPURL = "https://mern-chatcord.herokuapp.com";
// const APPURL = "http://localhost:8000";

passport.use(
	new GoogleStrategy(
		{
			clientID: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET,
			callbackURL: `${APPURL}/api/user/google/callback`,
			passReqToCallback: true,
		},
		async (req, accessToken, refreshToken, profile, cb) => {
			console.log(profile);
			const id = profile.id;
			User.findOne({ googleId: id }).exec((err, user) => {
				if (user) {
					console.log("User Existed");
					cb(null, user);
				} else {
					console.log("Hello new user");
					var password = generator.generate({
						length: 10,
						numbers: true,
						uppercase: true,
						lowercase: true,
					});
					var firstName = profile._json.given_name;
					var lastName = profile._json.family_name;
					const config = {
						dictionaries: [[firstName + lastName]],
						separator: "",
						randomDigits: 3,
						style: "lowercase",
					};
					let username = uniqueUsernameGenerator(config);
					let newUser = new User({
						googleId: profile.id,
						username: username,
						firstName: firstName,
						lastName: lastName,
						password: password,
						avatar: profile.photos[0].value,
						isAdmin: false,
					});
					console.log("New User" + newUser);
					newUser.save((err, data) => {
						if (err) {
							// res.status(400).json({
							// 	error: "Something went wrong",
							// });
							console.log(err);
						}
					});
					const user = {
						_id: newUser._id,
						googleId: profile.id,
						username: username,
						firstName: firstName,
						lastName: lastName,
						avatar: profile.photos[0].value,
					};
					cb(null, user);
				}
			});
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});
