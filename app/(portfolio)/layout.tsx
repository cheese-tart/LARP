import { Suspense, type ReactNode } from "react";
import { Portfolio } from "../components/portfolio";
import { BlogList } from "./blog/blog-list";

export default function PortfolioLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense>
      <Portfolio blogList={<BlogList />}>{children}</Portfolio>
    </Suspense>
  );
}
