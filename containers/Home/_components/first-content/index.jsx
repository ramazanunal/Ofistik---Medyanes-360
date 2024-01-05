import React from "react";
import ChoseType from "@/components/tabs/ChoseType";
import {Input} from "@/components/ui/input";

function FirstContent() {


    const headerText = "Doktor bul, randevu al,"
    const headerText2 = "online,"
    const headerText3 = "görüşme yap!"

    const typeText1 = "Online Görüşme"
    const typeText2 = "Yüz Yüze Randevu"

    const searchPlaceholder = "Doktor ve branş arayın..."

    return (
        <div className="w-full h-screen justify-center items-center flex flex-col bg-deep-slate-blue">
            <div className="flex flex-col items-center gap-2.5">
                <h3 className="text-4xl 2xl:text-6xl font-bold text-white">
                    Doktor bul, randevu al,
                </h3>
                <span className="fotext-2xl 2xl:text-4xl font-bold text-vivid-orange">
                  online görüşme yap
              </span>
            </div>
            <ChoseType headers={[{
                title: "Hizmet Al",
                component: <Input placeholder="Hizmet Al"/>
            },
                {
                    title: "Hizmet ver",
                    component: <Input placeholder="Hizmet Ver"/>
                }
            ]}/>
        </div>
    );
}

export default FirstContent;
