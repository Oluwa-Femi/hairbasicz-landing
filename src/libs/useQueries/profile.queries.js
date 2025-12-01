import { useQuery } from "react-query";
import {
  GetBanks,
  GetProfile,
} from "../../utils/services/queries/settings.queries";

export const QueryProfile = ({ userEmail = "sample@email.com" }) =>
  useQuery(["Profile", userEmail], () => GetProfile());

export const QueryBanks = () => useQuery(["banks"], () => GetBanks());
