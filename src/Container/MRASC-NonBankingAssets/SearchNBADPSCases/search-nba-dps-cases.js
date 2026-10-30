import React, { useEffect, useState, useRef } from "react";

import { Grid, Box } from "@material-ui/core";

import { Typography, Radio, Tooltip } from "antd";

import { useDispatch, useSelector } from "react-redux";

import Search from "@material-ui/icons/Search";

import {
  CardNumberFormatter,
  DateDisplayFormat,
  TimeAndDisplayFormat,
  DateSendingFormat,
  currentToOneYearBackDate,
  NumberFormater,
  CommaFormter,
} from "../../../Common/Functions/date-formatter";

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
} from "../../../Components/Elements";
import {
  HideNotification,
  ResetNBACase,
  SearchNBACase,
  ViewREMTeamData,
} from "../../../store/actions/nonbanking-assets-actions";
import styles from "../MRASC.module.css";
import { GetAllPropertyType } from "../../../store/actions/setup-forms-actions";
import { useNavigate } from "react-router";
import { enableGoBack, disableGoBack } from "../../../store/actions/ui-actions";

const SearchNBADPSCasesMRASC = () => {
  const navigate = useNavigate();
  const { Title } = Typography;
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { nonBankingAssets } = state;
  const [clearDateSelect, setDateClearSelect] = useState("");
  const [State, setState] = useState({
    FromDate: "",
    ToDate: "",
  });

  const [StateForReset, setStateForReset] = useState({
    FromDate: "",
    ToDate: "",
  });

  const [open, setOpen] = useState({
    flag: false,
    message: "",
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
        FromDate: DateSendingFormat(e.endDate),
        ToDate: DateSendingFormat(e.startDate),
      });
    } else {
      setState({
        ...State,
        FromDate: "",
        ToDate: "",
      });
    }
  };

  const [searchData, setSearchData] = useState({
    MiSysCode: "",
    ReferenceNumber: "",
    DPSTransactionAmount: -1,
  });

  const [searchDataForReset, setSearchDataForReset] = useState({
    MiSysCode: "",
    ReferenceNumber: "",
    DPSTransactionAmount: -1,
  });

  const handleSearchData = () => {
    console.log("searchData", searchData, State);
    dispatch(SearchNBACase(searchData, State));
  };

  const resetData = () => {
    setSearchData({
      ...searchData,
      MiSysCode: "",
      ReferenceNumber: "",
      DPSTransactionAmount: -1,
    });
    setState({
      ...State,
      FromDate: "",
      ToDate: "",
    });
    setSearchDataForReset({
      ...searchDataForReset,
      MiSysCode: "",
      ReferenceNumber: "",
      DPSTransactionAmount: -1,
    });
    setStateForReset({
      ...StateForReset,
      FromDate: "",
      ToDate: "",
    });
    dispatch(SearchNBACase(searchDataForReset, StateForReset));
  };


  function isNegative(num) {
    if (Math.sign(num) === -1) {
      return true;
    }

    return false;
  }

  const handleSearch = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name != "DPSTransactionAmount" && name != "ReferenceNumber") {
      setSearchData({
        ...searchData,
        [name]: value,
      });
    } else if (
      name === "DPSTransactionAmount" &&
      value != -1 &&
      value != "" &&
      name != "ReferenceNumber"
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
    } else if (name === "ReferenceNumber" && value != "") {
      var valueCheck = value.replace(/[^\d-]/g, "");
      if (!valueCheck == "") {
        setSearchData({
          ...searchData,
          [name]: valueCheck.trimStart(),
        });
      }
    } else if (name === "ReferenceNumber" && value === "") {
      setSearchData({
        ...searchData,
        [name]: "",
      });
    } else if (
      name === "DPSTransactionAmount" &&
      (value === "" || value === -1)
    ) {
      setSearchData({
        ...searchData,
        [name]: -1,
      });
    }
  };
  // for View
  const View = async (e, value) => {
    let Data = {
      NBACaseID: value.nbaCaseID,
    };
    await dispatch(GetAllPropertyType());
    await dispatch(ViewREMTeamData(Data));
    await dispatch(enableGoBack());
    console.log("ViewREMTeamData", value, Data);
    navigate("/NBA/ManagerRASC/ViewNonBankingAssets");
  };
  const columns = [
    {
      title: "Reference Number",
      dataIndex: "referenceNumber",
      key: "referenceNumber",
      align: "center",
      width: "300px",
      render: (text, record, index) => (
        <Tooltip title="View" color={"Black"}>
          <i
            // style={{ cursor: "pointer", color: "blue" }}
            className={styles["Viewcursor"]}
            onClick={(e) => View(e, record)}
          >
            {text}
          </i>
        </Tooltip>
      ),
    },
    {
      title: "Misys Code",
      dataIndex: "miSysCode",
      key: "miSysCode",
      align: "center",
      width: "300px",
    },
    {
      title: "Property Name",
      dataIndex: "propertyName",
      key: "propertyName",
      align: "center",
      width: "300px",
    },
    {
      title: "DPS Transaction Amount",
      dataIndex: "dpsTransactionAmount",
      key: "dpsTransactionAmount",
      align: "center",
      width: "300px",
      render: (text) => CommaFormter(text),
    },
    {
      title: "Date of Acquisition",
      dataIndex: "dateOfAcquisition",
      key: "dateOfAcquisition",
      align: "center",
      width: "300px",
      render: (text) => text,
    },
    {
      title: "Approval Authority",
      dataIndex: "approvalAuthority",
      key: "approvalAuthority",
      align: "center",
      width: "300px",
    },
    {
      title: "Average Market Value",
      dataIndex: "averageMarketValue",
      key: "averageMarketValue",
      align: "center",
      width: "300px",
      render: (text) => CommaFormter(text),
    },
    {
      title: "Average Forced Sale Value",
      dataIndex: "averageForcedSaleValue",
      key: "averageForcedSaleValue",
      align: "center",
      width: "300px",
      render: (text) => CommaFormter(text),
    },
    
    {
      title: "Status",
      dataIndex: "nbaCaseStatus",
      key: "nbaCaseStatus",
      align: "center",
      width: "400px",
      render: (text) => {
        if (text === 1) {
          return "In Process - Business Team";
        } else if (text === 2) {
          return "Pending For Approval - Business Team";
        } else if (text === 3) {
          return "Approved - Business Team";
        } else if (text === 4) {
          return "Reverted - Manager Business Team";
        } else if (text === 5) {
          return "In Process - Real Estate Management Team";
        } else if (text === 6) {
          return "Pending Approval - Real Estate Management Team";
        } else if (text === 7) {
          return "Approved - Real Estate Management Team";
        } else if (text === 8) {
          return "Reverted - Data Entry Real Estate Management Team";
        } else if (text === 9) {
          return "Reverted - Manager Real Estate Management Team";
        } else if (text === 10) {
          return "In Process - RASC Team";
        } else if (text === 11) {
          return "Pending Approval - RASC Team";
        } else if (text === 12) {
          return "Approved - RASC Team";
        } else if (text === 13) {
          return "Reverted - Data Entry RASC Team";
        } else if (text === 14) {
          return "Reverted - Manager RASC Team";
        } else if (text === 15) {
          return "Rejected";
        } else if (text === 16) {
          return "Active";
        } else if (text === 17) {
          return "In-Active";
        } else if (text === 18) {
          return "Rejected - Manager Business Team";
        } else if (text === 19) {
          return "Rejected - Manager REM Team";
        } else if (text === 20) {
          return "Rejected - Manager RASC Team";
        }
      },
    },
    {
      title: "Created By",
      dataIndex: "createdByUser",
      key: "createdByUser",
      align: "center",
      width: "400px",
    },
    {
      title: "Email Address",
      dataIndex: "email",
      key: "email",
      align: "center",
      width: "300px",
    },
  ];

  //Loader Notification
  useEffect(() => {
    if (nonBankingAssets.ShowNotification) {
      setOpen({
        flag: true,
        message: nonBankingAssets.Message,
      });
      dispatch(HideNotification());
    }
  }, [nonBankingAssets.ShowNotification]);

  useEffect(() => {
    if (nonBankingAssets.ShowNotification) {
      setOpen({
        flag: true,
        message: nonBankingAssets.Message,
      });
      dispatch(HideNotification());
    }
    console.log("Loader", nonBankingAssets.Loading);
  }, [nonBankingAssets.Loading]);

  useEffect(() => {
    if (nonBankingAssets.ResponseMessage === "Record Found") {
      console.log("RefrenceNumber calllll", nonBankingAssets);
      setOpen({
        flag: true,
        message: nonBankingAssets.ResponseMessage,
      });
      dispatch(HideNotification());
    } else {
      setOpen({
        flag: true,
        message: nonBankingAssets.ResponseMessage,
      });
      dispatch(HideNotification());
    }
  }, [nonBankingAssets.ResponseMessage]);

  console.log("Loader", nonBankingAssets);

  useEffect(() => {}, [nonBankingAssets.SearchNBACaseData]);

  useEffect(() => {
    dispatch(ResetNBACase());
    dispatch(disableGoBack());
    localStorage.removeItem("NBACaseID");
  }, []);

  return (
    <>
      <Title level={4}>Search NBA & DPS Cases</Title>
      <>
        <Grid container spacing={2}>
          <Grid item lg={3} md={3} sm={12} >
          <label>
              <b className={styles["MRASCSearchNbaFonts"]}>Misys Code</b>
            </label>
            <TextField
              name={"MiSysCode"}
              fullWidth
              placeholder={"Misys Code"}
              // label="Misys Code"
              size="small"
              value={searchData.MiSysCode}
              change={(e) => handleSearch(e)}
              max={14}
              textLength={14}
              autoComplete="off"
            />
          </Grid>
          <Grid item lg={3} md={3} sm={12} >
          <label>
              <b className={styles["MRASCSearchNbaFonts"]}>Reference Number</b>
            </label>
            <TextField
              name={"ReferenceNumber"}
              fullWidth
              // label="Reference Number"
              placeholder={"Reference Number"}
              size="small"
              value={searchData.ReferenceNumber}
              change={(e) => handleSearch(e)}
              max={14}
              textLength={14}
              autoComplete="off"
            />
          </Grid>
          <Grid item lg={3} md={3} sm={12}>
            <FormattedInputs
              name={"DPSTransactionAmount"}
              placeholder={"DPS Transaction Amount"}
              value={
                searchData.DPSTransactionAmount === null ||
                searchData.DPSTransactionAmount === -1
                  ? null
                  : searchData.DPSTransactionAmount
              }
              textLength={(999, 999, 999, 999, 999, 999, 999)}
              size="small"
              label={"DPS Transaction Amount"}
              fullWidth
              change={(e) => handleSearch(e)}
              autoComplete="off"
            />
          </Grid>
          <Grid item lg={3} md={3} sm={12}>
            <label>
              <b className={styles["MRASCSearchNbaFonts"]}>Date of Acquisition</b>
            </label>
            <StartToEndDate
              width="100%!important"
              size="large"
              change={setDate}
              key={clearDateSelect}
              startvalue={
                State.FromDate != null && State.FromDate != ""
                  ? DateDisplayFormat(State.FromDate)
                  : null
              }
              endvalue={
                State.ToDate != null && State.FromDate != ""
                  ? DateDisplayFormat(State.ToDate)
                  : null
              }
              DateRange={true}
            />
          </Grid>
          <Grid item lg={4} md={4} sm={12}></Grid>
          <Grid item lg={2} md={2} sm={12} align="right">
            <div className={styles["MRASCSearchNbaorResetbtn"]} />

            <Button
              text="Search"
              icon={<Search />}
              applyClass="btnSecondarySolid2Search"
              size="small"
              click={handleSearchData}
            />
          </Grid>
          <Grid item lg={2} md={2} sm={12}>
            <div className={styles["MRASCSearchNbaorResetbtn"]} />

            <Button
              text="Reset"
              icon={<i className="icon-reset"></i>}
              applyClass="btnSecondarySolidReset"
              size="small"
              click={resetData}
            />
          </Grid>
          <Grid item lg={4} md={4} sm={12}></Grid>
          <Grid item lg={12} md={12}>
            <Table
              rows={nonBankingAssets.SearchNBACaseData}
              columns={columns}
              scroll={{ x: "max-content" }}
              pagination={{
                defaultPageSize: 10,
                showSizeChanger: true,
                pageSizeOptions: ["5", "10", "20", "30"],
              }}
            />
          </Grid>
        </Grid>
      </>
      <Notification setOpen={setOpen} open={open.flag} message={open.message} />
      {nonBankingAssets.Loading ? <Loader /> : null}
    </>
  );
};
export default SearchNBADPSCasesMRASC;
