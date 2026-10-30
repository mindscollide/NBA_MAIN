import React, { useState, useEffect } from "react";
import { Grid, Box, Container } from "@material-ui/core";
import { Typography } from "antd";
import {
  saveUserRequest,
  newRequestList,
} from "./../../../../store/actions/request-actions";
import styles from "../../../Authentication/SignUp/style.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  Paper,
  Button,
  Loader,
  TextField,
  Notification,
} from "../../../../Components/Elements";
import RequestListTemplate from "./request-list-template";
import { ControlOutlined } from "@ant-design/icons";

const NewRequestList = () => {
  const { Title, Text } = Typography;
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { wofApprovals, requestReducer, ui } = state;
  const [userRequestDetails, setUserRequestDetails] = useState(
    requestReducer.UserRequestDetails
  );
  const [btndisplay, setBtnDisplay] = useState(true);
  const Approved = 6;
  const Rejected = 7;
  const [comment, setComment] = useState("");
  const Comments = (e) => {
    let value = e.target.value;
    setComment(value);
    if (value.length > 0) {
      setBtnDisplay(false);
    } else {
      setBtnDisplay(true);
    }
  };
  const [open, setOpen] = useState({
    flag: false,
    message: "",
  });

  const goToSaveHandler = (data, Status) => {
    let UserDetails = JSON.parse(localStorage.getItem("UserDetails"));
    let UserID = UserDetails.userID;
    let comments = comment;
    setComment("");
    setBtnDisplay(true);
    console.log(data, Status, comments);
    dispatch(saveUserRequest(data, Status, comments, UserID));
  };
  useEffect(() => {
    let UserDetails = JSON.parse(localStorage.getItem("UserDetails"));
    let userid = UserDetails.userID;
    dispatch(newRequestList(userid));
  }, []);
  useEffect(() => {
    console.log("newRequestList", requestReducer.UserRequestDetails);
    setUserRequestDetails(requestReducer.UserRequestDetails);
    setComment("");
  }, [requestReducer.UserRequestDetails]);
  // for notifications for Save or Reject
  useEffect(() => {
    setUserRequestDetails(requestReducer.UserRequestDetails);
    if (requestReducer.ResponseMessage === "Save Successfully") {
      setOpen({
        ...open,
        flag: true,
        message: "Record saved",
      });
      setComment("");
      console.log("noti change", open.flag);
    }
    setComment("");
  }, [requestReducer.ResponseMessage]);
  useEffect(() => {}, [comment]);

  return (
    <>
      <Container maxWidth="lg">
        {userRequestDetails != null && userRequestDetails.length > 0 ? (
          <>
            <Title level={3}>
              <div className="NotificationTitle">Pending Signup Requests</div>
            </Title>
            <Grid container spacing={1}>
              <Grid item lg={12} md={12} sm={12}>
                <Title level={5}>
                  <div className="NotificationDescription">
                    Below are the pending Sign Up requests for your approval
                  </div>
                </Title>
              </Grid>
            </Grid>
            {userRequestDetails.map((item, index) => (
              <RequestListTemplate
                data={{
                  item: item,
                  index: index,
                }}
                key={index}
              />
            ))}
          </>
        ) : (
          <>
            <Title level={3}>
              <div className="NotificationTitle">Pending Signup Requests</div>
            </Title>
            <Grid container spacing={1}>
              <Grid item lg={12} md={12} sm={12}>
                <Title level={5}>
                  <div className="NotificationDescription">
                    You do not have any Pending Signup Request
                  </div>
                </Title>
              </Grid>
            </Grid>
          </>
        )}
        <Notification
          setOpen={setOpen}
          open={open.flag}
          message={open.message}
        />
        {requestReducer.Loading ? <Loader /> : null}
      </Container>
    </>
  );
};
export default NewRequestList;