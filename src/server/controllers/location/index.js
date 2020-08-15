
const { mapQuestConfiguration, convertToJson, isInsidePolygon } = require('../../helpers/config')
const converted = convertToJson('FullStackTest_DeliveryAreas.kml')
const NodeGeocoder = require('node-geocoder');


//End Point for getting the region of the specified loactions
module.exports.controller = (app) => {

	app.post('/api/outlet/location', async (req, res) => {
		let locationName = ''

		/* Step 1 - Getting the geo-cordinates of the specified address.
				Using mapquest as google apikey is no more free !!!
		*/
		try {
			if (!req.body.location) {
				throw ("Location is Required")
			}
		
		const geocoder = NodeGeocoder(mapQuestConfiguration);

		const location = await geocoder.geocode(req.body.location)
		const { longitude, latitude } = location[0]
		/* Step 2 - Converting the given KML file into geoJson  converting it outside the endpoint call for optimization
				And storing it in converted variable
		*/

		/* Step 3 - Check whether the given location is inside the geoloaction polygons specified in the KML file  */
		converted.features.map(data => {
			if (data.geometry.type === "Polygon") {
				if (isInsidePolygon([longitude, latitude], data.geometry.coordinates[0])) {
					locationName = data.properties.name
					return
				}
			}
		})
	}

	catch(e) {
		res.status(500)
		res.json({
			error : e
		})
	}
		/* Step - 4 Returning The Response */

		res.status(200).send({ location: locationName ? locationName : "Not Found" })

	});
}