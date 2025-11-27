import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Platform,
  useWindowDimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import HeroFancy from "@/components/HeroFancy";
import MenuItemCard from "@/components/MenuItemCard";
import CategoryTabs from "@/components/CategoryTabs";
import PlanCards from "@/components/PlanCards";
import Testimonials from "@/components/Testimonals";
import CartModal from "@/components/CartModal";

import { menuData, plans } from "@/constants/menuData";
import { THEME } from "@/constants/theme";

const CART_KEY = "TIFFIN_CART_V1";

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState<any[]>([]);
  const [cartVisible, setCartVisible] = useState(false);

  const categories = useMemo(
    () => ["All", ...new Set(menuData.map((i) => i.category))],
    []
  );

  const filteredMenu = useMemo(
    () => (category === "All" ? menuData : menuData.filter((m) => m.category === category)),
    [category]
  );

  const isWide = width > 1000;

  useEffect(() => {
    AsyncStorage.getItem(CART_KEY).then((raw) => {
      if (raw) setCart(JSON.parse(raw));
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = useCallback((item: any) => {
    setCart((prev) => [...prev, item]);
  }, []);

  const removeFromCart = useCallback((idx: number) => {
    setCart((prev) => prev.filter((_, i) => i !== idx));
  }, []);

  const selectPlan = useCallback((plan: any) => {
    const days =
      plan.duration === "1 day" ? 1 :
      plan.duration === "5 days" ? 5 :
      30;

    const planItem = {
      id: `plan-${plan.id}-${Date.now()}`,
      name: `${plan.title} (${days} days)`,
      price: plan.pricePerDay * days,
    };

    setCart((prev) => [...prev, planItem]);
    setCartVisible(true);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: THEME.colors.bg }}>
      <StatusBar barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"} />

      <ScrollView contentContainerStyle={{ padding: 16 }}>

        <HeroFancy onOrder={() => setCartVisible(true)} />

        <Section title="Subscription Plans">
          <PlanCards plans={plans} onSelect={selectPlan} />
        </Section>

        <Section title="Daily Menu">
          <CategoryTabs categories={categories} selected={category} onSelect={setCategory} />
        </Section>

        <FlatList
          data={filteredMenu}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <MenuItemCard item={item} onAdd={addToCart} />}
          scrollEnabled={false}
          numColumns={isWide ? 2 : 1}
          columnWrapperStyle={isWide ? { justifyContent: "space-between", gap: 12 } : undefined}
          contentContainerStyle={{ paddingBottom: 40 }}
        />

        <Section title="What customers say">
          <Testimonials />
        </Section>
      </ScrollView>

      <TouchableOpacity
        onPress={() => setCartVisible(true)}
        style={{
          position: "absolute",
          right: 16,
          bottom: 24,
          backgroundColor: THEME.colors.primary,
          paddingHorizontal: 18,
          paddingVertical: 12,
          borderRadius: 999,
          elevation: 6,
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "700" }}>Cart ({cart.length})</Text>
      </TouchableOpacity>

      <CartModal
        visible={cartVisible}
        onClose={() => setCartVisible(false)}
        cart={cart}
        onRemove={removeFromCart}
      />
    </SafeAreaView>
  );
}

function Section({ title, children }: any) {
  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "800", marginBottom: 10 }}>
        {title}
      </Text>
      {children}
    </View>
  );
}
