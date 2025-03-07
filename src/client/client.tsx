import { hc } from "hono/client";
import { useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import type { AppType } from "src/server";
import type { Feed } from "src/server/feeds";


const client = hc<AppType>("/api");

function App() {
	return (
		<>
			<h1>Feed App</h1>

			<h2>Create Feed</h2>
			<CreateFeed />

			<h2>Show Feeds</h2>
			<ShowFeeds />

			<h2>Show Feed</h2>
			<ShowFeed />

			<h2>Delete Feed</h2>
			<DeleteFeed />
		</>
	);
}

const CreateFeed = () => {
	const [title, setTitle] = useState("");
	const [url, setUrl] = useState("");
	return (
		<form
			onSubmit={async (e) => {
				e.preventDefault();
				(
					await client.feeds.$post({
						form: {
							title: title,
							url: url,
						},
					})
				).url;
			}}
		>
			<label>
				Title:
				<input
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
			</label>
			<label>
				Feed URL:
				<input
					type="text"
					value={url}
					onChange={(e) => setUrl(e.target.value)}
				/>
			</label>
			<button type="submit">Create</button>
		</form>
	);
};

const ShowFeeds = () => {
	const [Feed, setFeed] = useState<Feed[]>([]);
	const onClick = async () => {
		const res = await client.feeds.$get();
		if (!res.ok) {
			setFeed([]);
			return;
		}
		setFeed(await res.json());
	};
	return (
		<>
			<button type="button" onClick={onClick}>
				Show Feed IDs
			</button>
			<ul>
				{Feed.map((n) => (
					<li key={n.id}>{JSON.stringify(n)}</li>
				))}
			</ul>
		</>
	);
};

const ShowFeed = () => {
	const [id, setId] = useState("");
	const [Feed, setFeed] = useState<Feed | undefined>(undefined);
	return (
		<form
			onSubmit={async (e) => {
				e.preventDefault();
				const res = await client.feeds[":id"].$get({
					param: { id },
				});
				if (!res.ok) {
					setFeed(undefined);
					return;
				}
				setFeed(await res.json());
			}}
		>
			<label>
				ID:
				<input
					type="number"
					value={id}
					onChange={(e) => setId(e.target.value)}
				/>
			</label>
			<button type="submit">Show</button>
			{Feed && <pre>{JSON.stringify(Feed, null, 2)}</pre>}
		</form>
	);
};

const DeleteFeed = () => {
	const [id, setId] = useState("");
	return (
		<form
			onSubmit={async (e) => {
				e.preventDefault();
				await client.feeds[":id"].$delete({
					param: { id },
				});
			}}
		>
			<label>
				ID:
				<input
					type="number"
					value={id}
					onChange={(e) => setId(e.target.value)}
				/>
			</label>
			<button type="submit">Delete</button>
		</form>
	);
};

const root = createRoot(document.getElementById("root") ?? document.body);
root.render(
	<BrowserRouter>
		<Routes>
      <Route index element={<App />} />
    </Routes>
	</BrowserRouter>
);
