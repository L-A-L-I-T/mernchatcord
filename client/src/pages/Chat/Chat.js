import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Navigate } from "react-router-dom";
import ChatBox from "../../components/ChatBox/ChatBox";
function Chat() {
	const [user, setUser] = useState();
	const ENDPOINT = "https://mern-chatcord.herokuapp.com";
	useEffect(() => {
		const getUser = () => {
			console.log("hello");
			fetch(`${ENDPOINT}/api/user/login/success`, {
				method: "GET",
				credentials: "include",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					"Access-Control-Allow-Credentials": true,
				},
			})
				.then((response) => {
					if (response.status === 200) return response.json();
					else {
						console.log("errore");
						Navigate("/");
						throw new Error("authentication has been failed!");
					}
				})
				.then((resObject) => {
					if (!resObject.user) Navigate("/");
					console.log(resObject.user);
					setUser(resObject.user);
				})
				.catch((err) => {
					Navigate("/");
					console.log("hi");
					console.error(err);
				});
		};
		getUser();
	}, []);
	return (
		<div>
			<Navbar user={user} />
			<ChatBox user={user} />
		</div>
	);
}

export default Chat;
