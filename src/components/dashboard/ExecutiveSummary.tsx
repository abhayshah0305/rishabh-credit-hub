import { useState } from "react";
import { KpiCard } from "./KpiCard";
import { Card } from "@/components/ui/card";
import { TrendingUp, Clock, FileText, DollarSign, CheckCircle, AlertTriangle, Info, Scale, UserPlus, Target } from "lucide-react";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { TimeFilter } from "@/components/ui/time-filter";

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

const vendorData = [
  {
    id: "VND001",
    name: "Alpha Industries Ltd.",
    creditScore: 92,
    riskTier: "A",
    capitalUnlocked: "₹8.5 Cr",
    creditLimit: "₹12 Cr",
    utilization: "71%",
    totalBorrowed: "₹24.8 Cr",
    totalRepaid: "₹24.4 Cr",
    creditPeriod: "30 days",
    repaymentRate: "98.5%",
    lastPayment: "On-time",
    totalInvoices: 156,
    overdueAmount: "₹0",
    status: "Active",
    programStatus: "Enrolled"
  },
  {
    id: "VND002",
    name: "Beta Manufacturing Co.",
    creditScore: 88,
    riskTier: "A",
    capitalUnlocked: "₹6.2 Cr",
    creditLimit: "₹8 Cr",
    utilization: "78%",
    totalBorrowed: "₹18.9 Cr",
    totalRepaid: "₹18.4 Cr",
    creditPeriod: "45 days",
    repaymentRate: "97.2%",
    lastPayment: "On-time",
    totalInvoices: 132,
    overdueAmount: "₹0",
    status: "Active",
    programStatus: "Enrolled"
  },
  {
    id: "VND003",
    name: "Gamma Textiles Pvt. Ltd.",
    creditScore: 76,
    riskTier: "B",
    capitalUnlocked: "₹4.8 Cr",
    creditLimit: "₹6 Cr",
    utilization: "80%",
    totalBorrowed: "₹12.3 Cr",
    totalRepaid: "₹11.7 Cr",
    creditPeriod: "30 days",
    repaymentRate: "94.8%",
    lastPayment: "5 days late",
    totalInvoices: 89,
    overdueAmount: "₹0.3 Cr",
    status: "Watch",
    programStatus: "Enrolled"
  },
  {
    id: "VND004",
    name: "Delta Electronics Ltd.",
    creditScore: 85,
    riskTier: "A",
    capitalUnlocked: "N/A",
    creditLimit: "N/A",
    utilization: "N/A",
    totalBorrowed: "N/A",
    totalRepaid: "N/A",
    creditPeriod: "45 days",
    repaymentRate: "N/A",
    lastPayment: "Traditional terms",
    totalInvoices: 178,
    overdueAmount: "₹0",
    status: "Non-Program",
    programStatus: "Not Enrolled"
  },
  {
    id: "VND005",
    name: "Epsilon Chemicals Ltd.",
    creditScore: 69,
    riskTier: "C",
    capitalUnlocked: "₹2.9 Cr",
    creditLimit: "₹4 Cr",
    utilization: "73%",
    totalBorrowed: "₹8.7 Cr",
    totalRepaid: "₹7.8 Cr",
    creditPeriod: "45 days",
    repaymentRate: "89.2%",
    lastPayment: "12 days late",
    totalInvoices: 67,
    overdueAmount: "₹0.8 Cr",
    status: "Alert",
    programStatus: "Enrolled"
  },
  {
    id: "VND006",
    name: "Zeta Packaging Solutions",
    creditScore: 91,
    riskTier: "A",
    capitalUnlocked: "₹5.6 Cr",
    creditLimit: "₹7.5 Cr",
    utilization: "75%",
    totalBorrowed: "₹16.8 Cr",
    totalRepaid: "₹16.7 Cr",
    creditPeriod: "30 days",
    repaymentRate: "99.1%",
    lastPayment: "On-time",
    totalInvoices: 145,
    overdueAmount: "₹0",
    status: "Active",
    programStatus: "Enrolled"
  },
  {
    id: "VND007",
    name: "Eta Steel Works Pvt. Ltd.",
    creditScore: 82,
    riskTier: "B",
    capitalUnlocked: "N/A",
    creditLimit: "N/A",
    utilization: "N/A",
    totalBorrowed: "N/A",
    totalRepaid: "N/A",
    creditPeriod: "60 days",
    repaymentRate: "N/A",
    lastPayment: "Traditional terms",
    totalInvoices: 98,
    overdueAmount: "₹0",
    status: "Non-Program",
    programStatus: "Not Enrolled"
  },
  {
    id: "VND008",
    name: "Theta Food Processing",
    creditScore: 78,
    riskTier: "B",
    capitalUnlocked: "₹4.2 Cr",
    creditLimit: "₹6 Cr",
    utilization: "70%",
    totalBorrowed: "₹13.1 Cr",
    totalRepaid: "₹12.2 Cr",
    creditPeriod: "30 days",
    repaymentRate: "93.4%",
    lastPayment: "2 days late",
    totalInvoices: 123,
    overdueAmount: "₹0.2 Cr",
    status: "Active",
    programStatus: "Enrolled"
  },
  {
    id: "VND009",
    name: "Iota Automotive Parts",
    creditScore: 74,
    riskTier: "B",
    capitalUnlocked: "N/A",
    creditLimit: "N/A",
    utilization: "N/A",
    totalBorrowed: "N/A",
    totalRepaid: "N/A",
    creditPeriod: "45 days",
    repaymentRate: "N/A",
    lastPayment: "Traditional terms",
    totalInvoices: 67,
    overdueAmount: "₹0",
    status: "Non-Program",
    programStatus: "Eligible"
  },
  {
    id: "VND010",
    name: "Kappa Logistics Ltd.",
    creditScore: 66,
    riskTier: "C",
    capitalUnlocked: "N/A",
    creditLimit: "N/A",
    utilization: "N/A",
    totalBorrowed: "N/A",
    totalRepaid: "N/A",
    creditPeriod: "30 days",
    repaymentRate: "N/A",
    lastPayment: "Traditional terms",
    totalInvoices: 43,
    overdueAmount: "₹0",
    status: "Non-Program",
    programStatus: "Under Review"
  }
];

export const ExecutiveSummary = () => {
  const [timeRange, setTimeRange] = useState("30d");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Executive Summary</h2>
          <p className="text-muted-foreground mt-2">High-level performance metrics at a glance</p>
        </div>
        <TimeFilter value={timeRange} onValueChange={setTimeRange} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <KpiCard
          title="Total Working Capital Unlocked"
          value="₹45.2 Cr"
          change={23.5}
          changeLabel="vs last month"
          trend="up"
          icon={<TrendingUp className="h-5 w-5" />}
          tooltip="Total capital freed up through NBFC instant settlement, enabling vendors to reinvest in their business operations without waiting for payment cycles."
        />
        <KpiCard
          title="Credit Cycle Compression"
          value="5 Days"
          change={88.9}
          changeLabel="from 45 days"
          trend="up"
          icon={<Clock className="h-5 w-5" />}
          tooltip="Average time reduction from invoice submission to vendor payment. Previous cycle was 45 days, now compressed to 5 days through NBFC financing."
        />
        <KpiCard
          title="Total Invoices Financed"
          value="₹52.8 Cr"
          change={15.2}
          changeLabel="1,247 invoices"
          trend="up"
          icon={<FileText className="h-5 w-5" />}
          tooltip="Total value and count of vendor invoices that have been financed through the credit enablement program, reflecting adoption and coverage."
        />
        <KpiCard
          title="Vendor Repayment Performance"
          value="96.8%"
          change={2.3}
          changeLabel="on-time rate"
          trend="up"
          icon={<CheckCircle className="h-5 w-5" />}
          tooltip="Percentage of vendors making on-time repayments to the NBFC. Higher rates indicate lower credit risk and healthy vendor financial behavior."
        />
        <KpiCard
          title="RW Exposure"
          value="₹0.8 Cr"
          change={-75.4}
          changeLabel="risk transfer active"
          trend="up"
          icon={<AlertTriangle className="h-5 w-5" />}
          tooltip="Rishabh World's remaining financial exposure after risk transfer to NBFC. Lower exposure indicates successful risk mitigation strategy."
        />
        <KpiCard
          title="Legal Disputes"
          value="7 Cases"
          change={40.0}
          changeLabel="₹2.1 Cr involved"
          trend="down"
          icon={<Scale className="h-5 w-5" />}
          tooltip="Vendors who exceeded credit periods leading to legal disputes. Includes 7 active cases worth ₹2.1 Cr from 5 vendors with payment defaults beyond 90+ days."
        />
        <KpiCard
          title="New Vendor Onboarding"
          value="42 Vendors"
          change={25.7}
          changeLabel="this quarter"
          trend="up"
          icon={<UserPlus className="h-5 w-5" />}
          tooltip="New vendors successfully onboarded to the credit enablement program this quarter, expanding the ecosystem and increasing program adoption."
        />
        <KpiCard
          title="Program Coverage"
          value="87.5%"
          change={12.3}
          changeLabel="280 of 320 vendors"
          trend="up"
          icon={<Target className="h-5 w-5" />}
          tooltip="Percentage of total vendor base enrolled in the credit enablement program. Higher coverage indicates better program adoption and ecosystem integration."
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

      <Card className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <h3 className="text-lg font-semibold">Vendor Portfolio Overview</h3>
          <TooltipProvider>
            <UITooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p className="text-sm">Comprehensive view of all vendors with key financial metrics, credit performance, and risk indicators for portfolio management.</p>
              </TooltipContent>
            </UITooltip>
          </TooltipProvider>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Vendor ID</TableHead>
                <TableHead className="min-w-[200px]">Vendor Name</TableHead>
                <TableHead className="text-center">Program Status</TableHead>
                <TableHead className="text-center">Credit Score</TableHead>
                <TableHead className="text-center">Risk Tier</TableHead>
                <TableHead className="text-right">Capital Unlocked</TableHead>
                <TableHead className="text-right">Credit Limit</TableHead>
                <TableHead className="text-center">Utilization</TableHead>
                <TableHead className="text-right">Total Borrowed</TableHead>
                <TableHead className="text-right">Total Repaid</TableHead>
                <TableHead className="text-center">Credit Period</TableHead>
                <TableHead className="text-center">Repayment Rate</TableHead>
                <TableHead className="text-center">Last Payment</TableHead>
                <TableHead className="text-center">Total Invoices</TableHead>
                <TableHead className="text-right">Overdue Amount</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vendorData.map((vendor) => (
                <TableRow key={vendor.id} className="hover:bg-muted/50">
                  <TableCell className="font-mono text-xs">{vendor.id}</TableCell>
                  <TableCell className="font-medium">{vendor.name}</TableCell>
                  <TableCell className="text-center">
                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      vendor.programStatus === "Enrolled" ? "bg-success/10 text-success" :
                      vendor.programStatus === "Eligible" ? "bg-primary/10 text-primary" :
                      vendor.programStatus === "Under Review" ? "bg-warning/10 text-warning" :
                      "bg-muted/10 text-muted-foreground"
                    }`}>
                      {vendor.programStatus}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className={`font-semibold ${
                      vendor.creditScore >= 90 ? "text-success" :
                      vendor.creditScore >= 75 ? "text-primary" :
                      vendor.creditScore >= 60 ? "text-warning" :
                      "text-destructive"
                    }`}>
                      {vendor.creditScore}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      vendor.riskTier === "A" ? "bg-success/10 text-success" :
                      vendor.riskTier === "B" ? "bg-primary/10 text-primary" :
                      vendor.riskTier === "C" ? "bg-warning/10 text-warning" :
                      "bg-destructive/10 text-destructive"
                    }`}>
                      {vendor.riskTier}
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-medium">{vendor.capitalUnlocked}</TableCell>
                  <TableCell className="text-right text-muted-foreground">{vendor.creditLimit}</TableCell>
                  <TableCell className="text-center">
                    <span className={`font-medium ${
                      parseInt(vendor.utilization) > 80 ? "text-warning" :
                      parseInt(vendor.utilization) > 60 ? "text-primary" :
                      "text-muted-foreground"
                    }`}>
                      {vendor.utilization}
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-medium text-primary">{vendor.totalBorrowed}</TableCell>
                  <TableCell className="text-right font-medium text-success">{vendor.totalRepaid}</TableCell>
                  <TableCell className="text-center text-muted-foreground">{vendor.creditPeriod}</TableCell>
                  <TableCell className="text-center">
                    <span className={`font-medium ${
                      parseFloat(vendor.repaymentRate) >= 97 ? "text-success" :
                      parseFloat(vendor.repaymentRate) >= 90 ? "text-primary" :
                      "text-destructive"
                    }`}>
                      {vendor.repaymentRate}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className={`text-xs ${
                      vendor.lastPayment === "On-time" ? "text-success" :
                      vendor.lastPayment.includes("late") ? "text-destructive" :
                      "text-muted-foreground"
                    }`}>
                      {vendor.lastPayment}
                    </span>
                  </TableCell>
                  <TableCell className="text-center text-muted-foreground">{vendor.totalInvoices}</TableCell>
                  <TableCell className="text-right">
                    <span className={`font-medium ${
                      vendor.overdueAmount === "₹0" ? "text-success" :
                      "text-destructive"
                    }`}>
                      {vendor.overdueAmount}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      vendor.status === "Active" ? "bg-success/10 text-success" :
                      vendor.status === "Watch" ? "bg-warning/10 text-warning" :
                      vendor.status === "Alert" ? "bg-destructive/10 text-destructive" :
                      "bg-muted/10 text-muted-foreground"
                    }`}>
                      {vendor.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="mt-4 text-xs text-muted-foreground space-y-1">
          <p>Showing {vendorData.length} of 320 total vendors. Program Enrolled: {vendorData.filter(v => v.programStatus === "Enrolled").length}, Non-Program: {vendorData.filter(v => v.programStatus === "Not Enrolled" || v.programStatus === "Eligible" || v.programStatus === "Under Review").length}</p>
          <p>Credit scores updated daily. Risk tiers: A (90-100), B (75-89), C (60-74), D (&lt;60). Program coverage: 87.5%</p>
        </div>
      </Card>
    </div>
  );
};
