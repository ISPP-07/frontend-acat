export function exportData(datos, nombre, columnas, dateFormat) {
	try {
		const xlsx = require('xlsx')

		// Select only columns specified in columnas
		const filteredData = datos.map(entry => {
			const filteredEntry = {}
			for (const key in columnas) {
				filteredEntry[columnas[key]] = entry[key]
			}
			return filteredEntry
		})

		const ws = xlsx.utils.json_to_sheet(filteredData)
		// Create array of column names
		const headers = []
		for (const key in columnas) {
			headers.push(columnas[key])
		}
		xlsx.utils.sheet_add_aoa(ws, [headers], { origin: 'A1' })

		// Format dates
		let col = 'A'
		for (const key in columnas) {
			if (dateFormat[key]) {
				// Set column format for all entries matching col + any number
				for (let i = 2; i <= filteredData.length + 1; i++) {
					// Only datetimes can be set as dates. Otherwise they will contain time and not be accepted by the backend
					if (
						dateFormat[key].includes('h') ||
						dateFormat[key].includes('T') ||
						dateFormat[key].includes('s')
					)
						ws[col + i].t = 'd'
					else ws[col + i].t = 's'
					ws[col + i].z = dateFormat[key]
				}
			}
			col = String.fromCharCode(col.charCodeAt(0) + 1).toUpperCase()
		}
		const wb = xlsx.utils.book_new()
		xlsx.utils.book_append_sheet(wb, ws, 'Data')
		xlsx.writeFile(wb, `${nombre}.xlsx`)
	} catch (error) {
		console.error(error)
		alert('No se han encontrado datos')
	}
}
