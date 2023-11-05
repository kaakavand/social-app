import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function Breadcrumb() {
  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="text.primary"
      //   href="/"
      onClick={handleClick}
    >
      خانه
    </Link>,
    <Link underline="hover" key="3" color="text.primary" onClick={handleClick}>
      کاربر
    </Link>,
    <Typography key="1" color="inherit">
      تنظیمات کاربری
    </Typography>,
  ];

  return (
    <Stack spacing={2} sx={{marginTop : 1}}>
      <Breadcrumbs
        separator="."
        aria-label="breadcrumb"
        // sx={{ direction: "rtl" }}
      >
        {breadcrumbs}
      </Breadcrumbs>
    </Stack>
  );
}
