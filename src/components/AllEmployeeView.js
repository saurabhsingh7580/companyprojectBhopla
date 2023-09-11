import React, { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Box,
  IconButton,
} from "@mui/material";
import axios from "axios";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { toast } from "react-toastify";
import swal from "sweetalert";
import { Divider, Menu, MenuItem } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  FormControlLabel,
  Typography,
  Collapse,
  Popover,
  ListItemIcon,
} from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useNavigate } from "react-router-dom";
function AllEmployeeView() {
  const [allEmployeeView, setAllEmployeeView] = useState([]);
  const getListData = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .get("https://sweede.app/DeliveryBoy/Get-Employee/?format=json", config)
      .then((response) => {
        setAllEmployeeView(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  useEffect(() => {
    getListData();
  }, [allEmployeeView]);

  function stripHtmlTags(htmlString) {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlString;
    return tempDiv.textContent || tempDiv.innerText || "";
  }

  // delete Task Api
  const handleDelete = (id) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const url = `https://sweede.app/DeliveryBoy/delete-Employee/${id}`;

    axios
      .delete(url, config)
      .then((response) => {
        toast.success("Employee Delete Successfully");
        // setRefreshKey((prevKey) => prevKey + 1);
        // getListData(folderId);
        // handleClose();
      })
      .catch((error) => {
        toast.error(error?.response?.data?.err);
      });
  };

  // Task ThreeDot Popover
  const [anchorElTask, setAnchorElTask] = React.useState(null);

  const handleClickTask = (event) => {
    setAnchorElTask(event.currentTarget);
  };

  const handleCloseTask = () => {
    setAnchorElTask(null);
  };

  const openTaskPop = Boolean(anchorElTask);
  const id = openTaskPop ? "simple-popover" : undefined;

  //task Delete Modal
  const deleteModalTask = (taskid) => {
    handleCloseTask();
    swal({
      title: "Are you sure?",
      text: "are you sure you want to remove the Employee",
      icon: "warning",
      dangerMode: true,
      buttons: ["Cancel", "OK"],
    }).then((willDelete) => {
      if (willDelete) {
        handleDelete(taskid); // this is where your function will be called when OK is pressed
        swal("Deleted!", "Your Employee has been deleted!", "success");
      }
    });
  };

  const navigate = useNavigate();
  return (
    <>
      <Paper
        elevation={3}
        style={{
          boxShadow: "0px 0px 10px grey",
          padding: "16px",
          width: "60vw",
          marginLeft: "300px",
          marginTop: "50px",
          borderRadius: "20px",
        }}
      >
        <Button
          className="mb-4"
          size="lg"
          style={{
            backgroundColor: "#142A51",
            color: "white",
            width: "20%",
            marginLeft: "20px",
          }}
          onClick={() => navigate("/registra")}
        >
          Add Employee
        </Button>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ height: "90%" }}>Name</TableCell>
              <TableCell>DOB</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allEmployeeView?.map((item, index) => {
              const apiResponse = item.Description;
              const strippedText = stripHtmlTags(apiResponse);
              return (
                <TableRow key={index}>
                  <TableCell>
                    {item.FirstName} {item.LastName}
                  </TableCell>
                  <TableCell>{item.DOB}</TableCell>
                  <TableCell>{item.StartDate}</TableCell>
                  <TableCell>{item.EndDate}</TableCell>
                  <Box
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <TableCell
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ width: "90px" }}>{strippedText}</span>
                      <IconButton
                        style={{ width: "50px" }}
                        onClick={handleClickTask}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                  </Box>

                  <Popover
                    id={id}
                    open={openTaskPop}
                    anchorEl={anchorElTask}
                    onClose={handleCloseTask}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                  >
                    <Typography
                      style={{
                        padding: "15px  10px  15px 0px",
                      }}
                    >
                      <MenuItem
                        style={{
                          cursor: "pointer",
                        }}
                        onClick={() => navigate("/userview")}
                      >
                        <RemoveRedEyeIcon style={{ fontSize: "16px" }} />
                        <span
                          style={{
                            marginLeft: "10px",
                            fontSize: "14px",
                          }}
                        >
                          {" "}
                          View
                        </span>
                      </MenuItem>
                      <Divider />

                      <MenuItem
                        style={{
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          navigate("/registraupdate", {
                            state: { data: item },
                          })
                        }
                      >
                        <EditIcon
                          style={{ fontSize: "18px", color: "black" }}
                        />
                        <span
                          style={{
                            marginLeft: "10px",
                            fontSize: "16px",
                            color: "black",
                          }}
                        >
                          {" "}
                          Edit
                        </span>
                      </MenuItem>

                      <Divider />

                      <MenuItem
                        style={{
                          cursor: "pointer",
                        }}
                        onClick={() => deleteModalTask(item.id)}
                      >
                        <DeleteIcon
                          style={{
                            fontSize: "16px",
                            color: "red",
                          }}
                        />
                        <span
                          style={{
                            marginLeft: "10px",
                            fontSize: "14px",
                            color: "red",
                          }}
                        >
                          {" "}
                          Delete
                        </span>
                      </MenuItem>
                    </Typography>
                  </Popover>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
}

export default AllEmployeeView;
