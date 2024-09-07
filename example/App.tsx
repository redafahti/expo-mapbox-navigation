import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { ExpoMapboxNavigationView } from "expo-mapbox-navigation";
import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";

export default function App() {
  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        setLocationAllowed(true);
      } else {
        setLocationAllowed(false);
      }
    })();
  }, []);

  const UpdateRoute = () => {
    setCoordinates([
      { latitude: 33.554487, longitude: -7.528364 },
      { latitude: 33.595095, longitude: -7.594907 },
    ]);
  };

  const [locationAllowed, setLocationAllowed] = React.useState(false);
  const [coordinates, setCoordinates] = React.useState([
    { latitude: 33.554487, longitude: -7.528364 },
    { latitude: 33.569632, longitude: -7.5742 },
    { latitude: 33.595095, longitude: -7.594907 },
  ]);
  return (
    <View style={styles.container}>
      {locationAllowed ? (
        <ExpoMapboxNavigationView
          style={{ flex: 1 }}
          coordinates={coordinates}
          onRouteProgressChanged={(event: any) => {
            //console.log(event.nativeEvent);
          }}
          onRouteChanged={(event: any) => {
            const route = JSON.parse(event.nativeEvent.route);
            const directionsRoute = route.directionsRoute;
            console.log(directionsRoute);
          }}
        />
      ) : (
        <Text style={styles.text}>Location required for mapbox navigation</Text>
      )}
      <View
        style={{
          backgroundColor: "#fff",
          minHeight: "20%",
          padding: 20,
          position: "absolute",
          bottom: 0,
          width: "100%",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          elevation: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            UpdateRoute();
          }}
          style={{
            backgroundColor: "#dbdbdb",
            height: 50,
            borderRadius: 1000,
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <Text>Update Route</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    alignSelf: "center",
  },
});
