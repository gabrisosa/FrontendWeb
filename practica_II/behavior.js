var page = 1

const fetchData = (page) => {
    let input = document.getElementById('searchbar').value;

    const url = "https://rickandmortyapi.com/api/character/?name=" + input + "&page=" + page;

    fetch(url)
    .then(response => response.json())
    .then(data => fillData(data))
}

const fillData = (data) => {
    console.log(data)
    var html = '';
    data.results.forEach(ch => {
        html += '<div class="character">'
            html += '<div class="img_wrapper">'
                html += '<img src="' + ch.image + '" alt="' + ch.name + '">'
            html += '</div>'
            html += '<div class="content_wrapper">'
                html += '<div class="section">'
                    html += '<h2>' + ch.name + '</h2>'
                    html += '<span class="status">'
                        if(ch.status === "Alive"){
                            html += '<span class = "status_alive"></span>' + ch.status + ' - ' + ch.species;
                        }else if(ch.status === "Dead"){
                            html += '<span class = "status_dead"></span>' + ch.status + ' - ' + ch.species;
                        }else if(ch.status === "unknown"){
                            html += '<span class = "status_unknown"></span>' + ch.status + ' - ' + ch.species;
                        }
                    html += '</span>'
                html += '</div>'
                html += '<div class="section">'
                    html += '<span class="text_gray">Last known location:</span>'
                    html += '<h3>' + ch.location.name + '</h3>'
                html += '</div>'
                html += '<div class="section">'
                    html += '<span class="text_gray">First seen in:</span>'
                    html += '<h3>' + ch.origin.name + '</h3>'
                html += '</div>'
            html += '</div>'
        html += '</div>'

        document.getElementById("characters").innerHTML = html;
    })
}

const findPrev = () => {
    if (page > 1) {
        page -= 1;
        fetchData(page)
    }
}

const findNext = () => {
    page += 1;
    fetchData(page)
}

fetchData();