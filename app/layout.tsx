import { Manrope } from "next/font/google";
import { Footer, JsonLd, Nav, ViewCodeModal } from "@/components";
import { buildSiteJsonLd, rootMetadata, StyledComponentsRegistry } from "@/lib";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata = rootMetadata;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={manrope.className}>
      <body>
        <StyledComponentsRegistry>
          <Nav />
          <main>{children}</main>
          <Footer />
          <ViewCodeModal />
        </StyledComponentsRegistry>
        <JsonLd data={buildSiteJsonLd()} />
      </body>
    </html>
  );
}
