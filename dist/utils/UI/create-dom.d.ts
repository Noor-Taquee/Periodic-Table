/**
 * Creates an element and returns it
 * @template {keyof HTMLElementTagNameMap} K
 * @param {K} elementName
 * @param {Partial<HTMLElementTagNameMap[K]>} properties
 * @param {Array<Node>} children
 * @param {object.<string, Array<function>>} eventListeners
 */
export function createElement<K extends keyof HTMLElementTagNameMap>(elementName: K, properties?: Partial<HTMLElementTagNameMap[K]>, children?: Array<Node>, eventListeners?: object<string, Array<Function>>): HTMLElementTagNameMap[K];
//# sourceMappingURL=create-dom.d.ts.map