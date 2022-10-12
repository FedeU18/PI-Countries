const { Router } = require('express');
const axios = require("axios");
const {Country, Activity} = require('../db');
const {Op} = require('sequelize');
const router = Router()

router.post('/', async(req,res)=>{
    const {name,difficulty,duration,season,countries} = req.body
    console.log(
        'Name: ',name,
        'Difficulty: ',difficulty,
        'Duration: ',duration,
        'Season: ',season,
        'Countries: ',countries
    )
        if(!name && !difficulty && !duration && !season && !countries.length ){
            res.send('Missing data')
        }else{
            const [newActivity, boolean] = await Activity.findOrCreate({
                where: {
                    name: name
                },
                defaults: {
                    difficulty,
                    duration,
                    season
                }
            })
            boolean && countries.map(async(c)=>{
                let country = await Country.findAll({
                    where: {
                        name: {
                            [Op.iLike]: `%${c}%`
                        }
                    }
                })
                console.log('Country: ',country)
                newActivity.addCountry(country)
            })
            res.send('The activity has been successfully created')
        }


})  

module.exports = router