import React, { useEffect, useState, useRef } from "react";

import { Typography, Radio, Tooltip } from "antd";
import styles from "../DERASC.module.css";
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
import MultipleCustomerDetails from "../../DEBT-NonBankingAssets/AddEditNonBankingAssets/multiple-customer-details";
import { Row, Col } from "antd";
import { Accordion, AccordionSummary, AccordionDetails } from "../../../Components/Elements/Accordion/accordion";
import { DownOutlined as ExpandMoreIcon } from "@ant-design/icons";

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
          <Typography className={styles["typography-width"]}>
          <Paper  className={styles["nbaCustomerview-paper"]}>
          

          {/* {NBACaseCustomerList.length>0?
          <MultipleCustomerDetails/>:null} */}
          <Row gutter={[16, 16]} className={styles["nbaCustomerview-padding"]}>
            {NBACaseCustomerList.length > 0
              ? NBACaseCustomerList.map((data, index) => {
                  return (
                    <Col xl={24} lg={24} sm={24} xs={24}>
                      <MultipleCustomerDetails
                        list={data}
                        ind={index}
                        setNBACaseCustomerList={setNBACaseCustomerList}
                        NBACaseCustomerList={NBACaseCustomerList}
                        view={true}
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
          </Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default NBACustomerDetailsVIEW;