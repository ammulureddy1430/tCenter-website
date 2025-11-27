import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type Plan = {
  id: string;
  title: string;
  pricePerDay: number;
  description?: string;
  duration: string;
};

type Props = {
  plans: Plan[];
  onSelect: (p: Plan) => void;
};

export default function PlanCards({ plans, onSelect }: Props) {
  return (
    <View style={styles.row}>
      {plans.map((p) => (
        <View key={p.id} style={styles.cardWrap}>
          <TouchableOpacity style={styles.card} onPress={() => onSelect(p)}>
            <Text style={styles.title}>{p.title}</Text>
            <Text style={styles.price}>₹{p.pricePerDay} / day</Text>
            {p.description ? <Text style={styles.desc}>{p.description}</Text> : null}
            <Text style={styles.duration}>{p.duration}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", marginBottom: 12 },
  cardWrap: { flex: 1, marginRight: 8 },
  card: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    elevation: 1,
  },
  title: { fontWeight: "700", marginBottom: 6 },
  price: { color: "#666", marginBottom: 8 },
  desc: { color: "#444" },
  duration: { marginTop: 8, color: "#888", fontSize: 12 },
});
