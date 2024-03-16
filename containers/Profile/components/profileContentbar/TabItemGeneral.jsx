import React from "react";
import { PiStethoscopeFill } from "react-icons/pi";
import { FaUserGraduate } from "react-icons/fa";
import { LiaHospital } from "react-icons/lia";
import { LiaCertificateSolid } from "react-icons/lia";
import { GrLanguage } from "react-icons/gr";
import { TfiWrite } from "react-icons/tfi";
const TabItemsGeneral = () => {
  return (
    <div className="lg:h-[calc(100vh_-_200px)] w-full mx-auto lg:overflow-y-scroll top-0 bottom-0  flex flex-col gap-3 pt-5   ">
      <div className="flex items-center gap-2">
        <TfiWrite className="text-[11px] sm:text-sm telefon:text-lg md:text-[15px] text-premiumOrange" />
        <h1 className="text-[11px] sm:text-sm telefon:text-lg md:text-[15px] font-medium text-gray-700">
          Özgeçmiş
        </h1>
      </div>
      <div className="bg-white text-gray-600 p-5 rounded-md shadow-xl text-start text-[11px]">
        <p>
          Merhaba, Ben Minur Özçelik, 1997 tarihinde dünyaya geldim. Eğitim
          hayatıma [Mezun Olduğunuz Okul/Üniversite] okulunda başladım ve
          [Öğrenim Gördüğünüz Bölüm] bölümünden [Mezuniyet Yılınız] yılında
          mezun oldum. İş hayatına adımımı attığım ilk deneyimim, [Şirket İsmi]
          şirketinde [Çalıştığınız Pozisyon] pozisyonunda çalıştığım [İşe
          Başlama Tarihi] tarihine dayanıyor. Bu süre zarfında, [Yaptığınız
          İşler ve Elde Ettiğiniz Başarılar] gibi çeşitli sorumlulukları
          başarıyla yerine getirdim. Yeteneklerim arasında gibi konular
          bulunmaktadır. Ayrıca, [Referansın Adı Soyadı] gibi alanında uzman
          referanslarım bulunmaktadır. [Referansın İletişim Bilgisi] üzerinden
          ulaşabilirsiniz. Proje deneyimlerim arasında öne çıkan bir örnek,
          [Projenin Adı] adlı projede yer aldım. Bu projede [Proje Hakkında Kısa
          Bir Açıklama] gibi önemli bir rol oynadım ve [Proje Gerçekleştirme
          Tarihi] tarihinde başarıyla tamamlandı. Hobilerim arasında kitap
          okumak gezmek, kitap okumak gezmek, gibi ilgi alanları bulunmaktadır.
          Ayrıca, [Aldığınız Ödül veya Başarılar] gibi çeşitli ödüller ve
          başarılar da elde ettim. İletişim kurmak için benimle e-posta adresi
          veya telefon numarası üzerinden iletişime geçebilirsiniz. Ayrıca,
          LinkedIn profilime [LinkedIn Profil Bağlantınız] ve GitHub profilime
          [GitHub Profil Bağlantınız] üzerinden ulaşabilirsiniz. Teşekkür
          ederim. Saygılarımla, Minur Özçelik
        </p>
      </div>
      <div className="flex items-center gap-2 mt-5">
        <FaUserGraduate className="text-[11px] sm:text-sm telefon:text-lg md:text-[15px] text-premiumOrange" />
        <h1 className="text-[11px] sm:text-sm telefon:text-lg md:text-[15px] font-medium text-gray-700">
          Eğitim Bilgileri
        </h1>
      </div>
      <div className="bg-white p-5 rounded-md shadow-lg text-gray-800">
        <ul className="w-full flex flex-col gap-3 items-start text-[11px]">
          <li className="w-full flex items-center justify-between border-b pb-3">
            <h1>Okan Üniversitesi</h1>
            <h1>2018</h1>
          </li>
          <li className="w-full flex items-center justify-between">
            <h1 className="">İstanbul Bilgi Üniversitesi</h1>
            <h1>2019</h1>
          </li>
        </ul>
      </div>
      <div className="flex items-center gap-2 mt-5">
        <LiaCertificateSolid className="text-[11px] sm:text-sm telefon:text-lg md:text-[15px] font-medium text-premiumOrange" />
        <h1 className="text-[11px] sm:text-sm telefon:text-lg md:text-[15px] font-medium text-gray-700">
          Sertifikalar
        </h1>
      </div>
      <div className="bg-white p-5 rounded-md shadow-lg text-gray-800">
        <ul className="w-full flex flex-col gap-3 items-start text-[11px]">
          <li className="w-full flex items-center justify-between border-b pb-3">
            <h1>Moder Toplumlar Stres Oryantasyonu</h1>
            <h1>2018</h1>
          </li>
          <li className="w-full flex items-center justify-between">
            <h1 className="">Anadolu Coğrafyasındaki Piskolojik Çözünmeler</h1>
            <h1>2019</h1>
          </li>
        </ul>
      </div>
      <div className="flex items-center gap-2 mt-5">
        <PiStethoscopeFill className="text-[11px] sm:text-sm telefon:text-lg md:text-[15px] font-medium text-premiumOrange" />
        <h1 className="text-[11px] sm:text-sm telefon:text-lg md:text-[15px] font-medium text-gray-700">
          Hizmet Alanı
        </h1>
      </div>
      <div className="bg-white p-5 rounded-md shadow-xl text-gray-800">
        <ul className="flex flex-col gap-[10px] items-start text-[11px]">
          <li>Kaygi -Panik Atak</li>
          <li>Baglanma Sorunlari-Bas etme becerileri</li>
          <li className="text-start">
            Fobiler-Sosyal kaygi -Özgüven problemleri-Saglik kaygisi-Uyku
            bozuklugu
          </li>
          <li>Depresyon,Bagimlilik -Stres-Öfke Kontrolü</li>
          <li>Obsesif Kompulsif Bozukluk-Ebeveynlik</li>
          <li>Iliski problemleri-Degersizlik-Kendini tanima</li>
          <li>Kaygi -Panik Atak</li>
          <li>Baglanma Sorunlari-Bas etme becerileri</li>
          <li className="text-start">
            Fobiler-Sosyal kaygi -Özgüven problemleri-Saglik kaygisi-Uyku
            bozuklugu
          </li>
          <li>Depresyon,Bagimlilik -Stres-Öfke Kontrolü</li>
          <li>Obsesif Kompulsif Bozukluk-Ebeveynlik</li>
          <li>Iliski problemleri-Degersizlik-Kendini tanima</li>
          <li>Kaygi -Panik Atak</li>
          <li>Baglanma Sorunlari-Bas etme becerileri</li>
        </ul>
      </div>
      <div className="flex items-center gap-2 mt-5">
        <GrLanguage className="text-[11px] sm:text-sm telefon:text-lg md:text-[15px] font-medium text-premiumOrange" />
        <h1 className="text-[11px] sm:text-sm telefon:text-lg md:text-[15px] font-medium text-gray-700">
          Diller
        </h1>
      </div>
      <div className="bg-white p-5 rounded-md shadow-xl text-gray-800">
        <ul className="w-full flex flex-col gap-3 items-start text-[11px]">
          <li className="w-full flex items-center justify-between border-b pb-3">
            <h1>Türkçe</h1>
            <h1>C2</h1>
          </li>
          <li className="w-full flex items-center justify-between border-b pb-3">
            <h1>İngilizce</h1>
            <h1>C2</h1>
          </li>
          <li className="w-full flex items-center justify-between border-b pb-3">
            <h1>Almanca</h1>
            <h1>C1</h1>
          </li>
          <li className="w-full flex items-center justify-between border-b pb-3">
            <h1>Arapça</h1>
            <h1>C1</h1>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TabItemsGeneral;
