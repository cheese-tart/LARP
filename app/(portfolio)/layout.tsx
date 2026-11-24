import { Suspense, type ReactNode } from "react";
import { Portfolio } from "../components/portfolio";

export default function PortfolioLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense>
      <Portfolio>{children}</Portfolio>
    </Suspense>
  );
}
