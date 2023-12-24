import { useEffect, useState } from "react";
import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useShallow } from "zustand/react/shallow";

import Header from "../components/Header";
import useAppStore from "../store/appStore";
import { formattedTime } from "../utils";

const ClockDetailScreen = ({ route, navigation }) => {
  const { clock, actions } = useAppStore(
    useShallow((state) => ({ clock: state.clock, actions: state.actions }))
  );
  const { status, time, laps } = clock;
  const {
    startClock,
    pauseClock,
    continueClock,
    resetClock,
    addLapClock,
    setTimeClock,
  } = actions;

  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    if (status === "active") {
      const id = setInterval(() => {
        setTimeClock();
      }, 10);
      setIntervalId(id);
    } else {
      clearInterval(intervalId);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [status]);

  const handleAddLap = () => {
    addLapClock();
  };
  const handleReset = () => {
    resetClock();
  };
  const handleContinue = () => {
    continueClock();
  };
  const handlePause = () => {
    pauseClock();
  };

  const handleStart = () => {
    startClock();
  };
  return (
    <ImageBackground
      resizeMode="cover"
      source={require("../assets/background/background-1.png")}
      style={{ flex: 1 }}
    >
      <SafeAreaView
        style={{ height: "100%", backgroundColor: "rgba(0,0,0,0.6)" }}
      >
        <Header route={route} navigation={navigation} />
        <View style={{ flex: 1, paddingHorizontal: 10 }}>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 60, color: "white" }}>
              {formattedTime(time)}
            </Text>
          </View>
          <View style={{ flex: 1.5, rowGap: 20 }}>
            <View
              style={{
                flexDirection: "row",
                alignSelf: "center",
                columnGap: 50,
              }}
            >
              {status === "active" && (
                <TouchableOpacity
                  style={{
                    padding: 15,
                    borderRadius: 4,
                    backgroundColor: "rgba(233, 233, 233, 0.5)",
                  }}
                  onPress={handleAddLap}
                >
                  <Text>LƯỢT</Text>
                </TouchableOpacity>
              )}

              {status === "inactive" && time !== 0 && (
                <TouchableOpacity
                  style={{
                    padding: 15,
                    borderRadius: 4,
                    backgroundColor: "rgba(255, 0, 0, 0.5)",
                  }}
                  onPress={handleReset}
                >
                  <Text>ĐẶT LẠI</Text>
                </TouchableOpacity>
              )}

              {status === "inactive" && time !== 0 && (
                <TouchableOpacity
                  style={{
                    padding: 15,
                    borderRadius: 4,
                    backgroundColor: "rgba(34,139,34,0.5)",
                  }}
                  onPress={handleContinue}
                >
                  <Text style={{ color: "white" }}>TIẾP TỤC</Text>
                </TouchableOpacity>
              )}
              {status === "active" && (
                <TouchableOpacity
                  style={{
                    padding: 15,
                    borderRadius: 4,
                    backgroundColor: "rgba(34,139,34,0.5)",
                    borderColor:
                      " linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%)",
                  }}
                  onPress={handlePause}
                >
                  <Text style={{ color: "white" }}>TẠM DỪNG</Text>
                </TouchableOpacity>
              )}
              {status === "inactive" && time === 0 && (
                <TouchableOpacity
                  style={{
                    padding: 15,
                    borderRadius: 4,
                    backgroundColor: "rgba(58, 184, 255, 0.5)",
                  }}
                  onPress={handleStart}
                >
                  <Text style={{ color: "white" }}>Bắt đầu</Text>
                </TouchableOpacity>
              )}
            </View>
            <FlatList
              contentContainerStyle={{ rowGap: 5 }}
              data={laps}
              renderItem={({ item }) => {
                return (
                  <View
                    style={{
                      backgroundColor: "rgba(35, 17, 56, 0.78)",
                      borderRadius: 8,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingHorizontal: 20,
                      paddingVertical: 15,
                    }}
                  >
                    <Text style={{ color: "white" }}>Lượt {item.count}</Text>
                    <Text style={{ color: "white", fontSize: 24 }}>
                      {formattedTime(item.time)}
                    </Text>
                  </View>
                );
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default ClockDetailScreen;
