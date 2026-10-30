import * as React from "react";
import { Input } from "antd";
import { NumericFormat } from "react-number-format";
import styles from "../FormatedInput/Finput.module.css";
import fieldStyles from "../field.module.css";

export const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(
  props,
  ref
) {
  const { onChange, textLength, ...other } = props;
  return (
    <NumericFormat
      thousandsGroupStyle="thousand"
      decimalSeparator="."
      displayType="input"
      type={props.type}
      value={props.value}
      thousandSeparator={true}
      // fixedDecimalScale={true}
      decimalScale={2}
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
    />
  );
});

export const FormattedInputs = ({
  label,
  Label,
  value,
  size,
  change,
  name,
  variant,
  required,
  numLength,
  disable,
  type,
  textLength,
  minLength,
  fullWidth,
  placeholder,
  onblur,
  autoComplete,
  tabindex,
}) => {
  return (
    <>
      {label ? (
        <b className={styles["fontsize"]}>
          {label}
          {required ? (
            <i className={styles["fontorcolor"]}>*</i>
          ) : null}
        </b>
      ) : null}
      <div className={fieldStyles.wrapper}>
        {Label ? (
          <span className={fieldStyles.floatingLabel}>{Label}</span>
        ) : null}
        {/* antd's Input is the rendered element (customInput). textLength is
            not applied: under MUI it never reached the <input> either, and
            as maxLength it would count the thousands separators. */}
        <NumericFormat
          customInput={Input}
          className={fieldStyles.field}
          size="large"
          thousandsGroupStyle="thousand"
          decimalSeparator="."
          displayType="input"
          thousandSeparator={true}
          // fixedDecimalScale={true}
          decimalScale={2}
          tabIndex={tabindex}
          onBlur={onblur}
          placeholder={placeholder}
          value={value === null ? "" : value}
          type={type}
          name={name}
          disabled={disable}
          id="formatted-numberformat-input"
          minLength={minLength}
          required={required}
          autoComplete={autoComplete}
          style={{ width: fullWidth ? "100%" : undefined }}
          onValueChange={(values, sourceInfo) => {
            // Only user typing should reach the page's handler, as under
            // MUI; read-only fields are rendered without one.
            if (typeof change !== "function") return;
            if (sourceInfo && sourceInfo.source === "prop") return;
            change({
              target: {
                name: name,
                value: values.value,
              },
            });
          }}
        />
      </div>
    </>
  );
};
