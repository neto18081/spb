/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import Banner from "../components/Banner";
import Header from "../components/Header";

import api from "../utils/api";

import Link from "next/link";
import { Categorias } from "../components/Arquivos";

// export async function getStaticProps() {
//   const res = await api.get("products");
//   return {
//     props: {
//       produtos: res.data.data,
//     },
//   };
// }

export default function Home({ produtos }) {
  const [banner, setBanner] = useState({
    title: "black",
  });

  return (
    <>
      <Head>
        <title>Início | Sistema para Boutique</title>
      </Head>
      <div>Teste123</div>

      {/* <Header data={{ banner, setBanner }} />
      <Banner banner={banner} />

      <div className="tw-mt-16 tw-w-4/5 tw-mx-auto tw-py-[100px]">
        <div className="tw-grid tw-grid-cols-3 tw-gap-10">
          {produtos.map((p) => (
            <Link key={p.id} href={`/produtos/${p.slug}`}>
              <a className="tw-flex tw-flex-col tw-shadow-2xl tw-p-2 tw-justify-start tw-text-left hover:tw-bg-gold">
                <img
                  src={p.galeria[0]}
                  alt="UIUI"
                  className="tw-mb-4 tw-w-full tw-h-[330px] tw-object-cover"
                />
                <span
                  style={{
                    background: Categorias.find((c) => c.slug == p.categorias)
                      .cor,
                  }}
                  className="tw-flex tw-items-center tw-justify-center tw-max-w-[125px] tw-rounded-[50px] tw-text-white tw-font-bold"
                >
                  {p.categorias.toUpperCase()}
                </span>
                <span className="tw-text-xl tw-font-medium">{p.titulo}</span>
                <p className="tw-text-[16px]">{p.descricao}</p>
                <span className="tw-font-bold tw-text-xl ">
                  R$ {p.preco},00
                </span>
              </a>
            </Link>
          ))}
        </div>
      </div> */}
    </>
  );
}
