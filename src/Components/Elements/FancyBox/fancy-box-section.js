import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import { Space, Tooltip } from "antd";
import { Notification } from "../Notifications";
import {
  NumberFormatCustom,
  FormattedInputs,
} from "../FormatedInput/FormatedInput";
import { Table } from "..";
import { Row, Col } from "antd";
const FancyBoxSection = ({
  DatePicker,
  AccountDetailsHandler,
  setAccountSancationInfo,
  hide,
  SectionDetails,
  disable,
  DateDisplayFormat,
  calculatorBoxhandler,
  AccountSancationInfo,
  state,
  columns,
}) => {
  const isDisable = disable && styles.disable;
  const [State, setstate] = useState({
    open: true,
    message: "",
  });

  
  console.log("AccountSancationInfo fancy", AccountSancationInfo);
console.log("SectionDetails fancy",SectionDetails)
  useEffect(() => {
    if (state) {
      if (state.ABNSOutstandingPrincipal > state.FRAPrincipal) {
        state.APBSOutstandingPrincipal =
          state.ABNSOutstandingPrincipal - state.FRAPrincipal;
      } else {
        state.APBSOutstandingPrincipal = 0;
      }
      if (state.ABNSOutstandingNominal > state.FRANominated) {
        state.APBSOutstandingNominal =
          state.ABNSOutstandingNominal - state.FRANominated;
      } else {
        state.APBSOutstandingNominal = 0;
      }
      if (state.ABNSOutstandingNonAccural > state.FRANonAccural) {
        state.APBSOutstandingNonAccural =
          state.ABNSOutstandingNonAccural - state.FRANonAccural;
      } else {
        state.APBSOutstandingNonAccural = 0;
      }
      if (state.ABNSOtherCharges > state.FRAOtherCharges) {
        state.APBSOtherCharges = state.ABNSOtherCharges - state.FRAOtherCharges;
      } else {
        state.APBSOtherCharges = 0;
      }
      if (state.ABNSPenalInterest > state.FRAPenalInterest) {
        state.APBSPenalInterest =
          state.ABNSPenalInterest - state.FRAPenalInterest;
      } else {
        state.APBSPenalInterest = 0;
      }
    }
  }, [state ? state : ""]);
  return (
    <Row gutter={[16, 16]} className={styles["fancyStyle"]}>
      <Notification
        setOpen={setstate}
        open={State.open}
        message={State.message}
      />
      <Col xl={24} lg={24} sm={24}>
        <div className={styles.sectionConsolidated}>
          <div className={styles.box}>
            <div className={styles.boxHeading + " " + isDisable}>
              {"Sanction Details"}
            </div>
            <div className={styles.contentbox}>
              {hide?null:
              <Row gutter={[16, 16]}>
              <Col xl={12} lg={12} sm={24} xs={24}>
                <div className={styles["fancyTop"]} />
                <DatePicker
                  change={AccountDetailsHandler}
                  name="lrDate"
                  size="large"
                  width="100%"
                  DateRange
                  value={
                    SectionDetails.lrDate
                      ? DateDisplayFormat(SectionDetails.lrDate)
                      : ""
                  }
                  placeholder={"Sanction/Last Renewal Date"}
                />
              </Col>
              <Col xl={12} lg={12} sm={24} xs={24}>
                <FormattedInputs
                  change={calculatorBoxhandler}
                  name="lrAmount"
                  size="small"
                  label="Sanction/Last Renewal Amount"
                  fullWidth
                  numLength={15}
                  value={SectionDetails.lrAmount===0?null:SectionDetails.lrAmount}
                />
              </Col>
            </Row>}
              
              <div  className={styles["fancyTopp"]} />
              <Col xl={24} lg={24} sm={24} xs={24}>
                <Table
                  rows={AccountSancationInfo}
                  columns={columns}
                  scroll={{ x: "max-content" }}
                />
              </Col>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default FancyBoxSection;
