"use client"
import Header from '@/containers/Home/_components/header';
import Footer from '@/containers/Home/_components/footer';
import {AnimatePresence, motion} from 'framer-motion';
import {useState} from "react";
import {ArrowLeft, ArrowRight, HelpCircle, X} from "lucide-react";
import { GrHelp } from "react-icons/gr";
import { BiSolidMessageAltError } from "react-icons/bi";
import { FaHandPointRight } from "react-icons/fa";
import { FaMobileScreen } from "react-icons/fa6";
import { BiWorld } from "react-icons/bi";
import { MdOutlineReport } from "react-icons/md";

const Input = (props) => {
  const { type, placeholder } = props;
  return (
      <input
          className=" border-black border-2 p-2 focus:outline-dotted rounded focus:outline-premiumOrange "
          type={type}
          placeholder={placeholder}
      />
  );
};

const Button = (props) => {
  const { onClick, textOfButton } = props;
  return (
      <button
          className="bg-premiumOrange hover:bg-lightOrange p-2 w-full rounded border-black border-2 hover:border-white transition delay-120 duration-500 "
          type="button"
          onClick={onClick}
      >
        {textOfButton}
      </button>
  );
};

const HomeLayout = ({ children }) => {
  const [helpMenu, setHelpMenu] = useState(false);
  const [currentHelpIndex, setCurrentHelpIndex] = useState(null);
  const [childIndex, setChildIndex] = useState(null)

  const data = [
    {
      id: 1,
      title: "Yemek Nasil Siparis Edilir?",
      icon: <GrHelp size={16} />,
      childrens: [
        {
          id: 11,
          title: "Uygulamayi kullan",
          icon: <FaMobileScreen size={16} />,
          text: "Uygulama kullanarak nasil sipariş verilir",
          description:
              "Anasayfa üzerinden adresinize yakin restoranlari inceleyebilir ve sipariş verebilirsiniz",
          items: [
            <p> Yardimci oldu mu ?</p>,
            <Button
                textOfButton="Evet"
                onClick={() => {
                  alert("Evet");
                }}
            />,
            <Button
                textOfButton="Hayir"
                onClick={() => {
                  alert("hayir");
                }}
            />,
          ],
        },
        //c2
        {
          id: 22,
          title: "Web'i Kullan",
          icon: <BiWorld size={16} />,
          text: "Web kullanarak nasil sipariş verilir",
          description:
              "Anasayfa üzerinden adresinize yakin restoranlari inceleyebilir ve sipariş verebilirsiniz",
          items: [
            <p className={"text-lg font-medium"}>Yardimci oldu mu ?</p>,
            <Button
                textOfButton="Evet"
                onClick={() => {
                  alert("Evet");
                }}
            />,
            <Button
                textOfButton="Hayir"
                onClick={() => {
                  alert("hayir");
                }}
            />,
          ],
        },
      ],
    },

    {
      id: 3,
      title: "Bizi Puanla",
      icon: <BiSolidMessageAltError size={16} />,
      childrens: [
        {
          id: 33,
          title: "Puanla",
          icon: <FaHandPointRight size={20} />,
          text: "Bizi puanladiğiniz için teşekkürler",
          description: "Vakit ayirdiğiniz için teşekkürler",
          items: [<Input type="range" />, <Button textOfButton="gönder" />],
        },
        //c2
        {
          id: 44,
          title: "Şikayet",
          icon: <MdOutlineReport size={16} />,
          text: "Özür dileriz",
          description:
              "Şikayetinizi alttaki formdan anonim bir şekilde bize iletebilirsiniz yaşadiğiniz sorun için özür dileriz!",
          items: [
            <Input />,
            <Button
                textOfButton="şikayetini gönder"
                onClick={() => {
                  alert("Şikayet gönderildi");
                }}
            />,
          ],
        },
      ],
    },
  ];

    return (
    <div className="relative">
      <Header/>
      {children}
      <Footer />

        <div className="w-full h-auto fixed bottom-4 left-4">
          {!helpMenu && (
              <motion.div initial={{opacity: 0}} animate={{ opacity: 1, transition:{delay: 0.3, duration: 0.3, ease:"easeInOut"} }} exit={{ opacity: 1, transition:{delay: 0.3, duration: 0.3, ease:"easeInOut"} }} onClick={() => setHelpMenu(true)} className="p-3 w-fit bg-black rounded-full">
                <HelpCircle color={"#fff"} size={24}/>
              </motion.div>
          )}

          <AnimatePresence>
            {helpMenu && (
                <motion.div className={"flex flex-col max-w-sm w-[400px] w-fit bg-premiumOrange rounded"}
                            transition={{ ease: "easeInOut", duration: 0.3 }}
                            initial={{opacity: 0, translateY: 25, translateX: -25}} exit={{opacity: 0,translateY: 25, translateX: -25}}
                            animate={{opacity: 1, translateY: 0, translateX: 0}}>
                  <div className="w-full flex items-center justify-between px-4 py-2">
                    <span className={"text-white font-semibold text-lg"}>Nasıl yardımcı olabiliriz?</span>

                    <div onClick={() => setHelpMenu(false)} className="p-2 bg-black rounded-full">
                      <X color={"#fff"} size={16}/>
                    </div>
                  </div>

                  <div class="overflow-y-auto h-[300px] w-full flex flex-col p-4">
                    {currentHelpIndex === null ? (
                        <>
                          {data.map((item, index) => (
                              <button
                                  onClick={() => setCurrentHelpIndex(index)}
                                  key={item.id}
                                  className={`flex w-full py-2 first:mt-0 mt-4 bg-white/50 px-4 rounded border items-center`}
                              >
                                <div className="flex items-center">
                                  <span className="mr-4">{item.icon}</span>
                                  <h1 className="font-semibold">{item.title}</h1>
                                </div>

                                <span className={`ml-auto`}>
                        <ArrowRight/>
              </span>
                              </button>
                          ))}
                        </>
                    ) : (
                        <>
                          {childIndex === null && currentHelpIndex !== null ? (
                              <div className="flex flex-col gap-2">
                                <div className="flex items-center bg-black/75 border rounded py-1 px-2 gap-2 mb-4"
                                     onClick={() => setCurrentHelpIndex(null)}>
                                  <ArrowLeft size={24} color={"#fff"}/>
                                  <span
                                      className={"text-base font-medium text-white"}>{data[currentHelpIndex].title}</span>
                                </div>

                                <>
                                  {data[currentHelpIndex].childrens.map((child, index) => (
                                      <button
                                          onClick={() => setChildIndex(index)}
                                          key={index}
                                          className={`flex w-full py-2 bg-white/50 px-4 rounded border items-center`}
                                      >
                                        <div className="flex items-center">
                                          <span className="mr-3">{child.icon}</span>
                                          <h1 className="">{child.title}</h1>
                                        </div>

                                        <span className={`ml-auto`}>
                  <ArrowRight/>
                </span>
                                      </button>
                                  ))}
                                </>
                              </div>
                          ) : (
                              <div className="flex flex-col gap-2">
                                <div className="flex items-center bg-black/75 border rounded py-1 px-2 gap-2 mb-4"
                                     onClick={() => setChildIndex(null)}>
                                  <ArrowLeft size={24} color={"#fff"}/>
                                  <span
                                      className={"text-base font-medium text-white"}>Geri Don</span>
                                </div>

                                <div className={"flex flex-col h-full w-full"}>
                                  {data[currentHelpIndex].childrens[childIndex].title && (
                                      <div className="p-3 h-auto w-full break-words ">
                                  <span
                                      className="break-words font-bold text-white">{data[currentHelpIndex].childrens[childIndex].title}</span>
                                      </div>
                                  )}

                                  {data[currentHelpIndex].childrens[childIndex].description && (
                                      <div className="mt-2 mb-2 p-2">
                                        <p className="break-words text-white">{data[currentHelpIndex].childrens[childIndex].description}</p>
                                      </div>
                                  )}

                                  {data[currentHelpIndex].childrens[childIndex].items &&
                                      data[currentHelpIndex].childrens[childIndex].items.map((item, index) => (
                                          <div key={index} className="mt-2 mb-2">
                                            <div className="flex flex-col">{item}</div>
                                          </div>
                                      ))}
                                </div>
                              </div>
                          )}
                        </>
                    )}
                  </div>
                </motion.div>
            )}
          </AnimatePresence>
        </div>
    </div>
    );
};

export default HomeLayout;
