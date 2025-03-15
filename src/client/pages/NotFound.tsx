import { Link } from "react-router";

export const NotFound = () => {
	return (
		<>
			<h1>Not Found</h1>
			<div>
				<Link to="/">Home</Link>
			</div>
			<div>
				<Link to={"/feeds"}>Feeds</Link>
			</div>
			<div>
				<Link to={"/articles"}>Articles</Link>
			</div>
		</>
	);
};
