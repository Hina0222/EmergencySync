export const ITEMS_MOCK: { id: string; content: string }[] = [
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

export const HOSPITALS_MOCK = [
	{
		id:"i1",
		name: "서울적십자병원",
		latitude: 36.841942,
		longitude: 127.172339,
		distance: 1.9,
		phone: "02-2002-8888",
		estimate: 8,
		nowCongestion: 8,
		maxCongestion: 12,
		descriptions: [
			{ descriptionId: "1", description: "[안과] 정규 시간 외 하기 상병 외 진료 불가능 (외상으로 인한 각막, 공막 열상, 각막 천공, 안구 파열)", time: "2025-02-26 00:00:00" },
			{ descriptionId: "2", description: "[담낭담관질환] 담낭 수술 및 시술은 환자 수용 전 반드시 문의 바랍니다.", time: "2025-02-26 00:00:00" }
		]
	},
	{
		id: "i2",
		name: "강북삼성병원",
		latitude: 37.1,
		longitude: 127.1,
		distance: 2.2,
		phone: "02-2002-8888",
		estimate: 8,
		nowCongestion: 8,
		maxCongestion: 12,
		descriptions: []
	},
	{
		id: "i3",
		name: "세브란스병원",
		latitude: 36.2,
		longitude: 127.2,
		distance: 4.6,
		phone: "02-2002-8888",
		estimate: 8,
		nowCongestion: 8,
		maxCongestion: 12,
		descriptions: [
			{ descriptionId: "3", description: "[담낭담관질환] 담낭 수술 및 시술은 환자 수용 전 반드시 문의 바랍니다.", time: "2025-02-26 00:00:00" }
		]
	}
];