import { ViewStyle, StyleProp } from "react-native/types";

type ProgressEvent = {
  distanceRemaining: number;
  distanceTraveled: number;
  durationRemaining: number;
  fractionTraveled: number;
};

export type ExpoMapboxNavigationViewProps = {
  coordinates: Array<{ latitude: number; longitude: number }>;
  locale?: string;
  onRouteProgressChanged?: (event: { nativeEvent: ProgressEvent }) => void;
  onCancelNavigation?: () => void;
  onWaypointArrival?: (event: {
    nativeEvent: ProgressEvent | undefined;
  }) => void;
  onFinalDestinationArrival?: () => void;
  onRouteChanged?: (event: { nativeEvent: any }) => void;
  onUserOffRoute?: () => void;
  style?: StyleProp<ViewStyle>;
};
