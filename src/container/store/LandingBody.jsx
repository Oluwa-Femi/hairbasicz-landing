import React from "react";
import { Button } from "../../components/Button/Button";
import ShoppingBag from "../../assets/gif/shoppingBag.gif";
import ShoppingBike from "../../assets/gif/shoppingBike.gif";
import { useNavigate } from "react-router-dom";
import styles from "./store.module.css";

const LandingBody = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.landingBodyBG}>
      <div className={styles.landingBodyWrapper}>
        <p className={styles.landingBodyLabel}>Hairbasicz</p>
        <p className={styles.landingBodyDescription1}>
          Shop with us at Hairbasicz today. Let's grow your hair together.
        </p>
        <p className={styles.landingBodyDescription2}>
          Explore our products today for a lifetime experience
        </p>
        <Button
          width={"w-[115px]"}
          height={"h-[48px]"}
          borderRadius={"rounded-[8px]"}
          backgroundColor={"bg-[#2922b3]"}
          fontSize={"text-[16px]"}
          fontWeight={"font-[600]"}
          label="Shop now"
          color={"text-white"}
          onClick={() => window.open("https://paystack.shop/hairbasicz-nigeria", "_blank", "noopener,noreferrer")}
        />{" "}
        <div>
          <div className={styles.shoppingBagWrapper}>
            <img
              className="w-[116px] h-[116px] xsm:invisible sm:invisible"
              src={ShoppingBag}
              alt="shopping-bag"
            />
          </div>
          <div className={styles.shoppingBike}>
            <img
              className="w-[116px] h-[116px]  absolute"
              src={ShoppingBike}
              alt="shopping-bike"
            />{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingBody;
