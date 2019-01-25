fetch('https://api.discogs.com/users/hoshiki/collection/folders')
    .then(handleResponse)
    .then(function (data) {
        console.log(data)
    })
    .catch(function handleError(error) {
        console.log(error)
    })

function handleResponse(response) {
    if (response.ok) return response.json();
    throw new Error(response.message);
}