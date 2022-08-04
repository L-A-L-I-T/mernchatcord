import React, { useRef, useEffect } from "react";
import styles from "./CurrentChat.module.css";
import {
	IconButton,
	Button,
	ExpansionPanel,
	ExpansionPanelSummary,
	ExpansionPanelDetails,
	Typography,
} from "@mui/material";

import SendRoundedIcon from "@mui/icons-material/SendRounded";
import Message from "../Message/Message";
import { ExpandMore } from "@mui/icons-material";
function CurrentChat(props) {
	const scrollRef = useRef();
	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			props.handleSendMessage();
		}
	};
	useEffect(() => {
		scrollRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [props.messages]);
	return (
		<>
			{props.currentChat ? (
				<div className={styles.container}>
					<div className={styles.msgs}>
						{props.messages.map((message, key) => {
							return (
								<div ref={scrollRef}>
									<Message
										user={
											message.senderId === props.user._id
												? props.user
												: props.friend
										}
										message={message}
										key={key}
										ownMessage={message.senderId === props.user._id}
									/>
								</div>
							);
						})}
					</div>
					<div className={styles.bottomContainer}>
						<input
							className={styles.input}
							value={props.newMessage}
							onKeyDown={handleKeyDown}
							placeholder="Type your text here..."
							onChange={(e) => {
								props.setNewMessage(e.target.value);
							}}
						/>
						<Button
							className={styles.sendIcon}
							onClick={props.handleSendMessage}
						>
							<SendRoundedIcon size="large" className={styles.icon} />
						</Button>
					</div>
				</div>
			) : (
				<div className={styles.noChat}>Please select a Chat</div>
			)}
		</>
	);
}

export default CurrentChat;
