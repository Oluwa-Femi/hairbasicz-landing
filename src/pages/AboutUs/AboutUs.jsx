import React from "react";
import Header from "../../components/Header/Header";
import StoreFooter from "../../components/Footer/StoreFooter";
import CEOImg from "../../assets/hairbasicz/Gallery/2.png";

const AboutUs = () => {
  return (
    <div>
      <Header store />
  <div className="px-[128px] pt-[96px] pb-[48px] xsm:px-4 sm:px-6">
        <h1 className="text-3xl font-[Gilroy-Bold] text-[#2F3133] mb-4">About Hairbasicz</h1>
        <p className="text-[#5F6166] max-w-3xl">
          Hairbasicz is a marketplace dedicated to providing high quality hair
          products and services to help you achieve healthy, beautiful hair.
          Our mission is to deliver trusted brands, expert advice, and
          exceptional customer experience across Nigeria and beyond.
        </p>

        <section className="mt-6">
          <h2 className="text-2xl font-[Gilroy-Bold] mb-2">Our Story</h2>
          <p className="text-[#5F6166] mb-2 max-w-3xl">
            Hairbasicz is a hair care line that focuses on producing plant-based
            herbal products that will nourish, grow and maintain the hair health
            of its users. It is formulated to address an array of the treatment
            needs of various hair types because we understand the individuality
            of hair — each hair type is unique and requires a specific type of
            care and treatment at a specific time.
          </p>
          <p className="text-[#5F6166] mb-2 max-w-3xl">
            We aim to have products that are tailored to various healthy hair
            needs but without the stress of sourcing for solutions elsewhere.
            We aim to deliver healthy hair care with ease because we believe
            that hair maintenance should never be stressful.
          </p>
          <p className="text-[#5F6166] max-w-3xl">
            We offer consultation services on how to develop a healthy hair care
            regimen and maintain good hair care practices at home for men,
            women and children.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-[Gilroy-Bold] mb-2">Our Values</h2>
          <ul className="list-disc pl-6 text-[#5F6166] max-w-3xl">
            <li>Quality: We curate trusted products.</li>
            <li>Community: We help customers grow and care for their hair.</li>
            <li>Integrity: Transparent pricing and reliable service.</li>
          </ul>
        </section>

        {/* CEO / Founder section */}
        <section className="mt-12">
          <div className="w-full bg-white shadow-md rounded-xl p-8 md:p-12 flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="flex-shrink-0">
              <img
                src={CEOImg}
                alt="Sharon Dan-Jack - CEO"
                className="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover ring-4 ring-white shadow-lg"
              />
              <div className="text-center mt-4">
                <p className="text-lg font-[Gilroy-Bold] text-[#2F3133]">Sharon Dan-Jack</p>
                <p className="text-sm text-[#8B8E92]">Founder & CEO</p>
              </div>
            </div>

            <div className="flex-1">
              <h3 className="text-2xl font-[Gilroy-Bold] text-[#2F3133] mb-2">Our Founder</h3>
              <p className="text-[#5F6166] mb-4">
                Sharon brings years of experience in natural haircare formulation and a
                passion for plant-based wellness. She leads product development with a
                hands-on approach — ensuring every formula is safe, effective and
                grounded in traditional herbal knowledge blended with modern science.
              </p>
              <p className="text-[#5F6166]">
                Under her leadership, Hairbasicz focuses on sustainable sourcing,
                education and accessible solutions so families can build consistent
                haircare routines that actually work.
              </p>
            </div>
          </div>
        </section>
      </div>
      <StoreFooter />
    </div>
  );
};

export default AboutUs;
