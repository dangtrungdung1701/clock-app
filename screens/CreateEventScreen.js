import { useMemo, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import { useShallow } from "zustand/react/shallow";
import { Toast } from "toastify-react-native";
import Checkbox from "expo-checkbox";

import { AddIcon, ClockIcon } from "../assets/icons";

import Input from "../components/Input";
import DateTimePickerCustom from "../components/DateTimePicker";
import Header from "../components/Header";

import { getDate, getTime } from "../utils";
import useAppStore from "../store/appStore";

const CreateEventScreen = ({ navigation, route }) => {
  const { actions, newEvent } = useAppStore(
    useShallow((state) => ({
      actions: state.actions,
      newEvent: state.newEvent,
    }))
  );
  const { createNewEvent, changePropertyNewEvent } = actions;
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("date");

  const handleCreateEvent = () => {
    const date = newEvent.dateTime.date.toISOString().split("T")[0];
    const time = newEvent.dateTime.time.toISOString().split("T")[1];

    const createdEvent = {
      title: newEvent.title,
      description: newEvent.description,
      divider: true,
      img: newEvent.img || require("../assets/background/background-1.png"),
      targetTime: `${date}T${time}`,
    };
    createNewEvent(createdEvent);
    Toast.success("Tạo sự kiện thành công!");
  };

  const disabledCreate = useMemo(() => {
    return newEvent.title && newEvent.dateTime?.date && newEvent.dateTime?.time
      ? false
      : true;
  }, [JSON.stringify(newEvent)]);
  return (
    <ImageBackground
      source={require("../assets/background/background-create.png")}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ backgroundColor: "rgba(0,0,0,0.6)", flex: 1 }}>
        <Header route={route} navigation={navigation} />
        <ScrollView
          contentContainerStyle={{
            rowGap: 20,
          }}
          style={{ padding: 10 }}
        >
          <Input
            label="Tiêu đề"
            mandatory
            value={newEvent.title || ""}
            handleChange={(value) => {
              changePropertyNewEvent("title", value);
            }}
          />
          <Input
            label="Ghi chú"
            value={newEvent.description || ""}
            handleChange={(value) => {
              changePropertyNewEvent("description", value);
            }}
          />
          <View
            style={{
              borderLeftWidth: 2,
              borderColor: "white",
              paddingHorizontal: 10,
              rowGap: 15,
            }}
          >
            <Text style={{ fontWeight: "500", color: "white" }}>
              Đặt thời gian đếm ngược (*)
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                columnGap: 20,
              }}
            >
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  backgroundColor: "#3AB8FF",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <ClockIcon width={30} color="white" />
              </View>
              <TouchableOpacity
                onPressIn={() => {
                  setShow(true);
                  setMode("date");
                }}
              >
                <Text style={{ fontWeight: "500", color: "white" }}>
                  {newEvent.dateTime?.date
                    ? getDate(newEvent.dateTime?.date)
                    : "MM/DD/YYYY"}
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                columnGap: 20,
              }}
            >
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  backgroundColor: "#3AB8FF",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <ClockIcon width={30} color="white" />
              </View>
              <TouchableOpacity
                onPressIn={() => {
                  setShow(true);
                  setMode("time");
                }}
              >
                <Text style={{ fontWeight: "500", color: "white" }}>
                  {newEvent.dateTime?.time
                    ? getTime(newEvent.dateTime?.time)
                    : "HH:MM A"}
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View style={{ width: 50, alignItems: "center" }}>
                <Checkbox
                  color="white"
                  onValueChange={() => {
                    changePropertyNewEvent(
                      "notification",
                      !newEvent.notification
                    );
                  }}
                  value={newEvent.notification || false}
                />
              </View>
              <Text style={{ fontSize: 12, color: "white" }}>
                Gửi thông báo khi đếm ngược kết thúc
              </Text>
            </View>
          </View>
          <View
            style={{
              borderLeftWidth: 2,
              borderColor: "white",
              paddingHorizontal: 10,
              rowGap: 15,
            }}
          >
            <Text style={{ fontWeight: "500", color: "white" }}>
              Đặt hình nền cho bộ đếm ngược
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("background-create-event");
              }}
            >
              <Image
                source={
                  newEvent.img ||
                  require("../assets/background/background-1.png")
                }
                style={{ width: 120, height: 120 }}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            disabled={disabledCreate}
            style={{
              backgroundColor: disabledCreate ? "#cccccc" : "#3AB8FF",
              borderRadius: 8,
              padding: 20,
              alignSelf: "center",
              flexDirection: "row",
              alignItems: "center",
              columnGap: 5,
            }}
            onPress={handleCreateEvent}
          >
            <AddIcon color={disabledCreate ? "#666666" : "white"} />
            <Text
              style={{
                color: disabledCreate ? "#666666" : "white",
                fontWeight: "700",
              }}
            >
              Tạo mới
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
      <DateTimePickerCustom
        show={show}
        date={
          newEvent.dateTime?.[mode] ? newEvent.dateTime?.[mode] : new Date()
        }
        mode={mode}
        handleChange={(selectedDate) => {
          setShow(false);
          changePropertyNewEvent("dateTime", {
            ...newEvent.dateTime,
            [mode]: selectedDate,
          });
        }}
        handleCancel={() => {
          setShow(false);
        }}
      />
    </ImageBackground>
  );
};

export default CreateEventScreen;
