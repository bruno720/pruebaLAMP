<?php
header("Content-Type:application/json");
$BDD = new mysqli("localhost", "root", "", "biblioteca");

$tam = strlen(dirname($_SERVER["SCRIPT_NAME"]));
$inc = $tam == 1 ? 0 : 1;
$ruta = explode("/", substr($_SERVER["REQUEST_URI"], $tam + $inc));

$data = array("resp" => false, "msg" => "hola pais");
switch ($ruta[0]) {
    case "librolist":
        $list = array();
        $M = $BDD->query("SELECT numl, titu, autor, tipo, prec, std FROM libro");
        foreach ($M as $V) {
            array_push($list, array(
                "numl" => $V["numl"],
                "titu" => $V["titu"],
                "autor" => $V["autor"],
                "tipo" => $V["tipo"],
                "prec" => $V["prec"],
                "std" => $V["std"]
            ));
        }
        $data = array("resp" => true, "list" => $list);
        break;

    case "saludar":
        $data = array("resp" => true, "msg" => "OSOS CARINOSOS EL REGRESO");
        break;

    case "librosave":
        $titu = $_POST["titu"];
        $autor = $_POST["autor"];
        $tipo = $_POST["tipo"];
        $prec = $_POST["prec"];
        $std = $_POST["std"];
        if ($BDD->query("INSERT INTO libro (titu, autor, tipo, prec, std) VALUES ('$titu', '$autor', '$tipo', $prec, '$std')")) {
            $resp = true;
        } else {
            $resp = false;
        }
        $data = array("resp" => $resp, "msg" => "SE LOGRO REGISTRAR EL LIBRO");
        break;

    case "librodel":
        $numl = json_decode(file_get_contents('php://input'), true)["numl"];
        if ($BDD->query("DELETE FROM libro WHERE numl = $numl")) {
            $resp = true;
        } else {
            $resp = false;
        }
        $data = array("resp" => $resp, "msg" => $resp ? "SE LOGRO BORRAR EL LIBRO" : "NO SE PUDO BORRAR EL LIBRO");
        break;

    case "libroedit":
        $input = json_decode(file_get_contents('php://input'), true);
        $numl = $input["numl"];
        $titu = $input["titu"];
        $autor = $input["autor"];
        $tipo = $input["tipo"];
        $prec = $input["prec"];
        $std = $input["std"];
        if ($BDD->query("UPDATE libro SET titu='$titu', autor='$autor', tipo='$tipo', prec=$prec, std='$std' WHERE numl=$numl")) {
            $resp = true;
        } else {
            $resp = false;
        }
        $data = array("resp" => $resp, "msg" => $resp ? "SE LOGRO EDITAR EL LIBRO" : "NO SE PUDO EDITAR EL LIBRO");
        break;
}
echo json_encode($data);
?>
