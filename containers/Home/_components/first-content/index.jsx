import React from "react";
import ChoseType from "@/components/ChoseType";
import Image from "next/image";

function FirstContent({ changeComponent }) {
    return (
        <div className="w-full h-fit pt-36 xl:pt-48 items-center flex flex-col bg-deep-slate-blue gap-6">
            <div
                className="flex flex-col md:flex-row h-fit items-center gap-0 md:gap-24">
                <div className="flex flex-col items-center xl:items-start pt-12 gap-8">
                    <div className="flex flex-col items-center gap-2.5">
                        <h3 className="text-2xl 2xl:text-5xl font-bold text-white">
                            Dilediğin hizmeti seç,randevu al,
                        </h3>
                        <span className="text-2xl 2xl:text-4xl font-bold text-vivid-orange">
                  online görüşme yap
              </span>
                    </div>
                    <ChoseType changeComponent={changeComponent} headers={["Hizmet Al", "Hizmet Ver"]}/>
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
        </div>
    );
}

export default FirstContent;
