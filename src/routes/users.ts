import { Router } from 'express';
import {
    createUser,
    deleteUser,
    generateCustomToken,
    getAllUsers,
    getUserById,
    getUserByQuery,
    updateUser,
    verifyCustomToken
} from '../controller/users';


const router = Router();

router.get('/query', getUserByQuery);
router.get('/id/:id', getUserById);
router.post('/generate-token', generateCustomToken);
router.get('/verify-token/:idToken', verifyCustomToken);
router.post('/create', createUser);
router.get('/get-all', getAllUsers);
router.put('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser);

export default router;