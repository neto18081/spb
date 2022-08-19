/* eslint-disable @next/next/no-img-element */
import React, { useContext, useEffect } from "react";
import Header from "../components/Header";
import { useState } from "react";
import Head from "next/head";
import Link from "next/link";

import Loading from "../components/Loading";

import { FiLogOut } from "react-icons/fi";
import api from "../utils/api";

import jsCookie from "js-cookie";
import { Manager } from "../utils/manager";

export default function Pedidos({ produtos }) {
  const [banner, setBanner] = useState({
    title: "black",
  });
  const [user, setUser] = useState();
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);

  const { state, dispatch } = useContext(Manager);

  useEffect(() => {
    if (state.userInfo) {
      const user = JSON.parse(jsCookie.get("userInfo"));
      api
        .get(`users?email=${user.email}`)
        .then((res) => {
          const p = res.data.users.pedidos;
          setPedidos(p);
          setUser(res.data.users);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    } else {
      setTimeout(() => setLoading(false), 2000);
    }
  }, []);

  function userLogout() {
    dispatch({ type: "USER_LOGOUT" });
    location.assign("/");
  }

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

        {loading ? (
          <Loading />
        ) : user == undefined ? (
          <div className="tw-w-full tw-text-center">
            <span>
              Você não está logado. Faça{" "}
              <Link href="/login">
                <a className="tw-text-[#0693db]">login</a>
              </Link>{" "}
              para visualizar seus pedidos.
            </span>
          </div>
        ) : (
          <>
            <div className="tw-ml-[144px] tw-flex tw-items-start tw-justify-center tw-flex-col tw-pb-[100px]">
              <h2 className="tw-text-6xl tw-mb-[20px] tw-font-bold">Perfil</h2>

              <div className="tw-px-[32px] tw-flex tw-items-center tw-justify-start tw-gap-[100px] tw-w-full">
                <div className=" tw-flex tw-flex-col">
                  <span className="tw-text-[28px] tw-font-medium">
                    {user.nome}
                  </span>
                  <small className="tw-text-[18px] tw-text-[#525252]">
                    {user.email}
                  </small>
                </div>

                <button onClick={userLogout}>
                  <FiLogOut size={50} />
                </button>
              </div>
            </div>

            <div className="tw-ml-[144px] tw-flex tw-items-start tw-justify-center tw-flex-col tw-pb-[100px]">
              <h2 className="tw-text-6xl tw-mb-[20px] tw-font-bold">Pedidos</h2>

              <div className="tw-border-3 tw-p-8">
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
                        const item = produtos.find((k) => k.id == obj.id);
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
        )}
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
