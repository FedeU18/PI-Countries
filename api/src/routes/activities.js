const { Router } = require('express');
const {Country, Activity} = require('../db');
const {Op} = require('sequelize');
const router = Router()

router.post('/', async(req,res)=>{
    const {name,difficulty,duration,season,countries} = req.body

    try {
        if(name && difficulty && duration && season && countries.length ){
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
            if(boolean){countries.map(async(c)=>{
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
            res.json({message: "The activity has been successfully created"})
            } else {
                res.json({error: "The activity already existed"})
            }
        }else{
            res.json({error: "Missing data"})
        }
    } catch (error) {
        res.json({error: "There were problems while creating the activity"})
    }

})  

router.get('/', async(req,res)=>{
    const activities = await Activity.findAll({
        include:{
            model: Country,
            attributes: ['name'],
            through:{
                attributes:[]
            }
        }
    })
    if(activities.length){
        res.json(activities)
    } else {
        res.send('There are no activities')
    }
})

module.exports = router