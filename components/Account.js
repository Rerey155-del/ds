import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Screen4 = () => {
  const [username, setUsername] = useState(null);
  const navigation = useNavigation();
  const [logoutModal, setLogoutModal] = useState(false); // Modal state

  const data1 = [
    { id: "1", icon: "account-circle", title: "Pesanan Saya" },
    { id: "2", icon: "phone-android", title: "Pulsa, Tagihan & Tiket" },
  ];

  const data2 = [
    { id: "3", icon: "favorite-border", title: "Favorit Saya" },
    { id: "4", icon: "history", title: "Terakhir Dilihat" },
    { id: "5", icon: "star-border", title: "Penilaian Saya" },
    {
      id: "6",
      icon: "card-giftcard",
      title: "Voucher Saya",
      detail: "Pakai Vouchermu",
    },
    { id: "7", icon: "monetization-on", title: "Shopee Affiliate Program" },
  ];

  useFocusEffect(
    React.useCallback(() => {
      const checkLoginStatus = async () => {
        try {
          const storedUsername = await AsyncStorage.getItem("username");
          if (storedUsername) {
            setUsername(storedUsername);
          }
        } catch (e) {
          console.error(e);
        }
      };
      checkLoginStatus();
    }, [])
  );

  const handleLoginPress = () => {
    navigation.navigate("Login");
  };

  const handleLogoutPress = async () => {
    try {
      setLogoutModal(true); // Show loading modal
      await AsyncStorage.removeItem("username");
      setUsername(null);
      setTimeout(() => {
        setLogoutModal(false); // Hide loading modal after 2 seconds
        navigation.navigate("Screen"); // Navigate to Screen after 2 seconds
      }, 2000);
    } catch (e) {
      console.error(e);
      setLogoutModal(false); // Hide loading modal in case of error
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item}>
      <Icon name={item.icon} size={24} color="#EE4D2D" />
      <Text style={styles.itemText}>{item.title}</Text>
      {item.detail && <Text style={styles.itemDetail}>{item.detail}</Text>}
      <Icon name="chevron-right" size={24} color="#ccc" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Sticky Header */}
      <View style={styles.header}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginRight: "auto",
          }}
        >
          <Icon name="account-circle" size={30} color="white" />
          <Text style={{ fontSize: 18, color: "white", marginLeft: 10 }}>
            {username ? `Welcome, ${username}` : "Welcome User"}
          </Text>
        </View>
        <View style={styles.loginButtonWrapper}>
          {username ? (
            <TouchableOpacity
              onPress={handleLogoutPress}
              style={styles.logoutButton}
            >
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={handleLoginPress}
              style={styles.loginButton}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* FlatList pertama */}
      <View style={{ gap: 1 }}>
        <FlatList
          data={data1}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />

        {/* FlatList kedua */}
        <FlatList
          data={data2}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      </View>

      {/* Loading Modal */}
      <Modal visible={logoutModal} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ActivityIndicator size="large" color="#EE4D2D" />
            <Text style={styles.loadingText}>Logging out...</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    width: "100%",
    height: 130,
    backgroundColor: "#EE4D2D",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
    position: "sticky", // Menjadikan header sticky
    top: 0, // Posisi sticky di atas
    zIndex: 1, // Memberikan prioritas lebih tinggi untuk ditampilkan di atas FlatList
  },
  loginButtonWrapper: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  loginButton: {
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 5,
  },
  logoutButton: {
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#EE4D2D",
    fontWeight: "bold",
  },
  list: {
    paddingTop: 20,
  },
  item: {
    flexDirection: "row",
    padding: 15,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: "#FFF",
  },
  itemText: {
    marginLeft: 10,
    fontSize: 16,
    flex: 1,
  },
  itemDetail: {
    color: "#EE4D2D",
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Transparansi latar belakang
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 30,
    justifyContent: "center",
    alignItems: "center",
    width: 200, // Menentukan lebar modal untuk tampilan iPhone
  },
  loadingText: {
    marginTop: 10,
    color: "#000",
    fontSize: 16,
    textAlign: "center",
  },
});

export default Screen4;
