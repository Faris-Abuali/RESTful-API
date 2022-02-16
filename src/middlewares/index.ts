import express, { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';


class Middleware {
    handleValidation(req: Request, res: Response, next: NextFunction) {
        // 3rd param: the Middleware Function:
        const errors = validationResult(req); //this returns array called: errors
        if (!errors.isEmpty()) {
            // then there is an error (or errors) in the request. 
            // No need to return all errors, just return the 1st error.
            // This will make the front-end easier to show response:
            return res.json(errors.array()[0]);
        }
        // else, then the request passed the validation test:
        next(); //pass the request to its next stage (the controller function)
    }
}

export default new Middleware();
