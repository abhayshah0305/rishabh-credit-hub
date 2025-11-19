import { Card } from "@/components/ui/card";
import { BarChart, Bar, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ZAxis } from "recharts";

const scoreDistribution = [
  { tier: "A (90-100)", count: 145 },
  { tier: "B (75-89)", count: 89 },
  { tier: "C (60-74)", count: 34 },
  { tier: "D (<60)", count: 12 },
];

const behaviourData = [
  { purchases: 12, repaymentTime: 28, disputes: 0, vendor: "V1" },
  { purchases: 18, repaymentTime: 25, disputes: 1, vendor: "V2" },
  { purchases: 8, repaymentTime: 35, disputes: 2, vendor: "V3" },
  { purchases: 22, repaymentTime: 22, disputes: 0, vendor: "V4" },
  { purchases: 15, repaymentTime: 30, disputes: 1, vendor: "V5" },
  { purchases: 25, repaymentTime: 20, disputes: 0, vendor: "V6" },
  { purchases: 10, repaymentTime: 40, disputes: 3, vendor: "V7" },
  { purchases: 20, repaymentTime: 24, disputes: 0, vendor: "V8" },
];

export const VendorPerformanceView = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Vendor Performance & Behaviour</h2>
        <p className="text-muted-foreground mt-2">Credit scores, purchase patterns, and repayment behavior</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Credit Score Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={scoreDistribution}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="tier" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)"
                }} 
              />
              <Legend />
              <Bar dataKey="count" fill="hsl(var(--chart-2))" name="Vendor Count" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Score Trends</h3>
          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between p-4 bg-success/10 rounded-lg border border-success/20">
              <div>
                <p className="text-sm text-muted-foreground">Improving Scores</p>
                <p className="text-2xl font-bold text-success">67 Vendors</p>
              </div>
              <div className="text-4xl text-success">↑</div>
            </div>
            <div className="flex items-center justify-between p-4 bg-destructive/10 rounded-lg border border-destructive/20">
              <div>
                <p className="text-sm text-muted-foreground">Declining Scores</p>
                <p className="text-2xl font-bold text-destructive">12 Vendors</p>
              </div>
              <div className="text-4xl text-destructive">↓</div>
            </div>
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground">Stable Scores</p>
                <p className="text-2xl font-bold text-foreground">201 Vendors</p>
              </div>
              <div className="text-4xl text-muted-foreground">→</div>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Purchase Cycles vs Repayment Time</h3>
        <ResponsiveContainer width="100%" height={350}>
          <ScatterChart>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              type="number" 
              dataKey="purchases" 
              name="Purchase Cycles" 
              className="text-xs"
              label={{ value: "Monthly Purchase Cycles", position: "insideBottom", offset: -5 }}
            />
            <YAxis 
              type="number" 
              dataKey="repaymentTime" 
              name="Avg Repayment (Days)" 
              className="text-xs"
              label={{ value: "Avg Repayment Time (Days)", angle: -90, position: "insideLeft" }}
            />
            <ZAxis type="number" dataKey="disputes" range={[50, 400]} name="Disputes" />
            <Tooltip 
              cursor={{ strokeDasharray: "3 3" }}
              contentStyle={{ 
                backgroundColor: "hsl(var(--card))", 
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)"
              }}
            />
            <Legend />
            <Scatter 
              name="Vendors" 
              data={behaviourData} 
              fill="hsl(var(--chart-1))" 
            />
          </ScatterChart>
        </ResponsiveContainer>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Bubble size represents dispute frequency
        </p>
      </Card>
    </div>
  );
};
