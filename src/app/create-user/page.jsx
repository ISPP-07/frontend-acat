import CreateUserForm from '../components/CreateUserForm'
import Sidebar from '../components/sidebar'

export default function Home() {
	return (
		<main className="flex bg-white wallpaper w-screen h-screen text-black">
			<Sidebar className="relative" />
			<div className="w-full h-full flex items-center justify-center">
				<CreateUserForm />
			</div>
		</main>
	)
}
