'use client';

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Zap, Wallet, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface WithdrawModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export function WithdrawModal({ open, onOpenChange }: WithdrawModalProps) {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState(1000000);
  const maxAmount = 2500000;
  const feeRate = 0.025;
  const fee = amount * feeRate;

  const handleConfirm = () => {
    setStep(2);
    setTimeout(() => {
      setStep(3);
    }, 2000);
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => setStep(1), 300);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        {step === 1 && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                Withdraw Salary Advance
              </DialogTitle>
              <DialogDescription>
                Choose how much you want to withdraw. Max 30% of earned salary.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              {/* Amount Input */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Amount</span>
                  <span className="text-sm text-muted-foreground">
                    Max: {formatCurrency(maxAmount)}
                  </span>
                </div>
                
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                    Rp
                  </span>
                  <Input
                    type="number"
                    value={amount}
                    onChange={(e) =>
                      setAmount(Math.min(Number(e.target.value), maxAmount))
                    }
                    className="pl-12 text-2xl font-bold h-16 text-center"
                  />
                </div>

                <Slider
                  value={[amount]}
                  onValueChange={([val]) => setAmount(val)}
                  max={maxAmount}
                  step={100000}
                  className="py-4"
                />

                {/* Quick Amounts */}
                <div className="flex gap-2">
                  {[500000, 1000000, 1500000, 2000000].map((val) => (
                    <Button
                      key={val}
                      variant={amount === val ? "default" : "outline"}
                      size="sm"
                      className="flex-1"
                      onClick={() => setAmount(val)}
                    >
                      {formatCurrency(val).replace("Rp", "").trim()}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Fee Breakdown */}
              <div className="p-4 rounded-xl bg-muted/50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Withdraw Amount</span>
                  <span className="font-medium">{formatCurrency(amount)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Fee (2.5%)
                  </span>
                  <span className="font-medium text-warning">{formatCurrency(fee)}</span>
                </div>
                <div className="h-px bg-border" />
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold">You'll Receive</span>
                  <span className="text-lg font-bold text-success">
                    {formatCurrency(amount - fee)}
                  </span>
                </div>
              </div>

              {/* Warning */}
              <div className="flex items-start gap-3 p-4 rounded-xl bg-warning/10 text-warning">
                <AlertCircle className="w-5 h-5 mt-0.5" />
                <p className="text-sm">
                  This amount will be deducted from your next payroll on January 31, 2024.
                </p>
              </div>
            </div>

            <Button variant="gradient" className="w-full gap-2" onClick={handleConfirm}>
              Confirm Withdraw
              <ArrowRight className="w-4 h-4" />
            </Button>
          </>
        )}

        {step === 2 && (
          <div className="py-12 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Processing Withdraw</h3>
            <p className="text-sm text-muted-foreground">
              Please wait while we process your request...
            </p>
          </div>
        )}

        {step === 3 && (
          <div className="py-12 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-success/10 flex items-center justify-center animate-scale-in">
              <CheckCircle2 className="w-8 h-8 text-success" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Withdraw Successful!</h3>
            <p className="text-sm text-muted-foreground mb-6">
              {formatCurrency(amount - fee)} has been transferred to your account.
            </p>
            <div className="p-4 rounded-xl bg-muted/50 text-left space-y-2 mb-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Transaction Hash</span>
                <code className="text-xs font-mono">0x1a2b...3c4d</code>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Status</span>
                <Badge className="bg-success/10 text-success">Confirmed</Badge>
              </div>
            </div>
            <Button variant="outline" className="w-full" onClick={handleClose}>
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
