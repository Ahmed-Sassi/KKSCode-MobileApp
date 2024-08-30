import React from "react";
import { View, Text } from "react-native";
import { LineChart } from "react-native-gifted-charts";

// Example data: number of tasks done per day
const taskData = [
  { day: "Mon", tasksDone: 5 },
  { day: "Tue", tasksDone: 8 },
  { day: "Wed", tasksDone: 2 },
  { day: "Thu", tasksDone: 6 },
  { day: "Fri", tasksDone: 7 },
  { day: "Sat", tasksDone: 3 },
  { day: "Sun", tasksDone: 9 },
];

const TaskLineChart = () => {
  // Prepare the data for the line chart
  const lineData = taskData.map((item) => ({
    value: item.tasksDone,
    label: item.day,
  }));

  return (
    <View className="p-5">
      <Text className="text-lg font-bold mb-3">
        Tasks Completed Over the Week
      </Text>

      <LineChart
        data={lineData} // Line chart data
        width={290} // Width of the chart
        height={200} // Height of the chart
        Bezier // Enabling Bezier curve
        yAxisLabelTextStyle={{ color: "#2278a8", fontSize: 12 }} // Y-axis label style
        xAxisLabelTextStyle={{ color: "#177AD5", fontSize: 12 }} // X-axis label style
        color="#1E8EBA" // Line color
        thickness={3} // Line thickness
        curved // Smooth curves
        startOpacity={0.5} // Opacity at the top of the fill (close to the line)
        endOpacity={0.5}
        yAxisLabelWidth={20} // Adjust width for Y-axis labels
        startFillColor="#2278a8" // Light green fill under the curve
        endFillColor="#2278a8" // Use the same color but make the fill gradient fade
        showVerticalLines // Show vertical grid lines
        verticalLinesColor="#fff" // Color of the vertical grid lines
        // Optionally hide data points
      />
    </View>
  );
};

export default TaskLineChart;
