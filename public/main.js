const fetchPets = async () => {
    const url = 'http://localhost:5000/rest-api-fa7be/us-central1/api/pets'
     await fetch(url).then(response => {
         console.log(response)
         return response
     })
}

window.onload = () => {
    fetchPets()
    console.log('first load')
}
