import nc from 'next-connect';
import { register } from '../../../controllers/authControllers';
// import onError from '../../../middlewares/errors';

const handler = nc();

handler.post(register);

export default handler;
