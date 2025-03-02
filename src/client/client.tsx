import { hc } from "hono/client";
import { useState } from "react";
import { createRoot } from "react-dom/client";
import type { AppType } from "../server/note";
import type { Note } from "../server/note";

const client = hc<AppType>("/api");

function App() {
	return (
		<>
			<h1>Note App</h1>

			<h2>Create Note</h2>
			<CreateNote />

			<h2>Show Notes</h2>
			<ShowNotes />

			<h2>Show Note</h2>
			<ShowNote />

			<h2>Delete Note</h2>
			<DeleteNote />
		</>
	);
}

const CreateNote = () => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	return (
		<form
			onSubmit={async (e) => {
				e.preventDefault();
				(
					await client.notes.$post({
						form: {
							title: title,
							content: content,
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
				Content:
				<input
					type="text"
					value={content}
					onChange={(e) => setContent(e.target.value)}
				/>
			</label>
			<button type="submit">Create</button>
		</form>
	);
};

const ShowNotes = () => {
	const [note, setNote] = useState<Note[]>([]);
	const onClick = async () => {
		const res = await (await client.notes.$get()).json();
		setNote(res);
	};
	return (
		<>
			<button type="button" onClick={onClick}>
				Show Note IDs
			</button>
			<ul>
				{note.map((n) => (
					<li key={n.id}>{JSON.stringify(n)}</li>
				))}
			</ul>
		</>
	);
};

const ShowNote = () => {
	const [id, setId] = useState("");
	const [note, setNote] = useState<Note | undefined>(undefined);
	return (
		<form
			onSubmit={async (e) => {
				e.preventDefault();
				const res = await client.notes[":id"].$get({
					param: { id },
				});
				if (res.status === 404) {
					const data = await res.json();
					setNote(undefined);
					return;
				}
				setNote(await res.json());
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
			{note && <pre>{JSON.stringify(note, null, 2)}</pre>}
		</form>
	);
};

const DeleteNote = () => {
	const [id, setId] = useState("");
	return (
		<form
			onSubmit={async (e) => {
				e.preventDefault();
				await client.notes[":id"].$delete({
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
root.render(<App />);
