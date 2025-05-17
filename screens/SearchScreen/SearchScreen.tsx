import { ScrollView, View } from "react-native";
import { useState } from "react";
import { styles } from "./SearchScreen.styles";
import Typography from "../../components/ui/Typography/Typography";
import CheckBox from "../../components/ui/CheckBox/CheckBox";
import DropdownBox from "../../components/ui/DropdownBox/DropdownBox";
import { COMMONS_MOCK, EQUIPMENT_MOCK, ITEMS_MOCK, SERIOUS_MOCK } from "../../mock";
import Button from "../../components/ui/Button/Button";
import useDropdownSelection from "./hooks/useDropdownSelection";
import { useAtom } from "jotai/index";
import { filteredHospitalsAtom, hospitalsAtom } from "../../store/atoms";
import { Hospital } from "../../types/hospital";

export default function SearchScreen({ navigation }: any) {
	const common = useDropdownSelection(COMMONS_MOCK);
	const serious = useDropdownSelection(SERIOUS_MOCK);
	const equipment = useDropdownSelection(EQUIPMENT_MOCK);
	const [hospitals] = useAtom(hospitalsAtom);
	const [, setFilteredHospitals] = useAtom(filteredHospitalsAtom);

	const isAnyItemSelected = common.selectedItems.length > 0 || serious.selectedItems.length > 0 || equipment.selectedItems.length > 0;

	const selectedIds = [
		...common.selectedItems,
		...serious.selectedItems,
		...equipment.selectedItems,
	];

	return (
		<View style={styles.container}>
			<ScrollView contentContainerStyle={styles.scrollContainer}>
				<View>
					<View style={styles.row}>
						<Typography color="neutral30" size="T4_medium">
							일반 질환
						</Typography>
						<CheckBox
							item={{ id: "common", content: "전체 선택" }}
							checked={common.isAllSelected}
							onToggle={common.toggleAll}
						/>
					</View>
					<DropdownBox
						placeholder="일반질환"
						items={COMMONS_MOCK}
						selectedItems={common.selectedItems}
						toggleItem={common.toggleItem}
						deleteItem={common.deleteItem}
					/>
				</View>
				<View>
					<View style={styles.row}>
						<Typography color="neutral30" size="T4_medium">
							중증응급질환
						</Typography>
						<CheckBox
							item={{ id: "serious", content: "전체 선택" }}
							checked={serious.isAllSelected}
							onToggle={serious.toggleAll}
						/>
					</View>
					<DropdownBox
						placeholder="중증응급질환"
						items={SERIOUS_MOCK}
						selectedItems={serious.selectedItems}
						toggleItem={serious.toggleItem}
						deleteItem={serious.deleteItem}
					/>
				</View>
				<View>
					<View style={styles.row}>
						<Typography color="neutral30" size="T4_medium">
							장비 정보 (선택)
						</Typography>
						<CheckBox
							item={{ id: "equipment", content: "전체 선택" }}
							checked={equipment.isAllSelected}
							onToggle={equipment.toggleAll}
						/>
					</View>
					<DropdownBox
						placeholder="장비정보"
						items={EQUIPMENT_MOCK}
						selectedItems={equipment.selectedItems}
						toggleItem={equipment.toggleItem}
						deleteItem={equipment.deleteItem}
					/>
				</View>
			</ScrollView>
			<View style={{ paddingTop: 32 }}>
				<Button
					onPress={() => {
						const filtered = hospitals.filter(hospital => {
							return selectedIds.some(id => {
								const hospitalAny = hospital as any;
								return hospitalAny[id] === true;
							});
						});

						setFilteredHospitals(filtered);

						navigation.navigate("HospitalScreen");
					}}
					isActive={isAnyItemSelected}
				>
					조회하기
				</Button>
			</View>
		</View>
	);
}
