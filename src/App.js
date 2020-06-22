import React from 'react';

import './App.css';

const {VK} = require("vk-call");

const vkApi = new VK({
  token: "3509cdcc3509cdcc3509cdcc14357b626d335093509cdcc6be57f541580c8e346f3d3de",
  version: "5.50",
  timeout: 10000
});

function App() {
  // vkApi.call("users.get", { user_ids: 602492550 })
  //   .then(users => console.log(users));

  vkApi.call("wall.createComment", { owner_id: 602492550, post_id: 2, message: 'test comment' })
    .then(users => console.log(users));
  return (
    <div className="App">
      <a href="https://oauth.vk.com/authorize?client_id=7516065&redirect_uri=https%3A%2F%2Fbaomastr.github.io%2Fvk_standalone%2F">AUTH</a>
    </div>
  );
}

export default App;
