import React from 'react'
import Header from "../components/Header";
import { useState } from 'react';

export default function Equipe() {

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
                <section className='tw-flex tw-ml-28'>
                    <div className='tw-bg-gold tw-w-2/5 tw-h-screen tw-flex tw-justify-center tw-flex-col tw-items-center '>
                        <h2 className='tw-text-6xl tw-mb-10'>Nossa equipe</h2>
                        <p className='tw-w-[90%] tw-mb-4 tw-text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit nam at perferendis repellendus officia tempore tempora architecto expedita! Aspernatur possimus accusamus sunt. Libero sit quae vitae molestias exercitationem. Fugit, voluptatibus.</p>
                        <p className='tw-w-[90%] tw-mb-4 tw-text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit nam at perferendis repellendus officia tempore tempora architecto expedita! Aspernatur possimus accusamus sunt. Libero sit quae vitae molestias exercitationem. Fugit, voluptatibus.</p>

                    </div>
                    <div className='tw-border-2 tw-border-green tw-w-4/5 tw-h-screen tw-flex tw-justify-center tw-mr-10'>
                        <img src="https://github.com/marlonberaldo.png/" alt="" className='tw-h-full' />
                    </div>
                </section>
            </div>
        </>
    )
}