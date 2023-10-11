/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

const renderTweets = function(tweetsArr) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  for (const tweetObj of tweetsArr) {
    const $tweet = createTweetElement(tweetObj);
    $('.all-tweets').append($tweet);
  }
};

const createTweetElement = function(tweetObj) {
  let layout = `
    <article>
      <header>
        <img class="avatars" src="${tweetObj.user.avatars}"/>
        ${tweetObj.user.name}
      </header>

      <p>${tweetObj.content.text}</p>

      <footer>
        ${tweetObj["created_at"]} days ago
        <div>
          <i class="fa-solid fa-flag" ></i>
          <i class="fa-solid fa-retweet" ></i>
          <i class="fa-solid fa-heart" ></i>
        </div>
      </footer>
    </article>
  `;

  return layout;
};