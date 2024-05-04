export function exportData(datos, nombre, columnas) {
	try {
		const translated = []
		// Columnas contains translations for the object keys. ej. {name: 'Nombre'}
		for (let i = 0; i < datos.length; i++) {
			translated.push({})
			for (const key in datos[i]) {
				if (columnas[key]) {
					translated[i][columnas[key]] = datos[i][key]
				}
			}
		}
		const xlsx = require('xlsx')
		// Create file
		const ws = xlsx.utils.json_to_sheet(translated)
		const wb = xlsx.utils.book_new()
		xlsx.utils.book_append_sheet(wb, ws, 'Data')
		xlsx.writeFile(wb, `${nombre}.xlsx`)
	} catch (error) {
		console.error(error)
		alert('No se han encontrado datos')
	}
}
