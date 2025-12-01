/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from "react";
import { Button, Spinner } from "@chakra-ui/react";
import Input from "../Input/Input";
import { Field, Form, Formik } from "formik";
import { AddBankAccountSchema } from "../../utils/validation/SettingsValidations";
import {
  PatchBank,
  PostBank,
  PostBankEnquiry,
} from "../../utils/services/queries/settings.queries";
import responseHandler from "../../utils/notifications/responseHandler";
import ReactSelect from "../Select/ReactSelect";
import { QueryBanks } from "../../libs/useQueries/profile.queries";
import { useQueryClient } from "react-query";
import bankIcon from "../../assets/bankIcon.png";

const BankAccountForm = ({ setIsOpen, isUpdate, currentData }) => {
  const { status: bankStatus, data: banks } = QueryBanks();
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState({
    value: banks?.find((each) => each?.name === currentData?.bank)?.code,
    label: currentData?.bank,
  });
  const [isError, setIsError] = useState();
  const [bankDetails, setBankDetails] = useState();
  const queryClient = useQueryClient();

  const handleBVN = (values) => {
    setIsError(false);
    const data = {
      accountNumber: values?.accountNumber,
      bankCode:
        selected?.value ||
        banks?.find((each) => each?.name === currentData?.bank)?.code,
    };
    setIsLoading(true);
    PostBankEnquiry(data)
      .then((res) => {
        setBankDetails(res?.data?.data);
      })
      .catch((err) => {
        responseHandler(err);
        setIsError(true);
      })
      .finally(() => setIsLoading(false));
  };

  const handleReset = () => {
    setSelected();
    setIsError();
    setBankDetails();
  };

  const handleAddBank = () => {
    const data = {
      bank: selected?.label,
      bankCode: bankDetails?.bankCode,
      accountNumber: bankDetails?.accountNumber,
      accountName: bankDetails?.accountName,
    };
    setIsLoading(true);
    if (!isUpdate) {
      PostBank(data)
        .then((res) => {
          responseHandler(res);
          setIsOpen(false);
          queryClient.invalidateQueries(["Profile"]);
        })
        .catch((err) => {
          responseHandler(err);
          setIsError(true);
        })
        .finally(() => setIsLoading(false));
    }

    if (isUpdate) {
      PatchBank(data)
        .then((res) => {
          responseHandler(res);
          setIsOpen(false);
          queryClient.invalidateQueries(["Profile"]);
        })
        .catch((err) => {
          responseHandler(err);
          setIsError(true);
        })
        .finally(() => setIsLoading(false));
    }
  };

  if (bankStatus === "loading")
    return (
      <div className="flex justify-center">
        {" "}
        <Spinner />{" "}
      </div>
    );

  return (
    <div>
      {!bankDetails && !isError && (
        <Formik
          onSubmit={(values) => handleBVN(values)}
          validationSchema={AddBankAccountSchema}
          initialValues={currentData || {}}
        >
          {({ dirty, isValid, errors, touched }) => (
            <Form>
              <Field
                name={"accountNumber"}
                placeholder={"Enter your account number"}
                title={"Account Number"}
                component={Input}
                errorMessage={touched.accountNumber && errors.accountNumber}
              />
              <div className="w-[100%]">
                <div className="w-[100%]">
                  <ReactSelect
                    label="Bank Account"
                    name={"bank"}
                    defaultValue={selected}
                    options={banks?.map((each) => ({
                      value: each?.bankCode,
                      label: each?.name,
                    }))}
                    value={selected?.name}
                    onChange={(e) => {
                      setSelected(e);
                    }}
                  />{" "}
                </div>
              </div>

              <Button
                className="font-[Gilroy-Bold] mt-6"
                isDisabled={!dirty || !isValid || isLoading || !selected?.value}
                isLoading={isLoading}
                type="submit"
                width="100%"
                colorScheme="green"
              >
                Next
              </Button>
            </Form>
          )}
        </Formik>
      )}

      {bankDetails && !isError && (
        <div id="success" className="text-center flex justify-center flex-col">
          <img className="w-[4em] m-auto my-3" src={bankIcon} alt="bankIcon" />
          <h2 className="font-[Gilroy-Medium] text-[#2F3133]">
            {bankDetails?.account_name}
          </h2>
          <div className="my-2">
            <p className="text-[#868A91]">
              {selected?.label} . {bankDetails?.account_number}
            </p>
          </div>
          <Button
            onClick={handleAddBank}
            className="font-[Gilroy-Bold] my-4"
            isLoading={isLoading}
            type="button"
            width="100%"
            colorScheme="green"
          >
            Save
          </Button>
          <a
            onClick={handleReset}
            className="text-[#2922b3] font-[Gilroy-Medium]"
          >
            Not my account
          </a>
        </div>
      )}

      {isError && (
        <div id="error" className="text-center flex justify-center flex-col">
          <img className="w-[4em] m-auto my-3" src={bankIcon} alt="bankIcon" />
          <h2 className="font-[Gilroy-Medium] text-[#2F3133]">
            Bank details not verified
          </h2>
          <div className="my-2">
            <p className="text-[#868A91]">kindly reach out to support via</p>
            <a className="text-[#2922b3]" href="mailto:paysmosmo@gmail.com">
              {" "}
              paysmosmo@gmail.com
            </a>
          </div>
          <Button
            onClick={handleReset}
            className="font-[Gilroy-Bold] my-4"
            isLoading={isLoading}
            type="button"
            width="100%"
            colorScheme="green"
          >
            Enter Correct Information
          </Button>
        </div>
      )}
    </div>
  );
};

export default BankAccountForm;
