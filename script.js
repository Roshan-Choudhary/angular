document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");

  const button = document.getElementById("continueBtn");
  const errorMsg = document.getElementById("errorMsg");

  if (code) {
    button.style.display = "inline-block";
    button.onclick = () => {
      window.location.href = `wos://deeplink?code=${code}`;
    };
  } else {
    errorMsg.textContent = "No authorization code received.";
  }
});

