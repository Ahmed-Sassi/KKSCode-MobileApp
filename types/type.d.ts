import { TextInputProps, TouchableOpacityProps } from "react-native";

declare interface MachineInfo {
  id: string; // Corresponds to VARCHAR(50) PRIMARY KEY
  name: string; // Corresponds to VARCHAR(255) NOT NULL
  designation?: string | null; // Corresponds to VARCHAR(255), optional
  status?: string | null; // Corresponds to VARCHAR(50), optional
  last_maintenance_date?: Date | null; // Corresponds to DATE, optional
  location?: string | null;
  image?: string; // Corresponds to VARCHAR(255), optional
}

declare interface RecentSearches {
  user_id: string;
  machine_id: string; // Corresponds to VARCHAR(50) PRIMARY KEY
  name: string; // Corresponds to VARCHAR(255) NOT NULL
  designation?: string | null; // Corresponds to VARCHAR(255), optional
  status?: string | null; // Corresponds to VARCHAR(50), optional
  last_maintenance_date?: Date | null; // Corresponds to DATE, optional
  location?: string | null;
  image?: string; // Corresponds to VARCHAR(255), optional
}

declare interface ButtonProps extends TouchableOpacityProps {
  title: string;
  bgVariant?: "primary" | "secondary" | "danger" | "outline" | "success";
  textVariant?: "primary" | "default" | "secondary" | "danger" | "success";
  IconLeft?: React.ComponentType<any>;
  IconRight?: React.ComponentType<any>;
  className?: string;
}

declare interface InputFieldProps extends TextInputProps {
  label: string;
  icon?: any;
  secureTextEntry?: boolean;
  labelStyle?: string;
  containerStyle?: string;
  inputStyle?: string;
  iconStyle?: string;
  className?: string;
}
declare interface MachineTestInfo {
  id: string; // Corresponds to VARCHAR(50) PRIMARY KEY
  name: string;
}

export interface KKSInputProps {
  icon?: any; // Replace with your icon type
  placeholder?: string;
  containerStyle?: string; // Tailwind class names
  textInputBackgroundColor?: string;
  onCodeEntered: (code: string) => void;
}

export interface TaskInfo {
  id: string; // Unique identifier for the task
  name: string; // Name of the task
  designation: string; // Designation related to the task
  status: string; // Status of the task (e.g., 'In Progress', 'Completed')
  duration: string; // Estimated or actual duration of the task
  priority: "Low" | "Medium" | "High"; // Priority level of the task
  assignedTo: string; // Name of the person assigned to the task
  dueDate: string; // Due date for the task (in ISO format or as a string)
  attachments: string[]; // Array of attachment filenames or URLs
}

export interface Reportt {
  id: string; // Unique identifier for the report
  report_title: string; // Title of the report
  reported_by: string; // The person who reported the issue
  report_problem: string; // Description of the problem reported
}
