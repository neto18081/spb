import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import Banner from "../components/Banner";
import Header from "../components/Header";

export default function Home() {
  const [banner, setBanner] = useState({
    title: "black",
  });
  return (
    <>
      <Head>
        <title>Início | SPE</title>
      </Head>

      <Header data={{ banner, setBanner }} />
      <Banner banner={banner} />
    </>
  );
}
