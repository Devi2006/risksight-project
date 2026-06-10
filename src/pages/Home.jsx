import Navbar from "../components/Navbar";
import ProjectForm from "../components/ProjectForm";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#06141B] text-white overflow-hidden">
      <Navbar />

      <section className="relative flex flex-col items-center justify-center text-center py-24 px-6">

        <div className="absolute w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full top-10"></div>

        <p className="text-cyan-400 uppercase tracking-[6px] mb-4 text-sm">
          AI EXECUTION INTELLIGENCE
        </p>

        <h1 className="text-6xl md:text-7xl font-black leading-tight max-w-5xl">
          Predict Startup
          <span className="text-cyan-400"> Failure </span>
          Before It Happens
        </h1>

        <p className="text-gray-400 text-lg mt-8 max-w-3xl leading-relaxed">
          RiskSight helps startups, founders, creators,
          and teams identify execution risks, market
          challenges, and scalability gaps before launch.
        </p>

        <div className="mt-10">
            <div className="inline-block border border-cyan-800 bg-cyan-500/10 px-6 py-3 rounded-2xl text-cyan-300">
                Analyze startup execution risks in seconds
            </div>
        </div>
      </section>

      <ProjectForm />
    </div>
  );
};

export default Home;