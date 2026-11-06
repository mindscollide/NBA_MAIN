// antd v6 theme (CSS-in-JS design tokens), in the NBA palette.
// Palette pairs (background / text):
//   Primary   #035F5C / #FFFFFF   Secondary #8EB974 / #000000
//   Hover     #CCDDC5 / #000000   Card      #E4EDE1 / #000000
//   Page      #F4FFF0 / #000000   Danger    #FC4343 / #FFFFFF
//   Neutral   #6D6D6D / #FFFFFF   Muted     #F0F0F0 / #0C0C0C
//   Black     #000000 / #FFFFFF   (#035F5C also as text/border on light)
const theme = {
  token: {
    colorPrimary: "#035F5C",
    colorInfo: "#035F5C",
    colorLink: "#035F5C",
    colorBgLayout: "#F4FFF0",
    colorText: "#000000",
    colorError: "#FC4343",
    fontFamily: "'Open Sans', sans-serif",
    // inputs, selects, pickers and buttons are rounded to 8px
    borderRadius: 8,
  },
  components: {
    Table: {
      headerBg: "#8EB974",
      headerColor: "#000000",
      headerSplitColor: "transparent", // no column separators in the header
      rowHoverBg: "#CCDDC5",
      borderColor: "transparent", // no grid lines
      cellPaddingBlock: 10,
      cellPaddingInline: 5,
      headerBorderRadius: 10,
    },
    // The sidebar's card look is drawn by sidebar.module.css; these just keep
    // antd's own item colours out of its way.
    Menu: {
      itemBg: "transparent",
      subMenuItemBg: "#FFFFFF",
      itemColor: "#000000",
      itemHoverColor: "#035F5C",
      itemSelectedColor: "#000000",
      itemSelectedBg: "#8EB974",
      itemHoverBg: "#E4EDE1",
      itemActiveBg: "#E4EDE1",
      itemMarginInline: 0,
      activeBarBorderWidth: 0,
    },
    Tooltip: {
      colorBgSpotlight: "#000000",
      colorTextLightSolid: "#FFFFFF",
    },
  },
};

export default theme;
