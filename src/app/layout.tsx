import "~/styles/globals.css";
import { EdgeCutting, CreatoDisplay } from "utils/customFonts";
// components
import Navbar from '../components/navbar/navbar';


import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Solupro",
  description: "Car Rental Website",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${CreatoDisplay.variable} ${EdgeCutting.variable}`}>
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
