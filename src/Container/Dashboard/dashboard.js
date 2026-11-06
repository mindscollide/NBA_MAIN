import React, { useState, useEffect } from "react";
import { Header, Sidebar, Main } from "../../Components/Layout";
import { Notification, Message } from "../../Components/Elements";
import { Layout } from "antd";
import { UserSelection, } from "../../Routes/routingData";
import { Loader } from "../../Components/Elements";
import { useSelector ,useDispatch} from "react-redux";
import {SomeThingWentWrongRemove} from '../../store/actions/ui-actions'
import { useNavigate } from "react-router";
import Helper from "../../Common/Functions/history_logout";
import styles from "./dashboard.module.css";
const Dashboard = () => {
  const state = useSelector((state) => state);
  const navigate = useNavigate();
  Helper.navigate = navigate;
  const {
    auth,
    ui
  } = state;
  const dispatch = useDispatch();
  const { Content } = Layout;
  const [load, setLoad] = useState(false);
  const [open, setOpen] = useState({
    open:false,
    message:''
  });
 
  // code to set loader on api calls, just add the chunk of state in "if" and "else" block and also as dependency:

  useEffect(() => {
    if (ui.SomeThingWentWrong===true) {
      setOpen({
        ...open,
        open:true,
        message:"Unable to connect to server please check your connection or contact support"
      });
      dispatch(SomeThingWentWrongRemove())
    }
  }, [ui.SomeThingWentWrong]);

  useEffect(() => {
    if (auth.isLoggedIn===true) {
      setOpen({
        ...open,
        open:true,
        message:"Login Successfully"
      });
    }
  }, [auth.isLoggedIn]);

  const token = JSON.parse(localStorage.getItem("token"));
  const UserDetails = JSON.parse(localStorage.getItem("UserDetails")); 
  const role = parseInt(JSON.parse(localStorage.getItem("role")));
  const [AppContent, setAppContent] = useState(UserSelection(token, role));
  return  (
    <>
        <Layout>
          <Header
            title={"Non-Banking Assets & Debt Property Swap"}
            UserDetails={UserDetails}
            Notification ={AppContent.Notification}
          />
          <Content
          className={styles["maincontainer"]} 
          // style={Style.MainContainer}
          >
            <Layout>
              <Sidebar Links={AppContent.SidebarData}  ui={ui} />
              <Main
                routingData={AppContent.MainMenu}
                role={AppContent.UserRoleId}
              />
            </Layout>
          </Content>
          <Notification setOpen={setOpen} open={open.open} message={open.message} />
        </Layout>
        {load?<Loader/>:null}
      </>
  )
  
};

// const Style = {
//   MainContainer: {
//     position: "relative",
//     marginTop: "30px",
//     paddingLeft: `230px`,
//   },
// };

export default Dashboard;
