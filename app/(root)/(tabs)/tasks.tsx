import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import { TextInput } from "react-native";
import Machine from "@/components/Machine";
import { icons, images } from "@/constants";
import Task from "@/components/Task";
import { router } from "expo-router";
import { useFetch } from "@/lib/fetch";
import { MachineInfo, RecentSearches, TaskInfo } from "@/types/type";
import { LinearGradient } from "expo-linear-gradient";
import PieChart from "react-native-pie-chart";
import Chart from "@/components/Chart";
import TaskLineChart from "@/components/TaskLineChart";
import AntDesign from "@expo/vector-icons/AntDesign";

const handlecreate = () => {
  router.push("/(root)/createTask");
};

const CreateTaskScreen = () => {
  const {
    data: fetchedTasks = [],
    loading,
    error,
  } = useFetch<TaskInfo[]>(`/(api)/tk/select`);

  const [ongoingTasks, setOngoingTasks] = useState(fetchedTasks);

  useEffect(() => {
    setOngoingTasks(fetchedTasks);
  }, [fetchedTasks]);

  const onDelete = async (id: string) => {
    try {
      const response = await fetch(`/(api)/tk/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        // Remove the deleted task from the state
        setOngoingTasks((prevTasks) =>
          prevTasks.filter((task) => task.id !== id),
        );
        console.log("Task deleted successfully");
      } else {
        const result = await response.json();
        console.error("Error deleting task:", result.error);
      }
    } catch (error) {
      console.error("Error during delete request:", error);
    }
  };

  const onUpdateStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`/(api)/tk/updates`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });

      if (response.ok) {
        setOngoingTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === id ? { ...task, status } : task,
          ),
        );
        console.log("Task status updated successfully");
      } else {
        const result = await response.json();
        console.error("Error updating status:", result.error);
      }
    } catch (error) {
      console.error("Error during status update:", error);
    }
  };

  const handleDeleteAllTasks = async () => {
    try {
      const response = await fetch("/(api)/tk/deleteall", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete all tasks");
      }

      setOngoingTasks([]);
    } catch (error) {
      console.error("Error deleting all reports:", error);
    }
  };

  return (
    <LinearGradient colors={["#ffffff", "#1E8EBA"]} className="flex-1">
      <SafeAreaView className="flex-1">
        <FlatList
          data={ongoingTasks}
          renderItem={({ item }) => (
            <Task
              task={item}
              onDelete={() => onDelete(item.id)}
              onUpdateStatus={onUpdateStatus}
            />
          )}
          keyExtractor={(item) => item.id}
          className="px-5"
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={() => (
            <View className="flex flex-col items-center justify-center">
              <Image
                source={images.noResult}
                className="w-40 h-40"
                alt="No recent tasks found"
                resizeMode="contain"
              />
              <Text className="text-sm">No recent tasks found</Text>
            </View>
          )}
          ListHeaderComponent={
            <>
              <View className="flex my-5 ">
                <View className="flex flex-row items-center justify mt-2">
                  <Text className="text-2xl font-JakartaExtraBold">
                    Manage Your
                  </Text>
                </View>
                <View className="flex flex-row items-center mt-2">
                  <Text className="text-2xl font-JakartaExtraBold">
                    Daily Tasks
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={handlecreate}
                  className="absolute top-2 right-2 w-10 h-10 justify-center items-center rounded-full bg-white"
                >
                  <AntDesign name="pluscircleo" size={24} color="black" />
                </TouchableOpacity>
              </View>
              <View className="flex items-center justify-between rounded-xl bg-gray-100 p-7 mt-1 mb-2 ">
                <View className="flex-row items-center left-4 absolute mt-2 ">
                  <Text className="text-black font-JakartaBold text-xl">
                    Task Overview
                  </Text>
                </View>
                <View className="flex items-center justify-center mt-3 p-0 ">
                  <Chart ongoingTasks={ongoingTasks ?? []} />
                </View>
              </View>

              <Text className="text-2xl font-JakartaBold mt-5 mb-3">
                On Going
              </Text>
              <TouchableOpacity onPress={handleDeleteAllTasks} className="mb-0">
                <Text className="text-white font-JakartaBold text-right mx-3">
                  Clear All
                </Text>
              </TouchableOpacity>
            </>
          }
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default CreateTaskScreen;
