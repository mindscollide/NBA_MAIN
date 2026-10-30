import React, { useEffect, useState, useRef } from "react";
import {
  Grid,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import styles from "../DEREM.module.css";

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
import MultipleBusinessDetails from "../../DEBT-NonBankingAssets/AddEditNonBankingAssets/multiple-business-details";
const NBABusinessDetailsVIEW = ({list,NBACasePropertyModelList,saveNewData,setupForms,
  setNBACasePropertyModelList,view}) => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, IsExpanded) => {
    setExpanded(IsExpanded ? panel : false);
  };

console.log("REMCasePropertyModelList",NBACasePropertyModelList)
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
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon/>}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: "100%", flexShrink: 0 }}>
          Business Details Section
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className={styles["typography"]}>
          <Paper padding="2" className={styles["paperbckgrnd"]}>
          <Grid container spacing={2}>
            <Grid item lg={5} md={5} sm={12} className={styles["topderem"]}>
              <label>
                <b>Settlement Type</b>
              </label>
              <br />
              <Radio.Group
                name="SettlementType"
                value={saveNewData.IsFullSettlement}
                disable={true}
                
              >
                <Radio disabled value={false}>Partial Settlement</Radio>
                <Radio disabled value={true}>Full Settlement</Radio>
              </Radio.Group>
            </Grid>
            <Grid item lg={7} md={7} sm={12} xs={12}>
              <div className={styles["topderem"]} />
              <TextField
                label="Approval Authority"
                size="small"
                textLength={200}
                fullWidth
                autoComplete="off"
                name="ApprovalAuthority"
                value={saveNewData.ApprovalAuthority}
                // required
                disable
              />
            </Grid>
          </Grid>

          <div
            className={styles["deremstyle"]}
          >
            {NBACasePropertyModelList.length > 0
              ? NBACasePropertyModelList.map((data, index) => {
                {console.log("REMCasePropertyModelList",data)}
                  return (
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <div className={styles["papertop"]} />
                      <MultipleBusinessDetails
                        list={data}
                        ind={index}
                        NBACasePropertyModelList={NBACasePropertyModelList}
                        setNBACasePropertyModelList={
                          setNBACasePropertyModelList
                        }
                        setupForms={setupForms}
                        view={true}
                      />
                    </Grid>
                  );
                })
              : null}
          </div>

          <div className={styles["evatop"]} />
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <TextField
              name="RemarksBusiness"
              size="large"
              placeholder="Remarks"
              textLength={300}
              width="100%"
              label={"Remarks"}
              // required={remarkss}
              disable
              value={saveNewData.RemarksBusiness}
            />
          </Grid>
        </Paper>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default NBABusinessDetailsVIEW;