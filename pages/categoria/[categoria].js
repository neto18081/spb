/* eslint-disable @next/next/no-img-element */
import React from "react";
import Header from "../../components/Header";
import Link from "next/link";
import Head from "next/head";
import { useState } from "react";
import { Categorias } from "../../components/Arquivos";
import api from "../../utils/api";

export default function Categoria({ cat, products }) {
  const [banner, setBanner] = useState({
    title: "black",
  });
  let categoriaExiste = false;
  for (let c of Categorias) {
    if (c.slug == cat.categoria) {
      categoriaExiste = true;
    }
  }
  if (!products) return <div></div>;
  if (!categoriaExiste) return <h1>Categoria não existe!</h1>;

  const produtos = [];
  products.forEach((data) => {
    if (data.categorias == cat.categoria) {
      produtos.push(data);
    }
  });
  const categoryName = Categorias.find((c) => c.slug == cat.categoria).name;
  return (
    <>
      <Header data={{ banner, setBanner }} />
      <Head>
        <title>{categoryName} | Sistema para Boutique</title>
      </Head>
      <div className="tw-w-screen tw-h-min tw-flex tw-flex-col tw-pt-[200px] tw-pb-10">
        <span
          className={`tw-absolute tw-top-[80px] tw-left-[20px] sm:tw-left-[110px] tw-leading-[110%] tw-text-[22px] tw-font-bold ${
            banner.title == "white" ? "tw-text-white" : "tw-text-black"
          }`}
        >
          Sistema <br /> para Ecommerce
        </span>
        <h2 className="tw-mx-auto tw-w-min tw-flex tw-flex-start tw-text-9xl">
          {categoryName}
        </h2>
        <div className="tw-mt-16 tw-w-4/5 tw-mx-auto">
          <div className="tw-grid tw-grid-cols-3 tw-gap-10">
            {produtos.map((p) => (
              <Link key={p.id} href={`/produtos/${p.slug}`}>
                <a className="tw-flex tw-flex-col tw-shadow-2xl tw-p-2 tw-justify-center tw-text-left hover:tw-bg-gold">
                  <img
                    src={p.galeria[0]}
                    alt="UIUI"
                    className="tw-mb-4 tw-w-full"
                  />
                  <span className="tw-text-xl tw-font-medium">{p.titulo}</span>
                  <p className="tw-text-[16px]">{p.descricao}</p>
                  <span className="tw-font-bold tw-text-xl ">
                    R$ {p.preco},00
                  </span>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}

Categoria.getInitialProps = async ({ query }) => {
  const res = await api.get("products");
  return {
    cat: query,
    products: res.data.data,
  };
};
