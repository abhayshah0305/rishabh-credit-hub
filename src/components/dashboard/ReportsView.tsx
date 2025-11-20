import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Download, 
  Calendar, 
  TrendingUp, 
  Users, 
  AlertTriangle, 
  PieChart, 
  BarChart3, 
  FileSpreadsheet, 
  FilePieChart,
  Clock,
  CheckCircle,
  Eye,
  Settings,
  Filter,
  Search,
  MoreVertical,
  BookOpen,
  Shield,
  Target,
  DollarSign
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface Report {
  id: string;
  title: string;
  description: string;
  category: "monthly" | "quarterly" | "annual" | "ad_hoc" | "regulatory";
  type: "summary" | "detailed" | "analytics" | "compliance";
  format: "PDF" | "Excel" | "PowerBI" | "CSV";
  lastGenerated: string;
  nextScheduled: string;
  status: "ready" | "generating" | "scheduled" | "failed";
  size: string;
  recipients: number;
  icon: React.ReactNode;
  tags: string[];
  dataPoints: number;
  automationLevel: "manual" | "semi-auto" | "fully-auto";
  confidentiality: "public" | "internal" | "confidential" | "restricted";
}

const reports: Report[] = [
  {
    id: "monthly-exec",
    title: "Executive Credit Summary",
    description: "Comprehensive monthly overview of credit portfolio performance, risk metrics, and key insights for executive leadership.",
    category: "monthly",
    type: "summary",
    format: "PDF",
    lastGenerated: "Nov 15, 2024",
    nextScheduled: "Dec 15, 2024",
    status: "ready",
    size: "2.4 MB",
    recipients: 8,
    icon: <FileText className="h-5 w-5" />,
    tags: ["executive", "portfolio", "kpi"],
    dataPoints: 45,
    automationLevel: "fully-auto",
    confidentiality: "confidential"
  },
  {
    id: "vendor-performance",
    title: "Vendor Performance Analytics",
    description: "Detailed analysis of vendor credit behavior, payment patterns, score trends, and risk assessment across all active vendors.",
    category: "monthly",
    type: "analytics",
    format: "Excel",
    lastGenerated: "Nov 18, 2024",
    nextScheduled: "Dec 18, 2024",
    status: "ready",
    size: "8.7 MB",
    recipients: 12,
    icon: <Users className="h-5 w-5" />,
    tags: ["vendors", "analytics", "behavior"],
    dataPoints: 156,
    automationLevel: "fully-auto",
    confidentiality: "internal"
  },
  {
    id: "risk-assessment",
    title: "Monthly Risk Assessment Report",
    description: "Comprehensive risk analysis including credit exposure, concentration analysis, early warning indicators, and stress testing results.",
    category: "monthly",
    type: "detailed",
    format: "PDF",
    lastGenerated: "Nov 16, 2024",
    nextScheduled: "Dec 16, 2024",
    status: "ready",
    size: "5.1 MB",
    recipients: 6,
    icon: <AlertTriangle className="h-5 w-5" />,
    tags: ["risk", "exposure", "stress_test"],
    dataPoints: 89,
    automationLevel: "semi-auto",
    confidentiality: "restricted"
  },
  {
    id: "portfolio-dashboard",
    title: "Interactive Portfolio Dashboard",
    description: "Real-time Power BI dashboard with drill-down capabilities for portfolio analysis, vendor segmentation, and performance tracking.",
    category: "ad_hoc",
    type: "analytics",
    format: "PowerBI",
    lastGenerated: "Live",
    nextScheduled: "Continuous",
    status: "ready",
    size: "Live Data",
    recipients: 25,
    icon: <PieChart className="h-5 w-5" />,
    tags: ["dashboard", "real-time", "interactive"],
    dataPoints: 200,
    automationLevel: "fully-auto",
    confidentiality: "internal"
  },
  {
    id: "compliance-regulatory",
    title: "Regulatory Compliance Report",
    description: "Quarterly compliance report covering capital adequacy, credit risk management, and regulatory requirement adherence.",
    category: "quarterly",
    type: "compliance",
    format: "PDF",
    lastGenerated: "Oct 31, 2024",
    nextScheduled: "Jan 31, 2025",
    status: "scheduled",
    size: "12.3 MB",
    recipients: 4,
    icon: <Shield className="h-5 w-5" />,
    tags: ["compliance", "regulatory", "capital"],
    dataPoints: 78,
    automationLevel: "semi-auto",
    confidentiality: "restricted"
  },
  {
    id: "collection-efficiency",
    title: "Collections & Recovery Analysis",
    description: "Monthly analysis of collection efficiency, recovery rates, aging analysis, and recommendations for improvement.",
    category: "monthly",
    type: "detailed",
    format: "Excel",
    lastGenerated: "Nov 20, 2024",
    nextScheduled: "Dec 20, 2024",
    status: "generating",
    size: "4.2 MB",
    recipients: 7,
    icon: <Target className="h-5 w-5" />,
    tags: ["collections", "recovery", "aging"],
    dataPoints: 67,
    automationLevel: "semi-auto",
    confidentiality: "internal"
  },
  {
    id: "profitability-analysis",
    title: "Credit Program Profitability Report",
    description: "Comprehensive analysis of credit program profitability, cost analysis, ROI metrics, and vendor segment performance.",
    category: "quarterly",
    type: "analytics",
    format: "PDF",
    lastGenerated: "Oct 15, 2024",
    nextScheduled: "Jan 15, 2025",
    status: "scheduled",
    size: "6.8 MB",
    recipients: 10,
    icon: <DollarSign className="h-5 w-5" />,
    tags: ["profitability", "roi", "cost_analysis"],
    dataPoints: 92,
    automationLevel: "semi-auto",
    confidentiality: "confidential"
  },
  {
    id: "market-trends",
    title: "Industry & Market Trends Analysis",
    description: "Analysis of market trends, industry benchmarks, competitive intelligence, and impact on credit portfolio strategy.",
    category: "quarterly",
    type: "analytics",
    format: "PowerBI",
    lastGenerated: "Nov 1, 2024",
    nextScheduled: "Feb 1, 2025",
    status: "ready",
    size: "3.9 MB",
    recipients: 15,
    icon: <TrendingUp className="h-5 w-5" />,
    tags: ["market", "trends", "benchmarks"],
    dataPoints: 134,
    automationLevel: "manual",
    confidentiality: "internal"
  }
];

export const ReportsView = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusColor = (status: Report["status"]) => {
    switch (status) {
      case "ready":
        return "bg-green-100 text-green-800 border-green-200";
      case "generating":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "scheduled":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "failed":
        return "bg-red-100 text-red-800 border-red-200";
    }
  };

  const getConfidentialityColor = (level: Report["confidentiality"]) => {
    switch (level) {
      case "public":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "internal":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "confidential":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "restricted":
        return "bg-red-100 text-red-800 border-red-200";
    }
  };

  const getAutomationIcon = (level: Report["automationLevel"]) => {
    switch (level) {
      case "manual":
        return <Settings className="h-3 w-3" />;
      case "semi-auto":
        return <Clock className="h-3 w-3" />;
      case "fully-auto":
        return <CheckCircle className="h-3 w-3" />;
    }
  };

  const filteredReports = reports.filter(report => {
    const matchesCategory = selectedCategory === "all" || report.category === selectedCategory;
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = [
    { id: "all", label: "All Reports", count: reports.length },
    { id: "monthly", label: "Monthly", count: reports.filter(r => r.category === "monthly").length },
    { id: "quarterly", label: "Quarterly", count: reports.filter(r => r.category === "quarterly").length },
    { id: "annual", label: "Annual", count: reports.filter(r => r.category === "annual").length },
    { id: "ad_hoc", label: "Ad Hoc", count: reports.filter(r => r.category === "ad_hoc").length },
    { id: "regulatory", label: "Regulatory", count: reports.filter(r => r.category === "regulatory").length },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Reports & Analytics Center</h2>
          <p className="text-muted-foreground mt-2">Comprehensive reporting suite for credit portfolio management</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Advanced Filters
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Schedule Reports
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Reports</p>
              <p className="text-3xl font-bold text-foreground mt-1">{reports.length}</p>
              <p className="text-xs text-muted-foreground mt-1">Active templates</p>
            </div>
            <BookOpen className="h-10 w-10 text-primary" />
          </div>
        </Card>
        <Card className="p-4 bg-green-50 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Ready to Download</p>
              <p className="text-3xl font-bold text-green-600 mt-1">
                {reports.filter(r => r.status === "ready").length}
              </p>
              <p className="text-xs text-green-600 mt-1">Available now</p>
            </div>
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
        </Card>
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Auto-Generated</p>
              <p className="text-3xl font-bold text-blue-600 mt-1">
                {reports.filter(r => r.automationLevel === "fully-auto").length}
              </p>
              <p className="text-xs text-blue-600 mt-1">Fully automated</p>
            </div>
            <Target className="h-10 w-10 text-blue-600" />
          </div>
        </Card>
        <Card className="p-4 bg-orange-50 border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Recipients</p>
              <p className="text-3xl font-bold text-orange-600 mt-1">
                {reports.reduce((acc, r) => acc + r.recipients, 0)}
              </p>
              <p className="text-xs text-orange-600 mt-1">Stakeholders served</p>
            </div>
            <Users className="h-10 w-10 text-orange-600" />
          </div>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search reports..."
            className="pl-10 pr-4 py-2 w-full border border-input bg-background rounded-md text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="h-8"
            >
              {category.label}
              {category.count > 0 && (
                <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 text-xs flex items-center justify-center">
                  {category.count}
                </Badge>
              )}
            </Button>
          ))}
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredReports.map((report) => (
          <Card key={report.id} className="p-6 hover:shadow-lg transition-all duration-200">
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <div className="text-primary">
                      {report.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{report.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={cn("text-xs", getStatusColor(report.status))}>
                        {report.status.replace('_', ' ').toUpperCase()}
                      </Badge>
                      <Badge className={cn("text-xs", getConfidentialityColor(report.confidentiality))}>
                        {report.confidentiality.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>More Options</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground">{report.description}</p>

              {/* Metadata */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Format:</span>
                    <span className="font-medium">{report.format}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Size:</span>
                    <span className="font-medium">{report.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Recipients:</span>
                    <span className="font-medium">{report.recipients}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Generated:</span>
                    <span className="font-medium">{report.lastGenerated}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Next Scheduled:</span>
                    <span className="font-medium">{report.nextScheduled}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Data Points:</span>
                    <span className="font-medium">{report.dataPoints}</span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {report.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag.replace('_', ' ')}
                  </Badge>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  {getAutomationIcon(report.automationLevel)}
                  <span className="capitalize">{report.automationLevel.replace('_', ' ')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="sm" disabled={report.status !== "ready"}>
                          <Eye className="h-4 w-4 mr-2" />
                          Preview
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Preview Report</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <Button 
                    size="sm" 
                    disabled={report.status !== "ready"}
                    className="bg-primary hover:bg-primary/90"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Report Templates Section */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Quick Report Templates</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-dashed border-muted-foreground/30 rounded-lg text-center space-y-2">
            <FileSpreadsheet className="h-8 w-8 text-muted-foreground mx-auto" />
            <h4 className="font-medium">Custom Analytics</h4>
            <p className="text-sm text-muted-foreground">Build custom reports with your data</p>
            <Button variant="outline" size="sm" className="w-full">
              Create Report
            </Button>
          </div>
          <div className="p-4 border border-dashed border-muted-foreground/30 rounded-lg text-center space-y-2">
            <FilePieChart className="h-8 w-8 text-muted-foreground mx-auto" />
            <h4 className="font-medium">Risk Assessment</h4>
            <p className="text-sm text-muted-foreground">Generate risk analysis on-demand</p>
            <Button variant="outline" size="sm" className="w-full">
              Generate Now
            </Button>
          </div>
          <div className="p-4 border border-dashed border-muted-foreground/30 rounded-lg text-center space-y-2">
            <BarChart3 className="h-8 w-8 text-muted-foreground mx-auto" />
            <h4 className="font-medium">Performance Summary</h4>
            <p className="text-sm text-muted-foreground">Quick performance overview report</p>
            <Button variant="outline" size="sm" className="w-full">
              Quick Generate
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};