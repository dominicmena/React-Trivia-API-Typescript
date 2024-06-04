import { ThemeProvider } from "@emotion/react";
import { darkTheme } from "./theme/darkTheme";
import GlobalStyles from "./theme/GlobalStyles";
import AppRouter from "./AppRouter";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import APIClient from "./api/client";
import Layout from "./componentLibrary/Layout";

function App() {
  const queryClient = new QueryClient();
  const apiClient = new APIClient({ baseURL: "https://opentdb.com" });

  return (
    <ThemeProvider theme={darkTheme}>
      <QueryClientProvider client={queryClient}>
        <GlobalStyles />
        <BrowserRouter>
          <Layout>
            <AppRouter apiClient={apiClient} />
          </Layout>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
