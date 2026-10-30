import React, { useEffect, useState } from "react";

import { Grid } from "@material-ui/core";

import { Typography, Tooltip } from "antd";

import { useDispatch, useSelector } from "react-redux";

import {
  InputWithBtn,
  Table,
  Button,
  Notification,
  Loader,
  FilterBar,
} from "../../../Components/Elements";
import {
  HideNotification,
  GetAllRejectedCases,
  ViewREMTeamData,
  ResetNBACase,
} from "../../../store/actions/nonbanking-assets-actions"
import {
  CommaFormter,
} from "../../../Common/Functions/date-formatter";
import {
  GetAllPropertyType,
} from "../../../store/actions/setup-forms-actions";
import { useHistory } from "react-router-dom";
import {
  enableGoBack,
  disableGoBack,
} from "../../../store/actions/ui-actions";

const SearchNBADPSCasesRASC = () => {
  const history = useHistory();
  const { Title } = Typography;
  const [filter, setfilter] = useState(1);
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { nonBankingAssets } = state;
  const [open, setOpen] = useState({
    flag: false,
    message: "",
  });
  const [allRejectedCases, setAllRejectedCases] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const handleFilter = (value) => {
    setfilter(Number(value))
    dispatch(GetAllRejectedCases(value,true));
  }
  const options = [
    { value: 1, title: "Current Month Cases" },
    { value: 2, title: "Last 30 days" },
    { value: 3, title: "31 to 60 days" },
    { value: 4, title: "61 to 90 days" },
    { value: 5, title: "More than 90 Days" },
  ];
 // for Edit
 const Edit = async (e, value) => {
  let Data = {
    NBACaseID: value.nbaCaseID,
  };
  await dispatch(GetAllPropertyType());
  await dispatch(ViewREMTeamData(Data));
  await dispatch(enableGoBack());
  console.log("ViewREMTeamData", value, Data);
  history.push("/NBA/DataEntryRASC/EditNonBankingAssets");
};
 // for View
 const View = async (e, value) => {
  let Data = {
    NBACaseID: value.nbaCaseID,
  };
  await dispatch(GetAllPropertyType());
  await dispatch(ViewREMTeamData(Data));
  await dispatch(enableGoBack());
  console.log("ViewREMTeamData", value, Data);
  history.push("/NBA/DataEntryRASC/ViewNonBankingAssets");
};
  const columns = [
    {
      title: "Reference Number",
      dataIndex: "referenceNumber",
      key: "referenceNumber",
      align: "center",
      width: "300px",
      render: (text, record, index) => (
        <Tooltip title="View" color={"Black"}>
          <i
            // style={{ cursor: "pointer", color: "blue" }}
          onClick={(e) => View(e, record)}
          >
            {text}
          </i>
        </Tooltip>
      ),
    },
    {
      title: "Misys Company Code",
      dataIndex: "miSysCode",
      key: "miSysCode",
      align: "center",
      width: "300px",
    },
    {
      title: "ECIB Code",
      dataIndex: "ecibCode",
      key: "ecibCode",
      align: "center",
      width: "300px",
    },
    {
      title: "Property Name",
      dataIndex: "propertyName",
      key: "propertyName",
      align: "center",
      width: "300px",
    },
    {
      title: "DPS Transaction Amount",
      dataIndex: "dpsTransactionAmount",
      key: "dpsTransactionAmount",
      align: "center",
      width: "300px",
      render: (text) => CommaFormter(text),
    },
    {
      title: "Average Forced Sale Value",
      dataIndex: "averageForcedSaleValue",
      key: "averageForcedSaleValue",
      align: "center",
      width: "300px",
      render: (text) => CommaFormter(text),
    },
    {
      title: "Average Market Value",
      dataIndex: "averageMarketValue",
      key: "averageMarketValue",
      align: "center",
      width: "300px",
      render: (text) => CommaFormter(text),
    },
    {
      title: "Edit",
      dataIndex: "deletedBy",
      key: "deletedBy",
      align: "center",
      width: "100px",
      render: (text, record) => (
        <div
          // style={{ cursor: "pointer" }}
          onClick={(e) => Edit(e, record)}
          className="icon-edit icon-size-one beachGreen"
        />
      ),
    },
  ];

  
  // Reset Handler for Grid
  const resetData = () => {
    
    dispatch(GetAllRejectedCases(filter,true));
    setSearchData("");
  };

  //Search Handler
  //   check data input for enable button for search
  const searchHandler = (e) => {
    let Data = e.target.value;
    setSearchData(Data);
  };

  // for search filter
  const globalSearch = (action) => {
    if (searchData !== "") {
      let filteredData = nonBankingAssets.RejectedCasesData.filter(value => {
        return (
          value.referenceNumber.toString().toLowerCase().includes(searchData.toLowerCase()) ||
          value.miSysCode.toString().toLowerCase().includes(searchData.toLowerCase()) ||
          value.ecibCode.toString().toLowerCase().includes(searchData.toLowerCase()) ||
          value.propertyName.toString().toLowerCase().includes(searchData.toLowerCase()) ||
          value.dpsTransactionAmount.toString().toLowerCase().includes(searchData.toLowerCase()) ||
          value.averageForcedSaleValue.toString().toLowerCase().includes(searchData.toLowerCase()) ||
          value.averageMarketValue.toString().toLowerCase().includes(searchData.toLowerCase()) ||
          value.createdByUser.toString().toLowerCase().includes(searchData.toLowerCase())
        );
      });
      setAllRejectedCases(filteredData)
    }
    else if (searchData === "") {
      let data = nonBankingAssets.RejectedCasesData;
      setSearchData("")
      setAllRejectedCases(data)
    }
  };

  useEffect(() => {

    if(nonBankingAssets.RejectedCasesData.length > 0){

    setAllRejectedCases(nonBankingAssets.RejectedCasesData);

    }else{
      setAllRejectedCases([])
    }
  }, [nonBankingAssets.RejectedCasesData])

  useEffect(() => {
    dispatch(GetAllRejectedCases(filter,true));
    dispatch(disableGoBack());
    localStorage.removeItem("NBACaseID");
  }, []);

  useEffect(() => {
    if (nonBankingAssets.ShowNotification) {
      setOpen({
        flag: true,
        message: nonBankingAssets.Message,
      });
      dispatch(HideNotification());
    }
  }, [nonBankingAssets.ShowNotification]);

  useEffect(() => {
    if (nonBankingAssets.ShowNotification) {
      setOpen({
        flag: true,
        message: nonBankingAssets.Message,
      });
      dispatch(HideNotification());
    }
    console.log("Loader", nonBankingAssets.Loading);
  }, [nonBankingAssets.Loading]);

  return (
    <>
      <Title level={4}>Reverted Cases</Title>
      <>
        <Grid container spacing={2}>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <FilterBar
              Options={options}
              change={handleFilter}
              placeholder={"Filter by Duration"}
              defaultValue={options[0].title}
            />
          </Grid>
          {/* <Grid item lg={5} md={5}></Grid> */}
          {/* <div style={{ marginLeft: "295px" }} /> */}
          <Grid item lg={5} md={5} className="SearchPendingApprovals">
            <InputWithBtn
              label="Search"
              fullWidth
              textFieldSize="small"
              autoComplete="off"
              icon={<i className="icon-search icon-size-one"></i>}
              name="PendingApprovals"
              applyClass="search-cnic"
              click={globalSearch}
              onchange={searchHandler}
              value={searchData}
            />
          </Grid>
          <Grid item lg={1} md={1} sm={12}>
          {/* <div style={{align: "Right"}}/> */}
            <Button
              text="Reset"
              icon={<i className="icon-reset"></i>}
              applyClass="btnSecondarySolidReset"
              size="small"
              click={resetData}
            />
          </Grid>
          <Grid item lg={12} md={12}>
            <Table
              rows={allRejectedCases}
              columns={columns}
              scroll={{ x: "max-content" }}
              pagination={{
                defaultPageSize: 10,
                showSizeChanger: true,
                pageSizeOptions: ["5", "10", "20", "30"],
              }}
            />
          </Grid>
        </Grid>
      </>
      <Notification setOpen={setOpen} open={open.flag} message={open.message} />
      {nonBankingAssets.Loading ? <Loader /> : null}
    </>
  );
};

export default SearchNBADPSCasesRASC;