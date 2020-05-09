import React from 'react';
import { render } from '@testing-library/react';

import Untabbable from '../src/Untabbable';

// We mock tabbable here since what we are really interested in
// testing is the toggling of the tabindex.
jest.mock('tabbable', () => (element, options) => {
    const tabbableElements = [];

    if(options.includeContainer) {
        tabbableElements.push(element);
    }

    tabbableElements.push(...element.children);

    return tabbableElements;
});

describe('Untabbable', () => {
    it('should set the focusable children with tabindex=-1', () => {
        const { container, getByText } = render(
            <Untabbable>
                <div>
                    <button>First</button>
                    <button>Second</button>
                </div>
            </Untabbable>
        );

        const firstButton = getByText('First');
        const secondButton = getByText('Second');

        expect(container.firstChild.getAttribute("tabindex")).not.toBe("-1");
        expect(firstButton.getAttribute("tabindex")).toBe("-1");
        expect(secondButton.getAttribute("tabindex")).toBe("-1");
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should work with multiple children', () => {
        const { container, getByText } = render(
            <Untabbable>
                <div>
                    <button>First</button>
                </div>
                <div>
                    <button>Second</button>
                </div>
            </Untabbable>
        );

        const firstButton = getByText('First');
        const secondButton = getByText('Second');

        const firstDiv = container.children.item(0);
        const secondDiv = container.children.item(1);

        expect(firstDiv.getAttribute("tabindex")).not.toBe("-1");
        expect(firstButton.getAttribute("tabindex")).toBe("-1");

        expect(secondDiv.getAttribute("tabindex")).not.toBe("-1");
        expect(secondButton.getAttribute("tabindex")).toBe("-1");
    });

    it('should restore the previous tabindex when disabled', () => {
        const { container, getByText } = render(
            <Untabbable>
                <div>
                    <button tabIndex="2">First</button>
                    <button>Second</button>
                </div>
            </Untabbable>
        );

        const firstButton = getByText('First');
        const secondButton = getByText('Second');

        expect(firstButton.getAttribute("tabindex")).toBe("-1");
        expect(secondButton.getAttribute("tabindex")).toBe("-1");

        render(
            <Untabbable disabled>
                <div>
                    <button tabIndex="2">First</button>
                    <button>Second</button>
                </div>
            </Untabbable>,
        { container });

        expect(firstButton.getAttribute("tabindex")).toBe("2");
        expect(secondButton.getAttribute("tabindex")).toBe(null);
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should also disable the container when `includeContainer` is true', () => {
        const { container, getByText } = render(
            <Untabbable includeContainer>
                <div>
                    <button>First</button>
                    <button>Second</button>
                </div>
            </Untabbable>
        );

        const firstButton = getByText('First');
        const secondButton = getByText('Second');

        expect(container.firstChild.getAttribute("tabindex")).toBe("-1");
        expect(firstButton.getAttribute("tabindex")).toBe("-1");
        expect(secondButton.getAttribute("tabindex")).toBe("-1");
        expect(container.firstChild).toMatchSnapshot();
    });

    it('should treat all direct children as containers', () => {
        const { container, getByText } = render(
            <Untabbable includeContainer>
                <div>
                    <button>First</button>
                </div>
                <div>
                    <button>Second</button>
                </div>
            </Untabbable>
        );

        const firstButton = getByText('First');
        const secondButton = getByText('Second');

        const firstDiv = container.children.item(0);
        const secondDiv = container.children.item(1);

        expect(firstDiv.getAttribute("tabindex")).toBe("-1");
        expect(firstButton.getAttribute("tabindex")).toBe("-1");
        
        expect(secondButton.getAttribute("tabindex")).toBe("-1");
        expect(secondDiv.getAttribute("tabindex")).toBe("-1");

        expect(container.firstChild).toMatchSnapshot();
    });

    it('should not only support elements but also any type of node', () => {
        const { container, getByText } = render(
            <Untabbable includeContainer>
                <div>
                    <button>First</button>
                </div>
                Hello!
                <div>
                    <button>Second</button>
                </div>
                {1}
                {false}
                {null}
            </Untabbable>
        );

        const firstButton = getByText('First');
        const secondButton = getByText('Second');

        const firstDiv = container.children.item(0);
        const secondDiv = container.children.item(1);

        expect(firstDiv.getAttribute("tabindex")).toBe("-1");
        expect(firstButton.getAttribute("tabindex")).toBe("-1");
        
        expect(secondButton.getAttribute("tabindex")).toBe("-1");
        expect(secondDiv.getAttribute("tabindex")).toBe("-1");

        expect(container.firstChild).toMatchSnapshot();
    });

    it('should not alter the tabindex when `disabled` is true', () => {
        const { container, getByText } = render(
            <Untabbable disabled>
                <div>
                    <button>First</button>
                    <button>Second</button>
                </div>
            </Untabbable>
        );

        const firstButton = getByText('First');
        const secondButton = getByText('Second');

        expect(container.firstChild.getAttribute("tabindex")).not.toBe("-1");
        expect(firstButton.getAttribute("tabindex")).not.toBe("-1");
        expect(secondButton.getAttribute("tabindex")).not.toBe("-1");
        expect(container.firstChild).toMatchSnapshot();
    });
});