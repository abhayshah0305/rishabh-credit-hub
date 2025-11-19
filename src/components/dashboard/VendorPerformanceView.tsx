import { useState } from "react";
import { Card } from "@/components/ui/card";
import { BarChart, Bar, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ZAxis } from "recharts";
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { TimeFilter } from "@/components/ui/time-filter";

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
  const [timeRange, setTimeRange] = useState("90d");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Vendor Performance & Behaviour</h2>
          <p className="text-muted-foreground mt-2">Credit scores, purchase patterns, and repayment behavior</p>
        </div>
        <TimeFilter value={timeRange} onValueChange={setTimeRange} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-lg font-semibold">Credit Score Distribution</h3>
            <TooltipProvider>
              <UITooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p className="text-sm">Distribution of vendor credit scores across rating tiers: A (90-100), B (75-89), C (60-74), D (&lt;60). Higher scores indicate lower credit risk.</p>
                </TooltipContent>
              </UITooltip>
            </TooltipProvider>
          </div>
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
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-lg font-semibold">Score Trends</h3>
            <TooltipProvider>
              <UITooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p className="text-sm">Trend analysis showing vendors with improving, declining, or stable credit scores over the monitoring period.</p>
                </TooltipContent>
              </UITooltip>
            </TooltipProvider>
          </div>
          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between p-4 bg-success/10 rounded-lg border border-success/20">
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-muted-foreground">Improving Scores</p>
                  <TooltipProvider>
                    <UITooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-3 w-3 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p className="text-sm">Vendors showing upward credit score movement, indicating improved financial health and reduced risk profile.</p>
                      </TooltipContent>
                    </UITooltip>
                  </TooltipProvider>
                </div>
                <p className="text-2xl font-bold text-success">67 Vendors</p>
              </div>
              <div className="text-4xl text-success">↑</div>
            </div>
            <div className="flex items-center justify-between p-4 bg-destructive/10 rounded-lg border border-destructive/20">
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-muted-foreground">Declining Scores</p>
                  <TooltipProvider>
                    <UITooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-3 w-3 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p className="text-sm">Vendors showing downward credit score movement, requiring closer monitoring and potential risk mitigation measures.</p>
                      </TooltipContent>
                    </UITooltip>
                  </TooltipProvider>
                </div>
                <p className="text-2xl font-bold text-destructive">12 Vendors</p>
              </div>
              <div className="text-4xl text-destructive">↓</div>
            </div>
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-muted-foreground">Stable Scores</p>
                  <TooltipProvider>
                    <UITooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-3 w-3 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p className="text-sm">Vendors maintaining consistent credit scores with minimal fluctuation, indicating stable financial performance.</p>
                      </TooltipContent>
                    </UITooltip>
                  </TooltipProvider>
                </div>
                <p className="text-2xl font-bold text-foreground">201 Vendors</p>
              </div>
              <div className="text-4xl text-muted-foreground">→</div>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <h3 className="text-lg font-semibold">Purchase Cycles vs Repayment Time</h3>
          <TooltipProvider>
            <UITooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p className="text-sm">Scatter plot showing relationship between vendor purchase frequency and average repayment time. Bubble size indicates dispute frequency. Helps identify patterns in vendor behavior.</p>
              </TooltipContent>
            </UITooltip>
          </TooltipProvider>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart 
            data={behaviourData}
            margin={{ top: 20, right: 30, bottom: 60, left: 80 }}
          >
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              type="number" 
              dataKey="purchases" 
              name="Purchase Cycles" 
              domain={[5, 30]}
              tick={{ fontSize: 12 }}
              tickLine={{ stroke: "hsl(var(--muted-foreground))" }}
              axisLine={{ stroke: "hsl(var(--muted-foreground))" }}
              label={{ 
                value: "Monthly Purchase Cycles", 
                position: "insideBottom", 
                offset: -10,
                style: { textAnchor: "middle", fontSize: "12px", fill: "hsl(var(--muted-foreground))" }
              }}
            />
            <YAxis 
              type="number" 
              dataKey="repaymentTime" 
              name="Avg Repayment (Days)" 
              domain={[15, 45]}
              tick={{ fontSize: 12 }}
              tickLine={{ stroke: "hsl(var(--muted-foreground))" }}
              axisLine={{ stroke: "hsl(var(--muted-foreground))" }}
              label={{ 
                value: "Average Repayment Time (Days)", 
                angle: -90, 
                position: "insideLeft",
                style: { textAnchor: "middle", fontSize: "12px", fill: "hsl(var(--muted-foreground))" }
              }}
            />
            <ZAxis 
              type="number" 
              dataKey="disputes" 
              range={[80, 300]} 
              name="Disputes"
            />
            <Tooltip 
              cursor={{ strokeDasharray: "3 3", stroke: "hsl(var(--muted-foreground))", strokeWidth: 1 }}
              contentStyle={{ 
                backgroundColor: "hsl(var(--card))", 
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
                fontSize: "12px"
              }}
              formatter={(value, name) => {
                if (name === "Purchase Cycles") return [value, "Monthly Purchase Cycles"];
                if (name === "Avg Repayment (Days)") return [value + " days", "Average Repayment Time"];
                if (name === "Disputes") return [value, "Number of Disputes"];
                return [value, name];
              }}
              labelFormatter={(label) => `Vendor: ${label || "Unknown"}`}
            />
            <Legend 
              wrapperStyle={{ paddingTop: "20px" }}
              iconType="circle"
            />
            <Scatter 
              name="Vendors" 
              data={behaviourData} 
              fill="hsl(var(--chart-1))"
              stroke="hsl(var(--chart-1))"
              strokeWidth={2}
              fillOpacity={0.6}
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
