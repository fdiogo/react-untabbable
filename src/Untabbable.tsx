import React, { Children, createRef, FunctionComponent, cloneElement, isValidElement, ReactElement, ReactNode, RefObject } from 'react';
import useUntabbable from './useUntabbable';

import type { Options } from './types';

const Untabbable: FunctionComponent<Options> = (props) => {
    const { children, disabled, includeContainer } = props;

    const childrenAsArray = Children.toArray(children);

    const refs: Record<number, RefObject<HTMLElement>> = {};
    childrenAsArray.forEach((child, index) => {
        if (isValidElement(child)) {
            refs[index] = createRef<HTMLElement>();
        }
    });

    useUntabbable(Object.values(refs), { disabled, includeContainer });

    return (
        <>
            {childrenAsArray.map((child, index) => {
                if (isValidElement(child)) {
                    return cloneElement(child, { ref: refs[index] });
                }
        
                return child;
            })}
        </>
    );
}

export default Untabbable;
