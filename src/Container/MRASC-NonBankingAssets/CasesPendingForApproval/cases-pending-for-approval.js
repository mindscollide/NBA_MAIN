import React, { useEffect, useState } from "react";


import { Typography, Tooltip } from "antd";

import { useDispatch, useSelector } from "react-redux";

import {
  InputWithBtn,
  Table,
  Button,
  TextField,
  SelectBox,
  GroupedButtons,
  Modal,
  Notification,
  Loader,
  FilterBar,
} from "../../../Components/Elements";
import {
  DateDisplayFormat,
  TimeAndDisplayFormat,
} from "../../../Common/Functions/date-formatter";

import { useNavigate } from "react-router";

import { CommaFormter } from "../../../Common/Functions/date-formatter";
import {
  GetAllPropertyType,
  GetAllApprovalRejectionReasons,
} from "../../../store/actions/setup-forms-actions";

import {
  HideNotification,
  GetAllPendingForApproval,
  GetApprovalHistory,
  DeleteBusinessTeamData,
  ResetNBACase,
  ApproveCase,
  RejectCase,
  ViewREMTeamData,
  notificationFalse,
} from "../../../store/actions/nonbanking-assets-actions";

import styles from "../MRASC.module.css";
import { enableGoBack, disableGoBack } from "../../../store/actions/ui-actions";
import { Row, Col } from "antd";

const CasesPendingForApprovalNBAMRASC = () => {
  const navigate = useNavigate();
  const { Title } = Typography;
  const [filter, setfilter] = useState(1);
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { nonBankingAssets, setupForms } = state;
  const [open, setOpen] = useState({
    flag: false,
    message: "",
  });
  const [allPendingForApprovalData, setAllPendingForApprovalData] = useState(
    []
  );
  const [searchData, setSearchData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  // Accept Reject States
  const [approvalReason, setApprovalReason] = useState([]);
  const [approvalReasonValue, setApprovalReasonValue] = useState([]);
  const [rejectionReason, setRejectionReason] = useState([]);
  const [rejectionReasonValue, setRejectionReasonValue] = useState([]);
  // const showModal2 = () => {
  //   setIsModalVisible2(true);
  // };
  const [nbaCaseID, setNbaCaseID] = useState({
    NBACaseID: null,
  });
  // const [rejectDispute, setRejectDispute] = useState({
  //   ApprovalRejectionReasonID: 0,
  // });

  //View Approval States
  const [row, setRow] = useState([]);
  const [actions, setAction] = useState({
    delete: false,
    viewApprovalHistory: false,
  });
  const [btnStatus, setBtnStatus] = useState(true);

  const [modal, setModal] = useState({
    approval: false,
    rejection: false,
  });
  const [approveDispute, setApproveDispute] = useState({
    NBACaseID: 0,
    Comments: "",
    ApprovalRejectionReasonID: 0,
  });

  const [rejectDispute, setRejectDispute] = useState({
    NBACaseID: 0,
    Comments: "",
    ApprovalRejectionReasonID: 0,
  });
  const showModal2 = () => {
    setIsModalVisible2(true);
  };

  useEffect(() => {
    let tem = [];
    let tem2 = [];
    let dataUser = setupForms.ApprovalRejectionReasonsData;
    dataUser.map((name, index) => {
      if (name.isApprovalItem === true) {
        tem.push(name.approvalRejectionReasonDescription);
      } else if (name.isApprovalItem === false) {
        tem2.push(name.approvalRejectionReasonDescription);
      }
    });
    setApprovalReason(tem);
    setRejectionReason(tem2);
  }, [setupForms.ApprovalRejectionReasonsData]);

  // Selected Dropdown value of Approval
  const approvalReasonHandler = (e, value) => {
    setApprovalReasonValue(value);
    let setApprovalReason = setupForms.ApprovalRejectionReasonsData;
    setApprovalReason.map((data, index) => {
      if (value === data.approvalRejectionReasonDescription) {
        let id = data.pK_ApprovalRejectionReasonID;
        setApproveDispute({
          ...approveDispute,
          ["ApprovalRejectionReasonID"]: parseInt(id),
        });
      }
    });
  };
  // Approval Description
  const handleChangeApprove = (e) => {
    setApproveDispute({
      ...approveDispute,
      ["Comments"]: e.target.value,
    });
  };

  // Selected Dropdown value of Rejection
  const rejectionReasonHandler = (e, value) => {
    setRejectionReasonValue(value);
    let setRejectionReason = setupForms.ApprovalRejectionReasonsData;
    setRejectionReason.map((data, index) => {
      if (value === data.approvalRejectionReasonDescription) {
        let id = data.pK_ApprovalRejectionReasonID;
        setRejectDispute({
          ...rejectDispute,
          ["ApprovalRejectionReasonID"]: parseInt(id),
        });
      }
    });
  };

  const handleChangeReject = (e) => {
    setRejectDispute({
      ...rejectDispute,
      ["Comments"]: e.target.value,
    });
  };

  //Approve Reason API Call
  const handleProceedApprove = async () => {
    setIsModalVisible2(false);
    await dispatch(ApproveCase(approveDispute, filter));
    setApproveDispute({
      NBACaseID: 0,
      Comments: "",
      ApprovalRejectionReasonID: 0,
    });
    setApprovalReasonValue([]);
    // setBtnStatus(true);
  };

  const handleProceedReject = async () => {
    console.log("rejectDispute", rejectDispute);
    setIsModalVisible2(false);
    await dispatch(RejectCase(rejectDispute, filter));
    setRejectDispute({
      NBACaseID: 0,
      Comments: "",
      ApprovalRejectionReasonID: 0,
    });
    setRejectionReasonValue([]);
  };

  useEffect(() => {
    dispatch(GetAllApprovalRejectionReasons());
    dispatch(GetAllPendingForApproval(filter));
    dispatch(disableGoBack());
    localStorage.removeItem("NBACaseID");
  }, []);

  console.log(
    "ApprovalRejectionReasons",
    setupForms.ApprovalRejectionReasonsData
  );

  useEffect(() => {
    let comment = approveDispute.Comments;
    if (approveDispute.ApprovalRejectionReasonID != 0 && comment != "") {
      setBtnStatus(false);
    } else {
      setBtnStatus(true);
    }
  }, [approvalReasonValue, approveDispute.Comments]);

  useEffect(() => {
    let comment = rejectDispute.Comments;
    if (rejectDispute.ApprovalRejectionReasonID != 0 && comment.length != "") {
      setBtnStatus(false);
    } else {
      setBtnStatus(true);
    }
  }, [rejectDispute.ApprovalRejectionReasonID, rejectDispute.Comments]);

  // [rejectionReasonValue, rejectDispute.Comments]);

  //Approval Message Popup
  useEffect(() => {
    if (
      nonBankingAssets.ApproveCaseData.responseMessage ===
      "The Record has been Updated successfully"
    ) {
      setOpen({
        flag: true,
        message: nonBankingAssets.ApproveCaseData.responseMessage,
      });
      dispatch(HideNotification());
    }
  }, [nonBankingAssets.ApproveCaseData]);

  // //Rejection Message Popup
  useEffect(() => {
    if (
      nonBankingAssets.RejectCaseData.responseMessage ===
      "The Record has been Updated successfully"
    ) {
      setOpen({
        flag: true,
        message: nonBankingAssets.RejectCaseData.responseMessage,
      });
      dispatch(HideNotification());
    }
  }, [nonBankingAssets.RejectCaseData]);

  //Modal Buttons For Approve
  const buttonPropsApprove = {
    primaryButton: {
      disable: btnStatus,
      text: "Proceed",
      icon: <i className="icon-check icon-size-one"></i>,
      endIcon: "",
      class: "btnBorderStyledBeach",
      click: () => handleProceedApprove(),
    },
    secondaryButton: {
      text: "Discard",
      icon: <i className="icon-close icon-size-one"></i>,
      endIcon: "",
      class: "btnBorderStyledRed",
      click: () => handleCancel(),
    },
  };

  //Modal Buttons For Reject
  const buttonPropsReject = {
    primaryButton: {
      disable: btnStatus,
      text: "Proceed",
      icon: <i className="icon-check icon-size-one"></i>,
      endIcon: "",
      class: "btnBorderStyledBeach",
      click: () => handleProceedReject(),
    },
    secondaryButton: {
      text: "Discard",
      icon: <i className="icon-close icon-size-one"></i>,
      endIcon: "",
      class: "btnBorderStyledRed",
      click: () => handleCancel(),
    },
  };

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
    dispatch(GetAllPendingForApproval(value));
  };
  console.log("filter", filter);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsModalVisible2(false);
    setRejectionReasonValue("");
    setApprovalReasonValue("");
    setApproveDispute({
      NBACaseID: 0,
      Comments: "",
      ApprovalRejectionReasonID: 0,
    });
    setRejectDispute({
      NBACaseID: 0,
      Comments: "",
      ApprovalRejectionReasonID: 0,
    });
  };

  // const deleteit = (e, record) => {
  //   console.log("Delete", record);
  //   setNbaCaseID({
  //     ...nbaCaseID,
  //     NBACaseID: record.nbaCaseID,
  //   });
  //   showModal();
  //   setAction({
  //     ...actions,
  //     delete: true,
  //     update: false,
  //     add: false,
  //   });
  // };

  // const handleDelete = () => {
  //   console.log("nbaCaseID", nbaCaseID);
  //   setIsModalVisible(false);
  //   dispatch(DeleteBusinessTeamData(nbaCaseID, filter));
  //   dispatch(ResetNBACase());
  // };

  // props to pass for grouped button bar
  // const buttonProps = {
  //   primaryButton: {
  //     text: "Yes",
  //     icon: <i className="icon-check icon-size-one"></i>,
  //     endIcon: "",
  //     class: "btnBorderStyledBeach",
  //     click: () => handleDelete(),
  //   },
  //   secondaryButton: {
  //     text: "Cancel",
  //     icon: <i className="icon-close icon-size-one"></i>,
  //     endIcon: "",
  //     class: "btnBorderStyledRed",
  //     click: () => handleCancel(),
  //   },
  // };
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

  const Edit = async (e, value) => {
    let Data = {
      NBACaseID: value.nbaCaseID,
    };
    await dispatch(GetAllPropertyType());
    await dispatch(ViewREMTeamData(Data));
    await dispatch(enableGoBack());
    console.log("ViewREMTeamData", value, Data);
    navigate("/NBA/ManagerRASC/EditNonBankingAssets");
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
      width: "300px",
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
                GetApprovalHistory(nbaCaseID, showModal, setAction, actions)
              );
            }}
            // style={{ cursor: "pointer" }}
            className={`${"icon-edit-list icon-size-one beachGreen "} ${styles["Onlycursor"]}`}
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

    {
      title: "Accept / Reject",
      dataIndex: "Accept/Reject",
      key: "Accept/Reject",
      align: "center",
      width: "220px",
      render: (text, record, index) => {
        return (
          <div>
            <Tooltip title="Approve" color={"Black"}>
              <i
                // style={{ cursor: "pointer" }}
                onClick={(e) => {
                  showModal2();
                  setModal({
                    ...modal,
                    rejection: false,
                    approval: true,
                  });
                  let testVariable =
                    nonBankingAssets.PendingForApprovalData[index];
                  console.log("testVariable", testVariable);
                  setApproveDispute({
                    ...approveDispute,
                    NBACaseID: testVariable.nbaCaseID,
                  });
                }}
                className={`${"icon-check icon-size-one greenTick"} ${styles["Onlycursor"]}`}
              />
            </Tooltip>
            <Tooltip title="Reject" color={"Black"}>
              <i
                // style={{ cursor: "pointer" }}
                onClick={(e) => {
                  showModal2();
                  setModal({
                    ...modal,
                    rejection: true,
                    approval: false,
                  });
                  let testVariable =
                    nonBankingAssets.PendingForApprovalData[index];
                  console.log("testVariable", testVariable);
                  setRejectDispute({
                    ...rejectDispute,
                    NBACaseID: testVariable.nbaCaseID,
                  });
                }}
                className={`${"icon-close icon-size-one crosstick"} ${styles["Onlycursor"]}`}
              />
            </Tooltip>
          </div>
        );
      },
    },
  ];

  //Search Handler
  //   check data input for enable button for search
  const searchHandler = (e) => {
    let Data = e.target.value;
    setSearchData(Data);
  };

  // Reset Handler for Grid
  const resetData = () => {
    dispatch(GetAllPendingForApproval(filter));
    setSearchData("");
  };

  const globalSearch = (action) => {
    if (searchData !== "") {
      let filteredData = nonBankingAssets.PendingForApprovalData.filter(
        (value) => {
          let data = "";
          if (searchData.toLowerCase() === "partial settlement") {
            data = "false";
          } else if (searchData.toLowerCase() === "full settlement") {
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
        }
      );
      console.log("valueGlobalSearch", filteredData);
      setAllPendingForApprovalData(filteredData);
    } else if (searchData === "" || searchData === null) {
      console.log("check");
      let data = nonBankingAssets.PendingForApprovalData;
      setSearchData("");
      setAllPendingForApprovalData(data);
    }
  };

  useEffect(() => {
    if (nonBankingAssets.PendingForApprovalData.length > 0) {
      setAllPendingForApprovalData(nonBankingAssets.PendingForApprovalData);
    } else {
      setAllPendingForApprovalData([]);
    }
  }, [nonBankingAssets.PendingForApprovalData]);

  useEffect(() => {
    dispatch(GetAllPendingForApproval(filter));
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
      <Title level={4}>Cases Pending for Approval</Title>
      <>
        <Row gutter={[16, 16]}>
          <Col xl={6} lg={6} sm={24} xs={24}>
            <FilterBar
              Options={options}
              change={handleFilter}
              placeholder={"Filter by Duration"}
              defaultValue={options[0].title}
            />
          </Col>
          {/* <Col xl={10} lg={10}></Col> */}
          <div className={styles["MRASCSearchInputField"]} />
          <Col xl={10} lg={10} className="SearchPendingApprovals">
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
          </Col>
          <Col xl={2} lg={2} sm={24}>
            <Button
              text="Reset"
              icon={<i className="icon-reset"></i>}
              applyClass="btnSecondarySolidReset"
              size="small"
              click={resetData}
            />
          </Col>
          <Col xl={24} lg={24}>
            <Table
              rows={allPendingForApprovalData}
              columns={columns}
              scroll={{ x: "max-content" }}
              pagination={{
                defaultPageSize: 10,
                showSizeChanger: true,
                pageSizeOptions: ["5", "10", "20", "30"],
              }}
            />
          </Col>
        </Row>
      </>
      {/* <Modal closeModal={handleCancel} modalState={isModalVisible} width={700}> */}
      {/* this data will be pass to modal when delete icon btn in the table  will be clicked */}
      {/* {actions.delete && (
          <>
            <div style={{ display: "flex", justifyContent: "center", ...({ padding: "40px" }) }}>
              <i className="icon-trash icon-size-two"></i>
              <Title level={3} align="center">
                Are you sure you want to delete this case?
              </Title>
            </div>
            <GroupedButtons data={buttonProps} />
          </>
        )}
      </Modal> */}

      <Modal
        closeModal={handleCancel}
        modalState={isModalVisible2}
        width={700}
        modalTitle={
          <Title level={3}>
            {modal.approval && "Accept"}
            {modal.rejection && "Reject"}
          </Title>
        }
      >
        {modal.approval && (
          <>
            <div className={styles["modalApproval"]} style={{ display: "flex", justifyContent: "center" }}>
              <Col xl={24} lg={24} sm={24} xs={24}>
                <SelectBox
                  option={approvalReason}
                  propertyName={"title"}
                  change={approvalReasonHandler}
                  label="Select Approval Reason"
                  required
                  value={approvalReasonValue}
                  name="SelectApprovalReason"
                />
              </Col>
            </div>
            <div className={styles["modalApprovaldescription"]} style={{ display: "flex", justifyContent: "center" }}>
              <Col xl={24} lg={24} sm={24} xs={24}>
                <TextField
                  multiline
                  rows={6}
                  label="Description"
                  autoComplete="off"
                  change={handleChangeApprove}
                  value={approveDispute.Comments}
                  fullWidth
                  required
                  textLength={500}
                />
              </Col>
            </div>
            <GroupedButtons data={buttonPropsApprove} />
          </>
        )}
        {modal.rejection && (
          <>
            <div className={styles["modalApproval"]} style={{ display: "flex", justifyContent: "center" }}>
              <Col xl={24} lg={24} sm={24} xs={24}>
                <SelectBox
                  option={rejectionReason}
                  propertyName={"title"}
                  change={rejectionReasonHandler}
                  label="Select Rejection Reason"
                  required
                  value={rejectionReasonValue}
                  name="SelectRejectionReason"
                />
              </Col>
            </div>
            <div className={styles["modalApprovaldescription"]} style={{ display: "flex", justifyContent: "center" }}>
              <Col xl={24} lg={24} sm={24} xs={24}>
                <TextField
                  multiline
                  rows={6}
                  label="Description"
                  autoComplete="off"
                  change={handleChangeReject}
                  value={rejectDispute.Comments}
                  fullWidth
                  required
                  textLength={500}
                />
              </Col>
            </div>
            <GroupedButtons data={buttonPropsReject} />
          </>
        )}
      </Modal>

      <Modal
        closeModal={handleCancel}
        modalState={isModalVisible}
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

export default CasesPendingForApprovalNBAMRASC;
