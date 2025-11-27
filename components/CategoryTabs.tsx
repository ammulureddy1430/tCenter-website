import React from "react";
import { ScrollView, View, TouchableOpacity, Text, StyleSheet } from "react-native";

type Props = {
  categories: string[];
  selected: string;
  onSelect: (c: string) => void;
};

export default function CategoryTabs({ categories, selected, onSelect }: Props) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.container}>
      <View style={styles.row}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            onPress={() => onSelect(cat)}
            style={[styles.chip, selected === cat ? styles.chipActive : styles.chipInactive]}
          >
            <Text style={[styles.chipText, selected === cat ? styles.chipTextActive : undefined]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 4 },
  row: { flexDirection: "row", alignItems: "center" },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
  },
  chipActive: {
    backgroundColor: "#6b3f2f",
    borderColor: "#6b3f2f",
  },
  chipInactive: {
    backgroundColor: "#fff",
    borderColor: "#ddd",
  },
  chipText: {
    fontWeight: "600",
    color: "#333",
  },
  chipTextActive: {
    color: "#fff",
  },
});
