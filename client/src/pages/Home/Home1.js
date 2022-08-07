// material-ui
import { useTheme } from "@mui/material/styles";
import {
	Grid,
	Stack,
	Typography,
	useMediaQuery,
	Box,
	Button,
} from "@mui/material";
import GoogleIcon from "../../assets/googleIcon.png";
// project imports
import AuthWrapper1 from "./AuthWrapper1";
import AuthCardWrapper from "./AuthCardWrapper";
import { IconMessages } from "@tabler/icons";
import AnimateButton from "../../components/UI/AnimateButton";
import styles from "./Home.module.css";
// assets

// ================================|| AUTH3 - LOGIN ||================================ //

const Login = () => {
	const theme = useTheme();
	const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
	const ENDPOINT = "http://localhost:8000";

	const handleLoginWithGoogle = () => {
		window.open(`${ENDPOINT}/api/user/google`, "_self");
	};

	return (
		<AuthWrapper1>
			<Grid
				container
				direction="column"
				justifyContent="flex-end"
				sx={{ minHeight: "100vh" }}
			>
				<Grid item xs={12}>
					<Grid
						container
						justifyContent="center"
						alignItems="center"
						sx={{ minHeight: "calc(100vh - 68px)" }}
					>
						<Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
							<AuthCardWrapper>
								<Grid
									container
									spacing={2}
									alignItems="center"
									justifyContent="space-around"
									style={{ height: "100%" }}
								>
									<Grid
										item
										sx={{
											mb: 3,
											display: "flex",
											flexDirection: "column",
											alignItems: "center",
										}}
									>
										<IconMessages
											className={styles.logoIcon}
											style={{ color: theme.palette.primary.main }}
										/>
										<div
											className={styles.logoName}
											style={{ color: theme.palette.primary.main }}
										>
											Chatcord
										</div>
									</Grid>
									<Grid item xs={12}>
										<Grid
											container
											direction={matchDownSM ? "column-reverse" : "row"}
											alignItems="center"
											justifyContent="center"
										>
											<Grid item>
												<Stack
													alignItems="center"
													justifyContent="center"
													spacing={1}
												>
													<Typography
														color={theme.palette.secondary.main}
														gutterBottom
														variant={matchDownSM ? "h3" : "h2"}
													>
														Hi, Welcome Back
													</Typography>
												</Stack>
											</Grid>
										</Grid>
										<Grid item xs={12}>
											<AnimateButton>
												<Button
													disableElevation
													fullWidth
													onClick={handleLoginWithGoogle}
													size="large"
													variant="outlined"
													sx={{
														color: "grey.700",
														backgroundColor: theme.palette.grey[50],
														borderColor: theme.palette.grey[100],
													}}
												>
													<Box sx={{ mr: { xs: 1, sm: 2, width: 20 } }}>
														<img
															src={GoogleIcon}
															alt="google"
															width={16}
															height={16}
															style={{ marginRight: matchDownSM ? 8 : 16 }}
														/>
													</Box>
													Sign in with Google
												</Button>
											</AnimateButton>
										</Grid>
									</Grid>
								</Grid>
							</AuthCardWrapper>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12} sx={{ m: 3, mt: 1 }}>
					<div style={{ textAlign: "center" }}>
						Made with ❤️ by{" "}
						<a
							href="http://lalitrajput.com"
							style={{ color: theme.palette.secondary.main }}
						>
							Lalit Rajput
						</a>
						<br />
						<a
							href="https://github.com/L-A-L-I-T/mernchatcord"
							style={{ color: theme.palette.secondary.main }}
						>
							Github
						</a>
					</div>
				</Grid>
			</Grid>
		</AuthWrapper1>
	);
};

export default Login;
