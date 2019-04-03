import { cloneElement, useRef } from 'react';

import useUntabbable from './useUntabbable';

const Untabbable: React.FunctionComponent<Props> = (props) => {
    const { children, disabled, includeContainer } = props;

    const ref = useRef<HTMLElement>(null);

    useUntabbable(ref, { disabled, includeContainer });

    return cloneElement(children, { ref });
}

export interface Props {
    disabled?: boolean,
    includeContainer?: boolean,
    children: React.ReactElement,
}

export default Untabbable;
