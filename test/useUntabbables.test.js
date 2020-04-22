import React from 'react';
import { render, cleanup } from 'react-testing-library';

import useUntabbables from '../src/useUntabbables';

afterEach(cleanup);

// We mock tabbable here since what we are really interested on
// testing is the toggling of the tabindex.
jest.mock('tabbable', () => (element, options) => {
    const tabbableElements = [];

    if (options.includeContainer) {
        tabbableElements.push(element);
    }

    tabbableElements.push(...element.children);

    return tabbableElements;
});

const HookWrapper = (props) => {
    const { children, targetRefs, options } = props;

    useUntabbables(targetRefs, options)

    return children;
};

const n = 5;

describe('useUntabbable', () => {
    it('should set the focusable children with tabindex=-1', () => {
        const refs = Array.from({ length: n }, () => React.createRef());

        const { container, getAllByText } = render(
            <HookWrapper targetRefs={refs}>
                {
                    refs.map((ref, i) => (
                        <div key={i} ref={ref}>
                            <button>First</button>
                            <button>Second</button>
                        </div>
                    ))
                }
            </HookWrapper>
        );

        const firstButtons = getAllByText('First');
        const secondButtons = getAllByText('Second');

        firstButtons.forEach((firstButton) => {
            expect(firstButton.getAttribute("tabindex")).toBe("-1");
        });

        secondButtons.forEach((secondButton) => {
            expect(secondButton.getAttribute("tabindex")).toBe("-1");
        });

        [...container.children].forEach(child => {
            expect(child.getAttribute("tabindex")).not.toBe("-1");
        });

        expect(container).toMatchSnapshot();
    });

    it('should restore the previous tabindex when disabled', () => {
        const refs = Array.from({ length: n }, () => React.createRef());

        const { container, getAllByText } = render(
            <HookWrapper targetRefs={refs}>
                {
                    refs.map((ref, i) => (
                        <div key={i} ref={ref}>
                            <button tabIndex="2">First</button>
                            <button>Second</button>
                        </div>
                    ))
                }
            </HookWrapper>
        );

        const firstButtons = getAllByText('First');
        const secondButtons = getAllByText('Second');

        firstButtons.forEach((firstButton) => {
            expect(firstButton.getAttribute("tabindex")).toBe("-1");
        });

        secondButtons.forEach((secondButton) => {
            expect(secondButton.getAttribute("tabindex")).toBe("-1");
        });

        render(
            <HookWrapper targetRefs={refs} options={{ disabled: true }}>
                {
                    refs.map((ref, i) => (
                        <div key={i} ref={ref}>
                            <button tabIndex="2">First</button>
                            <button>Second</button>
                        </div>
                    ))
                }
            </HookWrapper>,
            { container });

        firstButtons.forEach((firstButton) => {
            expect(firstButton.getAttribute("tabindex")).toBe("2");
        });

        secondButtons.forEach((secondButton) => {
            expect(secondButton.getAttribute("tabindex")).toBe(null);
        });

        expect(container).toMatchSnapshot();
    });

    it('should also disable the container when `includeContainer` is true', () => {
        const refs = Array.from({ length: n }, () => React.createRef());

        const { container, getAllByText } = render(
            <HookWrapper targetRefs={refs} options={{ includeContainer: true }}>
                {
                    refs.map((ref, i) => (
                        <div key={i} ref={ref}>
                            <button>First</button>
                            <button>Second</button>
                        </div>
                    ))
                }
            </HookWrapper>
        );

        const firstButtons = getAllByText('First');
        const secondButtons = getAllByText('Second');

        firstButtons.forEach((firstButton) => {
            expect(firstButton.getAttribute("tabindex")).toBe("-1");
        });

        secondButtons.forEach((secondButton) => {
            expect(secondButton.getAttribute("tabindex")).toBe("-1");
        });

        [...container.children].forEach(child => { expect(child.getAttribute("tabindex")).toBe("-1"); })
        expect(container).toMatchSnapshot();
    });

    it('should not alter the tabindex when `disabled` is true', () => {
        const refs = Array.from({ length: n }, () => React.createRef());

        const { container, getAllByText } = render(
            <HookWrapper targetRefs={refs} options={{ disabled: true }}>
                {
                    refs.map((ref, i) => (
                        <div key={i} ref={ref}>
                            <button>First</button>
                            <button>Second</button>
                        </div>
                    ))
                }
            </HookWrapper>
        );

        const firstButtons = getAllByText('First');
        const secondButtons = getAllByText('Second');


        firstButtons.forEach((firstButton) => {
            expect(firstButton.getAttribute("tabindex")).not.toBe("-1");
        });

        secondButtons.forEach((secondButton) => {
            expect(secondButton.getAttribute("tabindex")).not.toBe("-1");
        });

        [...container.children].forEach(child => { expect(child.getAttribute("tabindex")).not.toBe("-1"); })
        expect(container).toMatchSnapshot();
    });
});