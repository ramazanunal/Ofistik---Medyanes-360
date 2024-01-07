'use client'
import FirstContent from "@/containers/Home/_components/first-content";
import HowToUse from "@/containers/Home/_components/howToUse";
import ALitleBitAboutUs from "@/containers/Home/_components/aLittleBitAboutUs";
import Terapizone from "@/containers/Home/_components/terapizone";
import Faq from "@/containers/Home/_components/faq";
import CardSlider from "@/components/slider/cardSlider";
import {useState} from "react";

const HomeContainer = () => {
    const [activeComponent, setActiveComponent] = useState("Hizmet Al")

    const changeComponent = () => {
        if(activeComponent === "Hizmet Al") {
            setActiveComponent("Hizmet Ver")
        } else if (activeComponent === "Hizmet Ver") {
            setActiveComponent("Hizmet Al")
        }
    }

    return (
        <div className="flex flex-col h-full bg-white">
            <FirstContent changeComponent={changeComponent}/>

            {activeComponent === "Hizmet Al" && (
                <>
                    <ALitleBitAboutUs/>
                    <HowToUse/>
                    <Terapizone/>
                    <CardSlider/>
                    <Faq/>
                </>
            )}

            {activeComponent === "Hizmet Ver" && (
                <>
                    <h1>Hizmet Ver</h1>
                </>
            )}
        </div>
    );
};

export default HomeContainer;
