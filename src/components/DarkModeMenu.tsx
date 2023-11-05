// import React from 'react'
import React, { useEffect } from "react";
import { Box, Container, ThemeProvider } from "@mui/material";
import Typography from "@mui/material/Typography";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import WbSunnyIcon from "@mui/icons-material/WbSunny";

const DarkModeMenu = ({ changTheme }: {changTheme : Function}) => {
  return (
    <Box sx={{ padding: "15px" }}>
      <Typography sx={{ width: "200px" }}>Setting</Typography>
      <hr className="mb-2 mt-2" />
      <Typography sx={{}} fontSize={14}>
        mode
      </Typography>
      <div className="flex justicy-content-between">
        <div className="dark_mode" onClick={() => changTheme("dark")}>
          <DarkModeIcon />
        </div>
        <div className="light_mode" onClick={() => changTheme("light")}>
          <WbSunnyIcon />
        </div>
      </div>
    </Box>
  );
};

export default DarkModeMenu;
