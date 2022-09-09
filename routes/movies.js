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
            db.movies.create({
                title:req.body.title,
                imdbID:req.body.id,
                poster_url:req.body.poster
            })
            res.status(201).json({message:'added to list'})
        }else{
            //return message that movie already exists
            res.status(401).json({message:'movie already added to list'})
        }
    })
})

router.get('/', (req,res) =>{
    console.log(req.body)
    db.movies.findAll({}).then((movies) => {
        res.status(201).json({message:'got movies', watchList:movies})
    })
    
})


router.delete('/:id', (req,res) =>{
    console.log(req.params.id)
    db.movies.delete({
        where:{
            imdbID:req.params.id
        }
    }).then((movie) =>{
        res.status(201).json({message:'removed from watchList succesfully'})
    })
    
})




module.exports = router