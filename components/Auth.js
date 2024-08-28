import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  Image,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Modal from "react-native-modal";
// import { spiral } from 'ldrs'

// spiral.register()

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [pesan, setPesan] = useState("");
  const [modal, setModal] = useState(false);
  const navigation = useNavigation();

  const login = async () => {
    try {
      const response = await axios.get("http://localhost:3000/akun");

      if (response.data) {
        const user = response.data.find((user) => user.username === username);
        if (user && user.password === password) {
          setModal(true);
          await AsyncStorage.setItem("username", username);
          setTimeout(() => {
            setModal(false);
            navigation.goBack(); // Kembali ke Screen4 tanpa mengubah TabBottom
          }, 2000);
        } else {
          setPesan(user ? "Password salah" : "Username tidak ditemukan");
        }
      } else {
        setPesan("Data kosong");
      }
    } catch (error) {
      setPesan("Terjadi kesalahan, coba lagi nanti");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Image
        source={require("../assets/Shopee-logo.jpg")}
        style={{
          width: 100,
          height: 100,
          alignSelf: "center",
          marginBottom: 24,
        }}
      />

      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={{
          height: 40,
          borderColor: "#ccc",
          borderWidth: 1,
          marginBottom: 12,
          paddingHorizontal: 12,
        }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          height: 40,
          borderColor: "#ccc",
          borderWidth: 1,
          marginBottom: 12,
          paddingHorizontal: 12,
        }}
      />
      <Button color="#EE4D2D" onPress={login} title="Login" />
      {pesan ? (
        <Text style={{ marginTop: 12, color: "red" }}>{pesan}</Text>
      ) : null}

      <Modal
        isVisible={modal}
        animationIn="zoomIn"
        animationOut="zoomOut"
        animationInTiming={500}
        animationOutTiming={500}
        backdropOpacity={0.5}
        backdropColor="#000"
      >
        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 10,
            padding: 50,
            justifyContent: "center",
            alignSelf: "center",
          }}
        >
          <ActivityIndicator size="large" color="#EE4D2D" />
          <Text style={{ paddingTop: 10, fontWeight: "bold" }}>Berhasil</Text>
        </View>
      </Modal>
    </View>
  );
};

export default LoginScreen;
