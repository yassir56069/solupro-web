import "~/styles/globals.css";
import { EdgeCutting, CreatoDisplay } from "utils/customFonts";

import { type Metadata }              from "next";

// components
import Navbar                         from '../structures/interface-navbar';
import Footer                         from "~/structures/interface-footer";

// ✅ Next.js built-in metadata system
export const metadata = {
  title: "Solupro | The Best Car Rental Website In Mauritius",
  description: "Explore Mauritius with ease using Solupro, reliable car rental service. Experience the beauty of Mauritius safely with well-maintained vehicles, perfect for tourists seeking the best and most convenient travel. Come book with us now!",
  icons: { rel: "icon", url: "/favicon.ico" },
  openGraph: {
    title: "Solupro 🚗☀️ The Best Car Rental Website In Mauritius!",
    description: "Explore Mauritius with ease using Solupro, reliable car rental service. Experience the beauty of Mauritius safely with well-maintained vehicles, perfect for tourists seeking the best and most convenient travel. Come book with us now!",
    images: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${CreatoDisplay.variable} ${EdgeCutting.variable}`}>
        <Navbar/>
          {children}
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
        <Footer/>
      </body>
    </html>
  );
}
