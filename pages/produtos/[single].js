/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useContext, useEffect } from "react";
import Head from "next/head";
import Header from "../../components/Header";
import { useState } from "react";
import { Manager } from "../../utils/manager";
import jsCookie from "js-cookie";
import { ToastContainer, toast } from "react-toastify";

import api from "../../utils/api";

import { AiOutlineStar, AiFillStar } from "react-icons/ai";

export default function Single({ produto }) {
  const [banner, setBanner] = useState({
    title: "black",
  });

  const [image, setImage] = useState(produto.galeria[0]);
  const [size, setSize] = useState(produto.tamanho[0]);
  const [color, setColor] = useState(produto.cor[0]);
  const [quantity, setQuantity] = useState(1);
  const [user, setUser] = useState();

  const { state, dispatch } = useContext(Manager);
  const [form, setForm] = useState({
    error: false,
    avaliacao: 1,
    mensagem: "",
  });

  useEffect(() => {
    setUser(state.userInfo);
  }, []);

  function addToCart() {
    const data = {
      id: produto.id,
      tamanho: size,
      cor: color,
      quantidade: quantity,
    };
    dispatch({ type: "CART_ADD_ITEM", payload: data });
    toast.info("Produto adicionado ao carrinho!", { position: "bottom-right" });
  }

  async function avaliar() {
    if (form.mensagem == "") setForm({ ...form, error: true });
    else {
      let avaliacao;
      // const avaliacoes = (await api.get(`products?id=${produto.id}`)).data.data
      const avaliacoes = produto.avaliacoes;
      if (avaliacoes == undefined) {
        avaliacao = {
          id: produto.id,
          avaliacao: [
            {
              nota: form.avaliacao,
              mensagem: form.mensagem,
              autor: state.userInfo.nome,
              date: new Date().toLocaleDateString("pt-BR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }),
            },
          ],
        };
      } else {
        avaliacoes.push({
          nota: form.avaliacao,
          mensagem: form.mensagem,
          autor: state.userInfo.nome,
          date: new Date().toLocaleDateString("pt-BR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        });

        avaliacao = {
          id: produto.id,
          avaliacao: avaliacoes,
        };
      }

      await api.put("products", avaliacao);
      toast.success("Avaliação enviada com sucesso!", {
        position: "bottom-right",
      });

      setForm({ ...form, mensagem: "" });
    }
  }

  return (
    <>
      <Head>
        <title>{produto.titulo} | Sistema para Boutique</title>
      </Head>
      <ToastContainer />
      <Header data={{ banner, setBanner }} />
      <div className="tw-w-screen tw-h-screen tw-flex tw-flex-col tw-pt-[20px]">
        <span
          className={`tw-ml-28 tw-leading-[110%] tw-text-[22px] tw-font-bold tw-pb-[50px] ${
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
              <span className="tw-font-bold tw-text-5xl">
                R$ {produto.preco},00
              </span>
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

        <div className="tw-ml-28 tw-py-[100px]">
          {user && (
            <div className="tw-pl-[20px] tw-flex tw-flex-col tw-items-start">
              <h3 className="tw-text-[26px] tw-pb-[30px]">
                Faça sua avaliação
              </h3>
              <div className="tw-flex tw-items-center tw-justify-start">
                <span className="tw-text-[20px] tw-pr-[20px]">Nota: </span>
                {[0, 0, 0, 0, 0].map((s, i) => {
                  if (i + 1 <= form.avaliacao)
                    return (
                      <button
                        key={i}
                        onClick={() => setForm({ ...form, avaliacao: i + 1 })}
                      >
                        <AiFillStar color="#c0965c" size={30} />
                      </button>
                    );
                  else
                    return (
                      <button
                        key={i}
                        onClick={() => setForm({ ...form, avaliacao: i + 1 })}
                      >
                        <AiOutlineStar size={30} color="#c0965c" />
                      </button>
                    );
                })}
              </div>
              <textarea
                className={`tw-rounded-xl tw-px-6 tw-py-2 tw-border-2 tw-w-[1200px] ${
                  form.error && "tw-border-[#cc0000]"
                } hover:tw-border-black tw-mt-4 tw-mb-[10px]`}
                placeholder="Escreva uma avaliação"
                rows={4}
                value={form.mensagem}
                onChange={(e) =>
                  setForm({ ...form, mensagem: e.target.value, error: false })
                }
              />
              {form.error && (
                <span className="tw-text-[#cc0000] tw-py-[10px]">
                  Você deve escrever uma avaliação!
                </span>
              )}
              <button
                onClick={() => avaliar()}
                className="tw-p-4 tw-border-none tw-px-[50px] tw-rounded-xl tw-bg-gold tw-text-white tw-font-bold hover:tw-bg-green tw-mt-[10px]"
              >
                ENVIAR
              </button>
            </div>
          )}

          <h2 className="tw-flex tw-flex-start tw-text-6xl tw-h-max tw-my-[30px]">
            Avaliações
          </h2>
          {produto.avaliacoes == undefined ? (
            <span>Nenhuma avaliação ainda :{"("}</span>
          ) : (
            produto.avaliacoes.map((p, i) => (
              <div
                key={i}
                className="tw-my-10 tw-items-center tw-border-2 tw-shadow-xl tw-rounded-2xl tw-py-[15px] tw-px-[30px] tw-w-[90%]"
              >
                <h4 className="tw-text-[26px]">
                  {p.autor == undefined ? `Anônimo #${i + 1}` : p.autor}
                </h4>
                <div className="tw-py-[10px]">
                  {[0, 0, 0, 0, 0].map((s, i) => {
                    if (i + 1 <= p.nota)
                      return (
                        <button key={i}>
                          <AiFillStar color="#c0965c" size={25} />
                        </button>
                      );
                    else
                      return (
                        <button key={i}>
                          <AiOutlineStar size={25} color="#c0965c" />
                        </button>
                      );
                  })}
                </div>
                <p className="tw-px-[10px]">{p.mensagem}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

Single.getInitialProps = async ({ query }) => {
  const res = await api.get(`products?slug=${query.single}`);
  return {
    produto: res.data.data,
  };
};
