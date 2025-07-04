import { View, Text } from "react-native";
import { styles } from "../assets/styles/home.styles";
import { COLORS } from "../constants/colors";
import { formatNumberWithCommas } from "./../utils/commaFormat";

export const BalanceCard = ({ summary }) => {
  return (
    <View style={styles.balanceCard}>
      <Text style={styles.balanceTitle}>Total Balance</Text>
      <Text style={styles.balanceAmount}>
        ${formatNumberWithCommas(parseFloat(summary.balance).toFixed(2))}
      </Text>

      <View style={styles.balanceStats}>
        <View style={styles.balanceStatItem}>
          <Text style={styles.balanceStatLabel}>Income</Text>
          <Text
            style={[
              styles.balanceStatAmount,
              { color: COLORS.income, fontSize: 12 },
            ]}
          >
            +${formatNumberWithCommas(parseFloat(summary.income).toFixed(2))}
          </Text>
        </View>

        <View style={[styles.balanceStatItem, styles.statDivider]} />

        <View style={styles.balanceStatItem}>
          <Text style={styles.balanceStatLabel}>Expenses</Text>
          <Text
            style={[
              styles.balanceStatAmount,
              { color: COLORS.expense, fontSize: 12 },
            ]}
          >
            -$
            {formatNumberWithCommas(
              Math.abs(parseFloat(summary.expenses)).toFixed(2)
            )}
          </Text>
        </View>
      </View>
    </View>
  );
};
