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
import { router, useLocalSearchParams } from "expo-router";
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";

const CreateReport = () => {
  const { machine_id } = useLocalSearchParams();

  const [reportTitle, setReportTitle] = useState("");
  const [reportedBy, setReportedBy] = useState("");
  const [reportProblem, setReportProblem] = useState("");
  const [reportPriority, setReportPriority] = useState("");
  const [reportDate, setReportDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const priorities = ["High", "Medium", "Low"];

  const createReport = async (reportData) => {
    try {
      const response = await fetch(`/(api)/re/${machine_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reportData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        Alert.alert("Error", errorData.error || "Failed to create report");
        return;
      }

      const result = await response.json();
      Alert.alert("Success", "Report created successfully!");
      router.push("/(root)"); // Redirect or update UI as needed
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "An error occurred while creating the report.");
    }
  };

  const pressCreateReport = async () => {
    if (
      !reportTitle ||
      !reportedBy ||
      !reportDate ||
      !reportProblem ||
      !reportPriority
    ) {
      Alert.alert("Validation Error", "Please fill out all fields.");
      return;
    }

    const reportData = {
      report_title: reportTitle,
      reported_by: reportedBy,
      report_problem: reportProblem,
      report_priority: reportPriority,
      report_date: reportDate.toISOString().split("T")[0],
      machine_id,
    };

    await createReport(reportData);
    router.push("/(root)/home");
  };

  const handlePress = () => {
    router.push("/(root)/home");
  };

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false);
    setReportDate(selectedDate || reportDate);
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-5">
      <View className="flex justify-between mt-2">
        <View className="flex-row mt-2">
          <TouchableOpacity
            className="flex w-10 h-10 rounded-full bg-white"
            onPress={handlePress}
          >
            <Image source={icons.backArrow} className="h-10 w-10" />
          </TouchableOpacity>
        </View>
        <Text className="text-black text-2xl text-center font-JakartaBold">
          Create Report
        </Text>
      </View>
      <ScrollView>
        <View className="p-5">
          <InputField
            label="Report Title"
            placeholder="Enter Report Title"
            value={reportTitle}
            onChangeText={setReportTitle}
          />

          <InputField
            label="Reported By"
            placeholder="Enter Reporter Name"
            value={reportedBy}
            onChangeText={setReportedBy}
          />

          <InputField
            label="Machine Problem"
            placeholder="Enter Machine Problem"
            value={reportProblem}
            onChangeText={setReportProblem}
          />

          <TouchableOpacity
            className="mt-6 p-4 border border-gray-300 rounded-md"
            onPress={() => setShowDatePicker(true)}
          >
            <Text className="text-center text-black">
              Report Date: {reportDate.toLocaleDateString()}
            </Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={reportDate}
              mode="date"
              display="default"
              onChange={onChangeDate}
            />
          )}
        </View>
        <View className="flex-row justify-between mt-2">
          {priorities.map((priority) => (
            <TouchableOpacity
              key={priority}
              className={`flex-1 m-1 p-3 rounded-md ${
                reportPriority === priority ? "bg-black" : "bg-gray-200"
              }`}
              onPress={() => setReportPriority(priority)}
            >
              <Text
                className={`text-center ${
                  reportPriority === priority ? "text-white" : "text-black"
                }`}
              >
                {priority}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <CustomButton
          title="+ Create Report"
          onPress={pressCreateReport}
          className="mt-6 bg-black"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateReport;
