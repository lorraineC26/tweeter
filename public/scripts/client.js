/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

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
  let daysAgo = timeago.format(tweetObj["created_at"]);
  const layout = `
      <article>
        <header>
          <img class="avatars" src="${tweetObj.user.avatars}"/>
          ${tweetObj.user.name}
        </header>

        <p>${tweetObj.content.text}</p>

        <footer>
          <div class="timeago">${daysAgo}</div>
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

$(document).ready(function() {
  $('.new-tweet form').on('submit', function(event) {
    event.preventDefault();
    const text = $('form').serialize();

    $.ajax({ url: "/tweets", method: 'POST', data: text })
      .then(console.log(text));
  });
  
  const loadTweets = function() {
    $.get("/tweets", function(data) {
      renderTweets(data);
    });
  };

  loadTweets();
  
});




