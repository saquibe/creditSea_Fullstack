const xml2js = require("xml2js");
const fs = require("fs");
const CreditReport = require("../models/xmlSchema");

// Controller to handle XML file upload and data extraction
exports.uploadXML = async (req, res) => {
  try {
    const file = req.file; // Assuming you're using multer for file uploads
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Read the XML file
    const xmlData = fs.readFileSync(file.path, "utf8");

    // Parse XML data
    xml2js.parseString(xmlData, async (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Error parsing XML" });
      }

      // Extract data from parsed XML (this will depend on the XML structure)
      const extractedData = extractData(result);

      // Save to MongoDB
      const creditReport = new CreditReport(extractedData);
      await creditReport.save();

      // Respond with success
      res
        .status(201)
        .json({ message: "File processed successfully", data: creditReport });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Controller to retrieve reports
exports.getReports = async (req, res) => {
  try {
    const reports = await CreditReport.find();
    res.status(200).json(reports);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Function to extract data from parsed XML
const extractData = (xml) => {
  // Implement the logic to extract required fields from the XML structure
  return {
    name: xml?.CreditReport?.BasicDetails[0]?.Name[0],
    mobilePhone: xml?.CreditReport?.BasicDetails[0]?.MobilePhone[0],
    pan: xml.CreditReport?.BasicDetails[0]?.PAN[0],
    creditScore: parseInt(
      xml?.CreditReport?.BasicDetails[0]?.CreditScore[0] || 0
    ),
    reportSummary: {
      totalAccounts: parseInt(
        xml?.CreditReport?.ReportSummary[0]?.TotalAccounts[0] || 0
      ),
      activeAccounts: parseInt(
        xml?.CreditReport?.ReportSummary[0]?.ActiveAccounts[0] || 0
      ),
      closedAccounts: parseInt(
        xml?.CreditReport?.ReportSummary[0]?.ClosedAccounts[0] || 0
      ),
      currentBalance: parseFloat(
        xml?.CreditReport?.ReportSummary[0]?.CurrentBalance[0] || 0
      ),
      securedAmount: parseFloat(
        xml?.CreditReport?.ReportSummary[0]?.SecuredAccountsAmount[0] || 0
      ),
      unsecuredAmount: parseFloat(
        xml?.CreditReport?.ReportSummary[0]?.UnsecuredAccountsAmount[0] || 0
      ),
      last7DaysEnquiries: parseInt(
        xml?.CreditReport?.ReportSummary[0]?.Last7DaysCreditEnquiries[0] || 0
      ),
    },
    creditAccounts: xml?.CreditReport?.CreditAccounts?.map((account) => ({
      bankName: account?.BankName[0],
      accountNumber: account?.AccountNumber[0],
      currentBalance: parseFloat(account?.CurrentBalance[0]),
      amountOverdue: parseFloat(account?.AmountOverdue[0]),
    })),
  };
};
