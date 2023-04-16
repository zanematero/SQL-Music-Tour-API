// DEPENDENCIES
const bands = require('express').Router()
const db = require('../models')
const { Op } = require('sequelize')
const { Band, Meet_Greet, Event, Set_Time } = db

// INDEX
bands.get('/', async (req, res) => {
    try{
        const foundBands = await Band.findAll({
            where: {
                name: {[Op.like]: `%${req.query.name ? req.query.name : ''}%`}
            },
            order: [[ 'name', 'ASC']]
        })
        res.status(200).json(foundBands)
    } catch(err) {
        console.log(err)
        res.status(500).json({ message: 'Server error'} )
    }
})

// SHOW
bands.get('/:name', async (req, res) => {
    try {
        const foundBand = await Band.findOne({
            where: {name: req.params.name},
            include: [{
                model: Meet_Greet,
                as: 'meet_greets',
                include: {
                    model: Event,
                    as: 'event'
                }
            }, {
                model: Set_Time,
                as: 'set_times',
                include: {
                    model: Event,
                    as: 'event'
                }
            }]
        })
            res.status(200).json(foundBand)
        } catch(err) {
            console.log(err)
            res.status(500).json({ message: 'Server error'})
        }
})

// CREATE
bands.post('/', async (req, res) => {
    try {
        const newBand = await Band.create(req.body)
        res.status(201).json({ message: `Band created: ${newBand}`})
    } catch(err) {
        console.log(err)
        res.status(500).json({ message: 'Server error'})
    }
})

// UPDATE
bands.put('/:id', async (req, res) => {
    try {
        const updatedBands = await Band.update(req.body, { 
            where: { band_id: req.params.id }})
        res.status(200).json({ message: `Band(s) updated: ${updatedBands}`})
    } catch {
        console.log(err)
        res.status(500).json({ message: 'Server error'})
    }
})

// DELETE
bands.delete("/:id", async (req, res) => {
    try {
        const deletedBands = await Band.destroy({ 
            where: { band_id: req.params.id }})
        res.status(200).json({ message: `Band(s) deleted: ${deletedBands}`})
    } catch {
        console.log(err)
        res.status(500).json({ message: 'Server error'})
    }
})

// EXPORT
module.exports = bands