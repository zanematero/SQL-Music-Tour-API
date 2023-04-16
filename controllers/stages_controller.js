// DEPENDENCIES
const stages = require('express').Router()
const db = require('../models')
const { Op } = require('sequelize')
const { Stage, Event, Stage_Event} = db

// INDEX
stages.get('/', async (req, res) => {
    try{
        const foundStages = await Stage.findAll({
            where: {
                name: {[Op.like]: `%${req.query.name ? req.query.name : ''}%`}
            },
            order: [[ 'name', 'ASC']]
        })
        res.status(200).json(foundStages)
    } catch(err) {
        console.log(err)
        res.status(500).json({ message: 'Server error'} )
    }
})

// SHOW
stages.get('/:name', async (req, res) => {
    try {
        const foundStage = await Stage.findOne({
            where: {name: req.params.name},
            include: {
                model: Event,
                as: "events",
                through: Stage_Event
            }
        })
            res.status(200).json(foundStage)
        } catch(err) {
            console.log(err)
            res.status(500).json({ message: 'Server error'})
        }
})

// CREATE
stages.post('/', async (req, res) => {
    try {
        const newStage = await Stage.create(req.body)
        res.status(201).json({ message: `Stage created: ${newStage}`})
    } catch(err) {
        console.log(err)
        res.status(500).json({ message: 'Server error'})
    }
})

// UPDATE
stages.put('/:id', async (req, res) => {
    try {
        const updatedStages = await Stage.update(req.body, { 
            where: { stage_id: req.params.id }})
        res.status(200).json({ message: `Stage(s) updated: ${updatedStages}`})
    } catch {
        console.log(err)
        res.status(500).json({ message: 'Server error'})
    }
})

// DELETE
stages.delete("/:id", async (req, res) => {
    try {
        const deletedStages = await Stage.destroy({ 
            where: { stage_id: req.params.id }})
        res.status(200).json({ message: `Stage(s) deleted: ${deletedStages}`})
    } catch {
        console.log(err)
        res.status(500).json({ message: 'Server error'})
    }
})
// EXPORT
module.exports = stages