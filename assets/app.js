// Aquí se carga el archivo mortys.json
fetch('mortys.json')
    .then(response => response.json())
    .then(data => {
        const mortysData = data.data; // Extraemos los Mortys de la base de datos JSON
        loadTable(mortysData); // Cargamos la tabla al inicio
    })
    .catch(error => console.error("Error al cargar los datos:", error));

function loadTable(mortys) {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = ''; // Limpiar tabla antes de agregar nuevos resultados

    mortys.forEach(morty => {
        const row = document.createElement('tr');

        // Llenamos cada fila de la tabla con los valores correspondientes
        const values = [
            morty.id,
            morty.name,
            morty.type,
            morty.rarity,
            morty.basexp,
            morty.basehp,
            morty.baseatk,
            morty.basedef,
            morty.basespd
        ];

        values.forEach(value => {
            const cell = document.createElement('td');
            cell.textContent = value;
            row.appendChild(cell);
        });

        tableBody.appendChild(row);
    });
}

function filterMortys() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const filteredMortys = mortysData.filter(morty => 
        morty.name.toLowerCase().includes(searchInput)
    );

    loadTable(filteredMortys); // Volver a cargar la tabla con los resultados filtrados
}
