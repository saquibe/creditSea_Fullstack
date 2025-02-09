import React from "react";
import "./XmlReport.css";

const XmlReport = ({ report }) => {
  if (!report) return null;

  return (
    <div className="report">
      {" "}
      <h2>Report Summary</h2>
      <h3>Basic Details</h3>
      <p>Name: {report.name}</p>
      <p>Mobile Phone: {report.mobilePhone}</p>
      <p>PAN: {report.pan}</p>
      <p>Credit Score: {report.creditScore}</p>
      <h3>Report Summary</h3>
      <p>Total Accounts: {report.reportSummary.totalAccounts}</p>
      <p>Active Accounts: {report.reportSummary.activeAccounts}</p>
      <p>Closed Accounts: {report.reportSummary.closedAccounts}</p>
      <p>Current Balance: {report.reportSummary.currentBalance}</p>
      <p>Secured Amount: {report.reportSummary.securedAmount}</p>
      <p>Unsecured Amount: {report.reportSummary.unsecuredAmount}</p>
      <p>Last 7 Days Enquiries: {report.reportSummary.last7DaysEnquiries}</p>
      <h3>Credit Accounts</h3>
      {report.creditAccounts.map((account, index) => (
        <div key={index} className="credit-account">
          {" "}
          <p>Bank Name: {account.bankName}</p>
          <p>Account Number: {account.accountNumber}</p>
          <p>Current Balance: {account.currentBalance}</p>
          <p>Amount Overdue: {account.amountOverdue}</p>
        </div>
      ))}
    </div>
  );
};

export default XmlReport;
