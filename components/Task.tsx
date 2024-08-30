import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import OptionsMenu from "react-native-options-menu";
import { EvilIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { TaskInfo } from "@/types/type";

const MoreIcon = require("@/assets/images/moreo.png");

interface TaskProps {
  task: TaskInfo;
  onDelete: (id: string) => void;
  onUpdateStatus: (id: string, status: string) => void;
}

const Task = ({ task, onDelete, onUpdateStatus }: TaskProps) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const [date] = dateString.split("T");
    return date;
  };

  const editTask = () => {
    router.push({
      pathname: "/(root)/editTask",
      params: { ...task },
    });
    console.log(task);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "rgba(222,107,114,0.6)";
      case "Medium":
        return "#ecc98d";
      case "Low":
        return "#92d092";
      default:
        return "#566ec5";
    }
  };

  const priorityColor = getPriorityColor(task.priority);

  return (
    <LinearGradient colors={["#fdfdfd", "#cddbde"]} className="rounded-xl mt-4">
      <View
        className="w-[70px] h-[30px] rounded-xl items-center justify-center top-2 left-4 absolute mt-2"
        style={{ backgroundColor: priorityColor }}
      >
        <Text className="text-md font-JakartaBold text-black">
          {task.priority}
        </Text>
      </View>

      <View
        className="w-[82px] h-[30px] rounded-xl items-center justify-center top-2 left-20 absolute mt-2 mx-3.5"
        style={{ backgroundColor: "#7995e3" }}
      >
        <Text className="text-md font-JakartaBold text-black items-center">
          {task.status}
        </Text>
      </View>

      <TouchableOpacity
        className="w-[60px] h-[32px] rounded-xl items-center justify-center absolute bottom-2 right-2"
        style={{ backgroundColor: "#e5dfdf" }}
        onPress={() => console.log("Comment clicked")}
      >
        <EvilIcons name="comment" size={24} color="black" />
      </TouchableOpacity>

      <View className="flex flex-row items-center justify-center rounded-lg mb-8 p-0">
        <View className="flex flex-col items-start justify-center p-3 mb-1">
          <View className="absolute top-2 right-2">
            <OptionsMenu
              button={MoreIcon}
              buttonStyle={{
                width: 25,
                height: 25,
                margin: 7.5,
                resizeMode: "contain",
              }}
              destructiveIndex={4}
              options={[
                "Mark as Done",
                "To Do",
                "In Progress",
                "Edit",
                "Delete",
              ]}
              actions={[
                () => onUpdateStatus(task.id, "Done"),
                () => onUpdateStatus(task.id, "To Do"),
                () => onUpdateStatus(task.id, "In progress"),
                editTask,
                () => onDelete(task.id),
              ]}
            />
          </View>

          <View className="flex flex-row items-center justify-between mt-10 p-0">
            <View className="flex flex-col mx-3 gap-y-5 flex-1">
              <Text
                className="text-xl font-JakartaBold text-black"
                numberOfLines={2}
              >
                {task.tasktitle}
              </Text>
              <Text className="text-md font-JakartaBold" numberOfLines={3}>
                {task.description}
              </Text>
            </View>
          </View>

          <View className="flex flex-col w-full mt-5 bg-general-500 rounded-lg p-3 items-start justify-center">
            <View className="flex flex-row items-center w-full justify-between mb-5">
              <Text className="text-md font-JakartaMedium text-blue-900">
                Status:
              </Text>
              <Text className="text-md font-JakartaBold">{task.status}</Text>
            </View>

            <View className="flex flex-row items-center w-full justify-between mb-5">
              <Text className="text-md font-JakartaMedium text-blue-900">
                Start Date:
              </Text>
              <Text className="text-md font-JakartaMedium text-blue-900">
                End Date:
              </Text>
            </View>

            <View className="flex flex-row items-center w-full justify-between mb-5">
              <Text className="text-md font-JakartaBold">
                {formatDate(task.createdat)}
              </Text>
              <Text className="text-md font-JakartaBold">
                {formatDate(task.enddate)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default Task;
