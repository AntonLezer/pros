import type { SVGProps } from "react";

export default function ToothIcon(props: SVGProps<SVGSVGElement>) {
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
      <path d="M7 3.5C5 3.5 3.5 5 3.5 7c0 2.2.6 4 1.4 5.6.6 1.2 1 2.3 1.2 3.5l.5 3.4c.1.7.7 1.2 1.4 1.2.7 0 1.3-.5 1.4-1.2l.5-2.8c.1-.6.6-1 1.2-1h1.6c.6 0 1.1.4 1.2 1l.5 2.8c.1.7.7 1.2 1.4 1.2.7 0 1.3-.5 1.4-1.2l.5-3.4c.2-1.2.6-2.3 1.2-3.5.8-1.6 1.4-3.4 1.4-5.6 0-2-1.5-3.5-3.5-3.5-1.6 0-2.5.7-3.5 1.5-.6.5-1.4.5-2 0C9.5 4.2 8.6 3.5 7 3.5Z" />
    </svg>
  );
}
