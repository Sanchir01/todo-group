import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "~/index.css";
import "~/App.css";
import Providers from "~/app/Providers";
import { RouterProvider } from "react-router-dom";
import { router } from "~/shared/routes";

const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);

root.render(
	<StrictMode>
		<Providers>
			<RouterProvider router={router} />
		</Providers>
	</StrictMode>,
);
