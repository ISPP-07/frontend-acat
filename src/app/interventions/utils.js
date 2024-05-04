export function formatDate(dateString) {
	const date = new Date(dateString)
	let formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} `
	if (date.getHours() < 10) {
		formattedDate += `0${date.getHours()}:`
	} else {
		formattedDate += `${date.getHours()}:`
	}
	if (date.getMinutes() < 10) {
		formattedDate += `0${date.getMinutes()}`
	} else {
		formattedDate += `${date.getMinutes()}`
	}
	return formattedDate
}
