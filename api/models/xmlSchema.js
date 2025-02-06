const mongoose = require("mongoose");

const creditReportSchema = new mongoose.Schema({
  name: String,
  mobilePhone: String,
  pan: String,
  creditScore: Number,
  reportSummary: {
    totalAccounts: Number,
    activeAccounts: Number,
    closedAccounts: Number,
    currentBalance: Number,
    securedAmount: Number,
    unsecuredAmount: Number,
    last7DaysEnquiries: Number,
  },
  creditAccounts: [
    {
      bankName: String,
      accountNumber: String,
      currentBalance: Number,
      amountOverdue: Number,
    },
  ],
});

module.exports = mongoose.model("CreditReports", creditReportSchema);
