import React from "react";
import ChoseType from "@/components/ChoseType";
import {Button} from "@/components/ui/button";
import Image from "next/image"

function FirstContent() {
    const headerText = "Doktor bul, randevu al,"
    const headerText2 = "online,"
    const headerText3 = "görüşme yap!"

    const typeText1 = "Online Görüşme"
    const typeText2 = "Yüz Yüze Randevu"

    const searchPlaceholder = "Doktor ve branş arayın..."

    return (
        <div className="w-full h-fit pt-36 xl:pt-48 items-center flex flex-col bg-deep-slate-blue gap-6">
            <ChoseType headers={["Hizmet Al", "Hizmet ver"]}/>

            <div
                className="flex flex-col md:flex-row h-fit items-center gap-12">
                <div className="flex flex-col w-4/6 items-center xl:items-start pt-12 gap-8">
                    <div className="flex flex-col text-center xl:text-start gap-2.5">
                        <h3 className="text-4xl 2xl:text-6xl font-bold text-white">
                            Doktor bul, randevu al,
                        </h3>
                        <span className="text-2xl 2xl:text-4xl font-bold text-vivid-orange">
                            online görüşme yap
                        </span>
                    </div>

                    <Button
                        href="/"
                        className="hidden lg:block !w-48 !h-14"
                    >
                        Hemen Başla
                    </Button>
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
