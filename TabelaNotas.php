<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dados do Localhost</title>
</head>
<body>
    <h1>Tabela de Dados Locais</h1>
    <table border="1">
        <tr>
            <th>Coluna 1</th>
            <th>Coluna 2</th>
        </tr>
        <?php
            $host = '';
            $user = '';
            $password = '';
            $database = '';

            $conn = new mysqli($host, $user, $password, $database);

            if ($conn->connect_error) {
                die("Falha na conexão: " . $conn->connect_error);
            }

            $sql = "SELECT coluna1, coluna2 FROM sua_tabela";
            $result = $conn->query($sql);

            if ($result->num_rows > 0) {
                while($row = $result->fetch_assoc()) {
                    echo "<tr><td>" . $row["coluna1"] . "</td><td>" . $row["coluna2"] . "</td></tr>";
                }
            } else {
                echo "Nenhum dado encontrado";
            }
            $conn->close();
        ?>
    </table>
</body>
</html>
