import { HiOutlineHome } from "react-icons/hi";
import { RoutesTypeElement } from "./types";
import { Dashboard, Login, Messages, Services, Comments } from "pages";
import {
  FaCommentDots,
  FaEnvelope,
  FaHouse,
  FaLayerGroup,
} from "react-icons/fa6";

export const public_routes: RoutesTypeElement[] = [
  {
    name: "Login",
    path: "/signin",
    component: Login,
    config: {
      key: "*",
      icon: HiOutlineHome,
      structure: "nonlayout",
      isMuenu: true,
    },
  },
];

export const protected_routes: RoutesTypeElement[] = [
  {
    name: "Asosiy sahifa",
    path: "/",
    component: Dashboard,
    config: {
      key: "*",
      icon: FaHouse,
      structure: "layout",
      isMuenu: true,
    },
  },

  {
    name: "Xizmatlar",
    path: "/services",
    component: Services,
    config: {
      key: "*",
      icon: FaLayerGroup,
      structure: "layout",
      isMuenu: true,
    },
  },
  {
    name: "Xabarlar",
    path: "/messages",
    component: Messages,
    config: {
      key: "*",
      icon: FaEnvelope,
      structure: "layout",
      isMuenu: true,
    },
  },
  {
    name: "Mijozlar fikri",
    path: "/comments",
    component: Comments,
    config: {
      key: "*",
      icon: FaCommentDots,
      structure: "layout",
      isMuenu: true,
    },
  },
];
