import React from "react";
import styles from "../GridDataView/grid.module.css"
import { Typography } from "antd";
import { Row, Col } from "antd";
import MaxWidthContainer from "../MaxWidthContainer/max-width-container";

const GridDataView = () => {
  const { Title, Text } = Typography;

  const data = [
    { heading: "Action By", text: "101252456772" },
    { heading: "Action On", text: "1 June 2021 - 10:21:00" },
    {
      heading: "Description",
      text: "Write Off case modified for Pakistan Auto Industries – CG7GSW - 0137238",
    },
  ];

  return (
    <MaxWidthContainer>
      <Row>
        {data.map((item, index) => {
          return (
            <Col xl={12} lg={12} sm={12}>
              <Title
                level={5}
                className={styles["gridstyle"]}
              >
                {item.heading}
              </Title>
              <Text>{item.text}</Text>
            </Col>
          );
        })}
      </Row>
    </MaxWidthContainer>
  );
};

export default GridDataView;
