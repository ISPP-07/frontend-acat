import Sidebar from '../components/sidebar'
import Searchbar from '../components/searchbar'

export default function Layout({ children }) {
	return (
		<div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
			<div className="w-full flex-none md:w-64">
				<Sidebar />
			</div>
			<div className="w-full md:overflow-y-scroll">
				<Searchbar />
				<div className="flex-grow p-6 md:p-12">{children}</div>
			</div>
		</div>
	)
}
