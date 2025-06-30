import { useCallback, useState } from "react";
import { Alert } from "react-native";

const API_URL = "http:// 192.168.254.44:5000/api/"; // Replace with your actual API URL

export const useTransaction = (userId) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({
    income: 0,
    expense: 0,
    balance: 0,
  });

  // useCallback is used to memoize the function so that it doesn't get recreated on every render
  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}transactions/${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch` transactions");
      }
      const data = await response.json();
      console.log("🚀 ~ fetchTransactions ~ data:", data);
      setTransactions(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const fetchSummary = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}transactions/summary/${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch summary");
      }
      const data = await response.json();
      setSummary(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      await fetchTransactions();
      await fetchSummary();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [fetchTransactions, fetchSummary, userId]);

  const deleteTransaction = async (transactionId) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}transactions/${transactionId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete transaction");
      }
      loadData(); // Refresh data after deletion
      Alert.alert("Success", "Transaction deleted successfully");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    transactions,
    summary,
    loading,
    error,
    loadData,
    deleteTransaction,
  };
};
