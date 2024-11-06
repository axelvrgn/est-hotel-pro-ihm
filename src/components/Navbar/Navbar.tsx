import { Avatar, Text } from "@chakra-ui/react";
import NavbarLink from "./NavbarLink";
import logo from "../../assets/logo-est-hotel-pro.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const navigateToHome = () => {
    navigate("/");
  };

  return (
    <div
      style={{
        width: "100%",
        height: "3rem",
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
          justifyContent: "space-between",
        }}
      >
        <div
          className="navlink-logo-ehp"
          style={{ display: "flex", alignItems: "center" }}
          onClick={navigateToHome}
        >
          <img src={logo} alt="Site Logo" style={{ height: "3rem" }} />
          <Text fontSize={"2xl"}>{"Est Hotel Pro"}</Text>
        </div>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <NavbarLink to={"/reservation"}>{"Réservation"}</NavbarLink>
          <NavbarLink to={"/hotelRoom"}>{"Chambre"}</NavbarLink>
          <NavbarLink to={"/login"}>
            <Avatar size="xs" name={user?.name} />
          </NavbarLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
