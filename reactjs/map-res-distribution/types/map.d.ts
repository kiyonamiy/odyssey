export const name: string;
export function showName(): string;
export class Star {
    constructor(name: string);
    say(): string;
}
export enum Gender {
    woman, 
    man
}
export interface Options {
    position?: 'TOP' | 'BOTTOM';
    data?: any;
}
export namespace declareNamespace {
    const name: string;
    namespace ns {
        function showNs(name: string): string;
    }
}