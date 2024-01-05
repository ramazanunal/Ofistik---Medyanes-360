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
        <div className="w-full h-screen justify-center pt-24 items-center flex flex-col bg-deep-slate-blue">
            <ChoseType headers={["Hizmet Al", "Hizmet ver"]}/>

            <div
                className="flex flex-col lg:flex-row h-fit items-center gap-12">
                <div className="flex flex-col items-center lg:items-start pt-12 gap-8">
                    <div className="text-white flex flex-col gap-4 text-center lg:text-start lg:self-end">
                        <h1 className="font-bold text-xl lg:text-5xl lg:leading-[52px] lg:font-semibold ">
                            Online terapi ile değişimi başlat!
                        </h1>
                        <p className="font-semibold text-sm max-w-sm lg:justify-self-start lg:text-xl">Hemen sana en
                            uygun online
                            psikolog ile eşleş ve değişime başla</p>
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
                    width={600}
                    height={600}
                    quality={100}
                    alt="Picture of the author"
                    className="lg:max-w-lg max-w-xs object-contain"
                />
            </div>
        </div>
    );
}

export default FirstContent;
