import React from "react";
import { View, Text, FlatList, StyleSheet, Dimensions } from "react-native";
import * as Animatable from "react-native-animatable";
import { THEME } from "../constants/theme";

const testimonials = [
  { id: "t1", name: "Anjali", text: "Food tastes like home — consistently great!" },
  { id: "t2", name: "Ramesh", text: "Timely delivery and friendly packaging." },
  { id: "t3", name: "Priya", text: "My family loves the monthly plan." },
];

export default function Testimonials() {
  const width = Dimensions.get("window").width;
  const itemWidth = Math.min(360, width - 80);

  return (
    <View style={{ paddingVertical: 8 }}>
      <FlatList
        horizontal
        data={testimonials}
        keyExtractor={(t) => t.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 8, gap: 12 }}
        renderItem={({ item, index }) => (
          <Animatable.View animation="fadeInRight" delay={index * 120} style={[styles.card, { width: itemWidth }]}>
            <Text style={styles.text}>"{item.text}"</Text>
            <Text style={styles.name}>— {item.name}</Text>
          </Animatable.View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: THEME.colors.card,
    borderRadius: 12,
    padding: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.06,
  },
  text: { color: THEME.colors.text, marginBottom: 10, fontSize: 14 },
  name: { color: THEME.colors.muted, fontWeight: "700" },
});
