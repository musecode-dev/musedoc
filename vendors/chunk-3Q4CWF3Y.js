var T = Object.create;
var w = Object.defineProperty;
var V = Object.getOwnPropertyDescriptor;
var A = Object.getOwnPropertyNames;
var D = Object.getPrototypeOf,
  U = Object.prototype.hasOwnProperty;
var q = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports);
var F = (e, t, r, o) => {
  if ((t && typeof t == 'object') || typeof t == 'function')
    for (let u of A(t))
      !U.call(e, u) &&
        u !== r &&
        w(e, u, {
          get: () => t[u],
          enumerable: !(o = V(t, u)) || o.enumerable
        });
  return e;
};
var re = (e, t, r) => (
  (r = e != null ? T(D(e)) : {}),
  F(
    t || !e || !e.__esModule
      ? w(r, 'default', { value: e, enumerable: !0 })
      : r,
    e
  )
);
var te = q((n) => {
  'use strict';
  var y = Symbol.for('react.element'),
    L = Symbol.for('react.portal'),
    M = Symbol.for('react.fragment'),
    N = Symbol.for('react.strict_mode'),
    z = Symbol.for('react.profiler'),
    B = Symbol.for('react.provider'),
    H = Symbol.for('react.context'),
    W = Symbol.for('react.forward_ref'),
    G = Symbol.for('react.suspense'),
    J = Symbol.for('react.memo'),
    K = Symbol.for('react.lazy'),
    R = Symbol.iterator;
  function Q(e) {
    return e === null || typeof e != 'object'
      ? null
      : ((e = (R && e[R]) || e['@@iterator']),
        typeof e == 'function' ? e : null);
  }
  var C = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {}
    },
    j = Object.assign,
    O = {};
  function p(e, t, r) {
    (this.props = e),
      (this.context = t),
      (this.refs = O),
      (this.updater = r || C);
  }
  p.prototype.isReactComponent = {};
  p.prototype.setState = function (e, t) {
    if (typeof e != 'object' && typeof e != 'function' && e != null)
      throw Error(
        'setState(...): takes an object of state variables to update or a function which returns an object of state variables.'
      );
    this.updater.enqueueSetState(this, e, t, 'setState');
  };
  p.prototype.forceUpdate = function (e) {
    this.updater.enqueueForceUpdate(this, e, 'forceUpdate');
  };
  function g() {}
  g.prototype = p.prototype;
  function m(e, t, r) {
    (this.props = e),
      (this.context = t),
      (this.refs = O),
      (this.updater = r || C);
  }
  var S = (m.prototype = new g());
  S.constructor = m;
  j(S, p.prototype);
  S.isPureReactComponent = !0;
  var $ = Array.isArray,
    P = Object.prototype.hasOwnProperty,
    E = { current: null },
    x = { key: !0, ref: !0, __self: !0, __source: !0 };
  function I(e, t, r) {
    var o,
      u = {},
      c = null,
      s = null;
    if (t != null)
      for (o in (t.ref !== void 0 && (s = t.ref),
      t.key !== void 0 && (c = '' + t.key),
      t))
        P.call(t, o) && !x.hasOwnProperty(o) && (u[o] = t[o]);
    var f = arguments.length - 2;
    if (f === 1) u.children = r;
    else if (1 < f) {
      for (var i = Array(f), a = 0; a < f; a++) i[a] = arguments[a + 2];
      u.children = i;
    }
    if (e && e.defaultProps)
      for (o in ((f = e.defaultProps), f)) u[o] === void 0 && (u[o] = f[o]);
    return {
      $$typeof: y,
      type: e,
      key: c,
      ref: s,
      props: u,
      _owner: E.current
    };
  }
  function Y(e, t) {
    return {
      $$typeof: y,
      type: e.type,
      key: t,
      ref: e.ref,
      props: e.props,
      _owner: e._owner
    };
  }
  function k(e) {
    return typeof e == 'object' && e !== null && e.$$typeof === y;
  }
  function X(e) {
    var t = { '=': '=0', ':': '=2' };
    return (
      '$' +
      e.replace(/[=:]/g, function (r) {
        return t[r];
      })
    );
  }
  var b = /\/+/g;
  function v(e, t) {
    return typeof e == 'object' && e !== null && e.key != null
      ? X('' + e.key)
      : t.toString(36);
  }
  function h(e, t, r, o, u) {
    var c = typeof e;
    (c === 'undefined' || c === 'boolean') && (e = null);
    var s = !1;
    if (e === null) s = !0;
    else
      switch (c) {
        case 'string':
        case 'number':
          s = !0;
          break;
        case 'object':
          switch (e.$$typeof) {
            case y:
            case L:
              s = !0;
          }
      }
    if (s)
      return (
        (s = e),
        (u = u(s)),
        (e = o === '' ? '.' + v(s, 0) : o),
        $(u)
          ? ((r = ''),
            e != null && (r = e.replace(b, '$&/') + '/'),
            h(u, t, r, '', function (a) {
              return a;
            }))
          : u != null &&
            (k(u) &&
              (u = Y(
                u,
                r +
                  (!u.key || (s && s.key === u.key)
                    ? ''
                    : ('' + u.key).replace(b, '$&/') + '/') +
                  e
              )),
            t.push(u)),
        1
      );
    if (((s = 0), (o = o === '' ? '.' : o + ':'), $(e)))
      for (var f = 0; f < e.length; f++) {
        c = e[f];
        var i = o + v(c, f);
        s += h(c, t, r, i, u);
      }
    else if (((i = Q(e)), typeof i == 'function'))
      for (e = i.call(e), f = 0; !(c = e.next()).done; )
        (c = c.value), (i = o + v(c, f++)), (s += h(c, t, r, i, u));
    else if (c === 'object')
      throw (
        ((t = String(e)),
        Error(
          'Objects are not valid as a React child (found: ' +
            (t === '[object Object]'
              ? 'object with keys {' + Object.keys(e).join(', ') + '}'
              : t) +
            '). If you meant to render a collection of children, use an array instead.'
        ))
      );
    return s;
  }
  function d(e, t, r) {
    if (e == null) return e;
    var o = [],
      u = 0;
    return (
      h(e, o, '', '', function (c) {
        return t.call(r, c, u++);
      }),
      o
    );
  }
  function Z(e) {
    if (e._status === -1) {
      var t = e._result;
      (t = t()),
        t.then(
          function (r) {
            (e._status === 0 || e._status === -1) &&
              ((e._status = 1), (e._result = r));
          },
          function (r) {
            (e._status === 0 || e._status === -1) &&
              ((e._status = 2), (e._result = r));
          }
        ),
        e._status === -1 && ((e._status = 0), (e._result = t));
    }
    if (e._status === 1) return e._result.default;
    throw e._result;
  }
  var l = { current: null },
    _ = { transition: null },
    ee = {
      ReactCurrentDispatcher: l,
      ReactCurrentBatchConfig: _,
      ReactCurrentOwner: E
    };
  n.Children = {
    map: d,
    forEach: function (e, t, r) {
      d(
        e,
        function () {
          t.apply(this, arguments);
        },
        r
      );
    },
    count: function (e) {
      var t = 0;
      return (
        d(e, function () {
          t++;
        }),
        t
      );
    },
    toArray: function (e) {
      return (
        d(e, function (t) {
          return t;
        }) || []
      );
    },
    only: function (e) {
      if (!k(e))
        throw Error(
          'React.Children.only expected to receive a single React element child.'
        );
      return e;
    }
  };
  n.Component = p;
  n.Fragment = M;
  n.Profiler = z;
  n.PureComponent = m;
  n.StrictMode = N;
  n.Suspense = G;
  n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ee;
  n.cloneElement = function (e, t, r) {
    if (e == null)
      throw Error(
        'React.cloneElement(...): The argument must be a React element, but you passed ' +
          e +
          '.'
      );
    var o = j({}, e.props),
      u = e.key,
      c = e.ref,
      s = e._owner;
    if (t != null) {
      if (
        (t.ref !== void 0 && ((c = t.ref), (s = E.current)),
        t.key !== void 0 && (u = '' + t.key),
        e.type && e.type.defaultProps)
      )
        var f = e.type.defaultProps;
      for (i in t)
        P.call(t, i) &&
          !x.hasOwnProperty(i) &&
          (o[i] = t[i] === void 0 && f !== void 0 ? f[i] : t[i]);
    }
    var i = arguments.length - 2;
    if (i === 1) o.children = r;
    else if (1 < i) {
      f = Array(i);
      for (var a = 0; a < i; a++) f[a] = arguments[a + 2];
      o.children = f;
    }
    return { $$typeof: y, type: e.type, key: u, ref: c, props: o, _owner: s };
  };
  n.createContext = function (e) {
    return (
      (e = {
        $$typeof: H,
        _currentValue: e,
        _currentValue2: e,
        _threadCount: 0,
        Provider: null,
        Consumer: null,
        _defaultValue: null,
        _globalName: null
      }),
      (e.Provider = { $$typeof: B, _context: e }),
      (e.Consumer = e)
    );
  };
  n.createElement = I;
  n.createFactory = function (e) {
    var t = I.bind(null, e);
    return (t.type = e), t;
  };
  n.createRef = function () {
    return { current: null };
  };
  n.forwardRef = function (e) {
    return { $$typeof: W, render: e };
  };
  n.isValidElement = k;
  n.lazy = function (e) {
    return { $$typeof: K, _payload: { _status: -1, _result: e }, _init: Z };
  };
  n.memo = function (e, t) {
    return { $$typeof: J, type: e, compare: t === void 0 ? null : t };
  };
  n.startTransition = function (e) {
    var t = _.transition;
    _.transition = {};
    try {
      e();
    } finally {
      _.transition = t;
    }
  };
  n.unstable_act = function () {
    throw Error('act(...) is not supported in production builds of React.');
  };
  n.useCallback = function (e, t) {
    return l.current.useCallback(e, t);
  };
  n.useContext = function (e) {
    return l.current.useContext(e);
  };
  n.useDebugValue = function () {};
  n.useDeferredValue = function (e) {
    return l.current.useDeferredValue(e);
  };
  n.useEffect = function (e, t) {
    return l.current.useEffect(e, t);
  };
  n.useId = function () {
    return l.current.useId();
  };
  n.useImperativeHandle = function (e, t, r) {
    return l.current.useImperativeHandle(e, t, r);
  };
  n.useInsertionEffect = function (e, t) {
    return l.current.useInsertionEffect(e, t);
  };
  n.useLayoutEffect = function (e, t) {
    return l.current.useLayoutEffect(e, t);
  };
  n.useMemo = function (e, t) {
    return l.current.useMemo(e, t);
  };
  n.useReducer = function (e, t, r) {
    return l.current.useReducer(e, t, r);
  };
  n.useRef = function (e) {
    return l.current.useRef(e);
  };
  n.useState = function (e) {
    return l.current.useState(e);
  };
  n.useSyncExternalStore = function (e, t, r) {
    return l.current.useSyncExternalStore(e, t, r);
  };
  n.useTransition = function () {
    return l.current.useTransition();
  };
  n.version = '18.2.0';
});
export { q as a, re as b, te as c };
/*! Bundled license information:

react/cjs/react.production.min.js:
  (**
   * @license React
   * react.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
