document.querySelector('.busca').addEventListener('submit', async (event) =>{
    event.preventDefault();

    let input = document.querySelector('#searchInput').value;

    if (input !== '') {
        showWarning('Carregando........');

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=735c02d45fd058e38384dd57f0119ac8&units=metric&lang=pt_br`

        let resultado = await fetch(url);
        let jason = await resultado.json();

        if (jason.cod === 200) {
            showInfo({
                name: jason.name,
                country: jason.sys.country,
                temp: jason.main.temp,
                tempIcon: jason.weather[0].icon,
                windSpeed: jason.wind.speed,
                windDeg: jason.wind.deg
            })
        }
        else{   
            document.querySelector('.resultado').style.display = 'none';
            showWarning('Cidade nao encontrada');
        }
    }
});

function showInfo(jason){
     showWarning('');

     document.querySelector('.resultado').style.display = 'block';

     document.querySelector('.titulo').innerHTML = `${jason.name}, ${jason.country}`;
     document.querySelector('.tempInfo').innerHTML = `${jason.temp} <sup>ºC</sup>`;
     document.querySelector('.ventoInfo').innerHTML = `${jason.windSpeed} <span>km/h</span>`;

     document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${jason.tempIcon}@2x.png`);

     document.querySelector('.ventoPonto').style.transform = `rotate(${jason.windDeg-90}deg)`;
}

function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg;
}