import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Typography, Radio } from "antd";
import dayjs from "dayjs";

import {
  Paper,
  InputWithBtn,
  TextField,
  SelectBox,
  DatePicker,
  Button,
  Notification,
  GroupedButtons,
  Modal,
  Message,
  Loader,
  Table,
  NumberFormatCustom,
  FormattedInputs,
} from "../../../Components/Elements";
import ErrorBar from "./../../Authentication/SignUp/ErrorBar/error-bar";
import styles from "../DERASC.module.css";

import {
  GetAllPropertyType,
  GetAllApprovalRejectionReasons,
} from "../../../store/actions/setup-forms-actions";
import { useSelector, useDispatch } from "react-redux";
import {
  DateDisplayFormat,
  DateSendingFormat,
  NumberFormater,
  CommaFormter,
  removeDashesFromDate,
} from "../../../Common/Functions/date-formatter";
import {
  ViewREMTeamData,
  SaveRASAeamData,
  RevertCase,
  notificationFalse,
} from "../../../store/actions/nonbanking-assets-actions";
import NBABusinessDetailsVIEW from "./nbaBusiness-view";
import NBACustomerDetailsVIEW from "./nbacustomer-view";
import NBAREMVIEW from "./nbarsm-view";
import { Row, Col } from "antd";

const EditNBAAssetsDERAM = () => {
  const navigate = useNavigate();
  const { Title } = Typography;
  const dispatch = useDispatch();

  const date = dayjs().format("YYYY-MM-DD");
  const state = useSelector((state) => state);
  const { setupForms, nonBankingAssets } = state;
  // for notification
  const [open, setOpen] = useState({
    flag: false,
    message: "",
  });

  //for remarks amount and date error validation
  const [remarkAmountDate, setRemarksAmountDate] = useState(false);

  // for Full Scope Valuation Detail required
  const [scopeValuationField, setScopeValuationField] = useState(true);
  // for Desktop Valuation Detail
  const [desktopValuationField, setDesktopValuationField] = useState(true);
  // for DisposalOwnUseStatus Dependent Fields Required and Disable State
  const [requiredDOUS, setRequiredDOUS] = useState(false);
  const [disabledDOUS, setDisabledDOUS] = useState(true);
  // for Full Scope Valuation Detail States
  const [scopevaluationDetails, setScopeValuationDetails] = useState({
    EvaluatorName: "",
    LandForcedSaleValue: parseInt(-1),
    LandMarketValue: parseInt(-1),
    BuildingForcedSaleValue: parseInt(-1),
    BuildingMarketValue: parseInt(-1),
    TotalForcedSaleValue: parseInt(-1),
    TotalMarketValue: parseInt(-1),
    DateOfValuation: removeDashesFromDate(date),
  });
  // for Desktop Valuation Detail States
  const [desktopvaluationDetails, setDesktopValuationDetails] = useState({
    EvaluatorName: "",
    LandForcedSaleValue: parseInt(-1),
    LandMarketValue: parseInt(-1),
    BuildingForcedSaleValue: parseInt(-1),
    BuildingMarketValue: parseInt(-1),
    TotalForcedSaleValue: parseInt(-1),
    TotalMarketValue: parseInt(-1),
    DateOfValuation: removeDashesFromDate(date),
  });
  // for Real Estate Management jason object name NBACasePropertyModelList States
  const [NBACasePropertyModelList, setNBACasePropertyModelList] = useState({
    NBACasePropertyID: -1,
    TitleTransferDate: "18000101",
    CurrentUseOfAsset: "",
    RevaluatedAmount: -1,
    StrategyForDisposal: "",
    DisposalOrTransferDateForAsset: "18000101",
    IncomeEarnedFromAsset: -1,
    DisposalOwnUseStatus: 2,
    NumberOfValuationsFull: -1,
    AverageForcedSaleValueFull: -1,
    AverageMarketValueFull: -1,
    NumberOfValuationsDesktop: -1,
    AverageForcedSaleValueDesktop: -1,
    AverageMarketValueDesktop: -1,
    PropertyFullEvaluatorREMList: [],
    PropertyDesktopEvaluatorList: [],
  });
  // for Real Estate Management jason object name NBACasePropertyModelList Array States
  const [NBACasePropertyModelListAr, setNBACasePropertyModelListAr] = useState(
    []
  );
  const [propertyTypeName, setPropertyTypeName] = useState("");
  // for Real Estate Management main jason remaning States
  const [saveNewDataList, setSaveNewDataList] = useState({
    NBACaseID: -1,
    RemarksREM: "",
    SendForApproval: -1,
  });
  // for view data
  const [saveNewData, setSaveNewData] = useState({
    IsFullSettlement: false,
    ApprovalAuthority: "",
    RemarksBusiness: "",
    ReferenceNumber: "",
    SendForApproval: -1,
    NBACaseID: 0,
  });
  // for save RASA data
  const [saveRASNewDataList, setSaveRASNewDataList] = useState({
    RemarksRASC: "",
    ProvisionalReversalDate: "18000101",
    ProvisionalReversalAmount: -1,
    NBACaseID: 0,
    SendForApproval: -1,
  });
  // prperty name selecet by Dbt
  const [DPAList, setDPAList] = useState([]);
  const [DPAOptionValueList, setDPAOptionValueList] = useState([]);
  const [NBACaseCustomerList, setNBACaseCustomerList] = useState([]);
  const [REMCasePropertyModelList, setREMCasePropertyModelList] = useState([]);
  // For Revert Func
  const [btnStatus, setBtnStatus] = useState(true);
  const [filter, setfilter] = useState(1);
  const [rejectionReasonValue, setRejectionReasonValue] = useState([]);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [rejectionReason, setRejectionReason] = useState([]);
  const [rejectDispute, setRejectDispute] = useState({
    NBACaseID: 0,
    Comments: "",
    ApprovalRejectionReasonID: 0,
  });
  const handleChangeReject = (e) => {
    setRejectDispute({
      ...rejectDispute,
      ["Comments"]: e.target.value,
    });
  };
  const handleCancel = () => {
    setIsModalVisible2(false);
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
  // For Reject PRoceed
  const handleProceedReject = async () => {
    console.log("rejectDispute", rejectDispute);
    setIsModalVisible2(false);
    await dispatch(RevertCase(rejectDispute, false));
    navigate("/NBA/DataEntryRaSc/CasesInProcess");
    setRejectDispute({
      NBACaseID: 0,
      Comments: "",
      ApprovalRejectionReasonID: 0,
    });
    setRejectionReasonValue([]);
  };

  const showModal2 = () => {
    setIsModalVisible2(true);
  };
  // for Revert opint
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
    console.log("setRejectionReason", tem2);
    setRejectionReason(tem2);
  }, [setupForms.ApprovalRejectionReasonsData]);
  useEffect(() => {
    let comment = rejectDispute.Comments;
    if (rejectionReasonValue.length > 0 && comment.length > 0) {
      setBtnStatus(false);
      // console.log("approvalReasonValue", approvalReasonValue);
    } else {
      setBtnStatus(true);
    }
  }, [rejectionReasonValue, rejectDispute.Comments]);
  useEffect(() => {}, [rejectionReason]);
  useEffect(() => {
    // dispatch(GetAllPropertyType());
    dispatch(GetAllApprovalRejectionReasons());
    if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
      let NBACaseID = JSON.parse(localStorage.getItem("NBACaseID"));
      let Data = {
        NBACaseID: NBACaseID,
      };
      console.log("ViewBusinessTeamData NBACaseID", NBACaseID);

      dispatch(ViewREMTeamData(Data));
      dispatch(GetAllPropertyType());
    }
  }, []);
  useEffect(() => {
    console.log(
      "ViewREMCaseData",
      nonBankingAssets.ViewREMCaseData &&
        Object.keys(nonBankingAssets.ViewREMCaseData).length > 0
    );
    console.log("ViewREMCaseData", nonBankingAssets.ViewREMCaseData);
    if (
      nonBankingAssets.ViewREMCaseData &&
      Object.keys(nonBankingAssets.ViewREMCaseData).length > 0
    ) {
      let viewData = nonBankingAssets.ViewREMCaseData;
      console.log("ViewREMCaseData", viewData);
      console.log("ViewREMCaseData", viewData.nbaCaseID);
      setSaveNewData({
        IsFullSettlement: viewData.isFullSettlement,
        ApprovalAuthority: viewData.approvalAuthority,
        ReferenceNumber: viewData.referenceNumber,
        RemarksBusiness: viewData.remarksBusiness,
        NBACaseID: viewData.nbaCaseID,
      });
      localStorage.setItem("NBACaseID", viewData.nbaCaseID);
      // NBACasePropertyModelList
      setSaveNewDataList({
        ...saveNewDataList,
        ["NBACaseID"]: viewData.nbaCaseID,
        ["RemarksREM"]: viewData.remarksREM,
      });
      let provisionalReversalDate = viewData.provisionalReversalDate;
      if (
        provisionalReversalDate != "" &&
        provisionalReversalDate != null &&
        provisionalReversalDate != "18000101"
      ) {
        provisionalReversalDate = viewData.provisionalReversalDate;
      } else {
        provisionalReversalDate = "18000101";
      }

      setSaveRASNewDataList({
        ...saveNewDataList,
        ["RemarksRASC"]: viewData.remarksRASC,
        ["ProvisionalReversalDate"]: provisionalReversalDate,
        ["ProvisionalReversalAmount"]: viewData.provisionalReversalAmount,
        ["NBACaseID"]: viewData.nbaCaseID,
      });
      let nbaCasePropertyModelList = viewData.nbaCasePropertyModelList;
      let nbaCaseCustomerList = viewData.nbaCaseCustomerList;
      if (nbaCasePropertyModelList && nbaCasePropertyModelList.length > 0) {
        let tem = [];
        let tem22 = [];
        let tempropettpye = [];
        nbaCasePropertyModelList.map((data, index) => {
          let temp = [];
          let tempFull = [];
          let temD = [];
          if (data.propertyEvaluatorBusinessList) {
            data.propertyEvaluatorBusinessList.map((data2, index) => {
              temp.push({
                EvaluatorName: data2.evaluatorName,
                DateOfValuation: data2.dateOfValuation,
                LandForcedSaleValue: data2.landForcedSaleValue,
                LandMarketValue: data2.landMarketValue,
                BuildingForcedSaleValue: data2.buildingForcedSaleValue,
                BuildingMarketValue: data2.buildingMarketValue,
                TotalForcedSaleValue: data2.totalForcedSaleValue,
                TotalMarketValue: data2.totalMarketValue,
                DateOfValuation: data2.dateOfValuation,
              });
            });
          }
          if (data.propertyFullEvaluatorREMList) {
            data.propertyFullEvaluatorREMList.map((data2, index) => {
              tempFull.push({
                EvaluatorName: data2.evaluatorName,
                DateOfValuation: data2.dateOfValuation,
                LandForcedSaleValue: data2.landForcedSaleValue,
                LandMarketValue: data2.landMarketValue,
                BuildingForcedSaleValue: data2.buildingForcedSaleValue,
                BuildingMarketValue: data2.buildingMarketValue,
                TotalForcedSaleValue: data2.totalForcedSaleValue,
                TotalMarketValue: data2.totalMarketValue,
              });
            });
          }
          if (data.propertyDesktopEvaluatorList) {
            data.propertyDesktopEvaluatorList.map((data2, index) => {
              temD.push({
                EvaluatorName: data2.evaluatorName,
                DateOfValuation: data2.dateOfValuation,
                LandForcedSaleValue: data2.landForcedSaleValue,
                LandMarketValue: data2.landMarketValue,
                BuildingForcedSaleValue: data2.buildingForcedSaleValue,
                BuildingMarketValue: data2.buildingMarketValue,
                TotalForcedSaleValue: data2.totalForcedSaleValue,
                TotalMarketValue: data2.totalMarketValue,
              });
            });
          }
          tem.push({
            PropertyType: data.propertyType,
            PropertyAcquiredDetails: data.propertyAcquiredDetails,
            PrincipalAdjusted: data.principalAdjusted,
            MarkupAdjusted: data.markupAdjusted,
            Charges: data.charges,
            TotalAdjustmentPMC: data.totalAdjustmentPMC,
            DPSTransactionAmount: data.dpsTransactionAmount,
            AcquiredValue: data.acquiredValue,
            AcquisitionCharges: data.acquisitionCharges,
            DateOfAcquisition: data.dateOfAcquisition,
            TotalValueDAA: data.totalValueDAA,
            NumberOfValuationsBusiness: data.numberOfValuationsBusiness,
            AverageForcedSaleValueBusiness: data.averageForcedSaleValueBusiness,
            AverageMarketValueBusiness: data.averageMarketValueBusiness,
            PropertyEvaluatorBusinessList: temp,
            PropertyFullEvaluatorREMList: tempFull,
            PropertyDesktopEvaluatorList: temD,
          });
          tem22.push({
            PropertyType: data.propertyType,
            PropertyAcquiredDetails: data.propertyAcquiredDetails,
            NBACasePropertyID: data.nbaCasePropertyID,
            TitleTransferDate: data.titleTransferDate,
            CurrentUseOfAsset: data.currentUseOfAsset,
            RevaluatedAmount: data.revaluatedAmount,
            StrategyForDisposal: data.strategyForDisposal,
            DisposalOrTransferDateForAsset: data.disposalOrTransferDateForAsset,
            IncomeEarnedFromAsset: data.incomeEarnedFromAsset,
            DisposalOwnUseStatus: data.disposalOwnUseStatus,
            NumberOfValuationsFull: data.numberOfValuationsFull,
            AverageForcedSaleValueFull: data.averageForcedSaleValueFull,
            AverageMarketValueFull: data.averageMarketValueFull,
            NumberOfValuationsDesktop: data.numberOfValuationsDesktop,
            AverageForcedSaleValueDesktop: data.averageForcedSaleValueDesktop,
            AverageMarketValueDesktop: data.averageMarketValueDesktop,
            PropertyFullEvaluatorREMList: tempFull,
            PropertyDesktopEvaluatorList: temD,
          });
          tempropettpye.push({
            NBACasePropertyID: data.nbaCasePropertyID,
            PropertyAcquiredDetails: data.propertyAcquiredDetails,
          });
        });
        console.log("ViewREMCaseData", tem);
        console.log("ViewREMCaseData", tempropettpye);
        setDPAList(tempropettpye);
        setREMCasePropertyModelList(tem);
        setNBACasePropertyModelListAr(tem22);
      }
      if (nbaCaseCustomerList && nbaCaseCustomerList.length > 0) {
        let tem = [];
        nbaCaseCustomerList.map((data, index) => {
          let tema = [];
          data.nbaCaseCustomerAccountList.map((tData, index) => {
            tema.push({
              AccountNumber: tData.accountNumber,
              BranchCode: tData.branchCode,
              BranchName: tData.branchName,
              RegionCode: tData.regionCode,
              RegionName: tData.regionName,
              FacilityDescription: tData.facilityDescription,
              SundryDescription: tData.sundryDescription,
            });
          });
          tem.push({
            MisysCode: data.misysCode,
            BorrowerName: data.borrowerName,
            BorrowerAddress: data.borrowerAddress,
            ECIBCode: data.ecibCode,
            IPartyID: data.iPartyID,
            NBACaseCustomerAccountList: tema,
          });
        });
        console.log("ViewREMCaseData", tem);
        setNBACaseCustomerList(tem);
      }
    }
  }, [nonBankingAssets.ViewREMCaseData]);
  useEffect(() => {
    let namePropertyType = setupForms.PropertyTypeData;
    console.log("namePropertyType", namePropertyType);
    console.log("namePropertyType", DPAList);
    let value = [];
    DPAList.map((data2, index) => {
      let title = data2.PropertyAcquiredDetails;
      value.push(title);
    });
    setDPAOptionValueList(value);
  }, [DPAList]);
  console.log("DPAOptionValueList", DPAOptionValueList);
  // Delete data from grid of Full Scope Valuation Detail
  // const deleteFSVDGrid = (record) => {
  //   console.log("deleteFSVDGrid", record, NBACasePropertyModelList);

  //   const filteredItems =
  //     NBACasePropertyModelList.PropertyFullEvaluatorREMList.filter(
  //       (item) => item != record
  //     );
  //   console.log("deleteFSVDGrid", typeof filteredItems);
  //   if (
  //     scopevaluationDetails.TotalMarketValue != -1 ||
  //     scopevaluationDetails.TotalForcedSaleValue != -1
  //   ) {
  //     console.log("deleteFSVDGrid", filteredItems);
  //     // if(businessDetailSection.NumberOfValuationsBusiness!=-1){
  //     console.log(
  //       "PropertyFullEvaluatorREMList.NumberOfValuationsFull 22",
  //       scopevaluationDetails.EvaluatorName,
  //       scopevaluationDetails.LandForcedSaleValue,
  //       scopevaluationDetails.LandMarketValue,
  //       scopevaluationDetails.BuildingForcedSaleValue,
  //       scopevaluationDetails.BuildingMarketValue
  //     );
  //     if (
  //       filteredItems != undefined &&
  //       filteredItems != null &&
  //       Object.keys(filteredItems).length > 0
  //     ) {
  //       console.log("deleteFSVDGrid", filteredItems);
  //       let grid = filteredItems;
  //       let totaolfvalue = scopevaluationDetails.TotalForcedSaleValue;
  //       let totaolmvalue = scopevaluationDetails.TotalMarketValue;
  //       grid.map((data, index) => {
  //         totaolfvalue =
  //           parseFloat(totaolfvalue) + parseFloat(data.TotalForcedSaleValue);
  //         totaolmvalue =
  //           parseFloat(totaolmvalue) + parseFloat(data.TotalMarketValue);

  //         console.log(
  //           "PropertyFullEvaluatorREMList.NumberOfValuationsFull 12",
  //           parseInt(data.TotalForcedSaleValue),
  //           totaolfvalue
  //         );
  //       });
  //       console.log(
  //         "PropertyFullEvaluatorREMList.NumberOfValuationsFull 13",
  //         totaolfvalue
  //       );
  //       let avgf = totaolfvalue / (parseInt(filteredItems.length) + 1);
  //       let avgm = totaolmvalue / (parseInt(filteredItems.length) + 1);
  //       console.log(
  //         "PropertyFullEvaluatorREMList.NumberOfValuationsFull 14",
  //         avgf,
  //         avgm,
  //         parseInt(filteredItems) + 1
  //       );

  //       setNBACasePropertyModelList({
  //         ...NBACasePropertyModelList,
  //         ["NumberOfValuationsFull"]: parseInt(filteredItems.length) + 1,
  //         ["AverageForcedSaleValueFull"]: avgf,
  //         ["AverageMarketValueFull"]: avgm,
  //         ["PropertyFullEvaluatorREMList"]: filteredItems,
  //       });
  //     } else {
  //       console.log("deleteFSVDGrid", filteredItems);
  //       console.log(
  //         "NBACasePropertyModelList.NumberOfValuationsBusiness 23",
  //         NBACasePropertyModelList
  //       );
  //       let avgf = scopevaluationDetails.TotalForcedSaleValue;
  //       let avgm = scopevaluationDetails.TotalMarketValue;
  //       setNBACasePropertyModelList({
  //         ...NBACasePropertyModelList,
  //         ["NumberOfValuationsFull"]: parseInt(1),
  //         ["AverageForcedSaleValueFull"]: avgf,
  //         ["AverageMarketValueFull"]: avgm,
  //         ["PropertyFullEvaluatorREMList"]: filteredItems,
  //       });
  //       setScopeValuationField(true);
  //     }
  //   } else {
  //     if (
  //       filteredItems != undefined &&
  //       filteredItems != null &&
  //       Object.keys(filteredItems).length > 0
  //     ) {
  //       console.log("deleteFSVDGrid", filteredItems);
  //       let grid = filteredItems;
  //       let totaolfvalue = 0;
  //       let totaolmvalue = 0;
  //       grid.map((data, index) => {
  //         totaolfvalue =
  //           parseFloat(data.TotalForcedSaleValue) + parseFloat(totaolfvalue);
  //         totaolmvalue =
  //           parseFloat(data.TotalMarketValue) + parseFloat(totaolmvalue);
  //       });
  //       console.log("deleteFSVDGrid", totaolfvalue);
  //       let avgf = totaolfvalue / parseInt(filteredItems.length);
  //       let avgm = totaolmvalue / parseInt(filteredItems.length);
  //       console.log("deleteFSVDGrid", filteredItems);

  //       setNBACasePropertyModelList({
  //         ...NBACasePropertyModelList,
  //         ["NumberOfValuationsFull"]: parseInt(filteredItems.length),
  //         ["AverageForcedSaleValueFull"]: avgf,
  //         ["AverageMarketValueFull"]: avgm,
  //         ["PropertyFullEvaluatorREMList"]: filteredItems,
  //       });
  //       if (
  //         filteredItems != undefined &&
  //         filteredItems != null &&
  //         Object.keys(filteredItems).length > 1
  //       ) {
  //         setScopeValuationField(false);
  //       } else {
  //         setScopeValuationField(true);
  //       }
  //     } else {
  //       console.log("deleteFSVDGrid", filteredItems);
  //       console.log("deleteFSVDGrid", filteredItems);
  //       setNBACasePropertyModelList({
  //         ...NBACasePropertyModelList,
  //         ["NumberOfValuationsFull"]: -1,
  //         ["AverageForcedSaleValueFull"]: -1,
  //         ["AverageMarketValueFull"]: -1,
  //         ["PropertyFullEvaluatorREMList"]: filteredItems,
  //       });

  //       setScopeValuationField(true);
  //     }
  //   }
  // };
  // Grid Rows of Full Scope Valuation Detail
  const scopevaluationDetailsREM = [
    {
      title: "Evaluator Name",
      dataIndex: "EvaluatorName",
      key: "EvaluatorName",
      align: "center",
      width: "250px",
    },
    {
      title: "Date Of Valuation",
      dataIndex: "DateOfValuation",
      key: "DateOfValuation",
      align: "center",
      width: "250px",
      // render: (text) => {
      //   if (String(text) != "") {
      //     return DateDisplayFormat(text);
      //   } else {
      //     return "";
      //   }
      // },
    },
    {
      title: "Land-Forced Sale Value",
      dataIndex: "LandForcedSaleValue",
      key: "LandForcedSaleValue",
      align: "center",
      width: "250px",
      render: (text) => {
        if (String(text) != "" && text != -1) {
          return CommaFormter(text);
        } else {
          return "";
        }
      },
    },
    {
      title: "Land-Market Value",
      dataIndex: "LandMarketValue",
      key: "LandMarketValue",
      align: "center",
      width: "250px",
      render: (text) => {
        if (String(text) != "" && text != -1) {
          return CommaFormter(text);
        } else {
          return "";
        }
      },
    },
    {
      title: "Building-Force Value",
      dataIndex: "BuildingForcedSaleValue",
      key: "BuildingForcedSaleValue",
      align: "center",
      width: "250px",
      render: (text) => {
        if (String(text) != "" && text != -1) {
          return CommaFormter(text);
        } else {
          return "";
        }
      },
    },
    {
      title: "Building-Market Value",
      dataIndex: "BuildingMarketValue",
      key: "BuildingMarketValue",
      align: "center",
      width: "250px",
      render: (text) => {
        if (String(text) != "" && text != -1) {
          return CommaFormter(text);
        } else {
          return "";
        }
      },
    },
    {
      title: "Total Forced Sale Value",
      dataIndex: "TotalForcedSaleValue",
      key: "TotalForcedSaleValue",
      align: "center",
      width: "250px",
      render: (text) => {
        if (String(text) != "" && text != -1) {
          return CommaFormter(text);
        } else {
          return "";
        }
      },
    },
    {
      title: "Total Market Value",
      dataIndex: "TotalMarketValue",
      key: "TotalMarketValue",
      align: "center",
      width: "250px",
      render: (text) => {
        if (String(text) != "" && text != -1) {
          return CommaFormter(text);
        } else {
          return "";
        }
      },
    },
    // {
    //   title: "Delete",
    //   dataIndex: "delete",
    //   key: "delete",
    //   align: "center",
    //   width: "250px",
    //   render: (text, record) => (
    //     <div
    //       style={{ cursor: "pointer" }}
    //       onClick={() => deleteFSVDGrid(record)}
    //       className="icon-trash icon-size-one pdfRed"
    //     />
    //   ),
    // },
  ];
  // // Delete data from grid of Desktop Valuation Detail
  // const deleteDVDGrid = (record) => {
  //   console.log("deleteGrid", record, NBACasePropertyModelList);

  //   const filteredItems =
  //     NBACasePropertyModelList.PropertyDesktopEvaluatorList.filter(
  //       (item) => item != record
  //     );
  //   console.log("deleteGrid", filteredItems);
  //   if (
  //     desktopvaluationDetails.TotalMarketValue != -1 ||
  //     desktopvaluationDetails.TotalForcedSaleValue != -1
  //   ) {
  //     // if(businessDetailSection.NumberOfValuationsBusiness!=-1){
  //     console.log(
  //       "PropertyDesktopEvaluatorList",
  //       desktopvaluationDetails.EvaluatorName,
  //       desktopvaluationDetails.LandForcedSaleValue,
  //       desktopvaluationDetails.LandMarketValue,
  //       desktopvaluationDetails.BuildingForcedSaleValue,
  //       desktopvaluationDetails.BuildingMarketValue
  //     );
  //     if (filteredItems.length > 0) {
  //       let grid = filteredItems;
  //       let totaolfvalue = desktopvaluationDetails.TotalForcedSaleValue;
  //       let totaolmvalue = desktopvaluationDetails.TotalMarketValue;
  //       grid.map((data, index) => {
  //         totaolfvalue =
  //           parseFloat(totaolfvalue) + parseFloat(data.TotalForcedSaleValue);
  //         totaolmvalue =
  //           parseFloat(totaolmvalue) + parseFloat(data.TotalMarketValue);

  //         console.log(
  //           "PropertyDesktopEvaluatorList",
  //           parseInt(data.TotalForcedSaleValue),
  //           totaolfvalue
  //         );
  //       });
  //       console.log("PropertyDesktopEvaluatorList", totaolfvalue);
  //       let avgf = totaolfvalue / (parseInt(filteredItems.length) + 1);
  //       let avgm = totaolmvalue / (parseInt(filteredItems.length) + 1);
  //       console.log(
  //         "PropertyDesktopEvaluatorList",
  //         avgf,
  //         avgm,
  //         parseInt(filteredItems) + 1
  //       );
  //       setNBACasePropertyModelList({
  //         ...NBACasePropertyModelList,
  //         ["NumberOfValuationsDesktop"]: parseInt(filteredItems.length) + 1,
  //         ["AverageForcedSaleValueDesktop"]: avgf,
  //         ["AverageMarketValueDesktop"]: avgm,
  //         ["PropertyDesktopEvaluatorList"]: filteredItems,
  //       });
  //     } else {
  //       console.log(
  //         "NBACasePropertyModelList.NumberOfValuationsBusiness 23",
  //         NBACasePropertyModelList
  //       );
  //       let avgf = desktopvaluationDetails.TotalForcedSaleValue;
  //       let avgm = desktopvaluationDetails.TotalMarketValue;
  //       setNBACasePropertyModelList({
  //         ...NBACasePropertyModelList,
  //         ["NumberOfValuationsDesktop"]: parseInt(1),
  //         ["AverageForcedSaleValueDesktop"]: avgf,
  //         ["AverageMarketValueDesktop"]: avgm,
  //         ["PropertyDesktopEvaluatorList"]: filteredItems,
  //       });
  //     }
  //   } else {
  //     if (
  //       filteredItems != undefined &&
  //       filteredItems != null &&
  //       Object.keys(filteredItems).length > 0
  //     ) {
  //       let grid = filteredItems;
  //       let totaolfvalue = 0;
  //       let totaolmvalue = 0;
  //       grid.map((data, index) => {
  //         totaolfvalue =
  //           parseFloat(data.TotalForcedSaleValue) + parseFloat(totaolfvalue);
  //         totaolmvalue =
  //           parseFloat(data.TotalMarketValue) + parseFloat(totaolmvalue);
  //       });
  //       console.log("deleteFSVDGrid", totaolfvalue);
  //       let avgf = totaolfvalue / parseInt(filteredItems.length);
  //       let avgm = totaolmvalue / parseInt(filteredItems.length);
  //       console.log("deleteFSVDGrid", filteredItems);
  //       setNBACasePropertyModelList({
  //         ...NBACasePropertyModelList,
  //         ["NumberOfValuationsDesktop"]: parseInt(filteredItems.length),
  //         ["AverageForcedSaleValueDesktop"]: avgf,
  //         ["AverageMarketValueDesktop"]: avgm,
  //         ["PropertyDesktopEvaluatorList"]: filteredItems,
  //       });
  //       if (
  //         filteredItems != undefined &&
  //         filteredItems != null &&
  //         Object.keys(filteredItems).length > 1
  //       ) {
  //         setDesktopValuationField(false);
  //       } else {
  //         setDesktopValuationField(true);
  //       }
  //     } else {
  //       console.log("deleteFSVDGrid", filteredItems);
  //       setNBACasePropertyModelList({
  //         ...NBACasePropertyModelList,
  //         ["NumberOfValuationsDesktop"]: -1,
  //         ["AverageForcedSaleValueDesktop"]: -1,
  //         ["AverageMarketValueDesktop"]: -1,
  //         ["PropertyDesktopEvaluatorList"]: filteredItems,
  //       });
  //       setDesktopValuationField(true);
  //     }
  //   }
  // };
  // Grid Rows of Desktop Valuation Detail
  const desktopvaluationDetailsREM = [
    {
      title: "Evaluator Name",
      dataIndex: "EvaluatorName",
      key: "EvaluatorName",
      align: "center",
      width: "250px",
    },
    {
      title: "Date Of Valuation",
      dataIndex: "DateOfValuation",
      key: "DateOfValuation",
      align: "center",
      width: "250px",
      // render: (text) => {
      //   if (String(text) != "") {
      //     return DateDisplayFormat(text);
      //   } else {
      //     return "";
      //   }
      // },
    },
    {
      title: "Land-Forced Sale Value",
      dataIndex: "LandForcedSaleValue",
      key: "LandForcedSaleValue",
      align: "center",
      width: "250px",
      render: (text) => {
        if (String(text) != "" && text != -1) {
          return CommaFormter(text);
        } else {
          return "";
        }
      },
    },
    {
      title: "Land-Market Value",
      dataIndex: "LandMarketValue",
      key: "LandMarketValue",
      align: "center",
      width: "250px",
      render: (text) => {
        if (String(text) != "" && text != -1) {
          return CommaFormter(text);
        } else {
          return "";
        }
      },
    },
    {
      title: "Building-Force Value",
      dataIndex: "BuildingForcedSaleValue",
      key: "BuildingForcedSaleValue",
      align: "center",
      width: "250px",
      render: (text) => {
        if (String(text) != "" && text != -1) {
          return CommaFormter(text);
        } else {
          return "";
        }
      },
    },
    {
      title: "Building-Market Value",
      dataIndex: "BuildingMarketValue",
      key: "BuildingMarketValue",
      align: "center",
      width: "250px",
      render: (text) => {
        if (String(text) != "" && text != -1) {
          return CommaFormter(text);
        } else {
          return "";
        }
      },
    },
    {
      title: "Total Forced Sale Value",
      dataIndex: "TotalForcedSaleValue",
      key: "TotalForcedSaleValue",
      align: "center",
      width: "250px",
      render: (text) => {
        if (String(text) != "" && text != -1) {
          return CommaFormter(text);
        } else {
          return "";
        }
      },
    },
    {
      title: "Total Market Value",
      dataIndex: "TotalMarketValue",
      key: "TotalMarketValue",
      align: "center",
      width: "250px",
      render: (text) => {
        if (String(text) != "" && text != -1) {
          return CommaFormter(text);
        } else {
          return "";
        }
      },
    },
    // {
    //   title: "Delete",
    //   dataIndex: "delete",
    //   key: "delete",
    //   align: "center",
    //   width: "250px",
    //   render: (text, record) => (
    //     <div
    //       style={{ cursor: "pointer" }}
    //       onClick={() => deleteDVDGrid(record)}
    //       className="icon-trash icon-size-one pdfRed"
    //     />
    //   ),
    // },
  ];
  // Full Scope Valuation Detail Total force sale value
  useEffect(() => {
    let LandForcedSaleValue = scopevaluationDetails.LandForcedSaleValue;
    let BuildingForcedSaleValue = scopevaluationDetails.BuildingForcedSaleValue;

    if (BuildingForcedSaleValue != -1 && LandForcedSaleValue != -1) {
      let newAmmount = BuildingForcedSaleValue + LandForcedSaleValue;
      setScopeValuationDetails({
        ...scopevaluationDetails,
        ["TotalForcedSaleValue"]: parseFloat(newAmmount),
      });
    } else if (BuildingForcedSaleValue != -1) {
      setScopeValuationDetails({
        ...scopevaluationDetails,
        ["TotalForcedSaleValue"]: parseFloat(BuildingForcedSaleValue).toFixed(
          2
        ),
      });
    } else if (LandForcedSaleValue != -1) {
      setScopeValuationDetails({
        ...scopevaluationDetails,
        ["TotalForcedSaleValue"]: parseFloat(LandForcedSaleValue),
      });
    } else {
      setScopeValuationDetails({
        ...scopevaluationDetails,
        ["TotalForcedSaleValue"]: parseInt(-1),
      });
      setScopeValuationDetails({
        ...scopevaluationDetails,
        ["TotalForcedSaleValue"]: parseInt(-1),
      });
    }
  }, [
    scopevaluationDetails.LandForcedSaleValue,
    scopevaluationDetails.BuildingForcedSaleValue,
  ]);
  // for Full Scope Valuation Detail Total land-market  value and buildding market value
  useEffect(() => {
    let LandMarketValue = parseFloat(scopevaluationDetails.LandMarketValue);
    let BuildingMarketValue = parseFloat(
      scopevaluationDetails.BuildingMarketValue
    );

    if (LandMarketValue != -1 && BuildingMarketValue != -1) {
      let newAmmount = LandMarketValue + BuildingMarketValue;
      setScopeValuationDetails({
        ...scopevaluationDetails,
        ["TotalMarketValue"]: parseFloat(newAmmount),
      });
    } else if (BuildingMarketValue != -1) {
      console.log("businessDetailSection.NumberOfValuationsBusiness 21");
      setScopeValuationDetails({
        ...scopevaluationDetails,
        ["TotalMarketValue"]: parseFloat(BuildingMarketValue),
      });
    } else if (LandMarketValue != -1) {
      setScopeValuationDetails({
        ...scopevaluationDetails,
        ["TotalMarketValue"]: parseFloat(LandMarketValue),
      });
    } else {
      setScopeValuationDetails({
        ...scopevaluationDetails,
        ["TotalMarketValue"]: parseInt(-1),
      });
    }
  }, [
    scopevaluationDetails.LandMarketValue,
    scopevaluationDetails.BuildingMarketValue,
  ]);
  //for Full Scope Valuation Detail average forced sale and average market value
  // useEffect(() => {
  //   // if (
  //   //   scopevaluationDetails.EvaluatorName != "" ||
  //   //   scopevaluationDetails.LandForcedSaleValue != -1 ||
  //   //   scopevaluationDetails.LandMarketValue != -1 ||
  //   //   scopevaluationDetails.BuildingForcedSaleValue != -1 ||
  //   //   scopevaluationDetails.BuildingMarketValue != -1
  //   // ) {
  //   if (
  //     scopevaluationDetails.TotalMarketValue != -1 ||
  //     scopevaluationDetails.TotalForcedSaleValue != -1
  //   ) {
  //     // if(businessDetailSection.NumberOfValuationsBusiness!=-1){
  //     console.log(
  //       "PropertyFullEvaluatorREMList.NumberOfValuationsFull 22",
  //       scopevaluationDetails.EvaluatorName,
  //       scopevaluationDetails.LandForcedSaleValue,
  //       scopevaluationDetails.LandMarketValue,
  //       scopevaluationDetails.BuildingForcedSaleValue,
  //       scopevaluationDetails.BuildingMarketValue
  //     );
  //     if (NBACasePropertyModelList.PropertyFullEvaluatorREMList.length > 0) {
  //       let grid = NBACasePropertyModelList.PropertyFullEvaluatorREMList;
  //       let totaolfvalue = scopevaluationDetails.TotalForcedSaleValue;
  //       let totaolmvalue = scopevaluationDetails.TotalMarketValue;
  //       grid.map((data, index) => {
  //         totaolfvalue =
  //           parseFloat(totaolfvalue) + parseFloat(data.TotalForcedSaleValue);
  //         totaolmvalue =
  //           parseFloat(totaolmvalue) + parseFloat(data.TotalMarketValue);

  //         console.log(
  //           "PropertyFullEvaluatorREMList.NumberOfValuationsFull 12",
  //           parseInt(data.TotalForcedSaleValue),
  //           totaolfvalue
  //         );
  //       });
  //       console.log(
  //         "PropertyFullEvaluatorREMList.NumberOfValuationsFull 13",
  //         totaolfvalue
  //       );
  //       let avgf =
  //         totaolfvalue /
  //         (parseInt(
  //           NBACasePropertyModelList.PropertyFullEvaluatorREMList.length
  //         ) +
  //           1);
  //       let avgm =
  //         totaolmvalue /
  //         (parseInt(
  //           NBACasePropertyModelList.PropertyFullEvaluatorREMList.length
  //         ) +
  //           1);
  //       console.log(
  //         "PropertyFullEvaluatorREMList.NumberOfValuationsFull 14",
  //         avgf,
  //         avgm,
  //         parseInt(NBACasePropertyModelList.NumberOfValuationsFull) + 1
  //       );

  //       setNBACasePropertyModelList({
  //         ...NBACasePropertyModelList,
  //         ["NumberOfValuationsFull"]:
  //           parseInt(
  //             NBACasePropertyModelList.PropertyFullEvaluatorREMList.length
  //           ) + 1,
  //         ["AverageForcedSaleValueFull"]: avgf,
  //         ["AverageMarketValueFull"]: avgm,
  //       });
  //     } else {
  //       console.log(
  //         "NBACasePropertyModelList.NumberOfValuationsBusiness 23",
  //         NBACasePropertyModelList
  //       );
  //       let avgf = scopevaluationDetails.TotalForcedSaleValue;
  //       let avgm = scopevaluationDetails.TotalMarketValue;
  //       setNBACasePropertyModelList({
  //         ...NBACasePropertyModelList,
  //         ["NumberOfValuationsFull"]: parseInt(1),
  //         ["AverageForcedSaleValueFull"]: avgf,
  //         ["AverageMarketValueFull"]: avgm,
  //       });
  //     }
  //   }
  //   // else {
  //   //   if (NBACasePropertyModelList.PropertyFullEvaluatorREMList.length > 0) {
  //   //     let grid = NBACasePropertyModelList.PropertyFullEvaluatorREMList;
  //   //     let totaolfvalue = scopevaluationDetails.TotalForcedSaleValue;
  //   //     let totaolmvalue = scopevaluationDetails.TotalMarketValue;
  //   //     grid.map((data, index) => {
  //   //       totaolfvalue =
  //   //         parseFloat(data.TotalForcedSaleValue) - parseFloat(totaolfvalue);
  //   //       totaolmvalue =
  //   //         parseFloat(data.TotalMarketValue) - parseFloat(totaolmvalue);

  //   //       console.log(
  //   //         "NBACasePropertyModelList.NumberOfValuationsBusiness 12",
  //   //         parseInt(data.TotalForcedSaleValue),
  //   //         totaolfvalue
  //   //       );
  //   //     });
  //   //     console.log(
  //   //       "NBACasePropertyModelList.NumberOfValuationsBusiness 13",
  //   //       totaolfvalue
  //   //     );
  //   //     let avgf =
  //   //       totaolfvalue /
  //   //       parseInt(
  //   //         NBACasePropertyModelList.PropertyFullEvaluatorREMList.length
  //   //       );
  //   //     let avgm =
  //   //       totaolmvalue /
  //   //       parseInt(
  //   //         NBACasePropertyModelList.PropertyFullEvaluatorREMList.length
  //   //       );
  //   //     console.log(
  //   //       "NBACasePropertyModelList.NumberOfValuationsBusiness 14",
  //   //       avgf,
  //   //       avgm,
  //   //       parseInt(NBACasePropertyModelList.NumberOfValuationsFull) + 1
  //   //     );

  //   //     setNBACasePropertyModelList({
  //   //       ...NBACasePropertyModelList,
  //   //       ["NumberOfValuationsFull"]: parseInt(
  //   //         NBACasePropertyModelList.PropertyFullEvaluatorREMList.length
  //   //       ),
  //   //       ["AverageForcedSaleValueFull"]: avgf,
  //   //       ["AverageMarketValueFull"]: avgm,
  //   //     });
  //   //   } else {
  //   //     setNBACasePropertyModelList({
  //   //       ...NBACasePropertyModelList,
  //   //       ["NumberOfValuationsFull"]: -1,
  //   //       ["AverageForcedSaleValueFull"]: -1,
  //   //       ["AverageMarketValueFull"]: -1,
  //   //     });
  //   //   }
  //   // }
  // }, [scopevaluationDetails]);
  //Add Record button For Full Scope Valuation Detail

  // Desktop Valuation Detail  Total force sale value
  useEffect(() => {
    let LandForcedSaleValue = desktopvaluationDetails.LandForcedSaleValue;
    let BuildingForcedSaleValue =
      desktopvaluationDetails.BuildingForcedSaleValue;

    if (BuildingForcedSaleValue != -1 && LandForcedSaleValue != -1) {
      let newAmmount = BuildingForcedSaleValue + LandForcedSaleValue;
      setDesktopValuationDetails({
        ...desktopvaluationDetails,
        ["TotalForcedSaleValue"]: parseFloat(newAmmount),
      });
    } else if (BuildingForcedSaleValue != -1) {
      setDesktopValuationDetails({
        ...desktopvaluationDetails,
        ["TotalForcedSaleValue"]: parseFloat(BuildingForcedSaleValue).toFixed(
          2
        ),
      });
    } else if (LandForcedSaleValue != -1) {
      setDesktopValuationDetails({
        ...desktopvaluationDetails,
        ["TotalForcedSaleValue"]: parseFloat(LandForcedSaleValue),
      });
    } else {
      setDesktopValuationDetails({
        ...desktopvaluationDetails,
        ["TotalForcedSaleValue"]: parseInt(-1),
      });
      setDesktopValuationDetails({
        ...desktopvaluationDetails,
        ["TotalForcedSaleValue"]: parseInt(-1),
      });
    }
  }, [
    desktopvaluationDetails.LandForcedSaleValue,
    desktopvaluationDetails.BuildingForcedSaleValue,
  ]);
  // for Full Scope Valuation Detail Total land-market  value and buildding market value
  useEffect(() => {
    let LandMarketValue = parseFloat(desktopvaluationDetails.LandMarketValue);
    let BuildingMarketValue = parseFloat(
      desktopvaluationDetails.BuildingMarketValue
    );

    if (LandMarketValue != -1 && BuildingMarketValue != -1) {
      let newAmmount = LandMarketValue + BuildingMarketValue;
      setDesktopValuationDetails({
        ...desktopvaluationDetails,
        ["TotalMarketValue"]: parseFloat(newAmmount),
      });
    } else if (BuildingMarketValue != -1) {
      console.log("businessDetailSection.NumberOfValuationsBusiness 21");
      setDesktopValuationDetails({
        ...desktopvaluationDetails,
        ["TotalMarketValue"]: parseFloat(BuildingMarketValue),
      });
    } else if (LandMarketValue != -1) {
      setDesktopValuationDetails({
        ...desktopvaluationDetails,
        ["TotalMarketValue"]: parseFloat(LandMarketValue),
      });
    } else {
      setDesktopValuationDetails({
        ...desktopvaluationDetails,
        ["TotalMarketValue"]: parseInt(-1),
      });
    }
  }, [
    desktopvaluationDetails.LandMarketValue,
    desktopvaluationDetails.BuildingMarketValue,
  ]);
  //for Desktop Valuation Detail average forced sale and average market value
  // useEffect(() => {
  //   if (
  //     desktopvaluationDetails.TotalMarketValue != -1 ||
  //     desktopvaluationDetails.TotalForcedSaleValue != -1
  //   ) {
  //     // if(businessDetailSection.NumberOfValuationsBusiness!=-1){
  //     console.log(
  //       "PropertyDesktopEvaluatorList.NumberOfValuationsBusiness 22",
  //       desktopvaluationDetails.EvaluatorName,
  //       desktopvaluationDetails.LandForcedSaleValue,
  //       desktopvaluationDetails.LandMarketValue,
  //       desktopvaluationDetails.BuildingForcedSaleValue,
  //       desktopvaluationDetails.BuildingMarketValue
  //     );
  //     if (NBACasePropertyModelList.PropertyDesktopEvaluatorList.length > 0) {
  //       let grid = NBACasePropertyModelList.PropertyDesktopEvaluatorList;
  //       let totaolfvalue = desktopvaluationDetails.TotalForcedSaleValue;
  //       let totaolmvalue = desktopvaluationDetails.TotalMarketValue;
  //       grid.map((data, index) => {
  //         totaolfvalue =
  //           parseFloat(totaolfvalue) + parseFloat(data.TotalForcedSaleValue);
  //         totaolmvalue =
  //           parseFloat(totaolmvalue) + parseFloat(data.TotalMarketValue);

  //         console.log(
  //           "PropertyDesktopEvaluatorList.NumberOfValuationsDesktop 12",
  //           parseInt(data.TotalForcedSaleValue),
  //           totaolfvalue
  //         );
  //       });
  //       console.log(
  //         "PropertyDesktopEvaluatorList.NumberOfValuationsDesktop 13",
  //         totaolfvalue
  //       );
  //       let avgf =
  //         totaolfvalue /
  //         (parseInt(
  //           NBACasePropertyModelList.PropertyDesktopEvaluatorList.length
  //         ) +
  //           1);
  //       let avgm =
  //         totaolmvalue /
  //         (parseInt(
  //           NBACasePropertyModelList.PropertyDesktopEvaluatorList.length
  //         ) +
  //           1);
  //       console.log(
  //         "PropertyDesktopEvaluatorList.NumberOfValuationsBusiness 14",
  //         avgf,
  //         avgm,
  //         parseInt(NBACasePropertyModelList.NumberOfValuationsDesktop) + 1
  //       );

  //       setNBACasePropertyModelList({
  //         ...NBACasePropertyModelList,
  //         ["NumberOfValuationsDesktop"]:
  //           parseInt(
  //             NBACasePropertyModelList.PropertyDesktopEvaluatorList.length
  //           ) + 1,
  //         ["AverageForcedSaleValueDesktop"]: avgf,
  //         ["AverageMarketValueDesktop"]: avgm,
  //       });
  //     } else {
  //       console.log(
  //         "NBACasePropertyModelList.NumberOfValuationsBusiness 23",
  //         NBACasePropertyModelList
  //       );
  //       let avgf = desktopvaluationDetails.TotalForcedSaleValue;
  //       let avgm = desktopvaluationDetails.TotalMarketValue;
  //       setNBACasePropertyModelList({
  //         ...NBACasePropertyModelList,
  //         ["NumberOfValuationsDesktop"]: parseInt(1),
  //         ["AverageForcedSaleValueDesktop"]: avgf,
  //         ["AverageMarketValueDesktop"]: avgm,
  //       });
  //     }
  //   }
  //   // else {
  //   //   if (NBACasePropertyModelList.PropertyDesktopEvaluatorList.length > 0) {
  //   //     let grid = NBACasePropertyModelList.PropertyDesktopEvaluatorList;
  //   //     let totaolfvalue = desktopvaluationDetails.TotalForcedSaleValue;
  //   //     let totaolmvalue = desktopvaluationDetails.TotalMarketValue;
  //   //     grid.map((data, index) => {
  //   //       totaolfvalue =
  //   //         parseFloat(data.TotalForcedSaleValue) - parseFloat(totaolfvalue);
  //   //       totaolmvalue =
  //   //         parseFloat(data.TotalMarketValue) - parseFloat(totaolmvalue);

  //   //       console.log(
  //   //         "NBACasePropertyModelList.NumberOfValuationsBusiness 12",
  //   //         parseInt(data.TotalForcedSaleValue),
  //   //         totaolfvalue
  //   //       );
  //   //     });
  //   //     console.log(
  //   //       "NBACasePropertyModelList.NumberOfValuationsBusiness 13",
  //   //       totaolfvalue
  //   //     );
  //   //     let avgf =
  //   //       totaolfvalue /
  //   //       parseInt(
  //   //         NBACasePropertyModelList.PropertyDesktopEvaluatorList.length
  //   //       );
  //   //     let avgm =
  //   //       totaolmvalue /
  //   //       parseInt(
  //   //         NBACasePropertyModelList.PropertyDesktopEvaluatorList.length
  //   //       );
  //   //     console.log(
  //   //       "NBACasePropertyModelList.NumberOfValuationsBusiness 14",
  //   //       avgf,
  //   //       avgm,
  //   //       parseInt(NBACasePropertyModelList.NumberOfValuationsDesktop) + 1
  //   //     );

  //   //     setNBACasePropertyModelList({
  //   //       ...NBACasePropertyModelList,
  //   //       ["NumberOfValuationsDesktop"]: parseInt(
  //   //         NBACasePropertyModelList.PropertyDesktopEvaluatorList.length
  //   //       ),
  //   //       ["AverageForcedSaleValueDesktop"]: avgf,
  //   //       ["AverageMarketValueDesktop"]: avgm,
  //   //     });
  //   //   } else {
  //   //     setNBACasePropertyModelList({
  //   //       ...NBACasePropertyModelList,
  //   //       ["NumberOfValuationsDesktop"]: -1,
  //   //       ["AverageForcedSaleValueDesktop"]: -1,
  //   //       ["AverageMarketValueDesktop"]: -1,
  //   //     });
  //   //   }
  //   // }
  // }, [desktopvaluationDetails]);
  // property type handler
  const propertyTypeHandler = (e, value) => {
    setPropertyTypeName(value);
    console.log("propertyTypeHandler", value);
    let PropertyID = 0;
    DPAList.map((data, index) => {
      if (value === data.PropertyAcquiredDetails) {
        let id = data.NBACasePropertyID;
        PropertyID = id;
        setNBACasePropertyModelList({
          ...NBACasePropertyModelList,
          ["NBACasePropertyID"]: parseInt(id),
        });
      }
    });
    nonBankingAssets.ViewREMCaseData.nbaCasePropertyModelList.map(
      (data, index) => {
        console.log("ViewREMCaseData 10", data);
        if (data.nbaCasePropertyID === PropertyID) {
          console.log("ViewREMCaseData 11", data);
          let propertyFullEvaluatorREMList = data.propertyFullEvaluatorREMList;
          let propertyDesktopEvaluatorList = data.propertyDesktopEvaluatorList;
          let tem1 = [];
          let tem2 = [];
          propertyFullEvaluatorREMList.map((data1, index) => {
            tem1.push({
              EvaluatorName: data1.evaluatorName,
              LandForcedSaleValue: data1.landForcedSaleValue,
              LandMarketValue: data1.landMarketValue,
              BuildingForcedSaleValue: data1.buildingForcedSaleValue,
              BuildingMarketValue: data1.buildingMarketValue,
              TotalForcedSaleValue: data1.totalForcedSaleValue,
              TotalMarketValue: data1.totalMarketValue,
              DateOfValuation: data1.dateOfValuation,
            });
          });
          propertyDesktopEvaluatorList.map((data1, index) => {
            tem2.push({
              EvaluatorName: data1.evaluatorName,
              LandForcedSaleValue: data1.landForcedSaleValue,
              LandMarketValue: data1.landMarketValue,
              BuildingForcedSaleValue: data1.buildingForcedSaleValue,
              BuildingMarketValue: data1.buildingMarketValue,
              TotalForcedSaleValue: data1.totalForcedSaleValue,
              TotalMarketValue: data1.totalMarketValue,
              DateOfValuation: data1.dateOfValuation,
            });
          });
          let checkdata = {
            NBACasePropertyID: data.nbaCasePropertyID,
            TitleTransferDate: data.titleTransferDate,
            CurrentUseOfAsset: data.currentUseOfAsset,
            RevaluatedAmount: data.revaluatedAmount,
            StrategyForDisposal: data.strategyForDisposal,
            DisposalOrTransferDateForAsset: data.disposalOrTransferDateForAsset,
            IncomeEarnedFromAsset: data.incomeEarnedFromAsset,
            DisposalOwnUseStatus: data.disposalOwnUseStatus,
            NumberOfValuationsFull: data.numberOfValuationsFull,
            AverageForcedSaleValueFull: data.averageForcedSaleValueFull,
            AverageMarketValueFull: data.averageMarketValueFull,
            NumberOfValuationsDesktop: data.numberOfValuationsDesktop,
            AverageForcedSaleValueDesktop: data.averageForcedSaleValueDesktop,
            AverageMarketValueDesktop: data.averageMarketValueDesktop,
            PropertyFullEvaluatorREMList: tem1,
            PropertyDesktopEvaluatorList: tem2,
          };
          console.log("ViewREMCaseData 12", checkdata);
          console.log("ViewREMCaseData 13", typeof tem1);
          if (Object.keys(tem1).length > 1 && Object.keys(tem2).length > 1) {
            setScopeValuationField(false);
            setDesktopValuationField(false);
          } else if (Object.keys(tem1).length > 1) {
            setScopeValuationField(false);
            setDesktopValuationField(true);
          } else if (Object.keys(tem2).length > 1) {
            setScopeValuationField(true);
            setDesktopValuationField(false);
          } else {
            setScopeValuationField(true);
            setDesktopValuationField(true);
          }
          setNBACasePropertyModelList({
            NBACasePropertyID: data.nbaCasePropertyID,
            TitleTransferDate: data.titleTransferDate,
            CurrentUseOfAsset: data.currentUseOfAsset,
            RevaluatedAmount: data.revaluatedAmount,
            StrategyForDisposal: data.strategyForDisposal,
            DisposalOrTransferDateForAsset: data.disposalOrTransferDateForAsset,
            IncomeEarnedFromAsset: data.incomeEarnedFromAsset,
            DisposalOwnUseStatus: data.disposalOwnUseStatus,
            NumberOfValuationsFull: data.numberOfValuationsFull,
            AverageForcedSaleValueFull: data.averageForcedSaleValueFull,
            AverageMarketValueFull: data.averageMarketValueFull,
            NumberOfValuationsDesktop: data.numberOfValuationsDesktop,
            AverageForcedSaleValueDesktop: data.averageForcedSaleValueDesktop,
            AverageMarketValueDesktop: data.averageMarketValueDesktop,
            PropertyFullEvaluatorREMList: tem1,
            PropertyDesktopEvaluatorList: tem2,
          });
        }
      }
    );
  };
  function isNegative(num) {
    if (Math.sign(num) === -1) {
      return true;
    }

    return false;
  }
  const RASManagementHandler = async (e) => {
    let name = e.target.name;
    let value = e.target.value;
    let newvalue = parseFloat(value);

    console.log(
      "saveRASNewDataList.ProvisionalReversalDate in",
      value === "",
      value === "18000101"
    );
    if (name === "RemarksRASC" && value !== "") {
      var valueCheck = value.replace(
        /[a-zA-Z_0-9@\!#\$\^%&*()+=\-[]\\\';,\.\/\{\}\|\":<>\? ]/,
        ""
      );
      console.log("valueCheck", valueCheck);
      console.log("realEstateManagementHandler", name, value);

      if (!valueCheck == "") {
        console.log("valueCheck in", valueCheck);
        setSaveRASNewDataList({
          ...saveRASNewDataList,
          ["RemarksRASC"]: valueCheck.trimStart(),
        });
      }
    } else if (name === "RemarksRASC" && value === "") {
      setSaveRASNewDataList({
        ...saveRASNewDataList,
        ["RemarksRASC"]: "",
      });
    }
    if (
      name === "ProvisionalReversalDate" &&
      value != "" &&
      value != "18000101"
    ) {
      setSaveRASNewDataList({
        ...saveRASNewDataList,
        [name]: DateSendingFormat(value),
      });
    } else if (
      name === "ProvisionalReversalDate" &&
      (value === "" || value === "18000101")
    ) {
      setSaveRASNewDataList({
        ...saveRASNewDataList,
        [name]: "18000101",
      });
    }
    if (isNegative(newvalue)) {
      newvalue = newvalue * -1;
    }
    value = newvalue.toString();
    if (
      name === "ProvisionalReversalAmount" &&
      value != -1 &&
      value != "" &&
      !isNaN(value)
    ) {
      console.log("value 444", name, value);
      if (value % -1 != 0) {
        console.log("ValueReminder", value);
        if (value.length <= 18) {
          console.log("value 444", name, value.length);
          setSaveRASNewDataList({
            ...saveRASNewDataList,
            [name]: parseFloat(value),
          });
        } else {
          console.log("sliceValue", value.slice(0, 18));
          value = value.slice(0, 18);
          setSaveRASNewDataList({
            ...saveRASNewDataList,
            [name]: parseFloat(value),
          });
        }
      } else {
        if (value.length <= 15) {
          console.log("ValueReminder", name, value.length);
          setSaveRASNewDataList({
            ...saveRASNewDataList,
            [name]: parseFloat(value),
          });
        } else {
          console.log("ValueReminder", name, value.length);

          value = value.slice(0, 15);
          setSaveRASNewDataList({
            ...saveRASNewDataList,
            [name]: parseFloat(value),
          });
        }
      }
    }
  };
  const goToSaveHandler = async (e) => {
    e.preventDefault();
    console.log("SaveRASAeamData", saveRASNewDataList);

    if (
      saveRASNewDataList.ProvisionalReversalDate != "" &&
      saveRASNewDataList.ProvisionalReversalDate != "18000101" &&
      saveRASNewDataList.RemarksRASC != "" &&
      saveRASNewDataList.ProvisionalReversalAmount != -1
    ) {
      setRemarksAmountDate(false);
      let Data = {
        RemarksRASC: saveRASNewDataList.RemarksRASC,
        NBACaseID: saveRASNewDataList.NBACaseID,
        SendForApproval: saveRASNewDataList.SendForApproval,
        ProvisionalReversalAmount: saveRASNewDataList.ProvisionalReversalAmount,
        ProvisionalReversalDate: saveRASNewDataList.ProvisionalReversalDate,
      };

      console.log("SaveRASAeamData", Data);
      dispatch(SaveRASAeamData(Data));
    } else {
      setRemarksAmountDate(true);
      setOpen({
        flag: true,
        message: "Enter Required Fields",
      });
    }
  };
  const reverted = () => {
    showModal2();
    let viewData = nonBankingAssets.ViewREMCaseData.nbaCaseID;
    console.log("testVariable", viewData);
    setRejectDispute({
      ...rejectDispute,
      NBACaseID: viewData,
    });
  };
  console.log(
    "saveRASNewDataList.ProvisionalReversalDate",
    saveRASNewDataList.ProvisionalReversalDate
  );

  useEffect(() => {
    // if (nonBankingAssets.ResponseMessage) {
    //   console.log("nonBankingAssets", nonBankingAssets);
    //   setOpen({
    //     flag: true,
    //     message: nonBankingAssets.ResponseMessage,
    //   });
    // dispatch(HideNotification());
    // }
    let Notification = nonBankingAssets.ShowNotification;
    console.log("SaveBusinessTeamData", Notification);
    if (Notification === true) {
      console.log("SaveBusinessTeamData");
      setOpen({
        flag: true,
        message: nonBankingAssets.ResponseMessage,
      });
      setTimeout(() => {
        dispatch(notificationFalse());
      }, 1500);
    } else {
      console.log("SaveBusinessTeamData");
      if (Notification != false) {
        console.log("SaveBusinessTeamData");
        dispatch(notificationFalse());
      }
    }
  }, [nonBankingAssets.ResponseMessage]);

  return (
    <>
      <form onSubmit={(e) => goToSaveHandler(e)}>
        <Title className={styles["RascEditHeading"]} level={3}>
          Non-Banking Assets & Other Assets
        </Title>
        <Row gutter={[16, 16]}>
          <Col xl={24} lg={24} sm={24} xs={24}>
            {NBACaseCustomerList &&
            Object.keys(NBACaseCustomerList).length > 0 ? (
              <NBACustomerDetailsVIEW
                saveNewData={saveNewData}
                NBACaseCustomerList={NBACaseCustomerList}
              />
            ) : null}
          </Col>
          <div className={styles["NBABusinessSection"]} />
          <Col xl={24} lg={24} sm={24} xs={24}>
            {NBACaseCustomerList &&
            Object.keys(NBACaseCustomerList).length > 0 ? (
              <NBABusinessDetailsVIEW
                saveNewData={saveNewData}
                NBACasePropertyModelList={REMCasePropertyModelList}
                setupForms={setupForms}
              />
            ) : null}
          </Col>
          <div className={styles["NBARemSection"]} />
          <Col xl={24} lg={24} sm={24} xs={24}>
            {NBACaseCustomerList &&
            Object.keys(NBACaseCustomerList).length > 0 ? (
              <NBAREMVIEW
                saveNewDataList={saveNewDataList}
                NBACasePropertyModelList={NBACasePropertyModelList}
                DPAOptionValueList={DPAOptionValueList}
                propertyTypeHandler={propertyTypeHandler}
                propertyTypeName={propertyTypeName}
                setupForms={setupForms}
                disabledDOUS={disabledDOUS}
                desktopvaluationDetailsREM={desktopvaluationDetailsREM}
                scopevaluationDetailsREM={scopevaluationDetailsREM}
              />
            ) : null}
          </Col>
        </Row>
        <div className={styles["RASCheading"]} />
        <Paper className={styles["DERASCpaper"]}>
          <Col xl={8} lg={8} sm={6} xs={24} className={styles["DERASCpaperbottom"]}>
            <h1
              className={styles["RASCh1"]}
            >
              RA&SC
            </h1>
          </Col>
          <Row gutter={[16, 16]} className={styles["provisionalAmountorDatepadding"]}>
            <Col xl={12} lg={12} sm={24} xs={24}>
              <FormattedInputs
                name="ProvisionalReversalAmount"
                size="small"
                label={"Provisional Reversal Amount "}
                autoComplete="off"
                placeholder="Provisional Reversal Amount "
                textLength={(999, 999, 999, 999, 999, 999, 999)}
                value={
                  saveRASNewDataList.ProvisionalReversalAmount === null ||
                  saveRASNewDataList.ProvisionalReversalAmount === -1
                    ? null
                    : NumberFormater(
                        saveRASNewDataList.ProvisionalReversalAmount
                      )
                }
                change={RASManagementHandler}
                fullWidth
                // required
              />
              {remarkAmountDate === true &&
              saveRASNewDataList.ProvisionalReversalAmount === -1 ? (
                <ErrorBar errorText={"The Field is Empty"} />
              ) : null}
            </Col>
            <Col xl={12} lg={12} sm={24} xs={24}>
              <label>
                <b className={styles["ProvisionalDate"]}>
                  Provisional Reversal Date
                  <span className={styles["ProvisionalDate-span"]}>*</span>
                </b>
              </label>
              {console.log(
                "saveRASNewDataList.ProvisionalReversalDate",
                saveRASNewDataList.ProvisionalReversalDate
              )}
              <DatePicker
                name="ProvisionalReversalDate"
                size="large"
                placeholder="Provisional Reversal Date"
                change={RASManagementHandler}
                value={
                  saveRASNewDataList.ProvisionalReversalDate != "18000101" &&
                  saveRASNewDataList.ProvisionalReversalDate != ""
                    ? DateDisplayFormat(
                        saveRASNewDataList.ProvisionalReversalDate
                      )
                    : ""

                  //   ? (
                  //     saveRASNewDataList.ProvisionalReversalDate
                  //   )
                  // : ""
                }
                // required
                DateRange
                width="100%"
              />
              {remarkAmountDate === true &&
              saveRASNewDataList.ProvisionalReversalDate === "18000101" ? (
                <ErrorBar errorText={"The Field is Empty"} />
              ) : null}
            </Col>
          </Row>
        </Paper>

        {console.log("RemarksRASC", saveRASNewDataList.RemarksRASC)}
        <div className={styles["Remarks"]} />
        <Col xl={24} lg={24} sm={24} xs={24}>
          <label>
            <b className={styles["Remarkslabel"]}>
              Remarks <span className={styles["ProvisionalDate-span"]} >*</span>
            </b>
          </label>
          <TextField
            name="RemarksRASC"
            size="large"
            placeholder="Remarks"
            textLength={500}
            className={styles["input-field-w100"]}
            // width="100%"
            // label={"Remarks"}
            value={saveRASNewDataList.RemarksRASC}
            change={RASManagementHandler}
            // required
          />
          {remarkAmountDate === true &&
          saveRASNewDataList.RemarksRASC === "" ? (
            <ErrorBar errorText={"The Field is Empty"} />
          ) : null}
        </Col>

        <div className={styles["submitbtns"]}/>
        <Row gutter={[16, 16]}>
          <Col xl={10} lg={10} sm={24} xs={24} align="Right">
            <Button
              type="Submit"
              applyClass="btnBorderStyledBeach"
              text="Save"
              icon={<i className="icon-save icon-size-one"></i>}
              click={() =>
                setSaveRASNewDataList({
                  ...saveRASNewDataList,
                  ["SendForApproval"]: 1,
                })
              }
            />
          </Col>

          <Col xl={14} lg={14} sm={24} xs={24} align="Left">
            <Button
              type="Submit"
              applyClass="btnBorderStyledBeach"
              text="Save & Send For Approval"
              icon={<i className="icon-sent icon-size-one"></i>}
              click={() =>
                setSaveRASNewDataList({
                  ...saveRASNewDataList,
                  ["SendForApproval"]: 2,
                })
              }
            />
          </Col>
        </Row>
      </form>
      {/* <div style={{ marginTop: "2%" }} /> */}
      {/* <Col xl={24} lg={24} sm={24}><Row>
        <Col xl={8} lg={8}></Col>
        <Col xl={8} lg={8} sm={24} xs={24} style={{ ...({ marginLeft: "-28px" }) }}>
          <Button
            type="Submit"
            fullWidth={true}
            applyClass="btnBorderStyledRed"
            text="Revert"
            icon={<i className="icon-update icon-size-one"></i>}
            click={reverted}
            style={{ width: "433px" }}
          />
        </Col>
      </Row></Col> */}
      <Modal
        closeModal={handleCancel}
        modalState={isModalVisible2}
        width={700}
        modalTitle={<Title level={3}>{"Revert"}</Title>}
      >
        <>
          <div>
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
          <div>
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
                textLength={300}
              />
            </Col>
          </div>
          <GroupedButtons data={buttonPropsReject} />
        </>
      </Modal>
      {nonBankingAssets.Loading ? <Loader /> : null}
      <Notification setOpen={setOpen} open={open.flag} message={open.message} />
    </>
  );
};

export default EditNBAAssetsDERAM;
