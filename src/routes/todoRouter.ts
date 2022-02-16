import Express from "express";
// ========== API Validation using express-validator ==========
import todoValidator from '../validator/index';
import middleware from '../middlewares/index';
// ============ Controllers ==========================
import todoController from '../controllers';

const router = Express.Router(); //create Router() instance

router.post(
    '/create',  //1st param
    todoValidator.checkCreateTodo(), //2nd param: express-validator function
    middleware.handleValidation, //3rd param: middleware function
    todoController.create  //4th param: the Controller Function
);

router.get(
    '/read', //1st param
    todoValidator.chechReadTodo(), //2nd param: express-validator function
    middleware.handleValidation, //3rd param: middleware function
    todoController.readWithPagination  //4th param: the Controller Function
);

// ====================================
router.get(
    '/read/:id', //1st param
    todoValidator.checkIdParam(), //2nd param: express-validator function
    middleware.handleValidation, //3rd param: middleware function
    todoController.readById  //4th param: the Controller Function
);
// ====================================
router.put(
    '/update/:id', //1st param
    todoValidator.checkIdParam(), //2nd param: express-validator function
    middleware.handleValidation, //3rd param: middleware function 
    todoController.updateById //4th param: the Controller Function
);
// ====================================
router.delete(
    '/delete/:id', //1st param
    todoValidator.checkIdParam(), //2nd param: express-validator function
    middleware.handleValidation, //3rd param: middleware function 
    todoController.deleteById //4th param: the Controller Function
);

export default router