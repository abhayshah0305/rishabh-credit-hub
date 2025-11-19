import { Card } from "@/components/ui/card";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const capitalData = [
  { month: "Jan", unlocked: 32, target: 30 },
  { month: "Feb", unlocked: 35, target: 32 },
  { month: "Mar", unlocked: 38, target: 35 },
  { month: "Apr", unlocked: 42, target: 38 },
  { month: "May", unlocked: 45, target: 40 },
  { month: "Jun", unlocked: 45.2, target: 42 },
];

const cycleData = [
  { month: "Jan", days: 45 },
  { month: "Feb", days: 35 },
  { month: "Mar", days: 25 },
  { month: "Apr", days: 15 },
  { month: "May", days: 8 },
  { month: "Jun", days: 5 },
];

export const WorkingCapitalView = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Working Capital Impact</h2>
        <p className="text-muted-foreground mt-2">Capital unlocked and cycle time reduction trends</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Working Capital Unlocked (₹ Cr)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={capitalData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="month" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)"
                }} 
              />
              <Legend />
              <Bar dataKey="unlocked" fill="hsl(var(--chart-1))" name="Unlocked" />
              <Bar dataKey="target" fill="hsl(var(--chart-2))" name="Target" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Credit Cycle Compression (Days)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={cycleData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="month" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)"
                }} 
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="days" 
                stroke="hsl(var(--chart-2))" 
                strokeWidth={3}
                name="Cycle Days"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Key Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">NBFC Disbursal SLA</p>
            <p className="text-2xl font-bold text-success">T+0.5</p>
            <p className="text-xs text-muted-foreground">Average settlement time</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Cash Flow Variance</p>
            <p className="text-2xl font-bold text-foreground">±2.3%</p>
            <p className="text-xs text-muted-foreground">Predictability score: High</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Monthly Growth</p>
            <p className="text-2xl font-bold text-accent">+23.5%</p>
            <p className="text-xs text-muted-foreground">Capital unlock rate</p>
          </div>
        </div>
      </Card>
    </div>
  );
};
