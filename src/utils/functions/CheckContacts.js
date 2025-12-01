const CheckContacts = (email, phone ) => {
    let isEmail = false
    let isPhone = false
    if (email) isEmail = true;
    if (phone) isPhone = true;

    return { isEmail, isPhone };

};

export default CheckContacts;
