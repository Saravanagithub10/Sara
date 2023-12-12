import React, { useEffect } from "react";
import Box from "@mui/material/Box";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (value === 0) navigate("/");
    else if (value === 1) navigate("/series");
    else if (value === 2) navigate("/movies");
    else if (value === 3) navigate("/search");
  }, [value, navigate]);

  return (
    <Box>
      <Box
        sx={{
          width: "100%",
          backgroundColor: "#eed202",
          position: "fixed",
          top: 56,
          zIndex: 100,
        }}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          style={{
            backgroundColor: "#eed202",
            "&:hover": { backgroundColor: "Black" },
          }}
        >
          <BottomNavigationAction
            style={{ color: "black" }}
            label="Home"
            icon={<HomeIcon />}
          />
          <BottomNavigationAction
            style={{ color: "black" }}
            label="Series"
            icon={<LiveTvIcon />}
          />
          <BottomNavigationAction
            style={{ color: "black" }}
            label="Movies"
            icon={<MovieCreationIcon />}
          />
          <BottomNavigationAction
            style={{ color: "black" }}
            label="Search"
            icon={<SearchIcon />}
          />
        </BottomNavigation>
      </Box>
    </Box>
  );
}
