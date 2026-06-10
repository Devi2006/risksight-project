export const calculateRisk = (data) => {

  let riskScore = 0;

  let risks = [];

  let suggestions = [];

  // Timeline Risk
  if (data.timeline < 30) {
    riskScore += 20;

    risks.push("Timeline unrealistic");

    suggestions.push(
      "Increase execution timeline"
    );
  }

  // Team Risk
  if (data.teamSize < 3) {
    riskScore += 15;

    risks.push("Small execution team");

    suggestions.push(
      "Increase team members"
    );
  }

  // Budget Risk
  if (data.budget < 10000) {
    riskScore += 25;

    risks.push("Insufficient budget");

    suggestions.push(
      "Secure additional funding"
    );

  } else if (data.budget < 50000) {

    riskScore += 10;

    risks.push("Budget may limit scaling");

    suggestions.push(
      "Improve financial planning"
    );
  }

  // Competition Risk
  if (data.competition === "Very High") {

    riskScore += 25;

    risks.push(
      "Highly competitive market"
    );

    suggestions.push(
      "Differentiate your product"
    );

  } else if (
    data.competition === "High"
  ) {

    riskScore += 15;

    risks.push(
      "Strong market competition"
    );

    suggestions.push(
      "Strengthen unique value proposition"
    );
  }

  // Business Stage Risk
  if (
    data.businessStage === "Idea Stage"
  ) {

    riskScore += 15;

    risks.push(
      "Business still in idea stage"
    );

    suggestions.push(
      "Validate idea with target users"
    );
  }

  // Revenue Model Risk
  if (
    data.revenueModel ===
    "Not Defined Yet"
  ) {

    riskScore += 20;

    risks.push(
      "Revenue model unclear"
    );

    suggestions.push(
      "Define monetization strategy"
    );
  }

  // Missing Marketing
  if (
    !data.executionSteps
      .toLowerCase()
      .includes("marketing")
  ) {

    riskScore += 10;

    risks.push(
      "Marketing strategy missing"
    );

    suggestions.push(
      "Add marketing plan"
    );
  }

  // Missing Validation
  if (
    !data.executionSteps
      .toLowerCase()
      .includes("validation")
  ) {

    riskScore += 10;

    risks.push(
      "Customer validation missing"
    );

    suggestions.push(
      "Add customer validation phase"
    );
  }

  // Category Specific Risks
  if (
    data.category === "E-commerce"
  ) {

    riskScore += 10;

    risks.push(
      "Operational logistics complexity"
    );

    suggestions.push(
      "Plan supply chain carefully"
    );
  }

  // Cap max score
  if (riskScore > 100) {
    riskScore = 100;
  }

  // Risk Level Logic
  let riskLevel = "Low";

  if (riskScore >= 85) {

    riskLevel = "Very High";

  } else if (riskScore >= 60) {

    riskLevel = "High";

  } else if (riskScore >= 35) {

    riskLevel = "Medium";
  }

  return {
    riskScore,
    riskLevel,
    risks,
    suggestions,
  };
};