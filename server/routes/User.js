const express = require("express")
const router = express.Router()

const {createUser, getAllUsers, getUser, getUserByEmail, updatePortfolios, updateUserProfile} = require("../controllers/userController")
router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/find/:id', getUser);
router.get('/verify/', getUserByEmail);
router.put('/update/', updatePortfolios);
router.put('/updateprofile', updateUserProfile);

module.exports = router;