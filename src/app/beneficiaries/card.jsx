import CalendarDays from '../../../static/calendarDays'
import Users from '../../../static/users'

function Card({ beneficiary }) {
	const age = calculateAge(beneficiary.birthday)
	return (
		<div className="mt-6 flex justify-center transition-transform transform hover:scale-105 hover:cursor-pointer">
			<div className="relative flex w-full max-w-[24rem] flex-row rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
				<Users className="h-full w-full object-cover" />
				<div className="flex flex-col w-full p-4">
					<div className="flex flex-col items-start justify-between w-full h-full">
						<div>
							<h3 className="text-xl font-bold">{beneficiary.alias}</h3>
						</div>
						<div className="flex flex-col items-start w-full">
							<div className="flex flex-row items-center justify-center w-full gap-5">
								<Tags
									svg={<CalendarDays />}
									text={beneficiary.interventions.length}
									color={'text-[#117b34] bg-[#EEFDF3]'}
								/>
								<Tags
									svg={<CalendarDays />}
									text={age}
									color={'text-[#323842] bg-[#f3f4f6]'}
								/>
								{beneficiary.isFinished ? (
									<Tags
										svg="✔️"
										text="Finalizado"
										color="text-[#4b7bec] bg-[#f1f5fe]"
									/>
								) : null}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Card

function Tags({ svg, text, color }) {
	return (
		<div
			className={
				'text-xs inline-flex gap-2 items-center leading-sm px-3 py-1 rounded-full ' +
				color
			}
		>
			<span>{svg}</span>
			<span>{text}</span>
		</div>
	)
}

function calculateAge(birthday) {
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
