import React from "react";
import {
  View,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import { API_URL } from "@/constants/api";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/colors";
import { TextInput, Button, Chip, Text, Appbar } from "react-native-paper";

const CATEGORIES = [
  { id: "food", name: "Food & Drinks", icon: "fast-food" },
  { id: "shopping", name: "Shopping", icon: "cart" },
  { id: "transportation", name: "Transportation", icon: "car" },
  { id: "entertainment", name: "Entertainment", icon: "film" },
  { id: "bills", name: "Bills", icon: "receipt" },
  { id: "income", name: "Income", icon: "cash" },
  { id: "other", name: "Other", icon: "ellipsis-horizontal" },
];

export default function CreateTransaction() {
  const router = useRouter();
  const { user } = useUser();

  const [title, setTitle] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [category, setCategory] = React.useState(CATEGORIES[0].name);
  const [isExpense, setIsExpense] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleCreate = async () => {
    if (!title || !amount) {
      Alert.alert("Please fill in all fields");
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}transactions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          amount: isExpense
            ? -Math.abs(parseFloat(amount))
            : Math.abs(parseFloat(amount)),
          category,
          userId: user?.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create transaction");
      }

      await response.json();
      Alert.alert("Transaction created successfully");
      router.back();
    } catch (error) {
      Alert.alert(
        error.message || "An error occurred while creating the transaction"
      );
    }
    setIsLoading(false);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#fff" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Appbar.Header style={{ backgroundColor: "#fff" }}>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content
          title="New Transaction"
          titleStyle={{
            fontSize: 20,
            fontWeight: "bold",
            color: COLORS.primary,
          }}
        />
        <Button
          mode="text"
          onPress={handleCreate}
          loading={isLoading}
          disabled={isLoading}
          style={{ marginRight: 8 }}
        >
          Save
        </Button>
      </Appbar.Header>
      {/* horizontal bar */}
      <View
        style={{
          height: 1,
          backgroundColor: COLORS.textLight,
          marginBottom: 16,
        }}
      ></View>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Expense/Income Toggle */}
        <View style={styles.toggleRow}>
          <Chip
            icon={({ size }) => (
              <View
                style={{
                  width: size,
                  height: size,
                  borderRadius: size / 2,
                  backgroundColor: COLORS.expense,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name="arrow-down" size={size * 0.6} color="#fff" />
              </View>
            )}
            selected={isExpense}
            style={[
              styles.toggleChip,

              { backgroundColor: COLORS.white, borderColor: COLORS.textLight },
              { borderWidth: 1, borderColor: COLORS.border }, // <-- set your border color here
              isExpense && { backgroundColor: COLORS.primary },
            ]}
            textStyle={{ color: isExpense ? "#fff" : COLORS.text }}
            onPress={() => setIsExpense(true)}
          >
            Expense
          </Chip>
          <Chip
            icon={({ size }) => (
              <View
                style={{
                  width: size,
                  height: size,
                  borderRadius: size / 2,
                  backgroundColor: !isExpense ? COLORS.income : COLORS.income,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name="arrow-up" size={size * 0.6} color="#fff" />
              </View>
            )}
            selected={!isExpense}
            style={[
              styles.toggleChip,
              { backgroundColor: COLORS.white, borderColor: COLORS.textLight },
              { borderWidth: 1, borderColor: COLORS.border }, // <-- set your border color here

              !isExpense && { backgroundColor: COLORS.primary },
            ]}
            textStyle={{ color: !isExpense ? "#fff" : COLORS.text }}
            onPress={() => setIsExpense(false)}
          >
            Income
          </Chip>
        </View>
        {/* Amount Input */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 16,
            marginTop: 8,
          }}
        >
          <Text
            style={{
              fontSize: 32,
              fontWeight: "bold",
              color: COLORS.primary,
              marginRight: 4,
            }}
          >
            $
          </Text>
          <TextInput
            value={amount}
            onChangeText={setAmount}
            placeholder="0.00"
            placeholderTextColor={COLORS.textLight}
            keyboardType="numeric"
            style={{
              fontSize: 32,
              fontWeight: "light",
              color: COLORS.textLight,
              backgroundColor: "transparent",
              borderWidth: 0,
              flex: 1,
              paddingVertical: 0,
            }}
            underlineColor="transparent"
            activeUnderlineColor="transparent"
            selectionColor={COLORS.primary}
            mode="flat"
          />
        </View>
        {/* Title Input */}
        <TextInput
          label="Transaction Title"
          mode="outlined"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
          left={<TextInput.Icon icon="pencil" color={COLORS.primary} />}
          theme={{
            colors: {
              primary: COLORS.primary, // active/focused border color
              outline: COLORS.border, // default border color
            },
          }}
        />
        {/* Category Selection */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 8,
            marginTop: 8,
          }}
        >
          <Ionicons
            name="pricetag"
            size={20}
            color={COLORS.primary}
            style={{ marginRight: 6 }}
          />
          <Text style={styles.categoryLabel}>Category</Text>
        </View>
        <View style={styles.categoriesContainer}>
          {CATEGORIES.map((cat) => (
            <Chip
              key={cat.id}
              icon={({ color, size }) => (
                <Ionicons
                  name={cat.icon}
                  size={size}
                  color={COLORS.textLight}
                />
              )}
              selected={category === cat.name}
              style={[
                styles.categoryChip,
                {
                  backgroundColor: COLORS.white,
                  borderColor: COLORS.border,
                },
                category === cat.name && { backgroundColor: COLORS.primary },
              ]}
              textStyle={{
                color: category === cat.name ? "#fff" : COLORS.text,
              }}
              onPress={() => setCategory(cat.name)}
            >
              {cat.name}
            </Chip>
          ))}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  toggleRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 24,
    gap: 12,
  },
  toggleChip: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 24,
    height: 44,
    justifyContent: "center",
  },
  input: {
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  categoryLabel: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 8,
    marginTop: 8,
  },
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 24,
  },
  categoryChip: {
    margin: 4,
    borderRadius: 20,
    height: 40,
    justifyContent: "center",
  },
});
