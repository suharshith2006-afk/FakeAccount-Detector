import { Link, useLocation } from "react-router-dom";
import {
  BarChart3,
  Eye,
  Settings,
  TrendingUp,
  AlertTriangle,
  Search,
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { icon: Eye, label: "Overview", path: "/" },
    { icon: Search, label: "Account Analysis", path: "/analyze" },
    { icon: TrendingUp, label: "Trending Content", path: "/trends" },
    { icon: BarChart3, label: "Reports", path: "/reports" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <aside className="w-64 bg-gray-50 border-r border-gray-200 min-h-screen p-6 flex flex-col">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-blue-900 mb-2 flex items-center gap-2">
          <AlertTriangle size={24} className="text-blue-600" />
          CYBERS
        </h2>
        <p className="text-xs text-gray-600">Security Analytics</p>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-blue-100 text-blue-900 border border-blue-300"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Icon size={20} />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 px-4">
          Team CYBERS | CTF@048
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
