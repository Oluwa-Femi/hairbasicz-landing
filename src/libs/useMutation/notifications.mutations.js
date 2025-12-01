import { useMutation } from "react-query";
import UpdateAddressForm from "../../components/Forms/UpdateAddressForm";

export const mUpdateDeliveryAddress = useMutation({
  mutationFn: (address) => {
    return UpdateAddressForm(address);
  },
});
