import React from "react";
import FinanceStatistics from "./financeStatistics";
import FinanceTable from "./financeTable";

function GeneralComponentFinance() {
  return (
    <div className="bg-gray-100 h-screen">
      <FinanceStatistics />
      <FinanceTable />
    </div>
  );
}

export default GeneralComponentFinance;
