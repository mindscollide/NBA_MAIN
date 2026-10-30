import React, { useEffect, useState } from "react";

import { Grid, Box } from "@material-ui/core";

import { Typography, Tooltip } from "antd";

import { useDispatch, useSelector } from "react-redux";

import {
  InputWithBtn,
  Table,
  Button,
  GroupedButtons,
  Modal,
  Notification,
  Loader,
  FilterBar,
} from "../../../Components/Elements";

import styles from "../MBT.module.css";
import {
  DateDisplayFormat,
  TimeAndDisplayFormat,
} from "../../../Common/Functions/date-formatter";

import { useHistory } from "react-router-dom";

import { CommaFormter } from "../../../Common/Functions/date-formatter";
import { GetAllPropertyType } from "../../../store/actions/setup-forms-actions";

import {
  HideNotification,
  GetAllApprovedCases,
  GetApprovalHistory,
  DeleteBusinessTeamData,
  ResetNBACase,
  ViewBusinessTeamData,
  notificationFalse,
} from "../../../store/actions/nonbanking-assets-actions";
import { enableGoBack, disableGoBack } from "../../../store/actions/ui-actions";

const ApprovedCasesNBADEBT = () => {
  const history = useHistory();
  const { Title } = Typography;
  const [filter, setfilter] = useState(1);
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { nonBankingAssets, setupForms } = state;
  const [open, setOpen] = useState({
    flag: false,
    message: "",
  });
  const [allApprovedCases, setAllApprovedCases] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const showModal2 = () => {
    setIsModalVisible2(true);
  };
  const [nbaCaseID, setNbaCaseID] = useState({
    NBACaseID: null,
  });
  const [rejectDispute, setRejectDispute] = useState({
    ApprovalRejectionReasonID: 0,
  });

  //View Approval States
  const [row, setRow] = useState([]);
  const [actions, setAction] = useState({
    delete: false,
    viewApprovalHistory: false,
  });
  const [btnStatus, setBtnStatus] = useState(true);

  const options = [
    { value: 1, title: "Current Month Cases" },
    { value: 2, title: "Last 30 days" },
    { value: 3, title: "31 to 60 days" },
    { value: 4, title: "61 to 90 days" },
    { value: 5, title: "More than 90 Days" },
  ];

  console.log("NonBankingAssetsReducer", nonBankingAssets);

  const handleFilter = (value) => {
    console.log("handleFilter", value);
    setfilter(Number(value));
    dispatch(GetAllApprovedCases(value));
  };
  console.log("filter", filter);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsModalVisible2(false);
    setRejectDispute({
      ApprovalRejectionReasonID: 0,
    });
    setAction({ delete: false });
    setBtnStatus(true);
  };

  const deleteit = (e, record) => {
    console.log("Delete", record);
    setNbaCaseID({
      ...nbaCaseID,
      NBACaseID: record.nbaCaseID,
    });
    showModal();
    setAction({
      ...actions,
      delete: true,
      update: false,
      add: false,
    });
  };

  const handleDelete = () => {
    console.log("nbaCaseID", nbaCaseID);
    setIsModalVisible(false);
    dispatch(DeleteBusinessTeamData(nbaCaseID, filter));
    dispatch(ResetNBACase());
  };

  // props to pass for grouped button bar
  const buttonProps = {
    primaryButton: {
      text: "Yes",
      icon: <i className="icon-check icon-size-one"></i>,
      endIcon: "",
      class: "btnBorderStyledBeach",
      click: () => handleDelete(),
    },
    secondaryButton: {
      text: "Cancel",
      icon: <i className="icon-close icon-size-one"></i>,
      endIcon: "",
      class: "btnBorderStyledRed",
      click: () => handleCancel(),
    },
  };
  const View = async (e, value) => {
    let Data = {
      NBACaseID: value.nbaCaseID,
    };
    await dispatch(GetAllPropertyType());
    await dispatch(ViewBusinessTeamData(Data));
    await dispatch(enableGoBack());
    console.log("ViewBusinessTeamData", value, Data);
    history.push("/NBA/ManagerBusinessTeam/ViewNBACase");
  };

  const Edit = async (e, value) => {
    let Data = {
      NBACaseID: value.nbaCaseID,
    };
    await dispatch(GetAllPropertyType());
    await dispatch(ViewBusinessTeamData(Data));
    await dispatch(enableGoBack());
    console.log("ViewBusinessTeamData", value, Data);
    history.push("/NBA/ManagerBusinessTeam/EditNBACase");
  };

  const viewApprovalColumn = [
    {
      title: "Date",
      dataIndex: "datetimeStatusUpdate",
      key: "datetimeStatusUpdate",
      align: "center",
      render: (text) => DateDisplayFormat(text),
      width: "200px",
    },
    {
      title: "Time",
      dataIndex: "timeStatusUpdate",
      key: "timeStatusUpdate",
      align: "center",
      render: (text) => TimeAndDisplayFormat(text),
      width: "200px",
    },
    {
      title: "Status",
      dataIndex: "nbaCaseStatus",
      key: "nbaCaseStatus",
      align: "center",
      width: "600px",
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
      title: "Reason",
      dataIndex: "approvalRejectionReasonID",
      key: "approvalRejectionReasonID",
      align: "center",
      width: "200px",
      render: (text, record, index) => {
        console.log("record.approvalRejectionReasonID", record, text);
        if (text != -1) {
          let dataUser = setupForms.ApprovalRejectionReasonsData;
          return dataUser.map((name, index) => {
            if (
              record.approvalRejectionReasonID ===
              name.pK_ApprovalRejectionReasonID
            ) {
              return name.approvalRejectionReasonDescription;
            }
          });
        } else {
          return "";
        }
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      align: "center",
      width: "200px",
    },
    {
      title: "Action By",
      dataIndex: "actionBy",
      key: "actionBy",
      align: "center",
      width: "200px",
    },
  ];

  const okayButtonProp = {
    primaryButton: {
      text: "Ok",
      class: "btnBorderStyledBeach",
      click: () => handleCancel(),
    },
    secondaryButton: {
      text: "",
    },
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
      title: "Name of Borrower",
      dataIndex: "nameOfBorrower",
      key: "nameOfBorrower",
      align: "center",
      width: "400px",
    },
    {
      title: "Partial / Full Settlement",
      dataIndex: "isFullSettlement",
      key: "isFullSettlement",
      align: "center",
      width: "300px",
      render: (text) => {
        if (String(text) === "true") {
          return "Full Settlement";
        } else if (String(text) === "false") {
          return "Partial Settlement";
        }
      },
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
      title: "Remarks",
      dataIndex: "remarks",
      key: "remarks",
      align: "center",
      width: "300px",
    },
    {
      title: "View Status History",
      dataIndex: "key",
      key: "key",
      align: "center",
      width: "300px",
      render: (text, record, index) => {
        return (
          <div
            onClick={() => {
              let nbaCaseID = record.nbaCaseID;
              console.log("testVariable", nbaCaseID);
              dispatch(
                GetApprovalHistory(nbaCaseID, showModal2, setAction, actions)
              );
            }}
            // style={{ cursor: "pointer" }}
            className={`${"icon-edit-list icon-size-one beachGreen "} ${
              styles["Onlycursor"]
            }`}
          ></div>
        );
      },
    },
    {
      title: "Created By",
      dataIndex: "createdByUser",
      key: "createdByUser",
      align: "center",
      width: "300px",
    },
    {
      title: "Email Address",
      dataIndex: "email",
      key: "email",
      align: "center",
      width: "300px",
    },
    // {
    //   title: "Edit",
    //   dataIndex: "Accept/Reject",
    //   key: "Accept/Reject",
    //   align: "center",
    //   width: "100px",
    //   render: (text, record) => (
    //     <div
    //       style={{ cursor: "pointer" }}
    //       onClick={(e) => Edit(e, record)}
    //       className="icon-edit icon-size-one beachGreen"
    //     />
    //   ),
    // },
    // {
    //   title: "Delete",
    //   dataIndex: "Accept/Reject",
    //   key: "Accept/Reject",
    //   align: "center",
    //   width: "100px",
    //   render: (text, record) => (
    //     <div
    //       style={{ cursor: "pointer" }}
    //       onClick={(e) => deleteit(e, record)}
    //       className="icon-trash icon-size-one pdfRed"
    //     />
    //   ),
    // },
  ];

  //Search Handler
  //   check data input for enable button for search
  const searchHandler = (e) => {
    let Data = e.target.value;
    setSearchData(Data);
  };

  // Reset Handler for Grid
  const resetData = () => {
    dispatch(GetAllApprovedCases(filter));
    setSearchData("");
  };

  const globalSearch = (action) => {
    if (searchData !== "") {
      let filteredData = nonBankingAssets.ApprovedCasesData.filter((value) => {
        let data = "";
        if (
          searchData.toLowerCase() === "partial settlement" ||
          searchData.toLowerCase() === "partial " ||
          searchData.toLowerCase() === "partial"
        ) {
          data = "false";
        } else if (
          searchData.toLowerCase() === "full settlement" ||
          searchData.toLowerCase() === "full " ||
          searchData.toLowerCase() === "full"
        ) {
          data = "true";
        }
        console.log(
          "searchData",
          value.referenceNumber
            .toString()
            .toLowerCase()
            .includes(searchData.toLowerCase())
        );
        console.log("value.propertyName", value.propertyName);
        // console.log("valueGlobalSearch", value)

        return (
          value.referenceNumber
            .toString()
            .toLowerCase()
            .includes(searchData.toLowerCase()) ||
          value.miSysCode
            .toString()
            .toLowerCase()
            .includes(searchData.toLowerCase()) ||
          value.nameOfBorrower
            .toString()
            .toLowerCase()
            .includes(searchData.toLowerCase()) ||
          value.isFullSettlement.toString().toLowerCase() === data ||
          value.remarks
            .toString()
            .toLowerCase()
            .includes(searchData.toLowerCase()) ||
          value.dpsTransactionAmount
            .toString()
            .toLowerCase()
            .includes(searchData.toLowerCase()) ||
          value.averageForcedSaleValue
            .toString()
            .toLowerCase()
            .includes(searchData.toLowerCase()) ||
          value.createdByUser
            .toString()
            .toLowerCase()
            .includes(searchData.toLowerCase()) ||
          value.averageMarketValue
            .toString()
            .toLowerCase()
            .includes(searchData.toLowerCase()) ||
          value.email
            .toString()
            .toLowerCase()
            .includes(searchData.toLowerCase())
        );
      });
      console.log("valueGlobalSearch", filteredData);
      setAllApprovedCases(filteredData);
    } else if (searchData === "" || searchData === null) {
      console.log("check");
      let data = nonBankingAssets.ApprovedCasesData;
      setSearchData("");
      setAllApprovedCases(data);
    }
  };

  // const globalSearch = (action) => {

  //   if (searchData !== "") {
  //     let filteredData = nonBankingAssets.ApprovedCasesData.filter((value) => {
  //       let data = "";
  //       if (searchData.toLowerCase() === "partial settlement") {
  //         data = "false";
  //       } else if (searchData.toLowerCase() === "full settlement") {
  //         data = "true";
  //       }
  //       console.log("searchData", value.referenceNumber
  //         .toString()
  //         .toLowerCase()
  //         .includes(searchData.toLowerCase()));
  //       console.log("value.propertyName", value.propertyName);
  //       // console.log("valueGlobalSearch", value)

  //       return (
  //         value.referenceNumber
  //           .toString()
  //           .toLowerCase()
  //           .includes(searchData.toLowerCase()) ||
  //         value.miSysCode.toString().toLowerCase().includes(searchData.toLowerCase()) ||
  //         value.nameOfBorrower.toString().toLowerCase().includes(searchData.toLowerCase()) ||
  //         value.isFullSettlement.toString().toLowerCase() === data ||
  //         value.remarks.toString().toLowerCase().includes(searchData.toLowerCase()) ||
  //         value.dpsTransactionAmount.toString().toLowerCase().includes(searchData.toLowerCase()) ||
  //         value.averageForcedSaleValue.toString().toLowerCase().includes(searchData.toLowerCase()) ||
  //         value.createdByUser.toString().toLowerCase().includes(searchData.toLowerCase()) ||
  //         value.averageMarketValue.toString().toLowerCase().includes(searchData.toLowerCase())
  //       );
  //     });
  //     console.log("valueGlobalSearch", filteredData)
  //     setAllApprovedCases(filteredData);
  //   } else if (searchData === "" || searchData === null) {
  //     console.log("check");
  //     let data = nonBankingAssets.ApprovedCasesData;
  //     setSearchData("");
  //     setAllApprovedCases(data);
  //   }
  // };

  useEffect(() => {
    if (nonBankingAssets.ApprovedCasesData.length > 0) {
      setAllApprovedCases(nonBankingAssets.ApprovedCasesData);
    } else {
      setAllApprovedCases([]);
    }
  }, [nonBankingAssets.ApprovedCasesData]);

  useEffect(() => {
    dispatch(GetAllApprovedCases(filter));
    dispatch(disableGoBack());
    localStorage.removeItem("NBACaseID");
  }, []);

  // For notification
  useEffect(() => {
    let Notification = nonBankingAssets.ShowNotification;
    console.log(
      "SaveBusinessTeamDataSuccess",
      Notification,
      nonBankingAssets.ResponseMessage
    );
    if (Notification === true) {
      console.log("SaveBusinessTeamDataSuccess");
      setOpen({
        flag: true,
        message: nonBankingAssets.ResponseMessage,
      });
      setTimeout(() => {
        dispatch(notificationFalse());
      }, 3000);
    } else {
      console.log("SaveBusinessTeamDataSuccess");
      if (Notification != false) {
        console.log("SaveBusinessTeamData");
        dispatch(notificationFalse());
      }
    }
  }, [nonBankingAssets.ShowNotification]);

  useEffect(() => {
    let ForCheck = nonBankingAssets.ViewApprovalHistoryData;
    console.log("ViewApprovalHistory", Object.keys(ForCheck).length === 0);
    if (
      ForCheck != undefined &&
      ForCheck != null &&
      Object.keys(ForCheck).length > 0
    ) {
      const data =
        ForCheck &&
        ForCheck.map((item) => {
          return item;
        });
      console.log(
        "ViewApprovalHistory",
        nonBankingAssets.ViewApprovalHistoryData,
        data
      );
      console.log(
        "ViewApprovalHistory",
        typeof nonBankingAssets.ViewApprovalHistoryData
      );
      console.log("ViewApprovalHistory", typeof data);
      setRow(data);

      console.log("ViewApprovalHistory", ForCheck);
    }
  }, [nonBankingAssets.ViewApprovalHistoryData]);

  // useEffect(() => {
  //   if (nonBankingAssets.ShowNotification) {
  //     setOpen({
  //       flag: true,
  //       message: nonBankingAssets.Message,
  //     });
  //     dispatch(HideNotification());
  //   }
  //   console.log("Loader", nonBankingAssets.Loading);
  // }, [nonBankingAssets.Loading]);

  return (
    <>
      <Title level={4}>Approved Cases</Title>
      <>
        <Grid container spacing={2}>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <FilterBar
              Options={options}
              change={handleFilter}
              placeholder={"Filter by Duration"}
              defaultValue={options[0].title}
            />
          </Grid>
          {/* <Grid item lg={5} md={5}></Grid> */}
          <div className={styles["inputSeacrh"]} />
          <Grid item lg={5} md={5} className="SearchPendingApprovals">
            <InputWithBtn
              label="Search"
              fullWidth
              textFieldSize="small"
              autoComplete="off"
              icon={<i className="icon-search icon-size-one"></i>}
              name="PendingApprovals"
              applyClass="search-cnic"
              click={globalSearch}
              onchange={searchHandler}
              value={searchData}
            />
          </Grid>
          <Grid item lg={1} md={1} sm={12}>
            {/* <div style={{ align: "Right" }} /> */}
            <Button
              text="Reset"
              icon={<i className="icon-reset"></i>}
              applyClass="btnSecondarySolidReset"
              size="small"
              click={resetData}
            />
          </Grid>
          <Grid item lg={12} md={12}>
            <Table
              rows={allApprovedCases}
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
      <Modal closeModal={handleCancel} modalState={isModalVisible} width={700}>
        {/* this data will be pass to modal when delete icon btn in the table  will be clicked */}
        {actions.delete && (
          <>
            <Box
              display="flex"
              justifyContent="center"
              // style={{ padding: "40px" }}
            >
              <i className="icon-trash icon-size-two"></i>
              <Title level={3} align="center">
                Are you sure you want to delete this case?
              </Title>
            </Box>
            <GroupedButtons data={buttonProps} />
          </>
        )}
      </Modal>

      <Modal
        closeModal={handleCancel}
        modalState={isModalVisible2}
        width={1000}
        modalTitle={<Title level={3}>View Status History</Title>}
      >
        {/* this data will be pass to modal when View Approval Icon will be clicked */}
        {actions.viewApprovalHistory && (
          <>
            <Table rows={row} columns={viewApprovalColumn} />
            <GroupedButtons data={okayButtonProp} />
          </>
        )}
      </Modal>
      <Notification setOpen={setOpen} open={open.flag} message={open.message} />
      {nonBankingAssets.Loading ? <Loader /> : null}
    </>
  );
};

export default ApprovedCasesNBADEBT;
