import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Typography, Radio } from "antd";
import moment from "moment";
import styles from "../DEREM.module.css";


import {
  Paper,
  InputWithBtn,
  TextField,
  SelectBox,
  DatePicker,
  Button,
  Notification,
  Message,
  Loader,
  Table,
  NumberFormatCustom,
  FormattedInputs,
} from "../../../Components/Elements";
import { GetAllPropertyType,GetAllApprovalRejectionReasons, } from "../../../store/actions/setup-forms-actions";
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
  SaveREMTeamData,
  RevertCase,
  notificationFalse,
} from "../../../store/actions/nonbanking-assets-actions";
import NBABusinessDetailsVIEW from "./nbaBusiness-view";
import NBACustomerDetailsVIEW from "./nbacustomer-view";
import { Row, Col } from "antd";
const ViewNBAAssetsDEREM = () => {
  const navigate = useNavigate();
  const { Title } = Typography;
  const dispatch = useDispatch();

  const date = moment().format("YYYY-MM-DD");
  const state = useSelector((state) => state);
  const { setupForms, nonBankingAssets } = state;
  // for notification
  const [open, setOpen] = useState({
    flag: false,
    message: "",
  });
  // fro index of property selected index
  const [indexSelected, setIndexSelected] = useState(-1);
  // fro index of property selected
  const [propertySelected, setPopertySelected] = useState(-1);
  // for Full Scope Valuation Detail required
  const [requiredFieldAproved, setRequiredFieldAproved] = useState(false);
  // for Full Scope Valuation Detail required
  const [scopeValuationField, setScopeValuationField] = useState(false);
  // for Desktop Valuation Detail
  const [desktopValuationField, setDesktopValuationField] = useState(false);
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
    DateOfValuation: "18000101",
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
    DateOfValuation: "18000101",
  });
  // for Real Estate Management jason object name NBACasePropertyModelList States
  const [NBACasePropertyModelList, setNBACasePropertyModelList] = useState({
    NBACasePropertyID: -1,
    TitleTransferDate: "",
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
    RequiredFieldAproved: false,
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
    navigate("/NBA/DataEntryRem/CasesInProcess");
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
  useEffect(() => {
    dispatch(GetAllPropertyType());
    dispatch(GetAllApprovalRejectionReasons());
    if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
      let NBACaseID = JSON.parse(localStorage.getItem("NBACaseID"));
      let Data = {
        NBACaseID: NBACaseID,
      };
      console.log("ViewBusinessTeamData NBACaseID", NBACaseID);

      dispatch(ViewREMTeamData(Data));
    }
  }, []);
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
  // For all edit view
  useEffect(() => {
    console.log("ViewREMCaseData", nonBankingAssets.ViewREMCaseData);
    if (
      nonBankingAssets.ViewREMCaseData &&
      Object.keys(nonBankingAssets.ViewREMCaseData).length > 0
    ) {
      let viewData = nonBankingAssets.ViewREMCaseData;
      console.log("ViewBusinessTeamData", viewData);
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
          let date = data.disposalOrTransferDateForAsset;
          if (data.disposalOrTransferDateForAsset != "") {
            date = data.disposalOrTransferDateForAsset;
          } else {
            date = "18000101";
          }
          let dateTitleTransferDate = data.titleTransferDate;
          if (data.titleTransferDate != "") {
            dateTitleTransferDate = data.titleTransferDate;
          } else {
            dateTitleTransferDate = "18000101";
          }
          tem22.push({
            // PropertyType: data.propertyType,
            // PropertyAcquiredDetails: data.propertyAcquiredDetails,
            NBACasePropertyID: data.nbaCasePropertyID,
            TitleTransferDate: dateTitleTransferDate,
            CurrentUseOfAsset: data.currentUseOfAsset,
            RevaluatedAmount: data.revaluatedAmount,
            StrategyForDisposal: data.strategyForDisposal,
            DisposalOrTransferDateForAsset: date,
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
        console.log("ViewBusinessTeamData", tem);
        console.log("tempropettpye", tempropettpye);
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
        console.log("ViewBusinessTeamData", tem);
        setNBACaseCustomerList(tem);
      }
    }
  }, [nonBankingAssets.ViewREMCaseData]);
  console.log("NBACasePropertyModelListAr check", NBACasePropertyModelListAr);
  //
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
  const deleteFSVDGrid = (record) => {
    console.log("deleteFSVDGrid", record, NBACasePropertyModelList);

    const filteredItems =
      NBACasePropertyModelList.PropertyFullEvaluatorREMList.filter(
        (item) => item != record
      );
    console.log("deleteFSVDGrid", typeof filteredItems);
    if (
      scopevaluationDetails.TotalMarketValue != -1 ||
      scopevaluationDetails.TotalForcedSaleValue != -1
    ) {
      console.log("deleteFSVDGrid", filteredItems);
      // if(businessDetailSection.NumberOfValuationsBusiness!=-1){
      console.log(
        "PropertyFullEvaluatorREMList.NumberOfValuationsFull 22",
        scopevaluationDetails.EvaluatorName,
        scopevaluationDetails.LandForcedSaleValue,
        scopevaluationDetails.LandMarketValue,
        scopevaluationDetails.BuildingForcedSaleValue,
        scopevaluationDetails.BuildingMarketValue
      );
      if (
        filteredItems != undefined &&
        filteredItems != null &&
        Object.keys(filteredItems).length > 0
      ) {
        console.log("deleteFSVDGrid", filteredItems);
        let grid = filteredItems;
        let totaolfvalue = scopevaluationDetails.TotalForcedSaleValue;
        let totaolmvalue = scopevaluationDetails.TotalMarketValue;
        grid.map((data, index) => {
          totaolfvalue =
            parseFloat(totaolfvalue) + parseFloat(data.TotalForcedSaleValue);
          totaolmvalue =
            parseFloat(totaolmvalue) + parseFloat(data.TotalMarketValue);

          console.log(
            "PropertyFullEvaluatorREMList.NumberOfValuationsFull 12",
            parseInt(data.TotalForcedSaleValue),
            totaolfvalue
          );
        });
        console.log(
          "PropertyFullEvaluatorREMList.NumberOfValuationsFull 13",
          totaolfvalue
        );
        let avgf = totaolfvalue / (parseInt(filteredItems.length) + 1);
        let avgm = totaolmvalue / (parseInt(filteredItems.length) + 1);
        console.log(
          "PropertyFullEvaluatorREMList.NumberOfValuationsFull 14",
          avgf,
          avgm,
          parseInt(filteredItems) + 1
        );

        setNBACasePropertyModelList({
          ...NBACasePropertyModelList,
          // ["NumberOfValuationsFull"]: parseInt(filteredItems.length) + 1,
          // ["AverageForcedSaleValueFull"]: avgf,
          // ["AverageMarketValueFull"]: avgm,
          ["PropertyFullEvaluatorREMList"]: filteredItems,
        });
      } else {
        console.log("deleteFSVDGrid", filteredItems);
        console.log(
          "NBACasePropertyModelList.NumberOfValuationsBusiness 23",
          NBACasePropertyModelList
        );
        let avgf = scopevaluationDetails.TotalForcedSaleValue;
        let avgm = scopevaluationDetails.TotalMarketValue;
        setNBACasePropertyModelList({
          ...NBACasePropertyModelList,
          // ["NumberOfValuationsFull"]: parseInt(1),
          // ["AverageForcedSaleValueFull"]: avgf,
          // ["AverageMarketValueFull"]: avgm,
          ["PropertyFullEvaluatorREMList"]: filteredItems,
        });
        setScopeValuationField(false);
      }
    } else {
      if (
        filteredItems != undefined &&
        filteredItems != null &&
        Object.keys(filteredItems).length > 0
      ) {
        console.log("deleteFSVDGrid", filteredItems);
        let grid = filteredItems;
        let totaolfvalue = 0;
        let totaolmvalue = 0;
        grid.map((data, index) => {
          totaolfvalue =
            parseFloat(data.TotalForcedSaleValue) + parseFloat(totaolfvalue);
          totaolmvalue =
            parseFloat(data.TotalMarketValue) + parseFloat(totaolmvalue);
        });
        console.log("deleteFSVDGrid", totaolfvalue);
        let avgf = totaolfvalue / parseInt(filteredItems.length);
        let avgm = totaolmvalue / parseInt(filteredItems.length);
        console.log("deleteFSVDGrid", filteredItems);

        setNBACasePropertyModelList({
          ...NBACasePropertyModelList,
          // ["NumberOfValuationsFull"]: parseInt(filteredItems.length),
          // ["AverageForcedSaleValueFull"]: avgf,
          // ["AverageMarketValueFull"]: avgm,
          ["PropertyFullEvaluatorREMList"]: filteredItems,
        });
        if (
          filteredItems != undefined &&
          filteredItems != null &&
          Object.keys(filteredItems).length > 1
        ) {
          setScopeValuationField(false);
        } else {
          setScopeValuationField(false);
        }
      } else {
        console.log("deleteFSVDGrid", filteredItems);
        console.log("deleteFSVDGrid", filteredItems);
        setNBACasePropertyModelList({
          ...NBACasePropertyModelList,
          // ["NumberOfValuationsFull"]: -1,
          // ["AverageForcedSaleValueFull"]: -1,
          // ["AverageMarketValueFull"]: -1,
          ["PropertyFullEvaluatorREMList"]: filteredItems,
        });

        setScopeValuationField(false);
      }
    }
  };
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
      render: (text) => {
        if (String(text) != "") {
          return DateDisplayFormat(text);
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
  // Delete data from grid of Desktop Valuation Detail
  const deleteDVDGrid = (record) => {
    console.log("deleteGrid", record, NBACasePropertyModelList);

    const filteredItems =
      NBACasePropertyModelList.PropertyDesktopEvaluatorList.filter(
        (item) => item != record
      );
    console.log("deleteGrid", filteredItems);
    if (
      desktopvaluationDetails.TotalMarketValue != -1 ||
      desktopvaluationDetails.TotalForcedSaleValue != -1
    ) {
      // if(businessDetailSection.NumberOfValuationsBusiness!=-1){
      console.log(
        "PropertyDesktopEvaluatorList",
        desktopvaluationDetails.EvaluatorName,
        desktopvaluationDetails.LandForcedSaleValue,
        desktopvaluationDetails.LandMarketValue,
        desktopvaluationDetails.BuildingForcedSaleValue,
        desktopvaluationDetails.BuildingMarketValue
      );
      if (filteredItems.length > 0) {
        let grid = filteredItems;
        let totaolfvalue = desktopvaluationDetails.TotalForcedSaleValue;
        let totaolmvalue = desktopvaluationDetails.TotalMarketValue;
        grid.map((data, index) => {
          totaolfvalue =
            parseFloat(totaolfvalue) + parseFloat(data.TotalForcedSaleValue);
          totaolmvalue =
            parseFloat(totaolmvalue) + parseFloat(data.TotalMarketValue);

          console.log(
            "PropertyDesktopEvaluatorList",
            parseInt(data.TotalForcedSaleValue),
            totaolfvalue
          );
        });
        console.log("PropertyDesktopEvaluatorList", totaolfvalue);
        let avgf = totaolfvalue / (parseInt(filteredItems.length) + 1);
        let avgm = totaolmvalue / (parseInt(filteredItems.length) + 1);
        console.log(
          "PropertyDesktopEvaluatorList",
          avgf,
          avgm,
          parseInt(filteredItems) + 1
        );
        setNBACasePropertyModelList({
          ...NBACasePropertyModelList,
          // ["NumberOfValuationsDesktop"]: parseInt(filteredItems.length) + 1,
          // ["AverageForcedSaleValueDesktop"]: avgf,
          // ["AverageMarketValueDesktop"]: avgm,
          ["PropertyDesktopEvaluatorList"]: filteredItems,
        });
      } else {
        console.log(
          "NBACasePropertyModelList.NumberOfValuationsBusiness 23",
          NBACasePropertyModelList
        );
        let avgf = desktopvaluationDetails.TotalForcedSaleValue;
        let avgm = desktopvaluationDetails.TotalMarketValue;
        setNBACasePropertyModelList({
          ...NBACasePropertyModelList,
          // ["NumberOfValuationsDesktop"]: parseInt(1),
          // ["AverageForcedSaleValueDesktop"]: avgf,
          // ["AverageMarketValueDesktop"]: avgm,
          ["PropertyDesktopEvaluatorList"]: filteredItems,
        });
      }
    } else {
      if (
        filteredItems != undefined &&
        filteredItems != null &&
        Object.keys(filteredItems).length > 0
      ) {
        let grid = filteredItems;
        let totaolfvalue = 0;
        let totaolmvalue = 0;
        grid.map((data, index) => {
          totaolfvalue =
            parseFloat(data.TotalForcedSaleValue) + parseFloat(totaolfvalue);
          totaolmvalue =
            parseFloat(data.TotalMarketValue) + parseFloat(totaolmvalue);
        });
        console.log("deleteFSVDGrid", totaolfvalue);
        let avgf = totaolfvalue / parseInt(filteredItems.length);
        let avgm = totaolmvalue / parseInt(filteredItems.length);
        console.log("deleteFSVDGrid", filteredItems);
        setNBACasePropertyModelList({
          ...NBACasePropertyModelList,
          // ["NumberOfValuationsDesktop"]: parseInt(filteredItems.length),
          // ["AverageForcedSaleValueDesktop"]: avgf,
          // ["AverageMarketValueDesktop"]: avgm,
          ["PropertyDesktopEvaluatorList"]: filteredItems,
        });
        if (
          filteredItems != undefined &&
          filteredItems != null &&
          Object.keys(filteredItems).length > 1
        ) {
          setDesktopValuationField(false);
        } else {
          setDesktopValuationField(false);
        }
      } else {
        console.log("deleteFSVDGrid", filteredItems);
        setNBACasePropertyModelList({
          ...NBACasePropertyModelList,
          // ["NumberOfValuationsDesktop"]: -1,
          // ["AverageForcedSaleValueDesktop"]: -1,
          // ["AverageMarketValueDesktop"]: -1,
          ["PropertyDesktopEvaluatorList"]: filteredItems,
        });
        setDesktopValuationField(false);
      }
    }
  };
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
      render: (text) => {
        if (String(text) != "") {
          return DateDisplayFormat(text);
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
  // Full Scope Valuation Detail Handler
  const fullScopeValuationDetailHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    console.log("fullScopeValuationDetailHandler 1", name, value);
    if (
      name === "LandForcedSaleValue" &&
      value != -1 &&
      value != "" &&
      !isNaN(value)
    ) {
      console.log("fullScopeValuationDetailHandler 1", name, value);
      if (value % -1 != 0) {
        console.log("ValueReminder", value);
        if (value.length <= 18) {
          console.log("value 444", name, value.length);
          setScopeValuationDetails({
            ...scopevaluationDetails,
            [name]: parseFloat(value),
          });
        } else {
          console.log("sliceValue", value.slice(0, 18));
          value = value.slice(0, 18);
          setScopeValuationDetails({
            ...scopevaluationDetails,
            [name]: parseFloat(value),
          });
        }
      } else {
        if (value.length <= 15) {
          console.log("ValueReminder", name, value.length);
          setScopeValuationDetails({
            ...scopevaluationDetails,
            [name]: parseFloat(value),
          });
        } else {
          console.log("ValueReminder", name, value.length);

          value = value.slice(0, 15);
          setScopeValuationDetails({
            ...scopevaluationDetails,
            [name]: parseFloat(value),
          });
        }
      }
    } else if (
      name === "BuildingForcedSaleValue" &&
      value != -1 &&
      value != "" &&
      !isNaN(value)
    ) {
      console.log("fullScopeValuationDetailHandler 1", name, value);
      if (value % -1 != 0) {
        console.log("ValueReminder", value);
        if (value.length <= 18) {
          console.log("value 444", name, value.length);
          setScopeValuationDetails({
            ...scopevaluationDetails,
            [name]: parseFloat(value),
          });
        } else {
          console.log("sliceValue", value.slice(0, 18));
          value = value.slice(0, 18);
          setScopeValuationDetails({
            ...scopevaluationDetails,
            [name]: parseFloat(value),
          });
        }
      } else {
        if (value.length <= 15) {
          console.log("ValueReminder", name, value.length);
          setScopeValuationDetails({
            ...scopevaluationDetails,
            [name]: parseFloat(value),
          });
        } else {
          console.log("ValueReminder", name, value.length);

          value = value.slice(0, 15);
          setScopeValuationDetails({
            ...scopevaluationDetails,
            [name]: parseFloat(value),
          });
        }
      }
    } else if (
      name === "LandMarketValue" &&
      value != -1 &&
      value != "" &&
      !isNaN(value)
    ) {
      console.log("fullScopeValuationDetailHandler 1", name, value);
      if (value % -1 != 0) {
        console.log("ValueReminder", value);
        if (value.length <= 18) {
          console.log("value 444", name, value.length);
          setScopeValuationDetails({
            ...scopevaluationDetails,
            [name]: parseFloat(value),
          });
        } else {
          console.log("sliceValue", value.slice(0, 18));
          value = value.slice(0, 18);
          setScopeValuationDetails({
            ...scopevaluationDetails,
            [name]: parseFloat(value),
          });
        }
      } else {
        if (value.length <= 15) {
          console.log("ValueReminder", name, value.length);
          setScopeValuationDetails({
            ...scopevaluationDetails,
            [name]: parseFloat(value),
          });
        } else {
          console.log("ValueReminder", name, value.length);

          value = value.slice(0, 15);
          setScopeValuationDetails({
            ...scopevaluationDetails,
            [name]: parseFloat(value),
          });
        }
      }
    } else if (
      name === "BuildingMarketValue" &&
      value != -1 &&
      value != "" &&
      !isNaN(value)
    ) {
      console.log("fullScopeValuationDetailHandler 1", name, value);
      if (value % -1 != 0) {
        console.log("ValueReminder", value);
        if (value.length <= 18) {
          console.log("value 444", name, value.length);
          setScopeValuationDetails({
            ...scopevaluationDetails,
            [name]: parseFloat(value),
          });
        } else {
          console.log("sliceValue", value.slice(0, 18));
          value = value.slice(0, 18);
          setScopeValuationDetails({
            ...scopevaluationDetails,
            [name]: parseFloat(value),
          });
        }
      } else {
        if (value.length <= 15) {
          console.log("ValueReminder", name, value.length);
          setScopeValuationDetails({
            ...scopevaluationDetails,
            [name]: parseFloat(value),
          });
        } else {
          console.log("ValueReminder", name, value.length);

          value = value.slice(0, 15);
          setScopeValuationDetails({
            ...scopevaluationDetails,
            [name]: parseFloat(value),
          });
        }
      }
    } else if (name === "EvaluatorName" && value !== "") {
      console.log("fullScopeValuationDetailHandler 1", name, value);
      var valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      console.log("EvaluatorName", valueCheck);

      if (!valueCheck == "") {
        console.log("EvaluatorName in", valueCheck);
        setScopeValuationField(true);
        setScopeValuationDetails({
          ...scopevaluationDetails,
          [name]: valueCheck.trimStart(),
        });
      }
    } else if (name === "EvaluatorName" && value === "") {
      console.log("fullScopeValuationDetailHandler 1", name, value);
      // if (NBACasePropertyModelList.PropertyFullEvaluatorREMList.length > 0) {
      console.log("EvaluatorName 2 in", value);

      setScopeValuationField(false);
      // }
      setScopeValuationDetails({
        ...scopevaluationDetails,
        [name]: "",
      });
    } else if (
      name === "DateOfValuation" &&
      value != "" &&
      value != "18000101"
    ) {
      setScopeValuationDetails({
        ...scopevaluationDetails,
        [name]: DateSendingFormat(value),
      });
    } else if (
      name === "DateOfValuation" &&
      (value === "" || value === "18000101")
    ) {
      setScopeValuationDetails({
        ...scopevaluationDetails,
        ["DateOfValuation"]: "18000101",
      });
    } else {
      console.log("fullScopeValuationDetailHandler 1", name, value);
      if (name != "EvaluatorName") {
        setScopeValuationDetails({
          ...scopevaluationDetails,
          [name]: parseFloat(-1),
        });
      }
    }
  };
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

  // }, [scopevaluationDetails]);
  //Add Record button For Full Scope Valuation Detail
  const AddAnotherValuationFullScopeValuationDetail = async () => {
    console.log("AddAnotherValuation", scopevaluationDetails);

    if (
      scopevaluationDetails.EvaluatorName != "" &&
      scopevaluationDetails.BuildingMarketValue != -1 &&
      scopevaluationDetails.LandMarketValue != -1 &&
      scopevaluationDetails.LandForcedSaleValue != -1 &&
      scopevaluationDetails.BuildingForcedSaleValue != -1 &&
      scopevaluationDetails.DateOfValuation != "" &&
      scopevaluationDetails.DateOfValuation != "18000101"
    ) {
      console.log(
        "AddAnotherValuation",
        NBACasePropertyModelList.PropertyFullEvaluatorREMList
      );
      let tem = [];
      let check = NBACasePropertyModelList.PropertyFullEvaluatorREMList;
      if (check.length > 0) {
        tem.push(...check, scopevaluationDetails);
        setNBACasePropertyModelList({
          ...NBACasePropertyModelList,
          ["PropertyFullEvaluatorREMList"]: tem,
        });
        setScopeValuationField(false);
      } else {
        tem = scopevaluationDetails;
        await setNBACasePropertyModelList({
          ...NBACasePropertyModelList,
          ["PropertyFullEvaluatorREMList"]: [tem],
        });
      }
      console.log("valuationDetailsqwerty", typeof tem);

      setScopeValuationDetails({
        ...scopevaluationDetails,
        BuildingMarketValue: parseInt(-1),
        LandForcedSaleValue: parseInt(-1),
        LandMarketValue: parseInt(-1),
        BuildingForcedSaleValue: parseInt(-1),
        EvaluatorName: "",
        TotalForcedSaleValue: parseInt(-1),
        TotalMarketValue: parseInt(-1),
        DateOfValuation: "18000101",
      });
      // setScopeValuationField(true);
      // if (Object.keys(check).length > 0) {
      //   setScopeValuationField(false);
      // } else {
      //   setScopeValuationField(false);
      // }
      setScopeValuationField(false);
    } else {
      setOpen({
        open: true,
        message: "Enter Required Fields",
      });
    }
  };
  // Desktop Valuation Detail Handler
  const desktopValuationDetailHandler = (e) => {
    console.log(
      "businessDetailSection.NumberOfValuationsBusiness 25",
      e.target.name
    );
    let name = e.target.name;
    let value = e.target.value;
    console.log(
      "businessDetailSection.NumberOfValuationsBusiness 27",
      name,
      value,
      !isNaN(value),
      value != -1,
      value != ""
    );
    if (
      name === "LandForcedSaleValue" &&
      value != -1 &&
      value != "" &&
      !isNaN(value)
    ) {
      console.log("value 444", name, value);
      if (value % -1 != 0) {
        console.log("ValueReminder", value);
        if (value.length <= 18) {
          console.log("value 444", name, value.length);
          setDesktopValuationDetails({
            ...desktopvaluationDetails,
            [name]: parseFloat(value),
          });
        } else {
          console.log("sliceValue", value.slice(0, 18));
          value = value.slice(0, 18);
          setDesktopValuationDetails({
            ...desktopvaluationDetails,
            [name]: parseFloat(value),
          });
        }
      } else {
        if (value.length <= 15) {
          console.log("ValueReminder", name, value.length);
          setDesktopValuationDetails({
            ...desktopvaluationDetails,
            [name]: parseFloat(value),
          });
        } else {
          console.log("ValueReminder", name, value.length);

          value = value.slice(0, 15);
          setDesktopValuationDetails({
            ...desktopvaluationDetails,
            [name]: parseFloat(value),
          });
        }
      }
    } else if (
      name === "BuildingForcedSaleValue" &&
      value != -1 &&
      value != "" &&
      !isNaN(value)
    ) {
      console.log("value 444", name, value);
      if (value % -1 != 0) {
        console.log("ValueReminder", value);
        if (value.length <= 18) {
          console.log("value 444", name, value.length);
          setDesktopValuationDetails({
            ...desktopvaluationDetails,
            [name]: parseFloat(value),
          });
        } else {
          console.log("sliceValue", value.slice(0, 18));
          value = value.slice(0, 18);
          setDesktopValuationDetails({
            ...desktopvaluationDetails,
            [name]: parseFloat(value),
          });
        }
      } else {
        if (value.length <= 15) {
          console.log("ValueReminder", name, value.length);
          setDesktopValuationDetails({
            ...desktopvaluationDetails,
            [name]: parseFloat(value),
          });
        } else {
          console.log("ValueReminder", name, value.length);

          value = value.slice(0, 15);
          setDesktopValuationDetails({
            ...desktopvaluationDetails,
            [name]: parseFloat(value),
          });
        }
      }
    } else if (
      name === "LandMarketValue" &&
      value != -1 &&
      value != "" &&
      !isNaN(value)
    ) {
      console.log("value 444", name, value);
      if (value % -1 != 0) {
        console.log("ValueReminder", value);
        if (value.length <= 18) {
          console.log("value 444", name, value.length);
          setDesktopValuationDetails({
            ...desktopvaluationDetails,
            [name]: parseFloat(value),
          });
        } else {
          console.log("sliceValue", value.slice(0, 18));
          value = value.slice(0, 18);
          setDesktopValuationDetails({
            ...desktopvaluationDetails,
            [name]: parseFloat(value),
          });
        }
      } else {
        if (value.length <= 15) {
          console.log("ValueReminder", name, value.length);
          setDesktopValuationDetails({
            ...desktopvaluationDetails,
            [name]: parseFloat(value),
          });
        } else {
          console.log("ValueReminder", name, value.length);

          value = value.slice(0, 15);
          setDesktopValuationDetails({
            ...desktopvaluationDetails,
            [name]: parseFloat(value),
          });
        }
      }
    } else if (
      name === "BuildingMarketValue" &&
      value != -1 &&
      value != "" &&
      !isNaN(value)
    ) {
      console.log("value 444", name, value);
      if (value % -1 != 0) {
        console.log("ValueReminder", value);
        if (value.length <= 18) {
          console.log("value 444", name, value.length);
          setDesktopValuationDetails({
            ...desktopvaluationDetails,
            [name]: parseFloat(value),
          });
        } else {
          console.log("sliceValue", value.slice(0, 18));
          value = value.slice(0, 18);
          setDesktopValuationDetails({
            ...desktopvaluationDetails,
            [name]: parseFloat(value),
          });
        }
      } else {
        if (value.length <= 15) {
          console.log("ValueReminder", name, value.length);
          setDesktopValuationDetails({
            ...desktopvaluationDetails,
            [name]: parseFloat(value),
          });
        } else {
          console.log("ValueReminder", name, value.length);

          value = value.slice(0, 15);
          setDesktopValuationDetails({
            ...desktopvaluationDetails,
            [name]: parseFloat(value),
          });
        }
      }
    } else if (name === "EvaluatorName" && value !== "") {
      var valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      console.log("EvaluatorName", valueCheck);

      if (!valueCheck == "") {
        console.log("EvaluatorName in", valueCheck);
        setDesktopValuationField(true);
        setDesktopValuationDetails({
          ...desktopvaluationDetails,
          [name]: valueCheck.trimStart(),
        });
      }
    } else if (name === "EvaluatorName" && value === "") {
      if (NBACasePropertyModelList.PropertyDesktopEvaluatorList.length > 0) {
        console.log("EvaluatorName 2 in", value);

        setDesktopValuationField(false);
      }
      setDesktopValuationDetails({
        ...desktopvaluationDetails,
        [name]: "",
      });
    } else if (
      name === "DateOfValuation" &&
      value != "" &&
      value != "18000101"
    ) {
      setDesktopValuationDetails({
        ...desktopvaluationDetails,
        [name]: DateSendingFormat(value),
      });
    } else if (
      name === "DateOfValuation" &&
      (value === "" || value === "18000101")
    ) {
      setDesktopValuationDetails({
        ...desktopvaluationDetails,
        ["DateOfValuation"]: "18000101",
      });
    } else {
      console.log("businessDetailSection.NumberOfValuationsBusiness 27", name);
      setDesktopValuationDetails({
        ...desktopvaluationDetails,
        [name]: "18000101",
      });
    }
  };
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

  // }, [desktopvaluationDetails]);
  //Add Record button For Desktop Valuation Detail
  const AddAnotherValuationDesktopValuationDetail = async () => {
    console.log("AddAnotherValuation", scopevaluationDetails);

    if (
      desktopvaluationDetails.EvaluatorName != "" &&
      desktopvaluationDetails.BuildingMarketValue != -1 &&
      desktopvaluationDetails.LandMarketValue != -1 &&
      desktopvaluationDetails.LandForcedSaleValue != -1 &&
      desktopvaluationDetails.BuildingForcedSaleValue != -1 &&
      desktopvaluationDetails.DateOfValuation != "" &&
      desktopvaluationDetails.DateOfValuation != "18000101"
    ) {
      console.log(
        "AddAnotherValuation",
        NBACasePropertyModelList.PropertyDesktopEvaluatorList
      );
      let tem = [];
      let check = NBACasePropertyModelList.PropertyDesktopEvaluatorList;
      if (check.length > 0) {
        tem.push(...check, desktopvaluationDetails);
        setNBACasePropertyModelList({
          ...NBACasePropertyModelList,
          ["PropertyDesktopEvaluatorList"]: tem,
        });
        setDesktopValuationField(false);
      } else {
        tem = desktopvaluationDetails;
        await setNBACasePropertyModelList({
          ...NBACasePropertyModelList,
          ["PropertyDesktopEvaluatorList"]: [tem],
        });
      }
      console.log("valuationDetailsqwerty", typeof check);

      setDesktopValuationDetails({
        ...desktopvaluationDetails,
        BuildingMarketValue: parseInt(-1),
        LandForcedSaleValue: parseInt(-1),
        LandMarketValue: parseInt(-1),
        BuildingForcedSaleValue: parseInt(-1),
        EvaluatorName: "",
        TotalForcedSaleValue: parseInt(-1),
        TotalMarketValue: parseInt(-1),
        DateOfValuation: "18000101",
      });
      setDesktopValuationField(false);
      // if (Object.keys(check).length > 0) {
      //   setDesktopValuationField(false);
      // } else {
      //   setDesktopValuationField(true);
      // }
    } else {
      setOpen({
        open: true,
        message: "Enter Required Fields",
      });
    }
  };
  // for Real Estate Management Handler
  const realEstateManagementHandler = async (e) => {
    let name = e.target.name;
    let value = e.target.value;
    console.log("realEstateManagementHandler", name, value);
    if (name === "CurrentUseOfAsset" && value !== "") {
      var valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      console.log("valueCheck", valueCheck);

      if (!valueCheck == "") {
        console.log("valueCheck in", valueCheck);
        setNBACasePropertyModelList({
          ...NBACasePropertyModelList,
          [name]: valueCheck.trimStart(),
        });
      }
    } else if (name === "CurrentUseOfAsset" && value === "") {
      setNBACasePropertyModelList({
        ...NBACasePropertyModelList,
        [name]: "",
      });
    }
    if (name === "StrategyForDisposal" && value !== "") {
      var valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      console.log("valueCheck", valueCheck);

      if (!valueCheck == "") {
        console.log("valueCheck in", valueCheck);
        setNBACasePropertyModelList({
          ...NBACasePropertyModelList,
          [name]: valueCheck.trimStart(),
        });
      }
    } else if (name === "StrategyForDisposal" && value === "") {
      setNBACasePropertyModelList({
        ...NBACasePropertyModelList,
        [name]: "",
      });
    }
    if (name === "Remarks" && value !== "") {
      var valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      console.log("valueCheck", valueCheck);
      console.log("realEstateManagementHandler", name, value);

      if (!valueCheck == "") {
        console.log("valueCheck in", valueCheck);
        setSaveNewDataList({
          ...saveNewDataList,
          ["RemarksREM"]: valueCheck.trimStart(),
        });
      }
    } else if (name === "Remarks" && value === "") {
      setSaveNewDataList({
        ...saveNewDataList,
        ["RemarksREM"]: "",
      });
    }
    if (name === "SettlementType") {
      setSaveNewDataList({
        ...saveNewDataList,
        ["IsFullSettlement"]: value,
      });
    }
    if (name === "TitleTransferDate" && value != "") {
      setNBACasePropertyModelList({
        ...NBACasePropertyModelList,
        [name]: DateSendingFormat(value),
      });
    } else if (
      name === "TitleTransferDate" &&
      (value === "" || value === "18000101")
    ) {
      setNBACasePropertyModelList({
        ...NBACasePropertyModelList,
        ["TitleTransferDate"]: "18000101",
      });
    }
    if (name === "DisposalOrTransferDateForAsset" && value != "") {
      setNBACasePropertyModelList({
        ...NBACasePropertyModelList,
        [name]: DateSendingFormat(value),
      });
    } else if (
      name === "DisposalOrTransferDateForAsset" &&
      (value === "" || value === "18000101")
    ) {
      setNBACasePropertyModelList({
        ...NBACasePropertyModelList,
        ["DisposalOrTransferDateForAsset"]: "18000101",
      });
    }
    if (
      name === "RevaluatedAmount" &&
      value != -1 &&
      value != "" &&
      !isNaN(value)
    ) {
      console.log("value 444", name, value);
      if (value % -1 != 0) {
        console.log("ValueReminder", value);
        if (value.length <= 18) {
          console.log("value 444", name, value.length);
          setNBACasePropertyModelList({
            ...NBACasePropertyModelList,
            [name]: parseFloat(value),
          });
        } else {
          console.log("sliceValue", value.slice(0, 18));
          value = value.slice(0, 18);
          setNBACasePropertyModelList({
            ...NBACasePropertyModelList,
            [name]: parseFloat(value),
          });
        }
      } else {
        if (value.length <= 15) {
          console.log("ValueReminder", name, value.length);
          setNBACasePropertyModelList({
            ...NBACasePropertyModelList,
            [name]: parseFloat(value),
          });
        } else {
          console.log("ValueReminder", name, value.length);

          value = value.slice(0, 15);
          setNBACasePropertyModelList({
            ...NBACasePropertyModelList,
            [name]: parseFloat(value),
          });
        }
      }
    } else if (
      name === "RevaluatedAmount" &&
      (value === -1 || value === "" || isNaN(value))
    ) {
      console.log("value 444", name, value);
      setNBACasePropertyModelList({
        ...NBACasePropertyModelList,
        ["RevaluatedAmount"]: parseFloat(-1),
      });
    }
    if (
      name === "IncomeEarnedFromAsset" &&
      value != -1 &&
      value != "" &&
      !isNaN(value)
    ) {
      console.log("value 444", name, value);
      if (value % -1 != 0) {
        console.log("ValueReminder", value);
        if (value.length <= 18) {
          console.log("value 444", name, value.length);
          setNBACasePropertyModelList({
            ...NBACasePropertyModelList,
            [name]: parseFloat(value),
          });
        } else {
          console.log("sliceValue", value.slice(0, 18));
          value = value.slice(0, 18);
          setNBACasePropertyModelList({
            ...NBACasePropertyModelList,
            [name]: parseFloat(value),
          });
        }
      } else {
        if (value.length <= 15) {
          console.log("ValueReminder", name, value.length);
          setNBACasePropertyModelList({
            ...NBACasePropertyModelList,
            [name]: parseFloat(value),
          });
        } else {
          console.log("ValueReminder", name, value.length);

          value = value.slice(0, 15);
          setNBACasePropertyModelList({
            ...NBACasePropertyModelList,
            [name]: parseFloat(value),
          });
        }
      }
    }
    if (name === "DisposalOwnUseStatus") {
      console.log("realEstateManagementHandler", name, value);
      if (value === 1) {
        console.log("realEstateManagementHandler", name, value);
        setNBACasePropertyModelList({
          ...NBACasePropertyModelList,
          [name]: parseInt(value),
          ["DisposalOrTransferDateForAsset"]: "18000101",
        });
        setRequiredDOUS(true);
        setDisabledDOUS(false);
      } else {
        console.log("realEstateManagementHandler", name, value);
        setNBACasePropertyModelList({
          ...NBACasePropertyModelList,
          [name]: parseInt(value),
          ["DisposalOrTransferDateForAsset"]: "18000101",
          ["IncomeEarnedFromAsset"]: -1,
        });
        setRequiredDOUS(false);
        setDisabledDOUS(true);
      }
    }
  };
  // property type handler
  const propertyTypeHandler = (e, value) => {
    // for previous property vlued handled
    if (indexSelected != -1) {
      let tem1 = [];
      let tem2 = [];
      console.log("propertyTypeHandler 23", NBACasePropertyModelList);
      let newState = NBACasePropertyModelListAr.map((obj, index) => {
        console.log("propertyTypeHandler 2", obj);
        console.log("propertyTypeHandler 2", indexSelected === index);
        // 👇️ if id equals seleted id replace object
        if (indexSelected === index) {
          return NBACasePropertyModelList;
        }
        return obj;
      });
      console.log("propertyTypeHandler 23", newState);
      setNBACasePropertyModelListAr(newState);
      console.log("propertyTypeHandler", newState);
      // }
    }
    setScopeValuationDetails({
      EvaluatorName: "",
      LandForcedSaleValue: parseInt(-1),
      LandMarketValue: parseInt(-1),
      BuildingForcedSaleValue: parseInt(-1),
      BuildingMarketValue: parseInt(-1),
      TotalForcedSaleValue: parseInt(-1),
      TotalMarketValue: parseInt(-1),
      DateOfValuation: "18000101",
    });
    setDesktopValuationDetails({
      EvaluatorName: "",
      LandForcedSaleValue: parseInt(-1),
      LandMarketValue: parseInt(-1),
      BuildingForcedSaleValue: parseInt(-1),
      BuildingMarketValue: parseInt(-1),
      TotalForcedSaleValue: parseInt(-1),
      TotalMarketValue: parseInt(-1),
      DateOfValuation: "18000101",
    });
    // for new property select handled
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
    console.log("propertyTypeHandler", NBACasePropertyModelListAr);
    NBACasePropertyModelListAr.map((data, indm) => {
      console.log("propertyTypeHandler", data, PropertyID);
      if (data.NBACasePropertyID === PropertyID) {
        setIndexSelected(indm);
        setPopertySelected(parseInt(data.NBACasePropertyID));
        if (data.DisposalOwnUseStatus === 1) {
          setRequiredDOUS(true);
          setDisabledDOUS(false);
        } else {
          setDisabledDOUS(true);
          setRequiredDOUS(false);
        }
        console.log("propertyTypeHandler ", data);
        let propertyFullEvaluatorREMList = data.PropertyFullEvaluatorREMList;
        let propertyDesktopEvaluatorList = data.PropertyDesktopEvaluatorList;
        let tem1 = [];
        let tem2 = [];
        propertyFullEvaluatorREMList.map((data1, index) => {
          tem1.push({
            EvaluatorName: data1.EvaluatorName,
            LandForcedSaleValue: data1.LandForcedSaleValue,
            LandMarketValue: data1.LandMarketValue,
            BuildingForcedSaleValue: data1.BuildingForcedSaleValue,
            BuildingMarketValue: data1.BuildingMarketValue,
            TotalForcedSaleValue: data1.TotalForcedSaleValue,
            TotalMarketValue: data1.TotalMarketValue,
            DateOfValuation: data1.DateOfValuation,
          });
        });
        propertyDesktopEvaluatorList.map((data1, index) => {
          tem2.push({
            EvaluatorName: data1.EvaluatorName,
            LandForcedSaleValue: data1.LandForcedSaleValue,
            LandMarketValue: data1.LandMarketValue,
            BuildingForcedSaleValue: data1.BuildingForcedSaleValue,
            BuildingMarketValue: data1.BuildingMarketValue,
            TotalForcedSaleValue: data1.TotalForcedSaleValue,
            TotalMarketValue: data1.TotalMarketValue,
            DateOfValuation: data1.DateOfValuation,
          });
        });
        let checkdata = {
          NBACasePropertyID: data.NBACasePropertyID,
          TitleTransferDate: data.TitleTransferDate,
          CurrentUseOfAsset: data.CurrentUseOfAsset,
          RevaluatedAmount: data.RevaluatedAmount,
          StrategyForDisposal: data.StrategyForDisposal,
          DisposalOrTransferDateForAsset: data.DisposalOrTransferDateForAsset,
          IncomeEarnedFromAsset: data.IncomeEarnedFromAsset,
          DisposalOwnUseStatus: data.DisposalOwnUseStatus,
          NumberOfValuationsFull: data.NumberOfValuationsFull,
          AverageForcedSaleValueFull: data.AverageForcedSaleValueFull,
          AverageMarketValueFull: data.AverageMarketValueFull,
          NumberOfValuationsDesktop: data.NumberOfValuationsDesktop,
          AverageForcedSaleValueDesktop: data.AverageForcedSaleValueDesktop,
          AverageMarketValueDesktop: data.AverageMarketValueDesktop,
          PropertyFullEvaluatorREMList: tem1,
          PropertyDesktopEvaluatorList: tem2,
        };
        console.log("ViewREMCaseData 12", checkdata);
        console.log("ViewREMCaseData 13", typeof tem1);
        setNBACasePropertyModelList({
          NBACasePropertyID: data.NBACasePropertyID,
          TitleTransferDate: data.TitleTransferDate,
          CurrentUseOfAsset: data.CurrentUseOfAsset,
          RevaluatedAmount: data.RevaluatedAmount,
          StrategyForDisposal: data.StrategyForDisposal,
          DisposalOrTransferDateForAsset: data.DisposalOrTransferDateForAsset,
          IncomeEarnedFromAsset: data.IncomeEarnedFromAsset,
          DisposalOwnUseStatus: data.DisposalOwnUseStatus,
          NumberOfValuationsFull: data.NumberOfValuationsFull,
          AverageForcedSaleValueFull: data.AverageForcedSaleValueFull,
          AverageMarketValueFull: data.AverageMarketValueFull,
          NumberOfValuationsDesktop: data.NumberOfValuationsDesktop,
          AverageForcedSaleValueDesktop: data.AverageForcedSaleValueDesktop,
          AverageMarketValueDesktop: data.AverageMarketValueDesktop,
          PropertyFullEvaluatorREMList: tem1,
          PropertyDesktopEvaluatorList: tem2,
        });
      }
    });
  };

  // useEffect(() => {
  //   if (indexSelected != -1) {
  //   }
  // }, [indexSelected]);
  const goToSaveHandler = async (e) => {
    e.preventDefault();
    let newStateSave = NBACasePropertyModelListAr;
    if (indexSelected != -1) {
      console.log("SaveREMTeamData index", NBACasePropertyModelList);
      newStateSave = NBACasePropertyModelListAr.map((obj, index) => {
        console.log("SaveREMTeamData index", obj);
        console.log("SaveREMTeamData index", indexSelected === index);
        // 👇️ if id equals seleted id replace object
        if (indexSelected === index) {
          return NBACasePropertyModelList;
        }
        return obj;
      });
      console.log("SaveREMTeamData index", newStateSave);
      setNBACasePropertyModelListAr(newStateSave);
      console.log("SaveREMTeamData index", newStateSave);
    }

    let valueForSave = newStateSave.map((obj, index) => {
      console.log("SaveREMTeamData 2", obj);
      console.log("SaveREMTeamData 2", indexSelected === index);
      console.log(
        "SaveREMTeamData if 1",
        obj.NBACasePropertyID != -1,
        obj.DisposalOrTransferDateForAsset != "18000101",
        obj.DisposalOrTransferDateForAsset != "",
        newStateSave.RemarksREM != ""
      );
      console.log(
        "SaveREMTeamData if 2",
        obj.DisposalOwnUseStatus === 1,
        obj.TitleTransferDate != "",
        obj.TitleTransferDate != "18000101",
        obj.IncomeEarnedFromAsset
      );
      if (
        obj.NBACasePropertyID != -1 &&
        obj.TitleTransferDate != "18000101" &&
        obj.TitleTransferDate != "" &&
        newStateSave.RemarksREM != ""
      ) {
        if (obj.DisposalOwnUseStatus === 1) {
          if (
            (obj.DisposalOrTransferDateForAsset != "" ||
              obj.DisposalOrTransferDateForAsset != "18000101") &&
            obj.IncomeEarnedFromAsset != -1
          ) {
            return true;
          } else {
            return false;
          }
        } else {
          return true;
        }
      } else {
        return false;
      }
    });
    let valueForApproval = newStateSave.map((obj, index) => {
      console.log(
        "SaveREMTeamData 2",
        Object.keys(obj.PropertyDesktopEvaluatorList).length > 1
      );
      console.log("SaveREMTeamData 2", indexSelected === index);
      if (
        obj.CurrentUseOfAsset != "" &&
        obj.NBACasePropertyID != -1 &&
        obj.TitleTransferDate != "18000101" &&
        obj.TitleTransferDate != "" &&
        (newStateSave.RemarksREM != "") != "" &&
        obj.RevaluatedAmount != -1 &&
        obj.StrategyForDisposal != "" &&
        (Object.keys(obj.PropertyDesktopEvaluatorList).length > 0 ||
          Object.keys(obj.PropertyFullEvaluatorREMList).length > 0)
      ) {
        if (obj.DisposalOwnUseStatus === 1) {
          if (
            (obj.DisposalOrTransferDateForAsset != "" ||
              obj.DisposalOrTransferDateForAsset != "18000101") &&
            obj.IncomeEarnedFromAsset != -1
          ) {
            return true;
          } else {
            return false;
          }
        } else {
          return true;
        }
      } else {
        return false;
      }
    });
    console.log("SaveREMTeamData", valueForApproval, valueForSave);
    let found = valueForSave.find((element) => element === false);
    let found1 = valueForApproval.find((element) => element === false);
    console.log("SaveREMTeamData found", found, found1);
    if (saveNewDataList.SendForApproval === 2) {
      if (found1 === false) {
        setOpen({
          ...open,
          open: true,
          message: "Please Enter All Input Field Required For ALL Properties",
        });
      } else {
        if (desktopValuationField === true || scopeValuationField === true) {
          setOpen({
            ...open,
            open: true,
            message: "Plese Add Valuation Details",
          });
        } else {
          let Data = {
            RemarksREM: saveNewDataList.RemarksREM,
            NBACaseID: saveNewDataList.NBACaseID,
            SendForApproval: saveNewDataList.SendForApproval,
            NBACasePropertyModelList: newStateSave,
          };
          console.log("SaveREMTeamData", Data);
          dispatch(SaveREMTeamData(Data));
        }
      }
    } else if (saveNewDataList.SendForApproval === 1) {
      if (found === false) {
        setOpen({
          ...open,
          open: true,
          message: "Please Enter All Input Field Required For ALL Properties",
        });
      } else {
        if (desktopValuationField === true || scopeValuationField === true) {
          setOpen({
            ...open,
            open: true,
            message: "Plese Add Valuation Details",
          });
        } else {
          let Data = {
            RemarksREM: saveNewDataList.RemarksREM,
            NBACaseID: saveNewDataList.NBACaseID,
            SendForApproval: saveNewDataList.SendForApproval,
            NBACasePropertyModelList: newStateSave,
          };
          console.log("SaveREMTeamData", Data);
          dispatch(SaveREMTeamData(Data));
        }
      }
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
  console.log("SaveBusinessTeamData", nonBankingAssets.ShowNotification);
  // For notification
  useEffect(() => {
    let Notification = nonBankingAssets.ShowNotification;
    console.log("SaveBusinessTeamData", Notification);
    if (Notification === true) {
      console.log("SaveBusinessTeamData");
      setOpen({
        open: true,
        message: nonBankingAssets.ResponseMessage,
      });
      setTimeout(() => {
        dispatch(notificationFalse());
      }, 15000);
    } else {
      if (Notification != false) {
        dispatch(notificationFalse());
      }
    }
  }, [nonBankingAssets.ShowNotification]);

  return (
    <>
      <form onSubmit={(e) => goToSaveHandler(e)}>
        <Title className={styles["derembtm"]} level={3}>
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
          <div className={styles["deremTp"]} />
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
        </Row>
        <div className={styles["deremTp"]} />
        <Paper className={styles["derempaper"]}>
          <Col xl={8} lg={8} sm={6} xs={24} className={styles["deremb0tt0m"]}>
            <h1
              className={styles["deremh1"]}
            >
              Real Estate Management
            </h1>
          </Col>
          <Row gutter={[16, 16]} className={styles["derempd"]}>
            <Col xl={8} lg={8} sm={24} xs={24}>
              <div>
                <div className={styles["deremmmm"]}></div>
                <SelectBox
                  name="DetailsofPropertyAcquired"
                  label="Details of Property Acquired"
                  fullWidth
                  option={DPAOptionValueList}
                  change={propertyTypeHandler}
                  value={propertyTypeName}
                  placeholder="Details of Property Acquired"
                  size="small"
                  // required
                />
              </div>
            </Col>
            <Col xl={8} lg={8} sm={24} xs={24}>
              <label>
                <b className={styles["deremfont"]}>
                  Title Transfer Date 
                  {/* <span style={{ color: "red" }}>*</span> */}
                </b>
              </label>
              {console.log("NBACasePropertyModelList.TitleTransferDate",NBACasePropertyModelList.TitleTransferDate)}
              <DatePicker
                name="TitleTransferDate"
                size="large"
                placeholder="Title Transfer Date"
                change={realEstateManagementHandler}
                value={
                  NBACasePropertyModelList.TitleTransferDate!="18000101" && NBACasePropertyModelList.TitleTransferDate!=""&& NBACasePropertyModelList.TitleTransferDate!=null
                    ? DateDisplayFormat(
                        NBACasePropertyModelList.TitleTransferDate
                      )
                    : ""
                }
                DateRange
                width="100%"
                disable={true}
              />
            </Col>
            <Col xl={8} lg={8} sm={24} xs={24}>
              <div className={styles["deremmmm"]}></div>
              <TextField
                size="small"
                label={"Current Use of the Assets"}
                fullWidth
                placeholder="Current Use of the Assets"
                textLength={300}
                // required
                name="CurrentUseOfAsset"
                value={NBACasePropertyModelList.CurrentUseOfAsset}
                change={realEstateManagementHandler}
                disable={true}
              />
            </Col>
            <Col xl={8} lg={8} sm={24} xs={24}>
              <FormattedInputs
                name="RevaluatedAmount"
                size="small"
                label={"Revalued Amount"}
                autoComplete="off"
                placeholder="Revalued Amount"
                textLength={(999, 999, 999, 999, 999, 999, 999)}
                value={
                  NBACasePropertyModelList.RevaluatedAmount === null ||
                  NBACasePropertyModelList.RevaluatedAmount === -1
                    ? null
                    : NumberFormater(NBACasePropertyModelList.RevaluatedAmount)
                }
                change={realEstateManagementHandler}
                fullWidth
                // required
                disable={true}
              />
            </Col>
            <Col xl={8} lg={8} sm={24} xs={24}>
              <div className={styles["deremmmm"]}></div>
              <TextField
                name="StrategyForDisposal"
                size="small"
                fullWidth
                placeholder="Strategy For Disposal"
                label={"Strategy For Disposal"}
                textLength={300}
                change={realEstateManagementHandler}
                value={NBACasePropertyModelList.StrategyForDisposal}
                // required
                disable={true}
              />
            </Col>
            <Col xl={8} lg={8} sm={24} className={styles["topderem"]}>
              <label>
                <b>Disposed Off / Own Use</b>
              </label>
              <br />
              <Radio.Group
                required
                name="DisposalOwnUseStatus"
                value={NBACasePropertyModelList.DisposalOwnUseStatus}
                onChange={realEstateManagementHandler}
                disable={true}
              >
                <Radio disabled value={1}>Disposed Off</Radio>
                <Radio disabled value={2}>Own Use</Radio>
              </Radio.Group>
            </Col>
            <Col xl={8} lg={8} sm={24} xs={24}>
              <label>
                <b  className={styles["SearchNbaFonts"]}>
                  {disabledDOUS ? "Transfer Out Date" : "Disposal Date"}
                  {/* {requiredDOUS ? (
                    <span style={{ color: "red" }}>*</span>
                  ) : null} */}
                </b>
              </label>
              <DatePicker
                name="DisposalOrTransferDateForAsset"
                size="large"
                placeholder="Disposal Date"
                value={
                  NBACasePropertyModelList.DisposalOrTransferDateForAsset &&
                  NBACasePropertyModelList.DisposalOrTransferDateForAsset !=
                    "18000101"
                    ? DateDisplayFormat(
                        NBACasePropertyModelList.DisposalOrTransferDateForAsset
                      )
                    : null
                }
                change={realEstateManagementHandler}
                // required={requiredDOUS}
                disable={true}
                DateRange
                width="100%"
                // disable={disabledDOUS}
              />
            </Col>
            <Col xl={10} lg={10} sm={24} xs={24}>
              <FormattedInputs
                name="IncomeEarnedFromAsset"
                size="small"
                autoComplete="off"
                label={"Income Earned from the Assets (Over Book Value)"}
                placeholder="Income Earned"
                textLength={(999, 999, 999, 999, 999, 999, 999)}
                value={
                  NBACasePropertyModelList.IncomeEarnedFromAsset === null ||
                  NBACasePropertyModelList.IncomeEarnedFromAsset === -1
                    ? null
                    : NumberFormater(
                        NBACasePropertyModelList.IncomeEarnedFromAsset
                      )
                }
                change={realEstateManagementHandler}
                fullWidth
                // required={requiredDOUS}
                // disable={disabledDOUS}
                disable={true}
              />
            </Col>
            <Col xl={24} lg={24} sm={24} xs={24}>
              <div
               className={styles["deremstyle"]}
              >
                <Row gutter={[16, 16]} className={styles["derempd"]}>
                  <Col xl={12} lg={12} sm={24} xs={24}>
                    <h1
                      className={styles["deremfullscope"]}
                    >
                      <b>Full Scope Valuation Detail</b>
                    </h1>
                  </Col>

                  {/* <Col xl={12} lg={12} sm={24} xs={24} align="Right">
                    <Button
                      text={"Add Another Valuation"}
                      icon={<AddIcon />}
                      applyClass="btnSecondarySolid"
                      size="large"
                      click={AddAnotherValuationFullScopeValuationDetail}
                    />
                  </Col> */}
                </Row>
                <Row gutter={[16, 16]} className={styles["derempd"]}>
                  <Col xl={24} lg={24} sm={24} className={styles["evapad"]}>
                    <div className={styles["deremscope"]} />

                    <Table
                      columns={scopevaluationDetailsREM}
                      rows={
                        NBACasePropertyModelList.PropertyFullEvaluatorREMList
                      }
                      scroll={{ x: "max-content" }}
                      pagination={true}
                    />
                  </Col>

                  <Col xl={8} lg={8} sm={24} xs={24}>
                    <TextField
                      type={"Number"}
                      name="NumberOfValuationBusiness"
                      size="small"
                      placeholder="Number Of Valuation"
                      // width="100%"
                      className={styles["input-field-w100"]}
                      label={"Number Of Valuation"}
                      value={
                        NBACasePropertyModelList.NumberOfValuationsFull ===
                          null ||
                        NBACasePropertyModelList.NumberOfValuationsFull === -1
                          ? null
                          : NumberFormater(
                              NBACasePropertyModelList.NumberOfValuationsFull
                            )
                      }
                      disable
                    />
                  </Col>

                  {/* <Col xl={8} lg={8} sm={24} xs={24}>
                    <FormattedInputs
                      name="AverageForcedSaleValueBusiness"
                      size="small"
                      placeholder="Average Forced Sale Value"
                      width="100%"
                      value={
                        NBACasePropertyModelList.AverageForcedSaleValueFull ===
                          null ||
                        NBACasePropertyModelList.AverageForcedSaleValueFull ===
                          -1
                          ? null
                          : NumberFormater(
                              NBACasePropertyModelList.AverageForcedSaleValueFull
                            )
                      }
                      fullWidth
                      disable
                    />
                  </Col>

                  <Col xl={8} lg={8} sm={24} xs={24}>
                    <FormattedInputs
                      name="AverageMarketValueBusiness"
                      size="small"
                      placeholder="Average Market Value"
                      width="100%"
                      value={
                        NBACasePropertyModelList.AverageMarketValueFull ===
                          null ||
                        NBACasePropertyModelList.AverageMarketValueFull === -1
                          ? null
                          : NumberFormater(
                              NBACasePropertyModelList.AverageMarketValueFull
                            )
                      }
                      fullWidth
                      disable
                    />
                  </Col> */}
                </Row>
              </div>
              {/* Desktop Valuation Detail */}
              <div
               className={styles["deremstyle"]}
              >
                <Row gutter={[16, 16]} className={styles["derempd"]}>
                  <Col xl={12} lg={12} sm={24} xs={24}>
                    <h1
                      className={styles["deremfullscope"]}
                    >
                      <b>Desktop Valuation Detail</b>
                    </h1>
                  </Col>
                </Row>

                <Row gutter={[16, 16]} className={styles["derempd"]}>
                  <Col xl={24} lg={24} sm={24} className={styles["evapad"]}>
                    <div className={styles["deremscope"]} />

                    <Table
                      columns={desktopvaluationDetailsREM}
                      rows={
                        NBACasePropertyModelList.PropertyDesktopEvaluatorList
                      }
                      scroll={{ x: "max-content" }}
                      pagination={true}
                    />
                  </Col>

                  <Col xl={8} lg={8} sm={24} xs={24}>
                    <TextField
                      type={"Number"}
                      name="NumberOfValuationBusiness"
                      size="small"
                      placeholder="Number Of Valuation"
                      // width="100%"
                      className={styles["input-field-w100"]}
                      value={
                        NBACasePropertyModelList.NumberOfValuationsDesktop ===
                          null ||
                        NBACasePropertyModelList.NumberOfValuationsDesktop ===
                          -1
                          ? null
                          : NumberFormater(
                              NBACasePropertyModelList.NumberOfValuationsDesktop
                            )
                      }
                      label={"Number Of Valuation"}
                      disable
                    />
                  </Col>

                  {/* <Col xl={8} lg={8} sm={24} xs={24}>
                    <FormattedInputs
                      name="AverageForcedSaleValueBusiness"
                      size="small"
                      placeholder="Average Forced Sale Value"
                      width="100%"
                      value={
                        NBACasePropertyModelList.AverageForcedSaleValueDesktop ===
                          null ||
                        NBACasePropertyModelList.AverageForcedSaleValueDesktop ===
                          -1
                          ? null
                          : NumberFormater(
                              NBACasePropertyModelList.AverageForcedSaleValueDesktop
                            )
                      }
                      fullWidth
                      disable
                    />
                  </Col>

                  <Col xl={8} lg={8} sm={24} xs={24}>
                    <FormattedInputs
                      name="AverageMarketValueBusiness"
                      size="small"
                      placeholder="Average Market Value"
                      width="100%"
                      value={
                        NBACasePropertyModelList.AverageMarketValueDesktop ===
                          null ||
                        NBACasePropertyModelList.AverageMarketValueDesktop ===
                          -1
                          ? null
                          : NumberFormater(
                              NBACasePropertyModelList.AverageMarketValueDesktop
                            )
                      }
                      fullWidth
                      disable
                    />
                  </Col> */}
                </Row>
              </div>
            </Col>
          </Row>
        </Paper>
        <div className={styles["deremTp"]} />

        <div className={styles["evatop"]} />
        <Col xl={24} lg={24} sm={24} xs={24}>
        <label>
                    <b className={styles["SearchNbaFonts"]}>
                    Remarks <span className={styles["aesterick"]}>*</span>
                    </b>
                  </label>
          <TextField
            name="Remarks"
            size="large"
            placeholder="Remarks"
            textLength={300}
            className={styles["input-field-w100"]}
            // width="100%"
            // label={"Remarks"}
            value={saveNewDataList.RemarksREM}
            change={realEstateManagementHandler}
            // required
            disable={true}
          />
        </Col>

        <div className={styles["topderem"]} />
        {/* <Row gutter={[16, 16]}>
          <Col xl={10} lg={10} sm={24} xs={24} align="Right">
            <Button
              type="Submit"
              applyClass="btnBorderStyledBeach"
              text="Save"
              icon={<i className="icon-save icon-size-one"></i>}
              click={() =>
                setSaveNewDataList({
                  ...saveNewDataList,
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
                setSaveNewDataList({
                  ...saveNewDataList,
                  ["SendForApproval"]: 2,
                })
              }
            />
          </Col>
        </Row> */}
      </form>
      {nonBankingAssets.Loading ? <Loader /> : null}
    </>
  );
};

export default ViewNBAAssetsDEREM;
