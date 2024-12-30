import { Platform } from "react-native";

const theme = {
  colors: {
    backgroundColor: "#e1e4e8",
    barColor: "#24292e",
    textPrimary: "#24292e",
    textSecondary: "#586069",
    primary: "#0366d6",
    error: "#d73a4a",
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      android: "Roboto",
      ios: "Arial",
      default: "System",
    }),
  },
  fontWeights: {
    normal: "400",
    semibold: "500",
    bold: "700",
  },
  borderRadius: {
    default: 8,
    small: 4,
  },
};

export default theme;
