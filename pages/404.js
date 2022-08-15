import React from 'react'
import Header from '../components/Header'
import { useState } from 'react'


export default function Error() {
    const [banner, setBanner] = useState({
        title: "black",
    });

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

                <h2 className='tw-mx-auto tw-w-min tw-flex tw-flex-start tw-text-8xl tw-mb-20 tw-text-center'>uiui <br /> Página não encontrada :O</h2>

            </div>

        </>
    )
}