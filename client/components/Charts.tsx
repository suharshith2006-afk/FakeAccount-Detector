import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface ChartData {
  fill?: string;
  name?: string;
  value?: number;
  date?: string;
  activity?: number;
  detections?: number;
}

interface ChartComponentsProps {
  fakeVsGenuineData: ChartData[];
  activityData: ChartData[];
}

const ChartComponents = ({ fakeVsGenuineData, activityData }: ChartComponentsProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Fake vs Genuine Chart */}
      <div className="neon-border p-6 rounded-lg backdrop-blur-sm">
        <h3 className="text-lg font-semibold text-cyan-400 mb-6">
          Account Classification
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={fakeVsGenuineData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,200,255,0.1)" />
            <XAxis stroke="rgba(200,200,200,0.5)" />
            <YAxis stroke="rgba(200,200,200,0.5)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(15, 23, 42, 0.9)",
                border: "1px solid rgba(0, 200, 255, 0.3)",
                borderRadius: "8px",
              }}
              formatter={(value: any) => value.toLocaleString()}
            />
            <Bar dataKey="value" radius={[8, 8, 0, 0]}>
              {fakeVsGenuineData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Activity Over Time Chart */}
      <div className="neon-border p-6 rounded-lg backdrop-blur-sm">
        <h3 className="text-lg font-semibold text-cyan-400 mb-6">
          Activity Over Time
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={activityData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,200,255,0.1)" />
            <XAxis
              stroke="rgba(200,200,200,0.5)"
              style={{ fontSize: "12px" }}
            />
            <YAxis
              stroke="rgba(200,200,200,0.5)"
              style={{ fontSize: "12px" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(15, 23, 42, 0.9)",
                border: "1px solid rgba(0, 200, 255, 0.3)",
                borderRadius: "8px",
              }}
              formatter={(value: any) => value.toLocaleString()}
            />
            <Legend wrapperStyle={{ paddingTop: "20px" }} />
            <Line
              type="monotone"
              dataKey="activity"
              stroke="hsl(200 100% 50%)"
              strokeWidth={2}
              dot={{ fill: "hsl(200 100% 50%)", r: 4 }}
              activeDot={{ r: 6 }}
              isAnimationActive
            />
            <Line
              type="monotone"
              dataKey="detections"
              stroke="hsl(0 100% 50%)"
              strokeWidth={2}
              dot={{ fill: "hsl(0 100% 50%)", r: 4 }}
              activeDot={{ r: 6 }}
              isAnimationActive
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartComponents;
