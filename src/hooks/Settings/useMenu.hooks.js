

const useProfileStatus = (profile) => {

  const menu = [
    {
      id: 1,
      name: "Basic Information",
      status: profile?.phone_number && profile?.email,
    },
    {
      id: 2,
      name: "Upload a Profile Picture",
      status: profile?.profile_picture,
    },
    // { id: 8, name: "BVN Verification", status: profile?.bvn },
    // { id: 3, name: "ID Verification", status: profile?.id_card },

    // { id: 5, name: "Next of kin", status: profile?.next_of_kin, total: "1" },
    // { id: 6, name: "Guarantor", status: profile?.guarantor, total: "1" },
    // { id: 7, name: "Bank & Account", status: profile?.bank_details },
  ];

  return { menu };
};

export default useProfileStatus;
