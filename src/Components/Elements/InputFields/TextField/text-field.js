import React, { useState } from "react";
import { Input } from "antd";
import styles from "../../field.module.css";

// Replaces MUI's outlined TextField. Every size this app passes renders at
// antd's "large" (40px), the height MUI's size="small" outlined field had.
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
  // Like MUI's outlined label: inside the empty field at rest, on the border
  // once the field is focused or has a value (the placeholder shows only then).
  const [focused, setFocused] = useState(false);
  // MUI rendered the value as text, so [] (used by some search fields) is empty too.
  const empty = value === null || value === undefined || String(value) === "";
  const resting = label && empty && !focused;
  return (
    <div
      className={styles.wrapper}
      // Without fullWidth or a width, MUI's field sized to its input (about
      // 20 characters); an inline-block wrapper keeps that.
      style={{
        width: fullWidth ? "100%" : width ? `${width}` : "auto",
        display: fullWidth || width ? "block" : "inline-block",
        margin: `${margin}`,
      }}
    >
      {label ? (
        <span
          className={resting ? styles.restingLabel : styles.floatingLabel}
          style={resting && multiline ? { top: 20 } : undefined}
        >
          {label}
          {required ? <span className={styles.required}> *</span> : null}
        </span>
      ) : null}
      <InputComponent
        ref={ref && ref}
        id={id && id}
        onFocus={(e) => {
          setFocused(true);
          if (focus) focus(e);
        }}
        onBlur={() => setFocused(false)}
        name={name && name}
        onChange={change}
        className={`${styles.field} ${error ? styles.error : ""} ${className ? className : ""}`}
        style={{ WebkitTextSecurity: classpass }}
        placeholder={resting ? undefined : placeholder && placeholder}
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
