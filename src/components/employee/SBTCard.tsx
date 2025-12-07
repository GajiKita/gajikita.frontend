'use client';

import { Shield, ExternalLink, Copy, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SBTCardProps {
  className?: string;
  mini?: boolean;
}

export function SBTCard({ className, mini = false }: SBTCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("ipfs://Qm...xyz789");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (mini) {
    return (
      <div className={cn("sbt-card p-4", className)}>
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-accent flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-white">Payroll SBT</p>
            <p className="text-xs text-white/60">Active • Soulbound</p>
          </div>
          <Badge className="bg-success/20 text-success border-0">
            Verified
          </Badge>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("sbt-card p-6", className)}>
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-accent flex items-center justify-center shadow-glow">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <Badge className="bg-success/20 text-success border-0 text-xs">
            Active
          </Badge>
        </div>

        {/* Title */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-white mb-1">Payroll SBT</h3>
          <p className="text-sm text-white/60">Soulbound Token • ERC-721</p>
        </div>

        {/* Details */}
        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center py-2 border-b border-white/10">
            <span className="text-sm text-white/60">Employee</span>
            <span className="text-sm font-medium text-white">Ahmad Rizki</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-white/10">
            <span className="text-sm text-white/60">Company</span>
            <span className="text-sm font-medium text-white">PT. TechIndo Global</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-white/10">
            <span className="text-sm text-white/60">Role</span>
            <span className="text-sm font-medium text-white">Software Engineer</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-white/10">
            <span className="text-sm text-white/60">Monthly Salary</span>
            <span className="text-sm font-medium text-white">Rp 15.000.000</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-white/10">
            <span className="text-sm text-white/60">Withdraw Limit</span>
            <span className="text-sm font-medium text-white">30%</span>
          </div>
        </div>

        {/* Metadata */}
        <div className="bg-white/5 rounded-xl p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-white/60">IPFS Metadata</span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  Copy
                </>
              )}
            </button>
          </div>
          <p className="text-xs font-mono text-white/80 truncate">
            ipfs://QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-white/40">
            Non-Transferable • Soulbound
          </span>
          <Button
            variant="ghost"
            size="sm"
            className="text-white/60 hover:text-white hover:bg-white/10 gap-1"
          >
            <ExternalLink className="w-3 h-3" />
            View on Explorer
          </Button>
        </div>
      </div>
    </div>
  );
}
