import {
  ArrowRight,
  BarChart3,
  Users,
  Clock3,
  Moon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";


import logo from "../assets/logo.jpeg";
import damage from "../assets/damage.jpeg";

export default function Home() {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#F8FAFC] overflow-hidden">

      {/* Navbar */}

      <nav className="h-24 bg-white flex items-center justify-between px-10 shadow-sm">

        <div className="flex items-center gap-4">

          <img
            src={logo}
            alt=""
            className="w-25 h-25 rounded-xl object-cover"
          />

          <div>

            <h1 className="font-bold text-2xl text-[#111827]">
              Damage Assessment
            </h1>

            <p className="text-xl text-[#111827]">
              System
            </p>

          </div>

        </div>


        <ul className="flex gap-14 text-lg">

          <li className="text-[#216474] font-semibold relative">

            Home

            <div className="absolute -bottom-3 left-0 w-full h-1 bg-[#216474] rounded-full" />

          </li>

          <li className="cursor-pointer hover:text-[#216474]">
            Analyze Images
          </li>

          <li className="cursor-pointer hover:text-[#216474]">
            Statistics
          </li>

          <li className="cursor-pointer hover:text-[#216474]">
            Reports
          </li>

          <li className="cursor-pointer hover:text-[#216474]">
            About
          </li>

          <li className="cursor-pointer hover:text-[#216474]">
            Contact
          </li>

        </ul>


        <button>

          <Moon size={24} />

        </button>

      </nav>



      {/* Hero Section */}

      <section className="flex h-[calc(100vh-96px)]">

        {/* Left */}

        <div className="w-[42%] flex flex-col justify-center px-10 z-10">

          <span className="
          w-fit
          px-5
          py-2
          rounded-full
          bg-[#E7F7F9]
          text-[#216474]
          font-semibold
          text-lg">

            AI POWERED

          </span>



          <h1 className="
          mt-8
          text-[72px]
          font-bold
          leading-[85px]
          text-[#0F172A]
          ">

            Building Damage

            <br />

            Assessment

            <span className="text-[#216474]">

              {" "}System

            </span>

          </h1>


          <p className="
          mt-8
          text-[28px]
          leading-[50px]
          text-gray-500
          max-w-[650px]
          ">

            AI-powered system for analyzing satellite and drone images to assess building damage and estimate affected population.

          </p>



          {/* Features */}

          <div className="mt-10 space-y-7">

            <div className="flex items-center gap-5">

              <Clock3
              size={30}
              className="text-[#216474]"
              />

              <span className="text-2xl font-medium">

                Accurate Damage Detection

              </span>

            </div>



            <div className="flex items-center gap-5">

              <Users
              size={30}
              className="text-[#216474]"
              />

              <span className="text-2xl font-medium">

                Population Estimation

              </span>

            </div>



            <div className="flex items-center gap-5">

              <BarChart3
              size={30}
              className="text-[#216474]"
              />

              <span className="text-2xl font-medium">

                Detailed Analytics

              </span>

            </div>


          </div>



          {/* Button */}

          <button 
          onClick={() => navigate("/analyze")}
          className="
          mt-14

          w-[300px]

          h-[80px]

          bg-[#216474]

          text-white

          rounded-3xl

          text-2xl

          font-medium

          flex

          items-center

          justify-center

          gap-5

          shadow-xl

          hover:scale-105

          transition

          ">

            Start Analysis

            <ArrowRight size={28} />

          </button>


        </div>



        {/* Right */}

        <div className="relative w-[58%] h-full">


          <img

          src={damage}

          alt=""

          className="
          w-full
          h-full
          object-cover
          "
          />



          {/* White Gradient */}

          <div className="
          absolute
          left-0
          top-0

          h-full

          w-[320px]

          bg-gradient-to-r

          from-[#F8FAFC]

          via-[#F8FAFC]/70

          to-transparent
          " />



          {/* Bottom Card */}

          <div className="
          absolute
ml-20
          bottom-10

          left-1/2

          -translate-x-1/2

          bg-white

          rounded-[30px]

          shadow-2xl

          px-9

          py-7

          flex

          gap-16
           w-180

          ">



            <div className="flex gap-4">

              <Clock3
              size={30}
              className="text-[#216474]"
              />

              <div>

                <h3 className="font-semibold text-xl">

                  High Accuracy

                </h3>

                <p className="text-gray-500">

                  AI Model

                </p>

              </div>

            </div>





            <div className="flex gap-4">

              <Users
              size={30}
              className="text-[#216474]"
              />

              <div>

                <h3 className="font-semibold text-xl">

                  Multiple Sources

                </h3>

                <p className="text-gray-500">

                  Satellite & Drone

                </p>

              </div>

            </div>





            <div className="flex gap-4">

              <Clock3
              size={30}
              className="text-[#216474]"
              />

              <div>

                <h3 className="font-semibold text-xl">

                  Real-time

                </h3>

                <p className="text-gray-500">

                  Analysis

                </p>

              </div>

            </div>



          </div>

        </div>


      </section>


    </div>
  );
}