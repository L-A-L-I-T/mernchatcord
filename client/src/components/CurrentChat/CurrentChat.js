import React, { useRef, useEffect } from "react";
import styles from "./CurrentChat.module.css";
import { Button, CircularProgress } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import Message from "../Message/Message";
function CurrentChat(props) {
	const theme = useTheme();
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
				props.loading ? (
					<div className={styles.noChat}>
						<CircularProgress />
					</div>
				) : (
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
								style={{ backgroundColor: theme.palette.primary.light }}
							>
								<SendRoundedIcon
									size="large"
									className={styles.icon}
									style={{ color: theme.palette.primary.main }}
								/>
							</Button>
						</div>
					</div>
				)
			) : (
				<div className={styles.noChat}>Please select a Chat</div>
			)}
		</>
	);
}

export default CurrentChat;
