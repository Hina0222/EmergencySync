import { StyleSheet } from "react-native";
import { theme } from "../../../styles/theme";

export const styles = StyleSheet.create({
	dropdownBox: {
		flexDirection: "row",
		paddingVertical: 17,
		paddingLeft: 20,
		paddingRight: 14,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: theme.neutral70,
		alignItems: "center"
	},
	itemsDropdownBox: {
		paddingHorizontal: 14,
		paddingVertical: 12,
		alignItems: "flex-start"
	},
	itemsDropdownBoxIcon: {
		marginTop: 5
	},
	showDropdownBox: {
		borderBottomWidth: 0,
		borderBottomLeftRadius: 0,
		borderBottomRightRadius: 0
	},
	inactiveDropdownBox: {
		backgroundColor: theme.neutral95
	},
	text: {
		flex: 1,
		fontSize: 16,
		fontWeight: "600",
		lineHeight: 24,
		color: theme.neutral70
	},
	inactiveText: {
		color: theme.neutral30
	},
	items: {
		flex: 1,
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 8
	},
	itemContainer: {
		paddingHorizontal: 14,
		paddingVertical: 7,
		flexDirection: "row",
		flexWrap: "wrap",
		position: "relative"
	},
	line: {
		position: "absolute",
		top: 0,
		left: 14,
		right: 14,
		height: 1,
		backgroundColor: theme.neutral70
	},
	showItemContainer: {
		borderWidth: 1,
		borderTopWidth: 0,
		borderColor: theme.neutral70,
		borderBottomLeftRadius: 8,
		borderBottomRightRadius: 8
	},
	checkBoxContainer: {
		width: "50%",
		paddingVertical: 5
	}
});