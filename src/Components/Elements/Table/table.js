import React, { useMemo } from "react";
import { Table, Tooltip } from "antd";
import "./table.css";

const MAX_WORDS = 15;

const isText = (v) =>
  (typeof v === "string" && v.trim() !== "") || typeof v === "number";

// Cell text longer than MAX_WORDS words is cut to its first MAX_WORDS words
// plus "…"; the full text shows in a tooltip on hover. Cells that render
// elements (icons, links with their own tooltip) are left as they are; a
// column can opt out with `ellipsis: false`.
const withWordLimit = (columns) =>
  (columns || []).map((col) => {
    if (col.ellipsis === false || col.children) return col;
    const render = col.render;
    return {
      ...col,
      render: (text, record, index) => {
        const content = render ? render(text, record, index) : text;
        if (!isText(content)) return content;
        const full = String(content);
        const words = full.trim().split(/\s+/);
        if (words.length <= MAX_WORDS) return content;
        return (
          <Tooltip
            title={full}
            placement="topLeft"
            styles={{ root: { maxWidth: 480 } }}
          >
            <span>{words.slice(0, MAX_WORDS).join(" ")}…</span>
          </Tooltip>
        );
      },
    };
  });

const CustomTable = ({
  columns,
  rows,
  pagination,
  scroll,
  rowSelection,
  id,
  className,
}) => {
  const cols = useMemo(() => withWordLimit(columns), [columns]);
  return (
    <Table
      className={className}
      // striped rows (see table.css); no `bordered` — tables have no grid lines
      rowClassName={(record, index) =>
        index % 2 === 0 ? "rowColor" : "rowColor rowColorAlt"
      }
      rowSelection={rowSelection}
      columns={cols}
      dataSource={rows}
      pagination={pagination}
      scroll={scroll}
    />
  );
};

export default CustomTable;
