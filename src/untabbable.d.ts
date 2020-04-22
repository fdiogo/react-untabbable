
export type Descriptor = {
    element: HTMLElement;
    hadTabindex: boolean;
    tabindex: string | null;
};

export type Options = {
    /** 
     * Disable the component and restore the tabbable behaviour.
     */
    disabled?: boolean,
    /**
     * If it should also disable the container received as a ref.
     */
    includeContainer?: boolean,
};