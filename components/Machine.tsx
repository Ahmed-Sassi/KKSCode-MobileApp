import { Image, Text, TouchableOpacity, View } from "react-native";

import { icons, images } from "@/constants";
import { MachineInfo } from "@/types/type"; // Combine imports from "@/types/type"
import { getLogOptions } from "@react-native-community/cli-platform-apple";
import { LinearGradient } from "expo-linear-gradient"; // Keep this if needed, otherwise remove
import AntDesign from "@expo/vector-icons/AntDesign";
import { Feather, FontAwesome6 } from "@expo/vector-icons";

interface MachineProps {
  machine: MachineInfo;
  onDelete: (id: string) => void;
}

const Machine = ({ machine, onDelete }: MachineProps) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const [date] = dateString.split("T");
    return date;
  };

  return (
    <LinearGradient colors={["#fdfdfd", "#b9c1c2"]} className="rounded-xl mt-4">
      <View className="flex flex-row items-center justify-center rounded-lg mb-0 p-0">
        <View className="flex flex-col items-start justify-center p-5">
          <View className="absolute top-2 right-2">
            <TouchableOpacity onPress={() => onDelete(machine.id)}>
              <Feather name="delete" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View className="flex flex-row items-center justify-between">
            <Image
              source={{
                uri: machine.image,
              }}
              className="w-[90px] h-[100px] rounded-lg"
            />

            <View className="flex flex-col mx-5 gap-y-5 flex-1">
              <View className="flex flex-row items-center gap-x-2">
                <FontAwesome6 name="barcode" size={17} color="black" />
                <Text className="text-md font-JakartaBold" numberOfLines={1}>
                  {machine.machine_id}
                </Text>
              </View>

              <View className="flex flex-row items-center gap-x-2">
                <Feather name="settings" size={19} color="black" />
                <Text className="text-md font-JakartaBold" numberOfLines={1}>
                  {machine.name} {/* Use mi prop, not Machine */}
                </Text>
              </View>
            </View>
          </View>

          <View className="flex flex-col w-full mt-5 bg-general-500 rounded-lg p-3 items-start justify-center">
            <View className="flex flex-row items-center w-full justify-between mb-5">
              <Text className="text-md font-JakartaMedium text-blue-900">
                Status :
              </Text>
              <Text className="text-md font-JakartaBold" numberOfLines={1}>
                {machine.status} {/* Use mi prop, not Machine */}
              </Text>
            </View>

            <View className="flex flex-row items-center w-full justify-between mb-5">
              <Text className="text-md font-JakartaMedium text-blue-900">
                Location :
              </Text>
              <Text className="text-md font-JakartaBold">
                {machine.location} {/* Use mi prop, not Machine */}
              </Text>
            </View>
            <View className="flex flex-row items-center w-full justify-between mb-5">
              <Text className="text-md font-JakartaMedium text-blue-900">
                Last Maintenance Date :
              </Text>
              <Text className="text-md font-JakartaBold">
                {formatDate(machine.last_maintenance_date)}
                {/* Use mi prop, not Machine */}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default Machine;
