import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { router } from "./router/routers.jsx";
import { RouterProvider } from "react-router-dom";
import "aos/dist/aos.css";
import { HelmetProvider } from "react-helmet-async";
import AuthProvider from "./provider/AuthProvider";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ToastContainer />
        </QueryClientProvider>
      </HelmetProvider>
    </AuthProvider>
  </React.StrictMode>
);
