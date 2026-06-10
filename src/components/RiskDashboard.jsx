import InsightsCarousel from "./InsightsCarousel";
import { exportPDF } from "../utils/pdfExport";
const RiskDashboard = ({ result, projectName }) => {

    const displayMarketSentiment =
  result.marketSentiment ??
  (result.riskLevel === "Very High"
    ? "Saturated"
    : result.riskLevel === "High"
    ? "Moderate"
    : result.riskLevel === "Medium"
    ? "Moderate"
    : "Positive");

const displayRiskLevel =
  result.riskLevel ?? "Low";
  return (
    <div className="mt-14 relative">
      <div className="bg-gradient-to-br from-[#0B1F29] to-[#102B36] border border-cyan-900 rounded-[32px] p-10 shadow-[0_0_50px_rgba(0,255,255,0.08)]">
        <h2 className="text-4xl font-bold text-cyan-400 mb-8">
          Execution Intelligence Report
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <div className="bg-[#09171D] border border-cyan-900/30 p-7 rounded-3xl hover:border-cyan-400/50 transition duration-300">
            <h3 className="text-xl mb-3">
              Risk Score
            </h3>

            <p className="text-5xl font-bold text-red-400">
              {result.riskScore}
            </p>
          </div>

          <div className="bg-[#09171D] border border-cyan-900/30 p-7 rounded-3xl hover:border-cyan-400/50 transition duration-300">
            <h3 className="text-xl mb-3">
              Risk Level
            </h3>

            <p className="text-3xl font-bold text-yellow-300">
              <span
  className={
    result.riskLevel === "Very High"
      ? "text-red-500 font-bold"
      : result.riskLevel === "High"
      ? "text-orange-400 font-bold"
      : result.riskLevel === "Medium"
      ? "text-yellow-300 font-bold"
      : "text-green-400 font-bold"
  }
>
  {result.riskLevel}
</span>
            </p>
          </div>

          <div className="bg-[#09171D] border border-cyan-900/30 p-7 rounded-3xl hover:border-cyan-400/50 transition duration-300">
            <h3 className="text-xl mb-3">
              Market Sentiment
            </h3>

            <p
  className={`text-3xl font-bold ${
    result.marketSentiment === "Saturated"
      ? "text-red-500"
      : result.marketSentiment === "Moderate"
      ? "text-yellow-300"
      : "text-green-400"
  }`}
>
  {result.marketSentiment || "Positive"}
</p>
          </div>

          <div className="bg-[#09171D] border border-cyan-900/30 p-7 rounded-3xl hover:border-cyan-400/50 transition duration-300">
            <h3 className="text-xl mb-3">
              Success Probability
            </h3>

            <p className="text-4xl font-bold text-cyan-400">
              {Math.max(
                15,
                result.successProbability ||
                    100 - result.riskScore
                )}%
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-10">
          <div className="bg-[#09171D] border border-cyan-900/30 p-7 rounded-3xl hover:border-cyan-400/50 transition duration-300">
            <h3 className="text-2xl mb-4 text-cyan-300">
              Critical Risk Factors
            </h3>

            <ul className="space-y-3">
              {result.risks.map((risk, index) => (
                <li key={index}>
                  ⚠️ {risk}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#09171D] border border-cyan-900/30 p-7 rounded-3xl hover:border-cyan-400/50 transition duration-300">
            <h3 className="text-2xl mb-4 text-cyan-300">
              Strategic Recommendations
            </h3>

            <ul className="space-y-3">
              {result.suggestions.map(
                (item, index) => (
                  <li key={index}>
                    ✅ {item}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
    <div className="flex justify-end mt-8">
        <button
            onClick={() =>
            exportPDF(
                result,
                projectName
            )
            }
            className="bg-cyan-400 text-black px-6 py-3 rounded-2xl font-bold hover:bg-cyan-300"
        >
            Export PDF Report
        </button>
    </div>

    <div className="mt-10 bg-[#09171D] border border-cyan-900/30 p-8 rounded-3xl">

  <h2 className="text-2xl font-bold text-cyan-300 mb-6">
    Executive Summary
  </h2>

  <p className="text-gray-300 leading-8">

  RiskSight predicts that this initiative currently falls into the

  <span className="text-cyan-400 font-bold">
    {" "} {result.riskLevel} {" "}
  </span>

  risk category.

  Based on the provided business information,
  the projected success probability is

  <span className="text-cyan-400 font-bold">
    {" "}
{result.successProbability ??
  Math.max(15, 100 - result.riskScore)}
%
{" "}
  </span>

  with a market sentiment of

  <span className="text-cyan-400 font-bold">
    {" "}
{result.marketSentiment ??
  (result.riskLevel === "Very High"
    ? "Saturated"
    : result.riskLevel === "High"
    ? "Moderate"
    : result.riskLevel === "Medium"
    ? "Moderate"
    : "Positive")}
{" "}
  </span>

  .

  The primary risk drivers include:

  <span className="text-red-400 font-bold">
    {" "} {result.risks.slice(0, 3).join(", ")}.
  </span>

  Addressing these concerns early can significantly
  improve the likelihood of successful execution and
  sustainable growth.

</p>

</div>

<div className="mt-8 bg-[#09171D] border border-cyan-900/30 p-8 rounded-3xl">

  <h2 className="text-2xl font-bold text-cyan-300 mb-6">
    AI Action Plan
  </h2>

  <div className="space-y-5">

    <div>
      <h3 className="font-bold text-cyan-400">
        Phase 1 — Validation
      </h3>

      <p className="text-gray-400">
        Validate market demand and customer pain points.
      </p>
    </div>

    <div>
      <h3 className="font-bold text-cyan-400">
        Phase 2 — Build
      </h3>

      <p className="text-gray-400">
        Develop MVP and test with early users.
      </p>
    </div>

    <div>
      <h3 className="font-bold text-cyan-400">
        Phase 3 — Growth
      </h3>

      <p className="text-gray-400">
        Execute marketing strategy and collect feedback.
      </p>
    </div>

    <div>
      <h3 className="font-bold text-cyan-400">
        Phase 4 — Scale
      </h3>

      <p className="text-gray-400">
        Optimize operations and expand reach.
      </p>
    </div>

  </div>

</div>

<div className="mt-8 bg-[#09171D] border border-cyan-900/30 p-8 rounded-3xl">

  <h2 className="text-2xl font-bold text-cyan-300 mb-6">
    AI Verdict
  </h2>

  {result.riskLevel === "Very High" ? (

    <div>
      <p className="text-red-400 text-2xl font-bold">
        ⚠️ High likelihood of execution challenges
      </p>

      <p className="text-gray-400 mt-4">
        The project currently faces significant risks
        related to competition, funding, execution,
        and long-term sustainability.
      </p>
    </div>

  ) : result.riskLevel === "High" ? (

    <div>
      <p className="text-orange-400 text-2xl font-bold">
        ⚠️ Moderate-to-High execution risk
      </p>

      <p className="text-gray-400 mt-4">
        The idea shows potential but requires stronger
        planning and execution readiness.
      </p>
    </div>

  ) : result.riskLevel === "Medium" ? (

    <div>
      <p className="text-yellow-300 text-2xl font-bold">
        ⚡ Moderate execution viability
      </p>

      <p className="text-gray-400 mt-4">
        The foundation appears promising, though some
        operational and market risks remain.
      </p>
    </div>

  ) : (

    <div>
      <p className="text-green-400 text-2xl font-bold">
        ✅ Strong execution potential
      </p>

      <p className="text-gray-400 mt-4">
        The project demonstrates strong readiness
        and a favorable risk profile.
      </p>
    </div>

  )}

</div>
      <InsightsCarousel />
    </div>
  );
};

export default RiskDashboard;