import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
// import Senario from "./senario";
import AdvertTypeInfo from "../createAdvert/advertTypeInfo";
import { CiDiscount1, CiShoppingCart } from "react-icons/ci";
import { cn } from "@/lib/utilities/utils";

const AdvertInfo = ({ onSubmit }) => {
  const [selectedOption, setSelectedOption] = useState("");
  // const [isModalOpen, setModalOpen] = useState(true);
  // const openModal = () => {
  //   setModalOpen(true);
  // };

  // const [initialSenario, setSenario] = useState([
  //   "Bu reklam için günlük en fazla 50TL harcamak istiyorum.Oluşturduğum reklam belirttiğim tarihte başlayıp belirlediğim tarihte bitsin.",
  //   "Belirlenen günlük bütçe miktarı reklam oluşturulduğu an reklam bakiyenizden çekilir.Reklam süresi boyunca gün sonunda harcanmayan günlük bütçe miktarı kalırsa reklam bakiyenize iade edilir.Reklam bakiyenizde yeterli tutar olduğu takdirde reklam süresi boyunca hergün bu işlem tekrarlanır.",
  //   "Toplam Bütçe Senaryosu",
  // ]);
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split("T")[0];
  const initialValues = {
    kampanyaTuru: "",
    kampanyaAdi: "",
    baslangicTarihi: "",
    bitisTarihi: "",
    kampanyaTarihi: formattedDate,
  };

  const validationSchema = Yup.object().shape({
    kampanyaTuru: Yup.string().required("Lütfen en az birini seçiniz."),
    kampanyaAdi: Yup.string().required("Lütfen kampanya adını yazınız"),
    baslangicTarihi: Yup.date()
      .required("Başlangıç tarihi zorunludur")
      .min(new Date(), "Başlangıç tarihi bugünden ileri bir tarih olmalıdır"),
    bitisTarihi: Yup.date()
      .required("Bitiş tarihi zorunludur")
      .min(
        Yup.ref("baslangicTarihi"),
        "Bitiş tarihi başlangıç tarihinden önce olamaz"
      ),
  });

  const RadioCard = ({ title, icon: Icon, value, name, formik }) => {
    return (
      <label
        className={cn(
          "max-w-[180px] flex flex-col items-center justify-center border rounded-md border-gray-200 p-4 cursor-pointer transition-all duration-300 ease-in-out hover:shadow-md hover:bg-neutral-50 ",
          formik.values.kampanyaTuru === value &&
            "text-premiumOrange border-premiumOrange"
        )}
      >
        <Icon className="text-premiumOrange size-24 m-2" />
        <h3 className="text-center font-medium my-1.5">{title}</h3>
        <Field
          type="radio"
          name={name}
          value={value}
          className="form-radio text-red-600 h-4 w-4"
          checked={formik.values.kampanyaTuru == value}
          onChange={() => formik.setFieldValue(name, value)}
        />
      </label>
    );
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form id="myform">
            <div className="flex flex-col lg:flex-row px-3 py-4 max-w-[1200px] xl:max-w-[1600px] gap-x-3">
              <div className="flex flex-col md:flex-col lg:flex-col flex-auto w-full lg:w-3/4">
                <div className="flex-col lg:flex lg:flex-row flex-auto p-2 gap-x-10">
                  <div className="flex-col flex-auto w-full lg:w-1/2 py-1">
                    <h3 className="font-bold mb-3">Kampanya Türünü Seçiniz</h3>
                    <div
                      className="flex  gap-4"
                      role="group"
                      aria-labelledby="kampanyaTuru"
                    >
                      <RadioCard
                        title="Sepette Yüzde İndirim"
                        icon={CiDiscount1}
                        value="sepetteYuzdeIndirim"
                        name="kampanyaTuru"
                        formik={formik}
                      />
                      <RadioCard
                        title="Sepette Fiyat İndirim"
                        icon={CiShoppingCart}
                        value="sepetteFiyatIndirim"
                        name="kampanyaTuru"
                        formik={formik}
                      />
                    </div>
                    <ErrorMessage
                      name="kampanyaTuru"
                      component="div"
                      style={{ color: "red" }}
                    />
                  </div>
                </div>

                {/* Bütçe Tipi ve Günlük Reklam Bütçesi */}
                <div className="flex-col lg:flex lg:flex- flex-auto w-full py-2">
                  <div className="ml-1 font-semibold mb-2">Kampanya İsmi</div>
                  <div>
                    <Field
                      type="text"
                      name="kampanyaAdi"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-1 px-6 text-base font-medium text-txtGrey outline-none focus:border-lightGray focus:shadow-md"
                    />
                  </div>
                  <ErrorMessage
                    name="kampanyaAdi"
                    component="div"
                    style={{ color: "red" }}
                  />
                </div>

                {/* Tarih Aralığı */}
                <div className="flex-col lg:flex lg:flex-row flex-auto p-2">
                  <div className="flex-col flex-auto w-full lg:w-1/2 py-0 lg:py-1">
                    <h3 className="font-bold">Tarih Aralığı</h3>
                    <p className="text-txtGrey mb-4">
                      Reklam başlangıç ve bitiş tarihlerini
                      belirleyin.Dilerseniz bitiş tarihi olmayan süresiz reklam
                      verebilirsiniz.
                    </p>

                    <div className="flex-col lg:flex lg:flex-row justify-between items-center gap-x-10">
                      <div className="relative flex flex-auto mb-3">
                        <div className="flex-col flex-auto">
                          <div className="flex-col">
                            <label
                              htmlFor="baslangicTarihi"
                              className=" block text-xs lg:text-sm font-medium text-txtGrey "
                            >
                              Başlangıç Tarihi
                            </label>
                            <Field
                              type="date"
                              name="baslangicTarihi"
                              id="baslangicTarihi"
                              data-isvalid={
                                formik.touched.baslangicTarihi &&
                                !formik.errors.baslangicTarihi
                              }
                              isinvalid={
                                formik.touched.baslangicTarihi &&
                                !!formik.errors.baslangicTarihi
                              }
                              className={`w-full rounded-md border ${
                                formik.touched.baslangicTarihi &&
                                formik.errors.baslangicTarihi
                                  ? "border-b-red-500"
                                  : "border-[#e0e0e0]"
                              } bg-white py-1 px-6 text-base font-medium text-txtGrey outline-none focus:border-lightGray focus:shadow-md`}
                            />
                          </div>
                          <div className="flex">
                            {formik.touched.baslangicTarihi &&
                              formik.errors.baslangicTarihi && (
                                <p className="mt-1 text-sm text-red-500">
                                  {formik.errors.baslangicTarihi}
                                </p>
                              )}
                          </div>
                        </div>
                      </div>

                      <div className="relative flex flex-auto mb-3">
                        <div className="flex-col flex-auto">
                          <div className="flex-col">
                            <label
                              htmlFor="bitisTarihi"
                              className="block text-xs lg:text-sm font-medium text-txtGrey "
                            >
                              Bitiş Tarihi
                            </label>
                            <Field
                              type="date"
                              name="bitisTarihi"
                              id="bitisTarihi"
                              data-isvalid={
                                formik.touched.bitisTarihi &&
                                !formik.errors.bitisTarihi
                              }
                              isinvalid={
                                formik.touched.bitisTarihi &&
                                !!formik.errors.bitisTarihi
                              }
                              className={`w-full rounded-md border ${
                                formik.touched.bitisTarihi &&
                                formik.errors.bitisTarihi
                                  ? "border-b-red-500"
                                  : "border-[#e0e0e0]"
                              } bg-white py-1 px-6 text-base font-medium text-txtGrey outline-none focus:border-lightGray focus:shadow-md`}
                            />
                          </div>
                          <div className="flex">
                            {formik.touched.bitisTarihi &&
                              formik.errors.bitisTarihi && (
                                <p className="mt-1 text-sm text-red-500">
                                  {formik.errors.bitisTarihi}
                                </p>
                              )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {(formik.values.kampanyaTuru === "sepetteYuzdeIndirim" ||
                formik.values.kampanyaTuru === "") && (
                <div className="lg:w-2/3">
                  <AdvertTypeInfo
                    img={"/img/cover.png"}
                    title={"Sepette Yüzde İndirim"}
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
                </div>
              )}

              {formik.values.kampanyaTuru === "sepetteFiyatIndirim" && (
                <div className="lg:w-2/3">
                  <AdvertTypeInfo
                    img={"/img/cover2.png"}
                    title={"Sepette Fiyat İndirim"}
                    q1={[
                      "Gönderilerinizi ön plana çıkartarak etkileşiminizi arttırmak için uygulanan reklam modelidir.",
                    ]}
                    q2={[
                      "Görsel ve video içeriklerle kendinizi ve yaptığınız işi tanıtabilirsiniz. ",
                      "Yaptığınız iş görsele dayalı ise reklam ile yaptığınız işleri öne çıkartarak referans olarak kullanabilirsiniz.",
                      "Gönderilerinizin tıklanması ile profil trafiğinizi ve takipçi sayınızı arttırabilirsiniz.",
                      "Ofistik reklam algoritması sayesinde verdiğiniz hizmet grubu için arama yapan ve hizmet verme olasılığınız yüksek olan doğru hedef kitleyi yakalarsınız.",
                      "Verdiğiniz reklamların performansını kolaylıkla takipo edip reklam verimliliğinizi arttırabilirsiniz.",
                    ]}
                    q3={["Ofistik anasayfası", "Sosyal medya keşfet sayfası"]}
                    q4={[
                      "Gönderi reklamından etkili şekilde faydalanmak için gönderinizin kalitesinden,açıklama kısmının yeterli ve dikkat çekici olduğundan emin olun.",
                    ]}
                  />
                </div>
              )}
            </div>
          </Form>
        )}
      </Formik>
      {/* <Senario
        initialSenario={initialSenario}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      /> */}
    </>
  );
};

export default AdvertInfo;
