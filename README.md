[![npm](https://img.shields.io/npm/v/react-untabbable.svg?color=green&style=flat-square)](https://www.npmjs.com/package/react-untabbable)

# react-untabbable
An extremely simple utility to make a container and all its children untabbable, but still focusable.
This can be useful in achieving a better accessibility for you components, like a menu with nested panels or the dreaded __carousel__ where you probably want some of the items to be untabbable.

## How does it work?
It quite simply applies the value __-1__ to the tabbable elements inside a container, restoring afterwards when needed.

* First it obtains all the tabbable elements within a container using the package [tabbable](https://github.com/davidtheclark/tabbable)
* The current tabindex of each element is saved
* All focusable elements have their tabindex set to __-1__
* When needed, the previous value for the tabindex is restored to the respective elements

## How to use
You can either use the hook or the component itself, pick what better suits your needs. Both have the same API.

### Component

| Prop            | Type      | Default | Description                     |
|-----------------|-----------|---------|---------------------------------|
| disabled        | `boolean` | `false` | Restores the tabbable behaviour |

```jsx
import { Untabbable } from 'react-untabbable';

<Untabbable>
    <button>Can't click me 😢</button>
    You can mix react elements and simple nodes! (string, number, etc...)
    <div>
        <button>Can't click me as well 😭</button>
    </div>
</Untabbable>
```

### Hook

| Parameter                | Type          | Default | Description                                       |
|--------------------------|---------------|---------|---------------------------------------------------|
| ref                      | `ref | ref[]` |         | One or more refs to DOM elements                  |
| options?                 | `object`      | `{}`    |                                                   |
| options.disabled         | `boolean`     | `false` | Restores the tabbable behaviour                   |
| options.includeContainer | `boolean`     | `true`  | If the owner of the ref should also be untabbable |


```jsx
import React, { useRef } from 'react';
import { useUntabbable } from 'react-untabbable';

const MyComponent = () => {
    const firstButtonRef = useRef();
    const secondButtonRef = useRef();

    return (
        <button ref={firstButtonRef}>
            Can't click me 😢
        </button>
        <div>
            <button ref={secondButtonRef}>Can't click me as well 😭</button>
        </div>
    );
};
```
