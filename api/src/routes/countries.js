const { Router } = require('express');
const axios = require("axios");
const {Country, Activity} = require('../db');
const {Op} = require('sequelize')

const router = Router();

const getApiCountries = async() => {
    const apiInfo = await axios.get('https://restcountries.com/v3/all')
    const apiCountries = await apiInfo.data.map((c)=>{
        return {
            code: c.cca3,
            name: c.name.common,
            flag: c.flags[0],
            continent: c.continents ? c.continents[0]: 'No Data',
            capital: c.capital ? c.capital[0]: 'No Data',
            subregion: c.subregion? c.subregion : 'No Data',
            area: c.area%1===0? c.area: Math.round(c.area),
            population: c.population
        }
    })
    return apiCountries
}

router.get('/', async(req,res)=>{
    const {name} = req.query
    console.log(name)

    const countriesFromDb = await Country.findAll({
        include:[{
            model: Activity,
            attributes: ['name'],
            through:{
                attributes:[]
            }
        }]
    })

    if(!name){
        if(!countriesFromDb.length){   
            const countries = await getApiCountries()
            await Country.bulkCreate(countries)
            const dbCountries = await Country.findAll({
                include:[{
                    model: Activity,
                    attributes: ['name'],
                    through:{
                        attributes:[]
                    }
                }]
            })
            res.json(dbCountries)
        } else {
            res.json(countriesFromDb)
        }
    }else{
        if(!countriesFromDb.length){   
            const countries = await getApiCountries()
            await Country.bulkCreate(countries)
            const dbCountries = await Country.findAll({
                where: {
                    name: {
                        [Op.iLike]: `%${name}%`
                    }
                },
                include:[{
                    model: Activity,
                    attributes: ['name'],
                    through:{
                        attributes:[]
                    }
                }]
            })
            res.json(dbCountries)
        }else {
            const dbCountries = await Country.findAll({
                where: {
                    name: {
                        [Op.iLike]: `%${name}%`
                    }
                },
                include:[{
                    model: Activity,
                    attributes: ['name'],
                    through:{
                        attributes:[]
                    }
                }]
            })
            res.json(dbCountries)
        }
    }
})



router.get('/:id', async(req,res)=>{
    const {id}=req.params;

    try {
        let detail = await Country.findOne({
            where:{
                code: id.toUpperCase(),
            },
            include: [
                {
                    model: Activity,
                    through: {
                        attributes: []
                    },
                },
            ],
        })
        res.json(detail)
    } catch (error) {
        res.send('404 || Not Found')
    }
})

module.exports = router;