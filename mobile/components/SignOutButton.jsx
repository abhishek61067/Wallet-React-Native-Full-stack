import { useClerk } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import { Alert, Text, TouchableOpacity } from "react-native";

export const SignOutButton = () => {
  // Use `useClerk()` to access the `signOut()` function
  const { signOut } = useClerk();
  const handleSignOut = async () => {
    console.log("SignOutButton pressed");

    Alert.alert("logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: async () => {
          await signOut();
          // Redirect to your desired page
          Linking.openURL(Linking.createURL("/"));
        },
      },
    ]);
  };
  return (
    <TouchableOpacity onPress={handleSignOut}>
      <Ionicons name="log-out-outline" size={24} color="black" />
    </TouchableOpacity>
  );
};
