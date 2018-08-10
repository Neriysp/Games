    var a = [];

    while (a.length <= 14) {
        console.log(a.length);
        var rand = Math.floor(Math.random() * 15) + 1;

        if (!a.includes(rand))
            a.push(rand);
    }
    a.push(null);
    var nullIndex = Math.floor(Math.random() * 16);
    a[a.length - 1] = a[nullIndex];
    a[nullIndex] = null;

    render();

    function handleClick(e) {
        var value = parseInt(e.target.innerHTML);

        if (value != "") {
            var bosh = a.indexOf(null);
            var xBosh = Math.floor(bosh / 4);
            var yBosh = bosh - Math.floor(bosh / 4) * 4;
            var clickedElement = a.indexOf(value);
            var xClicked = Math.floor(clickedElement / 4);
            var yClicked = clickedElement - Math.floor(clickedElement / 4) * 4;
            if ((xBosh == xClicked + 1 && yBosh == yClicked) ||
                (xBosh == xClicked - 1 && yBosh == yClicked) ||
                (xBosh == xClicked && yBosh == yClicked + 1) ||
                (xBosh == xClicked && yBosh == yClicked - 1)) {
                a[bosh] = value;
                a[clickedElement] = null;
                render();
                return true;
            }
        }
        return false;
    }

    function render() {

        var tableHtml = "";

        for (var i = 0; i < 4; i++) {
            tableHtml += "<tr>";
            for (var j = 0; j < 4; j++) {
                if (a[i * 4 + j] == null) {
                    tableHtml += "<td style='background-color: black;'> </td>";
                } else
                    tableHtml += "<td width='100px' onclick='handleClick(event)'>" + a[i * 4 + j] + "</td>";
            }
            tableHtml += "</tr>";
        }

        document.getElementById("tabela").innerHTML = tableHtml;
    }