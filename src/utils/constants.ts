import { ThemeConfig } from "antd";

export const antdCustomTokens = (): ThemeConfig => {
  return {
    token: {
      colorPrimary: "#FF5F13",
      // colorPrimary: "#005C47",
      colorText: "#002248",
      colorTextBase: "rgba(0, 0, 0, 1)",
      colorBgBase: "#fff",
    },
    components: {
      Menu: {
        darkItemBg: "#000C20",
      },
      Layout: {
        headerBg: "#000C20",
        siderBg: "#000C20",
      },
    },
  };
};
