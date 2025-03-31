import { StyleSheet } from "react-native";
import { theme } from "../../../../styles/theme";

export const styles = StyleSheet.create({
	container: {
		position: "absolute",
		bottom: 60,
		alignSelf: "flex-start",
		paddingVertical: 32,
		paddingHorizontal: 36,
		marginHorizontal: "auto",
		borderRadius: 12,
		backgroundColor: theme.white
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
	}
});