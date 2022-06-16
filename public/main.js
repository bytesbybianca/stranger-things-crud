// buttons for play
const monsterAttacksHuman = document.querySelector('#monster-attacks-human')
const killMonster = document.querySelector('#kill-monster')

// error message
const messageDiv = document.querySelector('#message')

// selecting species
const selectHuman = document.querySelector('#radioHuman')
const selectMonster = document.querySelector('#radioMonster')
const updatePlace = document.querySelector('#place')

selectHuman.addEventListener('click', _ => {
    updatePlace.value = 'hawkins'
})

selectMonster.addEventListener('click', _ => {
    updatePlace.value = 'upside down'
})

killMonster.addEventListener('click', _ => {
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

monsterAttacksHuman.addEventListener('click', _ => {
    fetch('/people', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status: 'vulnerable'
      })
    })
    .then(res => {
        if (res.ok) return res.json()
      })
    .then(response => {
        window.location.reload(true) // refreshing the browser but change later to update the DOM
    })
  })