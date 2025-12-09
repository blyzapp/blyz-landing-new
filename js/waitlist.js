(function () {
  const form = document.getElementById("waitlist-form");
  const status = document.getElementById("waitlist-status");

  // Determine API base URL (localhost for dev, Render for prod)
  const API_BASE =
    window.location.hostname === "localhost"
      ? "http://localhost:5000"
      : "https://blyz-server.onrender.com";

  // Handle form submission
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("waitlist-email").value.trim();

    // Simple email validation
    if (!email || !email.includes("@")) {
      status.textContent = "Please enter a valid email.";
      return;
    }

    status.textContent = "Submitting…";

    try {
      const res = await fetch(`${API_BASE}/api/waitlist/join`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.ok) {
        status.textContent = "You're now on the waitlist! ❄️";
        form.reset();
      } else {
        status.textContent = data.msg || "Something went wrong.";
      }
    } catch (err) {
      status.textContent = "Network error — try again.";
      console.error(err);
    }
  });
})();
