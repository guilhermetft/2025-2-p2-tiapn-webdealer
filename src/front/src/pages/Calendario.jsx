import React, { useEffect, useMemo, useState } from "react";
import '../assets/css/Calendario.css';

function formatKey(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(
    2,
    "0"
  )}`;
}

function Modal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div className="cal-modal-backdrop" onMouseDown={onClose}>
      <div className="cal-modal" onMouseDown={(e) => e.stopPropagation()}>
        <button className="cal-modal-close" onClick={onClose} aria-label="Fechar">
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}

const API_BASE = "http://localhost:5000/api";

export default function Calendario(props) {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const [selectedDay, setSelectedDay] = useState(null);
  const [rangeStart, setRangeStart] = useState(null);

  const [events, setEvents] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [modalDate, setModalDate] = useState(null);

  async function fetchEventsForMonth(year, monthIndex) {
    const url = `${API_BASE}/eventos?month=${monthIndex + 1}&year=${year}`;

    try {
      const res = await fetch(url);

      if (!res.ok) {
        const txt = await res.text();
        console.error("Falha ao buscar eventos:", res.status, txt);
        return {};
      }

      const eventos = await res.json();

      const map = {};
      (eventos || []).forEach((ev) => {
        const key = ev.data_evento;
        if (!map[key]) map[key] = [];
        map[key].push({
          id: String(ev.id_evento),
          title: ev.nome_evento,
          time: ev.hora_evento,
          desc: ev.descricao_evento,
        });
      });

      return map;
    } catch (err) {
      console.error("Erro ao buscar eventos:", err);
      return {};
    }
  }

  useEffect(() => {
    let mounted = true;
    async function loadMonth() {
      const y = currentDate.getFullYear();
      const m = currentDate.getMonth();
      const fetched = await fetchEventsForMonth(y, m);
      if (!mounted) return;

      setEvents((prev) => {
        const copy = { ...prev };
        const prefix = `${y}-${String(m + 1).padStart(2, "0")}-`;
        Object.keys(copy).forEach((k) => {
          if (k.startsWith(prefix)) delete copy[k];
        });
        Object.keys(fetched).forEach((k) => {
          copy[k] = fetched[k];
        });
        return copy;
      });
    }

    loadMonth();
    return () => {
      mounted = false;
    };
  }, [currentDate]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = currentDate.toLocaleString("pt-BR", { month: "long" });

  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendarGrid = useMemo(() => {
    const arr = [];
    let row = [];
    for (let i = 0; i < firstWeekday; i++) row.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
      row.push(d);
      if (row.length === 7) {
        arr.push(row);
        row = [];
      }
    }
    if (row.length > 0) {
      while (row.length < 7) row.push(null);
      arr.push(row);
    }
    return arr;
  }, [firstWeekday, daysInMonth]);

  const [animKey, setAnimKey] = useState(0);
  useEffect(() => {
    setAnimKey((k) => k + 1);
  }, [month, year]);

  const gotoPrev = () => {
    setRangeStart(null);
    setSelectedDay(null);
    setCurrentDate(new Date(year, month - 1, 1));
  };
  const gotoNext = () => {
    setRangeStart(null);
    setSelectedDay(null);
    setCurrentDate(new Date(year, month + 1, 1));
  };

  function onDayClick(day, e) {
    if (!day) return;
    const dayNum = day;
    if (e && e.shiftKey && rangeStart) {
      const start = Math.min(rangeStart, dayNum);
      const end = Math.max(rangeStart, dayNum);
      setSelectedDay({ range: [start, end] });
    } else {
      setRangeStart(dayNum);
      setSelectedDay(dayNum);
    }
  }

  function openNewEvent(day) {
    if (!day) return;
    const key = formatKey(year, month, day);
    setModalDate(key);
    setEditingEvent(null);
    setModalOpen(true);
  }

  function openEditEvent(key, evt) {
    setModalDate(key);
    setEditingEvent({ ...evt, date: key });
    setModalOpen(true);
  }

  async function saveEvent(key, evt) {
    try {
      const eventDate = evt.date || key;

      const payload = {
        nome_evento: evt.title,
        data_evento: eventDate,
        hora_evento: evt.time,
        descricao_evento: evt.desc || "",
      };

      let res;

      if (evt.id) {
        res = await fetch(`${API_BASE}/eventos/${evt.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(`${API_BASE}/eventos`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
      }

      const text = await res.text();
      let body;
      try {
        body = text ? JSON.parse(text) : null;
      } catch {
        body = text;
      }

      if (!res.ok) {
        console.error("saveEvent falhou:", res.status, body);
        alert(`Erro ao salvar evento (status ${res.status}). Veja o console.`);
        return;
      }

      const [yStr, mStr] = eventDate.split("-");
      const yearNum = Number(yStr);
      const monthIndex = Number(mStr) - 1;

      const fetched = await fetchEventsForMonth(yearNum, monthIndex);

      setEvents((prev) => {
        const copy = { ...prev };
        const prefix = `${yearNum}-${String(monthIndex + 1).padStart(2, "0")}-`;

        Object.keys(copy).forEach((k) => {
          if (k.startsWith(prefix)) delete copy[k];
        });

        Object.keys(fetched).forEach((k) => {
          copy[k] = fetched[k];
        });

        return copy;
      });
    } catch (err) {
      console.error("saveEvent error:", err);
      alert("Erro inesperado ao salvar evento — veja o console para detalhes.");
    } finally {
      setModalOpen(false);
    }
  }

  async function deleteEvent(key, id, confirmBefore = true) {
    if (confirmBefore) {
      const ok = confirm("Remover evento?");
      if (!ok) return;
    }

    try {
      const res = await fetch(`${API_BASE}/eventos/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const txt = await res.text();
        console.error("Erro ao remover evento:", res.status, txt);
        return;
      }
      setEvents((prev) => {
        const copy = { ...prev };
        if (!copy[key]) return prev;
        copy[key] = copy[key].filter((x) => String(x.id) !== String(id));
        if (copy[key].length === 0) delete copy[key];
        return copy;
      });
    } catch (err) {
      console.error("deleteEvent error:", err);
    }
  }

  function eventsForDay(day) {
    if (!day) return [];
    const k = formatKey(year, month, day);
    return events[k] || [];
  }

  function isSelected(day) {
    if (!day) return false;
    if (typeof selectedDay === "number") return selectedDay === day;
    if (selectedDay && selectedDay.range) {
      const [s, e] = selectedDay.range;
      return day >= s && day <= e;
    }
    return false;
  }

  const miniEvents = useMemo(() => {
    const prefix = `${year}-${String(month + 1).padStart(2, "0")}-`;
    const arr = [];
    Object.keys(events).forEach((k) => {
      if (k.startsWith(prefix)) {
        const day = Number(k.split("-")[2]);
        events[k].forEach((ev) => {
          arr.push({ ...ev, key: k, day });
        });
      }
    });
    arr.sort((a, b) => {
      if (a.day !== b.day) return a.day - b.day;
      const ta = a.time || "";
      const tb = b.time || "";
      return ta.localeCompare(tb);
    });
    return arr;
  }, [events, year, month]);

  return (
    <div className="cal-wrapper">
      <div className="cal-header">
        <div>
          <h1>Calendário</h1>
          <p>Gerencie agenda e eventos da sua equipe</p>
        </div>

        <div className="cal-header-actions">
          <button
            className="cal-small"
            onClick={() => {
              setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1));
              setSelectedDay(null);
              setRangeStart(null);
            }}
          >
            Hoje
          </button>
        </div>
      </div>

      <div className="cal-content">
        <div className="cal-box cal-box-expanded">
          <div className="cal-top">
            <div className="cal-top-left">
              <button className="cal-arrow-big" onClick={gotoPrev} aria-label="Mês anterior">
                ◀
              </button>
              <div className="cal-title">
                <strong className="cal-month">{monthName}</strong>
                <span className="cal-year">{year}</span>
              </div>
              <button className="cal-arrow-big" onClick={gotoNext} aria-label="Próximo mês">
                ▶
              </button>
            </div>

            <div className="cal-nav">
              <button
                className="cal-small"
                onClick={() => {
                  setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1));
                  setSelectedDay(null);
                  setRangeStart(null);
                }}
              >
                Ir para hoje
              </button>
            </div>
          </div>

          <div className={`cal-grid anim-${animKey}`}>
            <div className="cal-weekdays">
              {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((w) => (
                <div key={w} className="cal-weekday">{w}</div>
              ))}
            </div>

            <div className="cal-days">
              {calendarGrid.map((week, wi) => (
                <div key={wi} className="cal-week-row">
                  {week.map((day, di) => {
                    const k = day ? formatKey(year, month, day) : null;
                    const hasEvents = day && events[k] && events[k].length > 0;
                    const cls = [
                      "cal-day",
                      (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) ? "cal-today" : "",
                      isSelected(day) ? "cal-selected" : "",
                    ].join(" ").trim();

                    return (
                      <div key={di} className="cal-day-wrap">
                        <div
                          tabIndex={day ? 0 : -1}
                          role={day ? "button" : "presentation"}
                          onClick={(e) => onDayClick(day, e)}
                          onDoubleClick={() => openNewEvent(day)}
                          onContextMenu={(e) => { e.preventDefault(); openNewEvent(day); }}
                          className={cls}
                          aria-label={day ? `Dia ${day}` : ""}
                          title={day ? `${day}` : ""}
                        >
                          <span className="cal-day-num">{day || ""}</span>
                          {hasEvents && <span className="cal-dot" aria-hidden />}
                        </div>

                        {day && (
                          <button
                            className="cal-new-small"
                            onClick={(e) => { e.stopPropagation(); openNewEvent(day); }}
                            aria-label="Novo evento"
                            title="Criar evento"
                          >
                            +
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          <div className="cal-events-list">
            <h3>Eventos</h3>

            {(() => {
              if (selectedDay && selectedDay.range) {
                const [s, e] = selectedDay.range;
                const list = [];
                for (let d = s; d <= e; d++) {
                  const key = formatKey(year, month, d);
                  if (events[key]) {
                    events[key].forEach(ev => list.push({ ...ev, day: d, key }));
                  }
                }
                if (list.length === 0) return <p className="cal-muted">Nenhum evento nesse intervalo.</p>;
                return list.map(ev => (
                  <div key={ev.id} className="cal-event-row">
                    <div className="cal-event-left">
                      <span className="cal-event-bullet" />
                      <div>
                        <div className="cal-event-title">{ev.title}</div>
                        <div className="cal-event-meta">{ev.time || ""} • {ev.day}/{month + 1}/{year}</div>
                        {ev.desc && <div className="cal-event-desc">{ev.desc}</div>}
                      </div>
                    </div>
                    <div className="cal-event-actions">
                      <button onClick={() => openEditEvent(ev.key, ev)}>Editar</button>
                      <button onClick={() => deleteEvent(ev.key, ev.id)}>Remover</button>
                    </div>
                  </div>
                ));
              }

              // single day
              if (typeof selectedDay === "number") {
                const list = eventsForDay(selectedDay);
                if (list.length === 0) return <p className="cal-muted">Selecione um dia ou crie um novo evento (duplo clique no dia).</p>;
                return list.map(ev => (
                  <div key={ev.id} className="cal-event-row">
                    <div className="cal-event-left">
                      <span className="cal-event-bullet" />
                      <div>
                        <div className="cal-event-title">{ev.title}</div>
                        <div className="cal-event-meta">{ev.time || ""}</div>
                        {ev.desc && <div className="cal-event-desc">{ev.desc}</div>}
                      </div>
                    </div>
                    <div className="cal-event-actions">
                      <button onClick={() => openEditEvent(formatKey(year, month, selectedDay), ev)}>Editar</button>
                      <button onClick={() => deleteEvent(formatKey(year, month, selectedDay), ev.id)}>Remover</button>
                    </div>
                  </div>
                ));
              }

              const all = [];
              Object.keys(events).forEach(k => {
                if (k.startsWith(`${year}-${String(month + 1).padStart(2, "0")}-`)) {
                  events[k].forEach(ev => all.push({ ...ev, key: k }));
                }
              });
              if (all.length === 0) return <p className="cal-muted">Nenhum evento no mês. Duplo clique em um dia para adicionar.</p>;
              all.sort((a, b) => a.key.localeCompare(b.key));
              return all.map(ev => {
                const day = Number(ev.key.split("-")[2]);
                return (
                  <div key={ev.id} className="cal-event-row">
                    <div className="cal-event-left">
                      <span className="cal-event-bullet" />
                      <div>
                        <div className="cal-event-title">{ev.title} <span className="cal-event-meta-inline">— {day}/{month + 1}</span></div>
                        <div className="cal-event-meta">{ev.time || ""}</div>
                        {ev.desc && <div className="cal-event-desc">{ev.desc}</div>}
                      </div>
                    </div>
                    <div className="cal-event-actions">
                      <button onClick={() => openEditEvent(ev.key, ev)}>Editar</button>
                      <button onClick={() => deleteEvent(ev.key, ev.id)}>Remover</button>
                    </div>
                  </div>
                );
              });
            })()}
          </div>
        </div>

        <aside className="cal-side">
          <button
            className="cal-new-event"
            onClick={() => {
              const key = formatKey(today.getFullYear(), today.getMonth(), today.getDate());
              setModalDate(key);
              setEditingEvent(null);
              setModalOpen(true);
            }}
          >
            + Novo Evento
          </button>

          <div className="cal-events-box">
            <h3>Mini Calendário</h3>

            <div className="cal-mini-table">
              {miniEvents.length === 0 ? (
                <p className="cal-muted">Nenhum evento cadastrado neste mês.</p>
              ) : (
                <table className="mini-table" role="table" aria-label="Eventos do mês">
                  <thead>
                    <tr>
                      <th>Dia</th>
                      <th>Hora</th>
                      <th>Título</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {miniEvents.map((ev) => (
                      <tr
                        key={`${ev.id}-${ev.key}`}
                        className="mini-row"
                        onClick={() => { setSelectedDay(ev.day); setRangeStart(ev.day); }}
                        title={`${ev.title}${ev.desc ? " — " + ev.desc : ""}`}
                      >
                        <td className="mini-td-day">
                          <div className="mini-day-cell">
                            <span className="mini-day-num">{ev.day}</span>
                            <button
                              className="mini-add-btn"
                              onClick={(e) => { e.stopPropagation(); openNewEvent(ev.day); }}
                              aria-label={`Adicionar evento no dia ${ev.day}`}
                              title="Adicionar evento nesse dia"
                            >
                              +
                            </button>
                          </div>
                        </td>

                        <td className="mini-td-time">{ev.time || "-"}</td>

                        <td className="mini-td-title">
                          <div className="mini-title-line">
                            <span className="mini-event-bullet" />
                            <span className="mini-title-text">{ev.title}</span>
                          </div>
                          {ev.desc && <div className="mini-desc">{ev.desc}</div>}
                        </td>

                        <td className="mini-td-actions">
                          <button
                            className="mini-edit-btn"
                            onClick={(e) => { e.stopPropagation(); openEditEvent(ev.key, ev); }}
                            aria-label="Editar"
                            title="Editar"
                          >
                            ✎
                          </button>

                          <button
                            className="mini-delete-btn"
                            onClick={(e) => { e.stopPropagation(); deleteEvent(ev.key, ev.id); }}
                            aria-label="Excluir"
                            title="Excluir"
                          >
                            🗑
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            <div style={{ height: 10 }} />
          </div>

          <div className="cal-events-box">
            <h3>Atalhos</h3>
            <ul className="cal-shortcuts">
              <li>Shift+Click: selecionar intervalo</li>
              <li>Double click: novo evento</li>
              <li>Right click: novo evento</li>
            </ul>
          </div>
        </aside>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <EventForm
          keyForDate={modalDate}
          editing={editingEvent}
          onCancel={() => setModalOpen(false)}
          onSave={(evt) => saveEvent(modalDate, evt)}
        />
      </Modal>
    </div>
  );
}

function EventForm({ keyForDate, editing, onCancel, onSave }) {
  const [date, setDate] = useState(editing ? editing.date : keyForDate || "");
  const [title, setTitle] = useState(editing ? editing.title : "");
  const [time, setTime] = useState(editing ? editing.time : "");
  const [desc, setDesc] = useState(editing ? editing.desc : "");

  useEffect(() => {
    if (editing) {
      setDate(editing.date || editing.key || "");
      setTitle(editing.title || "");
      setTime(editing.time || "");
      setDesc(editing.desc || "");
    } else {
      setDate(keyForDate || "");
      setTitle("");
      setTime("");
      setDesc("");
    }
  }, [editing, keyForDate]);

  function submit(e) {
    e.preventDefault();

    if (!date) {
      alert("Por favor, selecione uma data.");
      return;
    }

    const evt = {
      id: editing ? editing.id : undefined,
      date,
      title: title || "Sem título",
      time,
      desc,
    };

    onSave(evt);
  }

  return (
    <form onSubmit={submit} className="cal-form">
      <h3>{editing ? "Editar Evento" : "Novo Evento"}</h3>

      <label>
        Data do evento
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </label>

      <label>
        Título
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>

      <label>
        Hora
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
      </label>

      <label>
        Descrição
        <textarea value={desc} onChange={(e) => setDesc(e.target.value)} />
      </label>

      <div className="cal-form-actions">
        <button type="button" onClick={onCancel} className="cal-btn gray">Cancelar</button>
        <button type="submit" className="cal-btn primary">
          {editing ? "Salvar" : "Criar"}
        </button>
      </div>
    </form>
  );
}