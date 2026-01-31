
/**
 * Creates an element and returns it
 * @template {keyof HTMLElementTagNameMap} K 
 * @param {K} elementName 
 * @param {Partial<HTMLElementTagNameMap[K]>} properties 
 * @param {Array<Node>} children 
 * @param {object.<string, Array<function>>} eventListeners
 */
export function createElement(elementName, properties = {}, children = [], eventListeners = {}) {
  const element = document.createElement(elementName);
  Object.assign(element, properties);
  children.forEach(child => { element.appendChild(child) });
  Object.keys(eventListeners).forEach(eventType => {
    eventListeners[eventType].forEach(eventFunction => {
      element.addEventListener(eventType, eventFunction);
    });
  });
  return element;
}
