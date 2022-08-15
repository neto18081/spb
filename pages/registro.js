import React from 'react'
import Header from "../components/Header";
import { useState } from 'react';
import Link from 'next/link';

export default function Login() {

    const [banner, setBanner] = useState({
        title: "black",
    })

    return (
        <>
            <Header data={{ banner, setBanner }} />
            <div className="tw-w-screen tw-h-min tw-flex tw-flex-col tw-pt-[200px] tw-pb-10">
                <span
                    className={`tw-absolute tw-top-[80px] tw-left-[20px] sm:tw-left-[110px] tw-leading-[110%] tw-text-[22px] tw-font-bold ${banner.title == "white" ? "tw-text-white" : "tw-text-black"
                        }`}
                >
                    Sistema <br /> para Ecommerce
                </span>
                <h2 className='tw-mx-auto tw-w-min tw-flex tw-flex-start tw-text-8xl tw-mb-16 tw-font-bold '>Cadastro</h2>

                <form className='tw-flex tw-justify-center tw-items-center tw-flex-col tw-w-3/5 tw-mx-auto tw-p-5'>
                    <label class="tw-text-sm tw-font-bold tw-text-xl">Nome</label>
                    <input type="text" placeholder='Seu nome..' id='nome' className='tw-rounded-xl tw-px-6 tw-py-2 tw-border-2 tw-w-3/5 hover:tw-border-black tw-mt-4 tw-mb-4' autocomplete="off" />
                    <label class="tw-text-sm tw-font-bold tw-text-xl">Email</label>
                    <input type="email" placeholder='Seu melhor email..' id='email' className='tw-rounded-xl tw-px-6 tw-py-2 tw-border-2 tw-w-3/5 hover:tw-border-black tw-mt-4 tw-mb-8' autocomplete="off" />
                    <input type="submit" name="enviar" id="enviar" value="Cadastrar" className='tw-border-2 tw-py-2 tw-rounded-2xl tw-bg-gold tw-text-white tw-font-bold tw-w-1/2 tw-cursor-pointer hover:tw-text-black' />

                    <h3 className='tw-mx-auto tw-mt-8'>Já possui cadastro?</h3>
                    <Link href="/login">
                        <a className="tw-mx-auto tw-text-md tw-font-bold hover:tw-underline hover:underline-offset-1">Faça login</a>
                    </Link>
                </form>

            </div>
        </>
    )
}
