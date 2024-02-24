import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";
import HomePage from "./pages/home";
import store from "./store";
import theme from "theme";

import "./App.css";

// Create a new QueryClient instance
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ToastContainer
            position="top-right"
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <BrowserRouter>
            <Routes>
              <Route
                path={``}
                element={
                  <div className="container">
                    <HomePage />
                  </div>
                }
              />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
