import React from "react";
import { Paper, Button } from "@mui/material";
import ChatImg from "../../assets/ChatImg.png";
import GoogleIcon from "../../assets/googleIcon.png";
import styles from "./Home.module.css";

const ENDPOINT = "https://mern-chatcord.herokuapp.com";

const handleLoginWithGoogle = () => {
	window.open(`${ENDPOINT}/api/user/google`, "_self");
};

function Home() {
	return (
		<div className={styles.container}>
			<div>
				<Paper className={styles.paper}>
					<img src={ChatImg} alt="chat" className={styles.chatImg} />
					<div>Hello User</div>
					<Button variant="outlined" onClick={handleLoginWithGoogle}>
						Login / Signup with{" "}
						<img src={GoogleIcon} alt="google" className={styles.googleIcon} />
					</Button>
				</Paper>
			</div>
		</div>
	);
}

export default Home;
