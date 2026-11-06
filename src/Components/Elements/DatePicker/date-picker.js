import React from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import styles from "../field.module.css";

const CustomDatePicker = ({
  label,
  width,
  size,
  placeholder,
  change,
  name,
  disable,
  value,
  DateRange,
  required,
}) => {
  let dateFormat = "DD-MM-YYYY";
  function onChange(date, dateString) {
    change({ target: { name: name, value: dateString } });
  }

  const disabledDate = (value) => {
    return value && value > dayjs().endOf("day");
  };
  // Every picker gets a floating label chip, as in Fraud main. Callers that
  // only pass a placeholder (e.g. "Date of Write off *") get it as the chip,
  // with a trailing "*" shown as the red required asterisk.
  const chipSource = label || placeholder || "";
  const chipRequired = required || /\*\s*$/.test(chipSource);
  const chip = chipSource.replace(/\s*\*\s*$/, "");
  return (
    <>
      <div className={chip ? styles.wrapper : undefined}
        style={{ display: "flex", alignItems: "center" }}>
        {chip ? (
          <span className={styles.floatingLabel}>
            {chip}
            {chipRequired ? <span className={styles.required}> *</span> : null}
          </span>
        ) : null}
        <DatePicker
          disabledDate={DateRange ? disabledDate : false}
          disabled={disable}
          format={dateFormat}
          value={value ? dayjs(value, dateFormat) : null}
          placeholder={label ? placeholder : "Select date"}
          onChange={onChange}
          size={size}
          // callers pass e.g. "100%!important", which is not a valid inline style
        // value (the browser drops it); keep just the width, default full width
        style={{ width: width ? String(width).replace("!important", "").trim() : "100%" }}
          required={required}
        />
      </div>
    </>
  );
};
export default CustomDatePicker;
