export const KAKAO_MAP_HTML = `
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=ec5ecebbfc5d51a7620ae20cba6a8310&libraries=services"></script> 
    </head>
    <body>
        <div id="map" style="width:100%;height:100%;"></div>
        <script type="text/javascript">
						let map;
						let currentMarker = null;
						let polyline = null; // 기존 Polyline을 저장할 변수
						
						// 지도 초기화
						function initMap() {
								const container = document.getElementById('map');
								const options = { 
										center: new kakao.maps.LatLng(33.450701, 126.570667),
										level: 3 
								};
				
								map = new kakao.maps.Map(container, options);
				
								// 지도 타일 로드 완료 이벤트 리스너 등록
								kakao.maps.event.addListener(map, 'tilesloaded', function() {
										// 처음 한 번만 실행되도록 이벤트 리스너 제거
										kakao.maps.event.removeListener(map, 'tilesloaded', arguments.callee);
										
										console.log('지도 로드 완료');
				
										// 초기화 완료 알림
										window.ReactNativeWebView.postMessage(JSON.stringify({
												type: 'MAP_READY',
												success: true
										}));
								});
						}
				
						window.addEventListener('message', function(e) {
								handleMessage(e.data);
						});
				
						document.addEventListener('message', function(e) {
								handleMessage(e.data);
						});
				
						// 메시지 처리 함수
						function handleMessage(messageData) {
								try {
										console.log('메시지 수신됨:', messageData);
										const data = JSON.parse(messageData);
										console.log('파싱된 데이터:', data);
										
										if (data.type === 'UPDATE_LOCATION') {
												updateLocation(data);
										} else if (data.type === 'DRAW_LINE_PATH') {
												drawLinePath(data);
										}
								} catch (error) {
										console.error('데이터 처리 오류:', error);
										window.ReactNativeWebView.postMessage(JSON.stringify({
												type: 'ERROR',
												success: false,
												message: error.message
										}));
								}
						}
				
						// 받은 위치로 지도 중심 이동
						function updateLocation(data) {
								if (!map) {
										console.error('지도가 초기화되지 않음');
										return;
								}
				
								const newPosition = new kakao.maps.LatLng(data.latitude, data.longitude);
								map.setCenter(newPosition);
				
								// 기존 마커 제거
								if (currentMarker) {
										currentMarker.setMap(null);
								}
				
								// 커스텀 마커 이미지 생성 (MyLocationIcon.svg 사용)
								const svgCode = '<svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg"><circle opacity="0.3" cx="22.4092" cy="22.5259" r="22" fill="#638AFF"/><circle opacity="0.6" cx="22.4088" cy="22.5259" r="15.4" fill="#416FEB"/><g filter="url(#filter0_d_344_1369)"><path d="M22.7262 14.1202L29.5427 27.6646C29.9145 28.4034 29.2399 29.2415 28.4861 28.9772L22.2265 25.6822C22.0457 25.6188 21.8501 25.6188 21.6693 25.6822L15.41 28.977C14.6562 29.2413 13.9816 28.4035 14.3533 27.6647L21.1696 14.1199C21.5005 13.4626 22.3953 13.4628 22.7262 14.1202Z" fill="white"/></g><defs><filter id="filter0_d_344_1369" x="12.248" y="12.627" width="23.4004" height="23.4" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dx="2" dy="3"/><feGaussianBlur stdDeviation="2"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_344_1369"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_344_1369" result="shape"/></filter></defs></svg>';
								const markerImageSrc = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgCode);
								
								const markerSize = new kakao.maps.Size(45, 45);
								const markerOption = { offset: new kakao.maps.Point(22, 22) };
								
								const markerImage = new kakao.maps.MarkerImage(markerImageSrc, markerSize, markerOption);
								
								// 새 마커 생성 (커스텀 이미지 적용)
								currentMarker = new kakao.maps.Marker({
										position: newPosition,
										image: markerImage
								});
				
								// 마커를 지도에 표시
								currentMarker.setMap(map);
				
								console.log('위치 업데이트 완료:', data.latitude, data.longitude);
				
								// 위치 이동 완료 알림
								window.ReactNativeWebView.postMessage(JSON.stringify({
										type: 'LOCATION_UPDATED',
										success: true
								}));
						}
				
						// 받은 경로 데이터를 기반으로 지도에 Polyline 그리기
						function drawLinePath(data) {
								if (!map || !data.routes) {
										console.error('지도가 초기화되지 않았거나 경로 데이터가 없음');
										return;
								}
				
								console.log('경로 데이터 수신:', data);
				
								// 기존 Polyline 제거
								if (polyline) {
										polyline.setMap(null);
								}
				
								const postLinePath = [];
								const bounds = new kakao.maps.LatLngBounds();
				
								data.routes[0].sections[0].roads.forEach((router) => {
										router.vertexes.forEach((vertex, index) => {
												if (index % 2 === 0) {
														const point = new kakao.maps.LatLng(
																router.vertexes[index + 1],
																router.vertexes[index]
														);
														postLinePath.push(point);
														bounds.extend(point); // 지도 범위 확장
												}
										});
								});
				
								// 새 Polyline 생성
								polyline = new kakao.maps.Polyline({
										path: postLinePath,
										strokeWeight: 6,
										strokeColor: "#416FEB",
										strokeOpacity: 1,
										strokeStyle: "solid",
								});
				
								// 지도에 Polyline 표시
								polyline.setMap(map);
								console.log('경로 표시 완료');
								
								// 범위 조정 
								map.setBounds(bounds);
				
								// 경로 그리기 완료 알림
								window.ReactNativeWebView.postMessage(JSON.stringify({
										type: 'DRAW_LINE_COMPLETED',
										success: true
								}));
						}
				
						// Kakao 지도 SDK가 로드된 후 지도 초기화
						kakao.maps.load(initMap);
				</script>
    </body>
</html>    
`;
