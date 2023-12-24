import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const DateTimePickerCustom = ({
  show,
  mode,
  date,
  handleChange,
  handleCancel,
}) => {
  const [selectedDate, setSelectedDate] = useState(date);
  if (!show) return;
  return (
    <View
      style={{
        alignItems: "center",
        rowGap: 20,
        position: "absolute",
        bottom: 0,
        backgroundColor: "white",
        left: 0,
        width: "100%",
        paddingBottom: 20,
      }}
    >
      <DateTimePicker
        style={{
          height: 150,
        }}
        testID="dateTimePicker"
        value={date}
        mode={mode}
        is24Hour
        onChange={(e, value) => {
          setSelectedDate(value);
        }}
        display="spinner"
        locale="vi-VN"
      />
      <View style={{ flexDirection: "row", columnGap: 20 }}>
        <TouchableOpacity
          style={{
            backgroundColor: "gray",
            padding: 10,
            borderRadius: 10,
          }}
          onPress={handleCancel}
        >
          <Text
            style={{
              fontWeight: "bold",
              color: "white",
            }}
          >
            Hủy
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ backgroundColor: "#3AB8FF", padding: 10, borderRadius: 10 }}
          onPress={() => {
            handleChange(selectedDate);
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              color: "white",
            }}
          >
            Xác nhận
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DateTimePickerCustom;
