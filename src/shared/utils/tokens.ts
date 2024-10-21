import Cookies from "js-cookie";

export enum EnumTokens {
	ACCESS_TOKEN = "accessToken",
	REFRESH_TOKEN = "refreshToken",
}

export const AuthServiceTokens = {
	saveAccessTokenToStorage: (refreshToken: string) => {
		Cookies.set(EnumTokens.REFRESH_TOKEN, refreshToken, {
			expires: import.meta.env.NODE_ENV === "production" ? 1 / 24 : 1,
			sameSite: "none",
			secure: true,
		});
	},

	getRefreshToken: () => Cookies.get(EnumTokens.REFRESH_TOKEN),
	getAccessToken: () => Cookies.get(EnumTokens.ACCESS_TOKEN),
	removerTokenFromStorage: () => {
		Cookies.remove(EnumTokens.REFRESH_TOKEN);
		Cookies.remove(EnumTokens.ACCESS_TOKEN);
	},

	logout: () => {
		AuthServiceTokens.removerTokenFromStorage();
		localStorage.removeItem("user");
	},
};
