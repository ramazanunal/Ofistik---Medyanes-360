import React from "react";
import GeneralInfosForSocial from "./generalInfosForSocial";
import SocialArea from "./socialArea";

function SocialPageComponent() {
  return (
    <div className="bg-gray-200 h-full">
      <GeneralInfosForSocial />
      <SocialArea />
    </div>
  );
}

export default SocialPageComponent;
