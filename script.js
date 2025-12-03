const emailInput = document.getElementById("emailInput");
const joinButton = document.getElementById("joinWaitlistButton");

async function joinWaitlist() {
  if (!emailInput || !joinButton) return;

  const email = emailInput.value.trim();

  // Basic email validation
  if (!email) {
    alert("Please enter your email.");
    return;
  }
  if (!/\S+@\S+\.\S+/.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  joinButton.disabled = true;
  joinButton.textContent = "Joining…";

  try {
    // Replace this later with your backend
    const res = await fetch("https://blyz-server.onrender.com/api/waitlist/join", {

      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      alert("You're on the waitlist! Thank you.");
      emailInput.value = "";
    } else {
      const text = await res.text();
      alert("Something went wrong: " + text);
    }
  } catch (err) {
    console.error(err);
    alert("Server unavailable. Please try again later.");
  } finally {
    joinButton.disabled = false;
    joinButton.textContent = "Join Waitlist";
  }
}

if (emailInput) {
  emailInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") joinWaitlist();
  });
}
