import nc from 'next-connect';
import { updateProfile } from '../../../controllers/authControllers';
import { isAuth } from '../../../utils/auth';
import { onError } from '../../../utils/error';

const handler = nc({ onError });

handler.use(isAuth);

handler.put(updateProfile);

export default handler;
