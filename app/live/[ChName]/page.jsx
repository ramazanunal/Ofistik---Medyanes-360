import React from "react";
import dynamic from "next/dynamic";
import Room from "@/components/LiveComponents/Room";

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
