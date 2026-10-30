import React from "react";
import styles from "./styles.module.css";
import { Button } from "antd";
import TextField from "../InputFields/TextField/text-field";

const InputWithBtn = ({
  click,
  ref,
  label,
  icon,
  text,
  placeholder,
  applyClass,
  helperText,
  textFieldSize,
  btnSize,
  fullWidth,
  error,
  endIcon,
  textLength,
  required,
  onchange,
  value,
  name,
  disable,
  classpas,
  isUpperCase,
  type,
  size,
}) => {
  return (
    <div style={{ display: "flex" }}>
      {/* flex:1 so the input fills all space the Button doesn't need */}
      <div style={{ flex: 1 }}>
        <TextField
          placeholder={placeholder ? placeholder : null}
          classpass={classpas}
          type={type ? type : null}
          isUpperCase={isUpperCase}
          disable={disable ? true : false}
          ref={ref}
          name={name}
          value={value}
          change={onchange}
          helper={helperText}
          size={textFieldSize}
          label={label}
          fullWidth={fullWidth}
          error={error && error}
          textLength={textLength}
          required={required}
        />
      </div>
      <Button
        onClick={click}
        size="large"
        disabled={disable ? true : false}
        type="primary"
        className={styles[`${applyClass}`]}
      >
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          {icon ? icon : null}
          {text ? <span>{text}</span> : null}
        </span>
      </Button>
    </div>
  );
};

export default InputWithBtn;
