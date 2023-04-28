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

router.get('/', (req, res) => {
  Blog.find()
    .sort({ _id: -1 })
    .then((result) => {
      return res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get('/:slug', (req, res) => {
  const requestedSlug = req.params.slug;
  try {
    Blog.findOne({ slug: requestedSlug })
      .then((result) => {
        res.send(result);
      })
      .catch((e) => {
        console.log(e);
      });
  } catch (e) {
    console.log(e);
  }
});

router.post('/', (req, res) => {
  res.send('Post');
});

router.put('/', (req, res) => {
  res.send('Put');
});

router.delete('/', (req, res) => {
  res.send('Delete');
});

module.exports = router;
