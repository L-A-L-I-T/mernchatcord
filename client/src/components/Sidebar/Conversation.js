import React, { useState, useEffect, useRef } from "react";
import styles from "./Conversation.module.css";
import axios from "axios";
import { styled } from "@mui/material/styles";
import { Avatar, Badge } from "@mui/material";
import { useTheme } from "@mui/material/styles";
const StyledBadge = styled(Badge)(({ theme }) => ({
	"& .MuiBadge-badge": {
		backgroundColor: "#44b700",
		color: "#44b700",
		boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
		"&::after": {
			position: "absolute",
			top: 0,
			left: 0,
			width: "100%",
			height: "100%",
			borderRadius: "50%",
			animation: "ripple 1.2s infinite ease-in-out",
			border: "1px solid currentColor",
			content: '""',
		},
	},
	"@keyframes ripple": {
		"0%": {
			transform: "scale(.8)",
			opacity: 1,
		},
		"100%": {
			transform: "scale(2.4)",
			opacity: 0,
		},
	},
}));
function Conversation(props) {
	const theme = useTheme();
	const [user, setUser] = useState(null);
	// const ENDPOINT = "https://mern-chatcord.herokuapp.com";
	const friendId = props.chat.members.find((m) => m !== props.currentUser._id);
	const data = {
		userId: friendId,
	};
	const isOnline = props.onlineUsers.includes(friendId);
	const getUser = async () => {
		props.setLoading(true);
		try {
			const res = await axios(
				`${props.ENDPOINT}/api/user?userId=` + friendId,
				data
			);
			console.log(res.data);
			setUser(res.data);
		} catch (err) {
			console.log(err);
		}
		props.setLoading(false);
	};
	useEffect(() => {
		getUser();
	}, [props.currentUser, props.conversation]);
	console.log(theme.palette.primary.light);
	return (
		<div
			className={styles.container}
			style={
				props.friend && friendId === props.friend?._id
					? {
							backgroundColor: theme.palette.secondary.light,
							color: theme.palette.secondary.main,
					  }
					: {}
			}
			onClick={async () => {
				console.log("clicked", props.mobileView);
				await getUser();
				props.setCurrentChat(props.chat);
				props.setFriend(user);
				if (props.mobileView && props.mobileView === true) {
					console.log("clicked");
					props.drawerToggle();
				}
			}}
		>
			{isOnline ? (
				<StyledBadge
					overlap="circular"
					anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
					variant="dot"
				>
					<Avatar src={user?.avatar} />
				</StyledBadge>
			) : (
				<Avatar src={user?.avatar} />
			)}
			<div className={styles.name}>{user?.username}</div>
			<div className={styles.msg}></div>
		</div>
	);
}

export default Conversation;
