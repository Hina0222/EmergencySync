import { FlatList, Pressable, View } from "react-native";
import Typography from "../../../components/ui/Typography/Typography";
import TriangleIcon from "../../../assets/icons/TriangleIcon.svg";
import { useState } from "react";
import { Hospital } from "../../../types/hospital";
import { styles } from "./Description.styles";

interface DescriptionProps {
	hospital: Hospital;
}

export default function Description({ hospital }: DescriptionProps) {
	const [isDescriptionOpen, setIsDescriptionOpen] = useState<boolean>(false);

	return (
		<>
			{hospital.descriptions[0]?.description &&
				<Pressable
					onPress={() => {
						setIsDescriptionOpen(prev => !prev);
					}}
					style={styles.container}
				>
					<View style={styles.description}>
						<FlatList
							data={isDescriptionOpen ? hospital.descriptions : hospital.descriptions.slice(0, 1)}
							keyExtractor={(item) => item.descriptionId}
							ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
							renderItem={(itemData) => (
								<>
									<Typography
										color="neutral20"
										size="B2_medium"
										{...(!isDescriptionOpen ? { numberOfLines: 1, ellipsizeMode: "tail" } : {})}>
										<Typography color="neutral50" size="B2_medium">응급 </Typography>
										{itemData.item?.description}
									</Typography>
									{isDescriptionOpen &&
										<Typography color="neutral50" size="B2_medium">{itemData.item?.time}</Typography>
									}
								</>
							)}
						/>
					</View>
					{isDescriptionOpen ? <TriangleIcon transform={[{ scaleY: -1 }]} /> : <TriangleIcon />}
				</Pressable>
			}
		</>
	);
}
