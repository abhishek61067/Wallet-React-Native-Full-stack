import { Slot } from "expo-router";
import SafeScreen from "./../components/SafeScreen";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import { COLORS } from "@/constants/colors.js";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: COLORS.primary,
    accent: COLORS.secondary || COLORS.primary,
    background: "#fff",
    surface: "#fff",
    text: COLORS.text,
    error: COLORS.expense,
  },
  roundness: 12,
};

export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache}>
      <PaperProvider theme={theme}>
        <SafeScreen>
          <Slot />
        </SafeScreen>
      </PaperProvider>
    </ClerkProvider>
  );
}
