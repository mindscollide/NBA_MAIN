import React, { useEffect, useState, useRef } from "react";
import {
  Grid,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
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

const MultipleCustomerDetails = ({
  list,
  ind,
  setNBACaseCustomerList,
  NBACaseCustomerList,
  view,
  collaps,
  editPreviousRecordHandler,
  setCustomerDetailsField,
  editView,
  setCustomer1DetailsField,
  setEditMisysView,
}) => {
  const [expanded, setExpanded] = useState(true);

  const handleChange = (panel) => (event, IsExpanded) => {
    console.log("handleChange", panel, IsExpanded);
    setExpanded(IsExpanded ? panel : false);
  };
  const removeNewRecordHandler = (ind) => {
    let previousArray = [...NBACaseCustomerList];
    previousArray.splice(ind, 1);
    if (
      previousArray != undefined &&
      previousArray != null &&
      Object.keys(previousArray).length > 0
    ) {
      setCustomerDetailsField(false);
      setCustomer1DetailsField(true);
    } else {
      setCustomer1DetailsField(true);
      setCustomerDetailsField(true);
    }
    setNBACaseCustomerList(previousArray);
  };
  console.log("List cust", list);
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

  return (
    <>
      {editView === true ? (
        <Accordion
          // expanded={expanded === "panel1"}
          // defaultExpanded={true}
          expanded={expanded}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ width: "100%", flexShrink: 0 }}>
              {list.BorrowerName}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className={styles["typographywidth"]}>
              <Paper className={styles["nbaPaper"]}>
                <Box align="right">
                  <Tooltip title="Delete" color={"Red"}>
                    {/* {ind  && ( */}
                    {view === true ? null : (
                      <>
                        <i
                           className={`${"icon-edit icon-size-one beachGreen"} ${styles["Onlycursor"]}`}
                          // style={{ cursor: "pointer" }}
                          color="error"
                          onClick={() => {
                            editPreviousRecordHandler(list, ind);
                            setExpanded(false);
                            setEditMisysView(false);
                          }}
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
                <Grid container spacing={2} className={styles["nbaCustomerpadding"]}>
                  <Grid item lg={4} md={4} sm={12} xs={12}>
                    <TextField
                      size="small"
                      label="Misys Customer Code"
                      fullWidth
                      textLength={7}
                      value={list.MisysCode}
                      name="MisysCode"
                      disable
                    />
                    {/* <div>
                <InputWithBtn
                  isUpperCase={true}
                  label="Misys Customer Code"
                  fullWidth
                  textFieldSize="small"
                  autoComplete="off"
                  applyClass="search"
                  textLength={6}
                  minLength={6}
                  value={list.MisysCode}
                  icon={<i className="icon-search icon-size-one"></i>}
                  name="MisysCode"
                  disable={true}
                />
              </div> */}
                  </Grid>
                  <Grid item lg={4} md={4} sm={12} xs={12}>
                    <TextField
                      size="small"
                      label="IPartyID"
                      fullWidth
                      textLength={7}
                      value={list.IPartyID}
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
                      value={list.ECIBCode}
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
                      value={list.BorrowerName}
                      textLength={300}
                      disable
                    />
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <TextField
                      name="AddressOfBorrower"
                      size="small"
                      label="Address of the Borrower"
                      fullWidth
                      value={list.BorrowerAddress}
                      textLength={300}
                      disable
                    />
                  </Grid>
                  <Grid
                    item
                    className={styles["nbaupdatepading"]}
                    lg={12}
                    md={12}
                    sm={12}
                  >
                    <div className={styles["updateTopmargin"]} />
                    <Table
                      columns={columnCustomerDetail}
                      scroll={{ x: "max-content" }}
                      rows={list.NBACaseCustomerAccountList}
                      pagination={true}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Typography>
          </AccordionDetails>
        </Accordion>
      ) : (
        <Accordion
          // expanded={expanded === "panel1"}
          // defaultExpanded={true}
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ width: "100%", flexShrink: 0 }}>
              {list.BorrowerName}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className={styles["typographywidth"]}>
              <Paper pclassName={styles["nbaPaper"]}>
                <Box align="right">
                  <Tooltip title="Delete" color={"Red"}>
                    {/* {ind  && ( */}
                    {view === true ? null : (
                      <>
                        <i
                          className={`${"icon-edit icon-size-one beachGreen"} ${styles["Onlycursor"]}`}
                          // style={{ cursor: "pointer" }}
                          color="error"
                          onClick={() => {
                            editPreviousRecordHandler(list, ind);
                            setExpanded(false);
                          }}
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
                <Grid container spacing={2} className={styles["nbaCustomerpadding"]}>
                  <Grid item lg={4} md={4} sm={12} xs={12}>
                    <TextField
                      size="small"
                      label="Misys Customer Code"
                      fullWidth
                      textLength={7}
                      value={list.MisysCode}
                      name="MisysCode"
                      disable
                    />
                    {/* <div>
                <InputWithBtn
                  isUpperCase={true}
                  label="Misys Customer Code"
                  fullWidth
                  textFieldSize="small"
                  autoComplete="off"
                  applyClass="search"
                  textLength={6}
                  minLength={6}
                  value={list.MisysCode}
                  icon={<i className="icon-search icon-size-one"></i>}
                  name="MisysCode"
                  disable={true}
                />
              </div> */}
                  </Grid>
                  <Grid item lg={4} md={4} sm={12} xs={12}>
                    <TextField
                      size="small"
                      label="IPartyID"
                      fullWidth
                      textLength={7}
                      value={list.IPartyID}
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
                      value={list.ECIBCode}
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
                      value={list.BorrowerName}
                      textLength={300}
                      disable
                    />
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <TextField
                      name="AddressOfBorrower"
                      size="small"
                      label="Address of the Borrower"
                      fullWidth
                      value={list.BorrowerAddress}
                      textLength={300}
                      disable
                    />
                  </Grid>
                  <Grid
                    item
                   className={styles["nbaupdatepading"]}
                    lg={12}
                    md={12}
                    sm={12}
                  >
                    <div className={styles["updateTopmargin"]} />
                    <Table
                      columns={columnCustomerDetail}
                      scroll={{ x: "max-content" }}
                      rows={list.NBACaseCustomerAccountList}
                      pagination={true}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Typography>
          </AccordionDetails>
        </Accordion>
      )}
    </>
  );
};

export default MultipleCustomerDetails;
