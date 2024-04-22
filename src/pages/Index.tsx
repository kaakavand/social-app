import React, { useEffect, useState } from "react";

import Layout from "../components/Layout";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Form from "../components/Form";
import SocialList from "../components/SocialList";
import axios from "axios";
import useSWR from "swr";
import { Button } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import Breadcrumb from "../components/BreasCrumb";
import ServerConfig from "./../config/server.json";

interface itemInterFace {
  social_id: string;
  social_link: string;
  social_type: string;
  id?: string;
}

export const Index = () => {
  const [first, setfirst] = useState(false);
  const [socialEdit, setSocialEdit] = useState<string | null>(null);
  const [theme, setTheme] = useState(null);
  const { data, error, isLoading, mutate } = useSWR(
    ServerConfig.BASE_URL,
    axios
  );

  useEffect(() => {
    if (socialEdit) {
      setfirst(true);
    }
  }, [socialEdit]);

  console.log(data);
  

  return (
    <Layout themeChenge={(val: any) => setTheme(val)}>
      <Grid
        item
        xs={12}
        // justifyContent="center"
        alignItems={"center"}
        display={"flex"}
        sx={{ flexDirection: "column" }}
        // alignItems="center"
        minHeight={"100vh"}
      >
        <div className="text-right mb-2" style={{ width: "100%" }}>
          <h2 style={{ color: theme !== "dark" ? "#202A35" : "#fff" }}>
            حساب کاربری
          </h2>
          <Breadcrumb />
        </div>
        <Box
          width={"100%"}
          sx={{
            background: theme === "dark" ? "#202A35" : "#fff",
            boxShadow: 3,
            borderRadius: 5,
            padding: "20px 20px",
          }}
        >
          <Typography
            sx={{
              color: theme === "dark" ? "#f6f6f6" : "#424242",
            }}
            fontSize={12}
          >
            مسیرهای ارتباطی
          </Typography>
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
              <Button
                startIcon={
                  socialEdit ? (
                    <CreateIcon sx={{ fontSize: 10 }} />
                  ) : (
                    <AddIcon sx={{ fontSize: 10 }} />
                  )
                }
                color="warning"
                size="small"
                variant="text"
              >
                {socialEdit ? "ویرایش مسیر ارتباطی" : "افزودن مسیر ارتباطی"}
              </Button>
              <Typography sx={{ color: "#FFAA28" }} fontSize={14}></Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                background: theme === "dark" ? "#323D48" : "#F4F6F8",
                borderRadius: 2,
              }}
            >
              <Form
                data={data}
                reload={() => mutate()}
                id={socialEdit}
                cancelHandler={() => {
                  setSocialEdit(null);
                  setfirst(false);
                }}
              />
            </AccordionDetails>
          </Accordion>
          <SocialList
            list={data}
            reload={() => mutate()}
            editHandler={(value: any) => setSocialEdit(value)}
          />
        </Box>
      </Grid>
    </Layout>
  );
};
