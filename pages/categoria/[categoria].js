/* eslint-disable @next/next/no-img-element */
import React from "react";
import Header from "../../components/Header";
import Link from "next/link";
import { useState } from "react";
import Footer from "../../components/Footer";
import { DataProducts, Categorias } from "../../components/Arquivos";

export default function Categoria({ cat }) {
  const [banner, setBanner] = useState({
    title: "black",
  });
  let categoriaExiste = false;
  for (let c of Categorias) {
    if (c.slug == cat.categoria) {
      categoriaExiste = true;
    }
  }
  if (!categoriaExiste) return <h1>Categoria não existe!</h1>;

  const produtos = [];
  DataProducts.forEach((data) => {
    if (data.categorias == cat.categoria) {
      produtos.push(data);
    }
  });
  console.log(produtos);
  return (
    <>
      <Header data={{ banner, setBanner }} />
      <div className="tw-w-screen tw-h-min tw-flex tw-flex-col tw-pt-[200px] tw-pb-10">
        <span
          className={`tw-absolute tw-top-[80px] tw-left-[20px] sm:tw-left-[110px] tw-leading-[110%] tw-text-[22px] tw-font-bold ${
            banner.title == "white" ? "tw-text-white" : "tw-text-black"
          }`}
        >
          Sistema <br /> para Ecommerce
        </span>
        <h2 className="tw-mx-auto tw-w-min tw-flex tw-flex-start tw-text-9xl">
          {cat.categoria}
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
                  <span className="tw-font-bold tw-text-xl ">{p.preco}</span>
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
  return {
    cat: query,
  };
};
