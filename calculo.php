<?php
    if($_POST){
        $real = $_POST['real'];
        $mensagem = "";

        if(is_numeric($real)){
            if($real > 0){

                //Aqui começa os cálculos de conversão!

                $valorDolar = 5.36;
                $valorEuro = 6.37;
                $valorBit = 8291567;

                $calculoDolar = $valorDolar * $real;
                $calculoDolar = number_format($calculoDolar, 2, ',', '.');

                $calculoEuro = $valorEuro * $real;
                $calculoEuro = number_format($calculoEuro, 2, ',', '.');

                $calculoBit = $valorBit * $real;
                $calculoBit = number_format($calculoBit, 2, ',', '.');

                $mensagem.= "<div class='sucesso'>";
                $mensagem.= "O valor convertido para os respectivos valores são:";
                $mensagem.= "<ul>";
                $mensagem.= "<li><b>Dólar:</b> R$ ".$calculoDolar."</li>";
                $mensagem.= "<li><b>Euro:</b> R$ ".$calculoEuro."</li>";
                $mensagem.= "<li><b>Bitcoin</b>: R$ ".$calculoBit."</li>";
                $mensagem.= "</ul>";
                $mensagem.= "</div>";

            }else{
                $mensagem.= "<div class='erro'>";
                $mensagem.= "<b>O valor informado deve ser maior que zero :(</b>";
                $mensagem.= "</div>";
            }
        }else{
            echo "O número não é numérico!";
        }
    }else{
        
    }
?>


<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Calculo de Conversão</title>
	<link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body>
	<main>
		<div class="painel">
			<h2>Resultado do cálculo de conversão:</h2>
			<div class="conteudo-painel">
				<?php echo $mensagem; ?>
				<a class="botao" href="index.php">Voltar</a>
			</div>
		</div>
	</main>
</body>
</html>