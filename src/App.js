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
	const [searchString, setSearchString] = useState('');
	const [postLink, setPostLink] = useState('');
	const [commentText, setCommentText] = useState('');
	const [commentParams, setCommentParams] = useState({});
	const [searchResult, setSearchResult] = useState({});

	const searchPosts = () => {
		vkApi.call('newsfeed.search', {q: searchString, extended: 1}).then(res => {
			setSearchResult(res);
			console.log(res)
		})
	};

	const createComment = () => {
		if (!vkApi) {
			return
		}
		vkApi.call("wall.createComment", {...commentParams, message: commentText})
			.then(res => {
					setCommentText('');
					setPostLink('');
					console.log(res);
				}
			);
	};

	useEffect(() => {
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
			<input type="text" value={searchString} placeholder="искать посты"
						 onChange={({currentTarget: {value}}) => setSearchString(value)}/>
			<br/>
			<br/>
			<button onClick={searchPosts}>search posts</button>
			<br/>
			<br/>
			<input type="text" value={postLink} placeholder="ссылка на пост"
						 onChange={({currentTarget: {value}}) => setPostLink(value)}/>
			<br/>
			<br/>
			<input type="text" value={commentText} placeholder="комментарий"
						 onChange={({currentTarget: {value}}) => setCommentText(value)}/>
			<br/><br/>
			<button onClick={createComment}>send comment</button>
			<br/>
			<br/>
			{searchResult && <pre>
        {JSON.stringify(searchResult.items, null, 2)}
      </pre>}
		</div>
	);
}

export default App;
