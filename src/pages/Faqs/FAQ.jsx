import React from "react";
import Header from "../../components/Header/Header";
import StoreFooter from "../../components/Footer/StoreFooter";

const FAQ = () => {
  const faqs = [
    {
      q: "How do I place an order?",
      a: "Browse products and click 'Add to cart', then proceed to checkout from your cart.",
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept card payments and Paystack options for the store.",
    },
    {
      q: "How do I track my order?",
      a: "After placing an order, visit your profile > order history to see status updates.",
    },
  ];

  return (
    <div>
      <Header store />
      <div className="px-[128px] py-[48px] xsm:px-4 sm:px-6">
        <h1 className="text-3xl font-[Gilroy-Bold] text-[#2F3133] mb-4">Frequently Asked Questions</h1>
        <div className="max-w-3xl">
          {faqs.map((f, i) => (
            <div key={i} className="mb-6">
              <h3 className="font-[Gilroy-Bold] text-lg mb-2">{f.q}</h3>
              <p className="text-[#5F6166]">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
      <StoreFooter />
    </div>
  );
};

export default FAQ;
