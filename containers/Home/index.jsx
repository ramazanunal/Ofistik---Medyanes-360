import FirstContent from "@/containers/Home/_components/first-content";
import HowToUse from "@/containers/Home/_components/howToUse";
import ALitleBitAboutUs from "@/containers/Home/_components/aLittleBitAboutUs";
import Terapizone from "@/containers/Home/_components/terapizone";
import Faq from "@/containers/Home/_components/faq";
import CardSlider from "@/components/cardSlider";

const HomeContainer = () => {
    return (
        <>
            <FirstContent/>
            <HowToUse/>
            <ALitleBitAboutUs/>
            <Terapizone/>
            <CardSlider/>
            <Faq/>
        </>
    );
};

export default HomeContainer;
