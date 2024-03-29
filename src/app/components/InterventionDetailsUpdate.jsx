/* eslint-disable no-unused-vars */
import React from 'react'
/* eslint-enable no-unused-vars */

export default function InterventionDetailsUpdate({
	intervention,
	errors,
	onSubmit,
	formatDateDefaultValue
}) {
	return (
		<form onSubmit={onSubmit} className="flex flex-col gap-3 w-full">
			<article className="flex items-center w-full">
				<p className="font-Varela w-fit text-blue-500 font-bold mr-2">
					Paciente:
				</p>
				<div className="flex items-center w-full border-gray-200">
					<p className="p-1 w-full rounded-xl bg-gray-50">
						{intervention.patient.alias}
					</p>
				</div>
			</article>
			{errors?.date && <span className="text-red-500">{errors.date}</span>}
			<article className="flex items-center w-full">
				<label
					htmlFor="date"
					className="font-Varela w-fit text-blue-500 font-bold mr-2"
				>
					Fecha de atención:
				</label>
				<div className="flex items-center w-full border-2 rounded-xl border-gray-200 bg-white">
					<input
						type="datetime-local"
						id="date"
						name="date"
						className="p-1 w-full rounded-xl bg-white placeholder-black"
						defaultValue={formatDateDefaultValue(intervention.date)}
					/>
				</div>
			</article>
			{errors?.typology && (
				<span className="text-red-500">{errors.typology}</span>
			)}
			<article className="flex items-center w-full">
				<label
					htmlFor="typology"
					className="font-Varela w-fit text-blue-500 font-bold mr-2"
				>
					Tipología:
				</label>
				<div className="flex items-center w-full border-2 rounded-xl border-gray-200 bg-white">
					<input
						type="text"
						id="typology"
						name="typology"
						defaultValue={intervention.typology}
						className="p-1 w-full rounded-xl bg-white placeholder-black"
					/>
				</div>
			</article>
			{errors?.technician && (
				<span className="text-red-500">{errors.technician}</span>
			)}
			<article className="flex items-center w-full">
				<label
					htmlFor="technician"
					className="font-Varela w-fit text-blue-500 font-bold mr-2"
				>
					Técnico:
				</label>
				<div className="flex items-center w-full border-2 rounded-xl border-gray-200 bg-white">
					<input
						type="text"
						id="technician"
						name="technician"
						defaultValue={intervention.technician}
						className="p-1 w-full rounded-xl bg-white placeholder-black"
					/>
				</div>
			</article>
			{errors?.reason && <span className="text-red-500">{errors.reason}</span>}
			<article className="flex items-center w-full">
				<label
					htmlFor="reason"
					className="font-Varela w-fit text-blue-500 font-bold mr-2"
				>
					Motivo:
				</label>
				<div className="flex items-center w-full border-2 rounded-xl border-gray-200 bg-white">
					<input
						type="text"
						id="reason"
						name="reason"
						defaultValue={intervention.reason}
						className="p-1 w-full rounded-xl bg-white placeholder-black"
					/>
				</div>
			</article>
			<article className="flex flex-col">
				<label
					htmlFor="observations"
					className="font-Varela text-blue-500 font-bold mr-2"
				>
					Observaciones:
				</label>
				<div className="flex items-center border-2 rounded-xl border-gray-200 bg-white">
					<textarea
						className="flex items-center rounded-xl p-1 w-full bg-white placeholder-black"
						type="text"
						defaultValue={intervention.observations}
						id="observations"
						name="observations"
					/>
				</div>
			</article>
			<div className="flex items-center w-full justify-center gap-5 mt-5">
				<input
					type="submit"
					value="Confirmar cambios"
					className="bg-green-500 rounded-md drop-shadow-lg p-1 cursor-pointer text-white w-3/4"
				/>
			</div>
		</form>
	)
}
