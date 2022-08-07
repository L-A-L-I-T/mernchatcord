// material-ui
import { useTheme } from "@mui/material/styles";
import { Avatar, Box, ButtonBase } from "@mui/material";

// project imports
import SearchSection from "./SearchSection";
import ProfileSection from "./ProfileSection";
import Logo from "../../assets/ChatAppLogo.png";
import styles from "./Navbar.module.css";
// assets
import { IconMenu2, IconMessages } from "@tabler/icons";

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Navbar = (props) => {
	const theme = useTheme();

	return (
		<>
			{/* logo & toggler button */}
			<Box
				sx={{
					width: 228,
					display: "flex",
					[theme.breakpoints.down("md")]: {
						width: "auto",
					},
				}}
			>
				<Box
					component="span"
					sx={{
						display: {
							xs: "none",
							md: "flex",
						},
						alignItems: "center",
						flexGrow: 1,
					}}
				>
					{/* <img src={Logo} alt="logo" className={styles.logoImg} /> */}
					<IconMessages className={styles.logoImg} />
					<span className={styles.logoName}>Chatcord</span>
				</Box>
				<ButtonBase sx={{ borderRadius: "12px", overflow: "hidden" }}>
					<Avatar
						variant="rounded"
						sx={{
							...theme.typography.commonAvatar,
							...theme.typography.mediumAvatar,
							transition: "all .2s ease-in-out",
							background: theme.palette.secondary.light,
							color: theme.palette.secondary.dark,
							"&:hover": {
								background: theme.palette.secondary.dark,
								color: theme.palette.secondary.light,
							},
						}}
						onClick={props.handleLeftDrawerToggle}
						color="inherit"
					>
						<IconMenu2 stroke={1.5} size="1.3rem" />
					</Avatar>
				</ButtonBase>
			</Box>

			{/* header search */}
			<SearchSection
				user={props.user}
				friend={props.friend}
				setFriend={props.setFriend}
				ENDPOINT={props.ENDPOINT}
				setRefresh={props.setRefresh}
			/>
			<Box sx={{ flexGrow: 1 }} />
			<Box sx={{ flexGrow: 1 }} />

			{/* notification & profile */}
			<ProfileSection user={props.user} ENDPOINT={props.ENDPOINT} />
		</>
	);
};

export default Navbar;
