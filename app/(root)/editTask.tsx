import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";
import DateTimePicker from "@react-native-community/datetimepicker";

const updateTask = async (taskData) => {
  try {
    const response = await fetch(`/(api)/tk/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      Alert.alert("Error", errorData.error || "Failed to update task");
      return;
    }

    const result = await response.json();
    console.log("Task Updated:", result.data);
    Alert.alert("Success", "Task updated successfully!");
  } catch (error) {
    console.error("Error:", error);
    Alert.alert("Error", "An error occurred while updating the task.");
  }
};

const EditTaskScreen = () => {
  const task = useLocalSearchParams();
  const [taskId, setTaskId] = useState(task.id);
  const [taskTitle, setTaskTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("High");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const priorities = ["High", "Medium", "Low"];

  const handleUpdateTask = async () => {
    if (!taskTitle || !description || !startDate || !endDate) {
      Alert.alert("Validation Error", "Please fill out all fields.");
      return;
    }

    const taskData = {
      taskId,
      taskTitle,
      description,
      selectedPriority,
      startDate: startDate.toISOString().split("T")[0],
      endDate: endDate.toISOString().split("T")[0],
      taskStatus: "To Do",
    };

    await updateTask(taskData);
    router.replace("/(root)/tasks");
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
    <SafeAreaView className="flex-1 p-5 bg-white">
      <Text className="text-2xl font-bold">Edit Task</Text>
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
                className={`flex-1 m-1 p-3 rounded-md ${selectedPriority === priority ? "bg-black" : "bg-gray-200"}`}
                onPress={() => setSelectedPriority(priority)}
              >
                <Text
                  className={`text-center ${selectedPriority === priority ? "text-white" : "text-black"}`}
                >
                  {priority}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

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
          title="Update Task"
          onPress={handleUpdateTask}
          className="mt-6 bg-black"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditTaskScreen;
