// composer-char-counter.js

$(document).ready(function () {
  // Set character limit
  const charLimit = 140;

  // Register an event handler for the textarea element
  $("#tweet-text").on("input", function () {
    const input = this.value;
    const inputLength = input.length;

    // Find the counter element within the parent container of the textarea
    let counterElement = $(this).closest(".tweet-form").find(".counter");

    // Calculate the number of characters left
    const charsLeft = charLimit - inputLength;

    // Update the text content of the counter element
    counterElement.text(charsLeft);

    if (charsLeft < 0) {
      counterElement.addClass("exceeded");
    } else {
      counterElement.removeClass("exceeded");
    }
  });
});
