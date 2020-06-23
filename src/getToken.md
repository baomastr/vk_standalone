```javascript
import React, {useEffect, useState} from 'react';
import qs from 'qs';
import axios from 'axios';
import {VK} from 'vk-call';

import './App.css';

let vkApi = new VK({
  // token: '3509cdcc3509cdcc3509cdcc14357b626d335093509cdcc6be57f541580c8e346f3d3de',
  token: '207dfb85136fe9e029cb08676b43eecbc2a115dfd289acf955d3c606a9bf825ea1a4f0bc80b5bb00dc9fd',
  version: "5.50",
  timeout: 10000
});

function App() {
  const [accessToken, setAccessToken] = useState();
  const location = window.location;
  const {origin, pathname, search, hash} = location;
  const {code} = qs.parse(search.substr(1));
  const {access_token} = qs.parse(hash.substr(1));
  // const redirectUri = encodeURIComponent(`${origin}${pathname}`);
  const redirectUri = encodeURIComponent(`https://api.vk.com/blank.html`);
  const clientId = 7516065;
  const clientSecret = 'UULPND8KvkEsSix4DZw3';

  useEffect(()=>{
    if (code) {
      const getTokenUrl = `https://oauth.vk.com/access_token?client_id=${clientId}&client_secret=${clientSecret}&v=5.110&grant_type=client_credentials`;
      // const getTokenUrl = `https://oauth.vk.com/access_token?client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${redirectUri}&code=${code}`;
      try {
        axios.get(getTokenUrl)
          .then(function (response) {
            // handle success
            console.log(response);
            const {access_token} = response.data;
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

    if (access_token) {
      setAccessToken(access_token);
      vkApi = new VK({
        token: access_token,
        version: "5.50",
        timeout: 10000
      });
    }
  }, [access_token, code, redirectUri]);

  const sendComment = () => {
    if (!vkApi) {
      return
    }
    vkApi.call("wall.createComment", { owner_id: 602492550, post_id: 2, message: 'test comment',
      // from_group: 196451249, access_token: 'aca399ac899341918ac9bf4be7e99f2d27466e4271dedc19210179f859c09f0b99c331f128b6afbbb9350'
    })
      .then(comment_id => console.log(comment_id));
  };
  // const authHref = `https://oauth.vk.com/authorize?client_id=${clientId}&display=page&redirect_uri=${redirectUri}&scope=wall&response_type=code&v=5.110`
  const authHref = `https://oauth.vk.com/authorize?client_id=${clientId}&display=page&redirect_uri=${redirectUri}&scope=wall%2Coffline&response_type=token&v=5.110`
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

```
