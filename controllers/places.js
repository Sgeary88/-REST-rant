const router = require('express').Router();
const places = require('../models/places.js');

router.get('/new', (req, res) => {
    res.render('places/new');
})

//POST
router.post('/', (req, res) => {
    if (!req.body.pic) {
        // Default image if one is not provided
        req.body.pic = 'http://placekitten.com/400/400'
    }
    if (!req.body.city) {
        req.body.city = 'Anytown'
    }
    if (!req.body.state) {
        req.body.state = 'USA'
    }
    places.push(req.body);
    res.redirect('/places')
})

// PUT
router.put('/:id', (req, res) => {
    let id = Number(req.params.id);
    if (isNaN(id)) {
        res.render('error404');
    }
    else if (!places[id]) {
        res.render('error404');
    }
    else {
        if(!req.body.pic) {
            req.body.pic = 'http://placekitten.com/400/400'
        }
        if (!req.body.city) {
            req.body.city = undefined;
        }
        if (!req.body.state) {
            req.body.state = 'Somewhere in the land of OZ'
        }
        res.redirect(`/places/${id}`);
    }
})


// GET /places
router.get('/', (req, res) => {
    res.render('places/index', {places})
})


// Show
router.get('/:id', (req, res) => {
    let id = Number(req.params.id)
    if(isNaN(id)) {
        res.render('error404');
    }
    else if(!places[id]) {
        res.render('error404');
    }
    else {
        res.render('places/show', {place: places[id], id});
    }
})

// DELETE
router.delete('/:id', (req, res) => {
    let id = Number(req.params.id);
    if (isNaN(id)) {
        res.render('error404');
    }
    else if (!places[id]) {
        res.render('error404)');
    }
    else {
        places.splice(id, 1);
        res.redirect('/places');
    }
})

// Edit
router.get('/:id/edit', (req, res) => {
    let id = Number(req.params.id);
    if (isNaN(id)) {
        res.render('error404');
    }
    else if (!places[id]) {
        res.render('error404');
    }
    else {
        
        res.render('places/edit', {place: places[id], id});
    }
});
        


module.exports = router