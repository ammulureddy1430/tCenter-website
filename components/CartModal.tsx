import React from "react";
import { Modal, View, Text, TouchableOpacity, FlatList, Image, StyleSheet } from "react-native";
import { THEME } from "@/constants/theme";

type Item = {
  id: number | string;
  name: string;
  price?: number;
  img?: string;
};

type Props = {
  visible: boolean;
  onClose: () => void;
  cart: Item[];
  onRemove: (index: number) => void;
};

export default function CartModal({ visible, onClose, cart, onRemove }: Props) {
  const total = cart.reduce((s, i) => s + (i.price || 0), 0);

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose} transparent>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <Text style={styles.heading}>Your Cart</Text>

          <FlatList
            data={cart}
            keyExtractor={(_, idx) => String(idx)}
            renderItem={({ item, index }) => (
              <View style={styles.row}>
                <View style={styles.left}>
                  {item.img ? <Image source={{ uri: item.img }} style={styles.thumb} /> : <View style={styles.thumb} />}
                  <View style={{ marginLeft: 10, flex: 1 }}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.price}>₹{item.price || 0}</Text>
                  </View>
                </View>
                <TouchableOpacity onPress={() => onRemove(index)} style={styles.removeBtn}>
                  <Text style={styles.removeText}>Remove</Text>
                </TouchableOpacity>
              </View>
            )}
            ListEmptyComponent={<Text style={{ marginTop: 12 }}>Your cart is empty</Text>}
            style={{ marginTop: 8 }}
          />

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>₹{total}</Text>
          </View>

          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.4)" },
  sheet: { backgroundColor: "#fff", padding: 16, borderTopLeftRadius: 12, borderTopRightRadius: 12, maxHeight: "75%" },
  heading: { fontSize: 18, fontWeight: "700" },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 12 },
  left: { flexDirection: "row", alignItems: "center", flex: 1 },
  thumb: { width: 54, height: 54, borderRadius: 8, backgroundColor: "#eee" },
  name: { fontWeight: "700" },
  price: { color: "#666", marginTop: 4 },
  removeBtn: { padding: 8 },
  removeText: { color: "red", fontWeight: "700" },
  totalRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 16 },
  totalLabel: { fontSize: 16, fontWeight: "700" },
  totalValue: { fontSize: 16, fontWeight: "700" },
  closeBtn: { marginTop: 12, backgroundColor: THEME.colors.primary, padding: 12, borderRadius: 8 },
  closeText: { color: "#fff", textAlign: "center", fontWeight: "700" },
});
