export const KAKAO_MAP_HTML = `
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=ec5ecebbfc5d51a7620ae20cba6a8310&libraries=services,clusterer,drawing"></script> 
    </head>
    <body>
        <div id="map" style="width:100%;height:100%;"></div>
        <script type="text/javascript">
            let map;
            let currentMarker = null; 
            
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
                    
                    // 받은 위치로 지도 중심 이동
                    if (map && data.latitude && data.longitude) {
                        const newPosition = new kakao.maps.LatLng(data.latitude, data.longitude);
                        map.setCenter(newPosition);
                        
                        // 기존 마커 제거
                        if (currentMarker) {
                            currentMarker.setMap(null);
                        }
                        
                        // 새 마커 생성
                        currentMarker = new kakao.maps.Marker({
                            position: newPosition
                        });
                        
                        // 마커를 지도에 표시
                        currentMarker.setMap(map);
                        
                        // 위치 이동 완료 알림
                        window.ReactNativeWebView.postMessage(JSON.stringify({
                            type: 'LOCATION_UPDATED',
                            success: true,
                            location: {
                                latitude: data.latitude,
                                longitude: data.longitude,
                                name: data.name
                            }
                        }));
                    } else {
                        throw new Error('지도가 초기화되지 않았거나 위치 데이터가 올바르지 않습니다');
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
            
            // Kakao 지도 SDK가 로드된 후 지도 초기화
            kakao.maps.load(initMap);
        </script>       
    </body>
</html>    
`;