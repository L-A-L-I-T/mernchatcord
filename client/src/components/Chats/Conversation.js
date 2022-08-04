import React, { useState, useEffect } from "react";
import styles from "./Conversation.module.css";
import axios from "axios";
import { Avatar } from "@mui/material";
function Conversation(props) {
	const [user, setUser] = useState(null);
	const ENDPOINT = "https://mern-chatcord.herokuapp.com";
	useEffect(() => {
		const friendId = props.chat.members.find(
			(m) => m !== props.currentUser._id
		);
		const data = {
			userId: friendId,
		};
		const getUser = async () => {
			try {
				const res = await axios(
					`${ENDPOINT}/api/user?userId=` + friendId,
					data
				);
				console.log(res.data);
				setUser(res.data);
				props.setFriend(res.data);
			} catch (err) {
				console.log(err);
			}
		};
		getUser();
	}, [props.currentUser, props.conversation]);
	return (
		<div
			className={styles.container}
			onClick={() => {
				props.setCurrentChat(props.chat);
			}}
		>
			<Avatar src={user?.avatar} />
			<div className={styles.name}>{user?.username}</div>
			<div className={styles.msg}></div>
		</div>
	);
}

export default Conversation;
