import SidebarButton from "./components/SidebarButton/SidebarButton";
import { Animated, View, LayoutChangeEvent } from "react-native";
import { styles } from "./Sidebar.styles";
import { ReactNode, useEffect, useRef, useState } from "react";

interface SidebarPropsType {
	children: ReactNode;
	onOpenChange: (isOpen: boolean) => void;
}

export default function Sidebar({ children, onOpenChange }: SidebarPropsType) {
	const animation = useRef(new Animated.Value(0)).current;
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [sidebarWidth, setSidebarWidth] = useState<number>(0);

	const onLayout = (event: LayoutChangeEvent) => {
		const { width } = event.nativeEvent.layout;
		setSidebarWidth(width);
	};

	useEffect(() => {
		if (sidebarWidth > 0) {
			Animated.timing(animation, {
				toValue: isOpen ? 0 : sidebarWidth - 15,
				useNativeDriver: true
			}).start();
		}
	}, [isOpen, animation, sidebarWidth]);

	useEffect(() => {
		onOpenChange(isOpen);
	}, [isOpen, onOpenChange]);

	const toggleSidebar = () => {
		setIsOpen(prev => !prev);
	};

	return (
		<Animated.View style={[styles.outerContainer, { transform: [{ translateX: animation }] }]}>
			<SidebarButton isOpen={isOpen} onPress={toggleSidebar} />
			<View style={styles.innerContainer} onLayout={onLayout}>
				{children}
			</View>
		</Animated.View>
	);
}