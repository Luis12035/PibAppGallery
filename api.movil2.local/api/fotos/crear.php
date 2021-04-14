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
    $ColCod     = (isset($_POST["ColCod"]))?$_POST["ColCod"]:"";
   
    $store_dir  = "../../data/$UsrUsr/$ColCod/";
    @mkdir($store_dir, 0777, true);

    // Almacenar la fotografia
    $FotFile    = $_FILES["FotFile"];

    $filename   = $FotFile["name"]
    $tmp_path   = $FotFile["tmp_name"];
    $path       = "../../data/".$filename;

    if(move_uploaded_file($tmp_path, $path))
    {
        // Limpiamos parametros
        
        
        $FotCod     = uniqid();
        $FotFch     = date("Y-m-d", time());
        $FotPath    = "";
    
        $UsrUsr     = mysqli_real_escape_string($mydb, $UsrUsr);
        $ColCod     = mysqli_real_escape_string($mydb, $ColCod);
        $FotCod     = mysqli_real_escape_string($mydb, $FotCod);
        $FotFch     = mysqli_real_escape_string($mydb, $FotFch);
        $FotPath    = mysqli_real_escape_string($mydb, $FotPath);
    
        // Insertamos la colección
        $pst = $mydb->prepare($querys['fotos']['1_insertar']);
        $pst->bind_param("sssss", $UsrUsr, $ColCod, $FotCod, $FotFch, $FotPath);
        $pst->execute();
    
        // Logica del negocio
        if($mydb->error){
            echo json_encode(array(
                "status"=>"ER",
                "payload"=>array(
                    "error"=> $mydb->error,
                    "message"=>"Ocurrio un error creando la colección."
                )
            ));
        }else{
            echo json_encode(array(
                "status"=>"OK",
                "payload"=>array(
                    "message"=>"Foto creada."
                )
            ));
        }

    }else{
        echo json_encode(array(
            "status"=>"ER",
            "payload"=>array(
                "message"=>"Ocurrio un error al enviar el archivo"
            )
        ))
    }
    
    
    


    
?>