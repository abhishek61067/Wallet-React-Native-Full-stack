import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { COLORS } from "@/constants/colors";

const LoadingComponent = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size={"large"} color={COLORS.primary} />
    </View>
  );
};

export default LoadingComponent;
