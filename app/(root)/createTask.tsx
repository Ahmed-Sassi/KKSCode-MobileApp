import React, { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as DocumentPicker from "expo-document-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { icons } from "@/constants";
import { router } from "expo-router";
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";

const Chat = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskStatus, setTaskStatus] = useState("To Do");
  const [description, setDescription] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("High");
  const [attachment, setAttachment] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const priorities = ["High", "Medium", "Low"];

  const createTask = async (taskData) => {
    try {
      const response = await fetch("/(api)/tk/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        Alert.alert("Error", errorData.error || "Failed to create task");
        return;
      }

      const result = await response.json();
      console.log("Task Created:", result.data);
      Alert.alert("Success", "Task created successfully!");
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "An error occurred while creating the task.");
    }
  };

  const pressCreateTask = async () => {
    if (!taskTitle || !description || !startDate || !endDate) {
      Alert.alert("Validation Error", "Please fill out all fields.");
      return;
    }

    const taskData = {
      taskTitle,
      description,
      selectedPriority,
      attachment,
      startDate: startDate.toISOString().split("T")[0],
      endDate: endDate.toISOString().split("T")[0],
      taskStatus,
    };

    try {
      await createTask(taskData);
      router.push("/(root)/tasks");
    } catch (error) {
      console.error("Error while creating task:", error);
      Alert.alert("Error", "Failed to create task.");
    }
  };

  const handlePress = () => {
    router.push("/(root)/tasks");
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({});
      if (result.type === "success") {
        setAttachment(result.uri);
      }
    } catch (error) {
      console.error("Error picking document:", error);
      Alert.alert("Error", "Failed to pick a document.");
    }
  };

  const removeAttachment = () => {
    setAttachment(null);
  };

  const onChangeStartDate = (event, selectedDate) => {
    setShowStartDatePicker(false);
    if (selectedDate) {
      setStartDate(selectedDate);
    }
  };

  const onChangeEndDate = (event, selectedDate) => {
    setShowEndDatePicker(false);
    if (selectedDate) {
      setEndDate(selectedDate);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-5">
      <View className="flex justify-between mt-2">
        <View className="flex-row mt-2">
          <TouchableOpacity
            className="w-10 h-10 rounded-full bg-white"
            onPress={handlePress}
          >
            <Image source={icons.backArrow} className="h-10 w-10" />
          </TouchableOpacity>
        </View>
        <Text className="text-black text-2xl text-center font-JakartaBold">
          Create Task
        </Text>
      </View>
      <ScrollView>
        <View className="p-5">
          <InputField
            label="Task Title"
            placeholder="Enter Task Title"
            value={taskTitle}
            onChangeText={setTaskTitle}
          />

          <InputField
            label="Description"
            placeholder="Enter Task Description"
            value={description}
            onChangeText={setDescription}
          />

          <Text className="text-black text-lg font-JakartaBold mt-5">
            Priority
          </Text>
          <View className="flex-row justify-between mt-2">
            {priorities.map((priority) => (
              <TouchableOpacity
                key={priority}
                className={`flex-1 m-1 p-3 rounded-md ${
                  selectedPriority === priority ? "bg-black" : "bg-gray-200"
                }`}
                onPress={() => setSelectedPriority(priority)}
              >
                <Text
                  className={`text-center ${
                    selectedPriority === priority ? "text-white" : "text-black"
                  }`}
                >
                  {priority}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            className="mt-6 p-4 border border-blue-500 rounded-md bg-blue-100"
            onPress={pickDocument}
          >
            <Text className="text-center text-blue-600 font-semibold">
              + Add Attachment
            </Text>
          </TouchableOpacity>

          {attachment && (
            <View className="mt-4 p-3 border border-gray-300 rounded-md">
              <Text className="text-black">Selected File:</Text>
              <Text className="text-black mt-2">{attachment}</Text>
              <TouchableOpacity
                className="mt-2 p-2 bg-red-500 rounded-md"
                onPress={removeAttachment}
              >
                <Text className="text-white text-center">
                  Remove Attachment
                </Text>
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity
            className="mt-6 p-4 border border-gray-300 rounded-md"
            onPress={() => setShowStartDatePicker(true)}
          >
            <Text className="text-center text-black">
              Start Date: {startDate.toLocaleDateString()}
            </Text>
          </TouchableOpacity>

          {showStartDatePicker && (
            <DateTimePicker
              value={startDate}
              mode="date"
              display="default"
              onChange={onChangeStartDate}
            />
          )}

          <TouchableOpacity
            className="mt-6 p-4 border border-gray-300 rounded-md"
            onPress={() => setShowEndDatePicker(true)}
          >
            <Text className="text-center text-black">
              End Date: {endDate.toLocaleDateString()}
            </Text>
          </TouchableOpacity>

          {showEndDatePicker && (
            <DateTimePicker
              value={endDate}
              mode="date"
              display="default"
              onChange={onChangeEndDate}
            />
          )}
        </View>
        <CustomButton
          title=" + Create Task"
          onPress={pressCreateTask}
          className="mt-6 bg-black"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Chat;
