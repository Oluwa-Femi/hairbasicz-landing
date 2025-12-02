import React from "react";
import ArrowIcon from "../../assets/Iconly.svg";
import styles from "./store.module.css";
import IMAGE1 from "../../assets/hairbasicz/Gallery/1.jpg";
import IMAGE2 from "../../assets/hairbasicz/Gallery/2.png";
import IMAGE3 from "../../assets/hairbasicz/Gallery/3.jpg";
import IMAGE4 from "../../assets/hairbasicz/Gallery/4.jpg";
import IMAGE5 from "../../assets/hairbasicz/Gallery/5.jpg";
import IMAGE6 from "../../assets/hairbasicz/Gallery/6.jpg";
import IMAGE7 from "../../assets/hairbasicz/Gallery/7.jpg";
import IMAGE8 from "../../assets/hairbasicz/Gallery/8.jpg";
import IMAGE9 from "../../assets/hairbasicz/Gallery/9.jpg";

const mockBrandsData = [
  { id: 1, image: IMAGE1 },
  { id: 2, image: IMAGE2 },
  { id: 3, image: IMAGE3 },
  { id: 4, image: IMAGE4 },
  { id: 5, image: IMAGE5 },
  { id: 6, image: IMAGE6 },
  { id: 7, image: IMAGE7 },
  { id: 8, image: IMAGE8 },
  { id: 9, image: IMAGE9 },
];

const TopBrand = () => {
  const FirstNineBrands = mockBrandsData;

  return (
    <div className={styles.topBrandWrapper}>
      <div className={styles.topBrandTextWrapper}>
        <h1 className={styles.topBrandTitle}>
          Best hair product deals all in one marketplace
        </h1>
        <p className={styles.topBrandDescription}>
          Our products are responsible for the stories behind each captured moment.
        </p>
        <div className="flex items-center gap-4 pt-[32px]">
          <p
            aria-hidden
            className={styles.shopNow}
            onClick={() => window.open("https://paystack.shop/hairbasicz-nigeria", "_blank", "noopener,noreferrer")}
          >
            Shop in Nigeria
            <span>
              <img src={ArrowIcon} alt="arrow-icon" />
            </span>
          </p>

          <p
            aria-hidden
            className={styles.shopNow}
            onClick={() => window.open("https://paystack.shop/hairbasicz-international", "_blank", "noopener,noreferrer")}
          >
            Shop internationally
          </p>
        </div>
      </div>
      <div className="w-[50%] xsm:w-full sm:w-full">
        <div className={styles.topBrandImageBG}>
          <div className={styles.topBrandImageWrapper}>
            {FirstNineBrands.map((item, index) => (
              <div className="store-top-brands rounded-[12px] bg-white" key={index}>
                <img
                  src={item.image}
                  alt={`top-brand-icon-${index}`}
                  className={styles.brandImage}
                /> 
              </div>
            ))}
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default TopBrand;
