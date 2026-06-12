import { Link, useLocation } from "react-router-dom";
import { Shield } from "lucide-react";

const Header = () => {
  const location = useLocation();

  const navItems = [
    { label: "Dashboard", path: "/" },
    { label: "Analyze Account", path: "/analyze" },
    { label: "Trends", path: "/trends" },
    { label: "Reports", path: "/reports" },
  ];

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-700 border-b border-blue-800 sticky top-0 z-50 shadow-lg" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <div className="max-w-full px-8 py-8">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="p-3 bg-white/20 rounded-lg border border-white/40 backdrop-blur-sm shadow-lg">
              <Shield className="text-white" size={36} />
            </div>
            <div className="flex flex-col text-center">
              <h1 className="text-4xl font-bold text-white tracking-tight" style={{ fontWeight: 700 }}>
                Fake Account Detection
              </h1>
              <p className="text-white font-bold text-base mt-2" style={{ fontWeight: 600, letterSpacing: '0.5px' }}>Security Analytics Platform</p>
            </div>
          </div>
        </div>

        <nav className="flex gap-3 mt-6 justify-center flex-wrap">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`px-6 py-3 text-base font-bold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 ${
                  isActive
                    ? "bg-white text-blue-700 shadow-lg scale-105"
                    : "bg-blue-500/60 text-white hover:bg-blue-400/80 backdrop-blur-sm border border-white/30"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Header;
