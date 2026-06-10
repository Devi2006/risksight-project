import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const riskData = [
  {
    name: "Budget",
    risk: 85,
  },
  {
    name: "Timeline",
    risk: 70,
  },
  {
    name: "Competition",
    risk: 90,
  },
  {
    name: "Execution",
    risk: 60,
  },
];

const growthData = [
  {
    month: "Stage 1",
    growth: 20,
  },
  {
    month: "Stage 2",
    growth: 40,
  },
  {
    month: "Stage 3",
    growth: 65,
  },
  {
    month: "Stage 4",
    growth: 85,
  },
];

const InsightsCarousel = () => {
  return (
    <div className="mt-10 bg-gradient-to-br from-[#0B1F29] to-[#102B36] p-10 rounded-[32px] border border-cyan-900 shadow-[0_0_50px_rgba(0,255,255,0.08)]">

      <h2 className="text-3xl font-bold text-cyan-400 mb-10">
        Business Insights
      </h2>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">

        <div className="bg-[#09171D] border border-cyan-900/30 p-6 rounded-3xl">

          <h3 className="text-xl mb-6 text-cyan-300">
            Risk Severity Analysis
          </h3>

          <div className="h-[300px]">
            <ResponsiveContainer>
              <BarChart data={riskData}>
                <XAxis dataKey="name" stroke="#ccc" />

                <YAxis stroke="#ccc" />

                <Tooltip />

                <Bar
                  dataKey="risk"
                  fill="#00FFFF"
                  radius={[10, 10, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#09171D] border border-cyan-900/30 p-6 rounded-3xl">

          <h3 className="text-xl mb-6 text-cyan-300">
            Startup Growth Projection
          </h3>

          <div className="h-[300px]">
            <ResponsiveContainer>
              <LineChart data={growthData}>
                <XAxis dataKey="month" stroke="#ccc" />

                <YAxis stroke="#ccc" />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="growth"
                  stroke="#00FFFF"
                  strokeWidth={4}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-10">

        <div className="bg-[#09171D] p-6 rounded-3xl border border-cyan-900/30">
          <h3 className="text-cyan-300 text-lg mb-3">
            Market Competition
          </h3>

          <p className="text-4xl font-black text-red-400">
            High
          </p>

          <p className="text-gray-400 mt-2">
            Strong competitors detected in this segment.
          </p>
        </div>

        <div className="bg-[#09171D] p-6 rounded-3xl border border-cyan-900/30">
          <h3 className="text-cyan-300 text-lg mb-3">
            Funding Readiness
          </h3>

          <p className="text-4xl font-black text-yellow-300">
            Medium
          </p>

          <p className="text-gray-400 mt-2">
            Additional financial planning recommended.
          </p>
        </div>

        <div className="bg-[#09171D] p-6 rounded-3xl border border-cyan-900/30">
          <h3 className="text-cyan-300 text-lg mb-3">
            Execution Readiness
          </h3>

          <p className="text-4xl font-black text-green-400">
            Stable
          </p>

          <p className="text-gray-400 mt-2">
            Execution roadmap mostly structured.
          </p>
        </div>

      </div>
    </div>
  );
};

export default InsightsCarousel;