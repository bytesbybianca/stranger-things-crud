// main.js
const update = document.querySelector('#update-button')
const deleteButton = document.querySelector('#delete-button')
const messageDiv = document.querySelector('#message')

deleteButton.addEventListener('click', _ => {
  fetch('/people', {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      species: 'Monster'
    })
  })
    .then(res => {
      if (res.ok) return res.json()
    })
    .then(response => {
        if (response === 'No more monsters') {
          messageDiv.textContent = 'No more monsters'
        } else {
          window.location.reload(true)
        }
      })
      .catch(error => console.error(error))
})

update.addEventListener('click', _ => {
    fetch('/people', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status: 'Vulnerable'
      })
    })
    .then(res => {
        if (res.ok) return res.json()
      })
    .then(response => {
        window.location.reload(true) // refreshing the browser but change later to update the DOM
    })
  })