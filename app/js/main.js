fetch('http://api.discogs.com/users/hoshiki/collection/folders/0/releases?callback=&sort=added&sort_order=desc&per_page=100&key=wEVIKAPCOpkDUPHhSxXW&secret=WsURxnkSnnaTzftclOyydBDvSezuUFXD')
    .then(handleResponse)
    .then(function (data) {
        data.releases.forEach(item => {
            console.log(item.basic_information.cover_image)
        })
    })
    .catch(function handleError(error) {
        console.log(error)
    })

function handleResponse(response) {
    if (response.ok) return response.json();
    throw new Error(response.message);
}