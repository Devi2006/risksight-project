import jsPDF from "jspdf";

export const exportPDF = (result, projectName) => {
  const doc = new jsPDF();

  doc.setFontSize(24);
doc.text("RiskSight AI Risk Report", 20, 20);

doc.setFontSize(10);
doc.text(
  `Generated on ${new Date().toLocaleString()}`,
  20,
  30
);

  doc.setFontSize(12);

  doc.text(
    `Project: ${projectName}`,
    20,
    40
  );

  doc.text(
    `Risk Score: ${result.riskScore}`,
    20,
    55
  );

  doc.text(
    `Risk Level: ${result.riskLevel}`,
    20,
    70
  );

  const marketSentiment =
  result.marketSentiment ||
  (result.riskLevel === "Very High"
    ? "Saturated"
    : result.riskLevel === "High"
    ? "Moderate"
    : result.riskLevel === "Medium"
    ? "Moderate"
    : "Positive");

const successProbability =
  result.successProbability ||
  Math.max(15, 100 - result.riskScore);

doc.text(
  `Market Sentiment: ${marketSentiment}`,
  20,
  85
);

doc.text(
  `Success Probability: ${successProbability}%`,
  20,
  100
);

  let y = 120;

  doc.text("Top Risks:", 20, y);

  result.risks.forEach((risk) => {
    y += 10;
    doc.text(`• ${risk}`, 25, y);
  });

  y += 20;

  doc.text("Recommendations:", 20, y);

  result.suggestions.forEach((item) => {
    y += 10;
    doc.text(`• ${item}`, 25, y);
  });

  doc.save("RiskSight_Report.pdf");
};