import React from "react";
import FinanceStatistics from "./financeStatistics";
import FinanceTable from "./financeTable";
import ProgressPayment from "./ProgressPayment";

function GeneralComponentFinance() {
  return (
    <div className="bg-gray-100 min-h-screen md:px-10 py-4">
      <FinanceStatistics />
      <ProgressPayment />
      <FinanceTable />
    </div>
  );
}

export default GeneralComponentFinance;
