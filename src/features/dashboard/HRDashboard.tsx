'use client';

import React, { Suspense } from 'react';
import { Users, Wallet, Zap, Coins, TrendingUp, ArrowUpRight } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { AdvanceTrendChart, LiquidityChart, RevenueShareChart } from "@/components/dashboard/AnalyticsCharts";
import { LiquidityCard } from "@/components/dashboard/LiquidityCard";
import { EmployeeTable } from "@/components/dashboard/EmployeeTable";

export default function HRDashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's your payroll overview for January 2024.
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Karyawan Aktif"
          value="156"
          change="+12"
          changeType="positive"
          icon={Users}
          iconColor="primary"
          delay={0}
        />
        <StatCard
          title="Total Payroll Bulan Ini"
          value="Rp 2.34B"
          change="+8.2%"
          changeType="positive"
          icon={Wallet}
          iconColor="secondary"
          delay={100}
        />
        <StatCard
          title="Salary Advance Diambil"
          value="Rp 189M"
          change="+15.3%"
          changeType="positive"
          icon={Zap}
          iconColor="accent"
          delay={200}
        />
        <StatCard
          title="Liquidity Pool"
          value="Rp 1.15B"
          change="Healthy"
          changeType="neutral"
          icon={Coins}
          iconColor="success"
          delay={300}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Suspense fallback={<div className="h-80 bg-muted rounded-xl animate-pulse" />}>
          <AdvanceTrendChart />
        </Suspense>
        <Suspense fallback={<div className="h-80 bg-muted rounded-xl animate-pulse" />}>
          <LiquidityChart />
        </Suspense>
      </div>

      {/* Liquidity & Revenue */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Suspense fallback={<div className="h-80 bg-muted rounded-xl animate-pulse" />}>
            <LiquidityCard />
          </Suspense>
        </div>
        <Suspense fallback={<div className="h-80 bg-muted rounded-xl animate-pulse" />}>
          <RevenueShareChart />
        </Suspense>
      </div>

      {/* Employee Table */}
      <Suspense fallback={<div className="bg-muted rounded-xl h-96 animate-pulse" />}>
        <EmployeeTable />
      </Suspense>
    </div>
  );
}
