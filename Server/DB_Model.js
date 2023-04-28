const mongoose = require('mongoose');
// require('dotenv').config();

mongoose
  .connect('mongodb://localhost:27017/hblogdb')
  .then(() => {
    console.log('DB Connected');
  })
  .catch(() => {
    console.log('DB Connection failed');
  });

const blogSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    uploadedImage: {
      type: String,
    },
    metatitle: {
      type: String,
      required: true,
    },
    metadescription: {
      type: String,
      required: true,
    },
    pagecontent: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model('blog', blogSchema);

module.exports = Blog;
