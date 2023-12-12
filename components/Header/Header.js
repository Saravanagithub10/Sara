import React, { useEffect, useState } from "react";
import { Navbar, Container } from "react-bootstrap";

const Header = () => {
  const [isResponsive, setIsResponsive] = useState(window.innerWidth <= 1000);

  const headerStyle = {
    fontFamily: "Smooch sans",
    fontSize: "4vw",
    display: "flex",
    backgroundColor: "#eed202",
    color: "black",
    cursor: "pointer",
    width: "100%",
    justifyContent: "center",
    paddingBottom: "10px",
    paddingLeft: "20px",
    position: "fixed",
    zIndex: "100",
  };

  const responsiveStyle = {
    paddingTop: "10px",
    fontSize: "5vw",
    paddingBottom: "15px",
  };

  useEffect(() => {
    const handleResize = () => {
      setIsResponsive(window.innerWidth <= 1000);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Navbar bg="light" variant="light" fixed="top">
      <Container>
        <Navbar.Brand
          onClick={() => window.scroll(0, 0)}
          style={{
            ...headerStyle,
            ...(isResponsive && responsiveStyle),
          }}
        >
          watch wave
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;
