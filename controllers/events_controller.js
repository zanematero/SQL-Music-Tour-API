// DEPENDENCIES
const events = require('express').Router()
const db = require('../models')
const { Op } = require('sequelize')
const { Event, Meet_Greet, Band, Stage, Set_Time, Stage_Event } = db

// INDEX
events.get('/', async (req, res) => {
    try{
        const foundEvents = await Event.findAll({
            where: {
                name: {[Op.like]: `%${req.query.name ? req.query.name : ''}%`}
            },
            order: [[ 'name', 'ASC']]
        })
        res.status(200).json(foundEvents)
    } catch(err) {
        console.log(err)
        res.status(500).json({ message: 'Server error'} )
    }
})

// SHOW
events.get('/:name', async (req, res) => {
    try {
        const foundEvent = await Event.findOne({
            where: {name: req.params.name},
            include: [
                {
                    model: Meet_Greet,
                    as: "meet_greets",
                    include: {
                        model: Band,
                        as: "band"
                    }
            }, {
                model: Set_Time,
                as: "set_times",
                include: [
                    {
                        model: Band,
                        as: "band"
                    }, {
                        model: Stage,
                        as: "stage"
                    }
                ]
            }, {
                model: Stage,
                as: "stages",
                through: Stage_Event
            }
        ]})
            res.status(200).json(foundEvent)
        } catch(err) {
            console.log(err)
            res.status(500).json({ message: 'Server error'})
        }
})

// CREATE
events.post('/', async (req, res) => {
    try {
        const newEvent = await Event.create(req.body)
        res.status(201).json({ message: `Event created: ${newEvent}`})
    } catch(err) {
        console.log(err)
        res.status(500).json({ message: 'Server error'})
    }
})

// UPDATE
events.put('/:id', async (req, res) => {
    try {
        const updatedEvents = await Event.update(req.body, { 
            where: { event_id: req.params.id }})
        res.status(200).json({ message: `Event(s) updated: ${updatedEvents}`})
    } catch {
        console.log(err)
        res.status(500).json({ message: 'Server error'})
    }
})

// DELETE
events.delete("/:id", async (req, res) => {
    try {
        const deletedEvents = await Event.destroy({ 
            where: { event_id: req.params.id }})
        res.status(200).json({ message: `Event(s) deleted: ${deletedEvents}`})
    } catch {
        console.log(err)
        res.status(500).json({ message: 'Server error'})
    }
})

// EXPORT
module.exports = events