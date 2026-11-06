import React from "react";
import { DatePicker, Typography } from "antd";
import styles from "./datepicker.module.css";
import dayjs from "dayjs";
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
}) => {
  const { Text } = Typography;
  let dateFormat = "DD-MM-YYYY";
  function onChange(date, dateString) {
    change({ target: { name: name, value: dateString } });
  }

  const disabledDate = (value) => {
    return value && value > dayjs().endOf("day");
  };
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Text>{label}</Text>
      <DatePicker
        disabledDate={DateRange ? disabledDate : false}
        disabled={disable}
        format={dateFormat}
        value={value ? dayjs(value, dateFormat) : null}
        placeholder={placeholder}
        onChange={onChange}
        size={size}
        width={`${width}`}
        className={styles["textfieldsize"]}
      />
    </div>
  );
};
export default CustomDatePicker;
