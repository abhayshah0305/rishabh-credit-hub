import { KpiCard } from "./KpiCard";
import { Card } from "@/components/ui/card";
import { TrendingUp, Clock, FileText, DollarSign, CheckCircle, AlertTriangle } from "lucide-react";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

const monthlyTrend = [
  { month: "Jan", capital: 32, invoices: 890, repayment: 94.2 },
  { month: "Feb", capital: 35, invoices: 945, repayment: 95.1 },
  { month: "Mar", capital: 38, invoices: 1020, repayment: 95.8 },
  { month: "Apr", capital: 42, invoices: 1135, repayment: 96.2 },
  { month: "May", capital: 45, invoices: 1198, repayment: 96.5 },
  { month: "Jun", capital: 45.2, invoices: 1247, repayment: 96.8 },
];

const exposureBreakdown = [
  { name: "Low Risk", value: 72, color: "hsl(var(--chart-3))" },
  { name: "Medium Risk", value: 26, color: "hsl(var(--chart-4))" },
  { name: "High Risk", value: 2, color: "hsl(var(--chart-5))" },
];

const nbfcPerformance = [
  { metric: "T+0", value: 45 },
  { metric: "T+0.5", value: 38 },
  { metric: "T+1", value: 15 },
  { metric: ">T+1", value: 2 },
];

export const ExecutiveSummary = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Executive Summary</h2>
        <p className="text-muted-foreground mt-2">High-level performance metrics at a glance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <KpiCard
          title="Total Working Capital Unlocked"
          value="₹45.2 Cr"
          change={23.5}
          changeLabel="vs last month"
          trend="up"
          icon={<TrendingUp className="h-6 w-6" />}
          tooltip="Total capital freed up through NBFC instant settlement, enabling vendors to reinvest in their business operations without waiting for payment cycles."
        />
        <KpiCard
          title="Credit Cycle Compression"
          value="5 Days"
          change={88.9}
          changeLabel="from 45 days"
          trend="up"
          icon={<Clock className="h-6 w-6" />}
          tooltip="Average time reduction from invoice submission to vendor payment. Previous cycle was 45 days, now compressed to 5 days through NBFC financing."
        />
        <KpiCard
          title="Total Invoices Financed"
          value="₹52.8 Cr"
          change={15.2}
          changeLabel="1,247 invoices"
          trend="up"
          icon={<FileText className="h-6 w-6" />}
          tooltip="Total value and count of vendor invoices that have been financed through the credit enablement program, reflecting adoption and coverage."
        />
        <KpiCard
          title="Amount Financed by NBFC"
          value="₹48.5 Cr"
          change={18.7}
          changeLabel="vs last month"
          trend="up"
          icon={<DollarSign className="h-6 w-6" />}
          tooltip="Total liquidity infused into Rishabh World's vendor ecosystem by the NBFC partner, representing immediate working capital availability."
        />
        <KpiCard
          title="Vendor Repayment Performance"
          value="96.8%"
          change={2.3}
          changeLabel="on-time rate"
          trend="up"
          icon={<CheckCircle className="h-6 w-6" />}
          tooltip="Percentage of vendors making on-time repayments to the NBFC. Higher rates indicate lower credit risk and healthy vendor financial behavior."
        />
        <KpiCard
          title="RW Exposure"
          value="₹0.8 Cr"
          change={-75.4}
          changeLabel="risk transfer active"
          trend="up"
          icon={<AlertTriangle className="h-6 w-6" />}
          tooltip="Rishabh World's remaining financial exposure after risk transfer to NBFC. Lower exposure indicates successful risk mitigation strategy."
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">6-Month Performance Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyTrend}>
              <defs>
                <linearGradient id="capitalGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="invoiceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="month" className="text-xs" />
              <YAxis yAxisId="left" className="text-xs" />
              <YAxis yAxisId="right" orientation="right" className="text-xs" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)"
                }} 
              />
              <Legend />
              <Area 
                yAxisId="left"
                type="monotone" 
                dataKey="capital" 
                stroke="hsl(var(--chart-1))" 
                fill="url(#capitalGradient)"
                strokeWidth={2}
                name="Capital Unlocked (₹Cr)"
              />
              <Area 
                yAxisId="right"
                type="monotone" 
                dataKey="invoices" 
                stroke="hsl(var(--chart-2))" 
                fill="url(#invoiceGradient)"
                strokeWidth={2}
                name="Invoice Count"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Vendor Risk Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={exposureBreakdown}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {exposureBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-success">202</p>
              <p className="text-xs text-muted-foreground">Low Risk</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-warning">73</p>
              <p className="text-xs text-muted-foreground">Medium Risk</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-destructive">5</p>
              <p className="text-xs text-muted-foreground">High Risk</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">NBFC Settlement Speed Distribution</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={nbfcPerformance}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="metric" className="text-xs" />
              <YAxis className="text-xs" label={{ value: "% of Disbursals", angle: -90, position: "insideLeft" }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)"
                }}
                formatter={(value) => [`${value}%`, "Disbursals"]}
              />
              <Bar dataKey="value" fill="hsl(var(--chart-2))" name="Settlement %" />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-xs text-muted-foreground text-center mt-2">
            83% of disbursals settled within same day (T+0 to T+0.5)
          </p>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Repayment Performance Trend</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="month" className="text-xs" />
              <YAxis domain={[93, 98]} className="text-xs" label={{ value: "On-time Rate (%)", angle: -90, position: "insideLeft" }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)"
                }}
                formatter={(value) => [`${value}%`, "On-time Rate"]}
              />
              <Line 
                type="monotone" 
                dataKey="repayment" 
                stroke="hsl(var(--chart-3))" 
                strokeWidth={3}
                dot={{ fill: "hsl(var(--chart-3))", r: 5 }}
                name="Repayment %"
              />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-xs text-muted-foreground text-center mt-2">
            Consistent improvement: +2.6% over 6 months
          </p>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Key Performance Highlights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Average Vendor Utilization</p>
            <p className="text-3xl font-bold text-accent">68%</p>
            <p className="text-xs text-muted-foreground">of credit limit used</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Program ROI</p>
            <p className="text-3xl font-bold text-success">342%</p>
            <p className="text-xs text-muted-foreground">operational efficiency gain</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Vendor Adoption Rate</p>
            <p className="text-3xl font-bold text-primary">87%</p>
            <p className="text-xs text-muted-foreground">280 of 320 vendors</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Cost Reduction</p>
            <p className="text-3xl font-bold text-accent">90%</p>
            <p className="text-xs text-muted-foreground">vs manual credit ops</p>
          </div>
        </div>
      </Card>
    </div>
  );
};
