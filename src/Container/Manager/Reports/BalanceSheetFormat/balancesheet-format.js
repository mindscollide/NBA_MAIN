import React, { useState, useEffect } from "react";
import styles from "./style.module.css";
import { Typography, Space, Radio } from "antd";
import {
  SelectBox,
  Button,
  Table,
  StartToEndDate,
  Paper,
  FormattedInputs,
  TextField,
} from "../../../../Components/Elements";
import { useDispatch, useSelector } from "react-redux";
import {
  balanceSheetReport,
  balanceReportExcel,
} from "../../.././../store/actions/reports_actions";
import {  
  GetAdvanceClassification,
  } from "../../../../store/actions/setup-forms-actions";
import {DateDisplayFormat,DateSendingFormat,currentToOneYearBackDate,NumberFormater} from '../../../../Common/Functions/date-formatter'
import { columns } from "./data";
import { Row, Col } from "antd";

const BalanceSheetFormat = () => {
  const structure = {
    DateFrom: "",
    DateTO: "",
    AmountFrom: 0,
    AmountTo: 0,
    MiSysCustomerCode: "",
    BorrowserNPLCode: "",
    CNICNumber: "",
    NameOfSponsor: "",
    AdvanceClassificationID: "Select",
    ChargeOfType: 1,
  };
  var [rows, setRows] = useState([]);
  const [submitType, setsubmitType] = useState(1);
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { reports,setupForms } = state;
  const { Title } = Typography;

  // data states
  const [enableRadio, setEnableRadio] = useState(true);
  const [form, setForm] = useState({
    DateFrom: "",
    DateTO: "",
    AmountFrom: 0,
    AmountTo: 0,
    MiSysCustomerCode: "",
    BorrowserNPLCode: "",
    CNICNumber: "",
    NameOfSponsor: "",
    AdvanceClassificationID: "Select",
    ChargeOfType: 1,
  });

  const fieldsHandler = (e, val) => {
      let id = e.target.id !== undefined ? e.target.id : null;
      let name = e.target.name;
      let value = e.target.value;
      if (id && id.includes("AdvanceClassificationID")) {
        setForm({ ...form, ["AdvanceClassificationID"]: val.title });
      } 
       else {
        setForm({ ...form, [name]: value });
      }
  };
  const ammountFieldHandler = (e) =>{
    let name = e.target.name;
    let value = e.target.value;
    if(String(Number(e.target.value)).length<=17){
      setForm({ ...form, [name]: NumberFormater(value) });
    }
    else{
      console.log("Greater")
    }
  }
  const datehandler = (e, val) =>{
    if (e.name && e.name === "dater" && e.startDate!==null && e.endDate!==null) {
      setForm({ ...form, 
       DateTO: DateSendingFormat(e.startDate), 
       DateFrom:DateSendingFormat(e.endDate)});
   }
   else{
    setForm({ ...form, 
      DateTO: "", 
      DateFrom:""});
   }
  }
  const CNIChandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if(!value==""){
      if(Number(value)){
        setForm({ ...form, [name]: value });
      }
      else{
        console.log("Please Enter Valid CNIC")
      }
    }
    console.log(form)
  };
  const handleSubmit = (e,submitType) => {
    e.preventDefault();
    // make api call here
    let tempData = { ...form };
    // console.log(tempData);
  
    if (tempData.AdvanceClassificationID === "Select") {
      tempData.AdvanceClassificationID = 0;
    } else {
      let AdvanceClassificationIDIndex = setupForms.ClassificationOfAdvances.findIndex(x=>x.title===tempData.AdvanceClassificationID)
      tempData.AdvanceClassificationID = setupForms.ClassificationOfAdvances[AdvanceClassificationIDIndex].id;
    }
  
    // format date as per Api
    // tempData.DateFrom = DateSendingFormat(tempData.DateFrom);
    // tempData.DateTO = DateSendingFormat(tempData.DateTO);
    console.log(tempData)
    if(submitType===1){
      console.log("Search")
     dispatch(balanceSheetReport(tempData));
    }
    else if(submitType===2){
     console.log("Export")
      dispatch(balanceReportExcel(tempData))
    }
  };
  useEffect(() => {
    if (form.AdvanceClassificationID === "Charged Off") {
      setEnableRadio(false);
      setForm({ ...form, ChargeOfType: 2 });
    } else if (form.AdvanceClassificationID !== "Charged Off") {
      setEnableRadio(true);
      setForm({ ...form, ChargeOfType: 1 });
    }
  }, [form.AdvanceClassificationID]);

  // add keys in rows and set the rows in state
  useEffect(() => {
    var addedKey, data;
    if (reports.isRecordFound) {
      data = [...reports.balanceSheetReport];

      addedKey = data.map((item, index) => {
        return { ...item, key: index };
      });
    }
    setRows(addedKey);
    console.log("balcne",addedKey)

    // setForm(JSON.parse(JSON.stringify(structure)));
  }, [reports.balanceSheetReport]);
  useEffect(() => {
    let { toThisDate, fromThisDate } = currentToOneYearBackDate("YYYYMMDD");
    if(toThisDate!==undefined && fromThisDate!==undefined){
      setForm({ ...form, DateTO: toThisDate, DateFrom: fromThisDate });
      }
    dispatch(GetAdvanceClassification())
  }, [])
  return (
    <form onSubmit={(e)=>handleSubmit(e,submitType)}>
      <>
        <Paper padding="2">
          <Row gutter={[8, 8]}>
            <Col xl={18} lg={18} sm={24}>
              <Title level={3}>Balance Sheet Format</Title>
            </Col>
            <Col xl={6} lg={6} sm={24} align="right">
              <Space>
                <Button
                  type="submit"
                  click={()=>setsubmitType(2)}
                  applyClass="transparentBtn"
                  text="Export To Excel"
                  icon={<i className="icon-export-excel icon-size-one"></i>}
                />
              </Space>
              <br />
              <br />
            </Col>
            <div className={styles["m-top"]} />
            {/* Row 2 */}
            <Row gutter={[8, 8]}>
              <Col xl={8} lg={8} sm={24}>
                <label>
                  <b>Date Of WriteOff</b>
                </label>
                <br />
                <StartToEndDate
                  change={datehandler}
                  wudth="100%!important"
                  size="large"
                  startvalue={form.DateFrom!==null && form.DateFrom!==""? DateDisplayFormat(form.DateFrom):''}
                  endvalue={form.DateTO!==null && form.DateFrom!=="" ?DateDisplayFormat(form.DateTO):''}
                  DateRange={true}
                />
              </Col>
              <Col xl={8} lg={8} sm={24}>
                <label>
                  <b>Amount</b>
                </label>
                <br />
                <div style={{ display: "flex" }}>
                  <FormattedInputs
                    placeholder="From"
                    fullWidth
                    label={null}
                    size="small"
                    name="AmountFrom"
                    value={form.AmountFrom}
                    change={ammountFieldHandler}
                  />
                  <FormattedInputs
                    placeholder="To"
                    fullWidth
                    label={null}
                    size="small"
                    name="AmountTo"
                    value={form.AmountTo}
                    change={ammountFieldHandler}
                  />
                </div>
              </Col>
              <Col xl={8} lg={8} sm={24}>
                <label>
                  <b>MISYS Customer Code</b>
                </label>
                <br />
                <TextField
                  // required
                  name="MiSysCustomerCode"
                  value={form.MiSysCustomerCode}
                  change={fieldsHandler}
                  fullWidth
                  label={null}
                  size="small"
                />
              </Col>
              <div className={styles["m-top"]} />
              <Col xl={6} lg={6} sm={24}>
                <label>
                  <b>Borrower NPL Code</b>
                </label>
                <br />
                <TextField
                  name="BorrowserNPLCode"
                  value={form.BorrowserNPLCode}
                  change={fieldsHandler}
                  label={null}
                  size="small"
                  fullWidth
                />
              </Col>
              <Col xl={6} lg={6} sm={24}>
                <label>
                  <b>CNIC Number</b>
                </label>
                <br />
                <TextField
                  textLength={13}
                  name="CNICNumber"
                  value={form.CNICNumber}
                  change={CNIChandler}
                  fullWidth
                  minLength={13}
                  label={null}
                  size="small"
                />
              </Col>
              <Col xl={6} lg={6} sm={24}>
                <label>
                  <b>Name of Sponsor / Owner</b>
                </label>
                <br />
                <TextField
                  name="NameOfSponsor"
                  value={form.NameOfSponsor}
                  change={fieldsHandler}
                  fullWidth
                  label={null}
                  size="small"
                />
              </Col>
              <Col xl={6} lg={6} sm={24}>
                <label>
                  <b>Classification of Advance</b>
                </label>
                <br />
                <SelectBox
                  name="AdvanceClassificationID"
                  value={form.AdvanceClassificationID}
                  change={fieldsHandler}
                  label={null}
                  option={setupForms.ClassificationOfAdvances}
                  propertyName={"title"}
                />
              </Col>
            </Row>
            {/* Row 03 */}
            <Row gutter={[8, 8]}>
              <Col xl={8} lg={8} sm={24} align="left">
                <label>
                  <b>Charge Off</b>
                </label>
                <br />
                <Radio.Group
                  onChange={fieldsHandler}
                  name="ChargeOfType"
                  value={form.ChargeOfType}
                >
                  <Radio disabled={enableRadio} value={2}>
                    New Charge-Off
                  </Radio>
                  <Radio disabled={enableRadio} value={3}>
                    Old Charge-Off
                  </Radio>
                </Radio.Group>
              </Col>
              <Col xl={6} lg={6} sm={24}>
                <div className={styles["m-to0p"]} />
                <Button
                  applyClass="btnMiniPrimary"
                  text="Search"
                  icon={<i className="icon-search icon-size-one"></i>}
                  click={()=>setsubmitType(1)}
                  type="submit"
                />
              </Col>
              <Col xl={24} lg={24} sm={24} className={styles["m-to0ppp"]}>
                <Table
                  rows={rows}
                  columns={columns}
                  scroll={{ x: "max-content" }}
                />
              </Col>
            </Row>
          </Row>
        </Paper>
      </>
    </form>
  );
};

export default BalanceSheetFormat;
