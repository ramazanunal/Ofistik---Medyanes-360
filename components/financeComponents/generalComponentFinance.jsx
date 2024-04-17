import React from "react";
import FinanceStatistics from "./financeStatistics";
import FinanceTable from "./financeTable";

function GeneralComponentFinance() {
  return (
    <div className="bg-gray-100 h-screen md:px-10">
      <FinanceStatistics />
      <FinanceTable />
    </div>
  );
}

export default GeneralComponentFinance;
