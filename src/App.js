import React, {useEffect, useState} from 'react';
import url from 'url';
import {VK} from 'vk-call';

import './App.css';

let vkApi = new VK({
  token: '207dfb85136fe9e029cb08676b43eecbc2a115dfd289acf955d3c606a9bf825ea1a4f0bc80b5bb00dc9fd',
  version: "5.50",
  timeout: 10000
});

function App() {
  const createComment = () => {
    if (!vkApi) {
      return
    }
    vkApi.call("wall.createComment", { ...commentParams, message: commentText })
      .then(comment_id => {
        setCommentText('');
        setPostLink('');
        console.log(comment_id);
      }
    );
  };

  const [postLink, setPostLink] = useState('');
  const [commentText, setCommentText] = useState('');
  const [commentParams, setCommentParams] = useState({});

  useEffect(()=>{
    if (postLink) {
      try {
        const {query: {w}} = url.parse(postLink, true);
        const [owner_id, post_id] = w.match(/\d+/g);
        setCommentParams({owner_id, post_id});
      } catch (e) {
        console.error(e);
      }

    }
  }, [postLink]);

  return (
    <div className="App">
      <input type="text" value={postLink} placeholder="ссылка на пост" onChange={({currentTarget}) => setPostLink(currentTarget.value)}/>
      <br/>
      <input type="text" value={commentText} placeholder="комментарий" onChange={({currentTarget}) => setCommentText(currentTarget.value)}/>
      <br/><br/><br/>
      <button onClick={createComment}>send comment</button>
    </div>
  );
}

export default App;
