import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router";
import { router } from "./routes/Router";
import store from "./app/store";
import { observeAuthState } from "./components/feature/authSlice";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

store.dispatch(observeAuthState());


// Create a client
const queryClient = new QueryClient()

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RouterProvider router={router}></RouterProvider>
      </Provider>
    </QueryClientProvider>
    <Toaster
      position="top-center"
      reverseOrder={false}
    />
  </StrictMode>
);
