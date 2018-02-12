var servicioDepartamento = "http://localhost/sigatWS/departamento";

function departamentoListar(dep_id){
    //alert("prod-listar = "+document.getElementById("filtro").value);
    $.ajax({      
            url: servicioDepartamento+"/listar",
            type: "GET",
            timeout: 100000,
            dataType: "json"			                
    }).done( function( data ){
            var datos = JSON.parse( data );    
            selectDepartamento(datos,dep_id);
    }).fail( function( jqXHR, textStatus, errorThrown ){
            alert("Error en listar Departamento");
    }).always( function(){

    });            
}

function selectDepartamento(datos,dep_id){
    var str = "";
    $("#dep_id option").remove();
    $("#dep_id_act option").remove();
    str=str+"<option value = 'null' selectted=''></option>";
    $.each(datos, function(i){
        str = str+"<option  value='";
        str=str+datos[i].dep_id;
        if(datos[i].dep_id==dep_id){
           str=str+"' selected=''>";  
       }else{
            str=str+"'>";
       }
        str=str+datos[i].dep_descripcion;
        str=str+"</option>";
    });
    
    $("#dep_id").append(str);
    $("#dep_id_act").append(str);
}
