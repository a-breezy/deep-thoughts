import React from "react";
// useQuery allows us to make request to graphql and make available to app
import { useQuery } from "@apollo/client";
import { QUERY_THOUGHTS } from "../utils/queries";
import ThoughtList from "../components/ThoughtList";

const Home = () => {
	// useQuery hook makes query request
	const { loading, data } = useQuery(QUERY_THOUGHTS);
	// optional chaining -> negates need to check if object exists
	const thoughts = data?.thoughts || [];
	console.log(thoughts);

	return (
		<main>
			<div className="flex-row justify-space-between">
				<div className="col-12 mb-3">
					{loading ? (
						<div>Loading...</div>
					) : (
						<ThoughtList
							thoughts={thoughts}
							title="Some Food for Thought(s)..."
						/>
					)}
				</div>
			</div>
		</main>
	);
};

export default Home;
