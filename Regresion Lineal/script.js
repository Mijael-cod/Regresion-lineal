function calcularRegresion() {
    // Obtener los valores de X e Y
    var inputX = document.getElementById('inputX').value.split(',').map(Number);
    var inputY = document.getElementById('inputY').value.split(',').map(Number);

    // Verificar que se ingresaron al menos dos valores
    if (inputX.length < 2 || inputY.length < 2 || inputX.length !== inputY.length) {
        alert("Por favor, ingrese al menos dos valores para X e Y y asegúrese de que tengan la misma cantidad de elementos.");
        return;
    }

    // Crear un array para almacenar las iteraciones
    var iteraciones = [];

    // Calcular la regresión lineal
    var n = inputX.length;
    var sumX = 0;
    var sumY = 0;
    var sumX2 = 0;
    var sumXY = 0;

    for (var i = 0; i < n; i++) {
        sumX += inputX[i];
        sumY += inputY[i];
        sumX2 += inputX[i] * inputX[i];
        sumXY += inputX[i] * inputY[i];

        // Almacenar los resultados de la iteración actual
        iteraciones.push({
            iteracion: i + 1,
            Y: inputY[i],
            X: inputX[i],
            X2: inputX[i] * inputX[i],
            XY: inputX[i] * inputY[i]
        });
    }

    // Calcular el valor de "a" y "b" según las fórmulas
    var a = (n * sumXY - sumX * sumY) / (n * sumX2 - Math.pow(sumX, 2));
    var b = (sumY - a * sumX) / n;

    // Calcular las medias de X e Y
    var mediaX = sumX / n;
    var mediaY = sumY / n;

    // Calcular las diferencias y productos adicionales
    var diferenciasX = [];
    var diferenciasY = [];
    var diferenciasX2 = [];
    var diferenciasY2 = [];
    var productosDiferencias = [];

    for (var i = 0; i < n; i++) {
        diferenciasX.push(Math.abs(inputX[i] - mediaX));
        diferenciasY.push(Math.abs(inputY[i] - mediaY));
        diferenciasX2.push(Math.pow(inputX[i] - mediaX, 2));
        diferenciasY2.push(Math.pow(inputY[i] - mediaY, 2));
        productosDiferencias.push((inputX[i] - mediaX) * (inputY[i] - mediaY));
    }

    var r = sumarArray(productosDiferencias) / (Math.sqrt(sumarArray(diferenciasX2)) * Math.sqrt(sumarArray(diferenciasY2)));
    var r2 = Math.pow(r,2);

    // Mostrar el resultado en la consola
    console.log('Valor de a:', a);
    console.log('Valor de b:', b);
    console.log('Media de X:', mediaX);
    console.log('Media de Y:', mediaY);
    console.log('Coeficiente de correlacioón lineal', r);
    console.log('Coeficiente de determenicaión',r2)

    // Mostrar el resultado en una tabla HTML
    mostrarResultadoEnTabla(iteraciones, sumY, sumX, sumX2, sumXY, a, b, r, r2, mediaY, mediaX, diferenciasX, diferenciasY, diferenciasX2, diferenciasY2, productosDiferencias);
}

function mostrarResultadoEnTabla(iteraciones, sumY, sumX, sumX2, sumXY, a, b, r, r2, mediaY, mediaX, diferenciasX, diferenciasY, diferenciasX2, diferenciasY2, productosDiferencias) {
    // Crear una tabla HTML y agregarla al resultado div
    var tabla = document.createElement('table');
    tabla.border = '1';

    // Crear la fila de encabezado
    var encabezado = tabla.createTHead();
    var filaEncabezado = encabezado.insertRow();
    var celdaEncabezado1 = filaEncabezado.insertCell(0);
    var celdaEncabezado2 = filaEncabezado.insertCell(1);
    var celdaEncabezado3 = filaEncabezado.insertCell(2);
    var celdaEncabezado4 = filaEncabezado.insertCell(3);
    var celdaEncabezado5 = filaEncabezado.insertCell(4);
    var celdaEncabezado6 = filaEncabezado.insertCell(5);
    var celdaEncabezado7 = filaEncabezado.insertCell(6);
    var celdaEncabezado8 = filaEncabezado.insertCell(7);
    var celdaEncabezado9 = filaEncabezado.insertCell(8);
    var celdaEncabezado10 = filaEncabezado.insertCell(9);

    celdaEncabezado1.innerHTML = '<b>Iteración</b>';
    celdaEncabezado2.innerHTML = '<b>Y</b>';
    celdaEncabezado3.innerHTML = '<b>X</b>';
    celdaEncabezado4.innerHTML = '<b>X^2</b>';
    celdaEncabezado5.innerHTML = '<b>XY</b>';
    celdaEncabezado6.innerHTML = '<b>X - Media de X</b>';
    celdaEncabezado7.innerHTML = '<b>Y - Media de Y</b>';
    celdaEncabezado8.innerHTML = '<b>(X - Media de X)^2</b>';
    celdaEncabezado9.innerHTML = '<b>(Y - Media de Y)^2</b>';
    celdaEncabezado10.innerHTML = '<b>(X - Media de X)(Y - Media dey)</b>';

    // Crear filas de datos
    var cuerpoTabla = tabla.createTBody();

    for (var i = 0; i < iteraciones.length; i++) {
        var filaDatos = cuerpoTabla.insertRow();
        var celdaIteracion = filaDatos.insertCell(0);
        var celdaY = filaDatos.insertCell(1);
        var celdaX = filaDatos.insertCell(2);
        var celdaX2 = filaDatos.insertCell(3);
        var celdaXY = filaDatos.insertCell(4);
        var celdaDiffX = filaDatos.insertCell(5);
        var celdaDiffY = filaDatos.insertCell(6);
        var celdaDiffX2 = filaDatos.insertCell(7);
        var celdaDiffY2 = filaDatos.insertCell(8);
        var celdaPDiffMXY = filaDatos.insertCell(9);

        celdaIteracion.innerHTML = iteraciones[i].iteracion;
        celdaY.innerHTML = iteraciones[i].Y;
        celdaX.innerHTML = iteraciones[i].X;
        celdaX2.innerHTML = iteraciones[i].X2;
        celdaXY.innerHTML = iteraciones[i].XY;
        celdaDiffX.innerHTML = diferenciasX[i].toFixed(2);
        celdaDiffY.innerHTML = diferenciasY[i].toFixed(2);
        celdaDiffX2.innerHTML = diferenciasX2[i].toFixed(2);
        celdaDiffY2.innerHTML = diferenciasY2[i].toFixed(2);
        celdaPDiffMXY.innerHTML = productosDiferencias[i].toFixed(2);
    }

    // Agregar una fila para las sumas al final de la tabla
    var filaSumas = cuerpoTabla.insertRow();
    var celdaSumasLabel = filaSumas.insertCell(0);
    var celdaSumasY = filaSumas.insertCell(1);
    var celdaSumasX = filaSumas.insertCell(2);
    var celdaSumasX2 = filaSumas.insertCell(3);
    var celdaSumasXY = filaSumas.insertCell(4);
    var celdaSumasDiffX = filaSumas.insertCell(5);
    var celdaSumasDiffY = filaSumas.insertCell(6);
    var celdaSumasDiffX2 = filaSumas.insertCell(7);
    var celdaSumasDiffY2 = filaSumas.insertCell(8);
    var celdaSumasPDiffMXY = filaSumas.insertCell(9);


    celdaSumasLabel.innerHTML = '<b>Sumas</b>';
    celdaSumasY.innerHTML = '<b>' + sumY + '</b>';
    celdaSumasX.innerHTML = '<b>' + sumX + '</b>';
    celdaSumasX2.innerHTML = '<b>' + sumX2 + '</b>';
    celdaSumasXY.innerHTML = '<b>' + sumXY + '</b>';
    celdaSumasDiffX.innerHTML = '<b>' + diferenciasX.reduce((a, b) => a + b, 0).toFixed(2) + '</b>';
    celdaSumasDiffY.innerHTML = '<b>' + diferenciasY.reduce((a, b) => a + b, 0).toFixed(2) + '</b>';
    celdaSumasDiffX2.innerHTML = '<b>' + diferenciasX2.reduce((a, b) => a + b, 0).toFixed(2) + '</b>';
    celdaSumasDiffY2.innerHTML = '<b>' + diferenciasY2.reduce((a, b) => a + b, 0).toFixed(2) + '</b>';
    celdaSumasPDiffMXY.innerHTML = '<b>' + productosDiferencias.reduce((a, b) => a + b, 0).toFixed(2) + '</b>';

    // Agregar la fila para la media de X
    var filaMediaX = cuerpoTabla.insertRow();
    var celdaMediaXLabel = filaMediaX.insertCell(0);
    var celdaMediaXValue = filaMediaX.insertCell(1);

    celdaMediaXLabel.innerHTML = '<b>Media de X</b>';
    celdaMediaXValue.innerHTML = '<b>' + mediaX + '</b>'; // Limitar a 5 decimales

    // Agregar la fila para la media de Y
    var filaMediaY = cuerpoTabla.insertRow();
    var celdaMediaYLabel = filaMediaY.insertCell(0);
    var celdaMediaYValue = filaMediaY.insertCell(1);

    celdaMediaYLabel.innerHTML = '<b>Media de Y</b>';
    celdaMediaYValue.innerHTML = '<b>' + mediaY + '</b>'; // Limitar a 5 decimales

    // Agregar la fila para el valor de "a"
    var filaA = cuerpoTabla.insertRow();
    var celdaALabel = filaA.insertCell(0);
    var celdaAValue = filaA.insertCell(1);

    celdaALabel.innerHTML = '<b>Valor de a</b>';
    celdaAValue.innerHTML = '<b>' + a.toFixed(5) + '</b>'; // Limitar a 5 decimales

    // Agregar la fila para el valor de "b"
    var filaB = cuerpoTabla.insertRow();
    var celdaBLabel = filaB.insertCell(0);
    var celdaBValue = filaB.insertCell(1);

    celdaBLabel.innerHTML = '<b>Valor de b</b>';
    celdaBValue.innerHTML = '<b>' + b.toFixed(5) + '</b>'; // Limitar a 5 decimales

    // Agregar la fila para el valor de "r"
    var filaB = cuerpoTabla.insertRow();
    var celdaBLabel = filaB.insertCell(0);
    var celdaBValue = filaB.insertCell(1);

    celdaBLabel.innerHTML = '<b>Valor del Coeficiente de correlación lineal (r)</b>';
    celdaBValue.innerHTML = '<b>' + r.toFixed(6) + '</b>'; // Limitar a 6 decimales

    // Agregar la fila para el valor de "r2"
    var filaB = cuerpoTabla.insertRow();
    var celdaBLabel = filaB.insertCell(0);
    var celdaBValue = filaB.insertCell(1);

    celdaBLabel.innerHTML = '<b>Valor del Coeficiente de determinación (r^2)</b>';
    celdaBValue.innerHTML = '<b>' + r2.toFixed(6) + '</b>'; // Limitar a 6 decimales

    // Crear un gráfico de dispersión con la línea de regresión
    crearGrafico(iteraciones, a, b);


    // Agregar la tabla al resultado div
    var resultado = document.getElementById('resultado');
    resultado.innerHTML = '';
    resultado.appendChild(tabla);
}

function sumarArray(array) {
    return array.reduce((a, b) => a + b, 0);
}

function crearGrafico(iteraciones, a, b) {
    var ctx = document.getElementById('scatterPlot').getContext('2d');
    var xValues = iteraciones.map(iteracion => iteracion.X);
    var yValues = iteraciones.map(iteracion => iteracion.Y);
    var regressionLine = xValues.map(x => a * x + b);

    var scatterChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Datos',
                data: iteraciones.map((iteracion, index) => ({ x: iteracion.X, y: iteracion.Y, index: index })),
                showLine: false,
                pointBackgroundColor: 'rgba(75, 192, 192, 0.5)',
            }, {
                label: 'Línea de regresión',
                data: iteraciones.map((iteracion, index) => ({ x: iteracion.X, y: regressionLine[index] })),
                fill: false,
                borderColor: 'rgba(255, 99, 132, 1)',
                tension: 0.1,
            }]
        },
        options: {
            responsive: false, // Deshabilita la responsividad
            maintainAspectRatio: false, // Deshabilita el mantenimiento del aspecto
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom'
                },
                y: {
                    type: 'linear',
                    position: 'left'
                }
            },
            plugins: {
                legend: {
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: 'Gráfico de dispersión con línea de regresión',
                    position: 'top', // Mueve el título hacia arriba
                    fontSize: 16 // Tamaño del título
                }
            },
            layout: {
                padding: {
                    left: 5, // Aumenta el espacio a la izquierda
                    right: 5, // Aumenta el espacio a la derecha
                    top: 5, // Aumenta el espacio arriba
                    bottom: 5, // Aumenta el espacio abajo
                }
            }
        }
    });
}