import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link, router, useRouter } from "expo-router";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SignOutButton } from "@/components/SignOutButton";
import { useTransaction } from "../../hooks/useTransaction";
import { useEffect } from "react";
import LoadingComponent from "../../components/LoadingComponent";
import { styles } from "@/assets/styles/home.styles.js";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { BalanceCard } from "@/components/BalanceCard";
import { TransactionItem } from "@/components/TransactionItem";

export default function Page() {
  const { user } = useUser();
  const { transactions, summary, loading, error, loadData, deleteTransaction } =
    useTransaction(user.id);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const router = useRouter();

  console.log("user id:", user.id);
  console.log("transactions:", transactions);
  console.log("summary:", summary);

  const onDelete = (id) => {
    console.log("Deleting transaction with id:", id);
    deleteTransaction(id)
      .then(() => {
        console.log("Transaction deleted successfully");
        loadData(); // Reload data after deletion
      })
      .catch((error) => {
        console.error("Error deleting transaction:", error);
      });
  };

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image
              source={require("../../assets/images/logo.png")}
              style={styles.headerLogo}
              resizeMode="contain"
            />
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>Welcome</Text>
              <Text style={styles.usernameText}>
                {user?.emailAddresses[0]?.emailAddress.split(".")[0]}
              </Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => {
                // Navigate to the add transaction page
                router.push("/create");
              }}
            >
              <Ionicons name="add" size={20} color="white" />
              <Text style={{ color: "white", fontWeight: "bold" }}>Add</Text>
            </TouchableOpacity>
            <SignOutButton />
          </View>
        </View>
        {/* summary */}
        <BalanceCard summary={summary} />
        <View style={styles.transactionsHeaderContainer}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
        </View>
      </View>
      <FlatList
        style={styles.transactionsList}
        contentContainerStyle={styles.transactionsListContent}
        data={transactions}
        renderItem={({ item }) => (
          <TransactionItem item={item} onDelete={onDelete} />
        )}
      />
    </View>
  );
}
