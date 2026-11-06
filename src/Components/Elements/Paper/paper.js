import React from "react";

// A plain div (MUI's Paper was always elevation={0} with square corners): the
// only visual effect is the optional 1px border when `variant` is truthy.
const CustomPaper = ({
  children,
  variant,
  height,
  padding,
  mt,
  mb,
  ml,
  mr,
}) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <div
        style={{
          width: "100%",
          height: `${height}`,
          padding: `${padding}%`,
          marginTop: `${mt}%`,
          marginBottom: `${mb}%`,
          marginLeft: `${ml}%`,
          marginRight: `${mr}%`,
          border: variant ? "1px solid rgba(0, 0, 0, 0.12)" : "none",
          background: "#fff",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default CustomPaper;
