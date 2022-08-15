import React from "react";
import Header from "../components/Header";
import { useState } from "react";
import { FaTrash } from 'react-icons/fa'
import { DataProducts } from "../components/Arquivos";

export default function Carrinho() {
    const [banner, setBanner] = useState({
        title: "black",
    })

    return (
        <>
            <Header data={{ banner, setBanner }} />
            <div className="tw-w-screen tw-h-min tw-flex tw-flex-col tw-pt-[200px] tw-pb-10 ">
                <span
                    className={`tw-absolute tw-top-[80px] tw-left-[20px] sm:tw-left-[110px] tw-leading-[110%] tw-text-[22px] tw-font-bold ${banner.title == "white" ? "tw-text-white" : "tw-text-black"
                        }`}
                >
                    Sistema <br /> para Ecommerce
                </span>
                <h2 className='tw-mx-auto tw-w-min tw-flex tw-flex-start tw-text-6xl tw-mb-20 tw-font-bold'>Pedidos</h2>
                <div className="tw-border-3 tw-p-8 tw-ml-36">
                    <h3 className="tw-font-bold tw-text-3xl tw-mb-1">Pedido número #15784</h3>
                    <span className="tw-text-gray-500 tw-ml-4">Dia 28 de junho de 2022</span>
                    <div className="tw-mt-10 tw-ml-28 tw-grid tw-grid-cols-4">
                        <span className="tw-text-md">Produto</span>
                        <span className="tw-text-md"></span>
                        <span className="tw-text-md">Quantidade</span>
                        <span className="tw-text-md">Preço</span>
                    </div>
                    <div className="tw-my-10 tw-grid tw-grid-cols-4 tw-gap-10 tw-items-center tw-w-[90%] tw-border-2 tw-h-max tw-shadow-xl tw-py-8">
                        <img src="https://github.com/marlonberaldo.png" alt="" className="tw-w-20 tw-mx-auto" />
                        <span className="tw-font-bold tw-text-center tw-text-xl">MauroCMP, usuario de skate</span>
                        <span className=" tw-text-center tw-font-bold tw-text-xl">1</span>
                        <span className="tw-font-bold tw-text-center tw-text-xl ">R$200,00</span>
                    </div>
                </div>
            </div>

        </>
    )
}