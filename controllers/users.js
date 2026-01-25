// controllers/users.js
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllUsers = async (req, res, next) => {
    //#swagger.tags = ['Users']
    try {
        const result = await mongodb.getDatabase().db().collection('users').find();
        const users = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json(users);
    } catch (err) {
        return next(err);
    }
};

const getSingleUser = async (req, res, next) => {
  //#swagger.tags = ['Users']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid ID' });
    }

    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('users').findOne({ _id: userId });

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
};



const createUser = async (req, res, next) => {
    //#swagger.tags = ['Users']
    try {
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
            return res.status(204).send();
        }
        return res.status(500).json(response.error || 'Some error occurred while creating the user.');
    } catch (err) {
        return next(err);
    }
};

const updateUser = async (req, res, next) => {
    //#swagger.tags = ['Users']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Enter a valid user ID to update user' });
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
            return res.status(204).send();
        }
        return res.status(500).json(response.error || 'Some error occurred while updating the user.');
    } catch (err) {
        return next(err);
    }
}

const deleteUser = async (req, res, next) => {
    //#swagger.tags = ['Users']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Enter a valid user ID to delete user' });
        }
        const user_id = new ObjectId(req.params.id);
        const response = await mongodb
            .getDatabase()
            .db()
            .collection('users')
            .deleteOne({ _id: user_id });
        if (response.deletedCount > 0) {
            return res.status(204).send();
        }
        return res.status(500).json(response.error || 'Some error occurred while deleting the user.');
    } catch (err) {
        return next(err);
    }
};

module.exports = {
    getAllUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser
};
