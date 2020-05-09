import tabbable from "tabbable";
import { useEffect } from "react";

import type { RefObject } from 'react';
import type { Options } from "./types";

function useUntabbable(ref: RefObject<HTMLElement> | RefObject<HTMLElement>[], options: Options = {}) {
    const { disabled = false, includeContainer = true } = options;

    const refs = Array.isArray(ref) ? ref : [ref];

    useEffect(() => {
        if (disabled || refs.length === 0) {
            return;
        }

        const descriptors: { 
            element: HTMLElement,
            hadTabIndex: boolean;
            tabIndex: string | null
        }[] = [];

        for (const ref of refs) {
            if (!ref || !ref.current) {
                continue;
            }

            const tabbableElements = tabbable(ref.current, { includeContainer });

            tabbableElements.forEach(element => {
                descriptors.push({
                    element,
                    hadTabIndex: element.hasAttribute('tabindex'),
                    tabIndex: element.getAttribute('tabindex'),
                });

                element.setAttribute('tabindex', '-1')
            });
        }

        return () => {
            for (const descriptor of descriptors) {
                const { element, hadTabIndex, tabIndex } = descriptor;

                if (!hadTabIndex) {
                    element.removeAttribute('tabindex');
                } else {
                    element.setAttribute('tabindex', `${tabIndex}`);
                }
            }
        };
    }, [...refs, disabled, includeContainer]);
}

export default useUntabbable;
