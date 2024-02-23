import React from "react";
import ChoseType from "@/components/ChoseType";
import Image from "next/image";
import RegisterModal from "@/components/modal/auth/Register";

function FirstContent({ activeComponent, changeComponent }) {
    return (
        <div href="#first-content" className="w-full h-fit pt-36 xl:pt-48 items-center flex flex-col bg-deep-slate-blue gap-6">
            <div
                className="flex flex-col md:flex-row h-fit items-center gap-0 md:gap-24">
                <div className="flex flex-col items-center xl:items-start lg:pt-12 gap-4 lg:gap-8">
                    <div className="flex flex-col items-center gap-2.5">
                        <h3 className={` font-bold text-white ${activeComponent == 'Hizmet Al' ? "text-2xl 2xl:text-5xl" : "text-xl 2xl:text-4xl"} `}>
                            {activeComponent == 'Hizmet Al' ?
                                "Dilediğin hizmeti seç,randevu al," :
                                "Dilediğin kadar çalış, dilediğin kadar kazan."
                            }
                        </h3>
                        <span className="text-2xl 2xl:text-4xl font-bold text-vivid-orange">
                            {activeComponent == 'Hizmet Al' ? "online görüşme yap" : "Ücretsiz kaydol, hemen başla."}
                        </span>
                    </div>
                    <ChoseType changeComponent={changeComponent} headers={["Hizmet Al", "Hizmet Ver"]} activeComponent={activeComponent} />
                    <div className="mx-auto">
                        <div className="flex flex-row flex-nowrap  items-center justify-center gap-1">
                            <p className="text-white text-2xl 2xl:text-4xl font-bold">
                                Ücretsiz kaydol
                            </p>
                            <RegisterModal className={"text-2xl 2xl:text-4xl font-semibold text-vivid-orange hover:text-vivid-orange/90 bg-transparent hover:bg-white/15 py-4 px-2 "} />
                        </div>
                    </div>
                </div>
                <Image
                    src="/images/slider.png"
                    width={500}
                    height={500}
                    quality={100}
                    alt="Picture of the author"
                    className="lg:max-w-lg max-w-xs object-contain"
                />
            </div>
        </div >
    );
}

export default FirstContent;
