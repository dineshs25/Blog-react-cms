import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const DeleteButton = ({ id }) => {
  const navigate = useNavigate();

  const remove = async (e) => {
    e.preventDefault();

    try {
      await axios
        .delete(`http://localhost:8000/admin/blog/delete/${id}`)
        .then(() => {
          console.log('Deletion Success');
          window.location.reload(false);
          navigate('/admin');
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Button type="button" variant="outline-danger" onClick={remove}>
        Delete
      </Button>
    </>
  );
};

export default DeleteButton;
