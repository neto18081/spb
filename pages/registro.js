import React from "react";
import Header from "../components/Header";
import { useState } from "react";
import Link from "next/link";
import Head from "next/head";

import { ToastContainer, toast } from "react-toastify";

import api from "../utils/api";

export default function Login() {
  const [banner, setBanner] = useState({
    title: "black",
  });

  const [form, setForm] = useState({
    nome: "",
    email: "",
    error: "",
  });

  async function createAccount(e) {
    e.preventDefault();
    if (form.nome == "" || form.email == "")
      setForm({ ...form, error: "Preencha todos os campos!" });
    else if (!(await api.get(`users?email=${form.email}`)).data.users) {
      toast
        .promise(
          api.post("/users", {
            nome: form.nome,
            email: form.email,
            pedidos: [],
          }),
          {
            error: "Algo de errado aconteceu!",
            success: "Usuário criado com sucesso!",
          },
          { position: "bottom-right" }
        )
        .then((res) => {
          setForm({ ...form, nome: "", email: "" });
        })
        .catch((err) => {
          console.log(err);
        });
    } else setForm({ ...form, error: "Usuário já cadastrado!" });
  }

  return (
    <>
      <Head>
        <title>Registro | Sistema para Boutique</title>
      </Head>
      <ToastContainer />
      <Header data={{ banner, setBanner }} />
      <div className="tw-w-screen tw-h-min tw-flex tw-flex-col tw-pt-[200px] tw-pb-10">
        <span
          className={`tw-absolute tw-top-[80px] tw-left-[20px] sm:tw-left-[110px] tw-leading-[110%] tw-text-[22px] tw-font-bold ${
            banner.title == "white" ? "tw-text-white" : "tw-text-black"
          }`}
        >
          Sistema <br /> para Ecommerce
        </span>
        <h2 className="tw-mx-auto tw-w-min tw-flex tw-flex-start tw-text-6xl tw-mb-8 tw-font-bold ">
          Cadastro
        </h2>

        <form
          onSubmit={(e) => createAccount(e)}
          className="tw-flex tw-justify-center tw-items-center tw-flex-col tw-w-3/5 tw-mx-auto tw-p-5 tw-rounded-2xl tw-shadow-2xl tw-mb-10"
        >
          <label className="tw-text-sm tw-font-bold tw-text-xl">Nome</label>
          <input
            type="text"
            placeholder="Seu nome.."
            id="nome"
            className={`tw-rounded-xl tw-px-6 tw-py-2 tw-border-2 tw-w-3/5 ${
              form.error && "tw-border-[#cc0000]"
            } hover:tw-border-black tw-mt-4 tw-mb-4`}
            autoComplete="off"
            value={form.nome}
            onChange={(e) =>
              setForm({ ...form, nome: e.target.value, error: "" })
            }
          />
          <label className="tw-text-sm tw-font-bold tw-text-xl">Email</label>
          <input
            type="email"
            placeholder="Seu melhor email.."
            id="email"
            className={`tw-rounded-xl tw-px-6 tw-py-2 tw-border-2 tw-w-3/5 ${
              form.error && "tw-border-[#cc0000]"
            } hover:tw-border-black tw-mt-4 tw-mb-8`}
            autoComplete="off"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value, error: "" })
            }
          />
          <span className="tw-text-[#cc0000] tw-py-[10px]">{form.error}</span>
          <input
            type="submit"
            name="enviar"
            id="enviar"
            value="Cadastrar"
            className="tw-border-2 tw-py-2 tw-rounded-2xl tw-bg-gold tw-text-white tw-font-bold tw-w-1/2 tw-cursor-pointer hover:tw-text-black"
          />

          <h3 className="tw-mx-auto tw-mt-8">Já possui cadastro?</h3>
          <Link href="/login">
            <a className="tw-mx-auto tw-text-md tw-font-bold hover:tw-underline hover:underline-offset-1">
              Faça login
            </a>
          </Link>
        </form>
      </div>
    </>
  );
}
