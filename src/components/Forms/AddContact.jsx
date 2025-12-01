import { Avatar, Button } from '@chakra-ui/react';
import React from 'react';
import VerifiedIcon from '../../assets/Verified.svg';
import { readableDate } from '../../utils/functions/formatDate';

const AddContact = (props) => {
    const {
        profile,
        isEmail,
        isPhone,
        onAddContact
    } = props;
    return (
        <div>
            <div id="profile" className="flex gap-4 my-2">
                <div>
                    <Avatar src={profile?.profile_picture} />
                </div>
                <div>
                    <h2 className="font-[Gilroy-Medium] text-[18px] text-[#1C1D1F] capitalize">{`${profile?.first_name} ${profile?.last_name}`}</h2>
                    <p className="text-[14px] text-[#868A90] capitalize">{profile?.gender}</p>
                </div>
            </div>
            <div className="mt-5" style={{ border: '1px dashed #D8DCE2' }} />
            <div className="my-6" id="body">
                <div className="my-3">
                    <h2 className="text-[#868A90] text-[14px]">Married Status</h2>
                    <p className="text-[14px] capitalize">{profile?.marital_status}</p>
                </div>

                <div className="my-3 text-[14px]">
                    <h2 className="text-[#868A90] text-[14px]">Date of Birth</h2>
                    <p>{readableDate(profile?.date_of_birth)}</p>

                </div>

                <div className="flex justify-between my-3 text-[14px]">
                <div>
                        <h2 className="text-[#868A90] text-[14px]">Phone number
                           {!isPhone && (<span className="text-[red] ml-2">required</span>)}
                        </h2>
                        <p>{profile?.phone_number || '-'}</p>
                    </div>
                    <div>
                        {isPhone && (<img src={VerifiedIcon} alt="Verified-icon" />)}
                    </div>
                </div>

                 <div className="flex my-3 text-[14px] justify-between">
                <div>
                        <h2 className="text-[#868A90] text-[14px]">Email address
                            {!isEmail && (<span className="text-[red] ml-2">required</span>)}
                        </h2>
                    <p> {profile?.email || '-'} </p>
                    </div>
                    <div className="">
                       {isEmail && (<img src={VerifiedIcon} alt="Verified-icon" />)}
                    </div>
                </div>
            </div>
            <div className="my-4" id="footer">
                {(!isEmail || !isPhone) && (
                    <Button
                        className="font-[Gilroy-Bold]"
                        type="submit"
                        width="100%"
                        colorScheme="green"
                        onClick={onAddContact}
                    >
                        {!isEmail && 'Add Email Address'}
                        {!isPhone && 'Add Phone number'}
                    </Button>
                )}
            </div>
        </div>
    );
};

export default AddContact;
