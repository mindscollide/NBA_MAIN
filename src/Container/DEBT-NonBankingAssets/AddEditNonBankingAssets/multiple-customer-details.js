import React, { useEffect, useState, useRef } from "react";
import styles from "../DEBT.module.css";

import { Typography, Radio, Tooltip } from "antd";
import dayjs from "dayjs";
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
import { Row, Col } from "antd";
import { Accordion, AccordionSummary, AccordionDetails } from "../../../Components/Elements/Accordion/accordion";
import { DownOutlined as ExpandMoreIcon } from "@ant-design/icons";

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
                <div align="right">
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
                </div>
                <Row gutter={[16, 16]} className={styles["nbaCustomerpadding"]}>
                  <Col xl={8} lg={8} sm={24} xs={24}>
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
                  </Col>
                  <Col xl={8} lg={8} sm={24} xs={24}>
                    <TextField
                      size="small"
                      label="IPartyID"
                      fullWidth
                      textLength={7}
                      value={list.IPartyID}
                      name="IPartyID"
                      disable
                    />
                  </Col>
                  <Col xl={8} lg={8} sm={24} xs={24}>
                    <TextField
                      size="small"
                      label="ECIB Code"
                      fullWidth
                      textLength={300}
                      value={list.ECIBCode}
                      name="ECIBCode"
                      disable
                    />
                  </Col>
                  <Col xl={12} lg={12} sm={24} xs={24}>
                    <TextField
                      name="BorrowerName"
                      size="small"
                      label="Borrower Name"
                      fullWidth
                      value={list.BorrowerName}
                      textLength={300}
                      disable
                    />
                  </Col>
                  <Col xl={12} lg={12} sm={24} xs={24}>
                    <TextField
                      name="AddressOfBorrower"
                      size="small"
                      label="Address of the Borrower"
                      fullWidth
                      value={list.BorrowerAddress}
                      textLength={300}
                      disable
                    />
                  </Col>
                  <Col xl={24} lg={24} sm={24} className={styles["nbaupdatepading"]}>
                    <div className={styles["updateTopmargin"]} />
                    <Table
                      columns={columnCustomerDetail}
                      scroll={{ x: "max-content" }}
                      rows={list.NBACaseCustomerAccountList}
                      pagination={true}
                    />
                  </Col>
                </Row>
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
                <div align="right">
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
                </div>
                <Row gutter={[16, 16]} className={styles["nbaCustomerpadding"]}>
                  <Col xl={8} lg={8} sm={24} xs={24}>
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
                  </Col>
                  <Col xl={8} lg={8} sm={24} xs={24}>
                    <TextField
                      size="small"
                      label="IPartyID"
                      fullWidth
                      textLength={7}
                      value={list.IPartyID}
                      name="IPartyID"
                      disable
                    />
                  </Col>
                  <Col xl={8} lg={8} sm={24} xs={24}>
                    <TextField
                      size="small"
                      label="ECIB Code"
                      fullWidth
                      textLength={300}
                      value={list.ECIBCode}
                      name="ECIBCode"
                      disable
                    />
                  </Col>
                  <Col xl={12} lg={12} sm={24} xs={24}>
                    <TextField
                      name="BorrowerName"
                      size="small"
                      label="Borrower Name"
                      fullWidth
                      value={list.BorrowerName}
                      textLength={300}
                      disable
                    />
                  </Col>
                  <Col xl={12} lg={12} sm={24} xs={24}>
                    <TextField
                      name="AddressOfBorrower"
                      size="small"
                      label="Address of the Borrower"
                      fullWidth
                      value={list.BorrowerAddress}
                      textLength={300}
                      disable
                    />
                  </Col>
                  <Col xl={24} lg={24} sm={24} className={styles["nbaupdatepading"]}>
                    <div className={styles["updateTopmargin"]} />
                    <Table
                      columns={columnCustomerDetail}
                      scroll={{ x: "max-content" }}
                      rows={list.NBACaseCustomerAccountList}
                      pagination={true}
                    />
                  </Col>
                </Row>
              </Paper>
            </Typography>
          </AccordionDetails>
        </Accordion>
      )}
    </>
  );
};

export default MultipleCustomerDetails;
