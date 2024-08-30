import React from "react";
import {
  Alert,
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import { icons } from "@/constants";

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

    // Optionally, show a success alert or perform other actions
    Alert.alert("Success", "Report deleted successfully!");
    // Navigate back or refresh the list of reports if necessary
    router.replace("/(root)/(tabs)/home");
  } catch (error) {
    console.error("Error deleting report:", error);
    Alert.alert("Error", error.message);
  }
};

const Report = () => {
  const report = useLocalSearchParams();

  const handlePress = () => {
    Alert.alert(
      "Delete Report",
      "Are you sure you want to delete this report?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            handleDeleteReport(report.id);
            router.push("(root)/(tabs)/home");
          },
          style: "destructive",
        },
      ],
    );
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const [date] = dateString.split("T");
    return date;
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => router.replace("/(root)/(tabs)/home")}>
        <View style={styles.backButton}>
          <Image
            source={icons.backArrow}
            resizeMode="contain"
            style={styles.backIcon}
          />
        </View>
      </TouchableOpacity>
      <Text style={styles.header}>Report Details</Text>

      <View style={styles.card}>
        <InfoRow label="Report Title:" value={report.report_title} />
        <InfoRow label="Problem:" value={report.report_problem} />
        <InfoRow label="Reported By:" value={report.reported_by} />
        <InfoRow label="Priority:" value={report.priority} />
      </View>

      {/* Machine Information Section */}
      <View style={styles.card}>
        <Text style={styles.subHeader}>Machine Information</Text>
        <InfoRow label="Machine Code:" value={report.id} />
        <InfoRow label="Machine Name:" value={report.name} />
        <InfoRow label="Location:" value={report.location} />
        <InfoRow label="Designation:" value={report.designation} />
        <InfoRow
          label="Last Maintenance Date:"
          value={formatDate(report.last_maintenance_date)}
        />
      </View>

      {/* Delete Report Button */}
      <CustomButton
        title="Delete Report"
        onPress={handlePress}
        style={styles.button}
      />
    </SafeAreaView>
  );
};

const InfoRow = ({ label, value }) => (
  <View style={styles.infoRow}>
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
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 24,
    fontWeight: "600",
    color: "#007BFF",
    marginBottom: 10,
    textAlign: "left",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
    color: "#444",
  },
  value: {
    fontSize: 16,
    color: "#555",
    flex: 1,
    textAlign: "right",
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#007BFF",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
});

export default Report;
