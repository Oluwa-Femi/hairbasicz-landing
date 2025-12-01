import React from "react";
import AuthPicture from "../../assets/landingImg.jpg";
import { useLocation, Link } from "react-router-dom";
import Header from "../Header/Header";
const AuthWrapper = (props) => {
  const location = useLocation();
  const {
    children,
    title,
    subtitle,
    showBottomText,
    bottomText,
    bottomText2,
    link,
    rightText1,
    rightText2,
    showBtnAndCart,
  } = props;
  return (
    <div>
      <div>
        <Header
          rightText1={rightText1}
          rightText2={rightText2}
          link={link}
          showBtnAndCart={showBtnAndCart}
        />
      </div>
      <div className="flex h-screen w-screen bg-white">
        <img
          className={`lg:block xl:block 2xl:block relative h-full w-full lg:w-[50%] object-cover hidden`}
          src={AuthPicture}
          alt="Auth"
        />
        <div
          className={`h-full ${
            location.pathname == "/onboarding"
          } w-full bg-white md:flex lg:flex xl:flex 2xl:flex justify-center pt-[30px]`}
        >
          <div className="lg:justify-center xl:justify-center 2xl:justify-center pt-12 px-[50px] md:pt-4 md:pl-20 md:pr-20 xl:pl-32 2xl:pl-44 xl:pr-36 lg:max-w-[730px] w-full min-h-full flex flex-col mt-[21%] lg:mt-[0] xl:mt-[0] 2xl:mt-[0] bg-white">
            <h1 className="font-bold text-2xl">{title}</h1>
            <h4 className="font-normal text-[#5f6166] text-sm my-2">
              {subtitle}{" "}
            </h4>
            <div className="flex flex-col justify-between lg:max-w-[378px] xl:max-w-[378px] 2xl:max-w-[378px]">
              <div>{children}</div>
              {showBottomText && (
                <p className="text-center mt-[40px]">
                  <span className="text-sm font-medium text-[#9DA1A8]">
                    {bottomText}
                  </span>
                  <Link
                    to={link}
                    className="text-base font-semibold hover:text-[#2922b3] text-[#2922b3] cursor-pointer "
                  >
                    &nbsp; {bottomText2}
                  </Link>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthWrapper;
