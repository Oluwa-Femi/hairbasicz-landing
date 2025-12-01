import { useQueryClient } from "react-query";
import responseHandler from "../../utils/notifications/responseHandler";
import {
  CreateDeliveryAddress,
  DeleteDeliveryAddress,
  UpdateDeliveryAddress,
} from "../../utils/services/queries/settings.queries";
import * as nigerianStates from 'nigerian-states-and-lgas';
import { useEffect, useState } from "react";


const selectState = (setState) => {
    const states = nigerianStates.states();
    setState(
      states.map((item) => ({
        label: item,
        value: item
        }))
      );
  }

export const useCreateDeliveryAddress = ({ isOpen }) => {
  const queryClient = useQueryClient();
  const [allState, setAllState] = useState([]);
  const [selectedState, setSelectedState] = useState([
    {
      label: "",
      value: "",
    },
  ]);
  const [allLGA, setAllLGA] = useState([]);
  const [selectedLGA, setSelectedLGA] = useState([
    {
      label: "",
      value: "",
    },
  ]);

  useEffect(() => {
    selectState(setAllState)
  }, []);

  const handleStateChange = (e) => {
    setSelectedLGA(null)
    setSelectedState(e);
    const lga = nigerianStates.lgas(e.label)


      setAllLGA(
        lga?.map((item) => ({
          label: item,
          value: item,
        })),
      );

  };
  const handleSubmit = (values) => {
    CreateDeliveryAddress(values)
      .then((res) => {
        // invalidate current useQuery
        queryClient.invalidateQueries({ queryKey: ["delivery_address"] });

        // close modal
        isOpen(false);

        // toaster for result
        responseHandler(res);
      })
      .catch((err) => responseHandler(err));
  };

  return {
    handleSubmit,
    handleStateChange,
    allState,
    selectedState,
    allLGA,
    selectedLGA,
    setSelectedLGA,
  };
};

export const useDeleteAddress = ({ addressType, setIsOpen }) => {
  const queryClient = useQueryClient();
  const [isLoading, setLoading] = useState();
  const handleDeleteAddress = () => {
    setLoading(true);
    const data = { addressType };
    DeleteDeliveryAddress(data)
      .then((res) => {
        queryClient.invalidateQueries(["delivery_address"]);
        responseHandler(res);
        setIsOpen(false);
      })
      .catch((err) => {
        responseHandler(err);
      })
      .finally(() => setLoading(false));
  };

  return { isLoading, handleDeleteAddress };
};

export const useUpdateAddress = ({ addressData, isOpen }) => {
  const queryClient = useQueryClient();
  const [allState, setAllState] = useState([]);
  const [selectedState, setSelectedState] = useState([
    {
      label: addressData?.state,
      value: addressData?.state,
    },
  ]);
  const [allLGA, setAllLGA] = useState([]);
  const [selectedLGA, setSelectedLGA] = useState([
    {
      label: addressData?.local_government,
      value: addressData?.local_government,
    },
  ]);
  useEffect(() => {
    selectState(setAllState)
  }, []);
  const handleStateChange = (e) => {
    setSelectedLGA(null)
    setSelectedState(e);
    const lga = nigerianStates.lgas(e.label)

      setAllLGA(
        lga?.map((item) => ({
          label: item,
          value: item,
        })),
      );
  };
  const handleSubmit = (values) => {
    const updatedetails = {
      ...values,
      ...{ address_type: addressData?.address_type },
    };
    UpdateDeliveryAddress(updatedetails)
      .then((res) => {
        // invalidate current useQuery
        queryClient.invalidateQueries({ queryKey: ["delivery_address"] });

        // close modal
        isOpen(false);

        // toaster for result
        responseHandler(res);
      })
      .catch((err) => responseHandler(err));
  };

  return {
    handleSubmit,
    handleStateChange,
    allState,
    selectedState,
    allLGA,
    selectedLGA,
    setSelectedLGA,
  };
};

export const useUpdatePrimaryAddressUtlis = () => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [modalId, setModalId] = useState();
  const [addressData, setAddressData] = useState();

  const handleOpenAddress = () => {
    setModalId("#address");
    setAddressData(null);
    setIsOpen(true);
  };

  const handleOpenExisiting = (data, type) => {
    setModalId("#update");
    setIsOpen(true);
    setAddressData({ ...data, ...{ address_type: type } });
  };

  const handleDeleteAddress = (type) => {
    setModalId("#deleteType");
    setIsOpen(true);
    setAddressData(type);
  };

  const handleUpdatePrimary = (updatedAddress, type) => {
    const newUpdatedAdress = { ...updatedAddress, ...{ address_type: type } };
    setIsLoading(true)
    UpdateDeliveryAddress(newUpdatedAdress)
      .then((res) => {
        responseHandler(res);
        queryClient.invalidateQueries(["delivery_address"]);
        setIsOpen(false);
      })
      .catch((err) => responseHandler(err))
      .finally(() => setIsLoading(false))
  };

  return {
    handleUpdatePrimary,
    handleDeleteAddress,
    handleOpenAddress,
    handleOpenExisiting,
    isOpen,
    isLoading,
    setIsOpen,
    modalId,
    addressData,
  };
};
