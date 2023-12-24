import React, { useRef, useState } from "react";
import {
  Animated,
  Modal,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import { useShallow } from "zustand/react/shallow";

import { DeleteIcon, EditIcon, MenuIcon } from "../assets/icons";

import useAppStore from "../store/appStore";

const ButtonMenu = ({ event }) => {
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const popupValue = useRef(new Animated.Value(0)).current;
  const { actions } = useAppStore(
    useShallow((state) => ({ actions: state.actions }))
  );
  const { deleteEvent, editEvent } = actions;

  const toggleOpen = () => {
    Animated.timing(popupValue, {
      toValue: open ? 0 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
    setOpen(!open);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 22,
          }}
        >
          <View
            style={{
              margin: 20,
              backgroundColor: "white",
              borderRadius: 20,
              padding: 35,
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
              rowGap: 10,
            }}
          >
            <Text>Bạn có chắc chắn xóa không ?</Text>
            <View style={{ flexDirection: "row", columnGap: 10 }}>
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderRadius: 8,
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  justifyContent: "center",
                  alignContent: "center",
                }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={{ fontWeight: "700" }}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  borderRadius: 8,
                  backgroundColor: "#3AB8FF",
                  alignContent: "center",
                  justifyContent: "center",
                }}
                onPress={() => {
                  deleteEvent(event.id);
                  setModalVisible(!modalVisible);
                  // Toast.success("Xóa sự kiện thành công!");
                  navigation.goBack();
                }}
              >
                <Text style={{ fontWeight: "700", color: "white" }}>Xóa</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Animated.View
        style={{
          position: "absolute",
          bottom: 120,
          right: 33,
          rowGap: 10,
          opacity: popupValue,
          pointerEvents: !open && "none",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            columnGap: 10,
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 8,
              alignItems: "center",
            }}
          >
            <Text style={{ fontWeight: "500" }}>Xóa</Text>
          </View>
          <TouchableOpacity
            style={{
              width: 54,
              height: 54,
              borderRadius: "50%",
              backgroundColor: "#FF3A3A",
              justifyContent: "center",
            }}
            onPress={() => {
              setModalVisible(true);
              toggleOpen();
            }}
          >
            <DeleteIcon width={54} color="white" />
          </TouchableOpacity>
        </View>
        {!event.closed && (
          <View
            style={{
              flexDirection: "row",
              columnGap: 10,
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 8,
                alignItems: "center",
              }}
            >
              <Text style={{ fontWeight: "500" }}>Sửa</Text>
            </View>
            <TouchableOpacity
              style={{
                width: 54,
                height: 54,
                borderRadius: "50%",
                backgroundColor: "white",
                justifyContent: "center",
              }}
              onPress={() => {
                toggleOpen();
                editEvent(event.id);
                navigation.navigate("edit-event", {
                  id: event.id,
                  title: event.title,
                });
              }}
            >
              <EditIcon width={54} color="#222222" />
            </TouchableOpacity>
          </View>
        )}
      </Animated.View>
      <TouchableOpacity
        style={{
          width: 60,
          height: 60,
          borderRadius: "50%",
          backgroundColor: "#3AB8FF",
          position: "absolute",
          justifyContent: "center",
          bottom: 40,
          right: 30,
        }}
        onPress={toggleOpen}
      >
        <MenuIcon width={60} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ButtonMenu;
