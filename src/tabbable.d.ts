type Options = {
    includeContainer?: boolean;
}

declare function tabbable(el: Element, options?: Options): HTMLElement[];

export default tabbable;