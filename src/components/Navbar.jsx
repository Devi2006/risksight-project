const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[#06141B]/80 border-b border-cyan-900/30">
      <div className="flex justify-between items-center px-8 py-5">

        <div>
          <h1 className="text-3xl font-black text-cyan-400">
            RiskSight
          </h1>

          <p className="text-xs text-gray-500">
            Startup Execution Intelligence
          </p>
        </div>

        <div className="text-sm text-cyan-300 border border-cyan-800 px-4 py-2 rounded-xl">
          AI Risk Analyzer
        </div>

      </div>
    </nav>
  );
};

export default Navbar;