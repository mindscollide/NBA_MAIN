import React, { memo, useState } from "react";
import { Select } from "antd";
import styles from "../../field.module.css";

const content = ["No Data Found"];

const getOptionLabel = (item, propertyName) =>
  item && item[propertyName]
    ? typeof item[propertyName] === "string" ||
      item[propertyName] instanceof String
      ? item[propertyName]
      : ""
    : item
    ? typeof item === "string" || item instanceof String
      ? item
      : ""
    : "";

// Replaces MUI's Autocomplete, which is object-based: options={items},
// value={item}, onChange(event, item). antd's Select needs primitive option
// values, so each option's index is its value internally and callers keep
// getting the real item back through the same change(event, item) shape.
const SelectBox = memo(
  ({
    size,
    name,
    value,
    option,
    label,
    width,
    required,
    placeholder,
    change,
    focus,
    propertyName,
    disable,
  }) => {
    const [focused, setFocused] = useState(false);
    const options = option ? option : content;
    const isEmpty =
      value === "" ||
      value === null ||
      value === undefined ||
      (Array.isArray(value) && value.length === 0);

    // Autocomplete still showed a value that was not one of the option
    // objects (e.g. rebuilt from API data on edit pages): match it by label,
    // or else show it as an extra option.
    let selected;
    let extra = null;
    if (!isEmpty) {
      selected = options.indexOf(value);
      if (selected === -1) {
        const text = getOptionLabel(value, propertyName);
        selected = options.findIndex(
          (item) => text !== "" && getOptionLabel(item, propertyName) === text
        );
        if (selected === -1 && text !== "") {
          extra = { value: -1, label: text };
          selected = -1;
        } else if (selected === -1) {
          selected = undefined;
        }
      }
    }

    const antdOptions = options.map((item, idx) => ({
      value: idx,
      label: getOptionLabel(item, propertyName),
    }));
    if (extra) antdOptions.unshift(extra);

    const handleChange = (idx) => {
      if (idx === -1) return;
      change(null, idx === undefined ? null : options[idx]);
    };

    // Label inside the empty field at rest, on the border otherwise (MUI).
    const resting = label && selected === undefined && !focused;
    return (
      <div className={styles.wrapper}>
        {label ? (
          <span className={resting ? styles.restingLabel : styles.floatingLabel}>
            {label}
            {required ? <span className={styles.required}> *</span> : null}
          </span>
        ) : null}
        <Select
          showSearch
          disabled={disable}
          onFocus={(e) => {
            setFocused(true);
            if (focus) focus(e);
          }}
          onBlur={() => setFocused(false)}
          id={name}
          value={selected}
          placeholder={resting ? undefined : placeholder && placeholder}
          size="large"
          className={styles.field}
          options={antdOptions}
          style={{ width: width ? width : "100%" }}
          onChange={handleChange}
          filterOption={(input, opt) =>
            ((opt && opt.label) || "").toLowerCase().includes(input.toLowerCase())
          }
        />
      </div>
    );
  }
);

export default SelectBox;
