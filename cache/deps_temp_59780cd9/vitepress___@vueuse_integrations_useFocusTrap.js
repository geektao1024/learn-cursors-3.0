// node_modules/.pnpm/@vueuse+integrations@11.3.0_async-validator@4.2.5_focus-trap@7.6.2_nprogress@0.2.0_vue@3.5.13_typescript@5.7.2_/node_modules/@vueuse/integrations/useFocusTrap.mjs
import { tryOnScopeDispose, unrefElement } from '@vueuse/core'
import {
  computed,
  ref,
  watch,
} from './chunk-25XHAMRR.js'

import {
  notNullish,
  toValue,
} from './chunk-ZLJHL63T.js'

// node_modules/.pnpm/tabbable@6.2.0/node_modules/tabbable/dist/index.esm.js
const candidateSelectors = ['input:not([inert])', 'select:not([inert])', 'textarea:not([inert])', 'a[href]:not([inert])', 'button:not([inert])', '[tabindex]:not(slot):not([inert])', 'audio[controls]:not([inert])', 'video[controls]:not([inert])', '[contenteditable]:not([contenteditable="false"]):not([inert])', 'details>summary:first-of-type:not([inert])', 'details:not([inert])']
const candidateSelector = candidateSelectors.join(',')
const NoElement = typeof Element === 'undefined'
const matches = NoElement
  ? function () {
  }
  : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector
const getRootNode = !NoElement && Element.prototype.getRootNode
  ? function (element) {
    let _element$getRootNode
    return element === null || element === void 0 ? void 0 : (_element$getRootNode = element.getRootNode) === null || _element$getRootNode === void 0 ? void 0 : _element$getRootNode.call(element)
  }
  : function (element) {
    return element === null || element === void 0 ? void 0 : element.ownerDocument
  }
const isInert = function isInert2(node, lookUp) {
  let _node$getAttribute
  if (lookUp === void 0) {
    lookUp = true
  }
  const inertAtt = node === null || node === void 0 ? void 0 : (_node$getAttribute = node.getAttribute) === null || _node$getAttribute === void 0 ? void 0 : _node$getAttribute.call(node, 'inert')
  const inert = inertAtt === '' || inertAtt === 'true'
  const result = inert || lookUp && node && isInert2(node.parentNode)
  return result
}
const isContentEditable = function isContentEditable2(node) {
  let _node$getAttribute2
  const attValue = node === null || node === void 0 ? void 0 : (_node$getAttribute2 = node.getAttribute) === null || _node$getAttribute2 === void 0 ? void 0 : _node$getAttribute2.call(node, 'contenteditable')
  return attValue === '' || attValue === 'true'
}
const getCandidates = function getCandidates2(el, includeContainer, filter) {
  if (isInert(el)) {
    return []
  }
  let candidates = Array.prototype.slice.apply(el.querySelectorAll(candidateSelector))
  if (includeContainer && matches.call(el, candidateSelector)) {
    candidates.unshift(el)
  }
  candidates = candidates.filter(filter)
  return candidates
}
const getCandidatesIteratively = function getCandidatesIteratively2(elements, includeContainer, options) {
  const candidates = []
  const elementsToCheck = Array.from(elements)
  while (elementsToCheck.length) {
    const element = elementsToCheck.shift()
    if (isInert(element, false)) {
      continue
    }
    if (element.tagName === 'SLOT') {
      const assigned = element.assignedElements()
      const content = assigned.length ? assigned : element.children
      const nestedCandidates = getCandidatesIteratively2(content, true, options)
      if (options.flatten) {
        candidates.push.apply(candidates, nestedCandidates)
      }
      else {
        candidates.push({
          scopeParent: element,
          candidates: nestedCandidates,
        })
      }
    }
    else {
      const validCandidate = matches.call(element, candidateSelector)
      if (validCandidate && options.filter(element) && (includeContainer || !elements.includes(element))) {
        candidates.push(element)
      }
      const shadowRoot = element.shadowRoot // check for an undisclosed shadow
        || typeof options.getShadowRoot === 'function' && options.getShadowRoot(element)
      const validShadowRoot = !isInert(shadowRoot, false) && (!options.shadowRootFilter || options.shadowRootFilter(element))
      if (shadowRoot && validShadowRoot) {
        const _nestedCandidates = getCandidatesIteratively2(shadowRoot === true ? element.children : shadowRoot.children, true, options)
        if (options.flatten) {
          candidates.push.apply(candidates, _nestedCandidates)
        }
        else {
          candidates.push({
            scopeParent: element,
            candidates: _nestedCandidates,
          })
        }
      }
      else {
        elementsToCheck.unshift.apply(elementsToCheck, element.children)
      }
    }
  }
  return candidates
}
const hasTabIndex = function hasTabIndex2(node) {
  return !isNaN(Number.parseInt(node.getAttribute('tabindex'), 10))
}
const getTabIndex = function getTabIndex2(node) {
  if (!node) {
    throw new Error('No node provided')
  }
  if (node.tabIndex < 0) {
    if ((/^(AUDIO|VIDEO|DETAILS)$/.test(node.tagName) || isContentEditable(node)) && !hasTabIndex(node)) {
      return 0
    }
  }
  return node.tabIndex
}
const getSortOrderTabIndex = function getSortOrderTabIndex2(node, isScope) {
  const tabIndex = getTabIndex(node)
  if (tabIndex < 0 && isScope && !hasTabIndex(node)) {
    return 0
  }
  return tabIndex
}
const sortOrderedTabbables = function sortOrderedTabbables2(a, b) {
  return a.tabIndex === b.tabIndex ? a.documentOrder - b.documentOrder : a.tabIndex - b.tabIndex
}
const isInput = function isInput2(node) {
  return node.tagName === 'INPUT'
}
const isHiddenInput = function isHiddenInput2(node) {
  return isInput(node) && node.type === 'hidden'
}
const isDetailsWithSummary = function isDetailsWithSummary2(node) {
  const r = node.tagName === 'DETAILS' && Array.prototype.slice.apply(node.children).some((child) => {
    return child.tagName === 'SUMMARY'
  })
  return r
}
const getCheckedRadio = function getCheckedRadio2(nodes, form) {
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].checked && nodes[i].form === form) {
      return nodes[i]
    }
  }
}
const isTabbableRadio = function isTabbableRadio2(node) {
  if (!node.name) {
    return true
  }
  const radioScope = node.form || getRootNode(node)
  const queryRadios = function queryRadios2(name) {
    return radioScope.querySelectorAll(`input[type="radio"][name="${name}"]`)
  }
  let radioSet
  if (typeof window !== 'undefined' && typeof window.CSS !== 'undefined' && typeof window.CSS.escape === 'function') {
    radioSet = queryRadios(window.CSS.escape(node.name))
  }
  else {
    try {
      radioSet = queryRadios(node.name)
    }
    catch (err) {
      console.error('Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s', err.message)
      return false
    }
  }
  const checked = getCheckedRadio(radioSet, node.form)
  return !checked || checked === node
}
const isRadio = function isRadio2(node) {
  return isInput(node) && node.type === 'radio'
}
const isNonTabbableRadio = function isNonTabbableRadio2(node) {
  return isRadio(node) && !isTabbableRadio(node)
}
const isNodeAttached = function isNodeAttached2(node) {
  let _nodeRoot
  let nodeRoot = node && getRootNode(node)
  let nodeRootHost = (_nodeRoot = nodeRoot) === null || _nodeRoot === void 0 ? void 0 : _nodeRoot.host
  let attached = false
  if (nodeRoot && nodeRoot !== node) {
    let _nodeRootHost, _nodeRootHost$ownerDo, _node$ownerDocument
    attached = !!((_nodeRootHost = nodeRootHost) !== null && _nodeRootHost !== void 0 && (_nodeRootHost$ownerDo = _nodeRootHost.ownerDocument) !== null && _nodeRootHost$ownerDo !== void 0 && _nodeRootHost$ownerDo.contains(nodeRootHost) || node !== null && node !== void 0 && (_node$ownerDocument = node.ownerDocument) !== null && _node$ownerDocument !== void 0 && _node$ownerDocument.contains(node))
    while (!attached && nodeRootHost) {
      var _nodeRoot2, _nodeRootHost2, _nodeRootHost2$ownerD
      nodeRoot = getRootNode(nodeRootHost)
      nodeRootHost = (_nodeRoot2 = nodeRoot) === null || _nodeRoot2 === void 0 ? void 0 : _nodeRoot2.host
      attached = !!((_nodeRootHost2 = nodeRootHost) !== null && _nodeRootHost2 !== void 0 && (_nodeRootHost2$ownerD = _nodeRootHost2.ownerDocument) !== null && _nodeRootHost2$ownerD !== void 0 && _nodeRootHost2$ownerD.contains(nodeRootHost))
    }
  }
  return attached
}
const isZeroArea = function isZeroArea2(node) {
  const _node$getBoundingClie = node.getBoundingClientRect(); const width = _node$getBoundingClie.width; const height = _node$getBoundingClie.height
  return width === 0 && height === 0
}
const isHidden = function isHidden2(node, _ref) {
  const displayCheck = _ref.displayCheck; const getShadowRoot = _ref.getShadowRoot
  if (getComputedStyle(node).visibility === 'hidden') {
    return true
  }
  const isDirectSummary = matches.call(node, 'details>summary:first-of-type')
  const nodeUnderDetails = isDirectSummary ? node.parentElement : node
  if (matches.call(nodeUnderDetails, 'details:not([open]) *')) {
    return true
  }
  if (!displayCheck || displayCheck === 'full' || displayCheck === 'legacy-full') {
    if (typeof getShadowRoot === 'function') {
      const originalNode = node
      while (node) {
        const parentElement = node.parentElement
        const rootNode = getRootNode(node)
        if (parentElement && !parentElement.shadowRoot && getShadowRoot(parentElement) === true) {
          return isZeroArea(node)
        }
        else if (node.assignedSlot) {
          node = node.assignedSlot
        }
        else if (!parentElement && rootNode !== node.ownerDocument) {
          node = rootNode.host
        }
        else {
          node = parentElement
        }
      }
      node = originalNode
    }
    if (isNodeAttached(node)) {
      return !node.getClientRects().length
    }
    if (displayCheck !== 'legacy-full') {
      return true
    }
  }
  else if (displayCheck === 'non-zero-area') {
    return isZeroArea(node)
  }
  return false
}
const isDisabledFromFieldset = function isDisabledFromFieldset2(node) {
  if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(node.tagName)) {
    let parentNode = node.parentElement
    while (parentNode) {
      if (parentNode.tagName === 'FIELDSET' && parentNode.disabled) {
        for (let i = 0; i < parentNode.children.length; i++) {
          const child = parentNode.children.item(i)
          if (child.tagName === 'LEGEND') {
            return matches.call(parentNode, 'fieldset[disabled] *') ? true : !child.contains(node)
          }
        }
        return true
      }
      parentNode = parentNode.parentElement
    }
  }
  return false
}
const isNodeMatchingSelectorFocusable = function isNodeMatchingSelectorFocusable2(options, node) {
  if (node.disabled // we must do an inert look up to filter out any elements inside an inert ancestor
  //  because we're limited in the type of selectors we can use in JSDom (see related
  //  note related to `candidateSelectors`)
    || isInert(node) || isHiddenInput(node) || isHidden(node, options) // For a details element with a summary, the summary element gets the focus
    || isDetailsWithSummary(node) || isDisabledFromFieldset(node)) {
    return false
  }
  return true
}
const isNodeMatchingSelectorTabbable = function isNodeMatchingSelectorTabbable2(options, node) {
  if (isNonTabbableRadio(node) || getTabIndex(node) < 0 || !isNodeMatchingSelectorFocusable(options, node)) {
    return false
  }
  return true
}
const isValidShadowRootTabbable = function isValidShadowRootTabbable2(shadowHostNode) {
  const tabIndex = Number.parseInt(shadowHostNode.getAttribute('tabindex'), 10)
  if (isNaN(tabIndex) || tabIndex >= 0) {
    return true
  }
  return false
}
const sortByOrder = function sortByOrder2(candidates) {
  const regularTabbables = []
  const orderedTabbables = []
  candidates.forEach((item, i) => {
    const isScope = !!item.scopeParent
    const element = isScope ? item.scopeParent : item
    const candidateTabindex = getSortOrderTabIndex(element, isScope)
    const elements = isScope ? sortByOrder2(item.candidates) : element
    if (candidateTabindex === 0) {
      isScope ? regularTabbables.push.apply(regularTabbables, elements) : regularTabbables.push(element)
    }
    else {
      orderedTabbables.push({
        documentOrder: i,
        tabIndex: candidateTabindex,
        item,
        isScope,
        content: elements,
      })
    }
  })
  return orderedTabbables.sort(sortOrderedTabbables).reduce((acc, sortable) => {
    sortable.isScope ? acc.push.apply(acc, sortable.content) : acc.push(sortable.content)
    return acc
  }, []).concat(regularTabbables)
}
const tabbable = function tabbable2(container, options) {
  options = options || {}
  let candidates
  if (options.getShadowRoot) {
    candidates = getCandidatesIteratively([container], options.includeContainer, {
      filter: isNodeMatchingSelectorTabbable.bind(null, options),
      flatten: false,
      getShadowRoot: options.getShadowRoot,
      shadowRootFilter: isValidShadowRootTabbable,
    })
  }
  else {
    candidates = getCandidates(container, options.includeContainer, isNodeMatchingSelectorTabbable.bind(null, options))
  }
  return sortByOrder(candidates)
}
const focusable = function focusable2(container, options) {
  options = options || {}
  let candidates
  if (options.getShadowRoot) {
    candidates = getCandidatesIteratively([container], options.includeContainer, {
      filter: isNodeMatchingSelectorFocusable.bind(null, options),
      flatten: true,
      getShadowRoot: options.getShadowRoot,
    })
  }
  else {
    candidates = getCandidates(container, options.includeContainer, isNodeMatchingSelectorFocusable.bind(null, options))
  }
  return candidates
}
const isTabbable = function isTabbable2(node, options) {
  options = options || {}
  if (!node) {
    throw new Error('No node provided')
  }
  if (matches.call(node, candidateSelector) === false) {
    return false
  }
  return isNodeMatchingSelectorTabbable(options, node)
}
const focusableCandidateSelector = candidateSelectors.concat('iframe').join(',')
const isFocusable = function isFocusable2(node, options) {
  options = options || {}
  if (!node) {
    throw new Error('No node provided')
  }
  if (matches.call(node, focusableCandidateSelector) === false) {
    return false
  }
  return isNodeMatchingSelectorFocusable(options, node)
}

// node_modules/.pnpm/focus-trap@7.6.2/node_modules/focus-trap/dist/focus-trap.esm.js
function _arrayLikeToArray(r, a) {
  (a == null || a > r.length) && (a = r.length)
  for (var e = 0, n = new Array(a); e < a; e++) n[e] = r[e]
  return n
}
function _arrayWithoutHoles(r) {
  if (Array.isArray(r))
    return _arrayLikeToArray(r)
}
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e
    ? Object.defineProperty(e, r, {
        value: t,
        enumerable: true,
        configurable: true,
        writable: true,
      })
    : e[r] = t, e
}
function _iterableToArray(r) {
  if (typeof Symbol != 'undefined' && r[Symbol.iterator] != null || r['@@iterator'] != null)
    return Array.from(r)
}
function _nonIterableSpread() {
  throw new TypeError('Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.')
}
function ownKeys(e, r) {
  const t = Object.keys(e)
  if (Object.getOwnPropertySymbols) {
    let o = Object.getOwnPropertySymbols(e)
    r && (o = o.filter((r2) => {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable
    })), t.push.apply(t, o)
  }
  return t
}
function _objectSpread2(e) {
  for (let r = 1; r < arguments.length; r++) {
    var t = arguments[r] != null ? arguments[r] : {}
    r % 2
      ? ownKeys(new Object(t), true).forEach((r2) => {
          _defineProperty(e, r2, t[r2])
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t))
        : ownKeys(new Object(t)).forEach((r2) => {
            Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2))
          })
  }
  return e
}
function _toConsumableArray(r) {
  return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread()
}
function _toPrimitive(t, r) {
  if (typeof t != 'object' || !t)
    return t
  const e = t[Symbol.toPrimitive]
  if (void 0 !== e) {
    const i = e.call(t, r || 'default')
    if (typeof i != 'object')
      return i
    throw new TypeError('@@toPrimitive must return a primitive value.')
  }
  return (r === 'string' ? String : Number)(t)
}
function _toPropertyKey(t) {
  const i = _toPrimitive(t, 'string')
  return typeof i == 'symbol' ? i : `${i}`
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if (typeof r == 'string')
      return _arrayLikeToArray(r, a)
    let t = {}.toString.call(r).slice(8, -1)
    return t === 'Object' && r.constructor && (t = r.constructor.name), t === 'Map' || t === 'Set' ? Array.from(r) : t === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0
  }
}
const activeFocusTraps = {
  activateTrap: function activateTrap(trapStack, trap) {
    if (trapStack.length > 0) {
      const activeTrap = trapStack[trapStack.length - 1]
      if (activeTrap !== trap) {
        activeTrap.pause()
      }
    }
    const trapIndex = trapStack.indexOf(trap)
    if (trapIndex === -1) {
      trapStack.push(trap)
    }
    else {
      trapStack.splice(trapIndex, 1)
      trapStack.push(trap)
    }
  },
  deactivateTrap: function deactivateTrap(trapStack, trap) {
    const trapIndex = trapStack.indexOf(trap)
    if (trapIndex !== -1) {
      trapStack.splice(trapIndex, 1)
    }
    if (trapStack.length > 0) {
      trapStack[trapStack.length - 1].unpause()
    }
  },
}
const isSelectableInput = function isSelectableInput2(node) {
  return node.tagName && node.tagName.toLowerCase() === 'input' && typeof node.select === 'function'
}
const isEscapeEvent = function isEscapeEvent2(e) {
  return (e === null || e === void 0 ? void 0 : e.key) === 'Escape' || (e === null || e === void 0 ? void 0 : e.key) === 'Esc' || (e === null || e === void 0 ? void 0 : e.keyCode) === 27
}
const isTabEvent = function isTabEvent2(e) {
  return (e === null || e === void 0 ? void 0 : e.key) === 'Tab' || (e === null || e === void 0 ? void 0 : e.keyCode) === 9
}
const isKeyForward = function isKeyForward2(e) {
  return isTabEvent(e) && !e.shiftKey
}
const isKeyBackward = function isKeyBackward2(e) {
  return isTabEvent(e) && e.shiftKey
}
const delay = function delay2(fn) {
  return setTimeout(fn, 0)
}
const valueOrHandler = function valueOrHandler2(value) {
  for (var _len = arguments.length, params = Array.from({ length: _len > 1 ? _len - 1 : 0 }), _key = 1; _key < _len; _key++) {
    params[_key - 1] = arguments[_key]
  }
  return typeof value === 'function' ? value.apply(void 0, params) : value
}
const getActualTarget = function getActualTarget2(event) {
  return event.target.shadowRoot && typeof event.composedPath === 'function' ? event.composedPath()[0] : event.target
}
const internalTrapStack = []
const createFocusTrap = function createFocusTrap2(elements, userOptions) {
  const doc = (userOptions === null || userOptions === void 0 ? void 0 : userOptions.document) || document
  const trapStack = (userOptions === null || userOptions === void 0 ? void 0 : userOptions.trapStack) || internalTrapStack
  const config = _objectSpread2({
    returnFocusOnDeactivate: true,
    escapeDeactivates: true,
    delayInitialFocus: true,
    isKeyForward,
    isKeyBackward,
  }, userOptions)
  const state = {
    // containers given to createFocusTrap()
    // @type {Array<HTMLElement>}
    containers: [],
    // list of objects identifying tabbable nodes in `containers` in the trap
    // NOTE: it's possible that a group has no tabbable nodes if nodes get removed while the trap
    //  is active, but the trap should never get to a state where there isn't at least one group
    //  with at least one tabbable node in it (that would lead to an error condition that would
    //  result in an error being thrown)
    // @type {Array<{
    //   container: HTMLElement,
    //   tabbableNodes: Array<HTMLElement>, // empty if none
    //   focusableNodes: Array<HTMLElement>, // empty if none
    //   posTabIndexesFound: boolean,
    //   firstTabbableNode: HTMLElement|undefined,
    //   lastTabbableNode: HTMLElement|undefined,
    //   firstDomTabbableNode: HTMLElement|undefined,
    //   lastDomTabbableNode: HTMLElement|undefined,
    //   nextTabbableNode: (node: HTMLElement, forward: boolean) => HTMLElement|undefined
    // }>}
    containerGroups: [],
    // same order/length as `containers` list
    // references to objects in `containerGroups`, but only those that actually have
    //  tabbable nodes in them
    // NOTE: same order as `containers` and `containerGroups`, but __not necessarily__
    //  the same length
    tabbableGroups: [],
    nodeFocusedBeforeActivation: null,
    mostRecentlyFocusedNode: null,
    active: false,
    paused: false,
    // timer ID for when delayInitialFocus is true and initial focus in this trap
    //  has been delayed during activation
    delayInitialFocusTimer: void 0,
    // the most recent KeyboardEvent for the configured nav key (typically [SHIFT+]TAB), if any
    recentNavEvent: void 0,
  }
  let trap
  const getOption = function getOption2(configOverrideOptions, optionName, configOptionName) {
    return configOverrideOptions && configOverrideOptions[optionName] !== void 0 ? configOverrideOptions[optionName] : config[configOptionName || optionName]
  }
  const findContainerIndex = function findContainerIndex2(element, event) {
    const composedPath = typeof (event === null || event === void 0 ? void 0 : event.composedPath) === 'function' ? event.composedPath() : void 0
    return state.containerGroups.findIndex((_ref) => {
      const container = _ref.container; const tabbableNodes = _ref.tabbableNodes
      return container.contains(element) // fall back to explicit tabbable search which will take into consideration any
      //  web components if the `tabbableOptions.getShadowRoot` option was used for
      //  the trap, enabling shadow DOM support in tabbable (`Node.contains()` doesn't
      //  look inside web components even if open)
        || (composedPath === null || composedPath === void 0 ? void 0 : composedPath.includes(container)) || tabbableNodes.find((node) => {
        return node === element
      })
    })
  }
  const getNodeForOption = function getNodeForOption2(optionName) {
    const _ref2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}; const _ref2$hasFallback = _ref2.hasFallback; const hasFallback = _ref2$hasFallback === void 0 ? false : _ref2$hasFallback; const _ref2$params = _ref2.params; const params = _ref2$params === void 0 ? [] : _ref2$params
    let optionValue = config[optionName]
    if (typeof optionValue === 'function') {
      optionValue = optionValue.apply(void 0, _toConsumableArray(params))
    }
    if (optionValue === true) {
      optionValue = void 0
    }
    if (!optionValue) {
      if (optionValue === void 0 || optionValue === false) {
        return optionValue
      }
      throw new Error('`'.concat(optionName, '` was specified but was not a node, or did not return a node'))
    }
    let node = optionValue
    if (typeof optionValue === 'string') {
      try {
        node = doc.querySelector(optionValue)
      }
      catch (err) {
        throw new Error('`'.concat(optionName, '` appears to be an invalid selector; error="').concat(err.message, '"'))
      }
      if (!node) {
        if (!hasFallback) {
          throw new Error('`'.concat(optionName, '` as selector refers to no known node'))
        }
      }
    }
    return node
  }
  const getInitialFocusNode = function getInitialFocusNode2() {
    let node = getNodeForOption('initialFocus', {
      hasFallback: true,
    })
    if (node === false) {
      return false
    }
    if (node === void 0 || node && !isFocusable(node, config.tabbableOptions)) {
      if (findContainerIndex(doc.activeElement) >= 0) {
        node = doc.activeElement
      }
      else {
        const firstTabbableGroup = state.tabbableGroups[0]
        const firstTabbableNode = firstTabbableGroup && firstTabbableGroup.firstTabbableNode
        node = firstTabbableNode || getNodeForOption('fallbackFocus')
      }
    }
    else if (node === null) {
      node = getNodeForOption('fallbackFocus')
    }
    if (!node) {
      throw new Error('Your focus-trap needs to have at least one focusable element')
    }
    return node
  }
  const updateTabbableNodes = function updateTabbableNodes2() {
    state.containerGroups = state.containers.map((container) => {
      const tabbableNodes = tabbable(container, config.tabbableOptions)
      const focusableNodes = focusable(container, config.tabbableOptions)
      const firstTabbableNode = tabbableNodes.length > 0 ? tabbableNodes[0] : void 0
      const lastTabbableNode = tabbableNodes.length > 0 ? tabbableNodes[tabbableNodes.length - 1] : void 0
      const firstDomTabbableNode = focusableNodes.find((node) => {
        return isTabbable(node)
      })
      const lastDomTabbableNode = focusableNodes.slice().reverse().find((node) => {
        return isTabbable(node)
      })
      const posTabIndexesFound = !!tabbableNodes.find((node) => {
        return getTabIndex(node) > 0
      })
      return {
        container,
        tabbableNodes,
        focusableNodes,
        /** True if at least one node with positive `tabindex` was found in this container. */
        posTabIndexesFound,
        /** First tabbable node in container, __tabindex__ order; `undefined` if none. */
        firstTabbableNode,
        /** Last tabbable node in container, __tabindex__ order; `undefined` if none. */
        lastTabbableNode,
        // NOTE: DOM order is NOT NECESSARILY "document position" order, but figuring that out
        //  would require more than just https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition
        //  because that API doesn't work with Shadow DOM as well as it should (@see
        //  https://github.com/whatwg/dom/issues/320) and since this first/last is only needed, so far,
        //  to address an edge case related to positive tabindex support, this seems like a much easier,
        //  "close enough most of the time" alternative for positive tabindexes which should generally
        //  be avoided anyway...
        /** First tabbable node in container, __DOM__ order; `undefined` if none. */
        firstDomTabbableNode,
        /** Last tabbable node in container, __DOM__ order; `undefined` if none. */
        lastDomTabbableNode,
        /**
         * Finds the __tabbable__ node that follows the given node in the specified direction,
         *  in this container, if any.
         * @param {HTMLElement} node
         * @param {boolean} [forward] True if going in forward tab order; false if going
         *  in reverse.
         * @returns {HTMLElement|undefined} The next tabbable node, if any.
         */
        nextTabbableNode: function nextTabbableNode(node) {
          const forward = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true
          const nodeIdx = tabbableNodes.indexOf(node)
          if (nodeIdx < 0) {
            if (forward) {
              return focusableNodes.slice(focusableNodes.indexOf(node) + 1).find((el) => {
                return isTabbable(el)
              })
            }
            return focusableNodes.slice(0, focusableNodes.indexOf(node)).reverse().find((el) => {
              return isTabbable(el)
            })
          }
          return tabbableNodes[nodeIdx + (forward ? 1 : -1)]
        },
      }
    })
    state.tabbableGroups = state.containerGroups.filter((group) => {
      return group.tabbableNodes.length > 0
    })
    if (state.tabbableGroups.length <= 0 && !getNodeForOption('fallbackFocus')) {
      throw new Error('Your focus-trap must have at least one container with at least one tabbable node in it at all times')
    }
    if (state.containerGroups.find((g) => {
      return g.posTabIndexesFound
    }) && state.containerGroups.length > 1) {
      throw new Error('At least one node with a positive tabindex was found in one of your focus-trap\'s multiple containers. Positive tabindexes are only supported in single-container focus-traps.')
    }
  }
  const _getActiveElement = function getActiveElement(el) {
    const activeElement = el.activeElement
    if (!activeElement) {
      return
    }
    if (activeElement.shadowRoot && activeElement.shadowRoot.activeElement !== null) {
      return _getActiveElement(activeElement.shadowRoot)
    }
    return activeElement
  }
  const _tryFocus = function tryFocus(node) {
    if (node === false) {
      return
    }
    if (node === _getActiveElement(document)) {
      return
    }
    if (!node || !node.focus) {
      _tryFocus(getInitialFocusNode())
      return
    }
    node.focus({
      preventScroll: !!config.preventScroll,
    })
    state.mostRecentlyFocusedNode = node
    if (isSelectableInput(node)) {
      node.select()
    }
  }
  const getReturnFocusNode = function getReturnFocusNode2(previousActiveElement) {
    const node = getNodeForOption('setReturnFocus', {
      params: [previousActiveElement],
    })
    return node || (node === false ? false : previousActiveElement)
  }
  const findNextNavNode = function findNextNavNode2(_ref3) {
    let target = _ref3.target; const event = _ref3.event; const _ref3$isBackward = _ref3.isBackward; const isBackward = _ref3$isBackward === void 0 ? false : _ref3$isBackward
    target = target || getActualTarget(event)
    updateTabbableNodes()
    let destinationNode = null
    if (state.tabbableGroups.length > 0) {
      const containerIndex = findContainerIndex(target, event)
      const containerGroup = containerIndex >= 0 ? state.containerGroups[containerIndex] : void 0
      if (containerIndex < 0) {
        if (isBackward) {
          destinationNode = state.tabbableGroups[state.tabbableGroups.length - 1].lastTabbableNode
        }
        else {
          destinationNode = state.tabbableGroups[0].firstTabbableNode
        }
      }
      else if (isBackward) {
        let startOfGroupIndex = state.tabbableGroups.findIndex((_ref4) => {
          const firstTabbableNode = _ref4.firstTabbableNode
          return target === firstTabbableNode
        })
        if (startOfGroupIndex < 0 && (containerGroup.container === target || isFocusable(target, config.tabbableOptions) && !isTabbable(target, config.tabbableOptions) && !containerGroup.nextTabbableNode(target, false))) {
          startOfGroupIndex = containerIndex
        }
        if (startOfGroupIndex >= 0) {
          const destinationGroupIndex = startOfGroupIndex === 0 ? state.tabbableGroups.length - 1 : startOfGroupIndex - 1
          const destinationGroup = state.tabbableGroups[destinationGroupIndex]
          destinationNode = getTabIndex(target) >= 0 ? destinationGroup.lastTabbableNode : destinationGroup.lastDomTabbableNode
        }
        else if (!isTabEvent(event)) {
          destinationNode = containerGroup.nextTabbableNode(target, false)
        }
      }
      else {
        let lastOfGroupIndex = state.tabbableGroups.findIndex((_ref5) => {
          const lastTabbableNode = _ref5.lastTabbableNode
          return target === lastTabbableNode
        })
        if (lastOfGroupIndex < 0 && (containerGroup.container === target || isFocusable(target, config.tabbableOptions) && !isTabbable(target, config.tabbableOptions) && !containerGroup.nextTabbableNode(target))) {
          lastOfGroupIndex = containerIndex
        }
        if (lastOfGroupIndex >= 0) {
          const _destinationGroupIndex = lastOfGroupIndex === state.tabbableGroups.length - 1 ? 0 : lastOfGroupIndex + 1
          const _destinationGroup = state.tabbableGroups[_destinationGroupIndex]
          destinationNode = getTabIndex(target) >= 0 ? _destinationGroup.firstTabbableNode : _destinationGroup.firstDomTabbableNode
        }
        else if (!isTabEvent(event)) {
          destinationNode = containerGroup.nextTabbableNode(target)
        }
      }
    }
    else {
      destinationNode = getNodeForOption('fallbackFocus')
    }
    return destinationNode
  }
  const checkPointerDown = function checkPointerDown2(e) {
    const target = getActualTarget(e)
    if (findContainerIndex(target, e) >= 0) {
      return
    }
    if (valueOrHandler(config.clickOutsideDeactivates, e)) {
      trap.deactivate({
        // NOTE: by setting `returnFocus: false`, deactivate() will do nothing,
        //  which will result in the outside click setting focus to the node
        //  that was clicked (and if not focusable, to "nothing"); by setting
        //  `returnFocus: true`, we'll attempt to re-focus the node originally-focused
        //  on activation (or the configured `setReturnFocus` node), whether the
        //  outside click was on a focusable node or not
        returnFocus: config.returnFocusOnDeactivate,
      })
      return
    }
    if (valueOrHandler(config.allowOutsideClick, e)) {
      return
    }
    e.preventDefault()
  }
  const checkFocusIn = function checkFocusIn2(event) {
    const target = getActualTarget(event)
    const targetContained = findContainerIndex(target, event) >= 0
    if (targetContained || target instanceof Document) {
      if (targetContained) {
        state.mostRecentlyFocusedNode = target
      }
    }
    else {
      event.stopImmediatePropagation()
      let nextNode
      let navAcrossContainers = true
      if (state.mostRecentlyFocusedNode) {
        if (getTabIndex(state.mostRecentlyFocusedNode) > 0) {
          const mruContainerIdx = findContainerIndex(state.mostRecentlyFocusedNode)
          const tabbableNodes = state.containerGroups[mruContainerIdx].tabbableNodes
          if (tabbableNodes.length > 0) {
            const mruTabIdx = tabbableNodes.findIndex((node) => {
              return node === state.mostRecentlyFocusedNode
            })
            if (mruTabIdx >= 0) {
              if (config.isKeyForward(state.recentNavEvent)) {
                if (mruTabIdx + 1 < tabbableNodes.length) {
                  nextNode = tabbableNodes[mruTabIdx + 1]
                  navAcrossContainers = false
                }
              }
              else {
                if (mruTabIdx - 1 >= 0) {
                  nextNode = tabbableNodes[mruTabIdx - 1]
                  navAcrossContainers = false
                }
              }
            }
          }
        }
        else {
          if (!state.containerGroups.some((g) => {
            return g.tabbableNodes.some((n) => {
              return getTabIndex(n) > 0
            })
          })) {
            navAcrossContainers = false
          }
        }
      }
      else {
        navAcrossContainers = false
      }
      if (navAcrossContainers) {
        nextNode = findNextNavNode({
          // move FROM the MRU node, not event-related node (which will be the node that is
          //  outside the trap causing the focus escape we're trying to fix)
          target: state.mostRecentlyFocusedNode,
          isBackward: config.isKeyBackward(state.recentNavEvent),
        })
      }
      if (nextNode) {
        _tryFocus(nextNode)
      }
      else {
        _tryFocus(state.mostRecentlyFocusedNode || getInitialFocusNode())
      }
    }
    state.recentNavEvent = void 0
  }
  const checkKeyNav = function checkKeyNav2(event) {
    const isBackward = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false
    state.recentNavEvent = event
    const destinationNode = findNextNavNode({
      event,
      isBackward,
    })
    if (destinationNode) {
      if (isTabEvent(event)) {
        event.preventDefault()
      }
      _tryFocus(destinationNode)
    }
  }
  const checkTabKey = function checkTabKey2(event) {
    if (config.isKeyForward(event) || config.isKeyBackward(event)) {
      checkKeyNav(event, config.isKeyBackward(event))
    }
  }
  const checkEscapeKey = function checkEscapeKey2(event) {
    if (isEscapeEvent(event) && valueOrHandler(config.escapeDeactivates, event) !== false) {
      event.preventDefault()
      trap.deactivate()
    }
  }
  const checkClick = function checkClick2(e) {
    const target = getActualTarget(e)
    if (findContainerIndex(target, e) >= 0) {
      return
    }
    if (valueOrHandler(config.clickOutsideDeactivates, e)) {
      return
    }
    if (valueOrHandler(config.allowOutsideClick, e)) {
      return
    }
    e.preventDefault()
    e.stopImmediatePropagation()
  }
  const addListeners = function addListeners2() {
    if (!state.active) {
      return
    }
    activeFocusTraps.activateTrap(trapStack, trap)
    state.delayInitialFocusTimer = config.delayInitialFocus
      ? delay(() => {
          _tryFocus(getInitialFocusNode())
        })
      : _tryFocus(getInitialFocusNode())
    doc.addEventListener('focusin', checkFocusIn, true)
    doc.addEventListener('mousedown', checkPointerDown, {
      capture: true,
      passive: false,
    })
    doc.addEventListener('touchstart', checkPointerDown, {
      capture: true,
      passive: false,
    })
    doc.addEventListener('click', checkClick, {
      capture: true,
      passive: false,
    })
    doc.addEventListener('keydown', checkTabKey, {
      capture: true,
      passive: false,
    })
    doc.addEventListener('keydown', checkEscapeKey)
    return trap
  }
  const removeListeners = function removeListeners2() {
    if (!state.active) {
      return
    }
    doc.removeEventListener('focusin', checkFocusIn, true)
    doc.removeEventListener('mousedown', checkPointerDown, true)
    doc.removeEventListener('touchstart', checkPointerDown, true)
    doc.removeEventListener('click', checkClick, true)
    doc.removeEventListener('keydown', checkTabKey, true)
    doc.removeEventListener('keydown', checkEscapeKey)
    return trap
  }
  const checkDomRemoval = function checkDomRemoval2(mutations) {
    const isFocusedNodeRemoved = mutations.some((mutation) => {
      const removedNodes = Array.from(mutation.removedNodes)
      return removedNodes.includes(state.mostRecentlyFocusedNode)
    })
    if (isFocusedNodeRemoved) {
      _tryFocus(getInitialFocusNode())
    }
  }
  const mutationObserver = typeof window !== 'undefined' && 'MutationObserver' in window ? new MutationObserver(checkDomRemoval) : void 0
  const updateObservedNodes = function updateObservedNodes2() {
    if (!mutationObserver) {
      return
    }
    mutationObserver.disconnect()
    if (state.active && !state.paused) {
      state.containers.map((container) => {
        mutationObserver.observe(container, {
          subtree: true,
          childList: true,
        })
      })
    }
  }
  trap = {
    get active() {
      return state.active
    },
    get paused() {
      return state.paused
    },
    activate: function activate(activateOptions) {
      if (state.active) {
        return this
      }
      const onActivate = getOption(activateOptions, 'onActivate')
      const onPostActivate = getOption(activateOptions, 'onPostActivate')
      const checkCanFocusTrap = getOption(activateOptions, 'checkCanFocusTrap')
      if (!checkCanFocusTrap) {
        updateTabbableNodes()
      }
      state.active = true
      state.paused = false
      state.nodeFocusedBeforeActivation = doc.activeElement
      onActivate === null || onActivate === void 0 || onActivate()
      const finishActivation = function finishActivation2() {
        if (checkCanFocusTrap) {
          updateTabbableNodes()
        }
        addListeners()
        updateObservedNodes()
        onPostActivate === null || onPostActivate === void 0 || onPostActivate()
      }
      if (checkCanFocusTrap) {
        checkCanFocusTrap(state.containers.concat()).then(finishActivation, finishActivation)
        return this
      }
      finishActivation()
      return this
    },
    deactivate: function deactivate(deactivateOptions) {
      if (!state.active) {
        return this
      }
      const options = _objectSpread2({
        onDeactivate: config.onDeactivate,
        onPostDeactivate: config.onPostDeactivate,
        checkCanReturnFocus: config.checkCanReturnFocus,
      }, deactivateOptions)
      clearTimeout(state.delayInitialFocusTimer)
      state.delayInitialFocusTimer = void 0
      removeListeners()
      state.active = false
      state.paused = false
      updateObservedNodes()
      activeFocusTraps.deactivateTrap(trapStack, trap)
      const onDeactivate = getOption(options, 'onDeactivate')
      const onPostDeactivate = getOption(options, 'onPostDeactivate')
      const checkCanReturnFocus = getOption(options, 'checkCanReturnFocus')
      const returnFocus = getOption(options, 'returnFocus', 'returnFocusOnDeactivate')
      onDeactivate === null || onDeactivate === void 0 || onDeactivate()
      const finishDeactivation = function finishDeactivation2() {
        delay(() => {
          if (returnFocus) {
            _tryFocus(getReturnFocusNode(state.nodeFocusedBeforeActivation))
          }
          onPostDeactivate === null || onPostDeactivate === void 0 || onPostDeactivate()
        })
      }
      if (returnFocus && checkCanReturnFocus) {
        checkCanReturnFocus(getReturnFocusNode(state.nodeFocusedBeforeActivation)).then(finishDeactivation, finishDeactivation)
        return this
      }
      finishDeactivation()
      return this
    },
    pause: function pause(pauseOptions) {
      if (state.paused || !state.active) {
        return this
      }
      const onPause = getOption(pauseOptions, 'onPause')
      const onPostPause = getOption(pauseOptions, 'onPostPause')
      state.paused = true
      onPause === null || onPause === void 0 || onPause()
      removeListeners()
      updateObservedNodes()
      onPostPause === null || onPostPause === void 0 || onPostPause()
      return this
    },
    unpause: function unpause(unpauseOptions) {
      if (!state.paused || !state.active) {
        return this
      }
      const onUnpause = getOption(unpauseOptions, 'onUnpause')
      const onPostUnpause = getOption(unpauseOptions, 'onPostUnpause')
      state.paused = false
      onUnpause === null || onUnpause === void 0 || onUnpause()
      updateTabbableNodes()
      addListeners()
      updateObservedNodes()
      onPostUnpause === null || onPostUnpause === void 0 || onPostUnpause()
      return this
    },
    updateContainerElements: function updateContainerElements(containerElements) {
      const elementsAsArray = [].concat(containerElements).filter(Boolean)
      state.containers = elementsAsArray.map((element) => {
        return typeof element === 'string' ? doc.querySelector(element) : element
      })
      if (state.active) {
        updateTabbableNodes()
      }
      updateObservedNodes()
      return this
    },
  }
  trap.updateContainerElements(elements)
  return trap
}

// node_modules/.pnpm/@vueuse+integrations@11.3.0_async-validator@4.2.5_focus-trap@7.6.2_nprogress@0.2.0_vue@3.5.13_typescript@5.7.2_/node_modules/@vueuse/integrations/useFocusTrap.mjs
function useFocusTrap(target, options = {}) {
  let trap
  const { immediate, ...focusTrapOptions } = options
  const hasFocus = ref(false)
  const isPaused = ref(false)
  const activate = opts => trap && trap.activate(opts)
  const deactivate = opts => trap && trap.deactivate(opts)
  const pause = () => {
    if (trap) {
      trap.pause()
      isPaused.value = true
    }
  }
  const unpause = () => {
    if (trap) {
      trap.unpause()
      isPaused.value = false
    }
  }
  const targets = computed(() => {
    const _targets = toValue(target)
    return (Array.isArray(_targets) ? _targets : [_targets]).map((el) => {
      const _el = toValue(el)
      return typeof _el === 'string' ? _el : unrefElement(_el)
    }).filter(notNullish)
  })
  watch(
    targets,
    (els) => {
      if (!els.length)
        return
      trap = createFocusTrap(els, {
        ...focusTrapOptions,
        onActivate() {
          hasFocus.value = true
          if (options.onActivate)
            options.onActivate()
        },
        onDeactivate() {
          hasFocus.value = false
          if (options.onDeactivate)
            options.onDeactivate()
        },
      })
      if (immediate)
        activate()
    },
    { flush: 'post' },
  )
  tryOnScopeDispose(() => deactivate())
  return {
    hasFocus,
    isPaused,
    activate,
    deactivate,
    pause,
    unpause,
  }
}
export {
  useFocusTrap,
}
/*! Bundled license information:

tabbable/dist/index.esm.js:
  (*!
  * tabbable 6.2.0
  * @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
  *)

focus-trap/dist/focus-trap.esm.js:
  (*!
  * focus-trap 7.6.2
  * @license MIT, https://github.com/focus-trap/focus-trap/blob/master/LICENSE
  *)
*/
// # sourceMappingURL=vitepress___@vueuse_integrations_useFocusTrap.js.map
