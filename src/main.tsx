import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeView from "./views/HomeView.tsx";
import ErrorView from "./views/ErrorView.tsx";
import LoginView from "./views/LoginView.tsx";
import PageLayout from "./layout/PageLayout.tsx";
import ReservationView from "./views/Reservation/ReservationView.tsx";
import ReservationCreationView from "./views/Reservation/ReservationCreationView.tsx";
import HotelRoomView from "./views/HotelRoom/HotelRoomView.tsx";
import HotelRoomCreationView from "./views/HotelRoom/HotelRoomCreationView.tsx";

const colors = {
  primary: {
    50: "#f1cd86",
    100: "#eec36e",
    200: "#ecb956",
    300: "#e9af3e",
    400: "#e6a526",
    500: "#e49b0e",
    600: "#cd8b0c",
    700: "#b67c0b",
    800: "#9f6c09",
    900: "#885d08",
  },
};

const theme = extendTheme({ colors });

const router = createBrowserRouter([
  {
    path: "/",
    element: <PageLayout />,
    errorElement: <ErrorView />,
    children: [
      {
        index: true,
        element: <HomeView />,
      },
      {
        path: "login",
        element: <LoginView />,
      },
      {
        path: "reservation",
        element: <ReservationView />,
      },
      {
        path: "reservation/creation",
        element: <ReservationCreationView />,
      },
      {
        path: "hotelRoom",
        element: <HotelRoomView />,
      },
      {
        path: "hotelRoom/creation",
        element: <HotelRoomCreationView />,
      },
      {
        path: "*",
        element: <ErrorView />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </StrictMode>
);
