"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { ArrowLeft, KeyRound, CalendarDays, Users } from "lucide-react";

type AdminShellProps = {
  children?: ReactNode;
  compact?: boolean;
};

type AdminHeaderProps = {
  backHref: string;
  backLabel: string;
  title: string;
  description?: string;
};

type AdminBannerProps = {
  message: string;
  tone?: "error" | "neutral";
};

type AdminButtonProps = {
  children?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
  className?: string;
};

type AdminInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  className?: string;
};

type AdminLinkButtonProps = {
  href: string;
  children?: ReactNode;
  className?: string;
};

export function AdminShell({ children, compact = false }: AdminShellProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <div className={`w-full min-h-screen bg-slate-100 ${compact ? "py-6" : "py-12"}`}>
      <div className="container mx-auto px-6 lg:px-8">
        {isAdminRoute ? (
          <div className="mb-5 flex flex-wrap items-center gap-2 rounded-xl border border-purple-200 bg-white p-2">
            <Link
              href="/admin"
              className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                pathname === "/admin"
                  ? "bg-purple-600 text-white"
                  : "text-purple-700 hover:bg-purple-50"
              }`}
            >
              <KeyRound className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/admin/members"
              className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                pathname.startsWith("/admin/members")
                  ? "bg-purple-600 text-white"
                  : "text-purple-700 hover:bg-purple-50"
              }`}
            >
              <Users className="h-4 w-4" />
              Members
            </Link>
            <Link
              href="/admin/events"
              className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                pathname.startsWith("/admin/events")
                  ? "bg-purple-600 text-white"
                  : "text-purple-700 hover:bg-purple-50"
              }`}
            >
              <CalendarDays className="h-4 w-4" />
              Events
            </Link>
            <Link
              href="/admin/access"
              className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                pathname.startsWith("/admin/access")
                  ? "bg-purple-600 text-white"
                  : "text-purple-700 hover:bg-purple-50"
              }`}
            >
              <KeyRound className="h-4 w-4" />
              Access
            </Link>
          </div>
        ) : null}

        {children}
      </div>
    </div>
  );
}

export function AdminHeader({ backHref, backLabel, title, description }: AdminHeaderProps) {
  return (
    <div className="mb-6">
      <Link
        href={backHref}
        className="inline-flex items-center gap-1 text-sm font-medium text-red-600 hover:text-red-700"
      >
        <ArrowLeft className="h-4 w-4" />
        {backLabel}
      </Link>
      <h1 className="mt-2 text-3xl font-playfair font-bold text-slate-900">{title}</h1>
      {description ? <p className="mt-1 text-sm text-slate-600">{description}</p> : null}
    </div>
  );
}

export function getUploadFileName(path: string | undefined | null): string {
  const normalized = (path || "").trim();
  if (!normalized) return "";
  const chunks = normalized.split("/").filter(Boolean);
  return chunks[chunks.length - 1] || "";
}

export function AdminBanner({ message, tone = "error" }: AdminBannerProps) {
  if (tone === "neutral") {
    return (
      <div className="rounded-xl border border-slate-300 bg-white p-8 text-center text-slate-700">
        {message}
      </div>
    );
  }

  return (
    <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
      {message}
    </div>
  );
}

export function AdminCard({ children, compact = false }: AdminShellProps) {
  return (
    <div
      className={`rounded-2xl border border-slate-300 bg-white shadow-sm ${compact ? "p-4" : "p-6"}`}
    >
      {children}
    </div>
  );
}

export function AdminPrimaryButton({ children, onClick, disabled, type = "button", className = "" }: AdminButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-60 ${className}`}
    >
      {children}
    </button>
  );
}

export function AdminPrimaryLink({ href, children, className = "" }: AdminLinkButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 ${className}`}
    >
      {children}
    </Link>
  );
}

export function AdminSecondaryButton({ children, onClick, disabled, type = "button", className = "" }: AdminButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded border border-slate-300 px-3 py-2 text-slate-700 hover:bg-slate-50 disabled:opacity-60 ${className}`}
    >
      {children}
    </button>
  );
}

export function AdminDangerButton({ children, onClick, disabled, type = "button", className = "" }: AdminButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded border border-red-300 px-3 py-2 text-red-700 hover:bg-red-50 disabled:opacity-60 ${className}`}
    >
      {children}
    </button>
  );
}

export function AdminInput({ value, onChange, placeholder, type = "text", disabled, className = "" }: AdminInputProps) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      className={`w-full rounded border border-slate-300 bg-white px-3 py-2 text-sm ${className}`}
    />
  );
}
