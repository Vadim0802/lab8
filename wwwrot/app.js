document.querySelector('.form-control').addEventListener('submit', async (ev) => {
  ev.preventDefault();
  const formData = new FormData(ev.target);
  const res = await fetch('http://localhost:8000/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: formData.get('name') }),
  }).then((r) => r.json());
  const html = `<ul>${res.list.map(({ name }) => `<li>${name}</li>`).join('')}</ul>`;
  document.querySelector('.card').innerHTML = html;
});