import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";

import { CssBaseline, StyledEngineProvider } from "@mui/material";
import Home from "./pages/Home/Home";
import Chat from "./pages/Chat/Chat";
import themes from "./themes/index";

function App() {
	return (
		<StyledEngineProvider injectFirst>
			<ThemeProvider theme={themes()}>
				<CssBaseline />
				<Router>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/chat" element={<Chat />} />
					</Routes>
				</Router>
			</ThemeProvider>
		</StyledEngineProvider>
	);
}

export default App;
