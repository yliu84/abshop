import nc from 'next-connect';
import { isAuth, isAdmin } from '../../../../utils/auth';
import { onError } from '../../../../utils/error';
import { getAllUsers } from '../../../../controllers/adminControllers';

const handler = nc({
  onError,
});
handler.use(isAuth, isAdmin);

handler.get(getAllUsers);

export default handler;
