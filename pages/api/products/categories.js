import nc from 'next-connect';
import { onError } from '../../../utils/error';
import { getCategories } from '../../../controllers/productControllers';

const handler = nc({
  onError,
});

handler.get(getCategories);

export default handler;
