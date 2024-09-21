import * as Location from "expo-location";
import { ExpoMapboxNavigationView } from "expo-mapbox-navigation";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export default function App() {
  React.useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        setLocationAllowed(true);
      } else {
        setLocationAllowed(false);
      }
    })();
  }, []);

  const UpdateRoute = () => {
    setCoordinates([
      { latitude: 33.5873, longitude: -7.5902 },
      { latitude: 33.5957, longitude: -7.56383 },
      { latitude: 33.5985, longitude: -7.54626 },
    ]);
  };

  const [locationAllowed, setLocationAllowed] = React.useState(false);
  const [coordinates, setCoordinates] = React.useState([
    { latitude: 33.5873, longitude: -7.5902 },
    { latitude: 33.5939, longitude: -7.58189 },
    { latitude: 33.5957, longitude: -7.56383 },
    { latitude: 33.5985, longitude: -7.54626 },
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
          onLocationChange={(event: any) => {
            //console.log(event.nativeEvent);
          }}
          onRouteChanged={(event: any) => {
            const route = JSON.parse(event.nativeEvent.route);
            const directionsRoute = route.directionsRoute;
          }}
          onRouteReady={(event: any) => {
            const route = JSON.parse(event.nativeEvent.route);
            const directionsRoute = route.directionsRoute;
            console.log("onRouteReady");
          }}
          onUserOffRoute={(event: any) => {
            console.log(event.nativeEvent);
            //UpdateRoute();
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
