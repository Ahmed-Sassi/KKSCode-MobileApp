import { create } from "zustand";

interface MachineInfo {
  id: string;
  name: string;
  location: string;
  status: string;
  designation?: string;
  last_maintenance_date?: string;
}

interface RecentSearchesState {
  recentMachines: MachineInfo[];
  addRecentMachine: (machine: MachineInfo) => void;
  removeRecentMachine: (id: string) => void;
}

export const useRecentSearchesStore = create<RecentSearchesState>((set) => ({
  recentMachines: [],
  addRecentMachine: (machine) =>
    set((state) => ({
      recentMachines: [
        machine,
        ...state.recentMachines.filter((m) => m.id !== machine.id),
      ],
    })),
  removeRecentMachine: (id) =>
    set((state) => ({
      recentMachines: state.recentMachines.filter((m) => m.id !== id),
    })),
}));
