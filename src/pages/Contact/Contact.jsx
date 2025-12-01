import React from "react";
import Header from "../../components/Header/Header";
import StoreFooter from "../../components/Footer/StoreFooter";

const Contact = () => {
  return (
    <div>
      <Header store />
      <div className="px-[128px] py-[48px] xsm:px-4 sm:px-6">
        <h1 className="text-3xl font-[Gilroy-Bold] text-[#2F3133] mb-4">Contact Us</h1>
        <p className="text-[#5F6166] mb-6">
          We'd love to hear from you. Use the form below or reach out via email at
          <span className="font-[Gilroy-Bold]"> support@hairbasicz.com</span>.
        </p>

        <div className="max-w-2xl">
          <label className="block mb-2">Name</label>
          <input className="w-full p-3 border border-gray-300 rounded mb-4" />

          <label className="block mb-2">Email</label>
          <input className="w-full p-3 border border-gray-300 rounded mb-4" />

          <label className="block mb-2">Message</label>
          <textarea className="w-full p-3 border border-gray-300 rounded mb-4 h-40" />

          <button className="bg-[#2922b3] text-white px-6 py-3 rounded">Send Message</button>
        </div>
      </div>
      <StoreFooter />
    </div>
  );
};

export default Contact;
