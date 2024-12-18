import { Button, Text, TextInput, View, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import React, { useState } from "react";


export default function HomeScreen({ navigation }: { navigation: any }) {
  
  const [city, setCity] = useState<string>("");
  const [weatherData, setWeatherData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchWeatherData = async () => {
    if (!city) {
      alert("Please enter a city name.");
      return;
    }
    const cityAlreadyExists = weatherData.some(
      (data) => data?.location?.name?.toLowerCase() === city.toLowerCase()
    );
  
    if (cityAlreadyExists) {
      alert(`The city "${city}" has already been searched.`);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=196cbe371f1c40f9ba3113741241402&q=${city}`
      );
      const data = await response.json();
      setWeatherData((prevData) => [...prevData, data]);
      setCity("");
    } catch (error) {
      alert("Failed to fetch weather data.");
    } finally {
      setLoading(false);
    }
  };
  console.log(weatherData)

  const removeItem = (index: number) => {
    setWeatherData((prevData) => prevData.filter((_, idx) => idx !== index));
  };

  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <View>
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            marginBottom: 20,
            marginTop:50,
            width: 200,
            paddingLeft: 8,
          }}
          placeholder="Enter your city name"
          value={city}
          onChangeText={(text) => setCity(text)}
        />
      <Button title="Search City" onPress={fetchWeatherData} />
      </View>
      {loading && <ActivityIndicator style={{marginTop:15}} size="large" color="#0000ff" />}
      {weatherData.length > 0 ? (
        <ScrollView
          style={{
            marginTop: 20,
            width: "80%",
            maxHeight: 400,
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 10,
            marginBottom:100,
          }}
        >
          {weatherData.map((data, index) => (
            <View
              key={index}
              style={{
                padding: 10,
                borderBottomWidth: 1,
                borderBottomColor: "#ccc",
              }}
            >
              <Text style={{ fontSize: 18 }}>
                Weather in {data?.location?.name}
              </Text>
              <View style={{gap:3, marginTop:6,}  }>
              <Text >Country:{data.location?.country}</Text>
              <Text >Temperature: {data.current?.temp_c}°C</Text>
              <Text >Condition: {data.current?.condition.text}</Text>
              <Text >Humidity: {data.current?.humidity}%</Text>
              </View>
              <View style={{
                display:"flex",
                flexDirection:"row",
                justifyContent:"space-between"
              }}>
              <TouchableOpacity onPress={() => removeItem(index)}>
                <Text style={{ color: "red", marginTop: 10 }}>
                  Delete
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Details", { cityName: data?.location?.name })
                }
              >
                <Text style={{ color: "blue", marginTop: 10 }}>Learn More</Text>
              </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      ) : (
        <Text style={{ marginTop: 20 }}>No weather data available</Text>
      )}
    </View>
  );
}
