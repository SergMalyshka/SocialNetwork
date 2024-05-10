const { User } = require('../models');

const userController = {

    async getAllUsers(req, res) {
        try {
            const users = await User.find().populate({
                path: 'thoughts',
                select: '-__v'
            }).select('-__v');
            res.json(users)
        } catch (err) {
            res.status(500).json(err)
        }
    },

    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.id })
                .select('-__v')
            res.json(user)
        } catch (err) {
            res.status(500).json(err)
        }
    },

    async createUser(req, res) {
        try {
            const dbUserData = await User.create(req.body)
            res.json(dbUserData)
        } catch (err) {
            res.status(500).json(err)
        }
    },

    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.id },
                { $set: req.body },
                { runValidators: true, new: true }
            )

            if (!user) {
                return res.status(404).json({ message: "No user with such Id" })
            }

            res.json(user)

        } catch (err) {
            res.status(500).json(err)
        }
    },

    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndRemove({ _id: req.params.id });

            if (!user) {
                res.status(404).json({ message: "No user with such Id" })
            }
            res.json({ message: "User successfully deleted" })

        } catch (err) {
            res.status(500).json(err)
        }
    },

    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.id },
                { $push: { friends: req.params.friendsId } },
                { new: true, runValidators: true }
            )

            if (!user) {
                res.status(404).json({ message: 'No user with such Id' })
            }

            res.json(user)

        } catch (err) {
            res.status(500).json(err)
        }
    },

    async deleteFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.id },
                { $pull: { friends: req.params.friendId } },
                { new: true }
            )

            if (!user) {
                res.status(404).json({ message: "No user with such Id" })
            }
            res.json(user)
            
        } catch (err) {
            res.status(500).json(err)
        }
    }
}


module.exports = userController;