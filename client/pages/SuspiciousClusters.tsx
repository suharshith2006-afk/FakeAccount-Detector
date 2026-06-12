import Placeholder from "./Placeholder";
import { AlertTriangle } from "lucide-react";

const SuspiciousClusters = () => {
  return (
    <Placeholder
      title="Suspicious Clusters"
      description="Network graph visualization showing coordinated fake account clusters with relationship mapping."
      icon={AlertTriangle}
    />
  );
};

export default SuspiciousClusters;
