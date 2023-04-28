const express = require('express');
const router = express.Router();
const Blog = require('../DB_Model');
const multer = require('multer');
const cors = require('cors');
const methodOverride = require('method-override');
const fs = require('fs');
const _ = require('lodash');

router.use(express.json());
router.use(
  express.urlencoded({
    extended: true,
  })
);
router.use(cors());
router.use(methodOverride('_method'));

//multer storage settings
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploaded-images');
  },
  filename: (req, file, cb) => {
    cb(null, 'IMAGE-' + Date.now() + file.originalname);
  },
});

let upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == 'image/jpeg' ||
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/gif'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only jpeg, png, gif images are allowed'));
    }
  },
});

router.get('/admin', (req, res) => {
  Blog.find()
    .sort({ _id: -1 })
    .then((result) => {
      return res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get('/:publish', (req, res) => {
  const requestTitle = req.params.publish;
  try {
    Blog.findOne({ slug: requestTitle })
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        console.log("Not found db");
        res.status(500).json({
          error: err,
        });
        console.log(err);
      });
  } catch (e) {
    res.status(500).json({
      error: e,
    });
    console.log(e);
  }
});

router.get('/blog/edit/:id', (req, res) => {
  const requestID = req.params.id;
  Blog.findOne({ _id: requestID })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post('/compose', upload.single('image'), (req, res) => {
  const {
    slug,
    title,
    description,
    author,
    metaTitle,
    metaDescription,
    content,
  } = req.body;

  const image = req.file.filename;

  // console.log(image);
  const newBlog = new Blog({
    slug: _.kebabCase(_.lowerCase(slug)),
    title: title,
    description: description,
    author: author,
    updatedAt: new Date(),
    uploadedImage: image,
    metatitle: metaTitle,
    metadescription: metaDescription,
    pagecontent: content,
  });
  Blog.insertMany(newBlog)
    .then((result) => {
      res.status(200).json({
        added_product: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.put('/update/:id', upload.single('image'), (req, res) => {
  const requestedId = req.params.id;
  const {
    slug,
    title,
    description,
    author,
    metaTitle,
    metaDescription,
    content,
  } = req.body;

  if (req.file) {
    const image = req.file.filename;
    Blog.findOneAndUpdate(
      { _id: requestedId },
      {
        $set: {
          slug: _.kebabCase(_.lowerCase(slug)),
          title: title,
          description: description,
          author: author,
          uploadedImage: image,
          metatitle: metaTitle,
          metadescription: metaDescription,
          pagecontent: content,
        },
      }
    )
      .then((result) => {
        res.status(200).json({
          updated_product: result,
        });
        if (result.uploadedImage) {
          fs.unlinkSync(
            `public/uploaded-images/${result.uploadedImage}`,
            (err) => {
              console.log('Deleted image from folder');
            }
          );
        } else {
          console.log('Image not exist');
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  } else {
    Blog.findOneAndUpdate(
      { _id: requestedId },
      {
        $set: {
          slug: _.kebabCase(_.lowerCase(slug)),
          title: title,
          description: description,
          author: author,
          // uploadedImage: image,
          metatitle: metaTitle,
          metadescription: metaDescription,
          pagecontent: content,
        },
      }
    )
      .then((result) => {
        res.status(200).json({
          updated_product: result,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  }
});

router.delete('/blog/delete/:id', upload.single('image'), (req, res) => {
  const requestedId = req.params.id;
  try {
    Blog.findByIdAndDelete({ _id: requestedId })
      .then((result) => {
        res.status(200).json({
          deleted_product: result,
        });
        console.log('Deleted from db');
        if (result.uploadedImage) {
          fs.unlinkSync(
            `public/uploaded-images/${result.uploadedImage}`,
            (err) => {
              console.log('Deleted image from folder');
            }
          );
        } else {
          console.log('Image not exist');
        }
      })
      .catch((e) => {
        console.log(e);
      });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      error: e,
    });
  }
});

module.exports = router;
