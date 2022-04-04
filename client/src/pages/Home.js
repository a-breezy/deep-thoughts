import React from "react";
// useQuery allows us to make request to graphql and make available to app
import { useQuery } from "@apollo/client";
import { QUERY_THOUGHTS, QUERY_ME_BASIC } from "../utils/queries";

import ThoughtList from "../components/ThoughtList";
import FriendList from "../components/FriendList";
import ThoughtForm from "../components/ThoughtForm";

import Auth from "../utils/auth";

const Home = () => {
	// useQuery hook makes query request
	const { loading, data } = useQuery(QUERY_THOUGHTS);

	// use object destructuring to extract 'data' from the 'useQuery' hook's response and rename it 'userData'
	const { data: userData } = useQuery(QUERY_ME_BASIC);

	// optional chaining -> negates need to check if object exists
	const thoughts = data?.thoughts || [];
	console.log(thoughts);

	const loggedIn = Auth.loggedIn();

	return (
		<main>
			<div className="flex-row justify-space-between">
				{loggedIn && (
					<div className="col-12 mb-3">
						<ThoughtForm />
					</div>
				)}
				<div className={`col-12 mb-3 ${loggedIn && "col-lg-8"}`}>
					{loading ? (
						<div>Loading...</div>
					) : (
						<ThoughtList
							thoughts={thoughts}
							title="Some Food for Thought(s)..."
						/>
					)}
				</div>
				{loggedIn && userData ? (
					<div className="col-12 col-lg-3 mb-3">
						<FriendList
							username={userData.me.username}
							friendCount={userData.me.friendCount}
							friends={userData.me.friends}
						/>
					</div>
				) : null}
			</div>
		</main>
	);
};

export default Home;
