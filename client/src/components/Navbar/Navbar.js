import React from "react";
import { Avatar } from "@mui/material";

import styles from "./Navbar.module.css";
function Navbar({ user }) {
	return (
		<div className={styles.container}>
			<div className={styles.logo}>Chatcord</div>
			<div className={styles.rightContainer}>
				<Avatar src={user?.avatar} className={styles.avatar} />
				<div>{user?.username}</div>
			</div>
		</div>
	);
}

export default Navbar;
