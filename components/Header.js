import React, { useState } from "react";
import { IoMdCart } from "react-icons/io";
import Link from "next/link";

export default function Header({ data }) {
  const [burger, setBurger] = useState(false);
  const { banner, setBanner } = data;
  function toggleNavbar() {
    if (!burger) setBanner({ ...banner, title: "white" });
    else setBanner({ ...banner, title: "black" });
    setBurger(!burger);
  }

  return (
    <>
      <div className="tw-w-screen sm:tw-w-[100px] tw-flex tw-items-center tw-justify-end sm:tw-justify-start sm:tw-flex-col sm:tw-py-[20px] tw-border-b-2 sm:tw-border-r-2 tw-border-green tw-h-[70px] sm:tw-h-screen tw-fixed tw-top-0 tw-left-0 tw-gap-[20px] tw-z-10 tw-bg-white tw-px-[20px] sm:tw-px-0">
        <div
          onClick={toggleNavbar}
          className={`sm:tw-h-[50px] hover:tw-cursor-pointer`}
        >
          <div className={`${burger ? "b1" : ""} burger`}></div>
          <div className={`${burger ? "b2" : ""} burger`}></div>
          <div className={`${burger ? "b3" : ""} burger`}></div>
        </div>
        <div className="hover:tw-cursor-pointer">
          <IoMdCart size={60} color="#35363A" />
        </div>
      </div>
      <div
        className={`${
          burger ? "tw-translate-x-0" : "tw-translate-x-[-100%]"
        } tw-fixed tw-top-0 tw-left-0 sm:tw-left-[100px] tw-w-screen sm:tw-w-[350px] tw-bg-green tw-h-screen tw-flex tw-items-center tw-justify-end tw-flex-col tw-py-[50px] tw-ease-out tw-duration-200`}
      >
        <div className="tw-flex tw-items-start tw-justify-center tw-flex-col tw-w-full">
          <Link href="">
            <a className="nav-link">Início</a>
          </Link>
          <Link href="">
            <a className="nav-link">Categoria 1</a>
          </Link>
          <Link href="">
            <a className="nav-link">Categoria 1</a>
          </Link>
          <Link href="">
            <a className="nav-link">Categoria 1</a>
          </Link>
          <Link href="">
            <a className="nav-link">Categoria 1</a>
          </Link>
          <Link href="">
            <a className="nav-link">Categoria 1</a>
          </Link>
          <Link href="">
            <a className="nav-link">Categoria 1</a>
          </Link>
        </div>

        <div className="tw-flex tw-items-start tw-justify-center tw-flex-col tw-w-full tw-pt-[100px]">
          <Link href="">
            <a className="nav-link tw-bg-gold">Login</a>
          </Link>
          <Link href="">
            <a className="nav-link tw-bg-black">Registrar</a>
          </Link>
        </div>
      </div>
    </>
  );
}
