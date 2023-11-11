export const MAP_STYLE: google.maps.MapTypeStyle[] = [
    {
        featureType: "landscape.man_made",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "poi",
        elementType: "geometry",
        stylers: [
            {
                visibility: "simplified"
            }
        ]
    },
    {
        featureType: "poi.business",
        stylers: [
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "poi.park",
        elementType: "labels.text",
        stylers: [
            {
                visibility: "off"
            }
        ]
    }, {
        featureType: "transit",
        stylers: [
            {
                visibility: "off"
            }
        ]
    }
]