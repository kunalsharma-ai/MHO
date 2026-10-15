import {
  ROUTER_MODE,
  flagUrl
} from "/assets/chunk-D3EJIA6Q.js";
import {
  __commonJS,
  __toESM,
  init_define_import_meta_env
} from "/assets/chunk-HJYHZKH5.js";

// node_modules/react/cjs/react.development.js
var require_react_development = __commonJS({
  "node_modules/react/cjs/react.development.js"(exports, module) {
    "use strict";
    init_define_import_meta_env();
    (function() {
      function defineDeprecationWarning(methodName, info) {
        Object.defineProperty(Component.prototype, methodName, {
          get: function() {
            console.warn(
              "%s(...) is deprecated in plain JavaScript React classes. %s",
              info[0],
              info[1]
            );
          }
        });
      }
      function getIteratorFn(maybeIterable) {
        if (null === maybeIterable || "object" !== typeof maybeIterable)
          return null;
        maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
        return "function" === typeof maybeIterable ? maybeIterable : null;
      }
      function warnNoop(publicInstance, callerName) {
        publicInstance = (publicInstance = publicInstance.constructor) && (publicInstance.displayName || publicInstance.name) || "ReactClass";
        var warningKey = publicInstance + "." + callerName;
        didWarnStateUpdateForUnmountedComponent[warningKey] || (console.error(
          "Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.",
          callerName,
          publicInstance
        ), didWarnStateUpdateForUnmountedComponent[warningKey] = true);
      }
      function Component(props, context, updater) {
        this.props = props;
        this.context = context;
        this.refs = emptyObject;
        this.updater = updater || ReactNoopUpdateQueue;
      }
      function ComponentDummy() {
      }
      function PureComponent(props, context, updater) {
        this.props = props;
        this.context = context;
        this.refs = emptyObject;
        this.updater = updater || ReactNoopUpdateQueue;
      }
      function noop() {
      }
      function testStringCoercion(value) {
        return "" + value;
      }
      function checkKeyStringCoercion(value) {
        try {
          testStringCoercion(value);
          var JSCompiler_inline_result = false;
        } catch (e) {
          JSCompiler_inline_result = true;
        }
        if (JSCompiler_inline_result) {
          JSCompiler_inline_result = console;
          var JSCompiler_temp_const = JSCompiler_inline_result.error;
          var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
          JSCompiler_temp_const.call(
            JSCompiler_inline_result,
            "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
            JSCompiler_inline_result$jscomp$0
          );
          return testStringCoercion(value);
        }
      }
      function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type)
          return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch (type) {
          case REACT_FRAGMENT_TYPE:
            return "Fragment";
          case REACT_PROFILER_TYPE:
            return "Profiler";
          case REACT_STRICT_MODE_TYPE:
            return "StrictMode";
          case REACT_SUSPENSE_TYPE:
            return "Suspense";
          case REACT_SUSPENSE_LIST_TYPE:
            return "SuspenseList";
          case REACT_ACTIVITY_TYPE:
            return "Activity";
        }
        if ("object" === typeof type)
          switch ("number" === typeof type.tag && console.error(
            "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
          ), type.$$typeof) {
            case REACT_PORTAL_TYPE:
              return "Portal";
            case REACT_CONTEXT_TYPE:
              return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
              return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
              var innerType = type.render;
              type = type.displayName;
              type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
              return type;
            case REACT_MEMO_TYPE:
              return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
              innerType = type._payload;
              type = type._init;
              try {
                return getComponentNameFromType(type(innerType));
              } catch (x) {
              }
          }
        return null;
      }
      function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE)
          return "<...>";
        try {
          var name = getComponentNameFromType(type);
          return name ? "<" + name + ">" : "<...>";
        } catch (x) {
          return "<...>";
        }
      }
      function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
      }
      function UnknownOwner() {
        return Error("react-stack-top-frame");
      }
      function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
          var getter = Object.getOwnPropertyDescriptor(config, "key").get;
          if (getter && getter.isReactWarning) return false;
        }
        return void 0 !== config.key;
      }
      function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
          specialPropKeyWarningShown || (specialPropKeyWarningShown = true, console.error(
            "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
            displayName
          ));
        }
        warnAboutAccessingKey.isReactWarning = true;
        Object.defineProperty(props, "key", {
          get: warnAboutAccessingKey,
          configurable: true
        });
      }
      function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = true, console.error(
          "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
        ));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
      }
      function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
          $$typeof: REACT_ELEMENT_TYPE,
          type,
          key,
          props,
          _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
          enumerable: false,
          get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", { enumerable: false, value: null });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: null
        });
        Object.defineProperty(type, "_debugStack", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
      }
      function cloneAndReplaceKey(oldElement, newKey) {
        newKey = ReactElement(
          oldElement.type,
          newKey,
          oldElement.props,
          oldElement._owner,
          oldElement._debugStack,
          oldElement._debugTask
        );
        oldElement._store && (newKey._store.validated = oldElement._store.validated);
        return newKey;
      }
      function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
      }
      function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
      }
      function escape(key) {
        var escaperLookup = { "=": "=0", ":": "=2" };
        return "$" + key.replace(/[=:]/g, function(match) {
          return escaperLookup[match];
        });
      }
      function getElementKey(element, index) {
        return "object" === typeof element && null !== element && null != element.key ? (checkKeyStringCoercion(element.key), escape("" + element.key)) : index.toString(36);
      }
      function resolveThenable(thenable) {
        switch (thenable.status) {
          case "fulfilled":
            return thenable.value;
          case "rejected":
            throw thenable.reason;
          default:
            switch ("string" === typeof thenable.status ? thenable.then(noop, noop) : (thenable.status = "pending", thenable.then(
              function(fulfilledValue) {
                "pending" === thenable.status && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
              },
              function(error) {
                "pending" === thenable.status && (thenable.status = "rejected", thenable.reason = error);
              }
            )), thenable.status) {
              case "fulfilled":
                return thenable.value;
              case "rejected":
                throw thenable.reason;
            }
        }
        throw thenable;
      }
      function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
        var type = typeof children;
        if ("undefined" === type || "boolean" === type) children = null;
        var invokeCallback = false;
        if (null === children) invokeCallback = true;
        else
          switch (type) {
            case "bigint":
            case "string":
            case "number":
              invokeCallback = true;
              break;
            case "object":
              switch (children.$$typeof) {
                case REACT_ELEMENT_TYPE:
                case REACT_PORTAL_TYPE:
                  invokeCallback = true;
                  break;
                case REACT_LAZY_TYPE:
                  return invokeCallback = children._init, mapIntoArray(
                    invokeCallback(children._payload),
                    array,
                    escapedPrefix,
                    nameSoFar,
                    callback
                  );
              }
          }
        if (invokeCallback) {
          invokeCallback = children;
          callback = callback(invokeCallback);
          var childKey = "" === nameSoFar ? "." + getElementKey(invokeCallback, 0) : nameSoFar;
          isArrayImpl(callback) ? (escapedPrefix = "", null != childKey && (escapedPrefix = childKey.replace(userProvidedKeyEscapeRegex, "$&/") + "/"), mapIntoArray(callback, array, escapedPrefix, "", function(c) {
            return c;
          })) : null != callback && (isValidElement(callback) && (null != callback.key && (invokeCallback && invokeCallback.key === callback.key || checkKeyStringCoercion(callback.key)), escapedPrefix = cloneAndReplaceKey(
            callback,
            escapedPrefix + (null == callback.key || invokeCallback && invokeCallback.key === callback.key ? "" : ("" + callback.key).replace(
              userProvidedKeyEscapeRegex,
              "$&/"
            ) + "/") + childKey
          ), "" !== nameSoFar && null != invokeCallback && isValidElement(invokeCallback) && null == invokeCallback.key && invokeCallback._store && !invokeCallback._store.validated && (escapedPrefix._store.validated = 2), callback = escapedPrefix), array.push(callback));
          return 1;
        }
        invokeCallback = 0;
        childKey = "" === nameSoFar ? "." : nameSoFar + ":";
        if (isArrayImpl(children))
          for (var i = 0; i < children.length; i++)
            nameSoFar = children[i], type = childKey + getElementKey(nameSoFar, i), invokeCallback += mapIntoArray(
              nameSoFar,
              array,
              escapedPrefix,
              type,
              callback
            );
        else if (i = getIteratorFn(children), "function" === typeof i)
          for (i === children.entries && (didWarnAboutMaps || console.warn(
            "Using Maps as children is not supported. Use an array of keyed ReactElements instead."
          ), didWarnAboutMaps = true), children = i.call(children), i = 0; !(nameSoFar = children.next()).done; )
            nameSoFar = nameSoFar.value, type = childKey + getElementKey(nameSoFar, i++), invokeCallback += mapIntoArray(
              nameSoFar,
              array,
              escapedPrefix,
              type,
              callback
            );
        else if ("object" === type) {
          if ("function" === typeof children.then)
            return mapIntoArray(
              resolveThenable(children),
              array,
              escapedPrefix,
              nameSoFar,
              callback
            );
          array = String(children);
          throw Error(
            "Objects are not valid as a React child (found: " + ("[object Object]" === array ? "object with keys {" + Object.keys(children).join(", ") + "}" : array) + "). If you meant to render a collection of children, use an array instead."
          );
        }
        return invokeCallback;
      }
      function mapChildren(children, func, context) {
        if (null == children) return children;
        var result = [], count = 0;
        mapIntoArray(children, result, "", "", function(child) {
          return func.call(context, child, count++);
        });
        return result;
      }
      function lazyInitializer(payload) {
        if (-1 === payload._status) {
          var ioInfo = payload._ioInfo;
          null != ioInfo && (ioInfo.start = ioInfo.end = performance.now());
          ioInfo = payload._result;
          var thenable = ioInfo();
          thenable.then(
            function(moduleObject) {
              if (0 === payload._status || -1 === payload._status) {
                payload._status = 1;
                payload._result = moduleObject;
                var _ioInfo = payload._ioInfo;
                null != _ioInfo && (_ioInfo.end = performance.now());
                void 0 === thenable.status && (thenable.status = "fulfilled", thenable.value = moduleObject);
              }
            },
            function(error) {
              if (0 === payload._status || -1 === payload._status) {
                payload._status = 2;
                payload._result = error;
                var _ioInfo2 = payload._ioInfo;
                null != _ioInfo2 && (_ioInfo2.end = performance.now());
                void 0 === thenable.status && (thenable.status = "rejected", thenable.reason = error);
              }
            }
          );
          ioInfo = payload._ioInfo;
          if (null != ioInfo) {
            ioInfo.value = thenable;
            var displayName = thenable.displayName;
            "string" === typeof displayName && (ioInfo.name = displayName);
          }
          -1 === payload._status && (payload._status = 0, payload._result = thenable);
        }
        if (1 === payload._status)
          return ioInfo = payload._result, void 0 === ioInfo && console.error(
            "lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))\n\nDid you accidentally put curly braces around the import?",
            ioInfo
          ), "default" in ioInfo || console.error(
            "lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))",
            ioInfo
          ), ioInfo.default;
        throw payload._result;
      }
      function resolveDispatcher() {
        var dispatcher = ReactSharedInternals.H;
        null === dispatcher && console.error(
          "Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem."
        );
        return dispatcher;
      }
      function releaseAsyncTransition() {
        ReactSharedInternals.asyncTransitions--;
      }
      function enqueueTask(task) {
        if (null === enqueueTaskImpl)
          try {
            var requireString = ("require" + Math.random()).slice(0, 7);
            enqueueTaskImpl = (module && module[requireString]).call(
              module,
              "timers"
            ).setImmediate;
          } catch (_err) {
            enqueueTaskImpl = function(callback) {
              false === didWarnAboutMessageChannel && (didWarnAboutMessageChannel = true, "undefined" === typeof MessageChannel && console.error(
                "This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."
              ));
              var channel = new MessageChannel();
              channel.port1.onmessage = callback;
              channel.port2.postMessage(void 0);
            };
          }
        return enqueueTaskImpl(task);
      }
      function aggregateErrors(errors) {
        return 1 < errors.length && "function" === typeof AggregateError ? new AggregateError(errors) : errors[0];
      }
      function popActScope(prevActQueue, prevActScopeDepth) {
        prevActScopeDepth !== actScopeDepth - 1 && console.error(
          "You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "
        );
        actScopeDepth = prevActScopeDepth;
      }
      function recursivelyFlushAsyncActWork(returnValue, resolve, reject) {
        var queue = ReactSharedInternals.actQueue;
        if (null !== queue)
          if (0 !== queue.length)
            try {
              flushActQueue(queue);
              enqueueTask(function() {
                return recursivelyFlushAsyncActWork(returnValue, resolve, reject);
              });
              return;
            } catch (error) {
              ReactSharedInternals.thrownErrors.push(error);
            }
          else ReactSharedInternals.actQueue = null;
        0 < ReactSharedInternals.thrownErrors.length ? (queue = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, reject(queue)) : resolve(returnValue);
      }
      function flushActQueue(queue) {
        if (!isFlushing) {
          isFlushing = true;
          var i = 0;
          try {
            for (; i < queue.length; i++) {
              var callback = queue[i];
              do {
                ReactSharedInternals.didUsePromise = false;
                var continuation = callback(false);
                if (null !== continuation) {
                  if (ReactSharedInternals.didUsePromise) {
                    queue[i] = callback;
                    queue.splice(0, i);
                    return;
                  }
                  callback = continuation;
                } else break;
              } while (1);
            }
            queue.length = 0;
          } catch (error) {
            queue.splice(0, i + 1), ReactSharedInternals.thrownErrors.push(error);
          } finally {
            isFlushing = false;
          }
        }
      }
      "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
      var REACT_ELEMENT_TYPE = /* @__PURE__ */ Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = /* @__PURE__ */ Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = /* @__PURE__ */ Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = /* @__PURE__ */ Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = /* @__PURE__ */ Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = /* @__PURE__ */ Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = /* @__PURE__ */ Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = /* @__PURE__ */ Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = /* @__PURE__ */ Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = /* @__PURE__ */ Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = /* @__PURE__ */ Symbol.for("react.memo"), REACT_LAZY_TYPE = /* @__PURE__ */ Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = /* @__PURE__ */ Symbol.for("react.activity"), MAYBE_ITERATOR_SYMBOL = Symbol.iterator, didWarnStateUpdateForUnmountedComponent = {}, ReactNoopUpdateQueue = {
        isMounted: function() {
          return false;
        },
        enqueueForceUpdate: function(publicInstance) {
          warnNoop(publicInstance, "forceUpdate");
        },
        enqueueReplaceState: function(publicInstance) {
          warnNoop(publicInstance, "replaceState");
        },
        enqueueSetState: function(publicInstance) {
          warnNoop(publicInstance, "setState");
        }
      }, assign = Object.assign, emptyObject = {};
      Object.freeze(emptyObject);
      Component.prototype.isReactComponent = {};
      Component.prototype.setState = function(partialState, callback) {
        if ("object" !== typeof partialState && "function" !== typeof partialState && null != partialState)
          throw Error(
            "takes an object of state variables to update or a function which returns an object of state variables."
          );
        this.updater.enqueueSetState(this, partialState, callback, "setState");
      };
      Component.prototype.forceUpdate = function(callback) {
        this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
      };
      var deprecatedAPIs = {
        isMounted: [
          "isMounted",
          "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."
        ],
        replaceState: [
          "replaceState",
          "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."
        ]
      };
      for (fnName in deprecatedAPIs)
        deprecatedAPIs.hasOwnProperty(fnName) && defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
      ComponentDummy.prototype = Component.prototype;
      deprecatedAPIs = PureComponent.prototype = new ComponentDummy();
      deprecatedAPIs.constructor = PureComponent;
      assign(deprecatedAPIs, Component.prototype);
      deprecatedAPIs.isPureReactComponent = true;
      var isArrayImpl = Array.isArray, REACT_CLIENT_REFERENCE = /* @__PURE__ */ Symbol.for("react.client.reference"), ReactSharedInternals = {
        H: null,
        A: null,
        T: null,
        S: null,
        actQueue: null,
        asyncTransitions: 0,
        isBatchingLegacy: false,
        didScheduleLegacyUpdate: false,
        didUsePromise: false,
        thrownErrors: [],
        getCurrentStack: null,
        recentlyCreatedOwnerStacks: 0
      }, hasOwnProperty = Object.prototype.hasOwnProperty, createTask = console.createTask ? console.createTask : function() {
        return null;
      };
      deprecatedAPIs = {
        react_stack_bottom_frame: function(callStackForError) {
          return callStackForError();
        }
      };
      var specialPropKeyWarningShown, didWarnAboutOldJSXRuntime;
      var didWarnAboutElementRef = {};
      var unknownOwnerDebugStack = deprecatedAPIs.react_stack_bottom_frame.bind(
        deprecatedAPIs,
        UnknownOwner
      )();
      var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
      var didWarnAboutMaps = false, userProvidedKeyEscapeRegex = /\/+/g, reportGlobalError = "function" === typeof reportError ? reportError : function(error) {
        if ("object" === typeof window && "function" === typeof window.ErrorEvent) {
          var event = new window.ErrorEvent("error", {
            bubbles: true,
            cancelable: true,
            message: "object" === typeof error && null !== error && "string" === typeof error.message ? String(error.message) : String(error),
            error
          });
          if (!window.dispatchEvent(event)) return;
        } else if ("object" === typeof process && "function" === typeof process.emit) {
          process.emit("uncaughtException", error);
          return;
        }
        console.error(error);
      }, didWarnAboutMessageChannel = false, enqueueTaskImpl = null, actScopeDepth = 0, didWarnNoAwaitAct = false, isFlushing = false, queueSeveralMicrotasks = "function" === typeof queueMicrotask ? function(callback) {
        queueMicrotask(function() {
          return queueMicrotask(callback);
        });
      } : enqueueTask;
      deprecatedAPIs = Object.freeze({
        __proto__: null,
        c: function(size) {
          return resolveDispatcher().useMemoCache(size);
        }
      });
      var fnName = {
        map: mapChildren,
        forEach: function(children, forEachFunc, forEachContext) {
          mapChildren(
            children,
            function() {
              forEachFunc.apply(this, arguments);
            },
            forEachContext
          );
        },
        count: function(children) {
          var n = 0;
          mapChildren(children, function() {
            n++;
          });
          return n;
        },
        toArray: function(children) {
          return mapChildren(children, function(child) {
            return child;
          }) || [];
        },
        only: function(children) {
          if (!isValidElement(children))
            throw Error(
              "React.Children.only expected to receive a single React element child."
            );
          return children;
        }
      };
      exports.Activity = REACT_ACTIVITY_TYPE;
      exports.Children = fnName;
      exports.Component = Component;
      exports.Fragment = REACT_FRAGMENT_TYPE;
      exports.Profiler = REACT_PROFILER_TYPE;
      exports.PureComponent = PureComponent;
      exports.StrictMode = REACT_STRICT_MODE_TYPE;
      exports.Suspense = REACT_SUSPENSE_TYPE;
      exports.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals;
      exports.__COMPILER_RUNTIME = deprecatedAPIs;
      exports.act = function(callback) {
        var prevActQueue = ReactSharedInternals.actQueue, prevActScopeDepth = actScopeDepth;
        actScopeDepth++;
        var queue = ReactSharedInternals.actQueue = null !== prevActQueue ? prevActQueue : [], didAwaitActCall = false;
        try {
          var result = callback();
        } catch (error) {
          ReactSharedInternals.thrownErrors.push(error);
        }
        if (0 < ReactSharedInternals.thrownErrors.length)
          throw popActScope(prevActQueue, prevActScopeDepth), callback = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, callback;
        if (null !== result && "object" === typeof result && "function" === typeof result.then) {
          var thenable = result;
          queueSeveralMicrotasks(function() {
            didAwaitActCall || didWarnNoAwaitAct || (didWarnNoAwaitAct = true, console.error(
              "You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"
            ));
          });
          return {
            then: function(resolve, reject) {
              didAwaitActCall = true;
              thenable.then(
                function(returnValue) {
                  popActScope(prevActQueue, prevActScopeDepth);
                  if (0 === prevActScopeDepth) {
                    try {
                      flushActQueue(queue), enqueueTask(function() {
                        return recursivelyFlushAsyncActWork(
                          returnValue,
                          resolve,
                          reject
                        );
                      });
                    } catch (error$0) {
                      ReactSharedInternals.thrownErrors.push(error$0);
                    }
                    if (0 < ReactSharedInternals.thrownErrors.length) {
                      var _thrownError = aggregateErrors(
                        ReactSharedInternals.thrownErrors
                      );
                      ReactSharedInternals.thrownErrors.length = 0;
                      reject(_thrownError);
                    }
                  } else resolve(returnValue);
                },
                function(error) {
                  popActScope(prevActQueue, prevActScopeDepth);
                  0 < ReactSharedInternals.thrownErrors.length ? (error = aggregateErrors(
                    ReactSharedInternals.thrownErrors
                  ), ReactSharedInternals.thrownErrors.length = 0, reject(error)) : reject(error);
                }
              );
            }
          };
        }
        var returnValue$jscomp$0 = result;
        popActScope(prevActQueue, prevActScopeDepth);
        0 === prevActScopeDepth && (flushActQueue(queue), 0 !== queue.length && queueSeveralMicrotasks(function() {
          didAwaitActCall || didWarnNoAwaitAct || (didWarnNoAwaitAct = true, console.error(
            "A component suspended inside an `act` scope, but the `act` call was not awaited. When testing React components that depend on asynchronous data, you must await the result:\n\nawait act(() => ...)"
          ));
        }), ReactSharedInternals.actQueue = null);
        if (0 < ReactSharedInternals.thrownErrors.length)
          throw callback = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, callback;
        return {
          then: function(resolve, reject) {
            didAwaitActCall = true;
            0 === prevActScopeDepth ? (ReactSharedInternals.actQueue = queue, enqueueTask(function() {
              return recursivelyFlushAsyncActWork(
                returnValue$jscomp$0,
                resolve,
                reject
              );
            })) : resolve(returnValue$jscomp$0);
          }
        };
      };
      exports.cache = function(fn) {
        return function() {
          return fn.apply(null, arguments);
        };
      };
      exports.cacheSignal = function() {
        return null;
      };
      exports.captureOwnerStack = function() {
        var getCurrentStack = ReactSharedInternals.getCurrentStack;
        return null === getCurrentStack ? null : getCurrentStack();
      };
      exports.cloneElement = function(element, config, children) {
        if (null === element || void 0 === element)
          throw Error(
            "The argument must be a React element, but you passed " + element + "."
          );
        var props = assign({}, element.props), key = element.key, owner = element._owner;
        if (null != config) {
          var JSCompiler_inline_result;
          a: {
            if (hasOwnProperty.call(config, "ref") && (JSCompiler_inline_result = Object.getOwnPropertyDescriptor(
              config,
              "ref"
            ).get) && JSCompiler_inline_result.isReactWarning) {
              JSCompiler_inline_result = false;
              break a;
            }
            JSCompiler_inline_result = void 0 !== config.ref;
          }
          JSCompiler_inline_result && (owner = getOwner());
          hasValidKey(config) && (checkKeyStringCoercion(config.key), key = "" + config.key);
          for (propName in config)
            !hasOwnProperty.call(config, propName) || "key" === propName || "__self" === propName || "__source" === propName || "ref" === propName && void 0 === config.ref || (props[propName] = config[propName]);
        }
        var propName = arguments.length - 2;
        if (1 === propName) props.children = children;
        else if (1 < propName) {
          JSCompiler_inline_result = Array(propName);
          for (var i = 0; i < propName; i++)
            JSCompiler_inline_result[i] = arguments[i + 2];
          props.children = JSCompiler_inline_result;
        }
        props = ReactElement(
          element.type,
          key,
          props,
          owner,
          element._debugStack,
          element._debugTask
        );
        for (key = 2; key < arguments.length; key++)
          validateChildKeys(arguments[key]);
        return props;
      };
      exports.createContext = function(defaultValue) {
        defaultValue = {
          $$typeof: REACT_CONTEXT_TYPE,
          _currentValue: defaultValue,
          _currentValue2: defaultValue,
          _threadCount: 0,
          Provider: null,
          Consumer: null
        };
        defaultValue.Provider = defaultValue;
        defaultValue.Consumer = {
          $$typeof: REACT_CONSUMER_TYPE,
          _context: defaultValue
        };
        defaultValue._currentRenderer = null;
        defaultValue._currentRenderer2 = null;
        return defaultValue;
      };
      exports.createElement = function(type, config, children) {
        for (var i = 2; i < arguments.length; i++)
          validateChildKeys(arguments[i]);
        i = {};
        var key = null;
        if (null != config)
          for (propName in didWarnAboutOldJSXRuntime || !("__self" in config) || "key" in config || (didWarnAboutOldJSXRuntime = true, console.warn(
            "Your app (or one of its dependencies) is using an outdated JSX transform. Update to the modern JSX transform for faster performance: https://react.dev/link/new-jsx-transform"
          )), hasValidKey(config) && (checkKeyStringCoercion(config.key), key = "" + config.key), config)
            hasOwnProperty.call(config, propName) && "key" !== propName && "__self" !== propName && "__source" !== propName && (i[propName] = config[propName]);
        var childrenLength = arguments.length - 2;
        if (1 === childrenLength) i.children = children;
        else if (1 < childrenLength) {
          for (var childArray = Array(childrenLength), _i = 0; _i < childrenLength; _i++)
            childArray[_i] = arguments[_i + 2];
          Object.freeze && Object.freeze(childArray);
          i.children = childArray;
        }
        if (type && type.defaultProps)
          for (propName in childrenLength = type.defaultProps, childrenLength)
            void 0 === i[propName] && (i[propName] = childrenLength[propName]);
        key && defineKeyPropWarningGetter(
          i,
          "function" === typeof type ? type.displayName || type.name || "Unknown" : type
        );
        var propName = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        return ReactElement(
          type,
          key,
          i,
          getOwner(),
          propName ? Error("react-stack-top-frame") : unknownOwnerDebugStack,
          propName ? createTask(getTaskName(type)) : unknownOwnerDebugTask
        );
      };
      exports.createRef = function() {
        var refObject = { current: null };
        Object.seal(refObject);
        return refObject;
      };
      exports.forwardRef = function(render) {
        null != render && render.$$typeof === REACT_MEMO_TYPE ? console.error(
          "forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...))."
        ) : "function" !== typeof render ? console.error(
          "forwardRef requires a render function but was given %s.",
          null === render ? "null" : typeof render
        ) : 0 !== render.length && 2 !== render.length && console.error(
          "forwardRef render functions accept exactly two parameters: props and ref. %s",
          1 === render.length ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."
        );
        null != render && null != render.defaultProps && console.error(
          "forwardRef render functions do not support defaultProps. Did you accidentally pass a React component?"
        );
        var elementType = { $$typeof: REACT_FORWARD_REF_TYPE, render }, ownName;
        Object.defineProperty(elementType, "displayName", {
          enumerable: false,
          configurable: true,
          get: function() {
            return ownName;
          },
          set: function(name) {
            ownName = name;
            render.name || render.displayName || (Object.defineProperty(render, "name", { value: name }), render.displayName = name);
          }
        });
        return elementType;
      };
      exports.isValidElement = isValidElement;
      exports.lazy = function(ctor) {
        ctor = { _status: -1, _result: ctor };
        var lazyType = {
          $$typeof: REACT_LAZY_TYPE,
          _payload: ctor,
          _init: lazyInitializer
        }, ioInfo = {
          name: "lazy",
          start: -1,
          end: -1,
          value: null,
          owner: null,
          debugStack: Error("react-stack-top-frame"),
          debugTask: console.createTask ? console.createTask("lazy()") : null
        };
        ctor._ioInfo = ioInfo;
        lazyType._debugInfo = [{ awaited: ioInfo }];
        return lazyType;
      };
      exports.memo = function(type, compare) {
        null == type && console.error(
          "memo: The first argument must be a component. Instead received: %s",
          null === type ? "null" : typeof type
        );
        compare = {
          $$typeof: REACT_MEMO_TYPE,
          type,
          compare: void 0 === compare ? null : compare
        };
        var ownName;
        Object.defineProperty(compare, "displayName", {
          enumerable: false,
          configurable: true,
          get: function() {
            return ownName;
          },
          set: function(name) {
            ownName = name;
            type.name || type.displayName || (Object.defineProperty(type, "name", { value: name }), type.displayName = name);
          }
        });
        return compare;
      };
      exports.startTransition = function(scope) {
        var prevTransition = ReactSharedInternals.T, currentTransition = {};
        currentTransition._updatedFibers = /* @__PURE__ */ new Set();
        ReactSharedInternals.T = currentTransition;
        try {
          var returnValue = scope(), onStartTransitionFinish = ReactSharedInternals.S;
          null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
          "object" === typeof returnValue && null !== returnValue && "function" === typeof returnValue.then && (ReactSharedInternals.asyncTransitions++, returnValue.then(releaseAsyncTransition, releaseAsyncTransition), returnValue.then(noop, reportGlobalError));
        } catch (error) {
          reportGlobalError(error);
        } finally {
          null === prevTransition && currentTransition._updatedFibers && (scope = currentTransition._updatedFibers.size, currentTransition._updatedFibers.clear(), 10 < scope && console.warn(
            "Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."
          )), null !== prevTransition && null !== currentTransition.types && (null !== prevTransition.types && prevTransition.types !== currentTransition.types && console.error(
            "We expected inner Transitions to have transferred the outer types set and that you cannot add to the outer Transition while inside the inner.This is a bug in React."
          ), prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition;
        }
      };
      exports.unstable_useCacheRefresh = function() {
        return resolveDispatcher().useCacheRefresh();
      };
      exports.use = function(usable) {
        return resolveDispatcher().use(usable);
      };
      exports.useActionState = function(action, initialState, permalink) {
        return resolveDispatcher().useActionState(
          action,
          initialState,
          permalink
        );
      };
      exports.useCallback = function(callback, deps) {
        return resolveDispatcher().useCallback(callback, deps);
      };
      exports.useContext = function(Context) {
        var dispatcher = resolveDispatcher();
        Context.$$typeof === REACT_CONSUMER_TYPE && console.error(
          "Calling useContext(Context.Consumer) is not supported and will cause bugs. Did you mean to call useContext(Context) instead?"
        );
        return dispatcher.useContext(Context);
      };
      exports.useDebugValue = function(value, formatterFn) {
        return resolveDispatcher().useDebugValue(value, formatterFn);
      };
      exports.useDeferredValue = function(value, initialValue) {
        return resolveDispatcher().useDeferredValue(value, initialValue);
      };
      exports.useEffect = function(create, deps) {
        null == create && console.warn(
          "React Hook useEffect requires an effect callback. Did you forget to pass a callback to the hook?"
        );
        return resolveDispatcher().useEffect(create, deps);
      };
      exports.useEffectEvent = function(callback) {
        return resolveDispatcher().useEffectEvent(callback);
      };
      exports.useId = function() {
        return resolveDispatcher().useId();
      };
      exports.useImperativeHandle = function(ref, create, deps) {
        return resolveDispatcher().useImperativeHandle(ref, create, deps);
      };
      exports.useInsertionEffect = function(create, deps) {
        null == create && console.warn(
          "React Hook useInsertionEffect requires an effect callback. Did you forget to pass a callback to the hook?"
        );
        return resolveDispatcher().useInsertionEffect(create, deps);
      };
      exports.useLayoutEffect = function(create, deps) {
        null == create && console.warn(
          "React Hook useLayoutEffect requires an effect callback. Did you forget to pass a callback to the hook?"
        );
        return resolveDispatcher().useLayoutEffect(create, deps);
      };
      exports.useMemo = function(create, deps) {
        return resolveDispatcher().useMemo(create, deps);
      };
      exports.useOptimistic = function(passthrough, reducer) {
        return resolveDispatcher().useOptimistic(passthrough, reducer);
      };
      exports.useReducer = function(reducer, initialArg, init) {
        return resolveDispatcher().useReducer(reducer, initialArg, init);
      };
      exports.useRef = function(initialValue) {
        return resolveDispatcher().useRef(initialValue);
      };
      exports.useState = function(initialState) {
        return resolveDispatcher().useState(initialState);
      };
      exports.useSyncExternalStore = function(subscribe, getSnapshot, getServerSnapshot) {
        return resolveDispatcher().useSyncExternalStore(
          subscribe,
          getSnapshot,
          getServerSnapshot
        );
      };
      exports.useTransition = function() {
        return resolveDispatcher().useTransition();
      };
      exports.version = "19.2.8";
      "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
    })();
  }
});

// node_modules/react/index.js
var require_react = __commonJS({
  "node_modules/react/index.js"(exports, module) {
    "use strict";
    init_define_import_meta_env();
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_react_development();
    }
  }
});

// node_modules/react/cjs/react-jsx-runtime.development.js
var require_react_jsx_runtime_development = __commonJS({
  "node_modules/react/cjs/react-jsx-runtime.development.js"(exports) {
    "use strict";
    init_define_import_meta_env();
    (function() {
      function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type)
          return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch (type) {
          case REACT_FRAGMENT_TYPE:
            return "Fragment";
          case REACT_PROFILER_TYPE:
            return "Profiler";
          case REACT_STRICT_MODE_TYPE:
            return "StrictMode";
          case REACT_SUSPENSE_TYPE:
            return "Suspense";
          case REACT_SUSPENSE_LIST_TYPE:
            return "SuspenseList";
          case REACT_ACTIVITY_TYPE:
            return "Activity";
        }
        if ("object" === typeof type)
          switch ("number" === typeof type.tag && console.error(
            "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
          ), type.$$typeof) {
            case REACT_PORTAL_TYPE:
              return "Portal";
            case REACT_CONTEXT_TYPE:
              return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
              return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
              var innerType = type.render;
              type = type.displayName;
              type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
              return type;
            case REACT_MEMO_TYPE:
              return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
              innerType = type._payload;
              type = type._init;
              try {
                return getComponentNameFromType(type(innerType));
              } catch (x) {
              }
          }
        return null;
      }
      function testStringCoercion(value) {
        return "" + value;
      }
      function checkKeyStringCoercion(value) {
        try {
          testStringCoercion(value);
          var JSCompiler_inline_result = false;
        } catch (e) {
          JSCompiler_inline_result = true;
        }
        if (JSCompiler_inline_result) {
          JSCompiler_inline_result = console;
          var JSCompiler_temp_const = JSCompiler_inline_result.error;
          var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
          JSCompiler_temp_const.call(
            JSCompiler_inline_result,
            "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
            JSCompiler_inline_result$jscomp$0
          );
          return testStringCoercion(value);
        }
      }
      function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE)
          return "<...>";
        try {
          var name = getComponentNameFromType(type);
          return name ? "<" + name + ">" : "<...>";
        } catch (x) {
          return "<...>";
        }
      }
      function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
      }
      function UnknownOwner() {
        return Error("react-stack-top-frame");
      }
      function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
          var getter = Object.getOwnPropertyDescriptor(config, "key").get;
          if (getter && getter.isReactWarning) return false;
        }
        return void 0 !== config.key;
      }
      function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
          specialPropKeyWarningShown || (specialPropKeyWarningShown = true, console.error(
            "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
            displayName
          ));
        }
        warnAboutAccessingKey.isReactWarning = true;
        Object.defineProperty(props, "key", {
          get: warnAboutAccessingKey,
          configurable: true
        });
      }
      function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = true, console.error(
          "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
        ));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
      }
      function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
          $$typeof: REACT_ELEMENT_TYPE,
          type,
          key,
          props,
          _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
          enumerable: false,
          get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", { enumerable: false, value: null });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: null
        });
        Object.defineProperty(type, "_debugStack", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
      }
      function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children)
          if (isStaticChildren)
            if (isArrayImpl(children)) {
              for (isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)
                validateChildKeys(children[isStaticChildren]);
              Object.freeze && Object.freeze(children);
            } else
              console.error(
                "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
              );
          else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
          children = getComponentNameFromType(type);
          var keys = Object.keys(config).filter(function(k) {
            return "key" !== k;
          });
          isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
          didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error(
            'A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />',
            isStaticChildren,
            children,
            keys,
            children
          ), didWarnAboutKeySpread[children + isStaticChildren] = true);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
          maybeKey = {};
          for (var propName in config)
            "key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(
          maybeKey,
          "function" === typeof type ? type.displayName || type.name || "Unknown" : type
        );
        return ReactElement(
          type,
          children,
          maybeKey,
          getOwner(),
          debugStack,
          debugTask
        );
      }
      function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
      }
      function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
      }
      var React = require_react(), REACT_ELEMENT_TYPE = /* @__PURE__ */ Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = /* @__PURE__ */ Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = /* @__PURE__ */ Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = /* @__PURE__ */ Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = /* @__PURE__ */ Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = /* @__PURE__ */ Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = /* @__PURE__ */ Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = /* @__PURE__ */ Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = /* @__PURE__ */ Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = /* @__PURE__ */ Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = /* @__PURE__ */ Symbol.for("react.memo"), REACT_LAZY_TYPE = /* @__PURE__ */ Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = /* @__PURE__ */ Symbol.for("react.activity"), REACT_CLIENT_REFERENCE = /* @__PURE__ */ Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
      };
      React = {
        react_stack_bottom_frame: function(callStackForError) {
          return callStackForError();
        }
      };
      var specialPropKeyWarningShown;
      var didWarnAboutElementRef = {};
      var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(
        React,
        UnknownOwner
      )();
      var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
      var didWarnAboutKeySpread = {};
      exports.Fragment = REACT_FRAGMENT_TYPE;
      exports.jsx = function(type, config, maybeKey) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        return jsxDEVImpl(
          type,
          config,
          maybeKey,
          false,
          trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack,
          trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask
        );
      };
      exports.jsxs = function(type, config, maybeKey) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        return jsxDEVImpl(
          type,
          config,
          maybeKey,
          true,
          trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack,
          trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask
        );
      };
    })();
  }
});

// node_modules/react/jsx-runtime.js
var require_jsx_runtime = __commonJS({
  "node_modules/react/jsx-runtime.js"(exports, module) {
    "use strict";
    init_define_import_meta_env();
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_react_jsx_runtime_development();
    }
  }
});

// src/router.jsx
init_define_import_meta_env();
var import_react = __toESM(require_react(), 1);
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var MODE = ROUTER_MODE;
var RouterContext = (0, import_react.createContext)({ path: "/", navigate: () => {
} });
function normalize(p = "/") {
  let path = p.split("?")[0].split("#")[0] || "/";
  if (!path.startsWith("/")) path = "/" + path;
  if (path.length > 1) path = path.replace(/\/+$/, "");
  return path || "/";
}
function toHref(to) {
  const [base, hash] = to.split("#");
  const n = normalize(base);
  const pretty = n === "/" ? "/" : n + "/";
  if (MODE === "hash") return "#" + pretty + (hash ? "?s=" + hash : "");
  return pretty + (hash ? "#" + hash : "");
}
function readLocation() {
  if (typeof window === "undefined") return "/";
  if (MODE === "hash") {
    const h = window.location.hash.slice(1) || "/";
    return normalize(h.split("?")[0]);
  }
  return normalize(window.location.pathname);
}
function readAnchor() {
  if (typeof window === "undefined") return "";
  if (MODE === "hash") {
    const m = window.location.hash.match(/\?s=([\w-]+)/);
    return m ? m[1] : "";
  }
  return window.location.hash.slice(1);
}
function Router({ initialPath = "/", children }) {
  const [path, setPath] = (0, import_react.useState)(() => typeof window === "undefined" ? normalize(initialPath) : readLocation());
  (0, import_react.useEffect)(() => {
    const onChange = () => setPath(readLocation());
    window.addEventListener(MODE === "hash" ? "hashchange" : "popstate", onChange);
    return () => window.removeEventListener(MODE === "hash" ? "hashchange" : "popstate", onChange);
  }, []);
  const navigate = (0, import_react.useCallback)((to) => {
    const href = toHref(to);
    if (MODE === "hash") window.location.hash = href.slice(1);
    else window.history.pushState({}, "", href);
    setPath(readLocation());
    const anchor = to.split("#")[1];
    requestAnimationFrame(() => {
      const el = anchor && document.getElementById(anchor);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      else window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
    });
  }, []);
  (0, import_react.useEffect)(() => {
    const a = readAnchor();
    if (a) setTimeout(() => document.getElementById(a)?.scrollIntoView({ behavior: "smooth" }), 300);
  }, []);
  const value = (0, import_react.useMemo)(() => ({ path, navigate }), [path, navigate]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RouterContext.Provider, { value, children });
}
var useRouter = () => (0, import_react.useContext)(RouterContext);
var currentPath = readLocation;
var currentAnchor = readAnchor;
function Link({ to, children, onClick, className, ...rest }) {
  const { navigate, path } = useRouter();
  const isExternal = /^(https?:|mailto:|tel:)/.test(to);
  if (isExternal) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { href: to, className, target: to.startsWith("http") ? "_blank" : void 0, rel: to.startsWith("http") ? "noopener noreferrer" : void 0, ...rest, children });
  }
  const active = normalize(to.split("#")[0]) === path;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "a",
    {
      href: toHref(to),
      className,
      "aria-current": active ? "page" : void 0,
      onClick: (e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        navigate(to);
      },
      ...rest,
      children
    }
  );
}

// src/components/Icon.jsx
init_define_import_meta_env();
var import_jsx_runtime2 = __toESM(require_jsx_runtime(), 1);
var P = {
  arrow: "M5 12h14M13 6l6 6-6 6",
  arrowLeft: "M19 12H5M11 6l-6 6 6 6",
  check: "M20 6 9 17l-5-5",
  x: "M18 6 6 18M6 6l12 12",
  menu: "M4 7h16M4 12h16M4 17h16",
  plus: "M12 5v14M5 12h14",
  minus: "M5 12h14",
  star: "m12 2.8 2.8 5.8 6.3.9-4.6 4.4 1.1 6.3L12 17.2l-5.6 3 1.1-6.3L2.9 9.5l6.3-.9z",
  heart: "M20.8 5.6a5.5 5.5 0 0 0-7.8 0L12 6.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 22l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z",
  pulse: "M3 12h4l2-5 4 10 2-5h6",
  stethoscope: "M6 3v6a4 4 0 0 0 8 0V3M4 3h4M12 3h4M10 13v2a5 5 0 0 0 10 0v-2M20 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  nurse: "M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5zM12 8v6M9 11h6",
  pill: "M10.5 20.5a5 5 0 0 1-7-7l7-7a5 5 0 0 1 7 7zM8.5 8.5l7 7",
  tooth: "M7 3c-2 0-3.5 1.6-3.5 4 0 3 1.5 4 2 7s1 7 2.5 7 1.5-4 2-6 1-2 2-2 1.5 0 2 2 .5 6 2 6 2-4 2.5-7 2-4 2-7c0-2.4-1.5-4-3.5-4-1.7 0-3 1-5 1S8.7 3 7 3z",
  microscope: "M6 18h8M3 22h18M14 22a7 7 0 1 0 0-14h-1M9 14h2M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2zM12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3",
  hands: "M11 14h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16M7 20l1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.8-2.8L14.4 14M2 15l6 6",
  briefcase: "M3 7h18v13H3zM16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2M3 13h18",
  monitor: "M3 4h18v12H3zM8 20h8M12 16v4",
  ambulance: "M10 10H6M8 8v4M15 18H9M19 18h2v-4l-3-4h-3V6H2v12h2M6.5 20.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM17.5 20.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  scalpel: "M3 21 14 10M14 10l3-3c1.5-1.5 4 1 2.5 2.5L16 13z",
  users: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8",
  user: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  home: "M3 10.5 12 3l9 7.5V21h-6v-6H9v6H3z",
  phone: "M7 2h10a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zM11 18h2",
  call: "M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z",
  mail: "M3 5h18v14H3zM3 6l9 7 9-7",
  wallet: "M20 7H5a2 2 0 0 1 0-4h13v4M3 5v14a2 2 0 0 0 2 2h15V7M16 14h.01",
  car: "M5 17h14M5 17a2 2 0 1 0 4 0M15 17a2 2 0 1 0 4 0M3 17v-5l2-5h14l2 5v5",
  bag: "M6 7h12l1 14H5zM9 7V5a3 3 0 0 1 6 0v2",
  sparkle: "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 17l.8 2.2L22 20l-2.2.8L19 23l-.8-2.2L16 20l2.2-.8z",
  shield: "M12 2 4 5v6c0 5.5 3.4 9.7 8 11 4.6-1.3 8-5.5 8-11V5z",
  shieldCheck: "M12 2 4 5v6c0 5.5 3.4 9.7 8 11 4.6-1.3 8-5.5 8-11V5zM9 12l2 2 4-4",
  lock: "M5 11h14v10H5zM8 11V7a4 4 0 0 1 8 0v4",
  key: "M15 7a4 4 0 1 1-3.5 6L5 19.5V22H2v-3l6.5-6.5A4 4 0 0 1 15 7zM16 9h.01",
  globe: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20",
  pin: "M12 22s7-6 7-12a7 7 0 0 0-14 0c0 6 7 12 7 12zM12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  clock: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2",
  cake: "M4 21h16v-8H4zM4 16c2 1 4 1 6-1 2 2 4 2 6 0 1.5 1 3 1 4 1M12 13V9M12 6a1 1 0 0 0 1-1c0-1-1-2-1-2s-1 1-1 2a1 1 0 0 0 1 1z",
  bot: "M5 8h14v12H5zM12 4v4M9 14h.01M15 14h.01M2 13v3M22 13v3",
  copy: "M9 9h12v12H9zM5 15H3V3h12v2",
  cookie: "M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5zM8.5 8.5h.01M16 15.5h.01M12 12h.01M11 17h.01M7 14h.01",
  fingerprint: "M12 11v4M8 13c0-2.2 1.8-4 4-4s4 1.8 4 4c0 3-1 5-2 7M6 11a6 6 0 0 1 12 0c0 4-1 7-3 10M4 10a8 8 0 0 1 16 0M9 21c1-2 1-4 1-6",
  onion: "M12 2c0 3-6 6-6 12a6 6 0 0 0 12 0c0-6-6-9-6-12zM12 8c0 2-3 4-3 7a3 3 0 0 0 6 0c0-3-3-5-3-7z",
  link: "M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7",
  gate: "M3 21V5l9-3 9 3v16M3 21h18M9 21v-8h6v8",
  filter: "M3 4h18l-7 8.5V20l-4-2v-5.5z",
  list: "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01",
  fish: "M6.5 12c3-5 9-6 14 0-5 6-11 5-14 0zM6.5 12 2 8v8zM16 11h.01",
  pen: "M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z",
  "mail-check": "M22 13V5H2v14h10M2 6l10 7 10-7M16 19l2 2 4-4",
  database: "M12 8c5 0 9-1.3 9-3s-4-3-9-3-9 1.3-9 3 4 3 9 3zM3 5v14c0 1.7 4 3 9 3s9-1.3 9-3V5M3 12c0 1.7 4 3 9 3s9-1.3 9-3",
  audit: "M9 5H7a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 3h6v4H9zM9 14l2 2 4-4",
  linkedin: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  facebook: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
  youtube: "M2.5 17a24 24 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.6 49.6 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24 24 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.6 49.6 0 0 1-16.2 0A2 2 0 0 1 2.5 17M10 15l5-3-5-3z",
  instagram: "M2 6a4 4 0 0 1 4-4h12a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4zM16 11.4A4 4 0 1 1 12.6 8 4 4 0 0 1 16 11.4zM17.5 6.5h.01",
  whatsapp: "M3 21l1.7-5A9 9 0 1 1 8 19.4zM9 9c0 3 2.5 6 6 6l1-1.5-2-1-1 1c-1 0-3-2-3-3l1-1-1-2z",
  chat: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  send: "M22 2 11 13M22 2l-7 20-4-9-9-4z",
  gift: "M3 8h18v4H3zM5 12v9h14v-9M12 8v13M12 8S10 3 7.5 3a2.5 2.5 0 0 0 0 5M12 8s2-5 4.5-5a2.5 2.5 0 0 1 0 5",
  coins: "M9 14a6 3 0 1 0 0-.1M3 11v6c0 1.7 2.7 3 6 3s6-1.3 6-3v-6M9 8a6 3 0 1 0 0-.1M15 6a6 3 0 1 1 6 3M21 9v6c0 1.4-1.8 2.5-4.4 2.9",
  bank: "M3 21h18M5 21V10M19 21V10M9 21V10M15 21V10M12 3 3 8h18z",
  card: "M2 5h20v14H2zM2 10h20M6 15h4",
  bell: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.9 1.9 0 0 0 3.4 0",
  sms: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2zM8 10h.01M12 10h.01M16 10h.01",
  dashboard: "M3 3h7v9H3zM14 3h7v5h-7zM14 12h7v9h-7zM3 16h7v5H3z",
  chart: "M3 3v18h18M7 15l4-4 3 3 6-7",
  search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3",
  clipboard: "M9 4h6v3H9zM8 5H6a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M8 12h8M8 16h5",
  flask: "M9 3h6M10 3v6L4 19a2 2 0 0 0 1.7 3h12.6a2 2 0 0 0 1.7-3L14 9V3M7 15h10",
  building: "M4 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18M16 9h2a2 2 0 0 1 2 2v11M2 22h20M8 6h4M8 10h4M8 14h4M8 18h4",
  dice: "M4 4h16v16H4zM8 8h.01M16 8h.01M12 12h.01M8 16h.01M16 16h.01",
  student: "M22 10 12 5 2 10l10 5zM6 12v5c3 2 9 2 12 0v-5M22 10v6",
  mic: "M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3zM19 10v2a7 7 0 0 1-14 0v-2M12 19v3",
  bolt: "M13 2 3 14h9l-1 8 10-12h-9z",
  calculator: "M5 2h14v20H5zM8 6h8v4H8zM8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01",
  paypal: "M7 21l1.2-7.5h3.3c4 0 6.5-2 7-5.8.4-3-1.5-4.7-4.7-4.7H8L5 21zM9.5 13.5l1.4-8.4",
  upi: "M8 4l-4 16M12 4l-4 16M15 6l5 6-5 6",
  calendar: "M3 5h18v16H3zM16 3v4M8 3v4M3 10h18",
  male: "M10 21a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM15 9l6-6M15 3h6v6",
  female: "M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM12 15v7M9 19h6",
  genderOther: "M12 16a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM12 16v6M9 19h6M15.5 7.5 20 3M16 3h4v4",
  eye: "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  eyeOff: "M3 3l18 18M10.6 10.6a3 3 0 0 0 4.2 4.2M9.9 4.2A10 10 0 0 1 12 4c6.5 0 10 8 10 8a17 17 0 0 1-2.2 3.2M6.6 6.6A17 17 0 0 0 2 12s3.5 7 10 7a9.6 9.6 0 0 0 5.4-1.6",
  refresh: "M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5",
  volume: "M11 5 6 9H2v6h4l5 4zM15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14",
  mute: "M11 5 6 9H2v6h4l5 4zM22 9l-6 6M16 9l6 6",
  quote: "M3 21c3 0 7-1 7-8V5H3v7h4c0 4-2 6-4 6zM14 21c3 0 7-1 7-8V5h-7v7h4c0 4-2 6-4 6z",
  external: "M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",
  info: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 16v-4M12 8h.01",
  compass: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM16.2 7.8l-2.1 6.3-6.3 2.1 2.1-6.3z",
  trophy: "M8 21h8M12 17v4M7 4h10v6a5 5 0 0 1-10 0zM17 5h3a3 3 0 0 1-3 4M7 5H4a3 3 0 0 0 3 4",
  trending: "M22 7 13.5 15.5l-5-5L2 17M16 7h6v6",
  book: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5zM4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5",
  scale: "M12 3v18M5 21h14M3 7h18M6 7l-3 7a3 3 0 0 0 6 0zM18 7l-3 7a3 3 0 0 0 6 0z",
  target: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  layers: "M12 2 2 7l10 5 10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  brain: "M9.5 2A2.5 2.5 0 0 0 7 4.5 2.5 2.5 0 0 0 4.5 7 3 3 0 0 0 3 12a3 3 0 0 0 1.5 5A2.5 2.5 0 0 0 7 19.5 2.5 2.5 0 0 0 9.5 22 2.5 2.5 0 0 0 12 19.5v-15A2.5 2.5 0 0 0 9.5 2zM14.5 2A2.5 2.5 0 0 1 17 4.5 2.5 2.5 0 0 1 19.5 7 3 3 0 0 1 21 12a3 3 0 0 1-1.5 5 2.5 2.5 0 0 1-2.5 2.5 2.5 2.5 0 0 1-2.5 2.5 2.5 2.5 0 0 1-2.5-2.5",
  lungs: "M12 3v9M12 12l-3-2M12 12l3-2M8.5 6.5C6 6.5 3 11 3 17c0 2 1 3 3 3 3 0 4-2 4-5V8.5a2 2 0 0 0-1.5-2zM15.5 6.5C18 6.5 21 11 21 17c0 2-1 3-3 3-3 0-4-2-4-5V8.5a2 2 0 0 1 1.5-2z",
  kidney: "M9 3C5 3 3 7 3 11s2 9 6 9c3 0 4-3 3-6-.6-1.8.6-2.6 2-3M15 3c4 0 6 4 6 8s-2 9-6 9c-1.5 0-2.5-.8-3-2",
  bone: "M17 10c.7-.7 1.7-.7 2.5 0a1.8 1.8 0 0 0 0-2.5 1.8 1.8 0 0 0-2.5-2.5 1.8 1.8 0 0 0-2.5 0c-.8.8-.8 1.8 0 2.5L7.5 14c-.7-.8-1.7-.8-2.5 0a1.8 1.8 0 0 0 0 2.5 1.8 1.8 0 0 0 2.5 2.5 1.8 1.8 0 0 0 2.5 0c.8-.8.8-1.8 0-2.5z",
  ear: "M6 8.5a6.5 6.5 0 1 1 13 0c0 6-6 6-6 10a3.5 3.5 0 1 1-7 0M15 8.5a2.5 2.5 0 0 0-5 0v1a2 2 0 1 1 0 4",
  baby: "M9 12h.01M15 12h.01M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1",
  drop: "M12 2.7s-6.5 7.1-6.5 11.8a6.5 6.5 0 0 0 13 0C18.5 9.8 12 2.7 12 2.7z",
  virus: "M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM12 2v5M12 17v5M2 12h5M17 12h5M4.9 4.9l3.5 3.5M15.6 15.6l3.5 3.5M4.9 19.1l3.5-3.5M15.6 8.4l3.5-3.5",
  dna: "M4 2c0 6 16 6 16 12s-16 6-16 8M20 2c0 6-16 6-16 12s16 6 16 8M7 5h10M7 19h10M9 9.5h6M9 14.5h6",
  stomach: "M9 2v4c0 2-2 3-4 4.5S2 14 2 17a5 5 0 0 0 9 3c1.5-2 4-1 6-1a5 5 0 0 0 5-5c0-3-2-4.5-4-4.5s-3 1-4.5 0S12 7 12 5V2",
  bandage: "M18.6 5.4a3 3 0 0 0-4.2 0L5.4 14.4a3 3 0 0 0 4.2 4.2l9-9a3 3 0 0 0 0-4.2zM10 10h.01M14 14h.01M12 12h.01",
  syringe: "M18 2l4 4M17 7l3-3M19 9 8.7 19.3a2.4 2.4 0 0 1-3.4 0l-.6-.6a2.4 2.4 0 0 1 0-3.4L15 5M9 11l4 4M5 19l-3 3M14 4l6 6",
  wheelchair: "M12 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM19 19l-3-6h-5V7M8 10a6 6 0 1 0 8.5 7.5M11 11h5",
  moon: "M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z",
  sun: "M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4",
  plane: "M22 2 11 13M22 2l-7 20-4-9-9-4z",
  ribbon: "M12 2a5 5 0 0 0-3.5 8.6L4 21l4-1.5L10 23l2-6 2 6 2-3.5 4 1.5-4.5-10.4A5 5 0 0 0 12 2z",
  thermo: "M14 14.8V4a2 2 0 0 0-4 0v10.8a4 4 0 1 0 4 0z",
  bed: "M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8v9",
  hospital: "M3 21h18M5 21V7l7-4 7 4v14M10 9h4M12 7v4M9 21v-5h6v5",
  smile: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01",
  apple: "M12 6.5c-1-1.5-3-2-4.5-1.3C5 6.3 4 9 4.6 12.5 5.4 17 8 21 10 21c1 0 1.3-.5 2-.5s1 .5 2 .5c2 0 4.6-4 5.4-8.5.6-3.5-.4-6.2-2.9-7.3-1.5-.7-3.5-.2-4.5 1.3zM12 6.5C12 4 13.5 2.5 15 2",
  venus: "M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM12 15v7M9 19h6",
  mars: "M10 20a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM14.5 9.5 21 3M15 3h6v6",
  rare: "M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6z"
};
function Icon({ name, size = 20, stroke = 2, className = "", title, fill = "none", style }) {
  const d = P[name] || P.sparkle;
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
    "svg",
    {
      className: `icon ${className}`,
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill,
      stroke: "currentColor",
      strokeWidth: stroke,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": title ? void 0 : "true",
      role: title ? "img" : void 0,
      style,
      children: [
        title && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("title", { children: title }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d })
      ]
    }
  );
}
var ICON_NAMES = Object.keys(P);

// src/components/ui.jsx
init_define_import_meta_env();
var import_react2 = __toESM(require_react(), 1);
var import_jsx_runtime3 = __toESM(require_jsx_runtime(), 1);
function useMounted() {
  const [m, setM] = (0, import_react2.useState)(false);
  (0, import_react2.useEffect)(() => setM(true), []);
  return m;
}
function useInView(options = { threshold: 0.15 }, once = true) {
  const ref = (0, import_react2.useRef)(null);
  const [inView, setInView] = (0, import_react2.useState)(false);
  (0, import_react2.useEffect)(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setInView(true);
        if (once) io.disconnect();
      } else if (!once) setInView(false);
    }, options);
    io.observe(el);
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        if (el.getBoundingClientRect().top < window.innerHeight) {
          setInView(true);
          cleanup();
        }
      });
    };
    const cleanup = () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
    if (once) window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      cleanup();
    };
  }, []);
  return [ref, inView];
}
function Reveal({ as: Tag = "div", className = "", delay = 0, children, effect = "up", style, ...rest }) {
  const [ref, inView] = useInView();
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Tag, { ref, className: `reveal reveal-${effect} ${inView ? "is-in" : ""} ${className}`, style: { ...style, "--d": `${delay}ms` }, ...rest, children });
}
function LiveZone({ as: Tag = "div", className = "", children, ...rest }) {
  const [ref, inView] = useInView({ threshold: 0 }, false);
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Tag, { ref, className: `live-zone ${inView ? "" : "is-paused"} ${className}`, ...rest, children });
}
function Flag({ code, name, size = 24, className = "" }) {
  const w = size <= 20 ? 20 : size <= 40 ? 40 : 80;
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    "img",
    {
      className: `flag ${className}`,
      src: flagUrl(code, w),
      alt: name ? `${name} flag` : "",
      width: size,
      height: Math.round(size * 0.75),
      loading: "lazy",
      decoding: "async"
    }
  );
}
function Stars({ value = 5, size = 16, className = "" }) {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: `stars ${className}`, "aria-label": `${value} out of 5 stars`, role: "img", children: [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Icon, { name: "star", size, fill: i <= value ? "currentColor" : "none", className: i <= value ? "on" : "off" }, i)) });
}
function Button({ to, children, variant = "primary", icon = "arrow", className = "", ...rest }) {
  const cls = `btn btn-${variant} ${className}`;
  const inner = /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "btn-label", children }),
    icon && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Icon, { name: icon, size: 18, className: "btn-icon" })
  ] });
  if (to) return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Link, { to, className: cls, ...rest, children: inner });
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { className: cls, ...rest, children: inner });
}
function Eyebrow({ children, color }) {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: "eyebrow", style: color ? { "--eb": color } : void 0, children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("i", { "aria-hidden": "true" }),
    children
  ] });
}
function SectionHead({ eyebrow, title, lead, align = "center", color, id }) {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("header", { className: `section-head align-${align}`, id, children: [
    eyebrow && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Eyebrow, { color, children: eyebrow }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h2", { children: title }),
    lead && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "lead", children: lead })
  ] });
}
function Breadcrumbs({ items }) {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("nav", { className: "crumbs", "aria-label": "Breadcrumb", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("ol", { children: items.map((it, i) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("li", { children: i < items.length - 1 ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Link, { to: it.to, children: it.label }) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { "aria-current": "page", children: it.label }) }, it.to || it.label)) }) });
}
function Accordion({ items, idPrefix = "acc", defaultOpen = -1 }) {
  const [open, setOpen] = (0, import_react2.useState)(defaultOpen);
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "accordion", children: items.map((it, i) => {
    const isOpen = open === i;
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: `acc-item ${isOpen ? "is-open" : ""}`, children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h3", { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
        "button",
        {
          type: "button",
          "aria-expanded": isOpen,
          "aria-controls": `${idPrefix}-${i}`,
          id: `${idPrefix}-btn-${i}`,
          onClick: () => setOpen(isOpen ? -1 : i),
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: it.q }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: "acc-sign", "aria-hidden": "true", children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("i", {}),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("i", {})
            ] })
          ]
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "acc-panel", id: `${idPrefix}-${i}`, role: "region", "aria-labelledby": `${idPrefix}-btn-${i}`, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { children: it.a }) }) })
    ] }, it.q);
  }) });
}

export {
  require_react,
  require_jsx_runtime,
  normalize,
  toHref,
  Router,
  useRouter,
  currentPath,
  currentAnchor,
  Link,
  Icon,
  useMounted,
  useInView,
  Reveal,
  LiveZone,
  Flag,
  Stars,
  Button,
  Eyebrow,
  SectionHead,
  Breadcrumbs,
  Accordion
};
/*! Bundled license information:

react/cjs/react.development.js:
  (**
   * @license React
   * react.development.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react-jsx-runtime.development.js:
  (**
   * @license React
   * react-jsx-runtime.development.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vbm9kZV9tb2R1bGVzL3JlYWN0L2Nqcy9yZWFjdC5kZXZlbG9wbWVudC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvcmVhY3QvaW5kZXguanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3JlYWN0L2Nqcy9yZWFjdC1qc3gtcnVudGltZS5kZXZlbG9wbWVudC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvcmVhY3QvanN4LXJ1bnRpbWUuanMiLCAiLi4vLi4vc3JjL3JvdXRlci5qc3giLCAiLi4vLi4vc3JjL2NvbXBvbmVudHMvSWNvbi5qc3giLCAiLi4vLi4vc3JjL2NvbXBvbmVudHMvdWkuanN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvKipcbiAqIEBsaWNlbnNlIFJlYWN0XG4gKiByZWFjdC5kZXZlbG9wbWVudC5qc1xuICpcbiAqIENvcHlyaWdodCAoYykgTWV0YSBQbGF0Zm9ybXMsIEluYy4gYW5kIGFmZmlsaWF0ZXMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cInByb2R1Y3Rpb25cIiAhPT0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgJiZcbiAgKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBkZWZpbmVEZXByZWNhdGlvbldhcm5pbmcobWV0aG9kTmFtZSwgaW5mbykge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENvbXBvbmVudC5wcm90b3R5cGUsIG1ldGhvZE5hbWUsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICAgXCIlcyguLi4pIGlzIGRlcHJlY2F0ZWQgaW4gcGxhaW4gSmF2YVNjcmlwdCBSZWFjdCBjbGFzc2VzLiAlc1wiLFxuICAgICAgICAgICAgaW5mb1swXSxcbiAgICAgICAgICAgIGluZm9bMV1cbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZ2V0SXRlcmF0b3JGbihtYXliZUl0ZXJhYmxlKSB7XG4gICAgICBpZiAobnVsbCA9PT0gbWF5YmVJdGVyYWJsZSB8fCBcIm9iamVjdFwiICE9PSB0eXBlb2YgbWF5YmVJdGVyYWJsZSlcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICBtYXliZUl0ZXJhYmxlID1cbiAgICAgICAgKE1BWUJFX0lURVJBVE9SX1NZTUJPTCAmJiBtYXliZUl0ZXJhYmxlW01BWUJFX0lURVJBVE9SX1NZTUJPTF0pIHx8XG4gICAgICAgIG1heWJlSXRlcmFibGVbXCJAQGl0ZXJhdG9yXCJdO1xuICAgICAgcmV0dXJuIFwiZnVuY3Rpb25cIiA9PT0gdHlwZW9mIG1heWJlSXRlcmFibGUgPyBtYXliZUl0ZXJhYmxlIDogbnVsbDtcbiAgICB9XG4gICAgZnVuY3Rpb24gd2Fybk5vb3AocHVibGljSW5zdGFuY2UsIGNhbGxlck5hbWUpIHtcbiAgICAgIHB1YmxpY0luc3RhbmNlID1cbiAgICAgICAgKChwdWJsaWNJbnN0YW5jZSA9IHB1YmxpY0luc3RhbmNlLmNvbnN0cnVjdG9yKSAmJlxuICAgICAgICAgIChwdWJsaWNJbnN0YW5jZS5kaXNwbGF5TmFtZSB8fCBwdWJsaWNJbnN0YW5jZS5uYW1lKSkgfHxcbiAgICAgICAgXCJSZWFjdENsYXNzXCI7XG4gICAgICB2YXIgd2FybmluZ0tleSA9IHB1YmxpY0luc3RhbmNlICsgXCIuXCIgKyBjYWxsZXJOYW1lO1xuICAgICAgZGlkV2FyblN0YXRlVXBkYXRlRm9yVW5tb3VudGVkQ29tcG9uZW50W3dhcm5pbmdLZXldIHx8XG4gICAgICAgIChjb25zb2xlLmVycm9yKFxuICAgICAgICAgIFwiQ2FuJ3QgY2FsbCAlcyBvbiBhIGNvbXBvbmVudCB0aGF0IGlzIG5vdCB5ZXQgbW91bnRlZC4gVGhpcyBpcyBhIG5vLW9wLCBidXQgaXQgbWlnaHQgaW5kaWNhdGUgYSBidWcgaW4geW91ciBhcHBsaWNhdGlvbi4gSW5zdGVhZCwgYXNzaWduIHRvIGB0aGlzLnN0YXRlYCBkaXJlY3RseSBvciBkZWZpbmUgYSBgc3RhdGUgPSB7fTtgIGNsYXNzIHByb3BlcnR5IHdpdGggdGhlIGRlc2lyZWQgc3RhdGUgaW4gdGhlICVzIGNvbXBvbmVudC5cIixcbiAgICAgICAgICBjYWxsZXJOYW1lLFxuICAgICAgICAgIHB1YmxpY0luc3RhbmNlXG4gICAgICAgICksXG4gICAgICAgIChkaWRXYXJuU3RhdGVVcGRhdGVGb3JVbm1vdW50ZWRDb21wb25lbnRbd2FybmluZ0tleV0gPSAhMCkpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBDb21wb25lbnQocHJvcHMsIGNvbnRleHQsIHVwZGF0ZXIpIHtcbiAgICAgIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgICB0aGlzLnJlZnMgPSBlbXB0eU9iamVjdDtcbiAgICAgIHRoaXMudXBkYXRlciA9IHVwZGF0ZXIgfHwgUmVhY3ROb29wVXBkYXRlUXVldWU7XG4gICAgfVxuICAgIGZ1bmN0aW9uIENvbXBvbmVudER1bW15KCkge31cbiAgICBmdW5jdGlvbiBQdXJlQ29tcG9uZW50KHByb3BzLCBjb250ZXh0LCB1cGRhdGVyKSB7XG4gICAgICB0aGlzLnByb3BzID0gcHJvcHM7XG4gICAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgICAgdGhpcy5yZWZzID0gZW1wdHlPYmplY3Q7XG4gICAgICB0aGlzLnVwZGF0ZXIgPSB1cGRhdGVyIHx8IFJlYWN0Tm9vcFVwZGF0ZVF1ZXVlO1xuICAgIH1cbiAgICBmdW5jdGlvbiBub29wKCkge31cbiAgICBmdW5jdGlvbiB0ZXN0U3RyaW5nQ29lcmNpb24odmFsdWUpIHtcbiAgICAgIHJldHVybiBcIlwiICsgdmFsdWU7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNoZWNrS2V5U3RyaW5nQ29lcmNpb24odmFsdWUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHRlc3RTdHJpbmdDb2VyY2lvbih2YWx1ZSk7XG4gICAgICAgIHZhciBKU0NvbXBpbGVyX2lubGluZV9yZXN1bHQgPSAhMTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgSlNDb21waWxlcl9pbmxpbmVfcmVzdWx0ID0gITA7XG4gICAgICB9XG4gICAgICBpZiAoSlNDb21waWxlcl9pbmxpbmVfcmVzdWx0KSB7XG4gICAgICAgIEpTQ29tcGlsZXJfaW5saW5lX3Jlc3VsdCA9IGNvbnNvbGU7XG4gICAgICAgIHZhciBKU0NvbXBpbGVyX3RlbXBfY29uc3QgPSBKU0NvbXBpbGVyX2lubGluZV9yZXN1bHQuZXJyb3I7XG4gICAgICAgIHZhciBKU0NvbXBpbGVyX2lubGluZV9yZXN1bHQkanNjb21wJDAgPVxuICAgICAgICAgIChcImZ1bmN0aW9uXCIgPT09IHR5cGVvZiBTeW1ib2wgJiZcbiAgICAgICAgICAgIFN5bWJvbC50b1N0cmluZ1RhZyAmJlxuICAgICAgICAgICAgdmFsdWVbU3ltYm9sLnRvU3RyaW5nVGFnXSkgfHxcbiAgICAgICAgICB2YWx1ZS5jb25zdHJ1Y3Rvci5uYW1lIHx8XG4gICAgICAgICAgXCJPYmplY3RcIjtcbiAgICAgICAgSlNDb21waWxlcl90ZW1wX2NvbnN0LmNhbGwoXG4gICAgICAgICAgSlNDb21waWxlcl9pbmxpbmVfcmVzdWx0LFxuICAgICAgICAgIFwiVGhlIHByb3ZpZGVkIGtleSBpcyBhbiB1bnN1cHBvcnRlZCB0eXBlICVzLiBUaGlzIHZhbHVlIG11c3QgYmUgY29lcmNlZCB0byBhIHN0cmluZyBiZWZvcmUgdXNpbmcgaXQgaGVyZS5cIixcbiAgICAgICAgICBKU0NvbXBpbGVyX2lubGluZV9yZXN1bHQkanNjb21wJDBcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIHRlc3RTdHJpbmdDb2VyY2lvbih2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldENvbXBvbmVudE5hbWVGcm9tVHlwZSh0eXBlKSB7XG4gICAgICBpZiAobnVsbCA9PSB0eXBlKSByZXR1cm4gbnVsbDtcbiAgICAgIGlmIChcImZ1bmN0aW9uXCIgPT09IHR5cGVvZiB0eXBlKVxuICAgICAgICByZXR1cm4gdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfQ0xJRU5UX1JFRkVSRU5DRVxuICAgICAgICAgID8gbnVsbFxuICAgICAgICAgIDogdHlwZS5kaXNwbGF5TmFtZSB8fCB0eXBlLm5hbWUgfHwgbnVsbDtcbiAgICAgIGlmIChcInN0cmluZ1wiID09PSB0eXBlb2YgdHlwZSkgcmV0dXJuIHR5cGU7XG4gICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSBSRUFDVF9GUkFHTUVOVF9UWVBFOlxuICAgICAgICAgIHJldHVybiBcIkZyYWdtZW50XCI7XG4gICAgICAgIGNhc2UgUkVBQ1RfUFJPRklMRVJfVFlQRTpcbiAgICAgICAgICByZXR1cm4gXCJQcm9maWxlclwiO1xuICAgICAgICBjYXNlIFJFQUNUX1NUUklDVF9NT0RFX1RZUEU6XG4gICAgICAgICAgcmV0dXJuIFwiU3RyaWN0TW9kZVwiO1xuICAgICAgICBjYXNlIFJFQUNUX1NVU1BFTlNFX1RZUEU6XG4gICAgICAgICAgcmV0dXJuIFwiU3VzcGVuc2VcIjtcbiAgICAgICAgY2FzZSBSRUFDVF9TVVNQRU5TRV9MSVNUX1RZUEU6XG4gICAgICAgICAgcmV0dXJuIFwiU3VzcGVuc2VMaXN0XCI7XG4gICAgICAgIGNhc2UgUkVBQ1RfQUNUSVZJVFlfVFlQRTpcbiAgICAgICAgICByZXR1cm4gXCJBY3Rpdml0eVwiO1xuICAgICAgfVxuICAgICAgaWYgKFwib2JqZWN0XCIgPT09IHR5cGVvZiB0eXBlKVxuICAgICAgICBzd2l0Y2ggKFxuICAgICAgICAgIChcIm51bWJlclwiID09PSB0eXBlb2YgdHlwZS50YWcgJiZcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgICAgIFwiUmVjZWl2ZWQgYW4gdW5leHBlY3RlZCBvYmplY3QgaW4gZ2V0Q29tcG9uZW50TmFtZUZyb21UeXBlKCkuIFRoaXMgaXMgbGlrZWx5IGEgYnVnIGluIFJlYWN0LiBQbGVhc2UgZmlsZSBhbiBpc3N1ZS5cIlxuICAgICAgICAgICAgKSxcbiAgICAgICAgICB0eXBlLiQkdHlwZW9mKVxuICAgICAgICApIHtcbiAgICAgICAgICBjYXNlIFJFQUNUX1BPUlRBTF9UWVBFOlxuICAgICAgICAgICAgcmV0dXJuIFwiUG9ydGFsXCI7XG4gICAgICAgICAgY2FzZSBSRUFDVF9DT05URVhUX1RZUEU6XG4gICAgICAgICAgICByZXR1cm4gdHlwZS5kaXNwbGF5TmFtZSB8fCBcIkNvbnRleHRcIjtcbiAgICAgICAgICBjYXNlIFJFQUNUX0NPTlNVTUVSX1RZUEU6XG4gICAgICAgICAgICByZXR1cm4gKHR5cGUuX2NvbnRleHQuZGlzcGxheU5hbWUgfHwgXCJDb250ZXh0XCIpICsgXCIuQ29uc3VtZXJcIjtcbiAgICAgICAgICBjYXNlIFJFQUNUX0ZPUldBUkRfUkVGX1RZUEU6XG4gICAgICAgICAgICB2YXIgaW5uZXJUeXBlID0gdHlwZS5yZW5kZXI7XG4gICAgICAgICAgICB0eXBlID0gdHlwZS5kaXNwbGF5TmFtZTtcbiAgICAgICAgICAgIHR5cGUgfHxcbiAgICAgICAgICAgICAgKCh0eXBlID0gaW5uZXJUeXBlLmRpc3BsYXlOYW1lIHx8IGlubmVyVHlwZS5uYW1lIHx8IFwiXCIpLFxuICAgICAgICAgICAgICAodHlwZSA9IFwiXCIgIT09IHR5cGUgPyBcIkZvcndhcmRSZWYoXCIgKyB0eXBlICsgXCIpXCIgOiBcIkZvcndhcmRSZWZcIikpO1xuICAgICAgICAgICAgcmV0dXJuIHR5cGU7XG4gICAgICAgICAgY2FzZSBSRUFDVF9NRU1PX1RZUEU6XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAoaW5uZXJUeXBlID0gdHlwZS5kaXNwbGF5TmFtZSB8fCBudWxsKSxcbiAgICAgICAgICAgICAgbnVsbCAhPT0gaW5uZXJUeXBlXG4gICAgICAgICAgICAgICAgPyBpbm5lclR5cGVcbiAgICAgICAgICAgICAgICA6IGdldENvbXBvbmVudE5hbWVGcm9tVHlwZSh0eXBlLnR5cGUpIHx8IFwiTWVtb1wiXG4gICAgICAgICAgICApO1xuICAgICAgICAgIGNhc2UgUkVBQ1RfTEFaWV9UWVBFOlxuICAgICAgICAgICAgaW5uZXJUeXBlID0gdHlwZS5fcGF5bG9hZDtcbiAgICAgICAgICAgIHR5cGUgPSB0eXBlLl9pbml0O1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgcmV0dXJuIGdldENvbXBvbmVudE5hbWVGcm9tVHlwZSh0eXBlKGlubmVyVHlwZSkpO1xuICAgICAgICAgICAgfSBjYXRjaCAoeCkge31cbiAgICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldFRhc2tOYW1lKHR5cGUpIHtcbiAgICAgIGlmICh0eXBlID09PSBSRUFDVF9GUkFHTUVOVF9UWVBFKSByZXR1cm4gXCI8PlwiO1xuICAgICAgaWYgKFxuICAgICAgICBcIm9iamVjdFwiID09PSB0eXBlb2YgdHlwZSAmJlxuICAgICAgICBudWxsICE9PSB0eXBlICYmXG4gICAgICAgIHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX0xBWllfVFlQRVxuICAgICAgKVxuICAgICAgICByZXR1cm4gXCI8Li4uPlwiO1xuICAgICAgdHJ5IHtcbiAgICAgICAgdmFyIG5hbWUgPSBnZXRDb21wb25lbnROYW1lRnJvbVR5cGUodHlwZSk7XG4gICAgICAgIHJldHVybiBuYW1lID8gXCI8XCIgKyBuYW1lICsgXCI+XCIgOiBcIjwuLi4+XCI7XG4gICAgICB9IGNhdGNoICh4KSB7XG4gICAgICAgIHJldHVybiBcIjwuLi4+XCI7XG4gICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldE93bmVyKCkge1xuICAgICAgdmFyIGRpc3BhdGNoZXIgPSBSZWFjdFNoYXJlZEludGVybmFscy5BO1xuICAgICAgcmV0dXJuIG51bGwgPT09IGRpc3BhdGNoZXIgPyBudWxsIDogZGlzcGF0Y2hlci5nZXRPd25lcigpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBVbmtub3duT3duZXIoKSB7XG4gICAgICByZXR1cm4gRXJyb3IoXCJyZWFjdC1zdGFjay10b3AtZnJhbWVcIik7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGhhc1ZhbGlkS2V5KGNvbmZpZykge1xuICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoY29uZmlnLCBcImtleVwiKSkge1xuICAgICAgICB2YXIgZ2V0dGVyID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihjb25maWcsIFwia2V5XCIpLmdldDtcbiAgICAgICAgaWYgKGdldHRlciAmJiBnZXR0ZXIuaXNSZWFjdFdhcm5pbmcpIHJldHVybiAhMTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB2b2lkIDAgIT09IGNvbmZpZy5rZXk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGRlZmluZUtleVByb3BXYXJuaW5nR2V0dGVyKHByb3BzLCBkaXNwbGF5TmFtZSkge1xuICAgICAgZnVuY3Rpb24gd2FybkFib3V0QWNjZXNzaW5nS2V5KCkge1xuICAgICAgICBzcGVjaWFsUHJvcEtleVdhcm5pbmdTaG93biB8fFxuICAgICAgICAgICgoc3BlY2lhbFByb3BLZXlXYXJuaW5nU2hvd24gPSAhMCksXG4gICAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICAgIFwiJXM6IGBrZXlgIGlzIG5vdCBhIHByb3AuIFRyeWluZyB0byBhY2Nlc3MgaXQgd2lsbCByZXN1bHQgaW4gYHVuZGVmaW5lZGAgYmVpbmcgcmV0dXJuZWQuIElmIHlvdSBuZWVkIHRvIGFjY2VzcyB0aGUgc2FtZSB2YWx1ZSB3aXRoaW4gdGhlIGNoaWxkIGNvbXBvbmVudCwgeW91IHNob3VsZCBwYXNzIGl0IGFzIGEgZGlmZmVyZW50IHByb3AuIChodHRwczovL3JlYWN0LmRldi9saW5rL3NwZWNpYWwtcHJvcHMpXCIsXG4gICAgICAgICAgICBkaXNwbGF5TmFtZVxuICAgICAgICAgICkpO1xuICAgICAgfVxuICAgICAgd2FybkFib3V0QWNjZXNzaW5nS2V5LmlzUmVhY3RXYXJuaW5nID0gITA7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkocHJvcHMsIFwia2V5XCIsIHtcbiAgICAgICAgZ2V0OiB3YXJuQWJvdXRBY2Nlc3NpbmdLZXksXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogITBcbiAgICAgIH0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiBlbGVtZW50UmVmR2V0dGVyV2l0aERlcHJlY2F0aW9uV2FybmluZygpIHtcbiAgICAgIHZhciBjb21wb25lbnROYW1lID0gZ2V0Q29tcG9uZW50TmFtZUZyb21UeXBlKHRoaXMudHlwZSk7XG4gICAgICBkaWRXYXJuQWJvdXRFbGVtZW50UmVmW2NvbXBvbmVudE5hbWVdIHx8XG4gICAgICAgICgoZGlkV2FybkFib3V0RWxlbWVudFJlZltjb21wb25lbnROYW1lXSA9ICEwKSxcbiAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICBcIkFjY2Vzc2luZyBlbGVtZW50LnJlZiB3YXMgcmVtb3ZlZCBpbiBSZWFjdCAxOS4gcmVmIGlzIG5vdyBhIHJlZ3VsYXIgcHJvcC4gSXQgd2lsbCBiZSByZW1vdmVkIGZyb20gdGhlIEpTWCBFbGVtZW50IHR5cGUgaW4gYSBmdXR1cmUgcmVsZWFzZS5cIlxuICAgICAgICApKTtcbiAgICAgIGNvbXBvbmVudE5hbWUgPSB0aGlzLnByb3BzLnJlZjtcbiAgICAgIHJldHVybiB2b2lkIDAgIT09IGNvbXBvbmVudE5hbWUgPyBjb21wb25lbnROYW1lIDogbnVsbDtcbiAgICB9XG4gICAgZnVuY3Rpb24gUmVhY3RFbGVtZW50KHR5cGUsIGtleSwgcHJvcHMsIG93bmVyLCBkZWJ1Z1N0YWNrLCBkZWJ1Z1Rhc2spIHtcbiAgICAgIHZhciByZWZQcm9wID0gcHJvcHMucmVmO1xuICAgICAgdHlwZSA9IHtcbiAgICAgICAgJCR0eXBlb2Y6IFJFQUNUX0VMRU1FTlRfVFlQRSxcbiAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAga2V5OiBrZXksXG4gICAgICAgIHByb3BzOiBwcm9wcyxcbiAgICAgICAgX293bmVyOiBvd25lclxuICAgICAgfTtcbiAgICAgIG51bGwgIT09ICh2b2lkIDAgIT09IHJlZlByb3AgPyByZWZQcm9wIDogbnVsbClcbiAgICAgICAgPyBPYmplY3QuZGVmaW5lUHJvcGVydHkodHlwZSwgXCJyZWZcIiwge1xuICAgICAgICAgICAgZW51bWVyYWJsZTogITEsXG4gICAgICAgICAgICBnZXQ6IGVsZW1lbnRSZWZHZXR0ZXJXaXRoRGVwcmVjYXRpb25XYXJuaW5nXG4gICAgICAgICAgfSlcbiAgICAgICAgOiBPYmplY3QuZGVmaW5lUHJvcGVydHkodHlwZSwgXCJyZWZcIiwgeyBlbnVtZXJhYmxlOiAhMSwgdmFsdWU6IG51bGwgfSk7XG4gICAgICB0eXBlLl9zdG9yZSA9IHt9O1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHR5cGUuX3N0b3JlLCBcInZhbGlkYXRlZFwiLCB7XG4gICAgICAgIGNvbmZpZ3VyYWJsZTogITEsXG4gICAgICAgIGVudW1lcmFibGU6ICExLFxuICAgICAgICB3cml0YWJsZTogITAsXG4gICAgICAgIHZhbHVlOiAwXG4gICAgICB9KTtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0eXBlLCBcIl9kZWJ1Z0luZm9cIiwge1xuICAgICAgICBjb25maWd1cmFibGU6ICExLFxuICAgICAgICBlbnVtZXJhYmxlOiAhMSxcbiAgICAgICAgd3JpdGFibGU6ICEwLFxuICAgICAgICB2YWx1ZTogbnVsbFxuICAgICAgfSk7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodHlwZSwgXCJfZGVidWdTdGFja1wiLCB7XG4gICAgICAgIGNvbmZpZ3VyYWJsZTogITEsXG4gICAgICAgIGVudW1lcmFibGU6ICExLFxuICAgICAgICB3cml0YWJsZTogITAsXG4gICAgICAgIHZhbHVlOiBkZWJ1Z1N0YWNrXG4gICAgICB9KTtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0eXBlLCBcIl9kZWJ1Z1Rhc2tcIiwge1xuICAgICAgICBjb25maWd1cmFibGU6ICExLFxuICAgICAgICBlbnVtZXJhYmxlOiAhMSxcbiAgICAgICAgd3JpdGFibGU6ICEwLFxuICAgICAgICB2YWx1ZTogZGVidWdUYXNrXG4gICAgICB9KTtcbiAgICAgIE9iamVjdC5mcmVlemUgJiYgKE9iamVjdC5mcmVlemUodHlwZS5wcm9wcyksIE9iamVjdC5mcmVlemUodHlwZSkpO1xuICAgICAgcmV0dXJuIHR5cGU7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNsb25lQW5kUmVwbGFjZUtleShvbGRFbGVtZW50LCBuZXdLZXkpIHtcbiAgICAgIG5ld0tleSA9IFJlYWN0RWxlbWVudChcbiAgICAgICAgb2xkRWxlbWVudC50eXBlLFxuICAgICAgICBuZXdLZXksXG4gICAgICAgIG9sZEVsZW1lbnQucHJvcHMsXG4gICAgICAgIG9sZEVsZW1lbnQuX293bmVyLFxuICAgICAgICBvbGRFbGVtZW50Ll9kZWJ1Z1N0YWNrLFxuICAgICAgICBvbGRFbGVtZW50Ll9kZWJ1Z1Rhc2tcbiAgICAgICk7XG4gICAgICBvbGRFbGVtZW50Ll9zdG9yZSAmJlxuICAgICAgICAobmV3S2V5Ll9zdG9yZS52YWxpZGF0ZWQgPSBvbGRFbGVtZW50Ll9zdG9yZS52YWxpZGF0ZWQpO1xuICAgICAgcmV0dXJuIG5ld0tleTtcbiAgICB9XG4gICAgZnVuY3Rpb24gdmFsaWRhdGVDaGlsZEtleXMobm9kZSkge1xuICAgICAgaXNWYWxpZEVsZW1lbnQobm9kZSlcbiAgICAgICAgPyBub2RlLl9zdG9yZSAmJiAobm9kZS5fc3RvcmUudmFsaWRhdGVkID0gMSlcbiAgICAgICAgOiBcIm9iamVjdFwiID09PSB0eXBlb2Ygbm9kZSAmJlxuICAgICAgICAgIG51bGwgIT09IG5vZGUgJiZcbiAgICAgICAgICBub2RlLiQkdHlwZW9mID09PSBSRUFDVF9MQVpZX1RZUEUgJiZcbiAgICAgICAgICAoXCJmdWxmaWxsZWRcIiA9PT0gbm9kZS5fcGF5bG9hZC5zdGF0dXNcbiAgICAgICAgICAgID8gaXNWYWxpZEVsZW1lbnQobm9kZS5fcGF5bG9hZC52YWx1ZSkgJiZcbiAgICAgICAgICAgICAgbm9kZS5fcGF5bG9hZC52YWx1ZS5fc3RvcmUgJiZcbiAgICAgICAgICAgICAgKG5vZGUuX3BheWxvYWQudmFsdWUuX3N0b3JlLnZhbGlkYXRlZCA9IDEpXG4gICAgICAgICAgICA6IG5vZGUuX3N0b3JlICYmIChub2RlLl9zdG9yZS52YWxpZGF0ZWQgPSAxKSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGlzVmFsaWRFbGVtZW50KG9iamVjdCkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgXCJvYmplY3RcIiA9PT0gdHlwZW9mIG9iamVjdCAmJlxuICAgICAgICBudWxsICE9PSBvYmplY3QgJiZcbiAgICAgICAgb2JqZWN0LiQkdHlwZW9mID09PSBSRUFDVF9FTEVNRU5UX1RZUEVcbiAgICAgICk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGVzY2FwZShrZXkpIHtcbiAgICAgIHZhciBlc2NhcGVyTG9va3VwID0geyBcIj1cIjogXCI9MFwiLCBcIjpcIjogXCI9MlwiIH07XG4gICAgICByZXR1cm4gKFxuICAgICAgICBcIiRcIiArXG4gICAgICAgIGtleS5yZXBsYWNlKC9bPTpdL2csIGZ1bmN0aW9uIChtYXRjaCkge1xuICAgICAgICAgIHJldHVybiBlc2NhcGVyTG9va3VwW21hdGNoXTtcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldEVsZW1lbnRLZXkoZWxlbWVudCwgaW5kZXgpIHtcbiAgICAgIHJldHVybiBcIm9iamVjdFwiID09PSB0eXBlb2YgZWxlbWVudCAmJlxuICAgICAgICBudWxsICE9PSBlbGVtZW50ICYmXG4gICAgICAgIG51bGwgIT0gZWxlbWVudC5rZXlcbiAgICAgICAgPyAoY2hlY2tLZXlTdHJpbmdDb2VyY2lvbihlbGVtZW50LmtleSksIGVzY2FwZShcIlwiICsgZWxlbWVudC5rZXkpKVxuICAgICAgICA6IGluZGV4LnRvU3RyaW5nKDM2KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcmVzb2x2ZVRoZW5hYmxlKHRoZW5hYmxlKSB7XG4gICAgICBzd2l0Y2ggKHRoZW5hYmxlLnN0YXR1cykge1xuICAgICAgICBjYXNlIFwiZnVsZmlsbGVkXCI6XG4gICAgICAgICAgcmV0dXJuIHRoZW5hYmxlLnZhbHVlO1xuICAgICAgICBjYXNlIFwicmVqZWN0ZWRcIjpcbiAgICAgICAgICB0aHJvdyB0aGVuYWJsZS5yZWFzb247XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgc3dpdGNoIChcbiAgICAgICAgICAgIChcInN0cmluZ1wiID09PSB0eXBlb2YgdGhlbmFibGUuc3RhdHVzXG4gICAgICAgICAgICAgID8gdGhlbmFibGUudGhlbihub29wLCBub29wKVxuICAgICAgICAgICAgICA6ICgodGhlbmFibGUuc3RhdHVzID0gXCJwZW5kaW5nXCIpLFxuICAgICAgICAgICAgICAgIHRoZW5hYmxlLnRoZW4oXG4gICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoZnVsZmlsbGVkVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgXCJwZW5kaW5nXCIgPT09IHRoZW5hYmxlLnN0YXR1cyAmJlxuICAgICAgICAgICAgICAgICAgICAgICgodGhlbmFibGUuc3RhdHVzID0gXCJmdWxmaWxsZWRcIiksXG4gICAgICAgICAgICAgICAgICAgICAgKHRoZW5hYmxlLnZhbHVlID0gZnVsZmlsbGVkVmFsdWUpKTtcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgXCJwZW5kaW5nXCIgPT09IHRoZW5hYmxlLnN0YXR1cyAmJlxuICAgICAgICAgICAgICAgICAgICAgICgodGhlbmFibGUuc3RhdHVzID0gXCJyZWplY3RlZFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAodGhlbmFibGUucmVhc29uID0gZXJyb3IpKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApKSxcbiAgICAgICAgICAgIHRoZW5hYmxlLnN0YXR1cylcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGNhc2UgXCJmdWxmaWxsZWRcIjpcbiAgICAgICAgICAgICAgcmV0dXJuIHRoZW5hYmxlLnZhbHVlO1xuICAgICAgICAgICAgY2FzZSBcInJlamVjdGVkXCI6XG4gICAgICAgICAgICAgIHRocm93IHRoZW5hYmxlLnJlYXNvbjtcbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aHJvdyB0aGVuYWJsZTtcbiAgICB9XG4gICAgZnVuY3Rpb24gbWFwSW50b0FycmF5KGNoaWxkcmVuLCBhcnJheSwgZXNjYXBlZFByZWZpeCwgbmFtZVNvRmFyLCBjYWxsYmFjaykge1xuICAgICAgdmFyIHR5cGUgPSB0eXBlb2YgY2hpbGRyZW47XG4gICAgICBpZiAoXCJ1bmRlZmluZWRcIiA9PT0gdHlwZSB8fCBcImJvb2xlYW5cIiA9PT0gdHlwZSkgY2hpbGRyZW4gPSBudWxsO1xuICAgICAgdmFyIGludm9rZUNhbGxiYWNrID0gITE7XG4gICAgICBpZiAobnVsbCA9PT0gY2hpbGRyZW4pIGludm9rZUNhbGxiYWNrID0gITA7XG4gICAgICBlbHNlXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgIGNhc2UgXCJiaWdpbnRcIjpcbiAgICAgICAgICBjYXNlIFwic3RyaW5nXCI6XG4gICAgICAgICAgY2FzZSBcIm51bWJlclwiOlxuICAgICAgICAgICAgaW52b2tlQ2FsbGJhY2sgPSAhMDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgXCJvYmplY3RcIjpcbiAgICAgICAgICAgIHN3aXRjaCAoY2hpbGRyZW4uJCR0eXBlb2YpIHtcbiAgICAgICAgICAgICAgY2FzZSBSRUFDVF9FTEVNRU5UX1RZUEU6XG4gICAgICAgICAgICAgIGNhc2UgUkVBQ1RfUE9SVEFMX1RZUEU6XG4gICAgICAgICAgICAgICAgaW52b2tlQ2FsbGJhY2sgPSAhMDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSBSRUFDVF9MQVpZX1RZUEU6XG4gICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgIChpbnZva2VDYWxsYmFjayA9IGNoaWxkcmVuLl9pbml0KSxcbiAgICAgICAgICAgICAgICAgIG1hcEludG9BcnJheShcbiAgICAgICAgICAgICAgICAgICAgaW52b2tlQ2FsbGJhY2soY2hpbGRyZW4uX3BheWxvYWQpLFxuICAgICAgICAgICAgICAgICAgICBhcnJheSxcbiAgICAgICAgICAgICAgICAgICAgZXNjYXBlZFByZWZpeCxcbiAgICAgICAgICAgICAgICAgICAgbmFtZVNvRmFyLFxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFja1xuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIGlmIChpbnZva2VDYWxsYmFjaykge1xuICAgICAgICBpbnZva2VDYWxsYmFjayA9IGNoaWxkcmVuO1xuICAgICAgICBjYWxsYmFjayA9IGNhbGxiYWNrKGludm9rZUNhbGxiYWNrKTtcbiAgICAgICAgdmFyIGNoaWxkS2V5ID1cbiAgICAgICAgICBcIlwiID09PSBuYW1lU29GYXIgPyBcIi5cIiArIGdldEVsZW1lbnRLZXkoaW52b2tlQ2FsbGJhY2ssIDApIDogbmFtZVNvRmFyO1xuICAgICAgICBpc0FycmF5SW1wbChjYWxsYmFjaylcbiAgICAgICAgICA/ICgoZXNjYXBlZFByZWZpeCA9IFwiXCIpLFxuICAgICAgICAgICAgbnVsbCAhPSBjaGlsZEtleSAmJlxuICAgICAgICAgICAgICAoZXNjYXBlZFByZWZpeCA9XG4gICAgICAgICAgICAgICAgY2hpbGRLZXkucmVwbGFjZSh1c2VyUHJvdmlkZWRLZXlFc2NhcGVSZWdleCwgXCIkJi9cIikgKyBcIi9cIiksXG4gICAgICAgICAgICBtYXBJbnRvQXJyYXkoY2FsbGJhY2ssIGFycmF5LCBlc2NhcGVkUHJlZml4LCBcIlwiLCBmdW5jdGlvbiAoYykge1xuICAgICAgICAgICAgICByZXR1cm4gYztcbiAgICAgICAgICAgIH0pKVxuICAgICAgICAgIDogbnVsbCAhPSBjYWxsYmFjayAmJlxuICAgICAgICAgICAgKGlzVmFsaWRFbGVtZW50KGNhbGxiYWNrKSAmJlxuICAgICAgICAgICAgICAobnVsbCAhPSBjYWxsYmFjay5rZXkgJiZcbiAgICAgICAgICAgICAgICAoKGludm9rZUNhbGxiYWNrICYmIGludm9rZUNhbGxiYWNrLmtleSA9PT0gY2FsbGJhY2sua2V5KSB8fFxuICAgICAgICAgICAgICAgICAgY2hlY2tLZXlTdHJpbmdDb2VyY2lvbihjYWxsYmFjay5rZXkpKSxcbiAgICAgICAgICAgICAgKGVzY2FwZWRQcmVmaXggPSBjbG9uZUFuZFJlcGxhY2VLZXkoXG4gICAgICAgICAgICAgICAgY2FsbGJhY2ssXG4gICAgICAgICAgICAgICAgZXNjYXBlZFByZWZpeCArXG4gICAgICAgICAgICAgICAgICAobnVsbCA9PSBjYWxsYmFjay5rZXkgfHxcbiAgICAgICAgICAgICAgICAgIChpbnZva2VDYWxsYmFjayAmJiBpbnZva2VDYWxsYmFjay5rZXkgPT09IGNhbGxiYWNrLmtleSlcbiAgICAgICAgICAgICAgICAgICAgPyBcIlwiXG4gICAgICAgICAgICAgICAgICAgIDogKFwiXCIgKyBjYWxsYmFjay5rZXkpLnJlcGxhY2UoXG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VyUHJvdmlkZWRLZXlFc2NhcGVSZWdleCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiJCYvXCJcbiAgICAgICAgICAgICAgICAgICAgICApICsgXCIvXCIpICtcbiAgICAgICAgICAgICAgICAgIGNoaWxkS2V5XG4gICAgICAgICAgICAgICkpLFxuICAgICAgICAgICAgICBcIlwiICE9PSBuYW1lU29GYXIgJiZcbiAgICAgICAgICAgICAgICBudWxsICE9IGludm9rZUNhbGxiYWNrICYmXG4gICAgICAgICAgICAgICAgaXNWYWxpZEVsZW1lbnQoaW52b2tlQ2FsbGJhY2spICYmXG4gICAgICAgICAgICAgICAgbnVsbCA9PSBpbnZva2VDYWxsYmFjay5rZXkgJiZcbiAgICAgICAgICAgICAgICBpbnZva2VDYWxsYmFjay5fc3RvcmUgJiZcbiAgICAgICAgICAgICAgICAhaW52b2tlQ2FsbGJhY2suX3N0b3JlLnZhbGlkYXRlZCAmJlxuICAgICAgICAgICAgICAgIChlc2NhcGVkUHJlZml4Ll9zdG9yZS52YWxpZGF0ZWQgPSAyKSxcbiAgICAgICAgICAgICAgKGNhbGxiYWNrID0gZXNjYXBlZFByZWZpeCkpLFxuICAgICAgICAgICAgYXJyYXkucHVzaChjYWxsYmFjaykpO1xuICAgICAgICByZXR1cm4gMTtcbiAgICAgIH1cbiAgICAgIGludm9rZUNhbGxiYWNrID0gMDtcbiAgICAgIGNoaWxkS2V5ID0gXCJcIiA9PT0gbmFtZVNvRmFyID8gXCIuXCIgOiBuYW1lU29GYXIgKyBcIjpcIjtcbiAgICAgIGlmIChpc0FycmF5SW1wbChjaGlsZHJlbikpXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspXG4gICAgICAgICAgKG5hbWVTb0ZhciA9IGNoaWxkcmVuW2ldKSxcbiAgICAgICAgICAgICh0eXBlID0gY2hpbGRLZXkgKyBnZXRFbGVtZW50S2V5KG5hbWVTb0ZhciwgaSkpLFxuICAgICAgICAgICAgKGludm9rZUNhbGxiYWNrICs9IG1hcEludG9BcnJheShcbiAgICAgICAgICAgICAgbmFtZVNvRmFyLFxuICAgICAgICAgICAgICBhcnJheSxcbiAgICAgICAgICAgICAgZXNjYXBlZFByZWZpeCxcbiAgICAgICAgICAgICAgdHlwZSxcbiAgICAgICAgICAgICAgY2FsbGJhY2tcbiAgICAgICAgICAgICkpO1xuICAgICAgZWxzZSBpZiAoKChpID0gZ2V0SXRlcmF0b3JGbihjaGlsZHJlbikpLCBcImZ1bmN0aW9uXCIgPT09IHR5cGVvZiBpKSlcbiAgICAgICAgZm9yIChcbiAgICAgICAgICBpID09PSBjaGlsZHJlbi5lbnRyaWVzICYmXG4gICAgICAgICAgICAoZGlkV2FybkFib3V0TWFwcyB8fFxuICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgICAgICAgXCJVc2luZyBNYXBzIGFzIGNoaWxkcmVuIGlzIG5vdCBzdXBwb3J0ZWQuIFVzZSBhbiBhcnJheSBvZiBrZXllZCBSZWFjdEVsZW1lbnRzIGluc3RlYWQuXCJcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIChkaWRXYXJuQWJvdXRNYXBzID0gITApKSxcbiAgICAgICAgICAgIGNoaWxkcmVuID0gaS5jYWxsKGNoaWxkcmVuKSxcbiAgICAgICAgICAgIGkgPSAwO1xuICAgICAgICAgICEobmFtZVNvRmFyID0gY2hpbGRyZW4ubmV4dCgpKS5kb25lO1xuXG4gICAgICAgIClcbiAgICAgICAgICAobmFtZVNvRmFyID0gbmFtZVNvRmFyLnZhbHVlKSxcbiAgICAgICAgICAgICh0eXBlID0gY2hpbGRLZXkgKyBnZXRFbGVtZW50S2V5KG5hbWVTb0ZhciwgaSsrKSksXG4gICAgICAgICAgICAoaW52b2tlQ2FsbGJhY2sgKz0gbWFwSW50b0FycmF5KFxuICAgICAgICAgICAgICBuYW1lU29GYXIsXG4gICAgICAgICAgICAgIGFycmF5LFxuICAgICAgICAgICAgICBlc2NhcGVkUHJlZml4LFxuICAgICAgICAgICAgICB0eXBlLFxuICAgICAgICAgICAgICBjYWxsYmFja1xuICAgICAgICAgICAgKSk7XG4gICAgICBlbHNlIGlmIChcIm9iamVjdFwiID09PSB0eXBlKSB7XG4gICAgICAgIGlmIChcImZ1bmN0aW9uXCIgPT09IHR5cGVvZiBjaGlsZHJlbi50aGVuKVxuICAgICAgICAgIHJldHVybiBtYXBJbnRvQXJyYXkoXG4gICAgICAgICAgICByZXNvbHZlVGhlbmFibGUoY2hpbGRyZW4pLFxuICAgICAgICAgICAgYXJyYXksXG4gICAgICAgICAgICBlc2NhcGVkUHJlZml4LFxuICAgICAgICAgICAgbmFtZVNvRmFyLFxuICAgICAgICAgICAgY2FsbGJhY2tcbiAgICAgICAgICApO1xuICAgICAgICBhcnJheSA9IFN0cmluZyhjaGlsZHJlbik7XG4gICAgICAgIHRocm93IEVycm9yKFxuICAgICAgICAgIFwiT2JqZWN0cyBhcmUgbm90IHZhbGlkIGFzIGEgUmVhY3QgY2hpbGQgKGZvdW5kOiBcIiArXG4gICAgICAgICAgICAoXCJbb2JqZWN0IE9iamVjdF1cIiA9PT0gYXJyYXlcbiAgICAgICAgICAgICAgPyBcIm9iamVjdCB3aXRoIGtleXMge1wiICsgT2JqZWN0LmtleXMoY2hpbGRyZW4pLmpvaW4oXCIsIFwiKSArIFwifVwiXG4gICAgICAgICAgICAgIDogYXJyYXkpICtcbiAgICAgICAgICAgIFwiKS4gSWYgeW91IG1lYW50IHRvIHJlbmRlciBhIGNvbGxlY3Rpb24gb2YgY2hpbGRyZW4sIHVzZSBhbiBhcnJheSBpbnN0ZWFkLlwiXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICByZXR1cm4gaW52b2tlQ2FsbGJhY2s7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG1hcENoaWxkcmVuKGNoaWxkcmVuLCBmdW5jLCBjb250ZXh0KSB7XG4gICAgICBpZiAobnVsbCA9PSBjaGlsZHJlbikgcmV0dXJuIGNoaWxkcmVuO1xuICAgICAgdmFyIHJlc3VsdCA9IFtdLFxuICAgICAgICBjb3VudCA9IDA7XG4gICAgICBtYXBJbnRvQXJyYXkoY2hpbGRyZW4sIHJlc3VsdCwgXCJcIiwgXCJcIiwgZnVuY3Rpb24gKGNoaWxkKSB7XG4gICAgICAgIHJldHVybiBmdW5jLmNhbGwoY29udGV4dCwgY2hpbGQsIGNvdW50KyspO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBmdW5jdGlvbiBsYXp5SW5pdGlhbGl6ZXIocGF5bG9hZCkge1xuICAgICAgaWYgKC0xID09PSBwYXlsb2FkLl9zdGF0dXMpIHtcbiAgICAgICAgdmFyIGlvSW5mbyA9IHBheWxvYWQuX2lvSW5mbztcbiAgICAgICAgbnVsbCAhPSBpb0luZm8gJiYgKGlvSW5mby5zdGFydCA9IGlvSW5mby5lbmQgPSBwZXJmb3JtYW5jZS5ub3coKSk7XG4gICAgICAgIGlvSW5mbyA9IHBheWxvYWQuX3Jlc3VsdDtcbiAgICAgICAgdmFyIHRoZW5hYmxlID0gaW9JbmZvKCk7XG4gICAgICAgIHRoZW5hYmxlLnRoZW4oXG4gICAgICAgICAgZnVuY3Rpb24gKG1vZHVsZU9iamVjdCkge1xuICAgICAgICAgICAgaWYgKDAgPT09IHBheWxvYWQuX3N0YXR1cyB8fCAtMSA9PT0gcGF5bG9hZC5fc3RhdHVzKSB7XG4gICAgICAgICAgICAgIHBheWxvYWQuX3N0YXR1cyA9IDE7XG4gICAgICAgICAgICAgIHBheWxvYWQuX3Jlc3VsdCA9IG1vZHVsZU9iamVjdDtcbiAgICAgICAgICAgICAgdmFyIF9pb0luZm8gPSBwYXlsb2FkLl9pb0luZm87XG4gICAgICAgICAgICAgIG51bGwgIT0gX2lvSW5mbyAmJiAoX2lvSW5mby5lbmQgPSBwZXJmb3JtYW5jZS5ub3coKSk7XG4gICAgICAgICAgICAgIHZvaWQgMCA9PT0gdGhlbmFibGUuc3RhdHVzICYmXG4gICAgICAgICAgICAgICAgKCh0aGVuYWJsZS5zdGF0dXMgPSBcImZ1bGZpbGxlZFwiKSxcbiAgICAgICAgICAgICAgICAodGhlbmFibGUudmFsdWUgPSBtb2R1bGVPYmplY3QpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgaWYgKDAgPT09IHBheWxvYWQuX3N0YXR1cyB8fCAtMSA9PT0gcGF5bG9hZC5fc3RhdHVzKSB7XG4gICAgICAgICAgICAgIHBheWxvYWQuX3N0YXR1cyA9IDI7XG4gICAgICAgICAgICAgIHBheWxvYWQuX3Jlc3VsdCA9IGVycm9yO1xuICAgICAgICAgICAgICB2YXIgX2lvSW5mbzIgPSBwYXlsb2FkLl9pb0luZm87XG4gICAgICAgICAgICAgIG51bGwgIT0gX2lvSW5mbzIgJiYgKF9pb0luZm8yLmVuZCA9IHBlcmZvcm1hbmNlLm5vdygpKTtcbiAgICAgICAgICAgICAgdm9pZCAwID09PSB0aGVuYWJsZS5zdGF0dXMgJiZcbiAgICAgICAgICAgICAgICAoKHRoZW5hYmxlLnN0YXR1cyA9IFwicmVqZWN0ZWRcIiksICh0aGVuYWJsZS5yZWFzb24gPSBlcnJvcikpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgICAgaW9JbmZvID0gcGF5bG9hZC5faW9JbmZvO1xuICAgICAgICBpZiAobnVsbCAhPSBpb0luZm8pIHtcbiAgICAgICAgICBpb0luZm8udmFsdWUgPSB0aGVuYWJsZTtcbiAgICAgICAgICB2YXIgZGlzcGxheU5hbWUgPSB0aGVuYWJsZS5kaXNwbGF5TmFtZTtcbiAgICAgICAgICBcInN0cmluZ1wiID09PSB0eXBlb2YgZGlzcGxheU5hbWUgJiYgKGlvSW5mby5uYW1lID0gZGlzcGxheU5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIC0xID09PSBwYXlsb2FkLl9zdGF0dXMgJiZcbiAgICAgICAgICAoKHBheWxvYWQuX3N0YXR1cyA9IDApLCAocGF5bG9hZC5fcmVzdWx0ID0gdGhlbmFibGUpKTtcbiAgICAgIH1cbiAgICAgIGlmICgxID09PSBwYXlsb2FkLl9zdGF0dXMpXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgKGlvSW5mbyA9IHBheWxvYWQuX3Jlc3VsdCksXG4gICAgICAgICAgdm9pZCAwID09PSBpb0luZm8gJiZcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgICAgIFwibGF6eTogRXhwZWN0ZWQgdGhlIHJlc3VsdCBvZiBhIGR5bmFtaWMgaW1wb3J0KCkgY2FsbC4gSW5zdGVhZCByZWNlaXZlZDogJXNcXG5cXG5Zb3VyIGNvZGUgc2hvdWxkIGxvb2sgbGlrZTogXFxuICBjb25zdCBNeUNvbXBvbmVudCA9IGxhenkoKCkgPT4gaW1wb3J0KCcuL015Q29tcG9uZW50JykpXFxuXFxuRGlkIHlvdSBhY2NpZGVudGFsbHkgcHV0IGN1cmx5IGJyYWNlcyBhcm91bmQgdGhlIGltcG9ydD9cIixcbiAgICAgICAgICAgICAgaW9JbmZvXG4gICAgICAgICAgICApLFxuICAgICAgICAgIFwiZGVmYXVsdFwiIGluIGlvSW5mbyB8fFxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICAgICAgXCJsYXp5OiBFeHBlY3RlZCB0aGUgcmVzdWx0IG9mIGEgZHluYW1pYyBpbXBvcnQoKSBjYWxsLiBJbnN0ZWFkIHJlY2VpdmVkOiAlc1xcblxcbllvdXIgY29kZSBzaG91bGQgbG9vayBsaWtlOiBcXG4gIGNvbnN0IE15Q29tcG9uZW50ID0gbGF6eSgoKSA9PiBpbXBvcnQoJy4vTXlDb21wb25lbnQnKSlcIixcbiAgICAgICAgICAgICAgaW9JbmZvXG4gICAgICAgICAgICApLFxuICAgICAgICAgIGlvSW5mby5kZWZhdWx0XG4gICAgICAgICk7XG4gICAgICB0aHJvdyBwYXlsb2FkLl9yZXN1bHQ7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlc29sdmVEaXNwYXRjaGVyKCkge1xuICAgICAgdmFyIGRpc3BhdGNoZXIgPSBSZWFjdFNoYXJlZEludGVybmFscy5IO1xuICAgICAgbnVsbCA9PT0gZGlzcGF0Y2hlciAmJlxuICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgIFwiSW52YWxpZCBob29rIGNhbGwuIEhvb2tzIGNhbiBvbmx5IGJlIGNhbGxlZCBpbnNpZGUgb2YgdGhlIGJvZHkgb2YgYSBmdW5jdGlvbiBjb21wb25lbnQuIFRoaXMgY291bGQgaGFwcGVuIGZvciBvbmUgb2YgdGhlIGZvbGxvd2luZyByZWFzb25zOlxcbjEuIFlvdSBtaWdodCBoYXZlIG1pc21hdGNoaW5nIHZlcnNpb25zIG9mIFJlYWN0IGFuZCB0aGUgcmVuZGVyZXIgKHN1Y2ggYXMgUmVhY3QgRE9NKVxcbjIuIFlvdSBtaWdodCBiZSBicmVha2luZyB0aGUgUnVsZXMgb2YgSG9va3NcXG4zLiBZb3UgbWlnaHQgaGF2ZSBtb3JlIHRoYW4gb25lIGNvcHkgb2YgUmVhY3QgaW4gdGhlIHNhbWUgYXBwXFxuU2VlIGh0dHBzOi8vcmVhY3QuZGV2L2xpbmsvaW52YWxpZC1ob29rLWNhbGwgZm9yIHRpcHMgYWJvdXQgaG93IHRvIGRlYnVnIGFuZCBmaXggdGhpcyBwcm9ibGVtLlwiXG4gICAgICAgICk7XG4gICAgICByZXR1cm4gZGlzcGF0Y2hlcjtcbiAgICB9XG4gICAgZnVuY3Rpb24gcmVsZWFzZUFzeW5jVHJhbnNpdGlvbigpIHtcbiAgICAgIFJlYWN0U2hhcmVkSW50ZXJuYWxzLmFzeW5jVHJhbnNpdGlvbnMtLTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZW5xdWV1ZVRhc2sodGFzaykge1xuICAgICAgaWYgKG51bGwgPT09IGVucXVldWVUYXNrSW1wbClcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB2YXIgcmVxdWlyZVN0cmluZyA9IChcInJlcXVpcmVcIiArIE1hdGgucmFuZG9tKCkpLnNsaWNlKDAsIDcpO1xuICAgICAgICAgIGVucXVldWVUYXNrSW1wbCA9IChtb2R1bGUgJiYgbW9kdWxlW3JlcXVpcmVTdHJpbmddKS5jYWxsKFxuICAgICAgICAgICAgbW9kdWxlLFxuICAgICAgICAgICAgXCJ0aW1lcnNcIlxuICAgICAgICAgICkuc2V0SW1tZWRpYXRlO1xuICAgICAgICB9IGNhdGNoIChfZXJyKSB7XG4gICAgICAgICAgZW5xdWV1ZVRhc2tJbXBsID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAhMSA9PT0gZGlkV2FybkFib3V0TWVzc2FnZUNoYW5uZWwgJiZcbiAgICAgICAgICAgICAgKChkaWRXYXJuQWJvdXRNZXNzYWdlQ2hhbm5lbCA9ICEwKSxcbiAgICAgICAgICAgICAgXCJ1bmRlZmluZWRcIiA9PT0gdHlwZW9mIE1lc3NhZ2VDaGFubmVsICYmXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICAgICAgICAgIFwiVGhpcyBicm93c2VyIGRvZXMgbm90IGhhdmUgYSBNZXNzYWdlQ2hhbm5lbCBpbXBsZW1lbnRhdGlvbiwgc28gZW5xdWV1aW5nIHRhc2tzIHZpYSBhd2FpdCBhY3QoYXN5bmMgKCkgPT4gLi4uKSB3aWxsIGZhaWwuIFBsZWFzZSBmaWxlIGFuIGlzc3VlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC9pc3N1ZXMgaWYgeW91IGVuY291bnRlciB0aGlzIHdhcm5pbmcuXCJcbiAgICAgICAgICAgICAgICApKTtcbiAgICAgICAgICAgIHZhciBjaGFubmVsID0gbmV3IE1lc3NhZ2VDaGFubmVsKCk7XG4gICAgICAgICAgICBjaGFubmVsLnBvcnQxLm9ubWVzc2FnZSA9IGNhbGxiYWNrO1xuICAgICAgICAgICAgY2hhbm5lbC5wb3J0Mi5wb3N0TWVzc2FnZSh2b2lkIDApO1xuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIHJldHVybiBlbnF1ZXVlVGFza0ltcGwodGFzayk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGFnZ3JlZ2F0ZUVycm9ycyhlcnJvcnMpIHtcbiAgICAgIHJldHVybiAxIDwgZXJyb3JzLmxlbmd0aCAmJiBcImZ1bmN0aW9uXCIgPT09IHR5cGVvZiBBZ2dyZWdhdGVFcnJvclxuICAgICAgICA/IG5ldyBBZ2dyZWdhdGVFcnJvcihlcnJvcnMpXG4gICAgICAgIDogZXJyb3JzWzBdO1xuICAgIH1cbiAgICBmdW5jdGlvbiBwb3BBY3RTY29wZShwcmV2QWN0UXVldWUsIHByZXZBY3RTY29wZURlcHRoKSB7XG4gICAgICBwcmV2QWN0U2NvcGVEZXB0aCAhPT0gYWN0U2NvcGVEZXB0aCAtIDEgJiZcbiAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICBcIllvdSBzZWVtIHRvIGhhdmUgb3ZlcmxhcHBpbmcgYWN0KCkgY2FsbHMsIHRoaXMgaXMgbm90IHN1cHBvcnRlZC4gQmUgc3VyZSB0byBhd2FpdCBwcmV2aW91cyBhY3QoKSBjYWxscyBiZWZvcmUgbWFraW5nIGEgbmV3IG9uZS4gXCJcbiAgICAgICAgKTtcbiAgICAgIGFjdFNjb3BlRGVwdGggPSBwcmV2QWN0U2NvcGVEZXB0aDtcbiAgICB9XG4gICAgZnVuY3Rpb24gcmVjdXJzaXZlbHlGbHVzaEFzeW5jQWN0V29yayhyZXR1cm5WYWx1ZSwgcmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgcXVldWUgPSBSZWFjdFNoYXJlZEludGVybmFscy5hY3RRdWV1ZTtcbiAgICAgIGlmIChudWxsICE9PSBxdWV1ZSlcbiAgICAgICAgaWYgKDAgIT09IHF1ZXVlLmxlbmd0aClcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgZmx1c2hBY3RRdWV1ZShxdWV1ZSk7XG4gICAgICAgICAgICBlbnF1ZXVlVGFzayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIHJldHVybiByZWN1cnNpdmVseUZsdXNoQXN5bmNBY3RXb3JrKHJldHVyblZhbHVlLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIFJlYWN0U2hhcmVkSW50ZXJuYWxzLnRocm93bkVycm9ycy5wdXNoKGVycm9yKTtcbiAgICAgICAgICB9XG4gICAgICAgIGVsc2UgUmVhY3RTaGFyZWRJbnRlcm5hbHMuYWN0UXVldWUgPSBudWxsO1xuICAgICAgMCA8IFJlYWN0U2hhcmVkSW50ZXJuYWxzLnRocm93bkVycm9ycy5sZW5ndGhcbiAgICAgICAgPyAoKHF1ZXVlID0gYWdncmVnYXRlRXJyb3JzKFJlYWN0U2hhcmVkSW50ZXJuYWxzLnRocm93bkVycm9ycykpLFxuICAgICAgICAgIChSZWFjdFNoYXJlZEludGVybmFscy50aHJvd25FcnJvcnMubGVuZ3RoID0gMCksXG4gICAgICAgICAgcmVqZWN0KHF1ZXVlKSlcbiAgICAgICAgOiByZXNvbHZlKHJldHVyblZhbHVlKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZmx1c2hBY3RRdWV1ZShxdWV1ZSkge1xuICAgICAgaWYgKCFpc0ZsdXNoaW5nKSB7XG4gICAgICAgIGlzRmx1c2hpbmcgPSAhMDtcbiAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGZvciAoOyBpIDwgcXVldWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBjYWxsYmFjayA9IHF1ZXVlW2ldO1xuICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICBSZWFjdFNoYXJlZEludGVybmFscy5kaWRVc2VQcm9taXNlID0gITE7XG4gICAgICAgICAgICAgIHZhciBjb250aW51YXRpb24gPSBjYWxsYmFjayghMSk7XG4gICAgICAgICAgICAgIGlmIChudWxsICE9PSBjb250aW51YXRpb24pIHtcbiAgICAgICAgICAgICAgICBpZiAoUmVhY3RTaGFyZWRJbnRlcm5hbHMuZGlkVXNlUHJvbWlzZSkge1xuICAgICAgICAgICAgICAgICAgcXVldWVbaV0gPSBjYWxsYmFjaztcbiAgICAgICAgICAgICAgICAgIHF1ZXVlLnNwbGljZSgwLCBpKTtcbiAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgPSBjb250aW51YXRpb247XG4gICAgICAgICAgICAgIH0gZWxzZSBicmVhaztcbiAgICAgICAgICAgIH0gd2hpbGUgKDEpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBxdWV1ZS5sZW5ndGggPSAwO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIHF1ZXVlLnNwbGljZSgwLCBpICsgMSksIFJlYWN0U2hhcmVkSW50ZXJuYWxzLnRocm93bkVycm9ycy5wdXNoKGVycm9yKTtcbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICBpc0ZsdXNoaW5nID0gITE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgXCJ1bmRlZmluZWRcIiAhPT0gdHlwZW9mIF9fUkVBQ1RfREVWVE9PTFNfR0xPQkFMX0hPT0tfXyAmJlxuICAgICAgXCJmdW5jdGlvblwiID09PVxuICAgICAgICB0eXBlb2YgX19SRUFDVF9ERVZUT09MU19HTE9CQUxfSE9PS19fLnJlZ2lzdGVySW50ZXJuYWxNb2R1bGVTdGFydCAmJlxuICAgICAgX19SRUFDVF9ERVZUT09MU19HTE9CQUxfSE9PS19fLnJlZ2lzdGVySW50ZXJuYWxNb2R1bGVTdGFydChFcnJvcigpKTtcbiAgICB2YXIgUkVBQ1RfRUxFTUVOVF9UWVBFID0gU3ltYm9sLmZvcihcInJlYWN0LnRyYW5zaXRpb25hbC5lbGVtZW50XCIpLFxuICAgICAgUkVBQ1RfUE9SVEFMX1RZUEUgPSBTeW1ib2wuZm9yKFwicmVhY3QucG9ydGFsXCIpLFxuICAgICAgUkVBQ1RfRlJBR01FTlRfVFlQRSA9IFN5bWJvbC5mb3IoXCJyZWFjdC5mcmFnbWVudFwiKSxcbiAgICAgIFJFQUNUX1NUUklDVF9NT0RFX1RZUEUgPSBTeW1ib2wuZm9yKFwicmVhY3Quc3RyaWN0X21vZGVcIiksXG4gICAgICBSRUFDVF9QUk9GSUxFUl9UWVBFID0gU3ltYm9sLmZvcihcInJlYWN0LnByb2ZpbGVyXCIpLFxuICAgICAgUkVBQ1RfQ09OU1VNRVJfVFlQRSA9IFN5bWJvbC5mb3IoXCJyZWFjdC5jb25zdW1lclwiKSxcbiAgICAgIFJFQUNUX0NPTlRFWFRfVFlQRSA9IFN5bWJvbC5mb3IoXCJyZWFjdC5jb250ZXh0XCIpLFxuICAgICAgUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRSA9IFN5bWJvbC5mb3IoXCJyZWFjdC5mb3J3YXJkX3JlZlwiKSxcbiAgICAgIFJFQUNUX1NVU1BFTlNFX1RZUEUgPSBTeW1ib2wuZm9yKFwicmVhY3Quc3VzcGVuc2VcIiksXG4gICAgICBSRUFDVF9TVVNQRU5TRV9MSVNUX1RZUEUgPSBTeW1ib2wuZm9yKFwicmVhY3Quc3VzcGVuc2VfbGlzdFwiKSxcbiAgICAgIFJFQUNUX01FTU9fVFlQRSA9IFN5bWJvbC5mb3IoXCJyZWFjdC5tZW1vXCIpLFxuICAgICAgUkVBQ1RfTEFaWV9UWVBFID0gU3ltYm9sLmZvcihcInJlYWN0LmxhenlcIiksXG4gICAgICBSRUFDVF9BQ1RJVklUWV9UWVBFID0gU3ltYm9sLmZvcihcInJlYWN0LmFjdGl2aXR5XCIpLFxuICAgICAgTUFZQkVfSVRFUkFUT1JfU1lNQk9MID0gU3ltYm9sLml0ZXJhdG9yLFxuICAgICAgZGlkV2FyblN0YXRlVXBkYXRlRm9yVW5tb3VudGVkQ29tcG9uZW50ID0ge30sXG4gICAgICBSZWFjdE5vb3BVcGRhdGVRdWV1ZSA9IHtcbiAgICAgICAgaXNNb3VudGVkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuICExO1xuICAgICAgICB9LFxuICAgICAgICBlbnF1ZXVlRm9yY2VVcGRhdGU6IGZ1bmN0aW9uIChwdWJsaWNJbnN0YW5jZSkge1xuICAgICAgICAgIHdhcm5Ob29wKHB1YmxpY0luc3RhbmNlLCBcImZvcmNlVXBkYXRlXCIpO1xuICAgICAgICB9LFxuICAgICAgICBlbnF1ZXVlUmVwbGFjZVN0YXRlOiBmdW5jdGlvbiAocHVibGljSW5zdGFuY2UpIHtcbiAgICAgICAgICB3YXJuTm9vcChwdWJsaWNJbnN0YW5jZSwgXCJyZXBsYWNlU3RhdGVcIik7XG4gICAgICAgIH0sXG4gICAgICAgIGVucXVldWVTZXRTdGF0ZTogZnVuY3Rpb24gKHB1YmxpY0luc3RhbmNlKSB7XG4gICAgICAgICAgd2Fybk5vb3AocHVibGljSW5zdGFuY2UsIFwic2V0U3RhdGVcIik7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBhc3NpZ24gPSBPYmplY3QuYXNzaWduLFxuICAgICAgZW1wdHlPYmplY3QgPSB7fTtcbiAgICBPYmplY3QuZnJlZXplKGVtcHR5T2JqZWN0KTtcbiAgICBDb21wb25lbnQucHJvdG90eXBlLmlzUmVhY3RDb21wb25lbnQgPSB7fTtcbiAgICBDb21wb25lbnQucHJvdG90eXBlLnNldFN0YXRlID0gZnVuY3Rpb24gKHBhcnRpYWxTdGF0ZSwgY2FsbGJhY2spIHtcbiAgICAgIGlmIChcbiAgICAgICAgXCJvYmplY3RcIiAhPT0gdHlwZW9mIHBhcnRpYWxTdGF0ZSAmJlxuICAgICAgICBcImZ1bmN0aW9uXCIgIT09IHR5cGVvZiBwYXJ0aWFsU3RhdGUgJiZcbiAgICAgICAgbnVsbCAhPSBwYXJ0aWFsU3RhdGVcbiAgICAgIClcbiAgICAgICAgdGhyb3cgRXJyb3IoXG4gICAgICAgICAgXCJ0YWtlcyBhbiBvYmplY3Qgb2Ygc3RhdGUgdmFyaWFibGVzIHRvIHVwZGF0ZSBvciBhIGZ1bmN0aW9uIHdoaWNoIHJldHVybnMgYW4gb2JqZWN0IG9mIHN0YXRlIHZhcmlhYmxlcy5cIlxuICAgICAgICApO1xuICAgICAgdGhpcy51cGRhdGVyLmVucXVldWVTZXRTdGF0ZSh0aGlzLCBwYXJ0aWFsU3RhdGUsIGNhbGxiYWNrLCBcInNldFN0YXRlXCIpO1xuICAgIH07XG4gICAgQ29tcG9uZW50LnByb3RvdHlwZS5mb3JjZVVwZGF0ZSA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgdGhpcy51cGRhdGVyLmVucXVldWVGb3JjZVVwZGF0ZSh0aGlzLCBjYWxsYmFjaywgXCJmb3JjZVVwZGF0ZVwiKTtcbiAgICB9O1xuICAgIHZhciBkZXByZWNhdGVkQVBJcyA9IHtcbiAgICAgIGlzTW91bnRlZDogW1xuICAgICAgICBcImlzTW91bnRlZFwiLFxuICAgICAgICBcIkluc3RlYWQsIG1ha2Ugc3VyZSB0byBjbGVhbiB1cCBzdWJzY3JpcHRpb25zIGFuZCBwZW5kaW5nIHJlcXVlc3RzIGluIGNvbXBvbmVudFdpbGxVbm1vdW50IHRvIHByZXZlbnQgbWVtb3J5IGxlYWtzLlwiXG4gICAgICBdLFxuICAgICAgcmVwbGFjZVN0YXRlOiBbXG4gICAgICAgIFwicmVwbGFjZVN0YXRlXCIsXG4gICAgICAgIFwiUmVmYWN0b3IgeW91ciBjb2RlIHRvIHVzZSBzZXRTdGF0ZSBpbnN0ZWFkIChzZWUgaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0L2lzc3Vlcy8zMjM2KS5cIlxuICAgICAgXVxuICAgIH07XG4gICAgZm9yIChmbk5hbWUgaW4gZGVwcmVjYXRlZEFQSXMpXG4gICAgICBkZXByZWNhdGVkQVBJcy5oYXNPd25Qcm9wZXJ0eShmbk5hbWUpICYmXG4gICAgICAgIGRlZmluZURlcHJlY2F0aW9uV2FybmluZyhmbk5hbWUsIGRlcHJlY2F0ZWRBUElzW2ZuTmFtZV0pO1xuICAgIENvbXBvbmVudER1bW15LnByb3RvdHlwZSA9IENvbXBvbmVudC5wcm90b3R5cGU7XG4gICAgZGVwcmVjYXRlZEFQSXMgPSBQdXJlQ29tcG9uZW50LnByb3RvdHlwZSA9IG5ldyBDb21wb25lbnREdW1teSgpO1xuICAgIGRlcHJlY2F0ZWRBUElzLmNvbnN0cnVjdG9yID0gUHVyZUNvbXBvbmVudDtcbiAgICBhc3NpZ24oZGVwcmVjYXRlZEFQSXMsIENvbXBvbmVudC5wcm90b3R5cGUpO1xuICAgIGRlcHJlY2F0ZWRBUElzLmlzUHVyZVJlYWN0Q29tcG9uZW50ID0gITA7XG4gICAgdmFyIGlzQXJyYXlJbXBsID0gQXJyYXkuaXNBcnJheSxcbiAgICAgIFJFQUNUX0NMSUVOVF9SRUZFUkVOQ0UgPSBTeW1ib2wuZm9yKFwicmVhY3QuY2xpZW50LnJlZmVyZW5jZVwiKSxcbiAgICAgIFJlYWN0U2hhcmVkSW50ZXJuYWxzID0ge1xuICAgICAgICBIOiBudWxsLFxuICAgICAgICBBOiBudWxsLFxuICAgICAgICBUOiBudWxsLFxuICAgICAgICBTOiBudWxsLFxuICAgICAgICBhY3RRdWV1ZTogbnVsbCxcbiAgICAgICAgYXN5bmNUcmFuc2l0aW9uczogMCxcbiAgICAgICAgaXNCYXRjaGluZ0xlZ2FjeTogITEsXG4gICAgICAgIGRpZFNjaGVkdWxlTGVnYWN5VXBkYXRlOiAhMSxcbiAgICAgICAgZGlkVXNlUHJvbWlzZTogITEsXG4gICAgICAgIHRocm93bkVycm9yczogW10sXG4gICAgICAgIGdldEN1cnJlbnRTdGFjazogbnVsbCxcbiAgICAgICAgcmVjZW50bHlDcmVhdGVkT3duZXJTdGFja3M6IDBcbiAgICAgIH0sXG4gICAgICBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHksXG4gICAgICBjcmVhdGVUYXNrID0gY29uc29sZS5jcmVhdGVUYXNrXG4gICAgICAgID8gY29uc29sZS5jcmVhdGVUYXNrXG4gICAgICAgIDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgfTtcbiAgICBkZXByZWNhdGVkQVBJcyA9IHtcbiAgICAgIHJlYWN0X3N0YWNrX2JvdHRvbV9mcmFtZTogZnVuY3Rpb24gKGNhbGxTdGFja0ZvckVycm9yKSB7XG4gICAgICAgIHJldHVybiBjYWxsU3RhY2tGb3JFcnJvcigpO1xuICAgICAgfVxuICAgIH07XG4gICAgdmFyIHNwZWNpYWxQcm9wS2V5V2FybmluZ1Nob3duLCBkaWRXYXJuQWJvdXRPbGRKU1hSdW50aW1lO1xuICAgIHZhciBkaWRXYXJuQWJvdXRFbGVtZW50UmVmID0ge307XG4gICAgdmFyIHVua25vd25Pd25lckRlYnVnU3RhY2sgPSBkZXByZWNhdGVkQVBJcy5yZWFjdF9zdGFja19ib3R0b21fZnJhbWUuYmluZChcbiAgICAgIGRlcHJlY2F0ZWRBUElzLFxuICAgICAgVW5rbm93bk93bmVyXG4gICAgKSgpO1xuICAgIHZhciB1bmtub3duT3duZXJEZWJ1Z1Rhc2sgPSBjcmVhdGVUYXNrKGdldFRhc2tOYW1lKFVua25vd25Pd25lcikpO1xuICAgIHZhciBkaWRXYXJuQWJvdXRNYXBzID0gITEsXG4gICAgICB1c2VyUHJvdmlkZWRLZXlFc2NhcGVSZWdleCA9IC9cXC8rL2csXG4gICAgICByZXBvcnRHbG9iYWxFcnJvciA9XG4gICAgICAgIFwiZnVuY3Rpb25cIiA9PT0gdHlwZW9mIHJlcG9ydEVycm9yXG4gICAgICAgICAgPyByZXBvcnRFcnJvclxuICAgICAgICAgIDogZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBcIm9iamVjdFwiID09PSB0eXBlb2Ygd2luZG93ICYmXG4gICAgICAgICAgICAgICAgXCJmdW5jdGlvblwiID09PSB0eXBlb2Ygd2luZG93LkVycm9yRXZlbnRcbiAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgdmFyIGV2ZW50ID0gbmV3IHdpbmRvdy5FcnJvckV2ZW50KFwiZXJyb3JcIiwge1xuICAgICAgICAgICAgICAgICAgYnViYmxlczogITAsXG4gICAgICAgICAgICAgICAgICBjYW5jZWxhYmxlOiAhMCxcbiAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6XG4gICAgICAgICAgICAgICAgICAgIFwib2JqZWN0XCIgPT09IHR5cGVvZiBlcnJvciAmJlxuICAgICAgICAgICAgICAgICAgICBudWxsICE9PSBlcnJvciAmJlxuICAgICAgICAgICAgICAgICAgICBcInN0cmluZ1wiID09PSB0eXBlb2YgZXJyb3IubWVzc2FnZVxuICAgICAgICAgICAgICAgICAgICAgID8gU3RyaW5nKGVycm9yLm1lc3NhZ2UpXG4gICAgICAgICAgICAgICAgICAgICAgOiBTdHJpbmcoZXJyb3IpLFxuICAgICAgICAgICAgICAgICAgZXJyb3I6IGVycm9yXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKCF3aW5kb3cuZGlzcGF0Y2hFdmVudChldmVudCkpIHJldHVybjtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgICAgICBcIm9iamVjdFwiID09PSB0eXBlb2YgcHJvY2VzcyAmJlxuICAgICAgICAgICAgICAgIFwiZnVuY3Rpb25cIiA9PT0gdHlwZW9mIHByb2Nlc3MuZW1pdFxuICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBwcm9jZXNzLmVtaXQoXCJ1bmNhdWdodEV4Y2VwdGlvblwiLCBlcnJvcik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgfSxcbiAgICAgIGRpZFdhcm5BYm91dE1lc3NhZ2VDaGFubmVsID0gITEsXG4gICAgICBlbnF1ZXVlVGFza0ltcGwgPSBudWxsLFxuICAgICAgYWN0U2NvcGVEZXB0aCA9IDAsXG4gICAgICBkaWRXYXJuTm9Bd2FpdEFjdCA9ICExLFxuICAgICAgaXNGbHVzaGluZyA9ICExLFxuICAgICAgcXVldWVTZXZlcmFsTWljcm90YXNrcyA9XG4gICAgICAgIFwiZnVuY3Rpb25cIiA9PT0gdHlwZW9mIHF1ZXVlTWljcm90YXNrXG4gICAgICAgICAgPyBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgcXVldWVNaWNyb3Rhc2soZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBxdWV1ZU1pY3JvdGFzayhjYWxsYmFjayk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIDogZW5xdWV1ZVRhc2s7XG4gICAgZGVwcmVjYXRlZEFQSXMgPSBPYmplY3QuZnJlZXplKHtcbiAgICAgIF9fcHJvdG9fXzogbnVsbCxcbiAgICAgIGM6IGZ1bmN0aW9uIChzaXplKSB7XG4gICAgICAgIHJldHVybiByZXNvbHZlRGlzcGF0Y2hlcigpLnVzZU1lbW9DYWNoZShzaXplKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB2YXIgZm5OYW1lID0ge1xuICAgICAgbWFwOiBtYXBDaGlsZHJlbixcbiAgICAgIGZvckVhY2g6IGZ1bmN0aW9uIChjaGlsZHJlbiwgZm9yRWFjaEZ1bmMsIGZvckVhY2hDb250ZXh0KSB7XG4gICAgICAgIG1hcENoaWxkcmVuKFxuICAgICAgICAgIGNoaWxkcmVuLFxuICAgICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGZvckVhY2hGdW5jLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBmb3JFYWNoQ29udGV4dFxuICAgICAgICApO1xuICAgICAgfSxcbiAgICAgIGNvdW50OiBmdW5jdGlvbiAoY2hpbGRyZW4pIHtcbiAgICAgICAgdmFyIG4gPSAwO1xuICAgICAgICBtYXBDaGlsZHJlbihjaGlsZHJlbiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIG4rKztcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBuO1xuICAgICAgfSxcbiAgICAgIHRvQXJyYXk6IGZ1bmN0aW9uIChjaGlsZHJlbikge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIG1hcENoaWxkcmVuKGNoaWxkcmVuLCBmdW5jdGlvbiAoY2hpbGQpIHtcbiAgICAgICAgICAgIHJldHVybiBjaGlsZDtcbiAgICAgICAgICB9KSB8fCBbXVxuICAgICAgICApO1xuICAgICAgfSxcbiAgICAgIG9ubHk6IGZ1bmN0aW9uIChjaGlsZHJlbikge1xuICAgICAgICBpZiAoIWlzVmFsaWRFbGVtZW50KGNoaWxkcmVuKSlcbiAgICAgICAgICB0aHJvdyBFcnJvcihcbiAgICAgICAgICAgIFwiUmVhY3QuQ2hpbGRyZW4ub25seSBleHBlY3RlZCB0byByZWNlaXZlIGEgc2luZ2xlIFJlYWN0IGVsZW1lbnQgY2hpbGQuXCJcbiAgICAgICAgICApO1xuICAgICAgICByZXR1cm4gY2hpbGRyZW47XG4gICAgICB9XG4gICAgfTtcbiAgICBleHBvcnRzLkFjdGl2aXR5ID0gUkVBQ1RfQUNUSVZJVFlfVFlQRTtcbiAgICBleHBvcnRzLkNoaWxkcmVuID0gZm5OYW1lO1xuICAgIGV4cG9ydHMuQ29tcG9uZW50ID0gQ29tcG9uZW50O1xuICAgIGV4cG9ydHMuRnJhZ21lbnQgPSBSRUFDVF9GUkFHTUVOVF9UWVBFO1xuICAgIGV4cG9ydHMuUHJvZmlsZXIgPSBSRUFDVF9QUk9GSUxFUl9UWVBFO1xuICAgIGV4cG9ydHMuUHVyZUNvbXBvbmVudCA9IFB1cmVDb21wb25lbnQ7XG4gICAgZXhwb3J0cy5TdHJpY3RNb2RlID0gUkVBQ1RfU1RSSUNUX01PREVfVFlQRTtcbiAgICBleHBvcnRzLlN1c3BlbnNlID0gUkVBQ1RfU1VTUEVOU0VfVFlQRTtcbiAgICBleHBvcnRzLl9fQ0xJRU5UX0lOVEVSTkFMU19ET19OT1RfVVNFX09SX1dBUk5fVVNFUlNfVEhFWV9DQU5OT1RfVVBHUkFERSA9XG4gICAgICBSZWFjdFNoYXJlZEludGVybmFscztcbiAgICBleHBvcnRzLl9fQ09NUElMRVJfUlVOVElNRSA9IGRlcHJlY2F0ZWRBUElzO1xuICAgIGV4cG9ydHMuYWN0ID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICB2YXIgcHJldkFjdFF1ZXVlID0gUmVhY3RTaGFyZWRJbnRlcm5hbHMuYWN0UXVldWUsXG4gICAgICAgIHByZXZBY3RTY29wZURlcHRoID0gYWN0U2NvcGVEZXB0aDtcbiAgICAgIGFjdFNjb3BlRGVwdGgrKztcbiAgICAgIHZhciBxdWV1ZSA9IChSZWFjdFNoYXJlZEludGVybmFscy5hY3RRdWV1ZSA9XG4gICAgICAgICAgbnVsbCAhPT0gcHJldkFjdFF1ZXVlID8gcHJldkFjdFF1ZXVlIDogW10pLFxuICAgICAgICBkaWRBd2FpdEFjdENhbGwgPSAhMTtcbiAgICAgIHRyeSB7XG4gICAgICAgIHZhciByZXN1bHQgPSBjYWxsYmFjaygpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgUmVhY3RTaGFyZWRJbnRlcm5hbHMudGhyb3duRXJyb3JzLnB1c2goZXJyb3IpO1xuICAgICAgfVxuICAgICAgaWYgKDAgPCBSZWFjdFNoYXJlZEludGVybmFscy50aHJvd25FcnJvcnMubGVuZ3RoKVxuICAgICAgICB0aHJvdyAoXG4gICAgICAgICAgKHBvcEFjdFNjb3BlKHByZXZBY3RRdWV1ZSwgcHJldkFjdFNjb3BlRGVwdGgpLFxuICAgICAgICAgIChjYWxsYmFjayA9IGFnZ3JlZ2F0ZUVycm9ycyhSZWFjdFNoYXJlZEludGVybmFscy50aHJvd25FcnJvcnMpKSxcbiAgICAgICAgICAoUmVhY3RTaGFyZWRJbnRlcm5hbHMudGhyb3duRXJyb3JzLmxlbmd0aCA9IDApLFxuICAgICAgICAgIGNhbGxiYWNrKVxuICAgICAgICApO1xuICAgICAgaWYgKFxuICAgICAgICBudWxsICE9PSByZXN1bHQgJiZcbiAgICAgICAgXCJvYmplY3RcIiA9PT0gdHlwZW9mIHJlc3VsdCAmJlxuICAgICAgICBcImZ1bmN0aW9uXCIgPT09IHR5cGVvZiByZXN1bHQudGhlblxuICAgICAgKSB7XG4gICAgICAgIHZhciB0aGVuYWJsZSA9IHJlc3VsdDtcbiAgICAgICAgcXVldWVTZXZlcmFsTWljcm90YXNrcyhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgZGlkQXdhaXRBY3RDYWxsIHx8XG4gICAgICAgICAgICBkaWRXYXJuTm9Bd2FpdEFjdCB8fFxuICAgICAgICAgICAgKChkaWRXYXJuTm9Bd2FpdEFjdCA9ICEwKSxcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgICAgIFwiWW91IGNhbGxlZCBhY3QoYXN5bmMgKCkgPT4gLi4uKSB3aXRob3V0IGF3YWl0LiBUaGlzIGNvdWxkIGxlYWQgdG8gdW5leHBlY3RlZCB0ZXN0aW5nIGJlaGF2aW91ciwgaW50ZXJsZWF2aW5nIG11bHRpcGxlIGFjdCBjYWxscyBhbmQgbWl4aW5nIHRoZWlyIHNjb3Blcy4gWW91IHNob3VsZCAtIGF3YWl0IGFjdChhc3luYyAoKSA9PiAuLi4pO1wiXG4gICAgICAgICAgICApKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdGhlbjogZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgZGlkQXdhaXRBY3RDYWxsID0gITA7XG4gICAgICAgICAgICB0aGVuYWJsZS50aGVuKFxuICAgICAgICAgICAgICBmdW5jdGlvbiAocmV0dXJuVmFsdWUpIHtcbiAgICAgICAgICAgICAgICBwb3BBY3RTY29wZShwcmV2QWN0UXVldWUsIHByZXZBY3RTY29wZURlcHRoKTtcbiAgICAgICAgICAgICAgICBpZiAoMCA9PT0gcHJldkFjdFNjb3BlRGVwdGgpIHtcbiAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGZsdXNoQWN0UXVldWUocXVldWUpLFxuICAgICAgICAgICAgICAgICAgICAgIGVucXVldWVUYXNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZWN1cnNpdmVseUZsdXNoQXN5bmNBY3RXb3JrKFxuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5WYWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0XG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IkMCkge1xuICAgICAgICAgICAgICAgICAgICBSZWFjdFNoYXJlZEludGVybmFscy50aHJvd25FcnJvcnMucHVzaChlcnJvciQwKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIGlmICgwIDwgUmVhY3RTaGFyZWRJbnRlcm5hbHMudGhyb3duRXJyb3JzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgX3Rocm93bkVycm9yID0gYWdncmVnYXRlRXJyb3JzKFxuICAgICAgICAgICAgICAgICAgICAgIFJlYWN0U2hhcmVkSW50ZXJuYWxzLnRocm93bkVycm9yc1xuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICBSZWFjdFNoYXJlZEludGVybmFscy50aHJvd25FcnJvcnMubGVuZ3RoID0gMDtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KF90aHJvd25FcnJvcik7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHJlc29sdmUocmV0dXJuVmFsdWUpO1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBwb3BBY3RTY29wZShwcmV2QWN0UXVldWUsIHByZXZBY3RTY29wZURlcHRoKTtcbiAgICAgICAgICAgICAgICAwIDwgUmVhY3RTaGFyZWRJbnRlcm5hbHMudGhyb3duRXJyb3JzLmxlbmd0aFxuICAgICAgICAgICAgICAgICAgPyAoKGVycm9yID0gYWdncmVnYXRlRXJyb3JzKFxuICAgICAgICAgICAgICAgICAgICAgIFJlYWN0U2hhcmVkSW50ZXJuYWxzLnRocm93bkVycm9yc1xuICAgICAgICAgICAgICAgICAgICApKSxcbiAgICAgICAgICAgICAgICAgICAgKFJlYWN0U2hhcmVkSW50ZXJuYWxzLnRocm93bkVycm9ycy5sZW5ndGggPSAwKSxcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKSlcbiAgICAgICAgICAgICAgICAgIDogcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICB2YXIgcmV0dXJuVmFsdWUkanNjb21wJDAgPSByZXN1bHQ7XG4gICAgICBwb3BBY3RTY29wZShwcmV2QWN0UXVldWUsIHByZXZBY3RTY29wZURlcHRoKTtcbiAgICAgIDAgPT09IHByZXZBY3RTY29wZURlcHRoICYmXG4gICAgICAgIChmbHVzaEFjdFF1ZXVlKHF1ZXVlKSxcbiAgICAgICAgMCAhPT0gcXVldWUubGVuZ3RoICYmXG4gICAgICAgICAgcXVldWVTZXZlcmFsTWljcm90YXNrcyhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBkaWRBd2FpdEFjdENhbGwgfHxcbiAgICAgICAgICAgICAgZGlkV2Fybk5vQXdhaXRBY3QgfHxcbiAgICAgICAgICAgICAgKChkaWRXYXJuTm9Bd2FpdEFjdCA9ICEwKSxcbiAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICAgICAgICBcIkEgY29tcG9uZW50IHN1c3BlbmRlZCBpbnNpZGUgYW4gYGFjdGAgc2NvcGUsIGJ1dCB0aGUgYGFjdGAgY2FsbCB3YXMgbm90IGF3YWl0ZWQuIFdoZW4gdGVzdGluZyBSZWFjdCBjb21wb25lbnRzIHRoYXQgZGVwZW5kIG9uIGFzeW5jaHJvbm91cyBkYXRhLCB5b3UgbXVzdCBhd2FpdCB0aGUgcmVzdWx0OlxcblxcbmF3YWl0IGFjdCgoKSA9PiAuLi4pXCJcbiAgICAgICAgICAgICAgKSk7XG4gICAgICAgICAgfSksXG4gICAgICAgIChSZWFjdFNoYXJlZEludGVybmFscy5hY3RRdWV1ZSA9IG51bGwpKTtcbiAgICAgIGlmICgwIDwgUmVhY3RTaGFyZWRJbnRlcm5hbHMudGhyb3duRXJyb3JzLmxlbmd0aClcbiAgICAgICAgdGhyb3cgKFxuICAgICAgICAgICgoY2FsbGJhY2sgPSBhZ2dyZWdhdGVFcnJvcnMoUmVhY3RTaGFyZWRJbnRlcm5hbHMudGhyb3duRXJyb3JzKSksXG4gICAgICAgICAgKFJlYWN0U2hhcmVkSW50ZXJuYWxzLnRocm93bkVycm9ycy5sZW5ndGggPSAwKSxcbiAgICAgICAgICBjYWxsYmFjaylcbiAgICAgICAgKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRoZW46IGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICBkaWRBd2FpdEFjdENhbGwgPSAhMDtcbiAgICAgICAgICAwID09PSBwcmV2QWN0U2NvcGVEZXB0aFxuICAgICAgICAgICAgPyAoKFJlYWN0U2hhcmVkSW50ZXJuYWxzLmFjdFF1ZXVlID0gcXVldWUpLFxuICAgICAgICAgICAgICBlbnF1ZXVlVGFzayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlY3Vyc2l2ZWx5Rmx1c2hBc3luY0FjdFdvcmsoXG4gICAgICAgICAgICAgICAgICByZXR1cm5WYWx1ZSRqc2NvbXAkMCxcbiAgICAgICAgICAgICAgICAgIHJlc29sdmUsXG4gICAgICAgICAgICAgICAgICByZWplY3RcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9KSlcbiAgICAgICAgICAgIDogcmVzb2x2ZShyZXR1cm5WYWx1ZSRqc2NvbXAkMCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfTtcbiAgICBleHBvcnRzLmNhY2hlID0gZnVuY3Rpb24gKGZuKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gZm4uYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgfTtcbiAgICBleHBvcnRzLmNhY2hlU2lnbmFsID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcbiAgICBleHBvcnRzLmNhcHR1cmVPd25lclN0YWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGdldEN1cnJlbnRTdGFjayA9IFJlYWN0U2hhcmVkSW50ZXJuYWxzLmdldEN1cnJlbnRTdGFjaztcbiAgICAgIHJldHVybiBudWxsID09PSBnZXRDdXJyZW50U3RhY2sgPyBudWxsIDogZ2V0Q3VycmVudFN0YWNrKCk7XG4gICAgfTtcbiAgICBleHBvcnRzLmNsb25lRWxlbWVudCA9IGZ1bmN0aW9uIChlbGVtZW50LCBjb25maWcsIGNoaWxkcmVuKSB7XG4gICAgICBpZiAobnVsbCA9PT0gZWxlbWVudCB8fCB2b2lkIDAgPT09IGVsZW1lbnQpXG4gICAgICAgIHRocm93IEVycm9yKFxuICAgICAgICAgIFwiVGhlIGFyZ3VtZW50IG11c3QgYmUgYSBSZWFjdCBlbGVtZW50LCBidXQgeW91IHBhc3NlZCBcIiArXG4gICAgICAgICAgICBlbGVtZW50ICtcbiAgICAgICAgICAgIFwiLlwiXG4gICAgICAgICk7XG4gICAgICB2YXIgcHJvcHMgPSBhc3NpZ24oe30sIGVsZW1lbnQucHJvcHMpLFxuICAgICAgICBrZXkgPSBlbGVtZW50LmtleSxcbiAgICAgICAgb3duZXIgPSBlbGVtZW50Ll9vd25lcjtcbiAgICAgIGlmIChudWxsICE9IGNvbmZpZykge1xuICAgICAgICB2YXIgSlNDb21waWxlcl9pbmxpbmVfcmVzdWx0O1xuICAgICAgICBhOiB7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgaGFzT3duUHJvcGVydHkuY2FsbChjb25maWcsIFwicmVmXCIpICYmXG4gICAgICAgICAgICAoSlNDb21waWxlcl9pbmxpbmVfcmVzdWx0ID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihcbiAgICAgICAgICAgICAgY29uZmlnLFxuICAgICAgICAgICAgICBcInJlZlwiXG4gICAgICAgICAgICApLmdldCkgJiZcbiAgICAgICAgICAgIEpTQ29tcGlsZXJfaW5saW5lX3Jlc3VsdC5pc1JlYWN0V2FybmluZ1xuICAgICAgICAgICkge1xuICAgICAgICAgICAgSlNDb21waWxlcl9pbmxpbmVfcmVzdWx0ID0gITE7XG4gICAgICAgICAgICBicmVhayBhO1xuICAgICAgICAgIH1cbiAgICAgICAgICBKU0NvbXBpbGVyX2lubGluZV9yZXN1bHQgPSB2b2lkIDAgIT09IGNvbmZpZy5yZWY7XG4gICAgICAgIH1cbiAgICAgICAgSlNDb21waWxlcl9pbmxpbmVfcmVzdWx0ICYmIChvd25lciA9IGdldE93bmVyKCkpO1xuICAgICAgICBoYXNWYWxpZEtleShjb25maWcpICYmXG4gICAgICAgICAgKGNoZWNrS2V5U3RyaW5nQ29lcmNpb24oY29uZmlnLmtleSksIChrZXkgPSBcIlwiICsgY29uZmlnLmtleSkpO1xuICAgICAgICBmb3IgKHByb3BOYW1lIGluIGNvbmZpZylcbiAgICAgICAgICAhaGFzT3duUHJvcGVydHkuY2FsbChjb25maWcsIHByb3BOYW1lKSB8fFxuICAgICAgICAgICAgXCJrZXlcIiA9PT0gcHJvcE5hbWUgfHxcbiAgICAgICAgICAgIFwiX19zZWxmXCIgPT09IHByb3BOYW1lIHx8XG4gICAgICAgICAgICBcIl9fc291cmNlXCIgPT09IHByb3BOYW1lIHx8XG4gICAgICAgICAgICAoXCJyZWZcIiA9PT0gcHJvcE5hbWUgJiYgdm9pZCAwID09PSBjb25maWcucmVmKSB8fFxuICAgICAgICAgICAgKHByb3BzW3Byb3BOYW1lXSA9IGNvbmZpZ1twcm9wTmFtZV0pO1xuICAgICAgfVxuICAgICAgdmFyIHByb3BOYW1lID0gYXJndW1lbnRzLmxlbmd0aCAtIDI7XG4gICAgICBpZiAoMSA9PT0gcHJvcE5hbWUpIHByb3BzLmNoaWxkcmVuID0gY2hpbGRyZW47XG4gICAgICBlbHNlIGlmICgxIDwgcHJvcE5hbWUpIHtcbiAgICAgICAgSlNDb21waWxlcl9pbmxpbmVfcmVzdWx0ID0gQXJyYXkocHJvcE5hbWUpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BOYW1lOyBpKyspXG4gICAgICAgICAgSlNDb21waWxlcl9pbmxpbmVfcmVzdWx0W2ldID0gYXJndW1lbnRzW2kgKyAyXTtcbiAgICAgICAgcHJvcHMuY2hpbGRyZW4gPSBKU0NvbXBpbGVyX2lubGluZV9yZXN1bHQ7XG4gICAgICB9XG4gICAgICBwcm9wcyA9IFJlYWN0RWxlbWVudChcbiAgICAgICAgZWxlbWVudC50eXBlLFxuICAgICAgICBrZXksXG4gICAgICAgIHByb3BzLFxuICAgICAgICBvd25lcixcbiAgICAgICAgZWxlbWVudC5fZGVidWdTdGFjayxcbiAgICAgICAgZWxlbWVudC5fZGVidWdUYXNrXG4gICAgICApO1xuICAgICAgZm9yIChrZXkgPSAyOyBrZXkgPCBhcmd1bWVudHMubGVuZ3RoOyBrZXkrKylcbiAgICAgICAgdmFsaWRhdGVDaGlsZEtleXMoYXJndW1lbnRzW2tleV0pO1xuICAgICAgcmV0dXJuIHByb3BzO1xuICAgIH07XG4gICAgZXhwb3J0cy5jcmVhdGVDb250ZXh0ID0gZnVuY3Rpb24gKGRlZmF1bHRWYWx1ZSkge1xuICAgICAgZGVmYXVsdFZhbHVlID0ge1xuICAgICAgICAkJHR5cGVvZjogUkVBQ1RfQ09OVEVYVF9UWVBFLFxuICAgICAgICBfY3VycmVudFZhbHVlOiBkZWZhdWx0VmFsdWUsXG4gICAgICAgIF9jdXJyZW50VmFsdWUyOiBkZWZhdWx0VmFsdWUsXG4gICAgICAgIF90aHJlYWRDb3VudDogMCxcbiAgICAgICAgUHJvdmlkZXI6IG51bGwsXG4gICAgICAgIENvbnN1bWVyOiBudWxsXG4gICAgICB9O1xuICAgICAgZGVmYXVsdFZhbHVlLlByb3ZpZGVyID0gZGVmYXVsdFZhbHVlO1xuICAgICAgZGVmYXVsdFZhbHVlLkNvbnN1bWVyID0ge1xuICAgICAgICAkJHR5cGVvZjogUkVBQ1RfQ09OU1VNRVJfVFlQRSxcbiAgICAgICAgX2NvbnRleHQ6IGRlZmF1bHRWYWx1ZVxuICAgICAgfTtcbiAgICAgIGRlZmF1bHRWYWx1ZS5fY3VycmVudFJlbmRlcmVyID0gbnVsbDtcbiAgICAgIGRlZmF1bHRWYWx1ZS5fY3VycmVudFJlbmRlcmVyMiA9IG51bGw7XG4gICAgICByZXR1cm4gZGVmYXVsdFZhbHVlO1xuICAgIH07XG4gICAgZXhwb3J0cy5jcmVhdGVFbGVtZW50ID0gZnVuY3Rpb24gKHR5cGUsIGNvbmZpZywgY2hpbGRyZW4pIHtcbiAgICAgIGZvciAodmFyIGkgPSAyOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxuICAgICAgICB2YWxpZGF0ZUNoaWxkS2V5cyhhcmd1bWVudHNbaV0pO1xuICAgICAgaSA9IHt9O1xuICAgICAgdmFyIGtleSA9IG51bGw7XG4gICAgICBpZiAobnVsbCAhPSBjb25maWcpXG4gICAgICAgIGZvciAocHJvcE5hbWUgaW4gKGRpZFdhcm5BYm91dE9sZEpTWFJ1bnRpbWUgfHxcbiAgICAgICAgICAhKFwiX19zZWxmXCIgaW4gY29uZmlnKSB8fFxuICAgICAgICAgIFwia2V5XCIgaW4gY29uZmlnIHx8XG4gICAgICAgICAgKChkaWRXYXJuQWJvdXRPbGRKU1hSdW50aW1lID0gITApLFxuICAgICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICAgIFwiWW91ciBhcHAgKG9yIG9uZSBvZiBpdHMgZGVwZW5kZW5jaWVzKSBpcyB1c2luZyBhbiBvdXRkYXRlZCBKU1ggdHJhbnNmb3JtLiBVcGRhdGUgdG8gdGhlIG1vZGVybiBKU1ggdHJhbnNmb3JtIGZvciBmYXN0ZXIgcGVyZm9ybWFuY2U6IGh0dHBzOi8vcmVhY3QuZGV2L2xpbmsvbmV3LWpzeC10cmFuc2Zvcm1cIlxuICAgICAgICAgICkpLFxuICAgICAgICBoYXNWYWxpZEtleShjb25maWcpICYmXG4gICAgICAgICAgKGNoZWNrS2V5U3RyaW5nQ29lcmNpb24oY29uZmlnLmtleSksIChrZXkgPSBcIlwiICsgY29uZmlnLmtleSkpLFxuICAgICAgICBjb25maWcpKVxuICAgICAgICAgIGhhc093blByb3BlcnR5LmNhbGwoY29uZmlnLCBwcm9wTmFtZSkgJiZcbiAgICAgICAgICAgIFwia2V5XCIgIT09IHByb3BOYW1lICYmXG4gICAgICAgICAgICBcIl9fc2VsZlwiICE9PSBwcm9wTmFtZSAmJlxuICAgICAgICAgICAgXCJfX3NvdXJjZVwiICE9PSBwcm9wTmFtZSAmJlxuICAgICAgICAgICAgKGlbcHJvcE5hbWVdID0gY29uZmlnW3Byb3BOYW1lXSk7XG4gICAgICB2YXIgY2hpbGRyZW5MZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoIC0gMjtcbiAgICAgIGlmICgxID09PSBjaGlsZHJlbkxlbmd0aCkgaS5jaGlsZHJlbiA9IGNoaWxkcmVuO1xuICAgICAgZWxzZSBpZiAoMSA8IGNoaWxkcmVuTGVuZ3RoKSB7XG4gICAgICAgIGZvciAoXG4gICAgICAgICAgdmFyIGNoaWxkQXJyYXkgPSBBcnJheShjaGlsZHJlbkxlbmd0aCksIF9pID0gMDtcbiAgICAgICAgICBfaSA8IGNoaWxkcmVuTGVuZ3RoO1xuICAgICAgICAgIF9pKytcbiAgICAgICAgKVxuICAgICAgICAgIGNoaWxkQXJyYXlbX2ldID0gYXJndW1lbnRzW19pICsgMl07XG4gICAgICAgIE9iamVjdC5mcmVlemUgJiYgT2JqZWN0LmZyZWV6ZShjaGlsZEFycmF5KTtcbiAgICAgICAgaS5jaGlsZHJlbiA9IGNoaWxkQXJyYXk7XG4gICAgICB9XG4gICAgICBpZiAodHlwZSAmJiB0eXBlLmRlZmF1bHRQcm9wcylcbiAgICAgICAgZm9yIChwcm9wTmFtZSBpbiAoKGNoaWxkcmVuTGVuZ3RoID0gdHlwZS5kZWZhdWx0UHJvcHMpLCBjaGlsZHJlbkxlbmd0aCkpXG4gICAgICAgICAgdm9pZCAwID09PSBpW3Byb3BOYW1lXSAmJiAoaVtwcm9wTmFtZV0gPSBjaGlsZHJlbkxlbmd0aFtwcm9wTmFtZV0pO1xuICAgICAga2V5ICYmXG4gICAgICAgIGRlZmluZUtleVByb3BXYXJuaW5nR2V0dGVyKFxuICAgICAgICAgIGksXG4gICAgICAgICAgXCJmdW5jdGlvblwiID09PSB0eXBlb2YgdHlwZVxuICAgICAgICAgICAgPyB0eXBlLmRpc3BsYXlOYW1lIHx8IHR5cGUubmFtZSB8fCBcIlVua25vd25cIlxuICAgICAgICAgICAgOiB0eXBlXG4gICAgICAgICk7XG4gICAgICB2YXIgcHJvcE5hbWUgPSAxZTQgPiBSZWFjdFNoYXJlZEludGVybmFscy5yZWNlbnRseUNyZWF0ZWRPd25lclN0YWNrcysrO1xuICAgICAgcmV0dXJuIFJlYWN0RWxlbWVudChcbiAgICAgICAgdHlwZSxcbiAgICAgICAga2V5LFxuICAgICAgICBpLFxuICAgICAgICBnZXRPd25lcigpLFxuICAgICAgICBwcm9wTmFtZSA/IEVycm9yKFwicmVhY3Qtc3RhY2stdG9wLWZyYW1lXCIpIDogdW5rbm93bk93bmVyRGVidWdTdGFjayxcbiAgICAgICAgcHJvcE5hbWUgPyBjcmVhdGVUYXNrKGdldFRhc2tOYW1lKHR5cGUpKSA6IHVua25vd25Pd25lckRlYnVnVGFza1xuICAgICAgKTtcbiAgICB9O1xuICAgIGV4cG9ydHMuY3JlYXRlUmVmID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHJlZk9iamVjdCA9IHsgY3VycmVudDogbnVsbCB9O1xuICAgICAgT2JqZWN0LnNlYWwocmVmT2JqZWN0KTtcbiAgICAgIHJldHVybiByZWZPYmplY3Q7XG4gICAgfTtcbiAgICBleHBvcnRzLmZvcndhcmRSZWYgPSBmdW5jdGlvbiAocmVuZGVyKSB7XG4gICAgICBudWxsICE9IHJlbmRlciAmJiByZW5kZXIuJCR0eXBlb2YgPT09IFJFQUNUX01FTU9fVFlQRVxuICAgICAgICA/IGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgICBcImZvcndhcmRSZWYgcmVxdWlyZXMgYSByZW5kZXIgZnVuY3Rpb24gYnV0IHJlY2VpdmVkIGEgYG1lbW9gIGNvbXBvbmVudC4gSW5zdGVhZCBvZiBmb3J3YXJkUmVmKG1lbW8oLi4uKSksIHVzZSBtZW1vKGZvcndhcmRSZWYoLi4uKSkuXCJcbiAgICAgICAgICApXG4gICAgICAgIDogXCJmdW5jdGlvblwiICE9PSB0eXBlb2YgcmVuZGVyXG4gICAgICAgICAgPyBjb25zb2xlLmVycm9yKFxuICAgICAgICAgICAgICBcImZvcndhcmRSZWYgcmVxdWlyZXMgYSByZW5kZXIgZnVuY3Rpb24gYnV0IHdhcyBnaXZlbiAlcy5cIixcbiAgICAgICAgICAgICAgbnVsbCA9PT0gcmVuZGVyID8gXCJudWxsXCIgOiB0eXBlb2YgcmVuZGVyXG4gICAgICAgICAgICApXG4gICAgICAgICAgOiAwICE9PSByZW5kZXIubGVuZ3RoICYmXG4gICAgICAgICAgICAyICE9PSByZW5kZXIubGVuZ3RoICYmXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgICAgICBcImZvcndhcmRSZWYgcmVuZGVyIGZ1bmN0aW9ucyBhY2NlcHQgZXhhY3RseSB0d28gcGFyYW1ldGVyczogcHJvcHMgYW5kIHJlZi4gJXNcIixcbiAgICAgICAgICAgICAgMSA9PT0gcmVuZGVyLmxlbmd0aFxuICAgICAgICAgICAgICAgID8gXCJEaWQgeW91IGZvcmdldCB0byB1c2UgdGhlIHJlZiBwYXJhbWV0ZXI/XCJcbiAgICAgICAgICAgICAgICA6IFwiQW55IGFkZGl0aW9uYWwgcGFyYW1ldGVyIHdpbGwgYmUgdW5kZWZpbmVkLlwiXG4gICAgICAgICAgICApO1xuICAgICAgbnVsbCAhPSByZW5kZXIgJiZcbiAgICAgICAgbnVsbCAhPSByZW5kZXIuZGVmYXVsdFByb3BzICYmXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgXCJmb3J3YXJkUmVmIHJlbmRlciBmdW5jdGlvbnMgZG8gbm90IHN1cHBvcnQgZGVmYXVsdFByb3BzLiBEaWQgeW91IGFjY2lkZW50YWxseSBwYXNzIGEgUmVhY3QgY29tcG9uZW50P1wiXG4gICAgICAgICk7XG4gICAgICB2YXIgZWxlbWVudFR5cGUgPSB7ICQkdHlwZW9mOiBSRUFDVF9GT1JXQVJEX1JFRl9UWVBFLCByZW5kZXI6IHJlbmRlciB9LFxuICAgICAgICBvd25OYW1lO1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGVsZW1lbnRUeXBlLCBcImRpc3BsYXlOYW1lXCIsIHtcbiAgICAgICAgZW51bWVyYWJsZTogITEsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogITAsXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBvd25OYW1lO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgICAgb3duTmFtZSA9IG5hbWU7XG4gICAgICAgICAgcmVuZGVyLm5hbWUgfHxcbiAgICAgICAgICAgIHJlbmRlci5kaXNwbGF5TmFtZSB8fFxuICAgICAgICAgICAgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyZW5kZXIsIFwibmFtZVwiLCB7IHZhbHVlOiBuYW1lIH0pLFxuICAgICAgICAgICAgKHJlbmRlci5kaXNwbGF5TmFtZSA9IG5hbWUpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gZWxlbWVudFR5cGU7XG4gICAgfTtcbiAgICBleHBvcnRzLmlzVmFsaWRFbGVtZW50ID0gaXNWYWxpZEVsZW1lbnQ7XG4gICAgZXhwb3J0cy5sYXp5ID0gZnVuY3Rpb24gKGN0b3IpIHtcbiAgICAgIGN0b3IgPSB7IF9zdGF0dXM6IC0xLCBfcmVzdWx0OiBjdG9yIH07XG4gICAgICB2YXIgbGF6eVR5cGUgPSB7XG4gICAgICAgICAgJCR0eXBlb2Y6IFJFQUNUX0xBWllfVFlQRSxcbiAgICAgICAgICBfcGF5bG9hZDogY3RvcixcbiAgICAgICAgICBfaW5pdDogbGF6eUluaXRpYWxpemVyXG4gICAgICAgIH0sXG4gICAgICAgIGlvSW5mbyA9IHtcbiAgICAgICAgICBuYW1lOiBcImxhenlcIixcbiAgICAgICAgICBzdGFydDogLTEsXG4gICAgICAgICAgZW5kOiAtMSxcbiAgICAgICAgICB2YWx1ZTogbnVsbCxcbiAgICAgICAgICBvd25lcjogbnVsbCxcbiAgICAgICAgICBkZWJ1Z1N0YWNrOiBFcnJvcihcInJlYWN0LXN0YWNrLXRvcC1mcmFtZVwiKSxcbiAgICAgICAgICBkZWJ1Z1Rhc2s6IGNvbnNvbGUuY3JlYXRlVGFzayA/IGNvbnNvbGUuY3JlYXRlVGFzayhcImxhenkoKVwiKSA6IG51bGxcbiAgICAgICAgfTtcbiAgICAgIGN0b3IuX2lvSW5mbyA9IGlvSW5mbztcbiAgICAgIGxhenlUeXBlLl9kZWJ1Z0luZm8gPSBbeyBhd2FpdGVkOiBpb0luZm8gfV07XG4gICAgICByZXR1cm4gbGF6eVR5cGU7XG4gICAgfTtcbiAgICBleHBvcnRzLm1lbW8gPSBmdW5jdGlvbiAodHlwZSwgY29tcGFyZSkge1xuICAgICAgbnVsbCA9PSB0eXBlICYmXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgXCJtZW1vOiBUaGUgZmlyc3QgYXJndW1lbnQgbXVzdCBiZSBhIGNvbXBvbmVudC4gSW5zdGVhZCByZWNlaXZlZDogJXNcIixcbiAgICAgICAgICBudWxsID09PSB0eXBlID8gXCJudWxsXCIgOiB0eXBlb2YgdHlwZVxuICAgICAgICApO1xuICAgICAgY29tcGFyZSA9IHtcbiAgICAgICAgJCR0eXBlb2Y6IFJFQUNUX01FTU9fVFlQRSxcbiAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAgY29tcGFyZTogdm9pZCAwID09PSBjb21wYXJlID8gbnVsbCA6IGNvbXBhcmVcbiAgICAgIH07XG4gICAgICB2YXIgb3duTmFtZTtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb21wYXJlLCBcImRpc3BsYXlOYW1lXCIsIHtcbiAgICAgICAgZW51bWVyYWJsZTogITEsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogITAsXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBvd25OYW1lO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgICAgb3duTmFtZSA9IG5hbWU7XG4gICAgICAgICAgdHlwZS5uYW1lIHx8XG4gICAgICAgICAgICB0eXBlLmRpc3BsYXlOYW1lIHx8XG4gICAgICAgICAgICAoT2JqZWN0LmRlZmluZVByb3BlcnR5KHR5cGUsIFwibmFtZVwiLCB7IHZhbHVlOiBuYW1lIH0pLFxuICAgICAgICAgICAgKHR5cGUuZGlzcGxheU5hbWUgPSBuYW1lKSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGNvbXBhcmU7XG4gICAgfTtcbiAgICBleHBvcnRzLnN0YXJ0VHJhbnNpdGlvbiA9IGZ1bmN0aW9uIChzY29wZSkge1xuICAgICAgdmFyIHByZXZUcmFuc2l0aW9uID0gUmVhY3RTaGFyZWRJbnRlcm5hbHMuVCxcbiAgICAgICAgY3VycmVudFRyYW5zaXRpb24gPSB7fTtcbiAgICAgIGN1cnJlbnRUcmFuc2l0aW9uLl91cGRhdGVkRmliZXJzID0gbmV3IFNldCgpO1xuICAgICAgUmVhY3RTaGFyZWRJbnRlcm5hbHMuVCA9IGN1cnJlbnRUcmFuc2l0aW9uO1xuICAgICAgdHJ5IHtcbiAgICAgICAgdmFyIHJldHVyblZhbHVlID0gc2NvcGUoKSxcbiAgICAgICAgICBvblN0YXJ0VHJhbnNpdGlvbkZpbmlzaCA9IFJlYWN0U2hhcmVkSW50ZXJuYWxzLlM7XG4gICAgICAgIG51bGwgIT09IG9uU3RhcnRUcmFuc2l0aW9uRmluaXNoICYmXG4gICAgICAgICAgb25TdGFydFRyYW5zaXRpb25GaW5pc2goY3VycmVudFRyYW5zaXRpb24sIHJldHVyblZhbHVlKTtcbiAgICAgICAgXCJvYmplY3RcIiA9PT0gdHlwZW9mIHJldHVyblZhbHVlICYmXG4gICAgICAgICAgbnVsbCAhPT0gcmV0dXJuVmFsdWUgJiZcbiAgICAgICAgICBcImZ1bmN0aW9uXCIgPT09IHR5cGVvZiByZXR1cm5WYWx1ZS50aGVuICYmXG4gICAgICAgICAgKFJlYWN0U2hhcmVkSW50ZXJuYWxzLmFzeW5jVHJhbnNpdGlvbnMrKyxcbiAgICAgICAgICByZXR1cm5WYWx1ZS50aGVuKHJlbGVhc2VBc3luY1RyYW5zaXRpb24sIHJlbGVhc2VBc3luY1RyYW5zaXRpb24pLFxuICAgICAgICAgIHJldHVyblZhbHVlLnRoZW4obm9vcCwgcmVwb3J0R2xvYmFsRXJyb3IpKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIHJlcG9ydEdsb2JhbEVycm9yKGVycm9yKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIG51bGwgPT09IHByZXZUcmFuc2l0aW9uICYmXG4gICAgICAgICAgY3VycmVudFRyYW5zaXRpb24uX3VwZGF0ZWRGaWJlcnMgJiZcbiAgICAgICAgICAoKHNjb3BlID0gY3VycmVudFRyYW5zaXRpb24uX3VwZGF0ZWRGaWJlcnMuc2l6ZSksXG4gICAgICAgICAgY3VycmVudFRyYW5zaXRpb24uX3VwZGF0ZWRGaWJlcnMuY2xlYXIoKSxcbiAgICAgICAgICAxMCA8IHNjb3BlICYmXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgICAgIFwiRGV0ZWN0ZWQgYSBsYXJnZSBudW1iZXIgb2YgdXBkYXRlcyBpbnNpZGUgc3RhcnRUcmFuc2l0aW9uLiBJZiB0aGlzIGlzIGR1ZSB0byBhIHN1YnNjcmlwdGlvbiBwbGVhc2UgcmUtd3JpdGUgaXQgdG8gdXNlIFJlYWN0IHByb3ZpZGVkIGhvb2tzLiBPdGhlcndpc2UgY29uY3VycmVudCBtb2RlIGd1YXJhbnRlZXMgYXJlIG9mZiB0aGUgdGFibGUuXCJcbiAgICAgICAgICAgICkpLFxuICAgICAgICAgIG51bGwgIT09IHByZXZUcmFuc2l0aW9uICYmXG4gICAgICAgICAgICBudWxsICE9PSBjdXJyZW50VHJhbnNpdGlvbi50eXBlcyAmJlxuICAgICAgICAgICAgKG51bGwgIT09IHByZXZUcmFuc2l0aW9uLnR5cGVzICYmXG4gICAgICAgICAgICAgIHByZXZUcmFuc2l0aW9uLnR5cGVzICE9PSBjdXJyZW50VHJhbnNpdGlvbi50eXBlcyAmJlxuICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgICAgICAgIFwiV2UgZXhwZWN0ZWQgaW5uZXIgVHJhbnNpdGlvbnMgdG8gaGF2ZSB0cmFuc2ZlcnJlZCB0aGUgb3V0ZXIgdHlwZXMgc2V0IGFuZCB0aGF0IHlvdSBjYW5ub3QgYWRkIHRvIHRoZSBvdXRlciBUcmFuc2l0aW9uIHdoaWxlIGluc2lkZSB0aGUgaW5uZXIuVGhpcyBpcyBhIGJ1ZyBpbiBSZWFjdC5cIlxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgKHByZXZUcmFuc2l0aW9uLnR5cGVzID0gY3VycmVudFRyYW5zaXRpb24udHlwZXMpKSxcbiAgICAgICAgICAoUmVhY3RTaGFyZWRJbnRlcm5hbHMuVCA9IHByZXZUcmFuc2l0aW9uKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIGV4cG9ydHMudW5zdGFibGVfdXNlQ2FjaGVSZWZyZXNoID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHJlc29sdmVEaXNwYXRjaGVyKCkudXNlQ2FjaGVSZWZyZXNoKCk7XG4gICAgfTtcbiAgICBleHBvcnRzLnVzZSA9IGZ1bmN0aW9uICh1c2FibGUpIHtcbiAgICAgIHJldHVybiByZXNvbHZlRGlzcGF0Y2hlcigpLnVzZSh1c2FibGUpO1xuICAgIH07XG4gICAgZXhwb3J0cy51c2VBY3Rpb25TdGF0ZSA9IGZ1bmN0aW9uIChhY3Rpb24sIGluaXRpYWxTdGF0ZSwgcGVybWFsaW5rKSB7XG4gICAgICByZXR1cm4gcmVzb2x2ZURpc3BhdGNoZXIoKS51c2VBY3Rpb25TdGF0ZShcbiAgICAgICAgYWN0aW9uLFxuICAgICAgICBpbml0aWFsU3RhdGUsXG4gICAgICAgIHBlcm1hbGlua1xuICAgICAgKTtcbiAgICB9O1xuICAgIGV4cG9ydHMudXNlQ2FsbGJhY2sgPSBmdW5jdGlvbiAoY2FsbGJhY2ssIGRlcHMpIHtcbiAgICAgIHJldHVybiByZXNvbHZlRGlzcGF0Y2hlcigpLnVzZUNhbGxiYWNrKGNhbGxiYWNrLCBkZXBzKTtcbiAgICB9O1xuICAgIGV4cG9ydHMudXNlQ29udGV4dCA9IGZ1bmN0aW9uIChDb250ZXh0KSB7XG4gICAgICB2YXIgZGlzcGF0Y2hlciA9IHJlc29sdmVEaXNwYXRjaGVyKCk7XG4gICAgICBDb250ZXh0LiQkdHlwZW9mID09PSBSRUFDVF9DT05TVU1FUl9UWVBFICYmXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgXCJDYWxsaW5nIHVzZUNvbnRleHQoQ29udGV4dC5Db25zdW1lcikgaXMgbm90IHN1cHBvcnRlZCBhbmQgd2lsbCBjYXVzZSBidWdzLiBEaWQgeW91IG1lYW4gdG8gY2FsbCB1c2VDb250ZXh0KENvbnRleHQpIGluc3RlYWQ/XCJcbiAgICAgICAgKTtcbiAgICAgIHJldHVybiBkaXNwYXRjaGVyLnVzZUNvbnRleHQoQ29udGV4dCk7XG4gICAgfTtcbiAgICBleHBvcnRzLnVzZURlYnVnVmFsdWUgPSBmdW5jdGlvbiAodmFsdWUsIGZvcm1hdHRlckZuKSB7XG4gICAgICByZXR1cm4gcmVzb2x2ZURpc3BhdGNoZXIoKS51c2VEZWJ1Z1ZhbHVlKHZhbHVlLCBmb3JtYXR0ZXJGbik7XG4gICAgfTtcbiAgICBleHBvcnRzLnVzZURlZmVycmVkVmFsdWUgPSBmdW5jdGlvbiAodmFsdWUsIGluaXRpYWxWYWx1ZSkge1xuICAgICAgcmV0dXJuIHJlc29sdmVEaXNwYXRjaGVyKCkudXNlRGVmZXJyZWRWYWx1ZSh2YWx1ZSwgaW5pdGlhbFZhbHVlKTtcbiAgICB9O1xuICAgIGV4cG9ydHMudXNlRWZmZWN0ID0gZnVuY3Rpb24gKGNyZWF0ZSwgZGVwcykge1xuICAgICAgbnVsbCA9PSBjcmVhdGUgJiZcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgIFwiUmVhY3QgSG9vayB1c2VFZmZlY3QgcmVxdWlyZXMgYW4gZWZmZWN0IGNhbGxiYWNrLiBEaWQgeW91IGZvcmdldCB0byBwYXNzIGEgY2FsbGJhY2sgdG8gdGhlIGhvb2s/XCJcbiAgICAgICAgKTtcbiAgICAgIHJldHVybiByZXNvbHZlRGlzcGF0Y2hlcigpLnVzZUVmZmVjdChjcmVhdGUsIGRlcHMpO1xuICAgIH07XG4gICAgZXhwb3J0cy51c2VFZmZlY3RFdmVudCA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgcmV0dXJuIHJlc29sdmVEaXNwYXRjaGVyKCkudXNlRWZmZWN0RXZlbnQoY2FsbGJhY2spO1xuICAgIH07XG4gICAgZXhwb3J0cy51c2VJZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiByZXNvbHZlRGlzcGF0Y2hlcigpLnVzZUlkKCk7XG4gICAgfTtcbiAgICBleHBvcnRzLnVzZUltcGVyYXRpdmVIYW5kbGUgPSBmdW5jdGlvbiAocmVmLCBjcmVhdGUsIGRlcHMpIHtcbiAgICAgIHJldHVybiByZXNvbHZlRGlzcGF0Y2hlcigpLnVzZUltcGVyYXRpdmVIYW5kbGUocmVmLCBjcmVhdGUsIGRlcHMpO1xuICAgIH07XG4gICAgZXhwb3J0cy51c2VJbnNlcnRpb25FZmZlY3QgPSBmdW5jdGlvbiAoY3JlYXRlLCBkZXBzKSB7XG4gICAgICBudWxsID09IGNyZWF0ZSAmJlxuICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgXCJSZWFjdCBIb29rIHVzZUluc2VydGlvbkVmZmVjdCByZXF1aXJlcyBhbiBlZmZlY3QgY2FsbGJhY2suIERpZCB5b3UgZm9yZ2V0IHRvIHBhc3MgYSBjYWxsYmFjayB0byB0aGUgaG9vaz9cIlxuICAgICAgICApO1xuICAgICAgcmV0dXJuIHJlc29sdmVEaXNwYXRjaGVyKCkudXNlSW5zZXJ0aW9uRWZmZWN0KGNyZWF0ZSwgZGVwcyk7XG4gICAgfTtcbiAgICBleHBvcnRzLnVzZUxheW91dEVmZmVjdCA9IGZ1bmN0aW9uIChjcmVhdGUsIGRlcHMpIHtcbiAgICAgIG51bGwgPT0gY3JlYXRlICYmXG4gICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICBcIlJlYWN0IEhvb2sgdXNlTGF5b3V0RWZmZWN0IHJlcXVpcmVzIGFuIGVmZmVjdCBjYWxsYmFjay4gRGlkIHlvdSBmb3JnZXQgdG8gcGFzcyBhIGNhbGxiYWNrIHRvIHRoZSBob29rP1wiXG4gICAgICAgICk7XG4gICAgICByZXR1cm4gcmVzb2x2ZURpc3BhdGNoZXIoKS51c2VMYXlvdXRFZmZlY3QoY3JlYXRlLCBkZXBzKTtcbiAgICB9O1xuICAgIGV4cG9ydHMudXNlTWVtbyA9IGZ1bmN0aW9uIChjcmVhdGUsIGRlcHMpIHtcbiAgICAgIHJldHVybiByZXNvbHZlRGlzcGF0Y2hlcigpLnVzZU1lbW8oY3JlYXRlLCBkZXBzKTtcbiAgICB9O1xuICAgIGV4cG9ydHMudXNlT3B0aW1pc3RpYyA9IGZ1bmN0aW9uIChwYXNzdGhyb3VnaCwgcmVkdWNlcikge1xuICAgICAgcmV0dXJuIHJlc29sdmVEaXNwYXRjaGVyKCkudXNlT3B0aW1pc3RpYyhwYXNzdGhyb3VnaCwgcmVkdWNlcik7XG4gICAgfTtcbiAgICBleHBvcnRzLnVzZVJlZHVjZXIgPSBmdW5jdGlvbiAocmVkdWNlciwgaW5pdGlhbEFyZywgaW5pdCkge1xuICAgICAgcmV0dXJuIHJlc29sdmVEaXNwYXRjaGVyKCkudXNlUmVkdWNlcihyZWR1Y2VyLCBpbml0aWFsQXJnLCBpbml0KTtcbiAgICB9O1xuICAgIGV4cG9ydHMudXNlUmVmID0gZnVuY3Rpb24gKGluaXRpYWxWYWx1ZSkge1xuICAgICAgcmV0dXJuIHJlc29sdmVEaXNwYXRjaGVyKCkudXNlUmVmKGluaXRpYWxWYWx1ZSk7XG4gICAgfTtcbiAgICBleHBvcnRzLnVzZVN0YXRlID0gZnVuY3Rpb24gKGluaXRpYWxTdGF0ZSkge1xuICAgICAgcmV0dXJuIHJlc29sdmVEaXNwYXRjaGVyKCkudXNlU3RhdGUoaW5pdGlhbFN0YXRlKTtcbiAgICB9O1xuICAgIGV4cG9ydHMudXNlU3luY0V4dGVybmFsU3RvcmUgPSBmdW5jdGlvbiAoXG4gICAgICBzdWJzY3JpYmUsXG4gICAgICBnZXRTbmFwc2hvdCxcbiAgICAgIGdldFNlcnZlclNuYXBzaG90XG4gICAgKSB7XG4gICAgICByZXR1cm4gcmVzb2x2ZURpc3BhdGNoZXIoKS51c2VTeW5jRXh0ZXJuYWxTdG9yZShcbiAgICAgICAgc3Vic2NyaWJlLFxuICAgICAgICBnZXRTbmFwc2hvdCxcbiAgICAgICAgZ2V0U2VydmVyU25hcHNob3RcbiAgICAgICk7XG4gICAgfTtcbiAgICBleHBvcnRzLnVzZVRyYW5zaXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gcmVzb2x2ZURpc3BhdGNoZXIoKS51c2VUcmFuc2l0aW9uKCk7XG4gICAgfTtcbiAgICBleHBvcnRzLnZlcnNpb24gPSBcIjE5LjIuOFwiO1xuICAgIFwidW5kZWZpbmVkXCIgIT09IHR5cGVvZiBfX1JFQUNUX0RFVlRPT0xTX0dMT0JBTF9IT09LX18gJiZcbiAgICAgIFwiZnVuY3Rpb25cIiA9PT1cbiAgICAgICAgdHlwZW9mIF9fUkVBQ1RfREVWVE9PTFNfR0xPQkFMX0hPT0tfXy5yZWdpc3RlckludGVybmFsTW9kdWxlU3RvcCAmJlxuICAgICAgX19SRUFDVF9ERVZUT09MU19HTE9CQUxfSE9PS19fLnJlZ2lzdGVySW50ZXJuYWxNb2R1bGVTdG9wKEVycm9yKCkpO1xuICB9KSgpO1xuIiwgIid1c2Ugc3RyaWN0JztcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Nqcy9yZWFjdC5wcm9kdWN0aW9uLmpzJyk7XG59IGVsc2Uge1xuICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vY2pzL3JlYWN0LmRldmVsb3BtZW50LmpzJyk7XG59XG4iLCAiLyoqXG4gKiBAbGljZW5zZSBSZWFjdFxuICogcmVhY3QtanN4LXJ1bnRpbWUuZGV2ZWxvcG1lbnQuanNcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIE1ldGEgUGxhdGZvcm1zLCBJbmMuIGFuZCBhZmZpbGlhdGVzLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cblwidXNlIHN0cmljdFwiO1xuXCJwcm9kdWN0aW9uXCIgIT09IHByb2Nlc3MuZW52Lk5PREVfRU5WICYmXG4gIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gZ2V0Q29tcG9uZW50TmFtZUZyb21UeXBlKHR5cGUpIHtcbiAgICAgIGlmIChudWxsID09IHR5cGUpIHJldHVybiBudWxsO1xuICAgICAgaWYgKFwiZnVuY3Rpb25cIiA9PT0gdHlwZW9mIHR5cGUpXG4gICAgICAgIHJldHVybiB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9DTElFTlRfUkVGRVJFTkNFXG4gICAgICAgICAgPyBudWxsXG4gICAgICAgICAgOiB0eXBlLmRpc3BsYXlOYW1lIHx8IHR5cGUubmFtZSB8fCBudWxsO1xuICAgICAgaWYgKFwic3RyaW5nXCIgPT09IHR5cGVvZiB0eXBlKSByZXR1cm4gdHlwZTtcbiAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlIFJFQUNUX0ZSQUdNRU5UX1RZUEU6XG4gICAgICAgICAgcmV0dXJuIFwiRnJhZ21lbnRcIjtcbiAgICAgICAgY2FzZSBSRUFDVF9QUk9GSUxFUl9UWVBFOlxuICAgICAgICAgIHJldHVybiBcIlByb2ZpbGVyXCI7XG4gICAgICAgIGNhc2UgUkVBQ1RfU1RSSUNUX01PREVfVFlQRTpcbiAgICAgICAgICByZXR1cm4gXCJTdHJpY3RNb2RlXCI7XG4gICAgICAgIGNhc2UgUkVBQ1RfU1VTUEVOU0VfVFlQRTpcbiAgICAgICAgICByZXR1cm4gXCJTdXNwZW5zZVwiO1xuICAgICAgICBjYXNlIFJFQUNUX1NVU1BFTlNFX0xJU1RfVFlQRTpcbiAgICAgICAgICByZXR1cm4gXCJTdXNwZW5zZUxpc3RcIjtcbiAgICAgICAgY2FzZSBSRUFDVF9BQ1RJVklUWV9UWVBFOlxuICAgICAgICAgIHJldHVybiBcIkFjdGl2aXR5XCI7XG4gICAgICB9XG4gICAgICBpZiAoXCJvYmplY3RcIiA9PT0gdHlwZW9mIHR5cGUpXG4gICAgICAgIHN3aXRjaCAoXG4gICAgICAgICAgKFwibnVtYmVyXCIgPT09IHR5cGVvZiB0eXBlLnRhZyAmJlxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICAgICAgXCJSZWNlaXZlZCBhbiB1bmV4cGVjdGVkIG9iamVjdCBpbiBnZXRDb21wb25lbnROYW1lRnJvbVR5cGUoKS4gVGhpcyBpcyBsaWtlbHkgYSBidWcgaW4gUmVhY3QuIFBsZWFzZSBmaWxlIGFuIGlzc3VlLlwiXG4gICAgICAgICAgICApLFxuICAgICAgICAgIHR5cGUuJCR0eXBlb2YpXG4gICAgICAgICkge1xuICAgICAgICAgIGNhc2UgUkVBQ1RfUE9SVEFMX1RZUEU6XG4gICAgICAgICAgICByZXR1cm4gXCJQb3J0YWxcIjtcbiAgICAgICAgICBjYXNlIFJFQUNUX0NPTlRFWFRfVFlQRTpcbiAgICAgICAgICAgIHJldHVybiB0eXBlLmRpc3BsYXlOYW1lIHx8IFwiQ29udGV4dFwiO1xuICAgICAgICAgIGNhc2UgUkVBQ1RfQ09OU1VNRVJfVFlQRTpcbiAgICAgICAgICAgIHJldHVybiAodHlwZS5fY29udGV4dC5kaXNwbGF5TmFtZSB8fCBcIkNvbnRleHRcIikgKyBcIi5Db25zdW1lclwiO1xuICAgICAgICAgIGNhc2UgUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRTpcbiAgICAgICAgICAgIHZhciBpbm5lclR5cGUgPSB0eXBlLnJlbmRlcjtcbiAgICAgICAgICAgIHR5cGUgPSB0eXBlLmRpc3BsYXlOYW1lO1xuICAgICAgICAgICAgdHlwZSB8fFxuICAgICAgICAgICAgICAoKHR5cGUgPSBpbm5lclR5cGUuZGlzcGxheU5hbWUgfHwgaW5uZXJUeXBlLm5hbWUgfHwgXCJcIiksXG4gICAgICAgICAgICAgICh0eXBlID0gXCJcIiAhPT0gdHlwZSA/IFwiRm9yd2FyZFJlZihcIiArIHR5cGUgKyBcIilcIiA6IFwiRm9yd2FyZFJlZlwiKSk7XG4gICAgICAgICAgICByZXR1cm4gdHlwZTtcbiAgICAgICAgICBjYXNlIFJFQUNUX01FTU9fVFlQRTpcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgIChpbm5lclR5cGUgPSB0eXBlLmRpc3BsYXlOYW1lIHx8IG51bGwpLFxuICAgICAgICAgICAgICBudWxsICE9PSBpbm5lclR5cGVcbiAgICAgICAgICAgICAgICA/IGlubmVyVHlwZVxuICAgICAgICAgICAgICAgIDogZ2V0Q29tcG9uZW50TmFtZUZyb21UeXBlKHR5cGUudHlwZSkgfHwgXCJNZW1vXCJcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgY2FzZSBSRUFDVF9MQVpZX1RZUEU6XG4gICAgICAgICAgICBpbm5lclR5cGUgPSB0eXBlLl9wYXlsb2FkO1xuICAgICAgICAgICAgdHlwZSA9IHR5cGUuX2luaXQ7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICByZXR1cm4gZ2V0Q29tcG9uZW50TmFtZUZyb21UeXBlKHR5cGUoaW5uZXJUeXBlKSk7XG4gICAgICAgICAgICB9IGNhdGNoICh4KSB7fVxuICAgICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgZnVuY3Rpb24gdGVzdFN0cmluZ0NvZXJjaW9uKHZhbHVlKSB7XG4gICAgICByZXR1cm4gXCJcIiArIHZhbHVlO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjaGVja0tleVN0cmluZ0NvZXJjaW9uKHZhbHVlKSB7XG4gICAgICB0cnkge1xuICAgICAgICB0ZXN0U3RyaW5nQ29lcmNpb24odmFsdWUpO1xuICAgICAgICB2YXIgSlNDb21waWxlcl9pbmxpbmVfcmVzdWx0ID0gITE7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIEpTQ29tcGlsZXJfaW5saW5lX3Jlc3VsdCA9ICEwO1xuICAgICAgfVxuICAgICAgaWYgKEpTQ29tcGlsZXJfaW5saW5lX3Jlc3VsdCkge1xuICAgICAgICBKU0NvbXBpbGVyX2lubGluZV9yZXN1bHQgPSBjb25zb2xlO1xuICAgICAgICB2YXIgSlNDb21waWxlcl90ZW1wX2NvbnN0ID0gSlNDb21waWxlcl9pbmxpbmVfcmVzdWx0LmVycm9yO1xuICAgICAgICB2YXIgSlNDb21waWxlcl9pbmxpbmVfcmVzdWx0JGpzY29tcCQwID1cbiAgICAgICAgICAoXCJmdW5jdGlvblwiID09PSB0eXBlb2YgU3ltYm9sICYmXG4gICAgICAgICAgICBTeW1ib2wudG9TdHJpbmdUYWcgJiZcbiAgICAgICAgICAgIHZhbHVlW1N5bWJvbC50b1N0cmluZ1RhZ10pIHx8XG4gICAgICAgICAgdmFsdWUuY29uc3RydWN0b3IubmFtZSB8fFxuICAgICAgICAgIFwiT2JqZWN0XCI7XG4gICAgICAgIEpTQ29tcGlsZXJfdGVtcF9jb25zdC5jYWxsKFxuICAgICAgICAgIEpTQ29tcGlsZXJfaW5saW5lX3Jlc3VsdCxcbiAgICAgICAgICBcIlRoZSBwcm92aWRlZCBrZXkgaXMgYW4gdW5zdXBwb3J0ZWQgdHlwZSAlcy4gVGhpcyB2YWx1ZSBtdXN0IGJlIGNvZXJjZWQgdG8gYSBzdHJpbmcgYmVmb3JlIHVzaW5nIGl0IGhlcmUuXCIsXG4gICAgICAgICAgSlNDb21waWxlcl9pbmxpbmVfcmVzdWx0JGpzY29tcCQwXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiB0ZXN0U3RyaW5nQ29lcmNpb24odmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBnZXRUYXNrTmFtZSh0eXBlKSB7XG4gICAgICBpZiAodHlwZSA9PT0gUkVBQ1RfRlJBR01FTlRfVFlQRSkgcmV0dXJuIFwiPD5cIjtcbiAgICAgIGlmIChcbiAgICAgICAgXCJvYmplY3RcIiA9PT0gdHlwZW9mIHR5cGUgJiZcbiAgICAgICAgbnVsbCAhPT0gdHlwZSAmJlxuICAgICAgICB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9MQVpZX1RZUEVcbiAgICAgIClcbiAgICAgICAgcmV0dXJuIFwiPC4uLj5cIjtcbiAgICAgIHRyeSB7XG4gICAgICAgIHZhciBuYW1lID0gZ2V0Q29tcG9uZW50TmFtZUZyb21UeXBlKHR5cGUpO1xuICAgICAgICByZXR1cm4gbmFtZSA/IFwiPFwiICsgbmFtZSArIFwiPlwiIDogXCI8Li4uPlwiO1xuICAgICAgfSBjYXRjaCAoeCkge1xuICAgICAgICByZXR1cm4gXCI8Li4uPlwiO1xuICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBnZXRPd25lcigpIHtcbiAgICAgIHZhciBkaXNwYXRjaGVyID0gUmVhY3RTaGFyZWRJbnRlcm5hbHMuQTtcbiAgICAgIHJldHVybiBudWxsID09PSBkaXNwYXRjaGVyID8gbnVsbCA6IGRpc3BhdGNoZXIuZ2V0T3duZXIoKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gVW5rbm93bk93bmVyKCkge1xuICAgICAgcmV0dXJuIEVycm9yKFwicmVhY3Qtc3RhY2stdG9wLWZyYW1lXCIpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBoYXNWYWxpZEtleShjb25maWcpIHtcbiAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGNvbmZpZywgXCJrZXlcIikpIHtcbiAgICAgICAgdmFyIGdldHRlciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoY29uZmlnLCBcImtleVwiKS5nZXQ7XG4gICAgICAgIGlmIChnZXR0ZXIgJiYgZ2V0dGVyLmlzUmVhY3RXYXJuaW5nKSByZXR1cm4gITE7XG4gICAgICB9XG4gICAgICByZXR1cm4gdm9pZCAwICE9PSBjb25maWcua2V5O1xuICAgIH1cbiAgICBmdW5jdGlvbiBkZWZpbmVLZXlQcm9wV2FybmluZ0dldHRlcihwcm9wcywgZGlzcGxheU5hbWUpIHtcbiAgICAgIGZ1bmN0aW9uIHdhcm5BYm91dEFjY2Vzc2luZ0tleSgpIHtcbiAgICAgICAgc3BlY2lhbFByb3BLZXlXYXJuaW5nU2hvd24gfHxcbiAgICAgICAgICAoKHNwZWNpYWxQcm9wS2V5V2FybmluZ1Nob3duID0gITApLFxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgICBcIiVzOiBga2V5YCBpcyBub3QgYSBwcm9wLiBUcnlpbmcgdG8gYWNjZXNzIGl0IHdpbGwgcmVzdWx0IGluIGB1bmRlZmluZWRgIGJlaW5nIHJldHVybmVkLiBJZiB5b3UgbmVlZCB0byBhY2Nlc3MgdGhlIHNhbWUgdmFsdWUgd2l0aGluIHRoZSBjaGlsZCBjb21wb25lbnQsIHlvdSBzaG91bGQgcGFzcyBpdCBhcyBhIGRpZmZlcmVudCBwcm9wLiAoaHR0cHM6Ly9yZWFjdC5kZXYvbGluay9zcGVjaWFsLXByb3BzKVwiLFxuICAgICAgICAgICAgZGlzcGxheU5hbWVcbiAgICAgICAgICApKTtcbiAgICAgIH1cbiAgICAgIHdhcm5BYm91dEFjY2Vzc2luZ0tleS5pc1JlYWN0V2FybmluZyA9ICEwO1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3BzLCBcImtleVwiLCB7XG4gICAgICAgIGdldDogd2FybkFib3V0QWNjZXNzaW5nS2V5LFxuICAgICAgICBjb25maWd1cmFibGU6ICEwXG4gICAgICB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZWxlbWVudFJlZkdldHRlcldpdGhEZXByZWNhdGlvbldhcm5pbmcoKSB7XG4gICAgICB2YXIgY29tcG9uZW50TmFtZSA9IGdldENvbXBvbmVudE5hbWVGcm9tVHlwZSh0aGlzLnR5cGUpO1xuICAgICAgZGlkV2FybkFib3V0RWxlbWVudFJlZltjb21wb25lbnROYW1lXSB8fFxuICAgICAgICAoKGRpZFdhcm5BYm91dEVsZW1lbnRSZWZbY29tcG9uZW50TmFtZV0gPSAhMCksXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgXCJBY2Nlc3NpbmcgZWxlbWVudC5yZWYgd2FzIHJlbW92ZWQgaW4gUmVhY3QgMTkuIHJlZiBpcyBub3cgYSByZWd1bGFyIHByb3AuIEl0IHdpbGwgYmUgcmVtb3ZlZCBmcm9tIHRoZSBKU1ggRWxlbWVudCB0eXBlIGluIGEgZnV0dXJlIHJlbGVhc2UuXCJcbiAgICAgICAgKSk7XG4gICAgICBjb21wb25lbnROYW1lID0gdGhpcy5wcm9wcy5yZWY7XG4gICAgICByZXR1cm4gdm9pZCAwICE9PSBjb21wb25lbnROYW1lID8gY29tcG9uZW50TmFtZSA6IG51bGw7XG4gICAgfVxuICAgIGZ1bmN0aW9uIFJlYWN0RWxlbWVudCh0eXBlLCBrZXksIHByb3BzLCBvd25lciwgZGVidWdTdGFjaywgZGVidWdUYXNrKSB7XG4gICAgICB2YXIgcmVmUHJvcCA9IHByb3BzLnJlZjtcbiAgICAgIHR5cGUgPSB7XG4gICAgICAgICQkdHlwZW9mOiBSRUFDVF9FTEVNRU5UX1RZUEUsXG4gICAgICAgIHR5cGU6IHR5cGUsXG4gICAgICAgIGtleToga2V5LFxuICAgICAgICBwcm9wczogcHJvcHMsXG4gICAgICAgIF9vd25lcjogb3duZXJcbiAgICAgIH07XG4gICAgICBudWxsICE9PSAodm9pZCAwICE9PSByZWZQcm9wID8gcmVmUHJvcCA6IG51bGwpXG4gICAgICAgID8gT2JqZWN0LmRlZmluZVByb3BlcnR5KHR5cGUsIFwicmVmXCIsIHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6ICExLFxuICAgICAgICAgICAgZ2V0OiBlbGVtZW50UmVmR2V0dGVyV2l0aERlcHJlY2F0aW9uV2FybmluZ1xuICAgICAgICAgIH0pXG4gICAgICAgIDogT2JqZWN0LmRlZmluZVByb3BlcnR5KHR5cGUsIFwicmVmXCIsIHsgZW51bWVyYWJsZTogITEsIHZhbHVlOiBudWxsIH0pO1xuICAgICAgdHlwZS5fc3RvcmUgPSB7fTtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0eXBlLl9zdG9yZSwgXCJ2YWxpZGF0ZWRcIiwge1xuICAgICAgICBjb25maWd1cmFibGU6ICExLFxuICAgICAgICBlbnVtZXJhYmxlOiAhMSxcbiAgICAgICAgd3JpdGFibGU6ICEwLFxuICAgICAgICB2YWx1ZTogMFxuICAgICAgfSk7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodHlwZSwgXCJfZGVidWdJbmZvXCIsIHtcbiAgICAgICAgY29uZmlndXJhYmxlOiAhMSxcbiAgICAgICAgZW51bWVyYWJsZTogITEsXG4gICAgICAgIHdyaXRhYmxlOiAhMCxcbiAgICAgICAgdmFsdWU6IG51bGxcbiAgICAgIH0pO1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHR5cGUsIFwiX2RlYnVnU3RhY2tcIiwge1xuICAgICAgICBjb25maWd1cmFibGU6ICExLFxuICAgICAgICBlbnVtZXJhYmxlOiAhMSxcbiAgICAgICAgd3JpdGFibGU6ICEwLFxuICAgICAgICB2YWx1ZTogZGVidWdTdGFja1xuICAgICAgfSk7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodHlwZSwgXCJfZGVidWdUYXNrXCIsIHtcbiAgICAgICAgY29uZmlndXJhYmxlOiAhMSxcbiAgICAgICAgZW51bWVyYWJsZTogITEsXG4gICAgICAgIHdyaXRhYmxlOiAhMCxcbiAgICAgICAgdmFsdWU6IGRlYnVnVGFza1xuICAgICAgfSk7XG4gICAgICBPYmplY3QuZnJlZXplICYmIChPYmplY3QuZnJlZXplKHR5cGUucHJvcHMpLCBPYmplY3QuZnJlZXplKHR5cGUpKTtcbiAgICAgIHJldHVybiB0eXBlO1xuICAgIH1cbiAgICBmdW5jdGlvbiBqc3hERVZJbXBsKFxuICAgICAgdHlwZSxcbiAgICAgIGNvbmZpZyxcbiAgICAgIG1heWJlS2V5LFxuICAgICAgaXNTdGF0aWNDaGlsZHJlbixcbiAgICAgIGRlYnVnU3RhY2ssXG4gICAgICBkZWJ1Z1Rhc2tcbiAgICApIHtcbiAgICAgIHZhciBjaGlsZHJlbiA9IGNvbmZpZy5jaGlsZHJlbjtcbiAgICAgIGlmICh2b2lkIDAgIT09IGNoaWxkcmVuKVxuICAgICAgICBpZiAoaXNTdGF0aWNDaGlsZHJlbilcbiAgICAgICAgICBpZiAoaXNBcnJheUltcGwoY2hpbGRyZW4pKSB7XG4gICAgICAgICAgICBmb3IgKFxuICAgICAgICAgICAgICBpc1N0YXRpY0NoaWxkcmVuID0gMDtcbiAgICAgICAgICAgICAgaXNTdGF0aWNDaGlsZHJlbiA8IGNoaWxkcmVuLmxlbmd0aDtcbiAgICAgICAgICAgICAgaXNTdGF0aWNDaGlsZHJlbisrXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAgIHZhbGlkYXRlQ2hpbGRLZXlzKGNoaWxkcmVuW2lzU3RhdGljQ2hpbGRyZW5dKTtcbiAgICAgICAgICAgIE9iamVjdC5mcmVlemUgJiYgT2JqZWN0LmZyZWV6ZShjaGlsZHJlbik7XG4gICAgICAgICAgfSBlbHNlXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgICAgICBcIlJlYWN0LmpzeDogU3RhdGljIGNoaWxkcmVuIHNob3VsZCBhbHdheXMgYmUgYW4gYXJyYXkuIFlvdSBhcmUgbGlrZWx5IGV4cGxpY2l0bHkgY2FsbGluZyBSZWFjdC5qc3hzIG9yIFJlYWN0LmpzeERFVi4gVXNlIHRoZSBCYWJlbCB0cmFuc2Zvcm0gaW5zdGVhZC5cIlxuICAgICAgICAgICAgKTtcbiAgICAgICAgZWxzZSB2YWxpZGF0ZUNoaWxkS2V5cyhjaGlsZHJlbik7XG4gICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChjb25maWcsIFwia2V5XCIpKSB7XG4gICAgICAgIGNoaWxkcmVuID0gZ2V0Q29tcG9uZW50TmFtZUZyb21UeXBlKHR5cGUpO1xuICAgICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGNvbmZpZykuZmlsdGVyKGZ1bmN0aW9uIChrKSB7XG4gICAgICAgICAgcmV0dXJuIFwia2V5XCIgIT09IGs7XG4gICAgICAgIH0pO1xuICAgICAgICBpc1N0YXRpY0NoaWxkcmVuID1cbiAgICAgICAgICAwIDwga2V5cy5sZW5ndGhcbiAgICAgICAgICAgID8gXCJ7a2V5OiBzb21lS2V5LCBcIiArIGtleXMuam9pbihcIjogLi4uLCBcIikgKyBcIjogLi4ufVwiXG4gICAgICAgICAgICA6IFwie2tleTogc29tZUtleX1cIjtcbiAgICAgICAgZGlkV2FybkFib3V0S2V5U3ByZWFkW2NoaWxkcmVuICsgaXNTdGF0aWNDaGlsZHJlbl0gfHxcbiAgICAgICAgICAoKGtleXMgPVxuICAgICAgICAgICAgMCA8IGtleXMubGVuZ3RoID8gXCJ7XCIgKyBrZXlzLmpvaW4oXCI6IC4uLiwgXCIpICsgXCI6IC4uLn1cIiA6IFwie31cIiksXG4gICAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICAgICdBIHByb3BzIG9iamVjdCBjb250YWluaW5nIGEgXCJrZXlcIiBwcm9wIGlzIGJlaW5nIHNwcmVhZCBpbnRvIEpTWDpcXG4gIGxldCBwcm9wcyA9ICVzO1xcbiAgPCVzIHsuLi5wcm9wc30gLz5cXG5SZWFjdCBrZXlzIG11c3QgYmUgcGFzc2VkIGRpcmVjdGx5IHRvIEpTWCB3aXRob3V0IHVzaW5nIHNwcmVhZDpcXG4gIGxldCBwcm9wcyA9ICVzO1xcbiAgPCVzIGtleT17c29tZUtleX0gey4uLnByb3BzfSAvPicsXG4gICAgICAgICAgICBpc1N0YXRpY0NoaWxkcmVuLFxuICAgICAgICAgICAgY2hpbGRyZW4sXG4gICAgICAgICAgICBrZXlzLFxuICAgICAgICAgICAgY2hpbGRyZW5cbiAgICAgICAgICApLFxuICAgICAgICAgIChkaWRXYXJuQWJvdXRLZXlTcHJlYWRbY2hpbGRyZW4gKyBpc1N0YXRpY0NoaWxkcmVuXSA9ICEwKSk7XG4gICAgICB9XG4gICAgICBjaGlsZHJlbiA9IG51bGw7XG4gICAgICB2b2lkIDAgIT09IG1heWJlS2V5ICYmXG4gICAgICAgIChjaGVja0tleVN0cmluZ0NvZXJjaW9uKG1heWJlS2V5KSwgKGNoaWxkcmVuID0gXCJcIiArIG1heWJlS2V5KSk7XG4gICAgICBoYXNWYWxpZEtleShjb25maWcpICYmXG4gICAgICAgIChjaGVja0tleVN0cmluZ0NvZXJjaW9uKGNvbmZpZy5rZXkpLCAoY2hpbGRyZW4gPSBcIlwiICsgY29uZmlnLmtleSkpO1xuICAgICAgaWYgKFwia2V5XCIgaW4gY29uZmlnKSB7XG4gICAgICAgIG1heWJlS2V5ID0ge307XG4gICAgICAgIGZvciAodmFyIHByb3BOYW1lIGluIGNvbmZpZylcbiAgICAgICAgICBcImtleVwiICE9PSBwcm9wTmFtZSAmJiAobWF5YmVLZXlbcHJvcE5hbWVdID0gY29uZmlnW3Byb3BOYW1lXSk7XG4gICAgICB9IGVsc2UgbWF5YmVLZXkgPSBjb25maWc7XG4gICAgICBjaGlsZHJlbiAmJlxuICAgICAgICBkZWZpbmVLZXlQcm9wV2FybmluZ0dldHRlcihcbiAgICAgICAgICBtYXliZUtleSxcbiAgICAgICAgICBcImZ1bmN0aW9uXCIgPT09IHR5cGVvZiB0eXBlXG4gICAgICAgICAgICA/IHR5cGUuZGlzcGxheU5hbWUgfHwgdHlwZS5uYW1lIHx8IFwiVW5rbm93blwiXG4gICAgICAgICAgICA6IHR5cGVcbiAgICAgICAgKTtcbiAgICAgIHJldHVybiBSZWFjdEVsZW1lbnQoXG4gICAgICAgIHR5cGUsXG4gICAgICAgIGNoaWxkcmVuLFxuICAgICAgICBtYXliZUtleSxcbiAgICAgICAgZ2V0T3duZXIoKSxcbiAgICAgICAgZGVidWdTdGFjayxcbiAgICAgICAgZGVidWdUYXNrXG4gICAgICApO1xuICAgIH1cbiAgICBmdW5jdGlvbiB2YWxpZGF0ZUNoaWxkS2V5cyhub2RlKSB7XG4gICAgICBpc1ZhbGlkRWxlbWVudChub2RlKVxuICAgICAgICA/IG5vZGUuX3N0b3JlICYmIChub2RlLl9zdG9yZS52YWxpZGF0ZWQgPSAxKVxuICAgICAgICA6IFwib2JqZWN0XCIgPT09IHR5cGVvZiBub2RlICYmXG4gICAgICAgICAgbnVsbCAhPT0gbm9kZSAmJlxuICAgICAgICAgIG5vZGUuJCR0eXBlb2YgPT09IFJFQUNUX0xBWllfVFlQRSAmJlxuICAgICAgICAgIChcImZ1bGZpbGxlZFwiID09PSBub2RlLl9wYXlsb2FkLnN0YXR1c1xuICAgICAgICAgICAgPyBpc1ZhbGlkRWxlbWVudChub2RlLl9wYXlsb2FkLnZhbHVlKSAmJlxuICAgICAgICAgICAgICBub2RlLl9wYXlsb2FkLnZhbHVlLl9zdG9yZSAmJlxuICAgICAgICAgICAgICAobm9kZS5fcGF5bG9hZC52YWx1ZS5fc3RvcmUudmFsaWRhdGVkID0gMSlcbiAgICAgICAgICAgIDogbm9kZS5fc3RvcmUgJiYgKG5vZGUuX3N0b3JlLnZhbGlkYXRlZCA9IDEpKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaXNWYWxpZEVsZW1lbnQob2JqZWN0KSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICBcIm9iamVjdFwiID09PSB0eXBlb2Ygb2JqZWN0ICYmXG4gICAgICAgIG51bGwgIT09IG9iamVjdCAmJlxuICAgICAgICBvYmplY3QuJCR0eXBlb2YgPT09IFJFQUNUX0VMRU1FTlRfVFlQRVxuICAgICAgKTtcbiAgICB9XG4gICAgdmFyIFJlYWN0ID0gcmVxdWlyZShcInJlYWN0XCIpLFxuICAgICAgUkVBQ1RfRUxFTUVOVF9UWVBFID0gU3ltYm9sLmZvcihcInJlYWN0LnRyYW5zaXRpb25hbC5lbGVtZW50XCIpLFxuICAgICAgUkVBQ1RfUE9SVEFMX1RZUEUgPSBTeW1ib2wuZm9yKFwicmVhY3QucG9ydGFsXCIpLFxuICAgICAgUkVBQ1RfRlJBR01FTlRfVFlQRSA9IFN5bWJvbC5mb3IoXCJyZWFjdC5mcmFnbWVudFwiKSxcbiAgICAgIFJFQUNUX1NUUklDVF9NT0RFX1RZUEUgPSBTeW1ib2wuZm9yKFwicmVhY3Quc3RyaWN0X21vZGVcIiksXG4gICAgICBSRUFDVF9QUk9GSUxFUl9UWVBFID0gU3ltYm9sLmZvcihcInJlYWN0LnByb2ZpbGVyXCIpLFxuICAgICAgUkVBQ1RfQ09OU1VNRVJfVFlQRSA9IFN5bWJvbC5mb3IoXCJyZWFjdC5jb25zdW1lclwiKSxcbiAgICAgIFJFQUNUX0NPTlRFWFRfVFlQRSA9IFN5bWJvbC5mb3IoXCJyZWFjdC5jb250ZXh0XCIpLFxuICAgICAgUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRSA9IFN5bWJvbC5mb3IoXCJyZWFjdC5mb3J3YXJkX3JlZlwiKSxcbiAgICAgIFJFQUNUX1NVU1BFTlNFX1RZUEUgPSBTeW1ib2wuZm9yKFwicmVhY3Quc3VzcGVuc2VcIiksXG4gICAgICBSRUFDVF9TVVNQRU5TRV9MSVNUX1RZUEUgPSBTeW1ib2wuZm9yKFwicmVhY3Quc3VzcGVuc2VfbGlzdFwiKSxcbiAgICAgIFJFQUNUX01FTU9fVFlQRSA9IFN5bWJvbC5mb3IoXCJyZWFjdC5tZW1vXCIpLFxuICAgICAgUkVBQ1RfTEFaWV9UWVBFID0gU3ltYm9sLmZvcihcInJlYWN0LmxhenlcIiksXG4gICAgICBSRUFDVF9BQ1RJVklUWV9UWVBFID0gU3ltYm9sLmZvcihcInJlYWN0LmFjdGl2aXR5XCIpLFxuICAgICAgUkVBQ1RfQ0xJRU5UX1JFRkVSRU5DRSA9IFN5bWJvbC5mb3IoXCJyZWFjdC5jbGllbnQucmVmZXJlbmNlXCIpLFxuICAgICAgUmVhY3RTaGFyZWRJbnRlcm5hbHMgPVxuICAgICAgICBSZWFjdC5fX0NMSUVOVF9JTlRFUk5BTFNfRE9fTk9UX1VTRV9PUl9XQVJOX1VTRVJTX1RIRVlfQ0FOTk9UX1VQR1JBREUsXG4gICAgICBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHksXG4gICAgICBpc0FycmF5SW1wbCA9IEFycmF5LmlzQXJyYXksXG4gICAgICBjcmVhdGVUYXNrID0gY29uc29sZS5jcmVhdGVUYXNrXG4gICAgICAgID8gY29uc29sZS5jcmVhdGVUYXNrXG4gICAgICAgIDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgfTtcbiAgICBSZWFjdCA9IHtcbiAgICAgIHJlYWN0X3N0YWNrX2JvdHRvbV9mcmFtZTogZnVuY3Rpb24gKGNhbGxTdGFja0ZvckVycm9yKSB7XG4gICAgICAgIHJldHVybiBjYWxsU3RhY2tGb3JFcnJvcigpO1xuICAgICAgfVxuICAgIH07XG4gICAgdmFyIHNwZWNpYWxQcm9wS2V5V2FybmluZ1Nob3duO1xuICAgIHZhciBkaWRXYXJuQWJvdXRFbGVtZW50UmVmID0ge307XG4gICAgdmFyIHVua25vd25Pd25lckRlYnVnU3RhY2sgPSBSZWFjdC5yZWFjdF9zdGFja19ib3R0b21fZnJhbWUuYmluZChcbiAgICAgIFJlYWN0LFxuICAgICAgVW5rbm93bk93bmVyXG4gICAgKSgpO1xuICAgIHZhciB1bmtub3duT3duZXJEZWJ1Z1Rhc2sgPSBjcmVhdGVUYXNrKGdldFRhc2tOYW1lKFVua25vd25Pd25lcikpO1xuICAgIHZhciBkaWRXYXJuQWJvdXRLZXlTcHJlYWQgPSB7fTtcbiAgICBleHBvcnRzLkZyYWdtZW50ID0gUkVBQ1RfRlJBR01FTlRfVFlQRTtcbiAgICBleHBvcnRzLmpzeCA9IGZ1bmN0aW9uICh0eXBlLCBjb25maWcsIG1heWJlS2V5KSB7XG4gICAgICB2YXIgdHJhY2tBY3R1YWxPd25lciA9XG4gICAgICAgIDFlNCA+IFJlYWN0U2hhcmVkSW50ZXJuYWxzLnJlY2VudGx5Q3JlYXRlZE93bmVyU3RhY2tzKys7XG4gICAgICByZXR1cm4ganN4REVWSW1wbChcbiAgICAgICAgdHlwZSxcbiAgICAgICAgY29uZmlnLFxuICAgICAgICBtYXliZUtleSxcbiAgICAgICAgITEsXG4gICAgICAgIHRyYWNrQWN0dWFsT3duZXJcbiAgICAgICAgICA/IEVycm9yKFwicmVhY3Qtc3RhY2stdG9wLWZyYW1lXCIpXG4gICAgICAgICAgOiB1bmtub3duT3duZXJEZWJ1Z1N0YWNrLFxuICAgICAgICB0cmFja0FjdHVhbE93bmVyID8gY3JlYXRlVGFzayhnZXRUYXNrTmFtZSh0eXBlKSkgOiB1bmtub3duT3duZXJEZWJ1Z1Rhc2tcbiAgICAgICk7XG4gICAgfTtcbiAgICBleHBvcnRzLmpzeHMgPSBmdW5jdGlvbiAodHlwZSwgY29uZmlnLCBtYXliZUtleSkge1xuICAgICAgdmFyIHRyYWNrQWN0dWFsT3duZXIgPVxuICAgICAgICAxZTQgPiBSZWFjdFNoYXJlZEludGVybmFscy5yZWNlbnRseUNyZWF0ZWRPd25lclN0YWNrcysrO1xuICAgICAgcmV0dXJuIGpzeERFVkltcGwoXG4gICAgICAgIHR5cGUsXG4gICAgICAgIGNvbmZpZyxcbiAgICAgICAgbWF5YmVLZXksXG4gICAgICAgICEwLFxuICAgICAgICB0cmFja0FjdHVhbE93bmVyXG4gICAgICAgICAgPyBFcnJvcihcInJlYWN0LXN0YWNrLXRvcC1mcmFtZVwiKVxuICAgICAgICAgIDogdW5rbm93bk93bmVyRGVidWdTdGFjayxcbiAgICAgICAgdHJhY2tBY3R1YWxPd25lciA/IGNyZWF0ZVRhc2soZ2V0VGFza05hbWUodHlwZSkpIDogdW5rbm93bk93bmVyRGVidWdUYXNrXG4gICAgICApO1xuICAgIH07XG4gIH0pKCk7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJykge1xuICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vY2pzL3JlYWN0LWpzeC1ydW50aW1lLnByb2R1Y3Rpb24uanMnKTtcbn0gZWxzZSB7XG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9janMvcmVhY3QtanN4LXJ1bnRpbWUuZGV2ZWxvcG1lbnQuanMnKTtcbn1cbiIsICIvLyBDbGllbnQtc2lkZSByb3V0ZXIgKFJlYWN0IGNvbnRleHQgKyBIaXN0b3J5IEFQSSkuIEhhc2ggbW9kZSBpcyB1c2VkIG9ubHkgYnkgdGhlIHNpbmdsZS1maWxlIHByZXZpZXcuXG4vLyBQdWJsaWMgVVJMcyBhbHdheXMgZW5kIHdpdGggYSB0cmFpbGluZyBzbGFzaCAoXCIvYWJvdXQtdXMvXCIpIHRvIG1hdGNoIHRoZSBwcmVyZW5kZXJlZCBmb2xkZXIgc3RydWN0dXJlLFxuLy8gc28gZXZlcnkgcGFnZSBoYXMgYSByZWFsLCBjcmF3bGFibGUgVVJMLiBBUEk6IDxSb3V0ZXI+LCA8TGluaz4sIHVzZVJvdXRlcigpIFx1MjE5MiB7IHBhdGgsIG5hdmlnYXRlIH0uXG5pbXBvcnQgeyBjcmVhdGVDb250ZXh0LCB1c2VDYWxsYmFjaywgdXNlQ29udGV4dCwgdXNlRWZmZWN0LCB1c2VNZW1vLCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFJPVVRFUl9NT0RFIH0gZnJvbSAnLi9jb25maWcvZW52LmpzJztcblxuY29uc3QgTU9ERSA9IFJPVVRFUl9NT0RFO1xuY29uc3QgUm91dGVyQ29udGV4dCA9IGNyZWF0ZUNvbnRleHQoeyBwYXRoOiAnLycsIG5hdmlnYXRlOiAoKSA9PiB7fSB9KTtcblxuLyoqIFwiL2Fib3V0LXVzL1wiIC0+IFwiL2Fib3V0LXVzXCIsIFwiL1wiIC0+IFwiL1wiICovXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplKHAgPSAnLycpIHtcbiAgbGV0IHBhdGggPSBwLnNwbGl0KCc/JylbMF0uc3BsaXQoJyMnKVswXSB8fCAnLyc7XG4gIGlmICghcGF0aC5zdGFydHNXaXRoKCcvJykpIHBhdGggPSAnLycgKyBwYXRoO1xuICBpZiAocGF0aC5sZW5ndGggPiAxKSBwYXRoID0gcGF0aC5yZXBsYWNlKC9cXC8rJC8sICcnKTtcbiAgcmV0dXJuIHBhdGggfHwgJy8nO1xufVxuXG4vKiogQ2Fub25pY2FsIHB1YmxpYyBocmVmIGZvciBhbiBpbnRlcm5hbCBwYXRoLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRvSHJlZih0bykge1xuICBjb25zdCBbYmFzZSwgaGFzaF0gPSB0by5zcGxpdCgnIycpO1xuICBjb25zdCBuID0gbm9ybWFsaXplKGJhc2UpO1xuICBjb25zdCBwcmV0dHkgPSBuID09PSAnLycgPyAnLycgOiBuICsgJy8nO1xuICBpZiAoTU9ERSA9PT0gJ2hhc2gnKSByZXR1cm4gJyMnICsgcHJldHR5ICsgKGhhc2ggPyAnP3M9JyArIGhhc2ggOiAnJyk7XG4gIHJldHVybiBwcmV0dHkgKyAoaGFzaCA/ICcjJyArIGhhc2ggOiAnJyk7XG59XG5cbmZ1bmN0aW9uIHJlYWRMb2NhdGlvbigpIHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSByZXR1cm4gJy8nO1xuICBpZiAoTU9ERSA9PT0gJ2hhc2gnKSB7XG4gICAgY29uc3QgaCA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoLnNsaWNlKDEpIHx8ICcvJztcbiAgICByZXR1cm4gbm9ybWFsaXplKGguc3BsaXQoJz8nKVswXSk7XG4gIH1cbiAgcmV0dXJuIG5vcm1hbGl6ZSh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUpO1xufVxuXG5mdW5jdGlvbiByZWFkQW5jaG9yKCkge1xuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcpIHJldHVybiAnJztcbiAgaWYgKE1PREUgPT09ICdoYXNoJykge1xuICAgIGNvbnN0IG0gPSB3aW5kb3cubG9jYXRpb24uaGFzaC5tYXRjaCgvXFw/cz0oW1xcdy1dKykvKTtcbiAgICByZXR1cm4gbSA/IG1bMV0gOiAnJztcbiAgfVxuICByZXR1cm4gd2luZG93LmxvY2F0aW9uLmhhc2guc2xpY2UoMSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBSb3V0ZXIoeyBpbml0aWFsUGF0aCA9ICcvJywgY2hpbGRyZW4gfSkge1xuICBjb25zdCBbcGF0aCwgc2V0UGF0aF0gPSB1c2VTdGF0ZSgoKSA9PiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgPyBub3JtYWxpemUoaW5pdGlhbFBhdGgpIDogcmVhZExvY2F0aW9uKCkpKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IG9uQ2hhbmdlID0gKCkgPT4gc2V0UGF0aChyZWFkTG9jYXRpb24oKSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoTU9ERSA9PT0gJ2hhc2gnID8gJ2hhc2hjaGFuZ2UnIDogJ3BvcHN0YXRlJywgb25DaGFuZ2UpO1xuICAgIHJldHVybiAoKSA9PiB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihNT0RFID09PSAnaGFzaCcgPyAnaGFzaGNoYW5nZScgOiAncG9wc3RhdGUnLCBvbkNoYW5nZSk7XG4gIH0sIFtdKTtcblxuICBjb25zdCBuYXZpZ2F0ZSA9IHVzZUNhbGxiYWNrKCh0bykgPT4ge1xuICAgIGNvbnN0IGhyZWYgPSB0b0hyZWYodG8pO1xuICAgIGlmIChNT0RFID09PSAnaGFzaCcpIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gaHJlZi5zbGljZSgxKTtcbiAgICBlbHNlIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSh7fSwgJycsIGhyZWYpO1xuICAgIHNldFBhdGgocmVhZExvY2F0aW9uKCkpO1xuICAgIGNvbnN0IGFuY2hvciA9IHRvLnNwbGl0KCcjJylbMV07XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIGNvbnN0IGVsID0gYW5jaG9yICYmIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGFuY2hvcik7XG4gICAgICBpZiAoZWwpIGVsLnNjcm9sbEludG9WaWV3KHsgYmVoYXZpb3I6ICdzbW9vdGgnLCBibG9jazogJ3N0YXJ0JyB9KTtcbiAgICAgIGVsc2Ugd2luZG93LnNjcm9sbFRvKHsgdG9wOiAwLCBiZWhhdmlvcjogJ2luc3RhbnQnIGluIHdpbmRvdyA/ICdpbnN0YW50JyA6ICdhdXRvJyB9KTtcbiAgICB9KTtcbiAgfSwgW10pO1xuXG4gIC8vIFNjcm9sbCB0byBhbiBhbmNob3Igb24gZmlyc3QgbG9hZCAoZS5nLiAvZWFybi8jY291bnRyaWVzKVxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGEgPSByZWFkQW5jaG9yKCk7XG4gICAgaWYgKGEpIHNldFRpbWVvdXQoKCkgPT4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYSk/LnNjcm9sbEludG9WaWV3KHsgYmVoYXZpb3I6ICdzbW9vdGgnIH0pLCAzMDApO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgdmFsdWUgPSB1c2VNZW1vKCgpID0+ICh7IHBhdGgsIG5hdmlnYXRlIH0pLCBbcGF0aCwgbmF2aWdhdGVdKTtcbiAgcmV0dXJuIDxSb3V0ZXJDb250ZXh0LlByb3ZpZGVyIHZhbHVlPXt2YWx1ZX0+e2NoaWxkcmVufTwvUm91dGVyQ29udGV4dC5Qcm92aWRlcj47XG59XG5cbmV4cG9ydCBjb25zdCB1c2VSb3V0ZXIgPSAoKSA9PiB1c2VDb250ZXh0KFJvdXRlckNvbnRleHQpO1xuXG4vKiogQ3VycmVudCByb3V0ZSBwYXRoIGluIHRoZSBicm93c2VyICh3b3JrcyBpbiBoaXN0b3J5IGFuZCBoYXNoIG1vZGUpLiAqL1xuZXhwb3J0IGNvbnN0IGN1cnJlbnRQYXRoID0gcmVhZExvY2F0aW9uO1xuLyoqIEN1cnJlbnQgaW4tcGFnZSBhbmNob3IgKFwiL2pvaW4vI2hjcFwiIG9yIFwiIy9qb2luLz9zPWhjcFwiIFx1MjE5MiBcImhjcFwiKS4gKi9cbmV4cG9ydCBjb25zdCBjdXJyZW50QW5jaG9yID0gcmVhZEFuY2hvcjtcblxuZXhwb3J0IGZ1bmN0aW9uIExpbmsoeyB0bywgY2hpbGRyZW4sIG9uQ2xpY2ssIGNsYXNzTmFtZSwgLi4ucmVzdCB9KSB7XG4gIGNvbnN0IHsgbmF2aWdhdGUsIHBhdGggfSA9IHVzZVJvdXRlcigpO1xuICBjb25zdCBpc0V4dGVybmFsID0gL14oaHR0cHM/OnxtYWlsdG86fHRlbDopLy50ZXN0KHRvKTtcbiAgaWYgKGlzRXh0ZXJuYWwpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGEgaHJlZj17dG99IGNsYXNzTmFtZT17Y2xhc3NOYW1lfSB0YXJnZXQ9e3RvLnN0YXJ0c1dpdGgoJ2h0dHAnKSA/ICdfYmxhbmsnIDogdW5kZWZpbmVkfSByZWw9e3RvLnN0YXJ0c1dpdGgoJ2h0dHAnKSA/ICdub29wZW5lciBub3JlZmVycmVyJyA6IHVuZGVmaW5lZH0gey4uLnJlc3R9PlxuICAgICAgICB7Y2hpbGRyZW59XG4gICAgICA8L2E+XG4gICAgKTtcbiAgfVxuICBjb25zdCBhY3RpdmUgPSBub3JtYWxpemUodG8uc3BsaXQoJyMnKVswXSkgPT09IHBhdGg7XG4gIHJldHVybiAoXG4gICAgPGFcbiAgICAgIGhyZWY9e3RvSHJlZih0byl9XG4gICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZX1cbiAgICAgIGFyaWEtY3VycmVudD17YWN0aXZlID8gJ3BhZ2UnIDogdW5kZWZpbmVkfVxuICAgICAgb25DbGljaz17KGUpID0+IHtcbiAgICAgICAgb25DbGljaz8uKGUpO1xuICAgICAgICBpZiAoZS5kZWZhdWx0UHJldmVudGVkIHx8IGUuYnV0dG9uICE9PSAwIHx8IGUubWV0YUtleSB8fCBlLmN0cmxLZXkgfHwgZS5zaGlmdEtleSB8fCBlLmFsdEtleSkgcmV0dXJuO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIG5hdmlnYXRlKHRvKTtcbiAgICAgIH19XG4gICAgICB7Li4ucmVzdH1cbiAgICA+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9hPlxuICApO1xufVxuIiwgIi8vIExpZ2h0d2VpZ2h0IGlubGluZSBpY29uIHNldCAoMjRcdTAwRDcyNCwgc3Ryb2tlLWJhc2VkKS4gTm8gaWNvbiBsaWJyYXJ5IGRlcGVuZGVuY3kuXG5jb25zdCBQID0ge1xuICBhcnJvdzogJ001IDEyaDE0TTEzIDZsNiA2LTYgNicsXG4gIGFycm93TGVmdDogJ00xOSAxMkg1TTExIDZsLTYgNiA2IDYnLFxuICBjaGVjazogJ00yMCA2IDkgMTdsLTUtNScsXG4gIHg6ICdNMTggNiA2IDE4TTYgNmwxMiAxMicsXG4gIG1lbnU6ICdNNCA3aDE2TTQgMTJoMTZNNCAxN2gxNicsXG4gIHBsdXM6ICdNMTIgNXYxNE01IDEyaDE0JyxcbiAgbWludXM6ICdNNSAxMmgxNCcsXG4gIHN0YXI6ICdtMTIgMi44IDIuOCA1LjggNi4zLjktNC42IDQuNCAxLjEgNi4zTDEyIDE3LjJsLTUuNiAzIDEuMS02LjNMMi45IDkuNWw2LjMtLjl6JyxcbiAgaGVhcnQ6ICdNMjAuOCA1LjZhNS41IDUuNSAwIDAgMC03LjggMEwxMiA2LjdsLTEtMS4xYTUuNSA1LjUgMCAwIDAtNy44IDcuOGwxIDEuMUwxMiAyMmw3LjgtNy41IDEtMS4xYTUuNSA1LjUgMCAwIDAgMC03Ljh6JyxcbiAgcHVsc2U6ICdNMyAxMmg0bDItNSA0IDEwIDItNWg2JyxcbiAgc3RldGhvc2NvcGU6ICdNNiAzdjZhNCA0IDAgMCAwIDggMFYzTTQgM2g0TTEyIDNoNE0xMCAxM3YyYTUgNSAwIDAgMCAxMCAwdi0yTTIwIDEzYTIgMiAwIDEgMCAwLTQgMiAyIDAgMCAwIDAgNHonLFxuICBudXJzZTogJ00xMiAyIDQgNXY2YzAgNSAzLjUgOC41IDggMTEgNC41LTIuNSA4LTYgOC0xMVY1ek0xMiA4djZNOSAxMWg2JyxcbiAgcGlsbDogJ00xMC41IDIwLjVhNSA1IDAgMCAxLTctN2w3LTdhNSA1IDAgMCAxIDcgN3pNOC41IDguNWw3IDcnLFxuICB0b290aDogJ003IDNjLTIgMC0zLjUgMS42LTMuNSA0IDAgMyAxLjUgNCAyIDdzMSA3IDIuNSA3IDEuNS00IDItNiAxLTIgMi0yIDEuNSAwIDIgMiAuNSA2IDIgNiAyLTQgMi41LTcgMi00IDItN2MwLTIuNC0xLjUtNC0zLjUtNC0xLjcgMC0zIDEtNSAxUzguNyAzIDcgM3onLFxuICBtaWNyb3Njb3BlOiAnTTYgMThoOE0zIDIyaDE4TTE0IDIyYTcgNyAwIDEgMCAwLTE0aC0xTTkgMTRoMk05IDEyYTIgMiAwIDAgMS0yLTJWNmg2djRhMiAyIDAgMCAxLTIgMnpNMTIgNlYzYTEgMSAwIDAgMC0xLTFIOWExIDEgMCAwIDAtMSAxdjMnLFxuICBoYW5kczogJ00xMSAxNGgyYTIgMiAwIDEgMCAwLTRoLTNjLS42IDAtMS4xLjItMS40LjZMMyAxNk03IDIwbDEuNi0xLjRjLjMtLjQuOC0uNiAxLjQtLjZoNGMxLjEgMCAyLjEtLjQgMi44LTEuMmw0LjYtNC40YTIgMiAwIDAgMC0yLjgtMi44TDE0LjQgMTRNMiAxNWw2IDYnLFxuICBicmllZmNhc2U6ICdNMyA3aDE4djEzSDN6TTE2IDdWNWEyIDIgMCAwIDAtMi0yaC00YTIgMiAwIDAgMC0yIDJ2Mk0zIDEzaDE4JyxcbiAgbW9uaXRvcjogJ00zIDRoMTh2MTJIM3pNOCAyMGg4TTEyIDE2djQnLFxuICBhbWJ1bGFuY2U6ICdNMTAgMTBINk04IDh2NE0xNSAxOEg5TTE5IDE4aDJ2LTRsLTMtNGgtM1Y2SDJ2MTJoMk02LjUgMjAuNWEyIDIgMCAxIDAgMC00IDIgMiAwIDAgMCAwIDR6TTE3LjUgMjAuNWEyIDIgMCAxIDAgMC00IDIgMiAwIDAgMCAwIDR6JyxcbiAgc2NhbHBlbDogJ00zIDIxIDE0IDEwTTE0IDEwbDMtM2MxLjUtMS41IDQgMSAyLjUgMi41TDE2IDEzeicsXG4gIHVzZXJzOiAnTTE2IDIxdi0yYTQgNCAwIDAgMC00LTRINmE0IDQgMCAwIDAtNCA0djJNOSAxMWE0IDQgMCAxIDAgMC04IDQgNCAwIDAgMCAwIDh6TTIyIDIxdi0yYTQgNCAwIDAgMC0zLTMuOU0xNiAzLjFhNCA0IDAgMCAxIDAgNy44JyxcbiAgdXNlcjogJ00yMCAyMXYtMmE0IDQgMCAwIDAtNC00SDhhNCA0IDAgMCAwLTQgNHYyTTEyIDExYTQgNCAwIDEgMCAwLTggNCA0IDAgMCAwIDAgOHonLFxuICBob21lOiAnTTMgMTAuNSAxMiAzbDkgNy41VjIxaC02di02SDl2NkgzeicsXG4gIHBob25lOiAnTTcgMmgxMGExIDEgMCAwIDEgMSAxdjE4YTEgMSAwIDAgMS0xIDFIN2ExIDEgMCAwIDEtMS0xVjNhMSAxIDAgMCAxIDEtMXpNMTEgMThoMicsXG4gIGNhbGw6ICdNMjIgMTYuOXYzYTIgMiAwIDAgMS0yLjIgMiAxOS44IDE5LjggMCAwIDEtOC42LTMuMSAxOS41IDE5LjUgMCAwIDEtNi02QTE5LjggMTkuOCAwIDAgMSAyLjEgNC4yIDIgMiAwIDAgMSA0LjEgMmgzYTIgMiAwIDAgMSAyIDEuN2MuMS45LjQgMS44LjcgMi43YTIgMiAwIDAgMS0uNSAyLjFMOCA5LjhhMTYgMTYgMCAwIDAgNiA2bDEuMy0xLjNhMiAyIDAgMCAxIDIuMS0uNGMuOS4zIDEuOC42IDIuNy43YTIgMiAwIDAgMSAxLjcgMnonLFxuICBtYWlsOiAnTTMgNWgxOHYxNEgzek0zIDZsOSA3IDktNycsXG4gIHdhbGxldDogJ00yMCA3SDVhMiAyIDAgMCAxIDAtNGgxM3Y0TTMgNXYxNGEyIDIgMCAwIDAgMiAyaDE1VjdNMTYgMTRoLjAxJyxcbiAgY2FyOiAnTTUgMTdoMTRNNSAxN2EyIDIgMCAxIDAgNCAwTTE1IDE3YTIgMiAwIDEgMCA0IDBNMyAxN3YtNWwyLTVoMTRsMiA1djUnLFxuICBiYWc6ICdNNiA3aDEybDEgMTRINXpNOSA3VjVhMyAzIDAgMCAxIDYgMHYyJyxcbiAgc3BhcmtsZTogJ00xMiAzbDEuOCA1LjJMMTkgMTBsLTUuMiAxLjhMMTIgMTdsLTEuOC01LjJMNSAxMGw1LjItMS44ek0xOSAxN2wuOCAyLjJMMjIgMjBsLTIuMi44TDE5IDIzbC0uOC0yLjJMMTYgMjBsMi4yLS44eicsXG4gIHNoaWVsZDogJ00xMiAyIDQgNXY2YzAgNS41IDMuNCA5LjcgOCAxMSA0LjYtMS4zIDgtNS41IDgtMTFWNXonLFxuICBzaGllbGRDaGVjazogJ00xMiAyIDQgNXY2YzAgNS41IDMuNCA5LjcgOCAxMSA0LjYtMS4zIDgtNS41IDgtMTFWNXpNOSAxMmwyIDIgNC00JyxcbiAgbG9jazogJ001IDExaDE0djEwSDV6TTggMTFWN2E0IDQgMCAwIDEgOCAwdjQnLFxuICBrZXk6ICdNMTUgN2E0IDQgMCAxIDEtMy41IDZMNSAxOS41VjIySDJ2LTNsNi41LTYuNUE0IDQgMCAwIDEgMTUgN3pNMTYgOWguMDEnLFxuICBnbG9iZTogJ00xMiAyMmExMCAxMCAwIDEgMCAwLTIwIDEwIDEwIDAgMCAwIDAgMjB6TTIgMTJoMjBNMTIgMmExNSAxNSAwIDAgMSAwIDIwTTEyIDJhMTUgMTUgMCAwIDAgMCAyMCcsXG4gIHBpbjogJ00xMiAyMnM3LTYgNy0xMmE3IDcgMCAwIDAtMTQgMGMwIDYgNyAxMiA3IDEyek0xMiAxMmEyIDIgMCAxIDAgMC00IDIgMiAwIDAgMCAwIDR6JyxcbiAgY2xvY2s6ICdNMTIgMjJhMTAgMTAgMCAxIDAgMC0yMCAxMCAxMCAwIDAgMCAwIDIwek0xMiA2djZsNCAyJyxcbiAgY2FrZTogJ000IDIxaDE2di04SDR6TTQgMTZjMiAxIDQgMSA2LTEgMiAyIDQgMiA2IDAgMS41IDEgMyAxIDQgMU0xMiAxM1Y5TTEyIDZhMSAxIDAgMCAwIDEtMWMwLTEtMS0yLTEtMnMtMSAxLTEgMmExIDEgMCAwIDAgMSAxeicsXG4gIGJvdDogJ001IDhoMTR2MTJINXpNMTIgNHY0TTkgMTRoLjAxTTE1IDE0aC4wMU0yIDEzdjNNMjIgMTN2MycsXG4gIGNvcHk6ICdNOSA5aDEydjEySDl6TTUgMTVIM1YzaDEydjInLFxuICBjb29raWU6ICdNMTIgMmExMCAxMCAwIDEgMCAxMCAxMCA0IDQgMCAwIDEtNS01IDQgNCAwIDAgMS01LTV6TTguNSA4LjVoLjAxTTE2IDE1LjVoLjAxTTEyIDEyaC4wMU0xMSAxN2guMDFNNyAxNGguMDEnLFxuICBmaW5nZXJwcmludDogJ00xMiAxMXY0TTggMTNjMC0yLjIgMS44LTQgNC00czQgMS44IDQgNGMwIDMtMSA1LTIgN002IDExYTYgNiAwIDAgMSAxMiAwYzAgNC0xIDctMyAxME00IDEwYTggOCAwIDAgMSAxNiAwTTkgMjFjMS0yIDEtNCAxLTYnLFxuICBvbmlvbjogJ00xMiAyYzAgMy02IDYtNiAxMmE2IDYgMCAwIDAgMTIgMGMwLTYtNi05LTYtMTJ6TTEyIDhjMCAyLTMgNC0zIDdhMyAzIDAgMCAwIDYgMGMwLTMtMy01LTMtN3onLFxuICBsaW5rOiAnTTEwIDEzYTUgNSAwIDAgMCA3LjUuNWwzLTNhNSA1IDAgMCAwLTctN2wtMS43IDEuN00xNCAxMWE1IDUgMCAwIDAtNy41LS41bC0zIDNhNSA1IDAgMCAwIDcgN2wxLjctMS43JyxcbiAgZ2F0ZTogJ00zIDIxVjVsOS0zIDkgM3YxNk0zIDIxaDE4TTkgMjF2LThoNnY4JyxcbiAgZmlsdGVyOiAnTTMgNGgxOGwtNyA4LjVWMjBsLTQtMnYtNS41eicsXG4gIGxpc3Q6ICdNOCA2aDEzTTggMTJoMTNNOCAxOGgxM00zIDZoLjAxTTMgMTJoLjAxTTMgMThoLjAxJyxcbiAgZmlzaDogJ002LjUgMTJjMy01IDktNiAxNCAwLTUgNi0xMSA1LTE0IDB6TTYuNSAxMiAyIDh2OHpNMTYgMTFoLjAxJyxcbiAgcGVuOiAnTTEyIDIwaDlNMTYuNSAzLjVhMi4xIDIuMSAwIDAgMSAzIDNMNyAxOWwtNCAxIDEtNHonLFxuICAnbWFpbC1jaGVjayc6ICdNMjIgMTNWNUgydjE0aDEwTTIgNmwxMCA3IDEwLTdNMTYgMTlsMiAyIDQtNCcsXG4gIGRhdGFiYXNlOiAnTTEyIDhjNSAwIDktMS4zIDktM3MtNC0zLTktMy05IDEuMy05IDMgNCAzIDkgM3pNMyA1djE0YzAgMS43IDQgMyA5IDNzOS0xLjMgOS0zVjVNMyAxMmMwIDEuNyA0IDMgOSAzczktMS4zIDktMycsXG4gIGF1ZGl0OiAnTTkgNUg3YTIgMiAwIDAgMC0yIDJ2MTNhMiAyIDAgMCAwIDIgMmgxMGEyIDIgMCAwIDAgMi0yVjdhMiAyIDAgMCAwLTItMmgtMk05IDNoNnY0SDl6TTkgMTRsMiAyIDQtNCcsXG4gIGxpbmtlZGluOiAnTTE2IDhhNiA2IDAgMCAxIDYgNnY3aC00di03YTIgMiAwIDAgMC00IDB2N2gtNHYtN2E2IDYgMCAwIDEgNi02ek0yIDloNHYxMkgyek00IDZhMiAyIDAgMSAwIDAtNCAyIDIgMCAwIDAgMCA0eicsXG4gIGZhY2Vib29rOiAnTTE4IDJoLTNhNSA1IDAgMCAwLTUgNXYzSDd2NGgzdjhoNHYtOGgzbDEtNGgtNFY3YTEgMSAwIDAgMSAxLTFoM3onLFxuICB5b3V0dWJlOiAnTTIuNSAxN2EyNCAyNCAwIDAgMSAwLTEwIDIgMiAwIDAgMSAxLjQtMS40IDQ5LjYgNDkuNiAwIDAgMSAxNi4yIDBBMiAyIDAgMCAxIDIxLjUgN2EyNCAyNCAwIDAgMSAwIDEwIDIgMiAwIDAgMS0xLjQgMS40IDQ5LjYgNDkuNiAwIDAgMS0xNi4yIDBBMiAyIDAgMCAxIDIuNSAxN00xMCAxNWw1LTMtNS0zeicsXG4gIGluc3RhZ3JhbTogJ00yIDZhNCA0IDAgMCAxIDQtNGgxMmE0IDQgMCAwIDEgNCA0djEyYTQgNCAwIDAgMS00IDRINmE0IDQgMCAwIDEtNC00ek0xNiAxMS40QTQgNCAwIDEgMSAxMi42IDggNCA0IDAgMCAxIDE2IDExLjR6TTE3LjUgNi41aC4wMScsXG4gIHdoYXRzYXBwOiAnTTMgMjFsMS43LTVBOSA5IDAgMSAxIDggMTkuNHpNOSA5YzAgMyAyLjUgNiA2IDZsMS0xLjUtMi0xLTEgMWMtMSAwLTMtMi0zLTNsMS0xLTEtMnonLFxuICBjaGF0OiAnTTIxIDE1YTIgMiAwIDAgMS0yIDJIN2wtNCA0VjVhMiAyIDAgMCAxIDItMmgxNGEyIDIgMCAwIDEgMiAyeicsXG4gIHNlbmQ6ICdNMjIgMiAxMSAxM00yMiAybC03IDIwLTQtOS05LTR6JyxcbiAgZ2lmdDogJ00zIDhoMTh2NEgzek01IDEydjloMTR2LTlNMTIgOHYxM00xMiA4UzEwIDMgNy41IDNhMi41IDIuNSAwIDAgMCAwIDVNMTIgOHMyLTUgNC41LTVhMi41IDIuNSAwIDAgMSAwIDUnLFxuICBjb2luczogJ005IDE0YTYgMyAwIDEgMCAwLS4xTTMgMTF2NmMwIDEuNyAyLjcgMyA2IDNzNi0xLjMgNi0zdi02TTkgOGE2IDMgMCAxIDAgMC0uMU0xNSA2YTYgMyAwIDEgMSA2IDNNMjEgOXY2YzAgMS40LTEuOCAyLjUtNC40IDIuOScsXG4gIGJhbms6ICdNMyAyMWgxOE01IDIxVjEwTTE5IDIxVjEwTTkgMjFWMTBNMTUgMjFWMTBNMTIgMyAzIDhoMTh6JyxcbiAgY2FyZDogJ00yIDVoMjB2MTRIMnpNMiAxMGgyME02IDE1aDQnLFxuICBiZWxsOiAnTTYgOGE2IDYgMCAwIDEgMTIgMGMwIDcgMyA5IDMgOUgzczMtMiAzLTlNMTAuMyAyMWExLjkgMS45IDAgMCAwIDMuNCAwJyxcbiAgc21zOiAnTTIxIDE1YTIgMiAwIDAgMS0yIDJIN2wtNCA0VjVhMiAyIDAgMCAxIDItMmgxNGEyIDIgMCAwIDEgMiAyek04IDEwaC4wMU0xMiAxMGguMDFNMTYgMTBoLjAxJyxcbiAgZGFzaGJvYXJkOiAnTTMgM2g3djlIM3pNMTQgM2g3djVoLTd6TTE0IDEyaDd2OWgtN3pNMyAxNmg3djVIM3onLFxuICBjaGFydDogJ00zIDN2MThoMThNNyAxNWw0LTQgMyAzIDYtNycsXG4gIHNlYXJjaDogJ00xMSAxOWE4IDggMCAxIDAgMC0xNiA4IDggMCAwIDAgMCAxNnpNMjEgMjFsLTQuMy00LjMnLFxuICBjbGlwYm9hcmQ6ICdNOSA0aDZ2M0g5ek04IDVINmEyIDIgMCAwIDAtMiAydjEzYTIgMiAwIDAgMCAyIDJoMTJhMiAyIDAgMCAwIDItMlY3YTIgMiAwIDAgMC0yLTJoLTJNOCAxMmg4TTggMTZoNScsXG4gIGZsYXNrOiAnTTkgM2g2TTEwIDN2Nkw0IDE5YTIgMiAwIDAgMCAxLjcgM2gxMi42YTIgMiAwIDAgMCAxLjctM0wxNCA5VjNNNyAxNWgxMCcsXG4gIGJ1aWxkaW5nOiAnTTQgMjJWNGEyIDIgMCAwIDEgMi0yaDhhMiAyIDAgMCAxIDIgMnYxOE0xNiA5aDJhMiAyIDAgMCAxIDIgMnYxMU0yIDIyaDIwTTggNmg0TTggMTBoNE04IDE0aDRNOCAxOGg0JyxcbiAgZGljZTogJ000IDRoMTZ2MTZINHpNOCA4aC4wMU0xNiA4aC4wMU0xMiAxMmguMDFNOCAxNmguMDFNMTYgMTZoLjAxJyxcbiAgc3R1ZGVudDogJ00yMiAxMCAxMiA1IDIgMTBsMTAgNXpNNiAxMnY1YzMgMiA5IDIgMTIgMHYtNU0yMiAxMHY2JyxcbiAgbWljOiAnTTEyIDJhMyAzIDAgMCAwLTMgM3Y3YTMgMyAwIDAgMCA2IDBWNWEzIDMgMCAwIDAtMy0zek0xOSAxMHYyYTcgNyAwIDAgMS0xNCAwdi0yTTEyIDE5djMnLFxuICBib2x0OiAnTTEzIDIgMyAxNGg5bC0xIDggMTAtMTJoLTl6JyxcbiAgY2FsY3VsYXRvcjogJ001IDJoMTR2MjBINXpNOCA2aDh2NEg4ek04IDE0aC4wMU0xMiAxNGguMDFNMTYgMTRoLjAxTTggMThoLjAxTTEyIDE4aC4wMU0xNiAxOGguMDEnLFxuICBwYXlwYWw6ICdNNyAyMWwxLjItNy41aDMuM2M0IDAgNi41LTIgNy01LjguNC0zLTEuNS00LjctNC43LTQuN0g4TDUgMjF6TTkuNSAxMy41bDEuNC04LjQnLFxuICB1cGk6ICdNOCA0bC00IDE2TTEyIDRsLTQgMTZNMTUgNmw1IDYtNSA2JyxcbiAgY2FsZW5kYXI6ICdNMyA1aDE4djE2SDN6TTE2IDN2NE04IDN2NE0zIDEwaDE4JyxcbiAgbWFsZTogJ00xMCAyMWE3IDcgMCAxIDAgMC0xNCA3IDcgMCAwIDAgMCAxNHpNMTUgOWw2LTZNMTUgM2g2djYnLFxuICBmZW1hbGU6ICdNMTIgMTVhNiA2IDAgMSAwIDAtMTIgNiA2IDAgMCAwIDAgMTJ6TTEyIDE1djdNOSAxOWg2JyxcbiAgZ2VuZGVyT3RoZXI6ICdNMTIgMTZhNSA1IDAgMSAwIDAtMTAgNSA1IDAgMCAwIDAgMTB6TTEyIDE2djZNOSAxOWg2TTE1LjUgNy41IDIwIDNNMTYgM2g0djQnLFxuICBleWU6ICdNMiAxMnMzLjUtNyAxMC03IDEwIDcgMTAgNy0zLjUgNy0xMCA3UzIgMTIgMiAxMnpNMTIgMTVhMyAzIDAgMSAwIDAtNiAzIDMgMCAwIDAgMCA2eicsXG4gIGV5ZU9mZjogJ00zIDNsMTggMThNMTAuNiAxMC42YTMgMyAwIDAgMCA0LjIgNC4yTTkuOSA0LjJBMTAgMTAgMCAwIDEgMTIgNGM2LjUgMCAxMCA4IDEwIDhhMTcgMTcgMCAwIDEtMi4yIDMuMk02LjYgNi42QTE3IDE3IDAgMCAwIDIgMTJzMy41IDcgMTAgN2E5LjYgOS42IDAgMCAwIDUuNC0xLjYnLFxuICByZWZyZXNoOiAnTTMgMTJhOSA5IDAgMCAxIDE1LTYuN0wyMSA4TTIxIDN2NWgtNU0yMSAxMmE5IDkgMCAwIDEtMTUgNi43TDMgMTZNMyAyMXYtNWg1JyxcbiAgdm9sdW1lOiAnTTExIDUgNiA5SDJ2Nmg0bDUgNHpNMTUuNSA4LjVhNSA1IDAgMCAxIDAgN00xOSA1YTEwIDEwIDAgMCAxIDAgMTQnLFxuICBtdXRlOiAnTTExIDUgNiA5SDJ2Nmg0bDUgNHpNMjIgOWwtNiA2TTE2IDlsNiA2JyxcbiAgcXVvdGU6ICdNMyAyMWMzIDAgNy0xIDctOFY1SDN2N2g0YzAgNC0yIDYtNCA2ek0xNCAyMWMzIDAgNy0xIDctOFY1aC03djdoNGMwIDQtMiA2LTQgNnonLFxuICBleHRlcm5hbDogJ00xNSAzaDZ2Nk0xMCAxNCAyMSAzTTE4IDEzdjZhMiAyIDAgMCAxLTIgMkg1YTIgMiAwIDAgMS0yLTJWOGEyIDIgMCAwIDEgMi0yaDYnLFxuICBpbmZvOiAnTTEyIDIyYTEwIDEwIDAgMSAwIDAtMjAgMTAgMTAgMCAwIDAgMCAyMHpNMTIgMTZ2LTRNMTIgOGguMDEnLFxuICBjb21wYXNzOiAnTTEyIDIyYTEwIDEwIDAgMSAwIDAtMjAgMTAgMTAgMCAwIDAgMCAyMHpNMTYuMiA3LjhsLTIuMSA2LjMtNi4zIDIuMSAyLjEtNi4zeicsXG4gIHRyb3BoeTogJ004IDIxaDhNMTIgMTd2NE03IDRoMTB2NmE1IDUgMCAwIDEtMTAgMHpNMTcgNWgzYTMgMyAwIDAgMS0zIDRNNyA1SDRhMyAzIDAgMCAwIDMgNCcsXG4gIHRyZW5kaW5nOiAnTTIyIDcgMTMuNSAxNS41bC01LTVMMiAxN00xNiA3aDZ2NicsXG4gIGJvb2s6ICdNNCAxOS41QTIuNSAyLjUgMCAwIDEgNi41IDE3SDIwVjNINi41QTIuNSAyLjUgMCAwIDAgNCA1LjV6TTQgMTkuNUEyLjUgMi41IDAgMCAwIDYuNSAyMkgyMHYtNScsXG4gIHNjYWxlOiAnTTEyIDN2MThNNSAyMWgxNE0zIDdoMThNNiA3bC0zIDdhMyAzIDAgMCAwIDYgMHpNMTggN2wtMyA3YTMgMyAwIDAgMCA2IDB6JyxcbiAgdGFyZ2V0OiAnTTEyIDIyYTEwIDEwIDAgMSAwIDAtMjAgMTAgMTAgMCAwIDAgMCAyMHpNMTIgMThhNiA2IDAgMSAwIDAtMTIgNiA2IDAgMCAwIDAgMTJ6TTEyIDE0YTIgMiAwIDEgMCAwLTQgMiAyIDAgMCAwIDAgNHonLFxuICBsYXllcnM6ICdNMTIgMiAyIDdsMTAgNSAxMC01ek0yIDE3bDEwIDUgMTAtNU0yIDEybDEwIDUgMTAtNScsXG4gIGJyYWluOiAnTTkuNSAyQTIuNSAyLjUgMCAwIDAgNyA0LjUgMi41IDIuNSAwIDAgMCA0LjUgNyAzIDMgMCAwIDAgMyAxMmEzIDMgMCAwIDAgMS41IDVBMi41IDIuNSAwIDAgMCA3IDE5LjUgMi41IDIuNSAwIDAgMCA5LjUgMjIgMi41IDIuNSAwIDAgMCAxMiAxOS41di0xNUEyLjUgMi41IDAgMCAwIDkuNSAyek0xNC41IDJBMi41IDIuNSAwIDAgMSAxNyA0LjUgMi41IDIuNSAwIDAgMSAxOS41IDcgMyAzIDAgMCAxIDIxIDEyYTMgMyAwIDAgMS0xLjUgNSAyLjUgMi41IDAgMCAxLTIuNSAyLjUgMi41IDIuNSAwIDAgMS0yLjUgMi41IDIuNSAyLjUgMCAwIDEtMi41LTIuNScsXG4gIGx1bmdzOiAnTTEyIDN2OU0xMiAxMmwtMy0yTTEyIDEybDMtMk04LjUgNi41QzYgNi41IDMgMTEgMyAxN2MwIDIgMSAzIDMgMyAzIDAgNC0yIDQtNVY4LjVhMiAyIDAgMCAwLTEuNS0yek0xNS41IDYuNUMxOCA2LjUgMjEgMTEgMjEgMTdjMCAyLTEgMy0zIDMtMyAwLTQtMi00LTVWOC41YTIgMiAwIDAgMSAxLjUtMnonLFxuICBraWRuZXk6ICdNOSAzQzUgMyAzIDcgMyAxMXMyIDkgNiA5YzMgMCA0LTMgMy02LS42LTEuOC42LTIuNiAyLTNNMTUgM2M0IDAgNiA0IDYgOHMtMiA5LTYgOWMtMS41IDAtMi41LS44LTMtMicsXG4gIGJvbmU6ICdNMTcgMTBjLjctLjcgMS43LS43IDIuNSAwYTEuOCAxLjggMCAwIDAgMC0yLjUgMS44IDEuOCAwIDAgMC0yLjUtMi41IDEuOCAxLjggMCAwIDAtMi41IDBjLS44LjgtLjggMS44IDAgMi41TDcuNSAxNGMtLjctLjgtMS43LS44LTIuNSAwYTEuOCAxLjggMCAwIDAgMCAyLjUgMS44IDEuOCAwIDAgMCAyLjUgMi41IDEuOCAxLjggMCAwIDAgMi41IDBjLjgtLjguOC0xLjggMC0yLjV6JyxcbiAgZWFyOiAnTTYgOC41YTYuNSA2LjUgMCAxIDEgMTMgMGMwIDYtNiA2LTYgMTBhMy41IDMuNSAwIDEgMS03IDBNMTUgOC41YTIuNSAyLjUgMCAwIDAtNSAwdjFhMiAyIDAgMSAxIDAgNCcsXG4gIGJhYnk6ICdNOSAxMmguMDFNMTUgMTJoLjAxTTEwIDE2Yy41LjMgMS4yLjUgMiAuNXMxLjUtLjIgMi0uNU0xOSA2LjNhOSA5IDAgMCAxIDEuOCAzLjkgMiAyIDAgMCAxIDAgMy42IDkgOSAwIDAgMS0xNy42IDAgMiAyIDAgMCAxIDAtMy42QTkgOSAwIDAgMSAxMiAzYzIgMCAzLjUgMS4xIDMuNSAyLjVzLS45IDIuNS0yIDIuNWMtLjggMC0xLjUtLjQtMS41LTEnLFxuICBkcm9wOiAnTTEyIDIuN3MtNi41IDcuMS02LjUgMTEuOGE2LjUgNi41IDAgMCAwIDEzIDBDMTguNSA5LjggMTIgMi43IDEyIDIuN3onLFxuICB2aXJ1czogJ00xMiAxN2E1IDUgMCAxIDAgMC0xMCA1IDUgMCAwIDAgMCAxMHpNMTIgMnY1TTEyIDE3djVNMiAxMmg1TTE3IDEyaDVNNC45IDQuOWwzLjUgMy41TTE1LjYgMTUuNmwzLjUgMy41TTQuOSAxOS4xbDMuNS0zLjVNMTUuNiA4LjRsMy41LTMuNScsXG4gIGRuYTogJ000IDJjMCA2IDE2IDYgMTYgMTJzLTE2IDYtMTYgOE0yMCAyYzAgNi0xNiA2LTE2IDEyczE2IDYgMTYgOE03IDVoMTBNNyAxOWgxME05IDkuNWg2TTkgMTQuNWg2JyxcbiAgc3RvbWFjaDogJ005IDJ2NGMwIDItMiAzLTQgNC41UzIgMTQgMiAxN2E1IDUgMCAwIDAgOSAzYzEuNS0yIDQtMSA2LTFhNSA1IDAgMCAwIDUtNWMwLTMtMi00LjUtNC00LjVzLTMgMS00LjUgMFMxMiA3IDEyIDVWMicsXG4gIGJhbmRhZ2U6ICdNMTguNiA1LjRhMyAzIDAgMCAwLTQuMiAwTDUuNCAxNC40YTMgMyAwIDAgMCA0LjIgNC4ybDktOWEzIDMgMCAwIDAgMC00LjJ6TTEwIDEwaC4wMU0xNCAxNGguMDFNMTIgMTJoLjAxJyxcbiAgc3lyaW5nZTogJ00xOCAybDQgNE0xNyA3bDMtM00xOSA5IDguNyAxOS4zYTIuNCAyLjQgMCAwIDEtMy40IDBsLS42LS42YTIuNCAyLjQgMCAwIDEgMC0zLjRMMTUgNU05IDExbDQgNE01IDE5bC0zIDNNMTQgNGw2IDYnLFxuICB3aGVlbGNoYWlyOiAnTTEyIDRhMSAxIDAgMSAwIDAtMiAxIDEgMCAwIDAgMCAyek0xOSAxOWwtMy02aC01VjdNOCAxMGE2IDYgMCAxIDAgOC41IDcuNU0xMSAxMWg1JyxcbiAgbW9vbjogJ00yMSAxMi44QTkgOSAwIDEgMSAxMS4yIDNhNyA3IDAgMCAwIDkuOCA5Ljh6JyxcbiAgc3VuOiAnTTEyIDE3YTUgNSAwIDEgMCAwLTEwIDUgNSAwIDAgMCAwIDEwek0xMiAxdjJNMTIgMjF2Mk00LjIgNC4ybDEuNCAxLjRNMTguNCAxOC40bDEuNCAxLjRNMSAxMmgyTTIxIDEyaDJNNC4yIDE5LjhsMS40LTEuNE0xOC40IDUuNmwxLjQtMS40JyxcbiAgcGxhbmU6ICdNMjIgMiAxMSAxM00yMiAybC03IDIwLTQtOS05LTR6JyxcbiAgcmliYm9uOiAnTTEyIDJhNSA1IDAgMCAwLTMuNSA4LjZMNCAyMWw0LTEuNUwxMCAyM2wyLTYgMiA2IDItMy41IDQgMS41LTQuNS0xMC40QTUgNSAwIDAgMCAxMiAyeicsXG4gIHRoZXJtbzogJ00xNCAxNC44VjRhMiAyIDAgMCAwLTQgMHYxMC44YTQgNCAwIDEgMCA0IDB6JyxcbiAgYmVkOiAnTTIgNHYxNk0yIDhoMThhMiAyIDAgMCAxIDIgMnYxME0yIDE3aDIwTTYgOHY5JyxcbiAgaG9zcGl0YWw6ICdNMyAyMWgxOE01IDIxVjdsNy00IDcgNHYxNE0xMCA5aDRNMTIgN3Y0TTkgMjF2LTVoNnY1JyxcbiAgc21pbGU6ICdNMTIgMjJhMTAgMTAgMCAxIDAgMC0yMCAxMCAxMCAwIDAgMCAwIDIwek04IDE0czEuNSAyIDQgMiA0LTIgNC0yTTkgOWguMDFNMTUgOWguMDEnLFxuICBhcHBsZTogJ00xMiA2LjVjLTEtMS41LTMtMi00LjUtMS4zQzUgNi4zIDQgOSA0LjYgMTIuNSA1LjQgMTcgOCAyMSAxMCAyMWMxIDAgMS4zLS41IDItLjVzMSAuNSAyIC41YzIgMCA0LjYtNCA1LjQtOC41LjYtMy41LS40LTYuMi0yLjktNy4zLTEuNS0uNy0zLjUtLjItNC41IDEuM3pNMTIgNi41QzEyIDQgMTMuNSAyLjUgMTUgMicsXG4gIHZlbnVzOiAnTTEyIDE1YTYgNiAwIDEgMCAwLTEyIDYgNiAwIDAgMCAwIDEyek0xMiAxNXY3TTkgMTloNicsXG4gIG1hcnM6ICdNMTAgMjBhNiA2IDAgMSAwIDAtMTIgNiA2IDAgMCAwIDAgMTJ6TTE0LjUgOS41IDIxIDNNMTUgM2g2djYnLFxuICByYXJlOiAnTTEyIDJsMi40IDcuNEgyMmwtNi4yIDQuNSAyLjQgNy40TDEyIDE2LjhsLTYuMiA0LjUgMi40LTcuNEwyIDkuNGg3LjZ6Jyxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEljb24oeyBuYW1lLCBzaXplID0gMjAsIHN0cm9rZSA9IDIsIGNsYXNzTmFtZSA9ICcnLCB0aXRsZSwgZmlsbCA9ICdub25lJywgc3R5bGUgfSkge1xuICBjb25zdCBkID0gUFtuYW1lXSB8fCBQLnNwYXJrbGU7XG4gIHJldHVybiAoXG4gICAgPHN2Z1xuICAgICAgY2xhc3NOYW1lPXtgaWNvbiAke2NsYXNzTmFtZX1gfVxuICAgICAgd2lkdGg9e3NpemV9XG4gICAgICBoZWlnaHQ9e3NpemV9XG4gICAgICB2aWV3Qm94PVwiMCAwIDI0IDI0XCJcbiAgICAgIGZpbGw9e2ZpbGx9XG4gICAgICBzdHJva2U9XCJjdXJyZW50Q29sb3JcIlxuICAgICAgc3Ryb2tlV2lkdGg9e3N0cm9rZX1cbiAgICAgIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiXG4gICAgICBzdHJva2VMaW5lam9pbj1cInJvdW5kXCJcbiAgICAgIGFyaWEtaGlkZGVuPXt0aXRsZSA/IHVuZGVmaW5lZCA6ICd0cnVlJ31cbiAgICAgIHJvbGU9e3RpdGxlID8gJ2ltZycgOiB1bmRlZmluZWR9XG4gICAgICBzdHlsZT17c3R5bGV9XG4gICAgPlxuICAgICAge3RpdGxlICYmIDx0aXRsZT57dGl0bGV9PC90aXRsZT59XG4gICAgICA8cGF0aCBkPXtkfSAvPlxuICAgIDwvc3ZnPlxuICApO1xufVxuXG5leHBvcnQgY29uc3QgSUNPTl9OQU1FUyA9IE9iamVjdC5rZXlzKFApO1xuIiwgIi8vIFNtYWxsIHNoYXJlZCBVSSBwcmltaXRpdmVzLlxuaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgZmxhZ1VybCB9IGZyb20gJy4uL2RhdGEvY291bnRyaWVzLmpzJztcbmltcG9ydCB7IExpbmsgfSBmcm9tICcuLi9yb3V0ZXIuanN4JztcbmltcG9ydCBJY29uIGZyb20gJy4vSWNvbi5qc3gnO1xuXG4vKiogVHJ1ZSBhZnRlciB0aGUgZmlyc3QgY2xpZW50IHJlbmRlciAodXNlIGZvciBhbnl0aGluZyByYW5kb20vYnJvd3Nlci1vbmx5IHRvIGF2b2lkIGh5ZHJhdGlvbiBtaXNtYXRjaCkuICovXG5leHBvcnQgZnVuY3Rpb24gdXNlTW91bnRlZCgpIHtcbiAgY29uc3QgW20sIHNldE1dID0gdXNlU3RhdGUoZmFsc2UpO1xuICB1c2VFZmZlY3QoKCkgPT4gc2V0TSh0cnVlKSwgW10pO1xuICByZXR1cm4gbTtcbn1cblxuLyoqIEFkZHMgLmlzLWluIHdoZW4gdGhlIGVsZW1lbnQgZW50ZXJzIHRoZSB2aWV3cG9ydDsgLmlzLXBhdXNlZCB0b2dnbGVzIG9mZi1zY3JlZW4gdG8gc3RvcCBDU1MgYW5pbWF0aW9ucy4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1c2VJblZpZXcob3B0aW9ucyA9IHsgdGhyZXNob2xkOiAwLjE1IH0sIG9uY2UgPSB0cnVlKSB7XG4gIGNvbnN0IHJlZiA9IHVzZVJlZihudWxsKTtcbiAgY29uc3QgW2luVmlldywgc2V0SW5WaWV3XSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBlbCA9IHJlZi5jdXJyZW50O1xuICAgIGlmICghZWwgfHwgdHlwZW9mIEludGVyc2VjdGlvbk9ic2VydmVyID09PSAndW5kZWZpbmVkJykge1xuICAgICAgc2V0SW5WaWV3KHRydWUpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBpbyA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcigoW2VdKSA9PiB7XG4gICAgICBpZiAoZS5pc0ludGVyc2VjdGluZykge1xuICAgICAgICBzZXRJblZpZXcodHJ1ZSk7XG4gICAgICAgIGlmIChvbmNlKSBpby5kaXNjb25uZWN0KCk7XG4gICAgICB9IGVsc2UgaWYgKCFvbmNlKSBzZXRJblZpZXcoZmFsc2UpO1xuICAgIH0sIG9wdGlvbnMpO1xuICAgIGlvLm9ic2VydmUoZWwpO1xuICAgIC8vIEZhaWwtc2FmZSBmb3Igb25lLXNob3QgcmV2ZWFsczogaWYgYSBmYXN0IGZsaW5nLCBhIGp1bXAgbGluayBvciB0aGUgRW5kIGtleSBzY3JvbGxzIHBhc3QgdGhlIGVsZW1lbnRcbiAgICAvLyB3aXRob3V0IGl0IGV2ZXIgaW50ZXJzZWN0aW5nLCByZXZlYWwgaXQgYW55d2F5IHNvIG5vIGNvbnRlbnQgY2FuIHN0YXkgaW52aXNpYmxlLlxuICAgIGxldCByYWYgPSAwO1xuICAgIGNvbnN0IG9uU2Nyb2xsID0gKCkgPT4ge1xuICAgICAgaWYgKHJhZikgcmV0dXJuO1xuICAgICAgcmFmID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgcmFmID0gMDtcbiAgICAgICAgaWYgKGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCA8IHdpbmRvdy5pbm5lckhlaWdodCkgeyBzZXRJblZpZXcodHJ1ZSk7IGNsZWFudXAoKTsgfVxuICAgICAgfSk7XG4gICAgfTtcbiAgICBjb25zdCBjbGVhbnVwID0gKCkgPT4geyB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgb25TY3JvbGwpOyBpby5kaXNjb25uZWN0KCk7IH07XG4gICAgaWYgKG9uY2UpIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBvblNjcm9sbCwgeyBwYXNzaXZlOiB0cnVlIH0pO1xuICAgIHJldHVybiAoKSA9PiB7IGNhbmNlbEFuaW1hdGlvbkZyYW1lKHJhZik7IGNsZWFudXAoKTsgfTtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVhY3QtaG9va3MvZXhoYXVzdGl2ZS1kZXBzXG4gIH0sIFtdKTtcbiAgcmV0dXJuIFtyZWYsIGluVmlld107XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBSZXZlYWwoeyBhczogVGFnID0gJ2RpdicsIGNsYXNzTmFtZSA9ICcnLCBkZWxheSA9IDAsIGNoaWxkcmVuLCBlZmZlY3QgPSAndXAnLCBzdHlsZSwgLi4ucmVzdCB9KSB7XG4gIGNvbnN0IFtyZWYsIGluVmlld10gPSB1c2VJblZpZXcoKTtcbiAgcmV0dXJuIChcbiAgICA8VGFnIHJlZj17cmVmfSBjbGFzc05hbWU9e2ByZXZlYWwgcmV2ZWFsLSR7ZWZmZWN0fSAke2luVmlldyA/ICdpcy1pbicgOiAnJ30gJHtjbGFzc05hbWV9YH0gc3R5bGU9e3sgLi4uc3R5bGUsICctLWQnOiBgJHtkZWxheX1tc2AgfX0gey4uLnJlc3R9PlxuICAgICAge2NoaWxkcmVufVxuICAgIDwvVGFnPlxuICApO1xufVxuXG4vKiogV3JhcHBlciB0aGF0IHBhdXNlcyBpdHMgQ1NTIGFuaW1hdGlvbnMgd2hpbGUgb2ZmLXNjcmVlbiAocGVyZm9ybWFuY2UpLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIExpdmVab25lKHsgYXM6IFRhZyA9ICdkaXYnLCBjbGFzc05hbWUgPSAnJywgY2hpbGRyZW4sIC4uLnJlc3QgfSkge1xuICBjb25zdCBbcmVmLCBpblZpZXddID0gdXNlSW5WaWV3KHsgdGhyZXNob2xkOiAwIH0sIGZhbHNlKTtcbiAgcmV0dXJuIChcbiAgICA8VGFnIHJlZj17cmVmfSBjbGFzc05hbWU9e2BsaXZlLXpvbmUgJHtpblZpZXcgPyAnJyA6ICdpcy1wYXVzZWQnfSAke2NsYXNzTmFtZX1gfSB7Li4ucmVzdH0+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9UYWc+XG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBGbGFnKHsgY29kZSwgbmFtZSwgc2l6ZSA9IDI0LCBjbGFzc05hbWUgPSAnJyB9KSB7XG4gIGNvbnN0IHcgPSBzaXplIDw9IDIwID8gMjAgOiBzaXplIDw9IDQwID8gNDAgOiA4MDtcbiAgcmV0dXJuIChcbiAgICA8aW1nXG4gICAgICBjbGFzc05hbWU9e2BmbGFnICR7Y2xhc3NOYW1lfWB9XG4gICAgICBzcmM9e2ZsYWdVcmwoY29kZSwgdyl9XG4gICAgICBhbHQ9e25hbWUgPyBgJHtuYW1lfSBmbGFnYCA6ICcnfVxuICAgICAgd2lkdGg9e3NpemV9XG4gICAgICBoZWlnaHQ9e01hdGgucm91bmQoc2l6ZSAqIDAuNzUpfVxuICAgICAgbG9hZGluZz1cImxhenlcIlxuICAgICAgZGVjb2Rpbmc9XCJhc3luY1wiXG4gICAgLz5cbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFN0YXJzKHsgdmFsdWUgPSA1LCBzaXplID0gMTYsIGNsYXNzTmFtZSA9ICcnIH0pIHtcbiAgcmV0dXJuIChcbiAgICA8c3BhbiBjbGFzc05hbWU9e2BzdGFycyAke2NsYXNzTmFtZX1gfSBhcmlhLWxhYmVsPXtgJHt2YWx1ZX0gb3V0IG9mIDUgc3RhcnNgfSByb2xlPVwiaW1nXCI+XG4gICAgICB7WzEsIDIsIDMsIDQsIDVdLm1hcCgoaSkgPT4gKFxuICAgICAgICA8SWNvbiBrZXk9e2l9IG5hbWU9XCJzdGFyXCIgc2l6ZT17c2l6ZX0gZmlsbD17aSA8PSB2YWx1ZSA/ICdjdXJyZW50Q29sb3InIDogJ25vbmUnfSBjbGFzc05hbWU9e2kgPD0gdmFsdWUgPyAnb24nIDogJ29mZid9IC8+XG4gICAgICApKX1cbiAgICA8L3NwYW4+XG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBCdXR0b24oeyB0bywgY2hpbGRyZW4sIHZhcmlhbnQgPSAncHJpbWFyeScsIGljb24gPSAnYXJyb3cnLCBjbGFzc05hbWUgPSAnJywgLi4ucmVzdCB9KSB7XG4gIGNvbnN0IGNscyA9IGBidG4gYnRuLSR7dmFyaWFudH0gJHtjbGFzc05hbWV9YDtcbiAgY29uc3QgaW5uZXIgPSAoXG4gICAgPD5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImJ0bi1sYWJlbFwiPntjaGlsZHJlbn08L3NwYW4+XG4gICAgICB7aWNvbiAmJiA8SWNvbiBuYW1lPXtpY29ufSBzaXplPXsxOH0gY2xhc3NOYW1lPVwiYnRuLWljb25cIiAvPn1cbiAgICA8Lz5cbiAgKTtcbiAgaWYgKHRvKSByZXR1cm4gPExpbmsgdG89e3RvfSBjbGFzc05hbWU9e2Nsc30gey4uLnJlc3R9Pntpbm5lcn08L0xpbms+O1xuICByZXR1cm4gPGJ1dHRvbiBjbGFzc05hbWU9e2Nsc30gey4uLnJlc3R9Pntpbm5lcn08L2J1dHRvbj47XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBFeWVicm93KHsgY2hpbGRyZW4sIGNvbG9yIH0pIHtcbiAgcmV0dXJuIChcbiAgICA8c3BhbiBjbGFzc05hbWU9XCJleWVicm93XCIgc3R5bGU9e2NvbG9yID8geyAnLS1lYic6IGNvbG9yIH0gOiB1bmRlZmluZWR9PlxuICAgICAgPGkgYXJpYS1oaWRkZW49XCJ0cnVlXCIgLz5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L3NwYW4+XG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBTZWN0aW9uSGVhZCh7IGV5ZWJyb3csIHRpdGxlLCBsZWFkLCBhbGlnbiA9ICdjZW50ZXInLCBjb2xvciwgaWQgfSkge1xuICByZXR1cm4gKFxuICAgIDxoZWFkZXIgY2xhc3NOYW1lPXtgc2VjdGlvbi1oZWFkIGFsaWduLSR7YWxpZ259YH0gaWQ9e2lkfT5cbiAgICAgIHtleWVicm93ICYmIDxFeWVicm93IGNvbG9yPXtjb2xvcn0+e2V5ZWJyb3d9PC9FeWVicm93Pn1cbiAgICAgIDxoMj57dGl0bGV9PC9oMj5cbiAgICAgIHtsZWFkICYmIDxwIGNsYXNzTmFtZT1cImxlYWRcIj57bGVhZH08L3A+fVxuICAgIDwvaGVhZGVyPlxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gQnJlYWRjcnVtYnMoeyBpdGVtcyB9KSB7XG4gIHJldHVybiAoXG4gICAgPG5hdiBjbGFzc05hbWU9XCJjcnVtYnNcIiBhcmlhLWxhYmVsPVwiQnJlYWRjcnVtYlwiPlxuICAgICAgPG9sPlxuICAgICAgICB7aXRlbXMubWFwKChpdCwgaSkgPT4gKFxuICAgICAgICAgIDxsaSBrZXk9e2l0LnRvIHx8IGl0LmxhYmVsfT5cbiAgICAgICAgICAgIHtpIDwgaXRlbXMubGVuZ3RoIC0gMSA/IDxMaW5rIHRvPXtpdC50b30+e2l0LmxhYmVsfTwvTGluaz4gOiA8c3BhbiBhcmlhLWN1cnJlbnQ9XCJwYWdlXCI+e2l0LmxhYmVsfTwvc3Bhbj59XG4gICAgICAgICAgPC9saT5cbiAgICAgICAgKSl9XG4gICAgICA8L29sPlxuICAgIDwvbmF2PlxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gQWNjb3JkaW9uKHsgaXRlbXMsIGlkUHJlZml4ID0gJ2FjYycsIGRlZmF1bHRPcGVuID0gLTEgfSkge1xuICBjb25zdCBbb3Blbiwgc2V0T3Blbl0gPSB1c2VTdGF0ZShkZWZhdWx0T3Blbik7XG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJhY2NvcmRpb25cIj5cbiAgICAgIHtpdGVtcy5tYXAoKGl0LCBpKSA9PiB7XG4gICAgICAgIGNvbnN0IGlzT3BlbiA9IG9wZW4gPT09IGk7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPGRpdiBrZXk9e2l0LnF9IGNsYXNzTmFtZT17YGFjYy1pdGVtICR7aXNPcGVuID8gJ2lzLW9wZW4nIDogJyd9YH0+XG4gICAgICAgICAgICA8aDM+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBhcmlhLWV4cGFuZGVkPXtpc09wZW59XG4gICAgICAgICAgICAgICAgYXJpYS1jb250cm9scz17YCR7aWRQcmVmaXh9LSR7aX1gfVxuICAgICAgICAgICAgICAgIGlkPXtgJHtpZFByZWZpeH0tYnRuLSR7aX1gfVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldE9wZW4oaXNPcGVuID8gLTEgOiBpKX1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxzcGFuPntpdC5xfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhY2Mtc2lnblwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjxpIC8+PGkgLz48L3NwYW4+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWNjLXBhbmVsXCIgaWQ9e2Ake2lkUHJlZml4fS0ke2l9YH0gcm9sZT1cInJlZ2lvblwiIGFyaWEtbGFiZWxsZWRieT17YCR7aWRQcmVmaXh9LWJ0bi0ke2l9YH0+XG4gICAgICAgICAgICAgIDxkaXY+PHA+e2l0LmF9PC9wPjwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgICB9KX1cbiAgICA8L2Rpdj5cbiAgKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFXQSxLQUNHLFdBQVk7QUFDWCxlQUFTLHlCQUF5QixZQUFZLE1BQU07QUFDbEQsZUFBTyxlQUFlLFVBQVUsV0FBVyxZQUFZO0FBQUEsVUFDckQsS0FBSyxXQUFZO0FBQ2Ysb0JBQVE7QUFBQSxjQUNOO0FBQUEsY0FDQSxLQUFLLENBQUM7QUFBQSxjQUNOLEtBQUssQ0FBQztBQUFBLFlBQ1I7QUFBQSxVQUNGO0FBQUEsUUFDRixDQUFDO0FBQUEsTUFDSDtBQUNBLGVBQVMsY0FBYyxlQUFlO0FBQ3BDLFlBQUksU0FBUyxpQkFBaUIsYUFBYSxPQUFPO0FBQ2hELGlCQUFPO0FBQ1Qsd0JBQ0cseUJBQXlCLGNBQWMscUJBQXFCLEtBQzdELGNBQWMsWUFBWTtBQUM1QixlQUFPLGVBQWUsT0FBTyxnQkFBZ0IsZ0JBQWdCO0FBQUEsTUFDL0Q7QUFDQSxlQUFTLFNBQVMsZ0JBQWdCLFlBQVk7QUFDNUMsMEJBQ0ksaUJBQWlCLGVBQWUsaUJBQy9CLGVBQWUsZUFBZSxlQUFlLFNBQ2hEO0FBQ0YsWUFBSSxhQUFhLGlCQUFpQixNQUFNO0FBQ3hDLGdEQUF3QyxVQUFVLE1BQy9DLFFBQVE7QUFBQSxVQUNQO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxRQUNGLEdBQ0Msd0NBQXdDLFVBQVUsSUFBSTtBQUFBLE1BQzNEO0FBQ0EsZUFBUyxVQUFVLE9BQU8sU0FBUyxTQUFTO0FBQzFDLGFBQUssUUFB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UCxXQUFXO0FBQUEsRUFDWCxPQUFPO0FBQUEsRUFDUCxHQUFHO0FBQUEsRUFDSCxNQUFNO0FBQUEsRUFDTixNQUFNO0FBQUEsRUFDTixPQUFPO0FBQUEsRUFDUCxNQUFNO0FBQUEsRUFDTixPQUFPO0FBQUEsRUFDUCxPQUFPO0FBQUEsRUFDUCxhQUFhO0FBQUEsRUFDYixPQUFPO0FBQUEsRUFDUCxNQUFNO0FBQUEsRUFDTixPQUFPO0FBQUEsRUFDUCxZQUFZO0FBQUEsRUFDWixPQUFPO0FBQUEsRUFDUCxXQUFXO0FBQUEsRUFDWCxTQUFTO0FBQUEsRUFDVCxXQUFXO0FBQUEsRUFDWCxTQUFTO0FBQUEsRUFDVCxPQUFPO0FBQUEsRUFDUCxNQUFNO0FBQUEsRUFDTixNQUFNO0FBQUEsRUFDTixPQUFPO0FBQUEsRUFDUCxNQUFNO0FBQUEsRUFDTixNQUFNO0FBQUEsRUFDTixRQUFRO0FBQUEsRUFDUixLQUFLO0FBQUEsRUFDTCxLQUFLO0FBQUEsRUFDTCxTQUFTO0FBQUEsRUFDVCxRQUFRO0FBQUEsRUFDUixhQUFhO0FBQUEsRUFDYixNQUFNO0FBQUEsRUFDTixLQUFLO0FBQUEsRUFDTCxPQUFPO0FBQUEsRUFDUCxLQUFLO0FBQUEsRUFDTCxPQUFPO0FBQUEsRUFDUCxNQUFNO0FBQUEsRUFDTixLQUFLO0FBQUEsRUFDTCxNQUFNO0FBQUEsRUFDTixRQUFRO0FBQUEsRUFDUixhQUFhO0FBQUEsRUFDYixPQUFPO0FBQUEsRUFDUCxNQUFNO0FBQUEsRUFDTixNQUFNO0FBQUEsRUFDTixRQUFRO0FBQUEsRUFDUixNQUFNO0FBQUEsRUFDTixNQUFNO0FBQUEsRUFDTixLQUFLO0FBQUEsRUFDTCxjQUFjO0FBQUEsRUFDZCxVQUFVO0FBQUEsRUFDVixPQUFPO0FBQUEsRUFDUCxVQUFVO0FBQUEsRUFDVixVQUFVO0FBQUEsRUFDVixTQUFTO0FBQUEsRUFDVCxXQUFXO0FBQUEsRUFDWCxVQUFVO0FBQUEsRUFDVixNQUFNO0FBQUEsRUFDTixNQUFNO0FBQUEsRUFDTixNQUFNO0FBQUEsRUFDTixPQUFPO0FBQUEsRUFDUCxNQUFNO0FBQUEsRUFDTixNQUFNO0FBQUEsRUFDTixNQUFNO0FBQUEsRUFDTixLQUFLO0FBQUEsRUFDTCxXQUFXO0FBQUEsRUFDWCxPQUFPO0FBQUEsRUFDUCxRQUFRO0FBQUEsRUFDUixXQUFXO0FBQUEsRUFDWCxPQUFPO0FBQUEsRUFDUCxVQUFVO0FBQUEsRUFDVixNQUFNO0FBQUEsRUFDTixTQUFTO0FBQUEsRUFDVCxLQUFLO0FBQUEsRUFDTCxNQUFNO0FBQUEsRUFDTixZQUFZO0FBQUEsRUFDWixRQUFRO0FBQUEsRUFDUixLQUFLO0FBQUEsRUFDTCxVQUFVO0FBQUEsRUFDVixNQUFNO0FBQUEsRUFDTixRQUFRO0FBQUEsRUFDUixhQUFhO0FBQUEsRUFDYixLQUFLO0FBQUEsRUFDTCxRQUFRO0FBQUEsRUFDUixTQUFTO0FBQUEsRUFDVCxRQUFRO0FBQUEsRUFDUixNQUFNO0FBQUEsRUFDTixPQUFPO0FBQUEsRUFDUCxVQUFVO0FBQUEsRUFDVixNQUFNO0FBQUEsRUFDTixTQUFTO0FBQUEsRUFDVCxRQUFRO0FBQUEsRUFDUixVQUFVO0FBQUEsRUFDVixNQUFNO0FBQUEsRUFDTixPQUFPO0FBQUEsRUFDUCxRQUFRO0FBQUEsRUFDUixRQUFRO0FBQUEsRUFDUixPQUFPO0FBQUEsRUFDUCxPQUFPO0FBQUEsRUFDUCxRQUFRO0FBQUEsRUFDUixNQUFNO0FBQUEsRUFDTixLQUFLO0FBQUEsRUFDTCxNQUFNO0FBQUEsRUFDTixNQUFNO0FBQUEsRUFDTixPQUFPO0FBQUEsRUFDUCxLQUFLO0FBQUEsRUFDTCxTQUFTO0FBQUEsRUFDVCxTQUFTO0FBQUEsRUFDVCxTQUFTO0FBQUEsRUFDVCxZQUFZO0FBQUEsRUFDWixNQUFNO0FBQUEsRUFDTixLQUFLO0FBQUEsRUFDTCxPQUFPO0FBQUEsRUFDUCxRQUFRO0FBQUEsRUFDUixRQUFRO0FBQUEsRUFDUixLQUFLO0FBQUEsRUFDTCxVQUFVO0FBQUEsRUFDVixPQUFPO0FBQUEsRUFDUCxPQUFPO0FBQUEsRUFDUCxPQUFPO0FBQUEsRUFDUCxNQUFNO0FBQUEsRUFD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QUFjLEdBQUcsR0FBRztBQUN2RSxRQUFNLENBQUMsTUFBTSxPQUFPLFFBQUksd0JBQVMsV0FBVztBQUM1QyxTQUNFLDZDQUFDLFNBQUksV0FBVSxhQUNaLGdCQUFNLElBQUksQ0FBQyxJQUFJLE1BQU07QUFDcEIsVUFBTSxTQUFTLFNBQVM7QUFDeEIsV0FDRSw4Q0FBQyxTQUFlLFdBQVcsWUFBWSxTQUFTLFlBQVksRUFBRSxJQUM1RDtBQUFBLG1EQUFDLFFBQ0M7QUFBQSxRQUFDO0FBQUE7QUFBQSxVQUNDLE1BQUs7QUFBQSxVQUNMLGlCQUFlO0FBQUEsVUFDZixpQkFBZSxHQUFHLFFBQVEsSUFBSSxDQUFDO0FBQUEsVUFDL0IsSUFBSSxHQUFHLFFBQVEsUUFBUSxDQUFDO0FBQUEsVUFDeEIsU0FBUyxNQUFNLFFBQVEsU0FBUyxLQUFLLENBQUM7QUFBQSxVQUV0QztBQUFBLHlEQUFDLFVBQU0sYUFBRyxHQUFFO0FBQUEsWUFDWiw4Q0FBQyxVQUFLLFdBQVUsWUFBVyxlQUFZLFFBQU87QUFBQSwyREFBQyxPQUFFO0FBQUEsY0FBRSw2Q0FBQyxPQUFFO0FBQUEsZUFBRTtBQUFBO0FBQUE7QUFBQSxNQUMxRCxHQUNGO0FBQUEsTUFDQSw2Q0FBQyxTQUFJLFdBQVUsYUFBWSxJQUFJLEdBQUcsUUFBUSxJQUFJLENBQUMsSUFBSSxNQUFLLFVBQVMsbUJBQWlCLEdBQUcsUUFBUSxRQUFRLENBQUMsSUFDcEcsdURBQUMsU0FBSSx1REFBQyxPQUFHLGFBQUcsR0FBRSxHQUFJLEdBQ3BCO0FBQUEsU0FmUSxHQUFHLENBZ0JiO0FBQUEsRUFFSixDQUFDLEdBQ0g7QUFFSjsiLAogICJuYW1lcyI6IFsiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfanN4X3J1bnRpbWUiXQp9Cg==
