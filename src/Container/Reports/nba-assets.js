import React, { useEffect, useState, useRef } from "react";
import { DownloadOutlined } from "@ant-design/icons";
import { Typography, Radio, Tooltip } from "antd";
import styles from "../../Container/Reports/Reports.module.css";
import {
  InputWithBtn,
  Table,
  GroupedButtons,
  Modal,
  TextField,
  SelectBox,
  Notification,
  Loader,
  FilterBar,
  StartToEndDate,
  Button,
  FormattedInputs,
} from "../../Components/Elements";
import {
  CardNumberFormatter,
  DateDisplayFormat,
  TimeAndDisplayFormat,
  DateSendingFormat,
  currentToOneYearBackDate,
  NumberFormater,
  CommaFormter,
} from "../../Common/Functions/date-formatter";
import { useDispatch, useSelector } from "react-redux";
import { NBACaseReport } from "./../../store/actions/reports_actions";
import { Row, Col } from "antd";

const NBAAssetsReports = () => {
  const { Title } = Typography;
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { reports } = state;
  const [open, setOpen] = useState({
    flag: false,
    message: "",
  });
  const [searchData, setSearchData] = useState({
    FromAmount: -1,
    ToAmount: -1,
    BorrowerName: "",
    MiSysCode: "",
    ECIBCode: "",
  });

  //From and To Dates
  const [clearDateSelect, setDateClearSelect] = useState("");
  const [State, setState] = useState({
    DateFrom: "",
    DateTo: "",
  });
  const setDate = (e, val) => {
    console.log(e.startDate);
    if (
      e.name &&
      e.name === "dater" &&
      e.startDate != null &&
      e.endDate != null
    ) {
      setState({
        ...State,
        DateFrom: DateSendingFormat(e.endDate),
        DateTo: DateSendingFormat(e.startDate),
      });
    } else {
      setState({
        ...State,
        DateFrom: "",
        DateTo: "",
      });
    }
  };

  //Search Handler
  function isNegative(num) {
    if (Math.sign(num) === -1) {
      return true;
    }

    return false;
  }

  const handleSearch = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name != "FromAmount" && name != "ToAmount" && name != "BorrowerName") {
      setSearchData({
        ...searchData,
        [name]: value,
      });
    } else if (
      name === "FromAmount" &&
      value != -1 &&
      value != "" &&
      name != "BorrowerName"
    ) {
      let newvalue = parseFloat(value);
      if (isNegative(newvalue)) {
        newvalue = newvalue * -1;
      }
      value = newvalue.toString();
      if (value % 1 != 0) {
        if (value.length <= 18) {
          console.log("value 444", name, value.length);
          setSearchData({
            ...searchData,
            [name]: parseFloat(value),
          });
        } else {
          value = value.slice(0, 18);
        }
      } else {
        if (value.length <= 15) {
          console.log("value 444", name, value.length);
          setSearchData({
            ...searchData,
            [name]: parseFloat(value),
          });
        } else {
          console.log("value 444", name, value.length);

          value = value.slice(0, 15);
          setSearchData({
            ...searchData,
            [name]: parseFloat(value),
          });
        }
      }
    } else if (
      name === "ToAmount" &&
      value != -1 &&
      value != "" &&
      name != "BorrowerName"
    ) {
      let newvalue = parseFloat(value);
      if (isNegative(newvalue)) {
        newvalue = newvalue * -1;
      }
      value = newvalue.toString();
      if (value % 1 != 0) {
        if (value.length <= 18) {
          console.log("value 444", name, value.length);
          setSearchData({
            ...searchData,
            [name]: parseFloat(value),
          });
        } else {
          value = value.slice(0, 18);
        }
      } else {
        if (value.length <= 15) {
          console.log("value 444", name, value.length);
          setSearchData({
            ...searchData,
            [name]: parseFloat(value),
          });
        } else {
          console.log("value 444", name, value.length);

          value = value.slice(0, 15);
          setSearchData({
            ...searchData,
            [name]: parseFloat(value),
          });
        }
      }
    } else if (name === "BorrowerName" && value != "") {
      var valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      if (!valueCheck == "") {
        setSearchData({
          ...searchData,
          [name]: valueCheck.trimStart(),
        });
      }
    } else if (name === "BorrowerName" && value === "") {
      setSearchData({
        ...searchData,
        [name]: "",
      });
    } else if (name === "FromAmount" && (value === "" || value === -1)) {
      setSearchData({
        ...searchData,
        [name]: -1,
      });
    } else if (name === "ToAmount" && (value === "" || value === -1)) {
      setSearchData({
        ...searchData,
        [name]: -1,
      });
    }
  };

  const resetHandler = () => {
    setSearchData({
      ...searchData,
      FromAmount: -1,
      ToAmount: -1,
      BorrowerName: "",
      MiSysCode: "",
      ECIBCode: "",
    });
    setState({
      ...state,
      DateFrom: "",
      DateTo: "",
    });
  };

  const downloadReport = () => {
    console.log("searchData", searchData, State);
    let data = {
      FromAmount: searchData.FromAmount,
      ToAmount: searchData.ToAmount,
      BorrowerName: searchData.BorrowerName,
      MiSysCode: searchData.MiSysCode,
      ECIBCode: searchData.ECIBCode,
      DateFrom: State.DateFrom,
      DateTo: State.DateTo,
    };
    console.log("data", data);
    if (
      parseInt(data.FromAmount) < parseInt(data.ToAmount) ||
      parseInt(data.FromAmount) === parseInt(data.ToAmount)
    ) {
      dispatch(NBACaseReport(data));
    } else {
      setOpen({
        flag: true,
        message: "From cannot be lesser than To Value",
      });
    }
    console.log("data", data)
    // dispatch(NBACaseReport(data));
  };

  return (
    <>
      <Title level={4}>Reports – Non-Banking Assets</Title>

      <Row gutter={[8, 8]}>
        <Col xl={6} lg={6} sm={24}>
          <FormattedInputs
            name={"FromAmount"}
            value={
              searchData.FromAmount === null || searchData.FromAmount === -1
                ? null
                : searchData.FromAmount
            }
            textLength={(999, 999, 999, 999, 999, 999, 999)}
            size="small"
            label={"Total Acquisition Value From"}
            fullWidth
            change={(e) => handleSearch(e)}
            autoComplete="off"
          />
        </Col>
        <Col xl={6} lg={6} sm={24}>
          <FormattedInputs
            name={"ToAmount"}
            value={
              searchData.ToAmount === null || searchData.ToAmount === -1
                ? null
                : searchData.ToAmount
            }
            textLength={(999, 999, 999, 999, 999, 999, 999)}
            size="small"
            label={"Total Acquisition Value To"}
            fullWidth
            change={(e) => handleSearch(e)}
            autoComplete="off"
          />
        </Col>
        <Col xl={6} lg={6} sm={24} className={styles["mysisCustomer"]}>
          <TextField
            fullWidth
            name={"MiSysCode"}
            label="Misys Customer Code"
            size="small"
            textLength={20}
            minLength={20}
            autoComplete="off"
            change={(e) => handleSearch(e)}
            value={searchData.MiSysCode}
          />
        </Col>
        <Col xl={6} lg={6} sm={24} className={styles["mysisCustomer"]}>
          <TextField
            fullWidth
            name={"ECIBCode"}
            label="ECIB Code"
            size="small"
            textLength={13}
            minLength={13}
            autoComplete="off"
            change={(e) => handleSearch(e)}
            value={searchData.ECIBCode}
          />
        </Col>
        <Col xl={6} lg={6} sm={24} className={styles["mysisCustomer"]}>
          <TextField
            fullWidth
            name={"BorrowerName"}
            label="Name of Borrower"
            size="small"
            textLength={50}
            autoComplete="off"
            change={(e) => handleSearch(e)}
            value={searchData.BorrowerName}
          />
        </Col>
        <Col xl={6} lg={6} sm={24}>
          <label>
            <b className={styles["font"]}>Date of Acquisition</b>
          </label>
          <StartToEndDate
            width="100%!important"
            size="large"
            change={setDate}
            key={clearDateSelect}
            startvalue={
              State.DateFrom != null && State.DateFrom != ""
                ? DateDisplayFormat(State.DateFrom)
                : null
            }
            endvalue={
              State.DateTo != null && State.DateFrom != ""
                ? DateDisplayFormat(State.DateTo)
                : null
            }
            DateRange={true}
          />
        </Col>
        <Col xl={6} lg={6} sm={24}></Col>
        <Col xl={6} lg={6} sm={24}></Col>
        <Col xl={8} lg={8} sm={24}></Col>
        <Col xl={4} lg={4} sm={24} align="right">
          <Button
            text="Download"
            icon={<DownloadOutlined />}
            applyClass="btnSecondarySolid2Search"
            size="small"
            click={downloadReport}
          />
        </Col>
        <Col xl={4} lg={4} sm={24}>
          <Button
            text="Reset"
            icon={<i className="icon-reset"></i>}
            applyClass="btnSecondarySolidReset"
            size="small"
            click={resetHandler}
          />
        </Col>
        <Col xl={8} lg={8} sm={24}></Col>
      </Row>
      {reports.isLoading ? <Loader /> : null}
      <Notification setOpen={setOpen} open={open.flag} message={open.message} />
    </>
  );
};

export default NBAAssetsReports;