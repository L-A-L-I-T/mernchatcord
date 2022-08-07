// material-ui
import { Box } from "@mui/material";

// project import
import MainCard from "../../components/UI/MainCard";

// ==============================|| AUTHENTICATION CARD WRAPPER ||============================== //

const AuthCardWrapper = ({ children, ...other }) => (
	<MainCard
		sx={{
			maxWidth: { xs: 400, lg: 475 },
			margin: { xs: 2.5, md: 3 },
			"& > *": {
				flexGrow: 1,
				flexBasis: "50%",
			},
			minHeight: "400px",
		}}
		content={false}
		{...other}
	>
		<Box sx={{ p: { xs: 2, sm: 3, xl: 5 }, height: "400px" }}>{children}</Box>
	</MainCard>
);

export default AuthCardWrapper;
