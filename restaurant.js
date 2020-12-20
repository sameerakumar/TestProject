const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
    address: {
        building: {
		type: String,
		required: false
		},
		coord:{
		type: [Number],  // [<longitude>, <latitude>]
        index: '2d',      // create the geospatial index
        required: false 
		},
		street:{type:String,required:false},
		zipcode:{type: String,required:false},
		type:Object,
		required:true
    },
	borough:{type: String,required:false},
	cuisine: {type: String, required: false},
	grades:[{
		date:{type: Date,default: Date.now},
		grade:{type: String,required: false},
		score: {type: String, required: false},
		type:Object,
		required:true
	}],
	name:{type: String,required: false},
	restaurant_id:{type: String,required:false}
});


module.exports = mongoose.model('restaurants', restaurantSchema);