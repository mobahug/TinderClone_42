import React, { useState, useEffect } from 'react';

import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import CancelIcon from '@mui/icons-material/Cancel';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import 'react-toastify/dist/ReactToastify.css';
import axiosApiInstance from '../hooks/axiosPrivate';
import Divider from '@mui/material/Divider';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Tags = () => {
  const [tags, setTags] = useState(JSON.parse(localStorage.getItem('tags')));
  const [newTags, setNewTags] = useState([]);
  const [newTag, setNewTag] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [toBeRemoved, setToBeRemoved] = useState([]);
  const uploadTags = async () => {
    toBeRemoved.forEach((element) => axiosApiInstance.delete('/tag/' + element));
    if (tags) {
      tags.forEach((element) => newTags.push(element.name));
    }
    try {
      const refreshToken = sessionStorage.getItem('refreshtoken');
      if (refreshToken) {
        await axiosApiInstance.post('/tag/', { tags: newTags });
        const response = await axiosApiInstance.post('/tag/userstag');
        localStorage.setItem('tags', JSON.stringify(response.data.data.tags));
        if (response.request.status === 200) {
          toast.success('Tags updated');
        }
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const addNewTags = async (e, value) => {
    e.preventDefault();

    const list = [...newTags];
    if (!value) {
      if (newTag) {
        list.push(newTag);
      }
    } else {
      list.push(value);
    }
    setNewTags(list);
  };

  const removeUserTags = async (event, tag_id) => {
    const rem = [...toBeRemoved];
    rem.push(tag_id);
    setToBeRemoved(rem);
    const list = [...tags];
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === tag_id) {
        list.splice(i, 1);
        i--;
      }
    }
    setTags(list);
  };
  const tagChange = (e) => {
    setNewTag(e.target.value);
  };
  const removeUserTagsFromState = (event, value) => {
    event.preventDefault();
    let id = value;
    const list = [...newTags];
    for (var i = 0; i < list.length; i++) {
      if (list[i] === id) {
        list.splice(i, 1);
        i--;
      }
    }
    setNewTags(list);
  };

  useEffect(() => {
    const getSuggestions = async () => {
      const refreshToken = sessionStorage.getItem('refreshtoken');
      if (refreshToken) {
        const res = await axiosApiInstance.post('/tag/toptags');
        setSuggestions(res.data.data.tags);
      }
    };

    return getSuggestions;
  }, [axiosApiInstance]);

  return (
    <>
      <Box
        sx={{
          mb: '30px',
          padding: '10px',
          border: 1,
          borderRadius: '10px',
          borderColor: '#D8D8D8',
        }}
      >
        <Typography align="left" component="h6" variant="h6">
          Trending tags
        </Typography>
        {suggestions &&
          suggestions.map((tag, value) => {
            return (
              <Chip
                style={{ margin: 2 }}
                key={value}
                label={tag.name}
                value={tag.name}
                id={tag.id}
                name={tag.name}
                onClick={(e) => addNewTags(e, tag.name)}
                icon={<AddCircleIcon />}
              />
            );
          })}
        <Divider style={{ marginBottom: 5 }} />
        <div className="box">
          <form onSubmit={addNewTags}>
            <TextField
              sx={{ marginTop: 2 }}
              inputProps={{ maxLength: 30 }}
              id="outlined-multiline-static"
              label="New Tags"
              name="newTag"
              type="text"
              value={newTag}
              onChange={(e) => tagChange(e)}
              placeholder="Enter tags.."
              helperText="Max 30 character!"
            />
            <Button type="add" variant="contained" sx={{ float: 'right', mt: 3, mb: 2, mr: 1 }}>
              add
            </Button>
          </form>
        </div>
        <Divider style={{ marginBottom: 5 }} />
        <Typography align="left" component="h6" variant="h6">
          My tags
        </Typography>
        {newTags &&
          newTags.map((tag, value) => {
            return (
              <Chip
                key={value}
                label={tag}
                value={tag}
                onDelete={(e) => removeUserTagsFromState(e, tag)}
                deleteIcon={<CancelIcon />}
                id={tag}
                name={tag}
              />
            );
          })}
        {tags &&
          tags.map((tag, value) => {
            return (
              <Chip
                style={{ margin: 2 }}
                key={value}
                label={tag.name}
                onDelete={(e) => removeUserTags(e, tag.id)}
                deleteIcon={<CancelIcon />}
                id={tag.id}
                name={tag.id}
              />
            );
          })}
        <Button
          onClick={uploadTags}
          variant="contained"
          sx={{ float: 'right', mt: 3, mb: 2, mr: 1 }}
        >
          Save
        </Button>
      </Box>
    </>
  );
};

export default Tags;
