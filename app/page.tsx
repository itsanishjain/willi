"use client";
import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    const dbOpenRequest = window.indexedDB.open("WALLET_CONNECT_V2_INDEXED_DB");
    console.log(dbOpenRequest);
  }, []);

  return <div className="flex h-screen"></div>;
}
