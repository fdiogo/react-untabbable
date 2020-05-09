import React, { FC, createRef } from 'react';
import { render } from '@testing-library/react';

import useUntabbable from '../src/useUntabbable';

import type { RefObject } from 'react';
import type { Options } from '../src/types';

const mockTabbable = jest.fn();
jest.mock('tabbable', () => (...args: any[]) => {
    mockTabbable(...args);
    return [];
});

interface WrapperProps {
    inlineRef: RefObject<HTMLElement> | RefObject<HTMLElement>[];
    options?: Options;
}

const Wrapper: FC<WrapperProps> = (props) => {
    const { inlineRef, options, children } = props;

    useUntabbable(inlineRef, options);

    return <>{ children }</>;
}

describe('useUntabbable', () => {
    afterEach(() => {
        mockTabbable.mockClear();
    });

    it('should avoid calling tabbable if an empty collection of refs is provided', () => {
        const refs: RefObject<HTMLElement>[] = [];

        render(<Wrapper inlineRef={refs} />);

        expect(mockTabbable).not.toHaveBeenCalled();
    });

    it('should avoid calling tabbable on empty or null refs', () => {
        const elementRef = createRef<HTMLDivElement>();
        const refs: (RefObject<HTMLElement> | null)[] = [null, { current: null }, elementRef];

        render(
            <Wrapper inlineRef={refs as RefObject<HTMLElement>[]}>
                <div ref={elementRef} />
            </Wrapper>
        );

        expect(mockTabbable).toHaveBeenCalledTimes(1);
        expect(mockTabbable).toHaveBeenCalledWith(elementRef.current, expect.any(Object));
    });

    it('should avoid calling tabbable the same refs are provided', () => {
        const elementRef = createRef<HTMLDivElement>();

        const { rerender } = render(
            <Wrapper inlineRef={elementRef}>
                <div ref={elementRef} />
            </Wrapper>
        );

        rerender(
            <Wrapper inlineRef={elementRef}>
                <div ref={elementRef} />
            </Wrapper>
        );

        expect(mockTabbable).toHaveBeenCalledTimes(1);
    });
});