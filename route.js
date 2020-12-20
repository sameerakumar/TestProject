const router = require('express').Router();
let Restaurants = require('./restaurant');
//to get reatsurant by its id
router.route('/:id').get((req, res) => {
    Restaurants.findOne({restaurant_id:req.params.id})
        .then(restaurants => res.json(restaurants))
        .catch(err => res.status(400).json('Error: ' + err));
});
//to get restaurants with limit
router.route('/limit/:limit').get((req, res) => {
	var limit = parseInt(req.params.limit);
	console.log('limit is...',limit);
    Restaurants.find().limit(limit)
        .then(restaurants => res.json(restaurants))
        .catch(err => res.status(400).json('Error: ' + err));
});
//to get restaurant grade by passing restaurant id
router.route('/grades/:id').get((req, res) => {
	//console.log('req param...',id);
    Restaurants.findOne({restaurant_id:req.params.id},{grades:1})
        .then(restaurants => res.json(restaurants))
        .catch(err => res.status(400).json('Error: ' + err));
});
//to get restaurant names with matching cuisine
router.route('/cuisine/:cuisine').get((req, res) => {
	//console.log('req param...',id);
    Restaurants.find({cuisine:req.params.cuisine},{_id:0,name:1})
        .then(restaurants => res.json(restaurants))
        .catch(err => res.status(400).json('Error: ' + err));
});
// to get unique cuisine by array
router.route('/cuisine').get((req, res) => {
	//console.log('req param...',id);
    Restaurants.distinct("cuisine")
        .then(restaurants => res.json(restaurants))
        .catch(err => res.status(400).json('Error: ' + err));
});
//add new restaurant 
router.route('/').post((req, res) => {
    var params = req.body;
	let idLength = 8;
	var result = ''; //to generate random id for restaurant
    var characters = '0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < idLength; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
	console.log('restaurant ID...',result);
    const newRest = new Restaurants({ 
	      address: params.address,
          borough: params.borough,
          cuisine: params.cuisine,
          grades: params.grades,
		  name: params.name,
		  restaurant_id: result		  
		  });

    newRest.save()
        .then(() => res.json({message:'restaurant added',restaurant_id: result}))
        .catch(err => res.status(400).json('Error: ' + err));
})
//to update restaurant address by restaurant id
router.route('/:id').put((req, res) => {
    Restaurants.findOne({restaurant_id:req.params.id})
        .then(restaurant => {
            restaurant.address = req.body.address;
            restaurant.save()
                .then(() => res.json('restaurant data updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});
//to delete restaurant data by its restaurant id
router.route('/:id').delete((req, res) => {
    Restaurants.deleteOne({restaurant_id:req.params.id})
        .then(() => res.json('restaurant deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});
module.exports = router