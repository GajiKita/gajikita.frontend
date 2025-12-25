import Link from "next/link"
import { redirect } from "next/navigation"
import { getUser } from "@/lib/auth"

export default async function DashboardPage() {
  const user = await getUser()

  if (!user) {
    redirect("/login")
  }

  const isHR = (user.role ?? "").toUpperCase() === "HR"

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-4xl space-y-6">
        <header className="rounded-3xl bg-white p-8 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Welcome back</p>
          <h1 className="mt-1 text-3xl font-semibold text-slate-900">
            {user.name}
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Signed in as {user.email}. Role:{" "}
            <span className="font-medium text-slate-900">{user.role}</span>
          </p>
        </header>

        <section className="grid gap-6 rounded-3xl bg-white p-8 shadow-sm">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Profile summary
            </h2>
            <p className="text-sm text-slate-500">
              Tenant ID: {user.tenantId ?? "—"}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {isHR ? (
              <Link
                href="/dashboard/employees"
                className="rounded-2xl border border-slate-200 p-6 transition hover:border-blue-500 hover:bg-blue-50/60"
              >
                <p className="text-lg font-semibold text-slate-900">
                  Manage Employees
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Approve payroll runs, update employee data, and invite new
                  team members.
                </p>
              </Link>
            ) : (
              <Link
                href="/dashboard/payroll"
                className="rounded-2xl border border-slate-200 p-6 transition hover:border-blue-500 hover:bg-blue-50/60"
              >
                <p className="text-lg font-semibold text-slate-900">
                  My Payroll
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Review your payroll history, advances, and upcoming payouts.
                </p>
              </Link>
            )}

            <div className="rounded-2xl border border-slate-200 p-6">
              <p className="text-lg font-semibold text-slate-900">
                Quick actions
              </p>
              <ul className="mt-3 space-y-2 text-sm text-slate-500">
                <li>• Update password policies</li>
                <li>• Review pending approvals</li>
                <li>• Download payroll statements</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
