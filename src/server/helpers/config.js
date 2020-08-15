
var tj = require('togeojson'),
    fs = require('fs'),
    // node doesn't have xml parsing or a dom. use xmldom
    DOMParser = require('xmldom').DOMParser;

const mapQuestConfiguration = {
    provider: 'mapquest',

    // Optional depending on the providers
    apiKey: 'UOTHSXA17gxAAWUxt3Krh4thAkV7sMTU', // for Mapquest, OpenCage, Google Premier
    formatter: null // 'gpx', 'string', ...
};

convertToJson = (fileName) => {
    var kml = new DOMParser().parseFromString(fs.readFileSync(`${__dirname}/${fileName}`, 'utf8'));
    var converted = tj.kml(kml);
    return converted
};

isInsidePolygon = (point, polygonArray) => {

    var longitude = point[0], latitude = point[1];

    var inside = false;
    for (var i = 0, j = polygonArray.length - 1; i < polygonArray.length; j = i++) {
        var longitudei = polygonArray[i][0], latitudei = polygonArray[i][1];
        var longitudej = polygonArray[j][0], latitudej = polygonArray[j][1];

        var intersect = ((latitudei > latitude) != (latitudej > latitude))
            && (longitude < (longitudej - longitudei) * (latitude - latitudei) / (latitudej - latitudei) + longitudei);
        if (intersect) inside = !inside;
    }

    return inside;
};

module.exports = {
    mapQuestConfiguration: mapQuestConfiguration,
    convertToJson: convertToJson,
    isInsidePolygon: isInsidePolygon
};
