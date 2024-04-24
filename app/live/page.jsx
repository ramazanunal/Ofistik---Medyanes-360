import React from "react";
import dynamic from "next/dynamic";

const LiveContainer = dynamic(() => import("@/components/LiveComponents"), {
  ssr: false,
});

function Page() {
  return <LiveContainer />;
}

export default Page;
