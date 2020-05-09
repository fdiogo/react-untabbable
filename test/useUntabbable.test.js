import React from 'react';
import { render, cleanup } from '@testing-library/react';

import useUntabbable from '../src/useUntabbable';

afterEach(cleanup);

// We mock tabbable here since what we are really interested on
// testing is the toggling of the tabindex.
jest.mock('tabbable', () => (element, options) => {
    const tabbableElements = [];

    if(options.includeContainer) {
        tabbableElements.push(element);
    }

    tabbableElements.push(...element.children);

    return tabbableElements;
});

const HookWrapper = (props) => {
    const { children, targetRef, options } = props;

    useUntabbable(targetRef, options)

    return children;
};

describe('useUntabbable', () => {
    it('should set the focusable children with tabindex=-1', () => {
        const ref = React.createRef();

        const { container, getByText } = render(
            <HookWrapper targetRef={ ref }>
                <div ref={ ref }>
                    <button>First</button>
                    <button>Second</button>
                </div>
            </HookWrapper>
        );

        const firstButton = getByText('First');
        const secondButton = getByText('Second');

        expect(container.firstChild.getAttribute("tabindex")).not.toBe("-1");
        expect(firstButton.getAttribute("tabindex")).toBe("-1");
        expect(secondButton.getAttribute("tabindex")).toBe("-1");
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should restore the previous tabindex when disabled', () => {
        const ref = React.createRef();

        const { container, getByText} = render(
            <HookWrapper targetRef={ ref }>
                <div ref={ ref }>
                    <button tabIndex="2">First</button>
                    <button>Second</button>
                </div>
            </HookWrapper>
        );

        const firstButton = getByText('First');
        const secondButton = getByText('Second');

        expect(firstButton.getAttribute("tabindex")).toBe("-1");
        expect(secondButton.getAttribute("tabindex")).toBe("-1");

        render(
            <HookWrapper targetRef={ ref } options={ { disabled: true } }>
                <div ref={ ref }>
                    <button tabIndex="2">First</button>
                    <button>Second</button>
                </div>
            </HookWrapper>,
        { container });

        expect(firstButton.getAttribute("tabindex")).toBe("2");
        expect(secondButton.getAttribute("tabindex")).toBe(null);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should also disable the container when `includeContainer` is true', () => {
        const ref = React.createRef();

        const { container, getByText } = render(
            <HookWrapper targetRef={ ref } options={ { includeContainer: true } }>
                <div ref={ ref }>
                    <button>First</button>
                    <button>Second</button>
                </div>
            </HookWrapper>
        );

        const firstButton = getByText('First');
        const secondButton = getByText('Second');

        expect(container.firstChild.getAttribute("tabindex")).toBe("-1");
        expect(firstButton.getAttribute("tabindex")).toBe("-1");
        expect(secondButton.getAttribute("tabindex")).toBe("-1");
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should not alter the tabindex when `disabled` is true', () => {
        const ref = React.createRef();

        const { container, getByText } = render(
            <HookWrapper targetRef={ ref } options={ { disabled: true } }>
                <div ref={ ref }>
                    <button>First</button>
                    <button>Second</button>
                </div>
            </HookWrapper>
        );

        const firstButton = getByText('First');
        const secondButton = getByText('Second');

        expect(container.firstChild.getAttribute("tabindex")).not.toBe("-1");
        expect(firstButton.getAttribute("tabindex")).not.toBe("-1");
        expect(secondButton.getAttribute("tabindex")).not.toBe("-1");
        expect(container.firstChild).toMatchSnapshot();
    });
});