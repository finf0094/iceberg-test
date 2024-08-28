// eslint-disable-next-line
type OptionalRecord<K extends keyof any, T> = {
    [P in K]?: T;
};

type DeepPartial<T> = T extends object
    ? {
        [P in keyof T]?: DeepPartial<T[P]>;
    }
    : T;

declare module '*.svg' {
    import * as React from 'react'

    export const ReactComponent: React.FunctionComponent<
        React.ComponentProps<'svg'> & { title?: string }
    >
    export default ReactComponent
}