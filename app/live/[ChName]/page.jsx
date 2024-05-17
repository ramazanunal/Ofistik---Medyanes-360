import React from "react";
import dynamic from "next/dynamic";

const RoomContainer = dynamic(
  () => import("@/components/LiveComponents/Room"),
  {
    ssr: false,
  }
);

function Page() {
  return <RoomContainer />;
}

export default Page;
