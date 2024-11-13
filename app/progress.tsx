"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

import React from "react";

export default function Progress() {
  return (
    <div>
      <ProgressBar
        height="4px"
        color="black"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </div>
  );
}
