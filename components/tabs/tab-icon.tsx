import { Ionicons } from "@expo/vector-icons";

interface TabIconProps {
  focused: boolean;
  icon: string;
}

export default function TabIcon({ icon, focused }: TabIconProps) {
  return (
    <Ionicons
      name={icon as any}
      size={24}
      color={focused ? "#22c55e" : "#fff"}
    />
  );
}
