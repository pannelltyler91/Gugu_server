const express = require("express");
const cors = require("cors");
const router = express.Router();
const db = require("../models");

router.use(cors());
router.use(express.json());

router.post('/add', async(req,res) =>{
    try{
        await db.recipes.findAll({
            where:{
                name:req.body.recipeName
            }
        }).then((recipes) =>{
            if(recipes.length === 0){
                db.recipes.create({
                    name: req.body.recipeName,
                    website_url: req.body.website,
                    video_url: req.body.video
                })
                res.status(201).json({message:'recipe added'})
            }
        })
    }catch(err){
        res.status(404).json({error:err})
    }
})

router.get('/', async(req,res) =>{
    try{
        db.recipes.findAll({})
        .then((recipes) =>{
            res.status(201).json({recipes:recipes})
        })
    }catch(err){
        res.status(404).json({error:err})
    }

})

router.delete('/:id', async(req,res) =>{
    try{
        await db.recipes.destroy({
            where:{
                id:req.params.id
            }
        }).then((confirmation) =>{
            res.status(201).json({message:confirmation,id:req.params.id})
        })
    }catch(err){
        res.status(404).json({error:err})
    }
})





module.exports = router