import React from "react";
import { Paper, Button } from "@mui/material";
import ChatImg from "../../assets/ChatAppLogo.png";
import GoogleIcon from "../../assets/googleIcon.png";
import styles from "./Home.module.css";

const ENDPOINT = "https://mern-chatcord.herokuapp.com";
// const ENDPOINT = "http://localhost:8000";

const handleLoginWithGoogle = () => {
	window.open(`${ENDPOINT}/api/user/google`, "_self");
};

function Home() {
	return (
		<div className={styles.container}>
			<div>
				<Paper className={styles.paper}>
					<div>
						<img src={ChatImg} alt="chat" className={styles.chatImg} />
						<div className={styles.logoName}>Chatcord</div>
					</div>

					<Button
						variant="outlined"
						onClick={handleLoginWithGoogle}
						className={styles.loginwithGoogleBtn}
					>
						Login / Signup with{" "}
						<img src={GoogleIcon} alt="google" className={styles.googleIcon} />
					</Button>
				</Paper>
			</div>
		</div>
	);
}

export default Home;
