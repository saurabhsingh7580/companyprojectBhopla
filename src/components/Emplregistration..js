import React, { useState, useEffect } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBSelect,
  MDBRadio,
} from "mdb-react-ui-kit";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "../App.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Box, Button, IconButton } from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import AllEmployeeView from "./AllEmployeeView";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";

function Emplregistration() {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const [value, setValue] = useState("");
  const [dobDate, setDobDate] = useState(null); // State to store the selected date
  const handleDateChangeDob = (date) => {
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    setDobDate(formattedDate); // Update the state with the selected date
  };
  const [startDate, setStartDate] = useState(null); // State to store the selected date
  const handleDateChangeStart = (date) => {
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    setStartDate(formattedDate); // Update the state with the selected date
  };
  const [endDate, setEndDate] = useState(null); // State to store the selected date
  const handleDateChangeEnd = (date) => {
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    setEndDate(formattedDate); // Update the state with the selected date
  };

  const resetAllState = () => {
    setFormData("");
    setDobDate("");
    setAge("");
    setStartDate("");
    setEndDate("");
    setValue("");
  };

  const [formData, setFormData] = useState({
    name: "",
    surName: "",
    currentSalary: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("FirstName", formData.name);
    data.append("LastName", formData.surName);
    data.append("CurrentSalary", formData.currentSalary);
    data.append("Study  ", age);
    data.append("StartDate", startDate);
    data.append("EndDate", endDate);
    data.append("DOB", dobDate);
    data.append("Description", value);
    try {
      const url = " https://sweede.app/DeliveryBoy/Add-Employee/";

      const config = {
        "Content-Type": "application/json",
      };
      const response = await axios.post(url, data, config);
      navigate("/")

      resetAllState();
      //   localStorage.setItem("Userlogintoken", response.data.token);
      //   setCookie("Userlogintoken", response.data.token);
      toast.success("Employee Successfully Registration ");
    } catch (error) {
      if (error.response) {
        // Uncomment these to show errors
        toast.error(error.response.data.err);
        for (const field in error.response.data.error) {
          const messages = error.response.data.error[field];
          messages.forEach((message) => {
            toast.error(`${field}: ${message}`, {
              //   position: toast.POSITION.TOP_CENTER,
              autoClose: 5000, // Close after 5 seconds (adjust as needed)
            });
          });
        }
      } else if (error.request) {
        // toast.error(error.request);
      } else {
        toast.error(error?.response?.data?.err);
      }
      // toast.error(error.config);
    }
  };
  const navigate = useNavigate();
  return (
    <MDBContainer style={{ width: "60vw" }}>
      <MDBRow className="justify-content-center align-items-center m-5">
        <MDBCard>
          <MDBCardBody>
            <ArrowBackIosIcon
              style={{ marginRight: "120px", width: "20px" }}
              onClick={() => navigate("/")}
            />
            <span
              className="fw-bold mb-4 pb-2 pb-md-0 mb-md-5"
              style={{ marginLeft: "70px", height: "20px", fontSize: "20px" }}
            >
              Employee Registration Form
            </span>

            <MDBRow style={{ marginTop: "50px" }}>
              <MDBCol md="6">
                <MDBInput
                  wrapperClass="mb-4"
                  label="First Name"
                  size="lg"
                  id="form1"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleOnChange}
                />
              </MDBCol>

              <MDBCol md="6">
                <MDBInput
                  wrapperClass="mb-4"
                  label="Last Name"
                  size="lg"
                  id="form2"
                  name="surName"
                  value={formData.surName}
                  onChange={handleOnChange}
                  type="text"
                />
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol md="12">
                <div style={{ marginBottom: "20px" }}>
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    style={{ width: "100vw" }}
                    className="MuiStack-root css-4jnixx-MuiStack-root"
                  >
                    <DemoContainer
                      components={["DatePicker"]}
                      className="custom-datepicker"
                      fullWidth
                    >
                      <DatePicker
                        value={dobDate} // Bind the value to the state
                        onChange={handleDateChangeDob}
                        label="DOB Date"
                        // style={{ width: "100%", marginTop: "-20px" }} // Set the width here
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
              </MDBCol>
            </MDBRow>

            <MDBRow>
              <MDBCol md="12">
                <FormControl sx={{ minWidth: 180 }} size="lg" fullWidth>
                  <InputLabel id="demo-select-small-label">Study</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={age}
                    label="Age"
                    onChange={handleChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"BA"}>BA</MenuItem>
                    <MenuItem value={"BSC"}>BSC</MenuItem>
                    <MenuItem value={"BCOM"}>BCOM</MenuItem>
                  </Select>
                </FormControl>
              </MDBCol>
            </MDBRow>

            <MDBRow>
              <MDBCol md="6">
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  style={{ width: "100vw" }}
                  className="MuiStack-root css-4jnixx-MuiStack-root"
                >
                  <DemoContainer
                    components={["DatePicker"]}
                    className="custom-datepicker"
                    fullWidth
                  >
                    <DatePicker
                      label="Start Date"
                      value={startDate} // Bind the value to the state
                      onChange={handleDateChangeStart}
                      // style={{ width: "100%", marginTop: "-20px" }} // Set the width here
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </MDBCol>

              <MDBCol md="6" className="mb-4">
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  style={{ width: "100vw" }}
                  className="MuiStack-root css-4jnixx-MuiStack-root"
                >
                  <DemoContainer
                    components={["DatePicker"]}
                    className="custom-datepicker"
                    fullWidth
                  >
                    <DatePicker
                      label="End Date"
                      value={endDate} // Bind the value to the state
                      onChange={handleDateChangeEnd}
                      // Handle date change
                      // style={{ width: "100%", marginTop: "-20px" }} // Set the width here
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </MDBCol>
            </MDBRow>

            <MDBRow>
              <MDBCol md="12">
                <MDBInput
                  wrapperClass="mb-4"
                  label="Current Salary"
                  size="lg"
                  id="form4"
                  type="number"
                  style={{ border: "none" }}
                  name="currentSalary"
                  value={formData.currentSalary}
                  onChange={handleOnChange}
                />
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol md="12">
                <Box
                  className="scrollbar"
                  style={{
                    width: "100%",
                    height: "100px",
                  }}
                >
                  <ReactQuill theme="snow" value={value} onChange={setValue} />
                </Box>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol md="6">
                <Button
                  className="mb-4"
                  size="lg"
                  style={{
                    backgroundColor: "#E3E3E3",
                    color: "#142A51",
                    width: "90%",
                  }}
                >
                  Cancle
                </Button>
              </MDBCol>
              <MDBCol md="6">
                <Button
                  className="mb-4"
                  size="lg"
                  style={{
                    backgroundColor: "#142A51",
                    color: "white",
                    width: "90%",
                    marginLeft: "20px",
                  }}
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </MDBRow>
      <div></div>
    </MDBContainer>
  );
}

export default Emplregistration;
