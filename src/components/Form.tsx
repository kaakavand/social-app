import React, { useState, useEffect } from "react";

import Button from "@mui/material/Button";
import * as yup from "yup";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import { Box, Grid, TextField, Typography, useTheme } from "@mui/material";
import { webService } from "../functions/webService";
import { useFormik } from "formik";
import { optionsSocial } from "../config/options";
import useSWRMutation from "swr/mutation";
import ServerConfig from "./../config/server.json";
import { toast } from "react-toastify";

interface itemInterFace {
  social_id: string;
  social_link: string;
  social_type: string;
  id?: string;
}

const Form = ({
  reload,
  id,
  cancelHandler,
  data,
}: {
  reload: Function;
  id: string | null;
  cancelHandler: any;
  data: any;
}) => {
  const theme = useTheme();
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { trigger } = useSWRMutation(ServerConfig.BASE_URL + id, fetcher);
  const [socialTypeName, setSocialTypeName] = useState("");

  useEffect(() => {
    (async () => {
      if (id) {
        const res = await trigger();
        formik.setValues({
          social_type: res.social_type,
          social_id: res.social_id,
          social_link: res.social_link,
        });
        setSocialTypeName(
          optionsSocial.filter((el) => el.key === res.social_type)[0].name
        );
      } else if (id === null) {
        formik.setValues({
          social_type: "",
          social_id: "",
          social_link: "",
        });
        setSocialTypeName("");
      }
    })();
  }, [id]);

  let userSchema = yup.object({
    social_type: yup.string().required("نوع حساب الزامسیت"),
    social_id: yup.string().required("آی دی (ID) الزامیست"),
    social_link: yup.string().required("لینک الزامیست"),
  });

  const formik = useFormik({
    initialValues: {
      social_type: "",
      social_id: "",
      social_link: "",
    },

    validationSchema: userSchema,
    onSubmit: async (values) => {
      const newList = data.data.filter((el: { id: string }) => el.id !== id);
      if (
        !newList
          .map((el: itemInterFace) => el.social_id)
          .includes(values.social_id) &&
        !newList
          .map((el: itemInterFace) => el.social_link)
          .includes(values.social_link) &&
        !newList
          .map((el: itemInterFace) => el.social_type)
          .includes(values.social_type)
      ) {
        const res = await webService(
          id ? "put" : "post",
          `${ServerConfig.BASE_URL}${id ? id : ""}`,
          values
        );
        if(!id){
          formik.resetForm()
        }
        reload();
      } else {
        toast.error("مقادیر تکراری هستند");
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Typography
        className="mb-2"
        sx={{ color: theme.palette.mode === "dark" ? "#fff" : "#212121" }}
        fontSize={14}
      >
        {id
          ? " ویرایش مسیر ارتباطی" + " " + socialTypeName
          : "افزودن مسیر ارتباطی"}
      </Typography>
      <Box>
        <Grid className="mb-2" container spacing={1}>
          <Grid item xs={4}>
            <TextField
              select
              id="social_type"
              label="نوع"
              name="social_type"
              autoComplete="off"
              className="w-100"
              size="small"
              value={formik.values.social_type}
              onChange={formik.handleChange}
              // onBlur={formik.handleBlur}
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
              autoComplete="off"
              type="text"
              size="small"
              value={formik.values.social_link}
              onChange={formik.handleChange}
              // onBlur={formik.handleBlur}
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
              autoComplete="off"
              name="social_id"
              type="text"
              label="آی دی (ID)"
              size="small"
              value={formik.values.social_id}
              onChange={formik.handleChange}
              // onBlur={formik.handleBlur}
              error={
                formik.touched.social_id && Boolean(formik.errors.social_id)
              }
              helperText={formik.touched.social_id && formik.errors.social_id}
            />
          </Grid>
        </Grid>
      </Box>
      <div className="flex" style={{ justifyContent: "end" }}>
        <Button variant="outlined" color="inherit" onClick={cancelHandler}>
          انصراف
        </Button>
        <Button
          className="mr-2 warning_button_hover"
          color="warning"
          variant="contained"
          type="submit"
        >
          {id
            ? " ویرایش مسیر ارتباطی" + " " + socialTypeName
            : "افزودن مسیر ارتباطی"}
        </Button>
      </div>
    </form>
  );
};

export default Form;
