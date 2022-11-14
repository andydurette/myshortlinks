const express = require('express')
const ShortUrl = require('../models/shortUrl');
const apiRouter = express.Router();
const sanitize = require('mongo-sanitize');

// Create a route
apiRouter.route('/shortUrlCreate').post(async (req, res) => {
    try{
        const sanitizedBody = sanitize(req.body.full);
        const createdShortUrl = await ShortUrl.create({ full: sanitizedBody});
        res.status(200).json(createdShortUrl);
    }catch(err){
        // Give logging of the error to the host
        console.log('Error - shortUrlCreate:', err.message);
        res.status(500).json({error:'Server issue please retry later'});
    }
});

// Send back redirect value
apiRouter.route('/shortUrlRedirect/:shortUrl').get(async (req, res) => {
    try{
        const sanitizedParams = sanitize(req.params.shortUrl);
        const originalUrl = await ShortUrl.findOne({ short: sanitizedParams });
        if (originalUrl === null) return res.status(404).json({error:'Short link for redirect not found'})
        res.status(200).json(originalUrl);
    }catch(err){
        // Give logging of the error to the host
        console.log('Error - shortUrlRedirect:', err.message);
        res.status(500).json({error:'Server issue please retry later'});
    }
});

// Confirm localStorage value and send back result
apiRouter.route('/shortUrlConfirm/:id').get(async (req, res) => {
    try{
        const sanitizedParams = sanitize(req.params.id);
        const shortUrls = await ShortUrl.findById(sanitizedParams);
        res.status(200).json(shortUrls);
    }catch(err){
        // Give logging of the error to the host
        console.log('Error - shortUrlConfirm:', err.message);
        res.status(500).json({error:'Server issue please retry'});
    }  
});

module.exports = apiRouter