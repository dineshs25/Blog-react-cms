import React, { useRef, useState, useMemo } from 'react';
import axios from 'axios';
import Header from './Constants/header';
import Footer from './Constants/footer';
import { useNavigate } from 'react-router-dom';
import JoditEditor from 'jodit-react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
import Container from 'react-bootstrap/Container';
// import Alert from 'react-bootstrap/Alert';

const Compose = () => {
  //react-tostify
  const notify1 = () =>
    toast.error('Fill all the input fields to publish the blog!!!');

  const config = useMemo(
    () => ({
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
    }),
    []
  );

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [image, setImage] = useState('');
  const [content, setContent] = useState('');
  const [slug, setSlug] = useState('');
  // const [show, setShow] = useState(false);

  // const [genrateSlug, setGeneratedSlug] = ('');
  const editor = useRef(null);

  const navigate = useNavigate();
  const submit = async (e) => {
    e.preventDefault();

    const formdata = new FormData();

    formdata.append('slug', slug);
    formdata.append('title', title);
    formdata.append('description', description);
    formdata.append('author', author);
    formdata.append('metaTitle', metaTitle);
    formdata.append('metaDescription', metaDescription);
    formdata.append('image', image);
    formdata.append('content', content);

    try {
      await axios
        .post('http://localhost:8000/admin/compose', formdata)
        .then(() => {
          console.log('data sent to server success');
          navigate('/admin');
        })
        .catch((e) => {
          notify1();
          console.log(e);
          // console.log(alert('!Please fill all the Input fields to publish.'));
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Header />
      <Container>
        <div>
          <ToastContainer />
          <h1>Compose New Blog</h1>
          <Form>
            <div className="form-group">
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Blog Title</Form.Label>
                <Form.Control
                  name="title"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  type="text"
                  placeholder="Blog Title"
                  required
                />
              </Form.Group>
              <br />
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>URL slug</Form.Label>
                <Form.Control
                  name="slug"
                  onChange={(e) => {
                    setSlug(e.target.value);
                  }}
                  type="text"
                  placeholder="URL slug"
                  required
                />
              </Form.Group>

              <br />

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Author</Form.Label>
                <Form.Control
                  name="author"
                  onChange={(e) => {
                    setAuthor(e.target.value);
                  }}
                  type="text"
                  placeholder="Author"
                  required
                />
              </Form.Group>
              <br />
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
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Upload Image</Form.Label>
                <Form.Control
                  type="file"
                  size="lg"
                  name="image"
                  accept=".png, .jpg, .jpeg"
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                  }}
                  required
                />
              </Form.Group>
              <br />
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Meta Title</Form.Label>
                <Form.Control
                  name="metaTitle"
                  onChange={(e) => {
                    setMetaTitle(e.target.value);
                  }}
                  type="text"
                  placeholder="Meta Title"
                  required
                />
              </Form.Group>
              <br />
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
                  onChange={(e) => {
                    setMetaDescription(e.target.value);
                  }}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Page Content editor</Form.Label>
                <JoditEditor
                  ref={editor}
                  value={content}
                  config={config}
                  onBlur={(newContent) => {
                    setContent(newContent);
                  }}
                />
              </Form.Group>
            </div>
            <Button
              variant="outline-primary"
              className="update_button"
              type="submit"
              name="sub"
              onClick={submit}
            >
              Publish
            </Button>
          </Form>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default Compose;
