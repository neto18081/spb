import React from 'react'
import Header from '../../components/Header'
import { useState } from 'react';
import { DataProducts } from '../../components/Arquivos';


export default function Single({ single }) {
    const [banner, setBanner] = useState({
        title: "black",
    });

    const produto = DataProducts.find((ui) => ui.slug == single)
    console.log(produto)

    return (
        <>
            <Header data={{ banner, setBanner }} />
            <div className="tw-w-screen tw-h-screen tw-flex tw-flex-col tw-pt-[200px]">
                <span
                    className={`tw-absolute tw-top-[80px] tw-left-[20px] sm:tw-left-[110px] tw-leading-[110%] tw-text-[22px] tw-font-bold ${banner.title == "white" ? "tw-text-white" : "tw-text-black"
                        }`}
                >
                    Sistema <br /> para Ecommerce
                </span>

                <div className='tw-flex tw-ml-28 tw-justify-around'>
                    {/* esquerda */}
                    <div className='tw-flex tw-flex-col tw-w-1/2 tw-text-left'>
                        <h2 className='tw-flex tw-flex-start tw-text-6xl tw-h-max tw-mb-10'>{produto.descricao}</h2>
                        <p className='tw-w-2/3 tw-text-xl tw-mb-10'>{produto.descricaoSingle}</p>
                        <span className='tw-font-bold tw-text-5xl'>{produto.preco}</span>

                        <span className='tw-mt-10 tw-mb-6' >Cor:</span>
                        <ul className='tw-flex'>
                            <li><a href='#' className={`tw-border-2 tw-border-black tw-bg-${produto.cor1} tw-rounded-full tw-p-4 tw-mr-2 hover:tw-border-gold hover:border-2`}></a></li>
                            <li><a href='#' className={`tw-border-2 tw-border-black tw-bg-${produto.cor2} tw-rounded-full tw-p-4 tw-mr-2 hover:tw-border-gold hover:border-2`}></a></li>
                            <li><a href='#' className={`tw-border-2 tw-border-black tw-bg-${produto.cor3} tw-rounded-full tw-p-4 tw-mr-2 hover:tw-border-gold hover:border-2`}></a></li>
                        </ul>
                        <span className='tw-mt-10 tw-mb-6'>Tamanho:</span>
                        <ul className='tw-flex'>
                            <li><a href='#' className='tw-h-2 tw-w-2 tw-border-2 tw-border-black tw-rounded-md tw-p-2 tw-mr-2 tw-font-bold hover:tw-bg-black hover:tw-text-white'>P</a></li>
                            <li><a href='#' className='tw-h-2 tw-w-2 tw-border-2 tw-border-black tw-rounded-md tw-p-2 tw-mr-2 tw-font-bold hover:tw-bg-black hover:tw-text-white'>M</a></li>
                            <li><a href='#' className='tw-h-2 tw-w-2 tw-border-2 tw-border-black tw-rounded-md tw-p-2 tw-mr-2 tw-font-bold hover:tw-bg-black hover:tw-text-white'>G</a></li>
                        </ul>

                        <button className='tw-p-4 tw-border-none tw-w-2/5 tw-rounded-xl tw-bg-gold tw-text-white tw-font-bold hover:tw-text-black tw-mt-10'>Adicionar ao carrinho</button>
                    </div>
                    {/* direita */}
                    <div className='tw-w-1/2 tw-flex tw-items-center tw-justify-center tw-h-min'>
                        <div className='tw-flex tw-justify-center tw-flex-col'>
                            <img src={produto.img} alt="#" className='tw-w-2/5 tw-p-1 tw-my-2 tw-mx-auto tw-rounded-xl hover:tw-bg-gold tw-shadow-2xl tw-flex' />
                            <img src={produto.img} alt="#" className='tw-w-2/5 tw-p-1 tw-my-2 tw-mx-auto tw-rounded-xl hover:tw-bg-gold tw-shadow-2xl tw-flex' />
                            <img src={produto.img} alt="#" className='tw-w-2/5 tw-p-1 tw-my-2 tw-mx-auto tw-rounded-xl hover:tw-bg-gold tw-shadow-2xl tw-flex' />

                        </div>
                        <img src={produto.img} alt="" className='tw-w-4/5 tw-p-2 tw-my-4 tw-rounded-xl hover:tw-bg-gold tw-shadow-2xl tw-mr-12' />

                    </div>
                </div>
            </div>
        </>
    )
}


Single.getInitialProps = async ({ query }) => {
    return {
        single: query.single
    }
}