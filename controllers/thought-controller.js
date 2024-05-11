const { Thought, User } = require('../models');

const thoughtController = {
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find()
                .select('-__v')

            if (!thoughts) {
                res.status(404).json({ message: "No thoughts found" })
            }

            res.json(thoughts)

        } catch (err) {
            res.status(500).json(err)
        }
    },


    async getThoughtById(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.id })
                .select('-__v')

            if (!thought) {
                res.status(404).json({ message: "No thought with such Id" })
            }

            res.json(thought)

        } catch (err) {
            res.status(500).json(err)
        }
    },

    async addThought(req, res) {
        try {
            const thought = await Thought.create(req.body)

            const userData = await User.findOneAndUpdate(
                { username: req.body.username },
                { $push: { thoughts: thought._id } },
                { new: true }
            )

            if (!userData) {
                res.status(404).json({ message: "No user with such username" })
            }

            res.json(userData)

        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },

    async updateThought(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(
                { _id: req.params.id },
                req.body,
                { new: true, runValidators: true }
            )

            if (!thought) {
                res.status(404).json({ message: "No thought with such Id" })
            }

            res.json(thought)

        } catch (err) {
            res.status(500).json(err)
        }
    },

    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.id })

            if (!thought) {
                res.status(404).json({ message: "No thought with such Id" })
            }

            res.json(thought)

        } catch (err) {
            res.status(500).json(err)
        }
    },

    async addReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $push: { reactoins: req.body } },
                { new: true, runValidators: true }
            )

            if (!thought) {
                res.status(404).json({ message: "No thought with such Id" })
            }

            res.json(thought)

        } catch (err) {
            res.status(500).json(err)
        }
    },

    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactoins: { _id: req.params.reactionId } } },
                { new: true }
            )
            if (!thought) {
                res.status(404).json({ message: "No thought with such Id" })
            }
            res.json(thought)

        } catch (err) {
            res.status(500).json(err)
        }
    }
}


module.exports = thoughtController;