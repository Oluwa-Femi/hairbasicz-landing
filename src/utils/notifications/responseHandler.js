import { createStandaloneToast } from "@chakra-ui/toast";
import { clearStorage } from "../../utils/functions/ClearStorage";

const responseHandler = (response) => {
  const { toast } = createStandaloneToast();
  const { message, status } = response;
  let res;

  if (status === "success" || status === 200 || status === 201) {
    res = message;
    toast({
      title: "Success",
      description: message,
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });
  }
  if (!navigator.onLine) {
    res = "Network Error! Kindly try again.";
    toast({
      title: "Error",
      description: res,
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });
  } else if (
    response?.response?.status === "error" ||
    status === "error" ||
    response?.response?.status === 400
  ) {
    toast({
      title: "Erorr",
      description:
        response?.response?.data?.message ||
        response?.data ||
        message ||
        "Something went wrong",
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "top-right",
    }); // clearStorage();
  } else if (response?.response?.status === 401) {
    clearStorage();
    toast({
      title: "Erorr",
      description:
        response?.response?.data?.message ||
        response?.data ||
        message ||
        "Something went wrong",
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });
  }

  else if (response?.response?.status >= 500) {
    toast({
      title: "Erorr",
      description: "Something went wrong, please try again after some time.",
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });
  }

  return res;
};

export default responseHandler;
