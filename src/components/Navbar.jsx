"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Rocket } from "lucide-react";

const Navbar = () => {

  const [open, setOpen] = useState(false);

  // later replace with your auth user
  const user = false;


  const navLinks = [
    {
      name: "Home",
      path: "/"
    },
    {
      name: "Browse Startups",
      path: "/startups"
    },
    {
      name: "Opportunities",
      path: "/opportunities"
    }
  ];


  return (

    <nav className="
     bg-white 
dark-bg
shadow-sm 
sticky 
top-0 
z-50
    ">


      <div className="
        max-w-7xl 
        mx-auto 
        px-6 
        py-4
        flex 
        items-center 
        justify-between
      ">


        {/* Logo */}

        <Link
          href="/"
          className="
          flex 
          items-center 
          gap-2
          "
        >

          <div className="
            bg-cyan-400
            p-2
            rounded-lg
          ">

            <Rocket
              size={22}
              className="text-white"
            />

          </div>


          <h1 className="
            text-2xl
            font-bold
           primary-text
          ">

            Venture
            <span className="text-cyan-400">
              Connect
            </span>

          </h1>

        </Link>




        {/* Desktop Menu */}

        <div className="
          hidden
          md:flex
          items-center
          gap-8
          primary-text
        ">


          {
            navLinks.map((link) => (

              <Link

                key={link.name}

                href={link.path}

                className="
                text-slate-600
                hover:text-cyan-400
                transition
                font-medium
                "

              >

                {link.name}

              </Link>

            ))
          }


        </div>





        {/* Desktop Buttons */}


        <div className="
          hidden
          md:flex
          items-center
          gap-3
        ">


          {
            user ?

              <Link

                href="/dashboard"

                className="
              bg-cyan-400
              text-white
              px-5
              py-2
              rounded-lg
              hover:bg-cyan-500
              transition
              "

              >

                Dashboard

              </Link>


              :

              <>


                <Link

                  href="/login"

                  className="
              border
              border-cyan-400
              text-cyan-500
              px-5
              py-2
              rounded-lg
              hover:bg-cyan-400
              hover:text-white
              transition
              "

                >

                  Login

                </Link>



                <Link

                  href="/register"

                  className="
              bg-cyan-400
              text-white
              px-5
              py-2
              rounded-lg
              hover:bg-cyan-500
              transition
              "

                >

                  Join Now

                </Link>


              </>

          }


        </div>





        {/* Mobile Menu Button */}

        <button

          onClick={() => setOpen(!open)}

          className="
          md:hidden
          text-slate-700
          "

        >

          {
            open ?

              <X size={28} />

              :

              <Menu size={28} />

          }


        </button>




      </div>





      {/* Mobile Menu */}

      {
        open &&

        <div className="
          md:hidden
          px-6
          pb-6
          space-y-4
        ">


          {
            navLinks.map((link) => (


              <Link

                key={link.name}

                href={link.path}

                onClick={() => setOpen(false)}

                className="
                block
                text-slate-600
                hover:text-cyan-400
                "

              >

                {link.name}

              </Link>


            ))
          }



          {

            user ?

              <Link

                href="/dashboard"

                className="
              block
              bg-cyan-400
              text-white
              text-center
              py-2
              rounded-lg
              "

              >

                Dashboard

              </Link>


              :

              <div className="
              flex
              gap-3
            ">


                <Link

                  href="/login"

                  className="
                flex-1
                text-center
                border
                border-cyan-400
                text-cyan-400
                py-2
                rounded-lg
                "

                >

                  Login

                </Link>


                <Link

                  href="/register"

                  className="
                flex-1
                text-center
                bg-cyan-400
                text-white
                py-2
                rounded-lg
                "

                >

                  Register

                </Link>


              </div>


          }



        </div>

      }



    </nav>

  );

};


export default Navbar;