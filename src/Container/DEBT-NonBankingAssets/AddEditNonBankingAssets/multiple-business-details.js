import React, { useEffect, useState, useRef } from "react";
import {
  Grid,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import styles from "../DEBT.module.css";

import AddIcon from "@material-ui/icons/Add";
import { Typography, Radio, Tooltip } from "antd";
import moment from "moment";
import {
  Paper,
  InputWithBtn,
  TextField,
  SelectBox,
  DatePicker,
  Button,
  FancyBox,
  FancyBoxSection,
  ConsolidateBox,
  Notification,
  Message,
  Loader,
  Table,
  NumberFormatCustom,
  FormattedInputs,
} from "../../../Components/Elements";
import { useSelector, useDispatch } from "react-redux";
import {
  DateDisplayFormat,
  DateSendingFormat,
  NumberFormater,
  CommaFormter,
  removeDashesFromDate,
} from "../../../Common/Functions/date-formatter";

const MultipleBusinessDetails = ({
  list,
  ind,
  setNBACasePropertyModelList,
  NBACasePropertyModelList,
  setupForms,
  view,
  editPreviousBDRecordHandler,
  editView,
  seteditBusinessView,
  setCustomerField,
  setCustomerAdjustmentField,
}) => {
  const [expanded, setExpanded] = useState(true);

  const [propertyTypeName, setPropertyTypeName] = useState("");

  const handleChange = (panel) => (event, IsExpanded) => {
    console.log("panel",panel);
    setExpanded(IsExpanded ? panel : false);
    
  };

  const removeNewRecordHandler = (ind) => {
    let previousArray = [...NBACasePropertyModelList];
    previousArray.splice(ind, 1);
    setNBACasePropertyModelList(previousArray);
    if(previousArray.length===0){
    setCustomerField(true);
  setCustomerAdjustmentField(true);}
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
    
  ];
  console.log("list", list);

  useEffect(() => {
    let namePropertyType = setupForms.PropertyTypeData;
    console.log("namePropertyType", namePropertyType);
    console.log("namePropertyType", list);
    namePropertyType.map((data, index) => {
      if (list.PropertyType === data.pK_PropertyTypeID) {
        let id = data.pK_PropertyTypeID;
        console.log("namePropertyType", data.title);
        setPropertyTypeName(data.title);
      }
    });
  }, [list]);
  return (
    <>
     {editView===true?
      <Accordion
      expanded={expanded }
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: "100%", flexShrink: 0 }}>
            {list.PropertyAcquiredDetails != ""
              ? list.PropertyAcquiredDetails
              : null}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className={styles["typographywidth"]}>
            <Paper padding="2" className={styles["nbabusinessPaper"]}>
              <Box align="right">
                <Tooltip title="Delete" color={"Red"}>
                  {/* {ind  && ( */}
                  {view === true ? null : (
                    <>
                     <i
                      className={`${"icon-edit icon-size-one beachGreen"} ${styles["Onlycursor"]}`}
                      // style={{ cursor: "pointer" }}
                      color="error"
                      onClick={() => {editPreviousBDRecordHandler(list, ind);setExpanded(false);seteditBusinessView(false)}}
                    />
                     <i
                      className={`${"icon-trash icon-size-one pdfRed"} ${styles["Onlycursor"]}`}
                      // style={{ cursor: "pointer" }}
                      color="error"
                      onClick={() => removeNewRecordHandler(ind)}
                    />
                    </>
                   
                    
                  )}

                  {/* )} */}
                </Tooltip>
              </Box>
              <div
                className={styles["nbaProperty"]}
              >
                <Grid container spacing={2}>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <h1
                       className={styles["nbapropetrysection"]}
                    >
                      <b>Property Details Section</b>
                    </h1>
                  </Grid>
                  <Grid item lg={5} md={5} sm={12} xs={12}>
                    <SelectBox
                      name="Select Property Type"
                      label="Select Property Type"
                      fullWidth
                      size="small"
                      value={propertyTypeName}
                      disable
                    />
                  </Grid>
                  <Grid item lg={7} md={7} sm={12} xs={12}>
                    <TextField
                      name="DetailsOfPropertyAcquired"
                      size="small"
                      autoComplete="off"
                      placeholder="Details Of Property Acquired"
                      textLength={300}
                      fullWidth
                      value={list.PropertyAcquiredDetails}
                      disable
                      label={"Details Of Property Acquired"}
                    />
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <h2
                     className={styles["nbaAdjustmentsection"]}
                    >
                      <b>Adjustment of DPS Amount</b>
                    </h2>
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <FormattedInputs
                      name="DPSTransactionAmount"
                      size="small"
                      autoComplete="off"
                      label={"DPS Transaction Amount"}
                      placeholder="DPS Transaction Amount"
                      textLength={(999, 999, 999, 999, 999, 999, 999)}
                      fullWidth
                      value={list.DPSTransactionAmount}
                      disable
                    />
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <FormattedInputs
                      name="PrincipalAdjusted"
                      size="small"
                      fullWidth
                      autoComplete="off"
                      placeholder="Principal Adjusted"
                      label={"Principal Adjusted"}
                      value={list.PrincipalAdjusted}
                      disable
                      textLength={(999, 999, 999, 999, 999, 999, 999)}
                    />
                  </Grid>
                  <Grid
                    item
                    lg={6}
                    md={6}
                    sm={12}
                    xs={12}
                    // style={{ marginTop: "auto" }}
                  >
                    <label>
                      <b className={styles["DEBTSearchNbaFonts"]}>Date Of Acquisition</b>
                    </label>
                    <DatePicker
                    
                      name="DateAcquisition"
                      size="large"
                      placeholder="Date of Acquisition"
                      width="100%"
                      value={
                        list.DateOfAcquisition
                          ? DateDisplayFormat(list.DateOfAcquisition)
                          : null
                      }
                      // value={list.DateOfAcquisition}
                      disable
                    />
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <FormattedInputs
                      name="MarkupAdjusted"
                      size="small"
                      fullWidth
                      autoComplete="off"
                      placeholder="Markup Adjusted"
                      label={"Markup Adjusted"}
                      textLength={(999, 999, 999, 999, 999, 999, 999)}
                      value={list.MarkupAdjusted}
                      disable
                    />
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <FormattedInputs
                      name="AcquiredValue"
                      size="small"
                      autoComplete="off"
                      placeholder="Acquired Value"
                      label={"Acquired Value"}
                      textLength={(999, 999, 999, 999, 999, 999, 999)}
                      fullWidth
                      value={list.AcquiredValue}
                      disable
                    />
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <FormattedInputs
                      name="Charges"
                      size="small"
                      autoComplete="off"
                      placeholder="Charges"
                      label={"Charges"}
                      fullWidth
                      value={list.Charges}
                      disable
                    />
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <FormattedInputs
                      name="AcquisitionCharges"
                      size="small"
                      autoComplete="off"
                      label={"Acquisition Charges"}
                      placeholder="Acquisition Charges"
                      textLength={(999, 999, 999, 999, 999, 999, 999)}
                      fullWidth
                      value={list.AcquisitionCharges}
                      disable
                    />
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <TextField
                      name="TotalAdjustmentPMC"
                      size="small"
                      placeholder="Total Adjustment"
                      fullWidth
                      label={"Total Adjustment"}
                      value={CommaFormter(list.TotalAdjustmentPMC)}
                      disable
                    />
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <TextField
                      name="TotalValueDAA"
                      size="small"
                      placeholder="Total Value"
                      label={"Total Value"}
                      fullWidth
                      value={CommaFormter(list.TotalValueDAA)}
                      disable
                    />
                  </Grid>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <h1
                      className={styles["nbaAdjustmentsection"]}
                    >
                      <b>Valuation Details</b>
                    </h1>
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
                      rows={list.PropertyEvaluatorBusinessList}
                      columns={columnCustomerDetail2}
                      scroll={{ x: "max-content" }}
                      pagination={true}
                    />
                  </Grid>

                  <Grid item lg={4} md={4} sm={12} xs={12}>
                    <TextField
                      name="NumberOfValuationsBusiness"
                      size="small"
                      placeholder="Number Of Valuation"
                      // width="100%"
                      className={styles["input-field-w100"]}
                      value={
                        list.NumberOfValuationsBusiness === null ||
                        list.NumberOfValuationsBusiness === -1
                          ? null
                          : CommaFormter(list.NumberOfValuationsBusiness)
                      }
                      label={"Number Of Valuation"}
                      disable
                    />
                  </Grid>
                  <Grid item lg={4} md={4} sm={12} xs={12}>
                    <TextField
                      name="AverageMarketValueBusiness"
                      size="small"
                      placeholder="Average Market Value"
                      // width="100%"
                      className={styles["input-field-w100"]}
                      label={"Average Market Value"}
                      value={
                        list.AverageMarketValueBusiness === null ||
                        list.AverageMarketValueBusiness === -1
                          ? null
                          : CommaFormter(list.AverageMarketValueBusiness)
                      }
                      disable
                    />
                  </Grid>

                  <Grid item lg={4} md={4} sm={12} xs={12}>
                    <TextField
                      name="AverageForcedSaleValueBusiness"
                      size="small"
                      placeholder="Average Forced Sale Value"
                      // width="100%"
                      className={styles["input-field-w100"]}
                      label={"Average Forced Sale Value"}
                      value={
                        list.AverageForcedSaleValueBusiness === null ||
                        list.AverageForcedSaleValueBusiness === -1
                          ? null
                          : CommaFormter(list.AverageForcedSaleValueBusiness)
                      }
                      disable
                    />
                  </Grid>

                 
                </Grid>
              </div>
            </Paper>
          </Typography>
        </AccordionDetails>
      </Accordion>:
      <Accordion
      expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: "100%", flexShrink: 0 }}>
            {list.PropertyAcquiredDetails != ""
              ? list.PropertyAcquiredDetails
              : null}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className={styles["typographywidth"]}>
            <Paper padding="2" className={styles["nbabusinessPaper"]}>
              <Box align="right">
                <Tooltip title="Delete" color={"Red"}>
                  {/* {ind  && ( */}
                  {view === true ? null : (
                    <>
                     <i
                      className={`${"icon-edit icon-size-one beachGreen"} ${styles["Onlycursor"]}`}
                      // style={{ cursor: "pointer" }}
                      color="error"
                      onClick={() => {editPreviousBDRecordHandler(list, ind);setExpanded(false)}}
                    />
                     <i
                      className={`${"icon-trash icon-size-one pdfRed"} ${styles["Onlycursor"]}`}
                      // style={{ cursor: "pointer" }}
                      color="error"
                      onClick={() => removeNewRecordHandler(ind)}
                    />
                    </>
                   
                    
                  )}

                  {/* )} */}
                </Tooltip>
              </Box>
              <div
                className={styles["nbaProperty"]}
              >
                <Grid container spacing={2}>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <h1
                       className={styles["nbapropetrysection"]}
                    >
                      <b>Property Details Section</b>
                    </h1>
                  </Grid>
                  <Grid item lg={5} md={5} sm={12} xs={12}>
                    <SelectBox
                      name="Select Property Type"
                      label="Select Property Type"
                      fullWidth
                      size="small"
                      value={propertyTypeName}
                      disable
                    />
                  </Grid>
                  <Grid item lg={7} md={7} sm={12} xs={12}>
                    <TextField
                      name="DetailsOfPropertyAcquired"
                      size="small"
                      autoComplete="off"
                      placeholder="Details Of Property Acquired"
                      textLength={300}
                      fullWidth
                      value={list.PropertyAcquiredDetails}
                      disable
                      label={"Details Of Property Acquired"}
                    />
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <h2
                      className={styles["nbaAdjustmentsection"]}
                    >
                      <b>Adjustment of DPS Amount</b>
                    </h2>
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <FormattedInputs
                      name="DPSTransactionAmount"
                      size="small"
                      autoComplete="off"
                      label={"DPS Transaction Amount"}
                      placeholder="DPS Transaction Amount"
                      textLength={(999, 999, 999, 999, 999, 999, 999)}
                      fullWidth
                      value={list.DPSTransactionAmount}
                      disable
                    />
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <FormattedInputs
                      name="PrincipalAdjusted"
                      size="small"
                      fullWidth
                      autoComplete="off"
                      placeholder="Principal Adjusted"
                      label={"Principal Adjusted"}
                      value={list.PrincipalAdjusted}
                      disable
                      textLength={(999, 999, 999, 999, 999, 999, 999)}
                    />
                  </Grid>
                  <Grid
                    item
                    lg={6}
                    md={6}
                    sm={12}
                    xs={12}
                    // style={{ marginTop: "auto" }}
                  >
                    <label>
                      <b className={styles["DEBTSearchNbaFonts"]}>Date Of Acquisition</b>
                    </label>
                    <DatePicker
                      
                      name="DateAcquisition"
                      size="large"
                      placeholder="Date of Acquisition"
                      width="100%"
                      value={
                        list.DateOfAcquisition
                          ? DateDisplayFormat(list.DateOfAcquisition)
                          : null
                      }
                      // value={list.DateOfAcquisition}
                      disable
                    />
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <FormattedInputs
                      name="MarkupAdjusted"
                      size="small"
                      fullWidth
                      autoComplete="off"
                      placeholder="Markup Adjusted"
                      label={"Markup Adjusted"}
                      textLength={(999, 999, 999, 999, 999, 999, 999)}
                      value={list.MarkupAdjusted}
                      disable
                    />
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <FormattedInputs
                      name="AcquiredValue"
                      size="small"
                      autoComplete="off"
                      placeholder="Acquired Value"
                      label={"Acquired Value"}
                      textLength={(999, 999, 999, 999, 999, 999, 999)}
                      fullWidth
                      value={list.AcquiredValue}
                      disable
                    />
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <FormattedInputs
                      name="Charges"
                      size="small"
                      autoComplete="off"
                      placeholder="Charges"
                      label={"Charges"}
                      fullWidth
                      value={list.Charges}
                      disable
                    />
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <FormattedInputs
                      name="AcquisitionCharges"
                      size="small"
                      autoComplete="off"
                      label={"Acquisition Charges"}
                      placeholder="Acquisition Charges"
                      textLength={(999, 999, 999, 999, 999, 999, 999)}
                      fullWidth
                      value={list.AcquisitionCharges}
                      disable
                    />
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <TextField
                      name="TotalAdjustmentPMC"
                      size="small"
                      placeholder="Total Adjustment"
                      fullWidth
                      label={"Total Adjustment"}
                      value={CommaFormter(list.TotalAdjustmentPMC)}
                      disable
                    />
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <TextField
                      name="TotalValueDAA"
                      size="small"
                      placeholder="Total Value"
                      label={"Total Value"}
                      fullWidth
                      value={CommaFormter(list.TotalValueDAA)}
                      disable
                    />
                  </Grid>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <h1
                      className={styles["nbaAdjustmentsection"]}
                    >
                      <b>Valuation Details</b>
                    </h1>
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
                      rows={list.PropertyEvaluatorBusinessList}
                      columns={columnCustomerDetail2}
                      scroll={{ x: "max-content" }}
                      pagination={true}
                    />
                  </Grid>

                  <Grid item lg={4} md={4} sm={12} xs={12}>
                    <TextField
                      name="NumberOfValuationsBusiness"
                      size="small"
                      placeholder="Number Of Valuation"
                      width="100%"
                      value={
                        list.NumberOfValuationsBusiness === null ||
                        list.NumberOfValuationsBusiness === -1
                          ? null
                          : CommaFormter(list.NumberOfValuationsBusiness)
                      }
                      label={"Number Of Valuation"}
                      disable
                    />
                  </Grid>

                  <Grid item lg={4} md={4} sm={12} xs={12}>
                    <TextField
                      name="AverageMarketValueBusiness"
                      size="small"
                      placeholder="Average Market Value"
                      width="100%"
                      label={"Average Market Value"}
                      value={
                        list.AverageMarketValueBusiness === null ||
                        list.AverageMarketValueBusiness === -1
                          ? null
                          : CommaFormter(list.AverageMarketValueBusiness)
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
                      label={"Average Forced Sale Value"}
                      value={
                        list.AverageForcedSaleValueBusiness === null ||
                        list.AverageForcedSaleValueBusiness === -1
                          ? null
                          : CommaFormter(list.AverageForcedSaleValueBusiness)
                      }
                      disable
                    />
                  </Grid>
                </Grid>
              </div>
            </Paper>
          </Typography>
        </AccordionDetails>
      </Accordion>}
    </>
  );
};

export default MultipleBusinessDetails;
