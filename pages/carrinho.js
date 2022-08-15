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
                <h2 className='tw-mx-auto tw-w-min tw-flex tw-flex-start tw-text-6xl tw-mb-20 tw-font-bold'>Carrinho</h2>
                <div className="tw-w-[90%]">
                    <div className=" tw-mb-10 tw-ml-36 tw-flex tw-items-center tw-w-[90%] tw-justify-around tw-border-2 tw-h-36 tw-shadow-xl tw-rounded-2xl">
                        <img src="https://github.com/marlonberaldo.png" alt="" className="tw-w-20" />
                        <span className="tw-font-bold">MauroCMP, usuario de skate</span>
                        <select name="seletor" id="seletor" className="tw-rounded-xl tw-p-2">
                            <option value="seletor">1</option>
                            <option value="seletor">2</option>
                            <option value="seletor">3</option>
                        </select>
                        <span className="tw-font-bold">R$200,00</span>
                        <button ><FaTrash size={30} className='hover:tw-text-red-600' /></button>
                    </div>
                    <div className="tw-w-[90%] tw-ml-36 tw-flex tw-justify-end">
                        <button className="tw-py-4 tw-px-20 tw-bg-green tw-w-max tw-ml-auto tw-rounded-xl tw-font-bold tw-text-white tw-mt-10 hover:tw-text-black">Finalizar compra</button>
                    </div>
                </div>
            </div>

        </>
    )
}