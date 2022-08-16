/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useContext, useEffect } from "react";
import Head from "next/head";
import Header from "../../components/Header";
import { useState } from "react";
import { DataProducts } from "../../components/Arquivos";
import { Manager } from "../../utils/manager";
import jsCookie from "js-cookie";

export default function Single({ single }) {
  const [banner, setBanner] = useState({
    title: "black",
  });

  const produto = DataProducts.find((ui) => ui.slug == single);

  const [image, setImage] = useState(produto.galeria[0]);
  const [size, setSize] = useState(produto.tamanho[0]);
  const [color, setColor] = useState(produto.cor[0]);
  const [quantity, setQuantity] = useState(1);

  const { state, dispatch } = useContext(Manager);

  function addToCart() {
    const data = {
      id: produto.id,
      tamanho: size,
      cor: color,
      quantidade: quantity,
    };
    dispatch({ type: "CART_ADD_ITEM", payload: data });
  }
  //   useEffect(() => {
  //     console.log(JSON.parse(jsCookie.get("cartItems")));
  //   }, []);

  //   const { state, dispatch } = useContext(Store);
  // dispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity } });
  return (
    <>
      <Head>
        <title>{produto.titulo} | Sistema para Boutique</title>
      </Head>
      <Header data={{ banner, setBanner }} />
      <div className="tw-w-screen tw-h-screen tw-flex tw-flex-col tw-pt-[200px]">
        <span
          className={`tw-absolute tw-top-[80px] tw-left-[20px] sm:tw-left-[110px] tw-leading-[110%] tw-text-[22px] tw-font-bold ${
            banner.title == "white" ? "tw-text-white" : "tw-text-black"
          }`}
        >
          Sistema <br /> para Boutique
        </span>

        <div className="tw-flex tw-ml-28 tw-justify-around">
          {/* esquerda */}
          <div className="tw-flex tw-flex-col tw-w-1/2 tw-text-left">
            <h2 className="tw-flex tw-flex-start tw-text-6xl tw-h-max tw-mb-10">
              {produto.titulo}
            </h2>
            <p className="tw-w-2/3 tw-text-xl tw-mb-10">{produto.descricao}</p>
            <div className="tw-flex tw-items-center tw-justify-start tw-gap-[50px]">
              <span className="tw-font-bold tw-text-5xl">{produto.preco}</span>
              <select
                name="estoque"
                id="estoque"
                className="tw-outline-0 tw-h-[35px] tw-px-[10px] tw-font-bold tw-text-[22px]"
                onChange={(e) => setQuantity(parseInt(e.target.value))}
              >
                {Array.from({ length: produto.estoque }, (v, i) => i).map(
                  (v, i) => (
                    <option key={i} value={i + 1}>
                      {i + 1}
                    </option>
                  )
                )}
              </select>
            </div>

            <span className="tw-mt-10 tw-mb-6">Cor:</span>
            <div className="tw-flex">
              {produto.cor.map((c, i) => (
                <button
                  key={i}
                  style={{
                    background: c,
                    borderWidth: c == color ? "7px" : "2px",
                  }}
                  className={`tw-border-white tw-rounded-full tw-mr-2 hover:tw-outline-gold tw-w-[35px] tw-h-[35px] tw-outline tw-outline-black tw-outline-2`}
                  onClick={() => setColor(c)}
                  value={c}
                ></button>
              ))}
            </div>
            <span className="tw-mt-10 tw-mb-6">Tamanho:</span>
            <ul className="tw-flex">
              {produto.tamanho.map((t, i) => (
                <button
                  key={i}
                  className={`tw-h-[50px] tw-w-[50px] tw-border-2 tw-border-black tw-rounded-md tw-mr-2 tw-font-bold tw-flex tw-items-center tw-justify-center
                  ${
                    t == size
                      ? "tw-bg-black tw-text-white"
                      : "hover:tw-bg-black hover:tw-text-white"
                  }
                  `}
                  onClick={() => setSize(t)}
                >
                  {t.toUpperCase()}
                </button>
              ))}
            </ul>

            <button
              className="tw-p-4 tw-border-none tw-w-2/5 tw-rounded-xl tw-bg-gold tw-text-white tw-font-bold hover:tw-bg-green tw-mt-10"
              onClick={() => addToCart()}
            >
              Adicionar ao carrinho
            </button>
          </div>

          {/* direita */}
          <div className="tw-flex tw-items-center tw-justify-center tw-h-min">
            <div className="tw-flex tw-justify-center tw-flex-col tw-max-h-[500px] tw-w-[150px] tw-overflow-y-scroll tw-mr-[20px]">
              {produto.galeria.map((img, i) => (
                <img
                  onClick={(e) => setImage(e.target.src)}
                  key={i}
                  src={img}
                  className="tw-w-[75px] tw-my-2 tw-mx-auto tw-rounded-xl hover:tw-bg-gold tw-shadow-2xl tw-flex hover:tw-cursor-pointer"
                />
              ))}
            </div>
            <img
              src={image}
              className="tw-w-[500px] tw-h-[500px] tw-object-contain tw-p-2 tw-rounded-xl hover:tw-bg-gold tw-shadow-2xl tw-mr-12"
            />
          </div>
        </div>
      </div>
    </>
  );
}

Single.getInitialProps = async ({ query }) => {
  return {
    single: query.single,
  };
};
