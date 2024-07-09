import React, { useState } from "react";
import { HoverInfo } from "../HoverInfo";
import Image from "next/image";

function CampaignMainSelectItemPage({
  initialValues,
  setInitialValueAddedProp,
  postList,
}) {
  const [initialValueAdded, setInitialValueAdded] = useState(
    initialValues || {}
  );
  const [quotaType, setQuotaType] = useState(
    initialValues?.quotaType || "unlimited"
  );
  const [quotaValue, setQuotaValue] = useState(initialValues?.quotaValue || "");

  const day = (date1, date2) => {
    // REKLAM SÜRESİNİ BULAN FONKSİYON
    const oneDay = 24 * 60 * 60 * 1000;
    const firstDate = new Date(date1);
    const secondDate = new Date(date2);
    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
    return diffDays;
  };

  const handleRadioChange = (e) => {
    const updatedValues = {
      ...initialValueAdded,
      audience: e.target.value,
    };
    setInitialValueAdded(updatedValues);
    setInitialValueAddedProp(updatedValues);
  };

  const handleQuotaTypeChange = (e) => {
    setQuotaType(e.target.value);
    if (e.target.value === "unlimited") {
      setQuotaValue("");
      updateValues("quotaValue", "");
    }
    updateValues("quotaType", e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (value >= 0) {
      updateValues(name, value);
    }
  };

  const handleQuotaValueChange = (e) => {
    const { value } = e.target;
    if (value >= 0) {
      setQuotaValue(value);
      updateValues("quotaValue", value);
    }
  };

  const updateValues = (name, value) => {
    const updatedValues = {
      ...initialValueAdded,
      [name]: value,
    };
    setInitialValueAdded(updatedValues);
    setInitialValueAddedProp(updatedValues);
  };

  console.log(initialValueAdded);

  return (
    <div className="w-full p-4">
      <h3 className="text-lg font-medium">İndirim Kriterini Belirleyin</h3>
      <div className="flex flex-col md:flex-row gap-4">
        <label
          htmlFor="everyone"
          className="flex flex-row items-center gap-2 font-medium text-base cursor-pointer"
        >
          <input
            type="radio"
            id="everyone"
            name="audience"
            value="everyone"
            checked={initialValueAdded?.audience === "everyone"}
            onChange={handleRadioChange}
          />
          <span>Herkes</span>
          <HoverInfo
            title="Herkes"
            description={`Tüm müşteriler için indirim uygular.`}
          />
        </label>
        <label
          htmlFor="firstAppointment"
          className="flex flex-row items-center gap-2 font-medium text-base cursor-pointer"
        >
          <input
            type="radio"
            id="firstAppointment"
            name="audience"
            value="firstAppointment"
            checked={initialValueAdded?.audience === "firstAppointment"}
            onChange={handleRadioChange}
          />
          <span>İlk Randevu</span>
          <HoverInfo
            title="İlk Randevu"
            description={`İlk randevu yapan müşteriler için indirim uygular. 
            İlk randevu tarihi ile kampanya tarihi arasındaki gün sayısına göre indirim uygular.`}
          />
        </label>
        <label
          htmlFor="secondAppointment"
          className="flex flex-row items-center gap-2 font-medium text-base cursor-pointer"
        >
          <input
            type="radio"
            id="secondAppointment"
            name="audience"
            value="secondAppointment"
            checked={initialValueAdded?.audience === "secondAppointment"}
            onChange={handleRadioChange}
          />
          <span>İkinci Randevu</span>
          <HoverInfo
            title="İkinci Randevu"
            description={`İkinci randevu yapan müşteriler için indirim uygular. 
            İlk randevu tarihi ile kampanya tarihi arasındaki gün sayısına göre indirim uygular.`}
          />
        </label>
      </div>
      <div className="flex flex-col md:flex-row gap-4 mt-4">
        <div className="md:w-[25%]">
          <label htmlFor="cartTotal" className="block font-medium text-base">
            Sepet Tutarı:
          </label>
          <input
            type="text"
            id="cartTotal"
            name="cartTotal"
            required
            value={initialValueAdded?.cartTotal || ""}
            onChange={handleInputChange}
            className="border p-2 rounded  w-full"
          />
        </div>
        <div className="md:w-[25%]">
          <label
            htmlFor="discountPercentage"
            className="block font-medium text-base"
          >
            İndirim Yüzdesi (fiyatı):
          </label>
          <input
            type="text"
            id="discountPercentage"
            name="discountPercentage"
            required
            value={initialValueAdded?.discountPercentage || ""}
            onChange={handleInputChange}
            className="border p-2 rounded  w-full"
          />
        </div>
        <div className="md:w-[25%]">
          <label className="block font-medium text-base">Katılım Limiti:</label>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="unlimited"
              className="flex flex-row items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                id="unlimited"
                name="quotaType"
                value="unlimited"
                checked={quotaType === "unlimited"}
                onChange={handleQuotaTypeChange}
              />
              <span>Sınırsız</span>
            </label>
            <label
              htmlFor="quota"
              className="flex flex-row items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                id="quota"
                name="quotaType"
                value="quota"
                required
                checked={quotaType === "quota"}
                onChange={handleQuotaTypeChange}
              />
              <span>Kota Ekle:</span>
              {quotaType === "quota" && (
                <input
                  type="text"
                  id="quotaValue"
                  name="quotaValue"
                  required
                  value={quotaValue}
                  onChange={handleQuotaValueChange}
                  className="border p-2 rounded"
                />
              )}
            </label>
          </div>
        </div>
      </div>
      <div>
        <Image
          src="/new_campaign.svg"
          alt="campaign"
          loading="lazy"
          width={500}
          height={1000}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover rounded-lg mt-4 "
        />
      </div>
    </div>
  );
}

export default CampaignMainSelectItemPage;
