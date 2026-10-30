import React, { useRef, useState, useEffect } from "react";
import styles from "./style.module.css";
import { Input, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Button, Loader, Notification } from "../../../Components/Elements";
import { useNavigate, Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  signIn,
  signupREsponseMessageCleare,
} from "../../../store/actions/auth-actions";
import Helper from "../../../Common/Functions/history_logout";
import { clearestateBackbutton } from "./../../../store/actions/auth-actions";
import { Row, Col } from "antd";
import MaxWidthContainer from "../../../Components/Elements/MaxWidthContainer/max-width-container";
const Login = () => {
  const state = useSelector((state) => state);
  const UserIDInput = useRef(null);
  const dispatch = useDispatch();
  const { auth, ui } = state;
  const { Title } = Typography;
  const navigate = useNavigate();
  Helper.navigate = navigate;
  const [credentials, setCredentials] = useState({
    UserName: "",
    Password: "",
    fakePassword: "",
  });
  const [open, setOpen] = useState({
    open: false,
    message: "",
  });
  const setCredentialHandler = (e) => {
    if (e.target.name === "Password") {
      let numChars = e.target.value;
      let showText = "";
      for (let i = 0; i < numChars.length; i++) {
        showText += "•";
      }
      setCredentials({
        ...credentials,
        [e.target.name]: e.target.value,
        ["fakePassword"]: showText,
      });
    } else {
      setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
  };

  const validateHandler = (e) => {
    e.preventDefault();
    if (credentials.UserName != "" && credentials.Password != "") {
      dispatch(signIn(credentials, navigate));
    } else {
      setOpen({
        ...open,
        open: true,
        message: "Please Enter All Credentials",
      });
    }
  };


  useEffect(() => {
    Helper.navigate = navigate;
    document.body.className = "login-page";
    return () => {
      document.body.className = "";
    };
  }, [credentials]);
  useEffect(() => {
    console.log(ui.SomeThingWentWrong);
    if (ui.SomeThingWentWrong === true) {
      setOpen({
        ...open,
        open: true,
        message:
          "Unable to connect to server please check your connection or contact support",
      });
    }
  }, [ui.SomeThingWentWrong]);
  useEffect(() => {
    dispatch(clearestateBackbutton());
  }, []);

  // for notifications for signup
  useEffect(() => {
    console.log("notifications", auth.signUpResponseMessage);
    if (auth.signUpResponseMessage !== "") {
      console.log("notifications 2", auth.signUpResponseMessage);

      setOpen({
        ...open,
        open: true,
        message: auth.signUpResponseMessage,
      });
      // setTimeout(() => {
      //   setOpen({
      //     ...open,
      //     open: false,
      //     message: "",
      //   });
      // }, 10000);
      // dispatch(signupREsponseMessageCleare())
    }
  }, [auth.signUpResponseMessage]);

  useEffect(() => {}, [auth.ResponseMessage]);
  useEffect(() => {
    if (UserIDInput.current) {
      UserIDInput.current.focus();
    }
  }, [UserIDInput]);
  useEffect(() => {
    // console.log(ui.SessionExpeireResponseMessage);
    if (
      auth.SessionExpeireResponseMessage !== "" &&
      auth.SessionExpeireResponseMessage !== undefined
    ) {
      console.log("hi", ui.SessionExpeireResponseMessage);
      setOpen({
        ...open,
        open: true,
        message: auth.SessionExpeireResponseMessage,
      });
    }
    // else{
    //   setOpen({
    //     ...open,
    //     open: false,
    //     message:"",
    //   });
    // }
  }, [auth.SessionExpeireResponseMessage]);

  const [readOnly, setReadOnly] = useState(true);

  return (
    <MaxWidthContainer>
      <form onSubmit={(e) => validateHandler(e)} autoComplete="disabled">
        <div className={styles["loginBox"]}>
          {/* MUI Grid containers were width:100% (plus the gutter); a Row in this
              flex box would otherwise shrink to its content. */}
          <Row gutter={[40, 40]} style={{ width: "calc(100% + 40px)" }}>
            <Col xl={12} lg={12} sm={24}></Col>
            <Col xl={12} lg={12} sm={24} align="right">
              <div className={styles.loginBody}>
                <Title
                  level={3}
                  className={styles["loginTitle"]}
                >
                  Non-Banking Assets
                </Title>
                <div className={styles["M-Top"]} />
                <Title level={5} className={styles["userid"]}>
                  User ID
                </Title>
                <Input
                  name="UserName"
                  size="large"
                  placeholder="User ID"
                  prefix={<UserOutlined />}
                  onChange={setCredentialHandler}
                  value={credentials.UserName}
                  ref={UserIDInput}
                  autoComplete="disabled"
                  readOnly={readOnly}
                  onFocus={() => setReadOnly(false)}
                  onBlur={() => setReadOnly(true)}
                />
                <div className={styles["M-Top"]}  />
                <Title level={5} className={styles["userid"]}>
                  Password
                </Title>
                <Input
                  // type="password"
                  name="Password"
                  size="large"
                  placeholder="password"
                  onChange={setCredentialHandler}
                  // value={credentials.Password}
                  // autoComplete="new-password"
                  // style={{ webkitTextSecurity: "disc" }}
                  // type="text"
                  // value={credentials.fakePassword}
                  autoComplete="off"
                  className={styles["websecurity"]}
                  // style={{
                  //   webkitTextSecurity: "disc",
                  // }}
                  type="text"
                />

                {!auth.isLoggedIn && auth.ResponseMessage !== "" ? (
                  <div align="center">
                    <div className={styles.error + " " + styles.fade}>
                      {auth.ResponseMessage}
                    </div>
                  </div>
                ) : null}

                <div className={styles["loginbtnbox"]} />
                <div align="center" style={{ display: "flex", justifyContent: "space-evenly" }}>
                  <Button
                    applyClass="btnBorderStyled"
                    text="Login"
                    endIcon={<i className="icon-login icon-size-one"></i>}
                    type="submit"
                  />
                  <Link to="/Signup">
                    <Button
                      applyClass="btnBorderStyledRedSignup"
                      text="SIGN UP"
                    />
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </form>
      <Notification setOpen={setOpen} open={open.open} message={open.message} />
      {auth.Loading ? <Loader /> : null}
    </MaxWidthContainer>
  );
};

export default Login;
