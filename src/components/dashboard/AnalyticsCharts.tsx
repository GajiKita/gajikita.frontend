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
  ResponsiveContainer,
  Legend,
} from "recharts";

const monthlyAdvanceData = [
  { month: "Jan", amount: 125000000 },
  { month: "Feb", amount: 145000000 },
  { month: "Mar", amount: 132000000 },
  { month: "Apr", amount: 168000000 },
  { month: "May", amount: 155000000 },
  { month: "Jun", amount: 189000000 },
];

const liquidityData = [
  { month: "Jan", company: 500, aave: 200, crowdfund: 100 },
  { month: "Feb", company: 520, aave: 250, crowdfund: 120 },
  { month: "Mar", company: 480, aave: 300, crowdfund: 150 },
  { month: "Apr", company: 550, aave: 280, crowdfund: 180 },
  { month: "May", company: 600, aave: 320, crowdfund: 200 },
  { month: "Jun", company: 580, aave: 350, crowdfund: 220 },
];

const revenueShareData = [
  { name: "Platform (20%)", value: 20, color: "#3b82f6" },
  { name: "Company (80%)", value: 80, color: "#14b8a6" },
];

const formatCurrency = (value: number) => {
  if (value >= 1000000000) return `Rp ${(value / 1000000000).toFixed(1)}B`;
  if (value >= 1000000) return `Rp ${(value / 1000000).toFixed(0)}M`;
  return `Rp ${value.toLocaleString()}`;
};

export function AdvanceTrendChart() {
  return (
    <div className="card-elevated p-6">
      <h3 className="text-lg font-semibold mb-1">Salary Advance Trend</h3>
      <p className="text-sm text-muted-foreground mb-6">Monthly advance disbursement</p>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={monthlyAdvanceData}>
            <defs>
              <linearGradient id="colorAdvance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              tickFormatter={formatCurrency}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "12px",
                boxShadow: "var(--shadow-lg)",
              }}
              formatter={(value: number) => [formatCurrency(value), "Amount"]}
            />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="#3b82f6"
              strokeWidth={3}
              fill="url(#colorAdvance)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function LiquidityChart() {
  return (
    <div className="card-elevated p-6">
      <h3 className="text-lg font-semibold mb-1">Liquidity Sources</h3>
      <p className="text-sm text-muted-foreground mb-6">Pool contributions by source (in Millions)</p>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={liquidityData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "12px",
                boxShadow: "var(--shadow-lg)",
              }}
            />
            <Legend />
            <Bar dataKey="company" name="Company" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="aave" name="Aave" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="crowdfund" name="Crowdfund" fill="#14b8a6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function RevenueShareChart() {
  return (
    <div className="card-elevated p-6">
      <h3 className="text-lg font-semibold mb-1">Revenue Share</h3>
      <p className="text-sm text-muted-foreground mb-6">Fee distribution</p>
      
      <div className="h-64 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={revenueShareData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={5}
              dataKey="value"
            >
              {revenueShareData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "12px",
                boxShadow: "var(--shadow-lg)",
              }}
              formatter={(value: number) => [`${value}%`, "Share"]}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
