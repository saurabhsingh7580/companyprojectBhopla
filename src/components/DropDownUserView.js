import React, { useState, useEffect } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment } from "@mui/material";
import { MDBCol, MDBRow } from "mdb-react-ui-kit";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
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
import "../App.css";
import axios from "axios";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

export default function MultipleSelectCheckmarks() {
  const [personName, setPersonName] = React.useState([]);
  const [searchText, setSearchText] = React.useState("");
  const [allEmployeeView, setAllEmployeeView] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const filteredNames = allEmployeeView.filter((name) =>
    name.FirstName.toLowerCase().includes(searchText.toLowerCase())
  );

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
  const navigate = useNavigate();
  return (
    <div>
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
        <ArrowBackIosIcon
          style={{ marginRight: "120px", width: "20px" }}
          onClick={() => navigate("/")}
        />
        <MDBRow style={{ marginTop: "50px" }}>
          <MDBCol md="6">
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-checkbox-label">
                Select employee
              </InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={personName}
                onChange={handleChange}
                input={<OutlinedInput label="Select employee" />}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
              >
                <OutlinedInput
                  id="search"
                  placeholder="Search"
                  value={searchText}
                  fullWidth
                  onChange={(e) => setSearchText(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  }
                  style={{ backgroundColor: "#142A51", color: "white" }}
                />
                {filteredNames.map((name) => (
                  <MenuItem
                    key={name.id}
                    value={name.FirstName}
                    style={{ backgroundColor: "#142A51", color: "white" }}
                  >
                    <Checkbox checked={personName.indexOf(name.id) > -1} />
                    <ListItemText primary={name.FirstName} />
                  </MenuItem>
                ))}
              </Select>
              <div>Selected Users: {personName.length}</div>
            </FormControl>
          </MDBCol>
          <MDBCol md="6">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Basic date picker"
                  renderInput={(props) => (
                    <div
                      style={{ backgroundColor: "#142A51", padding: "16px" }}
                    >
                      <input
                        {...props}
                        style={{
                          color: "white", // Text color
                          backgroundColor: "red", // Input field background
                        }}
                      />
                    </div>
                  )}
                  PopoverProps={{
                    className: "custom-date-picker-popover", // Add a custom class name
                    style: {
                      backgroundColor: "green", // Pop-up window background color
                      // Other styles for the pop-up window
                    },
                  }}
                  className="custom-date-picker" // Add a custom class name
                />
              </DemoContainer>
            </LocalizationProvider>
          </MDBCol>
        </MDBRow>
      </Paper>
    </div>
  );
}
