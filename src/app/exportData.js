import exportFromJSON from 'export-from-json'

function exportData(datos, nombre, columnas) {
	exportFromJSON({
		data: datos,
		fileName: nombre,
		exportType: exportFromJSON.types.xls,
		fields: columnas
	})
}

export default exportData
