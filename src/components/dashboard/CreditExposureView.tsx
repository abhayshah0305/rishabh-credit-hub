import { useState } from "react";
import { Card } from "@/components/ui/card";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { TimeFilter } from "@/components/ui/time-filter";

const vendorExposure = [
  { vendor: "Vendor A", exposure: 8.5, risk: "low" },
  { vendor: "Vendor B", exposure: 6.2, risk: "low" },
  { vendor: "Vendor C", exposure: 5.8, risk: "medium" },
  { vendor: "Vendor D", exposure: 4.3, risk: "medium" },
  { vendor: "Vendor E", exposure: 3.2, risk: "high" },
  { vendor: "Others", exposure: 12.8, risk: "low" },
];

const exposureBuckets = [
  { name: "0-30 Days", value: 65, color: "hsl(var(--chart-3))" },
  { name: "31-60 Days", value: 25, color: "hsl(var(--chart-4))" },
  { name: "61-90 Days", value: 10, color: "hsl(var(--chart-5))" },
];

const overdueData = [
  { name: "On-time", value: 96.8, color: "hsl(var(--chart-3))" },
  { name: "Overdue", value: 3.2, color: "hsl(var(--chart-5))" },
];

export const CreditExposureView = () => {
  const [timeRange, setTimeRange] = useState("90d");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Credit Exposure</h2>
          <p className="text-muted-foreground mt-2">Vendor-level exposure and risk distribution</p>
        </div>
        <TimeFilter value={timeRange} onValueChange={setTimeRange} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-lg font-semibold">Exposure by Vendor (₹ Cr)</h3>
            <TooltipProvider>
              <UITooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p className="text-sm">Outstanding credit exposure by individual vendor. Shows concentration risk and helps identify top exposure accounts requiring close monitoring.</p>
                </TooltipContent>
              </UITooltip>
            </TooltipProvider>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={vendorExposure} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis type="number" className="text-xs" />
              <YAxis dataKey="vendor" type="category" width={80} className="text-xs" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)"
                }} 
              />
              <Bar dataKey="exposure" fill="hsl(var(--chart-1))" name="Exposure (₹ Cr)" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-lg font-semibold">Exposure by Ageing Bucket</h3>
            <TooltipProvider>
              <UITooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p className="text-sm">Breakdown of credit exposure by age of outstanding amounts. Earlier buckets (0-30 days) represent lower risk compared to aged exposures.</p>
                </TooltipContent>
              </UITooltip>
            </TooltipProvider>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={exposureBuckets}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {exposureBuckets.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <h3 className="text-lg font-semibold">At-Risk Summary</h3>
          <TooltipProvider>
            <UITooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p className="text-sm">Summary of overdue amounts by aging categories. Longer overdue periods indicate higher risk of potential losses and require immediate attention.</p>
              </TooltipContent>
            </UITooltip>
          </TooltipProvider>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <p className="text-sm font-medium text-destructive">Total Overdue</p>
              <TooltipProvider>
                <UITooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-3 w-3 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p className="text-sm">Total amount and number of vendors with overdue payments requiring immediate collection efforts and risk assessment.</p>
                  </TooltipContent>
                </UITooltip>
              </TooltipProvider>
            </div>
            <p className="text-3xl font-bold text-destructive">₹1.6 Cr</p>
            <p className="text-sm text-muted-foreground mt-1">23 vendors affected</p>
          </div>
          
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
            <p className="text-sm font-medium text-warning mb-2">High Priority</p>
            <p className="text-3xl font-bold text-warning">₹0.8 Cr</p>
            <p className="text-sm text-muted-foreground mt-1">31-60+ days overdue</p>
          </div>
          
          <div className="bg-success/10 border border-success/20 rounded-lg p-4">
            <p className="text-sm font-medium text-success mb-2">On-time Payments</p>
            <p className="text-3xl font-bold text-success">96.8%</p>
            <p className="text-sm text-muted-foreground mt-1">257 vendors performing</p>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-md font-semibold text-foreground">Overdue Breakdown</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span className="text-sm font-medium">15-30 days</span>
              </div>
              <span className="font-semibold">₹0.8 Cr</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-warning/10 rounded-lg border border-warning/20">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                <span className="text-sm font-medium">31-60 days</span>
              </div>
              <span className="font-semibold text-warning">₹0.5 Cr</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-destructive/10 rounded-lg border border-destructive/20">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-sm font-medium">60+ days</span>
              </div>
              <span className="font-semibold text-destructive">₹0.3 Cr</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
