const Link = require('../models/linkModel');
const mongoose = require('mongoose');

//get all links
const getLinks = async (req, res) => {
    const links = await Link.find({}).sort({createdAt: -1})
    
    res.status(200).json(links);
}

const getLink = async (req, res) => {
    const {id} = req.params;

    try {
        const link = await Link.findOne({shortenedLink: id});
        if(link){
            res.status(200).json({destination: link.destination});
        } else{
            res.status(400).json({error: 'cannot find link'});
        }
    }
    catch (error) {
        res.status(400).json({error: error.message});
    }
}

//create new link
const createLink = async (req, res) => {
    const { destination, shortenedLink } = req.body;

    let emptyFields = [];

    if(!destination) {
        emptyFields.push('destination');
    }
    if(!shortenedLink) {
        emptyFields.push('shortenedLink');
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({error: 'please fill in all the fields', emptyFields})
    }

    try {
            if(!await Link.exists({shortenedLink: shortenedLink})){
                if(shortenedLink.length <= 15){
                    
                    if (shortenedLink.match(/^[A-Za-z]+$/)) {
                        const link = await Link.create({destination, shortenedLink});
                        res.status(200).json(link);
                    } else {
                        res.status(400).json({error: 'The shortened link can only contain letters'});
                    }
                    
                } else {
                    res.status(400).json({error: 'The shortened link must be less than or equal to 15 characters'});
                }
            }
            else{
                res.status(400).json({error: 'The shortened link already exists'});
            }
        } 
        catch (error) {
        res.status(400).json({error: error.message});
        }
}

//delete a link
const deleteLink = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such link"});
    }

    const link = await Link.findOneAndDelete({_id: id});

    if(!link){
        return res.status(404).json({error: "No such link"});
    }

    res.status(200).json(link);
}

//updates a link
const updateLink = async (req, res) => {
    const {id} = req.params;
    const { destination, shortenedLink } = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such link"});
    }
    
    if(!await Link.exists({shortenedLink: shortenedLink})) {
        if(shortenedLink.length <= 15){
            const link = await Link.findOneAndUpdate({_id: id}, {
                ...req.body
            });
            if(!link){
                return res.status(404).json({error: "No such link"});
            }
            res.status(200).json(link);
        } else {
            res.status(400).json({error: 'The shortened link must be less than or equal to 15 characters'});
        }
    }
    else {
        res.status(400).json({error: 'The shortened link already exists'});
    }
}

module.exports = {
    getLinks,
    getLink,
    createLink,
    deleteLink,
    updateLink
}