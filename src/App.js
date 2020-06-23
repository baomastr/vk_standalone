import React, {useEffect, useState} from 'react';
import qs from 'qs';
import axios from 'axios';
import {VK} from 'vk-call';

import './App.css';

let vkApi;

function App() {
  const [accessToken, setAccessToken] = useState();
  const location = window.location;
  const {origin, pathname, search} = location;
  const {code} = qs.parse(search.substr(1));
  const redirectUri = encodeURIComponent(`${origin}${pathname}`);

  useEffect(()=>{
    if (code) {
      const getTokenUrl = `https://oauth.vk.com/access_token?client_id=7516065&client_secret=UULPND8KvkEsSix4DZw3&redirect_uri=${redirectUri}&code=${code}`;
      try {
        axios.get(getTokenUrl)
          .then(function (response) {
            // handle success
            console.log(response);
            const {access_token} = response.data;
            // window.localStorage.setItem('access_token', access_token);
            setAccessToken(access_token);
            vkApi = new VK({
              token: access_token,
              version: "5.50",
              timeout: 10000
            });
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
          // .then(function () {
          //   // always executed
          // });
      } catch (error) {
        console.error(error);
      }
    }
  }, [code, redirectUri]);

  // vkApi.call("users.get", { user_ids: 602492550 })
  //   .then(users => console.log(users));

  const sendComment = () => {
    if (!vkApi) {
      return
    }
    vkApi.call("wall.createComment", { owner_id: 602492550, post_id: 2, message: 'test comment' })
      .then(comment_id => console.log(comment_id));
  };

  const authHref = `https://oauth.vk.com/authorize?client_id=7516065&display=page&redirect_uri=${redirectUri}&scope=wall&response_type=code&v=5.110`
  return (
    <div className="App">
      <br/>
      {/*<a href="https://oauth.vk.com/authorize?client_id=7516065&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F&scope=wall&response_type=token">AUTH</a>*/}
      {/*https://oauth.vk.com/authorize?client_id=1&display=page&redirect_uri=http://example.com/callback&scope=wall&response_type=code&v=5.110*/}
      <a href={authHref}>AUTH1</a>
      <br/>
      <br/>
      {accessToken && <button onClick={sendComment}>send comment</button>}
    </div>
  );
}

export default App;
