import type { SVGProps } from "react";

export default function DropletIcon(props: SVGProps<SVGSVGElement>) {
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
      <path d="M12 3.5c-.6 0-1.1.3-1.4.8L6.5 11c-.7 1.2-1 2.5-1 3.8C5.5 18 8.4 21 12 21s6.5-3 6.5-6.2c0-1.3-.3-2.6-1-3.8L13.4 4.3c-.3-.5-.8-.8-1.4-.8Z" />
      <path d="M9 14.5c0 1.5 1.2 2.7 2.7 2.7" strokeOpacity="0.6" />
    </svg>
  );
}
