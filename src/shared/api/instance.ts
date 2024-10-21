import axios from "axios";
import { AuthServiceTokens } from "../utils/tokens";

export const instance = axios.create({
	baseURL: import.meta.env.SERVER_URL,
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: true,
});

instance.interceptors.request.use(async (config) => {
	const token = await AuthServiceTokens.getAccessToken();
	if (config.headers && token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});
