import {
  db,
  collection,
  addDoc,
} from "../services/firebase";
import { analyzeWithGemini } from "../services/gemini";
import { useState } from "react";

import { calculateRisk } from "../utils/riskEngine";

import RiskDashboard from "./RiskDashboard";

const ProjectForm = () => {
  const [formData, setFormData] = useState({
    projectName: "",
    category: "Tech Startup",
    targetAudience: "",
    budget: "",
    teamSize: "",
    timeline: "",
    businessStage: "Idea Stage",
    competition: "Medium",
    revenueModel: "Subscription",
    executionSteps: "",
    description: "",
  });

  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  const localAnalysis =
    calculateRisk(formData);

  const aiAnalysis =
    await analyzeWithGemini(formData);

  if (aiAnalysis) {
    const finalRiskScore = Math.round(
  (localAnalysis.riskScore +
    aiAnalysis.riskScore) / 2
);

let finalSentiment = "Positive";

// Very risky startups
if (
  finalRiskScore >= 75 ||
  formData.competition === "Very High"
) {

  finalSentiment = "Saturated";

// Medium-level business risk
} else if (

  finalRiskScore >= 35 ||

  formData.competition === "High" ||

  formData.businessStage === "Idea Stage"

) {

  finalSentiment = "Moderate";
}

setResult({
  riskScore: finalRiskScore,

  riskLevel:
    finalRiskScore >= 85
      ? "Very High"
      : finalRiskScore >= 60
      ? "High"
      : finalRiskScore >= 35
      ? "Medium"
      : "Low",

  risks:
    aiAnalysis.topRisks ||
    localAnalysis.risks,

  suggestions:
    aiAnalysis.suggestions ||
    localAnalysis.suggestions,

  // FORCE LOCAL SENTIMENT
  marketSentiment: finalSentiment,

  successProbability:
    Math.max(
      15,
      100 - finalRiskScore
    ),
});

    try {
  await addDoc(
    collection(db, "analyses"),
    {
      projectName: formData.projectName,
      category: formData.category,
      riskScore: finalRiskScore,
      marketSentiment: finalSentiment,
      createdAt: new Date(),
    }
  );

  console.log("Saved to Firebase");

} catch (error) {
  console.log(error);
}

      
    setLoading(false);

  } else {
    setResult(localAnalysis);
    setLoading(false);
  }
};

  return (
    <div className="px-6 md:px-16 pb-24">
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gradient-to-br from-[#0B1F29] to-[#102B36] p-10 rounded-[32px] border border-cyan-900 shadow-[0_0_40px_rgba(0,255,255,0.08)]"
      >
        <input
          type="text"
          name="projectName"
          placeholder="Project / Startup Name"
          onChange={handleChange}
          className="p-4 rounded-2xl bg-[#0A1920] border border-cyan-900/40 focus:border-cyan-400 outline-none transition"
        />

        <select
          name="category"
          onChange={handleChange}
          className="p-4 rounded-2xl bg-[#0A1920] border border-cyan-900/40 focus:border-cyan-400 outline-none transition"
        >
          <option>Tech Startup</option>
          <option>D2C Brand</option>
          <option>Event</option>
          <option>E-commerce</option>
          <option>AI Product</option>
          <option>Educational Platform</option>
        </select>

        <input
          type="text"
          name="targetAudience"
          placeholder="Target Audience"
          onChange={handleChange}
          className="p-4 rounded-2xl bg-[#0A1920] border border-cyan-900/40 focus:border-cyan-400 outline-none transition"
        />

        <input
          type="number"
          name="budget"
          placeholder="Budget"
          onChange={handleChange}
          className="p-4 rounded-2xl bg-[#0A1920] border border-cyan-900/40 focus:border-cyan-400 outline-none transition"
        />

        <input
          type="number"
          name="teamSize"
          placeholder="Team Size"
          onChange={handleChange}
          className="p-4 rounded-2xl bg-[#0A1920] border border-cyan-900/40 focus:border-cyan-400 outline-none transition"
        />

        <input
          type="number"
          name="timeline"
          placeholder="Timeline (days)"
          onChange={handleChange}
          className="p-4 rounded-2xl bg-[#0A1920] border border-cyan-900/40 focus:border-cyan-400 outline-none transition"
        />

        <select
          name="businessStage"
          onChange={handleChange}
          className="p-4 rounded-2xl bg-[#0A1920] border border-cyan-900/40 focus:border-cyan-400 outline-none transition"
        >
          <option>Idea Stage</option>
          <option>MVP Stage</option>
          <option>Scaling</option>
        </select>

        <select
          name="competition"
          onChange={handleChange}
          className="p-4 rounded-2xl bg-[#0A1920] border border-cyan-900/40 focus:border-cyan-400 outline-none transition"
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
          <option>Very High</option>
        </select>

        <select
          name="revenueModel"
          onChange={handleChange}
          className="p-4 rounded-2xl bg-[#0A1920] border border-cyan-900/40 focus:border-cyan-400 outline-none transition"
        >
          <option>Subscription</option>
          <option>Freemium</option>
          <option>Ads</option>
          <option>Services</option>
          <option>Not Defined Yet</option>
        </select>

        <textarea
          name="executionSteps"
          placeholder="Execution Steps"
          onChange={handleChange}
          className="p-3 rounded-xl bg-[#102B36] md:col-span-2"
        />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="p-3 rounded-xl bg-[#102B36] md:col-span-2"
        />

        <button
          type="submit"
          className="bg-cyan-400 text-black py-4 rounded-2xl font-black text-lg md:col-span-2 hover:scale-[1.02] hover:bg-cyan-300 transition duration-300"
        >
          Analyze Execution Risk
        </button>
      </form>

      {loading && (
        <div className="mt-10 text-center">
            <div className="animate-pulse text-cyan-400 text-2xl font-bold">
            AI Analyzing Market Risks...
            </div>
        </div>
        )}

        {result && !loading && (
        <RiskDashboard
  result={result}
  projectName={
    formData.projectName
  }
/>
      )}
    </div>
  );
};

export default ProjectForm;