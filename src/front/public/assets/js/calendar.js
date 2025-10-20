document.addEventListener("DOMContentLoaded", function () {
  const calendarEl = document.getElementById("calendar");

  // Lê os eventos atualizados do localStorage (vindos do projects.js)
  const events = JSON.parse(localStorage.getItem("calendarEvents")) || [];

  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    editable: false,
    selectable: true,
    events: events,
    eventClick: function (info) {
      alert(
        `📌 ${info.event.title}\n🗓️ Data: ${info.event.startStr}\n\n📝 ${info.event.extendedProps.description}`
      );
    },
  });

  calendar.render();

  window.addEventListener("storage", function (e) {
    if (e.key === "calendarEvents") {
      calendar.removeAllEvents();
      const newEvents = JSON.parse(localStorage.getItem("calendarEvents")) || [];
      calendar.addEventSource(newEvents);
    }
  });
});