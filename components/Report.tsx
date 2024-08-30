import React, { useState } from "react";
import * as Animatable from "react-native-animatable";
import { Text, FlatList, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { router } from "expo-router";

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "High":
      return "rgba(255,60,77,0.6)"; // Light red for high priority
    case "Medium":
      return "#ecc98d"; // Light orange for medium priority
    case "Low":
      return "#92d092"; // Light green for low priority
    default:
      return "#d3d3d3"; // Light gray for unknown priority
  }
};

const zoomIn = {
  0: { scale: 0.9 },
  1: { scale: 1 },
};

const zoomOut = {
  0: { scale: 1 },
  1: { scale: 0.9 },
};

const handleReportPress = (item: any, onDelete: (id: string) => void) => {
  router.push("/(root)/reportp");
  router.setParams(item);
};

interface TrendingItemProps {
  activeItem: string;
  item: any;
  onDelete: (id: string) => void;
}

const TrendingItem: React.FC<TrendingItemProps> = ({
  activeItem,
  item,
  onDelete,
}) => {
  const priorityColor = getPriorityColor(item.priority);

  return (
    <Animatable.View
      className="mr-0 mb-1 mt-4"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
      style={{ width: 230, height: 150 }}
    >
      <TouchableOpacity
        onPress={() => handleReportPress(item, onDelete)}
        className="flex-1 rounded-xl p-3 mr-3 shadow-sm bg-gray-100"
      >
        <View className="flex flex-row items-center absolute">
          <View className="justify-center items-center w-8 h-8 rounded-full bg-gray-200 left-2 mt-2">
            <Icon name="edit" size={16} color="black" />
          </View>
        </View>

        <View className="rounded flex-1">
          <View
            className="flex w-[70px] h-[30px] rounded-xl items-center justify-center absolute right-0 mt-0"
            style={{ backgroundColor: priorityColor }}
          >
            <Text className="text-md font-JakartaBold text-black">
              {item.priority}
            </Text>
          </View>

          <View className="bg-gray-200 rounded-2xl mt-9 p-1">
            <View className="flex flex-row items-center justify-between mt-1 mb-2">
              <Text className="text-sm font-semibold text-[#1E8EBA]">
                Report:
              </Text>
              <Text className="text-xs font-semibold text-black">
                {item.report_title}
              </Text>
            </View>

            <View className="flex flex-row items-center justify-between mb-2">
              <Text className="text-sm font-semibold text-[#1E8EBA]">
                Problem:
              </Text>
              <Text className="text-xs font-semibold text-black">
                {item.report_problem}
              </Text>
            </View>

            <View className="flex flex-row items-center justify-between mb-2">
              <Text className="text-sm font-semibold text-[#1E8EBA]">
                Reported By:
              </Text>
              <Text className="text-xs font-semibold text-black">
                {item.reported_by}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animatable.View>
  );
};

interface TrendingProps {
  posts: any[];
  onDelete: (id: string) => void;
}

const Trending: React.FC<TrendingProps> = ({ posts, onDelete }) => {
  const [activeItem, setActiveItem] = useState(posts[1]?.$id);

  const viewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: any[];
  }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <FlatList
      data={posts}
      horizontal
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} onDelete={onDelete} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
      contentOffset={{ x: 170 }}
    />
  );
};

export default Trending;
