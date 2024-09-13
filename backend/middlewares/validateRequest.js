import {validationResult} from 'express-validator';

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error: errors.array()});
    }
    next();
};

export default validateRequest;