'use client';

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Wallet, 
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  PieChart as PieChartIcon,
  Activity
} from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  RadialBarChart,
  RadialBar
} from "recharts";

const monthlyTrends = [
  { month: "Jul", withdrawals: 45000000, repayments: 42000000, employees: 120 },
  { month: "Aug", withdrawals: 52000000, repayments: 48000000, employees: 128 },
  { month: "Sep", withdrawals: 48000000, repayments: 50000000, employees: 132 },
  { month: "Oct", withdrawals: 61000000, repayments: 55000000, employees: 140 },
  { month: "Nov", withdrawals: 58000000, repayments: 60000000, employees: 148 },
  { month: "Dec", withdrawals: 72000000, repayments: 65000000, employees: 156 },
  { month: "Jan", withdrawals: 68000000, repayments: 70000000, employees: 156 },
];

const weeklyActivity = [
  { day: "Mon", withdrawals: 12, amount: 18000000 },
  { day: "Tue", withdrawals: 18, amount: 25000000 },
  { day: "Wed", withdrawals: 15, amount: 21000000 },
  { day: "Thu", withdrawals: 22, amount: 32000000 },
  { day: "Fri", withdrawals: 28, amount: 42000000 },
  { day: "Sat", withdrawals: 8, amount: 12000000 },
  { day: "Sun", withdrawals: 5, amount: 8000000 },
];

const departmentData = [
  { name: "Engineering", value: 35, color: "hsl(var(--primary))" },
  { name: "Sales", value: 25, color: "hsl(var(--accent))" },
  { name: "Operations", value: 20, color: "hsl(var(--success))" },
  { name: "Marketing", value: 12, color: "hsl(var(--warning))" },
  { name: "HR", value: 8, color: "hsl(var(--muted-foreground))" },
];

const liquidityFlow = [
  { month: "Jul", company: 30000000, aave: 15000000, public: 10000000 },
  { month: "Aug", company: 32000000, aave: 18000000, public: 12000000 },
  { month: "Sep", company: 35000000, aave: 20000000, public: 15000000 },
  { month: "Oct", company: 38000000, aave: 22000000, public: 18000000 },
  { month: "Nov", company: 40000000, aave: 25000000, public: 20000000 },
  { month: "Dec", company: 45000000, aave: 28000000, public: 22000000 },
  { month: "Jan", company: 48000000, aave: 30000000, public: 25000000 },
];

const employeeUsage = [
  { range: "0-10%", count: 45, fill: "hsl(var(--success))" },
  { range: "10-20%", count: 38, fill: "hsl(var(--primary))" },
  { range: "20-30%", count: 52, fill: "hsl(var(--accent))" },
  { range: "30%", count: 21, fill: "hsl(var(--warning))" },
];

const hourlyDistribution = [
  { hour: "6AM", count: 2 },
  { hour: "8AM", count: 8 },
  { hour: "10AM", count: 15 },
  { hour: "12PM", count: 22 },
  { hour: "2PM", count: 18 },
  { hour: "4PM", count: 25 },
  { hour: "6PM", count: 12 },
  { hour: "8PM", count: 6 },
];

const formatCurrency = (value: number) => {
  if (value >= 1000000000) return `Rp ${(value / 1000000000).toFixed(1)}B`;
  if (value >= 1000000) return `Rp ${(value / 1000000).toFixed(0)}M`;
  return `Rp ${value.toLocaleString()}`;
};

const formatTooltipValue = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
};

export default function AnalyticsPage() {
  const [role, setRole] = useState<"hr" | "employee">("hr");
  const [dateRange, setDateRange] = useState("6m");

  return (
    <DashboardLayout role={role} onRoleChange={setRole}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
            <p className="text-muted-foreground mt-1">
              Comprehensive insights into salary advances and financial metrics
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[160px]">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1m">Last month</SelectItem>
                <SelectItem value="3m">Last 3 months</SelectItem>
                <SelectItem value="6m">Last 6 months</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-border/50 shadow-neumorphic-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Volume</p>
                  <p className="text-2xl font-bold mt-1">{formatCurrency(404000000)}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <ArrowUpRight className="h-4 w-4 text-success" />
                    <span className="text-sm text-success">+12.5%</span>
                    <span className="text-sm text-muted-foreground">vs last period</span>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-primary/10">
                  <Wallet className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-neumorphic-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Users</p>
                  <p className="text-2xl font-bold mt-1">156</p>
                  <div className="flex items-center gap-1 mt-2">
                    <ArrowUpRight className="h-4 w-4 text-success" />
                    <span className="text-sm text-success">+8 users</span>
                    <span className="text-sm text-muted-foreground">this month</span>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-accent/10">
                  <Users className="h-6 w-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-neumorphic-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Advance</p>
                  <p className="text-2xl font-bold mt-1">{formatCurrency(2850000)}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <ArrowDownRight className="h-4 w-4 text-destructive" />
                    <span className="text-sm text-destructive">-3.2%</span>
                    <span className="text-sm text-muted-foreground">vs last period</span>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-success/10">
                  <TrendingDown className="h-6 w-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-neumorphic-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Repayment Rate</p>
                  <p className="text-2xl font-bold mt-1">98.2%</p>
                  <div className="flex items-center gap-1 mt-2">
                    <ArrowUpRight className="h-4 w-4 text-success" />
                    <span className="text-sm text-success">+0.5%</span>
                    <span className="text-sm text-muted-foreground">improvement</span>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-warning/10">
                  <TrendingUp className="h-6 w-6 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Charts */}
        <Tabs defaultValue="trends" className="space-y-4">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="trends" className="gap-2">
              <Activity className="h-4 w-4" />
              Trends
            </TabsTrigger>
            <TabsTrigger value="distribution" className="gap-2">
              <PieChartIcon className="h-4 w-4" />
              Distribution
            </TabsTrigger>
            <TabsTrigger value="liquidity" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              Liquidity
            </TabsTrigger>
          </TabsList>

          {/* Trends Tab */}
          <TabsContent value="trends" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Monthly Withdrawals vs Repayments */}
              <Card className="border-border/50 shadow-neumorphic">
                <CardHeader>
                  <CardTitle>Withdrawals vs Repayments</CardTitle>
                  <CardDescription>Monthly comparison over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={monthlyTrends}>
                      <defs>
                        <linearGradient id="withdrawGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="repayGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                      <XAxis dataKey="month" className="text-xs" />
                      <YAxis tickFormatter={(v) => `${v / 1000000}M`} className="text-xs" />
                      <Tooltip 
                        formatter={(value: number) => formatTooltipValue(value)}
                        contentStyle={{ 
                          backgroundColor: "hsl(var(--card))", 
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px"
                        }}
                      />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="withdrawals"
                        name="Withdrawals"
                        stroke="hsl(var(--primary))"
                        fill="url(#withdrawGradient)"
                        strokeWidth={2}
                      />
                      <Area
                        type="monotone"
                        dataKey="repayments"
                        name="Repayments"
                        stroke="hsl(var(--success))"
                        fill="url(#repayGradient)"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Employee Growth */}
              <Card className="border-border/50 shadow-neumorphic">
                <CardHeader>
                  <CardTitle>Employee Growth</CardTitle>
                  <CardDescription>Active employees using salary advance</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <ComposedChart data={monthlyTrends}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                      <XAxis dataKey="month" className="text-xs" />
                      <YAxis className="text-xs" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: "hsl(var(--card))", 
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px"
                        }}
                      />
                      <Legend />
                      <Bar dataKey="employees" name="Active Employees" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                      <Line type="monotone" dataKey="employees" name="Trend" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Weekly Activity */}
              <Card className="border-border/50 shadow-neumorphic">
                <CardHeader>
                  <CardTitle>Weekly Activity Pattern</CardTitle>
                  <CardDescription>Withdrawal distribution by day of week</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={weeklyActivity}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                      <XAxis dataKey="day" className="text-xs" />
                      <YAxis yAxisId="left" className="text-xs" />
                      <YAxis yAxisId="right" orientation="right" tickFormatter={(v) => `${v / 1000000}M`} className="text-xs" />
                      <Tooltip 
                        formatter={(value: number, name: string) => 
                          name === "Amount" ? formatTooltipValue(value) : value
                        }
                        contentStyle={{ 
                          backgroundColor: "hsl(var(--card))", 
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px"
                        }}
                      />
                      <Legend />
                      <Bar yAxisId="left" dataKey="withdrawals" name="Transactions" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                      <Bar yAxisId="right" dataKey="amount" name="Amount" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Hourly Distribution */}
              <Card className="border-border/50 shadow-neumorphic">
                <CardHeader>
                  <CardTitle>Hourly Distribution</CardTitle>
                  <CardDescription>When employees request advances</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={hourlyDistribution}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                      <XAxis dataKey="hour" className="text-xs" />
                      <YAxis className="text-xs" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: "hsl(var(--card))", 
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px"
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="count" 
                        name="Withdrawals"
                        stroke="hsl(var(--primary))" 
                        strokeWidth={3}
                        dot={{ fill: "hsl(var(--primary))", strokeWidth: 2 }}
                        activeDot={{ r: 6, fill: "hsl(var(--primary))" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Distribution Tab */}
          <TabsContent value="distribution" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Department Distribution */}
              <Card className="border-border/50 shadow-neumorphic">
                <CardHeader>
                  <CardTitle>Usage by Department</CardTitle>
                  <CardDescription>Salary advance distribution across departments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-8">
                    <ResponsiveContainer width="50%" height={250}>
                      <PieChart>
                        <Pie
                          data={departmentData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={4}
                          dataKey="value"
                        >
                          {departmentData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value: number) => `${value}%`}
                          contentStyle={{ 
                            backgroundColor: "hsl(var(--card))", 
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px"
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="space-y-3">
                      {departmentData.map((dept, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: dept.color }}
                          />
                          <span className="text-sm text-muted-foreground">{dept.name}</span>
                          <Badge variant="outline" className="ml-auto">{dept.value}%</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Limit Utilization */}
              <Card className="border-border/50 shadow-neumorphic">
                <CardHeader>
                  <CardTitle>Limit Utilization</CardTitle>
                  <CardDescription>How much of their limit employees use</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <RadialBarChart
                      cx="50%"
                      cy="50%"
                      innerRadius="20%"
                      outerRadius="90%"
                      data={employeeUsage}
                      startAngle={90}
                      endAngle={-270}
                    >
                      <RadialBar
                        dataKey="count"
                        background={{ fill: "hsl(var(--muted))" }}
                        cornerRadius={8}
                      />
                      <Tooltip 
                        formatter={(value: number) => `${value} employees`}
                        contentStyle={{ 
                          backgroundColor: "hsl(var(--card))", 
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px"
                        }}
                      />
                      <Legend 
                        iconType="circle"
                        formatter={(value, entry: any) => entry.payload.range}
                      />
                    </RadialBarChart>
                  </ResponsiveContainer>
                  <div className="grid grid-cols-4 gap-2 mt-4">
                    {employeeUsage.map((item, index) => (
                      <div key={index} className="text-center p-2 rounded-lg bg-muted/50">
                        <p className="text-lg font-bold" style={{ color: item.fill }}>{item.count}</p>
                        <p className="text-xs text-muted-foreground">{item.range}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Users */}
              <Card className="border-border/50 shadow-neumorphic lg:col-span-2">
                <CardHeader>
                  <CardTitle>Top Users by Volume</CardTitle>
                  <CardDescription>Employees with highest withdrawal amounts this period</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Budi Santoso", dept: "Engineering", amount: 15000000, count: 8 },
                      { name: "Citra Dewi", dept: "Sales", amount: 12500000, count: 6 },
                      { name: "Dian Pratama", dept: "Operations", amount: 11000000, count: 7 },
                      { name: "Eka Putri", dept: "Marketing", amount: 9500000, count: 5 },
                      { name: "Fajar Rahman", dept: "Engineering", amount: 8800000, count: 4 },
                    ].map((user, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-semibold text-sm">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.dept}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{formatCurrency(user.amount)}</p>
                          <p className="text-sm text-muted-foreground">{user.count} transactions</p>
                        </div>
                        <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                            style={{ width: `${(user.amount / 15000000) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Liquidity Tab */}
          <TabsContent value="liquidity" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Liquidity Sources */}
              <Card className="border-border/50 shadow-neumorphic lg:col-span-2">
                <CardHeader>
                  <CardTitle>Liquidity Pool Composition</CardTitle>
                  <CardDescription>Funding sources over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <AreaChart data={liquidityFlow}>
                      <defs>
                        <linearGradient id="companyGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
                        </linearGradient>
                        <linearGradient id="aaveGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0.1} />
                        </linearGradient>
                        <linearGradient id="publicGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0.1} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                      <XAxis dataKey="month" className="text-xs" />
                      <YAxis tickFormatter={(v) => `${v / 1000000}M`} className="text-xs" />
                      <Tooltip 
                        formatter={(value: number) => formatTooltipValue(value)}
                        contentStyle={{ 
                          backgroundColor: "hsl(var(--card))", 
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px"
                        }}
                      />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="company"
                        name="Company Pool"
                        stackId="1"
                        stroke="hsl(var(--primary))"
                        fill="url(#companyGrad)"
                      />
                      <Area
                        type="monotone"
                        dataKey="aave"
                        name="Aave Protocol"
                        stackId="1"
                        stroke="hsl(var(--accent))"
                        fill="url(#aaveGrad)"
                      />
                      <Area
                        type="monotone"
                        dataKey="public"
                        name="Public LP"
                        stackId="1"
                        stroke="hsl(var(--success))"
                        fill="url(#publicGrad)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Pool Health Metrics */}
              <Card className="border-border/50 shadow-neumorphic">
                <CardHeader>
                  <CardTitle>Pool Health Metrics</CardTitle>
                  <CardDescription>Key liquidity indicators</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Utilization Rate</span>
                      <span className="font-semibold">68%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-success via-warning to-destructive w-[68%] rounded-full" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="p-4 rounded-xl bg-muted/50">
                      <p className="text-sm text-muted-foreground">Available</p>
                      <p className="text-xl font-bold text-success">{formatCurrency(33000000)}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-muted/50">
                      <p className="text-sm text-muted-foreground">Deployed</p>
                      <p className="text-xl font-bold text-primary">{formatCurrency(70000000)}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-muted/50">
                      <p className="text-sm text-muted-foreground">Pending Repay</p>
                      <p className="text-xl font-bold text-warning">{formatCurrency(45000000)}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-muted/50">
                      <p className="text-sm text-muted-foreground">APY Generated</p>
                      <p className="text-xl font-bold text-accent">8.5%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Revenue Breakdown */}
              <Card className="border-border/50 shadow-neumorphic">
                <CardHeader>
                  <CardTitle>Revenue Breakdown</CardTitle>
                  <CardDescription>Fee distribution this period</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-muted-foreground">Company Share (80%)</span>
                          <span className="font-semibold">{formatCurrency(28000000)}</span>
                        </div>
                        <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary w-[80%] rounded-full" />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-muted-foreground">Platform Share (20%)</span>
                          <span className="font-semibold">{formatCurrency(7000000)}</span>
                        </div>
                        <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-accent w-[20%] rounded-full" />
                        </div>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-border">
                      <div className="flex justify-between">
                        <span className="font-medium">Total Fees Collected</span>
                        <span className="font-bold text-lg">{formatCurrency(35000000)}</span>
                      </div>
                    </div>
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
