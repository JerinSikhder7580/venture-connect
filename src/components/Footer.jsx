"use client"
import {
  Facebook,
  Twitter,
  Linkedin,
  Github,
  Mail,
  Phone,
  MapPin,
  Send
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";


const Footer = () => {

  const pathname = usePathname()
  if (pathname.includes('dashboard')) {
    return null
  }

  return (
    <footer className="bg-slate-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Logo & Description */}
          <div>
            <h2 className="text-3xl font-bold text-white">
              Venture<span className="text-cyan-400">Connect</span>
            </h2>

            <p className="mt-4 text-sm leading-6 text-gray-400">
              A platform where founders build startups,
              connect with talented collaborators,
              and create successful teams together.
            </p>

            <div className="flex gap-4 mt-6">

              <a
                href="#"
                className="hover:text-cyan-400 transition"
              >
                <Send size={20} />
              </a>

              <a
                href="#"
                className="hover:text-cyan-400 transition"
              >
                <Send size={20} />
              </a>

              <a
                href="#"
                className="hover:text-cyan-400 transition"
              >
                <Send size={20} />
              </a>

              <a
                href="#"
                className="hover:text-cyan-400 transition"
              >
                <Send size={20} />
              </a>

            </div>

          </div>


          {/* Quick Links */}
          <div>

            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h3>

            <ul className="space-y-3 text-sm">

              <li>
                <Link
                  href="/"
                  className="hover:text-cyan-400 transition"
                >
                  Home
                </Link>
              </li>


              <li>
                <a
                  href="/startups"
                  className="hover:text-cyan-400 transition"
                >
                  Browse Startups
                </a>
              </li>


              <li>
                <a
                  href="/opportunities"
                  className="hover:text-cyan-400 transition"
                >
                  Opportunities
                </a>
              </li>


              <li>
                <a
                  href="/login"
                  className="hover:text-cyan-400 transition"
                >
                  Login
                </a>
              </li>


            </ul>

          </div>



          {/* Services */}

          <div>

            <h3 className="text-lg font-semibold text-white mb-4">
              Platform
            </h3>

            <ul className="space-y-3 text-sm">

              <li>
                Startup Building
              </li>

              <li>
                Team Collaboration
              </li>

              <li>
                Talent Matching
              </li>

              <li>
                Founder Networking
              </li>

            </ul>

          </div>



          {/* Contact */}

          <div>

            <h3 className="text-lg font-semibold text-white mb-4">
              Contact
            </h3>


            <div className="space-y-4 text-sm">


              <p className="flex gap-3 items-center">
                <Mail
                  size={18}
                  className="text-cyan-400"
                />
                support@ventureconnect.com
              </p>


              <p className="flex gap-3 items-center">
                <Phone
                  size={18}
                  className="text-cyan-400"
                />
                +880 1234 567890
              </p>


              <p className="flex gap-3 items-center">
                <MapPin
                  size={18}
                  className="text-cyan-400"
                />
                Dhaka, Bangladesh
              </p>


            </div>


          </div>


        </div>


        {/* Bottom */}

        <div
          className="
          border-t 
          border-slate-800 
          mt-10 
          pt-6 
          text-center 
          text-sm 
          text-gray-500
          "
        >

          © {new Date().getFullYear()} VentureConnect.
          All rights reserved.

        </div>


      </div>
    </footer>
  );
};


export default Footer;