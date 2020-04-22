import tabbable from "tabbable";
import { Descriptor, Options } from './untabbable';
import { useEffect } from "react";

function createDescriptor(element: HTMLElement): Descriptor {
    return {
        element,
        hadTabindex: element.hasAttribute('tabindex'),
        tabindex: element.getAttribute('tabindex'),
    };
}

function setElementUntabbable(element: HTMLElement) {
    element.setAttribute('tabindex', '-1');
}

function restoreTabbable(descriptor: Descriptor) {
    const { element, hadTabindex, tabindex } = descriptor;

    if (!hadTabindex) {
        element.removeAttribute('tabindex');
    } else {
        element.setAttribute('tabindex', `${tabindex}`);
    }
}

function useUntabbable(ref: React.RefObject<HTMLElement>, options: Options = {}) {
    const { disabled = false, includeContainer = false } = options;

    useEffect(() => {
        if (disabled || !ref.current) {
            return;
        }

        const tabbableElements = tabbable(ref.current, { includeContainer });
        const descriptors = tabbableElements.map(createDescriptor);

        tabbableElements.forEach(setElementUntabbable);

        return () => {
            descriptors.forEach(restoreTabbable);
        };
    }, [ref, disabled, includeContainer]);
}

export default useUntabbable;
