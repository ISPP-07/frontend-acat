export default function calculateAge(birthday) {
	const birthdayDate = new Date(birthday)
	const currentDate = new Date()

	let age = currentDate.getFullYear() - birthdayDate.getFullYear()
	const monthDiff = currentDate.getMonth() - birthdayDate.getMonth()

	if (
		monthDiff < 0 ||
		(monthDiff === 0 && currentDate.getDate() < birthdayDate.getDate())
	) {
		age--
	}

	return age
}
