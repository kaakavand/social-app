import React, { useEffect, useState } from "react";

import Layout from "../components/Layout";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Form from "../components/Form";
import SocialList from "../components/SocialList";
import axios from "axios";
import useSWR from "swr";
import { Button } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";

export const Index = () => {
  const [first, setfirst] = useState(false);
  const [socialEdit, setSocialEdit] = useState<any>(null);

  const { data, error, isLoading, mutate } = useSWR(
    " http://localhost:3030/socials",
    axios
  );

  useEffect(() => {
    if (socialEdit) {
      setfirst(true);
    }
  }, [socialEdit]);

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
          <p className="mb-2">مسیرهای ارتباطی</p>
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
                {socialEdit ? "ویرایش مسیر ارتباطی" : "ایجاد مسیر ارتباطی"}
              </Button>
              <Typography sx={{ color: "#FFAA28" }} fontSize={14}></Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ background: "#323D48", borderRadius: 2 }}>
              <Form
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
