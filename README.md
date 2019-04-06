[![npm](https://img.shields.io/npm/v/react-untabbable.svg?color=green&style=flat-square)](https://www.npmjs.com/package/react-untabbable)

# react-untabbable
An extremely simple utility to make a container and all its children untabbable, but still focusable.
This can be useful in achieving a better accessibility for you components, like a menu with nested panels or the dreaded __carousel__ where you probably want some of the items to be untabbable.

## How does it work?
It quite simply applies the value __-1__ to the tabbable elements inside a container, restoring afterwards when needed.

* First it obtains all the tabbable elements within a container using the package [tabbable](https://github.com/davidtheclark/tabbable)
* A description of each element is saved with information of the tabindex
* All elements have their tabindex set to __-1__
* When needed, the previous value for the tabindex is restored to the respective elements

## How to use
You can either use the hook or the component itself, pick what better suits your needs. Both have the same API.

### Component
```jsx
import { Untabbable } from 'react-untabbable';

const options = { disabled: false, includeContainer: true };

<Untabbable { ...options } >
    <div tabIndex="0" className="container">
        <h1>All elements, including the container, are untabbable!</h1>
        <button>Try to focus me with your keyboard!</button>
        <button>You can still focus me though!</button>
    </div>
</Untabbable>
```

### Hook
```jsx
import React, { useRef } from 'react';
import { useUntabbable } from 'react-untabbable';

const MyComponent = () => {
    const containerRef = useRef();

    const options = { disabled: false, includeContainer: true };

    useUntabbable(containerRef, options);

    return (
        <div ref={ containerRef } tabIndex="0" className="container">
            <h1>All elements, including the container, are untabbable!</h1>
            <button>Try to focus me with your keyboard!</button>
            <button>You can still focus me though!</button>
        </div>
    )
};
```
