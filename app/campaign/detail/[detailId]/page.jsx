"use client";
import React from "react";
import { useParams } from "next/navigation";

function Page() {
  const params = useParams();
  return <div>{params.detailId}</div>;
}

export default Page;
