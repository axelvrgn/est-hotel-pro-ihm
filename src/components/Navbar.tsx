import CustomLink from "./CustomLink";

const Navbar = () => {
  return (
    <div
      style={{ width: "100%", height: "60px", borderBottom: "1px solid #eee" }}
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
        <div
          style={{ padding: "8px", border: "2px solid white" }}
          className={`navbar-link`}
        >
          <CustomLink to={"/reservation"} label={"Réservation"} />
        </div>
        <div
          style={{ padding: "8px", border: "2px solid white" }}
          className={`navbar-link`}
        >
          <CustomLink to={"/hotelRoom"} label={"Chambre"} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
