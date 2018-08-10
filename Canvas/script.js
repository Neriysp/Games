
    var color="red";
    var painting=true;
    render();

    function handleHover(e) {
        var el = e.target;
        if(painting)
        el.style.backgroundColor=color;
    
    }

     document.getElementById("tabela").addEventListener('click',()=>{
        painting=!painting;
    })

    function changeColor(e){

        color=e.target.value;

    }
    function render() {

        var tableHtml = "";

        for (var i = 0; i < 100; i++) {
            tableHtml += "<tr>";
            for (var j = 0; j < 100; j++) {


                    tableHtml += "<td width='0.1px' onmouseover='handleHover(event)'> </td>";
            }
            tableHtml += "</tr>";
        }

        document.getElementById("tabela").innerHTML = tableHtml;
    }