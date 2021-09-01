import Product from '../models/product';
import db from '../config/db';
import cloudinary from 'cloudinary';
import mongoose from 'mongoose';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Get all products => /api/products
const allProducts = async (req, res) => {
  await db.connect();
  const products = await Product.find({});
  await db.disconnect();

  res.status(200).json({
    success: true,
    products,
  });
};

// Get product details => /api/products/:id
const getSingleProduct = async (req, res) => {
  await db.connect();
  const product = await Product.findById(req.query.id);
  await db.disconnect();

  res.status(200).json({
    success: true,
    product,
  });
};

const updateProduct = async (req, res) => {
  await db.connect();
  let product = await Product.findById(req.query.id);

  if (req.body.images) {
    // Delete images associated with the room
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    let imagesLinks = [];
    const images = req.body.images;

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: 'abshop/products',
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  if (product) {
    product = await Product.findByIdAndUpdate(req.query.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    await db.disconnect();
    res.status(200).json({ message: 'Product Updated Successfully' });
  } else {
    await db.disconnect();
    res.status(404).json({ message: 'Product Not Found' });
  }
};

const newProduct = async (req, res) => {
  await db.connect();
  const images = req.body.images;

  let imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: 'abshop/products',
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;

  const product = await Product.create(req.body);

  await db.disconnect();
  res.status(200).json({
    success: true,
    product,
  });
};

const deleteProduct = async (req, res) => {
  db.connect();
  const product = await Product.findById(req.query.id);

  if (!product) {
    await db.disconnect();
    res.status(404).json({ message: 'Product Not Found' });
  }

  // Delete images associated with the room
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }

  await product.remove();

  db.disconnect();

  res.status(200).json({
    success: true,
    message: 'Product is deleted.',
  });
};

const getProductReviews = async (req, res) => {
  db.connect();
  const product = await Product.findById(req.query.id);
  db.disconnect();
  if (product) {
    res.status(200).json(product.reviews);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};

const newProductReview = async (req, res) => {
  await db.connect();
  const product = await Product.findById(req.query.id);
  if (product) {
    const existReview = product.reviews.find((x) => x.user == req.user._id);
    if (existReview) {
      await Product.updateOne(
        { _id: req.query.id, 'reviews._id': existReview._id },
        {
          $set: {
            'reviews.$.comment': req.body.comment,
            'reviews.$.rating': Number(req.body.rating),
          },
        }
      );

      const updatedProduct = await Product.findById(req.query.id);
      updatedProduct.numReviews = updatedProduct.reviews.length;
      updatedProduct.rating =
        updatedProduct.reviews.reduce((a, c) => c.rating + a, 0) /
        updatedProduct.reviews.length;
      await updatedProduct.save();

      await db.disconnect();
      return res.status(200).json({ message: 'Review updated' });
    } else {
      const review = {
        user: mongoose.Types.ObjectId(req.user._id),
        name: req.user.name,
        rating: Number(req.body.rating),
        comment: req.body.comment,
      };
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
      product.ratings =
        product.reviews.reduce((a, c) => c.rating + a, 0) /
        product.reviews.length;
      await product.save();

      await db.disconnect();
      res.status(201).json({
        message: 'Review submitted',
      });
    }
  } else {
    await db.disconnect();
    res.status(404).json({ message: 'Product Not Found' });
  }
};

const getCategories = async (req, res) => {
  await db.connect();
  const categories = await Product.find().distinct('category');
  await db.disconnect();
  res.status(200).json(categories);
};

export {
  allProducts,
  getSingleProduct,
  updateProduct,
  newProduct,
  deleteProduct,
  getProductReviews,
  newProductReview,
  getCategories,
};
