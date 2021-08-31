import nc from 'next-connect';
import { isAuth, isAdmin } from '../../../utils/auth';
import { onError } from '../../../utils/error';
import { getAdminSummary } from '../../../controllers/adminControllers';

const handler = nc({
  onError,
});
handler.use(isAuth, isAdmin);

handler.get(getAdminSummary);

export default handler;
