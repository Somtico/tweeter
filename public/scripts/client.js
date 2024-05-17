// client.js

$(document).ready(function () {
  // Function that returns tweet <article>
  const createTweetElement = function (tweetData) {
    // Create the main article element for tweet
    let $tweet = $("<article>").addClass("tweet");

    //////////////////////////////////
    // Create the header section
    //////////////////////////////////
    const $header = $("<header>");

    // Create the avatar section
    const $span = $("<span>").addClass("tweet-avatar");
    const $avatar = $("<img>").attr("src", tweetData.user.avatars);
    const $name = $("<p>").text(tweetData.user.name);

    // Add avatar and name to the DOM
    $span.append($avatar, $name);

    // Create the handle
    const $handle = $("<p>").addClass("handle").text(tweetData.user.handle);

    // Add span children and handle to the DOM
    $header.append($span, $handle);

    //////////////////////////////////
    // Create the content section
    //////////////////////////////////
    const $content = $("<p>").addClass("content").text(tweetData.content.text);

    //////////////////////////////////
    // Create the footer section
    //////////////////////////////////
    const $footer = $("<footer>");
    // Use timeago.js format function directly to get "time ago" formatted string
    const formattedTimeAgo = timeago.format(tweetData.created_at);

    // Create a <time> element with the 'timeago' class, and set its text to the formatted "time ago" string
    const $timeAgo = $("<time>").addClass("timeago").text(formattedTimeAgo);

    // Create the icon section
    const $icons = $("<div>").addClass("icons");
    const $flagIcon = $("<i>").addClass("fa-solid fa-flag");
    const $repeatIcon = $("<i>").addClass("fa-solid fa-repeat");
    const $heartIcon = $("<i>").addClass("fa-solid fa-heart");

    // Add the icons to the DOM
    $icons.append($flagIcon, $repeatIcon, $heartIcon);

    // Add the time of tweet and icons to the DOM
    $footer.append($timeAgo, $icons);

    // Add the header, content and footer to the DOM
    $tweet.append($header, $content, $footer);

    return $tweet;
  };

  const renderTweets = function (tweets) {
    tweets.forEach(function (tweetData) {
      const $tweet = createTweetElement(tweetData);
      $(".all-tweets").prepend($tweet);
    });
  };

  // Attach an event listener to the form for posting new tweets
  $("#tweet-form").on("submit", function (event) {
    // Prevent the default form submission behaviour
    event.preventDefault();

    // Serialize the form data
    let $str = $(this).serialize();

    // Make an AJAX POST request to submit the serialized form data to the server
    $.ajax({
      url: "/tweets",
      method: "POST",
      data: $str,
      error: function (error) {
        console.log("Error posting tweet:", error);
      },
    });
  });

  // Function to load tweets from the server
  const loadTweets = function () {
    $.ajax({
      url: "http://localhost:8080/tweets",
      method: "GET",
      success: function (data) {
        renderTweets(data);
      },
      error: function (error) {
        console.log("Error loading tweets:", error);
      },
    });
  };

  // Initial load of tweets
  loadTweets();
});
