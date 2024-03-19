import React from "react";
import { maskedFullName } from "@/lib/utilities/maskedFullName";
//Components
import Rating from "@/components/Rating";
//Icons
import { RiTodoLine } from "react-icons/ri";
import { FaCalendar } from "react-icons/fa";

const reviews = [
  {
    name: "Turan",
    surname: "Kaya",
    avatarSrc: "https://flowbite.com/docs/images/people/profile-picture-2.jpg",
    date: "Feb. 8, 2022",
    rating: "4.95",
    comment:
      "Very straight-to-point article. Really worth time reading. Thank you! But tools are just the instruments for the UX designers. The knowledge of the design tools is as important as the creation of the design strategy.",
  },
  // Add more review objects as needed
];

const TabsItemEvaluations = () => {
  return (
    <>
      <section className="md:h-[calc(100vh_-_200px)] md:overflow-y-auto pt-2 px-2">
        <div className="flex items-center gap-2  pb-5 mt-3 ">
          <RiTodoLine size={25} className="text-premiumOrange" />
          <h1 className="text-[15px] font-medium text-gray-600">
            Değerlendirmeler ({reviews.length})
          </h1>
        </div>
        <div className="bg-white max-w-full mx-auto py-5 px-3 rounded-lg">
          <>
            {reviews.map((review, index) => (
              <article
                key={index}
                className="p-1 sm:p-6 text-xs bg-white border-b"
              >
                <div className="flex items-center justify-start border-b gap-2 pb-10">
                  <div className="text-xl text-white bg-premiumOrange p-5 rounded-md">
                    {review.rating}
                  </div>
                  <div className="flex flex-col items-start gap-1">
                    <Rating size={20} />
                    <h1 className="font-semibold text-gray-800">Genel Puan</h1>
                    <h1 className="text-gray-800">{`${review.comment.length} oy`}</h1>
                  </div>
                </div>
                <div className="flex justify-between items-start mt-5 mb-2">
                  <div className="flex flex-col justify-center items-center">
                    <div className="flex items-start">
                      <img
                        className="mr-2 w-6 h-6 rounded-md"
                        src={review.avatarSrc}
                        alt={review.name}
                      />
                      <div className="flex flex-col items-start gap-1 mt-1 text-sm text-gray-800">
                        <h1 className="flex items-center gap-1">
                          {maskedFullName(review.name)}{" "}
                          {maskedFullName(review.surname)}
                        </h1>
                        <div className="flex items-center gap-2 text-xs">
                          <FaCalendar className="text-premiumOrange" />
                          <h1 className="text-gray-800 text-[10px]">
                            {review.date}
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-gray-800 ">
                    <h1>Puan:</h1>
                    <Rating size={10} color="gabiGreen" />
                    <p className="text-xs text-gray-800 ">{review.rating}</p>
                  </div>
                </div>
                <p className="text-sm text-start pl-8 text-gray-800 ">
                  {review.comment}
                </p>
              </article>
            ))}
          </>
        </div>
      </section>
    </>
  );
};

export default TabsItemEvaluations;