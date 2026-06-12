import Placeholder from "./Placeholder";
import { Settings as SettingsIcon } from "lucide-react";

const Settings = () => {
  return (
    <Placeholder
      title="Settings"
      description="Configure detection parameters, alerts, and security preferences."
      icon={SettingsIcon}
    />
  );
};

export default Settings;
