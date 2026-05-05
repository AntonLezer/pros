import type { SVGProps } from "react";

export default function BabyToothIcon(props: SVGProps<SVGSVGElement>) {
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
      <path d="M8 5C6.3 5 5 6.3 5 8c0 1.7.5 3.1 1.1 4.4.5 1 .9 1.9 1 2.8l.4 2.6c.1.6.6 1 1.2 1 .6 0 1.1-.4 1.2-1l.4-2.2c.1-.5.5-.8 1-.8h1.4c.5 0 .9.3 1 .8l.4 2.2c.1.6.6 1 1.2 1 .6 0 1.1-.4 1.2-1l.4-2.6c.1-.9.5-1.8 1-2.8C18.5 11.1 19 9.7 19 8c0-1.7-1.3-3-3-3-1.2 0-1.9.5-2.6 1-.5.4-1.3.4-1.8 0C10.9 5.5 10.2 5 9 5h-1Z" />
      <circle cx="9.5" cy="10" r="0.7" fill="currentColor" />
      <circle cx="14.5" cy="10" r="0.7" fill="currentColor" />
      <path d="M10.5 12.5c.5.5 1.5.5 2 0" />
    </svg>
  );
}
