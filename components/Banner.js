export default function Banner({ banner }) {
  return (
    <div>
      <div className="tw-w-screen tw-h-screen tw-bg-[url('/home-banner.png')] tw-bg-center tw-bg-no-repeat tw-bg-right lg:tw-bg-contain tw-flex tw-items-center tw-pt-[200px]">
        <span
          className={`tw-absolute tw-top-[80px] tw-left-[20px] sm:tw-left-[110px] tw-leading-[110%] tw-text-[22px] tw-font-bold ${
            banner.title == "white" ? "tw-text-white" : "tw-text-black"
          }`}
        >
          Sistema <br /> para Ecommerce
        </span>
        <div className="tw-px-[20px] sm:tw-pl-[120px] xl:tw-pl-[10%] tw-w-full tw-bg-[rgba(238,238,238,.3)]">
          <div className="tw-w-full tw-max-w-[600px]">
            <h1 className="title">
              Urban <br /> Collection
            </h1>
            <p className="text">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry standard dummy text
              ever since the 1500s,
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
