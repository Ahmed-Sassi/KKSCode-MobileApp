import { useUser } from "@clerk/clerk-expo";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import InputField from "@/components/InputField";
import { LinearGradient } from "expo-linear-gradient";

const Profile = () => {
  const { user } = useUser();

  return (
    <LinearGradient colors={["#ffffff", "#1E8EBA"]} className="flex-1">
      <SafeAreaView className="flex-1">
        <ScrollView
          className="px-5"
          contentContainerStyle={{ paddingBottom: 120 }}
        >
          <Text className="text-2xl font-JakartaBold my-5">My profile</Text>

          <View className="flex items-center justify-center my-5">
            <Image
              source={{
                uri: user?.externalAccounts[0]?.imageUrl ?? user?.imageUrl,
              }}
              style={{ width: 110, height: 110, borderRadius: 110 / 2 }}
              className=" rounded-full h-[110px] w-[110px] border-[3px] border-white shadow-sm shadow-neutral-300"
            />
          </View>

          <View className="flex flex-col items-start justify-center bg-white rounded-lg shadow-sm shadow-neutral-300 px-5 py-3">
            <View className="flex flex-col items-start justify-start w-full">
              <InputField
                label="First name"
                placeholder={user?.firstName || "Not Found"}
                containerStyle="w-full"
                inputStyle="p-3.5"
                editable={false}
              />

              <InputField
                label="Last name"
                placeholder={user?.lastName || "Not Found"}
                containerStyle="w-full"
                inputStyle="p-3.5"
                editable={false}
              />

              <InputField
                label="Email"
                placeholder={
                  user?.primaryEmailAddress?.emailAddress || "Not Found"
                }
                containerStyle="w-full"
                inputStyle="p-3.5"
                editable={false}
              />

              <InputField
                label="Phone"
                placeholder={
                  user?.primaryPhoneNumber?.phoneNumber || "Not Found"
                }
                containerStyle="w-full"
                inputStyle="p-3.5"
                editable={false}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Profile;
