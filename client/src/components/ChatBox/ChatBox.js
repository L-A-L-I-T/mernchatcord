import React, { useState, useEffect, useRef } from "react";
import Chats from "../Chats/Chats";
import CurrentChat from "../CurrentChat/CurrentChat";
import styles from "./ChatBox.module.css";
import { io } from "socket.io-client";
import axios from "axios";
function ChatBox({ user }) {
	const [conversations, setConversations] = useState([]);
	const [currentChat, setCurrentChat] = useState(null);
	const [friend, setFriend] = useState(null);
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState("");
	const [arrivalMessage, setArrivalMessage] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const [refresh, setRefresh] = useState(false);
	const scrollRef = useRef();
	const socket = useRef();

	const ENDPOINT = "https://mern-chatcord.herokuapp.com";

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

	useEffect(() => {
		const getConversations = async () => {
			try {
				const res = await axios.get(
					`${ENDPOINT}/api/conversation/` + user?._id
				);
				console.log(res.data);
				setConversations(res.data);
			} catch (err) {
				console.log(err);
			}
		};
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

	return (
		<div className={styles.container}>
			<Chats
				user={user}
				conversations={conversations}
				setCurrentChat={setCurrentChat}
				currentChat={currentChat}
				setFriend={setFriend}
				messages={messages}
				refresh={refresh}
				setRefresh={setRefresh}
			/>
			<CurrentChat
				user={user}
				messages={messages}
				currentChat={currentChat}
				friend={friend}
				handleSendMessage={handleSendMessage}
				setNewMessage={setNewMessage}
				newMessage={newMessage}
			/>
		</div>
	);
}

export default ChatBox;
