'use client';

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Shield, 
  FileText, 
  Download, 
  Search, 
  ExternalLink, 
  Clock, 
  CheckCircle2, 
  AlertTriangle,
  Filter,
  Calendar,
  Hash,
  User,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  FileJson,
  FileSpreadsheet
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const transactions = [
  { id: "0x1a2b...3c4d", type: "SBT_MINT", employee: "Andi Wijaya", amount: null, timestamp: "2024-01-15 09:23:45", status: "confirmed", block: 18234567 },
  { id: "0x2b3c...4d5e", type: "WITHDRAW", employee: "Budi Santoso", amount: 2500000, timestamp: "2024-01-15 10:15:32", status: "confirmed", block: 18234589 },
  { id: "0x3c4d...5e6f", type: "REPAY", employee: "Citra Dewi", amount: 1800000, timestamp: "2024-01-15 11:45:12", status: "confirmed", block: 18234612 },
  { id: "0x4d5e...6f7g", type: "WITHDRAW", employee: "Dian Pratama", amount: 3200000, timestamp: "2024-01-15 14:30:00", status: "pending", block: null },
  { id: "0x5e6f...7g8h", type: "SBT_REVOKE", employee: "Eko Saputra", amount: null, timestamp: "2024-01-14 16:20:00", status: "confirmed", block: 18234450 },
  { id: "0x6f7g...8h9i", type: "LIQUIDITY_ADD", employee: "System", amount: 50000000, timestamp: "2024-01-14 09:00:00", status: "confirmed", block: 18234200 },
  { id: "0x7g8h...9i0j", type: "WITHDRAW", employee: "Fitri Handayani", amount: 1500000, timestamp: "2024-01-13 15:45:00", status: "failed", block: null },
  { id: "0x8h9i...0j1k", type: "REPAY", employee: "Gilang Ramadhan", amount: 2200000, timestamp: "2024-01-13 12:00:00", status: "confirmed", block: 18234100 },
];

const auditLogs = [
  { id: 1, action: "PAYROLL_CONFIG_UPDATE", actor: "HR Admin", details: "Updated salary cycle to monthly", timestamp: "2024-01-15 08:00:00", ip: "192.168.1.100" },
  { id: 2, action: "WITHDRAW_LIMIT_CHANGE", actor: "HR Admin", details: "Changed global limit from 25% to 30%", timestamp: "2024-01-15 08:15:00", ip: "192.168.1.100" },
  { id: 3, action: "EMPLOYEE_ADDED", actor: "HR Admin", details: "Added new employee: Hana Permata", timestamp: "2024-01-14 14:30:00", ip: "192.168.1.102" },
  { id: 4, action: "SBT_MINTED", actor: "System", details: "Auto-minted SBT for Andi Wijaya", timestamp: "2024-01-15 09:23:45", ip: "System" },
  { id: 5, action: "LIQUIDITY_DEPOSITED", actor: "Finance", details: "Added Rp 50,000,000 to company pool", timestamp: "2024-01-14 09:00:00", ip: "192.168.1.105" },
  { id: 6, action: "WITHDRAW_APPROVED", actor: "System", details: "Auto-approved withdrawal for Budi Santoso", timestamp: "2024-01-15 10:15:30", ip: "System" },
  { id: 7, action: "EMPLOYEE_TERMINATED", actor: "HR Admin", details: "Terminated employee: Eko Saputra", timestamp: "2024-01-14 16:15:00", ip: "192.168.1.100" },
  { id: 8, action: "SBT_REVOKED", actor: "System", details: "Auto-revoked SBT for Eko Saputra", timestamp: "2024-01-14 16:20:00", ip: "System" },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
};

const getTransactionIcon = (type: string) => {
  switch (type) {
    case "SBT_MINT": return <CheckCircle2 className="h-4 w-4 text-success" />;
    case "SBT_REVOKE": return <AlertTriangle className="h-4 w-4 text-destructive" />;
    case "WITHDRAW": return <ArrowUpRight className="h-4 w-4 text-primary" />;
    case "REPAY": return <ArrowDownRight className="h-4 w-4 text-success" />;
    case "LIQUIDITY_ADD": return <Wallet className="h-4 w-4 text-accent" />;
    default: return <Hash className="h-4 w-4" />;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "confirmed":
      return <Badge className="bg-success/10 text-success border-success/20">Confirmed</Badge>;
    case "pending":
      return <Badge className="bg-warning/10 text-warning border-warning/20">Pending</Badge>;
    case "failed":
      return <Badge variant="destructive">Failed</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const getActionBadge = (action: string) => {
  if (action.includes("ADD") || action.includes("MINT") || action.includes("DEPOSIT")) {
    return <Badge className="bg-success/10 text-success border-success/20">{action}</Badge>;
  }
  if (action.includes("REVOKE") || action.includes("TERMINATE")) {
    return <Badge variant="destructive">{action}</Badge>;
  }
  if (action.includes("UPDATE") || action.includes("CHANGE")) {
    return <Badge className="bg-warning/10 text-warning border-warning/20">{action}</Badge>;
  }
  return <Badge variant="outline">{action}</Badge>;
};

export default function CompliancePage() {
  const [role, setRole] = useState<"hr" | "employee">("hr");
  const [searchTx, setSearchTx] = useState("");
  const [searchAudit, setSearchAudit] = useState("");
  const [txFilter, setTxFilter] = useState("all");
  const [dateRange, setDateRange] = useState("7d");

  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = tx.id.toLowerCase().includes(searchTx.toLowerCase()) ||
      tx.employee.toLowerCase().includes(searchTx.toLowerCase());
    const matchesFilter = txFilter === "all" || tx.type === txFilter;
    return matchesSearch && matchesFilter;
  });

  const filteredAuditLogs = auditLogs.filter(log =>
    log.action.toLowerCase().includes(searchAudit.toLowerCase()) ||
    log.actor.toLowerCase().includes(searchAudit.toLowerCase()) ||
    log.details.toLowerCase().includes(searchAudit.toLowerCase())
  );

  const handleExport = (format: string, type: string) => {
    toast({
      title: "Export Started",
      description: `Exporting ${type} as ${format.toUpperCase()}...`,
    });
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: `${type} has been downloaded successfully.`,
      });
    }, 1500);
  };

  return (
    <DashboardLayout role={role} onRoleChange={setRole}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Compliance & Audit</h1>
            <p className="text-muted-foreground mt-1">
              On-chain transaction logs and audit trails for regulatory reporting
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[140px]">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Last 24 hours</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="custom">Custom range</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-border/50 shadow-neumorphic-sm">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-primary/10">
                  <Hash className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Transactions</p>
                  <p className="text-2xl font-bold">1,234</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/50 shadow-neumorphic-sm">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-success/10">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Confirmed</p>
                  <p className="text-2xl font-bold">1,198</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/50 shadow-neumorphic-sm">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-warning/10">
                  <Clock className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold">28</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/50 shadow-neumorphic-sm">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-destructive/10">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Failed</p>
                  <p className="text-2xl font-bold">8</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="transactions" className="space-y-4">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="transactions" className="gap-2">
              <Hash className="h-4 w-4" />
              On-Chain Transactions
            </TabsTrigger>
            <TabsTrigger value="audit" className="gap-2">
              <Shield className="h-4 w-4" />
              Audit Trail
            </TabsTrigger>
            <TabsTrigger value="reports" className="gap-2">
              <FileText className="h-4 w-4" />
              Regulatory Reports
            </TabsTrigger>
          </TabsList>

          {/* Transactions Tab */}
          <TabsContent value="transactions" className="space-y-4">
            <Card className="border-border/50 shadow-neumorphic">
              <CardHeader className="pb-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle>On-Chain Transaction Logs</CardTitle>
                    <CardDescription>All blockchain transactions including SBT minting, withdrawals, and repayments</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleExport("csv", "transactions")}>
                      <FileSpreadsheet className="h-4 w-4 mr-2" />
                      CSV
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleExport("json", "transactions")}>
                      <FileJson className="h-4 w-4 mr-2" />
                      JSON
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by hash or employee..."
                      value={searchTx}
                      onChange={(e) => setSearchTx(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={txFilter} onValueChange={setTxFilter}>
                    <SelectTrigger className="w-[180px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="SBT_MINT">SBT Mint</SelectItem>
                      <SelectItem value="SBT_REVOKE">SBT Revoke</SelectItem>
                      <SelectItem value="WITHDRAW">Withdraw</SelectItem>
                      <SelectItem value="REPAY">Repay</SelectItem>
                      <SelectItem value="LIQUIDITY_ADD">Liquidity Add</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Transaction List */}
                <ScrollArea className="h-[400px]">
                  <div className="space-y-2">
                    {filteredTransactions.map((tx) => (
                      <div
                        key={tx.id}
                        className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-card/50 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-2 rounded-lg bg-muted">
                            {getTransactionIcon(tx.type)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <code className="text-sm font-mono text-foreground">{tx.id}</code>
                              <Button variant="ghost" size="icon" className="h-6 w-6">
                                <ExternalLink className="h-3 w-3" />
                              </Button>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <User className="h-3 w-3 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">{tx.employee}</span>
                              <span className="text-muted-foreground">•</span>
                              <Clock className="h-3 w-3 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">{tx.timestamp}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          {tx.amount && (
                            <span className="font-semibold">{formatCurrency(tx.amount)}</span>
                          )}
                          <Badge variant="outline" className="font-mono text-xs">
                            {tx.type.replace("_", " ")}
                          </Badge>
                          {getStatusBadge(tx.status)}
                          {tx.block && (
                            <span className="text-xs text-muted-foreground font-mono">
                              #{tx.block}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Audit Trail Tab */}
          <TabsContent value="audit" className="space-y-4">
            <Card className="border-border/50 shadow-neumorphic">
              <CardHeader className="pb-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle>System Audit Trail</CardTitle>
                    <CardDescription>Complete log of all system actions and configuration changes</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleExport("csv", "audit logs")}>
                      <FileSpreadsheet className="h-4 w-4 mr-2" />
                      CSV
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleExport("pdf", "audit logs")}>
                      <FileText className="h-4 w-4 mr-2" />
                      PDF
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search audit logs..."
                    value={searchAudit}
                    onChange={(e) => setSearchAudit(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Audit Log List */}
                <ScrollArea className="h-[400px]">
                  <div className="space-y-2">
                    {filteredAuditLogs.map((log) => (
                      <div
                        key={log.id}
                        className="p-4 rounded-xl border border-border/50 bg-card/50 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              {getActionBadge(log.action)}
                              <span className="text-sm font-medium">{log.actor}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">{log.details}</p>
                          </div>
                          <div className="text-right text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {log.timestamp}
                            </div>
                            <div className="font-mono text-xs mt-1">IP: {log.ip}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Monthly Compliance Report */}
              <Card className="border-border/50 shadow-neumorphic">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Monthly Compliance Report
                  </CardTitle>
                  <CardDescription>
                    Complete monthly summary for regulatory submission
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Period</span>
                      <span>January 2024</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Transactions</span>
                      <span>1,234</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Volume</span>
                      <span>{formatCurrency(2450000000)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Active Employees</span>
                      <span>156</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1" onClick={() => handleExport("pdf", "monthly compliance report")}>
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                    <Button variant="outline" onClick={() => handleExport("xlsx", "monthly compliance report")}>
                      <FileSpreadsheet className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Transaction Summary */}
              <Card className="border-border/50 shadow-neumorphic">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Hash className="h-5 w-5 text-accent" />
                    Transaction Summary
                  </CardTitle>
                  <CardDescription>
                    Aggregated transaction data for auditors
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">SBT Minted</span>
                      <span>23</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">SBT Revoked</span>
                      <span>4</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Withdrawals</span>
                      <span>892</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Repayments</span>
                      <span>756</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1" onClick={() => handleExport("pdf", "transaction summary")}>
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                    <Button variant="outline" onClick={() => handleExport("json", "transaction summary")}>
                      <FileJson className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Employee Activity Report */}
              <Card className="border-border/50 shadow-neumorphic">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-success" />
                    Employee Activity Report
                  </CardTitle>
                  <CardDescription>
                    Per-employee withdrawal and repayment history
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Active Users</span>
                      <span>156</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Avg. Withdrawals/User</span>
                      <span>5.7</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Repayment Rate</span>
                      <span>98.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Outstanding Balance</span>
                      <span>{formatCurrency(45000000)}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1" onClick={() => handleExport("xlsx", "employee activity report")}>
                      <Download className="h-4 w-4 mr-2" />
                      Download Excel
                    </Button>
                    <Button variant="outline" onClick={() => handleExport("csv", "employee activity report")}>
                      <FileSpreadsheet className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Blockchain Attestation */}
              <Card className="border-border/50 shadow-neumorphic">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Blockchain Attestation
                  </CardTitle>
                  <CardDescription>
                    Cryptographic proof of all on-chain activities
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">IPFS Hash</span>
                      <code className="text-xs">Qm...xyz</code>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Merkle Root</span>
                      <code className="text-xs">0x1a2b...9z</code>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Last Updated</span>
                      <span>2024-01-15 23:59</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Verification Status</span>
                      <Badge className="bg-success/10 text-success border-success/20">Verified</Badge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1" onClick={() => handleExport("json", "blockchain attestation")}>
                      <Download className="h-4 w-4 mr-2" />
                      Download Proof
                    </Button>
                    <Button variant="outline">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
