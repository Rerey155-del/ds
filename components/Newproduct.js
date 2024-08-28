import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
  Image,
} from "react-native";
import axios from "axios";

const NewProduct = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/barangBaru");
        console.log("Fetched data:", response.data);
        setData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        setError("Failed to fetch data");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate("ProductDetail", { product: item })}
    >
      <Image source={{ uri: item.gambar }} style={styles.image} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.nama_barang}</Text>
        <Text style={styles.itemPrice}>Rp {item.harga.toLocaleString()}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>
        {error ? "Error loading data" : "No results found"}
      </Text>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={renderEmptyList}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  list: {
    width: "100%",
  },
  columnWrapper: {
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  item: {
    flexDirection: "column",
    padding: 10,
    backgroundColor: "#FFF",
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
    marginBottom: 10,
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4, // Android shadow
  },
  image: {
    width: "100%",
    height: 120,
    borderRadius: 5,
    marginBottom: 5,
  },
  itemInfo: {
    justifyContent: "center",
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  itemPrice: {
    color: "#EE4D2D",
    fontWeight: "bold",
    textAlign: "center",
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
});

export default NewProduct;
