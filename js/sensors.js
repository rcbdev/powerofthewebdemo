$(function () {
    var $location = $('#location'),
    $direction = $('#direction'),
    $rotation1 = $('#rotation1'),
    $rotation2 = $('#rotation2'),
    $orientation = $('#orientation'),
    showPosition = function (position) {
        $location.text('Lat: ' + position.coords.latitude + ', Lon: ' + position.coords.longitude);
        map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
    },
    errorPosition = function (e) {
        $location.text('Error: ' + e);
    },
    orientationChange = function (e) {
        if (e.webkitCompassHeading) {
            $direction.text(e.webkitCompassHeading);
        }
        else {
            $direction.text('Direction not supported');
        }
        if (e.alpha || e.alpha === 0) {
            $rotation2.html('<br/>(current) Alpha: ' + e.alpha + ', Beta: ' + e.beta + ', Gamma: ' + e.gamma);
        }
    },
    motionChange = function (e) {
        if (e.accelerationIncludingGravity && (e.accelerationIncludingGravity.x || e.accelerationIncludingGravity.x === 0)) {
            var text = '(with gravity) x: ' + e.accelerationIncludingGravity.x + ', y: ' + e.accelerationIncludingGravity.y + 'z: ' + e.accelerationIncludingGravity.z;

            if (e.acceleration) {
                text += '<br/>';
                text += '(without gravity) x: ' + e.acceleration.x + ', y: ' + e.acceleration.y + 'z: ' + e.acceleration.z;
            }

            $orientation.html(text);
        }
        else {
            $orientation.text('Orientation not supported');
        }

        if (e.rotationRate && (e.rotationRate.alpha || e.rotationRate.alpha === 0)) {
            $rotation1.text('(movement) Alpha: ' + e.rotationRate.alpha + ', Beta: ' + e.rotationRate.beta + ', Gamma: ' + e.rotationRate.gamma);
        }
        else {
            $rotation1.text('Rotation not supported');
        }
    };

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, errorPosition);
    }
    else {
        $location.text('Location not supported');
    }

    if (window.DeviceOrientationEvent || window.OrientationEvent || typeof window.onorientationchange != 'undefined') {
        window.ondeviceorientation = orientationChange;
    }
    else {
        $direction.text('Direction not supported');
    }

    if (typeof window.ondevicemotion != 'undefined') {
        window.ondevicemotion = motionChange;
    }
    else {
        $orientation.text('Orientation not supported');
        $rotation1.text('Rotation not supported');
    }

    var mapOptions = {
        center: new google.maps.LatLng(-34.397, 150.644),
        zoom: 8
    };
    var map = new google.maps.Map(document.getElementById("map-canvas"),
        mapOptions);
});