import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

const tatData = [
  { month: "Jan", tat: 3.2 },
  { month: "Feb", tat: 2.8 },
  { month: "Mar", tat: 2.5 },
  { month: "Apr", tat: 2.1 },
  { month: "May", tat: 1.8 },
  { month: "Jun", tat: 1.5 },
];

const exceptionData = [
  { category: "Invoice Mismatch", count: 23, resolved: 20 },
  { category: "Duplicate Entry", count: 12, resolved: 12 },
  { category: "Amount Variance", count: 18, resolved: 15 },
  { category: "Missing Documents", count: 8, resolved: 6 },
  { category: "Vendor Dispute", count: 15, resolved: 12 },
];

const recentExceptions = [
  { id: "EXC-2401", vendor: "Vendor A", type: "Invoice Mismatch", amount: "₹2.3L", status: "Pending" },
  { id: "EXC-2402", vendor: "Vendor C", type: "Amount Variance", amount: "₹1.8L", status: "Resolved" },
  { id: "EXC-2403", vendor: "Vendor E", type: "Vendor Dispute", amount: "₹3.1L", status: "Pending" },
  { id: "EXC-2404", vendor: "Vendor B", type: "Missing Documents", amount: "₹0.9L", status: "In Progress" },
];

export const OperationalEfficiencyView = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Operational Efficiency</h2>
        <p className="text-muted-foreground mt-2">TAT, SLA compliance, and exception tracking</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold">Average TAT</h3>
            <TooltipProvider>
              <UITooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p className="text-sm">Average Turnaround Time from invoice submission to completion of processing and approval workflow.</p>
                </TooltipContent>
              </UITooltip>
            </TooltipProvider>
          </div>
          <p className="text-4xl font-bold text-accent">1.5 Days</p>
          <p className="text-sm text-success mt-2">↓ 53% vs last quarter</p>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold">SLA Compliance</h3>
            <TooltipProvider>
              <UITooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p className="text-sm">Percentage of transactions processed within defined Service Level Agreement timeframes. Measures operational efficiency.</p>
                </TooltipContent>
              </UITooltip>
            </TooltipProvider>
          </div>
          <p className="text-4xl font-bold text-success">98.5%</p>
          <p className="text-sm text-muted-foreground mt-2">Target: 95%</p>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold">Total Exceptions</h3>
            <TooltipProvider>
              <UITooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p className="text-sm">Number of processing exceptions requiring manual intervention, including invoice mismatches, missing documents, and disputes.</p>
                </TooltipContent>
              </UITooltip>
            </TooltipProvider>
          </div>
          <p className="text-4xl font-bold text-foreground">76</p>
          <p className="text-sm text-success mt-2">65 Resolved</p>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <h3 className="text-lg font-semibold">Turnaround Time Trend (Days)</h3>
          <TooltipProvider>
            <UITooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p className="text-sm">Monthly trend showing improvement in processing turnaround time. Lower values indicate better operational efficiency.</p>
              </TooltipContent>
            </UITooltip>
          </TooltipProvider>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={tatData}>
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
            <Bar dataKey="tat" fill="hsl(var(--chart-2))" name="Avg TAT (Days)" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-lg font-semibold">Exceptions by Category</h3>
            <TooltipProvider>
              <UITooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p className="text-sm">Breakdown of exceptions by type, showing total occurrences vs resolved cases. Helps identify recurring issues and resolution effectiveness.</p>
                </TooltipContent>
              </UITooltip>
            </TooltipProvider>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={exceptionData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="category" className="text-xs" angle={-45} textAnchor="end" height={80} />
              <YAxis className="text-xs" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)"
                }} 
              />
              <Legend />
              <Bar dataKey="count" fill="hsl(var(--chart-4))" name="Total" />
              <Bar dataKey="resolved" fill="hsl(var(--chart-3))" name="Resolved" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-lg font-semibold">Recent Exceptions</h3>
            <TooltipProvider>
              <UITooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p className="text-sm">Latest exceptions requiring attention, showing vendor, exception type, amount involved, and current resolution status.</p>
                </TooltipContent>
              </UITooltip>
            </TooltipProvider>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentExceptions.map((exception) => (
                <TableRow key={exception.id}>
                  <TableCell className="font-mono text-xs">{exception.id}</TableCell>
                  <TableCell>{exception.vendor}</TableCell>
                  <TableCell className="text-xs">{exception.type}</TableCell>
                  <TableCell>{exception.amount}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        exception.status === "Resolved"
                          ? "bg-success/10 text-success"
                          : exception.status === "Pending"
                          ? "bg-destructive/10 text-destructive"
                          : "bg-warning/10 text-warning"
                      }`}
                    >
                      {exception.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
};
