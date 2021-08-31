import nc from 'next-connect';
import { isAuth, isAdmin } from '../../../../utils/auth';
import { onError } from '../../../../utils/error';
import {
  allProducts,
  newProduct,
} from '../../../../controllers/productControllers';

const handler = nc({
  onError,
});
handler.use(isAuth, isAdmin);

handler.get(allProducts);

handler.post(newProduct);

export default handler;
