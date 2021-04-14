<?php

    // Librerias
    include("../../tools/config.php");
    include("../../tools/mysql.php");
    include("../../tools/querys.php");

    session_start();

    header("Content-Type: application/json");

    // Validamos sesión
    if(!isset($_SESSION['UsrUsr'])){
        echo json_encode(array(
            "status"=>"ER",
            "payload"=>array(
                "message"=>"Usuario no autenticado."
            )
        ));

        die();
    }

    $UsrUsr     = $_SESSION["UsrUsr"];
    $ColCod     = isset($_POST['ColCod'])?$_POST['ColCod']:"";
    $FotCod     = isset($_POST['FotCod'])?$_POST['FotCod']:"";

    //Obtener los datos del archivo a eliminar
    $pst = $mydb->prepare($querys["fotos"]["2_obtener"]);
    $pst->bind_param("sss", $UsrUsr, $ColCod, $FotCod);
    $pst->execute();
    $rs = $pst->get_result();

    if($file = $rs->fetch_assoc()){
        //Eliminamo el archivo fisico
        $path = "../../data".$file["FotPath"];
        @unlink($path);
        
    }

?>
