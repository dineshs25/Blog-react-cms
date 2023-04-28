import axios from 'axios';
import React, { useEffect, useRef, useState, useMemo } from 'react';
import {useNavigate, useParams } from 'react-router-dom';
import Footer from './Constants/footer';
import Header from './Constants/header';
import JoditEditor from 'jodit-react';
import Button from 'react-bootstrap/Button';
import Error from './Constants/error';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';

const BlogEdit = () => {
  const editor = useRef(null);

  const config = useMemo(
    () => (
      {
        readonly: false,
        enableDragAndDropFileToEditor: true,
        uploader: {
          insertImageAsBase64URI: true,
        },
        controls: {
          font: {
            list: {
              'Roboto Medium,Arial,sans-serif': 'Roboto',
            },
          },
        },
      }
    ),
    []
  );

  const id = useParams();

  const idURL = id.id;
  const [blogEdit, setBlogEdit] = useState({
    slug: '',
    title: '',
    description: '',
    author: '',
    metaTitle: '',
    metaDescription: '',
    image: '',
    content: '',
  });
  const [pagefound, setPageFound] = useState('');
  const [loading, setLoading] = useState(false);


  let API = `http://localhost:8000/admin/blog/edit/${idURL}`;

  const fetchBlog = async (url) => {
    try {
      await axios
        .get(url)
        .then((result) => {
          setLoading(true);
          if (result.data === '') {
            setLoading(true);
            setPageFound('Notfound');
          } else {
            setBlogEdit({
              ...blogEdit,
              slug: result.data.slug,
              title: result.data.title,
              description: result.data.description,
              author: result.data.author,
              metaTitle: result.data.metatitle,
              metaDescription: result.data.metadescription,
              image: result.data.uploadedImage,
              content: result.data.pagecontent,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchBlog(API);
  }, []);

  // -----------------------------------------------------------------------------------------------------------------------

  const navigate = useNavigate();

  const update = async (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append('slug', blogEdit.slug);
    formdata.append('title', blogEdit.title);
    formdata.append('description', blogEdit.description);
    formdata.append('author', blogEdit.author);
    formdata.append('metaTitle', blogEdit.metaTitle);
    formdata.append('metaDescription', blogEdit.metaDescription);
    formdata.append('image', blogEdit.image);
    formdata.append('content', blogEdit.content);

    try {
      await axios
        .put(`http://localhost:8000/admin/update/${idURL}`, formdata)
        .then(() => {
          // console.log('data sent to update success');
          navigate('/admin');
        })
        .catch((e) => {
          console.log('data for update failed to sent');
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Header />
      {loading ? (
        <Container>
        <div>
          <h1>Admin Blog Edit Panel</h1>
          {pagefound === 'Notfound' ? (
            <Error />
          ) : (
            <Form>
              <div className="form-group">
                {/* <label>Title</label>
            <input
              class="form-control h-100"
              type="text"
              name="title"
              value={blogEdit.title}
              onChange={(e) => {
                setBlogEdit({ ...blogEdit, title: e.target.value });
              }}
            /> */}
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Blog Title</Form.Label>
                  <Form.Control
                    name="title"
                    value={blogEdit.title}
                    onChange={(e) => {
                      setBlogEdit({ ...blogEdit, title: e.target.value });
                    }}
                    type="text"
                    placeholder="Blog Title"
                    required
                  />
                </Form.Group>
                <br />
                {/* <label>URL slug</label>
                <input
                  class="form-control h-100"
                  type="text"
                  name="slug"
                  value={blogEdit.slug}
                  onChange={(e) => {
                    setBlogEdit({ ...blogEdit, slug: e.target.value });
                  }}
                  required
                /> */}
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>URL slug</Form.Label>
                  <Form.Control
                    name="slug"
                    value={blogEdit.slug}
                    onChange={(e) => {
                      setBlogEdit({ ...blogEdit, slug: e.target.value });
                    }}
                    type="text"
                    placeholder="URL slug"
                    required
                  />
                </Form.Group>
                <br />
                {/* <label>Post Description</label>
                <textarea
                  class="form-control"
                  rows="5"
                  name="description"
                  value={blogEdit.description}
                  onChange={(e) => {
                    setBlogEdit({ ...blogEdit, description: e.target.value });
                  }}
                ></textarea> */}
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Post Description</Form.Label>
                  <Form.Control
                    placeholder="Post Description"
                    as="textarea"
                    rows={5}
                    name="description"
                    value={blogEdit.description}
                    onChange={(e) => {
                      setBlogEdit({ ...blogEdit, description: e.target.value });
                    }}
                    required
                  />
                </Form.Group>
                {/* <label>Author</label>
                <br />
                <input
                  class="form-control h-100"
                  type="text"
                  name="author"
                  value={blogEdit.author}
                  onChange={(e) => {
                    setBlogEdit({ ...blogEdit, author: e.target.value });
                  }}
                /> */}
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Author</Form.Label>
                  <Form.Control
                    name="author"
                    value={blogEdit.author}
                    onChange={(e) => {
                      setBlogEdit({ ...blogEdit, author: e.target.value });
                    }}
                    type="text"
                    placeholder="Author"
                    required
                  />
                </Form.Group>
                <br />
                {/* <label>Upload Image</label>
                <input
                  class="form-control h-100"
                  type="file"
                  name="image"
                  accept=".png, .jpg, .jpeg"
                  onChange={(e) => {
                    setBlogEdit({ ...blogEdit, image: e.target.files[0] });
                  }}
                /> */}
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Upload Image</Form.Label>
                  <Form.Control
                    type="file"
                    size="lg"
                    name="image"
                    accept=".png, .jpg, .jpeg"
                    onChange={(e) => {
                      setBlogEdit({ ...blogEdit, image: e.target.files[0] });
                    }}
                  />
                </Form.Group>
                <br />
                {/* <label>Meta Title</label>
                <input
                  class="form-control h-100"
                  type="text"
                  name="metaTitle"
                  value={blogEdit.metaTitle}
                  onChange={(e) => {
                    setBlogEdit({ ...blogEdit, metaTitle: e.target.value });
                  }}
                /> */}
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Meta Title</Form.Label>
                  <Form.Control
                    name="metaTitle"
                    value={blogEdit.metaTitle}
                    onChange={(e) => {
                      setBlogEdit({ ...blogEdit, metaTitle: e.target.value });
                    }}
                    type="text"
                    placeholder="Meta Title"
                    required
                  />
                </Form.Group>
                <br />
                {/* <label>Meta Description</label>
                <br />
                <textarea
                  class="form-control"
                  rows="5"
                  name="metaDescription"
                  value={blogEdit.metaDescription}
                  onChange={(e) => {
                    setBlogEdit({
                      ...blogEdit,
                      metaDescription: e.target.value,
                    });
                  }}
                ></textarea> */}
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Meta Description</Form.Label>
                  <Form.Control
                    placeholder="Meta Description"
                    as="textarea"
                    rows={5}
                    name="metaDescription"
                    value={blogEdit.metaDescription}
                    onChange={(e) => {
                      setBlogEdit({
                        ...blogEdit,
                        metaDescription: e.target.value,
                      });
                    }}
                    required
                  />
                </Form.Group>
                {/* <label>Page Content editor</label>
                <br />
                <JoditEditor
                  ref={editor}
                  value={blogEdit.content}
                  config={config}
                  onChange={(newContent) => {
                    setBlogEdit({ ...blogEdit, content: newContent });
                  }}
                /> */}
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Page Content editor</Form.Label>
                  <JoditEditor
                    ref={editor}
                    value={blogEdit.content}
                    config={config}
                    onBlur={(newContent) => {
                      setBlogEdit({ ...blogEdit, content: newContent });
                    }}
                  />
                </Form.Group>
              </div>
              <Button
                variant="outline-primary"
                className="update_button"
                type="submit"
                name="sub"
                onClick={update}
              >
                Update
              </Button>
            </Form>
          )}
        </div>
        </Container>
      ) : (
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <Footer />
    </>
  );
};

export default BlogEdit;
