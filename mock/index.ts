export const ITEMS_MOCK: { id: number; content: string }[] = [
	{ id: 1, content: "재관류중재술" },
	{ id: 2, content: "뇌출혈수술" },
	{ id: 3, content: "대동맥응급" },
	{ id: 4, content: "복부응급수술" },
	{ id: 5, content: "사지접합" },
	{ id: 6, content: "산부인과응급" },
	{ id: 7, content: "응급투석" },
	{ id: 8, content: "정신과적응급" },
	{ id: 9, content: "안과적수술" },
	{ id: 10, content: "담낭담관질환" },
	{ id: 11, content: "장중첩/폐색" },
	{ id: 12, content: "응급내시경" },
	{ id: 13, content: "저체중출생아" },
	{ id: 14, content: "영상의학혈관중재" },
	{ id: 15, content: "중증화상" }
];

export const HOSPITALS_MOCK = [
	{
		id:"i1",
		name: "서울적십자병원",
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