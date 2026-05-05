import type { SVGProps } from "react";

export default function ImplantIcon(props: SVGProps<SVGSVGElement>) {
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
      <path d="M9 3.5c-1.8 0-3 1.4-3 3 0 .9.2 1.7.5 2.5L9 14h6l2.5-5c.3-.8.5-1.6.5-2.5 0-1.6-1.2-3-3-3-1 0-1.7.4-2.4.9-.4.3-.9.3-1.3 0-.6-.5-1.4-.9-2.3-.9Z" />
      <path d="M10 14v2M14 14v2M9 16h6M10.5 18h3M11 20h2" />
    </svg>
  );
}
