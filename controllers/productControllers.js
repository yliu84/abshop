import Product from '../models/product';
import db from '../config/db';
import cloudinary from 'cloudinary';

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

export {
  allProducts,
  getSingleProduct,
  updateProduct,
  newProduct,
  deleteProduct,
};
