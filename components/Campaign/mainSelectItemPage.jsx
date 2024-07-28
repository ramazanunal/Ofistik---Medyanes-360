import React, { useState } from "react";

export const MainSelectItemPage = ({
  initialValues,
  setInitialValueAddedProp,
  postList,
}) => {
  const [initialValueAdded, setInitialValueAdded] = useState("");

  const handleRadioChange = (e) => {
    setInitialValueAdded(e.target.value);
    setInitialValueAddedProp(e.target.value);
  };

  return (
    <div className="w-full p-4">
      <h3 className="text-lg font-medium">İndirim Kriterini Belirleyin</h3>
      <div className="flex gap-4">
        <label htmlFor="everyone" className="space-x-2">
          <input
            type="radio"
            id="everyone"
            name="audience"
            value="everyone"
            checked={initialValueAdded === "everyone"}
            onChange={handleRadioChange}
          />
          <span>Herkes</span>
        </label>
        <label htmlFor="firstAppointment" className="space-x-2">
          <input
            type="radio"
            id="firstAppointment"
            name="audience"
            value="firstAppointment"
            checked={initialValueAdded === "firstAppointment"}
            onChange={handleRadioChange}
          />
          <span>İlk Randevu</span>
        </label>
        <label htmlFor="secondAppointment" className="space-x-2">
          <input
            type="radio"
            id="secondAppointment"
            name="audience"
            value="secondAppointment"
            checked={initialValueAdded === "secondAppointment"}
            onChange={handleRadioChange}
          />
          <span>İkinci Randevu</span>
        </label>
      </div>
    </div>
  );
};
