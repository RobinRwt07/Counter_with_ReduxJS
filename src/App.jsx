import "./App.css"
import { Counter } from "./features/counter/Counter"
import logo from "./logo.svg"
function App() {
	return (
		<div className="App">
			<div className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<Counter />
			</div>
		</div>
	)
}

export default App
