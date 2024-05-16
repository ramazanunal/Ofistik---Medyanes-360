import React from "react";
import dynamic from "next/dynamic";
import Room from "@/components/LiveComponents/Room";

const LiveContainer = dynamic(() => import("@/components/LiveComponents"), {
  ssr: false,
});

function Page() {
  return <Room />;
}

export default Page;
