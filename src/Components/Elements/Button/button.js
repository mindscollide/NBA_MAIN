import React from "react";
import { Button } from "antd";
import styles from "./button.module.css";

const CustomButton = ({
  text,
  icon,
  click,
  applyClass,
  endIcon,
  disableBtn,
  disableClass,
  size,
  align,
  type,
  fullWidth,
  style,
}) => {
  return (
    <>
      <Button
        // style={style}
        block={fullWidth}
        // antd's `type` is the visual variant (primary/dashed/...), so the
        // native button type that callers pass ("submit") goes to htmlType.
        htmlType={type}
        size={size === "large" ? "large" : "middle"}
        className={`${styles.muiButton} ${size === "small" ? styles.muiSmall : size === "large" ? styles.muiLarge : ""} ${styles[applyClass]} ${styles[disableClass]}`}
        disabled={disableBtn}
        onClick={click}
        align={align}
      >
        {/* One flex row spaces both antd icons and the plain
            <i className="icon-..."> font icons this app passes in. */}
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          {icon ? icon : null}
          {text ? <span>{text}</span> : null}
          {endIcon ? endIcon : null}
        </span>
      </Button>
    </>
  );
};

export default CustomButton;
