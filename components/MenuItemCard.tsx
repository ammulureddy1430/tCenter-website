import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Platform } from "react-native";
import * as Animatable from "react-native-animatable";
import { THEME } from "../constants/theme";

export default function MenuItemCard({ item, onAdd }:{ item:any, onAdd:(i:any)=>void }) {
  const [hover, setHover] = useState(false);

  const wrapperProps: any = {};
  if (Platform.OS === "web") {
    wrapperProps.onMouseEnter = () => setHover(true);
    wrapperProps.onMouseLeave = () => setHover(false);
  }

  return (
    <Animatable.View animation="fadeInUp" duration={380} style={[styles.wrap, hover ? styles.wrapHover : null]} {...wrapperProps}>
      <View style={[styles.card, hover ? styles.cardHover : null]}>
        {item.img ? <Image source={{ uri: item.img }} style={styles.image} /> : null}
        <View style={styles.content}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.desc}>{item.description}</Text>

          <View style={styles.row}>
            <Text style={styles.price}>₹{item.price}</Text>
            <TouchableOpacity onPress={() => onAdd(item)} style={styles.addBtn}>
              <Text style={styles.addText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  wrap: { width: "100%", marginBottom: 14, transform: [{ translateY: 0 }] },
  wrapHover: Platform.select({ web: { transform: [{ translateY: -6 }] }, default: {} }),
  card: {
    backgroundColor: THEME.colors.card,
    borderRadius: 14,
    overflow: "hidden",
    flexDirection: Platform.OS === "web" ? "row" : "column",
    ...(Platform.OS === "web" ? { boxShadow: "0 6px 18px rgba(0,0,0,0.06)" } : { elevation: 3 }),
    transitionProperty: Platform.OS === "web" ? "transform,box-shadow" : undefined,
    transitionDuration: Platform.OS === "web" ? "180ms" : undefined,
  },
  cardHover: Platform.select({ web: { boxShadow: "0 18px 40px rgba(0,0,0,0.12)" }, default: {} }),
  image: { width: Platform.OS === "web" ? 220 : "100%", height: Platform.OS === "web" ? 150 : 200 },
  content: { flex: 1, padding: 12 },
  title: { fontWeight: "800", fontSize: 16, color: THEME.colors.text },
  desc: { color: THEME.colors.muted, marginTop: 6 },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 10 },
  price: { fontWeight: "800" },
  addBtn: { backgroundColor: THEME.colors.primary, paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8 },
  addText: { color: "#fff", fontWeight: "700" }
});
