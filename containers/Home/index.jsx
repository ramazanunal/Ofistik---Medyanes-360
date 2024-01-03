import FirstContent from "@/containers/Home/_components/first-content";
import HowToUse from "@/containers/Home/_components/howToUse";
import ALitleBitAboutUs from "@/containers/Home/_components/aLittleBitAboutUs";
import Terapizone from "@/containers/Home/_components/terapizone";
import Faq from "@/containers/Home/_components/faq";
import CardSlider from "@/components/slider/cardSlider";

const HomeContainer = () => {
    return (
        <div className="flex flex-col h-full w-full bg-white">
            <FirstContent/>
            <ALitleBitAboutUs/>
            <HowToUse/>
            <Terapizone/>
            <CardSlider/>
            <Faq/>
        </div>
    );
};

export default HomeContainer;
