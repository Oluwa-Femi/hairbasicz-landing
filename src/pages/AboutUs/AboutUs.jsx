import React from "react";
import Header from "../../components/Header/Header";
import StoreFooter from "../../components/Footer/StoreFooter";

const AboutUs = () => {
  return (
    <div>
      <Header store />
      <div className="px-[128px] py-[48px] xsm:px-4 sm:px-6">
        <h1 className="text-3xl font-[Gilroy-Bold] text-[#2F3133] mb-4">About Hairbasicz</h1>
        <p className="text-[#5F6166] max-w-3xl">
          Hairbasicz is a marketplace dedicated to providing high quality hair
          products and services to help you achieve healthy, beautiful hair.
          Our mission is to deliver trusted brands, expert advice, and
          exceptional customer experience across Nigeria and beyond.
        </p>
        <section className="mt-8 max-w-3xl">
          <h2 className="text-2xl font-[Gilroy-Bold] mb-2">Our Values</h2>
          <ul className="list-disc pl-6 text-[#5F6166]">
            <li>Quality: We curate trusted products.</li>
            <li>Community: We help customers grow and care for their hair.</li>
            <li>Integrity: Transparent pricing and reliable service.</li>
          </ul>
        </section>
      </div>
      <StoreFooter />
    </div>
  );
};

export default AboutUs;
