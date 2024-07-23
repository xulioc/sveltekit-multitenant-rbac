import { writable, type Writable } from 'svelte/store';

export const loading: Writable<unknown> = writable(false);
