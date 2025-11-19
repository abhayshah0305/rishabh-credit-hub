import { Card } from "@/components/ui/card";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

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
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Credit Exposure</h2>
        <p className="text-muted-foreground mt-2">Vendor-level exposure and risk distribution</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Exposure by Vendor (₹ Cr)</h3>
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
          <h3 className="text-lg font-semibold mb-4">Exposure by Ageing Bucket</h3>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Overdue Analysis</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={overdueData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {overdueData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">At-Risk Summary</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground">Total Overdue</p>
                <p className="text-2xl font-bold text-destructive">₹1.6 Cr</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Vendors</p>
                <p className="text-2xl font-bold">23</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Overdue 15-30 days</span>
                <span className="font-medium">₹0.8 Cr</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Overdue 31-60 days</span>
                <span className="font-medium text-warning">₹0.5 Cr</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Overdue &gt; 60 days</span>
                <span className="font-medium text-destructive">₹0.3 Cr</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
