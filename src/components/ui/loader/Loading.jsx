"use client";
import Loader from "react-js-loader";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50">
      <Loader type="bubble-top" bgColor={"#ffffff"} color={"#ffffff"} size={100} />
    </div>
  );
}
