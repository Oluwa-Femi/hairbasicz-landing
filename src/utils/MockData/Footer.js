import YouTubeLogo from "../../assets/youtubelogo.png";
import FaceBookLogo from "../../assets//facebooklogo.png";
import InstagramLogo from "../../assets/instagramlogo.png";
import TwitterLogo from "../../assets/twitterlogo.png";
import {
  PAYSMOSMO_HOME_URL,
  PAYSMOSMO_SAVING_URL,
} from "../constants/config.constant";

export const Products = [
  { name: "Store Front", link: "/store" },
];

export const Company = [{ name: "About Us", link: `${PAYSMOSMO_HOME_URL}about-us` }];

export const Legal = [
  {
    name: "Terms and Conditions",
    link: `${PAYSMOSMO_HOME_URL}terms-and-conditions/store`,
  },
  { name: "Privacy Policy", link: `${PAYSMOSMO_HOME_URL}privacy-policy` },
];

export const Others = [
  { name: "FAQs", link: `${PAYSMOSMO_HOME_URL}FAQs/store` },
  { name: "Contact", link: `${PAYSMOSMO_HOME_URL}contact-us` },
];

export const SocialMediaIcons = [
  { name: "facebook", icon: FaceBookLogo, link: "https://www.facebook.com/p/Hairbasicz-100072583967746/" },
  { name: "instagram", icon: InstagramLogo, link: "https://www.instagram.com/hairbasicz?igsh=bmsyYzN4NHBvcGxt" },
  { name: "twitter", icon: TwitterLogo, link: "https://x.com/hairbasicz?s=21&t=9TmYHBZt5KXzBbF4lj-iPA" },
  { name: "youtube", icon: YouTubeLogo, link: "https://www.youtube.com/@sharondanjack" },
];
