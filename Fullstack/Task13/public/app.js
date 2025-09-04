const notesDiv = document.getElementById('notes');
const form = document.getElementById('new-note-form');
const titleInput = document.getElementById('title');
const bodyInput = document.getElementById('body');
const pinnedInput = document.getElementById('pinned');

async function fetchJSON(url, options) {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error((await res.json()).error || 'Request failed');
  return res.json();
}

async function loadNotes() {
  const notes = await fetchJSON('/api/notes');
  render(notes);
}

function render(notes) {
  notesDiv.innerHTML = '';
  notes.forEach(n => {
    const card = document.createElement('div');
    card.className = 'note';

    const header = document.createElement('div');
    header.className = 'title';
    header.textContent = n.title;
    if (n.pinned) {
      const b = document.createElement('span');
      b.className = 'pin-badge';
      b.textContent = 'PINNED';
      header.appendChild(b);
    }

    const body = document.createElement('div');
    body.textContent = n.body || '';

    const meta = document.createElement('div');
    meta.className = 'meta';
    meta.textContent = `Updated: ${new Date(n.updatedAt).toLocaleString()}`;

    const actions = document.createElement('div');
    actions.className = 'actions';

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.onclick = async () => {
      const newTitle = prompt('New title:', n.title);
      if (newTitle === null) return;
      const newBody = prompt('New body:', n.body || '');
      if (newBody === null) return;
      const newPinned = confirm('Pin this note? (OK = Yes / Cancel = No)');
      await fetchJSON(`/api/notes/${n._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle, body: newBody, pinned: newPinned }),
      });
      loadNotes();
    };

    const togglePinBtn = document.createElement('button');
    togglePinBtn.textContent = n.pinned ? 'Unpin' : 'Pin';
    togglePinBtn.onclick = async () => {
      await fetchJSON(`/api/notes/${n._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pinned: !n.pinned }),
      });
      loadNotes();
    };

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.className = 'danger';
    delBtn.onclick = async () => {
      if (!confirm('Delete this note?')) return;
      await fetchJSON(`/api/notes/${n._id}`, { method: 'DELETE' });
      loadNotes();
    };

    actions.append(editBtn, togglePinBtn, delBtn);
    card.append(header, body, meta, actions);
    notesDiv.appendChild(card);
  });
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const payload = {
    title: titleInput.value.trim(),
    body: bodyInput.value.trim(),
    pinned: pinnedInput.checked,
  };
  if (!payload.title) return alert('Title is required');

  await fetchJSON('/api/notes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  titleInput.value = '';
  bodyInput.value = '';
  pinnedInput.checked = false;
  loadNotes();
});

loadNotes();
