import { Avatar } from "@chakra-ui/react";
import NavbarLink from "./NavbarLink";

const Navbar = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "60px",
        borderBottom: "1px solid #eee",
        padding: "0 20px",
      }}
    >
      <div
        style={{
          display: "flex",
          height: "100%",
          gap: "10px",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <NavbarLink to={"/reservation"}>{"Réservation"}</NavbarLink>
        <NavbarLink to={"/hotelRoom"}>{"Chambre"}</NavbarLink>
        <NavbarLink to={"/login"}>
          <Avatar size="xs" />
        </NavbarLink>
      </div>
    </div>
  );
};

export default Navbar;
