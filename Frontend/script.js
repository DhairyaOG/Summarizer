const textArea = document.getElementById("text_to_summarize");
const submitButton = document.getElementById("submit-button");
const summarizedTextArea = document.getElementById("summary");

textArea.addEventListener("input", verifyTextLength);
submitButton.addEventListener("click", submitData);
submitButton.disabled = true;

function verifyTextLength(e) {
  const textarea = e.target;
  const length = textarea.value.length;
  submitButton.disabled = !(length > 200 && length < 100000);
}

function submitData(e) {
  submitButton.classList.add("submit-button--loading");
  const text_to_summarize = textArea.value;

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ text_to_summarize }),
  };

  fetch('https://summarizer-6sxr.onrender.com/summarize', requestOptions)
    .then(response => response.text())
    .then(summary => {
      summarizedTextArea.value = summary;
      submitButton.classList.remove("submit-button--loading");
    })
    .catch(error => {
      console.error("Error summarizing text:", error);
      summarizedTextArea.value = "An error occurred. Please try again.";
      submitButton.classList.remove("submit-button--loading");
    });
}
