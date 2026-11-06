import React from "react";
import { Input } from "antd";
import styles from "../../field.module.css";

// Text input with the shared floating label chip (field.module.css). Every
// size this app passes renders at antd's "large" (40px).
const CustomizedTextField = ({
  ref,
  id,
  focus,
  value,
  label,
  width,
  required,
  disable,
  type,
  helper,
  error,
  fullWidth,
  multiline,
  rows,
  placeholder,
  textLength,
  margin,
  change,
  name,
  minLength,
  isUpperCase,
  className,
  autoComplete,
  classpass,
}) => {
  const InputComponent = multiline ? Input.TextArea : Input;
  return (
    <div
      className={styles.wrapper}
      // Without fullWidth or a width the field sizes to its input (about 20
      // characters), as it always has; an inline-block wrapper keeps that.
      style={{
        width: fullWidth ? "100%" : width ? `${width}` : "auto",
        display: fullWidth || width ? "block" : "inline-block",
        margin: `${margin}`,
      }}
    >
      {label ? (
        <span className={styles.floatingLabel}>
          {label}
          {required ? <span className={styles.required}> *</span> : null}
        </span>
      ) : null}
      <InputComponent
        ref={ref && ref}
        id={id && id}
        onFocus={focus}
        name={name && name}
        onChange={change}
        className={`${styles.field} ${error ? styles.error : ""} ${className ? className : ""}`}
        style={{ WebkitTextSecurity: classpass }}
        placeholder={placeholder && placeholder}
        rows={multiline ? rows : undefined}
        value={value === null ? "" : value}
        size="large"
        type={type}
        maxLength={textLength}
        minLength={minLength}
        disabled={disable}
        required={required ? true : false}
        autoComplete={autoComplete}
      />
      {error && helper ? <div className={styles.helper}>{helper}</div> : null}
    </div>
  );
};
export default CustomizedTextField;
