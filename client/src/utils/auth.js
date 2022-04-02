import decode from "jwt-decode";

class AuthService {
	// retrieve data saved in token
	getProfile() {
		return decode(this.getToken());
	}

	// check in the user is still logged in
	loggedIn() {
		// checks if there is a saved and valid token
		const token = this.getToken();
		// use type coersion to check if token is NOT undefined or expired
		return !!token && !this.isTokenExpired(token);
	}

	// check if the token has expired
	isTokenExpired(token) {
		try {
			const decoded = decode(token);
			if (decoded.exp < Date.now() / 1000) {
				return true;
			} else {
				return false;
			}
		} catch (err) {
			return false;
		}
	}

	// retrieve token from localStorage
	getToken() {
		// retrieves teh user token from localStorage
		return localStorage.getItem("id_token");
	}

	// set token to localStorage and reload page to homepage
	login(idToken) {
		// saves user token to localStorage
		localStorage.setItem("id_token", idToken);

		window.location.assign("/");
	}

	// clear token from localStorage and force logout with reload
	logout() {
		// clear user token andnprofile data from localStorage
		localStorage.removeItem("id_token");
		// this will reload the page and reset the state of the app
		window.location.assign("/");
	}
}

export default new AuthService();
