import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
} from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Machine from "@/components/Machine";
import { icons, images } from "@/constants";
import SearchInput from "@/components/SearchInput";
import Report from "@/components/Report";
import { LinearGradient } from "expo-linear-gradient";
import { useFetch } from "@/lib/fetch";
import { RecentSearches, Reportt } from "@/types/type";

const Home = () => {
  const { user } = useUser();

  const {
    data: initialReports = [],
    loading: loadingReports,
    error: errorReports,
  } = useFetch<Reportt[]>(`/(api)/re/select`);

  const {
    data: recentMachines = [],
    loading: loadingMachines,
    error: errorMachines,
  } = useFetch<RecentSearches[]>(`/(api)/se/${user.id}`);

  const [machines, setMachines] = useState<RecentSearches[]>(
    recentMachines || [],
  );
  const [reports, setReports] = useState<Reportt[]>([]);

  useEffect(() => {
    setReports(initialReports);
  }, [initialReports]);

  useEffect(() => {
    if (recentMachines) {
      const uniqueMachines = recentMachines.filter(
        (machine, index, self) =>
          index === self.findIndex((m) => m.machine_id === machine.machine_id),
      );
      setMachines(uniqueMachines);
    }
  }, [recentMachines]);

  const handleSignOut = () => {
    router.push("/(auth)/sign-in");
  };

  const handleDeleteMachine = async (id: string) => {
    try {
      const body = {
        user_id: user?.id,
        machine_id: id,
      };

      const response = await fetch(`/(api)/se/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Failed to delete machine");
      }

      setMachines((prevMachines) =>
        prevMachines.filter((m) => m.machine_id !== id),
      );
    } catch (error) {
      console.error("Failed to delete machine:", error);
    }
  };

  const handleDeleteAllSearches = async () => {
    try {
      const body = {
        user_id: user?.id,
      };

      const response = await fetch(`/(api)/se/deleteall`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Failed to delete all searches");
      }

      setMachines([]);
    } catch (error) {
      console.error("Failed to delete all searches:", error);
    }
  };

  const handleDeleteReport = async (id: string) => {
    try {
      const response = await fetch("/(api)/re/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete report");
      }

      // Filter out the deleted report by ID
      setReports((prevReports) =>
        prevReports.filter((report) => report.id !== id),
      );
    } catch (error) {
      console.error("Error deleting report:", error);
    }
  };

  const handleDeleteAllReports = async () => {
    try {
      const response = await fetch("/(api)/re/deleteall", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete all reports");
      }

      // Set reports to an empty array
      setReports([]);
    } catch (error) {
      console.error("Error deleting all reports:", error);
    }
  };

  return (
    <LinearGradient colors={["#ffffff", "#1E8EBA"]} className="flex-1">
      <SafeAreaView className="flex">
        <FlatList
          data={machines}
          renderItem={({ item }) => (
            <Machine
              machine={item}
              onDelete={() => handleDeleteMachine(item.machine_id)}
            />
          )}
          keyExtractor={(item) => item.machine_id}
          className="px-5"
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={() => (
            <View className="flex flex-col items-center justify-center">
              <Image
                source={images.noResult}
                className="w-40 h-40"
                alt="No recent machines found"
                resizeMode="contain"
              />
              <Text className="text-sm"> No recent machines found</Text>
            </View>
          )}
          ListHeaderComponent={
            <>
              <View className="flex flex-row items-center justify-between my-5">
                <Text className="text-2xl text-[#1E8EBA] font-JakartaExtraBold">
                  Welcome {user?.firstName}👋
                </Text>
                <TouchableOpacity
                  onPress={handleSignOut}
                  className="justify-center items-center w-10 h-10 rounded-full bg-gray-100"
                >
                  <Image source={icons.out} className="w-4 h-4" />
                </TouchableOpacity>
              </View>

              <SearchInput />

              <Text className="text-xl font-JakartaBold mt-5 mb-1">
                Recent Reports
              </Text>

              <TouchableOpacity
                onPress={handleDeleteAllReports}
                className="mb-0"
              >
                <Text className="text-white font-JakartaBold text-right mx-3">
                  Clear All
                </Text>
              </TouchableOpacity>

              <Report posts={reports ?? []} onDelete={handleDeleteReport} />

              <Text className="text-xl font-JakartaBold mt-5 mb-3">
                Recent Searches
              </Text>

              <TouchableOpacity
                onPress={handleDeleteAllSearches}
                className="mb-0"
              >
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

export default Home;
