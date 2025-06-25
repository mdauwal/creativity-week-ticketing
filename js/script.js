document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("ticket-form");

  // On the booking page
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const ticketCount = parseInt(document.getElementById("ticket-count").value.trim(), 10);

      if (!name || !email || isNaN(ticketCount) || ticketCount <= 0) {
        alert("Please enter valid information and at least one ticket.");
        return;
      }

      const tickets = Array.from({ length: ticketCount }, (_, index) => ({
        name,
        email,
        bookedAt: new Date().toISOString(),
        ticketId: `CW-${Math.floor(100000 + Math.random() * 900000)}-${index + 1}`
      }));

      localStorage.setItem("ticketData", JSON.stringify(tickets));

      // Optional: Send to backend
      fetch("http://localhost:3000/send-ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tickets })
      }).catch(() => {
        console.warn("Ticket data could not be sent to server.");
      });

      window.location.href = "confirm.html";
    });
  }

  // On the confirmation page
  if (window.location.pathname.includes("confirm.html")) {
    const ticketData = JSON.parse(localStorage.getItem("ticketData"));
    const confirmSection = document.getElementById("confirmation");

    if (ticketData && confirmSection) {
      confirmSection.innerHTML = ticketData.map(ticket => `
        <div class="ticket-card" style="margin-bottom:2rem; border:1px solid #ddd; border-radius:12px; padding:1.2rem; box-shadow:0 4px 12px rgba(0,0,0,0.05); background:#fff;">
          <h2>🎉 Hello, ${ticket.name}!</h2>
          <p>Your ticket is confirmed for <strong>Creativity Week 2025</strong>.</p>
          <p><strong>Ticket ID:</strong> <span class="ticket-id">${ticket.ticketId}</span></p>
          <p><strong>Email:</strong> ${ticket.email}</p>
          <p><strong>Booked At:</strong> ${new Date(ticket.bookedAt).toLocaleString()}</p>
          <button onclick="printTicket(this.parentElement)" class="btn" style="margin-top:1rem;">🖨️ Print Ticket</button>
        </div>
      `).join('') + '<a href="index.html" class="btn">← Back to Home</a>';
    }
  }
});

function printAllTickets() {
  const ticketsHTML = document.getElementById("confirmation").innerHTML;
  const printWindow = window.open('', '_blank');
  printWindow.document.write(`
    <html>
      <head>
        <title>Print Tickets</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 2rem; }
          .ticket-card {
            margin-bottom: 2rem;
            border: 1px solid #ccc;
            padding: 1rem;
            border-radius: 10px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          }
        </style>
      </head>
      <body>${ticketsHTML}</body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
}


// Helper function to print only one ticket card
function printTicket(ticketElement) {
  const originalBody = document.body.innerHTML;
  document.body.innerHTML = ticketElement.outerHTML;
  window.print();
  document.body.innerHTML = originalBody;
  location.reload();
}
