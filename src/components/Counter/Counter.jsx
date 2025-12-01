import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import {
  editCart,
  getCart,
  removeProductFromCart
} from "../../store/Cart/cartActions";
import {
  assignRemoveCart2,
  productInCart,
  productInCartCounter
} from "../../utils/functions/CreateNewArray";
import { useDispatch } from "react-redux";
import Storage from "../../utils/services/storage";
import { Spinner } from "@chakra-ui/react";
import { useState } from "react";

const Counter = (props) => {
  const {
    count,
    id,
    carts,
    isLoadingEdit,
    userInstorage,
    ProductDetailsPage,
    shoppingCartPage,
    isEditing
  } = props;
  const dispatch = useDispatch();

  const localCart = JSON.parse(Storage.get("localCart"));
  const [isLoading, setIsLoading] = useState(false);

  const handleCounter = (type) => {
    setIsLoading(true);

    if (userInstorage()) {
      const cartItems = ProductDetailsPage
        ? productInCart(carts, id)
        : productInCartCounter(carts, id);
      const newArray = [];

      const newObj = {
        cart_id: cartItems?.reference,
        quantity: type === "increment" ? count + 1 : count - 1
      };
      newArray.push(newObj);
      const payload = {
        cartItems: newArray
      };

      if (count === 1 && type === "decrement") {
        const cartItems = assignRemoveCart2(carts, id);
        const payload = {
          cartItems: cartItems
        };
        dispatch(removeProductFromCart(payload)).then(function () {
          dispatch(getCart());
          setIsLoading(false);
        });
      } else {
        dispatch(editCart(payload)).then(function () {
          setIsLoading(false);

          ProductDetailsPage && dispatch(getCart());
        });
      }
    } else {
      const localCartItems = localCart?.carts?.data?.cart ?? [];

      const newObjIndex = localCartItems.findIndex((obj) =>
        ProductDetailsPage ? obj.reference === id : obj.id === id
      );

      localCartItems[newObjIndex].cart_quantity =
        type === "increment"
          ? localCartItems[newObjIndex]?.cart_quantity + 1
          : localCartItems[newObjIndex]?.cart_quantity - 1;

      if (count === 1 && type === "decrement") {
        dispatch(removeProductFromCart(id)).then(function () {
          dispatch(getCart());
          setIsLoading(false);
        });
      } else {
        dispatch(editCart(localCartItems)).then(function () {
          dispatch(getCart());
          setIsLoading(false);
        });
      }
    }
  };
  return (
    <div>
      <div className="flex items-center gap-[10px]">
        <button
          disabled={
            (isLoadingEdit && userInstorage()) ||
            (!count && userInstorage()) ||
            count === "-" ||
            (shoppingCartPage && count === 1)
          }
          className="w-[28px] h-[28px] border-[1px] border-solid border-[#868A90] grid place-items-center rounded-[6px] cursor-pointer"
          onClick={() => handleCounter("decrement")}
          type="button"
        >
          <FontAwesomeIcon
            className="text-[#868A90]  text-[10px]"
            icon={faMinus}
          />
        </button>
        <div className="w-[28px] h-[28px] grid place-items-center">
          {isLoading ? (
            <Spinner size="sm" />
          ) : (
            <p className="text-[14px]">{count}</p>
          )}
        </div>
        <button
          className="w-[28px] h-[28px] bg-black grid place-items-center rounded-[6px] cursor-pointer"
          disabled={
            (isLoadingEdit && userInstorage()) ||
            (!count && userInstorage()) ||
            count === "-"
          }
          onClick={() => handleCounter("increment")}
          type="button"
        >
          <FontAwesomeIcon className="text-white text-[10px]" icon={faPlus} />
        </button>
      </div>
    </div>
  );
};

export default Counter;
