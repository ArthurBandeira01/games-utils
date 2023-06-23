
function turno(){
    var data = new Date();
    var dia     = data.getDate();           // 1-31
    var dia_sem = data.getDay();            // 0-6 (zero=domingo)
    var mes     = data.getMonth();          // 0-11 (zero=janeiro)
    var ano2    = data.getYear();           // 2 dígitos
    var ano4    = data.getFullYear();       // 4 dígitos
    var hora    = data.getHours();          // 0-23
    var min     = data.getMinutes();        // 0-59
    var seg     = data.getSeconds();        // 0-59
    var mseg    = data.getMilliseconds();   // 0-999
    var tz      = data.getTimezoneOffset(); // em minutos

    // Formata a data e a hora (mês + 1)
    let str_data = dia + '/' + (mes+1) + '/' + ano4;
    let str_hora = hora + ':' + min + ':' + seg;
    if(hora >= 6 && hora <= 12){
        document.getElementsByTagName('body')[0].style.background = "#0288d1";
        document.getElementById("titulo").innerHTML += "<h2 class=\"title-tempo\">Bom dia!</h2>";
        document.getElementById("data-tempo").innerHTML += "<span class=\"desc-tempo\">" + str_data + "</span>";
        document.getElementById("horario").innerHTML += "<span class=\"desc-tempo\">" + str_hora + "</span>";
        document.getElementById("img-weather").innerHTML += "<img class=\"img-turno\" src=\"img/turno/manha.jpg\">";
    }
    if(hora > 12 && hora <= 18){
        document.getElementsByTagName('body')[0].style.background = "#ff6d00";
        document.getElementById("titulo").innerHTML += "<h2 class=\"title-tempo\">Boa tarde!</h2>";
        document.getElementById("data-tempo").innerHTML += "<span class=\"desc-tempo\">" + str_data + "</span>";
        document.getElementById("horario").innerHTML += "<span class=\"desc-tempo\">" + str_hora + "</span>";
        document.getElementById("img-weather").innerHTML += "<img class=\"img-turno\" src=\"img/turno/tarde.jpg\">";
        console.log('Tarde');
    }
    if((hora > 18 || hora < 6) && hora <= 24){
        document.getElementsByTagName('body')[0].style.background = "#01579b";
        document.getElementById("titulo").innerHTML += "<h2 class=\"title-tempo\">Boa noite!</h2>";
        document.getElementById("data-tempo").innerHTML += "<span class=\"desc-tempo\">" + str_data + "</span>";
        document.getElementById("horario").innerHTML += "<span class=\"desc-tempo\">" + str_hora + "</span>";
        document.getElementById("img-weather").innerHTML += "<img class=\"img-turno\" src=\"img/turno/noite.jpg\">";
        console.log('Noite');
    }
}

turno();
