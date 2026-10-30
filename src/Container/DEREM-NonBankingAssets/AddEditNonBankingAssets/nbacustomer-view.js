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
import MultipleCustomerDetails from "../../DEBT-NonBankingAssets/AddEditNonBankingAssets/multiple-customer-details";

const NBACustomerDetailsVIEW = ({list,saveNewData,setNBACaseCustomerList,NBACaseCustomerList,view}) => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, IsExpanded) => {
    setExpanded(IsExpanded ? panel : false);
  };
  const removeNewRecordHandler = (ind) => {
    let previousArray = [...NBACaseCustomerList];
    previousArray.splice(ind, 1);
    setNBACaseCustomerList(previousArray);
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
          Customer Details Section
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className={styles["typography"]}>
          <Paper className={styles["derempaper"]}>
          

          {/* {NBACaseCustomerList.length>0?
          <MultipleCustomerDetails/>:null} */}
          <Grid container spacing={2} className={styles["derempd"]}>
            {NBACaseCustomerList.length > 0
              ? NBACaseCustomerList.map((data, index) => {
                  return (
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <div className={styles["papertop"]} />
                      <MultipleCustomerDetails
                        list={data}
                        ind={index}
                        setNBACaseCustomerList={setNBACaseCustomerList}
                        NBACaseCustomerList={NBACaseCustomerList}
                        view={true}
                      />
                    </Grid>
                  );
                })
              : null}
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <TextField
                size="small"
                label="Reference #"
                fullWidth
                value={saveNewData.ReferenceNumber}
                disable
                textLength={7}
                name="NPLCode"
              />
            </Grid>
          </Grid>
        </Paper>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default NBACustomerDetailsVIEW;