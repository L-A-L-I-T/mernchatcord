import React from "react";
import { Avatar } from "@mui/material";
import styles from "./Message.module.css";
import { format } from "timeago.js";

function Message(props) {
	return (
		<div className={props.ownMessage ? `${styles.ownMessage}` : ""}>
			<div className={styles.container}>
				<div className={styles.topContainer}>
					<div className={styles.innerContainer}>
						<Avatar src={props.user?.avatar} className={styles.avatar} />
						<div>{props.user?.username}</div>
					</div>
					<div>{format(props.message.createdAt)}</div>
				</div>
				<div className={styles.msg}>{props.message.text}</div>
			</div>
		</div>
	);
}

export default Message;
