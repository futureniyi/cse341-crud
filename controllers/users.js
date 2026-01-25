// controllers/users.js
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllUsers = async (req, res) => {
    //#swagger.tags = ['Users']
    const result = await mongodb.getDatabase().db().collection('users').find();
    result.toArray().then((users) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(users);
  });
};

const getSingleUser = async (req, res) => {
    //#swagger.tags = ['Users']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: 'Enter a valid user ID to get user' });
    }
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
        .getDatabase()
        .db()
        .collection('users')
        .findOne({ _id: userId });
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
};

const createUser = async (req, res) => {
    //#swagger.tags = ['Users']
    const user = {
        email: (req.body.email || '').toLowerCase(),
        fullName: req.body.fullName,
        role: req.body.role,
        phone: req.body.phone || null,
        birthday: req.body.birthday ? new Date(req.body.birthday) : null,
        address: req.body.address,
        createdAt: new Date()
  };

    const response = await mongodb
        .getDatabase()
        .db()
        .collection('users')
        .insertOne(user);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the user.');
    }
};

const updateUser = async (req, res) => {
    //#swagger.tags = ['Users']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: 'Enter a valid user ID to update user' });
    }
    const user_id = new ObjectId(req.params.id);
    const user = {
        email: (req.body.email || '').toLowerCase(),
        fullName: req.body.fullName,
        role: req.body.role,
        phone: req.body.phone || null,
        birthday: req.body.birthday ? new Date(req.body.birthday) : null,
        address: req.body.address,
        createdAt: new Date()
    };

    const response = await mongodb
        .getDatabase()
        .db()
        .collection('users')
        .replaceOne({ _id: user_id }, user);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the user.');
    }
}

const deleteUser = async (req, res) => {
    //#swagger.tags = ['Users']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: 'Enter a valid user ID to delete user' });
    }
    const user_id = new ObjectId(req.params.id);
    const response = await mongodb
        .getDatabase()
        .db()
        .collection('users')
        .deleteOne({ _id: user_id });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the user.');
    }
}

module.exports = {
    getAllUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser
};
