import { StyleSheet } from "react-native";
import { theme } from "../../../../styles/theme";

export const styles = StyleSheet.create({
	container: {
		position: "absolute",
		bottom: 60,
		left: "50%",
		transform: [{ translateX: "-50%" }],
		paddingVertical: 32,
		paddingHorizontal: 36,
		borderRadius: 12,
		backgroundColor: theme.white,
		gap: 20,
		zIndex: 10
	},
	title: {
		marginBottom: 12,
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
	time: {
		alignItems: "center",
		backgroundColor: theme.red95,
		paddingVertical: 12,
		paddingHorizontal: 16,
		borderRadius: 8
	}
});
