"use client";

import type { ReactNode } from "react";
import { trackEvent } from "@/lib/clientAnalytics";

type TrackedExternalLinkProps = {
  className?: string;
  children: ReactNode;
  eventName: "official_link_click";
  href: string;
  position: string;
};

export function TrackedExternalLink({
  className,
  children,
  eventName,
  href,
  position
}: TrackedExternalLinkProps) {
  return (
    <a
      className={className}
      href={href}
      onClick={() => trackEvent(eventName, { position })}
      rel="noreferrer"
      target="_blank"
    >
      {children}
    </a>
  );
}
