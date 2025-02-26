import { hc } from "hono/client";
import { useState } from "react";
import { createRoot } from "react-dom/client";
import type { AppType } from "./api";

const client = hc<AppType>("/api");

function App() {
	return (
		<>
			<h1>Hello, Hono with React!</h1>
			<h2>Example of useState</h2>
			<Counter />
			<h2>Example of API fetch</h2>
			<ClockButton />
		</>
	);
}

function Counter() {
	const [count, setCount] = useState(0);
	return (
		<button type="button" onClick={() => setCount(count + 1)}>
			You clicked me {count} times
		</button>
	);
}

const ClockButton = () => {
	const [response, setResponse] = useState<string | null>(null);

	const handleClick = async () => {
		const res = await client.clock.$get();
		const data = res.ok ? (await res.json()).time : "Error fetching time";
		setResponse(data);
	};

	return (
		<div>
			<button type="button" onClick={handleClick}>
				Get Server Time
			</button>
			{response && <pre>{response}</pre>}
		</div>
	);
};

const root = createRoot(document.getElementById("root") ?? document.body);
root.render(<App />);
