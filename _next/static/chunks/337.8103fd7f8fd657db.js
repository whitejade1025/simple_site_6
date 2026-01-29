"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [337],
  {
    5337: function (e, t, l) {
      l.r(t),
        l.d(t, {
          BaseWalletConnectButton: function () {
            return c;
          },
          BaseWalletDisconnectButton: function () {
            return s;
          },
          BaseWalletMultiButton: function () {
            return i.X;
          },
          WalletConnectButton: function () {
            return u;
          },
          WalletDisconnectButton: function () {
            return k;
          },
          WalletIcon: function () {
            return w.o;
          },
          WalletModal: function () {
            return b;
          },
          WalletModalButton: function () {
            return g;
          },
          WalletModalContext: function () {
            return a.g;
          },
          WalletModalProvider: function () {
            return v;
          },
          WalletMultiButton: function () {
            return _.a;
          },
          useWalletModal: function () {
            return a.h;
          },
        });
      var a = l(3495),
        n = l(4306),
        o = l(7294);
      var r = l(4293);
      function c({ children: e, disabled: t, labels: l, onClick: a, ...c }) {
        const {
          buttonDisabled: s,
          buttonState: i,
          onButtonClick: d,
          walletIcon: u,
          walletName: m,
        } = (function () {
          const {
            connect: e,
            connected: t,
            connecting: l,
            wallet: a,
          } = (0, n.O)();
          let r;
          r = l
            ? "connecting"
            : t
            ? "connected"
            : a
            ? "has-wallet"
            : "no-wallet";
          const c = (0, o.useCallback)(() => {
            e().catch(() => {});
          }, [e]);
          return {
            buttonDisabled: "has-wallet" !== r,
            buttonState: r,
            onButtonClick: "has-wallet" === r ? c : void 0,
            walletIcon: a?.adapter.icon,
            walletName: a?.adapter.name,
          };
        })();
        return o.createElement(
          r.S,
          {
            ...c,
            disabled: t || s,
            onClick: (e) => {
              a && a(e), e.defaultPrevented || (d && d());
            },
            walletIcon: u,
            walletName: m,
          },
          e || l[i]
        );
      }
      function s({ children: e, disabled: t, labels: l, onClick: a, ...c }) {
        const {
          buttonDisabled: s,
          buttonState: i,
          onButtonClick: d,
          walletIcon: u,
          walletName: m,
        } = (function () {
          const { disconnecting: e, disconnect: t, wallet: l } = (0, n.O)();
          let a;
          a = e ? "disconnecting" : l ? "has-wallet" : "no-wallet";
          const r = (0, o.useCallback)(() => {
            t().catch(() => {});
          }, [t]);
          return {
            buttonDisabled: "has-wallet" !== a,
            buttonState: a,
            onButtonClick: "has-wallet" === a ? r : void 0,
            walletIcon: l?.adapter.icon,
            walletName: l?.adapter.name,
          };
        })();
        return o.createElement(
          r.S,
          {
            ...c,
            disabled: t || s,
            onClick: (e) => {
              a && a(e), e.defaultPrevented || (d && d());
            },
            walletIcon: u,
            walletName: m,
          },
          e || l[i]
        );
      }
      var i = l(3962);
      const d = {
        connecting: "Connecting ...",
        connected: "Connected",
        "has-wallet": "Connect",
        "no-wallet": "Connect Wallet",
      };
      function u(e) {
        return o.createElement(c, { ...e, labels: d });
      }
      var m = l(9607),
        p = l(3935);
      const f = ({ id: e, children: t, expanded: l = !1 }) => {
        const a = (0, o.useRef)(null),
          n = (0, o.useRef)(!0);
        return (
          (0, o.useLayoutEffect)(() => {
            l
              ? (() => {
                  const e = a.current;
                  e &&
                    requestAnimationFrame(() => {
                      e.style.height = e.scrollHeight + "px";
                    });
                })()
              : (() => {
                  const e = a.current;
                  e &&
                    requestAnimationFrame(() => {
                      (e.style.height = e.offsetHeight + "px"),
                        (e.style.overflow = "hidden"),
                        requestAnimationFrame(() => {
                          e.style.height = "0";
                        });
                    });
                })();
          }, [l]),
          (0, o.useLayoutEffect)(() => {
            const e = a.current;
            if (e)
              return (
                n.current && (t(), (n.current = !1)),
                e.addEventListener("transitionend", o),
                () => e.removeEventListener("transitionend", o)
              );
            function t() {
              e &&
                ((e.style.overflow = l ? "initial" : "hidden"),
                l && (e.style.height = "auto"));
            }
            function o(l) {
              e && l.target === e && "height" === l.propertyName && t();
            }
          }, [l]),
          o.createElement(
            "div",
            {
              className: "wallet-adapter-collapse",
              id: e,
              ref: a,
              role: "region",
              style: {
                height: 0,
                transition: n.current ? void 0 : "height 250ms ease-out",
              },
            },
            t
          )
        );
      };
      var C = l(5664),
        w = l(6581);
      const E = ({ handleClick: e, tabIndex: t, wallet: l }) =>
          o.createElement(
            "li",
            null,
            o.createElement(
              C.z,
              {
                onClick: e,
                startIcon: o.createElement(w.o, { wallet: l }),
                tabIndex: t,
              },
              l.adapter.name,
              l.readyState === m.i1.Installed &&
                o.createElement("span", null, "Detected")
            )
          ),
        h = () =>
          o.createElement(
            "svg",
            {
              width: "97",
              height: "96",
              viewBox: "0 0 97 96",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
            },
            o.createElement("circle", {
              cx: "48.5",
              cy: "48",
              r: "48",
              fill: "url(#paint0_linear_880_5115)",
              fillOpacity: "0.1",
            }),
            o.createElement("circle", {
              cx: "48.5",
              cy: "48",
              r: "47",
              stroke: "url(#paint1_linear_880_5115)",
              strokeOpacity: "0.4",
              strokeWidth: "2",
            }),
            o.createElement(
              "g",
              { clipPath: "url(#clip0_880_5115)" },
              o.createElement("path", {
                d: "M65.5769 28.1523H31.4231C27.6057 28.1523 24.5 31.258 24.5 35.0754V60.9215C24.5 64.7389 27.6057 67.8446 31.4231 67.8446H65.5769C69.3943 67.8446 72.5 64.7389 72.5 60.9215V35.0754C72.5 31.258 69.3943 28.1523 65.5769 28.1523ZM69.7308 52.1523H59.5769C57.2865 52.1523 55.4231 50.289 55.4231 47.9985C55.4231 45.708 57.2864 43.8446 59.5769 43.8446H69.7308V52.1523ZM69.7308 41.0754H59.5769C55.7595 41.0754 52.6539 44.1811 52.6539 47.9985C52.6539 51.8159 55.7595 54.9215 59.5769 54.9215H69.7308V60.9215C69.7308 63.2119 67.8674 65.0754 65.5769 65.0754H31.4231C29.1327 65.0754 27.2692 63.212 27.2692 60.9215V35.0754C27.2692 32.785 29.1326 30.9215 31.4231 30.9215H65.5769C67.8673 30.9215 69.7308 32.7849 69.7308 35.0754V41.0754Z",
                fill: "url(#paint2_linear_880_5115)",
              }),
              o.createElement("path", {
                d: "M61.4231 46.6172H59.577C58.8123 46.6172 58.1924 47.2371 58.1924 48.0018C58.1924 48.7665 58.8123 49.3863 59.577 49.3863H61.4231C62.1878 49.3863 62.8077 48.7664 62.8077 48.0018C62.8077 47.2371 62.1878 46.6172 61.4231 46.6172Z",
                fill: "url(#paint3_linear_880_5115)",
              })
            ),
            o.createElement(
              "defs",
              null,
              o.createElement(
                "linearGradient",
                {
                  id: "paint0_linear_880_5115",
                  x1: "3.41664",
                  y1: "98.0933",
                  x2: "103.05",
                  y2: "8.42498",
                  gradientUnits: "userSpaceOnUse",
                },
                o.createElement("stop", { stopColor: "#9945FF" }),
                o.createElement("stop", {
                  offset: "0.14",
                  stopColor: "#8A53F4",
                }),
                o.createElement("stop", {
                  offset: "0.42",
                  stopColor: "#6377D6",
                }),
                o.createElement("stop", {
                  offset: "0.79",
                  stopColor: "#24B0A7",
                }),
                o.createElement("stop", {
                  offset: "0.99",
                  stopColor: "#00D18C",
                }),
                o.createElement("stop", { offset: "1", stopColor: "#00D18C" })
              ),
              o.createElement(
                "linearGradient",
                {
                  id: "paint1_linear_880_5115",
                  x1: "3.41664",
                  y1: "98.0933",
                  x2: "103.05",
                  y2: "8.42498",
                  gradientUnits: "userSpaceOnUse",
                },
                o.createElement("stop", { stopColor: "#9945FF" }),
                o.createElement("stop", {
                  offset: "0.14",
                  stopColor: "#8A53F4",
                }),
                o.createElement("stop", {
                  offset: "0.42",
                  stopColor: "#6377D6",
                }),
                o.createElement("stop", {
                  offset: "0.79",
                  stopColor: "#24B0A7",
                }),
                o.createElement("stop", {
                  offset: "0.99",
                  stopColor: "#00D18C",
                }),
                o.createElement("stop", { offset: "1", stopColor: "#00D18C" })
              ),
              o.createElement(
                "linearGradient",
                {
                  id: "paint2_linear_880_5115",
                  x1: "25.9583",
                  y1: "68.7101",
                  x2: "67.2337",
                  y2: "23.7879",
                  gradientUnits: "userSpaceOnUse",
                },
                o.createElement("stop", { stopColor: "#9945FF" }),
                o.createElement("stop", {
                  offset: "0.14",
                  stopColor: "#8A53F4",
                }),
                o.createElement("stop", {
                  offset: "0.42",
                  stopColor: "#6377D6",
                }),
                o.createElement("stop", {
                  offset: "0.79",
                  stopColor: "#24B0A7",
                }),
                o.createElement("stop", {
                  offset: "0.99",
                  stopColor: "#00D18C",
                }),
                o.createElement("stop", { offset: "1", stopColor: "#00D18C" })
              ),
              o.createElement(
                "linearGradient",
                {
                  id: "paint3_linear_880_5115",
                  x1: "58.3326",
                  y1: "49.4467",
                  x2: "61.0002",
                  y2: "45.4453",
                  gradientUnits: "userSpaceOnUse",
                },
                o.createElement("stop", { stopColor: "#9945FF" }),
                o.createElement("stop", {
                  offset: "0.14",
                  stopColor: "#8A53F4",
                }),
                o.createElement("stop", {
                  offset: "0.42",
                  stopColor: "#6377D6",
                }),
                o.createElement("stop", {
                  offset: "0.79",
                  stopColor: "#24B0A7",
                }),
                o.createElement("stop", {
                  offset: "0.99",
                  stopColor: "#00D18C",
                }),
                o.createElement("stop", { offset: "1", stopColor: "#00D18C" })
              ),
              o.createElement(
                "clipPath",
                { id: "clip0_880_5115" },
                o.createElement("rect", {
                  width: "48",
                  height: "48",
                  fill: "white",
                  transform: "translate(24.5 24)",
                })
              )
            )
          ),
        b = ({ className: e = "", container: t = "body" }) => {
          const l = (0, o.useRef)(null),
            { wallets: r, select: c } = (0, n.O)(),
            { setVisible: s } = (0, a.h)(),
            [i, d] = (0, o.useState)(!1),
            [u, C] = (0, o.useState)(!1),
            [w, b] = (0, o.useState)(null),
            [g, v] = (0, o.useMemo)(() => {
              const e = [],
                t = [];
              for (const l of r)
                l.readyState === m.i1.Installed ? e.push(l) : t.push(l);
              return e.length ? [e, t] : [t, []];
            }, [r]),
            y = (0, o.useCallback)(() => {
              C(!1), setTimeout(() => s(!1), 150);
            }, [s]),
            k = (0, o.useCallback)(
              (e) => {
                e.preventDefault(), y();
              },
              [y]
            ),
            _ = (0, o.useCallback)(
              (e, t) => {
                c(t), k(e);
              },
              [c, k]
            ),
            x = (0, o.useCallback)(() => d(!i), [i]),
            D = (0, o.useCallback)(
              (e) => {
                const t = l.current;
                if (!t) return;
                const a = t.querySelectorAll("button"),
                  n = a[0],
                  o = a[a.length - 1];
                e.shiftKey
                  ? document.activeElement === n &&
                    (o.focus(), e.preventDefault())
                  : document.activeElement === o &&
                    (n.focus(), e.preventDefault());
              },
              [l]
            );
          return (
            (0, o.useLayoutEffect)(() => {
              const e = (e) => {
                  "Escape" === e.key ? y() : "Tab" === e.key && D(e);
                },
                { overflow: t } = window.getComputedStyle(document.body);
              return (
                setTimeout(() => C(!0), 0),
                (document.body.style.overflow = "hidden"),
                window.addEventListener("keydown", e, !1),
                () => {
                  (document.body.style.overflow = t),
                    window.removeEventListener("keydown", e, !1);
                }
              );
            }, [y, D]),
            (0, o.useLayoutEffect)(() => b(document.querySelector(t)), [t]),
            w &&
              (0, p.createPortal)(
                o.createElement(
                  "div",
                  {
                    "aria-labelledby": "wallet-adapter-modal-title",
                    "aria-modal": "true",
                    className: `wallet-adapter-modal ${
                      u && "wallet-adapter-modal-fade-in"
                    } ${e}`,
                    ref: l,
                    role: "dialog",
                  },
                  o.createElement(
                    "div",
                    { className: "wallet-adapter-modal-container" },
                    o.createElement(
                      "div",
                      { className: "wallet-adapter-modal-wrapper" },
                      o.createElement(
                        "button",
                        {
                          onClick: k,
                          className: "wallet-adapter-modal-button-close",
                        },
                        o.createElement(
                          "svg",
                          { width: "14", height: "14" },
                          o.createElement("path", {
                            d: "M14 12.461 8.3 6.772l5.234-5.233L12.006 0 6.772 5.234 1.54 0 0 1.539l5.234 5.233L0 12.006l1.539 1.528L6.772 8.3l5.69 5.7L14 12.461z",
                          })
                        )
                      ),
                      g.length
                        ? o.createElement(
                            o.Fragment,
                            null,
                            o.createElement(
                              "h1",
                              { className: "wallet-adapter-modal-title" },
                              "Connect a wallet on Solana to continue"
                            ),
                            o.createElement(
                              "ul",
                              { className: "wallet-adapter-modal-list" },
                              g.map((e) =>
                                o.createElement(E, {
                                  key: e.adapter.name,
                                  handleClick: (t) => _(t, e.adapter.name),
                                  wallet: e,
                                })
                              ),
                              v.length
                                ? o.createElement(
                                    f,
                                    {
                                      expanded: i,
                                      id: "wallet-adapter-modal-collapse",
                                    },
                                    v.map((e) =>
                                      o.createElement(E, {
                                        key: e.adapter.name,
                                        handleClick: (t) =>
                                          _(t, e.adapter.name),
                                        tabIndex: i ? 0 : -1,
                                        wallet: e,
                                      })
                                    )
                                  )
                                : null
                            ),
                            v.length
                              ? o.createElement(
                                  "button",
                                  {
                                    className: "wallet-adapter-modal-list-more",
                                    onClick: x,
                                    tabIndex: 0,
                                  },
                                  o.createElement(
                                    "span",
                                    null,
                                    i ? "Less " : "More ",
                                    "options"
                                  ),
                                  o.createElement(
                                    "svg",
                                    {
                                      width: "13",
                                      height: "7",
                                      viewBox: "0 0 13 7",
                                      xmlns: "http://www.w3.org/2000/svg",
                                      className:
                                        "" +
                                        (i
                                          ? "wallet-adapter-modal-list-more-icon-rotate"
                                          : ""),
                                    },
                                    o.createElement("path", {
                                      d: "M0.71418 1.626L5.83323 6.26188C5.91574 6.33657 6.0181 6.39652 6.13327 6.43762C6.24844 6.47872 6.37371 6.5 6.50048 6.5C6.62725 6.5 6.75252 6.47872 6.8677 6.43762C6.98287 6.39652 7.08523 6.33657 7.16774 6.26188L12.2868 1.626C12.7753 1.1835 12.3703 0.5 11.6195 0.5H1.37997C0.629216 0.5 0.224175 1.1835 0.71418 1.626Z",
                                    })
                                  )
                                )
                              : null
                          )
                        : o.createElement(
                            o.Fragment,
                            null,
                            o.createElement(
                              "h1",
                              { className: "wallet-adapter-modal-title" },
                              "You'll need a wallet on Solana to continue"
                            ),
                            o.createElement(
                              "div",
                              { className: "wallet-adapter-modal-middle" },
                              o.createElement(h, null)
                            ),
                            v.length
                              ? o.createElement(
                                  o.Fragment,
                                  null,
                                  o.createElement(
                                    "button",
                                    {
                                      className:
                                        "wallet-adapter-modal-list-more",
                                      onClick: x,
                                      tabIndex: 0,
                                    },
                                    o.createElement(
                                      "span",
                                      null,
                                      i
                                        ? "Hide "
                                        : "Already have a wallet? View ",
                                      "options"
                                    ),
                                    o.createElement(
                                      "svg",
                                      {
                                        width: "13",
                                        height: "7",
                                        viewBox: "0 0 13 7",
                                        xmlns: "http://www.w3.org/2000/svg",
                                        className:
                                          "" +
                                          (i
                                            ? "wallet-adapter-modal-list-more-icon-rotate"
                                            : ""),
                                      },
                                      o.createElement("path", {
                                        d: "M0.71418 1.626L5.83323 6.26188C5.91574 6.33657 6.0181 6.39652 6.13327 6.43762C6.24844 6.47872 6.37371 6.5 6.50048 6.5C6.62725 6.5 6.75252 6.47872 6.8677 6.43762C6.98287 6.39652 7.08523 6.33657 7.16774 6.26188L12.2868 1.626C12.7753 1.1835 12.3703 0.5 11.6195 0.5H1.37997C0.629216 0.5 0.224175 1.1835 0.71418 1.626Z",
                                      })
                                    )
                                  ),
                                  o.createElement(
                                    f,
                                    {
                                      expanded: i,
                                      id: "wallet-adapter-modal-collapse",
                                    },
                                    o.createElement(
                                      "ul",
                                      {
                                        className: "wallet-adapter-modal-list",
                                      },
                                      v.map((e) =>
                                        o.createElement(E, {
                                          key: e.adapter.name,
                                          handleClick: (t) =>
                                            _(t, e.adapter.name),
                                          tabIndex: i ? 0 : -1,
                                          wallet: e,
                                        })
                                      )
                                    )
                                  )
                                )
                              : null
                          )
                    )
                  ),
                  o.createElement("div", {
                    className: "wallet-adapter-modal-overlay",
                    onMouseDown: k,
                  })
                ),
                w
              )
          );
        },
        g = ({ children: e = "Live Chart", onClick: t, ...l }) => {
          const { visible: n, setVisible: r } = (0, a.h)(),
            c = (0, o.useCallback)(
              (e) => {
                t && t(e), e.defaultPrevented || r(!n);
              },
              [t, r, n]
            );
          return o.createElement(
            C.z,
            { ...l, className: "wallet-adapter-button-trigger", onClick: c },
            e
          );
        },
        v = ({ children: e, ...t }) => {
          const [l, n] = (0, o.useState)(!1);
          return o.createElement(
            a.g.Provider,
            { value: { visible: l, setVisible: n } },
            e,
            l && o.createElement(b, { ...t })
          );
        },
        y = {
          disconnecting: "Disconnecting ...",
          "has-wallet": "Disconnect",
          "no-wallet": "Disconnect Wallet",
        };
      function k(e) {
        return o.createElement(s, { ...e, labels: y });
      }
      var _ = l(2640);
    },
  },
]);
