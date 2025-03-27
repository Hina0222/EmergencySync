export const KAKAO_MAP_HTML = `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_KAKAO_APP_KEY"></script>
    </head>
    <body>
      <div id="map" style="width:100%; height:100vh;"></div>
      <script>
        var container = document.getElementById('map');
        var options = {
          center: new kakao.maps.LatLng(37.5665, 126.9780),
          level: 3
        };
        var map = new kakao.maps.Map(container, options);
        var marker = new kakao.maps.Marker({ position: map.getCenter() });
        marker.setMap(map);

        // React Native에서 데이터 받기
        document.addEventListener("message", function(event) {
          var data = JSON.parse(event.data);
          var newPosition = new kakao.maps.LatLng(data.latitude, data.longitude);
          map.setCenter(newPosition);
          marker.setPosition(newPosition);
        });
      </script>
    </body>
    </html>
  `;