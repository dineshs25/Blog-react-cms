import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import Header from './Constants/header';
import Footer from './Constants/footer';
import EditButton from './buttons/editButton';
import Error from './Constants/error';
import { sanitize } from 'dompurify';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Container from 'react-bootstrap/Container';
// import DeleteButton from './buttons/deleteButton';

const Blog = () => {
  const slug = useParams();
  const slugURL = slug.publish;
  const [blogPage, setBlogPage] = useState([]);
  const [pagefound, setPageFound] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  let API = `http://localhost:8000/admin/${slugURL}`;

  const fetchBlog = async (url) => {
    try {
      await axios
        .get(url)
        .then((result) => {
          setLoading(true);
          const data = result.data;
          if (data === '') {
            setPageFound('Notfound');
          } else {
            setBlogPage(data);
          }
        })
        .catch((err) => {
          console.log('Not found the page', err);
          navigate('/admin');
        });
    } catch (e) {
      console.log('Not found the page', e);
      navigate('/admin');
    }
  };

  useEffect(() => {
    fetchBlog(API);
  }, []);

  const printDate = (date) => {
    return new Date(date).toLocaleString('en-us', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <meta charSet="utf-8" />
          <meta name="description" content={blogPage.metadescription} />
          <title>{blogPage.metatitle}</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
        <Header />
        {loading ? (
          <div>
            {pagefound === 'Notfound' ? (
              <Error />
            ) : (
              <Container>
                <div className="blogPage blogPageAdmin">
                  <h1>Admin Blog Page</h1>
                  <h1>{blogPage.title}</h1>
                  <div className="blogpage-img">
                    <img
                      src={`http://localhost:8000/public/uploaded-images/${blogPage.uploadedImage}`}
                      alt="blogpic"
                    />
                  </div>
                  <p>
                    Last Update On: <b>{printDate(blogPage.updatedAt)}</b> by{' '}
                    {blogPage.author}
                  </p>
                  <EditButton id={blogPage._id} />
                  <br />
                  <p className="blogBody">{blogPage.description}</p>
                  <div
                    className="container"
                    dangerouslySetInnerHTML={{
                      __html: sanitize(blogPage.pagecontent),
                    }}
                  />
                </div>
              </Container>
            )}
            ;
          </div>
        ) : (
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
        <Footer />
      </HelmetProvider>
    </>
  );
};

export default Blog;
