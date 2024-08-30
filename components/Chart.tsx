import { PieChart } from "react-native-gifted-charts";
import { View, Text } from "react-native";
import React from "react";

const Chart = ({ ongoingTasks }) => {
  // Calculate counts for each task status
  const toDoCount = ongoingTasks.filter(
    (task) => task.status === "To Do",
  ).length;
  const inProgressCount = ongoingTasks.filter(
    (task) => task.status === "In progress",
  ).length;
  const doneCount = ongoingTasks.filter(
    (task) => task.status === "Done",
  ).length;

  const pieData = [
    { value: toDoCount, color: "#187295", label: "To Do" },
    { value: inProgressCount, color: "#238BDC", label: "In Progress" },
    { value: doneCount, color: "#23ABDC", label: "Done" },
  ];

  // Calculate the total number of tasks
  const totalTasks = toDoCount + inProgressCount + doneCount;

  return (
    <View className="flex flex-row items-center justify-between p-1 gap-x-1 ml-0">
      <PieChart
        donut
        radius={105}
        innerRadius={80}
        data={pieData}
        centerLabelComponent={() => {
          return (
            <Text className="text-black text-2xl font-JakartaMedium">
              {totalTasks} Tasks
            </Text>
          );
        }}
      />

      <View className="flex space-x-2 right-0">
        {pieData.map((slice, index) => (
          <View key={index} className="flex-row items-center my-2 mx-2">
            <View
              style={{
                width: 10,
                height: 10,
                backgroundColor: slice.color,
                borderRadius: 5,
              }}
              className="mr-1.5"
            />
            <Text>
              {slice.label}: {slice.value}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Chart;
