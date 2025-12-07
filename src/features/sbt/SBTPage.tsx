'use client';

import { SBTCard } from "@/components/employee/SBTCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  ExternalLink,
  Clock,
  CheckCircle2,
  FileText,
  Link2,
  Copy,
} from "lucide-react";
import { useState } from "react";

const transactionHistory = [
  {
    type: "Mint",
    date: "2024-01-01",
    hash: "0xabc...123",
    status: "confirmed",
  },
  {
    type: "Update",
    date: "2024-01-15",
    hash: "0xdef...456",
    status: "confirmed",
  },
];

export default function SBTPage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-accent flex items-center justify-center shadow-glow">
            <Shield className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Payroll SBT</h1>
            <p className="text-muted-foreground">
              Your Soulbound Token credentials
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SBT Card */}
        <div className="animate-slide-up">
          <SBTCard />
        </div>

        {/* Info Panel */}
        <div className="space-y-6">
          {/* What is SBT */}
          <div className="card-elevated p-6 animate-slide-up" style={{ animationDelay: "100ms" }}>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              What is Payroll SBT?
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              A Soulbound Token (SBT) is a non-transferable NFT that represents your
              employment credentials. It's used to verify your identity and salary
              information for the salary advance system.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>Verified by your employer</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>Non-transferable (Soulbound)</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>Stored on blockchain</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>Metadata on IPFS</span>
              </div>
            </div>
          </div>

          {/* Contract Info */}
          <div className="card-elevated p-6 animate-slide-up" style={{ animationDelay: "200ms" }}>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Link2 className="w-5 h-5 text-primary" />
              Contract Information
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                <div>
                  <p className="text-xs text-muted-foreground">Token ID</p>
                  <p className="font-mono text-sm">#1247</p>
                </div>
                <Button variant="ghost" size="icon-sm">
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                <div>
                  <p className="text-xs text-muted-foreground">Contract Address</p>
                  <p className="font-mono text-sm truncate max-w-[200px]">
                    0x742d35Cc6634C0532925a3b844Bc9e7595f...
                  </p>
                </div>
                <Button variant="ghost" size="icon-sm">
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                <div>
                  <p className="text-xs text-muted-foreground">Network</p>
                  <p className="text-sm font-medium">Polygon Mainnet</p>
                </div>
                <Badge variant="secondary">Low Gas</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="card-elevated p-6 animate-slide-up" style={{ animationDelay: "300ms" }}>
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          On-Chain History
        </h3>
        <div className="space-y-3">
          {transactionHistory.map((tx, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-xl bg-muted/50"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-success/10 text-success flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium">{tx.type} SBT</p>
                  <p className="text-sm text-muted-foreground">{tx.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <code className="text-sm font-mono text-muted-foreground">
                  {tx.hash}
                </code>
                <Button variant="ghost" size="icon-sm">
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
