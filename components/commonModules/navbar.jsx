"use client"
import React from "react";
import "../../style/navbar.css";
import Link from "next/link";

function Navbar() {
  return (
    <div className="sticky flex items-center justify-center top-0 bg-gray-200 text-gray-600 w-full z-[5] max-w-[100vw]">
      <nav>
        <ul className="flex flex-row max-w-[100vw] justify-around">
          <li className="text-sm font-semibold text-center my-5 mx-2 nav-item">
            <Link className="nav-link relative" href={""}>
              Appointment Area
            </Link>
          </li>
          <li className="text-sm  font-semibold text-center my-5 mx-2 nav-item">
            <Link className="nav-link relative" href={"/dashboard"}>
              Dashboard
            </Link>
          </li>
          <li className="text-sm  font-semibold text-center my-5 mx-2 nav-item">
            <Link className="nav-link relative" href={"/myAppointments"}>
              My Appointments
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
