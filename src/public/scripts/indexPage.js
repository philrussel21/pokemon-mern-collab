const teamCont = document.querySelector('#teamCont')
const pokeCont = document.querySelector('#pokeCont')
const getPoke = document.querySelector('#getPoke')

getPoke.addEventListener('click', getPokemon)

function getPokemon() {
  for (let i = 0; i < 6; i++) {
    const randNum = Math.floor(Math.random() * 808)
    axios.get(`https://pokeapi.co/api/v2/pokemon/${randNum}`)
      .then(res => {
        const { name, id, sprites: { front_default: img } } = res.data

        const div = document.createElement('div')
        const h3 = document.createElement('h3')
        const p = document.createElement('p')
        const imgUrl = document.createElement('img')
        const addBtn = document.createElement('button')

        h3.textContent = name
        p.textContent = id
        imgUrl.src = img
        addBtn.textContent = "Add Pokemon to Team"

        addBtn.addEventListener('click', addPokemon)

        div.append(h3, p, imgUrl, addBtn)
        pokeCont.append(div)
      })
      .catch(err => {
        console.log(err)
      })

  }
}

function addPokemon(e) {
  const pokeDiv = e.target.parentNode
  const h3 = pokeDiv.querySelector('h3')
  const p = pokeDiv.querySelector('p')
  const img = pokeDiv.querySelector('img')

  const name = h3.textContent
  const pokeId = p.textContent
  const pokeImg = img.src

  // sends the chosen pokemon data to add to the database
  axios.post('/pokemons', {
    name, pokeId, pokeImg
  })
    .then(res => {
      console.log(res)

      // redirects to given route after successfully adding the new pokemon in the database
      // window.location = '/pokemons/'
      window.location = res.data.redirectUrl
    })
    .catch(err => {
      console.log(err)
    })

  // removes the pokemon div from the pokeCont then adds to teamCont
  pokeCont.remove(pokeDiv)
  teamCont.append(pokeDiv)
}