import React, { Children, createRef, cloneElement, isValidElement } from 'react';
import useUntabbable from './useUntabbable';

import type { FC, RefObject } from 'react';

interface UntabbableProps {
    /**
     * Restores the tabbable behaviour.
     */
    disabled?: boolean;
}

const Untabbable: FC<UntabbableProps> = (props) => {
    const { children, disabled } = props;

    const childrenAsArray = Children.toArray(children);

    const refs: Record<number, RefObject<HTMLElement>> = {};
    childrenAsArray.forEach((child, index) => {
        if (isValidElement(child)) {
            refs[index] = createRef<HTMLElement>();
        }
    });

    useUntabbable(Object.values(refs), { disabled });

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
