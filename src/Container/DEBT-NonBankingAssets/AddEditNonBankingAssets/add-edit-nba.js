import React, { useEffect, useState } from "react";

import { Grid } from "@material-ui/core";

import AddIcon from "@material-ui/icons/Add";

import { Typography, Radio } from "antd";

import MultipleBusinessDetails from "./multiple-business-details";

import {
  SearchCustomerMysis,
  SaveBusinessTeamData,
  notificationFalse,
} from "../../../store/actions/nonbanking-assets-actions";

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
  FormattedInputs,
} from "../../../Components/Elements";
import ErrorBar from "./../../Authentication/SignUp/ErrorBar/error-bar";
import { useSelector, useDispatch } from "react-redux";

import { GetAllPropertyType } from "../../../store/actions/setup-forms-actions";

import {
  DateDisplayFormat,
  DateSendingFormat,
  NumberFormater,
  CommaFormter,
} from "../../../Common/Functions/date-formatter";
import styles from "../DEBT.module.css";

import MultipleCustomerDetails from "./multiple-customer-details";

const AddEditNBAAssetsDEBT = () => {
  const { Title } = Typography;

  const dispatch = useDispatch();

  const state = useSelector((state) => state);

  const { setupForms, nonBankingAssets } = state;

  const [open, setOpen] = useState({
    flag: false,
    message: "",
  });

  //for my sys error
  const [misysError, setMisysError] = useState(false);

  const [misysErrMsg, setMisysErrMsg] = useState("");

  const [propertyType, setPropertyType] = useState([]);

  const [propertyTypeName, setPropertyTypeName] = useState("");

  const [customerField, setCustomerField] = useState(true);

  const [customerAdjustmentField, setCustomerAdjustmentField] = useState(true);

  const [remarkss, setRemarkss] = useState(true);

  const [customerDetailsField, setCustomerDetailsField] = useState(true);
  const [customer1DetailsField, setCustomer1DetailsField] = useState(true);

  const [actions, setActions] = useState({
    add: false,
    delete: false,
    update: false,
  });

  //states for customer section input fields
  const [customerSection, setCustomerSection] = useState({
    MisysCode: "",
    BorrowerName: "",
    BorrowerAddress: "",
    ECIBCode: "",
    IPartyID: -1,
    NBACaseCustomerAccountList: [],
  });

  //for update grid in valuation details
  const [records, setRecords] = useState([]);
  const [recordIndex, setRecordIndex] = useState();

  // for business fields
  const [businessTextFields, setBusinessTextFields] = useState(false);

  // for valuation fields
  const [valuationTextFields, setValuationTextFields] = useState(false);

  // for customer Edit
  const [NBACaseCustomerListIndex, setNBACaseCustomerListIndex] = useState(-1);

  //for mysis error
  const [mysisError, setMysisError] = useState(false);
  // for approval, remarks & all
  const [remarksApprovalMysis, setRemarksApprovalMysis] = useState(false);

  // for customer Edit  Button
  const [NBACaseCustomerListButton, setNBACaseCustomerListButton] =
    useState(false);

  const [NBACaseCustomerList, setNBACaseCustomerList] = useState([]);

  // for customer Edit
  const [NBACaseBusinessListIndex, setNBACaseNBACaseBusinessListIndex] =
    useState(-1);

  // for business edit button
  const [NBACaseBusinessListButton, setNBACaseBusinessListButton] =
    useState(false);

  // for valuation edit button
  const [NBACaseValuationListButton, setNBACaseValuationListButton] =
    useState(false);

  const [businessDetailSection, setBusinessDetailSection] = useState({
    PropertyType: -1,
    PropertyAcquiredDetails: "",
    PrincipalAdjusted: -1,
    MarkupAdjusted: -1,
    Charges: -1,
    TotalAdjustmentPMC: -1,
    AcquiredValue: -1,
    AcquisitionCharges: -1,
    DateOfAcquisition: "18000101",
    DPSTransactionAmount: -1,
    TotalValueDAA: -1,
    NumberOfValuationsBusiness: -1,
    AverageForcedSaleValueBusiness: -1,
    AverageMarketValueBusiness: -1,
    PropertyEvaluatorBusinessList: [],
  });

  const [NBACaseValuationDetailsList, setNBACaseValuationDetailsList] =
    useState([]);

  const [valuationDetails, setValuationDetails] = useState({
    EvaluatorName: "",
    LandForcedSaleValue: parseInt(-1),
    LandMarketValue: parseInt(-1),
    BuildingForcedSaleValue: parseInt(-1),
    BuildingMarketValue: parseInt(-1),
    TotalForcedSaleValue: parseInt(-1),
    TotalMarketValue: parseInt(-1),
    DateOfValuation: "18000101",
  });

  const [NBACasePropertyModelList, setNBACasePropertyModelList] = useState([]);

  const [approvalAuthority, setApprovalAuthority] = useState({
    ApprovalAuthority: "",
  });

  const [saveNewData, setSaveNewData] = useState({
    IsFullSettlement: false,
    ApprovalAuthority: "",
    RemarksBusiness: "",
    SendForApproval: -1,
  });

  const nbaHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (
      name != "PropertyAcquiredDetails" &&
      name != "EvaluatorName" &&
      name != "ApprovalAuthority" &&
      (value != "" || value === false)
    ) {
    }
    if (name === "PropertyAcquiredDetails" && value !== "") {
      var valueCheck = value.replace(
        /[a-zA-Z_0-9@\!#\$\^%&*()+=\-[]\\\';,\.\/\{\}\|\":<>\? ]/,
        ""
      );
      console.log("valueCheck", valueCheck);

      if (!valueCheck == "") {
        console.log("valueCheck in", valueCheck);
        setBusinessDetailSection({
          ...businessDetailSection,
          [name]: valueCheck.trimStart(),
        });
      }
    } else if (name === "PropertyAcquiredDetails" && value === "") {
      setBusinessDetailSection({
        ...businessDetailSection,
        [name]: "",
      });
    }
    if (name === "EvaluatorName" && value != "") {
      var valueCheck = value.replace(
        /[a-zA-Z_0-9@\!#\$\^%&*()+=\-[]\\\';,\.\/\{\}\|\":<>\? ]/,
        ""
      );
      console.log("EvaluatorName", valueCheck);

      if (!valueCheck == "") {
        console.log("EvaluatorName in", valueCheck);
        setCustomerField(true);
        setCustomerAdjustmentField(true);
        setValuationDetails({
          ...valuationDetails,
          [name]: valueCheck.trimStart(),
        });
      }
    } else if (name === "EvaluatorName" && value === "") {
      console.log("EvaluatorName 4 in", NBACasePropertyModelList);
      if (NBACasePropertyModelList.length > 0) {
        console.log("EvaluatorName 4 in", NBACasePropertyModelList.length);
        if (businessDetailSection.PropertyEvaluatorBusinessList.length > 1) {
          console.log(
            "EvaluatorName 4 in",
            businessDetailSection.PropertyEvaluatorBusinessList.length
          );
          if (businessDetailSection.PropertyType === -1) {
            console.log(
              "EvaluatorName 4 in",
              businessDetailSection.PropertyType
            );
            setCustomerAdjustmentField(false);
            setCustomerField(false);
          } else {
            console.log(
              "EvaluatorName 4 in",
              businessDetailSection.PropertyType
            );
            setCustomerAdjustmentField(true);
            setCustomerField(true);
          }
        } else if (
          businessDetailSection.PropertyEvaluatorBusinessList.length > 0
        ) {
          console.log(
            "EvaluatorName 4 in",
            businessDetailSection.PropertyEvaluatorBusinessList.length
          );
          setCustomerAdjustmentField(true);
          setCustomerField(true);
        } else {
          if (
            businessDetailSection.PropertyEvaluatorBusinessList.length === 0
          ) {
            console.log(
              "EvaluatorName 4 in",
              businessDetailSection.PropertyEvaluatorBusinessList.length
            );
            if (businessDetailSection.PropertyType === -1) {
              console.log(
                "EvaluatorName 4 in",
                businessDetailSection.PropertyType
              );
              setCustomerAdjustmentField(false);
              setCustomerField(false);
            } else {
              console.log(
                "EvaluatorName 4 in",
                businessDetailSection.PropertyType
              );
              setCustomerAdjustmentField(true);
              setCustomerField(true);
            }
          } else {
            if (businessDetailSection.PropertyType === -1) {
              console.log(
                "EvaluatorName 4 in",
                businessDetailSection.PropertyType
              );
              setCustomerAdjustmentField(false);
              setCustomerField(false);
            } else {
              console.log(
                "EvaluatorName 4 in",
                businessDetailSection.PropertyType
              );
              setCustomerAdjustmentField(true);
              setCustomerField(true);
            }
          }
        }
      } else {
        console.log(
          "EvaluatorName 4 in",
          businessDetailSection.PropertyEvaluatorBusinessList
        );
        if (businessDetailSection.PropertyEvaluatorBusinessList.length > 1) {
          console.log(
            "EvaluatorName 4 in",
            businessDetailSection.PropertyEvaluatorBusinessList.length
          );
          setCustomerField(false);
        } else {
          console.log(
            "EvaluatorName 4 in",
            businessDetailSection.PropertyEvaluatorBusinessList.length
          );
          setCustomerField(true);
        }
      }
      setValuationDetails({
        ...valuationDetails,
        [name]: "",
      });
    }
    if (name === "ApprovalAuthority" && value !== "") {
      var valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      console.log("ApprovalAuthority ", valueCheck);

      if (!valueCheck == "") {
        console.log("valueCheck ApprovalAuthority in", valueCheck);
        setApprovalAuthority({
          ...approvalAuthority,
          [name]: valueCheck.trimStart(),
        });
      }
    } else if (name === "ApprovalAuthority" && value === "") {
      setApprovalAuthority({
        ...approvalAuthority,
        [name]: "",
      });
    }
  };

  const DateHandler = (e, val) => {
    let id = e.target.id != undefined ? e.target.id : null;
    let name = e.target.name;
    let value = e.target.value;
    console.log("DateHandler", name, value);
    if (name === "DateOfAcquisition" && value != "" && value != "18000101") {
      console.log("DateHandler", name, value);
      setBusinessDetailSection({
        ...businessDetailSection,
        [name]: DateSendingFormat(value),
      });
    } else if (
      name === "DateOfAcquisition" &&
      (value === "" || value === "18000101")
    ) {
      console.log("DateHandler", name, value);
      setBusinessDetailSection({
        ...businessDetailSection,
        ["DateOfAcquisition"]: "18000101",
      });
    }
    if (name === "DateOfValuation" && value != "" && value != "18000101") {
      console.log("DateHandler", name, value);
      setValuationDetails({
        ...valuationDetails,
        [name]: DateSendingFormat(value),
      });
    } else if (
      name === "DateOfValuation" &&
      (value === "" || value === "18000101")
    ) {
      console.log("DateHandler", name, value);
      setValuationDetails({
        ...valuationDetails,
        ["DateOfValuation"]: "18000101",
      });
    }
  };

  function isNegative(num) {
    if (Math.sign(num) === -1) {
      return true;
    }

    return false;
  }

  // Delete Valuation table Data
  const deleteGrid = async (record) => {
    console.log("deleteGrid", record, businessDetailSection);

    const filteredItems =
      businessDetailSection.PropertyEvaluatorBusinessList.filter(
        (item) => item != record
      );
    let check = filteredItems;
    if (check.length > 1) {
      // tem.push(...check, valuationDetails);

      let sortTotalMarketValue = check.sort((a, b) => {
        return a.TotalMarketValue - b.TotalMarketValue;
      });

      let totaolfvalue1 = parseFloat(
        parseFloat(sortTotalMarketValue[0].TotalForcedSaleValue).toFixed(2)
      );
      let totaolfvalue2 = parseFloat(
        parseFloat(sortTotalMarketValue[1].TotalForcedSaleValue).toFixed(2)
      );
      let tF =
        parseFloat(parseFloat(totaolfvalue1).toFixed(2)) +
        parseFloat(parseFloat(totaolfvalue2).toFixed(2));
      let avgfvalue = parseFloat(parseFloat(tF).toFixed(2)) / 2;

      let totaolmvalue1 = parseFloat(
        parseFloat(sortTotalMarketValue[0].TotalMarketValue).toFixed(2)
      );
      let totaolmvalue2 = parseFloat(
        parseFloat(sortTotalMarketValue[1].TotalMarketValue).toFixed(2)
      );
      let tm =
        parseFloat(parseFloat(totaolmvalue1).toFixed(2)) +
        parseFloat(parseFloat(totaolmvalue2).toFixed(2));
      let avgmvalue = parseFloat(parseFloat(tm).toFixed(2)) / 2;
      await setBusinessDetailSection({
        ...businessDetailSection,
        ["PropertyEvaluatorBusinessList"]: check,
        ["NumberOfValuationsBusiness"]: check.length,
        ["AverageForcedSaleValueBusiness"]: parseFloat(
          parseFloat(avgfvalue).toFixed(2)
        ),
        ["AverageMarketValueBusiness"]: parseFloat(
          parseFloat(avgmvalue).toFixed(2)
        ),
      });
      console.log("temcheck ", avgmvalue, avgfvalue);
      setCustomerAdjustmentField(true);
      setCustomerField(false);
    } else if (check.length > 0) {
      console.log("check data on delete", check);
      let totaolfvalue = check[0].TotalForcedSaleValue;
      let totaolmvalue = check[0].TotalMarketValue;
      await setBusinessDetailSection({
        ...businessDetailSection,
        ["PropertyEvaluatorBusinessList"]: check,
        ["NumberOfValuationsBusiness"]: 1,
        ["AverageForcedSaleValueBusiness"]: parseFloat(
          parseFloat(totaolfvalue).toFixed(2)
        ),
        ["AverageMarketValueBusiness"]: parseFloat(
          parseFloat(totaolmvalue).toFixed(2)
        ),
      });

      setCustomerAdjustmentField(true);
      setCustomerField(true);
    } else {
      await setBusinessDetailSection({
        ...businessDetailSection,
        ["PropertyEvaluatorBusinessList"]: [],
        ["NumberOfValuationsBusiness"]: -1,
        ["AverageForcedSaleValueBusiness"]: -1,
        ["AverageMarketValueBusiness"]: -1,
      });
      if (NBACasePropertyModelList.length > 0) {
        console.log(
          "deleteGrid check 1",
          valuationDetails,
          businessDetailSection
        );
        if (
          valuationDetails.EvaluatorName != "" ||
          businessDetailSection.PropertyType != -1
        ) {
          console.log("deleteGrid check 1.1");
          setCustomerField(true);
          setCustomerAdjustmentField(true);
        } else {
          console.log("deleteGrid check 1.2");
          setCustomerField(false);
          setCustomerAdjustmentField(false);
        }
      } else {
        console.log("deleteGrid check 2");
        setCustomerField(true);
      }
    }
  };

  // For update grid in valuation details

  const update = (e, record) => {
    var objectIndex =
      businessDetailSection.PropertyEvaluatorBusinessList.findIndex(
        (obj) => obj.EvaluatorName === record.EvaluatorName
      );
    console.log("newStatenewState", objectIndex);
    setRecordIndex(objectIndex);
    // setRecords(record);
    setNBACaseValuationListButton(true);
    setValuationDetails({
      ...valuationDetails,
      EvaluatorName: record.EvaluatorName,
      LandForcedSaleValue: record.LandForcedSaleValue,
      LandMarketValue: record.LandMarketValue,
      BuildingForcedSaleValue: record.BuildingForcedSaleValue,
      BuildingMarketValue: record.BuildingMarketValue,
      TotalForcedSaleValue: record.TotalForcedSaleValue,
      TotalMarketValue: record.TotalMarketValue,
      DateOfValuation: record.DateOfValuation,
    });
    setActions({
      ...actions,
      update: true,
      delete: false,
      add: false,
    });
  };

  //For Update Grid Data in Valuation

  const updateValuationDetailsRecord = async (e, record) => {
    // let newdata=businessDetailSection.PropertyEvaluatorBusinessList[recordIndex]=valuationDetails
    // let tem = [];
    //   let check = businessDetailSection.PropertyEvaluatorBusinessList;

    //     tem.push(...check[recordIndex], valuationDetails);
    // businessDetailSection.PropertyEvaluatorBusinessList[recordIndex]=valuationDetails
    setNBACaseValuationListButton(false);
    // setBusinessDetailSection({
    //   ...businessDetailSection,["PropertyEvaluatorBusinessList"]:tem,
    // });
    // setBusinessDetailSection([
    //   ...businessDetailSection,["PropertyEvaluatorBusinessList"]:newdata
    // ]);
    // setValuationDetails({
    //   EvaluatorName: "",
    //   LandForcedSaleValue: parseInt(-1),
    //   LandMarketValue: parseInt(-1),
    //   BuildingForcedSaleValue: parseInt(-1),
    //   BuildingMarketValue: parseInt(-1),
    //   TotalForcedSaleValue: parseInt(-1),
    //   TotalMarketValue: parseInt(-1),
    //   DateOfValuation: "18000101",
    // });
    // setActions({
    //   update: false,
    //   delete: false,
    //   add: true,
    // })
    // setRecords([]);
    if (
      valuationDetails.EvaluatorName != "" &&
      valuationDetails.BuildingMarketValue != -1 &&
      valuationDetails.V != -1 &&
      valuationDetails.LandForcedSaleValue != -1 &&
      valuationDetails.BuildingForcedSaleValue != -1 &&
      valuationDetails.DateOfValuation != "" &&
      valuationDetails.DateOfValuation != "18000101"
    ) {
      setValuationTextFields(false);
      console.log(
        "AddAnotherValuation",
        businessDetailSection.PropertyEvaluatorBusinessList
      );
      let tem = [];
      businessDetailSection.PropertyEvaluatorBusinessList[recordIndex] =
        valuationDetails;
      console.log(
        "newStatenewState",
        businessDetailSection.PropertyEvaluatorBusinessList
      );

      let check = businessDetailSection.PropertyEvaluatorBusinessList;
      console.log("newStatenewState", check.length);

      if (check.length > 1) {
        tem.push(...check);
        console.log("newStatenewState", tem);
        let sortTotalMarketValue = tem.sort((a, b) => {
          return a.TotalMarketValue - b.TotalMarketValue;
        });

        let totaolfvalue1 = parseFloat(
          parseFloat(sortTotalMarketValue[0].TotalForcedSaleValue).toFixed(2)
        );
        let totaolfvalue2 = parseFloat(
          parseFloat(sortTotalMarketValue[1].TotalForcedSaleValue).toFixed(2)
        );
        let tF =
          parseFloat(parseFloat(totaolfvalue1).toFixed(2)) +
          parseFloat(parseFloat(totaolfvalue2).toFixed(2));
        let avgfvalue = parseFloat(parseFloat(tF).toFixed(2)) / 2;

        let totaolmvalue1 = parseFloat(
          parseFloat(sortTotalMarketValue[0].TotalMarketValue).toFixed(2)
        );
        let totaolmvalue2 = parseFloat(
          parseFloat(sortTotalMarketValue[1].TotalMarketValue).toFixed(2)
        );
        let tm =
          parseFloat(parseFloat(totaolmvalue1).toFixed(2)) +
          parseFloat(parseFloat(totaolmvalue2).toFixed(2));
        let avgmvalue = parseFloat(parseFloat(tm).toFixed(2)) / 2;
        await setBusinessDetailSection({
          ...businessDetailSection,
          ["PropertyEvaluatorBusinessList"]: tem,
          ["NumberOfValuationsBusiness"]: tem.length,
          ["AverageForcedSaleValueBusiness"]: parseFloat(
            parseFloat(avgfvalue).toFixed(2)
          ),
          ["AverageMarketValueBusiness"]: parseFloat(
            parseFloat(avgmvalue).toFixed(2)
          ),
        });
        if (tem.length > 1) {
          setCustomerField(false);
        } else {
          setCustomerField(true);
        }
        console.log("temcheck ", avgmvalue, avgfvalue);
      } else {
        tem = valuationDetails;
        let totaolfvalue = valuationDetails.TotalForcedSaleValue;
        let totaolmvalue = valuationDetails.TotalMarketValue;
        await setBusinessDetailSection({
          ...businessDetailSection,
          ["PropertyEvaluatorBusinessList"]: [tem],
          ["NumberOfValuationsBusiness"]: 1,
          ["AverageForcedSaleValueBusiness"]: parseFloat(
            parseFloat(totaolfvalue).toFixed(2)
          ),
          ["AverageMarketValueBusiness"]: parseFloat(
            parseFloat(totaolmvalue).toFixed(2)
          ),
        });
        setCustomerField(true);
      }
      console.log("valuationDetailsqwerty", typeof tem);

      setValuationDetails({
        ...valuationDetails,
        BuildingMarketValue: parseInt(-1),
        LandForcedSaleValue: parseInt(-1),
        LandMarketValue: parseInt(-1),
        BuildingForcedSaleValue: parseInt(-1),
        EvaluatorName: "",
        TotalForcedSaleValue: parseInt(-1),
        TotalMarketValue: parseInt(-1),
        DateOfValuation: "18000101",
      });
    } else {
      setValuationTextFields(true);
      setOpen({
        flag: true,
        message: "Enter Required Fields",
      });
    }
  };
  console.log(
    "newStatenewState 22",
    businessDetailSection.PropertyEvaluatorBusinessList
  );

  const nbaAmountHandler = (e) => {
    console.log(
      "businessDetailSection.NumberOfValuationsBusiness 25",
      e.target.name
    );

    let name = e.target.name;
    let value = e.target.value;

    let newvalue = parseFloat(value);
    if (isNegative(newvalue)) {
      newvalue = newvalue * -1;
    }
    value = newvalue.toString();
    console.log(
      "businessDetailSection.NumberOfValuationsBusiness 27",
      name,
      value,
      !isNaN(value),
      value != -1,
      value != ""
    );
    if (
      name === "DPSTransactionAmount" &&
      value != -1 &&
      value != "" &&
      !isNaN(value)
    ) {
      console.log("value 444", name, value);
      if (value % -1 != 0) {
        console.log("ValueReminder", value);
        if (value.length <= 18) {
          console.log("value 444", name, value.length);
          setBusinessDetailSection({
            ...businessDetailSection,
            [name]: parseFloat(value),
          });
        } else {
          console.log("sliceValue", value.slice(0, 18));
          value = value.slice(0, 18);
          setBusinessDetailSection({
            ...businessDetailSection,
            [name]: parseFloat(value),
          });
        }
      } else {
        if (value.length <= 15) {
          console.log("ValueReminder", name, value.length);
          setBusinessDetailSection({
            ...businessDetailSection,
            [name]: parseFloat(value),
          });
        } else {
          console.log("ValueReminder", name, value.length);

          value = value.slice(0, 15);
          setBusinessDetailSection({
            ...businessDetailSection,
            [name]: parseFloat(value),
          });
        }
      }
    } else if (
      name === "PrincipalAdjusted" &&
      value != -1 &&
      value != "" &&
      !isNaN(value)
    ) {
      console.log("value 444", name, value);
      if (value % -1 != 0) {
        console.log("ValueReminder", value);
        if (value.length <= 18) {
          console.log("value 444", name, value.length);
          setBusinessDetailSection({
            ...businessDetailSection,
            [name]: parseFloat(value),
          });
        } else {
          console.log("sliceValue", value.slice(0, 18));
          value = value.slice(0, 18);
          setBusinessDetailSection({
            ...businessDetailSection,
            [name]: parseFloat(value),
          });
        }
      } else {
        if (value.length <= 15) {
          console.log("ValueReminder", name, value.length);
          setBusinessDetailSection({
            ...businessDetailSection,
            [name]: parseFloat(value),
          });
        } else {
          console.log("ValueReminder", name, value.length);

          value = value.slice(0, 15);
          setBusinessDetailSection({
            ...businessDetailSection,
            [name]: parseFloat(value),
          });
        }
      }
    } else if (
      name === "MarkupAdjusted" &&
      value != -1 &&
      value != "" &&
      !isNaN(value)
    ) {
      console.log("value 444", name, value);
      if (value % -1 != 0) {
        console.log("ValueReminder", value);
        if (value.length <= 18) {
          console.log("value 444", name, value.length);
          setBusinessDetailSection({
            ...businessDetailSection,
            [name]: parseFloat(value),
          });
        } else {
          console.log("sliceValue", value.slice(0, 18));
          value = value.slice(0, 18);
          setBusinessDetailSection({
            ...businessDetailSection,
            [name]: parseFloat(value),
          });
        }
      } else {
        if (value.length <= 15) {
          console.log("ValueReminder", name, value.length);
          setBusinessDetailSection({
            ...businessDetailSection,
            [name]: parseFloat(value),
          });
        } else {
          console.log("ValueReminder", name, value.length);

          value = value.slice(0, 15);
          setBusinessDetailSection({
            ...businessDetailSection,
            [name]: parseFloat(value),
          });
        }
      }
    } else if (
      name === "Charges" &&
      value != -1 &&
      value != "" &&
      !isNaN(value)
    ) {
      console.log("value 444", name, value);
      if (value % -1 != 0) {
        console.log("ValueReminder", value);
        if (value.length <= 18) {
          console.log("value 444", name, value.length);
          setBusinessDetailSection({
            ...businessDetailSection,
            [name]: parseFloat(value),
          });
        } else {
          console.log("sliceValue", value.slice(0, 18));
          value = value.slice(0, 18);
          setBusinessDetailSection({
            ...businessDetailSection,
            [name]: parseFloat(value),
          });
        }
      } else {
        if (value.length <= 15) {
          console.log("ValueReminder", name, value.length);
          setBusinessDetailSection({
            ...businessDetailSection,
            [name]: parseFloat(value),
          });
        } else {
          console.log("ValueReminder", name, value.length);

          value = value.slice(0, 15);
          setBusinessDetailSection({
            ...businessDetailSection,
            [name]: parseFloat(value),
          });
        }
      }
    } else if (
      name === "AcquiredValue" &&
      value != -1 &&
      value != "" &&
      !isNaN(value)
    ) {
      console.log("value 444", name, value);
      if (value % -1 != 0) {
        console.log("ValueReminder", value);
        if (value.length <= 18) {
          console.log("value 444", name, value.length);
          setBusinessDetailSection({
            ...businessDetailSection,
            [name]: parseFloat(value),
          });
        } else {
          console.log("sliceValue", value.slice(0, 18));
          value = value.slice(0, 18);
          setBusinessDetailSection({
            ...businessDetailSection,
            [name]: parseFloat(value),
          });
        }
      } else {
        if (value.length <= 15) {
          console.log("ValueReminder", name, value.length);
          setBusinessDetailSection({
            ...businessDetailSection,
            [name]: parseFloat(value),
          });
        } else {
          console.log("ValueReminder", name, value.length);

          value = value.slice(0, 15);
          setBusinessDetailSection({
            ...businessDetailSection,
            [name]: parseFloat(value),
          });
        }
      }
    } else if (
      name === "AcquisitionCharges" &&
      value != -1 &&
      value != "" &&
      !isNaN(value)
    ) {
      console.log("value 444", name, value);
      if (value % -1 != 0) {
        console.log("ValueReminder", value);
        if (value.length <= 18) {
          console.log("value 444", name, value.length);
          setBusinessDetailSection({
            ...businessDetailSection,
            [name]: parseFloat(value),
          });
        } else {
          console.log("sliceValue", value.slice(0, 18));
          value = value.slice(0, 18);
          setBusinessDetailSection({
            ...businessDetailSection,
            [name]: parseFloat(value),
          });
        }
      } else {
        if (value.length <= 15) {
          console.log("ValueReminder", name, value.length);
          setBusinessDetailSection({
            ...businessDetailSection,
            [name]: parseFloat(value),
          });
        } else {
          console.log("ValueReminder", name, value.length);

          value = value.slice(0, 15);
          setBusinessDetailSection({
            ...businessDetailSection,
            [name]: parseFloat(value),
          });
        }
      }
    } else if (
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
          setValuationDetails({
            ...valuationDetails,
            [name]: parseFloat(value),
          });
        } else {
          console.log("sliceValue", value.slice(0, 18));
          value = value.slice(0, 18);
          setValuationDetails({
            ...valuationDetails,
            [name]: parseFloat(value),
          });
        }
      } else {
        if (value.length <= 15) {
          console.log("ValueReminder", name, value.length);
          setValuationDetails({
            ...valuationDetails,
            [name]: parseFloat(value),
          });
        } else {
          console.log("ValueReminder", name, value.length);

          value = value.slice(0, 15);
          setValuationDetails({
            ...valuationDetails,
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
          setValuationDetails({
            ...valuationDetails,
            [name]: parseFloat(value),
          });
        } else {
          console.log("sliceValue", value.slice(0, 18));
          value = value.slice(0, 18);
          setValuationDetails({
            ...valuationDetails,
            [name]: parseFloat(value),
          });
        }
      } else {
        if (value.length <= 15) {
          console.log("ValueReminder", name, value.length);
          setValuationDetails({
            ...valuationDetails,
            [name]: parseFloat(value),
          });
        } else {
          console.log("ValueReminder", name, value.length);

          value = value.slice(0, 15);
          setValuationDetails({
            ...valuationDetails,
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
          setValuationDetails({
            ...valuationDetails,
            [name]: parseFloat(value),
          });
        } else {
          console.log("sliceValue", value.slice(0, 18));
          value = value.slice(0, 18);
          setValuationDetails({
            ...valuationDetails,
            [name]: parseFloat(value),
          });
        }
      } else {
        if (value.length <= 15) {
          console.log("ValueReminder", name, value.length);
          setValuationDetails({
            ...valuationDetails,
            [name]: parseFloat(value),
          });
        } else {
          console.log("ValueReminder", name, value.length);

          value = value.slice(0, 15);
          setValuationDetails({
            ...valuationDetails,
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
          setValuationDetails({
            ...valuationDetails,
            [name]: parseFloat(value),
          });
        } else {
          console.log("sliceValue", value.slice(0, 18));
          value = value.slice(0, 18);
          setValuationDetails({
            ...valuationDetails,
            [name]: parseFloat(value),
          });
        }
      } else {
        if (value.length <= 15) {
          console.log("ValueReminder", name, value.length);
          setValuationDetails({
            ...valuationDetails,
            [name]: parseFloat(value),
          });
        } else {
          console.log("ValueReminder", name, value.length);

          value = value.slice(0, 15);
          setValuationDetails({
            ...valuationDetails,
            [name]: parseFloat(value),
          });
        }
      }
    } else {
      if (
        name === "DPSTransactionAmount" &&
        name === "PrincipalAdjusted" &&
        name === "MarkupAdjusted" &&
        name === "Charges" &&
        name === "AcquiredValue" &&
        name === "AcquisitionCharges"
      ) {
        console.log(
          "businessDetailSection.NumberOfValuationsBusiness 27",
          name
        );

        setBusinessDetailSection({
          ...businessDetailSection,
          [name]: parseFloat(-1),
        });
      } else {
        console.log(
          "businessDetailSection.NumberOfValuationsBusiness 27",
          name
        );
        setBusinessDetailSection({
          ...businessDetailSection,
          [name]: parseFloat(-1),
        });
        setValuationDetails({
          ...valuationDetails,
          [name]: parseFloat(-1),
        });
      }
    }
  };

  const columnCustomerDetail = [
    {
      title: "Account Number",
      dataIndex: "AccountNumber",
      key: "AccountNumber",
      align: "center",
      width: "250px",
    },
    {
      title: "Branch Code",
      dataIndex: "BranchCode",
      key: "BranchCode",
      align: "center",
      width: "250px",
    },
    {
      title: "Branch Name",
      dataIndex: "BranchName",
      key: "BranchName",
      align: "center",
      width: "250px",
    },
    {
      title: "Region Code",
      dataIndex: "RegionCode",
      key: "RegionCode",
      align: "center",
      width: "250px",
    },
    {
      title: "Region Name",
      dataIndex: "RegionName",
      key: "RegionName",
      align: "center",
      width: "250px",
    },
    {
      title: "Type of Facility Description",
      dataIndex: "FacilityDescription",
      key: "FacilityDescription",
      align: "center",
      width: "250px",
    },
    {
      title: "Sundry Analysis Description",
      dataIndex: "SundryDescription",
      key: "SundryDescription",
      align: "center",
      width: "250px",
    },
  ];

  //Add Record button
  const AddAnotherValuation = async () => {
    console.log("AddAnotherValuation", valuationDetails);

    if (
      valuationDetails.EvaluatorName != "" &&
      valuationDetails.BuildingMarketValue != -1 &&
      valuationDetails.V != -1 &&
      valuationDetails.LandForcedSaleValue != -1 &&
      valuationDetails.BuildingForcedSaleValue != -1 &&
      valuationDetails.DateOfValuation != "" &&
      valuationDetails.DateOfValuation != "18000101"
    ) {
      setValuationTextFields(false);
      console.log(
        "AddAnotherValuation",
        businessDetailSection.PropertyEvaluatorBusinessList
      );
      let tem = [];
      let check = businessDetailSection.PropertyEvaluatorBusinessList;
      if (check.length > 0) {
        tem.push(...check, valuationDetails);

        let sortTotalMarketValue = tem.sort((a, b) => {
          return a.TotalMarketValue - b.TotalMarketValue;
        });

        let totaolfvalue1 = parseFloat(
          parseFloat(sortTotalMarketValue[0].TotalForcedSaleValue).toFixed(2)
        );
        let totaolfvalue2 = parseFloat(
          parseFloat(sortTotalMarketValue[1].TotalForcedSaleValue).toFixed(2)
        );
        let tF =
          parseFloat(parseFloat(totaolfvalue1).toFixed(2)) +
          parseFloat(parseFloat(totaolfvalue2).toFixed(2));
        let avgfvalue = parseFloat(parseFloat(tF).toFixed(2)) / 2;

        let totaolmvalue1 = parseFloat(
          parseFloat(sortTotalMarketValue[0].TotalMarketValue).toFixed(2)
        );
        let totaolmvalue2 = parseFloat(
          parseFloat(sortTotalMarketValue[1].TotalMarketValue).toFixed(2)
        );
        let tm =
          parseFloat(parseFloat(totaolmvalue1).toFixed(2)) +
          parseFloat(parseFloat(totaolmvalue2).toFixed(2));
        let avgmvalue = parseFloat(parseFloat(tm).toFixed(2)) / 2;
        await setBusinessDetailSection({
          ...businessDetailSection,
          ["PropertyEvaluatorBusinessList"]: tem,
          ["NumberOfValuationsBusiness"]: tem.length,
          ["AverageForcedSaleValueBusiness"]: parseFloat(
            parseFloat(avgfvalue).toFixed(2)
          ),
          ["AverageMarketValueBusiness"]: parseFloat(
            parseFloat(avgmvalue).toFixed(2)
          ),
        });
        if (tem.length > 1) {
          setCustomerField(false);
        } else {
          setCustomerField(true);
        }
        console.log("temcheck ", avgmvalue, avgfvalue);
      } else {
        tem = valuationDetails;
        let totaolfvalue = valuationDetails.TotalForcedSaleValue;
        let totaolmvalue = valuationDetails.TotalMarketValue;
        await setBusinessDetailSection({
          ...businessDetailSection,
          ["PropertyEvaluatorBusinessList"]: [tem],
          ["NumberOfValuationsBusiness"]: 1,
          ["AverageForcedSaleValueBusiness"]: parseFloat(
            parseFloat(totaolfvalue).toFixed(2)
          ),
          ["AverageMarketValueBusiness"]: parseFloat(
            parseFloat(totaolmvalue).toFixed(2)
          ),
        });
        setCustomerField(true);
      }
      console.log("valuationDetailsqwerty", typeof tem);

      setValuationDetails({
        ...valuationDetails,
        BuildingMarketValue: parseInt(-1),
        LandForcedSaleValue: parseInt(-1),
        LandMarketValue: parseInt(-1),
        BuildingForcedSaleValue: parseInt(-1),
        EvaluatorName: "",
        TotalForcedSaleValue: parseInt(-1),
        TotalMarketValue: parseInt(-1),
        DateOfValuation: "18000101",
      });
    } else {
      setValuationTextFields(true);
      setOpen({
        flag: true,
        message: "Enter Required Fields",
      });
    }
  };

  // for add another property
  const AddAnotherProperty = async () => {
    if (NBACasePropertyModelList.length > 0) {
      console.log("AddAnotherProperty check 1");
      if (customerAdjustmentField === true) {
        if (
          businessDetailSection.PropertyType != -1 &&
          businessDetailSection.PropertyAcquiredDetails != "" &&
          businessDetailSection.PrincipalAdjusted != -1 &&
          businessDetailSection.MarkupAdjusted != -1 &&
          businessDetailSection.Charges != -1 &&
          businessDetailSection.AcquiredValue != -1 &&
          businessDetailSection.AcquisitionCharges != -1 &&
          businessDetailSection.DateOfAcquisition != "18000101" &&
          businessDetailSection.DateOfAcquisition != "" &&
          businessDetailSection.DPSTransactionAmount != -1
        ) {
          console.log("AddAnotherProperty check 1");
          setBusinessTextFields(false);
          if (
            businessDetailSection.DPSTransactionAmount ===
            businessDetailSection.TotalAdjustmentPMC
          ) {
            // setValuationTextFields(true)
            if (customerField === true) {
              console.log(
                "AddAnotherProperty NBACasePropertyModelList",
                valuationDetails
              );
              if (
                valuationDetails.EvaluatorName != "" &&
                valuationDetails.BuildingMarketValue != -1 &&
                valuationDetails.LandMarketValue != -1 &&
                valuationDetails.LandForcedSaleValue != -1 &&
                valuationDetails.BuildingForcedSaleValue != -1 &&
                valuationDetails.DateOfValuation != "" &&
                valuationDetails.DateOfValuation != "18000101"
              ) {
                setValuationTextFields(false);
                setCustomerField(false);
                console.log(
                  "AddAnotherProperty valuationDetails",
                  valuationDetails
                );
                let tem1 = [];
                let check = businessDetailSection.PropertyEvaluatorBusinessList;
                if (check.length > 0) {
                  tem1.push(...check, valuationDetails);

                  let sortTotalMarketValue = tem1.sort((a, b) => {
                    return a.TotalMarketValue - b.TotalMarketValue;
                  });

                  let totaolfvalue1 = parseFloat(
                    parseFloat(
                      sortTotalMarketValue[0].TotalForcedSaleValue
                    ).toFixed(2)
                  );
                  let totaolfvalue2 = parseFloat(
                    parseFloat(
                      sortTotalMarketValue[1].TotalForcedSaleValue
                    ).toFixed(2)
                  );
                  let tF =
                    parseFloat(parseFloat(totaolfvalue1).toFixed(2)) +
                    parseFloat(parseFloat(totaolfvalue2).toFixed(2));
                  let avgfvalue = parseFloat(parseFloat(tF).toFixed(2)) / 2;

                  let totaolmvalue1 = parseFloat(
                    parseFloat(
                      sortTotalMarketValue[0].TotalMarketValue
                    ).toFixed(2)
                  );
                  let totaolmvalue2 = parseFloat(
                    parseFloat(
                      sortTotalMarketValue[1].TotalMarketValue
                    ).toFixed(2)
                  );
                  let tm =
                    parseFloat(parseFloat(totaolmvalue1).toFixed(2)) +
                    parseFloat(parseFloat(totaolmvalue2).toFixed(2));
                  let avgmvalue = parseFloat(parseFloat(tm).toFixed(2)) / 2;
                  let data = {
                    PropertyType: businessDetailSection.PropertyType,
                    PropertyAcquiredDetails:
                      businessDetailSection.PropertyAcquiredDetails,
                    PrincipalAdjusted: businessDetailSection.PrincipalAdjusted,
                    MarkupAdjusted: businessDetailSection.MarkupAdjusted,
                    Charges: businessDetailSection.Charges,
                    TotalAdjustmentPMC:
                      businessDetailSection.TotalAdjustmentPMC,
                    AcquiredValue: businessDetailSection.AcquiredValue,
                    AcquisitionCharges:
                      businessDetailSection.AcquisitionCharges,
                    DateOfAcquisition: businessDetailSection.DateOfAcquisition,
                    DPSTransactionAmount:
                      businessDetailSection.DPSTransactionAmount,
                    TotalValueDAA: businessDetailSection.TotalValueDAA,
                    NumberOfValuationsBusiness: tem1.length,
                    AverageForcedSaleValueBusiness: parseFloat(
                      parseFloat(avgfvalue).toFixed(2)
                    ),
                    AverageMarketValueBusiness: parseFloat(
                      parseFloat(avgmvalue).toFixed(2)
                    ),
                    PropertyEvaluatorBusinessList: tem1,
                  };
                  let check1 = data.PropertyEvaluatorBusinessList;
                  console.log("AddAnotherValuation  data", check1);
                  if (check1.length > 1) {
                    let tem = NBACasePropertyModelList;
                    await tem.push(data);
                    setNBACasePropertyModelList(tem);
                    setBusinessDetailSection({
                      PropertyType: -1,
                      PropertyAcquiredDetails: "",
                      PrincipalAdjusted: -1,
                      MarkupAdjusted: -1,
                      Charges: -1,
                      TotalAdjustmentPMC: -1,
                      AcquiredValue: -1,
                      AcquisitionCharges: -1,
                      DateOfAcquisition: "18000101",
                      DPSTransactionAmount: -1,
                      TotalValueDAA: -1,
                      NumberOfValuationsBusiness: -1,
                      AverageForcedSaleValueBusiness: -1,
                      AverageMarketValueBusiness: -1,
                      PropertyEvaluatorBusinessList: [],
                    });
                    setValuationDetails({
                      ...valuationDetails,
                      BuildingMarketValue: parseInt(-1),
                      LandForcedSaleValue: parseInt(-1),
                      LandMarketValue: parseInt(-1),
                      BuildingForcedSaleValue: parseInt(-1),
                      EvaluatorName: "",
                      DateOfValuation: "18000101",
                      TotalForcedSaleValue: parseInt(-1),
                      TotalMarketValue: parseInt(-1),
                    });
                    setCustomerField(false);
                    setCustomerAdjustmentField(false);
                    setPropertyTypeName("");
                  } else {
                    console.log("AddAnotherValuation  data", check1);
                    setOpen({
                      flag: true,
                      message: "Please enter at-least 2 valuations",
                    });
                  }
                  console.log("temcheck ", avgmvalue, avgfvalue);
                } else {
                  // tem = valuationDetails;
                  let totaolfvalue = valuationDetails.TotalForcedSaleValue;
                  let totaolmvalue = valuationDetails.TotalMarketValue;
                  tem1.push(valuationDetails);
                  let data = {
                    PropertyType: businessDetailSection.PropertyType,
                    PropertyAcquiredDetails:
                      businessDetailSection.PropertyAcquiredDetails,
                    PrincipalAdjusted: businessDetailSection.PrincipalAdjusted,
                    MarkupAdjusted: businessDetailSection.MarkupAdjusted,
                    Charges: businessDetailSection.Charges,
                    TotalAdjustmentPMC:
                      businessDetailSection.TotalAdjustmentPMC,
                    AcquiredValue: businessDetailSection.AcquiredValue,
                    AcquisitionCharges:
                      businessDetailSection.AcquisitionCharges,
                    DateOfAcquisition: businessDetailSection.DateOfAcquisition,
                    DPSTransactionAmount:
                      businessDetailSection.DPSTransactionAmount,
                    TotalValueDAA: businessDetailSection.TotalValueDAA,
                    NumberOfValuationsBusiness: 1,
                    AverageForcedSaleValueBusiness: parseFloat(
                      parseFloat(totaolfvalue).toFixed(2)
                    ),
                    AverageMarketValueBusiness: parseFloat(
                      parseFloat(totaolmvalue).toFixed(2)
                    ),
                    PropertyEvaluatorBusinessList: tem1,
                  };
                  let check1 = data.PropertyEvaluatorBusinessList;
                  if (check1.length > 1) {
                    console.log("AddAnotherValuation  data", check1);
                    let tem = NBACasePropertyModelList;
                    await tem.push(data);
                    setNBACasePropertyModelList(tem);
                    setBusinessDetailSection({
                      PropertyType: -1,
                      PropertyAcquiredDetails: "",
                      PrincipalAdjusted: -1,
                      MarkupAdjusted: -1,
                      Charges: -1,
                      TotalAdjustmentPMC: -1,
                      AcquiredValue: -1,
                      AcquisitionCharges: -1,
                      DateOfAcquisition: "18000101",
                      DPSTransactionAmount: -1,
                      TotalValueDAA: -1,
                      NumberOfValuationsBusiness: -1,
                      AverageForcedSaleValueBusiness: -1,
                      AverageMarketValueBusiness: -1,
                      PropertyEvaluatorBusinessList: [],
                    });
                    setValuationDetails({
                      BuildingMarketValue: parseInt(-1),
                      LandForcedSaleValue: parseInt(-1),
                      LandMarketValue: parseInt(-1),
                      BuildingForcedSaleValue: parseInt(-1),
                      EvaluatorName: "",
                      DateOfValuation: "18000101",
                      TotalForcedSaleValue: parseInt(-1),
                      TotalMarketValue: parseInt(-1),
                    });
                    setCustomerField(false);
                    setCustomerAdjustmentField(false);
                    setPropertyTypeName("");
                  } else {
                    console.log("AddAnotherValuation  data", check1);
                    setOpen({
                      flag: true,
                      message: "Please enter at-least 2 valuations",
                    });
                  }
                }
              } else {
                console.log("AddAnotherProperty  Enter");
                setValuationTextFields(true);
                setOpen({
                  flag: true,
                  message: "Enter Required Fields",
                });
              }
            } else {
              let check1 = businessDetailSection.PropertyEvaluatorBusinessList;
              if (check1.length > 1) {
                console.log("AddAnotherValuation  data", check1);
                let data = NBACasePropertyModelList;
                data.push(businessDetailSection);
                setNBACasePropertyModelList(data);
                setBusinessDetailSection({
                  PropertyType: -1,
                  PropertyAcquiredDetails: "",
                  PrincipalAdjusted: -1,
                  MarkupAdjusted: -1,
                  Charges: -1,
                  TotalAdjustmentPMC: -1,
                  AcquiredValue: -1,
                  AcquisitionCharges: -1,
                  DateOfAcquisition: "18000101",
                  DPSTransactionAmount: -1,
                  TotalValueDAA: -1,
                  NumberOfValuationsBusiness: -1,
                  AverageForcedSaleValueBusiness: -1,
                  AverageMarketValueBusiness: -1,
                  PropertyEvaluatorBusinessList: [],
                });
                setValuationDetails({
                  ...valuationDetails,
                  BuildingMarketValue: parseInt(-1),
                  LandForcedSaleValue: parseInt(-1),
                  LandMarketValue: parseInt(-1),
                  BuildingForcedSaleValue: parseInt(-1),
                  EvaluatorName: "",
                  DateOfValuation: "18000101",
                  TotalForcedSaleValue: parseInt(-1),
                  TotalMarketValue: parseInt(-1),
                });
                setValuationTextFields(false);
                setBusinessTextFields(false);
                setCustomerField(false);
                setCustomerAdjustmentField(false);
                setPropertyTypeName("");
              } else {
                setValuationTextFields(true);
                console.log("AddAnotherValuation  data", check1);
                setOpen({
                  flag: true,
                  message: "Please enter at-least 2 valuations",
                });
              }
            }
          } else {
            setOpen({
              flag: true,
              message:
                "Total Adjustment Amount should be equal to DPS Transaction Amount",
            });
          }
        } else {
          setBusinessTextFields(true);
          if (customerField === true) {
            if (
              valuationDetails.EvaluatorName != "" &&
              valuationDetails.BuildingMarketValue != -1 &&
              valuationDetails.LandMarketValue != -1 &&
              valuationDetails.LandForcedSaleValue != -1 &&
              valuationDetails.BuildingForcedSaleValue != -1 &&
              valuationDetails.DateOfValuation != "" &&
              valuationDetails.DateOfValuation != "18000101"
            ) {
              setValuationTextFields(false);
            } else {
              setValuationTextFields(true);
            }
          } else {
            setValuationTextFields(false);
          }
          setOpen({
            flag: true,
            message: "Enter Required Fields",
          });
        }
      } else {
        if (customerField === true) {
          console.log(
            "AddAnotherProperty NBACasePropertyModelList",
            valuationDetails
          );
          if (
            valuationDetails.EvaluatorName != "" &&
            valuationDetails.BuildingMarketValue != -1 &&
            valuationDetails.LandMarketValue != -1 &&
            valuationDetails.LandForcedSaleValue != -1 &&
            valuationDetails.BuildingForcedSaleValue != -1 &&
            valuationDetails.DateOfValuation != "" &&
            valuationDetails.DateOfValuation != "18000101"
          ) {
            setValuationTextFields(false);
            setCustomerField(false);
            console.log(
              "AddAnotherProperty valuationDetails",
              valuationDetails
            );
            let tem1 = [];
            let check = businessDetailSection.PropertyEvaluatorBusinessList;
            if (
              businessDetailSection.DPSTransactionAmount ===
              businessDetailSection.TotalAdjustmentPMC
            ) {
              setBusinessTextFields(false);
              setValuationTextFields(false);
              if (check.length > 0) {
                tem1.push(...check, valuationDetails);

                let sortTotalMarketValue = tem1.sort((a, b) => {
                  return a.TotalMarketValue - b.TotalMarketValue;
                });

                let totaolfvalue1 = parseFloat(
                  parseFloat(
                    sortTotalMarketValue[0].TotalForcedSaleValue
                  ).toFixed(2)
                );
                let totaolfvalue2 = parseFloat(
                  parseFloat(
                    sortTotalMarketValue[1].TotalForcedSaleValue
                  ).toFixed(2)
                );
                let tF =
                  parseFloat(parseFloat(totaolfvalue1).toFixed(2)) +
                  parseFloat(parseFloat(totaolfvalue2).toFixed(2));
                let avgfvalue = parseFloat(parseFloat(tF).toFixed(2)) / 2;

                let totaolmvalue1 = parseFloat(
                  parseFloat(sortTotalMarketValue[0].TotalMarketValue).toFixed(
                    2
                  )
                );
                let totaolmvalue2 = parseFloat(
                  parseFloat(sortTotalMarketValue[1].TotalMarketValue).toFixed(
                    2
                  )
                );
                let tm =
                  parseFloat(parseFloat(totaolmvalue1).toFixed(2)) +
                  parseFloat(parseFloat(totaolmvalue2).toFixed(2));
                let avgmvalue = parseFloat(parseFloat(tm).toFixed(2)) / 2;
                let data = {
                  PropertyType: businessDetailSection.PropertyType,
                  PropertyAcquiredDetails:
                    businessDetailSection.PropertyAcquiredDetails,
                  PrincipalAdjusted: businessDetailSection.PrincipalAdjusted,
                  MarkupAdjusted: businessDetailSection.MarkupAdjusted,
                  Charges: businessDetailSection.Charges,
                  TotalAdjustmentPMC: businessDetailSection.TotalAdjustmentPMC,
                  AcquiredValue: businessDetailSection.AcquiredValue,
                  AcquisitionCharges: businessDetailSection.AcquisitionCharges,
                  DateOfAcquisition: businessDetailSection.DateOfAcquisition,
                  DPSTransactionAmount:
                    businessDetailSection.DPSTransactionAmount,
                  TotalValueDAA: businessDetailSection.TotalValueDAA,
                  NumberOfValuationsBusiness: tem1.length,
                  AverageForcedSaleValueBusiness: parseFloat(
                    parseFloat(avgfvalue).toFixed(2)
                  ),
                  AverageMarketValueBusiness: parseFloat(
                    parseFloat(avgmvalue).toFixed(2)
                  ),
                  PropertyEvaluatorBusinessList: tem1,
                };
                let check1 = data.PropertyEvaluatorBusinessList;
                console.log("AddAnotherValuation  data", check1);
                if (check1.length > 1) {
                  let tem = NBACasePropertyModelList;
                  await tem.push(data);
                  setNBACasePropertyModelList(tem);
                  setBusinessDetailSection({
                    PropertyType: -1,
                    PropertyAcquiredDetails: "",
                    PrincipalAdjusted: -1,
                    MarkupAdjusted: -1,
                    Charges: -1,
                    TotalAdjustmentPMC: -1,
                    AcquiredValue: -1,
                    AcquisitionCharges: -1,
                    DateOfAcquisition: "18000101",
                    DPSTransactionAmount: -1,
                    TotalValueDAA: -1,
                    NumberOfValuationsBusiness: -1,
                    AverageForcedSaleValueBusiness: -1,
                    AverageMarketValueBusiness: -1,
                    PropertyEvaluatorBusinessList: [],
                  });
                  setValuationDetails({
                    ...valuationDetails,
                    BuildingMarketValue: parseInt(-1),
                    LandForcedSaleValue: parseInt(-1),
                    LandMarketValue: parseInt(-1),
                    BuildingForcedSaleValue: parseInt(-1),
                    EvaluatorName: "",
                    DateOfValuation: "18000101",
                    TotalForcedSaleValue: parseInt(-1),
                    TotalMarketValue: parseInt(-1),
                  });
                  setCustomerField(false);
                  setCustomerAdjustmentField(false);
                  setPropertyTypeName("");
                } else {
                  console.log("AddAnotherValuation  data", check1);
                  setOpen({
                    flag: true,
                    message: "Please enter at-least 2 valuations",
                  });
                }
                console.log("temcheck ", avgmvalue, avgfvalue);
              } else {
                setBusinessTextFields(false);
                setValuationTextFields(false);
                // tem = valuationDetails;
                let totaolfvalue = valuationDetails.TotalForcedSaleValue;
                let totaolmvalue = valuationDetails.TotalMarketValue;
                tem1.push(valuationDetails);
                let data = {
                  PropertyType: businessDetailSection.PropertyType,
                  PropertyAcquiredDetails:
                    businessDetailSection.PropertyAcquiredDetails,
                  PrincipalAdjusted: businessDetailSection.PrincipalAdjusted,
                  MarkupAdjusted: businessDetailSection.MarkupAdjusted,
                  Charges: businessDetailSection.Charges,
                  TotalAdjustmentPMC: businessDetailSection.TotalAdjustmentPMC,
                  AcquiredValue: businessDetailSection.AcquiredValue,
                  AcquisitionCharges: businessDetailSection.AcquisitionCharges,
                  DateOfAcquisition: businessDetailSection.DateOfAcquisition,
                  DPSTransactionAmount:
                    businessDetailSection.DPSTransactionAmount,
                  TotalValueDAA: businessDetailSection.TotalValueDAA,
                  NumberOfValuationsBusiness: 1,
                  AverageForcedSaleValueBusiness: parseFloat(
                    parseFloat(totaolfvalue).toFixed(2)
                  ),
                  AverageMarketValueBusiness: parseFloat(
                    parseFloat(totaolmvalue).toFixed(2)
                  ),
                  PropertyEvaluatorBusinessList: tem1,
                };
                let check1 = data.PropertyEvaluatorBusinessList;
                if (check1.length > 1) {
                  console.log("AddAnotherValuation  data", check1);
                  let tem = NBACasePropertyModelList;
                  await tem.push(data);
                  setNBACasePropertyModelList(tem);
                  setBusinessDetailSection({
                    PropertyType: -1,
                    PropertyAcquiredDetails: "",
                    PrincipalAdjusted: -1,
                    MarkupAdjusted: -1,
                    Charges: -1,
                    TotalAdjustmentPMC: -1,
                    AcquiredValue: -1,
                    AcquisitionCharges: -1,
                    DateOfAcquisition: "18000101",
                    DPSTransactionAmount: -1,
                    TotalValueDAA: -1,
                    NumberOfValuationsBusiness: -1,
                    AverageForcedSaleValueBusiness: -1,
                    AverageMarketValueBusiness: -1,
                    PropertyEvaluatorBusinessList: [],
                  });
                  setValuationDetails({
                    BuildingMarketValue: parseInt(-1),
                    LandForcedSaleValue: parseInt(-1),
                    LandMarketValue: parseInt(-1),
                    BuildingForcedSaleValue: parseInt(-1),
                    EvaluatorName: "",
                    DateOfValuation: "18000101",
                    TotalForcedSaleValue: parseInt(-1),
                    TotalMarketValue: parseInt(-1),
                  });
                  setCustomerField(false);
                  setCustomerAdjustmentField(false);
                  setPropertyTypeName("");
                } else {
                  console.log("AddAnotherValuation  data", check1);
                  setValuationTextFields(true);
                  setOpen({
                    flag: true,
                    message: "Please enter at-least 2 valuations",
                  });
                }
              }
            } else {
              // setBusinessTextFields(true);
              setOpen({
                flag: true,
                message:
                  "Total Adjustment Amount should be equal to DPS Transaction Amount",
              });
            }
          } else {
            console.log("AddAnotherProperty Enter");
            setValuationTextFields(true);
            setOpen({
              flag: true,
              message: "Enter Required Fields",
            });
          }
        } else {
          if (
            businessDetailSection.DPSTransactionAmount ===
            businessDetailSection.TotalAdjustmentPMC
          ) {
            setBusinessTextFields(false);
            setValuationTextFields(false);
            let check1 = businessDetailSection.PropertyEvaluatorBusinessList;
            if (check1.length > 1) {
              console.log("AddAnotherValuation  data", check1);
              let data = NBACasePropertyModelList;
              data.push(businessDetailSection);
              setNBACasePropertyModelList(data);
              setBusinessDetailSection({
                PropertyType: -1,
                PropertyAcquiredDetails: "",
                PrincipalAdjusted: -1,
                MarkupAdjusted: -1,
                Charges: -1,
                TotalAdjustmentPMC: -1,
                AcquiredValue: -1,
                AcquisitionCharges: -1,
                DateOfAcquisition: "18000101",
                DPSTransactionAmount: -1,
                TotalValueDAA: -1,
                NumberOfValuationsBusiness: -1,
                AverageForcedSaleValueBusiness: -1,
                AverageMarketValueBusiness: -1,
                PropertyEvaluatorBusinessList: [],
              });
              setValuationDetails({
                ...valuationDetails,
                BuildingMarketValue: parseInt(-1),
                LandForcedSaleValue: parseInt(-1),
                LandMarketValue: parseInt(-1),
                BuildingForcedSaleValue: parseInt(-1),
                EvaluatorName: "",
                DateOfValuation: "18000101",
                TotalForcedSaleValue: parseInt(-1),
                TotalMarketValue: parseInt(-1),
              });
              setCustomerField(false);
              setCustomerAdjustmentField(false);
              setPropertyTypeName("");
            } else {
              console.log("AddAnotherValuation  data", check1);
              setValuationTextFields(true);
              setOpen({
                flag: true,
                message: "Please enter at-least 2 valuations",
              });
            }
          } else {
            setOpen({
              flag: true,
              message:
                "Total Adjustment Amount should be equal to DPS Transaction Amount",
            });
          }
        }
      }
    } else {
      console.log("AddAnotherProperty check 2");
      if (customerAdjustmentField === true) {
        if (
          businessDetailSection.PropertyType != -1 &&
          businessDetailSection.PropertyAcquiredDetails != "" &&
          businessDetailSection.PrincipalAdjusted != -1 &&
          businessDetailSection.MarkupAdjusted != -1 &&
          businessDetailSection.Charges != -1 &&
          businessDetailSection.AcquiredValue != -1 &&
          businessDetailSection.AcquisitionCharges != -1 &&
          businessDetailSection.DateOfAcquisition != "18000101" &&
          businessDetailSection.DateOfAcquisition != "" &&
          businessDetailSection.DPSTransactionAmount != -1
        ) {
          setBusinessTextFields(false);
          console.log("AddAnotherProperty check 2.1.1");
          if (
            businessDetailSection.DPSTransactionAmount ===
            businessDetailSection.TotalAdjustmentPMC
          ) {
            if (customerField === true) {
              console.log(
                "AddAnotherProperty NBACasePropertyModelList",
                valuationDetails
              );
              if (
                valuationDetails.EvaluatorName != "" &&
                valuationDetails.BuildingMarketValue != -1 &&
                valuationDetails.LandMarketValue != -1 &&
                valuationDetails.LandForcedSaleValue != -1 &&
                valuationDetails.BuildingForcedSaleValue != -1 &&
                valuationDetails.DateOfValuation != "" &&
                valuationDetails.DateOfValuation != "18000101"
              ) {
                setValuationTextFields(false);
                setCustomerField(false);
                console.log(
                  "AddAnotherProperty valuationDetails",
                  valuationDetails
                );
                let tem1 = [];
                let check = businessDetailSection.PropertyEvaluatorBusinessList;
                if (check.length > 0) {
                  tem1.push(...check, valuationDetails);

                  let sortTotalMarketValue = tem1.sort((a, b) => {
                    return a.TotalMarketValue - b.TotalMarketValue;
                  });

                  let totaolfvalue1 = parseFloat(
                    parseFloat(
                      sortTotalMarketValue[0].TotalForcedSaleValue
                    ).toFixed(2)
                  );
                  let totaolfvalue2 = parseFloat(
                    parseFloat(
                      sortTotalMarketValue[1].TotalForcedSaleValue
                    ).toFixed(2)
                  );
                  let tF =
                    parseFloat(parseFloat(totaolfvalue1).toFixed(2)) +
                    parseFloat(parseFloat(totaolfvalue2).toFixed(2));
                  let avgfvalue = parseFloat(parseFloat(tF).toFixed(2)) / 2;

                  let totaolmvalue1 = parseFloat(
                    parseFloat(
                      sortTotalMarketValue[0].TotalMarketValue
                    ).toFixed(2)
                  );
                  let totaolmvalue2 = parseFloat(
                    parseFloat(
                      sortTotalMarketValue[1].TotalMarketValue
                    ).toFixed(2)
                  );
                  let tm =
                    parseFloat(parseFloat(totaolmvalue1).toFixed(2)) +
                    parseFloat(parseFloat(totaolmvalue2).toFixed(2));
                  let avgmvalue = parseFloat(parseFloat(tm).toFixed(2)) / 2;
                  let data = {
                    PropertyType: businessDetailSection.PropertyType,
                    PropertyAcquiredDetails:
                      businessDetailSection.PropertyAcquiredDetails,
                    PrincipalAdjusted: businessDetailSection.PrincipalAdjusted,
                    MarkupAdjusted: businessDetailSection.MarkupAdjusted,
                    Charges: businessDetailSection.Charges,
                    TotalAdjustmentPMC:
                      businessDetailSection.TotalAdjustmentPMC,
                    AcquiredValue: businessDetailSection.AcquiredValue,
                    AcquisitionCharges:
                      businessDetailSection.AcquisitionCharges,
                    DateOfAcquisition: businessDetailSection.DateOfAcquisition,
                    DPSTransactionAmount:
                      businessDetailSection.DPSTransactionAmount,
                    TotalValueDAA: businessDetailSection.TotalValueDAA,
                    NumberOfValuationsBusiness: tem1.length,
                    AverageForcedSaleValueBusiness: parseFloat(
                      parseFloat(avgfvalue).toFixed(2)
                    ),
                    AverageMarketValueBusiness: parseFloat(
                      parseFloat(avgmvalue).toFixed(2)
                    ),
                    PropertyEvaluatorBusinessList: tem1,
                  };
                  let check1 = data.PropertyEvaluatorBusinessList;
                  console.log("AddAnotherValuation  data", check1);
                  if (check1.length > 1) {
                    let tem = NBACasePropertyModelList;
                    await tem.push(data);
                    setNBACasePropertyModelList(tem);
                    setBusinessDetailSection({
                      PropertyType: -1,
                      PropertyAcquiredDetails: "",
                      PrincipalAdjusted: -1,
                      MarkupAdjusted: -1,
                      Charges: -1,
                      TotalAdjustmentPMC: -1,
                      AcquiredValue: -1,
                      AcquisitionCharges: -1,
                      DateOfAcquisition: "18000101",
                      DPSTransactionAmount: -1,
                      TotalValueDAA: -1,
                      NumberOfValuationsBusiness: -1,
                      AverageForcedSaleValueBusiness: -1,
                      AverageMarketValueBusiness: -1,
                      PropertyEvaluatorBusinessList: [],
                    });
                    setValuationDetails({
                      ...valuationDetails,
                      BuildingMarketValue: parseInt(-1),
                      LandForcedSaleValue: parseInt(-1),
                      LandMarketValue: parseInt(-1),
                      BuildingForcedSaleValue: parseInt(-1),
                      EvaluatorName: "",
                      DateOfValuation: "18000101",
                      TotalForcedSaleValue: parseInt(-1),
                      TotalMarketValue: parseInt(-1),
                    });
                    setCustomerField(false);
                    setCustomerAdjustmentField(false);
                    setPropertyTypeName("");
                  } else {
                    console.log("AddAnotherValuation  data", check1);
                    setOpen({
                      flag: true,
                      message: "Please enter at-least 2 valuations",
                    });
                  }
                  console.log("temcheck ", avgmvalue, avgfvalue);
                } else {
                  // tem = valuationDetails;
                  let totaolfvalue = valuationDetails.TotalForcedSaleValue;
                  let totaolmvalue = valuationDetails.TotalMarketValue;
                  tem1.push(valuationDetails);
                  let data = {
                    PropertyType: businessDetailSection.PropertyType,
                    PropertyAcquiredDetails:
                      businessDetailSection.PropertyAcquiredDetails,
                    PrincipalAdjusted: businessDetailSection.PrincipalAdjusted,
                    MarkupAdjusted: businessDetailSection.MarkupAdjusted,
                    Charges: businessDetailSection.Charges,
                    TotalAdjustmentPMC:
                      businessDetailSection.TotalAdjustmentPMC,
                    AcquiredValue: businessDetailSection.AcquiredValue,
                    AcquisitionCharges:
                      businessDetailSection.AcquisitionCharges,
                    DateOfAcquisition: businessDetailSection.DateOfAcquisition,
                    DPSTransactionAmount:
                      businessDetailSection.DPSTransactionAmount,
                    TotalValueDAA: businessDetailSection.TotalValueDAA,
                    NumberOfValuationsBusiness: 1,
                    AverageForcedSaleValueBusiness: parseFloat(
                      parseFloat(totaolfvalue).toFixed(2)
                    ),
                    AverageMarketValueBusiness: parseFloat(
                      parseFloat(totaolmvalue).toFixed(2)
                    ),
                    PropertyEvaluatorBusinessList: tem1,
                  };
                  let check1 = data.PropertyEvaluatorBusinessList;
                  if (check1.length > 1) {
                    console.log("AddAnotherValuation  data", check1);
                    let tem = NBACasePropertyModelList;
                    await tem.push(data);
                    setNBACasePropertyModelList(tem);
                    setBusinessDetailSection({
                      PropertyType: -1,
                      PropertyAcquiredDetails: "",
                      PrincipalAdjusted: -1,
                      MarkupAdjusted: -1,
                      Charges: -1,
                      TotalAdjustmentPMC: -1,
                      AcquiredValue: -1,
                      AcquisitionCharges: -1,
                      DateOfAcquisition: "18000101",
                      DPSTransactionAmount: -1,
                      TotalValueDAA: -1,
                      NumberOfValuationsBusiness: -1,
                      AverageForcedSaleValueBusiness: -1,
                      AverageMarketValueBusiness: -1,
                      PropertyEvaluatorBusinessList: [],
                    });
                    setValuationDetails({
                      BuildingMarketValue: parseInt(-1),
                      LandForcedSaleValue: parseInt(-1),
                      LandMarketValue: parseInt(-1),
                      BuildingForcedSaleValue: parseInt(-1),
                      EvaluatorName: "",
                      DateOfValuation: "18000101",
                      TotalForcedSaleValue: parseInt(-1),
                      TotalMarketValue: parseInt(-1),
                    });
                    setCustomerField(false);
                    setCustomerAdjustmentField(false);
                    setPropertyTypeName("");
                  } else {
                    console.log("AddAnotherValuation  data", check1);
                    setOpen({
                      flag: true,
                      message: "Please enter at-least 2 valuations",
                    });
                  }
                }
              } else {
                console.log("AddAnotherProperty  Enter");
                setValuationTextFields(true);
                setOpen({
                  flag: true,
                  message: "Enter Required Fields",
                });
              }
            } else {
              setBusinessTextFields(false);
              setValuationTextFields(false);

              let check1 = businessDetailSection.PropertyEvaluatorBusinessList;
              if (check1.length > 1) {
                console.log("AddAnotherValuation  data", check1);
                let data = NBACasePropertyModelList;
                data.push(businessDetailSection);
                setNBACasePropertyModelList(data);
                setBusinessDetailSection({
                  PropertyType: -1,
                  PropertyAcquiredDetails: "",
                  PrincipalAdjusted: -1,
                  MarkupAdjusted: -1,
                  Charges: -1,
                  TotalAdjustmentPMC: -1,
                  AcquiredValue: -1,
                  AcquisitionCharges: -1,
                  DateOfAcquisition: "18000101",
                  DPSTransactionAmount: -1,
                  TotalValueDAA: -1,
                  NumberOfValuationsBusiness: -1,
                  AverageForcedSaleValueBusiness: -1,
                  AverageMarketValueBusiness: -1,
                  PropertyEvaluatorBusinessList: [],
                });
                setValuationDetails({
                  ...valuationDetails,
                  BuildingMarketValue: parseInt(-1),
                  LandForcedSaleValue: parseInt(-1),
                  LandMarketValue: parseInt(-1),
                  BuildingForcedSaleValue: parseInt(-1),
                  EvaluatorName: "",
                  DateOfValuation: "18000101",
                  TotalForcedSaleValue: parseInt(-1),
                  TotalMarketValue: parseInt(-1),
                });
                setCustomerField(false);
                setCustomerAdjustmentField(false);
                setPropertyTypeName("");
              } else {
                console.log("AddAnotherValuation  data", check1);
                setValuationTextFields(true);
                setOpen({
                  flag: true,
                  message: "Please enter at-least 2 valuations",
                });
              }
            }
          } else {
            setOpen({
              flag: true,
              message:
                "Total Adjustment Amount should be equal to DPS Transaction Amount",
            });
          }
        } else {
          setBusinessTextFields(true);
          if (customerField === true) {
            if (
              valuationDetails.EvaluatorName != "" &&
              valuationDetails.BuildingMarketValue != -1 &&
              valuationDetails.LandMarketValue != -1 &&
              valuationDetails.LandForcedSaleValue != -1 &&
              valuationDetails.BuildingForcedSaleValue != -1 &&
              valuationDetails.DateOfValuation != "" &&
              valuationDetails.DateOfValuation != "18000101"
            ) {
              setValuationTextFields(false);
            } else {
              setValuationTextFields(true);
            }
          } else {
            setValuationTextFields(false);
          }
          console.log("AddAnotherProperty check 2.1.2");
          setOpen({
            flag: true,
            message: "Enter Required Fields",
          });
        }
      } else {
        console.log("AddAnotherProperty check 2.2");
        if (customerField === true) {
          console.log(
            "AddAnotherProperty NBACasePropertyModelList",
            valuationDetails
          );
          if (
            valuationDetails.EvaluatorName != "" &&
            valuationDetails.BuildingMarketValue != -1 &&
            valuationDetails.LandMarketValue != -1 &&
            valuationDetails.LandForcedSaleValue != -1 &&
            valuationDetails.BuildingForcedSaleValue != -1 &&
            valuationDetails.DateOfValuation != "" &&
            valuationDetails.DateOfValuation != "18000101"
          ) {
            setBusinessTextFields(false);
            setValuationTextFields(false);
            setCustomerField(false);
            console.log(
              "AddAnotherProperty valuationDetails",
              valuationDetails
            );
            let tem1 = [];
            let check = businessDetailSection.PropertyEvaluatorBusinessList;
            if (
              businessDetailSection.DPSTransactionAmount ===
              businessDetailSection.TotalAdjustmentPMC
            ) {
              if (check.length > 0) {
                tem1.push(...check, valuationDetails);

                let sortTotalMarketValue = tem1.sort((a, b) => {
                  return a.TotalMarketValue - b.TotalMarketValue;
                });

                let totaolfvalue1 = parseFloat(
                  parseFloat(
                    sortTotalMarketValue[0].TotalForcedSaleValue
                  ).toFixed(2)
                );
                let totaolfvalue2 = parseFloat(
                  parseFloat(
                    sortTotalMarketValue[1].TotalForcedSaleValue
                  ).toFixed(2)
                );
                let tF =
                  parseFloat(parseFloat(totaolfvalue1).toFixed(2)) +
                  parseFloat(parseFloat(totaolfvalue2).toFixed(2));
                let avgfvalue = parseFloat(parseFloat(tF).toFixed(2)) / 2;

                let totaolmvalue1 = parseFloat(
                  parseFloat(sortTotalMarketValue[0].TotalMarketValue).toFixed(
                    2
                  )
                );
                let totaolmvalue2 = parseFloat(
                  parseFloat(sortTotalMarketValue[1].TotalMarketValue).toFixed(
                    2
                  )
                );
                let tm =
                  parseFloat(parseFloat(totaolmvalue1).toFixed(2)) +
                  parseFloat(parseFloat(totaolmvalue2).toFixed(2));
                let avgmvalue = parseFloat(parseFloat(tm).toFixed(2)) / 2;
                let data = {
                  PropertyType: businessDetailSection.PropertyType,
                  PropertyAcquiredDetails:
                    businessDetailSection.PropertyAcquiredDetails,
                  PrincipalAdjusted: businessDetailSection.PrincipalAdjusted,
                  MarkupAdjusted: businessDetailSection.MarkupAdjusted,
                  Charges: businessDetailSection.Charges,
                  TotalAdjustmentPMC: businessDetailSection.TotalAdjustmentPMC,
                  AcquiredValue: businessDetailSection.AcquiredValue,
                  AcquisitionCharges: businessDetailSection.AcquisitionCharges,
                  DateOfAcquisition: businessDetailSection.DateOfAcquisition,
                  DPSTransactionAmount:
                    businessDetailSection.DPSTransactionAmount,
                  TotalValueDAA: businessDetailSection.TotalValueDAA,
                  NumberOfValuationsBusiness: tem1.length,
                  AverageForcedSaleValueBusiness: parseFloat(
                    parseFloat(avgfvalue).toFixed(2)
                  ),
                  AverageMarketValueBusiness: parseFloat(
                    parseFloat(avgmvalue).toFixed(2)
                  ),
                  PropertyEvaluatorBusinessList: tem1,
                };
                let check1 = data.PropertyEvaluatorBusinessList;
                console.log("AddAnotherValuation  data", check1);
                if (check1.length > 1) {
                  let tem = NBACasePropertyModelList;
                  await tem.push(data);
                  setNBACasePropertyModelList(tem);
                  setBusinessDetailSection({
                    PropertyType: -1,
                    PropertyAcquiredDetails: "",
                    PrincipalAdjusted: -1,
                    MarkupAdjusted: -1,
                    Charges: -1,
                    TotalAdjustmentPMC: -1,
                    AcquiredValue: -1,
                    AcquisitionCharges: -1,
                    DateOfAcquisition: "18000101",
                    DPSTransactionAmount: -1,
                    TotalValueDAA: -1,
                    NumberOfValuationsBusiness: -1,
                    AverageForcedSaleValueBusiness: -1,
                    AverageMarketValueBusiness: -1,
                    PropertyEvaluatorBusinessList: [],
                  });
                  setValuationDetails({
                    ...valuationDetails,
                    BuildingMarketValue: parseInt(-1),
                    LandForcedSaleValue: parseInt(-1),
                    LandMarketValue: parseInt(-1),
                    BuildingForcedSaleValue: parseInt(-1),
                    EvaluatorName: "",
                    DateOfValuation: "18000101",
                    TotalForcedSaleValue: parseInt(-1),
                    TotalMarketValue: parseInt(-1),
                  });
                  setCustomerField(false);
                  setCustomerAdjustmentField(false);
                  setPropertyTypeName("");
                } else {
                  console.log("AddAnotherValuation  data", check1);
                  setOpen({
                    flag: true,
                    message: "Please enter at-least 2 valuations",
                  });
                }
                console.log("temcheck ", avgmvalue, avgfvalue);
              } else {
                // tem = valuationDetails;
                let totaolfvalue = valuationDetails.TotalForcedSaleValue;
                let totaolmvalue = valuationDetails.TotalMarketValue;
                tem1.push(valuationDetails);
                let data = {
                  PropertyType: businessDetailSection.PropertyType,
                  PropertyAcquiredDetails:
                    businessDetailSection.PropertyAcquiredDetails,
                  PrincipalAdjusted: businessDetailSection.PrincipalAdjusted,
                  MarkupAdjusted: businessDetailSection.MarkupAdjusted,
                  Charges: businessDetailSection.Charges,
                  TotalAdjustmentPMC: businessDetailSection.TotalAdjustmentPMC,
                  AcquiredValue: businessDetailSection.AcquiredValue,
                  AcquisitionCharges: businessDetailSection.AcquisitionCharges,
                  DateOfAcquisition: businessDetailSection.DateOfAcquisition,
                  DPSTransactionAmount:
                    businessDetailSection.DPSTransactionAmount,
                  TotalValueDAA: businessDetailSection.TotalValueDAA,
                  NumberOfValuationsBusiness: 1,
                  AverageForcedSaleValueBusiness: parseFloat(
                    parseFloat(totaolfvalue).toFixed(2)
                  ),
                  AverageMarketValueBusiness: parseFloat(
                    parseFloat(totaolmvalue).toFixed(2)
                  ),
                  PropertyEvaluatorBusinessList: tem1,
                };
                let check1 = data.PropertyEvaluatorBusinessList;
                if (check1.length > 1) {
                  console.log("AddAnotherValuation  data", check1);
                  let tem = NBACasePropertyModelList;
                  await tem.push(data);
                  setNBACasePropertyModelList(tem);
                  setBusinessDetailSection({
                    PropertyType: -1,
                    PropertyAcquiredDetails: "",
                    PrincipalAdjusted: -1,
                    MarkupAdjusted: -1,
                    Charges: -1,
                    TotalAdjustmentPMC: -1,
                    AcquiredValue: -1,
                    AcquisitionCharges: -1,
                    DateOfAcquisition: "18000101",
                    DPSTransactionAmount: -1,
                    TotalValueDAA: -1,
                    NumberOfValuationsBusiness: -1,
                    AverageForcedSaleValueBusiness: -1,
                    AverageMarketValueBusiness: -1,
                    PropertyEvaluatorBusinessList: [],
                  });
                  setValuationDetails({
                    BuildingMarketValue: parseInt(-1),
                    LandForcedSaleValue: parseInt(-1),
                    LandMarketValue: parseInt(-1),
                    BuildingForcedSaleValue: parseInt(-1),
                    EvaluatorName: "",
                    DateOfValuation: "18000101",
                    TotalForcedSaleValue: parseInt(-1),
                    TotalMarketValue: parseInt(-1),
                  });
                  setCustomerField(false);
                  setCustomerAdjustmentField(false);
                  setPropertyTypeName("");
                } else {
                  console.log("AddAnotherValuation  data", check1);
                  setOpen({
                    flag: true,
                    message: "Please enter at-least 2 valuations",
                  });
                }
              }
            } else {
              setOpen({
                flag: true,
                message:
                  "Total Adjustment Amount should be equal to DPS Transaction Amount",
              });
            }
          } else {
            console.log("AddAnotherProperty  Enter");
            setValuationTextFields(true);
            if (
              businessDetailSection.PropertyType != -1 &&
              businessDetailSection.PropertyAcquiredDetails != "" &&
              businessDetailSection.PrincipalAdjusted != -1 &&
              businessDetailSection.MarkupAdjusted != -1 &&
              businessDetailSection.Charges != -1 &&
              businessDetailSection.AcquiredValue != -1 &&
              businessDetailSection.AcquisitionCharges != -1 &&
              businessDetailSection.DateOfAcquisition != "18000101" &&
              businessDetailSection.DateOfAcquisition != "" &&
              businessDetailSection.DPSTransactionAmount != -1
            ) {
              setBusinessTextFields(false);
            } else {
              setBusinessTextFields(true);
            }
            setOpen({
              flag: true,
              message: "Enter Required Fields",
            });
          }
        } else {
          if (
            businessDetailSection.DPSTransactionAmount ===
            businessDetailSection.TotalAdjustmentPMC
          ) {
            setBusinessTextFields(false);

            let check1 = businessDetailSection.PropertyEvaluatorBusinessList;
            if (check1.length > 1) {
              setValuationTextFields(false);
              console.log("AddAnotherValuation  data", check1);
              let data = NBACasePropertyModelList;
              data.push(businessDetailSection);
              setNBACasePropertyModelList(data);
              setBusinessDetailSection({
                PropertyType: -1,
                PropertyAcquiredDetails: "",
                PrincipalAdjusted: -1,
                MarkupAdjusted: -1,
                Charges: -1,
                TotalAdjustmentPMC: -1,
                AcquiredValue: -1,
                AcquisitionCharges: -1,
                DateOfAcquisition: "18000101",
                DPSTransactionAmount: -1,
                TotalValueDAA: -1,
                NumberOfValuationsBusiness: -1,
                AverageForcedSaleValueBusiness: -1,
                AverageMarketValueBusiness: -1,
                PropertyEvaluatorBusinessList: [],
              });
              setValuationDetails({
                ...valuationDetails,
                BuildingMarketValue: parseInt(-1),
                LandForcedSaleValue: parseInt(-1),
                LandMarketValue: parseInt(-1),
                BuildingForcedSaleValue: parseInt(-1),
                EvaluatorName: "",
                DateOfValuation: "18000101",
                TotalForcedSaleValue: parseInt(-1),
                TotalMarketValue: parseInt(-1),
              });
              setCustomerField(false);
              setCustomerAdjustmentField(false);
              setPropertyTypeName("");
            } else {
              console.log("AddAnotherValuation  data", check1);
              setValuationTextFields(true);
              setOpen({
                flag: true,
                message: "Please enter at-least 2 valuations",
              });
            }
          } else {
            // setBusinessTextFields(true)
            setOpen({
              flag: true,
              message:
                "Total Adjustment Amount should be equal to DPS Transaction Amount",
            });
          }
        }
      }
    }
  };

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
      var valueCheck = value.replace(
        /[a-zA-Z_0-9@\!#\$\^%&*()+=\-[]\\\';,\.\/\{\}\|\":<>\? ]/,
        ""
      );
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

  //Add Another Customer Details button
  const AddAnotherCustomerDetails = async () => {
    if (
      customerSection.MisysCode != "" &&
      customerSection.BorrowerName != "" &&
      customerSection.BorrowerAddress != "" &&
      customerSection.BorrowerAddress != "" &&
      customerSection.ECIBCode != ""
    ) {
      setMysisError(false);
      setCustomerDetailsField(false);
      if (NBACaseCustomerList.length > 0) {
        let tem = NBACaseCustomerList;
        await tem.push(customerSection);
        await setNBACaseCustomerList(tem);
        setCustomerSection({
          MisysCode: "",
          BorrowerName: "",
          BorrowerAddress: "",
          ECIBCode: "",
          IPartyID: -1,
          NBACaseCustomerAccountList: [],
        });
      } else {
        let tem = NBACaseCustomerList;
        await tem.push(customerSection);
        await setNBACaseCustomerList(tem);
        setCustomerSection({
          MisysCode: "",
          BorrowerName: "",
          BorrowerAddress: "",
          ECIBCode: "",
          IPartyID: -1,
          NBACaseCustomerAccountList: [],
        });
      }
    } else {
      setCustomer1DetailsField(false);
      setMysisError(true);
      setOpen({
        flag: true,
        message: "Please Add Misys Customer Details",
      });
    }
  };

  //Add Update Customer Details button
  const UpdateCustomerDetails = async () => {
    if (
      customerSection.MisysCode != "" &&
      customerSection.BorrowerName != "" &&
      customerSection.BorrowerAddress != "" &&
      customerSection.BorrowerAddress != "" &&
      customerSection.ECIBCode != ""
    ) {
      setCustomer1DetailsField(true);
      setCustomerDetailsField(false);
      if (NBACaseCustomerList.length > 0) {
        // NBACaseCustomerListIndex
        let tem = NBACaseCustomerList;
        if (NBACaseCustomerListIndex !== -1) {
          tem[NBACaseCustomerListIndex] = customerSection;
        }
        // await tem.push(customerSection);
        await setNBACaseCustomerList(tem);
        setCustomerSection({
          MisysCode: "",
          BorrowerName: "",
          BorrowerAddress: "",
          ECIBCode: "",
          IPartyID: -1,
          NBACaseCustomerAccountList: [],
        });
        setNBACaseCustomerListIndex(-1);
        setNBACaseCustomerListButton(false);
      } else {
        let tem = NBACaseCustomerList;
        // await tem.push(customerSection);
        if (NBACaseCustomerListIndex !== -1) {
          tem[NBACaseCustomerListIndex] = customerSection;
        }
        await setNBACaseCustomerList(tem);
        setCustomerSection({
          MisysCode: "",
          BorrowerName: "",
          BorrowerAddress: "",
          ECIBCode: "",
          IPartyID: -1,
          NBACaseCustomerAccountList: [],
        });
        setNBACaseCustomerListIndex(-1);
        setNBACaseCustomerListButton(false);
      }
    } else {
      setCustomer1DetailsField(false);
      setOpen({
        flag: true,
        message: "Please Add Misys Customer Details",
      });
    }
  };

  //Add Update Business Details button
  const UpdateBusinessDetails = async () => {
    if (NBACasePropertyModelList.length > 0) {
      console.log(
        "AddAnotherProperty NBACasePropertyModelList",
        NBACasePropertyModelList,
        customerField
      );
      // if (customerAdjustmentField === true) {
      console.log(
        "AddAnotherProperty NBACasePropertyModelList",
        NBACasePropertyModelList,
        customerField
      );
      if (
        businessDetailSection.PropertyType != -1 &&
        businessDetailSection.PropertyAcquiredDetails != "" &&
        businessDetailSection.PrincipalAdjusted != -1 &&
        businessDetailSection.MarkupAdjusted != -1 &&
        businessDetailSection.Charges != -1 &&
        businessDetailSection.AcquiredValue != -1 &&
        businessDetailSection.AcquisitionCharges != -1 &&
        businessDetailSection.DateOfAcquisition != "18000101" &&
        businessDetailSection.DateOfAcquisition != "" &&
        businessDetailSection.DPSTransactionAmount != -1
      ) {
        console.log(
          "AddAnotherProperty NBACasePropertyModelList",
          NBACasePropertyModelList,
          customerField
        );
        setBusinessTextFields(false);
        if (
          businessDetailSection.DPSTransactionAmount ===
          businessDetailSection.TotalAdjustmentPMC
        ) {
          console.log(
            "AddAnotherProperty NBACasePropertyModelList",
            NBACasePropertyModelList,
            customerField
          );
          if (customerField === true) {
            console.log(
              "AddAnotherProperty NBACasePropertyModelList",
              valuationDetails
            );
            if (
              valuationDetails.EvaluatorName != "" &&
              valuationDetails.BuildingMarketValue != -1 &&
              valuationDetails.LandMarketValue != -1 &&
              valuationDetails.LandForcedSaleValue != -1 &&
              valuationDetails.BuildingForcedSaleValue != -1 &&
              valuationDetails.DateOfValuation != "" &&
              valuationDetails.DateOfValuation != "18000101"
            ) {
              console.log(
                "AddAnotherProperty NBACasePropertyModelList",
                NBACasePropertyModelList,
                customerField
              );
              setValuationTextFields(false);
              setCustomerField(false);
              console.log(
                "AddAnotherProperty valuationDetails",
                valuationDetails
              );
              let tem1 = [];
              let check = businessDetailSection.PropertyEvaluatorBusinessList;
              if (check.length > 0) {
                tem1.push(...check, valuationDetails);

                let sortTotalMarketValue = tem1.sort((a, b) => {
                  return a.TotalMarketValue - b.TotalMarketValue;
                });

                let totaolfvalue1 = parseFloat(
                  parseFloat(
                    sortTotalMarketValue[0].TotalForcedSaleValue
                  ).toFixed(2)
                );
                let totaolfvalue2 = parseFloat(
                  parseFloat(
                    sortTotalMarketValue[1].TotalForcedSaleValue
                  ).toFixed(2)
                );
                let tF =
                  parseFloat(parseFloat(totaolfvalue1).toFixed(2)) +
                  parseFloat(parseFloat(totaolfvalue2).toFixed(2));
                let avgfvalue = parseFloat(parseFloat(tF).toFixed(2)) / 2;

                let totaolmvalue1 = parseFloat(
                  parseFloat(sortTotalMarketValue[0].TotalMarketValue).toFixed(
                    2
                  )
                );
                let totaolmvalue2 = parseFloat(
                  parseFloat(sortTotalMarketValue[1].TotalMarketValue).toFixed(
                    2
                  )
                );
                let tm =
                  parseFloat(parseFloat(totaolmvalue1).toFixed(2)) +
                  parseFloat(parseFloat(totaolmvalue2).toFixed(2));
                let avgmvalue = parseFloat(parseFloat(tm).toFixed(2)) / 2;
                let data = {
                  PropertyType: businessDetailSection.PropertyType,
                  PropertyAcquiredDetails:
                    businessDetailSection.PropertyAcquiredDetails,
                  PrincipalAdjusted: businessDetailSection.PrincipalAdjusted,
                  MarkupAdjusted: businessDetailSection.MarkupAdjusted,
                  Charges: businessDetailSection.Charges,
                  TotalAdjustmentPMC: businessDetailSection.TotalAdjustmentPMC,
                  AcquiredValue: businessDetailSection.AcquiredValue,
                  AcquisitionCharges: businessDetailSection.AcquisitionCharges,
                  DateOfAcquisition: businessDetailSection.DateOfAcquisition,
                  DPSTransactionAmount:
                    businessDetailSection.DPSTransactionAmount,
                  TotalValueDAA: businessDetailSection.TotalValueDAA,
                  NumberOfValuationsBusiness: tem1.length,
                  AverageForcedSaleValueBusiness: parseFloat(
                    parseFloat(avgfvalue).toFixed(2)
                  ),
                  AverageMarketValueBusiness: parseFloat(
                    parseFloat(avgmvalue).toFixed(2)
                  ),
                  PropertyEvaluatorBusinessList: tem1,
                };
                let check1 = data.PropertyEvaluatorBusinessList;
                console.log("AddAnotherValuation  data", check1);
                if (check1.length > 1) {
                  console.log(
                    "AddAnotherProperty NBACasePropertyModelList",
                    NBACasePropertyModelList,
                    customerField
                  );
                  let tem = NBACasePropertyModelList;
                  // await tem.push(data);
                  if (NBACaseBusinessListIndex !== -1) {
                    tem[NBACaseBusinessListIndex] = data;
                  }
                  setNBACasePropertyModelList(tem);
                  setNBACaseBusinessListButton(false);
                  setBusinessDetailSection({
                    PropertyType: -1,
                    PropertyAcquiredDetails: "",
                    PrincipalAdjusted: -1,
                    MarkupAdjusted: -1,
                    Charges: -1,
                    TotalAdjustmentPMC: -1,
                    AcquiredValue: -1,
                    AcquisitionCharges: -1,
                    DateOfAcquisition: "18000101",
                    DPSTransactionAmount: -1,
                    TotalValueDAA: -1,
                    NumberOfValuationsBusiness: -1,
                    AverageForcedSaleValueBusiness: -1,
                    AverageMarketValueBusiness: -1,
                    PropertyEvaluatorBusinessList: [],
                  });
                  setValuationDetails({
                    ...valuationDetails,
                    BuildingMarketValue: parseInt(-1),
                    LandForcedSaleValue: parseInt(-1),
                    LandMarketValue: parseInt(-1),
                    BuildingForcedSaleValue: parseInt(-1),
                    EvaluatorName: "",
                    DateOfValuation: "18000101",
                    TotalForcedSaleValue: parseInt(-1),
                    TotalMarketValue: parseInt(-1),
                  });
                  setCustomerField(false);
                  setCustomerAdjustmentField(false);
                  setPropertyTypeName("");
                } else {
                  setValuationTextFields(true);
                  console.log("AddAnotherValuation  data", check1);
                  setOpen({
                    flag: true,
                    message: "Please enter at-least 2 valuations",
                  });
                }
                console.log("temcheck ", avgmvalue, avgfvalue);
              } else {
                // tem = valuationDetails;
                let totaolfvalue = valuationDetails.TotalForcedSaleValue;
                let totaolmvalue = valuationDetails.TotalMarketValue;
                tem1.push(valuationDetails);
                let data = {
                  PropertyType: businessDetailSection.PropertyType,
                  PropertyAcquiredDetails:
                    businessDetailSection.PropertyAcquiredDetails,
                  PrincipalAdjusted: businessDetailSection.PrincipalAdjusted,
                  MarkupAdjusted: businessDetailSection.MarkupAdjusted,
                  Charges: businessDetailSection.Charges,
                  TotalAdjustmentPMC: businessDetailSection.TotalAdjustmentPMC,
                  AcquiredValue: businessDetailSection.AcquiredValue,
                  AcquisitionCharges: businessDetailSection.AcquisitionCharges,
                  DateOfAcquisition: businessDetailSection.DateOfAcquisition,
                  DPSTransactionAmount:
                    businessDetailSection.DPSTransactionAmount,
                  TotalValueDAA: businessDetailSection.TotalValueDAA,
                  NumberOfValuationsBusiness: 1,
                  AverageForcedSaleValueBusiness: parseFloat(
                    parseFloat(totaolfvalue).toFixed(2)
                  ),
                  AverageMarketValueBusiness: parseFloat(
                    parseFloat(totaolmvalue).toFixed(2)
                  ),
                  PropertyEvaluatorBusinessList: tem1,
                };
                let check1 = data.PropertyEvaluatorBusinessList;
                if (check1.length > 1) {
                  console.log("AddAnotherValuation  data", check1);
                  let tem = NBACasePropertyModelList;
                  // await tem.push(data);
                  if (NBACaseBusinessListIndex !== -1) {
                    tem[NBACaseBusinessListIndex] = data;
                  }
                  setNBACasePropertyModelList(tem);
                  setNBACaseBusinessListButton(false);
                  setBusinessDetailSection({
                    PropertyType: -1,
                    PropertyAcquiredDetails: "",
                    PrincipalAdjusted: -1,
                    MarkupAdjusted: -1,
                    Charges: -1,
                    TotalAdjustmentPMC: -1,
                    AcquiredValue: -1,
                    AcquisitionCharges: -1,
                    DateOfAcquisition: "18000101",
                    DPSTransactionAmount: -1,
                    TotalValueDAA: -1,
                    NumberOfValuationsBusiness: -1,
                    AverageForcedSaleValueBusiness: -1,
                    AverageMarketValueBusiness: -1,
                    PropertyEvaluatorBusinessList: [],
                  });
                  setValuationDetails({
                    BuildingMarketValue: parseInt(-1),
                    LandForcedSaleValue: parseInt(-1),
                    LandMarketValue: parseInt(-1),
                    BuildingForcedSaleValue: parseInt(-1),
                    EvaluatorName: "",
                    DateOfValuation: "18000101",
                    TotalForcedSaleValue: parseInt(-1),
                    TotalMarketValue: parseInt(-1),
                  });
                  setCustomerField(false);
                  setCustomerAdjustmentField(false);
                  setValuationTextFields(false);
                  setPropertyTypeName("");
                } else {
                  console.log("AddAnotherValuation  data", check1);
                  setValuationTextFields(true);
                  setOpen({
                    flag: true,
                    message: "Please enter at-least 2 valuations",
                  });
                }
              }
            } else {
              console.log("AddAnotherProperty  Enter");
              setValuationTextFields(true);
              setOpen({
                flag: true,
                message: "Enter Required Fields",
              });
            }
          } else {
            console.log(
              "AddAnotherProperty NBACasePropertyModelList",
              NBACasePropertyModelList,
              customerField
            );
            let check1 = businessDetailSection.PropertyEvaluatorBusinessList;
            if (check1.length > 1) {
              console.log(
                "AddAnotherProperty NBACasePropertyModelList",
                NBACasePropertyModelList,
                customerField
              );
              console.log("AddAnotherValuation  data", check1);
              let data = NBACasePropertyModelList;
              // data.push(businessDetailSection);
              if (NBACaseBusinessListIndex !== -1) {
                data[NBACaseBusinessListIndex] = businessDetailSection;
              }
              setNBACasePropertyModelList(data);
              setNBACaseBusinessListButton(false);
              setBusinessDetailSection({
                PropertyType: -1,
                PropertyAcquiredDetails: "",
                PrincipalAdjusted: -1,
                MarkupAdjusted: -1,
                Charges: -1,
                TotalAdjustmentPMC: -1,
                AcquiredValue: -1,
                AcquisitionCharges: -1,
                DateOfAcquisition: "18000101",
                DPSTransactionAmount: -1,
                TotalValueDAA: -1,
                NumberOfValuationsBusiness: -1,
                AverageForcedSaleValueBusiness: -1,
                AverageMarketValueBusiness: -1,
                PropertyEvaluatorBusinessList: [],
              });
              setValuationDetails({
                ...valuationDetails,
                BuildingMarketValue: parseInt(-1),
                LandForcedSaleValue: parseInt(-1),
                LandMarketValue: parseInt(-1),
                BuildingForcedSaleValue: parseInt(-1),
                EvaluatorName: "",
                DateOfValuation: "18000101",
                TotalForcedSaleValue: parseInt(-1),
                TotalMarketValue: parseInt(-1),
              });
              setCustomerField(false);
              setCustomerAdjustmentField(false);
              setValuationTextFields(false);
              setPropertyTypeName("");
            } else {
              console.log(
                "AddAnotherProperty NBACasePropertyModelList",
                NBACasePropertyModelList,
                customerField
              );
              console.log("AddAnotherValuation  data", check1);
              setValuationTextFields(true);
              setOpen({
                flag: true,
                message: "Please enter at-least 2 valuations",
              });
            }
          }
        } else {
          console.log(
            "AddAnotherProperty NBACasePropertyModelList",
            NBACasePropertyModelList,
            customerField
          );
          setOpen({
            flag: true,
            message:
              "Total Adjustment Amount should be equal to DPS Transaction Amount",
          });
        }
      } else {
        console.log(
          "AddAnotherProperty NBACasePropertyModelList",
          NBACasePropertyModelList,
          customerField
        );
        setBusinessTextFields(true);
        if (customerField === true) {
          console.log(
            "AddAnotherProperty NBACasePropertyModelList",
            NBACasePropertyModelList,
            customerField
          );
          console.log(
            "AddAnotherProperty NBACasePropertyModelList",
            NBACasePropertyModelList,
            customerField
          );
          if (
            valuationDetails.EvaluatorName != "" &&
            valuationDetails.BuildingMarketValue != -1 &&
            valuationDetails.LandMarketValue != -1 &&
            valuationDetails.LandForcedSaleValue != -1 &&
            valuationDetails.BuildingForcedSaleValue != -1 &&
            valuationDetails.DateOfValuation != "" &&
            valuationDetails.DateOfValuation != "18000101"
          ) {
            setValuationTextFields(false);
          } else {
            setValuationTextFields(true);
          }
        } else {
          setValuationTextFields(false);
        }
        console.log(
          "AddAnotherProperty NBACasePropertyModelList",
          NBACasePropertyModelList,
          customerField
        );
        setOpen({
          flag: true,
          message: "Enter Required Fields",
        });
      }
      // } else {
      //   console.log(
      //     "AddAnotherProperty NBACasePropertyModelList",
      //     NBACasePropertyModelList,
      //     customerField
      //   );
      //   if (customerField === true) {
      //     console.log(
      //       "AddAnotherProperty NBACasePropertyModelList",
      //       valuationDetails
      //     );
      //     if (
      //       valuationDetails.EvaluatorName != "" &&
      //       valuationDetails.BuildingMarketValue != -1 &&
      //       valuationDetails.LandMarketValue != -1 &&
      //       valuationDetails.LandForcedSaleValue != -1 &&
      //       valuationDetails.BuildingForcedSaleValue != -1 &&
      //       valuationDetails.DateOfValuation != "" &&
      //       valuationDetails.DateOfValuation != "18000101"
      //     ) {
      //       setCustomerField(false);
      //       setValuationTextFields(false);
      //       console.log(
      //         "AddAnotherProperty valuationDetails",
      //         valuationDetails
      //       );
      //       if (
      //         businessDetailSection.DPSTransactionAmount ===
      //         businessDetailSection.TotalAdjustmentPMC
      //       ) {
      //         let tem1 = [];
      //         let check = businessDetailSection.PropertyEvaluatorBusinessList;
      //         if (check.length > 0) {
      //           tem1.push(...check, valuationDetails);

      //           let sortTotalMarketValue = tem1.sort((a, b) => {
      //             return a.TotalMarketValue - b.TotalMarketValue;
      //           });

      //           let totaolfvalue1 = parseFloat(
      //             parseFloat(
      //               sortTotalMarketValue[0].TotalForcedSaleValue
      //             ).toFixed(2)
      //           );
      //           let totaolfvalue2 = parseFloat(
      //             parseFloat(
      //               sortTotalMarketValue[1].TotalForcedSaleValue
      //             ).toFixed(2)
      //           );
      //           let tF =
      //             parseFloat(parseFloat(totaolfvalue1).toFixed(2)) +
      //             parseFloat(parseFloat(totaolfvalue2).toFixed(2));
      //           let avgfvalue = parseFloat(parseFloat(tF).toFixed(2)) / 2;

      //           let totaolmvalue1 = parseFloat(
      //             parseFloat(sortTotalMarketValue[0].TotalMarketValue).toFixed(
      //               2
      //             )
      //           );
      //           let totaolmvalue2 = parseFloat(
      //             parseFloat(sortTotalMarketValue[1].TotalMarketValue).toFixed(
      //               2
      //             )
      //           );
      //           let tm =
      //             parseFloat(parseFloat(totaolmvalue1).toFixed(2)) +
      //             parseFloat(parseFloat(totaolmvalue2).toFixed(2));
      //           let avgmvalue = parseFloat(parseFloat(tm).toFixed(2)) / 2;
      //           let data = {
      //             PropertyType: businessDetailSection.PropertyType,
      //             PropertyAcquiredDetails:
      //               businessDetailSection.PropertyAcquiredDetails,
      //             PrincipalAdjusted: businessDetailSection.PrincipalAdjusted,
      //             MarkupAdjusted: businessDetailSection.MarkupAdjusted,
      //             Charges: businessDetailSection.Charges,
      //             TotalAdjustmentPMC: businessDetailSection.TotalAdjustmentPMC,
      //             AcquiredValue: businessDetailSection.AcquiredValue,
      //             AcquisitionCharges: businessDetailSection.AcquisitionCharges,
      //             DateOfAcquisition: businessDetailSection.DateOfAcquisition,
      //             DPSTransactionAmount:
      //               businessDetailSection.DPSTransactionAmount,
      //             TotalValueDAA: businessDetailSection.TotalValueDAA,
      //             NumberOfValuationsBusiness: tem1.length,
      //             AverageForcedSaleValueBusiness: parseFloat(
      //               parseFloat(avgfvalue).toFixed(2)
      //             ),
      //             AverageMarketValueBusiness: parseFloat(
      //               parseFloat(avgmvalue).toFixed(2)
      //             ),
      //             PropertyEvaluatorBusinessList: tem1,
      //           };
      //           let check1 = data.PropertyEvaluatorBusinessList;
      //           console.log("AddAnotherValuation  data", check1);
      //           if (check1.length > 1) {
      //             let tem = NBACasePropertyModelList;
      //             // await tem.push(data);
      //             if (NBACaseBusinessListIndex !== -1) {
      //               tem[NBACaseBusinessListIndex] = data;
      //             }
      //             setNBACasePropertyModelList(tem);
      //             setNBACaseBusinessListButton(false);
      //             setBusinessDetailSection({
      //               PropertyType: -1,
      //               PropertyAcquiredDetails: "",
      //               PrincipalAdjusted: -1,
      //               MarkupAdjusted: -1,
      //               Charges: -1,
      //               TotalAdjustmentPMC: -1,
      //               AcquiredValue: -1,
      //               AcquisitionCharges: -1,
      //               DateOfAcquisition: "18000101",
      //               DPSTransactionAmount: -1,
      //               TotalValueDAA: -1,
      //               NumberOfValuationsBusiness: -1,
      //               AverageForcedSaleValueBusiness: -1,
      //               AverageMarketValueBusiness: -1,
      //               PropertyEvaluatorBusinessList: [],
      //             });
      //             setValuationDetails({
      //               ...valuationDetails,
      //               BuildingMarketValue: parseInt(-1),
      //               LandForcedSaleValue: parseInt(-1),
      //               LandMarketValue: parseInt(-1),
      //               BuildingForcedSaleValue: parseInt(-1),
      //               EvaluatorName: "",
      //               DateOfValuation: "18000101",
      //               TotalForcedSaleValue: parseInt(-1),
      //               TotalMarketValue: parseInt(-1),
      //             });
      //             setCustomerField(false);
      //             setCustomerAdjustmentField(false);
      //             setValuationTextFields(false);
      //             setPropertyTypeName("");
      //           } else {
      //             console.log("AddAnotherValuation  data", check1);
      //             setValuationTextFields(true);
      //             setOpen({
      //               flag: true,
      //               message: "Please enter at-least 2 valuations",
      //             });
      //           }
      //           console.log("temcheck ", avgmvalue, avgfvalue);
      //         } else {
      //           // tem = valuationDetails;
      //           let totaolfvalue = valuationDetails.TotalForcedSaleValue;
      //           let totaolmvalue = valuationDetails.TotalMarketValue;
      //           tem1.push(valuationDetails);
      //           let data = {
      //             PropertyType: businessDetailSection.PropertyType,
      //             PropertyAcquiredDetails:
      //               businessDetailSection.PropertyAcquiredDetails,
      //             PrincipalAdjusted: businessDetailSection.PrincipalAdjusted,
      //             MarkupAdjusted: businessDetailSection.MarkupAdjusted,
      //             Charges: businessDetailSection.Charges,
      //             TotalAdjustmentPMC: businessDetailSection.TotalAdjustmentPMC,
      //             AcquiredValue: businessDetailSection.AcquiredValue,
      //             AcquisitionCharges: businessDetailSection.AcquisitionCharges,
      //             DateOfAcquisition: businessDetailSection.DateOfAcquisition,
      //             DPSTransactionAmount:
      //               businessDetailSection.DPSTransactionAmount,
      //             TotalValueDAA: businessDetailSection.TotalValueDAA,
      //             NumberOfValuationsBusiness: 1,
      //             AverageForcedSaleValueBusiness: parseFloat(
      //               parseFloat(totaolfvalue).toFixed(2)
      //             ),
      //             AverageMarketValueBusiness: parseFloat(
      //               parseFloat(totaolmvalue).toFixed(2)
      //             ),
      //             PropertyEvaluatorBusinessList: tem1,
      //           };
      //           let check1 = data.PropertyEvaluatorBusinessList;
      //           if (check1.length > 1) {
      //             console.log("AddAnotherValuation  data", check1);
      //             let tem = NBACasePropertyModelList;
      //             // await tem.push(data);
      //             if (NBACaseBusinessListIndex !== -1) {
      //               tem[NBACaseBusinessListIndex] = data;
      //             }
      //             setNBACasePropertyModelList(tem);
      //             setNBACaseBusinessListButton(false);
      //             setBusinessDetailSection({
      //               PropertyType: -1,
      //               PropertyAcquiredDetails: "",
      //               PrincipalAdjusted: -1,
      //               MarkupAdjusted: -1,
      //               Charges: -1,
      //               TotalAdjustmentPMC: -1,
      //               AcquiredValue: -1,
      //               AcquisitionCharges: -1,
      //               DateOfAcquisition: "18000101",
      //               DPSTransactionAmount: -1,
      //               TotalValueDAA: -1,
      //               NumberOfValuationsBusiness: -1,
      //               AverageForcedSaleValueBusiness: -1,
      //               AverageMarketValueBusiness: -1,
      //               PropertyEvaluatorBusinessList: [],
      //             });
      //             setValuationDetails({
      //               BuildingMarketValue: parseInt(-1),
      //               LandForcedSaleValue: parseInt(-1),
      //               LandMarketValue: parseInt(-1),
      //               BuildingForcedSaleValue: parseInt(-1),
      //               EvaluatorName: "",
      //               DateOfValuation: "18000101",
      //               TotalForcedSaleValue: parseInt(-1),
      //               TotalMarketValue: parseInt(-1),
      //             });
      //             setCustomerField(false);
      //             setCustomerAdjustmentField(false);
      //             setValuationTextFields(false);
      //             setPropertyTypeName("");
      //           } else {
      //             console.log("AddAnotherValuation  data", check1);
      //             setValuationTextFields(true);
      //             setOpen({
      //               flag: true,
      //               message: "Please enter at-least 2 valuations",
      //             });
      //           }
      //         }
      //       } else {
      //         setOpen({
      //           flag: true,
      //           message:
      //             "Total Adjustment Amount should be equal to DPS Transaction Amount",
      //         });
      //       }
      //     } else {
      //       console.log("AddAnotherProperty  Enter");

      //       setOpen({
      //         flag: true,
      //         message: "Enter Required Fields",
      //       });
      //     }
      //   } else {
      //     console.log(
      //       "AddAnotherProperty NBACasePropertyModelList",
      //       NBACasePropertyModelList,
      //       customerField
      //     );
      //     if (
      //       businessDetailSection.DPSTransactionAmount ===
      //       businessDetailSection.TotalAdjustmentPMC
      //     ) {
      //       console.log(
      //         "AddAnotherProperty NBACasePropertyModelList",
      //         NBACasePropertyModelList,
      //         customerField
      //       );
      //       let check1 = businessDetailSection.PropertyEvaluatorBusinessList;
      //       if (check1.length > 1) {
      //         console.log(
      //           "AddAnotherProperty NBACasePropertyModelList",
      //           NBACasePropertyModelList,
      //           customerField
      //         );
      //         console.log("AddAnotherValuation  data", check1);
      //         let data = NBACasePropertyModelList;
      //         // data.push(businessDetailSection);
      //         if (NBACaseBusinessListIndex !== -1) {
      //           data[NBACaseBusinessListIndex] = businessDetailSection;
      //         }
      //         setNBACasePropertyModelList(data);
      //         setNBACaseBusinessListButton(false);
      //         setBusinessDetailSection({
      //           PropertyType: -1,
      //           PropertyAcquiredDetails: "",
      //           PrincipalAdjusted: -1,
      //           MarkupAdjusted: -1,
      //           Charges: -1,
      //           TotalAdjustmentPMC: -1,
      //           AcquiredValue: -1,
      //           AcquisitionCharges: -1,
      //           DateOfAcquisition: "18000101",
      //           DPSTransactionAmount: -1,
      //           TotalValueDAA: -1,
      //           NumberOfValuationsBusiness: -1,
      //           AverageForcedSaleValueBusiness: -1,
      //           AverageMarketValueBusiness: -1,
      //           PropertyEvaluatorBusinessList: [],
      //         });
      //         setValuationDetails({
      //           ...valuationDetails,
      //           BuildingMarketValue: parseInt(-1),
      //           LandForcedSaleValue: parseInt(-1),
      //           LandMarketValue: parseInt(-1),
      //           BuildingForcedSaleValue: parseInt(-1),
      //           EvaluatorName: "",
      //           DateOfValuation: "18000101",
      //           TotalForcedSaleValue: parseInt(-1),
      //           TotalMarketValue: parseInt(-1),
      //         });
      //         setCustomerField(false);
      //         setCustomerAdjustmentField(false);
      //         setPropertyTypeName("");
      //       } else {
      //         console.log(
      //           "AddAnotherProperty NBACasePropertyModelList",
      //           NBACasePropertyModelList,
      //           customerField
      //         );
      //         console.log("AddAnotherValuation  data", check1);
      //         setOpen({
      //           flag: true,
      //           message: "Please enter at-least 2 valuations",
      //         });
      //       }
      //     } else {
      //       console.log(
      //         "AddAnotherProperty NBACasePropertyModelList",
      //         NBACasePropertyModelList,
      //         customerField
      //       );
      //       setOpen({
      //         flag: true,
      //         message:
      //           "Total Adjustment Amount should be equal to DPS Transaction Amount",
      //       });
      //     }
      //   }
      // }
    } else {
      if (customerAdjustmentField === true) {
        console.log(
          "AddAnotherProperty NBACasePropertyModelList",
          NBACasePropertyModelList,
          customerField
        );
        if (
          businessDetailSection.PropertyType != -1 &&
          businessDetailSection.PropertyAcquiredDetails != "" &&
          businessDetailSection.PrincipalAdjusted != -1 &&
          businessDetailSection.MarkupAdjusted != -1 &&
          businessDetailSection.Charges != -1 &&
          businessDetailSection.AcquiredValue != -1 &&
          businessDetailSection.AcquisitionCharges != -1 &&
          businessDetailSection.DateOfAcquisition != "18000101" &&
          businessDetailSection.DateOfAcquisition != "" &&
          businessDetailSection.DPSTransactionAmount != -1
        ) {
          setBusinessTextFields(false);
          if (
            businessDetailSection.DPSTransactionAmount ===
            businessDetailSection.TotalAdjustmentPMC
          ) {
            if (customerField === true) {
              console.log(
                "AddAnotherProperty NBACasePropertyModelList",
                valuationDetails
              );
              if (
                valuationDetails.EvaluatorName != "" &&
                valuationDetails.BuildingMarketValue != -1 &&
                valuationDetails.LandMarketValue != -1 &&
                valuationDetails.LandForcedSaleValue != -1 &&
                valuationDetails.BuildingForcedSaleValue != -1 &&
                valuationDetails.DateOfValuation != "" &&
                valuationDetails.DateOfValuation != "18000101"
              ) {
                setValuationTextFields(false);
                setCustomerField(false);
                console.log(
                  "AddAnotherProperty valuationDetails",
                  valuationDetails
                );
                let tem1 = [];
                let check = businessDetailSection.PropertyEvaluatorBusinessList;
                if (check.length > 0) {
                  tem1.push(...check, valuationDetails);

                  let sortTotalMarketValue = tem1.sort((a, b) => {
                    return a.TotalMarketValue - b.TotalMarketValue;
                  });

                  let totaolfvalue1 = parseFloat(
                    parseFloat(
                      sortTotalMarketValue[0].TotalForcedSaleValue
                    ).toFixed(2)
                  );
                  let totaolfvalue2 = parseFloat(
                    parseFloat(
                      sortTotalMarketValue[1].TotalForcedSaleValue
                    ).toFixed(2)
                  );
                  let tF =
                    parseFloat(parseFloat(totaolfvalue1).toFixed(2)) +
                    parseFloat(parseFloat(totaolfvalue2).toFixed(2));
                  let avgfvalue = parseFloat(parseFloat(tF).toFixed(2)) / 2;

                  let totaolmvalue1 = parseFloat(
                    parseFloat(
                      sortTotalMarketValue[0].TotalMarketValue
                    ).toFixed(2)
                  );
                  let totaolmvalue2 = parseFloat(
                    parseFloat(
                      sortTotalMarketValue[1].TotalMarketValue
                    ).toFixed(2)
                  );
                  let tm =
                    parseFloat(parseFloat(totaolmvalue1).toFixed(2)) +
                    parseFloat(parseFloat(totaolmvalue2).toFixed(2));
                  let avgmvalue = parseFloat(parseFloat(tm).toFixed(2)) / 2;
                  let data = {
                    PropertyType: businessDetailSection.PropertyType,
                    PropertyAcquiredDetails:
                      businessDetailSection.PropertyAcquiredDetails,
                    PrincipalAdjusted: businessDetailSection.PrincipalAdjusted,
                    MarkupAdjusted: businessDetailSection.MarkupAdjusted,
                    Charges: businessDetailSection.Charges,
                    TotalAdjustmentPMC:
                      businessDetailSection.TotalAdjustmentPMC,
                    AcquiredValue: businessDetailSection.AcquiredValue,
                    AcquisitionCharges:
                      businessDetailSection.AcquisitionCharges,
                    DateOfAcquisition: businessDetailSection.DateOfAcquisition,
                    DPSTransactionAmount:
                      businessDetailSection.DPSTransactionAmount,
                    TotalValueDAA: businessDetailSection.TotalValueDAA,
                    NumberOfValuationsBusiness: tem1.length,
                    AverageForcedSaleValueBusiness: parseFloat(
                      parseFloat(avgfvalue).toFixed(2)
                    ),
                    AverageMarketValueBusiness: parseFloat(
                      parseFloat(avgmvalue).toFixed(2)
                    ),
                    PropertyEvaluatorBusinessList: tem1,
                  };
                  let check1 = data.PropertyEvaluatorBusinessList;
                  console.log("AddAnotherValuation  data", check1);
                  if (check1.length > 1) {
                    let tem = NBACasePropertyModelList;
                    // await tem.push(data);
                    if (NBACaseBusinessListIndex !== -1) {
                      tem[NBACaseBusinessListIndex] = data;
                    }
                    setNBACasePropertyModelList(tem);
                    setNBACaseBusinessListButton(false);
                    setBusinessDetailSection({
                      PropertyType: -1,
                      PropertyAcquiredDetails: "",
                      PrincipalAdjusted: -1,
                      MarkupAdjusted: -1,
                      Charges: -1,
                      TotalAdjustmentPMC: -1,
                      AcquiredValue: -1,
                      AcquisitionCharges: -1,
                      DateOfAcquisition: "18000101",
                      DPSTransactionAmount: -1,
                      TotalValueDAA: -1,
                      NumberOfValuationsBusiness: -1,
                      AverageForcedSaleValueBusiness: -1,
                      AverageMarketValueBusiness: -1,
                      PropertyEvaluatorBusinessList: [],
                    });
                    setValuationDetails({
                      ...valuationDetails,
                      BuildingMarketValue: parseInt(-1),
                      LandForcedSaleValue: parseInt(-1),
                      LandMarketValue: parseInt(-1),
                      BuildingForcedSaleValue: parseInt(-1),
                      EvaluatorName: "",
                      DateOfValuation: "18000101",
                      TotalForcedSaleValue: parseInt(-1),
                      TotalMarketValue: parseInt(-1),
                    });
                    setCustomerField(false);
                    setCustomerAdjustmentField(false);
                    setPropertyTypeName("");
                  } else {
                    console.log("AddAnotherValuation  data", check1);
                    setOpen({
                      flag: true,
                      message: "Please enter at-least 2 valuations",
                    });
                  }
                  console.log("temcheck ", avgmvalue, avgfvalue);
                } else {
                  // tem = valuationDetails;
                  let totaolfvalue = valuationDetails.TotalForcedSaleValue;
                  let totaolmvalue = valuationDetails.TotalMarketValue;
                  tem1.push(valuationDetails);
                  let data = {
                    PropertyType: businessDetailSection.PropertyType,
                    PropertyAcquiredDetails:
                      businessDetailSection.PropertyAcquiredDetails,
                    PrincipalAdjusted: businessDetailSection.PrincipalAdjusted,
                    MarkupAdjusted: businessDetailSection.MarkupAdjusted,
                    Charges: businessDetailSection.Charges,
                    TotalAdjustmentPMC:
                      businessDetailSection.TotalAdjustmentPMC,
                    AcquiredValue: businessDetailSection.AcquiredValue,
                    AcquisitionCharges:
                      businessDetailSection.AcquisitionCharges,
                    DateOfAcquisition: businessDetailSection.DateOfAcquisition,
                    DPSTransactionAmount:
                      businessDetailSection.DPSTransactionAmount,
                    TotalValueDAA: businessDetailSection.TotalValueDAA,
                    NumberOfValuationsBusiness: 1,
                    AverageForcedSaleValueBusiness: parseFloat(
                      parseFloat(totaolfvalue).toFixed(2)
                    ),
                    AverageMarketValueBusiness: parseFloat(
                      parseFloat(totaolmvalue).toFixed(2)
                    ),
                    PropertyEvaluatorBusinessList: tem1,
                  };
                  let check1 = data.PropertyEvaluatorBusinessList;
                  if (check1.length > 1) {
                    console.log("AddAnotherValuation  data", check1);
                    let tem = NBACasePropertyModelList;
                    // await tem.push(data);
                    if (NBACaseBusinessListIndex !== -1) {
                      tem[NBACaseBusinessListIndex] = data;
                    }
                    setNBACasePropertyModelList(tem);
                    setNBACaseBusinessListButton(false);
                    setBusinessDetailSection({
                      PropertyType: -1,
                      PropertyAcquiredDetails: "",
                      PrincipalAdjusted: -1,
                      MarkupAdjusted: -1,
                      Charges: -1,
                      TotalAdjustmentPMC: -1,
                      AcquiredValue: -1,
                      AcquisitionCharges: -1,
                      DateOfAcquisition: "18000101",
                      DPSTransactionAmount: -1,
                      TotalValueDAA: -1,
                      NumberOfValuationsBusiness: -1,
                      AverageForcedSaleValueBusiness: -1,
                      AverageMarketValueBusiness: -1,
                      PropertyEvaluatorBusinessList: [],
                    });
                    setValuationDetails({
                      BuildingMarketValue: parseInt(-1),
                      LandForcedSaleValue: parseInt(-1),
                      LandMarketValue: parseInt(-1),
                      BuildingForcedSaleValue: parseInt(-1),
                      EvaluatorName: "",
                      DateOfValuation: "18000101",
                      TotalForcedSaleValue: parseInt(-1),
                      TotalMarketValue: parseInt(-1),
                    });
                    setCustomerField(false);
                    setCustomerAdjustmentField(false);
                    setValuationTextFields(true);
                    setPropertyTypeName("");
                  } else {
                    console.log("AddAnotherValuation  data", check1);
                    setOpen({
                      flag: true,
                      message: "Please enter at-least 2 valuations",
                    });
                  }
                }
              } else {
                console.log("AddAnotherProperty  Enter");
                setValuationTextFields(true);
                setOpen({
                  flag: true,
                  message: "Enter Required Fields",
                });
              }
            } else {
              let check1 = businessDetailSection.PropertyEvaluatorBusinessList;
              if (check1.length > 1) {
                console.log("AddAnotherValuation  data", check1);
                let data = NBACasePropertyModelList;
                // data.push(businessDetailSection);
                if (NBACaseBusinessListIndex !== -1) {
                  data[NBACaseBusinessListIndex] = businessDetailSection;
                }
                setNBACasePropertyModelList(data);
                setNBACaseBusinessListButton(false);
                setBusinessDetailSection({
                  PropertyType: -1,
                  PropertyAcquiredDetails: "",
                  PrincipalAdjusted: -1,
                  MarkupAdjusted: -1,
                  Charges: -1,
                  TotalAdjustmentPMC: -1,
                  AcquiredValue: -1,
                  AcquisitionCharges: -1,
                  DateOfAcquisition: "18000101",
                  DPSTransactionAmount: -1,
                  TotalValueDAA: -1,
                  NumberOfValuationsBusiness: -1,
                  AverageForcedSaleValueBusiness: -1,
                  AverageMarketValueBusiness: -1,
                  PropertyEvaluatorBusinessList: [],
                });
                setValuationDetails({
                  ...valuationDetails,
                  BuildingMarketValue: parseInt(-1),
                  LandForcedSaleValue: parseInt(-1),
                  LandMarketValue: parseInt(-1),
                  BuildingForcedSaleValue: parseInt(-1),
                  EvaluatorName: "",
                  DateOfValuation: "18000101",
                  TotalForcedSaleValue: parseInt(-1),
                  TotalMarketValue: parseInt(-1),
                });
                setCustomerField(false);
                setCustomerAdjustmentField(false);
                setPropertyTypeName("");
                setValuationTextFields(false);
              } else {
                setValuationTextFields(true);
                console.log("AddAnotherValuation  data", check1);
                setOpen({
                  flag: true,
                  message: "Please enter at-least 2 valuations",
                });
              }
            }
          } else {
            setOpen({
              flag: true,
              message:
                "Total Adjustment Amount should be equal to DPS Transaction Amount",
            });
          }
        } else {
          setBusinessTextFields(true);
          if (customerField === true) {
            if (
              valuationDetails.EvaluatorName != "" &&
              valuationDetails.BuildingMarketValue != -1 &&
              valuationDetails.LandMarketValue != -1 &&
              valuationDetails.LandForcedSaleValue != -1 &&
              valuationDetails.BuildingForcedSaleValue != -1 &&
              valuationDetails.DateOfValuation != "" &&
              valuationDetails.DateOfValuation != "18000101"
            ) {
              setValuationTextFields(false);
            } else {
              setValuationTextFields(true);
            }
          } else {
            setValuationTextFields(false);
          }
          setOpen({
            flag: true,
            message: "Enter Required Fields",
          });
        }
      } else {
        if (customerField === true) {
          console.log(
            "AddAnotherProperty NBACasePropertyModelList",
            valuationDetails
          );
          if (
            valuationDetails.EvaluatorName != "" &&
            valuationDetails.BuildingMarketValue != -1 &&
            valuationDetails.LandMarketValue != -1 &&
            valuationDetails.LandForcedSaleValue != -1 &&
            valuationDetails.BuildingForcedSaleValue != -1 &&
            valuationDetails.DateOfValuation != "" &&
            valuationDetails.DateOfValuation != "18000101"
          ) {
            setValuationTextFields(false);
            setCustomerField(false);
            console.log(
              "AddAnotherProperty valuationDetails",
              valuationDetails
            );
            let tem1 = [];
            if (
              businessDetailSection.DPSTransactionAmount ===
              businessDetailSection.TotalAdjustmentPMC
            ) {
              let check = businessDetailSection.PropertyEvaluatorBusinessList;
              if (check.length > 0) {
                tem1.push(...check, valuationDetails);

                let sortTotalMarketValue = tem1.sort((a, b) => {
                  return a.TotalMarketValue - b.TotalMarketValue;
                });

                let totaolfvalue1 = parseFloat(
                  parseFloat(
                    sortTotalMarketValue[0].TotalForcedSaleValue
                  ).toFixed(2)
                );
                let totaolfvalue2 = parseFloat(
                  parseFloat(
                    sortTotalMarketValue[1].TotalForcedSaleValue
                  ).toFixed(2)
                );
                let tF =
                  parseFloat(parseFloat(totaolfvalue1).toFixed(2)) +
                  parseFloat(parseFloat(totaolfvalue2).toFixed(2));
                let avgfvalue = parseFloat(parseFloat(tF).toFixed(2)) / 2;

                let totaolmvalue1 = parseFloat(
                  parseFloat(sortTotalMarketValue[0].TotalMarketValue).toFixed(
                    2
                  )
                );
                let totaolmvalue2 = parseFloat(
                  parseFloat(sortTotalMarketValue[1].TotalMarketValue).toFixed(
                    2
                  )
                );
                let tm =
                  parseFloat(parseFloat(totaolmvalue1).toFixed(2)) +
                  parseFloat(parseFloat(totaolmvalue2).toFixed(2));
                let avgmvalue = parseFloat(parseFloat(tm).toFixed(2)) / 2;
                let data = {
                  PropertyType: businessDetailSection.PropertyType,
                  PropertyAcquiredDetails:
                    businessDetailSection.PropertyAcquiredDetails,
                  PrincipalAdjusted: businessDetailSection.PrincipalAdjusted,
                  MarkupAdjusted: businessDetailSection.MarkupAdjusted,
                  Charges: businessDetailSection.Charges,
                  TotalAdjustmentPMC: businessDetailSection.TotalAdjustmentPMC,
                  AcquiredValue: businessDetailSection.AcquiredValue,
                  AcquisitionCharges: businessDetailSection.AcquisitionCharges,
                  DateOfAcquisition: businessDetailSection.DateOfAcquisition,
                  DPSTransactionAmount:
                    businessDetailSection.DPSTransactionAmount,
                  TotalValueDAA: businessDetailSection.TotalValueDAA,
                  NumberOfValuationsBusiness: tem1.length,
                  AverageForcedSaleValueBusiness: parseFloat(
                    parseFloat(avgfvalue).toFixed(2)
                  ),
                  AverageMarketValueBusiness: parseFloat(
                    parseFloat(avgmvalue).toFixed(2)
                  ),
                  PropertyEvaluatorBusinessList: tem1,
                };
                let check1 = data.PropertyEvaluatorBusinessList;
                console.log("AddAnotherValuation  data", check1);
                if (check1.length > 1) {
                  let tem = NBACasePropertyModelList;
                  // await tem.push(data);
                  if (NBACaseBusinessListIndex !== -1) {
                    tem[NBACaseBusinessListIndex] = data;
                  }
                  setNBACasePropertyModelList(tem);
                  setNBACaseBusinessListButton(false);
                  setBusinessDetailSection({
                    PropertyType: -1,
                    PropertyAcquiredDetails: "",
                    PrincipalAdjusted: -1,
                    MarkupAdjusted: -1,
                    Charges: -1,
                    TotalAdjustmentPMC: -1,
                    AcquiredValue: -1,
                    AcquisitionCharges: -1,
                    DateOfAcquisition: "18000101",
                    DPSTransactionAmount: -1,
                    TotalValueDAA: -1,
                    NumberOfValuationsBusiness: -1,
                    AverageForcedSaleValueBusiness: -1,
                    AverageMarketValueBusiness: -1,
                    PropertyEvaluatorBusinessList: [],
                  });
                  setValuationDetails({
                    ...valuationDetails,
                    BuildingMarketValue: parseInt(-1),
                    LandForcedSaleValue: parseInt(-1),
                    LandMarketValue: parseInt(-1),
                    BuildingForcedSaleValue: parseInt(-1),
                    EvaluatorName: "",
                    DateOfValuation: "18000101",
                    TotalForcedSaleValue: parseInt(-1),
                    TotalMarketValue: parseInt(-1),
                  });
                  setCustomerField(false);
                  setCustomerAdjustmentField(false);
                  setValuationTextFields(false);
                  setPropertyTypeName("");
                } else {
                  console.log("AddAnotherValuation  data", check1);
                  setValuationTextFields(true);
                  setOpen({
                    flag: true,
                    message: "Please enter at-least 2 valuations",
                  });
                }
                console.log("temcheck ", avgmvalue, avgfvalue);
              } else {
                // tem = valuationDetails;
                let totaolfvalue = valuationDetails.TotalForcedSaleValue;
                let totaolmvalue = valuationDetails.TotalMarketValue;
                tem1.push(valuationDetails);
                let data = {
                  PropertyType: businessDetailSection.PropertyType,
                  PropertyAcquiredDetails:
                    businessDetailSection.PropertyAcquiredDetails,
                  PrincipalAdjusted: businessDetailSection.PrincipalAdjusted,
                  MarkupAdjusted: businessDetailSection.MarkupAdjusted,
                  Charges: businessDetailSection.Charges,
                  TotalAdjustmentPMC: businessDetailSection.TotalAdjustmentPMC,
                  AcquiredValue: businessDetailSection.AcquiredValue,
                  AcquisitionCharges: businessDetailSection.AcquisitionCharges,
                  DateOfAcquisition: businessDetailSection.DateOfAcquisition,
                  DPSTransactionAmount:
                    businessDetailSection.DPSTransactionAmount,
                  TotalValueDAA: businessDetailSection.TotalValueDAA,
                  NumberOfValuationsBusiness: 1,
                  AverageForcedSaleValueBusiness: parseFloat(
                    parseFloat(totaolfvalue).toFixed(2)
                  ),
                  AverageMarketValueBusiness: parseFloat(
                    parseFloat(totaolmvalue).toFixed(2)
                  ),
                  PropertyEvaluatorBusinessList: tem1,
                };
                let check1 = data.PropertyEvaluatorBusinessList;
                if (check1.length > 1) {
                  console.log("AddAnotherValuation  data", check1);
                  let tem = NBACasePropertyModelList;
                  // await tem.push(data);
                  if (NBACaseBusinessListIndex !== -1) {
                    tem[NBACaseBusinessListIndex] = data;
                  }
                  setNBACasePropertyModelList(tem);
                  setNBACaseBusinessListButton(false);
                  setBusinessDetailSection({
                    PropertyType: -1,
                    PropertyAcquiredDetails: "",
                    PrincipalAdjusted: -1,
                    MarkupAdjusted: -1,
                    Charges: -1,
                    TotalAdjustmentPMC: -1,
                    AcquiredValue: -1,
                    AcquisitionCharges: -1,
                    DateOfAcquisition: "18000101",
                    DPSTransactionAmount: -1,
                    TotalValueDAA: -1,
                    NumberOfValuationsBusiness: -1,
                    AverageForcedSaleValueBusiness: -1,
                    AverageMarketValueBusiness: -1,
                    PropertyEvaluatorBusinessList: [],
                  });
                  setValuationDetails({
                    BuildingMarketValue: parseInt(-1),
                    LandForcedSaleValue: parseInt(-1),
                    LandMarketValue: parseInt(-1),
                    BuildingForcedSaleValue: parseInt(-1),
                    EvaluatorName: "",
                    DateOfValuation: "18000101",
                    TotalForcedSaleValue: parseInt(-1),
                    TotalMarketValue: parseInt(-1),
                  });
                  setCustomerField(false);
                  setCustomerAdjustmentField(false);
                  setValuationTextFields(false);
                  setPropertyTypeName("");
                } else {
                  console.log("AddAnotherValuation  data", check1);
                  setValuationTextFields(true);
                  setOpen({
                    flag: true,
                    message: "Please enter at-least 2 valuations",
                  });
                }
              }
            } else {
              setOpen({
                flag: true,
                message:
                  "Total Adjustment Amount should be equal to DPS Transaction Amount",
              });
            }
          } else {
            console.log("AddAnotherProperty  Enter");
            setValuationTextFields(true);
            setOpen({
              flag: true,
              message: "Enter Required Fields",
            });
          }
        } else {
          if (
            businessDetailSection.DPSTransactionAmount ===
            businessDetailSection.TotalAdjustmentPMC
          ) {
            let check1 = businessDetailSection.PropertyEvaluatorBusinessList;
            if (check1.length > 1) {
              console.log("AddAnotherValuation  data", check1);
              let data = NBACasePropertyModelList;
              // data.push(businessDetailSection);
              if (NBACaseBusinessListIndex !== -1) {
                data[NBACaseBusinessListIndex] = businessDetailSection;
              }
              setNBACasePropertyModelList(data);
              setNBACaseBusinessListButton(false);
              setBusinessDetailSection({
                PropertyType: -1,
                PropertyAcquiredDetails: "",
                PrincipalAdjusted: -1,
                MarkupAdjusted: -1,
                Charges: -1,
                TotalAdjustmentPMC: -1,
                AcquiredValue: -1,
                AcquisitionCharges: -1,
                DateOfAcquisition: "18000101",
                DPSTransactionAmount: -1,
                TotalValueDAA: -1,
                NumberOfValuationsBusiness: -1,
                AverageForcedSaleValueBusiness: -1,
                AverageMarketValueBusiness: -1,
                PropertyEvaluatorBusinessList: [],
              });
              setValuationDetails({
                ...valuationDetails,
                BuildingMarketValue: parseInt(-1),
                LandForcedSaleValue: parseInt(-1),
                LandMarketValue: parseInt(-1),
                BuildingForcedSaleValue: parseInt(-1),
                EvaluatorName: "",
                DateOfValuation: "18000101",
                TotalForcedSaleValue: parseInt(-1),
                TotalMarketValue: parseInt(-1),
              });
              setCustomerField(false);
              setCustomerAdjustmentField(false);
              setPropertyTypeName("");
              setValuationTextFields(false);
            } else {
              console.log("AddAnotherValuation  data", check1);
              setValuationTextFields(true);
              setOpen({
                flag: true,
                message: "Please enter at-least 2 valuations",
              });
            }
          } else {
            setOpen({
              flag: true,
              message:
                "Total Adjustment Amount should be equal to DPS Transaction Amount",
            });
          }
        }
      }
    }
  };

  const columnCustomerDetail2 = [
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
        if (String(text) != "" && String(text) != "18000101") {
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

    {
      title: "Edit",
      dataIndex: "edit",
      key: "edit",
      align: "center",
      width: "100px",
      render: (text, record) => (
        <div
          // style={{ cursor: "pointer" }}
          // onClick={() => deleteGrid(record)}
          onClick={(e) => update(e, record)}
          className={`${"icon-edit icon-size-one beachGreen"} ${
            styles["Onlycursor"]
          }`}
        />
      ),
    },

    {
      title: "Delete",
      dataIndex: "delete",
      key: "delete",
      align: "center",
      width: "100px",
      render: (text, record) => (
        <div
          // style={{ cursor: "pointer" }}
          onClick={() => deleteGrid(record)}
          className={`${"icon-trash icon-size-one pdfRed"} ${
            styles["Onlycursor"]
          }`}
        />
      ),
    },
  ];

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

  //for total adjustment is equal to dps transaction amount

  // for principal markup charges average
  useEffect(() => {
    let PrincipalAdjusted = businessDetailSection.PrincipalAdjusted;
    let MarkupAdjusted = businessDetailSection.MarkupAdjusted;
    let Charges = businessDetailSection.Charges;
    console.log("Total Adjustment", PrincipalAdjusted, MarkupAdjusted, Charges);
    if (PrincipalAdjusted != -1 && MarkupAdjusted != -1 && Charges != -1) {
      console.log("Total Adjustment");
      let ammont = PrincipalAdjusted + MarkupAdjusted + Charges;
      setBusinessDetailSection({
        ...businessDetailSection,
        ["TotalAdjustmentPMC"]: parseFloat(ammont),
      });
    } else if (PrincipalAdjusted != -1 && MarkupAdjusted != -1) {
      console.log("Total Adjustment");
      let ammont = MarkupAdjusted + PrincipalAdjusted;
      setBusinessDetailSection({
        ...businessDetailSection,
        ["TotalAdjustmentPMC"]: parseFloat(ammont),
      });
    } else if (MarkupAdjusted != -1 && Charges != -1) {
      console.log("Total Adjustment");
      let ammont = MarkupAdjusted + Charges;

      setBusinessDetailSection({
        ...businessDetailSection,
        ["TotalAdjustmentPMC"]: parseFloat(ammont),
      });
    } else if (PrincipalAdjusted != -1 && Charges != -1) {
      console.log("Total Adjustment");
      let ammont = PrincipalAdjusted + Charges;

      setBusinessDetailSection({
        ...businessDetailSection,
        ["TotalAdjustmentPMC"]: parseFloat(ammont),
      });
    } else if (PrincipalAdjusted != -1) {
      console.log("Total Adjustment");
      let ammont = PrincipalAdjusted;
      setBusinessDetailSection({
        ...businessDetailSection,
        ["TotalAdjustmentPMC"]: parseFloat(ammont),
      });
    } else if (MarkupAdjusted != -1) {
      console.log("Total Adjustment");
      let ammont = MarkupAdjusted;

      setBusinessDetailSection({
        ...businessDetailSection,
        ["TotalAdjustmentPMC"]: parseFloat(ammont),
      });
    } else if (Charges != -1) {
      console.log("Total Adjustment");
      let ammont = Charges;

      setBusinessDetailSection({
        ...businessDetailSection,
        ["TotalAdjustmentPMC"]: parseFloat(ammont),
      });
    } else if (
      PrincipalAdjusted === -1 &&
      MarkupAdjusted === -1 &&
      Charges === -1
    ) {
      setBusinessDetailSection({
        ...businessDetailSection,
        ["TotalAdjustmentPMC"]: parseInt(-1),
      });
    }
  }, [
    businessDetailSection.PrincipalAdjusted,
    businessDetailSection.MarkupAdjusted,
    businessDetailSection.Charges,
  ]);

  //for DPS transaction amount,acquire value and acquisition charges
  useEffect(() => {
    let AcquiredValue = businessDetailSection.AcquiredValue;
    let AcquisitionCharges = businessDetailSection.AcquisitionCharges;

    if (AcquiredValue != -1 && AcquisitionCharges != -1) {
      let newAmmount = AcquiredValue + AcquisitionCharges;
      setBusinessDetailSection({
        ...businessDetailSection,
        ["TotalValueDAA"]: parseFloat(newAmmount),
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
    } else if (AcquiredValue === -1 && AcquisitionCharges === -1) {
      let newAmmount = AcquiredValue + AcquisitionCharges;
      setBusinessDetailSection({
        ...businessDetailSection,
        ["TotalValueDAA"]: parseInt(-1),
      });
    }
  }, [
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

  const mysisHandler = (e) => {
    let value = e.target.value;
    if (value != "") {
      setCustomerSection({
        ...customerSection,
        ["MisysCode"]: value,
      });
    } else {
      setCustomerDetailsField(false);
      setCustomerSection({
        ...customerSection,
        ["MisysCode"]: value,
      });
    }
  };

  const mysisSearchHandler = async () => {
    if (customerSection.MisysCode.length > 0) {
      console.log("SearchCustomerMysis", customerSection);
      if (NBACaseCustomerList.length > 0) {
        let found = NBACaseCustomerList.map((data, index) => {
          console.log("SearchCustomerMysis", customerSection);
          if (data.MisysCode != customerSection.MisysCode) {
            console.log("SearchCustomerMysis", data);
            return true;
          } else {
            console.log("SearchCustomerMysis", data);
            if (NBACaseCustomerListIndex === index) {
              return true;
            } else {
              return false;
            }
          }
        });
        console.log("SearchCustomerMysis", found);
        let falg = found.find((element) => element === false);
        console.log("SearchCustomerMysis", falg);
        if (falg || falg === undefined) {
          console.log("SearchCustomerMysis", falg);
          setCustomerDetailsField(true);
          dispatch(
            SearchCustomerMysis(
              customerSection.MisysCode,
              setCustomerSection,
              customerSection,
              setMisysError,
              misysError,
              setMisysErrMsg,
              misysErrMsg
            )
          );
          setCustomer1DetailsField(false);
        } else {
          // setCustomer1DetailsField(true)
          console.log("SearchCustomerMysis", falg);
          setOpen({
            flag: true,
            message: "Misys Code already searched",
          });
        }
      } else {
        setCustomerDetailsField(true);
        dispatch(
          SearchCustomerMysis(
            customerSection.MisysCode,
            setCustomerSection,
            customerSection,
            setMisysError,
            misysError,
            setMisysErrMsg,
            misysErrMsg
          )
        );
        setCustomer1DetailsField(false);
      }
    } else {
      setCustomer1DetailsField(false);
      setOpen({
        flag: true,
        message: "Enter MisysCode",
      });
    }
  };

  const propertyTypeHandler = (e, value) => {
    setPropertyTypeName(value);
    console.log("propertyTypeHandler", value);
    if (NBACasePropertyModelList.length > 0) {
      if (value === "" || value === null) {
        console.log("propertyTypeHandler", value);
        if (businessDetailSection.PropertyEvaluatorBusinessList.length > 1) {
          if (valuationDetails.EvaluatorName != "") {
            setCustomerField(true);
            setCustomerAdjustmentField(true);
          } else {
            setCustomerField(false);
            setCustomerAdjustmentField(true);
          }
        } else if (
          businessDetailSection.PropertyEvaluatorBusinessList.length > 0
        ) {
          setCustomerField(true);
          setCustomerAdjustmentField(true);
        } else {
          if (valuationDetails.EvaluatorName != "") {
            setCustomerField(true);
            setCustomerAdjustmentField(true);
          } else {
            setCustomerField(false);
            setCustomerAdjustmentField(false);
          }
        }
      } else {
        setCustomerField(true);
        setCustomerAdjustmentField(true);
      }
    }
    if (NBACaseBusinessListIndex != -1) {
      if (value != "" || value != null) {
        console.log("propertyTypeHandler", value);
        let namePropertyType = setupForms.PropertyTypeData;
        namePropertyType.map((data, index) => {
          if (value === data.title) {
            let id = data.pK_PropertyTypeID;
            setBusinessDetailSection({
              ...businessDetailSection,
              ["PropertyType"]: parseInt(id),
            });
          }
        });
      } else {
        console.log("propertyTypeHandler", value);
        setBusinessDetailSection({
          ...businessDetailSection,
          ["PropertyType"]: -1,
        });
      }
      if (businessDetailSection.PropertyEvaluatorBusinessList.length > 0) {
        setCustomerField(false);
      } else {
        setCustomerField(true);
      }
    } else {
      if (value != "" || value != null) {
        console.log("propertyTypeHandler", value);
        let namePropertyType = setupForms.PropertyTypeData;
        namePropertyType.map((data, index) => {
          if (value === data.title) {
            let id = data.pK_PropertyTypeID;
            setBusinessDetailSection({
              ...businessDetailSection,
              ["PropertyType"]: parseInt(id),
            });
          }
        });
      } else {
        console.log("propertyTypeHandler", value);
        setBusinessDetailSection({
          ...businessDetailSection,
          ["PropertyType"]: -1,
        });
      }
    }
  };

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
    dispatch(GetAllPropertyType());
  }, []);

  useEffect(() => {
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
      }, 3000);
    } else {
      console.log("SaveBusinessTeamData");
      if (Notification != false) {
        console.log("SaveBusinessTeamData");
        dispatch(notificationFalse());
      }
    }
  }, [nonBankingAssets.ShowNotification]);

  // edit business record
  const editPreviousBDRecordHandler = (data, index) => {
    setNBACaseNBACaseBusinessListIndex(index);
    setNBACaseBusinessListButton(true);
    let namePropertyType = setupForms.PropertyTypeData;
    console.log("namePropertyType", namePropertyType);
    console.log("namePropertyType", data.title);
    namePropertyType.map((data1, index) => {
      if (data.PropertyType === data1.pK_PropertyTypeID) {
        console.log("namePropertyType", data1.title);
        setPropertyTypeName(data1.title);
      }
    });
    setBusinessDetailSection({
      PropertyType: data.PropertyType,
      PropertyAcquiredDetails: data.PropertyAcquiredDetails,
      PrincipalAdjusted: data.PrincipalAdjusted,
      MarkupAdjusted: data.MarkupAdjusted,
      Charges: data.Charges,
      TotalAdjustmentPMC: data.TotalAdjustmentPMC,
      AcquiredValue: data.AcquiredValue,
      AcquisitionCharges: data.AcquisitionCharges,
      DateOfAcquisition: data.DateOfAcquisition,
      DPSTransactionAmount: data.DPSTransactionAmount,
      TotalValueDAA: data.TotalValueDAA,
      NumberOfValuationsBusiness: data.NumberOfValuationsBusiness,
      AverageForcedSaleValueBusiness: data.AverageForcedSaleValueBusiness,
      AverageMarketValueBusiness: data.AverageMarketValueBusiness,
      PropertyEvaluatorBusinessList: data.PropertyEvaluatorBusinessList,
    });
  };

  // edit mysys customer
  const editPreviousRecordHandler = (data, index) => {
    console.log("editPreviousRecordHandler", data, index);
    setNBACaseCustomerListIndex(index);
    setNBACaseCustomerListButton(true);
    setCustomerSection({
      MisysCode: data.MisysCode,
      BorrowerName: data.BorrowerName,
      BorrowerAddress: data.BorrowerAddress,
      ECIBCode: data.ECIBCode,
      IPartyID: data.IPartyID,
      NBACaseCustomerAccountList: data.NBACaseCustomerAccountList,
    });
  };

  const goToSaveHandler = async (e) => {
    setRemarksApprovalMysis(true);
    e.preventDefault();
    let NBACCtem = NBACaseCustomerList;
    let NBAPMtem = NBACasePropertyModelList;
    console.log(
      "saveData",
      saveNewData.RemarksBusiness,
      saveNewData.ApprovalAuthority,
      customer1DetailsField
    );
    if (
      saveNewData.RemarksBusiness === "" &&
      saveNewData.ApprovalAuthority === "" &&
      customer1DetailsField === true
    ) {
      console.log("saveData");
      setCustomer1DetailsField(false);
      setRemarksApprovalMysis(true);
      if (customerAdjustmentField === true) {
        console.log("saveData");
        setBusinessTextFields(true);
      } else {
        setBusinessTextFields(false);
      }
      if (customerField === true) {
        console.log("saveData");
        setValuationTextFields(true);
      } else {
        setValuationTextFields(false);
      }
    } else if (saveNewData.RemarksBusiness === "") {
      console.log("saveData");
      setRemarksApprovalMysis(true);
      if (customerAdjustmentField === true) {
        console.log("saveData");
        setBusinessTextFields(true);
      } else {
        setBusinessTextFields(false);
      }
      if (customerField === true) {
        console.log("saveData");
        setValuationTextFields(true);
      } else {
        setValuationTextFields(false);
      }
    } else if (saveNewData.ApprovalAuthority === "") {
      console.log("saveData");
      setRemarksApprovalMysis(true);
      if (customerAdjustmentField === true) {
        console.log("saveData");
        setBusinessTextFields(true);
      } else {
        setBusinessTextFields(false);
      }
      if (customerField === true) {
        console.log("saveData");
        setValuationTextFields(true);
      } else {
        setValuationTextFields(false);
      }
    } else if (customer1DetailsField === true) {
      console.log("saveData");
      setCustomer1DetailsField(false);
      if (customerAdjustmentField === true) {
        console.log("saveData");
        setBusinessTextFields(true);
      } else {
        setBusinessTextFields(false);
      }
      if (customerField === true) {
        console.log("saveData");
        setValuationTextFields(true);
      } else {
        setValuationTextFields(false);
      }
      // if (customerSection.ECIBCode=== "" && customerDetailsField===true) {
      //   setCustomerDetailsField(true)}else{setCustomerDetailsField(false)}
    } else if (NBACaseCustomerListButton === true) {
      console.log("saveCheck");
      setOpen({
        flag: true,
        message: "Please update selected customer details or discard changes",
      });
    } else if (NBACaseBusinessListButton === true) {
      console.log("saveCheck");
      setOpen({
        flag: true,
        message: "Please update selected business details  or discard changes",
      });
    } else if (NBACaseValuationListButton === true) {
      console.log("saveCheck");
      setOpen({
        flag: true,
        message: "Please update selected Valuation Details  or discard changes",
      });
    } else {
      console.log("saveData");
      setRemarksApprovalMysis(false);
      if (customerAdjustmentField === true) {
        console.log("saveData");
        setBusinessTextFields(true);
        if (NBACasePropertyModelList.length > 0) {
          // setRemarksApproval(false);
          console.log("saveData");
          if (customerField === true) {
            console.log("saveData");
            setValuationTextFields(true);
            setOpen({
              flag: true,
              message: "Enter at least 2 valuations",
            });
          } else {
            console.log("saveData");
            setValuationTextFields(false);
            if (
              businessDetailSection.PropertyEvaluatorBusinessList.length > 1
            ) {
              console.log("saveData");
              if (
                businessDetailSection.DateOfAcquisition != "" &&
                businessDetailSection.DateOfAcquisition != "18000101"
              ) {
                console.log("saveData");
                if (
                  businessDetailSection.DPSTransactionAmount ===
                  businessDetailSection.TotalAdjustmentPMC
                ) {
                  console.log("saveData");
                  NBAPMtem.push(businessDetailSection);
                  if (customerDetailsField === true) {
                    console.log("saveData");
                    if (NBACaseCustomerList.length > 0) {
                      console.log("saveData");
                      if (customerSection.ECIBCode === "") {
                        console.log("saveData");
                        setOpen({
                          flag: true,
                          message: "Please enter data in all required fields",
                        });
                      } else {
                        await NBACCtem.push(customerSection);
                        let Data = {
                          IsFullSettlement: saveNewData.IsFullSettlement,
                          ApprovalAuthority: saveNewData.ApprovalAuthority,
                          RemarksBusiness: saveNewData.RemarksBusiness,
                          NBACaseID: saveNewData.NBACaseID,
                          SendForApproval: saveNewData.SendForApproval,
                          ReferenceNumber: saveNewData.ReferenceNumber,
                          NBACaseCustomerList: NBACCtem,
                          NBACasePropertyModelList: NBAPMtem,
                        };

                        dispatch(SaveBusinessTeamData(Data));
                        setBusinessTextFields(false);
                      }
                    } else {
                      console.log("saveData");
                      if (customerSection.ECIBCode === "") {
                        console.log("saveData");
                        setOpen({
                          flag: true,
                          message: "Please enter data in all required fields",
                        });
                      } else {
                        await NBACCtem.push(customerSection);
                        let Data = {
                          IsFullSettlement: saveNewData.IsFullSettlement,
                          ApprovalAuthority: saveNewData.ApprovalAuthority,
                          RemarksBusiness: saveNewData.RemarksBusiness,
                          NBACaseID: saveNewData.NBACaseID,
                          SendForApproval: saveNewData.SendForApproval,
                          ReferenceNumber: saveNewData.ReferenceNumber,
                          NBACaseCustomerList: NBACCtem,
                          NBACasePropertyModelList: NBAPMtem,
                        };

                        dispatch(SaveBusinessTeamData(Data));
                        setBusinessTextFields(false);
                      }
                    }
                  } else {
                    if (NBACaseCustomerList.length > 0) {
                      console.log("saveData");
                      if (customerSection.ECIBCode === "") {
                        console.log("saveData");
                        let Data = {
                          IsFullSettlement: saveNewData.IsFullSettlement,
                          ApprovalAuthority: saveNewData.ApprovalAuthority,
                          RemarksBusiness: saveNewData.RemarksBusiness,
                          NBACaseID: saveNewData.NBACaseID,
                          SendForApproval: saveNewData.SendForApproval,
                          ReferenceNumber: saveNewData.ReferenceNumber,
                          NBACaseCustomerList: NBACaseCustomerList,
                          NBACasePropertyModelList: NBAPMtem,
                        };

                        dispatch(SaveBusinessTeamData(Data));
                        setBusinessTextFields(false);
                      } else {
                        await NBACCtem.push(customerSection);
                        let Data = {
                          IsFullSettlement: saveNewData.IsFullSettlement,
                          ApprovalAuthority: saveNewData.ApprovalAuthority,
                          RemarksBusiness: saveNewData.RemarksBusiness,
                          NBACaseID: saveNewData.NBACaseID,
                          SendForApproval: saveNewData.SendForApproval,
                          ReferenceNumber: saveNewData.ReferenceNumber,
                          NBACaseCustomerList: NBACCtem,
                          NBACasePropertyModelList: NBAPMtem,
                        };

                        dispatch(SaveBusinessTeamData(Data));
                        setBusinessTextFields(false);
                      }
                    } else {
                      console.log("saveData");
                      if (customerSection.ECIBCode === "") {
                        console.log("saveData");
                        setOpen({
                          flag: true,
                          message: "Please enter atleast one misys data",
                        });
                      } else {
                        await NBACCtem.push(customerSection);
                        let Data = {
                          IsFullSettlement: saveNewData.IsFullSettlement,
                          ApprovalAuthority: saveNewData.ApprovalAuthority,
                          RemarksBusiness: saveNewData.RemarksBusiness,
                          NBACaseID: saveNewData.NBACaseID,
                          SendForApproval: saveNewData.SendForApproval,
                          ReferenceNumber: saveNewData.ReferenceNumber,
                          NBACaseCustomerList: NBACCtem,
                          NBACasePropertyModelList: NBAPMtem,
                        };

                        dispatch(SaveBusinessTeamData(Data));
                        setBusinessTextFields(false);
                      }
                    }
                  }
                } else {
                  console.log("saveData");
                  setOpen({
                    flag: true,
                    message:
                      "Total Adjustment Amount should be equal to DPS Transaction Amount",
                  });
                }
              } else {
                console.log("saveData");
                setBusinessTextFields(true);
                setOpen({
                  flag: true,
                  message: "Please enter data in all required fields",
                });
              }
            } else {
              console.log("saveData");
              setOpen({
                flag: true,
                message:
                  "Please enter at-least 2 valuations against all properties",
              });
            }
          }
        } else {
          console.log("saveData");
          // setRemarksApproval(true);
          if (customerField === true) {
            console.log("saveData");
            setValuationTextFields(true);
            setOpen({
              flag: true,
              message: "Enter at least 2 valuations",
            });
          } else {
            console.log("saveData");
            if (
              businessDetailSection.PropertyEvaluatorBusinessList.length > 1
            ) {
              console.log("saveData");
              if (
                businessDetailSection.DateOfAcquisition != "" &&
                businessDetailSection.DateOfAcquisition != "18000101"
              ) {
                console.log("saveData");
                setRemarksApprovalMysis(false);
                if (
                  businessDetailSection.DPSTransactionAmount ===
                  businessDetailSection.TotalAdjustmentPMC
                ) {
                  console.log("saveData");
                  NBAPMtem.push(businessDetailSection);
                  if (customerDetailsField === true) {
                    console.log("saveData");
                    if (NBACaseCustomerList.length > 0) {
                      console.log("saveData");
                      if (customerSection.ECIBCode === "") {
                        console.log("saveData");
                        setOpen({
                          flag: true,
                          message: "Please enter data in all required fields",
                        });
                      } else {
                        await NBACCtem.push(customerSection);
                        let Data = {
                          IsFullSettlement: saveNewData.IsFullSettlement,
                          ApprovalAuthority: saveNewData.ApprovalAuthority,
                          RemarksBusiness: saveNewData.RemarksBusiness,
                          NBACaseID: saveNewData.NBACaseID,
                          SendForApproval: saveNewData.SendForApproval,
                          ReferenceNumber: saveNewData.ReferenceNumber,
                          NBACaseCustomerList: NBACCtem,
                          NBACasePropertyModelList: NBAPMtem,
                        };

                        dispatch(SaveBusinessTeamData(Data));
                        setBusinessTextFields(false);
                      }
                    } else {
                      console.log("saveData");
                      if (customerSection.ECIBCode === "") {
                        console.log("saveData");
                        setOpen({
                          flag: true,
                          message: "Please enter data in all required fields",
                        });
                      } else {
                        await NBACCtem.push(customerSection);
                        let Data = {
                          IsFullSettlement: saveNewData.IsFullSettlement,
                          ApprovalAuthority: saveNewData.ApprovalAuthority,
                          RemarksBusiness: saveNewData.RemarksBusiness,
                          NBACaseID: saveNewData.NBACaseID,
                          SendForApproval: saveNewData.SendForApproval,
                          ReferenceNumber: saveNewData.ReferenceNumber,
                          NBACaseCustomerList: NBACCtem,
                          NBACasePropertyModelList: NBAPMtem,
                        };

                        dispatch(SaveBusinessTeamData(Data));
                        setBusinessTextFields(false);
                      }
                    }
                  } else {
                    if (NBACaseCustomerList.length > 0) {
                      console.log("saveData");
                      if (customerSection.ECIBCode === "") {
                        console.log("saveData");
                        let Data = {
                          IsFullSettlement: saveNewData.IsFullSettlement,
                          ApprovalAuthority: saveNewData.ApprovalAuthority,
                          RemarksBusiness: saveNewData.RemarksBusiness,
                          NBACaseID: saveNewData.NBACaseID,
                          SendForApproval: saveNewData.SendForApproval,
                          ReferenceNumber: saveNewData.ReferenceNumber,
                          NBACaseCustomerList: NBACaseCustomerList,
                          NBACasePropertyModelList: NBAPMtem,
                        };

                        dispatch(SaveBusinessTeamData(Data));
                        setBusinessTextFields(false);
                      } else {
                        await NBACCtem.push(customerSection);
                        let Data = {
                          IsFullSettlement: saveNewData.IsFullSettlement,
                          ApprovalAuthority: saveNewData.ApprovalAuthority,
                          RemarksBusiness: saveNewData.RemarksBusiness,
                          NBACaseID: saveNewData.NBACaseID,
                          SendForApproval: saveNewData.SendForApproval,
                          ReferenceNumber: saveNewData.ReferenceNumber,
                          NBACaseCustomerList: NBACCtem,
                          NBACasePropertyModelList: NBAPMtem,
                        };

                        dispatch(SaveBusinessTeamData(Data));
                        setBusinessTextFields(false);
                      }
                    } else {
                      console.log("saveData");
                      if (customerSection.ECIBCode === "") {
                        console.log("saveData");
                        setOpen({
                          flag: true,
                          message: "Please enter atleast one misys data",
                        });
                      } else {
                        await NBACCtem.push(customerSection);
                        let Data = {
                          IsFullSettlement: saveNewData.IsFullSettlement,
                          ApprovalAuthority: saveNewData.ApprovalAuthority,
                          RemarksBusiness: saveNewData.RemarksBusiness,
                          NBACaseID: saveNewData.NBACaseID,
                          SendForApproval: saveNewData.SendForApproval,
                          ReferenceNumber: saveNewData.ReferenceNumber,
                          NBACaseCustomerList: NBACCtem,
                          NBACasePropertyModelList: NBAPMtem,
                        };

                        dispatch(SaveBusinessTeamData(Data));
                        setBusinessTextFields(false);
                      }
                    }
                  }
                  // if (customerDetailsField === true) {
                  //   console.log("saveData")
                  //   if (NBACaseCustomerList.length > 0) {
                  //     console.log("saveData")
                  //     await NBACCtem.push(customerSection);
                  //   } else {
                  //     console.log("saveData")
                  //     await NBACCtem.push(customerSection);
                  //   }
                  // }
                  // let Data = {
                  //   IsFullSettlement: saveNewData.IsFullSettlement,
                  //   ApprovalAuthority: saveNewData.ApprovalAuthority,
                  //   RemarksBusiness: saveNewData.RemarksBusiness,
                  //   NBACaseID: saveNewData.NBACaseID,
                  //   SendForApproval: saveNewData.SendForApproval,
                  //   ReferenceNumber: saveNewData.ReferenceNumber,
                  //   NBACaseCustomerList: NBACCtem,
                  //   NBACasePropertyModelList: NBAPMtem,
                  // };

                  // dispatch(SaveBusinessTeamData(Data));
                } else {
                  console.log("saveData");
                  setOpen({
                    flag: true,
                    message:
                      "Total Adjustment Amount should be equal to DPS Transaction Amount",
                  });
                }
              } else {
                console.log("saveData");
                setRemarksApprovalMysis(true);
                setOpen({
                  flag: true,
                  message: "Please enter data in all required fields",
                });
              }
            } else {
              console.log("saveData");
              setOpen({
                flag: true,
                message:
                  "Please enter at-least 2 valuations against all properties",
              });
            }
          }
        }
      } else {
        console.log("saveData");
        setBusinessTextFields(false);
        // if (
        //   businessDetailSection.TotalAdjustmentPMC ===
        //   businessDetailSection.DPSTransactionAmount
        // )
        if (
          saveNewData.RemarksBusiness != "" &&
          saveNewData.ApprovalAuthority != ""
        ) {
          console.log("saveData");
          setRemarksApprovalMysis(false);
          if (customerDetailsField === true) {
            console.log("saveData");
            if (NBACaseCustomerList.length > 0) {
              console.log("saveData");
              if (customerSection.ECIBCode === "") {
                console.log("saveData");
                setOpen({
                  flag: true,
                  message: "Please enter data in all required fields",
                });
              } else {
                await NBACCtem.push(customerSection);
                let Data = {
                  IsFullSettlement: saveNewData.IsFullSettlement,
                  ApprovalAuthority: saveNewData.ApprovalAuthority,
                  RemarksBusiness: saveNewData.RemarksBusiness,
                  NBACaseID: saveNewData.NBACaseID,
                  SendForApproval: saveNewData.SendForApproval,
                  ReferenceNumber: saveNewData.ReferenceNumber,
                  NBACaseCustomerList: NBACCtem,
                  NBACasePropertyModelList: NBAPMtem,
                };

                dispatch(SaveBusinessTeamData(Data));
                setBusinessTextFields(false);
              }
            } else {
              console.log("saveData");
              if (customerSection.ECIBCode === "") {
                console.log("saveData");
                setOpen({
                  flag: true,
                  message: "Please enter data in all required fields",
                });
              } else {
                await NBACCtem.push(customerSection);
                let Data = {
                  IsFullSettlement: saveNewData.IsFullSettlement,
                  ApprovalAuthority: saveNewData.ApprovalAuthority,
                  RemarksBusiness: saveNewData.RemarksBusiness,
                  NBACaseID: saveNewData.NBACaseID,
                  SendForApproval: saveNewData.SendForApproval,
                  ReferenceNumber: saveNewData.ReferenceNumber,
                  NBACaseCustomerList: NBACCtem,
                  NBACasePropertyModelList: NBAPMtem,
                };

                dispatch(SaveBusinessTeamData(Data));
                setBusinessTextFields(false);
              }
            }
          } else {
            if (NBACaseCustomerList.length > 0) {
              console.log("saveData");
              if (customerSection.ECIBCode === "") {
                console.log("saveData");
                let Data = {
                  IsFullSettlement: saveNewData.IsFullSettlement,
                  ApprovalAuthority: saveNewData.ApprovalAuthority,
                  RemarksBusiness: saveNewData.RemarksBusiness,
                  NBACaseID: saveNewData.NBACaseID,
                  SendForApproval: saveNewData.SendForApproval,
                  ReferenceNumber: saveNewData.ReferenceNumber,
                  NBACaseCustomerList: NBACaseCustomerList,
                  NBACasePropertyModelList: NBAPMtem,
                };

                dispatch(SaveBusinessTeamData(Data));
                setBusinessTextFields(false);
              } else {
                await NBACCtem.push(customerSection);
                let Data = {
                  IsFullSettlement: saveNewData.IsFullSettlement,
                  ApprovalAuthority: saveNewData.ApprovalAuthority,
                  RemarksBusiness: saveNewData.RemarksBusiness,
                  NBACaseID: saveNewData.NBACaseID,
                  SendForApproval: saveNewData.SendForApproval,
                  ReferenceNumber: saveNewData.ReferenceNumber,
                  NBACaseCustomerList: NBACCtem,
                  NBACasePropertyModelList: NBAPMtem,
                };

                dispatch(SaveBusinessTeamData(Data));
                setBusinessTextFields(false);
              }
            } else {
              console.log("saveData");
              if (customerSection.ECIBCode === "") {
                console.log("saveData");
                setOpen({
                  flag: true,
                  message: "Please enter atleast one misys data",
                });
              } else {
                await NBACCtem.push(customerSection);
                let Data = {
                  IsFullSettlement: saveNewData.IsFullSettlement,
                  ApprovalAuthority: saveNewData.ApprovalAuthority,
                  RemarksBusiness: saveNewData.RemarksBusiness,
                  NBACaseID: saveNewData.NBACaseID,
                  SendForApproval: saveNewData.SendForApproval,
                  ReferenceNumber: saveNewData.ReferenceNumber,
                  NBACaseCustomerList: NBACCtem,
                  NBACasePropertyModelList: NBAPMtem,
                };

                dispatch(SaveBusinessTeamData(Data));
                setBusinessTextFields(false);
              }
            }
          }
          // if (customerDetailsField === true) {
          //   console.log("saveData")
          //   if (NBACaseCustomerList.length > 0) {
          //     console.log("saveData")
          //     await NBACCtem.push(customerSection);
          //   } else {
          //     console.log("saveData")
          //     await NBACCtem.push(customerSection);
          //   }
          // }
          // let Data = {
          //   IsFullSettlement: saveNewData.IsFullSettlement,
          //   ApprovalAuthority: saveNewData.ApprovalAuthority,
          //   RemarksBusiness: saveNewData.RemarksBusiness,
          //   NBACaseID: saveNewData.NBACaseID,
          //   SendForApproval: saveNewData.SendForApproval,
          //   ReferenceNumber: saveNewData.ReferenceNumber,
          //   NBACaseCustomerList: NBACCtem,
          //   NBACasePropertyModelList: NBAPMtem,
          // };
          // console.log("SaveBusinessTeamData", Data);

          // dispatch(SaveBusinessTeamData(Data));
        } else {
          console.log("saveData");
          setRemarksApprovalMysis(true);
        }
      }
      // else {
      // setOpen({
      //   flag: true,
      //   message:
      //     "Total Adjustment Amount should be equal to DPS Transaction Amount",
      // });
      // }
    }
  };

  // const goToSaveHandler = async (e) => {
  //   e.preventDefault();
  //   let NBACCtem = NBACaseCustomerList;
  //   let NBAPMtem = NBACasePropertyModelList;

  //   if (customerAdjustmentField === true) {
  //     if (NBACasePropertyModelList.length > 0) {
  //         setRemarksApproval(false)
  //       if (customerField === true) {
  //         setOpen({
  //           flag: true,
  //           message: "Enter at least 2 valuations",
  //         });
  //       } else {
  //         if (businessDetailSection.PropertyEvaluatorBusinessList.length > 1) {
  //           if (
  //             businessDetailSection.DateOfAcquisition != "" &&
  //             businessDetailSection.DateOfAcquisition != "18000101"
  //           ) {
  //             if (
  //               businessDetailSection.DPSTransactionAmount ===
  //               businessDetailSection.TotalAdjustmentPMC
  //             ) {
  //               NBAPMtem.push(businessDetailSection);
  //               if (customerDetailsField === true) {
  //                 if (NBACaseCustomerList.length > 0) {
  //                   await NBACCtem.push(customerSection);
  //                 } else {
  //                   await NBACCtem.push(customerSection);
  //                 }
  //               }
  //               let Data = {
  //                 IsFullSettlement: saveNewData.IsFullSettlement,
  //                 ApprovalAuthority: saveNewData.ApprovalAuthority,
  //                 RemarksBusiness: saveNewData.RemarksBusiness,
  //                 NBACaseID: saveNewData.NBACaseID,
  //                 SendForApproval: saveNewData.SendForApproval,
  //                 ReferenceNumber: saveNewData.ReferenceNumber,
  //                 NBACaseCustomerList: NBACCtem,
  //                 NBACasePropertyModelList: NBAPMtem,
  //               };

  //               dispatch(SaveBusinessTeamData(Data));
  //             } else {
  //               setOpen({
  //                 flag: true,
  //                 message:
  //                   "Total Adjustment Amount should be equal to DPS Transaction Amount",
  //               });
  //             }
  //           } else {
  //             setOpen({
  //               flag: true,
  //               message: "Please enter data in all required fields",
  //             });
  //           }
  //         } else {
  //           setRemarksApproval(true)
  //           setOpen({
  //             flag: true,
  //             message:
  //               "Please enter at-least 2 valuations against all properties",
  //           });
  //         }
  //       }
  //     } else {
  //       if (customerField === true) {
  //         setOpen({
  //           flag: true,
  //           message: "Enter at least 2 valuations",
  //         });
  //       } else {
  //         if (businessDetailSection.PropertyEvaluatorBusinessList.length > 1) {
  //           if (
  //             businessDetailSection.DateOfAcquisition != "" &&
  //             businessDetailSection.DateOfAcquisition != "18000101"
  //           ) {
  //             setRemarksApproval(false)
  //             if (
  //               businessDetailSection.DPSTransactionAmount ===
  //               businessDetailSection.TotalAdjustmentPMC
  //             ) {
  //               NBAPMtem.push(businessDetailSection);
  //               if (customerDetailsField === true) {
  //                 if (NBACaseCustomerList.length > 0) {
  //                   await NBACCtem.push(customerSection);
  //                 } else {
  //                   await NBACCtem.push(customerSection);
  //                 }
  //               }
  //               let Data = {
  //                 IsFullSettlement: saveNewData.IsFullSettlement,
  //                 ApprovalAuthority: saveNewData.ApprovalAuthority,
  //                 RemarksBusiness: saveNewData.RemarksBusiness,
  //                 NBACaseID: saveNewData.NBACaseID,
  //                 SendForApproval: saveNewData.SendForApproval,
  //                 ReferenceNumber: saveNewData.ReferenceNumber,
  //                 NBACaseCustomerList: NBACCtem,
  //                 NBACasePropertyModelList: NBAPMtem,
  //               };

  //               dispatch(SaveBusinessTeamData(Data));
  //             } else {

  //               setOpen({
  //                 flag: true,
  //                 message:
  //                   "Total Adjustment Amount should be equal to DPS Transaction Amount",
  //               });
  //             }
  //           } else {
  //             setRemarksApproval(true)
  //             setOpen({
  //               flag: true,
  //               message: "Please enter data in all required fields",
  //             });
  //           }
  //         } else {
  //           setOpen({
  //             flag: true,
  //             message:
  //               "Please enter at-least 2 valuations against all properties",
  //           });
  //         }
  //       }
  //     }
  //   } else {
  //     if (
  //       businessDetailSection.TotalAdjustmentPMC ===
  //       businessDetailSection.DPSTransactionAmount
  //     ) {
  //       setRemarksApproval(false)
  //       if (customerDetailsField === true) {
  //         if (NBACaseCustomerList.length > 0) {
  //           await NBACCtem.push(customerSection);
  //         } else {
  //           await NBACCtem.push(customerSection);
  //         }
  //       }
  //       let Data = {
  //         IsFullSettlement: saveNewData.IsFullSettlement,
  //         ApprovalAuthority: saveNewData.ApprovalAuthority,
  //         RemarksBusiness: saveNewData.RemarksBusiness,
  //         NBACaseID: saveNewData.NBACaseID,
  //         SendForApproval: saveNewData.SendForApproval,
  //         ReferenceNumber: saveNewData.ReferenceNumber,
  //         NBACaseCustomerList: NBACCtem,
  //         NBACasePropertyModelList: NBAPMtem,
  //       };
  //       console.log("SaveBusinessTeamData", Data);

  //       dispatch(SaveBusinessTeamData(Data));
  //     } else {
  //       setRemarksApproval(true)
  //       setOpen({
  //         flag: true,
  //         message:
  //           "Total Adjustment Amount should be equal to DPS Transaction Amount",
  //       });
  //     }
  //   }
  // };

  return (
    <>
      <form onSubmit={(e) => goToSaveHandler(e)}>
        <Title className={styles["nbaHeading"]} level={3}>
          Non-Banking Assets & Other Assets
        </Title>

        <Paper className={styles["nbaPaper"]}>
          <Grid
            item
            lg={4}
            md={4}
            sm={3}
            xs={12}
            className={styles["nbapaperbtm"]}
            // style={{ marginBottom: "15px" }}
          >
            <h1 className={styles["nbaCustomerSection"]}>
              Customer Details Section
            </h1>
          </Grid>
          <Grid container spacing={2} className={styles["nbaCustomerpadding"]}>
            {NBACaseCustomerList.length > 0
              ? NBACaseCustomerList.map((data, index) => {
                  return (
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <MultipleCustomerDetails
                        list={data}
                        ind={index}
                        setNBACaseCustomerList={setNBACaseCustomerList}
                        editPreviousRecordHandler={() =>
                          editPreviousRecordHandler(data, index)
                        }
                        NBACaseCustomerList={NBACaseCustomerList}
                        setCustomerDetailsField={setCustomerDetailsField}
                        setCustomer1DetailsField={setCustomer1DetailsField}
                      />
                    </Grid>
                  );
                })
              : console.log(
                  "NBACaseCustomerList",
                  NBACasePropertyModelList.length
                )}
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <div>
                <InputWithBtn
                  isUpperCase={true}
                  label="Misys Customer Code"
                  fullWidth
                  textFieldSize="small"
                  autoComplete="off"
                  applyClass="search"
                  textLength={6}
                  minLength={6}
                  icon={<i className="icon-search icon-size-one"></i>}
                  // required={customerDetailsField}
                  value={customerSection.MisysCode}
                  error={misysError}
                  helperText={misysErrMsg}
                  name="MisysCode"
                  onchange={mysisHandler}
                  click={mysisSearchHandler}
                />

                {customerDetailsField === true &&
                customer1DetailsField === false &&
                misysError === false &&
                customerSection.MisysCode === "" ? (
                  <ErrorBar errorText={"The Field is Empty"} />
                ) : null}
                {/* {mysisError === true && customerSection.MisysCode === "" ? (
                  <ErrorBar errorText={"The Field is Empty"} />
                ) : null} */}
              </div>
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <TextField
                size="small"
                label="IPartyID"
                fullWidth
                textLength={7}
                value={
                  customerSection.IPartyID != -1 &&
                  customerSection.IPartyID != null
                    ? customerSection.IPartyID
                    : null
                }
                name="IPartyID"
                disable
              />
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <TextField
                size="small"
                label="ECIB Code"
                fullWidth
                textLength={300}
                required={customerDetailsField}
                value={customerSection.ECIBCode}
                name="ECIBCode"
                disable
              />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextField
                name="BorrowerName"
                size="small"
                label="Borrower Name"
                fullWidth
                textLength={300}
                value={customerSection.BorrowerName}
                disable
                required={customerDetailsField}
              />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextField
                name="AddressOfBorrower"
                size="small"
                label="Address of the Borrower"
                fullWidth
                textLength={300}
                value={customerSection.BorrowerAddress}
                disable
                required={customerDetailsField}
              />
            </Grid>
            <Grid
              item
              // style={{
              //   padding: "-1%",
              // }}
              lg={12}
              md={12}
              sm={12}
            >
              <div className={styles["nbaCustomertablle"]} />

              <Table
                columns={columnCustomerDetail}
                scroll={{ x: "max-content" }}
                rows={customerSection.NBACaseCustomerAccountList}
                pagination={true}
              />
              <div className={styles["nbaCustomertablle"]} />
              <Grid item lg={12} md={12} sm={12} xs={12} align="center">
                {/* for update or add butto of customer sec */}
                {NBACaseCustomerListButton ? (
                  <Button
                    text={"Update Data"}
                    icon={<AddIcon />}
                    applyClass="btnSecondarySolid"
                    size="large"
                    click={UpdateCustomerDetails}
                  />
                ) : (
                  <Button
                    text={"Add Another Misys Code"}
                    icon={<AddIcon />}
                    applyClass="btnSecondarySolid"
                    size="large"
                    click={AddAnotherCustomerDetails}
                  />
                )}
              </Grid>
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <TextField
                size="small"
                label="Reference #"
                fullWidth
                disable
                textLength={7}
                name="NPLCode"
              />
            </Grid>
          </Grid>
        </Paper>

        <div className={styles["nbabusiness"]} />
        <Paper padding="2" className={styles["nbabusinessPaper"]}>
          <Grid
            item
            lg={4}
            md={4}
            sm={3}
            xs={12}
            className={styles["nbapaperbtm"]}
          >
            <h1 className={styles["nbabusinessSection"]}>
              Business Details Section
            </h1>
          </Grid>

          {/* <MultipleCustomerDetails/> */}
          <Grid container spacing={2}>
            <Grid
              item
              lg={5}
              md={5}
              sm={12}
              className={styles["nbabusinessTop"]}
            >
              <label>
                <b>Settlement Type</b>
              </label>
              <br />
              <Radio.Group
                required
                name="SettlementType"
                value={saveNewData.IsFullSettlement}
                onChange={custDatatMainHandler}
              >
                <Radio value={false}>Partial Settlement</Radio>
                <Radio value={true}>Full Settlement</Radio>
              </Radio.Group>
            </Grid>
            <Grid item lg={7} md={7} sm={12} xs={12}>
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
                placeholder={"Approval Authority"}
                fullWidth
                autoComplete="off"
                name="ApprovalAuthority"
                change={custDatatMainHandler}
                value={saveNewData.ApprovalAuthority}
                // required
              />

              {remarksApprovalMysis === true &&
              saveNewData.ApprovalAuthority === "" ? (
                <ErrorBar errorText={"The Field is Empty"} />
              ) : null}
            </Grid>
          </Grid>

          <div className={styles["nbaProperty"]}>
            {NBACasePropertyModelList.length > 0
              ? NBACasePropertyModelList.map((data, index) => {
                  return (
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <div className={styles["nbaCustomertablle"]} />
                      <MultipleBusinessDetails
                        list={data}
                        ind={index}
                        NBACasePropertyModelList={NBACasePropertyModelList}
                        setNBACasePropertyModelList={
                          setNBACasePropertyModelList
                        }
                        setupForms={setupForms}
                        editPreviousBDRecordHandler={() =>
                          editPreviousBDRecordHandler(data, index)
                        }
                        setCustomerAdjustmentField={setCustomerAdjustmentField}
                        setCustomerField={setCustomerField}
                      />
                    </Grid>
                  );
                })
              : console.log(
                  "businessDetailSection",
                  NBACasePropertyModelList.length
                )}
            <Grid container spacing={2}>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <h1 className={styles["nbapropetrysection"]}>
                  <b>Property Details Section</b>
                </h1>
              </Grid>

              <Grid
                item
                lg={5}
                md={5}
                sm={12}
                xs={12}
                className={styles["nbacharges"]}
              >
                <label>
                  <b className={styles["DEBTSearchNbaFonts"]}>
                    Select Property Type
                    {customerAdjustmentField ? (
                      <span className={styles["nbaaesterick"]}>*</span>
                    ) : null}
                  </b>
                </label>

                <SelectBox
                  name="PropertyType"
                  // label="Select Property Type"
                  option={propertyType}
                  placeholder={"Select Property Type"}
                  change={propertyTypeHandler}
                  value={propertyTypeName}
                  fullWidth
                  size="small"
                  // required={customerAdjustmentField}
                />
                {businessTextFields === true && propertyTypeName === "" ? (
                  <ErrorBar errorText={"The Field is Empty"} />
                ) : null}
              </Grid>
              <Grid
                item
                lg={7}
                md={7}
                sm={12}
                xs={12}
                className={styles["nbacharges"]}
              >
                <label>
                  <b className={styles["DEBTSearchNbaFonts"]}>
                    Details Of Property Acquired
                    {customerAdjustmentField ? (
                      <span className={styles["nbaaesterick"]}>*</span>
                    ) : null}
                  </b>
                </label>
                <TextField
                  name="PropertyAcquiredDetails"
                  change={nbaHandler}
                  value={businessDetailSection.PropertyAcquiredDetails}
                  size="small"
                  autoComplete="off"
                  placeholder="Details Of Property Acquired"
                  textLength={300}
                  // required={customerAdjustmentField}
                  fullWidth
                  // label={"Details Of Property Acquired"}
                />
                {businessTextFields === true &&
                businessDetailSection.PropertyAcquiredDetails === "" ? (
                  <ErrorBar errorText={"The Field is Empty"} />
                ) : null}
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <h2 className={styles["nbaAdjustmentsection"]}>
                  <b>Adjustment of DPS Amount</b>
                </h2>
              </Grid>
              <Grid
                item
                lg={6}
                md={6}
                sm={12}
                xs={12}
                className={styles["nbacharges"]}
              >
                <label>
                  <b className={styles["DEBTSearchNbaFonts"]}>
                    DPS Transaction Amount
                    {customerAdjustmentField ? (
                      <span className={styles["nbaaesterick"]}>*</span>
                    ) : null}
                  </b>
                </label>
                <FormattedInputs
                  name="DPSTransactionAmount"
                  size="small"
                  autoComplete="off"
                  // label={"DPS Transaction Amount"}
                  placeholder="DPS Transaction Amount"
                  textLength={(999, 999, 999, 999, 999, 999, 999)}
                  value={
                    businessDetailSection.DPSTransactionAmount === null ||
                    businessDetailSection.DPSTransactionAmount === -1
                      ? null
                      : NumberFormater(
                          businessDetailSection.DPSTransactionAmount
                        )
                  }
                  change={nbaAmountHandler}
                  fullWidth
                  // required={customerAdjustmentField}
                />
                {businessTextFields === true &&
                businessDetailSection.DPSTransactionAmount === -1 ? (
                  <ErrorBar errorText={"The Field is Empty"} />
                ) : null}
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Grid
                  item
                  lg={12}
                  md={12}
                  sm={12}
                  xs={12}
                  className={styles["nbacharges"]}
                >
                  <label>
                    <b className={styles["DEBTSearchNbaFonts"]}>
                      Principal Adjusted
                      {customerAdjustmentField ? (
                        <span className={styles["nbaaesterick"]}>*</span>
                      ) : null}
                    </b>
                  </label>
                  <FormattedInputs
                    name="PrincipalAdjusted"
                    size="small"
                    fullWidth
                    autoComplete="off"
                    placeholder="Principal Adjusted"
                    // label={"Principal Adjusted"}
                    textLength={(999, 999, 999, 999, 999, 999, 999)}
                    value={
                      businessDetailSection.PrincipalAdjusted === null ||
                      businessDetailSection.PrincipalAdjusted === -1
                        ? null
                        : NumberFormater(
                            businessDetailSection.PrincipalAdjusted
                          )
                    }
                    change={nbaAmountHandler}
                    // required={customerAdjustmentField}
                  />
                  {businessTextFields === true &&
                  businessDetailSection.PrincipalAdjusted === -1 ? (
                    <ErrorBar errorText={"The Field is Empty"} />
                  ) : null}
                </Grid>
                <Grid
                  item
                  lg={12}
                  md={12}
                  sm={12}
                  xs={12}
                  className={styles["nbacharges"]}
                >
                  <label>
                    <b className={styles["DEBTSearchNbaFonts"]}>
                      Markup Adjusted
                      {customerAdjustmentField ? (
                        <span className={styles["nbaaesterick"]}>*</span>
                      ) : null}
                    </b>
                  </label>
                  <FormattedInputs
                    name="MarkupAdjusted"
                    size="small"
                    fullWidth
                    autoComplete="off"
                    placeholder="Markup Adjusted"
                    // label={"Markup Adjusted"}
                    textLength={(999, 999, 999, 999, 999, 999, 999)}
                    value={
                      businessDetailSection.MarkupAdjusted === null ||
                      businessDetailSection.MarkupAdjusted === -1
                        ? null
                        : NumberFormater(businessDetailSection.MarkupAdjusted)
                    }
                    change={nbaAmountHandler}
                    // required={customerAdjustmentField}
                  />
                  {businessTextFields === true &&
                  businessDetailSection.MarkupAdjusted === -1 ? (
                    <ErrorBar errorText={"The Field is Empty"} />
                  ) : null}
                </Grid>
                <Grid
                  item
                  lg={12}
                  md={12}
                  sm={12}
                  xs={12}
                  className={styles["nbacharges"]}
                >
                  <label>
                    <b className={styles["DEBTSearchNbaFonts"]}>
                      Charges
                      {customerAdjustmentField ? (
                        <span className={styles["nbaaesterick"]}>*</span>
                      ) : null}
                    </b>
                  </label>
                  <FormattedInputs
                    name="Charges"
                    size="small"
                    autoComplete="off"
                    placeholder="Charges"
                    // label={"Charges"}
                    textLength={(999, 999, 999, 999, 999, 999, 999)}
                    value={
                      businessDetailSection.Charges === null ||
                      businessDetailSection.Charges === -1
                        ? null
                        : NumberFormater(businessDetailSection.Charges)
                    }
                    change={nbaAmountHandler}
                    // required={customerAdjustmentField}
                    fullWidth
                  />
                  {businessTextFields === true &&
                  businessDetailSection.Charges === -1 ? (
                    <ErrorBar errorText={"The Field is Empty"} />
                  ) : null}
                </Grid>
                <Grid
                  item
                  lg={12}
                  md={12}
                  sm={12}
                  xs={12}
                  className={styles["nbacharges"]}
                >
                  <FormattedInputs
                    name="TotalAdjustmentPMC"
                    size="small"
                    placeholder="Total Adjustment"
                    textLength={(999, 999, 999, 999, 999, 999, 999)}
                    fullWidth
                    label={"Total Adjustment"}
                    value={
                      businessDetailSection.TotalAdjustmentPMC === null ||
                      businessDetailSection.TotalAdjustmentPMC === -1
                        ? null
                        : NumberFormater(
                            businessDetailSection.TotalAdjustmentPMC
                          )
                    }
                    disable
                  />
                </Grid>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Grid
                  item
                  lg={12}
                  md={12}
                  sm={12}
                  xs={12}
                  className={styles["nbaDate"]}
                >
                  <label>
                    <b className={styles["nbaDateAcq"]}>
                      Date Of Acquisition
                      {customerAdjustmentField ? (
                        <span className={styles["nbaaesterick"]}>*</span>
                      ) : null}
                    </b>
                  </label>
                  <DatePicker
                    name="DateOfAcquisition"
                    size="large"
                    // required={customerAdjustmentField}
                    DateRange
                    value={
                      businessDetailSection.DateOfAcquisition != "" &&
                      businessDetailSection.DateOfAcquisition != "18000101"
                        ? DateDisplayFormat(
                            businessDetailSection.DateOfAcquisition
                          )
                        : ""
                    }
                    change={DateHandler}
                    placeholder="Date of Acquisition"
                    width="100%"
                  />
                  {businessTextFields === true &&
                  businessDetailSection.DateOfAcquisition === "18000101" ? (
                    <ErrorBar errorText={"The Field is Empty"} />
                  ) : null}
                </Grid>
                <Grid
                  item
                  lg={12}
                  md={12}
                  sm={12}
                  xs={12}
                  className={styles["nbacharges"]}
                >
                  <label>
                    <b className={styles["DEBTSearchNbaFonts"]}>
                      Acquired Value
                      {customerAdjustmentField ? (
                        <span className={styles["nbaaesterick"]}>*</span>
                      ) : null}
                    </b>
                  </label>
                  <FormattedInputs
                    name="AcquiredValue"
                    size="small"
                    autoComplete="off"
                    placeholder="Acquired Value"
                    // label={"Acquired Value"}
                    textLength={(999, 999, 999, 999, 999, 999, 999)}
                    value={
                      businessDetailSection.AcquiredValue === null ||
                      businessDetailSection.AcquiredValue === -1
                        ? null
                        : NumberFormater(businessDetailSection.AcquiredValue)
                    }
                    change={nbaAmountHandler}
                    // required={customerAdjustmentField}
                    fullWidth
                  />
                  {businessTextFields === true &&
                  businessDetailSection.AcquiredValue === -1 ? (
                    <ErrorBar errorText={"The Field is Empty"} />
                  ) : null}
                </Grid>
                <Grid
                  item
                  lg={12}
                  md={12}
                  sm={12}
                  xs={12}
                  className={styles["nbacharges"]}
                >
                  <label>
                    <b className={styles["DEBTSearchNbaFonts"]}>
                      Acquisition Charges
                      {customerAdjustmentField ? (
                        <span className={styles["nbaaesterick"]}>*</span>
                      ) : null}
                    </b>
                  </label>
                  <FormattedInputs
                    name="AcquisitionCharges"
                    size="small"
                    autoComplete="off"
                    // label={"Acquisition Charges"}
                    placeholder="Acquisition Charges"
                    textLength={(999, 999, 999, 999, 999, 999, 999)}
                    value={
                      businessDetailSection.AcquisitionCharges === null ||
                      businessDetailSection.AcquisitionCharges === -1
                        ? null
                        : NumberFormater(
                            businessDetailSection.AcquisitionCharges
                          )
                    }
                    change={nbaAmountHandler}
                    fullWidth
                    // required={customerAdjustmentField}
                  />
                  {businessTextFields === true &&
                  businessDetailSection.AcquisitionCharges === -1 ? (
                    <ErrorBar errorText={"The Field is Empty"} />
                  ) : null}
                </Grid>
                <Grid
                  item
                  lg={12}
                  md={12}
                  sm={12}
                  xs={12}
                  className={styles["nbacharges"]}
                >
                  <FormattedInputs
                    name="TotalValueDAA"
                    size="small"
                    placeholder="Total Value"
                    label={"Total Value"}
                    textLength={(999, 999, 999, 999, 999, 999, 999)}
                    value={
                      businessDetailSection.TotalValueDAA === null ||
                      businessDetailSection.TotalValueDAA === -1
                        ? null
                        : NumberFormater(businessDetailSection.TotalValueDAA)
                    }
                    fullWidth
                    disable
                  />
                </Grid>
              </Grid>
              <Grid
                item
                lg={12}
                md={12}
                sm={12}
                xs={12}
                className={styles["nbacharges"]}
              >
                <h1 className={styles["nbaAdjustmentsection"]}>
                  <b>Valuation Details</b>
                </h1>
              </Grid>

              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Grid
                  item
                  lg={12}
                  md={12}
                  sm={12}
                  xs={12}
                  className={styles["nbacharges"]}
                >
                  <label>
                    <b className={styles["DEBTSearchNbaFonts"]}>
                      Evaluator Name
                      {customerField ? (
                        <span className={styles["nbaaesterick"]}>*</span>
                      ) : null}
                    </b>
                  </label>

                  <TextField
                    name="EvaluatorName"
                    size="small"
                    placeholder="Evaluator Name"
                    textLength={300}
                    autoComplete="off"
                    // required={customerField}
                    change={nbaHandler}
                    value={valuationDetails.EvaluatorName}
                    fullWidth
                  />
                  {valuationTextFields === true &&
                  valuationDetails.EvaluatorName === "" ? (
                    <ErrorBar errorText={"The Field is Empty"} />
                  ) : null}
                </Grid>
                <Grid
                  item
                  lg={12}
                  md={12}
                  sm={12}
                  xs={12}
                  className={styles["nbacharges"]}
                >
                  <label>
                    <b className={styles["DEBTSearchNbaFonts"]}>
                      Land-Market Value
                      {customerField ? (
                        <span className={styles["nbaaesterick"]}>*</span>
                      ) : null}
                    </b>
                  </label>
                  <FormattedInputs
                    name="LandMarketValue"
                    size="small"
                    placeholder="Land-Market Value"
                    // label={"Land-Market Value"}
                    autoComplete="off"
                    // required={customerField}
                    textLength={(999, 999, 999, 999, 999, 999, 999)}
                    value={
                      valuationDetails.LandMarketValue === null ||
                      valuationDetails.LandMarketValue === -1
                        ? null
                        : NumberFormater(valuationDetails.LandMarketValue)
                    }
                    change={nbaAmountHandler}
                    fullWidth
                  />
                  {valuationTextFields === true &&
                  valuationDetails.LandMarketValue === -1 ? (
                    <ErrorBar errorText={"The Field is Empty"} />
                  ) : null}
                </Grid>
                <Grid
                  item
                  lg={12}
                  md={12}
                  sm={12}
                  xs={12}
                  className={styles["nbacharges"]}
                >
                  <label>
                    <b className={styles["DEBTSearchNbaFonts"]}>
                      Building-Market Value
                      {customerField ? (
                        <span className={styles["nbaaesterick"]}>*</span>
                      ) : null}
                    </b>
                  </label>
                  <FormattedInputs
                    name="BuildingMarketValue"
                    size="small"
                    placeholder="Building-Market Value"
                    // label={"Building-Market Value"}
                    autoComplete="off"
                    // required={customerField}
                    textLength={(999, 999, 999, 999, 999, 999, 999)}
                    value={
                      valuationDetails.BuildingMarketValue === null ||
                      valuationDetails.BuildingMarketValue === -1
                        ? null
                        : NumberFormater(valuationDetails.BuildingMarketValue)
                    }
                    change={nbaAmountHandler}
                    fullWidth
                  />
                  {valuationTextFields === true &&
                  valuationDetails.BuildingMarketValue === -1 ? (
                    <ErrorBar errorText={"The Field is Empty"} />
                  ) : null}
                </Grid>
                <Grid
                  item
                  lg={12}
                  md={12}
                  sm={12}
                  xs={12}
                  className={styles["nbacharges"]}
                >
                  <FormattedInputs
                    name="TotalMarketValue"
                    size="small"
                    placeholder="Total-Market Value"
                    textLength={200}
                    fullWidth
                    value={
                      valuationDetails.TotalMarketValue === null ||
                      valuationDetails.TotalMarketValue === -1
                        ? null
                        : NumberFormater(valuationDetails.TotalMarketValue)
                    }
                    label={"Total-Market Value"}
                    disable
                  />
                </Grid>
              </Grid>

              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Grid
                  item
                  lg={12}
                  md={12}
                  sm={12}
                  xs={12}
                  className={styles["nbaDate"]}
                >
                  <label>
                    <b className={styles["nbaDateAcq"]}>
                      Date Of Valuation
                      {customerField ? (
                        <span className={styles["nbaaesterick"]}>*</span>
                      ) : null}
                    </b>
                  </label>
                  <DatePicker
                    name="DateOfValuation"
                    size="large"
                    placeholder="Date Of Valuation"
                    // required={customerField}
                    DateRange
                    value={
                      valuationDetails.DateOfValuation != "" &&
                      valuationDetails.DateOfValuation != "18000101"
                        ? DateDisplayFormat(valuationDetails.DateOfValuation)
                        : null
                    }
                    change={DateHandler}
                    width="100%"
                  />
                  {valuationTextFields === true &&
                  valuationDetails.DateOfValuation === "18000101" ? (
                    <ErrorBar errorText={"The Field is Empty"} />
                  ) : null}
                </Grid>

                <Grid
                  item
                  lg={12}
                  md={12}
                  sm={12}
                  xs={12}
                  className={styles["nbacharges"]}
                >
                  <label>
                    <b className={styles["DEBTSearchNbaFonts"]}>
                      Land-Forced Sale Value
                      {customerField ? (
                        <span className={styles["nbaaesterick"]}>*</span>
                      ) : null}
                    </b>
                  </label>
                  <FormattedInputs
                    name="LandForcedSaleValue"
                    size="small"
                    // label={"Land-Forced Sale Value"}
                    placeholder="Land-Forced Sale Value"
                    textLength={(999, 999, 999, 999, 999, 999, 999)}
                    value={
                      valuationDetails.LandForcedSaleValue === null ||
                      valuationDetails.LandForcedSaleValue === -1
                        ? null
                        : NumberFormater(valuationDetails.LandForcedSaleValue)
                    }
                    change={nbaAmountHandler}
                    fullWidth
                    autoComplete="off"
                    // required={customerField}
                  />
                  {valuationTextFields === true &&
                  valuationDetails.LandForcedSaleValue === -1 ? (
                    <ErrorBar errorText={"The Field is Empty"} />
                  ) : null}
                </Grid>
                <Grid
                  item
                  lg={12}
                  md={12}
                  sm={12}
                  xs={12}
                  className={styles["nbacharges"]}
                >
                 <label>
                    <b className={styles["DEBTSearchNbaFonts"]}>
                      Building-Forced Sale Value
                      {customerField ? (
                        <span className={styles["nbaaesterick"]}>*</span>
                      ) : null}
                    </b>
                  </label>
                  <FormattedInputs
                    name="BuildingForcedSaleValue"
                    size="small"
                    placeholder="Building-Forced Sale Value"
                    // label={"Building-Forced Sale Value"}
                    autoComplete="off"
                    textLength={(999, 999, 999, 999, 999, 999, 999)}
                    value={
                      valuationDetails.BuildingForcedSaleValue === null ||
                      valuationDetails.BuildingForcedSaleValue === -1
                        ? null
                        : NumberFormater(
                            valuationDetails.BuildingForcedSaleValue
                          )
                    }
                    change={nbaAmountHandler}
                    fullWidth
                    // required={customerField}
                  />
                  {valuationTextFields === true &&
                  valuationDetails.BuildingForcedSaleValue === -1 ? (
                    <ErrorBar errorText={"The Field is Empty"} />
                  ) : null}
                </Grid>
                <Grid
                  item
                  lg={12}
                  md={12}
                  sm={12}
                  xs={12}
                  className={styles["nbacharges"]}
                >
                  <FormattedInputs
                    name="TotalForcedSaleValue"
                    size="small"
                    placeholder="Total-Forced Sale Value"
                    textLength={200}
                    fullWidth
                    value={
                      valuationDetails.TotalForcedSaleValue === null ||
                      valuationDetails.TotalForcedSaleValue === -1
                        ? null
                        : NumberFormater(valuationDetails.TotalForcedSaleValue)
                    }
                    label={"Total-Forced Sale Value"}
                    disable
                  />
                </Grid>

                {/* <Grid
                  item
                  lg={12}
                  md={12}
                  sm={12}
                  xs={12}
                  className={styles["landforceslae"]}
                >
                  <label>
                    <b  className={styles["DEBTSearchNbaFonts"]}>
                      Land-Forced Sale Value
                      {customerField ? (
                        <span  className={styles["nbaaesterick"]}>*</span>
                      ) : null}
                    </b>
                  </label>
                  <FormattedInputs
                    name="LandForcedSaleValue"
                    size="small"
                    // label={"Land-Forced Sale Value"}
                    placeholder="Land-Forced Sale Value"
                    textLength={(999, 999, 999, 999, 999, 999, 999)}
                    value={
                      valuationDetails.LandForcedSaleValue === null ||
                      valuationDetails.LandForcedSaleValue === -1
                        ? null
                        : NumberFormater(valuationDetails.LandForcedSaleValue)
                    }
                    change={nbaAmountHandler}
                    fullWidth
                    autoComplete="off"
                    // required={customerField}
                  />
                  {valuationTextFields === true &&
                  valuationDetails.LandForcedSaleValue === -1 ? (
                    <ErrorBar errorText={"The Field is Empty"} />
                  ) : null}
                </Grid>
                <Grid
                  item
                  lg={12}
                  md={12}
                  sm={12}
                  xs={12}
                  className={styles["landforceslae"]}
                >
                  <label>
                    <b className={styles["DEBTSearchNbaFonts"]}>
                      Building-Forced Sale Value
                      {customerField ? (
                        <span className={styles["nbaaesterick"]}>*</span>
                      ) : null}
                    </b>
                  </label>
                  <FormattedInputs
                    name="BuildingForcedSaleValue"
                    size="small"
                    placeholder="Building-Forced Sale Value"
                    // label={"Building-Forced Sale Value"}
                    autoComplete="off"
                    textLength={(999, 999, 999, 999, 999, 999, 999)}
                    value={
                      valuationDetails.BuildingForcedSaleValue === null ||
                      valuationDetails.BuildingForcedSaleValue === -1
                        ? null
                        : NumberFormater(
                            valuationDetails.BuildingForcedSaleValue
                          )
                    }
                    change={nbaAmountHandler}
                    fullWidth
                    // required={customerField}
                  />
                  {valuationTextFields === true &&
                  valuationDetails.BuildingForcedSaleValue === -1 ? (
                    <ErrorBar errorText={"The Field is Empty"} />
                  ) : null}
                </Grid>
                <Grid
                  item
                  lg={12}
                  md={12}
                  sm={12}
                  xs={12}
                  className={styles["totalForcesale"]}
                >
                  <FormattedInputs
                    name="TotalForcedSaleValue"
                    size="small"
                    placeholder="Total-Forced Sale Value"
                    textLength={200}
                    fullWidth
                    value={
                      valuationDetails.TotalForcedSaleValue === null ||
                      valuationDetails.TotalForcedSaleValue === -1
                        ? null
                        : NumberFormater(valuationDetails.TotalForcedSaleValue)
                    }
                    label={"Total-Forced Sale Value"}
                    disable
                  />
                </Grid> */}
              </Grid>

              {/* <Grid item lg={6} md={6} sm={12} xs={12}>
                <div style={{ marginTop: "20px" }} />
                <label>
                  <b style={{ fontSize: "0.7rem" }}>
                    Evaluator Name
                    {customerField ? (
                      <span style={{ color: "red" }}>*</span>
                    ) : null}
                  </b>
                </label>
                <TextField
                  name="EvaluatorName"
                  size="small"
                  placeholder="Evaluator Name"
                  textLength={300}
                  autoComplete="off"
                  // required={customerField}
                  change={nbaHandler}
                  value={valuationDetails.EvaluatorName}
                  fullWidth
                  // label={"Evaluator Name"}
                />
                {valuationTextFields === true &&
                valuationDetails.EvaluatorName === "" ? (
                  <ErrorBar errorText={"The Field is Empty"} />
                ) : null}
              </Grid>
              <Grid
                item
                lg={6}
                md={6}
                sm={6}
                xs={6}
                style={{ marginTop: "auto" }}
              >
                <label>
                  <b style={{ fontSize: "0.7rem" }}>
                    Date Of Valuation
                    {customerField ? (
                      <span style={{ color: "red" }}>*</span>
                    ) : null}
                  </b>
                </label>
                <DatePicker
                  name="DateOfValuation"
                  size="large"
                  placeholder="Date Of Valuation"
                  // required={customerField}
                  DateRange
                  value={
                    valuationDetails.DateOfValuation != "" &&
                    valuationDetails.DateOfValuation != "18000101"
                      ? DateDisplayFormat(valuationDetails.DateOfValuation)
                      : ""
                  }
                  change={DateHandler}
                  width="100%"
                />
                {valuationTextFields === true &&
                valuationDetails.DateOfValuation === "18000101" ? (
                  <ErrorBar errorText={"The Field is Empty"} />
                ) : null}
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <FormattedInputs
                  name="LandMarketValue"
                  size="small"
                  placeholder="Land-Market Value"
                  label={"Land-Market Value"}
                  autoComplete="off"
                  // required={customerField}
                  textLength={(999, 999, 999, 999, 999, 999, 999)}
                  value={
                    valuationDetails.LandMarketValue === null ||
                    valuationDetails.LandMarketValue === -1
                      ? null
                      : NumberFormater(valuationDetails.LandMarketValue)
                  }
                  change={nbaAmountHandler}
                  fullWidth
                />
                {valuationTextFields === true &&
                valuationDetails.LandMarketValue === -1 ? (
                  <ErrorBar errorText={"The Field is Empty"} />
                ) : null}
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <FormattedInputs
                  name="LandForcedSaleValue"
                  size="small"
                  label={"Land-Forced Sale Value"}
                  placeholder="Land-Forced Sale Value"
                  textLength={(999, 999, 999, 999, 999, 999, 999)}
                  value={
                    valuationDetails.LandForcedSaleValue === null ||
                    valuationDetails.LandForcedSaleValue === -1
                      ? null
                      : NumberFormater(valuationDetails.LandForcedSaleValue)
                  }
                  change={nbaAmountHandler}
                  fullWidth
                  autoComplete="off"
                  // required={customerField}
                />
                {valuationTextFields === true &&
                valuationDetails.LandForcedSaleValue === -1 ? (
                  <ErrorBar errorText={"The Field is Empty"} />
                ) : null}
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <FormattedInputs
                  name="BuildingMarketValue"
                  size="small"
                  placeholder="Building-Market Value"
                  label={"Building-Market Value"}
                  autoComplete="off"
                  // required={customerField}
                  textLength={(999, 999, 999, 999, 999, 999, 999)}
                  value={
                    valuationDetails.BuildingMarketValue === null ||
                    valuationDetails.BuildingMarketValue === -1
                      ? null
                      : NumberFormater(valuationDetails.BuildingMarketValue)
                  }
                  change={nbaAmountHandler}
                  fullWidth
                />
                {valuationTextFields === true &&
                valuationDetails.BuildingMarketValue === -1 ? (
                  <ErrorBar errorText={"The Field is Empty"} />
                ) : null}
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <FormattedInputs
                  name="BuildingForcedSaleValue"
                  size="small"
                  placeholder="Building-Forced Sale Value"
                  label={"Building-Forced Sale Value"}
                  autoComplete="off"
                  textLength={(999, 999, 999, 999, 999, 999, 999)}
                  value={
                    valuationDetails.BuildingForcedSaleValue === null ||
                    valuationDetails.BuildingForcedSaleValue === -1
                      ? null
                      : NumberFormater(valuationDetails.BuildingForcedSaleValue)
                  }
                  change={nbaAmountHandler}
                  fullWidth
                  // required={customerField}
                />
                {valuationTextFields === true &&
                valuationDetails.BuildingForcedSaleValue === -1 ? (
                  <ErrorBar errorText={"The Field is Empty"} />
                ) : null}
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <FormattedInputs
                  name="TotalMarketValue"
                  size="small"
                  placeholder="Total-Market Value"
                  textLength={200}
                  fullWidth
                  value={
                    valuationDetails.TotalMarketValue === null ||
                    valuationDetails.TotalMarketValue === -1
                      ? null
                      : NumberFormater(valuationDetails.TotalMarketValue)
                  }
                  label={"Total-Market Value"}
                  disable
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <FormattedInputs
                  name="TotalForcedSaleValue"
                  size="small"
                  placeholder="Total-Forced Sale Value"
                  textLength={200}
                  fullWidth
                  value={
                    valuationDetails.TotalForcedSaleValue === null ||
                    valuationDetails.TotalForcedSaleValue === -1
                      ? null
                      : NumberFormater(valuationDetails.TotalForcedSaleValue)
                  }
                  label={"Total-Forced Sale Value"}
                  disable
                />
              </Grid> */}

              <div className={styles["nbaUpdate"]} />
              <Grid item lg={12} md={12} sm={12} xs={12} align="center">
                {NBACaseValuationListButton ? (
                  <Button
                    text={"Update Data"}
                    icon={<AddIcon />}
                    applyClass="btnSecondarySolid"
                    size="large"
                    click={updateValuationDetailsRecord}
                  />
                ) : (
                  <Button
                    text={"Add Valuation"}
                    icon={<AddIcon />}
                    applyClass="btnSecondarySolid"
                    size="large"
                    click={AddAnotherValuation}
                  />
                )}
                {/* <Button
                  text={"Add Valuation"}
                  icon={<AddIcon />}
                  applyClass="btnSecondarySolid"
                  size="large"
                  click={AddAnotherValuation}
                /> */}
              </Grid>
              <Grid
                item
                className={styles["nbaupdatepading"]}
                lg={12}
                md={12}
                sm={12}
              >
                <div className={styles["nbaupdatemargin"]} />
                <Table
                  rows={businessDetailSection.PropertyEvaluatorBusinessList}
                  columns={columnCustomerDetail2}
                  scroll={{ x: "max-content" }}
                  pagination={true}
                />
              </Grid>

              <Grid item lg={4} md={4} sm={12} xs={12}>
                <TextField
                  type={"Number"}
                  name="NumberOfValuationsBusiness"
                  size="small"
                  placeholder="Number Of Valuation"
                  // width="100%"
                  className={styles["input-field-w100"]}
                  label={"Number Of Valuation"}
                  value={
                    businessDetailSection.NumberOfValuationsBusiness === null ||
                    businessDetailSection.NumberOfValuationsBusiness === -1
                      ? null
                      : CommaFormter(
                          businessDetailSection.NumberOfValuationsBusiness
                        )
                  }
                  disable
                />
              </Grid>

              <Grid item lg={4} md={4} sm={12} xs={12}>
                <TextField
                  name="AverageMarketValueBusiness"
                  size="small"
                  placeholder="Average Market Value"
                  label={"Average Market Value"}
                  width="100%"
                  fullWidth
                  value={
                    businessDetailSection.AverageMarketValueBusiness === null ||
                    businessDetailSection.AverageMarketValueBusiness === -1
                      ? null
                      : CommaFormter(
                          businessDetailSection.AverageMarketValueBusiness
                        )
                  }
                  disable
                />
              </Grid>

              <Grid item lg={4} md={4} sm={12} xs={12}>
                <TextField
                  name="AverageForcedSaleValueBusiness"
                  size="small"
                  placeholder="Average Forced Sale Value"
                  width="100%"
                  fullWidth
                  label={"Average Forced Sale Value"}
                  value={
                    businessDetailSection.AverageForcedSaleValueBusiness ===
                      null ||
                    businessDetailSection.AverageForcedSaleValueBusiness === -1
                      ? null
                      : CommaFormter(
                          businessDetailSection.AverageForcedSaleValueBusiness
                        )
                  }
                  disable
                />
              </Grid>

              <div className={styles["updateTopmargin"]} />
              <Grid item lg={12} md={12} sm={12} xs={12} align="center">
                {/* for update or add butto of Business sec */}
                {NBACaseBusinessListButton ? (
                  <Button
                    text={"Update Data"}
                    icon={<AddIcon />}
                    applyClass="btnSecondarySolid"
                    size="large"
                    click={UpdateBusinessDetails}
                  />
                ) : (
                  <Button
                    text={"Add Another Property"}
                    icon={<AddIcon />}
                    applyClass="btnSecondarySolid"
                    size="large"
                    click={AddAnotherProperty}
                  />
                )}
              </Grid>
            </Grid>
          </div>

          <div className={styles["updateTopmargin"]} />
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <label>
              <b className={styles["DEBTSearchNbaFonts"]}>
                Remarks
                {customerAdjustmentField ? (
                  <span className={styles["nbaaesterick"]}>*</span>
                ) : null}
              </b>
            </label>
            <TextField
              name="RemarksBusiness"
              size="large"
              autoComplete={"off"}
              placeholder="Remarks"
              textLength={500}
              // width="100%"
              className={styles["input-field-w100"]}
              // label={"Remarks"}
              // required={remarkss}
              value={saveNewData.RemarksBusiness}
              change={custDatatMainHandler}
            />
            {remarksApprovalMysis === true &&
            saveNewData.RemarksBusiness === "" ? (
              <ErrorBar errorText={"The Field is Empty"} />
            ) : null}
          </Grid>
        </Paper>

        <div className={styles["nbabusinessTop"]} />
        <Grid container spacing={2}>
          <Grid item lg={5} md={5} sm={12} xs={12} align="Right">
            <Button
              type="Submit"
              applyClass="btnBorderStyledBeach"
              text="Save"
              icon={<i className="icon-save icon-size-one"></i>}
              click={() =>
                setSaveNewData({ ...saveNewData, ["SendForApproval"]: 1 })
              }
            />
          </Grid>

          <Grid item lg={7} md={7} sm={12} xs={12} align="Left">
            <Button
              type="Submit"
              applyClass="btnBorderStyledBeach"
              text="Save & Send For Approval"
              icon={<i className="icon-sent icon-size-one"></i>}
              click={() =>
                setSaveNewData({ ...saveNewData, ["SendForApproval"]: 2 })
              }
            />
          </Grid>
        </Grid>
      </form>
      <Notification setOpen={setOpen} open={open.flag} message={open.message} />
      {nonBankingAssets.Loading ? <Loader /> : null}
    </>
  );
};

export default AddEditNBAAssetsDEBT;
