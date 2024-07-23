import React, { useState } from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import AdvertTypeModule from "../advertTypes/advertTypeModule";
import Senario from "./senario";
import AdvertTypeInfo from "../createAdvert/advertTypeInfo";

const AdvertInfo = ({ onSubmit }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [initialBudget, setInitialBudget] = useState("Günlük Bütçe");
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };

  const [initialSenario, setSenario] = useState([
    "Bu reklam için günlük en fazla 50TL harcamak istiyorum.Oluşturduğum reklam belirttiğim tarihte başlayıp belirlediğim tarihte bitsin.",
    "Belirlenen günlük bütçe miktarı reklam oluşturulduğu an reklam bakiyenizden çekilir.Reklam süresi boyunca gün sonunda harcanmayan günlük bütçe miktarı kalırsa reklam bakiyenize iade edilir.Reklam bakiyenizde yeterli tutar olduğu takdirde reklam süresi boyunca hergün bu işlem tekrarlanır.",
    "Toplam Bütçe Senaryosu",
  ]);
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split("T")[0];
  const initialValues = {
    reklamTipi: selectedOption,
    reklamAdi: "",
    baslangicTarihi: "",
    bitisTarihi: "",
    butceTipi: "",
    gunlukButceMiktari: "",
    reklamTarihi: formattedDate,
  };

  const validationSchema = Yup.object().shape({
    reklamTipi: Yup.string().required("Lütfen en az birini seçiniz"),
    reklamAdi: Yup.string().required("Lütfen reklam adını yazınız"),
    baslangicTarihi: Yup.date()
      .required("Başlangıç tarihi zorunludur")
      .min(new Date(), "Başlangıç tarihi bugünden ileri bir tarih olmalıdır"),
    bitisTarihi: Yup.date()
      .required("Bitiş tarihi zorunludur")
      .min(
        Yup.ref("baslangicTarihi"),
        "Bitiş tarihi başlangıç tarihinden önce olamaz"
      ),
    butceTipi: Yup.string().required("Lütfen bütçe tipini seçiniz"),
    gunlukButceMiktari: Yup.number()
      .required("Lütfen miktarı giriniz")
      .typeError(/[0-9]/, "Sadece sayı giriniz"),
  });

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
                    <h3 className="font-bold">Reklam Tipi</h3>
                    <p className="text-txtGrey">
                      Oluşturmak istediğiniz reklam tipini belirleyiniz
                    </p>
                    <div className="mt-3 lg:mt-10">
                      <label
                        htmlFor="reklamTipi"
                        className="block text-xs lg:text-sm font-medium text-txtGrey"
                      >
                        Reklam Tipi
                      </label>
                      <select
                        type="text"
                        id="reklam"
                        name="reklamTipi"
                        onChange={(e) => {
                          setSelectedOption(e.target.value);
                          formik.handleChange(e);
                        }}
                        value={formik.values.reklamTipi}
                        className={`w-full rounded-md border ${
                          formik.touched.reklamTipi && formik.errors.reklamTipi
                            ? "border-b-red-500"
                            : "border-[#e0e0e0]"
                        } bg-white py-2 px-6 text-base font-medium text-txtGrey outline-none focus:border-lightGray focus:shadow-md`}
                      >
                        <option value="">Reklam Tipini Seçiniz</option>
                        <option value="1">Profil Reklamı</option>
                        <option value="2">Gönderi Reklam</option>
                      </select>
                      {formik.touched.reklamTipi &&
                        formik.errors.reklamTipi && (
                          <p className="mt-1 text-sm text-red-500">
                            {formik.errors.reklamTipi}
                          </p>
                        )}
                    </div>
                  </div>
                  <div className="flex-col flex-auto w-full lg:w-1/2 py-1">
                    <h3 className="font-bold">Reklam Adı</h3>
                    <p className="pb-3 lg:pb-4 text-txtGrey">
                      Reklam adı müşteriye gönderilmeyecektir,kendi kontrolünüz
                      için bir isim belirleyebilirsiniz
                    </p>
                    <div className="">
                      <label
                        htmlFor="reklamAdi"
                        className="block text-xs lg:text-sm font-medium text-txtGrey"
                      >
                        Reklam Adı
                      </label>
                      <Field
                        type="text"
                        name="reklamAdi"
                        id="reklamAdi"
                        data-isvalid={
                          formik.touched.reklamAdi && !formik.errors.reklamAdi
                        }
                        isinvalid={
                          formik.touched.reklamAdi && !!formik.errors.reklamAdi
                            ? "true"
                            : "false"
                        }
                        className={`w-full rounded-md border ${
                          formik.touched.reklamAdi && formik.errors.reklamAdi
                            ? "border-b-red-500"
                            : "border-[#e0e0e0]"
                        } bg-white py-1 px-6 text-base font-medium text-txtGrey outline-none focus:border-lightGray focus:shadow-md`}
                      />

                      {formik.touched.reklamAdi && formik.errors.reklamAdi && (
                        <p className="mt-1 text-sm text-red-500">
                          {formik.errors.reklamAdi}
                        </p>
                      )}
                    </div>
                  </div>
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

                {/* Bütçe Tipi ve Günlük Reklam Bütçesi */}
                <div className="flex-col lg:flex lg:flex-row flex-auto w-full p-2">
                  <div className="flex-col flex-auto w-full lg:w-1/2 py-1">
                    <div className="flex-col lg:flex lg:flex-row justify-between items-center gap-x-10">
                      <div className="butce flex-col flex-auto w-full lg:w-1/2 mb-1">
                        <div className="flex-col mb-3 lg:mb-8">
                          <div className="flex flex-auto ">
                            <h3 className="font-bold">Bütçe Tipi</h3>
                          </div>
                          <div className=" flex flex-auto ">
                            <p className="text-txtGrey mb-1 lg:mb-7 xl:mb-6">
                              Oluşturmak istediğiniz reklamın bütçe tipini
                              seçiniz
                            </p>
                          </div>
                        </div>
                        <div
                          className={`flex flex-auto justify-around items-center px-1 lg:px-5 py-1.5 bg-grayBg rounded-lg border ${
                            formik.touched.butceTipi && formik.errors.butceTipi
                              ? "border-b-red-500"
                              : "border-[#e0e0e0]"
                          }`}
                        >
                          <div className="flex flex-row">
                            <Field
                              type="radio"
                              name="butceTipi"
                              id="butce1"
                              value="0"
                              checked={formik.values.butceTipi === "0"}
                              onChange={(e) => {
                                formik.handleChange(e);
                                setInitialBudget("Günlük Bütçe");
                              }}
                              className="rounded-md border border-[#e0e0e0] bg-white py-1 px-6 text-base font-medium outline-none focus:border-lightGray focus:shadow-md mr-2"
                            />
                            <label
                              htmlFor="butce1"
                              className="flex items-center justify-center"
                            >
                              Günlük Bütçe
                            </label>
                            <i
                              class="fa-solid fa-circle-info text-sm lg:text-md text-gray-600 ml-2 flex items-center justify-center cursor-pointer mt-[6px]"
                              onClick={() => {
                                openModal();
                                setSenario([
                                  "Bu reklam için günlük en fazla 50TL harcamak istiyorum.Oluşturduğum reklam belirttiğim tarihte başlayıp belirlediğim tarihte bitsin.",
                                  "Belirlenen günlük bütçe miktarı reklam oluşturulduğu an reklam bakiyenizden çekilir.Reklam süresi boyunca gün sonunda harcanmayan günlük bütçe miktarı kalırsa reklam bakiyenize iade edilir.Reklam bakiyenizde yeterli tutar olduğu takdirde reklam süresi boyunca hergün bu işlem tekrarlanır.",
                                  "Günlük Bütçe Senaryosu",
                                ]);
                              }}
                            />
                          </div>
                          <div className="flex flex-row">
                            <Field
                              type="radio"
                              id="butce2"
                              name="butceTipi"
                              value="1"
                              checked={formik.values.butceTipi === "1"}
                              onChange={(e) => {
                                formik.handleChange(e);
                                setInitialBudget("Toplam Bütçe");
                              }}
                              className="rounded-md border border-[#e0e0e0] bg-white py-1 px-6 text-base font-medium text-txtGrey outline-none focus:border-lightGray focus:shadow-md mr-2"
                            />
                            <label
                              htmlFor="butce2"
                              className="flex items-center justify-center"
                            >
                              Toplam Bütçe
                            </label>
                            <i
                              class="fa-solid fa-circle-info text-sm lg:text-md text-gray-600 ml-2 flex items-center justify-center cursor-pointer  mt-[6px]"
                              onClick={() => {
                                openModal();
                                setSenario([
                                  "Bu reklam için toplam 500TL harcamak istiyorum.Oluşturduğum reklam belirttiğim tarihte başlayıp toplam reklam bütçem bitene kadar yayınlansın.",
                                  "Belirlenen toplam bütçe miktarı reklam oluşturulduğu an reklam bakiyenizden çekilir.Reklam kampanyanızdaki toplam bütçeniz bitene kadar Ofistik reklam algoritması günlük gereken bütçeyi kullanır ve kalan bakiyeler sonraki günler için devredilir.Reklam kampanyasının durdurulması veya iptal edilmesi sonucunda reklam kampanyasında kullanılmayan kalan reklam bütçesi reklam bakiyenize aktarılır.",
                                  "Toplam Bütçe Senaryosu",
                                ]);
                              }}
                            />
                          </div>
                        </div>
                        <div>
                          {formik.touched.butceTipi &&
                            formik.errors.butceTipi && (
                              <p className="mt-1 text-sm text-red-500">
                                {formik.errors.butceTipi}
                              </p>
                            )}
                        </div>
                      </div>

                      <div className="butce flex-col flex-auto w-full lg:w-1/2 mb-1">
                        <div className="flex-col">
                          <div className="flex">
                            <h3 className="font-bold">Günlük Reklam Bütçesi</h3>
                          </div>
                          <div className="flex mb-3">
                            <p className="text-txtGrey">
                              Reklam için ayıracağınız günlük bütçeyi
                              belirleyin.Bütçeniz arttıkça görününürlüğünüz
                              artar!
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-row">
                          <div className="flex flex-auto relative">
                            <div className="flex-col flex-auto">
                              <div className="flex-col">
                                <label
                                  htmlFor="gunlukButce"
                                  className="block text-xs md:text-xs lg:text-sm font-medium text-txtGrey"
                                >
                                  {initialBudget} (₺)
                                </label>
                                <Field
                                  type="number"
                                  name="gunlukButceMiktari"
                                  id="gunlukButceMiktari"
                                  placeholder="Her ürün için minimum 50₺"
                                  className={`w-full rounded-md border ${
                                    formik.touched.gunlukButceMiktari &&
                                    formik.errors.gunlukButceMiktari
                                      ? "border-b-red-500"
                                      : "border-[#e0e0e0]"
                                  } bg-white py-1 px-6 text-base font-medium text-txtGrey outline-none focus:border-lightGray focus:shadow-md`}
                                />
                              </div>
                              <div className="flex">
                                {formik.touched.gunlukButceMiktari &&
                                  formik.errors.gunlukButceMiktari && (
                                    <p className="mt-1 text-sm text-red-500">
                                      {formik.errors.gunlukButceMiktari}
                                    </p>
                                  )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {(selectedOption === "1" || selectedOption === "") && (
                <div className="lg:w-2/3">
                  <AdvertTypeInfo
                    img={"/img/cover.png"}
                    title={"Profil Reklamı"}
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

              {selectedOption === "2" && (
                <div className="lg:w-2/3">
                  <AdvertTypeInfo
                    img={"/img/cover2.png"}
                    title={"Gönderi Reklamı"}
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
                </div>
              )}
            </div>
          </Form>
        )}
      </Formik>
      <Senario
        initialSenario={initialSenario}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
};

export default AdvertInfo;
