import { Separator } from "~/shad-components/separator"
import { Button } from "~/shad-components/button"
import { Facebook, Twitter, Instagram, Github } from "lucide-react"

export function Footer() {
  return (
    <footer className="text-white w-full bg-gray-900 text-gray-300 py-8">
      <div className=" mx-auto px-6 md:px-12">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          {/* Logo / Branding */}
          <div className="text-xl font-semibold">Solupro</div>

          {/* Navigation Links */}
          <nav className="flex space-x-6 text-sm">
            <a href="#" className="hover:text-accent">Booking & Transfer</a>
            <a href="#" className="hover:text-accent">Contact Us</a>
            <a href="#" className="hover:text-accent">About Us</a>
            <a href="#" className="hover:text-accent">Terms & Conditions</a>
          </nav>

          {/* Social Media Icons */}
          <div className="flex space-x-4">
            <Button variant="ghost" size="icon">
              <Facebook className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Twitter className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Instagram className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Github className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Separator */}
        <Separator className="my-6 opacity-50" />


        {/* Copyright */}
        <p className="text-center text-xs">&copy; {new Date().getFullYear()} Solupro Website made by Yassir Hoossan Buksh. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer;
