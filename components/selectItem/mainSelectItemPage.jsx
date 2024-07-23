import React, { useState } from "react";
import ItemList from "./itemList";

function MainSelectItemPage({ initialValues, setInitialValueAdded, postList }) {
  const [initalvalueAdded, setInitalvalueAdded] = useState();

  const day = (date1, date2) => {
    //REKLAM SÜRESİNİ BULAN FONKSİYON
    const oneDay = 24 * 60 * 60 * 1000;
    const firstDate = new Date(date1);
    const secondDate = new Date(date2);
    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
    return diffDays;
  };
  console.log(initalvalueAdded);
  setInitialValueAdded(initalvalueAdded);

  return (
    <div className="w-full">
      {initialValues.reklamTipi === "2" && (
        <div className="w-full">
          <div className="headerArea py-5">
            <div className="border-b-2 border-gray-100 flex w-full px-5">
              <h1
                className={` cursor-pointer 
            border-premiumOrange border-b-2 text-premiumOrange font-semibold
           p-3 `}
              >
                Gönderi Listem
              </h1>
            </div>
          </div>
        </div>
      )}
      <ItemList
        amount={initialValues.gunlukButceMiktari}
        selectedMethod={initialValues.reklamTipi}
        time={day(initialValues.baslangicTarihi, initialValues.bitisTarihi)}
        postList={postList}
        initialValues={initialValues}
        setInitialValues={setInitalvalueAdded}
      />
    </div>
  );
}

export default MainSelectItemPage;
