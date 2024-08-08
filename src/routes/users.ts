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
router.get('/:id', getUserById);
router.post('/generate-token', generateCustomToken);
router.get('/verify-token/:idToken', verifyCustomToken);
router.post('/', createUser);
router.get('/', getAllUsers);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;