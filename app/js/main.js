let pageCount = 1
let url = `http://api.discogs.com/users/hoshiki/collection/folders/0/releases?callback=&sort=artist&sort_order=asc&page=${pageCount}&per_page=50&key=wEVIKAPCOpkDUPHhSxXW&secret=WsURxnkSnnaTzftclOyydBDvSezuUFXD`
let req = new Request(url);
let fired = false

const $loadMore = document.querySelector('.load-more')

$loadMore.addEventListener('click', () => {
    pageCount++
    url = `http://api.discogs.com/users/hoshiki/collection/folders/0/releases?callback=&sort=artist&sort_order=asc&page=${pageCount}&per_page=50&key=wEVIKAPCOpkDUPHhSxXW&secret=WsURxnkSnnaTzftclOyydBDvSezuUFXD`
    req = new Request(url);
    sendRequest();
})

const sendRequest = () => {
    fetch(req)
        .then(handleResponse)
        .then(function (data) {
            data.releases.forEach(item => {
                // console.log(item.basic_information)
                const releaseURL = item.basic_information.resource_url
                const trimmedURL = releaseURL.substring(releaseURL.lastIndexOf("/") + 1)
                const artistName = item.basic_information.artists[0].name
                const format = item.basic_information.formats[0].name
                const year = item.basic_information.year

                // const $img = createElement('img', 'album-image', {'src': item.basic_information.cover_image})
                const $img = createElement('div', 'album-image')
                const $imgContainer = createElement('div', 'image-container')
                const $infoBox = createElement('div', 'info-box')
                const $infoBoxWrap = createElement('div', 'info-box-wrapper')
                const $artist = document.createElement('h3')
                const $title = document.createElement('h5')
                const $format = document.createElement('p')
                const $releaseLink = createElement('a', 'release-link', {'href': `https://www.discogs.com/release/${trimmedURL}`, 'target': '_blank'})

                $img.style.backgroundImage = "url('" + item.basic_information.cover_image + "')"

                $artist.innerHTML = artistName
                $title.innerHTML = item.basic_information.title
                $format.innerHTML = year + ' / ' + format

                appendMany($infoBox, [$artist, $title, $format])
                appendMany($imgContainer, [$img, $infoBoxWrap])
                $infoBoxWrap.appendChild($infoBox)
                $releaseLink.appendChild($infoBoxWrap)
                $imgContainer.appendChild($releaseLink)
                document.querySelector('.wrapper').appendChild($imgContainer)
            })
        })
        .catch(function handleError(error) {
            console.log(error)
        })
}

const handleResponse = (response) => {
    if (response.ok) return response.json();
    throw new Error(response.message);
}

const createElement = (el, className, attr) => {
    const $element = document.createElement(el)
    $element.className = className
    for (let key in attr) {
        $element.setAttribute(key, attr[key])
    }
    return $element
}

const appendMany = (el, target) => {
    return target.forEach(els => {
        el.appendChild(els)
    })
}

sendRequest()