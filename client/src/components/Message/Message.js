import React from "react";
import { Avatar } from "@mui/material";
import styles from "./Message.module.css";
import { format } from "timeago.js";
import { useTheme } from "@mui/material/styles";
function Message(props) {
	const theme = useTheme();
	return (
		<div className={props.ownMessage ? `${styles.ownMessage}` : ""}>
			<div
				className={styles.container}
				style={{ background: theme.palette.primary.light }}
			>
				<div className={styles.topContainer}>
					<div className={styles.innerContainer}>
						<Avatar src={props.user?.avatar} className={styles.avatar} />
						<div className={styles.userName}>{props.user?.username}</div>
					</div>
					<div className={styles.time}>{format(props.message.createdAt)}</div>
				</div>
				<div className={styles.msg}>{props.message.text}</div>
			</div>
		</div>
	);
}

export default Message;
