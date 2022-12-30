import React from "react";
import * as ReactDom from "react-dom/client";
import App from "./App";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import {ReactQueryDevtools} from "@tanstack/react-query-devtools"
const queryClient = new QueryClient();

const root = ReactDom.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <App />
            <ReactQueryDevtools />
        </QueryClientProvider>
    </React.StrictMode>
);
