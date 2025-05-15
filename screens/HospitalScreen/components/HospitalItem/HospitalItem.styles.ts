import { StyleSheet } from "react-native";
import { theme } from "../../../../styles/theme";

export const styles = StyleSheet.create({
	container: {
		width: "100%",
		paddingVertical: 24,
		paddingHorizontal: 24,
		gap: 14,
		borderBottomWidth: 0.5,
		borderColor: theme.neutral70
	},
	pressed: {
		backgroundColor: theme.primary95
	},
	title: {
		flexDirection: "row",
		justifyContent: "space-between",
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
	}
});