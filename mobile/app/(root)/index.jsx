import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { Text, View } from "react-native";
import { SignOutButton } from "@/components/SignOutButton";
import { useTransaction } from "../../hooks/useTransaction";
import { useEffect } from "react";

export default function Page() {
  const { user } = useUser();
  const { transactions, summary, loading, error, loadData, deleteTransaction } =
    useTransaction(user.id);

  useEffect(() => {
    loadData();
  }, [loadData]);

  console.log("user id:", user.id);
  console.log("transactions:", transactions);
  console.log("summary:", summary);

  return (
    <View>
      <SignedIn>
        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
        <SignOutButton />
      </SignedIn>
      <SignedOut>
        <Link href="/(auth)/sign-in">
          <Text>Sign in</Text>
        </Link>
        <Link href="/(auth)/sign-up">
          <Text>Sign up</Text>
        </Link>
      </SignedOut>
    </View>
  );
}
