import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Mengimpor AsyncStorage
import { MaterialIcons } from "@expo/vector-icons";

const CartScreen = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Mengambil data dari AsyncStorage saat komponen di-mount
    retrieveCartItems();
  }, []);

  useEffect(() => {
    // Menyimpan item ke AsyncStorage setiap kali item berubah
    storeCartItems(items);
    calculateTotalPrice();
  }, [items]);

  const storeCartItems = async (cartItems) => {
    try {
      console.log("Menyimpan ke AsyncStorage: ", cartItems); // Debugging
      const jsonValue = JSON.stringify(cartItems);
      await AsyncStorage.setItem("cartItems", jsonValue);
    } catch (e) {
      console.error("Gagal menyimpan data ke AsyncStorage", e);
    }
  };

  const retrieveCartItems = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("cartItems");
      if (jsonValue != null) {
        setItems(JSON.parse(jsonValue));
        console.log("Data diambil dari AsyncStorage: ", JSON.parse(jsonValue)); // Debugging
      }
    } catch (e) {
      console.error("Gagal mengambil data dari AsyncStorage", e);
    }
  };

  const calculateTotalPrice = () => {
    const total = items.reduce(
      (sum, item) => sum + item.harga * item.quantity,
      0
    );
    setTotalPrice(total);
  };

  const handleDeleteItem = (id) => {
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
  };

  const handleQuantityChange = (id, action) => {
    const newItems = items.map((item) => {
      if (item.id === id) {
        if (action === "increase") {
          return { ...item, quantity: item.quantity + 1 };
        } else if (action === "decrease" && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
      }
      return item;
    });
    setItems(newItems);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.gambar }} style={styles.image} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.nama_barang}</Text>
        <Text style={styles.itemPrice}>Rp {item.harga.toLocaleString()}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            onPress={() => handleQuantityChange(item.id, "decrease")}
            style={styles.quantityButton}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.itemQuantity}>{item.quantity}</Text>
          <TouchableOpacity
            onPress={() => handleQuantityChange(item.id, "increase")}
            style={styles.quantityButton}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => handleDeleteItem(item.id)}
        style={styles.deleteButton}
      >
        <MaterialIcons name="delete" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Keranjang kosong</Text>
          </View>
        )}
        contentContainerStyle={styles.list}
      />
      <View style={styles.stickyFooter}>
        <Text style={styles.totalText}>
          Total: Rp {totalPrice.toLocaleString()}
        </Text>
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  list: {
    paddingBottom: 100, // Spacing for the sticky footer
  },
  item: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: "#FFF",
    marginBottom: 5,
    borderRadius: 10,
    alignItems: "center", // Aligns item content vertically
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  itemInfo: {
    marginLeft: 10,
    flex: 1, // Makes item info take available space
    justifyContent: "center",
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemPrice: {
    color: "#EE4D2D",
    fontWeight: "bold",
  },
  quantityContainer: {
    flexDirection: "row", // Mengubah arah menjadi row (horizontal)
    alignItems: "center",
    marginTop: 8,
  },
  quantityButton: {
    backgroundColor: "#EE4D2D",
    padding: 5, // Mengurangi padding untuk ukuran tombol yang lebih kecil
    borderRadius: 15, // Membuat tombol bulat dengan ukuran lebih kecil
    width: 30, // Lebar tombol
    height: 30, // Tinggi tombol
    justifyContent: "center",
    alignItems: "center",
  },
  quantityButtonText: {
    color: "white",
    fontSize: 18, // Menyesuaikan ukuran teks
    fontWeight: "bold",
  },
  itemQuantity: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 10, // Menambahkan margin horizontal agar ada jarak antar tombol dan teks quantity
  },
  deleteButton: {
    padding: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
  },
  emptyText: {
    fontSize: 18,
    color: "#666",
  },
  stickyFooter: {
    position: "sticky",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFF",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  checkoutButton: {
    backgroundColor: "#EE4D2D",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  checkoutButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CartScreen;
