import React, { useEffect } from "react";
import { Layout, Typography, Tooltip, Badge, Dropdown } from "antd";
import { BellOutlined } from "@ant-design/icons";
import UserImage from "../../../assets/images/user.png";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../../store/actions/auth-actions";
import {
  newRequestList,
  newRequestListCount,
} from "../../../store/actions/request-actions";
import Helper from "../../../Common/Functions/history_logout";
import "./header.css";
import { useNavigate } from "react-router";
import { disableGoBack } from "../../../store/actions/ui-actions";
import { makeTabAvtive } from "../../../store/actions/ui-actions";
const Header = ({ Notification, title, UserDetails }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const requestReducer = useSelector((state) => state.requestReducer);
  const ui = useSelector((state) => state.ui);
  const { Title } = Typography;
  const { Header } = Layout;
  const Details = JSON.parse(localStorage.getItem("UserDetails"));
  // Bell dropdown (System Admin): new user sign-up requests.
  const notificationItems = [
    {
      key: "requests",
      label: (
        <span>
          <i className="icon-chevron-right color-black icon-s mr-2"></i>
          {requestReducer.userRequestCount} New User Requests
        </span>
      ),
      onClick: () => {
        dispatch(newRequestList(Details.userID));
        dispatch(makeTabAvtive());
        navigate("/NBA/Admin/NewRequestList");
      },
    },
  ];
  Helper.navigate = navigate;
  useEffect(() => {
    Helper.navigate = navigate;
  }, []);
  useEffect(() => {
    // define increment counter part
    const tabsOpen = localStorage.getItem("tabsOpen");
    if (tabsOpen == null) {
      localStorage.setItem("tabsOpen", 1);
    } else {
      localStorage.setItem("tabsOpen", parseInt(tabsOpen) + parseInt(1));
    }

    // the decrement counter part is the "pagehide" listener in index.html
    if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
      window.localStorage.isMySessionActive = "false";
    } else {
      const newTabCount2 = localStorage.getItem("tabsOpen");
      let value = localStorage.getItem("isMySessionActive");
      if (value == "true") {
        if (newTabCount2 - 1 == 0) {
          dispatch(signOut(navigate));
          window.localStorage.isMySessionActive = "false";
        } else {
          window.localStorage.isMySessionActive = "false";
        }
      }
    }
  }, []);
  // call user request list and user list count on refresh on reloaded
  useEffect(() => {
    if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
      let UserDetails = JSON.parse(localStorage.getItem("UserDetails"));
      let data = UserDetails.userID;
      dispatch(newRequestListCount(data));
      dispatch(newRequestList(data));
    }
  }, []);
  return (
    <Header className="header">
      <div className="inner-container">
        <div className="heading-main-container">
          <Title level={3} className="heading-main">
            {title}
          </Title>
        </div>
        {/* its go back button  */}
        {ui.isGoBack && (
          <Tooltip placement="bottom" title="Back">
            <div className="logout-icon-section">
              <div
                className="header-icon-card"
                onClick={() => {
                  window.history.back();
                  dispatch(disableGoBack());
                }}
              >
                <i className="icon-arrow-left icon-size-one "></i>
              </div>
            </div>
          </Tooltip>
        )}
        {/* its notification icon */}
        {Notification !== null && Notification === true ? (
          <Tooltip placement="bottom" title="Notification">
            <div className="notify">
              <Dropdown
                menu={{ items: notificationItems }}
                trigger={["click"]}
                placement="bottomRight"
              >
                <span className="noti-icon">
                  <Badge count={requestReducer.userRequestCount} offset={[-2, 8]}>
                    <span className="header-icon-card">
                      <BellOutlined />
                    </span>
                  </Badge>
                </span>
              </Dropdown>
            </div>
          </Tooltip>
        ) : null}
        {/* its logout button */}
        <Tooltip placement="bottom" title="Logout">
          <div className="logout-icon-section">
            <div
              className="header-icon-card"
              onClick={() => dispatch(signOut(navigate))}
            >
              <i className="icon-login icon-size-one "></i>
            </div>
          </div>
        </Tooltip>
        {/* its avatar */}
        <div className="action-container">
          <div className="avatar">
            <div className="user-name">
              <p>
                {Details.firstName ? Details.firstName : null}{" "}
                {Details.lastName ? Details.lastName : null}
              </p>
            </div>
            <div className="user-figure">
              <img src={UserImage} alt="user" className={"user-icon-header"} />
            </div>
          </div>
        </div>
      </div>
    </Header>
  );
};

export default Header;
