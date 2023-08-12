import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import "../styles/styles.css";
import DatabaseProvider from "../utils/providers/DatabaseProvider";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <DatabaseProvider>
                <App />
            </DatabaseProvider>
            {/* <ReactQueryDevtools initialIsOpen={true}/> */}
        </QueryClientProvider>
    </React.StrictMode>
);
