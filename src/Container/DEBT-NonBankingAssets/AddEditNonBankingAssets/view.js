import React, { useEffect, useState } from "react";
import { Typography, Radio } from "antd";
import MultipleBusinessDetails from "./multiple-business-details";
import moment from "moment";
import {
  SaveBusinessTeamData,
  ViewBusinessTeamData,
} from "../../../store/actions/nonbanking-assets-actions";

import {
  Paper,
  TextField,
  Notification,
  Message,
  Loader,
} from "../../../Components/Elements";
import { useSelector, useDispatch } from "react-redux";
import { GetAllPropertyType } from "../../../store/actions/setup-forms-actions";
import { removeDashesFromDate } from "../../../Common/Functions/date-formatter";
import MultipleCustomerDetails from "./multiple-customer-details";
import styles from "../DEBT.module.css";
import { Col, Row } from "antd";

const ViewNBAAssetsDEBT = () => {
  const { Title } = Typography;
  const dispatch = useDispatch();

  const date = moment().format("YYYY-MM-DD");

  const state = useSelector((state) => state);
  const { setupForms, nonBankingAssets } = state;
  const [open, setOpen] = useState({
    flag: false,
    message: "",
  });

  const [propertyType, setPropertyType] = useState([]);

  const [customerField, setCustomerField] = useState(false);
  const [customerAdjustmentField, setCustomerAdjustmentField] = useState(false);
  const [customerDetailsField, setCustomerDetailsField] = useState(false);

  //states for customer section input fields
  const [customerSection, setCustomerSection] = useState({
    MisysCode: "",
    BorrowerName: "",
    BorrowerAddress: "",
    ECIBCode: "",
    IPartyID: -1,
    NBACaseCustomerAccountList: [],
  });

  const [NBACaseCustomerList, setNBACaseCustomerList] = useState([]);

  const [businessDetailSection, setBusinessDetailSection] = useState({
    PropertyType: -1,
    PropertyAcquiredDetails: "",
    PrincipalAdjusted: -1,
    MarkupAdjusted: -1,
    Charges: -1,
    TotalAdjustmentPMC: -1,
    AcquiredValue: -1,
    AcquisitionCharges: -1,
    DateOfAcquisition: removeDashesFromDate(date),
    DPSTransactionAmount: -1,
    TotalValueDAA: -1,
    NumberOfValuationsBusiness: -1,
    AverageForcedSaleValueBusiness: -1,
    AverageMarketValueBusiness: -1,
    PropertyEvaluatorBusinessList: [],
  });

  const [valuationDetails, setValuationDetails] = useState({
    EvaluatorName: "",
    DateOfValuation: "",
    LandForcedSaleValue: parseInt(-1),
    LandMarketValue: parseInt(-1),
    BuildingForcedSaleValue: parseInt(-1),
    BuildingMarketValue: parseInt(-1),
    TotalForcedSaleValue: parseInt(-1),
    TotalMarketValue: parseInt(-1),
    DateOfValuation: removeDashesFromDate(date),
  });
  const [NBACasePropertyModelList, setNBACasePropertyModelList] = useState([]);

  const [saveNewData, setSaveNewData] = useState({
    IsFullSettlement: false,
    ApprovalAuthority: "",
    RemarksBusiness: "",
    ReferenceNumber: "",
    SendForApproval: -1,
    NBACaseID: -1,
  });

  // for add new customer data
  const custDatatMainHandler = async (e) => {
    let name = e.target.name;
    let value = e.target.value;
    console.log("custDatatMainHandler", name, value);
    if (name === "ApprovalAuthority" && value !== "") {
      var valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      console.log("valueCheck", valueCheck);

      if (!valueCheck == "") {
        console.log("valueCheck in", valueCheck);
        setSaveNewData({
          ...saveNewData,
          [name]: valueCheck.trimStart(),
        });
      }
    } else if (name === "ApprovalAuthority" && value === "") {
      setSaveNewData({
        ...saveNewData,
        [name]: "",
      });
    }
    if (name === "RemarksBusiness" && value !== "") {
      var valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      console.log("valueCheck", valueCheck);

      if (!valueCheck == "") {
        console.log("valueCheck in", valueCheck);
        setSaveNewData({
          ...saveNewData,
          [name]: valueCheck.trimStart(),
        });
      }
    } else if (name === "RemarksBusiness" && value === "") {
      setSaveNewData({
        ...saveNewData,
        [name]: "",
      });
    }
    if (name === "SettlementType") {
      setSaveNewData({
        ...saveNewData,
        ["IsFullSettlement"]: value,
      });
    }
  };

  // // for land force sale value
  useEffect(() => {
    let LandForcedSaleValue = valuationDetails.LandForcedSaleValue;
    let BuildingForcedSaleValue = valuationDetails.BuildingForcedSaleValue;

    if (BuildingForcedSaleValue != -1 && LandForcedSaleValue != -1) {
      let newAmmount = BuildingForcedSaleValue + LandForcedSaleValue;
      setValuationDetails({
        ...valuationDetails,
        ["TotalForcedSaleValue"]: parseFloat(newAmmount),
      });
    } else if (BuildingForcedSaleValue != -1) {
      setValuationDetails({
        ...valuationDetails,
        ["TotalForcedSaleValue"]: parseFloat(BuildingForcedSaleValue).toFixed(
          2
        ),
      });
    } else if (LandForcedSaleValue != -1) {
      setValuationDetails({
        ...valuationDetails,
        ["TotalForcedSaleValue"]: parseFloat(LandForcedSaleValue),
      });
    } else {
      setValuationDetails({
        ...valuationDetails,
        ["TotalForcedSaleValue"]: parseInt(-1),
      });
      setValuationDetails({
        ...valuationDetails,
        ["TotalForcedSaleValue"]: parseInt(-1),
      });
    }
  }, [
    valuationDetails.LandForcedSaleValue,
    valuationDetails.BuildingForcedSaleValue,
  ]);

  // for principal markup charges average
  useEffect(() => {
    let PrincipalAdjusted = businessDetailSection.PrincipalAdjusted;
    let MarkupAdjusted = businessDetailSection.MarkupAdjusted;
    let Charges = businessDetailSection.Charges;

    if (PrincipalAdjusted != -1 && MarkupAdjusted != -1 && Charges != -1) {
      let newAmmount = PrincipalAdjusted + MarkupAdjusted + Charges;
      setBusinessDetailSection({
        ...businessDetailSection,
        ["TotalAdjustmentPMC"]: parseFloat(newAmmount),
      });
    } else if (PrincipalAdjusted != -1 && MarkupAdjusted != -1) {
      let ammont = MarkupAdjusted + PrincipalAdjusted;
      setBusinessDetailSection({
        ...businessDetailSection,
        ["TotalAdjustmentPMC"]: parseFloat(ammont),
      });
    } else if (MarkupAdjusted != -1 && Charges != -1) {
      let ammont = MarkupAdjusted + Charges;

      setBusinessDetailSection({
        ...businessDetailSection,
        ["TotalAdjustmentPMC"]: parseFloat(ammont),
      });
    } else if (PrincipalAdjusted != -1 && Charges != -1) {
      let ammont = PrincipalAdjusted + Charges;

      setBusinessDetailSection({
        ...businessDetailSection,
        ["TotalAdjustmentPMC"]: parseFloat(ammont),
      });
    } else if (PrincipalAdjusted != -1) {
      let ammont = PrincipalAdjusted;
      setBusinessDetailSection({
        ...businessDetailSection,
        ["TotalAdjustmentPMC"]: parseFloat(ammont),
      });
    } else if (MarkupAdjusted != -1) {
      let ammont = MarkupAdjusted;

      setBusinessDetailSection({
        ...businessDetailSection,
        ["TotalAdjustmentPMC"]: parseFloat(ammont),
      });
    } else if (Charges != -1) {
      let ammont = Charges;

      setBusinessDetailSection({
        ...businessDetailSection,
        ["TotalAdjustmentPMC"]: parseFloat(ammont),
      });
    }
  }, [
    businessDetailSection.PrincipalAdjusted,
    businessDetailSection.MarkupAdjusted,
    businessDetailSection.Charges,
  ]);

  //for DPS transaction amount,acquire value and acquisition charges

  useEffect(() => {
    let DPSTransactionAmount = businessDetailSection.DPSTransactionAmount;
    let AcquiredValue = businessDetailSection.AcquiredValue;
    let AcquisitionCharges = businessDetailSection.AcquisitionCharges;

    if (
      DPSTransactionAmount != -1 &&
      AcquiredValue != -1 &&
      AcquisitionCharges != -1
    ) {
      let newAmmount =
        DPSTransactionAmount + AcquiredValue + AcquisitionCharges;
      setBusinessDetailSection({
        ...businessDetailSection,
        ["TotalValueDAA"]: parseFloat(newAmmount),
      });
    } else if (DPSTransactionAmount != -1 && AcquiredValue != -1) {
      let ammont = AcquiredValue + DPSTransactionAmount;
      setBusinessDetailSection({
        ...businessDetailSection,
        ["TotalValueDAA"]: parseFloat(ammont),
      });
    } else if (AcquiredValue != -1 && AcquisitionCharges != -1) {
      let ammont = AcquiredValue + AcquisitionCharges;

      setBusinessDetailSection({
        ...businessDetailSection,
        ["TotalValueDAA"]: parseFloat(ammont),
      });
    } else if (DPSTransactionAmount != -1 && AcquisitionCharges != -1) {
      let ammont = DPSTransactionAmount + AcquisitionCharges;

      setBusinessDetailSection({
        ...businessDetailSection,
        ["TotalValueDAA"]: parseFloat(ammont),
      });
    } else if (DPSTransactionAmount != -1) {
      let ammont = DPSTransactionAmount;
      setBusinessDetailSection({
        ...businessDetailSection,
        ["TotalValueDAA"]: parseFloat(ammont),
      });
    } else if (AcquiredValue != -1) {
      let ammont = AcquiredValue;

      setBusinessDetailSection({
        ...businessDetailSection,
        ["TotalValueDAA"]: parseFloat(ammont),
      });
    } else if (AcquisitionCharges != -1) {
      let ammont = AcquisitionCharges;

      setBusinessDetailSection({
        ...businessDetailSection,
        ["TotalValueDAA"]: parseFloat(ammont),
      });
    }
  }, [
    businessDetailSection.DPSTransactionAmount,
    businessDetailSection.AcquiredValue,
    businessDetailSection.AcquisitionCharges,
  ]);

  // for land-market  value and buildding market value
  useEffect(() => {
    let LandMarketValue = parseFloat(valuationDetails.LandMarketValue);
    let BuildingMarketValue = parseFloat(valuationDetails.BuildingMarketValue);

    if (LandMarketValue != -1 && BuildingMarketValue != -1) {
      let newAmmount = LandMarketValue + BuildingMarketValue;
      setValuationDetails({
        ...valuationDetails,
        ["TotalMarketValue"]: parseFloat(newAmmount),
      });
    } else if (BuildingMarketValue != -1) {
      console.log("businessDetailSection.NumberOfValuationsBusiness 21");
      setValuationDetails({
        ...valuationDetails,
        ["TotalMarketValue"]: parseFloat(BuildingMarketValue),
      });
    } else if (LandMarketValue != -1) {
      setValuationDetails({
        ...valuationDetails,
        ["TotalMarketValue"]: parseFloat(LandMarketValue),
      });
    } else {
      setValuationDetails({
        ...valuationDetails,
        ["TotalMarketValue"]: parseInt(-1),
      });
    }
  }, [valuationDetails.LandMarketValue, valuationDetails.BuildingMarketValue]);

  console.log("SearchCustomerMysis", customerSection);
  //for average forced sale and average market value
  useEffect(() => {
    if (
      valuationDetails.EvaluatorName != "" ||
      valuationDetails.LandForcedSaleValue != -1 ||
      valuationDetails.LandMarketValue != -1 ||
      valuationDetails.BuildingForcedSaleValue != -1 ||
      valuationDetails.BuildingMarketValue != -1
    ) {
      // if(businessDetailSection.NumberOfValuationsBusiness!=-1){
      console.log(
        "businessDetailSection.NumberOfValuationsBusiness 22",
        valuationDetails.EvaluatorName,
        valuationDetails.LandForcedSaleValue,
        valuationDetails.LandMarketValue,
        valuationDetails.BuildingForcedSaleValue,
        valuationDetails.BuildingMarketValue
      );
      if (businessDetailSection.PropertyEvaluatorBusinessList.length > 0) {
        let grid = businessDetailSection.PropertyEvaluatorBusinessList;
        let totaolfvalue = valuationDetails.TotalForcedSaleValue;
        let totaolmvalue = valuationDetails.TotalMarketValue;
        grid.map((data, index) => {
          totaolfvalue =
            parseFloat(totaolfvalue) + parseFloat(data.TotalForcedSaleValue);
          totaolmvalue =
            parseFloat(totaolmvalue) + parseFloat(data.TotalMarketValue);

          console.log(
            "businessDetailSection.NumberOfValuationsBusiness 12",
            parseInt(data.TotalForcedSaleValue),
            totaolfvalue
          );
        });
        console.log(
          "businessDetailSection.NumberOfValuationsBusiness 13",
          totaolfvalue
        );
        let avgf =
          totaolfvalue /
          (parseInt(
            businessDetailSection.PropertyEvaluatorBusinessList.length
          ) +
            1);
        let avgm =
          totaolmvalue /
          (parseInt(
            businessDetailSection.PropertyEvaluatorBusinessList.length
          ) +
            1);
        console.log(
          "businessDetailSection.NumberOfValuationsBusiness 14",
          avgf,
          avgm,
          parseInt(businessDetailSection.NumberOfValuationsBusiness) + 1
        );

        setBusinessDetailSection({
          ...businessDetailSection,
          ["NumberOfValuationsBusiness"]:
            parseInt(
              businessDetailSection.PropertyEvaluatorBusinessList.length
            ) + 1,
          ["AverageForcedSaleValueBusiness"]: avgf,
          ["AverageMarketValueBusiness"]: avgm,
        });
      } else {
        console.log(
          "businessDetailSection.NumberOfValuationsBusiness 23",
          businessDetailSection.NumberOfValuationsBusiness
        );
        let avgf = valuationDetails.TotalForcedSaleValue;
        let avgm = valuationDetails.TotalMarketValue;
        setBusinessDetailSection({
          ...businessDetailSection,
          ["NumberOfValuationsBusiness"]: parseInt(1),
          ["AverageForcedSaleValueBusiness"]: avgf,
          ["AverageMarketValueBusiness"]: avgm,
        });
      }
    } else {
      if (businessDetailSection.PropertyEvaluatorBusinessList.length > 0) {
        let grid = businessDetailSection.PropertyEvaluatorBusinessList;
        let totaolfvalue = valuationDetails.TotalForcedSaleValue;
        let totaolmvalue = valuationDetails.TotalMarketValue;
        grid.map((data, index) => {
          totaolfvalue =
            parseFloat(data.TotalForcedSaleValue) - parseFloat(totaolfvalue);
          totaolmvalue =
            parseFloat(data.TotalMarketValue) - parseFloat(totaolmvalue);

          console.log(
            "businessDetailSection.NumberOfValuationsBusiness 12",
            parseInt(data.TotalForcedSaleValue),
            totaolfvalue
          );
        });
        console.log(
          "businessDetailSection.NumberOfValuationsBusiness 13",
          totaolfvalue
        );
        let avgf =
          totaolfvalue /
          parseInt(businessDetailSection.PropertyEvaluatorBusinessList.length);
        let avgm =
          totaolmvalue /
          parseInt(businessDetailSection.PropertyEvaluatorBusinessList.length);
        console.log(
          "businessDetailSection.NumberOfValuationsBusiness 14",
          avgf,
          avgm,
          parseInt(businessDetailSection.NumberOfValuationsBusiness) + 1
        );

        setBusinessDetailSection({
          ...businessDetailSection,
          ["NumberOfValuationsBusiness"]: parseInt(
            businessDetailSection.PropertyEvaluatorBusinessList.length
          ),
          ["AverageForcedSaleValueBusiness"]: avgf,
          ["AverageMarketValueBusiness"]: avgm,
        });
      } else {
        setBusinessDetailSection({
          ...businessDetailSection,
          ["NumberOfValuationsBusiness"]: -1,
          ["AverageForcedSaleValueBusiness"]: -1,
          ["AverageMarketValueBusiness"]: -1,
        });
      }
    }
  }, [valuationDetails]);

  useEffect(() => {
    let namePropertyType = setupForms.PropertyTypeData;
    if (
      namePropertyType != undefined &&
      namePropertyType != null &&
      Object.keys(namePropertyType).length > 0
    ) {
      setPropertyType(
        namePropertyType.map((data, index) => {
          return data.title;
        })
      );
    }
  }, [setupForms.PropertyTypeData]);

  useEffect(() => {
    console.log("PropertyOptions", propertyType);
  }, [propertyType]);

  useEffect(() => {
    if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
      let NBACaseID = JSON.parse(localStorage.getItem("NBACaseID"));
      let Data = {
        NBACaseID: NBACaseID,
      };
      console.log("ViewBusinessTeamData NBACaseID", NBACaseID);
      dispatch(GetAllPropertyType());
      dispatch(ViewBusinessTeamData(Data));
    }
  }, []);
  // const goToSaveHandler = async (e) => {
  //   e.preventDefault();
  //   let NBACCtem = NBACaseCustomerList;
  //   let NBAPMtem = NBACasePropertyModelList;
  //   let tem1 = [];
  //   if (customerDetailsField === true) {
  //     if (NBACaseCustomerList.length > 0) {
  //       await NBACCtem.push(customerSection);
  //     } else {
  //       await NBACCtem.push(customerSection);
  //     }
  //   }
  //   if (customerAdjustmentField === true) {
  //     if (NBACasePropertyModelList.length > 0) {
  //       if (customerField === true) {
  //         console.log(
  //           "AddAnotherProperty valuationDetails 1",
  //           valuationDetails
  //         );
  //         if (
  //           valuationDetails.EvaluatorName != "" &&
  //           valuationDetails.BuildingMarketValue != -1 &&
  //           valuationDetails.LandMarketValue != -1 &&
  //           valuationDetails.LandForcedSaleValue != -1 &&
  //           valuationDetails.BuildingForcedSaleValue != -1 &&
  //           valuationDetails.DateOfValuation != ""
  //         ) {
  //           console.log(
  //             "AddAnotherProperty valuationDetails",
  //             valuationDetails
  //           );
  //           // let tem1 = [];
  //           let check = businessDetailSection.PropertyEvaluatorBusinessList;
  //           if (check.length > 0) {
  //             await tem1.push(...check, valuationDetails);
  //             let data = {
  //               PropertyType: businessDetailSection.PropertyType,
  //               PropertyAcquiredDetails:
  //                 businessDetailSection.PropertyAcquiredDetails,
  //               PrincipalAdjusted: businessDetailSection.PrincipalAdjusted,
  //               MarkupAdjusted: businessDetailSection.MarkupAdjusted,
  //               Charges: businessDetailSection.Charges,
  //               TotalAdjustmentPMC: businessDetailSection.TotalAdjustmentPMC,
  //               AcquiredValue: businessDetailSection.AcquiredValue,
  //               AcquisitionCharges: businessDetailSection.AcquisitionCharges,
  //               DateOfAcquisition: businessDetailSection.DateOfAcquisition,
  //               DPSTransactionAmount:
  //                 businessDetailSection.DPSTransactionAmount,
  //               TotalValueDAA: businessDetailSection.TotalValueDAA,
  //               NumberOfValuationsBusiness:
  //                 businessDetailSection.NumberOfValuationsBusiness,
  //               AverageForcedSaleValueBusiness:
  //                 businessDetailSection.AverageForcedSaleValueBusiness,
  //               AverageMarketValueBusiness:
  //                 businessDetailSection.AverageMarketValueBusiness,
  //               PropertyEvaluatorBusinessList: tem1,
  //             };
  //             console.log("AddAnotherProperty tem1", tem1);
  //             await NBAPMtem.push(data);
  //             console.log("AddAnotherProperty tem", NBAPMtem);
  //           } else {
  //             if (
  //               valuationDetails.EvaluatorName != "" &&
  //               valuationDetails.BuildingMarketValue != -1 &&
  //               valuationDetails.LandMarketValue != -1 &&
  //               valuationDetails.LandForcedSaleValue != -1 &&
  //               valuationDetails.BuildingForcedSaleValue != -1 &&
  //               valuationDetails.DateOfValuation != ""
  //             ) {
  //               await tem1.push(valuationDetails);
  //               let data = {
  //                 PropertyType: businessDetailSection.PropertyType,
  //                 PropertyAcquiredDetails:
  //                   businessDetailSection.PropertyAcquiredDetails,
  //                 PrincipalAdjusted: businessDetailSection.PrincipalAdjusted,
  //                 MarkupAdjusted: businessDetailSection.MarkupAdjusted,
  //                 Charges: businessDetailSection.Charges,
  //                 TotalAdjustmentPMC: businessDetailSection.TotalAdjustmentPMC,
  //                 AcquiredValue: businessDetailSection.AcquiredValue,
  //                 AcquisitionCharges: businessDetailSection.AcquisitionCharges,
  //                 DateOfAcquisition: businessDetailSection.DateOfAcquisition,
  //                 DPSTransactionAmount:
  //                   businessDetailSection.DPSTransactionAmount,
  //                 TotalValueDAA: businessDetailSection.TotalValueDAA,
  //                 NumberOfValuationsBusiness:
  //                   businessDetailSection.NumberOfValuationsBusiness,
  //                 AverageForcedSaleValueBusiness:
  //                   businessDetailSection.AverageForcedSaleValueBusiness,
  //                 AverageMarketValueBusiness:
  //                   businessDetailSection.AverageMarketValueBusiness,
  //                 PropertyEvaluatorBusinessList: tem1,
  //               };
  //               console.log("AddAnotherProperty tem1", tem1);
  //               await NBAPMtem.push(data);
  //               console.log("AddAnotherProperty tem", NBAPMtem);
  //             }
  //           }
  //         } else {
  //           console.log("Please enter at-least 2 valuations against all properties");
  //           setOpen({
  //             flag: true,
  //             message: "Enter Required Fields",
  //           });
  //         }
  //       } else {
  //         console.log(
  //           "AddAnotherProperty businessDetailSection",
  //           businessDetailSection
  //         );
  //         NBAPMtem.push(businessDetailSection);
  //       }
  //     } else {
  //       if (customerField === true) {
  //         console.log(
  //           "AddAnotherProperty valuationDetails 1",
  //           valuationDetails
  //         );
  //         if (
  //           valuationDetails.EvaluatorName != "" &&
  //           valuationDetails.BuildingMarketValue != -1 &&
  //           valuationDetails.LandMarketValue != -1 &&
  //           valuationDetails.LandForcedSaleValue != -1 &&
  //           valuationDetails.BuildingForcedSaleValue != -1 &&
  //           valuationDetails.DateOfValuation != ""
  //         ) {
  //           console.log(
  //             "AddAnotherProperty valuationDetails",
  //             valuationDetails
  //           );
  //           // let tem1 = [];
  //           let check = businessDetailSection.PropertyEvaluatorBusinessList;
  //           if (check.length > 0) {
  //             tem1.push(...check, valuationDetails);
  //             let data = {
  //               PropertyType: businessDetailSection.PropertyType,
  //               PropertyAcquiredDetails:
  //                 businessDetailSection.PropertyAcquiredDetails,
  //               PrincipalAdjusted: businessDetailSection.PrincipalAdjusted,
  //               MarkupAdjusted: businessDetailSection.MarkupAdjusted,
  //               Charges: businessDetailSection.Charges,
  //               TotalAdjustmentPMC: businessDetailSection.TotalAdjustmentPMC,
  //               AcquiredValue: businessDetailSection.AcquiredValue,
  //               AcquisitionCharges: businessDetailSection.AcquisitionCharges,
  //               DateOfAcquisition: businessDetailSection.DateOfAcquisition,
  //               DPSTransactionAmount:
  //                 businessDetailSection.DPSTransactionAmount,
  //               TotalValueDAA: businessDetailSection.TotalValueDAA,
  //               NumberOfValuationsBusiness:
  //                 businessDetailSection.NumberOfValuationsBusiness,
  //               AverageForcedSaleValueBusiness:
  //                 businessDetailSection.AverageForcedSaleValueBusiness,
  //               AverageMarketValueBusiness:
  //                 businessDetailSection.AverageMarketValueBusiness,
  //               PropertyEvaluatorBusinessList: tem1,
  //             };
  //             console.log("AddAnotherProperty tem1", tem1);
  //             await NBAPMtem.push(data);
  //             console.log("AddAnotherProperty tem", NBAPMtem);
  //           } else {
  //             if (
  //               valuationDetails.EvaluatorName != "" &&
  //               valuationDetails.BuildingMarketValue != -1 &&
  //               valuationDetails.LandMarketValue != -1 &&
  //               valuationDetails.LandForcedSaleValue != -1 &&
  //               valuationDetails.BuildingForcedSaleValue != -1 &&
  //               valuationDetails.DateOfValuation != ""
  //             ) {
  //               tem1.push(valuationDetails);
  //               let data = {
  //                 PropertyType: businessDetailSection.PropertyType,
  //                 PropertyAcquiredDetails:
  //                   businessDetailSection.PropertyAcquiredDetails,
  //                 PrincipalAdjusted: businessDetailSection.PrincipalAdjusted,
  //                 MarkupAdjusted: businessDetailSection.MarkupAdjusted,
  //                 Charges: businessDetailSection.Charges,
  //                 TotalAdjustmentPMC: businessDetailSection.TotalAdjustmentPMC,
  //                 AcquiredValue: businessDetailSection.AcquiredValue,
  //                 AcquisitionCharges: businessDetailSection.AcquisitionCharges,
  //                 DateOfAcquisition: businessDetailSection.DateOfAcquisition,
  //                 DPSTransactionAmount:
  //                   businessDetailSection.DPSTransactionAmount,
  //                 TotalValueDAA: businessDetailSection.TotalValueDAA,
  //                 NumberOfValuationsBusiness:
  //                   businessDetailSection.NumberOfValuationsBusiness,
  //                 AverageForcedSaleValueBusiness:
  //                   businessDetailSection.AverageForcedSaleValueBusiness,
  //                 AverageMarketValueBusiness:
  //                   businessDetailSection.AverageMarketValueBusiness,
  //                 PropertyEvaluatorBusinessList: tem1,
  //               };
  //               console.log("AddAnotherProperty tem1", tem1);
  //               await NBAPMtem.push(data);
  //               console.log("AddAnotherProperty tem", NBAPMtem);
  //             }
  //           }
  //         } else {
  //           console.log("Please enter at-least 2 valuations against all properties");
  //           setOpen({
  //             flag: true,
  //             message: "Enter Required Fields",
  //           });
  //         }
  //       } else {
  //         console.log(
  //           "AddAnotherProperty businessDetailSection",
  //           businessDetailSection
  //         );
  //         await NBAPMtem.push(businessDetailSection);
  //       }
  //     }
  //   }

  //   let Data = {
  //     IsFullSettlement: saveNewData.IsFullSettlement,
  //     ApprovalAuthority: saveNewData.ApprovalAuthority,
  //     RemarksBusiness: saveNewData.RemarksBusiness,
  //     SendForApproval: saveNewData.SendForApproval,
  //     NBACaseCustomerList: NBACCtem,
  //     NBACasePropertyModelList: NBAPMtem,
  //   };
  //   console.log("gotosave", Data);
  //   dispatch(SaveBusinessTeamData(Data));
  // };

  useEffect(() => {
    if (
      nonBankingAssets.ViewREMCaseData &&
      Object.keys(nonBankingAssets.ViewREMCaseData).length > 0
    ) {
      let viewData = nonBankingAssets.ViewREMCaseData;
      console.log("ViewBusinessTeamData", viewData.nbaCaseID);
      setSaveNewData({
        IsFullSettlement: viewData.isFullSettlement,
        ApprovalAuthority: viewData.approvalAuthority,
        ReferenceNumber: viewData.referenceNumber,
        RemarksBusiness: viewData.remarksBusiness,
        NBACaseID: viewData.nbaCaseID,
      });
      localStorage.setItem("NBACaseID", viewData.nbaCaseID);
      // NBACasePropertyModelList
      let nbaCasePropertyModelList = viewData.nbaCasePropertyModelList;
      let nbaCaseCustomerList = viewData.nbaCaseCustomerList;
      if (nbaCasePropertyModelList && nbaCasePropertyModelList.length > 0) {
        let tem = [];
        nbaCasePropertyModelList.map((data, index) => {
          let temp = [];
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
            NumberOfValuationsBusiness: data.numberOfValuationsBusiness,
            AverageForcedSaleValueBusiness: data.averageForcedSaleValueBusiness,
            AverageMarketValueBusiness: data.averageMarketValueBusiness,
            PropertyEvaluatorBusinessList: temp,
          });
        });
        console.log("ViewBusinessTeamData", tem);
        setNBACasePropertyModelList(tem);
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
  return (
    <>
      {/* <form onSubmit={(e) => goToSaveHandler(e)}> */}
      <Title className={styles["nbaHeading"]} level={3}>
        Non-Banking Assets & Other Assets
      </Title>

      <Paper className={styles["nbaPaper"]}>
        <Col xl={8} lg={8} sm={6} xs={24} className={styles["nbapaperbtm"]}>
          <h1
           className={styles["nbaCustomerSection"]}
          >
            Customer Details Section
          </h1>
        </Col>

        {/* {NBACaseCustomerList.length>0?
          <MultipleCustomerDetails/>:null} */}
        <Row gutter={[16, 16]} className={styles["nbaCustomerpadding"]}>
          {NBACaseCustomerList.length > 0
            ? NBACaseCustomerList.map((data, index) => {
                return (
                  <Col xl={24} lg={24} sm={24} xs={24}>
                    <div className={styles["landforceslae"]}/>
                    <MultipleCustomerDetails
                      list={data}
                      ind={index}
                      setNBACaseCustomerList={setNBACaseCustomerList}
                      NBACaseCustomerList={NBACaseCustomerList}
                      view={true}
                      collaps={true}
                      editView={true}
                    />
                  </Col>
                );
              })
            : null}
          <Col xl={8} lg={8} sm={24} xs={24}>
            <TextField
              size="small"
              label="Reference #"
              fullWidth
              value={saveNewData.ReferenceNumber}
              disable
              textLength={7}
              name="NPLCode"
            />
          </Col>
        </Row>
      </Paper>
      <div className={styles["nbabusiness"]} />
      <Paper padding="2" className={styles["nbabusinessPaper"]}>
        <Col xl={8} lg={8} sm={6} xs={24} className={styles["nbapaperbtm"]}>
          <h1
           className={styles["nbabusinessSection"]}
          >
            Business Details Section
          </h1>
        </Col>

        {/* <MultipleCustomerDetails/> */}
        <Row gutter={[16, 16]}>
          <Col xl={10} lg={10} sm={24} className={styles["nbabusinessTop"]}>
            <label>
              <b>Settlement Type</b>
            </label>
            <br />
            <Radio.Group
              name="SettlementType"
              value={saveNewData.IsFullSettlement}
              onChange={custDatatMainHandler}
              disable={true}
            >
              <Radio disabled value={false}>
                Partial Settlement
              </Radio>
              <Radio disabled value={true}>
                Full Settlement
              </Radio>
            </Radio.Group>
          </Col>
          <Col xl={14} lg={14} sm={24} xs={24}>
            <label>
              <b className={styles["DEBTSearchNbaFonts"]}>
                Approval Authority
                {customerAdjustmentField ? (
                  <span className={styles["nbaaesterick"]}>*</span>
                ) : null}
              </b>
            </label>
            <TextField
              // label="Approval Authority"
              size="small"
              textLength={200}
              fullWidth
              autoComplete="off"
              name="ApprovalAuthority"
              change={custDatatMainHandler}
              value={saveNewData.ApprovalAuthority}
              // required
              disable
            />
          </Col>
        </Row>

        <div
          className={styles["nbaProperty"]}
        >
          {NBACasePropertyModelList.length > 0
            ? NBACasePropertyModelList.map((data, index) => {
                return (
                  <Col xl={24} lg={24} sm={24} xs={24}>
                    <div className={styles["landforceslae"]} />
                    <MultipleBusinessDetails
                      list={data}
                      ind={index}
                      NBACasePropertyModelList={NBACasePropertyModelList}
                      setNBACasePropertyModelList={setNBACasePropertyModelList}
                      setupForms={setupForms}
                      view={true}
                      collaps={true}
                      editView={true}
                    />
                  </Col>
                );
              })
            : null}
        </div>

        <div className={styles["updateTopmargin"]} />
        <Col xl={24} lg={24} sm={24} xs={24}>
          <label>
            <b className={styles["DEBTSearchNbaFonts"]}>
              Remarks
              {customerAdjustmentField ? (
                <span sclassName={styles["nbaaesterick"]}>*</span>
              ) : null}
            </b>
          </label>
          <TextField
            name="RemarksBusiness"
            size="large"
            placeholder="Remarks"
            textLength={300}
            // width="100%"
            className={styles["input-field-w100"]}
            // label={"Remarks"}
            // required={remarkss}
            disable
            value={saveNewData.RemarksBusiness}
            change={custDatatMainHandler}
          />
        </Col>
      </Paper>

      {/* </form> */}
      <Notification setOpen={setOpen} open={open.flag} message={open.message} />
      {nonBankingAssets.Loading ? <Loader /> : null}
    </>
  );
};

export default ViewNBAAssetsDEBT;
