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
    // get the exact input values from users
    let inputText = $(this).children('textarea').val();
    
    if (! inputText) {
      return alert("Oops! It's empty. Empty tweets cannot be posted :(");
    }
    if (inputText.length > 140) {
      return alert("Oops! Your tweet is too long. Tweets go beyond 140 characters cannot be posted :(");
    }

    // turns input form data into a query string so can be well recevied by the server
    const text = $('form').serialize();
    $.ajax({ url: "/tweets", method: 'POST', data: text });
  });
  
  const loadTweets = function() {
    $.get("/tweets", function(data) {
      renderTweets(data);
    });
  };
  loadTweets();
  
});




