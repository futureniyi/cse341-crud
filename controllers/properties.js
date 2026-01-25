// // controllers/properties.js
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllProperties = async (req, res) => {
    //#swagger.tags = ['Properties']
    const result = await mongodb.getDatabase().db().collection('properties').find();
    result.toArray().then((properties) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(properties);
  });
};

const getSingleProperty = async (req, res) => {
    //#swagger.tags = ['Properties']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: 'Enter a valid property ID to get property' });
    }
    const propertyId = new ObjectId(req.params.id);
    const result = await mongodb
        .getDatabase()
        .db()
        .collection('properties')
        .findOne({ _id: propertyId });
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
};

const createProperty = async (req, res) => {
    //#swagger.tags = ['Properties']
    const property = {
        title: req.body.title,
        addressLine1: req.body.addressLine1,
        city: req.body.city,
        state: req.body.state,
        rentAmount: req.body.rentAmount,
        rentCurrency: req.body.rentCurrency,
        rentCycle: req.body.rentCycle,
        status: req.body.status,
        ownerEmail: req.body.ownerEmail,
        tenantEmail: req.body.tenantEmail || null,
        startDate: req.body.startDate ? new Date(req.body.startDate) : null,
        createdAt: new Date()
    };


    const response = await mongodb
        .getDatabase()
        .db()
        .collection('properties')
        .insertOne(property);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the property.');
    }
};

const updateProperty = async (req, res) => {
    //#swagger.tags = ['Properties']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: 'Enter a valid property ID to update property' });
    }
    const property_id = new ObjectId(req.params.id);
    const property = {
        title: req.body.title,
        addressLine1: req.body.addressLine1,
        city: req.body.city,
        state: req.body.state,
        rentAmount: req.body.rentAmount,
        rentCurrency: req.body.rentCurrency,
        rentCycle: req.body.rentCycle,
        status: req.body.status,
        ownerEmail: req.body.ownerEmail,
        tenantEmail: req.body.tenantEmail || null,
        startDate: req.body.startDate ? new Date(req.body.startDate) : null,
        updatedAt: new Date()
    };

    const response = await mongodb
        .getDatabase()
        .db()
        .collection('properties')
        .replaceOne({ _id: property_id }, property);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the property.');
    }
}

const deleteProperty = async (req, res) => {
    //#swagger.tags = ['Properties']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: 'Enter a valid property ID to delete property' });
    }
    const property_id = new ObjectId(req.params.id);
    const response = await mongodb
        .getDatabase()
        .db()
        .collection('properties')
        .deleteOne({ _id: property_id });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the property.');
    }
}

module.exports = {
    getAllProperties,
    getSingleProperty,
    createProperty,
    updateProperty,
    deleteProperty
};