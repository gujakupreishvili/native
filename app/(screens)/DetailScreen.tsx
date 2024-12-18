import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
} from "react-native";

interface ForecastDay {
  date: string;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    condition: { text: string };
  };
}

export default function DetailsScreen({ route }: { route: any }) {
  const { cityName } = route.params;

  const [forecastData, setForecastData] = useState<ForecastDay[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchWeatherForecast = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=196cbe371f1c40f9ba3113741241402&q=${cityName}&days=10`
        );
        const data = await response.json();
        setForecastData(data.forecast.forecastday);
      } catch (error) {
        console.error("Failed to fetch weather forecast", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherForecast();
  }, [cityName]);

  const getDayOfWeek = (date: string) => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",  
    month: "short", 
  };
  return new Date(date).toLocaleDateString("en-US", options);
};


  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : forecastData.length > 0 ? (
        <>
          <Text style={styles.title}>10-Day Weather Forecast for {cityName}</Text>
          <FlatList
            data={forecastData}
            keyExtractor={(_item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.forecastItem}>
                <Text style={styles.dayText}>{getDayOfWeek(item.date)}</Text>
                <Text style={styles.conditionText}>
                  Condition: {item.day.condition.text}
                </Text>
                <Text style={styles.tempText}>
                  Min: {item.day.mintemp_c}°C | Max: {item.day.maxtemp_c}°C
                </Text>
              </View>
            )}
          />
        </>
      ) : (
        <Text style={styles.noDataText}>No forecast data available</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  forecastItem: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  dayText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  conditionText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  tempText: {
    fontSize: 16,
    color: "#333",
  },
  noDataText: {
    fontSize: 18,
    color: "gray",
    textAlign: "center",
    marginTop: 20,
  },
});

