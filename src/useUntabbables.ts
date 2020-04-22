import { Options } from './untabbable';
import useUntabbable from './useUntabbable';

function useUntabbables(refs: [React.RefObject<HTMLElement>], options: Options = {}) {
    refs.forEach(ref => { useUntabbable(ref, options) });
}

export default useUntabbables;
