import { StyleSheet } from "react-native";
import { theme } from "../../../styles/theme";

export const styles = StyleSheet.create({
	container: {
		paddingVertical: 24,
		gap: 14
	},
	title: {
		flexDirection: "row",
		gap: 12
	},
	phone: {
		flexDirection: "row",
		alignSelf: "flex-start",
		alignItems: "center",
		gap: 6,
		paddingVertical: 4,
		paddingHorizontal: 6,
		borderRadius: 8,
		backgroundColor: theme.green95
	},
	info: {
		flexDirection: "row",
		gap: 14
	},
	descriptionContainer: {
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
		gap: 8,
		backgroundColor: theme.neutral95
	},
});