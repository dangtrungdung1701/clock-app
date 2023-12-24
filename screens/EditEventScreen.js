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

import { ClockIcon } from "../assets/icons";

import Input from "../components/Input";
import DateTimePickerCustom from "../components/DateTimePicker";
import Header from "../components/Header";

import { getDate, getTime } from "../utils";
import useAppStore from "../store/appStore";

const EditEventScreen = ({ navigation, route }) => {
  const { actions, editedEvent } = useAppStore(
    useShallow((state) => ({
      actions: state.actions,
      editedEvent: state.editedEvent,
    }))
  );
  const { saveEditedEvent, changePropertyEditedEvent } = actions;
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("date");

  const handleSaveEditedEvent = () => {
    saveEditedEvent();
    Toast.success("Sửa sự kiện thành công!");
    navigation.goBack();
  };

  const disabledCreate = useMemo(() => {
    return editedEvent.title && editedEvent.targetTime ? false : true;
  }, [JSON.stringify(editedEvent)]);
  return (
    <ImageBackground
      source={
        editedEvent.img || require("../assets/background/background-1.png")
      }
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
            value={editedEvent.title || ""}
            handleChange={(value) => {
              changePropertyEditedEvent("title", value);
            }}
          />
          <Input
            label="Ghi chú"
            value={editedEvent.description || ""}
            handleChange={(value) => {
              changePropertyEditedEvent("description", value);
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
                  {editedEvent.targetTime
                    ? getDate(new Date(editedEvent.targetTime))
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
                  {editedEvent.targetTime
                    ? getTime(new Date(editedEvent.targetTime))
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
                    changePropertyEditedEvent(
                      "notification",
                      !editedEvent.notification
                    );
                  }}
                  value={editedEvent.notification || false}
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
                navigation.navigate("background-create-event", {
                  id: editedEvent.id,
                });
              }}
            >
              <Image
                source={
                  editedEvent.img ||
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
            onPress={handleSaveEditedEvent}
          >
            <Text
              style={{
                color: disabledCreate ? "#666666" : "white",
                fontWeight: "700",
              }}
            >
              Lưu sự kiện
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
      <DateTimePickerCustom
        show={show}
        date={
          editedEvent.targetTime ? new Date(editedEvent.targetTime) : new Date()
        }
        mode={mode}
        handleChange={(selectedDate) => {
          setShow(false);
          const date = selectedDate.toISOString().split("T")[0];
          const time = selectedDate.toISOString().split("T")[1];
          changePropertyEditedEvent("targetTime", `${date}T${time}`);
        }}
        handleCancel={() => {
          setShow(false);
        }}
      />
    </ImageBackground>
  );
};

export default EditEventScreen;
