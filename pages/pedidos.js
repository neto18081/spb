/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import Header from "../components/Header";
import { useState } from "react";
import Head from "next/head";

import { DataProducts } from "../components/Arquivos";

import jsCookie from "js-cookie";
import api from "../utils/api";

export default function Pedidos() {
  const [banner, setBanner] = useState({
    title: "black",
  });
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const user = JSON.parse(jsCookie.get("userInfo"));
    api
      .get(`users?email=${user.email}`)
      .then((res) => {
        const p = res.data.users.pedidos;
        setPedidos(p);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Header data={{ banner, setBanner }} />
      <Head>
        <title>Pedidos | Sistema para Boutique</title>
      </Head>
      <div className="tw-w-screen tw-h-min tw-flex tw-flex-col tw-pt-[200px] tw-pb-10 ">
        <span
          className={`tw-absolute tw-top-[80px] tw-left-[20px] sm:tw-left-[110px] tw-leading-[110%] tw-text-[22px] tw-font-bold ${
            banner.title == "white" ? "tw-text-white" : "tw-text-black"
          }`}
        >
          Sistema <br /> para Ecommerce
        </span>
        <h2 className="tw-mx-auto tw-w-min tw-flex tw-flex-start tw-text-6xl tw-mb-20 tw-font-bold">
          Pedidos
        </h2>

        <div className="tw-border-3 tw-p-8 tw-ml-36">
          {pedidos.map((p, i) => {
            return (
              <div key={i}>
                <h3 className="tw-font-bold tw-text-3xl tw-mb-1">
                  Pedido número #{i + 1}
                </h3>
                <span className="tw-text-gray-500 tw-ml-4">{p.date}</span>
                <div className="tw-mt-10 tw-ml-28 tw-grid tw-grid-cols-4">
                  <span className="tw-text-md">Imagem</span>
                  <span className="tw-text-md">Produto</span>
                  <span className="tw-text-md">Quantidade</span>
                  <span className="tw-text-md">Preço</span>
                </div>
                {p.itens.map((obj, j) => {
                  const item = DataProducts.find((k) => k.id == obj.id);
                  return (
                    <div
                      key={obj.id}
                      className="tw-my-10 tw-grid tw-grid-cols-4 tw-gap-10 tw-items-center tw-w-[90%] tw-border-2 tw-h-max tw-shadow-xl tw-rounded-2xl tw-py-8"
                    >
                      <img
                        src={item.galeria[0]}
                        alt=""
                        className="tw-w-20 tw-mx-auto"
                      />
                      <span className="tw-font-bold tw-text-center tw-text-xl">
                        {item.titulo}
                      </span>
                      <span className=" tw-text-center tw-font-bold tw-text-xl">
                        {obj.quantidade}
                      </span>
                      <span className="tw-font-bold tw-text-center tw-text-xl ">
                        R$ {item.preco},00
                      </span>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
