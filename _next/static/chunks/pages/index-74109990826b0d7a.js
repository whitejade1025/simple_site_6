(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [405],
  {
    9779: function (e, t, n) {
      "use strict";
      n.r(t),
        n.d(t, {
          default: function () {
            return M;
          },
        });
      var r = n(29),
        a = n(7794),
        s = n.n(a),
        i = n(7294),
        c = n(3374),
        o = n.n(c),
        l = n(5121),
        d = n(2224),
        u = n(4306),
        f = n(4718),
        p = n(4671),
        x = n(282),
        h = new x.PublicKey("Gj7C9aztJRsMdpfUwoBM9qUaaXjRpVCNGCwCDakvsosJ"),
        m = (0, p.Z)(function (e) {
          return {
            balanceOfTOSS: 0,
            getUserTOSSBalance: (function () {
              var t = (0, r.Z)(
                s().mark(function t(n, r) {
                  var a, i;
                  return s().wrap(
                    function (t) {
                      for (;;)
                        switch ((t.prev = t.next)) {
                          case 0:
                            return (
                              (a = 0),
                              (t.prev = 1),
                              (t.next = 4),
                              r.getParsedTokenAccountsByOwner(n, { mint: h })
                            );
                          case 4:
                            (i = t.sent).value.length > 0 &&
                              ((a =
                                i.value[0].account.data.parsed.info.tokenAmount
                                  .uiAmountString),
                              console.log("balanceOfToss:", a)),
                              (t.next = 10);
                            break;
                          case 8:
                            (t.prev = 8), (t.t0 = t.catch(1));
                          case 10:
                            e(function (e) {
                              return { balanceOfTOSS: a };
                            });
                          case 11:
                          case "end":
                            return t.stop();
                        }
                    },
                    t,
                    null,
                    [[1, 8]]
                  );
                })
              );
              return function (e, n) {
                return t.apply(this, arguments);
              };
            })(),
          };
        }),
        g = m,
        v = n(6835);
      function y(e, t) {
        var n =
          ("undefined" !== typeof Symbol && e[Symbol.iterator]) ||
          e["@@iterator"];
        if (!n) {
          if (
            Array.isArray(e) ||
            (n = (function (e, t) {
              if (!e) return;
              if ("string" === typeof e) return w(e, t);
              var n = Object.prototype.toString.call(e).slice(8, -1);
              "Object" === n && e.constructor && (n = e.constructor.name);
              if ("Map" === n || "Set" === n) return Array.from(e);
              if (
                "Arguments" === n ||
                /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
              )
                return w(e, t);
            })(e)) ||
            (t && e && "number" === typeof e.length)
          ) {
            n && (e = n);
            var r = 0,
              a = function () {};
            return {
              s: a,
              n: function () {
                return r >= e.length
                  ? { done: !0 }
                  : { done: !1, value: e[r++] };
              },
              e: function (e) {
                throw e;
              },
              f: a,
            };
          }
          throw new TypeError(
            "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
          );
        }
        var s,
          i = !0,
          c = !1;
        return {
          s: function () {
            n = n.call(e);
          },
          n: function () {
            var e = n.next();
            return (i = e.done), e;
          },
          e: function (e) {
            (c = !0), (s = e);
          },
          f: function () {
            try {
              i || null == n.return || n.return();
            } finally {
              if (c) throw s;
            }
          },
        };
      }
      function w(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
        return r;
      }
      function b() {
        var e = "abcdefghijklmnopqrstuvwxyz";
        return e.charAt(Math.floor(Math.random() * e.length));
      }
      function j(e) {
        var t = e.toString().split("."),
          n = (0, v.Z)(t, 2),
          r = n[0],
          a = n[1],
          s = parseInt(r)
            .toString(2)
            .split("")
            .map(function (e) {
              return "1" === e ? "I" + b() : "O" + b();
            })
            .join("");
        if (((s += "D"), a))
          for (var i = 0; i < a.length; i++)
            s += (parseInt(a[i]) + 10).toString(36);
        for (var c = 0; c < 5; c++) s += b();
        return s;
      }
      function N(e) {
        for (
          var t = (e = e.slice(0, -5)).split("D"),
            n = (0, v.Z)(t, 2),
            r = n[0],
            a = n[1],
            s = "",
            i = 0;
          i < r.length;
          i += 2
        )
          s += "I" === r[i] ? "1" : "0";
        var c = parseInt(s, 2),
          o = "";
        if (a) {
          var l,
            d = y(a);
          try {
            for (d.s(); !(l = d.n()).done; ) {
              var u = l.value;
              o += (parseInt(u, 36) - 10).toString();
            }
          } catch (f) {
            d.e(f);
          } finally {
            d.f();
          }
        }
        return parseFloat("".concat(c, ".").concat(o));
      }
      var k = n(6072),
        T = n(5423),
        C = n(2655),
        S = n(8467),
        A = n(7191),
        _ = n.n(A),
        R = n(5893),
        K = function () {
          var e = (0, u.O)(),
            t = (0, u.O)(),
            n = t.publicKey,
            a = (t.sendTransaction, (0, f.R)().connection),
            c = g(function (e) {
              return e.balanceOfTOSS;
            }),
            p = g().getUserTOSSBalance,
            h = (0, i.useState)(0),
            m = h[0],
            v = h[1],
            y = (0, i.useState)(!1),
            w = y[0],
            b = y[1],
            A = (0, i.useRef)(null),
            K = (0, i.useRef)(null),
            M = (0, i.useRef)(""),
            z = (0, i.useContext)(k.J).socket,
            O = (0, i.useState)(""),
            G = O[0],
            I = O[1],
            P = (0, i.useState)(0),
            J = P[0],
            B = P[1],
            L = (0, i.useState)(!0),
            D = L[0],
            E = L[1],
            U = (0, i.useState)(!0),
            Z = U[0],
            q = U[1],
            W = (0, i.useState)(!1),
            F = W[0],
            X = W[1],
            H = (0, i.useState)(!1),
            V = H[0],
            Y = H[1],
            $ = (0, i.useState)(!1),
            Q = $[0],
            ee = $[1],
            te = (0, i.useState)([]),
            ne = te[0],
            re = te[1],
            ae = (0, i.useState)(0),
            se = ae[0],
            ie = ae[1];
          (0, i.useEffect)(function () {
            window.addEventListener("scroll", pe(xe, 10));
            var e = setInterval(function () {
              oe();
            }, 500);
            return (
              setTimeout(function () {
                window.scrollTo({ behavior: "smooth", left: 0, top: 900 });
              }, 2e3),
              l.Z.post(
                "".concat("https://gatomeme.com", "/api/history/topList")
              )
                .then(
                  (function () {
                    var e = (0, r.Z)(
                      s().mark(function e(t) {
                        return s().wrap(function (e) {
                          for (;;)
                            switch ((e.prev = e.next)) {
                              case 0:
                                setTimeout(function () {
                                  ie(t.data.totalPrize), re(t.data.topList);
                                }, 500);
                              case 1:
                              case "end":
                                return e.stop();
                            }
                        }, e);
                      })
                    );
                    return function (t) {
                      return e.apply(this, arguments);
                    };
                  })()
                )
                .catch(function (e) {
                  console.log(e);
                }),
              function () {
                clearInterval(e);
              }
            );
          }, []),
            (0, i.useEffect)(
              function () {
                p(e.publicKey, a);
                var t = (function () {
                  var e = (0, r.Z)(
                    s().mark(function e() {
                      return s().wrap(function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                            case "end":
                              return e.stop();
                          }
                      }, e);
                    })
                  );
                  return function () {
                    return e.apply(this, arguments);
                  };
                })();
                t();
              },
              [n, a]
            ),
            (0, i.useEffect)(
              function () {
                var e;
                return (
                  w &&
                    (e = requestAnimationFrame(function t() {
                      v(function (e) {
                        return e + 20;
                      }),
                        w && (e = requestAnimationFrame(t));
                    })),
                  function () {
                    "tails" === M.current ? v(180) : v(360),
                      cancelAnimationFrame(e);
                  }
                );
              },
              [w]
            ),
            (0, i.useEffect)(
              function () {
                z &&
                  z.on(
                    "broadcast",
                    (function () {
                      var e = (0, r.Z)(
                        s().mark(function e(t) {
                          var n, r;
                          return s().wrap(function (e) {
                            for (;;)
                              switch ((e.prev = e.next)) {
                                case 0:
                                  (n = t.address),
                                    (r = t.amount),
                                    ie(t.totalPrize),
                                    re(t.topList),
                                    (0, d.h)({
                                      type: "success",
                                      message: ""
                                        .concat(n, " invest ")
                                        .concat(r, " on Coin Flip game!"),
                                    });
                                case 5:
                                case "end":
                                  return e.stop();
                              }
                          }, e);
                        })
                      );
                      return function (t) {
                        return e.apply(this, arguments);
                      };
                    })()
                  );
              },
              [z]
            );
          var ce = function (e) {
              return parseFloat(e.toFixed(4));
            },
            oe = function () {
              var e = document.querySelector("section"),
                t = document.createElement("span"),
                n = 60 * Math.random();
              (t.style.width = "".concat(20 + n, "px")),
                (t.style.height = "".concat(20 + n, "px")),
                (t.style.left = "".concat(
                  Math.random() * window.innerWidth,
                  "px"
                )),
                null === e || void 0 === e || e.appendChild(t),
                setTimeout(function () {
                  t.remove();
                }, 4e3);
            },
            le = (function () {
              var t = (0, r.Z)(
                s().mark(function t() {
                  var i;
                  return s().wrap(function (t) {
                    for (;;)
                      switch ((t.prev = t.next)) {
                        case 0:
                          if (void 0 !== e.publicKey) {
                            t.next = 3;
                            break;
                          }
                          return (
                            (0, d.h)({
                              type: "warning",
                              message: "Connect the wallet!",
                            }),
                            t.abrupt("return")
                          );
                        case 3:
                          return (t.next = 5), p(e.publicKey, a);
                        case 5:
                          if (!("" === G || 0 === J || c <= 0)) {
                            t.next = 8;
                            break;
                          }
                          return (
                            (0, d.h)({
                              type: "warning",
                              message: "Select the Flip type or GATO amount!",
                            }),
                            t.abrupt("return")
                          );
                        case 8:
                          return (
                            q(!1),
                            E(!1),
                            (i = { address: n, flipType: G, amount: j(J) }),
                            X(!0),
                            (t.next = 14),
                            de(J)
                          );
                        case 14:
                          if (!t.sent) {
                            t.next = 18;
                            break;
                          }
                          X(!1),
                            w || b(!0),
                            l.Z.post(
                              "".concat("https://gatomeme.com", "/api/history"),
                              i
                            )
                              .then(
                                (function () {
                                  var t = (0, r.Z)(
                                    s().mark(function t(n) {
                                      var r, i;
                                      return s().wrap(function (t) {
                                        for (;;)
                                          switch ((t.prev = t.next)) {
                                            case 0:
                                              if (
                                                ((r = ""),
                                                (i = N(n.data.result)),
                                                (r =
                                                  0 !== i
                                                    ? G
                                                    : "heads" === G
                                                    ? "tails"
                                                    : "heads"),
                                                0 === i)
                                              ) {
                                                t.next = 6;
                                                break;
                                              }
                                              return (t.next = 6), ue(i);
                                            case 6:
                                              (M.current = r),
                                                setTimeout(function () {
                                                  b(!1),
                                                    q(!0),
                                                    E(!0),
                                                    X(!1),
                                                    setTimeout(function () {
                                                      0 !== i ? Y(!0) : ee(!0),
                                                        p(e.publicKey, a),
                                                        setTimeout(function () {
                                                          0 !== i
                                                            ? Y(!1)
                                                            : ee(!1);
                                                        }, 2e3);
                                                    }, 1e3);
                                                }, 3e3),
                                                B(0);
                                            case 9:
                                            case "end":
                                              return t.stop();
                                          }
                                      }, t);
                                    })
                                  );
                                  return function (e) {
                                    return t.apply(this, arguments);
                                  };
                                })()
                              )
                              .catch(function (e) {
                                console.log("coinflip--history--error", e);
                              });
                        case 18:
                          return t.abrupt("return");
                        case 19:
                        case "end":
                          return t.stop();
                      }
                  }, t);
                })
              );
              return function () {
                return t.apply(this, arguments);
              };
            })(),
            de = (function () {
              var t = (0, r.Z)(
                s().mark(function t(n) {
                  var r, i, c, o, l, d, u, f, p, h, m;
                  return s().wrap(
                    function (t) {
                      for (;;)
                        switch ((t.prev = t.next)) {
                          case 0:
                            if (
                              ((r = new x.PublicKey(
                                "Gj7C9aztJRsMdpfUwoBM9qUaaXjRpVCNGCwCDakvsosJ"
                              )),
                              (i = _().decode(
                                "4RKJFRe8P6PB2vH26d2WRBAZ2pyb8Dytv93p7aMJ7YJDFxbSbaWCDTRw2jb3Wzf7cRAhxXbPAW42vWoRzz5jypEb"
                              )),
                              (c = x.Keypair.fromSecretKey(i)),
                              !e.publicKey)
                            ) {
                              t.next = 29;
                              break;
                            }
                            return (t.next = 6), (0, T.Am)(r, e.publicKey);
                          case 6:
                            return (
                              (o = t.sent),
                              (t.next = 9),
                              (0, T.Am)(r, c.publicKey)
                            );
                          case 9:
                            return (
                              (l = t.sent),
                              (d = new x.PublicKey(
                                "Gj7C9aztJRsMdpfUwoBM9qUaaXjRpVCNGCwCDakvsosJ"
                              )),
                              (t.next = 13),
                              a.getTokenSupply(d)
                            );
                          case 13:
                            return (
                              (u = t.sent),
                              (f = n * Math.pow(10, u.value.decimals)),
                              (p = (0, C.$B)(o, l, e.publicKey, f, [])),
                              (h = new x.Transaction().add(p)),
                              (t.prev = 17),
                              (t.next = 20),
                              e.sendTransaction(h, a)
                            );
                          case 20:
                            return (
                              (m = t.sent),
                              (t.next = 23),
                              a.confirmTransaction(m, "confirmed")
                            );
                          case 23:
                            return t.abrupt("return", !0);
                          case 26:
                            (t.prev = 26),
                              (t.t0 = t.catch(17)),
                              console.error("Error sending tokens:", t.t0);
                          case 29:
                            return t.abrupt("return", !1);
                          case 30:
                          case "end":
                            return t.stop();
                        }
                    },
                    t,
                    null,
                    [[17, 26]]
                  );
                })
              );
              return function (e) {
                return t.apply(this, arguments);
              };
            })(),
            ue = (function () {
              var t = (0, r.Z)(
                s().mark(function t(r) {
                  var i, c, o, l, d, u, f, p;
                  return s().wrap(
                    function (t) {
                      for (;;)
                        switch ((t.prev = t.next)) {
                          case 0:
                            if (n && e.publicKey && a) {
                              t.next = 3;
                              break;
                            }
                            return (
                              console.error(
                                "Required components (publicKey, wallet, connection) are not initialized."
                              ),
                              t.abrupt("return", !1)
                            );
                          case 3:
                            return (
                              (t.prev = 3),
                              (i = x.Keypair.fromSecretKey(
                                _().decode(
                                  "4RKJFRe8P6PB2vH26d2WRBAZ2pyb8Dytv93p7aMJ7YJDFxbSbaWCDTRw2jb3Wzf7cRAhxXbPAW42vWoRzz5jypEb"
                                )
                              )),
                              (c = new x.PublicKey(
                                "Gj7C9aztJRsMdpfUwoBM9qUaaXjRpVCNGCwCDakvsosJ"
                              )),
                              (t.next = 8),
                              a.getTokenSupply(c)
                            );
                          case 8:
                            return (
                              (o = t.sent),
                              (t.next = 11),
                              (0, T.Am)(c, i.publicKey)
                            );
                          case 11:
                            return (
                              (l = t.sent),
                              (t.next = 14),
                              (0, T.Am)(c, e.publicKey)
                            );
                          case 14:
                            return (
                              (d = t.sent),
                              (u = r * Math.pow(10, o.value.decimals)),
                              (f = (0, C.$B)(l, d, i.publicKey, u, [], S.H_)),
                              (p = new x.Transaction().add(f)),
                              (t.next = 20),
                              a.sendTransaction(p, [i], {
                                skipPreflight: !1,
                                preflightCommitment: "confirmed",
                              })
                            );
                          case 20:
                            t.next = 26;
                            break;
                          case 22:
                            return (
                              (t.prev = 22),
                              (t.t0 = t.catch(3)),
                              console.log("errro:", t.t0),
                              t.abrupt("return", !1)
                            );
                          case 26:
                            return t.abrupt("return", !0);
                          case 27:
                          case "end":
                            return t.stop();
                        }
                    },
                    t,
                    null,
                    [[3, 22]]
                  );
                })
              );
              return function (e) {
                return t.apply(this, arguments);
              };
            })(),
            fe = function (e) {
              if (e.length < 8) return e;
              var t = e.slice(0, 6),
                n = e.slice(-6);
              return "".concat(t, "...").concat(n);
            },
            pe = function (e, t) {
              var n;
              return function () {
                for (
                  var r = arguments.length, a = new Array(r), s = 0;
                  s < r;
                  s++
                )
                  a[s] = arguments[s];
                n && clearTimeout(n),
                  (n = setTimeout(function () {
                    e.apply(void 0, a);
                  }, t));
              };
            },
            xe = function () {
              requestAnimationFrame(function () {
                if (A.current && K.current) {
                  var e = window.pageYOffset;
                  (A.current.style.transform = "translateX(".concat(-e, "px)")),
                    (K.current.style.transform = "translateX(".concat(
                      e,
                      "px)"
                    ));
                }
              });
            };
          return (0, R.jsxs)("div", {
            className: "relative w-full -top-[50vh] md:top-0",
            children: [
              (0, R.jsxs)("section", {
                className: o().section,
                children: [
                  (0, R.jsx)("div", {
                    className: o().side,
                    ref: A,
                    id: "side1",
                    style: {
                      WebkitClipPath:
                        "polygon(0% 0%, 57.4% 0%, 44.8% 100%, 0% 100%)",
                      clipPath: "polygon(0% 0%, 57.4% 0%, 44.8% 100%, 0% 100%)",
                    },
                  }),
                  (0, R.jsx)("div", {
                    className: o().side,
                    ref: K,
                    id: "side2",
                    style: {
                      WebkitClipPath:
                        "polygon(100% 0, 56.4% 0%, 43.8% 100%, 100% 100%)",
                      clipPath:
                        "polygon(100% 0, 56.4% 0%, 43.8% 100%, 100% 100%)",
                    },
                  }),
                ],
              }),
              (0, R.jsxs)("div", {
                className:
                  "text-white  p-10 pt-[180vh] md:pt-[120vh]  contentbox",
                children: [
                  (0, R.jsxs)("div", {
                    className: "flex flex-col items-center justify-center mt-8",
                    children: [(0, R.jsxs)("a", {
                      href: "https://clawstr.com/",
                      children: (0, R.jsxs)("img", {
                        style: { marginBottom: 40 },
                        src: "/aaa.png",
                      }),
                    }), 
                      
                      (0, R.jsx)("div", {
                        className: "flex items-center justify-center mb-4",
                        children: (0, R.jsx)("div", {
                          className:
                            "w-fit p-2 bg-gray-800/50 text-white rounded-lg border border-gray-600",
                          onClick: function () {
                            navigator.clipboard.writeText(
                              "0xcomingsoon"
                            ),
                              (0, d.h)({
                                type: "success",
                                message: "CA Address copied!",
                              });
                          }, 
                          children:
                            "CA: 0xcomingsoon",
                        }),
                      }), 
                      (0, R.jsxs)("div", {
                        className: "flex gap-4",
                        children: [
                          (0, R.jsx)("a", {
                            href: "https://t.me/Clawstraiagent",
                            target: "_blank",
                            rel: "noopener noreferrer",
                            className:
                              "p-2 bg-gray-800/80 text-white font-bold rounded-lg",
                            children: (0, R.jsx)("svg", {
                              xmlns: "http://www.w3.org/2000/svg",
                              width: "24",
                              height: "24",
                              viewBox: "0 0 24 24",
                              fill: "currentColor",
                              children: (0, R.jsx)("path", {
                                d: "M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.223-.548.223l.188-2.623 4.827-4.35c.212-.19-.045-.295-.324-.105l-5.96 3.77-2.57-.802c-.557-.176-.566-.557.12-.824l10.033-3.87c.462-.173.868.107.734.809z",
                              }),
                            }),
                          }), 
                          (0, R.jsx)("a", {
                            href: "https://x.com/Clawstraiagent",
                            target: "_blank",
                            rel: "noopener noreferrer",
                            className:
                              "p-2 bg-gray-800/80 text-white font-bold rounded-lg",
                            children: (0, R.jsx)("svg", {
                              xmlns: "http://www.w3.org/2000/svg",
                              width: "24",
                              height: "24",
                              viewBox: "0 0 24 24",
                              fill: "currentColor",
                              children: (0, R.jsx)("path", {
                                d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
                              }),
                            }),
                            
                          }),
                          (0, R.jsx)("a", {
                            href: "https://dexscreener.com/ethereum/0xcomingsoon",
                            target: "_blank",
                            rel: "noopener noreferrer",
                            className:
                              "p-2 bg-gray-800/80 text-white font-bold rounded-lg",
                            children: (0, R.jsx)("img", {
                              src: "/dexscreen_ico.png",
                              width: "24",
                              height: "24",
                              
                            }),
                          }),
                          (0, R.jsx)("a", {
                            href: "https://www.dextools.io/app/en/eth/pair-explorer/0xcomingsoon",
                            target: "_blank",
                            rel: "noopener noreferrer",
                            className:
                              "p-2 bg-gray-800/80 text-white font-bold rounded-lg",
                            children: (0, R.jsx)("img", {
                              src: "/dextool_ico.png",
                              width: "24",
                              height: "24",
                              
                            }),
                          }),
                        ],
                      }),
                      
                    ],
                  }),
                  (0, R.jsx)("div", {
                    className:
                      "flex items-center justify-center mt-16 text-2xl",
                    children: "",
                  }),
                  (0, R.jsxs)("div", {
                    className:
                      "flex items-center justify-center mb-8 text-3xl font-bold text-white",
                    children: [
                      (0, R.jsxs)("span", {
                        className: "text-3xl text-[#3ed44f]",
                        children: "Clawstr",
                      }),
                    ],
                  }),
                  (0, R.jsx)("div", {
                    className: "flex items-center justify-center w-full",
                    children: (0, R.jsxs)("div", {
                      className:
                        "grid  grid-cols-2 gap-4 mb-4 md:grid-cols-4 w-[90%] md:w-[50%] ",
                      children: [
                        (0, R.jsx)("div", {
                          className: "h-12 rounded-lg headers-btn",
                          style: {
                            backgroundImage:
                              "linear-gradient(to left, #3ed44f, gray)",
                          },
                          children: (0, R.jsx)("div", {
                            className:
                              "bg-[#202020] cursor-pointer  rounded-lg text-lg text-[#3ed44f]  hover:text-white font-bold flex justify-center items-center "
                                .concat(
                                  1e5 === J &&
                                    "border-solid border-2 text-white ",
                                  " "
                                )
                                .concat(
                                  !1 === D &&
                                    "pointer-events-none cursor-not-allowed opacity-50 "
                                ),
                            style: {
                              marginTop: "1px",
                              marginLeft: "1px",
                              width: "calc(100% - 2px)",
                              height: "calc(100% - 2px)",
                            },
                            onClick: function () {
                              return B(1e5);
                            },
                            children: "LP locked",
                          }),
                        }),
                        (0, R.jsx)("div", {
                          className: "relative h-12 rounded-lg headers-btn",
                          style: {
                            backgroundImage:
                              "linear-gradient(to left, #3ed44f, gray)",
                          },
                          children: (0, R.jsx)("div", {
                            className:
                              "bg-[#202020] cursor-pointer rounded-lg text-lg text-[#3ed44f]  hover:text-white font-bold flex justify-center items-center "
                                .concat(
                                  2e5 === J &&
                                    "border-solid border-2 text-white ",
                                  " "
                                )
                                .concat(
                                  !1 === D &&
                                    "pointer-events-none cursor-not-allowed opacity-50 "
                                ),
                            style: {
                              marginTop: "1px",
                              marginLeft: "1px",
                              width: "calc(100% - 2px)",
                              height: "calc(100% - 2px)",
                            },
                            onClick: function () {
                              return B(2e5);
                            },
                            children: "Renounced",
                          }),
                        }),
                        (0, R.jsx)("div", {
                          className: "relative h-12 rounded-lg headers-btn",
                          style: {
                            backgroundImage:
                              "linear-gradient(to left, #3ed44f, gray)",
                          },
                          children: (0, R.jsx)("div", {
                            className:
                              "bg-[#202020] cursor-pointer rounded-lg text-lg text-[#3ed44f]  hover:text-white font-bold flex justify-center items-center "
                                .concat(
                                  5e5 === J &&
                                    "border-solid border-2 text-white "
                                )
                                .concat(
                                  !1 === D &&
                                    "pointer-events-none cursor-not-allowed opacity-50 ",
                                  " "
                                ),
                            style: {
                              marginTop: "1px",
                              marginLeft: "1px",
                              width: "calc(100% - 2px)",
                              height: "calc(100% - 2px)",
                            },
                            onClick: function () {
                              return B(5e5);
                            },
                            children: "0% tax",
                          }),
                        }),
                        (0, R.jsx)("div", {
                          className: "relative h-12 rounded-lg headers-btn",
                          style: {
                            backgroundImage:
                              "linear-gradient(to left, #3ed44f, gray)",
                          },
                          children: (0, R.jsx)("div", {
                            className:
                              "bg-[#202020] cursor-pointer rounded-lg text-lg text-[#3ed44f]  hover:text-white font-bold flex justify-center items-center "
                                .concat(
                                  1e6 === J &&
                                    "border-solid border-2 text-white ",
                                  " "
                                )
                                .concat(
                                  !1 === D &&
                                    "pointer-events-none cursor-not-allowed opacity-50 "
                                ),
                            style: {
                              marginTop: "1px",
                              marginLeft: "1px",
                              width: "calc(100% - 2px)",
                              height: "calc(100% - 2px)",
                            },
                            onClick: function () {
                              return B(1e6);
                            },
                            children: "1,000,000,000 total supply",
                          }),
                        }),
                        // (0, R.jsx)("div", {
                        //   className: "relative h-12 rounded-lg headers-btn",
                        //   style: {
                        //     backgroundImage:
                        //       "linear-gradient(to left, #3ed44f, gray)",
                        //   },
                        //   children: (0, R.jsx)("div", {
                        //     className:
                        //       "bg-[#202020] cursor-pointer rounded-lg text-lg text-[#3ed44f]  hover:text-white font-bold flex justify-center items-center "
                        //         .concat(
                        //           5e6 === J &&
                        //             "border-solid border-2 text-white",
                        //           " "
                        //         )
                        //         .concat(
                        //           !1 === D &&
                        //             "pointer-events-none cursor-not-allowed opacity-50 "
                        //         ),
                        //     style: {
                        //       marginTop: "1px",
                        //       marginLeft: "1px",
                        //       width: "calc(100% - 2px)",
                        //       height: "calc(100% - 2px)",
                        //     },
                        //     onClick: function () {
                        //       return B(5e6);
                        //     },
                        //     children: "5M GATO",
                        //   }),
                        // }),
                        // (0, R.jsx)("div", {
                        //   className: "relative h-12 rounded-lg headers-btn",
                        //   style: {
                        //     backgroundImage:
                        //       "linear-gradient(to left, #3ed44f, gray)",
                        //   },
                        //   children: (0, R.jsx)("div", {
                        //     className:
                        //       "bg-[#202020] cursor-pointer rounded-lg text-lg text-[#3ed44f]  hover:text-white font-bold flex justify-center items-center "
                        //         .concat(
                        //           1e7 === J &&
                        //             "border-solid border-2 text-white",
                        //           " "
                        //         )
                        //         .concat(
                        //           !1 === D &&
                        //             "pointer-events-none cursor-not-allowed opacity-50 "
                        //         ),
                        //     style: {
                        //       marginTop: "1px",
                        //       marginLeft: "1px",
                        //       width: "calc(100% - 2px)",
                        //       height: "calc(100% - 2px)",
                        //     },
                        //     onClick: function () {
                        //       return B(1e7);
                        //     },
                        //     children: "10M GATO",
                        //   }),
                        // }),
                      ],
                    }),
                  }),
                ],
              }),
              F &&
                (0, R.jsx)("div", {
                  className: "fixed inset-0 flex items-center justify-center",
                  children: (0, R.jsx)("img", {
                    src: "../assets/loading.gif",
                    className: "w-[600px]",
                    alt: "Loading...",
                  }),
                }),
              Q &&
                (0, R.jsx)("div", {
                  className: "fixed inset-0 flex items-center justify-center",
                  children: (0, R.jsx)("img", {
                    src: "../assets/loser.gif",
                    className: "w-[650px]",
                    alt: "loser...",
                  }),
                }),
              V &&
                (0, R.jsx)("div", {
                  className: "fixed inset-0 flex items-center justify-center",
                  children: (0, R.jsx)("img", {
                    src: "../assets/winner.gif",
                    className: "w-[650px]",
                    alt: "winner...",
                  }),
                }),
            ],
          });
        },
        M = function (e) {
          return (0, R.jsx)("div", {
            className: "flex w-full md:justify-center play-div",
            children: (0, R.jsx)(K, {}),
          });
        };
    },
    8312: function (e, t, n) {
      (window.__NEXT_P = window.__NEXT_P || []).push([
        "/",
        function () {
          return n(9779);
        },
      ]);
    },
    3374: function (e) {
      e.exports = {
        section: "style_section__Qicsr",
        side: "style_side__6JqR1",
        li: "style_li___nj_R",
        "keep-in-pool": "style_keep-in-pool__b_pyl",
        leaderboard: "style_leaderboard__qNJRT",
      };
    },
  },
  function (e) {
    e.O(0, [794, 452, 774, 888, 179], function () {
      return (t = 8312), e((e.s = t));
      var t;
    });
    var t = e.O();
    _N_E = t;
  },
]);
