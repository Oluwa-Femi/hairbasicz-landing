/**
 * @name: MessageContent
 * @description: Single message content component
 */

import PaysmosmoWallet from "../../assets/PaysmosmoWallet.svg";
import { Button, Spinner } from "@chakra-ui/react";
import { formatDate, formatDay } from "../../libs/fnDate/date.helper";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { querySingleOrder } from "../../libs/useQueries/notifications.queries";

const MessageContent = ({ selected, firstName }) => {

  const order_reference = selected?.meta?.order_reference;
  const { status, data } = querySingleOrder(order_reference || "");
  const orderLink = `/store/profile/order-history/${selected?.meta?.order_reference}/${data?.status}`

  return (
    <div className="px-[36px] pt-[25px] pb-[35px] border-solid border-b-[1px] border-[#EBEEF2] border-t bg-[#fff] cursor-pointer">
      <div>
        <div className="grid grid-cols-12 gap-2">
          <img src={PaysmosmoWallet} alt="wallet" />
          <div className="col-span-11">
            <div id="grid" className={`grid grid-cols-6 gap-2`}>
              <div className="content col-span-5">
                <h3
                  className={`text-[1em] text-[#1C1D1F] font-[Gilroy-Medium]`}
                >
                  {selected?.title}
                  {' '}
                </h3>
                <div className="my-4 text-[#47494D]">
                  <p
                    style={{ whiteSpace: "pre-line" }}
                    className={`mt-[4px] text-[14px] text-[#868A90]}`}
                  >
                    Dear {firstName},
                  </p>
                </div>
                <div className="my-4 text-[#47494D]">
                  <p
                    style={{ whiteSpace: "pre-line" }}
                    className={`mt-[4px] text-[14px] text-[#868A90]}`}
                  >
                    {selected?.body}
                  </p>
                  <div className="my-4">
                    <p className={`m{t-[4px] text-[14px] }`}>
                      Order Number: {selected?.meta?.order_no}
                    </p>

                    <p className={`mt-[4px] text-[14px] }`}>
                      Order Date: {formatDay(selected?.created_at)}
                    </p>

                    <p className={`mt-[4px] text-[14px] }`}>
                      Delivery Method :{" "}
                      {selected?.meta?.shipping_method?.map((each, index) => (
                        <span key={index}>{each}, </span>
                      ))}
                    </p>

                    <p className={`mt-[4px] text-[14px] }`}>
                      Delivery Address: {selected?.meta?.shipping_address}
                    </p>

                    <p className={`mt-[4px] text-[14px] }`}>
                      Tracking Number: {selected?.meta?.tracking_number}
                    </p>

                    <p className={`mt-[4px] text-[14px] `}>
                      You can track your order(s) by clicking on the link below:
                    </p>

                  </div>
                </div>
                <div id="footer">
                  <div>
                    <a
                      href={orderLink}
                    >
                      <Button
                        variant="outline"
                        w="100%"
                        p="3"
                        my="4"
                        colorScheme="green"
                      >
                        {status === 'loading' && <Spinner />}
                        {status === 'success' && (
                        <p className="font-[Gilroy-Medium]">
                          Track order
                          <ChevronRightIcon boxSize="1.2em" />
                        </p>
                        )}
                      </Button>
                    </a>
                  </div>
                  <p
                    style={{ whiteSpace: "pre-line" }}
                    className="mt-[4px] text-[14px] text-[#47494D]"
                  >
                    {selected?.meta?.footer_info}
                  </p>
                </div>
              </div>
              <div id="date">
                <div className="text-[#1C1D1F] text-[14px] text-right">
                  {formatDate(selected?.created_at)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageContent;
