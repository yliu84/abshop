import nc from 'next-connect';
import { isAdmin, isAuth } from '../../../../utils/auth';
import {
  getSingleUser,
  deleteUser,
  updateUser,
} from '../../../../controllers/adminControllers';

const handler = nc();
handler.use(isAuth, isAdmin);

handler.get(getSingleUser);
handler.put(updateUser);
handler.delete(deleteUser);
export default handler;
