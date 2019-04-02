const tabbable = require("tabbable");
import { useEffect } from "react";

type Descriptor = {
	element: HTMLElement;
	hadTabindex: boolean;
	tabindex: string | null;
};

function setElementUntabbable(element: HTMLElement) : Descriptor {
	const descriptor = {
		element,
		hadTabindex: element.hasAttribute("tabindex"),
		tabindex: element.getAttribute("tabindex")
	};

	element.setAttribute("tabindex", "-1");

	return descriptor;
};

function restoreTabbable(descriptor: Descriptor) {
	const { element, hadTabindex, tabindex } = descriptor;

	if (!element) {
		return;
	}

	if (!hadTabindex) {
		element.removeAttribute("tabindex");
	} else {
		element.setAttribute("tabindex", `${tabindex}`);
	}
};

function useTabSkip(ref: React.MutableRefObject<HTMLElement>, enabled: boolean = true) {
	useEffect(() => {
		if (!enabled) {
			return;
		}

		const tabbableElements = tabbable(ref.current);
		const descriptors = tabbableElements.map(setElementUntabbable);

		return () => {
			descriptors.forEach(restoreTabbable);
		};
	}, [ref, enabled]);
};

export default useTabSkip;
