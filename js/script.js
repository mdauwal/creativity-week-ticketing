
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("ticket-form");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();

      if (!name || !email || !email.includes("@")) {
        alert("Please enter a valid name and email address.");
        return;
      }

      const ticket = {
        name,
        email,
        bookedAt: new Date().toISOString(),
        ticketId: "CW-" + Math.floor(100000 + Math.random() * 900000)
      };

      localStorage.setItem("ticketData", JSON.stringify(ticket));
      window.location.href = "confirm.html";
    });
  }

  if (window.location.pathname.includes("confirm.html")) {
    const ticketData = JSON.parse(localStorage.getItem("ticketData"));
    const confirmSection = document.getElementById("confirmation");

    if (ticketData && confirmSection) {
      confirmSection.innerHTML = `
        <div class="ticket-card">
          <h2>🎉 Hello, ${ticketData.name}!</h2>
          <p>Your ticket has been confirmed for <strong>Creativity Week 2025</strong>.</p>
          <p class="ticket-id">Ticket ID: ${ticketData.ticketId}</p>
          <p><strong>Email:</strong> ${ticketData.email}</p>
          <p><strong>Date:</strong> ${new Date(ticketData.bookedAt).toLocaleString()}</p>
          <button onclick="window.print()" class="btn">🖨️ Download Ticket</button>
          <br/><br/>
          <a href="index.html" class="btn">← Back to Home</a>
        </div>
      `;
    }
  }
});
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();

  if (!name || !email || !email.includes("@")) {
    alert("Please enter a valid name and email address.");
    return;
  }

  const ticketId = "CW-" + Math.floor(100000 + Math.random() * 900000);
  const bookedAt = new Date().toISOString();

  const ticket = {
    name,
    email,
    bookedAt,
    ticketId
  };

  localStorage.setItem("ticketData", JSON.stringify(ticket));

  // Send email via EmailJS
  emailjs.send("", "Your templte id umar", {
    name: name,
    email: email,
    ticket_id: ticketId,
    date: new Date(bookedAt).toLocaleString()
  }).then(() => {
    // On success
    window.location.href = "confirm.html";
  }).catch((error) => {
    console.error("Email send error:", error);
    alert("Ticket booked, but email could not be sent. Please check your internet connection.");
    window.location.href = "confirm.html";
  });
});

