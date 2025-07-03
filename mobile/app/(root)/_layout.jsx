import { Redirect } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import { Stack } from "expo-router/stack";
import LoadingComponent from "../../components/LoadingComponent";

export default function Layout() {
  const { isSignedIn, isLoaded } = useUser();
  if (!isLoaded) {
    return <LoadingComponent />; // or a loading spinner
  }

  if (!isSignedIn) {
    return <Redirect href={"/sign-in"} />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
