const express = require('express')
const ShortUrl = require('../models/shortUrl');
const apiRouter = express.Router();

// Create a route
apiRouter.route('/shortUrlCreate').post(async (req, res) => {
    try{
        const createdShortUrl = await ShortUrl.create({ full: req.body.full });
        res.status(200).json(createdShortUrl);
    }catch(err){
        // Give logging of the error to the host
        console.log('Error - shortUrlCreate:', err.message);
        res.status(500).json({error:'Server issue please retry later'});
    }
});

// Send back redirect value
apiRouter.route('/shortUrlRedirect').get(async (req, res) => {
    try{
        const originalUrl = await ShortUrl.findOne({ short: req.query.shortUrl });
        if (originalUrl === null) return res.status(404).json({error:'Short link for redirect not found'})
        res.status(200).json(originalUrl);
    }catch(err){
        // Give logging of the error to the host
        console.log('Error - shortUrlRedirect:', err.message);
        res.status(500).json({error:'Server issue please retry later'});
    }
});

// Confirm localStorage value and send back result
apiRouter.route('/shortUrlConfirm').get(async (req, res) => {
    try{
        const shortUrls = await ShortUrl.findById(req.query.id);
        res.status(200).json(shortUrls);
    }catch(err){
        // Give logging of the error to the host
        console.log('Error - shortUrlConfirm:', err.message);
        res.status(500).json({error:'Server issue please retry'});
    }  
});

module.exports = apiRouter