export const assignRemoveCart = (data, selectedCartId) => {
  let cart = data && data.find((x) => x.reference === selectedCartId);
  const newArray = [];
  newArray.push(cart?.reference);
  return newArray;
};

export const assignRemoveCart2 = (data, selectedCartId) => {
  let cart = data && data.find((x) => x.variant_reference === selectedCartId);
  const newArray = [];
  newArray.push(cart?.reference);
  return newArray;
};

export const assignAddCart = (data, selectedProductId) => {
  let cart = data && data.find((x) => x.reference === selectedProductId);
  return cart;
};

export const productInCart = (data, selectedProductId) => {
  let cart =
    data && data.find((x) => x.variant_reference === selectedProductId);
  return cart;
};

export const productInCartCounter = (data, selectedProductId) => {
  let cart = data && data.find((x) => x.reference === selectedProductId);
  return cart;
};

export const filterOrders = (orders, status) => {
  const ordersData =
    orders &&
    orders.filter(
      (order) => order && order.status && order.status.toLowerCase() === status
    );
  return ordersData;
};

export const getAdminPermissions = (adminData) => {
  const mapRoles = adminData;
  const newArray = mapRoles && assignPermissionData(mapRoles);
  const permissions = newArray && permissionData(newArray);
  return permissions;
};

export const assignPermissionData = (obj) => {
  const permissions = [];
  for (let key in obj) {
    if (key.startsWith("can_")) {
      permissions.push({ [key]: obj[key] });
    }
  }
  return permissions;
};

export const formatText = (str) => {
  let newStr = str && str.split("_").join(" ");
  let removeOne = newStr.substr(newStr.indexOf(" ") + 1);
  let removeTwo = removeOne.substr(removeOne.indexOf(" ") + 1);
  return removeTwo;
};

export const permissionData = (data) => {
  let checkboxData = [];
  if (data && data.length > 0) {
    for (let i = 0; i < data.length; i++) {
      const each = Object.assign({
        id: Object.keys(data[i])[0],
        label: Object.keys(data[i])[0] && formatText(Object.keys(data[i])[0]),
        checked: Object.values(data[i])[0]
      });
      checkboxData.push(each);
    }
    return checkboxData;
  }
};

export const assignRoute = (data, routes) => {
  if (data && data.length > 0) {
    const permissions = data.map((item) =>
      Object.assign({
        ...item,
        name: routes && routes?.find((data) => data.role === item.id)?.name
      })
    );
    return permissions;
  }
};

export const permissionPayload = (data) => {
  let checkboxData = {};
  if (data && data.length > 0) {
    for (let i = 0; i < data.length; i++) {
      checkboxData[data[i].id] = data[i].checked;
    }
    return checkboxData;
  }
};

export const changeStatusPermissions = (obj) => {
  let data = {};
  for (let key in obj) {
    if (key.startsWith("can_")) {
      data[key] = obj[key];
    }
  }
  return data;
};

export const filterActiveRoles = (roles) => {
  const activeRoles =
    roles &&
    roles.filter(
      (role) => role && role.status && role.status.toLowerCase() === "active"
    );
  return activeRoles;
};

export const changeFacilityArray = (data) => {
  let checkboxData = [];
  for (var key in data) {
    const each = {
      category_id: data[key][0].appointment_category?.id,
      name: data[key][0].appointment_category?.name,
      subcategoryOptions: [],
      sub_category_ids: data[key].map((item) =>
        Object.assign({ category_id: item.id, name: item.name })
      )
    };
    checkboxData.push(each);
  }
  return checkboxData;
};

export const updateFacilityArray = (data, categories) => {
  let newData = [];
  if (data && data.length > 0 && categories && categories.length > 0) {
    data.forEach((item) => {
      const category = categories.filter(
        (category) => category.id === item.category_id
      );
      const each = Object.assign({
        ...item,
        subcategoryOptions:
          category &&
          category[0] &&
          category[0].appointment_subcategory.map((option) =>
            Object.assign({ category_id: option.id, name: option.name })
          )
      });
      newData && newData.push(each);
    });
    return newData;
  }
  return newData;
};

export const filterCategoryOptions = (data, categories) => {
  let newData = [];
  let ids = data && data.map((item) => item.category_id);
  if (data && data.length > 0 && ids && ids.length > 0) {
    newData = categories.filter(({ value }) => !ids.includes(value));
  } else {
    newData = categories;
  }
  return newData;
};

export const assignLocationsOptions = (data) => {
  let options = [];
  if (data && data.length > 0) {
    for (let i = 0; i < data.length; i++) {
      const each = Object.assign({
        name: `${data[i].location}, ${data[i].state}`,
        value: `${data[i].location}`
      });
      options.push(each);
    }
    return options;
  }
};

export const assignCartsData = (data) => {
  const result = {};
  data.forEach((item) => {
    result[item.variant_reference] = item.quantity;
  });
  return result;
};

export const assignReorderData = (data) => {
  const result = {};
  data.forEach((item) => {
    result[item.product_variant_id] = item.quantity;
  });
  return result;
};

export const assignLocalCartData = (data) => {
  const result = {};
  data.forEach((item) => {
    result[item.reference] = item.cart_quantity;
  });
  return result;
};
