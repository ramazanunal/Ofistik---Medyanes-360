import React from "react";

//data
import data from "./data";
import Card from "./card";

function ALitleBitAboutUs({ activeComponent }) {
    return (
        <div id="aLittleBitAboutUs"
            className="bg-deep-slate-blue w-full h-fit pt-36 py-20 flex items-center justify-center">
            <div className="mx-auto h-full flex flex-col w-4/6">
                <div className="text-white">
                    <p className="font-bold text-center pb-8 text-xl  md:text-3xl 2xl:pb-12 2xl:text-5xl">
                        {activeComponent == 'Hizmet Al' ? "HİZMETLERİMİZ" : "HİZMET VERECEĞİN SEKTÖRÜNÜ BUL"}
                    </p>
                </div>
                <div 
                    className="grid grid-cols-2 justify-items-center gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 h-full">
                    {data.map((item, idx) => (
                        <Card item={item} key={idx} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ALitleBitAboutUs;
