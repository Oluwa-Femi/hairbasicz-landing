import { useState } from "react";
import CheckContacts from "../../utils/functions/CheckContacts";
import AddContact from "./AddContact";
import AddEmail from "./AddEmail";
import AddPhoneForm from "./AddPhone";
import VerifyOTPForm from "./VerifyOTP";
import ApiInstance from "../../libs/axios/apiInstance";
import responseHandler from "../../utils/notifications/responseHandler";


const UpdateContact = (prop) => {
    const { profile, setIsOpen } = prop;
    const [updateState, setUpdateState] = useState();
    const [validateEmail, setValidateEmail] = useState();
    const [validatePhone, setValidatePhone] = useState();
    const [isLoading, setIsLoading] = useState();
    const { isEmail, isPhone } = CheckContacts(
        profile?.email,
        profile?.phone_number
    )
    const handleAddContact = () => {
        setUpdateState(!isEmail ? 'SET_EMAIL' : 'SET_PHONE');
    };

    const handleEmail = (data) => {
         ApiInstance.post("user/customers/contacts/generate-otp", {
            email: `${data?.email}`
        })
      .then(() => {
        setUpdateState('SET_OTP');
          setValidateEmail(data?.email);

      })
        .catch((error) => {
          responseHandler(error)
        console.log({ error })
      })

    }

    const handlePhone = async (data) => {
        setIsLoading(true)
       return ApiInstance.post("user/customers/contacts/generate-otp", {
            phoneNumber: `+${data?.phone}`
        })
      .then(() => {
        setUpdateState('SET_OTP');
          setValidatePhone(`+${data?.phone}`);

      })
        .catch((error) => {
         responseHandler(error)
        console.log({ error })
        })
        .finally(() => setIsLoading(false))
    }

    return (
        <>
            {!updateState && (
            <AddContact
                isEmail={isEmail}
                isPhone={isPhone}
                profile={profile}
                onAddContact={handleAddContact}
            />
            )}
            {updateState === 'SET_EMAIL' && (<AddEmail handleEmail={handleEmail} />)}
            {updateState === 'SET_PHONE' && (<AddPhoneForm
                isLoading={isLoading}
                handlePhone={handlePhone} />)}

            {updateState === 'SET_OTP' && <VerifyOTPForm
                data={validateEmail || validatePhone}
                type={validateEmail ? 'email' : 'phoneNumber'}
                setIsOpen={setIsOpen}
            />}
        </>
    )

};

export default UpdateContact;
