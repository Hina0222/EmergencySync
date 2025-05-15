import { HospitalDropdownItem } from "../types/hospital";

export const ITEMS_MOCK: HospitalDropdownItem[] = [
	{ id: "reperfusion", content: "재관류중재술" },
	{ id: "hemorrhage", content: "뇌출혈수술" },
	{ id: "aortic_emergency", content: "대동맥응급" },
	{ id: "abdominal_emergency", content: "복부응급수술" },
	{ id: "limb_reimplantation", content: "사지접합" },
	{ id: "obstetric_emergency", content: "산부인과응급" },
	{ id: "emergency_dialysis", content: "응급투석" },
	{ id: "psychiatric_emergency", content: "정신과적응급" },
	{ id: "ophthalmologic_surgery", content: "안과적수술" },
	{ id: "gallbladder_disease", content: "담낭담관질환" },
	{ id: "intussusception", content: "장중첩/폐색" },
	{ id: "emergency_endoscopy", content: "응급내시경" },
	{ id: "low_birth_weight", content: "저체중출생아" },
	{ id: "interventional_radiology", content: "영상의학혈관중재" },
	{ id: "severe_burn", content: "중증화상" }
];

export const COMMONS_MOCK: HospitalDropdownItem[] = [];

export const SERIOUS_MOCK: HospitalDropdownItem[] = [
	{ id: "MKioskTy1", content: "재관류중재술(심근경색)" },
	{ id: "MKioskTy2", content: "재관류중재술(뇌경색)" },
	{ id: "MKioskTy3", content: "뇌출혈 수술" },
	{ id: "MKioskTy4", content: "뇌경색 수술" },
	{ id: "MKioskTy5", content: "뇌종양 수술" },
	{ id: "MKioskTy6", content: "뇌동맥류 수술" },
	{ id: "MKioskTy7", content: "뇌혈관기형 수술" },
	{ id: "MKioskTy8", content: "척추수술" },
	{ id: "MKioskTy9", content: "외상성 뇌출혈 수술" },
	{ id: "MKioskTy10", content: "장중첩 폐색 영유아" },
	{ id: "MKioskTy11", content: "위장관 출혈" },
	{ id: "MKioskTy12", content: "위장관 응급내시경" },
	{ id: "MKioskTy13", content: "응급 복부 수술" },
	{ id: "MKioskTy14", content: "기관지 응급내시경" },
	{ id: "MKioskTy15", content: "저체중 출생아" },
	{ id: "MKioskTy16", content: "신생아 호흡부전" },
	{ id: "MKioskTy17", content: "신생아 패혈증" },
	{ id: "MKioskTy18", content: "신생아 경련" },
	{ id: "MKioskTy19", content: "신생아 고빌리루빈혈증" },
	{ id: "MKioskTy20", content: "외상성 출혈" },
	{ id: "MKioskTy21", content: "화상" },
	{ id: "MKioskTy22", content: "중증 화상" },
	{ id: "MKioskTy23", content: "중증 외상" },
	{ id: "MKioskTy24", content: "중증 패혈증" },
	{ id: "MKioskTy25", content: "중증 호흡부전" },
	{ id: "MKioskTy26", content: "영상의학 혈관중재술(성인)" },
	{ id: "MKioskTy27", content: "영상의학 혈관중재술(영유아)" },
	{ id: "MKioskTy28", content: "응급실(Emergency gate keeper)" }
];

export const EQUIPMENT_MOCK: HospitalDropdownItem[] = [
	{ id: "hvctayn", content: "CT 사용 여부" },
	{ id: "hvmriayn", content: "MRI 사용 여부" },
	{ id: "hvangioayn", content: "혈관촬영기 여부" },
	{ id: "hvventiayn", content: "인공호흡기 여부" },
	{ id: "hvventisoayn", content: "인공호흡기 (조산아용) 여부" },
	{ id: "hvincuayn", content: "인큐베이터 여부" },
	{ id: "hvcrrtayn", content: "CRRT 여부" },
	{ id: "hvecmoayn", content: "ECMO 사용 여부" },
	{ id: "hvoxyayn", content: "고압산소치료기 여부" },
	{ id: "hvhypoayn", content: "중심체온조절유도기 여부" },
	{ id: "hvamyn", content: "구급차 보유 여부" }
];