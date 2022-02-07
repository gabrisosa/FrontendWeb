var page = 1

const fetchData = (page) => {
    const url = "https://rickandmortyapi.com/api/character/?name=rick&page=" + page;

    fetch(url)
    .then(response => response.json())
    .then(data => fillData(data))
}

const fillData = (data) => {
    var html = "";
    data.results.forEach(ch => {
        console.log(page)
        html += '<div>' + ch.name + '</div>'
        document.getElementById("listado").innerHTML = html;
    })

}

const findPrev = () => {
    if (page > 1) {
        page -= 1;
    }
    fetchData(page)
}

const findNext = () => {
    page += 1;
    fetchData(page)
}

fetchData();