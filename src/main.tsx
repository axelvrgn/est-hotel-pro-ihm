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
    element: <PageLayout />,
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
    ],
  },
  {
    path: "*",
    element: <ErrorView />,
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </StrictMode>
);
