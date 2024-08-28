import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProductDetailScreen = ({
  route,
  navigation,
  itemsInCart,
  setItemsInCart,
}) => {
  const { product } = route.params;
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    // Load cart items from AsyncStorage when the component mounts
    const loadCartItems = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("cartItems");
        if (jsonValue != null) {
          setItemsInCart(JSON.parse(jsonValue));
        }
      } catch (e) {
        console.error("Failed to load cart items from AsyncStorage", e);
      }
    };

    loadCartItems();
  }, []);

  const addToCart = async () => {
    const itemExists = itemsInCart.find((item) => item.id === product.id);
    let updatedCart;

    if (itemExists) {
      updatedCart = itemsInCart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [...itemsInCart, { ...product, quantity: 1 }];
    }

    setItemsInCart(updatedCart);

    // Save updated cart items to AsyncStorage
    try {
      const jsonValue = JSON.stringify(updatedCart);
      await AsyncStorage.setItem("cartItems", jsonValue);
    } catch (e) {
      console.error("Failed to save cart items to AsyncStorage", e);
    }

    // Show modal and navigate to CartScreen after 1.5 seconds
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
      navigation.navigate("Cart");
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.gambar }} style={styles.image} />
      <Text style={styles.name}>{product.nama_barang}</Text>
      <Text style={styles.description}>{product.deskripsi}</Text>
      <Text style={styles.price}>Rp {product.harga.toLocaleString()}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.chatButton}>
          <Icon name="message-outline" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.cartButton} onPress={addToCart}>
          <Icon name="cart-outline" size={24} color="white" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.buyButton} onPress={addToCart}>
          <Text style={styles.buyButtonText}>
            Beli Dengan Voucher Rp {product.harga.toLocaleString()}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Modal for Cart Add Confirmation */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ActivityIndicator size="large" color="#EE4D2D" />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginVertical: 10,
    textAlign: "center",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#EE4D2D",
    marginVertical: 10,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 5,
  },
  chatButton: {
    flex: 1,
    backgroundColor: "#009688",
    padding: 2,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  cartButton: {
    flex: 1,
    backgroundColor: "#009688",
    padding: 2,
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  buyButton: {
    flex: 1.5,
    backgroundColor: "#EE4D2D",
    padding: 2,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    marginTop: 5,
  },
  buyButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 110,
    padding: 40,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
  },
});

export default ProductDetailScreen;
