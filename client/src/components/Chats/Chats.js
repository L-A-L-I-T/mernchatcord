import React, { useState, useRef, useEffect } from "react";
import {
	Snackbar,
	Alert,
	Button,
	TextField,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";
import axios from "axios";
import Conversation from "./Conversation";
import AddIcon from "@mui/icons-material/Add";
import styles from "./Chats.module.css";
const ENDPOINT = "https://mern-chatcord.herokuapp.com";

function Chats(props) {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		setOpen(false);
	};

	const [friendUsername, setFriendUsername] = useState("");
	const handleAddFriend = () => {
		console.log("user", props.user);
		console.log(`${ENDPOINT}/api/user/${props.user?._id}/addFriend`);
		if (friendUsername) {
			axios({
				method: "put",
				url: `${ENDPOINT}/api/user/${props.user?._id}/addFriend`,
				data: {
					username: friendUsername,
				},
			}).then((response) => {
				handleClose();
				if (response.status === 200) {
					<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
						<Alert
							onClose={handleClose}
							severity="success"
							sx={{ width: "100%" }}
						>
							Friend Added Successfully
						</Alert>
					</Snackbar>;
				}
				props.setRefresh(!props.refresh);
			});
		}
	};
	return (
		<>
			<div className={styles.container}>
				<div className={styles.topContainer}>
					<div style={{ fontSize: "20px" }}>My Chats</div>
					<Button onClick={handleOpen}>
						<AddIcon />
					</Button>
				</div>
				{props.conversations?.map((chat, key) => {
					return (
						<div>
							<Conversation
								chat={chat}
								key={key}
								currentUser={props.user}
								setCurrentChat={props.setCurrentChat}
								currentChat={props.currentChat}
								setFriend={props.setFriend}
							/>
						</div>
					);
				})}
			</div>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Add Friend</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Please enter your friend's username below
					</DialogContentText>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Username"
						type="text"
						fullWidth
						variant="standard"
						value={friendUsername}
						onChange={(e) => {
							setFriendUsername(e.target.value);
						}}
					/>

					{/* {props.users.map((u, key) => {
						return u.username !== props.user.username && <div>{u.username}</div>;
					})} */}
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleAddFriend}>Add</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}

export default Chats;
