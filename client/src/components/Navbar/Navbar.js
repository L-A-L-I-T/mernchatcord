import React from "react";
import { Avatar, Button } from "@mui/material";

import styles from "./Navbar.module.css";
function Navbar({ user }) {
	const ENDPOINT = "https://mern-chatcord.herokuapp.com";
	const logout = () => {
		window.open(`${ENDPOINT}/api/user/logout`, "_self");
	};
	return (
		<div className={styles.container}>
			<div className={styles.logo}>Chatcord</div>
			<div className={styles.rightContainer}>
				<Avatar src={user?.avatar} className={styles.avatar} />
				<div>{user?.username}</div>
				<Button variant="text" className={styles.logoutBtn} onClick={logout}>
					Logout
				</Button>
			</div>
		</div>
	);
}

export default Navbar;
