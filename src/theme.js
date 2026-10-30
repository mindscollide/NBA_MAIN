// antd v6 theme (CSS-in-JS design tokens). This keeps the look NBA had on
// antd v4: the values that used to be Less modifyVars in craco.config.js /
// vite.config.mjs, plus v4's defaults where v5+ changed them (2px corners,
// text colour, link colour, flat "wireframe" components).
const theme = {
  token: {
    colorPrimary: "#04908b",
    colorInfo: "#04908b", // v4: @info-color = @primary-color
    colorLink: "#04908b", // v4: @link-color = @primary-color
    colorText: "rgba(0, 0, 0, 0.85)",
    colorBgLayout: "#f6f6f6",
    fontFamily: "'Open Sans', sans-serif",
    borderRadius: 2,
    wireframe: true,
  },
  components: {
    Table: {
      rowHoverBg: "#eaf4f4",
      cellPaddingBlock: 5,
      cellPaddingInline: 5,
      borderColor: "#dee6e6",
      headerBorderRadius: 2,
    },
    // v4 sidebar items ran edge to edge with square corners
    Menu: {
      itemMarginInline: 0,
      itemBorderRadius: 0,
      subMenuItemBorderRadius: 0,
    },
  },
};

export default theme;
