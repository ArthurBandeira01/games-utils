 //Players:
 const p1 = "X";
 const p2 = "O";

 //Quem ta jogando:
 var playTime = p1;
 //Jogo já acabou?
 var gameOver = false;

 //Atualizar tabuleiro:
 atualizaJogadorAtual();
 comecarJogo();

 function atualizaJogadorAtual() {
     if (gameOver) {
         return;
     }
     if (playTime == p1) {
         var player = document.querySelectorAll('div#mostrador img')[0];
         player.setAttribute("src", "img/hash/x2.png");
     } else {
         var player = document.querySelectorAll('div#mostrador img')[0];
         player.setAttribute("src", "img/hash/o2.png");
     }
 }


 function comecarJogo() {
     var espacos = document.getElementsByClassName('espaco');
     for (var i = 0; i < espacos.length; i++) {
         espacos[i].addEventListener('click', function() {
             if (gameOver) {
                 return;
             }
             if (this.getElementsByTagName("img").length == 0) {
                 if (playTime == p1) {
                     this.innerHTML = "<img src='" + "img/hash/x2.png" + "'>";
                     this.setAttribute("jogada", p1);
                     playTime = p2;
                 } else {
                     this.innerHTML = "<img src='" + "./img/hash/o2.png" + "'>";
                     this.setAttribute("jogada", p2);
                     playTime = p1;
                 }
                 atualizaJogadorAtual();
                 verificaVencedor();
             }
         });
     }
 }

 async function verificaVencedor() {
     var a1 = document.getElementById("a1").getAttribute("jogada");
     var a2 = document.getElementById("a2").getAttribute("jogada");
     var a3 = document.getElementById("a3").getAttribute("jogada");

     var b1 = document.getElementById("b1").getAttribute("jogada");
     var b2 = document.getElementById("b2").getAttribute("jogada");
     var b3 = document.getElementById("b3").getAttribute("jogada");

     var c1 = document.getElementById("c1").getAttribute("jogada");
     var c2 = document.getElementById("c2").getAttribute("jogada");
     var c3 = document.getElementById("c3").getAttribute("jogada");

     var vencedor = "";

     if ((a1 == b1 && a1 == c1 && a1 != "") ||
         (a1 == a2 && a1 == a3 && a1 != "") ||
         (a1 == b2 && a1 == c3 && a1 != "")) {
         vencedor = a1;
     } else if ((b2 == b1 && b2 == b3 && b2 != "") ||
         (b2 == a2 && b2 == c2 && b2 != "") ||
         (b2 == a3 && b2 == c1 && b2 != "")) {
         vencedor = b2;
     } else if (((c3 == c2 & c3 == c1) ||
             (c3 == a3 && c3 == b3)) && c3 != "") {
         vencedor = c3;
     } else if ((a1 != "" && a2 != "" && a3 != "" && b1 != "" && b2 != "" && b3 != "" && c1 != "" && c2 != "" &&
             c3 != "" && vencedor == "")) {
         alert("Empate!");
     }

     if (vencedor != "") {
         gameOver = true;

         await sleep(50);

         alert(`O vencedor foi o: ${vencedor}`);
     }

     var rec = document.getElementById('restart');
     rec.addEventListener("click", function() {
         window.location.reload();
     });
 }

 function sleep(ms) {
     return new Promise(resolve => setTimeout(resolve, ms));
 }