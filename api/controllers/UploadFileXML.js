const xml2js = require("xml2js");
const fs = require("fs");
const CreditReport = require("../models/xmlSchema");

exports.uploadXML = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const xmlData = fs.readFileSync(file.path, "utf8");

    xml2js.parseString(xmlData, async (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Error parsing XML" });
      }

      const extractedData = extractData(result);

      const creditReport = new CreditReport(extractedData);
      await creditReport.save();

      res
        .status(201)
        .json({ message: "File processed successfully", data: creditReport });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getReports = async (req, res) => {
  try {
    const reports = await CreditReport.find();
    res.status(200).json({ reports, count: reports.length });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const extractData = (xml) => {
  try {
    const applicantDetails =
      xml?.INProfileResponse?.Current_Application?.[0]
        ?.Current_Application_Details?.[0]?.Current_Applicant_Details?.[0];

    const summary =
      xml?.INProfileResponse?.CAIS_Account?.[0]?.CAIS_Summary?.[0]
        ?.Credit_Account?.[0];

    const outstandingBalance =
      xml?.INProfileResponse?.CAIS_Account?.[0]?.CAIS_Summary?.[0]
        ?.Total_Outstanding_Balance?.[0];

    const panDetails =
      xml?.INProfileResponse?.CAIS_Account?.[0]?.CAIS_Account_DETAILS?.[0]
        ?.CAIS_Holder_ID_Details?.[0]?.Income_TAX_PAN?.[0] || "";

    const accounts =
      xml?.INProfileResponse?.CAIS_Account?.[0]?.CAIS_Account_DETAILS?.map(
        (account) => ({
          bankName: account?.Subscriber_Name?.[0],
          accountNumber: account?.Account_Number?.[0],
          currentBalance: parseFloat(account?.Current_Balance?.[0] || 0),
          amountOverdue: parseFloat(account?.Amount_Past_Due?.[0] || 0),
        })
      ) || [];

    return {
      name: `${applicantDetails?.First_Name?.[0] || ""} ${
        applicantDetails?.Last_Name?.[0] || ""
      }`.trim(),
      mobilePhone: applicantDetails?.MobilePhoneNumber?.[0] || "",
      pan: panDetails || "",
      creditScore: parseInt(
        xml?.INProfileResponse?.SCORE?.[0]?.BureauScore?.[0] || 0
      ),
      reportSummary: {
        totalAccounts: parseInt(summary?.CreditAccountTotal?.[0] || 0),
        activeAccounts: parseInt(summary?.CreditAccountActive?.[0] || 0),
        closedAccounts: parseInt(summary?.CreditAccountClosed?.[0] || 0),
        currentBalance: parseFloat(
          outstandingBalance?.Outstanding_Balance_All?.[0] || 0
        ),
        securedAmount: parseFloat(
          outstandingBalance?.Outstanding_Balance_Secured?.[0] || 0
        ),
        unsecuredAmount: parseFloat(
          outstandingBalance?.Outstanding_Balance_UnSecured?.[0] || 0
        ),
        last7DaysEnquiries: parseInt(
          xml?.INProfileResponse?.TotalCAPS_Summary?.[0]
            ?.TotalCAPSLast7Days?.[0] || 0
        ),
      },
      creditAccounts: accounts,
    };
  } catch (error) {
    console.error("Error extracting data:", error);
    return {};
  }
};
