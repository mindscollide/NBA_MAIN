import React, { useEffect, useState, useRef } from "react";
import {
  Grid,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

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
import styles from "../DERASC.module.css";
import {
  DateDisplayFormat,
  DateSendingFormat,
  NumberFormater,
  CommaFormter,
  removeDashesFromDate,
} from "../../../Common/Functions/date-formatter";
import MultipleCustomerDetails from "../../DEBT-NonBankingAssets/AddEditNonBankingAssets/multiple-customer-details";

const NBAREMVIEW = ({
  list,
  saveNewDataList,
  setNBACaseCustomerList,
  NBACaseCustomerList,
  NBACasePropertyModelList,
  DPAOptionValueList,
  disabledDOUS,
  scopevaluationDetailsREM,
  propertyTypeHandler,
  propertyTypeName,
  desktopvaluationDetailsREM,
}) => {
  const [expanded, setExpanded] = useState(true);
console.log("NBAREMVIEW",expanded,expanded === "panel1")
  const handleChange = (panel) => (event, IsExpanded) => {
    setExpanded(IsExpanded ? panel : false);
  };
  const removeNewRecordHandler = (ind) => {
    let previousArray = [...NBACaseCustomerList];
    previousArray.splice(ind, 1);
    setNBACaseCustomerList(previousArray);
  };

  const [ dateTransfer, setDateTransfer] = useState({
    TitleTransferDate: "18000101",
  })

  const RascDateHandler=(e)=>{
    let name = e.target.name;
    let value = e.target.value;

    if (
      name === "TitleTransferDate" &&
      value != "" &&
      value != "18000101"
    ) {
      setDateTransfer({
        ...dateTransfer,
        [name]: DateSendingFormat(value),
      });
    } else if (
      name === "TitleTransferDate" &&
      (value === "" || value === "18000101")
    ) {
      setDateTransfer({
        ...dateTransfer,
        [name]: "18000101",
      });
    }
  }

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
  console.log(
    "NBACasePropertyModelList NBACasePropertyModelList",
    NBACasePropertyModelList,NBACasePropertyModelList.TitleTransferDate
  );
  return (
    <>
      <Accordion
        expanded={expanded }
        onChange={handleChange("panel1")}
        // expanded={true }
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: "100%", flexShrink: 0 }}>
            Real Estate Management
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className={styles["typography-width"]}>
            <Paper  className={styles["nbaCustomerview-paper"]}>
              <Grid container spacing={2} className={styles["nbaCustomerview-padding"]}>
                <Grid item lg={4} md={4} sm={12} xs={12}>
                  <div>
                    <div className={styles["nbaRSMpropertyAcquired"]}></div>
                    <SelectBox
                      name="DetailsofPropertyAcquired"
                      label="Details of Property Acquired"
                      fullWidth
                      option={DPAOptionValueList}
                      change={propertyTypeHandler}
                      value={propertyTypeName}
                      placeholder="Details of Property Acquired"
                      size="small"
                    />
                  </div>
                </Grid>
                <Grid
                  item
                  lg={4}
                  md={4}
                  sm={12}
                  xs={12}
                  // style={{ marginTop: "auto" }}
                >
                  <label>
                    <b className={styles["nbaRSMTitleTransfer"]}>
                      Title Transfer Date
                    </b>
                  </label>
                  <DatePicker
                    name="TitleTransferDate"
                    size="large"
                    placeholder="Title Transfer Date"
                    // change={RascDateHandler}
                    value={
                      NBACasePropertyModelList.TitleTransferDate != "18000101" &&
                      NBACasePropertyModelList.TitleTransferDate != ""
                        ? DateDisplayFormat(
                          NBACasePropertyModelList.TitleTransferDate
                          )
                        : ""
                    }
                    DateRange
                    width="100%"
                    disable={true}
                  />
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12}>
                  <div className={styles["nbaRSMpropertyAcquired"]}></div>
                  <TextField
                    size="small"
                    label={"Current Use of the Assets"}
                    fullWidth
                    placeholder="Current Use of the Assets"
                    textLength={300}
                    name="CurrentUseOfAsset"
                    value={NBACasePropertyModelList.CurrentUseOfAsset}
                    // change={realEstateManagementHandler}
                    disable={true}
                  />
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12}>
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
                        : NumberFormater(
                            NBACasePropertyModelList.RevaluatedAmount
                          )
                    }
                    fullWidth
                    disable={true}
                  />
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12}>
                  <div  className={styles["nbaRSMpropertyAcquired"]}></div>
                  <TextField
                    name="StrategyForDisposal"
                    size="small"
                    fullWidth
                    placeholder="Strategy For Disposal"
                    label={"Strategy For Disposal"}
                    textLength={300}
                    value={NBACasePropertyModelList.StrategyForDisposal}
                    disable={true}
                  />
                </Grid>
                <Grid item lg={4} md={4} sm={12}  className={styles["nbaRSMpropertyAcquired"]}>
                  <label>
                    <b>Disposed Off / Own Use</b>
                  </label>
                  <br />
                  <Radio.Group
                    name="DisposalOwnUseStatus"
                    value={NBACasePropertyModelList.DisposalOwnUseStatus}
                    disable={true}
                  >
                    <Radio disabled value={1}>
                      Disposed Off
                    </Radio>
                    <Radio disabled value={2}>
                      Own Use
                    </Radio>
                  </Radio.Group>
                </Grid>
                <Grid
                  item
                  lg={4}
                  md={4}
                  sm={12}
                  xs={12}
                >
                  <label>
                    <b className={styles["Remarkslabel"]}>
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
                    disable={true}
                    DateRange
                    // width="100%"
                    className={styles["input-field-w100"]}
                    // disable={disabledDOUS}
                  />
                </Grid>
                <Grid item lg={5} md={5} sm={12} xs={12}>
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
                    fullWidth
                    disable={true}
                  />
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <div
                    className={styles["nbaRSMFullScope"]}
                  >
                    <Grid container spacing={2} className={styles["nbaCustomerview-padding"]}>
                      <Grid item lg={6} md={6} sm={12} xs={12}>
                        <h1
                          className={styles["nbaRSMFullScope-h1"]}
                        >
                          <b>Full Scope Valuation Detail</b>
                        </h1>
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} className={styles["nbaCustomerview-padding"]}>
                      <Grid
                        item
                        
                        lg={12}
                        md={12}
                        sm={12}
                      >
                        <div className={styles["nbaviewBusinesDetails-remarks"]} />

                        <Table
                          columns={scopevaluationDetailsREM}
                          rows={
                            NBACasePropertyModelList.PropertyFullEvaluatorREMList
                          }
                          scroll={{ x: "max-content" }}
                          pagination={true}
                        />
                      </Grid>

                      {/* <Grid item lg={4} md={4} sm={12} xs={12}>
                    <TextField
                      type={"Number"}
                      name="NumberOfValuationBusiness"
                      size="small"
                      placeholder="Number Of Valuation"
                      width="100%"
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
                  </Grid>

                  <Grid item lg={4} md={4} sm={12} xs={12}>
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
                  </Grid>

                  <Grid item lg={4} md={4} sm={12} xs={12}>
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
                  </Grid> */}
                    </Grid>
                  </div>
                  {/* Desktop Valuation Detail */}
                  <div
                   className={styles["nbaviewBusinesDetails"]}
                  >
                    <Grid container spacing={2} className={styles["nbaCustomerview-padding"]}>
                      <Grid item lg={6} md={6} sm={12} xs={12}>
                        <h1
                          className={styles["nbaRSMFullScope-h1"]}
                        >
                          <b>Desktop Valuation Detail</b>
                        </h1>
                      </Grid>
                      {/* <Grid item lg={6} md={6} sm={12} xs={12} align="Right">
                    <Button
                      text={"Add Another Valuation"}
                      icon={<AddIcon />}
                      applyClass="btnSecondarySolid"
                      click={AddAnotherValuationDesktopValuationDetail}
                      size="large"
                    />
                  </Grid> */}
                    </Grid>

                    <Grid container spacing={2} className={styles["nbaCustomerview-padding"]}>
                      <Grid
                        item
                        
                        lg={12}
                        md={12}
                        sm={12}
                      >
                        <div className={styles["nbaviewBusinesDetails-remarks"]}/>
                        <Table
                          columns={desktopvaluationDetailsREM}
                          rows={
                            NBACasePropertyModelList.PropertyDesktopEvaluatorList
                          }
                          scroll={{ x: "max-content" }}
                          pagination={true}
                        />
                      </Grid>

                      {/* <Grid item lg={4} md={4} sm={12} xs={12}>
                    <TextField
                      type={"Number"}
                      name="NumberOfValuationBusiness"
                      size="small"
                      placeholder="Number Of Valuation"
                      width="100%"
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
                  </Grid>

                  <Grid item lg={4} md={4} sm={12} xs={12}>
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
                  </Grid>

                  <Grid item lg={4} md={4} sm={12} xs={12}>
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
                  </Grid> */}
                    </Grid>
                  </div>
                </Grid>
              </Grid>
            </Paper>
            <div className={styles["RASCheading"]} />

            <Grid item lg={12} md={12} sm={12} xs={12}>
              <TextField
                name="Remarks"
                size="large"
                placeholder="Remarks"
                textLength={300}
                // width="100%"
                className={styles["input-field-w100"]}
                label={"Remarks"}
                value={saveNewDataList.RemarksREM}
                disable={true}
              />
            </Grid>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default NBAREMVIEW;
