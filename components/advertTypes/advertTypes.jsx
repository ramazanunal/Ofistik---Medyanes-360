import React, { useEffect, useState } from "react";
import AdvertTypeModule from "./advertTypeModule";

const AdvertTypes = ({ isOpen, onClose }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [activeLink, setActiveLink] = useState(1); //Aktif linki tutan state

  {
    /*Active Linki set eder */
  }
  const handleClick = (linkId) => {
    setActiveLink(linkId);
  };

  useEffect(() => {
    {
      /*ekran 768 den küçükse isMobil olur*/
    }
    setIsMobile(window.innerWidth <= 768);
    setIsMobile(window.innerWidth <= 768);
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  //Reklam ipuçları açıksa
  const modalClass = isOpen
    ? "fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-600 bg-opacity-50"
    : "hidden";
  return (
    <div className={modalClass}>
      <div className="absolute w-full h-full flex items-center justify-center">
        <div className="relative mx-auto md:mx-9 px-auto lg:px-5 bg-white rounded-2xl animate__animated animate__fadeInDown w-80 lg:w-auto lg:max-w-[1000px] lg:min-w-[1000px] lg:max-h-[650px]">
          <div>
            <div className="flex flex-col max-w-[1200px] px-3  mx-auto rounded-lg bg-bgWhite">
              <div className="flex flex-col md:flex-row justify-between items-center gap-x-2 lg:gap-x-5 mt-3 md:mt-10 text-xs lg:text-sm">
                {!isMobile && (
                  <div className="flex border-none font-bold p-1 mb-3 md:mb-0 text-sm lg:text-xl text-center">
                    Reklam Tipleri
                  </div>
                )}
                {isMobile && (
                  <div className="flex items-center justify-center relative w-full">
                    <div className="flex border-none font-bold p-1 pt-2 mb-3 md:mr-4 text-sm lg:text-xl text-center">
                      Reklam Tipleri
                    </div>
                    <div
                      className="w-5 h-5 md:w-10 md:h-10 rounded-md p-4 cursor-pointer transition-all duration-700 md:relative  bg-gray-200/50 hover:bg-red-500 group absolute right-2 bottom-2"
                      onClick={onClose}
                    >
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 512 512"
                        className="text-txtRed transition-all duration-700 rotate-180 flex absolute group-hover:opacity-0 group-hover:rotate-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                        height="30"
                        width="30"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z"></path>
                      </svg>
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 24 24"
                        className="text-white rotate-0 transition-all duration-700 opacity-0 group-hover:block group-hover:rotate-180 group-hover:opacity-100 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                        height="30"
                        width="30"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M4.5 12.75a.75.75 0 0 1 .75-.75h13.5a.75.75 0 0 1 0 1.5H5.25a.75.75 0 0 1-.75-.75Z"></path>
                      </svg>
                    </div>
                  </div>
                )}
                {!isMobile && (
                  <div
                    className="w-10 h-10 rounded-md p-4 cursor-pointer transition-all duration-700 relative  bg-gray-200/50 hover:bg-red-500 group"
                    onClick={onClose}
                  >
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 512 512"
                      className="text-txtRed transition-all duration-700 rotate-180 flex absolute group-hover:opacity-0 group-hover:rotate-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                      height="30"
                      width="30"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z"></path>
                    </svg>
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 24 24"
                      className="text-white rotate-0 transition-all duration-700 opacity-0 group-hover:block group-hover:rotate-180 group-hover:opacity-100 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                      height="30"
                      width="30"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M4.5 12.75a.75.75 0 0 1 .75-.75h13.5a.75.75 0 0 1 0 1.5H5.25a.75.75 0 0 1-.75-.75Z"></path>
                    </svg>
                  </div>
                )}
              </div>
              <div className="pb-4 lg:pb-5">
                <div className="tabs tab-group flex justify-center items-center relative">
                  <button
                    className="tabs px-3 lg:px-10 relative md:text-[1.3vw] lg:text-[1.2vw] xl:text-[0.9vw] text-xs group transition-all duration-300 ease-in-out "
                    onClick={() => handleClick(1)}
                  >
                    <h1
                      className={`p-3 hover:text-premiumOrange ${activeLink === 1
                          ? "border-b-2 border-premiumOrange text-premiumOrange font-semibold "
                          : "text-gray-500"
                        } `}
                    >
                      Profil Reklamı
                    </h1>
                  </button>
                  <button
                    className="tabs px-3 lg:px-10 relative md:text-[1.3vw] lg:text-[1.2vw] xl:text-[0.9vw] text-xs group transition-all duration-300 ease-in-out"
                    onClick={() => handleClick(0)}
                  >
                    <h1
                      className={`p-3 hover:text-premiumOrange ${activeLink === 0
                          ? "border-b-2 border-premiumOrange text-premiumOrange font-semibold "
                          : "text-gray-500"
                        } `}
                    >
                      Gönderi Reklamı
                    </h1>
                  </button>
                </div>

                <div className="border mt-2 lg:mt-4"></div>
              </div>
              <div className="flex-col">
                {activeLink === 0 && (
                  <AdvertTypeModule
                    img={'/img/plan1.png'}
                    q1={[
                      "Gönderilerinizi ön plana çıkartarak etkileşiminizi arttırmak için uygulanan reklam modelidir.",
                    ]}
                    q2={[
                      "Görsel ve video içeriklerle kendinizi ve yaptığınız işi tanıtabilirsiniz. ",
                      "Yaptığınız iş görsele dayalı ise reklam ile yaptığınız işleri öne çıkartarak referans olarak kullanabilirsiniz.",
                      "Gönderilerinizin tıklanması ile profil trafiğinizi ve takipçi sayınızı arttırabilirsiniz.",
                      "Artan profil trafiğinizle birlikte isim bilinirliğinizi arttırabilir,hizmet alanlar ile etkileşime girebilirsiniz.",
                      "Ofistik reklam algoritması sayesinde verdiğiniz hizmet grubu için arama yapan ve hizmet verme olasılığınız yüksek olan doğru hedef kitleyi yakalarsınız.",
                      "Verdiğiniz reklamların performansını kolaylıkla takipo edip reklam verimliliğinizi arttırabilirsiniz.",
                    ]}
                    q3={["Ofistik anasayfası", "Sosyal medya keşfet sayfası"]}
                    q4={[
                      "Gönderi reklamından etkili şekilde faydalanmak için gönderinizin kalitesinden,açıklama kısmının yeterli ve dikkat çekici olduğundan emin olun.",
                    ]}
                  />
                )}
                {activeLink === 1 && (
                  <AdvertTypeModule
                    img={'/img/plan3.png'}
                    q1={[
                      "Profilinizi ön plana çıkartarak etkileşiminizi arttırmak için uygulanan reklam modelidir.",
                    ]}
                    q2={[
                      "Reklam vererek profil trafiğinizi ve takipçi sayınızı artırabilirsiniz.",
                      "Artan profil trafiğinizle birlikte isim bilinirliğinizi arttırabilir,hizmet alanlar ile etkileşime girebilirsiniz.",
                      "Ofistik reklam algoritması sayesinde verdiğiniz hizmet grubu için arama yapan ve hizmet verme olasılığınız yüksek olan doğru hedef kitleyi yakalarsınız.",
                      "Verdiğiniz reklamların performansını kolaylıkla takipo edip reklam verimliliğinizi arttırabilirsiniz.",
                    ]}
                    q3={[
                      "Ofistik anasayfası",
                      "Sektör listeleme sayfası",
                      "Arama sayfaları",
                    ]}
                    q4={[
                      "Profil reklamından etkili şekilde faydalanmak için profilinizin tüm bölümlerinin yeterince dolu ve açıklayıcı olduğundan emin olun.",
                    ]}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvertTypes;
