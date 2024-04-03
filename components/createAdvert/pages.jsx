"use client"

function Pages({ active, complated }) {
  return (
    <div className=" lg:w-80 lg:h-[520px] p-8 border-b-2 lg:border-r-2 lg:border-b-0 border-gray-100 flex lg:block">
      <div className="firstOne lg:flex md:text-[1.4vw] lg:text-[1.2vw] xl:text-[0.95vw] text-sm animate__animated animate__zoomIn">
        {complated[0] === true && (
          <span
            className={`xl:w-[2.5vw] xl:h-[2.5vw] lg:w-[3.2vw] lg:h-[3.2vw] md:w-[3.7vw] mx-auto lg:mx-0 md:h-[3.7vw] w-[8.8vw] h-[8.8vw] border-2 text-greenForButton border-greenForButton lg:mr-3 rounded-full text-center font-semibold flex items-center justify-center transition-all duration-500`}
          >
            <i class="fa-solid fa-check"></i>
          </span>
        )}{" "}
        {complated[0] === false && (
          <span
            className={`xl:w-[2.5vw] xl:h-[2.5vw] lg:w-[3.2vw] lg:h-[3.2vw] md:w-[3.7vw] mx-auto lg:mx-0 md:h-[3.7vw] w-[8.8vw] h-[8.8vw] ${
              active === 1
                ? "bg-premiumOrange  text-white"
                : "bg-white border-2 border-gray-400 text-gray-400"
            } lg:mr-3 rounded-full text-center font-semibold flex items-center justify-center transition-all duration-500`}
          >
            1
          </span>
        )}
        <h1
          className={`font-semibold flex text-center items-center justify-center ${
            active === 1
              ? " text-premiumOrange"
              : complated[0]
              ? "text-greenForButton"
              : " text-gray-400"
          } transition-all duration-500`}
        >
          Reklam Bilgileri
        </h1>
      </div>
      <div className="flex lg:items-center pt-3 pr-3 lg:pt-0 lg:pr-0 lg:justify-start lg:ml-6 my-2 animate__animated animate__zoomIn">
        <span className="lg:w-[2px] lg:h-[5vw] w-[15vw] h-[2px] bg-gray-300"></span>
      </div>
      <div className="secondOne lg:flex md:text-[1.4vw] lg:text-[1.2vw] xl:text-[0.95vw] text-sm animate__animated animate__zoomIn">
        {complated[1] === true && (
          <span
            className={`xl:w-[2.5vw] xl:h-[2.5vw] lg:w-[3.2vw] lg:h-[3.2vw] md:w-[3.7vw] mx-auto lg:mx-0 md:h-[3.7vw] w-[8.8vw] h-[8.8vw] border-2 text-greenForButton border-greenForButton lg:mr-3 rounded-full text-center font-semibold flex items-center justify-center transition-all duration-500`}
          >
            <i class="fa-solid fa-check"></i>
          </span>
        )}{" "}
        {complated[1] === false && (
          <span
            className={`xl:w-[2.5vw] xl:h-[2.5vw] lg:w-[3.2vw] lg:h-[3.2vw] md:w-[3.7vw] mx-auto lg:mx-0 md:h-[3.7vw] w-[8.8vw] h-[8.8vw] ${
              active === 2
                ? "bg-premiumOrange  text-white"
                : "bg-white border-2 border-gray-400 text-gray-400"
            } lg:mr-3 rounded-full text-center font-semibold flex items-center justify-center transition-all duration-500`}
          >
            2
          </span>
        )}
        <h1
          className={`font-semibold flex text-center items-center justify-center ${
            active === 2
              ? " text-premiumOrange"
              : complated[1]
              ? "text-greenForButton"
              : " text-gray-400"
          } transition-all duration-500`}
        >
          İçerik Seçimi
        </h1>
      </div>
      <div className="flex lg:items-center lg:justify-start pt-3 pr-3 lg:pt-0 lg:pr-0 lg:ml-6 my-2 animate__animated animate__zoomIn">
        <span className="lg:w-[2px] lg:h-[5vw] w-[15vw] h-[2px] bg-gray-300"></span>
      </div>
      <div className="thirdOne lg:flex md:text-[1.4vw] lg:text-[1.2vw] xl:text-[0.95vw] text-sm animate__animated animate__zoomIn">
        {complated[2] === true && (
          <span
            className={`xl:w-[2.5vw] xl:h-[2.5vw] lg:w-[3.2vw] lg:h-[3.2vw] md:w-[3.7vw] mx-auto lg:mx-0 md:h-[3.7vw] w-[8.8vw] h-[8.8vw] border-2 text-greenForButton border-greenForButton lg:mr-3 rounded-full text-center font-semibold flex items-center justify-center transition-all duration-500`}
          >
            <i class="fa-solid fa-check"></i>
          </span>
        )}{" "}
        {complated[2] === false && (
          <span
            className={`xl:w-[2.5vw] xl:h-[2.5vw] lg:w-[3.2vw] lg:h-[3.2vw] md:w-[3.7vw] mx-auto lg:mx-0 md:h-[3.7vw] w-[8.8vw] h-[8.8vw] ${
              active === 3
                ? "bg-premiumOrange  text-white"
                : "bg-white border-2 border-gray-400 text-gray-400"
            } lg:mr-3 rounded-full text-center font-semibold flex items-center justify-center transition-all duration-500`}
          >
            3
          </span>
        )}
        <h1
          className={`font-semibold flex text-center items-center justify-center ${
            active === 3
              ? " text-premiumOrange"
              : complated[2]
              ? "text-greenForButton"
              : " text-gray-400"
          } transition-all duration-500`}
        >
          Onay
        </h1>
      </div>
    </div>
  );
}

export default Pages;
