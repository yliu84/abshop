import nc from 'next-connect';
import { login } from '../../../controllers/authControllers';
// import onError from '../../../middlewares/errors';

const handler = nc();

handler.post(login);

export default handler;
