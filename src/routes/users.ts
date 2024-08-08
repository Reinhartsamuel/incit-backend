import { Router } from 'express';
import {
    createUser,
    deleteUser,
    generateCustomToken,
    getAllUsers,
    getUserById,
    updateUser,
    verifyCustomToken
} from '../controller/users';


const router = Router();

router.post('/generate-token', generateCustomToken);
router.get('/verify-token/:idToken', verifyCustomToken);
router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;