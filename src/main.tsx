import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeView from "./views/HomeView.tsx";
import ErrorView from "./views/ErrorView.tsx";

const colors = {
  primary: "#e49b0e",
  body: "#212529",
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

const theme = extendTheme({ colors });

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeView />,
    errorElement: <ErrorView />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </StrictMode>
);
