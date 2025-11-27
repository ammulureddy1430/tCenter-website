import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { THEME } from "../constants/theme";

export default function HeroFancy({ onOrder }:{ onOrder?: ()=>void }) {
  return (
    <LinearGradient colors={[THEME.colors.primary, THEME.colors.primary]} style={styles.hero}>
      <View style={styles.inner}>
        <Text style={styles.title}>Home-style Tiffins, Delivered Daily</Text>
        <Text style={styles.subtitle}>Nutritious, fresh and cooked with care — flexible plans to match your routine.</Text>

        <View style={styles.ctaRow}>
          <TouchableOpacity onPress={onOrder} style={styles.ctaPrimary}>
            <Text style={styles.ctaPrimaryText}>Order Now</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {}} style={styles.ctaGhost}>
            <Text style={styles.ctaGhostText}>View Plans</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  hero: {
    width: "100%",
    paddingVertical: 28,
    paddingHorizontal: 18,
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: THEME.colors.primary
  },
  inner: { maxWidth: 1100, alignSelf: "center" },
  title: {
    fontFamily: "Inter_700Bold",
    fontSize: Platform.OS === "web" ? 34 : 20,
    color: "#fff",
    marginBottom: 8
  },
  subtitle: { color: "rgba(255,255,255,0.95)", marginBottom: 14, fontSize: Platform.OS === "web" ? 16 : 13 },
  ctaRow: { flexDirection: "row" },
  ctaPrimary: {
    backgroundColor: THEME.colors.accent,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 999,
    elevation: 3
  },
  ctaPrimaryText: { color: "#fff", fontWeight: "700" },
  ctaGhost: {
    borderColor: "rgba(255,255,255,0.9)",
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 999,
    marginLeft: 12
  },
  ctaGhostText: { color: "#fff", fontWeight: "700" }
});
