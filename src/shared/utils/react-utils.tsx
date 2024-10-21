import { Children, createElement, isValidElement } from "react";

export function ComposeChildren({ children }: { children: React.ReactNode }) {
	const array = Children.toArray(children);
	const last = array.pop();
	return (
		<>
			{array.reduceRight(
				(child, element) =>
					isValidElement(element)
						? createElement(element.type, element.props, child)
						: child,
				last,
			)}
		</>
	);
}
