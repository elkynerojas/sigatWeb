var servicioMunicipio = "http://localhost/sigatWS/municipio";
//var servicioMunicipio = "http://192.168.1.33/sigatWS/municipio";


function municipioListar(dep_id,mun_id){
   // alert("departamento = "+document.getElementById("dep_id").value);
    $.ajax({      
            url: servicioMunicipio+"/listar/"+dep_id,
            type: "GET",
            timeout: 100000,
            dataType: "json"			                
    }).done( function( data ){
            var datos = JSON.parse( data ); 
            selectMunicipio(datos,mun_id);
    }).fail( function( jqXHR, textStatus, errorThrown ){
            alert("Error en listar Municipio");
    }).always( function(){

    });            
}

function selectMunicipio(datos,mun_id){
    var str = "";
    $("#mun_id option").remove();
    $("#mun_id_act option").remove();
    str=str+"<option value = 'null' selectted=''></option>";
    $.each(datos, function(i){
        str = str+"<option  value='";
        str=str+datos[i].mun_id;
        if(datos[i].mun_id==mun_id){
            str=str+"' selected=''>";  
        }else{
            str=str+"'>";
        }
        str=str+datos[i].mun_descripcion;
        str=str+"</option>";
    });
    
    $("#mun_id").append(str);
    $("#mun_id_act").append(str);
}
