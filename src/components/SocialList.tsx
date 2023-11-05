import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { optionsSocial } from "../config/options";
import { webService } from "../functions/webService";
import CreateIcon from "@mui/icons-material/Create";
import Delete from "./Delete";
import ServerConfig from './../config/server.json'

interface itemInterFace {
  social_id : string,
  social_link : string,
  social_type : string,
  id : string,
}

const SocialList = ({ list, reload, editHandler }: {reload : Function , editHandler: Function , list : any}) => {
  const theme = useTheme();

  const deleteHandler = async (id: string | number) => {
    const res = await webService(
      "delete",
      ServerConfig.BASE_URL + id
    );
    reload();
  };

  console.log(theme);
  
  return (
    <Box
      width={"100%"}
      sx={{
        background: theme.palette.mode === "dark" ? "#323D48" : "#F4F6F8",
        borderRadius: 2,
        overflow: "hidden",
        padding: "0",
      }}
    >
      <TableContainer
        sx={{
          background: theme.palette.mode === "dark" ? "#323D48" : "#F4F6F8",
          boxShadow: "none",
        }}
        component={Paper}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            {list?.data.map((el: itemInterFace) => (
              <TableRow
                key={el.social_id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" className="">
                  <div
                    className="flex align-items-center"
                    style={{ color: theme.palette.mode === "dark" ? 'white' : '#212121' }}
                  >
                    {
                      optionsSocial.filter(
                        (item: {key : number}) => item.key === +el.social_type
                      )[0]?.icon
                    }

                    <p className="mr-1">
                      {
                        optionsSocial.filter(
                          (item: {key : number}) => item.key === +el.social_type
                        )[0]?.name
                      }
                    </p>
                  </div>
                </TableCell>
                <TableCell component="th" scope="row">
                  <div className="flex">
                    <Typography fontSize={12} marginRight={1}>
                      آی دی (ID) :{" "}
                    </Typography>
                    <Typography
                      fontSize={12}
                      sx={{
                        color:
                          theme.palette.mode === "dark"
                            ? theme.palette.warning.main
                            : "#212121",
                      }}
                    >
                      {el.social_id}
                    </Typography>
                  </div>
                </TableCell>
                <TableCell component="th" scope="row">
                  <div className="flex">
                    <Typography fontSize={12} marginRight={1}>
                      آی دی (ID) :{" "}
                    </Typography>
                    <Typography
                      fontSize={12}
                      sx={{ color: theme.palette.warning.main }}
                    >
                      {el.social_link}
                    </Typography>
                  </div>
                </TableCell>
                <TableCell component="th" scope="row">
                  <div className="flex text-left justify-content-left">
                    <Button
                      onClick={() => editHandler(el.id)}
                      startIcon={<CreateIcon sx={{ fontSize: 10 }} />}
                      color="warning"
                      size="small"
                      variant="text"
                      className="ml-2"
                    >
                      ویرایش
                    </Button>
                    <Delete social_id={el.social_id} onCLickDelete={() => deleteHandler(el.id)} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SocialList;
