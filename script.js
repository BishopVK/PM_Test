// script.js

// Cargar el archivo JSON
fetch('mortys.json')
	.then(response => response.json())
	.then(data => {
		const mortyData = data.data;
		displayMortys(mortyData);
	})
	.catch(error => console.error('Error al cargar el JSON:', error));

// Función para mostrar los Mortys en la tabla
/* function displayMortys(mortys) {
    const mortyList = document.getElementById('mortyList');
    mortyList.innerHTML = ''; // Limpiar la lista antes de llenarla

    mortys.forEach(morty => {
        const row = document.createElement('tr');
        
        // Crear celdas con el contenido de cada Morty
        row.innerHTML = `
            <td>${morty.name}</td>
            <td>${morty.type}</td>
            <td>${morty.rarity}</td>
            <td>${morty.basexp}</td>
            <td>${morty.basehp}</td>
            <td>${morty.baseatk}</td>
            <td>${morty.basedef}</td>
            <td>${morty.basespd}</td>
            <td>${morty.stattotal}</td>
        `;
        
        mortyList.appendChild(row);
    });
} */

let sortDirections = {}; // Objeto para almacenar la dirección de ordenación de cada columna

function sortTable(columnIndex) {
	const table = document.getElementById("mortyTable");
	const tbody = table.querySelector("tbody");
	const rows = Array.from(tbody.rows);

	// Determinar la dirección de ordenación (ascendente o descendente)
	sortDirections[columnIndex] = !sortDirections[columnIndex]; // Alternar dirección
	const ascending = sortDirections[columnIndex];

	rows.sort((rowA, rowB) => {
		let cellA = rowA.cells[columnIndex].textContent.trim().toLowerCase();
		let cellB = rowB.cells[columnIndex].textContent.trim().toLowerCase();

		// Convertir a números si es posible
		const numA = parseFloat(cellA);
		const numB = parseFloat(cellB);

		if (!isNaN(numA) && !isNaN(numB)) {
			return ascending ? numA - numB : numB - numA;
		}

		return ascending ? cellA.localeCompare(cellB) : cellB.localeCompare(cellA);
	});

	// Limpiar y reinsertar las filas ordenadas
	tbody.innerHTML = "";
	rows.forEach(row => tbody.appendChild(row));
}

// Función para obtener el color de fondo según la rareza
function getRarityColor(rarity) {
	switch (rarity) {
		case "<span class=\"Rare\">Raro</span>":
			return "#56d500"; // Verde
		case "<span class=\"Epic\">Épico</span>":
			return "#ffb700"; // Naranja
		case "<span class=\"Exotic\">Exótico</span>":
			return "#e367ff"; // Violeta
		default:
			return "transparent"; // Sin color para "Common" u otros valores
	}
}

// Función para obtener la imagen del tipo
function getTypeImage(type) {
	switch (type) {
		case "<span class=\"rock\">Piedra</span>":
			return "<img src=\"images/rock_large.png\">"; // Piedra
		case "<span class=\"paper\">Papel</span>":
			return "<img src=\"images/paper_large.png\">"; // Papel
		case "<span class=\"scissors\">Tijera</span>":
			return "<img src=\"images/scissors_large.png\">"; // Tijera
		default:
			return ""; // Vacío
	}
}

// Función para mostrar los Mortys en la tabla
function displayMortys(mortys) {
	const mortyList = document.getElementById('mortyList');
	mortyList.innerHTML = ''; // Limpiar la lista antes de llenarla

	mortys.forEach(morty => {
		const rarityColor = getRarityColor(morty.rarity);
		const typeImage = getTypeImage(morty.type);
		const row = document.createElement('tr');
		
		// Crear celdas con el contenido de cada Morty
		row.innerHTML = `
			<td style="color: black; text-align: center; font-weight: bold;">${morty.id}</td>
			<td style="color: black; text-align: center; font-weight: bold; width: 20px; height: 20px;">${morty.image}</td>
			<td style="color: black; text-align: center; font-weight: bold; width: auto">${morty.name}</td>
			<td style="color: black; text-align: center; font-weight: bold;">${typeImage}</td>
			<td style="color: black; text-align: center; font-weight: bold; background-color: ${rarityColor};">${morty.rarity}</td>
			<td style="background-color: ${morty.evo_req_campaign === 2 ? 'green' : 'red'}; color: black; text-align: center; font-weight: bold">
				${morty.evo_req_campaign === 2 ? "SI" : "NO"}
			</td>
		`;
		
		mortyList.appendChild(row);
	});
}

// Función de búsqueda
function filterMortys() {
	const searchInput = document.getElementById('searchInput').value.toLowerCase();
	const rows = document.querySelectorAll('#mortyList tr');
	
	rows.forEach(row => {
		const nameCell = row.cells[2].textContent.toLowerCase();
		const idCell = row.cells[0].textContent.toLowerCase();
		if (nameCell.includes(searchInput) || idCell.includes(searchInput)) {
			row.style.display = '';
		} else {
			row.style.display = 'none';
		}
	});
}

// Mostrar botón "Volver arriba" al hacer scroll
window.onscroll = function() {
	let btn = document.getElementById("backToTop");
	if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
		btn.style.display = "block";
	} else {
		btn.style.display = "none";
	}
};

// Función para volver arriba
function scrollToTop() {
	window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Función para limpiar búsqueda
function clearSearch() {
	document.getElementById("searchInput").value = "";
	filterMortys(); // Restablece la tabla
}
