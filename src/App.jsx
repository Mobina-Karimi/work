import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import Router from "router/Router";
import defaultOptions from "configs/reactQuery";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import Layout from "layouts/Layout";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const queryClient = new QueryClient({ defaultOptions });

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout searchQuery={searchQuery} setSearchQuery={setSearchQuery}>
          <Router searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <Toaster />
        </Layout>
      </BrowserRouter>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
