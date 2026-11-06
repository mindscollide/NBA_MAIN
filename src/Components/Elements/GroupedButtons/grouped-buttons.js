import React from "react";
import { Space } from "antd";
import styles from "../GroupedButtons/grouped.module.css";
import Button from "../Button/button";

const GroupedButtons = ({ data }) => {
  console.log("handleDescription a",data.primaryButton.disable)
  return (
    <>
      <div className={styles["groupedbtnwidth"]} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Space>
          <Button
            applyClass={data.primaryButton.class}
            text={data.primaryButton.text}
            click={data.primaryButton.click}
            size={data.primaryButton.size}
            icon={data.primaryButton.icon}
            endIcon={data.primaryButton.endIcon}
            disableBtn={data.primaryButton.disable}
          />
          <Button
            applyClass={data.secondaryButton.class}
            text={data.secondaryButton.text}
            click={data.secondaryButton.click}
            size={data.secondaryButton.size}
            icon={data.secondaryButton.icon}
            endIcon={data.secondaryButton.endIcon}
            disableBtn={data.secondaryButton.disable}
          />
        </Space>
      </div>
    </>
  );
};

export default GroupedButtons;
