import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { useShallow } from "zustand/react/shallow";

import Header from "../components/Header";
import useAppStore from "../store/appStore";

const BackgroundCreateEventScreen = ({ navigation, route }) => {
  const { actions, newEvent, editedEvent } = useAppStore(
    useShallow((state) => ({
      actions: state.actions,
      editedEvent: state.editedEvent,
      newEvent: state.newEvent,
    }))
  );
  const { changePropertyEditedEvent, changePropertyNewEvent } = actions;

  return (
    <SafeAreaView>
      <Header route={route} navigation={navigation} />
      <ScrollView
        contentContainerStyle={{
          flexDirection: "row",
          flexWrap: "wrap",
          padding: 10,
        }}
      >
        {listBackground.map((item) => {
          const isActive = route.params.id
            ? editedEvent.img === item
            : newEvent.img === item;
          return (
            <View
              style={{
                width: 100 / 3 + "%",
                aspectRatio: 1 / 1,
                borderRadius: 8,
                overflow: "hidden",
                padding: 5,
                borderWidth: isActive && 3,
                borderColor: "#3AB8FF",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  if (route.params.id) {
                    changePropertyEditedEvent("img", item);
                  } else {
                    changePropertyNewEvent("img", item);
                  }
                  navigation.goBack();
                }}
              >
                <Image
                  source={item}
                  style={{ width: "100%", height: "100%" }}
                />
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default BackgroundCreateEventScreen;

const listBackground = [
  require("../assets/background/background-1.png"),
  require("../assets/background/background-2.png"),
  require("../assets/background/background-3.png"),
  require("../assets/background/background-4.png"),
  require("../assets/background/background-5.png"),
  require("../assets/background/background-6.png"),
  require("../assets/background/background-7.png"),
  require("../assets/background/background-8.png"),
  require("../assets/background/background-9.png"),
  require("../assets/background/background-10.png"),
  require("../assets/background/background-11.png"),
  require("../assets/background/background-12.png"),
  require("../assets/background/background-13.png"),
  require("../assets/background/background-14.png"),
  require("../assets/background/background-15.png"),
  require("../assets/background/background-16.png"),
  require("../assets/background/background-17.png"),
  require("../assets/background/background-18.png"),
  require("../assets/background/background-19.png"),
];
