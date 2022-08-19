import React, { useState, useContext, useEffect } from "react";
import { IoMdCart } from "react-icons/io";
import Link from "next/link";

import { Categorias } from "./Arquivos";
import { Manager } from "../utils/manager";

export default function Header({ data }) {
  const { state, dispatch } = useContext(Manager);

  const [burger, setBurger] = useState(false);
  const [cart, setCart] = useState(0);
  const [user, setUser] = useState("");
  const { banner, setBanner } = data;

  function toggleNavbar() {
    if (!burger) setBanner({ ...banner, title: "white" });
    else setBanner({ ...banner, title: "black" });
    setBurger(!burger);
  }
  useEffect(() => {
    state.cart.cartItems.length >= 0 && setCart(state.cart.cartItems.length);
  }, [state.cart.cartItems]);

  useEffect(() => {
    setUser(state.userInfo);
  }, []);

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
          <Link href="/carrinho">
            <a className="nav-link tw-relative tw-block tw-p-0">
              <IoMdCart size={60} color="#35363A" />
              <div className="tw-bg-[#cc0000] tw-h-[25px] tw-w-[25px] tw-rounded-[50px] tw-absolute tw-right-[-5px] tw-top-[-5px] tw-flex tw-items-center tw-justify-center tw-text-white tw-font-bold tw-text-[12px]">
                {cart}
              </div>
            </a>
          </Link>
        </div>
      </div>
      <div
        className={`${
          burger ? "tw-translate-x-0" : "tw-translate-x-[-100%]"
        } tw-fixed tw-top-0 tw-left-0 sm:tw-left-[100px] tw-w-screen sm:tw-w-[350px] tw-bg-green tw-h-screen tw-flex tw-items-center tw-justify-end tw-flex-col tw-py-[50px] tw-ease-out tw-duration-200`}
      >
        <div className="tw-flex tw-items-start tw-justify-center tw-flex-col tw-w-full">
          <Link href="/">
            <a className="nav-link hover:tw-text-black hover:tw-font-bold">
              Início
            </a>
          </Link>
          {Categorias.map((c, i) => {
            return (
              <Link key={i} href={`/categoria/${c.slug}`}>
                <a className="nav-link hover:tw-text-black hover:tw-font-bold">
                  {c.name}
                </a>
              </Link>
            );
          })}
        </div>

        <div className="tw-flex tw-items-start tw-justify-center tw-flex-col tw-w-full tw-pt-[100px]">
          <Link href={user ? "/pedidos" : "/login"}>
            <a className="nav-link tw-bg-gold hover:tw-text-black hover:tw-font-bold">
              {user ? user.nome : "Login"}
            </a>
          </Link>
          {/* <Link href="/pedidos">
            <a className="nav-link tw-bg-black">pedidos</a>
          </Link> */}
          <Link href="/equipe">
            <a className="nav-link tw-bg-black hover:tw-text-gold">
              Nossa equipe
            </a>
          </Link>
        </div>
      </div>
    </>
  );
}
