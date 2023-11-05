import React, { useState, useEffect } from "react";

import Button from "@mui/material/Button";
import * as yup from "yup";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import { Box, Grid, TextField, Typography } from "@mui/material";
import { webService } from "../functions/webService";
import { useFormik } from "formik";
import { optionsSocial } from "../config/options";
import useSWRMutation from "swr/mutation";
import { Axios } from "axios";
import CreateIcon from "@mui/icons-material/Create";

async function postRequest(url: any, id: any) {
  return fetch(url + id, {
    method: "get",
  }).then((res) => res.json());
}

const Form = ({ reload, id, cancelHandler }: any) => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { trigger } = useSWRMutation(
    "http://localhost:3030/socials/" + id,
    fetcher
  );

  useEffect(() => {
    (async () => {
      if (id) {
        const res = await trigger();
        formik.setValues(res);
        console.log(res);
      } else if (id === null) {
        formik.setValues({
          social_type: "",
          social_id: "",
          social_link: "",
        });
      }
    })();
  }, [id]);

  let userSchema = yup.object({
    social_type: yup.string().required(),
    social_id: yup.string().required(),
    social_link: yup.string().required(),
  });

  const formik = useFormik({
    initialValues: {
      social_type: "",
      social_id: "",
      social_link: "",
    },
    validationSchema: userSchema,
    onSubmit: async (values) => {
      const res = await webService(
        id ? "put" : "post",
        `http://localhost:3030/socials${id ? "/" + id : ""}`,
        values
      );
      reload();
    },
  });

  const sfsdfe = (
    <svg
      className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiBox-root css-uqopch"
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
      data-testid="InstagramIcon"
    >
      <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
    </svg>
  );

  return (
    <form onSubmit={formik.handleSubmit}>
      <Typography className="mb-2">افزودن مسیر ارتباطی جدید</Typography>
      <Box>
        <Grid className="mb-2" container spacing={1}>
          <Grid item xs={4}>
            <TextField
              select
              id="social_type"
              label="نوع"
              name="social_type"
              className="w-100"
              size="small"
              value={formik.values.social_type}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              // IconComponent={optionsSocial[0].icon}
              error={
                formik.touched.social_type && Boolean(formik.errors.social_type)
              }
              InputProps={{
                startAdornment: formik.values.social_type && (
                  <InputAdornment position="start">
                    {formik.values.social_type &&
                      optionsSocial.filter(
                        (el) => el.key === +formik.values.social_type
                      )[0].icon}
                  </InputAdornment>
                ),
              }}
              color="warning"
              helperText={
                formik.touched.social_type && formik.errors.social_type
              }
            >
              {optionsSocial.map((el) => (
                <MenuItem key={el.key} value={el.key}>
                  {el.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={4}>
            <TextField
              color="warning"
              className="w-100"
              id="social_link"
              label="لینک"
              name="social_link"
              type="text"
              size="small"
              value={formik.values.social_link}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.social_link && Boolean(formik.errors.social_link)
              }
              helperText={
                formik.touched.social_link && formik.errors.social_link
              }
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              className="w-100"
              id="social_id"
              color="warning"
              name="social_id"
              type="text"
              label="آی دی (ID)"
              size="small"
              value={formik.values.social_id}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.social_id && Boolean(formik.errors.social_id)
              }
              helperText={formik.touched.social_id && formik.errors.social_id}
            />
          </Grid>
        </Grid>
      </Box>
      <div className="flex" style={{ justifyContent: "end" }}>
        <Button variant="outlined" onClick={cancelHandler}>
          انصراف
        </Button>
        <Button color="warning" variant="contained" type="submit">
          ایجاد مسیر ارتباطی توییتر
        </Button>
      </div>
    </form>
  );
};

export default Form;
