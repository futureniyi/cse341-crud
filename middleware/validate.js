const {body, validationResult} = require('express-validator');

// Middleware to validate user input for creating a new user    

const saveUsers = [
  body('fullName')
    .isString()
    .notEmpty(),

  body('role')
    .isIn(['tenant', 'landlord', 'admin']),

  body('email')
    .isEmail()
    .normalizeEmail(),

  body('address')
    .isString()
    .notEmpty(),

  body('birthday')
    .notEmpty()
    .isISO8601(),

  body('phone')
    .optional({ checkFalsy: true, nullable: true })
    .isString(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(412).json({
        success: false,
        message: 'Validation failed',
        data: errors.array()
      });
    }
    return next();
  }
];

const saveProperties = [
  body('title')
    .isString()
    .notEmpty(),

  body('addressLine1')
    .isString()
    .notEmpty(),

  body('city')
    .isString()
    .notEmpty(),

  body('state')
    .isString()
    .notEmpty(),

  body('rentAmount')
    .isNumeric(),

  body('rentCurrency')
    .isString()
    .isLength({ min: 3, max: 3 }),

  body('rentCycle')
    .isIn(['monthly', 'yearly']),

  body('status')
    .isIn(['vacant', 'occupied']),

  body('ownerEmail')
    .isEmail()
    .normalizeEmail(),

  body('tenantEmail')
    .optional({ nullable: true, checkFalsy: true })
    .isEmail()
    .normalizeEmail(),

  body('startDate')
    .optional({ nullable: true, checkFalsy: true })
    .isISO8601(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(412).json({
        success: false,
        message: 'Validation failed',
        data: errors.array()
      });
    }
    return next();
  }
];



module.exports = {
    saveUsers,
    saveProperties
};
