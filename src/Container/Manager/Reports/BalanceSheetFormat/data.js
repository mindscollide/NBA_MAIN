import {
  DateDisplayFormat,
  CommaFormter
} from "../../../../Common/Functions/date-formatter";
export const columns = [
  {
    title: "Misys Customer Code",
    dataIndex: "misysCode",
    key: "misysCode",
    align: "center",
    width: "1%",
  },
  {
    title: "WOF Code",
    dataIndex: "wofCode",
    key: "wofCode",
    align: "center",
    width: "1%",
  },
  {
    title: "Write Off / Old Charge-off / New Charge-off",
    dataIndex: "chargeOffType",
    key: "chargeOffType",
    align: "center",
    width: "3%",
  },
  {
    title: "Account Number",
    dataIndex: "accountNumber",
    key: "accountNumber",
    align: "center",
    width: "2%",
  },
  {
    title: "Date of Write Off",
    dataIndex: "dateOfWriteOff",
    key: "dateOfWriteOff",
    align: "center",
    width: "2%",
    render: (text)=>DateDisplayFormat(text)
  },
  // {
  //   title: "Name of the Borrower",
  //   dataIndex: "borrowerName",
  //   key: "borrowerName",
  //   align: "center",
  //   width: "2%",
  // },
  {
    title: "Name and Address of the Borrower",
    dataIndex: "borrowerNameAndAddress",
    key: "borrowerNameAndAddress",
    align: "center",
    width: "3%",
  },
  {
    title: "Name of Proprietor / Partners / Directors (with NIC No.)",
    dataIndex: "allDirectorsNamesWithCNICDelimited",
    key: "allDirectorsNamesWithCNICDelimited",
    align: "center",
    width: "3%",
    // render: (text, record) => {
    //   if (
    //     record.allDirectorsNamesDelimited != null &&
    //     record.allDirectorsCNICDelimited != null
    //   ) {
    //     let rawData1 = record.allDirectorsNamesWithCNICDelimited;
    //     let rawData2 = record.allDirectorsNamesWithCNICDelimited;
    //     let spilitData1 = rawData1.split("~");
    //     let spilitData2 = rawData2.split("~");
    //     return spilitData1.map((item, index) => {
    //       return (
    //         <>
    //           <span>
    //             {spilitData1[index]}
    //             <br />
    //             {spilitData2[index]}
    //           </span>
    //           <br />
    //         </>
    //       );
    //     });
    //   } else {
    //     return " ";
    //   }
    // },
  },
  {
    title: "Father's / Husband Name of Proprietor / Partners / Directors",
    dataIndex: "allDirectorsFatherNameDelimited",
    key: "allDirectorsFatherNameDelimited",
    align: "center",
    width: "3%",
    render: (text, record) => {
      if (record.allDirectorsFatherNameDelimited != null) {
        let rawData = record.allDirectorsFatherNameDelimited;
        let spilitData = rawData.split("~");
        return spilitData.map((item, index) => (
          <>
            {" "}
            <span>{item}</span>
            <br />
          </>
        ));
      } else {
        return " ";
      }
    },
  },
  {
    title: "Business Unit Write Off (Management)",
    dataIndex: "businessUnit",
    key: "businessUnit",
    align: "center",
    width: "2%",
  },
  {
    title: "Outstanding Principal",
    dataIndex: "amountOutstandingOutstandingPrincipal",
    key: "amountOutstandingOutstandingPrincipal",
    align: "center",
    width: "2%",
    render: (text)=>CommaFormter(text)
  },
  {
    title: "Outstanding Mark-Up Debited",
    dataIndex: "amountOutstandingOutstandingMarkupDebited",
    key: "amountOutstandingOutstandingMarkupDebited",
    align: "center",
    width: "2%",
    render: (text)=>CommaFormter(text)
  },
  {
    title: "Outstanding Non-Accrual Undebited",
    dataIndex: "amountOutstandingOutstandingMarkupDebited",
    key: "amountOutstandingOutstandingMarkupDebited",
    align: "center",
    width: "2%",
    render: (text)=>CommaFormter(text)
  },
  {
    title: "Outstanding Mark-Up Total",
    dataIndex: "amountOutstandingOutstandingMarkupTotal",
    key: "amountOutstandingOutstandingMarkupTotal",
    align: "center",
    width: "1%",
    render: (text)=>CommaFormter(text)
  },
  {
    title: "Other Charges",
    dataIndex: "amountOutstandingOtherCharges",
    key: "amountOutstandingOtherCharges",
    align: "center",
    width: "2%",
    render: (text)=>CommaFormter(text)
  },
  {
    title: "Penal Interest",
    dataIndex: "amountOutstandingOtherCharges",
    key: "amountOutstandingOtherCharges",
    align: "center",
    width: "2%",
    render: (text)=>CommaFormter(text)
  },
  {
    title: "Total",
    dataIndex: "amountOutstandingTotal",
    key: "amountOutstandingTotal",
    align: "center",
    width: "1%",
    render: (text)=>CommaFormter(text)
  },
  {
    title: "Write Off Principal",
    dataIndex: "writeOffPrincipal",
    key: "writeOffPrincipal",
    align: "center",
    width: "2%",
    render: (text)=>CommaFormter(text)
  },
  {
    title: "Waiver of Undebited Mark-Up",
    dataIndex: "financialReliefWaiverUnDebutedMarkup",
    key: "financialReliefWaiverUnDebutedMarkup",
    align: "center",
    width: "2%",
    render: (text)=>CommaFormter(text)
  },
  {
    title: "Interest Reversal",
    dataIndex: "financialReliefInterestReversal",
    key: "financialReliefInterestReversal",
    align: "center",
    width: "2%",
    render: (text)=>CommaFormter(text)
  },
  
  {
    title: "Other Charges",
    dataIndex: "otherCharges",
    key: "otherCharges",
    align: "center",
    width: "2%",
    render: (text)=>CommaFormter(text)
  },
  {
    title: "Penal Interest",
    dataIndex: "amountWrittenOffTotalImpact",
    key: "amountWrittenOffTotalImpact",
    align: "center",
    width: "2%",
    render: (text)=>CommaFormter(text)
  },
  {
    title: "Total Relief (Total Impact)",
    dataIndex: "amountWrittenOffTotalImpact",
    key: "amountWrittenOffTotalImpact",
    align: "center",
    width: "2%",
    render: (text)=>CommaFormter(text)
  },
];
