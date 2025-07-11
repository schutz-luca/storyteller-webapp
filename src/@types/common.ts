import { Dispatch, ReactNode, SetStateAction } from 'react';

export type StateSetter<T> = Dispatch<SetStateAction<T>>;

export interface State<T> {
    value: T;
    set: StateSetter<T>;
}

export interface Parent {
    children: ReactNode;
}
