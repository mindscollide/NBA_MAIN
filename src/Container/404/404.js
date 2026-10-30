import React from "react";
import styles from "./ErrorPage.module.css";

const NotFound = () => (
  <div className="user-select">
        <div classNanme="user-select-content-container NotFound-PAGE">
          <div 
          className={styles["ErrorHeight"]}
          // className="heading-main h-xl fw-bold " style={{
          //   textAlign: "center",
          //   marginTop: "100px"
          // }}
          >
              <p 
              className={styles["ErorPage_title"]}
              // className="p-0" style = {
              //   {fontSize: "44px",
              //   margin: "0",
              //   fontWeight: "bold"}}
                
                >Error 404</p>
              <p 
              className={styles["ErrorText"]}
              // className="p-0" style = {
              //   {fontSize: "21px",
              //   color: "#000"}}
                >This page could not be found</p>
          </div>
        </div>

    {/* <Link to="/">Go Home</Link> */}
  </div>
);

export default NotFound;
