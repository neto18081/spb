/* eslint-disable @next/next/no-img-element */

import React from "react";

export default function Loading() {
  return (
    <div className="tw-mt-[-200px] tw-w-screen tw-h-screen tw-flex tw-items-center tw-justify-center">
      <img src="/loading.gif" alt="Carregando" />
    </div>
  );
}
