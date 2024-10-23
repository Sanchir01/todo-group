import {
	type TypedUseSelectorHook,
	useDispatch,
	useSelector,
} from "react-redux";
import type { AppDispatch, RootState } from "~/app/store/store";

export const useRedux: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
