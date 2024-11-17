var map;

map = L.map('map').setView([-12.1102137, -76.982390], 15)
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

function crearZonasPeligro() {
    leerJson().then(value => {
        for (var jsonObj of value) {
            L.circle([jsonObj.lng, jsonObj.lat], {
                color: 'transparent',       // quitar el borde
                fillColor: obtenerColorAUsar(jsonObj.peligrosidad),  // The color de relleno
                fillOpacity: 0.5, // opacidad
                radius: jsonObj.precision  // radio en metros
              }).addTo(map);
              L.marker([jsonObj.lng, jsonObj.lat]).addTo(map).bindPopup("Peligrosidad: " + jsonObj.peligrosidad).openPopup();
        }
    });
    
}

function obtenerColorAUsar(peligrosidad = 5.00) {
    if (peligrosidad < 3) {
        return "#E7F867";
    }
    if (peligrosidad < 6) {
        return "#F5BD55";
    }
    return "#D01E1E";
}


function leerJson() {
    return fetch("/scripts/zonas.json")
        .then(response => response.json());
}

crearZonasPeligro();

function irADestino() {
    var geocoder = L.Control.Geocoder.nominatim();
    var inicio = document.getElementById('lugarInicio').value;
    let latLongIn;

    geocoder.geocode(inicio, function(results) {
        if (results.length > 0) {
            var result = results[0];
            latLongIn = result.center;

            var fin = document.getElementById('lugarDestino').value;
            L.marker(latLongIn).addTo(map).bindPopup(result.name).openPopup();
            let latLongFin;

            geocoder.geocode(fin, function(results) {
                if (results.length > 0) {
                    var result = results[0];
                    latLongFin = result.center;
                    L.marker(latLongFin).addTo(map).bindPopup(result.name).openPopup();
                    map.setView(latLongFin, 15);

                    console.log(latLongIn);
                    console.log(latLongFin);

                    var control = L.Routing.control({
                        waypoints: [latLongIn, latLongFin],
                        routeWhileDragging: true
                    }).addTo(map);
                  
                    control.on('routesfound', function(e) {
                        var route = e.routes[0];
                        route.addTo(map);
                    });

                } else {
                    alert('No se encontró el lugar');
                }
            });
        } else {
            alert('No se encontró el lugar');
        }
    });
}