const express = require('express');
const {
    getLinks,
    getLink,
    createLink,
    deleteLink,
    updateLink
} = require("../controllers/linkController")

const router = express.Router();

// GET all links
router.get('/', getLinks);

//GET one link, returns destination
router.get('/:id', getLink);

// POST a new link
router.post('/', createLink);

// DELETE a Link
router.delete('/:id', deleteLink);

// UPDATE a Link
router.patch('/:id', updateLink);

module.exports = router;