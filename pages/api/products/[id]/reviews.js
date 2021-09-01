import nextConnect from 'next-connect';
import { onError } from '../../../../utils/error';
import { isAuth } from '../../../../utils/auth';
import {
  getProductReviews,
  newProductReview,
} from '../../../../controllers/productControllers';

const handler = nextConnect({
  onError,
});

handler.get(getProductReviews);

handler.use(isAuth).post(newProductReview);

export default handler;
