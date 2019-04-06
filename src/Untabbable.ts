import { cloneElement, useRef } from 'react';

import useUntabbable from './useUntabbable';

const Untabbable: React.FunctionComponent<Props> = (props) => {
    const { children, disabled, includeContainer } = props;

    const ref = useRef<HTMLElement>(null);

    useUntabbable(ref, { disabled, includeContainer });

    return cloneElement(children, { ref });
}

export interface Props {
    /** 
     * Disable the component and restore the tabbable behaviour.
     * This is usually preferable to remove the component from tree
     * as it would trigger a re-render.
     */
    disabled?: boolean,
    /**
     * If it should also make the container that it wraps untabbable.
     */
    includeContainer?: boolean,
    children: React.ReactElement,
}

export default Untabbable;
