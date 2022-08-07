import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import { Navigate } from "react-router-dom";
import axios from "axios";
// material-ui
import { styled, useTheme } from "@mui/material/styles";
import {
	AppBar,
	Box,
	CssBaseline,
	Toolbar,
	useMediaQuery,
} from "@mui/material";

// project imports

import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import CurrentChat from "../../components/CurrentChat/CurrentChat";
const drawerWidth = 260;

// styles
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
	({ theme, open }) => ({
		...theme.typography.mainContent,
		...(!open && {
			borderBottomLeftRadius: 0,
			borderBottomRightRadius: 0,
			transition: theme.transitions.create("margin", {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			[theme.breakpoints.up("md")]: {
				marginLeft: -(drawerWidth - 20),
				width: `calc(100% - ${drawerWidth}px)`,
			},
			[theme.breakpoints.down("md")]: {
				marginLeft: "20px",
				width: `calc(100% - ${drawerWidth}px)`,
				padding: "16px",
			},
			[theme.breakpoints.down("sm")]: {
				marginLeft: "10px",
				width: `calc(100% - ${drawerWidth}px)`,
				padding: "16px",
				marginRight: "10px",
			},
		}),
		...(open && {
			transition: theme.transitions.create("margin", {
				easing: theme.transitions.easing.easeOut,
				duration: theme.transitions.duration.enteringScreen,
			}),
			marginLeft: 0,
			borderBottomLeftRadius: 0,
			borderBottomRightRadius: 0,
			width: `calc(100% - ${drawerWidth}px)`,
			[theme.breakpoints.down("md")]: {
				marginLeft: "20px",
			},
			[theme.breakpoints.down("sm")]: {
				marginLeft: "10px",
			},
		}),
	})
);

// ==============================|| MAIN LAYOUT ||============================== //

const Chat = () => {
	const theme = useTheme();
	const [user, setUser] = useState();
	const [conversations, setConversations] = useState([]);
	const [currentChat, setCurrentChat] = useState(null);
	const [friend, setFriend] = useState(null);
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState("");
	const [arrivalMessage, setArrivalMessage] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const [loading, setLoading] = useState(false);
	const [refresh, setRefresh] = useState(false);
	const scrollRef = useRef();
	const socket = useRef();

	const ENDPOINT = "https://mern-chatcord.herokuapp.com";
	// const ENDPOINT = "http://localhost:8000";
	useEffect(() => {
		const getUser = () => {
			console.log("hello");
			fetch(`${ENDPOINT}/api/user/login/success`, {
				method: "GET",
				credentials: "include",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					"Access-Control-Allow-Credentials": true,
				},
			})
				.then((response) => {
					if (response.status === 200) return response.json();
					else {
						console.log("error");
						Navigate("/");
						throw new Error("authentication has been failed!");
					}
				})
				.then((resObject) => {
					if (!resObject.user) Navigate("/");
					console.log(resObject.user);
					setUser(resObject.user);
				})
				.catch((err) => {
					Navigate("/");
					console.log("hi");
					console.error(err);
				});
		};
		getUser();
		getConversations();
	}, []);

	useEffect(() => {
		socket.current = io(`${ENDPOINT}`);
		socket.current.on("getMessage", (data) => {
			setArrivalMessage({
				sender: data.senderId,
				text: data.text,
				createdAt: Date.now(),
			});
		});
	}, []);

	useEffect(() => {
		socket.current.emit("addUser", user?._id);
		socket.current.on("getUsers", (users) => {
			let newUsers = [];
			users.forEach((user) => {
				newUsers.push(user.userId);
			});
			setOnlineUsers(newUsers);
		});
	}, [user]);

	const handleSendMessage = async (e) => {
		// e.preventDefault();
		console.log(newMessage);
		const message = {
			senderId: user?._id,
			text: newMessage,
			conversationId: currentChat._id,
		};
		setNewMessage("");

		socket.current.emit("sendMessage", {
			senderId: user._id,
			receiverId: friend._id,
			text: newMessage,
		});

		try {
			const res = await axios.post(`${ENDPOINT}/api/message`, message);
			setMessages([...messages, res.data]);
		} catch (err) {
			console.log(err);
		}
	};
	const getConversations = async () => {
		try {
			const res = await axios.get(`${ENDPOINT}/api/conversation/` + user?._id);
			console.log(res.data);
			setConversations(res.data);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getConversations();
	}, [user, user?._id, refresh]);

	useEffect(() => {
		const getMessages = async () => {
			try {
				const res = await axios.get(
					`${ENDPOINT}/api/message/` + currentChat?._id
				);
				setMessages(res.data);
			} catch (err) {
				console.log(err);
			}
		};
		getMessages();
	}, [currentChat]);

	useEffect(() => {
		console.log("New Message");
		arrivalMessage &&
			currentChat?.members.includes(arrivalMessage.sender) &&
			setMessages((prev) => [...prev, arrivalMessage]);
	}, [arrivalMessage, currentChat]);

	useEffect(() => {
		scrollRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	const matchDownMd = useMediaQuery(theme.breakpoints.down("lg"));
	const [leftDrawerOpened, setLeftDrawerOpened] = useState(false);
	// Handle left drawer
	const handleLeftDrawerToggle = () => {
		setLeftDrawerOpened(!leftDrawerOpened);
	};

	useEffect(() => {
		setLeftDrawerOpened(!matchDownMd);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [matchDownMd]);

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			{/* header */}
			<AppBar
				enableColorOnDark
				position="fixed"
				color="inherit"
				elevation={0}
				sx={{
					bgcolor: theme.palette.background.default,
					transition: leftDrawerOpened
						? theme.transitions.create("width")
						: "none",
				}}
			>
				<Toolbar>
					<Navbar
						user={user}
						handleLeftDrawerToggle={handleLeftDrawerToggle}
						ENDPOINT={ENDPOINT}
						setRefresh={setRefresh}
					/>
				</Toolbar>
			</AppBar>

			{/* drawer */}
			<Sidebar
				drawerOpen={leftDrawerOpened}
				drawerToggle={handleLeftDrawerToggle}
				user={user}
				conversations={conversations}
				setCurrentChat={setCurrentChat}
				currentChat={currentChat}
				friend={friend}
				setFriend={setFriend}
				messages={messages}
				refresh={refresh}
				setRefresh={setRefresh}
				loading={loading}
				setLoading={setLoading}
				ENDPOINT={ENDPOINT}
				onlineUsers={onlineUsers}
			/>

			{/* main content */}
			<Main theme={theme} open={leftDrawerOpened}>
				<CurrentChat
					user={user}
					messages={messages}
					currentChat={currentChat}
					friend={friend}
					handleSendMessage={handleSendMessage}
					setNewMessage={setNewMessage}
					newMessage={newMessage}
					loading={loading}
					setLoading={setLoading}
					ENDPOINT={ENDPOINT}
				/>
			</Main>
		</Box>
	);
};

export default Chat;
