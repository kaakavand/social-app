import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button } from "@mui/material";
import { optionsSocial } from "../config/options";
import DeleteIcon from "@mui/icons-material/Delete";
import { webService } from "../functions/webService";
import CreateIcon from '@mui/icons-material/Create';

const SocialList = ({ list, reload ,editHandler}: any) => {
  const deleteHandler = async (id: any) => {
    const res = await webService("delete", "http://localhost:3030/socials/" + id);
    reload();
  };

  return (
    <Box
      width={"100%"}
      sx={{ background: "#323D48", borderRadius: 2, padding: "0" }}
    >
      <TableContainer
        sx={{ background: "#323D48", boxShadow: "none" }}
        component={Paper}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table" >
          <TableBody>
            {list?.data.map((el: any) => (
              <TableRow
                key={el.social_id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" className="">
                  <div className="flex align-items-center">
                    {
                      optionsSocial.filter(
                        (item: any) => item.key === el.social_type
                      )[0]?.icon
                    }
                    {
                      optionsSocial.filter(
                        (item: any) => item.key === el.social_type
                      )[0]?.name
                    }
                  </div>
                </TableCell>
                <TableCell component="th" scope="row">
                  {el.social_id}
                </TableCell>
                <TableCell component="th" scope="row">
                  {el.social_link}
                </TableCell>
                <TableCell component="th" scope="row">
                  <Button
                    onClick={() => deleteHandler(el.id)}
                    startIcon={<DeleteIcon sx={{ fontSize: 10 }} />}
                    color="error"
                    size="small"
                    variant="text"
                  >
                    حذف
                  </Button>
                  <Button
                    onClick={() => editHandler(el.id)}
                    startIcon={<CreateIcon sx={{ fontSize: 10 }} />}
                    color="warning"
                    size="small"
                    variant="text"
                  >
                    ویرایش
                  </Button>
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
