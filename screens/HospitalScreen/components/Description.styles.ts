import { StyleSheet } from "react-native";
import { theme } from "../../../styles/theme";

export const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		gap: 8,
		alignItems: "center",
		width: "100%"
	},
	description: {
		flex: 1,
		paddingVertical: 6,
		paddingHorizontal: 8,
		borderRadius: 8,
		backgroundColor: theme.neutral95
	}
});