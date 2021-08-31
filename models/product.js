import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, 'Please enter product name'],
      trim: true,
      maxLength: [100, 'Product name connot exceed 100 characters'],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      required: [true, 'Please enter product category'],
    },
    price: {
      type: Number,
      require: [true, 'Please enter product price'],
      maxLength: [4, 'product price connot exceed 4 characters'],
      default: 0.0,
    },
    brand: {
      type: String,
      required: [true, 'Please enter product brand'],
      maxLength: [30, 'Product brand connot exceed 30 characters'],
    },
    ratings: {
      type: Number,
      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: [true, 'Please enter product count in stock'],
      default: 0,
    },
    description: {
      type: String,
      require: [true, 'Please enter room description'],
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
