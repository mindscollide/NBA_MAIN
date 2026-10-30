import { Checkbox } from "antd";
import styles from "../checklist.module.css";
function onChange(checkedValues) {
  console.log("checked = ", checkedValues);
}

// const Styles={
//  parentCheckBox:{
//   color: "#025f5c",
//   fontWeight: "600",
//  },
//  childCheckbox:{
//    marginTop:10
//  }
// }

const CheckBoxesList = () => {
  return (
    <>
      <Checkbox.Group className={styles["checklist"]} onChange={onChange}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Checkbox value="CaptureWriteOff">
            <span  className={styles["parentCheckBox"]}
            // style={Styles.parentCheckBox}
            > Capture Write Off</span>
          </Checkbox>
          <Checkbox value="AddWriteOff" className={styles["childCheckbox"]}
          // style={Styles.childCheckbox}
          >Add Write Off</Checkbox>
          <Checkbox value="EditWriteOff" className={styles["childCheckbox"]}
          //  style={Styles.childCheckbox}
           >Edit Write Off</Checkbox>
        </div>
      </Checkbox.Group>

      <div className={styles["M-top"]} />
      <Checkbox.Group className={styles["width"]} onChange={onChange}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Checkbox value="Reports">
            <span className={styles["parentCheckBox"]} 
            // style={Styles.parentCheckBox}
            >Reports</span>
          </Checkbox>
          <Checkbox value="CompleteReport" className={styles["childCheckbox"]}
          // style={Styles.childCheckbox}
          >Complete Report</Checkbox>
          <Checkbox value="Credit Policy" className={styles["childCheckbox"]}
          // style={Styles.childCheckbox}
          >Credit Policy</Checkbox>
          <Checkbox value="Balance Sheet Format"  className={styles["childCheckbox"]}
          // style={Styles.childCheckbox}
          >Balance Sheet Format</Checkbox>
        </div>
      </Checkbox.Group>
      <div className={styles["M-top"]} />
      <Checkbox.Group className={styles["width"]} onChange={onChange}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Checkbox value="Audit rail">
            <span 
            className={styles["parentCheckBox"]}
            // style={Styles.parentCheckBox}
            > Audit Trail</span>
          </Checkbox>
          <Checkbox value="UserActivity" 
          className={styles["childCheckbox"]}
          // style={Styles.childCheckbox}
          >User Activity</Checkbox>
          <Checkbox value="UserLoginHistory" 
          className={styles["childCheckbox"]}
          // style={Styles.childCheckbox}
          >User Login History</Checkbox>
          <Checkbox value="CurrentlyLoggedinUsers"
          className={styles["childCheckbox"]} 
          // style={Styles.childCheckbox}
          >
            Currently Logged in Users
          </Checkbox>
        </div>
      </Checkbox.Group>
    </>
  );
};

export default CheckBoxesList;
