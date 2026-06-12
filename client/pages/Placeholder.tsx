import { Lightbulb } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";

interface PlaceholderProps {
  title: string;
  description: string;
  icon?: any;
}

const Placeholder = ({ title, description, icon: Icon = Lightbulb }: PlaceholderProps) => {
  return (
    <AppLayout>
      <div className="p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-cyan-400 mb-2">{title}</h2>
          <p className="text-slate-400">Under development</p>
        </div>

        <div className="neon-border p-12 rounded-lg backdrop-blur-sm text-center max-w-md mx-auto mt-16">
          <Icon size={64} className="text-cyan-400/50 mx-auto mb-6" />
          <h3 className="text-lg font-semibold text-slate-300 mb-2">
            {title} Page
          </h3>
          <p className="text-slate-400 mb-6">{description}</p>
          <div className="text-xs text-cyan-400/70 bg-cyan-500/10 border border-cyan-500/20 rounded px-3 py-2">
            💡 Continue prompting to fill in this page content
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Placeholder;
