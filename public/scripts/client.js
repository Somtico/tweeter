// client.js

$(document).ready(function () {
  //////////////////////////////////
  // Function that returns tweet <article>
  //////////////////////////////////
  const createTweetElement = function (tweetData) {
    const formattedTimeAgo = timeago.format(tweetData.created_at);
    const tweetHTML = `
      <article class="tweet" data-id="${tweetData.id}">
        <header>
          <span class="tweet-avatar">
            <img src="${tweetData.user.avatars}" alt="User avatar" />
            <p>${tweetData.user.name}</p>
          </span>
          <p class="handle">${tweetData.user.handle}</p>
        </header>
        <p class="content">${tweetData.content.text}</p>
        <footer>
          <time class="timeago">${formattedTimeAgo}</time>
          <div class="icons">
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-repeat"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
        </footer>
      </article>
    `;
    return $(tweetHTML);
  };

  //////////////////////////////////
  // Function that displays the tweets
  //////////////////////////////////
  const renderTweets = function (tweets) {
    $(".all-tweets").empty(); // Clear existing tweets

    // If there are no tweets
    if (tweets.length === 0) {
      $(".all-tweets").append("<p>No tweets to display.</p>");
      return;
    }

    // If there are tweets
    tweets.forEach(function (tweetData) {
      const $tweet = createTweetElement(tweetData);
      $(".all-tweets").prepend($tweet);
    });
  };

  //////////////////////////////////
  // Attach an event listener to the form for posting new tweets
  //////////////////////////////////
  $("#tweet-form").on("submit", function (event) {
    // Prevent the default form submission behaviour
    event.preventDefault();

    // Serialize the form data
    let $str = $(this).serialize();

    // Validate tweet content
    const tweetContent = $(this).find("textarea").val().trim(); // Remove leading and trailing white spaces

    // If tweet form is empty
    if (!tweetContent) {
      alert("Tweet cannot be empty!");
      return;
    }

    // Make an AJAX POST request to submit the serialized form data to the server
    $.ajax({
      url: "/tweets",
      method: "POST",
      data: $str,
      success: function () {
        loadTweets(); // Reload tweets after posting
        $("#tweet-form")[0].reset(); // Clear the form
        $(".counter").text(140); // Reset the character counter
      },
      error: function (error) {
        alert("Error posting tweet:", error);
      },
    });
  });

  //////////////////////////////////
  // Function to load tweets from the server
  //////////////////////////////////
  const loadTweets = function () {
    $.ajax({
      url: "http://localhost:8080/tweets",
      method: "GET",
      success: function (data) {
        renderTweets(data);
      },
      error: function (error) {
        alert("Error loading tweets:", error);
      },
    });
  };

  // Initial load of tweets
  loadTweets();
});
