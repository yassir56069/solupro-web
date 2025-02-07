import "~/styles/globals.css";
import { EdgeCutting, CreatoDisplay } from "utils/customFonts";


import { GeistSans }                  from "geist/font/sans";
import { type Metadata }              from "next";

// components
import Navbar                         from '../structures/interface-navbar';


export const metadata: Metadata = {
  title: "Solupro | The Best Car Rental Website In Mauritius",
  description: "Explore Mauritius with ease using Solupro, reliable car rental service. Experience the beauty of Mauritius safely with well-maintained vehicles, perfect for tourists seeking the best and most convenient travel. Come book with us now !",
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
