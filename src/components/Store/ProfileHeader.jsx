import React from "react";
import { GreetingTime } from "../../utils/functions/greetings";
import { Avatar } from "@chakra-ui/react";
import ConvertDate from "../../utils/functions/settings/convertDate.helpers";
import useCompleteModal from "../../hooks/Settings/useCompleteModal.hooks";

const ProfileHeader = ({ profile, menu, openModal }) => {
  const date = new ConvertDate();
  const { isComplete, handleEditProfile } =
    useCompleteModal({ menu, openModal });

  return (
    <div>
      {isComplete && (
        <div
          id="header"
          className="flex xsm:grid justify-between items-center bg-[#F8F9FB] py-6 px-4 rounded-md"
        >
          <div id="profile" className="gap-6 xsm:order-2">
            <div className="">
              <Avatar
                name={`${profile?.first_name} ${profile?.last_name}`}
                src={profile?.profile_picture}
              />
            </div>
            <div className="">
              <h2 className=" font-[Gilroy-Bold] text-[1.2em] text-[#1C1D1F]">
                {isComplete && `${GreetingTime()}`}
                {", "}
                {`${profile?.first_name} ${profile?.last_name}`}!
              </h2>
            </div>
          </div>
        </div>
      )}
      {!isComplete && (
        <div
          id="header"
          className="2xl:flex 2xl:justify-center 2xl:text-center items-center bg-[#F8F9FB] py-6 px-4 rounded-md"
        >
          <div id="profile" className="xl:flex gap-6 items-top xsm:text-center">
            <div className="lg:flex justify-center">
              <Avatar
                name={`${profile?.first_name} ${profile?.last_name}`}
                src={profile?.profile_picture}
              />
            </div>
            <div className="">
              <h2 className="capitalize font-[Gilroy-Bold] text-[1.2em] text-[#1C1D1F]">
                {`${profile?.first_name} ${profile?.last_name}`}
              </h2>

              <p className="text-[#5F6166]">
                {profile?.email} {profile?.phone && `| ${profile?.phone} |`} |{" "}
                {date.formatDate(profile?.date_of_birth)}
              </p>

              <p className="text-[#2922b3] text-[14px] underline font-[Gilroy-Bold]">
                <a
                  role="button"
                  tabIndex={0}
                  onKeyUp={() => handleEditProfile(menu[0])}
                  className="cursor-pointer"
                  onClick={() => handleEditProfile(menu[0])}
                >
                  Edit Profile
                </a>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileHeader;

// import React from "react";
// import { GreetingTime } from "../../utils/functions/greetings";
// import { Avatar } from "@chakra-ui/react";
// import ConvertDate from "../../utils/functions/settings/convertDate.helpers";
// import useCompleteModal from "../../hooks/Settings/useCompleteModal.hooks";

// const ProfileHeader = ({ profile, menu, openModal }) => {
//   const date = new ConvertDate();
//   const { handleEditProfile } = useCompleteModal({ menu, openModal });

//   return (
//     <div id="header" className="flex xsm:grid justify-between items-center bg-[#F8F9FB] py-6 px-4 rounded-md">
//       <div id="profile" className="gap-6 xsm:order-2">
//         <div className="">
//           <Avatar
//             name={`${profile?.first_name} ${profile?.last_name}`}
//             src={profile?.profile_picture}
//           />
//         </div>
//         <div className="">
//           <h2 className=" font-[Gilroy-Bold] text-[1.2em] text-[#1C1D1F]">
//             {GreetingTime()}, {`${profile?.first_name} ${profile?.last_name}`}!
//           </h2>
//         </div>
//       </div>
//       <div id="header" className="2xl:flex 2xl:justify-center 2xl:text-center items-center bg-[#F8F9FB] py-6 px-4 rounded-md">
//         <div id="profile" className="xl:flex gap-6 items-top xsm:text-center">
//           <div className="lg:flex justify-center">
//             <Avatar
//               name={`${profile?.first_name} ${profile?.last_name}`}
//               src={profile?.profile_picture}
//             />
//           </div>
//           <div className="">
//             <h2 className="capitalize font-[Gilroy-Bold] text-[1.2em] text-[#1C1D1F]">
//               {`${profile?.first_name} ${profile?.last_name}`}
//             </h2>

//             <p className="text-[#5F6166]">
//               {profile?.email} {profile?.phone && `| ${profile?.phone} |`} |{" "}
//               {date.formatDate(profile?.date_of birth)}
//             </p>

//             <p className="text-[#2922b3] text-[14px] underline font-[Gilroy-Bold]">
//               <a
//                 role="button"
//                 tabIndex={0}
//                 onKeyUp={() => handleEditProfile(menu[0])}
//                 className="cursor-pointer"
//                 onClick={() => handleEditProfile(menu[0])}
//               >
//                 Edit Profile
//               </a>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfileHeader;

