const express = require("express");
const cors = require("cors");
const router = express.Router();
const db = require("../models");

router.use(cors());
router.use(express.json());


router.post('/add', (req,res) => {
    console.log(req.body)
    db.movies.findAll({
        where:{
            imdbID:req.body.id
        }
    }).then((movie) =>{
        if(movie.length === 0){
            //add movie to watchlist
        }else{
            //return message that movie already exists
        }
    })
    res.json({message:'it works'})
})






module.exports = router