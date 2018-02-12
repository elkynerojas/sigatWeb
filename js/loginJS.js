var servicioLogin = "http://localhost/sigatWS/login";

function ValidarLogin(){
    var dataJson = '{"usu_usuario":"'+ document.getElementById("usu_usuario").value + '",\n\
                    "usu_contrasena":"' + document.getElementById("usu_contrasena").value + '"}';
    //alert(dataJson);
    $.ajax({
        url: servicioLogin,
        type: "POST",
        timeout: 50000,
        dataType: "json",
        data: dataJson	                
    }).done( function(data){
        console.log(JSON.stringify(data));
        var datos = JSON.parse(data);

       //alert(datos.mensaje);    
       swal({
          title:datos.titulo,
          text: datos.mensaje,
          type:datos.est,
          showCancelButton:false,
          confirmButtonColor: "#ac2925",
          confirmButtonText: "Aceptar",
          cancelButtonText: "Cancelar",
          cancelButtonColor: "#ac2925",
          closeOnConfirm: false,
          closeOnCancel: false
        },function(isConfirm){
              if (isConfirm) {
                 window.location= datos.location;
                } 
            }
        );
        if(datos.mensaje){
            sessionStorage.usuario = datos.usuario;
            sessionStorage.tec_id = datos.tec_id;
            sessionStorage.adm_id = datos.adm_id;
            sessionStorage.per_cc = datos.per_cc;
            sessionStorage.tec_nombre = datos.tec_nombre;
            sessionStorage.adm_nombre = datos.adm_nombre;
            sessionStorage.cac_id = datos.cac_id;
            sessionStorage.estado = datos.estado;
        }          
    }).fail( function( jqXHR, textStatus, errorThrown ){
       alert( "Error al validar" );
     }).always( function(){

     }); 
}

function sesion(){
    if(!sessionStorage.usuario){
        window.location = '../index.html';
    }
}
function logout(){
    swal({
      title: "Cerrar Sesión",
      text: "Está seguro que quiere cerrar la sesión ?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ac2925",
      confirmButtonText: "Salir",
      cancelButtonText: "Cancelar",
      cancelButtonColor: "#ac2925",
      closeOnConfirm: false,
      closeOnCancel: true
    },
    function(isConfirm){
      if (isConfirm) {
        sessionStorage.clear();
        window.location="index.html";
      } 
    });
}


        
            
           
           
