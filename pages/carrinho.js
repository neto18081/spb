/* eslint-disable @next/next/no-img-element */
import React, { useContext } from "react";
import Header from "../components/Header";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";

import { Manager } from "../utils/manager";
import Link from "next/link";
import Head from "next/head";

import jsCookie from "js-cookie";
import api from "../utils/api";

import { toast, ToastContainer } from "react-toastify";

export default function Carrinho({ produtos }) {
  const { state, dispatch } = useContext(Manager);

  const [banner, setBanner] = useState({
    title: "black",
  });

  function removeItem(item) {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
  }

  async function finishPurchase() {
    if (!state.userInfo) {
      location.assign("/login");
    } else {
      const cartItems = state.cart.cartItems;

      const user = JSON.parse(jsCookie.get("userInfo"));
      const pedidos = (await api.get(`users?email=${user.email}`)).data.users
        .pedidos;

      const newOrder = {
        date: new Date().toLocaleDateString("pt-BR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        itens: cartItems,
      };
      pedidos.push(newOrder);

      toast
        .promise(
          api.put("users", {
            email: user.email,
            pedidos: pedidos,
          }),
          {
            success: "Compra realizada com sucesso!",
            error: "Oh não! Ocorreu um erro",
          }
        )
        .then(() => {
          dispatch({ type: "CART_CLEAR" });
        });
    }
  }

  return (
    <>
      <Header data={{ banner, setBanner }} />
      <Head>
        <title>Carrinho | Sistema para Boutique</title>
      </Head>
      <ToastContainer />
      <div className="tw-w-full tw-px-[32px] tw-pl-[144px] tw-h-min tw-flex tw-flex-col tw-pt-[200px] tw-pb-10 ">
        <span
          className={`tw-absolute tw-top-[80px] tw-left-[20px] sm:tw-left-[110px] tw-leading-[110%] tw-text-[22px] tw-font-bold ${
            banner.title == "white" ? "tw-text-white" : "tw-text-black"
          }`}
        >
          Sistema <br /> para Ecommerce
        </span>
        <h2 className="tw-mx-auto tw-w-min tw-flex tw-flex-start tw-text-9xl tw-mb-20 ">
          Carrinho
        </h2>

        <div>
          {state.cart.cartItems.length <= 0 ? (
            <span className="tw-text-center tw-w-full tw-block">
              Nenhum produto adicionado ao carrinho.{" "}
              <Link href="/">
                <a className="tw-text-[#0693db]">Ir para a loja</a>
              </Link>
            </span>
          ) : (
            state.cart.cartItems.map((obj, i) => {
              const item = produtos.find((i, j) => i.id == obj.id);
              return (
                <div className="tw-flex tw-justify-center" key={i}>
                  <div className=" tw-mb-10 tw-flex tw-items-center tw-w-full tw-justify-around tw-border-2 tw-h-36 tw-shadow-xl">
                    <img src={item.galeria[0]} alt="" className="tw-w-20" />
                    <span className="tw-font-bold">{item.titulo}</span>
                    <select
                      name="seletor"
                      id="seletor"
                      className="tw-rounded-xl tw-p-2"
                      value={obj.quantidade}
                    >
                      {Array.from({ length: item.estoque }, (v, j) => j).map(
                        (v, j) => (
                          <option key={j} value={j + 1}>
                            {j + 1}
                          </option>
                        )
                      )}
                    </select>
                    <button
                      key={i}
                      style={{ background: obj.cor }}
                      className={`tw-border-[2px] tw-border-white tw-rounded-full tw-mr-2 hover:tw-outline-gold tw-w-[35px] tw-h-[35px] tw-outline tw-outline-black tw-outline-2`}
                    ></button>
                    <span className="tw-font-bold">R$ {item.preco},00</span>
                    <button onClick={() => removeItem(obj)}>
                      <FaTrash size={30} className="hover:tw-text-red-600" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <div className="tw-w-full tw-flex tw-justify-end">
          <button
            className="tw-py-4 tw-px-20 tw-bg-green tw-w-max tw-ml-auto tw-rounded-xl tw-font-bold tw-text-white tw-mt-10 hover:tw-text-black disabled:tw-opacity-[60%] hover:tw-cursor-pointer"
            disabled={state.cart.cartItems.length > 0 ? false : true}
            onClick={() => finishPurchase()}
          >
            Finalizar compra
          </button>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const res = await api.get("products");

  return {
    props: {
      produtos: res.data.data,
    },
  };
}
