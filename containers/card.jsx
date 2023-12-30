import React, { useState } from "react";
import { Link } from "react-router-dom";

function Card({
  image,
  name,
  status,
  category,
  starNumber,
  job,
  videoNumber,
  callNumber,
  language,
  skills,
  showedSkillsNumber,
  price,
  apointmentDate,
  commentNumber,
  minSessionTime,
}) {
  const [isHeartAnimating, setHeartAnimating] = useState(false);

  const heartAnimation = () => {
    setHeartAnimating(!isHeartAnimating);
  };

  const renderStars = () => {
    const stars = [];

    for (let i = 0; i < starNumber; i++) {
      // yıldız sayısı kadar yıl font u ekliyor
      stars.push(
        <i key={i} className="fa-solid fa-star text-blueOne text-center"></i>
      );
    }

    return stars;
  };

  return (
    <div>
      <div className="generalCard ml-[20px] bg-white border-2 w-80 text-center max-[768px]:mb-[40px] rounded-xl h-full justify-between flex flex-col px-4 py-2 min-w-xs max-w-md mx-auto">
        <div className="favAndShareArea ml-auto">
          <div className="favAndShareButtons">
            <button
              onClick={heartAnimation}
              className={`fav  text-xs ${
                isHeartAnimating ? "animating text-redOne" : "text-favShare"
              }`}
            >
              <i
                className={`fav text-xs ${
                  isHeartAnimating ? "fa-solid fa-heart" : "fa-regular fa-heart"
                }`}
              ></i>
            </button>
            <button className="share text-favShare text-sm ml-3">
              <i class="fa-solid fa-arrow-up-from-bracket"></i>
            </button>
          </div>
        </div>
        <div className="flex h-full flex-col justify-between">
          <div>
            <div className="relative imageArea w-full flex flex-col items-center justify-center">
              <span
                className={`absolute h-5 w-5 ${
                  status === 1 ? "bg-blueOne" : "bg-redOne"
                } rounded-full top-4 point right-[87px] border-white border-4`}
              ></span>
              <Link to={"/"}>
                <img
                  src={image}
                  className={`w-28 h-28 rounded-full ${
                    status !== undefined
                      ? `border-2 ${
                          status === 1 ? "border-blueOne" : "border-redOne"
                        }`
                      : ""
                  }`}
                  alt=""
                />
              </Link>
              {status !== undefined && (
                <span
                  className={`status bg-lightBlue ${
                    status === 1 ? "text-blueOne" : "text-redOne"
                  } px-3 py-1 rounded-2xl text-sm border-${
                    status === 1 ? "blueOne" : "redOne"
                  } border relative bottom-3.5`}
                >
                  {status === 1 ? "Çevrim içi" : "Meşgul"}
                </span>
              )}
            </div>
            <div className="starArea">{renderStars()}</div>
            <div className="commentArea">
              <h3 className="underline font-medium">{`${commentNumber}. Yorum`}</h3>
            </div>
            <div className="nameArea mt-1">
              <Link to={"/"}>
                <h3 className="text-center font-semibold">{name}</h3>
              </Link>
            </div>
            <div className="jobArea mt-2">
              <h4 className="text-center font-normal text-gray-600 text-sm">
                {job}
              </h4>
            </div>
            <div className="infoArea flex justify-center mt-2">
              <div className="videoCall ml-2">
                <i className="fa-solid fa-video text-infoIcon"></i>
                <span className="ml-2 font-normal text-xs mb-2">
                  {videoNumber}
                </span>
              </div>
              <div className="call ml-2">
                <i className="fa-solid fa-phone text-infoIcon"></i>
                <span className="ml-2 font-normal text-xs mb-1">
                  {callNumber}
                </span>
              </div>
              <div className="language ml-2">
                <i className="fa-solid fa-globe text-infoIcon"></i>
                <span className="ml-2 font-normal text-xs mb-1">
                  {language}
                </span>
              </div>
            </div>
            <div className="h-[128px]">
              <div className="skillsArea mt-2 flex flex-wrap justify-center text-sm h-auto">
                {skills.slice(0, showedSkillsNumber).map((skill, index) => (
                  <Link
                    className="  m-1 h-[24px]  my-1 rounded-full bg-skillsBg px-3 py-1 text-xs font-myBold text-themeBlack hover:border-transparent hover:bg-gray-200"
                    key={index}
                  >
                    {skill}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="viewProfileArea mt-1">
            <button className=" font-semibold border-b-2 p-2.5">
              Profili İncele<i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
        <div className="priceArea flex text-center justify-center m-3 mt-1">
          <h4 className="font-semibold text-lg">₺{price}/Seans</h4>
          <h4 className="ml-2 text-sm pt-1">
            {" "}
            {`(Minimum ${minSessionTime} dakika)`}
          </h4>
        </div>
        <div className="appointmentButtonArea">
          {status === 1 ? (
            <button className="bg-appointmentColor tracking-wider font-medium text-white w-72 py-2 rounded-3xl text-sm">
              Hemen Randevu Al
            </button>
          ) : (
            <button className="bg-appointmentColor font-medium tracking-wider text-white w-72 py-2 rounded-3xl text-sm">
              Randevu Al
            </button>
          )}
          <div className="flex justify-between">
            <button className="bg-grayButton text-white font-medium tracking-wider w-[8.6rem] py-2 rounded-3xl text-sm mt-2">
              Mesaj Gönder
            </button>
            <button className="bg-blueOne text-white font-medium tracking-wider w-[8.6rem] py-2 rounded-3xl text-sm mt-2">
              Takip Et
            </button>
          </div>
        </div>
        <div className="infoTextArea">
          {status !== undefined && (
            <h5
              className={`${
                status === 1 ? "text-greenText" : "text-redText"
              } text-xs font-medium mt-2`}
            >
              {status === 1
                ? `*${name} şuan musait, randevu al butonuna tıklayarak hemen hizmet alabilirsiniz.`
                : `*${name} şuan musait değil, en yakın seansı: ${apointmentDate}`}
            </h5>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
