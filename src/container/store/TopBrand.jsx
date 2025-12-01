// import React, { useEffect } from "react";
// import ArrowIcon from "../../assets/Iconly.svg";
// import styles from "./store.module.css";

// const TopBrand = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const AllBrands = useSelector(selectBrands);
//   const FirstNineBrands = AllBrands?.data?.data?.brands?.slice(0, 9);

//   useEffect(() => {
//     dispatch(getAllBrands({ page: 1, limit: 1000 }));
//   }, []);
//   return (
//     <div className={styles.topBrandWrapper}>
//       <div className={styles.topBrandTextWrapper}>
//         <h1 className={styles.topBrandTitle}>
//           Best hair product deals all in one marketplace
//         </h1>
//         <p className={styles.topBrandDescription}>
//           Our products are responsible for the stories behind each captured moment.
//         </p>
//         <p
//           aria-hidden
//           className={styles.shopNow}
//           onClick={() => navigate("/store")}
//         >
//           Shop now{" "}
//           <span>
//             <img src={ArrowIcon} alt="arrow-icon" />
//           </span>
//         </p>
//       </div>
//       <div className="w-[50%] xsm:w-full sm:w-full">
//         <div className={styles.topBrandImageBG}>
//           <div className={styles.topBrandImageWrapper}>
//             {FirstNineBrands?.map((item, index) => (
//               <div className="store-top-brands rounded-[12px] bg-white" key={index}>
//                 <img
//                   src={item.image}
//                   alt="top-brand-icon"
//                   className={styles.brandImage}
//                 /> 
//               </div>
//             ))}
//           </div>{" "}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TopBrand;


import React from "react";
import ArrowIcon from "../../assets/Iconly.svg";
import styles from "./store.module.css";
import IMAGE1 from "../../assets/hairbasicz/Gallery/1.JPG";
import IMAGE2 from "../../assets/hairbasicz/Gallery/2.PNG";
import IMAGE3 from "../../assets/hairbasicz/Gallery/3.jpg";
import IMAGE4 from "../../assets/hairbasicz/Gallery/4.jpg";
import IMAGE5 from "../../assets/hairbasicz/Gallery/5.JPG";
import IMAGE6 from "../../assets/hairbasicz/Gallery/6.JPG";
import IMAGE7 from "../../assets/hairbasicz/Gallery/7.JPG";
import IMAGE8 from "../../assets/hairbasicz/Gallery/8.jpg";
import IMAGE9 from "../../assets/hairbasicz/Gallery/9.JPG";

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
        <p
          aria-hidden
          className={styles.shopNow}
          onClick={() => window.open("https://paystack.shop/hairbasicz-nigeria", "_blank", "noopener,noreferrer")}
        >
          Shop now{" "}
          <span>
            <img src={ArrowIcon} alt="arrow-icon" />
          </span>
        </p>
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
