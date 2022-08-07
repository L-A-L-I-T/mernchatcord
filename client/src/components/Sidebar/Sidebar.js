import React from "react";
import Conversation from "./Conversation";
import styles from "./Sidebar.module.css";
// material-ui
import { useTheme } from "@mui/material/styles";
import { Box, Drawer, useMediaQuery } from "@mui/material";

// third-party
import PerfectScrollbar from "react-perfect-scrollbar";
import { BrowserView, MobileView } from "react-device-detect";

// project imports
import Logo from "../../assets/ChatAppLogo.png";
import { IconMessages } from "@tabler/icons";

const Sidebar = (props) => {
	const theme = useTheme();
	const matchUpMd = useMediaQuery(theme.breakpoints.up("md"));

	const drawer = (
		<>
			<Box sx={{ display: { xs: "block", md: "none" } }}>
				<Box sx={{ display: "flex", p: 2, mx: "auto", alignItems: "center" }}>
					{/* <img src={Logo} alt="logo" className={styles.logoImg} /> */}
					<IconMessages className={styles.logoImg} />
					<span className={styles.logoName}>Chatcord</span>
				</Box>
			</Box>
			<BrowserView>
				<PerfectScrollbar
					component="div"
					style={{
						height: !matchUpMd ? "calc(100vh - 56px)" : "calc(100vh - 88px)",
						paddingLeft: "16px",
						paddingRight: "16px",
					}}
				>
					<div>
						{props.conversations && props.conversations.length > 0 ? (
							props.conversations?.map((chat, key) => {
								return (
									<div>
										<Conversation
											chat={chat}
											key={key}
											currentUser={props.user}
											setCurrentChat={props.setCurrentChat}
											currentChat={props.currentChat}
											friend={props.friend}
											setFriend={props.setFriend}
											loading={props.loading}
											setLoading={props.setLoading}
											ENDPOINT={props.ENDPOINT}
											drawerToggle={props.drawerToggle}
											mobileView={matchUpMd ? false : true}
											onlineUsers={props.onlineUsers}
										/>
									</div>
								);
							})
						) : (
							<div>
								You don't have any friends added, please add friends using
								search bar above
							</div>
						)}
					</div>
				</PerfectScrollbar>
			</BrowserView>
			<MobileView>
				<Box sx={{ px: 2 }}>
					<div>
						{props.conversations?.map((chat, key) => {
							return (
								<div>
									<Conversation
										chat={chat}
										key={key}
										currentUser={props.user}
										setCurrentChat={props.setCurrentChat}
										currentChat={props.currentChat}
										friend={props.friend}
										setFriend={props.setFriend}
										loading={props.loading}
										setLoading={props.setLoading}
										ENDPOINT={props.ENDPOINT}
										drawerToggle={props.drawerToggle}
										mobileView={true}
										onlineUsers={props.onlineUsers}
									/>
								</div>
							);
						})}
					</div>
				</Box>
			</MobileView>
		</>
	);

	const container =
		props.window !== undefined ? () => props.window.document.body : undefined;
	const drawerWidth = 260;
	return (
		<Box
			component="nav"
			sx={{ flexShrink: { md: 0 }, width: matchUpMd ? drawerWidth : "auto" }}
			aria-label="mailbox folders"
		>
			<Drawer
				container={container}
				variant={matchUpMd ? "persistent" : "temporary"}
				anchor="left"
				open={props.drawerOpen}
				onClose={props.drawerToggle}
				sx={{
					"& .MuiDrawer-paper": {
						width: drawerWidth,
						background: theme.palette.background.default,
						color: theme.palette.text.primary,
						borderRight: "none",
						[theme.breakpoints.up("md")]: {
							top: "88px",
						},
					},
				}}
				ModalProps={{ keepMounted: true }}
				color="inherit"
			>
				{drawer}
			</Drawer>
		</Box>
	);
};

export default Sidebar;
