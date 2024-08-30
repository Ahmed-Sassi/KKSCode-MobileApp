import React, { useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { fetchAPI, useFetch } from "@/lib/fetch";
import { MachineInfo } from "@/types/type";
import { router, useLocalSearchParams } from "expo-router";
import MachineLayout from "@/components/MachineLayout";
import { useRecentSearchesStore } from "@/app/Store";
import { useUser } from "@clerk/clerk-expo";
import CustomButton from "@/components/CustomButton";
import { MaterialIcons } from "@expo/vector-icons";

const MachineInfoScreen = () => {
  const { user } = useUser();
  const { query } = useLocalSearchParams();
  const { data, loading, error } = useFetch<MachineInfo[]>(
    `/(api)/mi/${query}`,
  );

  const addRecentMachine = useRecentSearchesStore(
    (state) => state.addRecentMachine,
  );

  useEffect(() => {
    const fetchAndAddRecentMachine = async () => {
      if (data?.[0]) {
        const machine = data[0];
        addRecentMachine(machine);

        // Create a recent search record
        try {
          await fetchAPI("/(api)/se/create", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_id: user?.id,
              machine_id: machine.id,
              name: machine.name,
              location: machine.location,
              status: machine.status,
              designation: machine.designation,
              last_maintenance_date: machine.last_maintenance_date,
              image: machine.image,
            }),
          });
        } catch (error) {
          console.error("Failed to create recent search record:", error);
        }
      }
    };

    fetchAndAddRecentMachine();
  }, [data, addRecentMachine, user?.id]);

  if (loading) return <ActivityIndicator size="large" color="#007BFF" />;
  if (error) return <Text>Error loading data</Text>;

  const machineData = data?.[0];

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const [date] = dateString.split("T");
    return date;
  };

  return (
    <MachineLayout image={machineData?.image} title="Machine Information">
      <View style={styles.container}>
        <Text style={styles.header}>Machine Information</Text>

        <View style={styles.card}>
          <InfoRow label="Machine Code:" value={machineData?.id} />
          <InfoRow label="Machine Name:" value={machineData?.name} />
          <InfoRow label="Designation:" value={machineData?.designation} />
          <InfoRow label="Location:" value={machineData?.location} />
          <InfoRow
            label="Last Maintenance Date:"
            value={formatDate(machineData?.last_maintenance_date)}
          />
          <InfoRow label="Status:" value={machineData?.status} />

          <CustomButton
            title="Report Problem"
            style={styles.button}
            onPress={() =>
              router.push({
                pathname: "/(root)/report",
                params: { machine_id: machineData?.id },
              })
            }
          />
        </View>
      </View>
    </MachineLayout>
  );
};

const InfoRow = ({ label, value }) => (
  <View style={styles.infoRow}>
    <MaterialIcons name="info" size={24} color="#007BFF" />
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "700",
    color: "#333",
    marginBottom: 20,
    textAlign: "left",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10,
    flex: 1,
    color: "#444",
  },
  value: {
    fontSize: 16,
    color: "#555",
    flex: 1,
    textAlign: "right",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#007BFF",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
});

export default MachineInfoScreen;
