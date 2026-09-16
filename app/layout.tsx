import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Footer, Nav } from "@/components";
import { StyledComponentsRegistry } from "@/lib";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Sean Gordon",
  description:
    "A front-end software engineer based in London specialising in React.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={manrope.className}>
      <body>
        <StyledComponentsRegistry>
          <Nav />
          <main>{children}</main>
          <Footer />
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
