import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const state = useSelector((state) => state);
  const { setupForms } = state;
  const [statePath, setStatePath] = useState([]);
  const token = JSON.parse(localStorage.getItem("token"));
  const [flag, setFlag] = useState(true);

  // useEffect(() => {
  //   let FormData = setupForms.routingData.response
  //   if (FormData !== undefined) {
  //     let count = FormData.length
  //     let a = []
  //     FormData.map(data => {
  //       for (let i = 0; i < count; i++) {
  //         if ("/NBA/" + data.path === rest.location.pathname) {
  //           setFlag(true)
  //           a.push(true);
  //         } else {
  //           a.push(false);
  //         }
  //       }
  //     })

  //     const found = a.find(element => element === true);
  //     if (found === true) {
  //       setFlag(true)
  //     } else {
  //       setFlag(false)
  //     }
  //   }
  // }, [rest])

  return (

    <Route
      {...rest}
      render={(props) => {
        return !token ? <Redirect to="/404" /> : flag ? <Component {...props} /> : <Redirect to="/404" />;

      }}
    />
  )

};
export default PrivateRoute;