import type { SVGProps } from "react";

export default function BracesIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M3 10c0-1 .8-1.8 1.8-1.8h14.4c1 0 1.8.8 1.8 1.8v4c0 1-.8 1.8-1.8 1.8H4.8C3.8 15.8 3 15 3 14v-4Z" />
      <path d="M3 12h18" />
      <path d="M7 8.2v7.6M11 8.2v7.6M13 8.2v7.6M17 8.2v7.6" />
      <circle cx="9" cy="12" r="1.2" fill="currentColor" />
      <circle cx="15" cy="12" r="1.2" fill="currentColor" />
    </svg>
  );
}
