document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("ticket-form");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault(); // Prevent form default submission

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();

      const ticket = {
        name,
        email,
        bookedAt: new Date().toISOString(),
        ticketId: "CW-" + Math.floor(100000 + Math.random() * 900000)
      };

      // ✅ Store in localStorage before redirect
      localStorage.setItem("ticketData", JSON.stringify(ticket));

      // ✅ Redirect to confirmation page
      window.location.href = "confirm.html";
    });
  }

  // If on confirm.html
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
