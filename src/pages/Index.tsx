import React, { useState } from "react";

import Button from "@mui/material/Button";

import Layout from "../components/Layout";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@emotion/react";
import styled from "styled-components";

export const Index = () => {
  const [first, setfirst] = useState(false);
  const theme = useTheme();

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <Layout>
      <Grid
        item
        xs={12}
        justifyContent="center"
        display={"flex"}
        alignItems="center"
        height={"100vh"}
      >
        <Box
          width={"100%"}
          sx={{
            background: "#202A35",
            boxShadow: 3,
            borderRadius: 5,
            padding: "20px 20px",
          }}
        >
          <p>مسیرهای ارتباطی</p>
          <Accordion
            TransitionProps={{ unmountOnExit: true }}
            expanded={first === true}
            onChange={() => setfirst(!first)}
            sx={{ background: "none", boxShadow: "none", padding: "0" }}
          >
            <AccordionSummary
              aria-controls="panel1bh-content"
              id="panel1bh-header"
              sx={{ background: "none", padding: "0" }}
            >
              <AddIcon color="warning" sx={{ fontSize: 20 }} />
              <Typography sx={{ color: "#FFAA28" }} fontSize={14}>
                ایجاد مسیر ارتباطی
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ background: "#323D48", borderRadius: 2 }}>
              افزودن مسیر ارتباطی جدید
              <Box>
                <Grid container spacing={1}>
                  <Grid item xs={4}>
                    <TextField
                      sx={{ width: "100%" }}
                      id="outlined-basic"
                      label="Outlined"
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      sx={{ width: "100%" }}
                      id="outlined-basic"
                      label="Outlined"
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      sx={{ width: "100%", direction: "rtl" }}
                      id="outlined-basic"
                      label="سلشسیل"
                      variant="outlined"
                      dir="rtl"
                      size="small"
                    />
                  </Grid>
                </Grid>
              </Box>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Grid>
    </Layout>
  );
};
