import React, { Children, createRef, cloneElement, isValidElement } from 'react';
import useUntabbable from './useUntabbable';

import type { FC, RefObject } from 'react';
import type { Options } from './types';

const Untabbable: FC<Pick<Options, 'disabled'>> = (props) => {
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
