(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [888],
  {
    7665: function (t) {
      "use strict";
      t.exports = function (t) {
        if (t.length >= 255) throw new TypeError("Alphabet too long");
        for (var e = new Uint8Array(256), n = 0; n < e.length; n++) e[n] = 255;
        for (var r = 0; r < t.length; r++) {
          var i = t.charAt(r),
            o = i.charCodeAt(0);
          if (255 !== e[o]) throw new TypeError(i + " is ambiguous");
          e[o] = r;
        }
        var s = t.length,
          a = t.charAt(0),
          c = Math.log(s) / Math.log(256),
          u = Math.log(256) / Math.log(s);
        function h(t) {
          if ("string" !== typeof t) throw new TypeError("Expected String");
          if (0 === t.length) return new Uint8Array();
          for (var n = 0, r = 0, i = 0; t[n] === a; ) r++, n++;
          for (
            var o = ((t.length - n) * c + 1) >>> 0, u = new Uint8Array(o);
            t[n];

          ) {
            var h = e[t.charCodeAt(n)];
            if (255 === h) return;
            for (var l = 0, d = o - 1; (0 !== h || l < i) && -1 !== d; d--, l++)
              (h += (s * u[d]) >>> 0),
                (u[d] = h % 256 >>> 0),
                (h = (h / 256) >>> 0);
            if (0 !== h) throw new Error("Non-zero carry");
            (i = l), n++;
          }
          for (var f = o - i; f !== o && 0 === u[f]; ) f++;
          for (var p = new Uint8Array(r + (o - f)), y = r; f !== o; )
            p[y++] = u[f++];
          return p;
        }
        return {
          encode: function (e) {
            if (
              (e instanceof Uint8Array ||
                (ArrayBuffer.isView(e)
                  ? (e = new Uint8Array(e.buffer, e.byteOffset, e.byteLength))
                  : Array.isArray(e) && (e = Uint8Array.from(e))),
              !(e instanceof Uint8Array))
            )
              throw new TypeError("Expected Uint8Array");
            if (0 === e.length) return "";
            for (var n = 0, r = 0, i = 0, o = e.length; i !== o && 0 === e[i]; )
              i++, n++;
            for (
              var c = ((o - i) * u + 1) >>> 0, h = new Uint8Array(c);
              i !== o;

            ) {
              for (
                var l = e[i], d = 0, f = c - 1;
                (0 !== l || d < r) && -1 !== f;
                f--, d++
              )
                (l += (256 * h[f]) >>> 0),
                  (h[f] = l % s >>> 0),
                  (l = (l / s) >>> 0);
              if (0 !== l) throw new Error("Non-zero carry");
              (r = d), i++;
            }
            for (var p = c - r; p !== c && 0 === h[p]; ) p++;
            for (var y = a.repeat(n); p < c; ++p) y += t.charAt(h[p]);
            return y;
          },
          decodeUnsafe: h,
          decode: function (t) {
            var e = h(t);
            if (e) return e;
            throw new Error("Non-base" + s + " character");
          },
        };
      };
    },
    5019: function (t, e, n) {
      const r = n(7665);
      t.exports = r(
        "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
      );
    },
    9386: function (t, e, n) {
      "use strict";
      (e._O = e.Jq = e.KB = e.u8 = e.cv = void 0),
        (e.Ik = e.A9 = e.n_ = e.gM = void 0);
      const r = n(8764);
      function i(t) {
        if (!(t instanceof Uint8Array))
          throw new TypeError("b must be a Uint8Array");
      }
      function o(t) {
        return i(t), r.Buffer.from(t.buffer, t.byteOffset, t.length);
      }
      class s {
        constructor(t, e) {
          if (!Number.isInteger(t))
            throw new TypeError("span must be an integer");
          (this.span = t), (this.property = e);
        }
        makeDestinationObject() {
          return {};
        }
        getSpan(t, e) {
          if (0 > this.span) throw new RangeError("indeterminate span");
          return this.span;
        }
        replicate(t) {
          const e = Object.create(this.constructor.prototype);
          return Object.assign(e, this), (e.property = t), e;
        }
        fromArray(t) {}
      }
      function a(t, e) {
        return e.property ? t + "[" + e.property + "]" : t;
      }
      class c extends s {
        isCount() {
          throw new Error("ExternalLayout is abstract");
        }
      }
      class u extends c {
        constructor(t = 1, e) {
          if (!Number.isInteger(t) || 0 >= t)
            throw new TypeError("elementSpan must be a (positive) integer");
          super(-1, e), (this.elementSpan = t);
        }
        isCount() {
          return !0;
        }
        decode(t, e = 0) {
          i(t);
          const n = t.length - e;
          return Math.floor(n / this.elementSpan);
        }
        encode(t, e, n) {
          return 0;
        }
      }
      class h extends c {
        constructor(t, e = 0, n) {
          if (!(t instanceof s)) throw new TypeError("layout must be a Layout");
          if (!Number.isInteger(e))
            throw new TypeError("offset must be integer or undefined");
          super(t.span, n || t.property), (this.layout = t), (this.offset = e);
        }
        isCount() {
          return this.layout instanceof l || this.layout instanceof d;
        }
        decode(t, e = 0) {
          return this.layout.decode(t, e + this.offset);
        }
        encode(t, e, n = 0) {
          return this.layout.encode(t, e, n + this.offset);
        }
      }
      class l extends s {
        constructor(t, e) {
          if ((super(t, e), 6 < this.span))
            throw new RangeError("span must not exceed 6 bytes");
        }
        decode(t, e = 0) {
          return o(t).readUIntLE(e, this.span);
        }
        encode(t, e, n = 0) {
          return o(e).writeUIntLE(t, n, this.span), this.span;
        }
      }
      class d extends s {
        constructor(t, e) {
          if ((super(t, e), 6 < this.span))
            throw new RangeError("span must not exceed 6 bytes");
        }
        decode(t, e = 0) {
          return o(t).readUIntBE(e, this.span);
        }
        encode(t, e, n = 0) {
          return o(e).writeUIntBE(t, n, this.span), this.span;
        }
      }
      class f extends s {
        constructor(t, e) {
          if ((super(t, e), 6 < this.span))
            throw new RangeError("span must not exceed 6 bytes");
        }
        decode(t, e = 0) {
          return o(t).readIntLE(e, this.span);
        }
        encode(t, e, n = 0) {
          return o(e).writeIntLE(t, n, this.span), this.span;
        }
      }
      class p extends s {
        constructor(t, e) {
          if ((super(t, e), 6 < this.span))
            throw new RangeError("span must not exceed 6 bytes");
        }
        decode(t, e = 0) {
          return o(t).readIntBE(e, this.span);
        }
        encode(t, e, n = 0) {
          return o(e).writeIntBE(t, n, this.span), this.span;
        }
      }
      const y = Math.pow(2, 32);
      function g(t) {
        const e = Math.floor(t / y);
        return { hi32: e, lo32: t - e * y };
      }
      function m(t, e) {
        return t * y + e;
      }
      class w extends s {
        constructor(t) {
          super(8, t);
        }
        decode(t, e = 0) {
          const n = o(t),
            r = n.readUInt32LE(e);
          return m(n.readUInt32LE(e + 4), r);
        }
        encode(t, e, n = 0) {
          const r = g(t),
            i = o(e);
          return i.writeUInt32LE(r.lo32, n), i.writeUInt32LE(r.hi32, n + 4), 8;
        }
      }
      class b extends s {
        constructor(t) {
          super(8, t);
        }
        decode(t, e = 0) {
          const n = o(t);
          return m(n.readUInt32BE(e), n.readUInt32BE(e + 4));
        }
        encode(t, e, n = 0) {
          const r = g(t),
            i = o(e);
          return i.writeUInt32BE(r.hi32, n), i.writeUInt32BE(r.lo32, n + 4), 8;
        }
      }
      class v extends s {
        constructor(t) {
          super(8, t);
        }
        decode(t, e = 0) {
          const n = o(t),
            r = n.readUInt32LE(e);
          return m(n.readInt32LE(e + 4), r);
        }
        encode(t, e, n = 0) {
          const r = g(t),
            i = o(e);
          return i.writeUInt32LE(r.lo32, n), i.writeInt32LE(r.hi32, n + 4), 8;
        }
      }
      class k extends s {
        constructor(t) {
          super(8, t);
        }
        decode(t, e = 0) {
          const n = o(t);
          return m(n.readInt32BE(e), n.readUInt32BE(e + 4));
        }
        encode(t, e, n = 0) {
          const r = g(t),
            i = o(e);
          return i.writeInt32BE(r.hi32, n), i.writeUInt32BE(r.lo32, n + 4), 8;
        }
      }
      class S extends s {
        constructor(t) {
          super(4, t);
        }
        decode(t, e = 0) {
          return o(t).readFloatLE(e);
        }
        encode(t, e, n = 0) {
          return o(e).writeFloatLE(t, n), 4;
        }
      }
      class M extends s {
        constructor(t) {
          super(4, t);
        }
        decode(t, e = 0) {
          return o(t).readFloatBE(e);
        }
        encode(t, e, n = 0) {
          return o(e).writeFloatBE(t, n), 4;
        }
      }
      class I extends s {
        constructor(t) {
          super(8, t);
        }
        decode(t, e = 0) {
          return o(t).readDoubleLE(e);
        }
        encode(t, e, n = 0) {
          return o(e).writeDoubleLE(t, n), 8;
        }
      }
      class E extends s {
        constructor(t) {
          super(8, t);
        }
        decode(t, e = 0) {
          return o(t).readDoubleBE(e);
        }
        encode(t, e, n = 0) {
          return o(e).writeDoubleBE(t, n), 8;
        }
      }
      class _ extends s {
        constructor(t, e, n) {
          if (!(t instanceof s))
            throw new TypeError("elementLayout must be a Layout");
          if (
            !(
              (e instanceof c && e.isCount()) ||
              (Number.isInteger(e) && 0 <= e)
            )
          )
            throw new TypeError(
              "count must be non-negative integer or an unsigned integer ExternalLayout"
            );
          let r = -1;
          !(e instanceof c) && 0 < t.span && (r = e * t.span),
            super(r, n),
            (this.elementLayout = t),
            (this.count = e);
        }
        getSpan(t, e = 0) {
          if (0 <= this.span) return this.span;
          let n = 0,
            r = this.count;
          if (
            (r instanceof c && (r = r.decode(t, e)),
            0 < this.elementLayout.span)
          )
            n = r * this.elementLayout.span;
          else {
            let i = 0;
            for (; i < r; ) (n += this.elementLayout.getSpan(t, e + n)), ++i;
          }
          return n;
        }
        decode(t, e = 0) {
          const n = [];
          let r = 0,
            i = this.count;
          for (i instanceof c && (i = i.decode(t, e)); r < i; )
            n.push(this.elementLayout.decode(t, e)),
              (e += this.elementLayout.getSpan(t, e)),
              (r += 1);
          return n;
        }
        encode(t, e, n = 0) {
          const r = this.elementLayout,
            i = t.reduce((t, i) => t + r.encode(i, e, n + t), 0);
          return (
            this.count instanceof c && this.count.encode(t.length, e, n), i
          );
        }
      }
      class A extends s {
        constructor(t, e, n) {
          if (!Array.isArray(t) || !t.reduce((t, e) => t && e instanceof s, !0))
            throw new TypeError("fields must be array of Layout instances");
          "boolean" === typeof e && void 0 === n && ((n = e), (e = void 0));
          for (const o of t)
            if (0 > o.span && void 0 === o.property)
              throw new Error(
                "fields cannot contain unnamed variable-length layout"
              );
          let r = -1;
          try {
            r = t.reduce((t, e) => t + e.getSpan(), 0);
          } catch (i) {}
          super(r, e), (this.fields = t), (this.decodePrefixes = !!n);
        }
        getSpan(t, e = 0) {
          if (0 <= this.span) return this.span;
          let n = 0;
          try {
            n = this.fields.reduce((n, r) => {
              const i = r.getSpan(t, e);
              return (e += i), n + i;
            }, 0);
          } catch (r) {
            throw new RangeError("indeterminate span");
          }
          return n;
        }
        decode(t, e = 0) {
          i(t);
          const n = this.makeDestinationObject();
          for (const r of this.fields)
            if (
              (void 0 !== r.property && (n[r.property] = r.decode(t, e)),
              (e += r.getSpan(t, e)),
              this.decodePrefixes && t.length === e)
            )
              break;
          return n;
        }
        encode(t, e, n = 0) {
          const r = n;
          let i = 0,
            o = 0;
          for (const s of this.fields) {
            let r = s.span;
            if (((o = 0 < r ? r : 0), void 0 !== s.property)) {
              const i = t[s.property];
              void 0 !== i &&
                ((o = s.encode(i, e, n)), 0 > r && (r = s.getSpan(e, n)));
            }
            (i = n), (n += r);
          }
          return i + o - r;
        }
        fromArray(t) {
          const e = this.makeDestinationObject();
          for (const n of this.fields)
            void 0 !== n.property &&
              0 < t.length &&
              (e[n.property] = t.shift());
          return e;
        }
        layoutFor(t) {
          if ("string" !== typeof t)
            throw new TypeError("property must be string");
          for (const e of this.fields) if (e.property === t) return e;
        }
        offsetOf(t) {
          if ("string" !== typeof t)
            throw new TypeError("property must be string");
          let e = 0;
          for (const n of this.fields) {
            if (n.property === t) return e;
            0 > n.span ? (e = -1) : 0 <= e && (e += n.span);
          }
        }
      }
      class x {
        constructor(t) {
          this.property = t;
        }
        decode(t, e) {
          throw new Error("UnionDiscriminator is abstract");
        }
        encode(t, e, n) {
          throw new Error("UnionDiscriminator is abstract");
        }
      }
      class L extends x {
        constructor(t, e) {
          if (!(t instanceof c && t.isCount()))
            throw new TypeError(
              "layout must be an unsigned integer ExternalLayout"
            );
          super(e || t.property || "variant"), (this.layout = t);
        }
        decode(t, e) {
          return this.layout.decode(t, e);
        }
        encode(t, e, n) {
          return this.layout.encode(t, e, n);
        }
      }
      class T extends s {
        constructor(t, e, n) {
          let r;
          if (t instanceof l || t instanceof d) r = new L(new h(t));
          else if (t instanceof c && t.isCount()) r = new L(t);
          else {
            if (!(t instanceof x))
              throw new TypeError(
                "discr must be a UnionDiscriminator or an unsigned integer layout"
              );
            r = t;
          }
          if ((void 0 === e && (e = null), !(null === e || e instanceof s)))
            throw new TypeError("defaultLayout must be null or a Layout");
          if (null !== e) {
            if (0 > e.span)
              throw new Error("defaultLayout must have constant span");
            void 0 === e.property && (e = e.replicate("content"));
          }
          let i = -1;
          e &&
            ((i = e.span),
            0 <= i &&
              (t instanceof l || t instanceof d) &&
              (i += r.layout.span)),
            super(i, n),
            (this.discriminator = r),
            (this.usesPrefixDiscriminator = t instanceof l || t instanceof d),
            (this.defaultLayout = e),
            (this.registry = {});
          let o = this.defaultGetSourceVariant.bind(this);
          (this.getSourceVariant = function (t) {
            return o(t);
          }),
            (this.configGetSourceVariant = function (t) {
              o = t.bind(this);
            });
        }
        getSpan(t, e = 0) {
          if (0 <= this.span) return this.span;
          const n = this.getVariant(t, e);
          if (!n)
            throw new Error(
              "unable to determine span for unrecognized variant"
            );
          return n.getSpan(t, e);
        }
        defaultGetSourceVariant(t) {
          if (
            Object.prototype.hasOwnProperty.call(t, this.discriminator.property)
          ) {
            if (
              this.defaultLayout &&
              this.defaultLayout.property &&
              Object.prototype.hasOwnProperty.call(
                t,
                this.defaultLayout.property
              )
            )
              return;
            const e = this.registry[t[this.discriminator.property]];
            if (
              e &&
              (!e.layout ||
                (e.property &&
                  Object.prototype.hasOwnProperty.call(t, e.property)))
            )
              return e;
          } else
            for (const e in this.registry) {
              const n = this.registry[e];
              if (
                n.property &&
                Object.prototype.hasOwnProperty.call(t, n.property)
              )
                return n;
            }
          throw new Error("unable to infer src variant");
        }
        decode(t, e = 0) {
          let n;
          const r = this.discriminator,
            i = r.decode(t, e),
            o = this.registry[i];
          if (void 0 === o) {
            const o = this.defaultLayout;
            let s = 0;
            this.usesPrefixDiscriminator && (s = r.layout.span),
              (n = this.makeDestinationObject()),
              (n[r.property] = i),
              (n[o.property] = o.decode(t, e + s));
          } else n = o.decode(t, e);
          return n;
        }
        encode(t, e, n = 0) {
          const r = this.getSourceVariant(t);
          if (void 0 === r) {
            const r = this.discriminator,
              i = this.defaultLayout;
            let o = 0;
            return (
              this.usesPrefixDiscriminator && (o = r.layout.span),
              r.encode(t[r.property], e, n),
              o + i.encode(t[i.property], e, n + o)
            );
          }
          return r.encode(t, e, n);
        }
        addVariant(t, e, n) {
          const r = new N(this, t, e, n);
          return (this.registry[t] = r), r;
        }
        getVariant(t, e = 0) {
          let n;
          return (
            (n = t instanceof Uint8Array ? this.discriminator.decode(t, e) : t),
            this.registry[n]
          );
        }
      }
      class N extends s {
        constructor(t, e, n, r) {
          if (!(t instanceof T)) throw new TypeError("union must be a Union");
          if (!Number.isInteger(e) || 0 > e)
            throw new TypeError("variant must be a (non-negative) integer");
          if (
            ("string" === typeof n && void 0 === r && ((r = n), (n = null)), n)
          ) {
            if (!(n instanceof s))
              throw new TypeError("layout must be a Layout");
            if (
              null !== t.defaultLayout &&
              0 <= n.span &&
              n.span > t.defaultLayout.span
            )
              throw new Error("variant span exceeds span of containing union");
            if ("string" !== typeof r)
              throw new TypeError("variant must have a String property");
          }
          let i = t.span;
          0 > t.span &&
            ((i = n ? n.span : 0),
            0 <= i &&
              t.usesPrefixDiscriminator &&
              (i += t.discriminator.layout.span)),
            super(i, r),
            (this.union = t),
            (this.variant = e),
            (this.layout = n || null);
        }
        getSpan(t, e = 0) {
          if (0 <= this.span) return this.span;
          let n = 0;
          this.union.usesPrefixDiscriminator &&
            (n = this.union.discriminator.layout.span);
          let r = 0;
          return this.layout && (r = this.layout.getSpan(t, e + n)), n + r;
        }
        decode(t, e = 0) {
          const n = this.makeDestinationObject();
          if (this !== this.union.getVariant(t, e))
            throw new Error("variant mismatch");
          let r = 0;
          return (
            this.union.usesPrefixDiscriminator &&
              (r = this.union.discriminator.layout.span),
            this.layout
              ? (n[this.property] = this.layout.decode(t, e + r))
              : this.property
              ? (n[this.property] = !0)
              : this.union.usesPrefixDiscriminator &&
                (n[this.union.discriminator.property] = this.variant),
            n
          );
        }
        encode(t, e, n = 0) {
          let r = 0;
          if (
            (this.union.usesPrefixDiscriminator &&
              (r = this.union.discriminator.layout.span),
            this.layout &&
              !Object.prototype.hasOwnProperty.call(t, this.property))
          )
            throw new TypeError("variant lacks property " + this.property);
          this.union.discriminator.encode(this.variant, e, n);
          let i = r;
          if (
            this.layout &&
            (this.layout.encode(t[this.property], e, n + r),
            (i += this.layout.getSpan(e, n + r)),
            0 <= this.union.span && i > this.union.span)
          )
            throw new Error("encoded variant overruns containing union");
          return i;
        }
        fromArray(t) {
          if (this.layout) return this.layout.fromArray(t);
        }
      }
      function O(t) {
        return 0 > t && (t += 4294967296), t;
      }
      class B extends s {
        constructor(t, e, n) {
          if (!(t instanceof l || t instanceof d))
            throw new TypeError("word must be a UInt or UIntBE layout");
          if (
            ("string" === typeof e && void 0 === n && ((n = e), (e = !1)),
            4 < t.span)
          )
            throw new RangeError("word cannot exceed 32 bits");
          super(t.span, n),
            (this.word = t),
            (this.msb = !!e),
            (this.fields = []);
          let r = 0;
          (this._packedSetValue = function (t) {
            return (r = O(t)), this;
          }),
            (this._packedGetValue = function () {
              return r;
            });
        }
        decode(t, e = 0) {
          const n = this.makeDestinationObject(),
            r = this.word.decode(t, e);
          this._packedSetValue(r);
          for (const i of this.fields)
            void 0 !== i.property && (n[i.property] = i.decode(t));
          return n;
        }
        encode(t, e, n = 0) {
          const r = this.word.decode(e, n);
          this._packedSetValue(r);
          for (const i of this.fields)
            if (void 0 !== i.property) {
              const e = t[i.property];
              void 0 !== e && i.encode(e);
            }
          return this.word.encode(this._packedGetValue(), e, n);
        }
        addField(t, e) {
          const n = new j(this, t, e);
          return this.fields.push(n), n;
        }
        addBoolean(t) {
          const e = new P(this, t);
          return this.fields.push(e), e;
        }
        fieldFor(t) {
          if ("string" !== typeof t)
            throw new TypeError("property must be string");
          for (const e of this.fields) if (e.property === t) return e;
        }
      }
      class j {
        constructor(t, e, n) {
          if (!(t instanceof B))
            throw new TypeError("container must be a BitStructure");
          if (!Number.isInteger(e) || 0 >= e)
            throw new TypeError("bits must be positive integer");
          const r = 8 * t.span,
            i = t.fields.reduce((t, e) => t + e.bits, 0);
          if (e + i > r)
            throw new Error(
              "bits too long for span remainder (" +
                (r - i) +
                " of " +
                r +
                " remain)"
            );
          (this.container = t),
            (this.bits = e),
            (this.valueMask = (1 << e) - 1),
            32 === e && (this.valueMask = 4294967295),
            (this.start = i),
            this.container.msb && (this.start = r - i - e),
            (this.wordMask = O(this.valueMask << this.start)),
            (this.property = n);
        }
        decode(t, e) {
          return (
            O(this.container._packedGetValue() & this.wordMask) >>> this.start
          );
        }
        encode(t) {
          if (
            "number" !== typeof t ||
            !Number.isInteger(t) ||
            t !== O(t & this.valueMask)
          )
            throw new TypeError(
              a("BitField.encode", this) +
                " value must be integer not exceeding " +
                this.valueMask
            );
          const e = this.container._packedGetValue(),
            n = O(t << this.start);
          this.container._packedSetValue(O(e & ~this.wordMask) | n);
        }
      }
      class P extends j {
        constructor(t, e) {
          super(t, 1, e);
        }
        decode(t, e) {
          return !!super.decode(t, e);
        }
        encode(t) {
          "boolean" === typeof t && (t = +t), super.encode(t);
        }
      }
      class C extends s {
        constructor(t, e) {
          if (
            !(
              (t instanceof c && t.isCount()) ||
              (Number.isInteger(t) && 0 <= t)
            )
          )
            throw new TypeError(
              "length must be positive integer or an unsigned integer ExternalLayout"
            );
          let n = -1;
          t instanceof c || (n = t), super(n, e), (this.length = t);
        }
        getSpan(t, e) {
          let n = this.span;
          return 0 > n && (n = this.length.decode(t, e)), n;
        }
        decode(t, e = 0) {
          let n = this.span;
          return 0 > n && (n = this.length.decode(t, e)), o(t).slice(e, e + n);
        }
        encode(t, e, n) {
          let r = this.length;
          if (
            (this.length instanceof c && (r = t.length),
            !(t instanceof Uint8Array && r === t.length))
          )
            throw new TypeError(
              a("Blob.encode", this) +
                " requires (length " +
                r +
                ") Uint8Array as src"
            );
          if (n + r > e.length)
            throw new RangeError("encoding overruns Uint8Array");
          const i = o(t);
          return (
            o(e).write(i.toString("hex"), n, r, "hex"),
            this.length instanceof c && this.length.encode(r, e, n),
            r
          );
        }
      }
      class R extends s {
        constructor(t) {
          super(-1, t);
        }
        getSpan(t, e = 0) {
          i(t);
          let n = e;
          for (; n < t.length && 0 !== t[n]; ) n += 1;
          return 1 + n - e;
        }
        decode(t, e = 0) {
          const n = this.getSpan(t, e);
          return o(t)
            .slice(e, e + n - 1)
            .toString("utf-8");
        }
        encode(t, e, n = 0) {
          "string" !== typeof t && (t = String(t));
          const i = r.Buffer.from(t, "utf8"),
            s = i.length;
          if (n + s > e.length)
            throw new RangeError("encoding overruns Buffer");
          const a = o(e);
          return i.copy(a, n), (a[n + s] = 0), s + 1;
        }
      }
      class z extends s {
        constructor(t, e) {
          if (
            ("string" === typeof t && void 0 === e && ((e = t), (t = void 0)),
            void 0 === t)
          )
            t = -1;
          else if (!Number.isInteger(t))
            throw new TypeError("maxSpan must be an integer");
          super(-1, e), (this.maxSpan = t);
        }
        getSpan(t, e = 0) {
          return i(t), t.length - e;
        }
        decode(t, e = 0) {
          const n = this.getSpan(t, e);
          if (0 <= this.maxSpan && this.maxSpan < n)
            throw new RangeError("text length exceeds maxSpan");
          return o(t)
            .slice(e, e + n)
            .toString("utf-8");
        }
        encode(t, e, n = 0) {
          "string" !== typeof t && (t = String(t));
          const i = r.Buffer.from(t, "utf8"),
            s = i.length;
          if (0 <= this.maxSpan && this.maxSpan < s)
            throw new RangeError("text length exceeds maxSpan");
          if (n + s > e.length)
            throw new RangeError("encoding overruns Buffer");
          return i.copy(o(e), n), s;
        }
      }
      class D extends s {
        constructor(t, e) {
          super(0, e), (this.value = t);
        }
        decode(t, e) {
          return this.value;
        }
        encode(t, e, n) {
          return 0;
        }
      }
      (e.cv = (t, e, n) => new h(t, e, n)),
        (e.u8 = (t) => new l(1, t)),
        (e.KB = (t) => new l(2, t)),
        (e.Jq = (t) => new l(4, t)),
        (e._O = (t) => new w(t)),
        (e.gM = (t) => new v(t)),
        (e.n_ = (t, e, n) => new A(t, e, n)),
        (e.A9 = (t, e, n) => new _(t, e, n)),
        (e.Ik = (t, e) => new C(t, e));
    },
    282: function (t, e, n) {
      "use strict";
      n.r(e),
        n.d(e, {
          Account: function () {
            return Qn;
          },
          AddressLookupTableAccount: function () {
            return ai;
          },
          AddressLookupTableInstruction: function () {
            return ns;
          },
          AddressLookupTableProgram: function () {
            return rs;
          },
          Authorized: function () {
            return ps;
          },
          BLOCKHASH_CACHE_TIMEOUT_MS: function () {
            return fi;
          },
          BPF_LOADER_DEPRECATED_PROGRAM_ID: function () {
            return Jn;
          },
          BPF_LOADER_PROGRAM_ID: function () {
            return Vr;
          },
          BpfLoader: function () {
            return $r;
          },
          COMPUTE_BUDGET_INSTRUCTION_LAYOUTS: function () {
            return os;
          },
          ComputeBudgetInstruction: function () {
            return is;
          },
          ComputeBudgetProgram: function () {
            return ss;
          },
          Connection: function () {
            return Xo;
          },
          Ed25519Program: function () {
            return cs;
          },
          Enum: function () {
            return qn;
          },
          EpochSchedule: function () {
            return ei;
          },
          FeeCalculatorLayout: function () {
            return Cr;
          },
          Keypair: function () {
            return ts;
          },
          LAMPORTS_PER_SOL: function () {
            return Rs;
          },
          LOOKUP_TABLE_INSTRUCTION_LAYOUTS: function () {
            return es;
          },
          Loader: function () {
            return Yr;
          },
          Lockup: function () {
            return ys;
          },
          MAX_SEED_LENGTH: function () {
            return Vn;
          },
          Message: function () {
            return pr;
          },
          MessageAccountKeys: function () {
            return or;
          },
          MessageV0: function () {
            return yr;
          },
          NONCE_ACCOUNT_LENGTH: function () {
            return zr;
          },
          NonceAccount: function () {
            return Dr;
          },
          PACKET_DATA_SIZE: function () {
            return Xn;
          },
          PUBLIC_KEY_LENGTH: function () {
            return $n;
          },
          PublicKey: function () {
            return Gn;
          },
          SIGNATURE_LENGTH_IN_BYTES: function () {
            return er;
          },
          SOLANA_SCHEMA: function () {
            return Hn;
          },
          STAKE_CONFIG_ID: function () {
            return fs;
          },
          STAKE_INSTRUCTION_LAYOUTS: function () {
            return ms;
          },
          SYSTEM_INSTRUCTION_LAYOUTS: function () {
            return qr;
          },
          SYSVAR_CLOCK_PUBKEY: function () {
            return Mr;
          },
          SYSVAR_EPOCH_SCHEDULE_PUBKEY: function () {
            return Ir;
          },
          SYSVAR_INSTRUCTIONS_PUBKEY: function () {
            return Er;
          },
          SYSVAR_RECENT_BLOCKHASHES_PUBKEY: function () {
            return _r;
          },
          SYSVAR_RENT_PUBKEY: function () {
            return Ar;
          },
          SYSVAR_REWARDS_PUBKEY: function () {
            return xr;
          },
          SYSVAR_SLOT_HASHES_PUBKEY: function () {
            return Lr;
          },
          SYSVAR_SLOT_HISTORY_PUBKEY: function () {
            return Tr;
          },
          SYSVAR_STAKE_HISTORY_PUBKEY: function () {
            return Nr;
          },
          Secp256k1Program: function () {
            return ls;
          },
          SendTransactionError: function () {
            return ni;
          },
          SolanaJSONRPCError: function () {
            return ii;
          },
          SolanaJSONRPCErrorCode: function () {
            return ri;
          },
          StakeAuthorizationLayout: function () {
            return ws;
          },
          StakeInstruction: function () {
            return gs;
          },
          StakeProgram: function () {
            return bs;
          },
          Struct: function () {
            return Kn;
          },
          SystemInstruction: function () {
            return Kr;
          },
          SystemProgram: function () {
            return Hr;
          },
          Transaction: function () {
            return vr;
          },
          TransactionExpiredBlockheightExceededError: function () {
            return nr;
          },
          TransactionExpiredNonceInvalidError: function () {
            return ir;
          },
          TransactionExpiredTimeoutError: function () {
            return rr;
          },
          TransactionInstruction: function () {
            return br;
          },
          TransactionMessage: function () {
            return kr;
          },
          TransactionStatus: function () {
            return mr;
          },
          VALIDATOR_INFO_KEY: function () {
            return Es;
          },
          VERSION_PREFIX_MASK: function () {
            return tr;
          },
          VOTE_PROGRAM_ID: function () {
            return xs;
          },
          ValidatorInfo: function () {
            return As;
          },
          VersionedMessage: function () {
            return gr;
          },
          VersionedTransaction: function () {
            return Sr;
          },
          VoteAccount: function () {
            return Ts;
          },
          VoteAuthorizationLayout: function () {
            return Ms;
          },
          VoteInit: function () {
            return vs;
          },
          VoteInstruction: function () {
            return ks;
          },
          VoteProgram: function () {
            return Is;
          },
          clusterApiUrl: function () {
            return Ps;
          },
          sendAndConfirmRawTransaction: function () {
            return Cs;
          },
          sendAndConfirmTransaction: function () {
            return Or;
          },
        });
      var r = {};
      n.r(r),
        n.d(r, {
          abytes: function () {
            return q;
          },
          bitGet: function () {
            return dt;
          },
          bitLen: function () {
            return lt;
          },
          bitMask: function () {
            return pt;
          },
          bitSet: function () {
            return ft;
          },
          bytesToHex: function () {
            return F;
          },
          bytesToNumberBE: function () {
            return nt;
          },
          bytesToNumberLE: function () {
            return rt;
          },
          concatBytes: function () {
            return ct;
          },
          createHmacDrbg: function () {
            return mt;
          },
          ensureBytes: function () {
            return at;
          },
          equalBytes: function () {
            return ut;
          },
          hexToBytes: function () {
            return et;
          },
          hexToNumber: function () {
            return V;
          },
          isBytes: function () {
            return K;
          },
          numberToBytesBE: function () {
            return it;
          },
          numberToBytesLE: function () {
            return ot;
          },
          numberToHexUnpadded: function () {
            return Y;
          },
          numberToVarBytesBE: function () {
            return st;
          },
          utf8ToBytes: function () {
            return ht;
          },
          validateObject: function () {
            return bt;
          },
        });
      var i = n(8764);
      function o(t) {
        if (!Number.isSafeInteger(t) || t < 0)
          throw new Error(`positive integer expected, not ${t}`);
      }
      function s(t, ...e) {
        if (
          !(
            (n = t) instanceof Uint8Array ||
            (null != n &&
              "object" === typeof n &&
              "Uint8Array" === n.constructor.name)
          )
        )
          throw new Error("Uint8Array expected");
        var n;
        if (e.length > 0 && !e.includes(t.length))
          throw new Error(
            `Uint8Array expected of length ${e}, not of length=${t.length}`
          );
      }
      function a(t) {
        if ("function" !== typeof t || "function" !== typeof t.create)
          throw new Error("Hash should be wrapped by utils.wrapConstructor");
        o(t.outputLen), o(t.blockLen);
      }
      function c(t, e = !0) {
        if (t.destroyed) throw new Error("Hash instance has been destroyed");
        if (e && t.finished)
          throw new Error("Hash#digest() has already been called");
      }
      function u(t, e) {
        s(t);
        const n = e.outputLen;
        if (t.length < n)
          throw new Error(
            `digestInto() expects output buffer of length at least ${n}`
          );
      }
      const h =
        "object" === typeof globalThis && "crypto" in globalThis
          ? globalThis.crypto
          : void 0;
      const l = (t) => new DataView(t.buffer, t.byteOffset, t.byteLength),
        d = (t, e) => (t << (32 - e)) | (t >>> e),
        f = 68 === new Uint8Array(new Uint32Array([287454020]).buffer)[0],
        p = (t) =>
          ((t << 24) & 4278190080) |
          ((t << 8) & 16711680) |
          ((t >>> 8) & 65280) |
          ((t >>> 24) & 255);
      function y(t) {
        for (let e = 0; e < t.length; e++) t[e] = p(t[e]);
      }
      function g(t) {
        if ("string" !== typeof t)
          throw new Error("utf8ToBytes expected string, got " + typeof t);
        return new Uint8Array(new TextEncoder().encode(t));
      }
      function m(t) {
        return "string" === typeof t && (t = g(t)), s(t), t;
      }
      function w(...t) {
        let e = 0;
        for (let r = 0; r < t.length; r++) {
          const n = t[r];
          s(n), (e += n.length);
        }
        const n = new Uint8Array(e);
        for (let r = 0, i = 0; r < t.length; r++) {
          const e = t[r];
          n.set(e, i), (i += e.length);
        }
        return n;
      }
      class b {
        clone() {
          return this._cloneInto();
        }
      }
      function v(t) {
        const e = (e) => t().update(m(e)).digest(),
          n = t();
        return (
          (e.outputLen = n.outputLen),
          (e.blockLen = n.blockLen),
          (e.create = () => t()),
          e
        );
      }
      function k(t = 32) {
        if (h && "function" === typeof h.getRandomValues)
          return h.getRandomValues(new Uint8Array(t));
        throw new Error("crypto.getRandomValues must be defined");
      }
      const S = (t, e, n) => (t & e) ^ (t & n) ^ (e & n);
      class M extends b {
        constructor(t, e, n, r) {
          super(),
            (this.blockLen = t),
            (this.outputLen = e),
            (this.padOffset = n),
            (this.isLE = r),
            (this.finished = !1),
            (this.length = 0),
            (this.pos = 0),
            (this.destroyed = !1),
            (this.buffer = new Uint8Array(t)),
            (this.view = l(this.buffer));
        }
        update(t) {
          c(this);
          const { view: e, buffer: n, blockLen: r } = this,
            i = (t = m(t)).length;
          for (let o = 0; o < i; ) {
            const s = Math.min(r - this.pos, i - o);
            if (s !== r)
              n.set(t.subarray(o, o + s), this.pos),
                (this.pos += s),
                (o += s),
                this.pos === r && (this.process(e, 0), (this.pos = 0));
            else {
              const e = l(t);
              for (; r <= i - o; o += r) this.process(e, o);
            }
          }
          return (this.length += t.length), this.roundClean(), this;
        }
        digestInto(t) {
          c(this), u(t, this), (this.finished = !0);
          const { buffer: e, view: n, blockLen: r, isLE: i } = this;
          let { pos: o } = this;
          (e[o++] = 128),
            this.buffer.subarray(o).fill(0),
            this.padOffset > r - o && (this.process(n, 0), (o = 0));
          for (let c = o; c < r; c++) e[c] = 0;
          !(function (t, e, n, r) {
            if ("function" === typeof t.setBigUint64)
              return t.setBigUint64(e, n, r);
            const i = BigInt(32),
              o = BigInt(4294967295),
              s = Number((n >> i) & o),
              a = Number(n & o),
              c = r ? 4 : 0,
              u = r ? 0 : 4;
            t.setUint32(e + c, s, r), t.setUint32(e + u, a, r);
          })(n, r - 8, BigInt(8 * this.length), i),
            this.process(n, 0);
          const s = l(t),
            a = this.outputLen;
          if (a % 4)
            throw new Error("_sha2: outputLen should be aligned to 32bit");
          const h = a / 4,
            d = this.get();
          if (h > d.length)
            throw new Error("_sha2: outputLen bigger than state");
          for (let c = 0; c < h; c++) s.setUint32(4 * c, d[c], i);
        }
        digest() {
          const { buffer: t, outputLen: e } = this;
          this.digestInto(t);
          const n = t.slice(0, e);
          return this.destroy(), n;
        }
        _cloneInto(t) {
          t || (t = new this.constructor()), t.set(...this.get());
          const {
            blockLen: e,
            buffer: n,
            length: r,
            finished: i,
            destroyed: o,
            pos: s,
          } = this;
          return (
            (t.length = r),
            (t.pos = s),
            (t.finished = i),
            (t.destroyed = o),
            r % e && t.buffer.set(n),
            t
          );
        }
      }
      const I = BigInt(2 ** 32 - 1),
        E = BigInt(32);
      function _(t, e = !1) {
        return e
          ? { h: Number(t & I), l: Number((t >> E) & I) }
          : { h: 0 | Number((t >> E) & I), l: 0 | Number(t & I) };
      }
      function A(t, e = !1) {
        let n = new Uint32Array(t.length),
          r = new Uint32Array(t.length);
        for (let i = 0; i < t.length; i++) {
          const { h: o, l: s } = _(t[i], e);
          [n[i], r[i]] = [o, s];
        }
        return [n, r];
      }
      const x = (t, e, n) => (t << n) | (e >>> (32 - n)),
        L = (t, e, n) => (e << n) | (t >>> (32 - n)),
        T = (t, e, n) => (e << (n - 32)) | (t >>> (64 - n)),
        N = (t, e, n) => (t << (n - 32)) | (e >>> (64 - n));
      var O = {
        fromBig: _,
        split: A,
        toBig: (t, e) => (BigInt(t >>> 0) << E) | BigInt(e >>> 0),
        shrSH: (t, e, n) => t >>> n,
        shrSL: (t, e, n) => (t << (32 - n)) | (e >>> n),
        rotrSH: (t, e, n) => (t >>> n) | (e << (32 - n)),
        rotrSL: (t, e, n) => (t << (32 - n)) | (e >>> n),
        rotrBH: (t, e, n) => (t << (64 - n)) | (e >>> (n - 32)),
        rotrBL: (t, e, n) => (t >>> (n - 32)) | (e << (64 - n)),
        rotr32H: (t, e) => e,
        rotr32L: (t, e) => t,
        rotlSH: x,
        rotlSL: L,
        rotlBH: T,
        rotlBL: N,
        add: function (t, e, n, r) {
          const i = (e >>> 0) + (r >>> 0);
          return { h: (t + n + ((i / 2 ** 32) | 0)) | 0, l: 0 | i };
        },
        add3L: (t, e, n) => (t >>> 0) + (e >>> 0) + (n >>> 0),
        add3H: (t, e, n, r) => (e + n + r + ((t / 2 ** 32) | 0)) | 0,
        add4L: (t, e, n, r) => (t >>> 0) + (e >>> 0) + (n >>> 0) + (r >>> 0),
        add4H: (t, e, n, r, i) => (e + n + r + i + ((t / 2 ** 32) | 0)) | 0,
        add5H: (t, e, n, r, i, o) =>
          (e + n + r + i + o + ((t / 2 ** 32) | 0)) | 0,
        add5L: (t, e, n, r, i) =>
          (t >>> 0) + (e >>> 0) + (n >>> 0) + (r >>> 0) + (i >>> 0),
      };
      const [B, j] = (() =>
          O.split(
            [
              "0x428a2f98d728ae22",
              "0x7137449123ef65cd",
              "0xb5c0fbcfec4d3b2f",
              "0xe9b5dba58189dbbc",
              "0x3956c25bf348b538",
              "0x59f111f1b605d019",
              "0x923f82a4af194f9b",
              "0xab1c5ed5da6d8118",
              "0xd807aa98a3030242",
              "0x12835b0145706fbe",
              "0x243185be4ee4b28c",
              "0x550c7dc3d5ffb4e2",
              "0x72be5d74f27b896f",
              "0x80deb1fe3b1696b1",
              "0x9bdc06a725c71235",
              "0xc19bf174cf692694",
              "0xe49b69c19ef14ad2",
              "0xefbe4786384f25e3",
              "0x0fc19dc68b8cd5b5",
              "0x240ca1cc77ac9c65",
              "0x2de92c6f592b0275",
              "0x4a7484aa6ea6e483",
              "0x5cb0a9dcbd41fbd4",
              "0x76f988da831153b5",
              "0x983e5152ee66dfab",
              "0xa831c66d2db43210",
              "0xb00327c898fb213f",
              "0xbf597fc7beef0ee4",
              "0xc6e00bf33da88fc2",
              "0xd5a79147930aa725",
              "0x06ca6351e003826f",
              "0x142929670a0e6e70",
              "0x27b70a8546d22ffc",
              "0x2e1b21385c26c926",
              "0x4d2c6dfc5ac42aed",
              "0x53380d139d95b3df",
              "0x650a73548baf63de",
              "0x766a0abb3c77b2a8",
              "0x81c2c92e47edaee6",
              "0x92722c851482353b",
              "0xa2bfe8a14cf10364",
              "0xa81a664bbc423001",
              "0xc24b8b70d0f89791",
              "0xc76c51a30654be30",
              "0xd192e819d6ef5218",
              "0xd69906245565a910",
              "0xf40e35855771202a",
              "0x106aa07032bbd1b8",
              "0x19a4c116b8d2d0c8",
              "0x1e376c085141ab53",
              "0x2748774cdf8eeb99",
              "0x34b0bcb5e19b48a8",
              "0x391c0cb3c5c95a63",
              "0x4ed8aa4ae3418acb",
              "0x5b9cca4f7763e373",
              "0x682e6ff3d6b2b8a3",
              "0x748f82ee5defb2fc",
              "0x78a5636f43172f60",
              "0x84c87814a1f0ab72",
              "0x8cc702081a6439ec",
              "0x90befffa23631e28",
              "0xa4506cebde82bde9",
              "0xbef9a3f7b2c67915",
              "0xc67178f2e372532b",
              "0xca273eceea26619c",
              "0xd186b8c721c0c207",
              "0xeada7dd6cde0eb1e",
              "0xf57d4f7fee6ed178",
              "0x06f067aa72176fba",
              "0x0a637dc5a2c898a6",
              "0x113f9804bef90dae",
              "0x1b710b35131c471b",
              "0x28db77f523047d84",
              "0x32caab7b40c72493",
              "0x3c9ebe0a15c9bebc",
              "0x431d67c49c100d4c",
              "0x4cc5d4becb3e42b6",
              "0x597f299cfc657e2a",
              "0x5fcb6fab3ad6faec",
              "0x6c44198c4a475817",
            ].map((t) => BigInt(t))
          ))(),
        P = new Uint32Array(80),
        C = new Uint32Array(80);
      class R extends M {
        constructor() {
          super(128, 64, 16, !1),
            (this.Ah = 1779033703),
            (this.Al = -205731576),
            (this.Bh = -1150833019),
            (this.Bl = -2067093701),
            (this.Ch = 1013904242),
            (this.Cl = -23791573),
            (this.Dh = -1521486534),
            (this.Dl = 1595750129),
            (this.Eh = 1359893119),
            (this.El = -1377402159),
            (this.Fh = -1694144372),
            (this.Fl = 725511199),
            (this.Gh = 528734635),
            (this.Gl = -79577749),
            (this.Hh = 1541459225),
            (this.Hl = 327033209);
        }
        get() {
          const {
            Ah: t,
            Al: e,
            Bh: n,
            Bl: r,
            Ch: i,
            Cl: o,
            Dh: s,
            Dl: a,
            Eh: c,
            El: u,
            Fh: h,
            Fl: l,
            Gh: d,
            Gl: f,
            Hh: p,
            Hl: y,
          } = this;
          return [t, e, n, r, i, o, s, a, c, u, h, l, d, f, p, y];
        }
        set(t, e, n, r, i, o, s, a, c, u, h, l, d, f, p, y) {
          (this.Ah = 0 | t),
            (this.Al = 0 | e),
            (this.Bh = 0 | n),
            (this.Bl = 0 | r),
            (this.Ch = 0 | i),
            (this.Cl = 0 | o),
            (this.Dh = 0 | s),
            (this.Dl = 0 | a),
            (this.Eh = 0 | c),
            (this.El = 0 | u),
            (this.Fh = 0 | h),
            (this.Fl = 0 | l),
            (this.Gh = 0 | d),
            (this.Gl = 0 | f),
            (this.Hh = 0 | p),
            (this.Hl = 0 | y);
        }
        process(t, e) {
          for (let w = 0; w < 16; w++, e += 4)
            (P[w] = t.getUint32(e)), (C[w] = t.getUint32((e += 4)));
          for (let w = 16; w < 80; w++) {
            const t = 0 | P[w - 15],
              e = 0 | C[w - 15],
              n = O.rotrSH(t, e, 1) ^ O.rotrSH(t, e, 8) ^ O.shrSH(t, e, 7),
              r = O.rotrSL(t, e, 1) ^ O.rotrSL(t, e, 8) ^ O.shrSL(t, e, 7),
              i = 0 | P[w - 2],
              o = 0 | C[w - 2],
              s = O.rotrSH(i, o, 19) ^ O.rotrBH(i, o, 61) ^ O.shrSH(i, o, 6),
              a = O.rotrSL(i, o, 19) ^ O.rotrBL(i, o, 61) ^ O.shrSL(i, o, 6),
              c = O.add4L(r, a, C[w - 7], C[w - 16]),
              u = O.add4H(c, n, s, P[w - 7], P[w - 16]);
            (P[w] = 0 | u), (C[w] = 0 | c);
          }
          let {
            Ah: n,
            Al: r,
            Bh: i,
            Bl: o,
            Ch: s,
            Cl: a,
            Dh: c,
            Dl: u,
            Eh: h,
            El: l,
            Fh: d,
            Fl: f,
            Gh: p,
            Gl: y,
            Hh: g,
            Hl: m,
          } = this;
          for (let w = 0; w < 80; w++) {
            const t =
                O.rotrSH(h, l, 14) ^ O.rotrSH(h, l, 18) ^ O.rotrBH(h, l, 41),
              e = O.rotrSL(h, l, 14) ^ O.rotrSL(h, l, 18) ^ O.rotrBL(h, l, 41),
              b = (h & d) ^ (~h & p),
              v = (l & f) ^ (~l & y),
              k = O.add5L(m, e, v, j[w], C[w]),
              S = O.add5H(k, g, t, b, B[w], P[w]),
              M = 0 | k,
              I = O.rotrSH(n, r, 28) ^ O.rotrBH(n, r, 34) ^ O.rotrBH(n, r, 39),
              E = O.rotrSL(n, r, 28) ^ O.rotrBL(n, r, 34) ^ O.rotrBL(n, r, 39),
              _ = (n & i) ^ (n & s) ^ (i & s),
              A = (r & o) ^ (r & a) ^ (o & a);
            (g = 0 | p),
              (m = 0 | y),
              (p = 0 | d),
              (y = 0 | f),
              (d = 0 | h),
              (f = 0 | l),
              ({ h: h, l: l } = O.add(0 | c, 0 | u, 0 | S, 0 | M)),
              (c = 0 | s),
              (u = 0 | a),
              (s = 0 | i),
              (a = 0 | o),
              (i = 0 | n),
              (o = 0 | r);
            const x = O.add3L(M, E, A);
            (n = O.add3H(x, S, I, _)), (r = 0 | x);
          }
          ({ h: n, l: r } = O.add(0 | this.Ah, 0 | this.Al, 0 | n, 0 | r)),
            ({ h: i, l: o } = O.add(0 | this.Bh, 0 | this.Bl, 0 | i, 0 | o)),
            ({ h: s, l: a } = O.add(0 | this.Ch, 0 | this.Cl, 0 | s, 0 | a)),
            ({ h: c, l: u } = O.add(0 | this.Dh, 0 | this.Dl, 0 | c, 0 | u)),
            ({ h: h, l: l } = O.add(0 | this.Eh, 0 | this.El, 0 | h, 0 | l)),
            ({ h: d, l: f } = O.add(0 | this.Fh, 0 | this.Fl, 0 | d, 0 | f)),
            ({ h: p, l: y } = O.add(0 | this.Gh, 0 | this.Gl, 0 | p, 0 | y)),
            ({ h: g, l: m } = O.add(0 | this.Hh, 0 | this.Hl, 0 | g, 0 | m)),
            this.set(n, r, i, o, s, a, c, u, h, l, d, f, p, y, g, m);
        }
        roundClean() {
          P.fill(0), C.fill(0);
        }
        destroy() {
          this.buffer.fill(0),
            this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        }
      }
      const z = v(() => new R()),
        D = BigInt(0),
        U = BigInt(1),
        W = BigInt(2);
      function K(t) {
        return (
          t instanceof Uint8Array ||
          (null != t &&
            "object" === typeof t &&
            "Uint8Array" === t.constructor.name)
        );
      }
      function q(t) {
        if (!K(t)) throw new Error("Uint8Array expected");
      }
      const H = Array.from({ length: 256 }, (t, e) =>
        e.toString(16).padStart(2, "0")
      );
      function F(t) {
        q(t);
        let e = "";
        for (let n = 0; n < t.length; n++) e += H[t[n]];
        return e;
      }
      function Y(t) {
        const e = t.toString(16);
        return 1 & e.length ? `0${e}` : e;
      }
      function V(t) {
        if ("string" !== typeof t)
          throw new Error("hex string expected, got " + typeof t);
        return BigInt("" === t ? "0" : `0x${t}`);
      }
      const $ = 48,
        Z = 57,
        G = 65,
        Q = 70,
        J = 97,
        X = 102;
      function tt(t) {
        return t >= $ && t <= Z
          ? t - $
          : t >= G && t <= Q
          ? t - (G - 10)
          : t >= J && t <= X
          ? t - (J - 10)
          : void 0;
      }
      function et(t) {
        if ("string" !== typeof t)
          throw new Error("hex string expected, got " + typeof t);
        const e = t.length,
          n = e / 2;
        if (e % 2)
          throw new Error(
            "padded hex string expected, got unpadded hex of length " + e
          );
        const r = new Uint8Array(n);
        for (let i = 0, o = 0; i < n; i++, o += 2) {
          const e = tt(t.charCodeAt(o)),
            n = tt(t.charCodeAt(o + 1));
          if (void 0 === e || void 0 === n) {
            const e = t[o] + t[o + 1];
            throw new Error(
              'hex string expected, got non-hex character "' +
                e +
                '" at index ' +
                o
            );
          }
          r[i] = 16 * e + n;
        }
        return r;
      }
      function nt(t) {
        return V(F(t));
      }
      function rt(t) {
        return q(t), V(F(Uint8Array.from(t).reverse()));
      }
      function it(t, e) {
        return et(t.toString(16).padStart(2 * e, "0"));
      }
      function ot(t, e) {
        return it(t, e).reverse();
      }
      function st(t) {
        return et(Y(t));
      }
      function at(t, e, n) {
        let r;
        if ("string" === typeof e)
          try {
            r = et(e);
          } catch (o) {
            throw new Error(
              `${t} must be valid hex string, got "${e}". Cause: ${o}`
            );
          }
        else {
          if (!K(e)) throw new Error(`${t} must be hex string or Uint8Array`);
          r = Uint8Array.from(e);
        }
        const i = r.length;
        if ("number" === typeof n && i !== n)
          throw new Error(`${t} expected ${n} bytes, got ${i}`);
        return r;
      }
      function ct(...t) {
        let e = 0;
        for (let r = 0; r < t.length; r++) {
          const n = t[r];
          q(n), (e += n.length);
        }
        const n = new Uint8Array(e);
        for (let r = 0, i = 0; r < t.length; r++) {
          const e = t[r];
          n.set(e, i), (i += e.length);
        }
        return n;
      }
      function ut(t, e) {
        if (t.length !== e.length) return !1;
        let n = 0;
        for (let r = 0; r < t.length; r++) n |= t[r] ^ e[r];
        return 0 === n;
      }
      function ht(t) {
        if ("string" !== typeof t)
          throw new Error("utf8ToBytes expected string, got " + typeof t);
        return new Uint8Array(new TextEncoder().encode(t));
      }
      function lt(t) {
        let e;
        for (e = 0; t > D; t >>= U, e += 1);
        return e;
      }
      function dt(t, e) {
        return (t >> BigInt(e)) & U;
      }
      function ft(t, e, n) {
        return t | ((n ? U : D) << BigInt(e));
      }
      const pt = (t) => (W << BigInt(t - 1)) - U,
        yt = (t) => new Uint8Array(t),
        gt = (t) => Uint8Array.from(t);
      function mt(t, e, n) {
        if ("number" !== typeof t || t < 2)
          throw new Error("hashLen must be a number");
        if ("number" !== typeof e || e < 2)
          throw new Error("qByteLen must be a number");
        if ("function" !== typeof n)
          throw new Error("hmacFn must be a function");
        let r = yt(t),
          i = yt(t),
          o = 0;
        const s = () => {
            r.fill(1), i.fill(0), (o = 0);
          },
          a = (...t) => n(i, r, ...t),
          c = (t = yt()) => {
            (i = a(gt([0]), t)),
              (r = a()),
              0 !== t.length && ((i = a(gt([1]), t)), (r = a()));
          },
          u = () => {
            if (o++ >= 1e3) throw new Error("drbg: tried 1000 values");
            let t = 0;
            const n = [];
            for (; t < e; ) {
              r = a();
              const e = r.slice();
              n.push(e), (t += r.length);
            }
            return ct(...n);
          };
        return (t, e) => {
          let n;
          for (s(), c(t); !(n = e(u())); ) c();
          return s(), n;
        };
      }
      const wt = {
        bigint: (t) => "bigint" === typeof t,
        function: (t) => "function" === typeof t,
        boolean: (t) => "boolean" === typeof t,
        string: (t) => "string" === typeof t,
        stringOrUint8Array: (t) => "string" === typeof t || K(t),
        isSafeInteger: (t) => Number.isSafeInteger(t),
        array: (t) => Array.isArray(t),
        field: (t, e) => e.Fp.isValid(t),
        hash: (t) =>
          "function" === typeof t && Number.isSafeInteger(t.outputLen),
      };
      function bt(t, e, n = {}) {
        const r = (e, n, r) => {
          const i = wt[n];
          if ("function" !== typeof i)
            throw new Error(`Invalid validator "${n}", expected function`);
          const o = t[e];
          if ((!r || void 0 !== o) && !i(o, t))
            throw new Error(
              `Invalid param ${String(e)}=${o} (${typeof o}), expected ${n}`
            );
        };
        for (const [i, o] of Object.entries(e)) r(i, o, !1);
        for (const [i, o] of Object.entries(n)) r(i, o, !0);
        return t;
      }
      const vt = BigInt(0),
        kt = BigInt(1),
        St = BigInt(2),
        Mt = BigInt(3),
        It = BigInt(4),
        Et = BigInt(5),
        _t = BigInt(8);
      BigInt(9), BigInt(16);
      function At(t, e) {
        const n = t % e;
        return n >= vt ? n : e + n;
      }
      function xt(t, e, n) {
        if (n <= vt || e < vt) throw new Error("Expected power/modulo > 0");
        if (n === kt) return vt;
        let r = kt;
        for (; e > vt; )
          e & kt && (r = (r * t) % n), (t = (t * t) % n), (e >>= kt);
        return r;
      }
      function Lt(t, e, n) {
        let r = t;
        for (; e-- > vt; ) (r *= r), (r %= n);
        return r;
      }
      function Tt(t, e) {
        if (t === vt || e <= vt)
          throw new Error(
            `invert: expected positive integers, got n=${t} mod=${e}`
          );
        let n = At(t, e),
          r = e,
          i = vt,
          o = kt,
          s = kt,
          a = vt;
        for (; n !== vt; ) {
          const t = r / n,
            e = r % n,
            c = i - s * t,
            u = o - a * t;
          (r = n), (n = e), (i = s), (o = a), (s = c), (a = u);
        }
        if (r !== kt) throw new Error("invert: does not exist");
        return At(i, e);
      }
      function Nt(t) {
        if (t % It === Mt) {
          const e = (t + kt) / It;
          return function (t, n) {
            const r = t.pow(n, e);
            if (!t.eql(t.sqr(r), n)) throw new Error("Cannot find square root");
            return r;
          };
        }
        if (t % _t === Et) {
          const e = (t - Et) / _t;
          return function (t, n) {
            const r = t.mul(n, St),
              i = t.pow(r, e),
              o = t.mul(n, i),
              s = t.mul(t.mul(o, St), i),
              a = t.mul(o, t.sub(s, t.ONE));
            if (!t.eql(t.sqr(a), n)) throw new Error("Cannot find square root");
            return a;
          };
        }
        return (function (t) {
          const e = (t - kt) / St;
          let n, r, i;
          for (n = t - kt, r = 0; n % St === vt; n /= St, r++);
          for (i = St; i < t && xt(i, e, t) !== t - kt; i++);
          if (1 === r) {
            const e = (t + kt) / It;
            return function (t, n) {
              const r = t.pow(n, e);
              if (!t.eql(t.sqr(r), n))
                throw new Error("Cannot find square root");
              return r;
            };
          }
          const o = (n + kt) / St;
          return function (t, s) {
            if (t.pow(s, e) === t.neg(t.ONE))
              throw new Error("Cannot find square root");
            let a = r,
              c = t.pow(t.mul(t.ONE, i), n),
              u = t.pow(s, o),
              h = t.pow(s, n);
            for (; !t.eql(h, t.ONE); ) {
              if (t.eql(h, t.ZERO)) return t.ZERO;
              let e = 1;
              for (let r = t.sqr(h); e < a && !t.eql(r, t.ONE); e++)
                r = t.sqr(r);
              const n = t.pow(c, kt << BigInt(a - e - 1));
              (c = t.sqr(n)), (u = t.mul(u, n)), (h = t.mul(h, c)), (a = e);
            }
            return u;
          };
        })(t);
      }
      const Ot = [
        "create",
        "isValid",
        "is0",
        "neg",
        "inv",
        "sqrt",
        "sqr",
        "eql",
        "add",
        "sub",
        "mul",
        "pow",
        "div",
        "addN",
        "subN",
        "mulN",
        "sqrN",
      ];
      function Bt(t, e) {
        const n = void 0 !== e ? e : t.toString(2).length;
        return { nBitLength: n, nByteLength: Math.ceil(n / 8) };
      }
      function jt(t, e, n = !1, r = {}) {
        if (t <= vt) throw new Error(`Expected Field ORDER > 0, got ${t}`);
        const { nBitLength: i, nByteLength: o } = Bt(t, e);
        if (o > 2048)
          throw new Error("Field lengths over 2048 bytes are not supported");
        const s = Nt(t),
          a = Object.freeze({
            ORDER: t,
            BITS: i,
            BYTES: o,
            MASK: pt(i),
            ZERO: vt,
            ONE: kt,
            create: (e) => At(e, t),
            isValid: (e) => {
              if ("bigint" !== typeof e)
                throw new Error(
                  "Invalid field element: expected bigint, got " + typeof e
                );
              return vt <= e && e < t;
            },
            is0: (t) => t === vt,
            isOdd: (t) => (t & kt) === kt,
            neg: (e) => At(-e, t),
            eql: (t, e) => t === e,
            sqr: (e) => At(e * e, t),
            add: (e, n) => At(e + n, t),
            sub: (e, n) => At(e - n, t),
            mul: (e, n) => At(e * n, t),
            pow: (t, e) =>
              (function (t, e, n) {
                if (n < vt) throw new Error("Expected power > 0");
                if (n === vt) return t.ONE;
                if (n === kt) return e;
                let r = t.ONE,
                  i = e;
                for (; n > vt; )
                  n & kt && (r = t.mul(r, i)), (i = t.sqr(i)), (n >>= kt);
                return r;
              })(a, t, e),
            div: (e, n) => At(e * Tt(n, t), t),
            sqrN: (t) => t * t,
            addN: (t, e) => t + e,
            subN: (t, e) => t - e,
            mulN: (t, e) => t * e,
            inv: (e) => Tt(e, t),
            sqrt: r.sqrt || ((t) => s(a, t)),
            invertBatch: (t) =>
              (function (t, e) {
                const n = new Array(e.length),
                  r = e.reduce(
                    (e, r, i) => (t.is0(r) ? e : ((n[i] = e), t.mul(e, r))),
                    t.ONE
                  ),
                  i = t.inv(r);
                return (
                  e.reduceRight(
                    (e, r, i) =>
                      t.is0(r) ? e : ((n[i] = t.mul(e, n[i])), t.mul(e, r)),
                    i
                  ),
                  n
                );
              })(a, t),
            cmov: (t, e, n) => (n ? e : t),
            toBytes: (t) => (n ? ot(t, o) : it(t, o)),
            fromBytes: (t) => {
              if (t.length !== o)
                throw new Error(`Fp.fromBytes: expected ${o}, got ${t.length}`);
              return n ? rt(t) : nt(t);
            },
          });
        return Object.freeze(a);
      }
      function Pt(t) {
        if ("bigint" !== typeof t)
          throw new Error("field order must be bigint");
        const e = t.toString(2).length;
        return Math.ceil(e / 8);
      }
      function Ct(t) {
        const e = Pt(t);
        return e + Math.ceil(e / 2);
      }
      const Rt = BigInt(0),
        zt = BigInt(1);
      function Dt(t, e) {
        const n = (t, e) => {
            const n = e.negate();
            return t ? n : e;
          },
          r = (t) => ({
            windows: Math.ceil(e / t) + 1,
            windowSize: 2 ** (t - 1),
          });
        return {
          constTimeNegate: n,
          unsafeLadder(e, n) {
            let r = t.ZERO,
              i = e;
            for (; n > Rt; )
              n & zt && (r = r.add(i)), (i = i.double()), (n >>= zt);
            return r;
          },
          precomputeWindow(t, e) {
            const { windows: n, windowSize: i } = r(e),
              o = [];
            let s = t,
              a = s;
            for (let r = 0; r < n; r++) {
              (a = s), o.push(a);
              for (let t = 1; t < i; t++) (a = a.add(s)), o.push(a);
              s = a.double();
            }
            return o;
          },
          wNAF(e, i, o) {
            const { windows: s, windowSize: a } = r(e);
            let c = t.ZERO,
              u = t.BASE;
            const h = BigInt(2 ** e - 1),
              l = 2 ** e,
              d = BigInt(e);
            for (let t = 0; t < s; t++) {
              const e = t * a;
              let r = Number(o & h);
              (o >>= d), r > a && ((r -= l), (o += zt));
              const s = e,
                f = e + Math.abs(r) - 1,
                p = t % 2 !== 0,
                y = r < 0;
              0 === r ? (u = u.add(n(p, i[s]))) : (c = c.add(n(y, i[f])));
            }
            return { p: c, f: u };
          },
          wNAFCached(t, e, n, r) {
            const i = t._WINDOW_SIZE || 1;
            let o = e.get(t);
            return (
              o ||
                ((o = this.precomputeWindow(t, i)), 1 !== i && e.set(t, r(o))),
              this.wNAF(i, o, n)
            );
          },
        };
      }
      function Ut(t) {
        return (
          (function (t) {
            const e = Ot.reduce((t, e) => ((t[e] = "function"), t), {
              ORDER: "bigint",
              MASK: "bigint",
              BYTES: "isSafeInteger",
              BITS: "isSafeInteger",
            });
            bt(t, e);
          })(t.Fp),
          bt(
            t,
            { n: "bigint", h: "bigint", Gx: "field", Gy: "field" },
            { nBitLength: "isSafeInteger", nByteLength: "isSafeInteger" }
          ),
          Object.freeze({ ...Bt(t.n, t.nBitLength), ...t, p: t.Fp.ORDER })
        );
      }
      const Wt = BigInt(0),
        Kt = BigInt(1),
        qt = BigInt(2),
        Ht = BigInt(8),
        Ft = { zip215: !0 };
      function Yt(t) {
        const e = (function (t) {
            const e = Ut(t);
            return (
              bt(
                t,
                {
                  hash: "function",
                  a: "bigint",
                  d: "bigint",
                  randomBytes: "function",
                },
                {
                  adjustScalarBytes: "function",
                  domain: "function",
                  uvRatio: "function",
                  mapToCurve: "function",
                }
              ),
              Object.freeze({ ...e })
            );
          })(t),
          {
            Fp: n,
            n: r,
            prehash: i,
            hash: o,
            randomBytes: s,
            nByteLength: a,
            h: c,
          } = e,
          u = qt << (BigInt(8 * a) - Kt),
          h = n.create,
          l =
            e.uvRatio ||
            ((t, e) => {
              try {
                return { isValid: !0, value: n.sqrt(t * n.inv(e)) };
              } catch (r) {
                return { isValid: !1, value: Wt };
              }
            }),
          d = e.adjustScalarBytes || ((t) => t),
          f =
            e.domain ||
            ((t, e, n) => {
              if (e.length || n)
                throw new Error("Contexts/pre-hash are not supported");
              return t;
            }),
          p = (t) => "bigint" === typeof t && Wt < t,
          y = (t, e) => p(t) && p(e) && t < e,
          g = (t) => t === Wt || y(t, u);
        function m(t, e) {
          if (y(t, e)) return t;
          throw new Error(`Expected valid scalar < ${e}, got ${typeof t} ${t}`);
        }
        function w(t) {
          return t === Wt ? t : m(t, r);
        }
        const b = new Map();
        function v(t) {
          if (!(t instanceof k)) throw new Error("ExtendedPoint expected");
        }
        class k {
          constructor(t, e, n, r) {
            if (
              ((this.ex = t),
              (this.ey = e),
              (this.ez = n),
              (this.et = r),
              !g(t))
            )
              throw new Error("x required");
            if (!g(e)) throw new Error("y required");
            if (!g(n)) throw new Error("z required");
            if (!g(r)) throw new Error("t required");
          }
          get x() {
            return this.toAffine().x;
          }
          get y() {
            return this.toAffine().y;
          }
          static fromAffine(t) {
            if (t instanceof k) throw new Error("extended point not allowed");
            const { x: e, y: n } = t || {};
            if (!g(e) || !g(n)) throw new Error("invalid affine point");
            return new k(e, n, Kt, h(e * n));
          }
          static normalizeZ(t) {
            const e = n.invertBatch(t.map((t) => t.ez));
            return t.map((t, n) => t.toAffine(e[n])).map(k.fromAffine);
          }
          _setWindowSize(t) {
            (this._WINDOW_SIZE = t), b.delete(this);
          }
          assertValidity() {
            const { a: t, d: n } = e;
            if (this.is0()) throw new Error("bad point: ZERO");
            const { ex: r, ey: i, ez: o, et: s } = this,
              a = h(r * r),
              c = h(i * i),
              u = h(o * o),
              l = h(u * u),
              d = h(a * t);
            if (h(u * h(d + c)) !== h(l + h(n * h(a * c))))
              throw new Error("bad point: equation left != right (1)");
            if (h(r * i) !== h(o * s))
              throw new Error("bad point: equation left != right (2)");
          }
          equals(t) {
            v(t);
            const { ex: e, ey: n, ez: r } = this,
              { ex: i, ey: o, ez: s } = t,
              a = h(e * s),
              c = h(i * r),
              u = h(n * s),
              l = h(o * r);
            return a === c && u === l;
          }
          is0() {
            return this.equals(k.ZERO);
          }
          negate() {
            return new k(h(-this.ex), this.ey, this.ez, h(-this.et));
          }
          double() {
            const { a: t } = e,
              { ex: n, ey: r, ez: i } = this,
              o = h(n * n),
              s = h(r * r),
              a = h(qt * h(i * i)),
              c = h(t * o),
              u = n + r,
              l = h(h(u * u) - o - s),
              d = c + s,
              f = d - a,
              p = c - s,
              y = h(l * f),
              g = h(d * p),
              m = h(l * p),
              w = h(f * d);
            return new k(y, g, w, m);
          }
          add(t) {
            v(t);
            const { a: n, d: r } = e,
              { ex: i, ey: o, ez: s, et: a } = this,
              { ex: c, ey: u, ez: l, et: d } = t;
            if (n === BigInt(-1)) {
              const t = h((o - i) * (u + c)),
                e = h((o + i) * (u - c)),
                n = h(e - t);
              if (n === Wt) return this.double();
              const r = h(s * qt * d),
                f = h(a * qt * l),
                p = f + r,
                y = e + t,
                g = f - r,
                m = h(p * n),
                w = h(y * g),
                b = h(p * g),
                v = h(n * y);
              return new k(m, w, v, b);
            }
            const f = h(i * c),
              p = h(o * u),
              y = h(a * r * d),
              g = h(s * l),
              m = h((i + o) * (c + u) - f - p),
              w = g - y,
              b = g + y,
              S = h(p - n * f),
              M = h(m * w),
              I = h(b * S),
              E = h(m * S),
              _ = h(w * b);
            return new k(M, I, _, E);
          }
          subtract(t) {
            return this.add(t.negate());
          }
          wNAF(t) {
            return I.wNAFCached(this, b, t, k.normalizeZ);
          }
          multiply(t) {
            const { p: e, f: n } = this.wNAF(m(t, r));
            return k.normalizeZ([e, n])[0];
          }
          multiplyUnsafe(t) {
            let e = w(t);
            return e === Wt
              ? M
              : this.equals(M) || e === Kt
              ? this
              : this.equals(S)
              ? this.wNAF(e).p
              : I.unsafeLadder(this, e);
          }
          isSmallOrder() {
            return this.multiplyUnsafe(c).is0();
          }
          isTorsionFree() {
            return I.unsafeLadder(this, r).is0();
          }
          toAffine(t) {
            const { ex: e, ey: r, ez: i } = this,
              o = this.is0();
            null == t && (t = o ? Ht : n.inv(i));
            const s = h(e * t),
              a = h(r * t),
              c = h(i * t);
            if (o) return { x: Wt, y: Kt };
            if (c !== Kt) throw new Error("invZ was invalid");
            return { x: s, y: a };
          }
          clearCofactor() {
            const { h: t } = e;
            return t === Kt ? this : this.multiplyUnsafe(t);
          }
          static fromHex(t, r = !1) {
            const { d: i, a: o } = e,
              s = n.BYTES,
              a = (t = at("pointHex", t, s)).slice(),
              c = t[s - 1];
            a[s - 1] = -129 & c;
            const d = rt(a);
            d === Wt || m(d, r ? u : n.ORDER);
            const f = h(d * d),
              p = h(f - Kt),
              y = h(i * f - o);
            let { isValid: g, value: w } = l(p, y);
            if (!g) throw new Error("Point.fromHex: invalid y coordinate");
            const b = (w & Kt) === Kt,
              v = 0 !== (128 & c);
            if (!r && w === Wt && v)
              throw new Error("Point.fromHex: x=0 and x_0=1");
            return v !== b && (w = h(-w)), k.fromAffine({ x: w, y: d });
          }
          static fromPrivateKey(t) {
            return A(t).point;
          }
          toRawBytes() {
            const { x: t, y: e } = this.toAffine(),
              r = ot(e, n.BYTES);
            return (r[r.length - 1] |= t & Kt ? 128 : 0), r;
          }
          toHex() {
            return F(this.toRawBytes());
          }
        }
        (k.BASE = new k(e.Gx, e.Gy, Kt, h(e.Gx * e.Gy))),
          (k.ZERO = new k(Wt, Kt, Kt, Wt));
        const { BASE: S, ZERO: M } = k,
          I = Dt(k, 8 * a);
        function E(t) {
          return At(t, r);
        }
        function _(t) {
          return E(rt(t));
        }
        function A(t) {
          const e = a;
          t = at("private key", t, e);
          const n = at("hashed private key", o(t), 2 * e),
            r = d(n.slice(0, e)),
            i = n.slice(e, 2 * e),
            s = _(r),
            c = S.multiply(s),
            u = c.toRawBytes();
          return { head: r, prefix: i, scalar: s, point: c, pointBytes: u };
        }
        function x(t = new Uint8Array(), ...e) {
          const n = ct(...e);
          return _(o(f(n, at("context", t), !!i)));
        }
        const L = Ft;
        S._setWindowSize(8);
        return {
          CURVE: e,
          getPublicKey: function (t) {
            return A(t).pointBytes;
          },
          sign: function (t, e, r = {}) {
            (t = at("message", t)), i && (t = i(t));
            const { prefix: o, scalar: s, pointBytes: c } = A(e),
              u = x(r.context, o, t),
              h = S.multiply(u).toRawBytes(),
              l = E(u + x(r.context, h, c, t) * s);
            return w(l), at("result", ct(h, ot(l, n.BYTES)), 2 * a);
          },
          verify: function (t, e, r, o = L) {
            const { context: s, zip215: a } = o,
              c = n.BYTES;
            (t = at("signature", t, 2 * c)),
              (e = at("message", e)),
              i && (e = i(e));
            const u = rt(t.slice(c, 2 * c));
            let h, l, d;
            try {
              (h = k.fromHex(r, a)),
                (l = k.fromHex(t.slice(0, c), a)),
                (d = S.multiplyUnsafe(u));
            } catch (p) {
              return !1;
            }
            if (!a && h.isSmallOrder()) return !1;
            const f = x(s, l.toRawBytes(), h.toRawBytes(), e);
            return l
              .add(h.multiplyUnsafe(f))
              .subtract(d)
              .clearCofactor()
              .equals(k.ZERO);
          },
          ExtendedPoint: k,
          utils: {
            getExtendedPublicKey: A,
            randomPrivateKey: () => s(n.BYTES),
            precompute: (t = 8, e = k.BASE) => (
              e._setWindowSize(t), e.multiply(BigInt(3)), e
            ),
          },
        };
      }
      const Vt = BigInt(
          "57896044618658097711785492504343953926634992332820282019728792003956564819949"
        ),
        $t = BigInt(
          "19681161376707505956807079304988542015446066515923890162744021073123829784752"
        ),
        Zt = (BigInt(0), BigInt(1)),
        Gt = BigInt(2),
        Qt = BigInt(5),
        Jt = BigInt(10),
        Xt = BigInt(20),
        te = BigInt(40),
        ee = BigInt(80);
      function ne(t) {
        const e = Vt,
          n = (((t * t) % e) * t) % e,
          r = (Lt(n, Gt, e) * n) % e,
          i = (Lt(r, Zt, e) * t) % e,
          o = (Lt(i, Qt, e) * i) % e,
          s = (Lt(o, Jt, e) * o) % e,
          a = (Lt(s, Xt, e) * s) % e,
          c = (Lt(a, te, e) * a) % e,
          u = (Lt(c, ee, e) * c) % e,
          h = (Lt(u, ee, e) * c) % e,
          l = (Lt(h, Jt, e) * o) % e;
        return { pow_p_5_8: (Lt(l, Gt, e) * t) % e, b2: n };
      }
      function re(t) {
        return (t[0] &= 248), (t[31] &= 127), (t[31] |= 64), t;
      }
      function ie(t, e) {
        const n = Vt,
          r = At(e * e * e, n),
          i = At(r * r * e, n);
        let o = At(t * r * ne(t * i).pow_p_5_8, n);
        const s = At(e * o * o, n),
          a = o,
          c = At(o * $t, n),
          u = s === t,
          h = s === At(-t, n),
          l = s === At(-t * $t, n);
        return (
          u && (o = a),
          (h || l) && (o = c),
          (At(o, n) & kt) === kt && (o = At(-o, n)),
          { isValid: u || h, value: o }
        );
      }
      const oe = jt(Vt, void 0, !0),
        se = {
          a: BigInt(-1),
          d: BigInt(
            "37095705934669439343138083508754565189542113879843219016388785533085940283555"
          ),
          Fp: oe,
          n: BigInt(
            "7237005577332262213973186563042994240857116359379907606001950938285454250989"
          ),
          h: BigInt(8),
          Gx: BigInt(
            "15112221349535400772501151409588531511454012693041857206046113283949847762202"
          ),
          Gy: BigInt(
            "46316835694926478169428394003475163141307993866256225615783033603165251855960"
          ),
          hash: z,
          randomBytes: k,
          adjustScalarBytes: re,
          uvRatio: ie,
        },
        ae = Yt(se);
      function ce(t, e, n) {
        if (e.length > 255) throw new Error("Context is too big");
        return w(
          g("SigEd25519 no Ed25519 collisions"),
          new Uint8Array([n ? 1 : 0, e.length]),
          e,
          t
        );
      }
      const ue = (oe.ORDER + BigInt(3)) / BigInt(8);
      oe.pow(Gt, ue),
        oe.sqrt(oe.neg(oe.ONE)),
        oe.ORDER,
        BigInt(5),
        BigInt(8),
        BigInt(486662);
      !(function (t, e) {
        if (!t.isOdd) throw new Error("Field doesn't have isOdd");
        const n = t.sqrt(e);
        t.isOdd(n) && t.neg(n);
      })(oe, oe.neg(BigInt(486664)));
      BigInt(
        "25063068953384623474111414158702152701244531502492656460079210482610430750235"
      ),
        BigInt(
          "54469307008909316920995813868745141605393597292927456921205312896311721017578"
        ),
        BigInt(
          "1159843021668779879193775521855586647937357759715417654439879720876111806838"
        ),
        BigInt(
          "40440834346308536858101042469323190826248399146238708352240133220865137265952"
        ),
        BigInt(
          "0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
        );
      var he = n(3550),
        le = n.n(he),
        de = n(7191),
        fe = n.n(de);
      const pe = new Uint32Array([
          1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993,
          2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987,
          1925078388, 2162078206, 2614888103, 3248222580, 3835390401,
          4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692,
          1996064986, 2554220882, 2821834349, 2952996808, 3210313671,
          3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912,
          1294757372, 1396182291, 1695183700, 1986661051, 2177026350,
          2456956037, 2730485921, 2820302411, 3259730800, 3345764771,
          3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616,
          659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779,
          1955562222, 2024104815, 2227730452, 2361852424, 2428436474,
          2756734187, 3204031479, 3329325298,
        ]),
        ye = new Uint32Array([
          1779033703, 3144134277, 1013904242, 2773480762, 1359893119,
          2600822924, 528734635, 1541459225,
        ]),
        ge = new Uint32Array(64);
      class me extends M {
        constructor() {
          super(64, 32, 8, !1),
            (this.A = 0 | ye[0]),
            (this.B = 0 | ye[1]),
            (this.C = 0 | ye[2]),
            (this.D = 0 | ye[3]),
            (this.E = 0 | ye[4]),
            (this.F = 0 | ye[5]),
            (this.G = 0 | ye[6]),
            (this.H = 0 | ye[7]);
        }
        get() {
          const { A: t, B: e, C: n, D: r, E: i, F: o, G: s, H: a } = this;
          return [t, e, n, r, i, o, s, a];
        }
        set(t, e, n, r, i, o, s, a) {
          (this.A = 0 | t),
            (this.B = 0 | e),
            (this.C = 0 | n),
            (this.D = 0 | r),
            (this.E = 0 | i),
            (this.F = 0 | o),
            (this.G = 0 | s),
            (this.H = 0 | a);
        }
        process(t, e) {
          for (let l = 0; l < 16; l++, e += 4) ge[l] = t.getUint32(e, !1);
          for (let l = 16; l < 64; l++) {
            const t = ge[l - 15],
              e = ge[l - 2],
              n = d(t, 7) ^ d(t, 18) ^ (t >>> 3),
              r = d(e, 17) ^ d(e, 19) ^ (e >>> 10);
            ge[l] = (r + ge[l - 7] + n + ge[l - 16]) | 0;
          }
          let { A: n, B: r, C: i, D: o, E: s, F: a, G: c, H: u } = this;
          for (let l = 0; l < 64; l++) {
            const t =
                (u +
                  (d(s, 6) ^ d(s, 11) ^ d(s, 25)) +
                  (((h = s) & a) ^ (~h & c)) +
                  pe[l] +
                  ge[l]) |
                0,
              e = ((d(n, 2) ^ d(n, 13) ^ d(n, 22)) + S(n, r, i)) | 0;
            (u = c),
              (c = a),
              (a = s),
              (s = (o + t) | 0),
              (o = i),
              (i = r),
              (r = n),
              (n = (t + e) | 0);
          }
          var h;
          (n = (n + this.A) | 0),
            (r = (r + this.B) | 0),
            (i = (i + this.C) | 0),
            (o = (o + this.D) | 0),
            (s = (s + this.E) | 0),
            (a = (a + this.F) | 0),
            (c = (c + this.G) | 0),
            (u = (u + this.H) | 0),
            this.set(n, r, i, o, s, a, c, u);
        }
        roundClean() {
          ge.fill(0);
        }
        destroy() {
          this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
        }
      }
      const we = v(() => new me());
      var be = n(5532),
        ve = n(9386),
        ke = n(475);
      class Se extends TypeError {
        constructor(t, e) {
          let n;
          const { message: r, ...i } = t,
            { path: o } = t;
          super(0 === o.length ? r : "At path: " + o.join(".") + " -- " + r),
            Object.assign(this, i),
            (this.name = this.constructor.name),
            (this.failures = () => {
              var r;
              return null != (r = n) ? r : (n = [t, ...e()]);
            });
        }
      }
      function Me(t) {
        return "object" === typeof t && null != t;
      }
      function Ie(t) {
        return "string" === typeof t ? JSON.stringify(t) : "" + t;
      }
      function Ee(t, e, n, r) {
        if (!0 === t) return;
        !1 === t ? (t = {}) : "string" === typeof t && (t = { message: t });
        const { path: i, branch: o } = e,
          { type: s } = n,
          {
            refinement: a,
            message: c = "Expected a value of type `" +
              s +
              "`" +
              (a ? " with refinement `" + a + "`" : "") +
              ", but received: `" +
              Ie(r) +
              "`",
          } = t;
        return {
          value: r,
          type: s,
          refinement: a,
          key: i[i.length - 1],
          path: i,
          branch: o,
          ...t,
          message: c,
        };
      }
      function* _e(t, e, n, r) {
        var i;
        (Me((i = t)) && "function" === typeof i[Symbol.iterator]) || (t = [t]);
        for (const o of t) {
          const t = Ee(o, e, n, r);
          t && (yield t);
        }
      }
      function* Ae(t, e, n = {}) {
        const {
            path: r = [],
            branch: i = [t],
            coerce: o = !1,
            mask: s = !1,
          } = n,
          a = { path: r, branch: i };
        if (
          o &&
          ((t = e.coercer(t, a)),
          s && "type" !== e.type && Me(e.schema) && Me(t) && !Array.isArray(t))
        )
          for (const u in t) void 0 === e.schema[u] && delete t[u];
        let c = !0;
        for (const u of e.validator(t, a)) (c = !1), yield [u, void 0];
        for (let [u, h, l] of e.entries(t, a)) {
          const e = Ae(h, l, {
            path: void 0 === u ? r : [...r, u],
            branch: void 0 === u ? i : [...i, h],
            coerce: o,
            mask: s,
          });
          for (const n of e)
            n[0]
              ? ((c = !1), yield [n[0], void 0])
              : o &&
                ((h = n[1]),
                void 0 === u
                  ? (t = h)
                  : t instanceof Map
                  ? t.set(u, h)
                  : t instanceof Set
                  ? t.add(h)
                  : Me(t) && (t[u] = h));
        }
        if (c) for (const u of e.refiner(t, a)) (c = !1), yield [u, void 0];
        c && (yield [void 0, t]);
      }
      class xe {
        constructor(t) {
          const {
            type: e,
            schema: n,
            validator: r,
            refiner: i,
            coercer: o = (t) => t,
            entries: s = function* () {},
          } = t;
          (this.type = e),
            (this.schema = n),
            (this.entries = s),
            (this.coercer = o),
            (this.validator = r ? (t, e) => _e(r(t, e), e, this, t) : () => []),
            (this.refiner = i ? (t, e) => _e(i(t, e), e, this, t) : () => []);
        }
        assert(t) {
          return Le(t, this);
        }
        create(t) {
          return Te(t, this);
        }
        is(t) {
          return Ne(t, this);
        }
        mask(t) {
          return (function (t, e) {
            const n = Oe(t, e, { coerce: !0, mask: !0 });
            if (n[0]) throw n[0];
            return n[1];
          })(t, this);
        }
        validate(t, e = {}) {
          return Oe(t, this, e);
        }
      }
      function Le(t, e) {
        const n = Oe(t, e);
        if (n[0]) throw n[0];
      }
      function Te(t, e) {
        const n = Oe(t, e, { coerce: !0 });
        if (n[0]) throw n[0];
        return n[1];
      }
      function Ne(t, e) {
        return !Oe(t, e)[0];
      }
      function Oe(t, e, n = {}) {
        const r = Ae(t, e, n),
          i = (function (t) {
            const { done: e, value: n } = t.next();
            return e ? void 0 : n;
          })(r);
        if (i[0]) {
          return [
            new Se(i[0], function* () {
              for (const t of r) t[0] && (yield t[0]);
            }),
            void 0,
          ];
        }
        return [void 0, i[1]];
      }
      function Be(t, e) {
        return new xe({ type: t, schema: null, validator: e });
      }
      function je(t) {
        return new xe({
          type: "array",
          schema: t,
          *entries(e) {
            if (t && Array.isArray(e))
              for (const [n, r] of e.entries()) yield [n, r, t];
          },
          coercer: (t) => (Array.isArray(t) ? t.slice() : t),
          validator: (t) =>
            Array.isArray(t) ||
            "Expected an array value, but received: " + Ie(t),
        });
      }
      function Pe() {
        return Be("boolean", (t) => "boolean" === typeof t);
      }
      function Ce(t) {
        return Be(
          "instance",
          (e) =>
            e instanceof t ||
            "Expected a `" + t.name + "` instance, but received: " + Ie(e)
        );
      }
      function Re(t) {
        const e = Ie(t),
          n = typeof t;
        return new xe({
          type: "literal",
          schema:
            "string" === n || "number" === n || "boolean" === n ? t : null,
          validator: (n) =>
            n === t ||
            "Expected the literal `" + e + "`, but received: " + Ie(n),
        });
      }
      function ze() {
        return Be("never", () => !1);
      }
      function De(t) {
        return new xe({
          ...t,
          validator: (e, n) => null === e || t.validator(e, n),
          refiner: (e, n) => null === e || t.refiner(e, n),
        });
      }
      function Ue() {
        return Be(
          "number",
          (t) =>
            ("number" === typeof t && !isNaN(t)) ||
            "Expected a number, but received: " + Ie(t)
        );
      }
      function We(t) {
        return new xe({
          ...t,
          validator: (e, n) => void 0 === e || t.validator(e, n),
          refiner: (e, n) => void 0 === e || t.refiner(e, n),
        });
      }
      function Ke(t, e) {
        return new xe({
          type: "record",
          schema: null,
          *entries(n) {
            if (Me(n))
              for (const r in n) {
                const i = n[r];
                yield [r, r, t], yield [r, i, e];
              }
          },
          validator: (t) =>
            Me(t) || "Expected an object, but received: " + Ie(t),
        });
      }
      function qe() {
        return Be(
          "string",
          (t) =>
            "string" === typeof t || "Expected a string, but received: " + Ie(t)
        );
      }
      function He(t) {
        const e = ze();
        return new xe({
          type: "tuple",
          schema: null,
          *entries(n) {
            if (Array.isArray(n)) {
              const r = Math.max(t.length, n.length);
              for (let i = 0; i < r; i++) yield [i, n[i], t[i] || e];
            }
          },
          validator: (t) =>
            Array.isArray(t) || "Expected an array, but received: " + Ie(t),
        });
      }
      function Fe(t) {
        const e = Object.keys(t);
        return new xe({
          type: "type",
          schema: t,
          *entries(n) {
            if (Me(n)) for (const r of e) yield [r, n[r], t[r]];
          },
          validator: (t) =>
            Me(t) || "Expected an object, but received: " + Ie(t),
        });
      }
      function Ye(t) {
        const e = t.map((t) => t.type).join(" | ");
        return new xe({
          type: "union",
          schema: null,
          validator(n, r) {
            const i = [];
            for (const e of t) {
              const [...t] = Ae(n, e, r),
                [o] = t;
              if (!o[0]) return [];
              for (const [e] of t) e && i.push(e);
            }
            return [
              "Expected the value to satisfy a union of `" +
                e +
                "`, but received: " +
                Ie(n),
              ...i,
            ];
          },
        });
      }
      function Ve() {
        return Be("unknown", () => !0);
      }
      function $e(t, e, n) {
        return new xe({
          ...t,
          coercer: (r, i) =>
            Ne(r, e) ? t.coercer(n(r, i), i) : t.coercer(r, i),
        });
      }
      var Ze = n(1198),
        Ge = n.n(Ze),
        Qe = n(6855),
        Je = n(9062);
      const Xe = [],
        tn = [],
        en = [],
        nn = BigInt(0),
        rn = BigInt(1),
        on = BigInt(2),
        sn = BigInt(7),
        an = BigInt(256),
        cn = BigInt(113);
      for (let zs = 0, Ds = rn, Us = 1, Ws = 0; zs < 24; zs++) {
        ([Us, Ws] = [Ws, (2 * Us + 3 * Ws) % 5]),
          Xe.push(2 * (5 * Ws + Us)),
          tn.push((((zs + 1) * (zs + 2)) / 2) % 64);
        let t = nn;
        for (let e = 0; e < 7; e++)
          (Ds = ((Ds << rn) ^ ((Ds >> sn) * cn)) % an),
            Ds & on && (t ^= rn << ((rn << BigInt(e)) - rn));
        en.push(t);
      }
      const [un, hn] = A(en, !0),
        ln = (t, e, n) => (n > 32 ? T(t, e, n) : x(t, e, n)),
        dn = (t, e, n) => (n > 32 ? N(t, e, n) : L(t, e, n));
      class fn extends b {
        constructor(t, e, n, r = !1, i = 24) {
          if (
            (super(),
            (this.blockLen = t),
            (this.suffix = e),
            (this.outputLen = n),
            (this.enableXOF = r),
            (this.rounds = i),
            (this.pos = 0),
            (this.posOut = 0),
            (this.finished = !1),
            (this.destroyed = !1),
            o(n),
            0 >= this.blockLen || this.blockLen >= 200)
          )
            throw new Error("Sha3 supports only keccak-f1600 function");
          var s;
          (this.state = new Uint8Array(200)),
            (this.state32 =
              ((s = this.state),
              new Uint32Array(
                s.buffer,
                s.byteOffset,
                Math.floor(s.byteLength / 4)
              )));
        }
        keccak() {
          f || y(this.state32),
            (function (t, e = 24) {
              const n = new Uint32Array(10);
              for (let r = 24 - e; r < 24; r++) {
                for (let r = 0; r < 10; r++)
                  n[r] = t[r] ^ t[r + 10] ^ t[r + 20] ^ t[r + 30] ^ t[r + 40];
                for (let r = 0; r < 10; r += 2) {
                  const e = (r + 8) % 10,
                    i = (r + 2) % 10,
                    o = n[i],
                    s = n[i + 1],
                    a = ln(o, s, 1) ^ n[e],
                    c = dn(o, s, 1) ^ n[e + 1];
                  for (let n = 0; n < 50; n += 10)
                    (t[r + n] ^= a), (t[r + n + 1] ^= c);
                }
                let e = t[2],
                  i = t[3];
                for (let n = 0; n < 24; n++) {
                  const r = tn[n],
                    o = ln(e, i, r),
                    s = dn(e, i, r),
                    a = Xe[n];
                  (e = t[a]), (i = t[a + 1]), (t[a] = o), (t[a + 1] = s);
                }
                for (let r = 0; r < 50; r += 10) {
                  for (let e = 0; e < 10; e++) n[e] = t[r + e];
                  for (let e = 0; e < 10; e++)
                    t[r + e] ^= ~n[(e + 2) % 10] & n[(e + 4) % 10];
                }
                (t[0] ^= un[r]), (t[1] ^= hn[r]);
              }
              n.fill(0);
            })(this.state32, this.rounds),
            f || y(this.state32),
            (this.posOut = 0),
            (this.pos = 0);
        }
        update(t) {
          c(this);
          const { blockLen: e, state: n } = this,
            r = (t = m(t)).length;
          for (let i = 0; i < r; ) {
            const o = Math.min(e - this.pos, r - i);
            for (let e = 0; e < o; e++) n[this.pos++] ^= t[i++];
            this.pos === e && this.keccak();
          }
          return this;
        }
        finish() {
          if (this.finished) return;
          this.finished = !0;
          const { state: t, suffix: e, pos: n, blockLen: r } = this;
          (t[n] ^= e),
            0 !== (128 & e) && n === r - 1 && this.keccak(),
            (t[r - 1] ^= 128),
            this.keccak();
        }
        writeInto(t) {
          c(this, !1), s(t), this.finish();
          const e = this.state,
            { blockLen: n } = this;
          for (let r = 0, i = t.length; r < i; ) {
            this.posOut >= n && this.keccak();
            const o = Math.min(n - this.posOut, i - r);
            t.set(e.subarray(this.posOut, this.posOut + o), r),
              (this.posOut += o),
              (r += o);
          }
          return t;
        }
        xofInto(t) {
          if (!this.enableXOF)
            throw new Error("XOF is not possible for this instance");
          return this.writeInto(t);
        }
        xof(t) {
          return o(t), this.xofInto(new Uint8Array(t));
        }
        digestInto(t) {
          if ((u(t, this), this.finished))
            throw new Error("digest() was already called");
          return this.writeInto(t), this.destroy(), t;
        }
        digest() {
          return this.digestInto(new Uint8Array(this.outputLen));
        }
        destroy() {
          (this.destroyed = !0), this.state.fill(0);
        }
        _cloneInto(t) {
          const {
            blockLen: e,
            suffix: n,
            outputLen: r,
            rounds: i,
            enableXOF: o,
          } = this;
          return (
            t || (t = new fn(e, n, r, o, i)),
            t.state32.set(this.state32),
            (t.pos = this.pos),
            (t.posOut = this.posOut),
            (t.finished = this.finished),
            (t.rounds = i),
            (t.suffix = n),
            (t.outputLen = r),
            (t.enableXOF = o),
            (t.destroyed = this.destroyed),
            t
          );
        }
      }
      const pn = (t, e, n) => v(() => new fn(e, t, n)),
        yn = pn(1, 136, 32);
      class gn extends b {
        constructor(t, e) {
          super(), (this.finished = !1), (this.destroyed = !1), a(t);
          const n = m(e);
          if (
            ((this.iHash = t.create()), "function" !== typeof this.iHash.update)
          )
            throw new Error(
              "Expected instance of class which extends utils.Hash"
            );
          (this.blockLen = this.iHash.blockLen),
            (this.outputLen = this.iHash.outputLen);
          const r = this.blockLen,
            i = new Uint8Array(r);
          i.set(n.length > r ? t.create().update(n).digest() : n);
          for (let o = 0; o < i.length; o++) i[o] ^= 54;
          this.iHash.update(i), (this.oHash = t.create());
          for (let o = 0; o < i.length; o++) i[o] ^= 106;
          this.oHash.update(i), i.fill(0);
        }
        update(t) {
          return c(this), this.iHash.update(t), this;
        }
        digestInto(t) {
          c(this),
            s(t, this.outputLen),
            (this.finished = !0),
            this.iHash.digestInto(t),
            this.oHash.update(t),
            this.oHash.digestInto(t),
            this.destroy();
        }
        digest() {
          const t = new Uint8Array(this.oHash.outputLen);
          return this.digestInto(t), t;
        }
        _cloneInto(t) {
          t || (t = Object.create(Object.getPrototypeOf(this), {}));
          const {
            oHash: e,
            iHash: n,
            finished: r,
            destroyed: i,
            blockLen: o,
            outputLen: s,
          } = this;
          return (
            (t.finished = r),
            (t.destroyed = i),
            (t.blockLen = o),
            (t.outputLen = s),
            (t.oHash = e._cloneInto(t.oHash)),
            (t.iHash = n._cloneInto(t.iHash)),
            t
          );
        }
        destroy() {
          (this.destroyed = !0), this.oHash.destroy(), this.iHash.destroy();
        }
      }
      const mn = (t, e, n) => new gn(t, e).update(n).digest();
      mn.create = (t, e) => new gn(t, e);
      const { bytesToNumberBE: wn, hexToBytes: bn } = r,
        vn = {
          Err: class extends Error {
            constructor(t = "") {
              super(t);
            }
          },
          _parseInt(t) {
            const { Err: e } = vn;
            if (t.length < 2 || 2 !== t[0])
              throw new e("Invalid signature integer tag");
            const n = t[1],
              r = t.subarray(2, n + 2);
            if (!n || r.length !== n)
              throw new e("Invalid signature integer: wrong length");
            if (128 & r[0]) throw new e("Invalid signature integer: negative");
            if (0 === r[0] && !(128 & r[1]))
              throw new e(
                "Invalid signature integer: unnecessary leading zero"
              );
            return { d: wn(r), l: t.subarray(n + 2) };
          },
          toSig(t) {
            const { Err: e } = vn,
              n = "string" === typeof t ? bn(t) : t;
            q(n);
            let r = n.length;
            if (r < 2 || 48 != n[0]) throw new e("Invalid signature tag");
            if (n[1] !== r - 2)
              throw new e("Invalid signature: incorrect length");
            const { d: i, l: o } = vn._parseInt(n.subarray(2)),
              { d: s, l: a } = vn._parseInt(o);
            if (a.length)
              throw new e("Invalid signature: left bytes after parsing");
            return { r: i, s: s };
          },
          hexFromSig(t) {
            const e = (t) => (8 & Number.parseInt(t[0], 16) ? "00" + t : t),
              n = (t) => {
                const e = t.toString(16);
                return 1 & e.length ? `0${e}` : e;
              },
              r = e(n(t.s)),
              i = e(n(t.r)),
              o = r.length / 2,
              s = i.length / 2,
              a = n(o),
              c = n(s);
            return `30${n(s + o + 4)}02${c}${i}02${a}${r}`;
          },
        },
        kn = BigInt(0),
        Sn = BigInt(1),
        Mn = (BigInt(2), BigInt(3));
      BigInt(4);
      function In(t) {
        const e = (function (t) {
            const e = Ut(t);
            bt(
              e,
              { a: "field", b: "field" },
              {
                allowedPrivateKeyLengths: "array",
                wrapPrivateKey: "boolean",
                isTorsionFree: "function",
                clearCofactor: "function",
                allowInfinityPoint: "boolean",
                fromBytes: "function",
                toBytes: "function",
              }
            );
            const { endo: n, Fp: r, a: i } = e;
            if (n) {
              if (!r.eql(i, r.ZERO))
                throw new Error(
                  "Endomorphism can only be defined for Koblitz curves that have a=0"
                );
              if (
                "object" !== typeof n ||
                "bigint" !== typeof n.beta ||
                "function" !== typeof n.splitScalar
              )
                throw new Error(
                  "Expected endomorphism with beta: bigint and splitScalar: function"
                );
            }
            return Object.freeze({ ...e });
          })(t),
          { Fp: n } = e,
          r =
            e.toBytes ||
            ((t, e, r) => {
              const i = e.toAffine();
              return ct(Uint8Array.from([4]), n.toBytes(i.x), n.toBytes(i.y));
            }),
          i =
            e.fromBytes ||
            ((t) => {
              const e = t.subarray(1);
              return {
                x: n.fromBytes(e.subarray(0, n.BYTES)),
                y: n.fromBytes(e.subarray(n.BYTES, 2 * n.BYTES)),
              };
            });
        function o(t) {
          const { a: r, b: i } = e,
            o = n.sqr(t),
            s = n.mul(o, t);
          return n.add(n.add(s, n.mul(t, r)), i);
        }
        if (!n.eql(n.sqr(e.Gy), o(e.Gx)))
          throw new Error("bad generator point: equation left != right");
        function s(t) {
          return "bigint" === typeof t && kn < t && t < e.n;
        }
        function a(t) {
          if (!s(t))
            throw new Error("Expected valid bigint: 0 < bigint < curve.n");
        }
        function c(t) {
          const {
            allowedPrivateKeyLengths: n,
            nByteLength: r,
            wrapPrivateKey: i,
            n: o,
          } = e;
          if (n && "bigint" !== typeof t) {
            if (
              (K(t) && (t = F(t)),
              "string" !== typeof t || !n.includes(t.length))
            )
              throw new Error("Invalid key");
            t = t.padStart(2 * r, "0");
          }
          let s;
          try {
            s = "bigint" === typeof t ? t : nt(at("private key", t, r));
          } catch (c) {
            throw new Error(
              `private key must be ${r} bytes, hex or bigint, not ${typeof t}`
            );
          }
          return i && (s = At(s, o)), a(s), s;
        }
        const u = new Map();
        function h(t) {
          if (!(t instanceof l)) throw new Error("ProjectivePoint expected");
        }
        class l {
          constructor(t, e, r) {
            if (
              ((this.px = t),
              (this.py = e),
              (this.pz = r),
              null == t || !n.isValid(t))
            )
              throw new Error("x required");
            if (null == e || !n.isValid(e)) throw new Error("y required");
            if (null == r || !n.isValid(r)) throw new Error("z required");
          }
          static fromAffine(t) {
            const { x: e, y: r } = t || {};
            if (!t || !n.isValid(e) || !n.isValid(r))
              throw new Error("invalid affine point");
            if (t instanceof l) throw new Error("projective point not allowed");
            const i = (t) => n.eql(t, n.ZERO);
            return i(e) && i(r) ? l.ZERO : new l(e, r, n.ONE);
          }
          get x() {
            return this.toAffine().x;
          }
          get y() {
            return this.toAffine().y;
          }
          static normalizeZ(t) {
            const e = n.invertBatch(t.map((t) => t.pz));
            return t.map((t, n) => t.toAffine(e[n])).map(l.fromAffine);
          }
          static fromHex(t) {
            const e = l.fromAffine(i(at("pointHex", t)));
            return e.assertValidity(), e;
          }
          static fromPrivateKey(t) {
            return l.BASE.multiply(c(t));
          }
          _setWindowSize(t) {
            (this._WINDOW_SIZE = t), u.delete(this);
          }
          assertValidity() {
            if (this.is0()) {
              if (e.allowInfinityPoint && !n.is0(this.py)) return;
              throw new Error("bad point: ZERO");
            }
            const { x: t, y: r } = this.toAffine();
            if (!n.isValid(t) || !n.isValid(r))
              throw new Error("bad point: x or y not FE");
            const i = n.sqr(r),
              s = o(t);
            if (!n.eql(i, s))
              throw new Error("bad point: equation left != right");
            if (!this.isTorsionFree())
              throw new Error("bad point: not in prime-order subgroup");
          }
          hasEvenY() {
            const { y: t } = this.toAffine();
            if (n.isOdd) return !n.isOdd(t);
            throw new Error("Field doesn't support isOdd");
          }
          equals(t) {
            h(t);
            const { px: e, py: r, pz: i } = this,
              { px: o, py: s, pz: a } = t,
              c = n.eql(n.mul(e, a), n.mul(o, i)),
              u = n.eql(n.mul(r, a), n.mul(s, i));
            return c && u;
          }
          negate() {
            return new l(this.px, n.neg(this.py), this.pz);
          }
          double() {
            const { a: t, b: r } = e,
              i = n.mul(r, Mn),
              { px: o, py: s, pz: a } = this;
            let c = n.ZERO,
              u = n.ZERO,
              h = n.ZERO,
              d = n.mul(o, o),
              f = n.mul(s, s),
              p = n.mul(a, a),
              y = n.mul(o, s);
            return (
              (y = n.add(y, y)),
              (h = n.mul(o, a)),
              (h = n.add(h, h)),
              (c = n.mul(t, h)),
              (u = n.mul(i, p)),
              (u = n.add(c, u)),
              (c = n.sub(f, u)),
              (u = n.add(f, u)),
              (u = n.mul(c, u)),
              (c = n.mul(y, c)),
              (h = n.mul(i, h)),
              (p = n.mul(t, p)),
              (y = n.sub(d, p)),
              (y = n.mul(t, y)),
              (y = n.add(y, h)),
              (h = n.add(d, d)),
              (d = n.add(h, d)),
              (d = n.add(d, p)),
              (d = n.mul(d, y)),
              (u = n.add(u, d)),
              (p = n.mul(s, a)),
              (p = n.add(p, p)),
              (d = n.mul(p, y)),
              (c = n.sub(c, d)),
              (h = n.mul(p, f)),
              (h = n.add(h, h)),
              (h = n.add(h, h)),
              new l(c, u, h)
            );
          }
          add(t) {
            h(t);
            const { px: r, py: i, pz: o } = this,
              { px: s, py: a, pz: c } = t;
            let u = n.ZERO,
              d = n.ZERO,
              f = n.ZERO;
            const p = e.a,
              y = n.mul(e.b, Mn);
            let g = n.mul(r, s),
              m = n.mul(i, a),
              w = n.mul(o, c),
              b = n.add(r, i),
              v = n.add(s, a);
            (b = n.mul(b, v)),
              (v = n.add(g, m)),
              (b = n.sub(b, v)),
              (v = n.add(r, o));
            let k = n.add(s, c);
            return (
              (v = n.mul(v, k)),
              (k = n.add(g, w)),
              (v = n.sub(v, k)),
              (k = n.add(i, o)),
              (u = n.add(a, c)),
              (k = n.mul(k, u)),
              (u = n.add(m, w)),
              (k = n.sub(k, u)),
              (f = n.mul(p, v)),
              (u = n.mul(y, w)),
              (f = n.add(u, f)),
              (u = n.sub(m, f)),
              (f = n.add(m, f)),
              (d = n.mul(u, f)),
              (m = n.add(g, g)),
              (m = n.add(m, g)),
              (w = n.mul(p, w)),
              (v = n.mul(y, v)),
              (m = n.add(m, w)),
              (w = n.sub(g, w)),
              (w = n.mul(p, w)),
              (v = n.add(v, w)),
              (g = n.mul(m, v)),
              (d = n.add(d, g)),
              (g = n.mul(k, v)),
              (u = n.mul(b, u)),
              (u = n.sub(u, g)),
              (g = n.mul(b, m)),
              (f = n.mul(k, f)),
              (f = n.add(f, g)),
              new l(u, d, f)
            );
          }
          subtract(t) {
            return this.add(t.negate());
          }
          is0() {
            return this.equals(l.ZERO);
          }
          wNAF(t) {
            return f.wNAFCached(this, u, t, (t) => {
              const e = n.invertBatch(t.map((t) => t.pz));
              return t.map((t, n) => t.toAffine(e[n])).map(l.fromAffine);
            });
          }
          multiplyUnsafe(t) {
            const r = l.ZERO;
            if (t === kn) return r;
            if ((a(t), t === Sn)) return this;
            const { endo: i } = e;
            if (!i) return f.unsafeLadder(this, t);
            let { k1neg: o, k1: s, k2neg: c, k2: u } = i.splitScalar(t),
              h = r,
              d = r,
              p = this;
            for (; s > kn || u > kn; )
              s & Sn && (h = h.add(p)),
                u & Sn && (d = d.add(p)),
                (p = p.double()),
                (s >>= Sn),
                (u >>= Sn);
            return (
              o && (h = h.negate()),
              c && (d = d.negate()),
              (d = new l(n.mul(d.px, i.beta), d.py, d.pz)),
              h.add(d)
            );
          }
          multiply(t) {
            a(t);
            let r,
              i,
              o = t;
            const { endo: s } = e;
            if (s) {
              const { k1neg: t, k1: e, k2neg: a, k2: c } = s.splitScalar(o);
              let { p: u, f: h } = this.wNAF(e),
                { p: d, f: p } = this.wNAF(c);
              (u = f.constTimeNegate(t, u)),
                (d = f.constTimeNegate(a, d)),
                (d = new l(n.mul(d.px, s.beta), d.py, d.pz)),
                (r = u.add(d)),
                (i = h.add(p));
            } else {
              const { p: t, f: e } = this.wNAF(o);
              (r = t), (i = e);
            }
            return l.normalizeZ([r, i])[0];
          }
          multiplyAndAddUnsafe(t, e, n) {
            const r = l.BASE,
              i = (t, e) =>
                e !== kn && e !== Sn && t.equals(r)
                  ? t.multiply(e)
                  : t.multiplyUnsafe(e),
              o = i(this, e).add(i(t, n));
            return o.is0() ? void 0 : o;
          }
          toAffine(t) {
            const { px: e, py: r, pz: i } = this,
              o = this.is0();
            null == t && (t = o ? n.ONE : n.inv(i));
            const s = n.mul(e, t),
              a = n.mul(r, t),
              c = n.mul(i, t);
            if (o) return { x: n.ZERO, y: n.ZERO };
            if (!n.eql(c, n.ONE)) throw new Error("invZ was invalid");
            return { x: s, y: a };
          }
          isTorsionFree() {
            const { h: t, isTorsionFree: n } = e;
            if (t === Sn) return !0;
            if (n) return n(l, this);
            throw new Error(
              "isTorsionFree() has not been declared for the elliptic curve"
            );
          }
          clearCofactor() {
            const { h: t, clearCofactor: n } = e;
            return t === Sn ? this : n ? n(l, this) : this.multiplyUnsafe(e.h);
          }
          toRawBytes(t = !0) {
            return this.assertValidity(), r(l, this, t);
          }
          toHex(t = !0) {
            return F(this.toRawBytes(t));
          }
        }
        (l.BASE = new l(e.Gx, e.Gy, n.ONE)),
          (l.ZERO = new l(n.ZERO, n.ONE, n.ZERO));
        const d = e.nBitLength,
          f = Dt(l, e.endo ? Math.ceil(d / 2) : d);
        return {
          CURVE: e,
          ProjectivePoint: l,
          normPrivateKeyToScalar: c,
          weierstrassEquation: o,
          isWithinCurveOrder: s,
        };
      }
      function En(t) {
        const e = (function (t) {
            const e = Ut(t);
            return (
              bt(
                e,
                { hash: "hash", hmac: "function", randomBytes: "function" },
                {
                  bits2int: "function",
                  bits2int_modN: "function",
                  lowS: "boolean",
                }
              ),
              Object.freeze({ lowS: !0, ...e })
            );
          })(t),
          { Fp: n, n: r } = e,
          i = n.BYTES + 1,
          o = 2 * n.BYTES + 1;
        function s(t) {
          return At(t, r);
        }
        function a(t) {
          return Tt(t, r);
        }
        const {
            ProjectivePoint: c,
            normPrivateKeyToScalar: u,
            weierstrassEquation: h,
            isWithinCurveOrder: l,
          } = In({
            ...e,
            toBytes(t, e, r) {
              const i = e.toAffine(),
                o = n.toBytes(i.x),
                s = ct;
              return r
                ? s(Uint8Array.from([e.hasEvenY() ? 2 : 3]), o)
                : s(Uint8Array.from([4]), o, n.toBytes(i.y));
            },
            fromBytes(t) {
              const e = t.length,
                r = t[0],
                s = t.subarray(1);
              if (e !== i || (2 !== r && 3 !== r)) {
                if (e === o && 4 === r) {
                  return {
                    x: n.fromBytes(s.subarray(0, n.BYTES)),
                    y: n.fromBytes(s.subarray(n.BYTES, 2 * n.BYTES)),
                  };
                }
                throw new Error(
                  `Point of length ${e} was invalid. Expected ${i} compressed bytes or ${o} uncompressed bytes`
                );
              }
              {
                const t = nt(s);
                if (!(kn < (a = t) && a < n.ORDER))
                  throw new Error("Point is not on curve");
                const e = h(t);
                let i;
                try {
                  i = n.sqrt(e);
                } catch (c) {
                  const t = c instanceof Error ? ": " + c.message : "";
                  throw new Error("Point is not on curve" + t);
                }
                return (
                  (1 === (1 & r)) !== ((i & Sn) === Sn) && (i = n.neg(i)),
                  { x: t, y: i }
                );
              }
              var a;
            },
          }),
          d = (t) => F(it(t, e.nByteLength));
        function f(t) {
          return t > r >> Sn;
        }
        const p = (t, e, n) => nt(t.slice(e, n));
        class y {
          constructor(t, e, n) {
            (this.r = t),
              (this.s = e),
              (this.recovery = n),
              this.assertValidity();
          }
          static fromCompact(t) {
            const n = e.nByteLength;
            return (
              (t = at("compactSignature", t, 2 * n)),
              new y(p(t, 0, n), p(t, n, 2 * n))
            );
          }
          static fromDER(t) {
            const { r: e, s: n } = vn.toSig(at("DER", t));
            return new y(e, n);
          }
          assertValidity() {
            if (!l(this.r)) throw new Error("r must be 0 < r < CURVE.n");
            if (!l(this.s)) throw new Error("s must be 0 < s < CURVE.n");
          }
          addRecoveryBit(t) {
            return new y(this.r, this.s, t);
          }
          recoverPublicKey(t) {
            const { r: r, s: i, recovery: o } = this,
              u = b(at("msgHash", t));
            if (null == o || ![0, 1, 2, 3].includes(o))
              throw new Error("recovery id invalid");
            const h = 2 === o || 3 === o ? r + e.n : r;
            if (h >= n.ORDER) throw new Error("recovery id 2 or 3 invalid");
            const l = 0 === (1 & o) ? "02" : "03",
              f = c.fromHex(l + d(h)),
              p = a(h),
              y = s(-u * p),
              g = s(i * p),
              m = c.BASE.multiplyAndAddUnsafe(f, y, g);
            if (!m) throw new Error("point at infinify");
            return m.assertValidity(), m;
          }
          hasHighS() {
            return f(this.s);
          }
          normalizeS() {
            return this.hasHighS()
              ? new y(this.r, s(-this.s), this.recovery)
              : this;
          }
          toDERRawBytes() {
            return et(this.toDERHex());
          }
          toDERHex() {
            return vn.hexFromSig({ r: this.r, s: this.s });
          }
          toCompactRawBytes() {
            return et(this.toCompactHex());
          }
          toCompactHex() {
            return d(this.r) + d(this.s);
          }
        }
        const g = {
          isValidPrivateKey(t) {
            try {
              return u(t), !0;
            } catch (e) {
              return !1;
            }
          },
          normPrivateKeyToScalar: u,
          randomPrivateKey: () => {
            const t = Ct(e.n);
            return (function (t, e, n = !1) {
              const r = t.length,
                i = Pt(e),
                o = Ct(e);
              if (r < 16 || r < o || r > 1024)
                throw new Error(`expected ${o}-1024 bytes of input, got ${r}`);
              const s = At(n ? nt(t) : rt(t), e - kt) + kt;
              return n ? ot(s, i) : it(s, i);
            })(e.randomBytes(t), e.n);
          },
          precompute: (t = 8, e = c.BASE) => (
            e._setWindowSize(t), e.multiply(BigInt(3)), e
          ),
        };
        function m(t) {
          const e = K(t),
            n = "string" === typeof t,
            r = (e || n) && t.length;
          return e
            ? r === i || r === o
            : n
            ? r === 2 * i || r === 2 * o
            : t instanceof c;
        }
        const w =
            e.bits2int ||
            function (t) {
              const n = nt(t),
                r = 8 * t.length - e.nBitLength;
              return r > 0 ? n >> BigInt(r) : n;
            },
          b =
            e.bits2int_modN ||
            function (t) {
              return s(w(t));
            },
          v = pt(e.nBitLength);
        function k(t) {
          if ("bigint" !== typeof t) throw new Error("bigint expected");
          if (!(kn <= t && t < v))
            throw new Error(`bigint expected < 2^${e.nBitLength}`);
          return it(t, e.nByteLength);
        }
        function S(t, r, i = M) {
          if (["recovered", "canonical"].some((t) => t in i))
            throw new Error("sign() legacy options not supported");
          const { hash: o, randomBytes: h } = e;
          let { lowS: d, prehash: p, extraEntropy: g } = i;
          null == d && (d = !0),
            (t = at("msgHash", t)),
            p && (t = at("prehashed msgHash", o(t)));
          const m = b(t),
            v = u(r),
            S = [k(v), k(m)];
          if (null != g && !1 !== g) {
            const t = !0 === g ? h(n.BYTES) : g;
            S.push(at("extraEntropy", t));
          }
          const I = ct(...S),
            E = m;
          return {
            seed: I,
            k2sig: function (t) {
              const e = w(t);
              if (!l(e)) return;
              const n = a(e),
                r = c.BASE.multiply(e).toAffine(),
                i = s(r.x);
              if (i === kn) return;
              const o = s(n * s(E + i * v));
              if (o === kn) return;
              let u = (r.x === i ? 0 : 2) | Number(r.y & Sn),
                h = o;
              return (
                d &&
                  f(o) &&
                  ((h = (function (t) {
                    return f(t) ? s(-t) : t;
                  })(o)),
                  (u ^= 1)),
                new y(i, h, u)
              );
            },
          };
        }
        const M = { lowS: e.lowS, prehash: !1 },
          I = { lowS: e.lowS, prehash: !1 };
        return (
          c.BASE._setWindowSize(8),
          {
            CURVE: e,
            getPublicKey: function (t, e = !0) {
              return c.fromPrivateKey(t).toRawBytes(e);
            },
            getSharedSecret: function (t, e, n = !0) {
              if (m(t)) throw new Error("first arg must be private key");
              if (!m(e)) throw new Error("second arg must be public key");
              return c.fromHex(e).multiply(u(t)).toRawBytes(n);
            },
            sign: function (t, n, r = M) {
              const { seed: i, k2sig: o } = S(t, n, r),
                s = e;
              return mt(s.hash.outputLen, s.nByteLength, s.hmac)(i, o);
            },
            verify: function (t, n, r, i = I) {
              const o = t;
              if (
                ((n = at("msgHash", n)),
                (r = at("publicKey", r)),
                "strict" in i)
              )
                throw new Error("options.strict was renamed to lowS");
              const { lowS: u, prehash: h } = i;
              let l, d;
              try {
                if ("string" === typeof o || K(o))
                  try {
                    l = y.fromDER(o);
                  } catch (S) {
                    if (!(S instanceof vn.Err)) throw S;
                    l = y.fromCompact(o);
                  }
                else {
                  if (
                    "object" !== typeof o ||
                    "bigint" !== typeof o.r ||
                    "bigint" !== typeof o.s
                  )
                    throw new Error("PARSE");
                  {
                    const { r: t, s: e } = o;
                    l = new y(t, e);
                  }
                }
                d = c.fromHex(r);
              } catch (M) {
                if ("PARSE" === M.message)
                  throw new Error(
                    "signature must be Signature instance, Uint8Array or hex string"
                  );
                return !1;
              }
              if (u && l.hasHighS()) return !1;
              h && (n = e.hash(n));
              const { r: f, s: p } = l,
                g = b(n),
                m = a(p),
                w = s(g * m),
                v = s(f * m),
                k = c.BASE.multiplyAndAddUnsafe(d, w, v)?.toAffine();
              return !!k && s(k.x) === f;
            },
            ProjectivePoint: c,
            Signature: y,
            utils: g,
          }
        );
      }
      function _n(t) {
        return {
          hash: t,
          hmac: (e, ...n) => mn(t, e, w(...n)),
          randomBytes: k,
        };
      }
      const An = BigInt(
          "0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"
        ),
        xn = BigInt(
          "0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"
        ),
        Ln = BigInt(1),
        Tn = BigInt(2),
        Nn = (t, e) => (t + e / Tn) / e;
      function On(t) {
        const e = An,
          n = BigInt(3),
          r = BigInt(6),
          i = BigInt(11),
          o = BigInt(22),
          s = BigInt(23),
          a = BigInt(44),
          c = BigInt(88),
          u = (t * t * t) % e,
          h = (u * u * t) % e,
          l = (Lt(h, n, e) * h) % e,
          d = (Lt(l, n, e) * h) % e,
          f = (Lt(d, Tn, e) * u) % e,
          p = (Lt(f, i, e) * f) % e,
          y = (Lt(p, o, e) * p) % e,
          g = (Lt(y, a, e) * y) % e,
          m = (Lt(g, c, e) * g) % e,
          w = (Lt(m, a, e) * y) % e,
          b = (Lt(w, n, e) * h) % e,
          v = (Lt(b, s, e) * p) % e,
          k = (Lt(v, r, e) * u) % e,
          S = Lt(k, Tn, e);
        if (!Bn.eql(Bn.sqr(S), t)) throw new Error("Cannot find square root");
        return S;
      }
      const Bn = jt(An, void 0, void 0, { sqrt: On }),
        jn = (function (t, e) {
          const n = (e) => En({ ...t, ..._n(e) });
          return Object.freeze({ ...n(e), create: n });
        })(
          {
            a: BigInt(0),
            b: BigInt(7),
            Fp: Bn,
            n: xn,
            Gx: BigInt(
              "55066263022277343669578718895168534326250603453777594175500187360389116729240"
            ),
            Gy: BigInt(
              "32670510020758816978083085130507043184471273380659243275938904335757337482424"
            ),
            h: BigInt(1),
            lowS: !0,
            endo: {
              beta: BigInt(
                "0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"
              ),
              splitScalar: (t) => {
                const e = xn,
                  n = BigInt("0x3086d221a7d46bcde86c90e49284eb15"),
                  r = -Ln * BigInt("0xe4437ed6010e88286f547fa90abfe4c3"),
                  i = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"),
                  o = n,
                  s = BigInt("0x100000000000000000000000000000000"),
                  a = Nn(o * t, e),
                  c = Nn(-r * t, e);
                let u = At(t - a * n - c * i, e),
                  h = At(-a * r - c * o, e);
                const l = u > s,
                  d = h > s;
                if ((l && (u = e - u), d && (h = e - h), u > s || h > s))
                  throw new Error("splitScalar: Endomorphism failed, k=" + t);
                return { k1neg: l, k1: u, k2neg: d, k2: h };
              },
            },
          },
          we
        );
      BigInt(0);
      jn.ProjectivePoint;
      const Pn = ae.utils.randomPrivateKey,
        Cn = () => {
          const t = ae.utils.randomPrivateKey(),
            e = Rn(t),
            n = new Uint8Array(64);
          return n.set(t), n.set(e, 32), { publicKey: e, secretKey: n };
        },
        Rn = ae.getPublicKey;
      function zn(t) {
        try {
          return ae.ExtendedPoint.fromHex(t), !0;
        } catch {
          return !1;
        }
      }
      const Dn = (t, e) => ae.sign(t, e.slice(0, 32)),
        Un = ae.verify,
        Wn = (t) =>
          i.Buffer.isBuffer(t)
            ? t
            : t instanceof Uint8Array
            ? i.Buffer.from(t.buffer, t.byteOffset, t.byteLength)
            : i.Buffer.from(t);
      class Kn {
        constructor(t) {
          Object.assign(this, t);
        }
        encode() {
          return i.Buffer.from((0, be.serialize)(Hn, this));
        }
        static decode(t) {
          return (0, be.deserialize)(Hn, this, t);
        }
        static decodeUnchecked(t) {
          return (0, be.deserializeUnchecked)(Hn, this, t);
        }
      }
      class qn extends Kn {
        constructor(t) {
          if ((super(t), (this.enum = ""), 1 !== Object.keys(t).length))
            throw new Error("Enum can only take single value");
          Object.keys(t).map((t) => {
            this.enum = t;
          });
        }
      }
      const Hn = new Map();
      var Fn;
      let Yn;
      const Vn = 32,
        $n = 32;
      let Zn = 1;
      Yn = Symbol.toStringTag;
      class Gn extends Kn {
        constructor(t) {
          if (
            (super({}),
            (this._bn = void 0),
            (function (t) {
              return void 0 !== t._bn;
            })(t))
          )
            this._bn = t._bn;
          else {
            if ("string" === typeof t) {
              const e = fe().decode(t);
              if (e.length != $n) throw new Error("Invalid public key input");
              this._bn = new (le())(e);
            } else this._bn = new (le())(t);
            if (this._bn.byteLength() > $n)
              throw new Error("Invalid public key input");
          }
        }
        static unique() {
          const t = new Gn(Zn);
          return (Zn += 1), new Gn(t.toBuffer());
        }
        equals(t) {
          return this._bn.eq(t._bn);
        }
        toBase58() {
          return fe().encode(this.toBytes());
        }
        toJSON() {
          return this.toBase58();
        }
        toBytes() {
          const t = this.toBuffer();
          return new Uint8Array(t.buffer, t.byteOffset, t.byteLength);
        }
        toBuffer() {
          const t = this._bn.toArrayLike(i.Buffer);
          if (t.length === $n) return t;
          const e = i.Buffer.alloc(32);
          return t.copy(e, 32 - t.length), e;
        }
        get [Yn]() {
          return `PublicKey(${this.toString()})`;
        }
        toString() {
          return this.toBase58();
        }
        static async createWithSeed(t, e, n) {
          const r = i.Buffer.concat([
              t.toBuffer(),
              i.Buffer.from(e),
              n.toBuffer(),
            ]),
            o = we(r);
          return new Gn(o);
        }
        static createProgramAddressSync(t, e) {
          let n = i.Buffer.alloc(0);
          t.forEach(function (t) {
            if (t.length > Vn) throw new TypeError("Max seed length exceeded");
            n = i.Buffer.concat([n, Wn(t)]);
          }),
            (n = i.Buffer.concat([
              n,
              e.toBuffer(),
              i.Buffer.from("ProgramDerivedAddress"),
            ]));
          const r = we(n);
          if (zn(r))
            throw new Error("Invalid seeds, address must fall off the curve");
          return new Gn(r);
        }
        static async createProgramAddress(t, e) {
          return this.createProgramAddressSync(t, e);
        }
        static findProgramAddressSync(t, e) {
          let n,
            r = 255;
          for (; 0 != r; ) {
            try {
              const o = t.concat(i.Buffer.from([r]));
              n = this.createProgramAddressSync(o, e);
            } catch (o) {
              if (o instanceof TypeError) throw o;
              r--;
              continue;
            }
            return [n, r];
          }
          throw new Error("Unable to find a viable program address nonce");
        }
        static async findProgramAddress(t, e) {
          return this.findProgramAddressSync(t, e);
        }
        static isOnCurve(t) {
          return zn(new Gn(t).toBytes());
        }
      }
      (Fn = Gn),
        (Gn.default = new Fn("11111111111111111111111111111111")),
        Hn.set(Gn, { kind: "struct", fields: [["_bn", "u256"]] });
      class Qn {
        constructor(t) {
          if (((this._publicKey = void 0), (this._secretKey = void 0), t)) {
            const e = Wn(t);
            if (64 !== t.length) throw new Error("bad secret key size");
            (this._publicKey = e.slice(32, 64)),
              (this._secretKey = e.slice(0, 32));
          } else
            (this._secretKey = Wn(Pn())),
              (this._publicKey = Wn(Rn(this._secretKey)));
        }
        get publicKey() {
          return new Gn(this._publicKey);
        }
        get secretKey() {
          return i.Buffer.concat([this._secretKey, this._publicKey], 64);
        }
      }
      const Jn = new Gn("BPFLoader1111111111111111111111111111111111"),
        Xn = 1232,
        tr = 127,
        er = 64;
      class nr extends Error {
        constructor(t) {
          super(`Signature ${t} has expired: block height exceeded.`),
            (this.signature = void 0),
            (this.signature = t);
        }
      }
      Object.defineProperty(nr.prototype, "name", {
        value: "TransactionExpiredBlockheightExceededError",
      });
      class rr extends Error {
        constructor(t, e) {
          super(
            `Transaction was not confirmed in ${e.toFixed(
              2
            )} seconds. It is unknown if it succeeded or failed. Check signature ${t} using the Solana Explorer or CLI tools.`
          ),
            (this.signature = void 0),
            (this.signature = t);
        }
      }
      Object.defineProperty(rr.prototype, "name", {
        value: "TransactionExpiredTimeoutError",
      });
      class ir extends Error {
        constructor(t) {
          super(`Signature ${t} has expired: the nonce is no longer valid.`),
            (this.signature = void 0),
            (this.signature = t);
        }
      }
      Object.defineProperty(ir.prototype, "name", {
        value: "TransactionExpiredNonceInvalidError",
      });
      class or {
        constructor(t, e) {
          (this.staticAccountKeys = void 0),
            (this.accountKeysFromLookups = void 0),
            (this.staticAccountKeys = t),
            (this.accountKeysFromLookups = e);
        }
        keySegments() {
          const t = [this.staticAccountKeys];
          return (
            this.accountKeysFromLookups &&
              (t.push(this.accountKeysFromLookups.writable),
              t.push(this.accountKeysFromLookups.readonly)),
            t
          );
        }
        get(t) {
          for (const e of this.keySegments()) {
            if (t < e.length) return e[t];
            t -= e.length;
          }
        }
        get length() {
          return this.keySegments().flat().length;
        }
        compileInstructions(t) {
          if (this.length > 256)
            throw new Error(
              "Account index overflow encountered during compilation"
            );
          const e = new Map();
          this.keySegments()
            .flat()
            .forEach((t, n) => {
              e.set(t.toBase58(), n);
            });
          const n = (t) => {
            const n = e.get(t.toBase58());
            if (void 0 === n)
              throw new Error(
                "Encountered an unknown instruction account key during compilation"
              );
            return n;
          };
          return t.map((t) => ({
            programIdIndex: n(t.programId),
            accountKeyIndexes: t.keys.map((t) => n(t.pubkey)),
            data: t.data,
          }));
        }
      }
      const sr = (t = "publicKey") => ve.Ik(32, t),
        ar = (t = "signature") => ve.Ik(64, t),
        cr = (t = "string") => {
          const e = ve.n_(
              [
                ve.Jq("length"),
                ve.Jq("lengthPadding"),
                ve.Ik(ve.cv(ve.Jq(), -8), "chars"),
              ],
              t
            ),
            n = e.decode.bind(e),
            r = e.encode.bind(e),
            o = e;
          return (
            (o.decode = (t, e) => n(t, e).chars.toString()),
            (o.encode = (t, e, n) => {
              const o = { chars: i.Buffer.from(t, "utf8") };
              return r(o, e, n);
            }),
            (o.alloc = (t) =>
              ve.Jq().span + ve.Jq().span + i.Buffer.from(t, "utf8").length),
            o
          );
        };
      function ur(t, e) {
        const n = (t) => {
          if (t.span >= 0) return t.span;
          if ("function" === typeof t.alloc) return t.alloc(e[t.property]);
          if ("count" in t && "elementLayout" in t) {
            const r = e[t.property];
            if (Array.isArray(r)) return r.length * n(t.elementLayout);
          } else if ("fields" in t) return ur({ layout: t }, e[t.property]);
          return 0;
        };
        let r = 0;
        return (
          t.layout.fields.forEach((t) => {
            r += n(t);
          }),
          r
        );
      }
      function hr(t) {
        let e = 0,
          n = 0;
        for (;;) {
          let r = t.shift();
          if (((e |= (127 & r) << (7 * n)), (n += 1), 0 === (128 & r))) break;
        }
        return e;
      }
      function lr(t, e) {
        let n = e;
        for (;;) {
          let e = 127 & n;
          if (((n >>= 7), 0 == n)) {
            t.push(e);
            break;
          }
          (e |= 128), t.push(e);
        }
      }
      function dr(t, e) {
        if (!t) throw new Error(e || "Assertion failed");
      }
      class fr {
        constructor(t, e) {
          (this.payer = void 0),
            (this.keyMetaMap = void 0),
            (this.payer = t),
            (this.keyMetaMap = e);
        }
        static compile(t, e) {
          const n = new Map(),
            r = (t) => {
              const e = t.toBase58();
              let r = n.get(e);
              return (
                void 0 === r &&
                  ((r = { isSigner: !1, isWritable: !1, isInvoked: !1 }),
                  n.set(e, r)),
                r
              );
            },
            i = r(e);
          (i.isSigner = !0), (i.isWritable = !0);
          for (const o of t) {
            r(o.programId).isInvoked = !0;
            for (const t of o.keys) {
              const e = r(t.pubkey);
              (e.isSigner ||= t.isSigner), (e.isWritable ||= t.isWritable);
            }
          }
          return new fr(e, n);
        }
        getMessageComponents() {
          const t = [...this.keyMetaMap.entries()];
          dr(t.length <= 256, "Max static account keys length exceeded");
          const e = t.filter(([, t]) => t.isSigner && t.isWritable),
            n = t.filter(([, t]) => t.isSigner && !t.isWritable),
            r = t.filter(([, t]) => !t.isSigner && t.isWritable),
            i = t.filter(([, t]) => !t.isSigner && !t.isWritable),
            o = {
              numRequiredSignatures: e.length + n.length,
              numReadonlySignedAccounts: n.length,
              numReadonlyUnsignedAccounts: i.length,
            };
          {
            dr(e.length > 0, "Expected at least one writable signer key");
            const [t] = e[0];
            dr(
              t === this.payer.toBase58(),
              "Expected first writable signer key to be the fee payer"
            );
          }
          return [
            o,
            [
              ...e.map(([t]) => new Gn(t)),
              ...n.map(([t]) => new Gn(t)),
              ...r.map(([t]) => new Gn(t)),
              ...i.map(([t]) => new Gn(t)),
            ],
          ];
        }
        extractTableLookup(t) {
          const [e, n] = this.drainKeysFoundInLookupTable(
              t.state.addresses,
              (t) => !t.isSigner && !t.isInvoked && t.isWritable
            ),
            [r, i] = this.drainKeysFoundInLookupTable(
              t.state.addresses,
              (t) => !t.isSigner && !t.isInvoked && !t.isWritable
            );
          if (0 !== e.length || 0 !== r.length)
            return [
              { accountKey: t.key, writableIndexes: e, readonlyIndexes: r },
              { writable: n, readonly: i },
            ];
        }
        drainKeysFoundInLookupTable(t, e) {
          const n = new Array(),
            r = new Array();
          for (const [i, o] of this.keyMetaMap.entries())
            if (e(o)) {
              const e = new Gn(i),
                o = t.findIndex((t) => t.equals(e));
              o >= 0 &&
                (dr(o < 256, "Max lookup table index exceeded"),
                n.push(o),
                r.push(e),
                this.keyMetaMap.delete(i));
            }
          return [n, r];
        }
      }
      class pr {
        constructor(t) {
          (this.header = void 0),
            (this.accountKeys = void 0),
            (this.recentBlockhash = void 0),
            (this.instructions = void 0),
            (this.indexToProgramIds = new Map()),
            (this.header = t.header),
            (this.accountKeys = t.accountKeys.map((t) => new Gn(t))),
            (this.recentBlockhash = t.recentBlockhash),
            (this.instructions = t.instructions),
            this.instructions.forEach((t) =>
              this.indexToProgramIds.set(
                t.programIdIndex,
                this.accountKeys[t.programIdIndex]
              )
            );
        }
        get version() {
          return "legacy";
        }
        get staticAccountKeys() {
          return this.accountKeys;
        }
        get compiledInstructions() {
          return this.instructions.map((t) => ({
            programIdIndex: t.programIdIndex,
            accountKeyIndexes: t.accounts,
            data: fe().decode(t.data),
          }));
        }
        get addressTableLookups() {
          return [];
        }
        getAccountKeys() {
          return new or(this.staticAccountKeys);
        }
        static compile(t) {
          const e = fr.compile(t.instructions, t.payerKey),
            [n, r] = e.getMessageComponents(),
            i = new or(r).compileInstructions(t.instructions).map((t) => ({
              programIdIndex: t.programIdIndex,
              accounts: t.accountKeyIndexes,
              data: fe().encode(t.data),
            }));
          return new pr({
            header: n,
            accountKeys: r,
            recentBlockhash: t.recentBlockhash,
            instructions: i,
          });
        }
        isAccountSigner(t) {
          return t < this.header.numRequiredSignatures;
        }
        isAccountWritable(t) {
          const e = this.header.numRequiredSignatures;
          if (t >= this.header.numRequiredSignatures) {
            return (
              t - e <
              this.accountKeys.length -
                e -
                this.header.numReadonlyUnsignedAccounts
            );
          }
          return t < e - this.header.numReadonlySignedAccounts;
        }
        isProgramId(t) {
          return this.indexToProgramIds.has(t);
        }
        programIds() {
          return [...this.indexToProgramIds.values()];
        }
        nonProgramIds() {
          return this.accountKeys.filter((t, e) => !this.isProgramId(e));
        }
        serialize() {
          const t = this.accountKeys.length;
          let e = [];
          lr(e, t);
          const n = this.instructions.map((t) => {
            const { accounts: e, programIdIndex: n } = t,
              r = Array.from(fe().decode(t.data));
            let o = [];
            lr(o, e.length);
            let s = [];
            return (
              lr(s, r.length),
              {
                programIdIndex: n,
                keyIndicesCount: i.Buffer.from(o),
                keyIndices: e,
                dataLength: i.Buffer.from(s),
                data: r,
              }
            );
          });
          let r = [];
          lr(r, n.length);
          let o = i.Buffer.alloc(Xn);
          i.Buffer.from(r).copy(o);
          let s = r.length;
          n.forEach((t) => {
            const e = ve
              .n_([
                ve.u8("programIdIndex"),
                ve.Ik(t.keyIndicesCount.length, "keyIndicesCount"),
                ve.A9(ve.u8("keyIndex"), t.keyIndices.length, "keyIndices"),
                ve.Ik(t.dataLength.length, "dataLength"),
                ve.A9(ve.u8("userdatum"), t.data.length, "data"),
              ])
              .encode(t, o, s);
            s += e;
          }),
            (o = o.slice(0, s));
          const a = ve.n_([
              ve.Ik(1, "numRequiredSignatures"),
              ve.Ik(1, "numReadonlySignedAccounts"),
              ve.Ik(1, "numReadonlyUnsignedAccounts"),
              ve.Ik(e.length, "keyCount"),
              ve.A9(sr("key"), t, "keys"),
              sr("recentBlockhash"),
            ]),
            c = {
              numRequiredSignatures: i.Buffer.from([
                this.header.numRequiredSignatures,
              ]),
              numReadonlySignedAccounts: i.Buffer.from([
                this.header.numReadonlySignedAccounts,
              ]),
              numReadonlyUnsignedAccounts: i.Buffer.from([
                this.header.numReadonlyUnsignedAccounts,
              ]),
              keyCount: i.Buffer.from(e),
              keys: this.accountKeys.map((t) => Wn(t.toBytes())),
              recentBlockhash: fe().decode(this.recentBlockhash),
            };
          let u = i.Buffer.alloc(2048);
          const h = a.encode(c, u);
          return o.copy(u, h), u.slice(0, h + o.length);
        }
        static from(t) {
          let e = [...t];
          const n = e.shift();
          if (n !== (n & tr))
            throw new Error(
              "Versioned messages must be deserialized with VersionedMessage.deserialize()"
            );
          const r = e.shift(),
            o = e.shift(),
            s = hr(e);
          let a = [];
          for (let d = 0; d < s; d++) {
            const t = e.splice(0, $n);
            a.push(new Gn(i.Buffer.from(t)));
          }
          const c = e.splice(0, $n),
            u = hr(e);
          let h = [];
          for (let d = 0; d < u; d++) {
            const t = e.shift(),
              n = hr(e),
              r = e.splice(0, n),
              o = hr(e),
              s = e.splice(0, o),
              a = fe().encode(i.Buffer.from(s));
            h.push({ programIdIndex: t, accounts: r, data: a });
          }
          const l = {
            header: {
              numRequiredSignatures: n,
              numReadonlySignedAccounts: r,
              numReadonlyUnsignedAccounts: o,
            },
            recentBlockhash: fe().encode(i.Buffer.from(c)),
            accountKeys: a,
            instructions: h,
          };
          return new pr(l);
        }
      }
      class yr {
        constructor(t) {
          (this.header = void 0),
            (this.staticAccountKeys = void 0),
            (this.recentBlockhash = void 0),
            (this.compiledInstructions = void 0),
            (this.addressTableLookups = void 0),
            (this.header = t.header),
            (this.staticAccountKeys = t.staticAccountKeys),
            (this.recentBlockhash = t.recentBlockhash),
            (this.compiledInstructions = t.compiledInstructions),
            (this.addressTableLookups = t.addressTableLookups);
        }
        get version() {
          return 0;
        }
        get numAccountKeysFromLookups() {
          let t = 0;
          for (const e of this.addressTableLookups)
            t += e.readonlyIndexes.length + e.writableIndexes.length;
          return t;
        }
        getAccountKeys(t) {
          let e;
          if (t && "accountKeysFromLookups" in t && t.accountKeysFromLookups) {
            if (
              this.numAccountKeysFromLookups !=
              t.accountKeysFromLookups.writable.length +
                t.accountKeysFromLookups.readonly.length
            )
              throw new Error(
                "Failed to get account keys because of a mismatch in the number of account keys from lookups"
              );
            e = t.accountKeysFromLookups;
          } else if (
            t &&
            "addressLookupTableAccounts" in t &&
            t.addressLookupTableAccounts
          )
            e = this.resolveAddressTableLookups(t.addressLookupTableAccounts);
          else if (this.addressTableLookups.length > 0)
            throw new Error(
              "Failed to get account keys because address table lookups were not resolved"
            );
          return new or(this.staticAccountKeys, e);
        }
        isAccountSigner(t) {
          return t < this.header.numRequiredSignatures;
        }
        isAccountWritable(t) {
          const e = this.header.numRequiredSignatures,
            n = this.staticAccountKeys.length;
          if (t >= n) {
            return (
              t - n <
              this.addressTableLookups.reduce(
                (t, e) => t + e.writableIndexes.length,
                0
              )
            );
          }
          if (t >= this.header.numRequiredSignatures) {
            return t - e < n - e - this.header.numReadonlyUnsignedAccounts;
          }
          return t < e - this.header.numReadonlySignedAccounts;
        }
        resolveAddressTableLookups(t) {
          const e = { writable: [], readonly: [] };
          for (const n of this.addressTableLookups) {
            const r = t.find((t) => t.key.equals(n.accountKey));
            if (!r)
              throw new Error(
                `Failed to find address lookup table account for table key ${n.accountKey.toBase58()}`
              );
            for (const t of n.writableIndexes) {
              if (!(t < r.state.addresses.length))
                throw new Error(
                  `Failed to find address for index ${t} in address lookup table ${n.accountKey.toBase58()}`
                );
              e.writable.push(r.state.addresses[t]);
            }
            for (const t of n.readonlyIndexes) {
              if (!(t < r.state.addresses.length))
                throw new Error(
                  `Failed to find address for index ${t} in address lookup table ${n.accountKey.toBase58()}`
                );
              e.readonly.push(r.state.addresses[t]);
            }
          }
          return e;
        }
        static compile(t) {
          const e = fr.compile(t.instructions, t.payerKey),
            n = new Array(),
            r = { writable: new Array(), readonly: new Array() },
            i = t.addressLookupTableAccounts || [];
          for (const c of i) {
            const t = e.extractTableLookup(c);
            if (void 0 !== t) {
              const [e, { writable: i, readonly: o }] = t;
              n.push(e), r.writable.push(...i), r.readonly.push(...o);
            }
          }
          const [o, s] = e.getMessageComponents(),
            a = new or(s, r).compileInstructions(t.instructions);
          return new yr({
            header: o,
            staticAccountKeys: s,
            recentBlockhash: t.recentBlockhash,
            compiledInstructions: a,
            addressTableLookups: n,
          });
        }
        serialize() {
          const t = Array();
          lr(t, this.staticAccountKeys.length);
          const e = this.serializeInstructions(),
            n = Array();
          lr(n, this.compiledInstructions.length);
          const r = this.serializeAddressTableLookups(),
            i = Array();
          lr(i, this.addressTableLookups.length);
          const o = ve.n_([
              ve.u8("prefix"),
              ve.n_(
                [
                  ve.u8("numRequiredSignatures"),
                  ve.u8("numReadonlySignedAccounts"),
                  ve.u8("numReadonlyUnsignedAccounts"),
                ],
                "header"
              ),
              ve.Ik(t.length, "staticAccountKeysLength"),
              ve.A9(sr(), this.staticAccountKeys.length, "staticAccountKeys"),
              sr("recentBlockhash"),
              ve.Ik(n.length, "instructionsLength"),
              ve.Ik(e.length, "serializedInstructions"),
              ve.Ik(i.length, "addressTableLookupsLength"),
              ve.Ik(r.length, "serializedAddressTableLookups"),
            ]),
            s = new Uint8Array(Xn),
            a = o.encode(
              {
                prefix: 128,
                header: this.header,
                staticAccountKeysLength: new Uint8Array(t),
                staticAccountKeys: this.staticAccountKeys.map((t) =>
                  t.toBytes()
                ),
                recentBlockhash: fe().decode(this.recentBlockhash),
                instructionsLength: new Uint8Array(n),
                serializedInstructions: e,
                addressTableLookupsLength: new Uint8Array(i),
                serializedAddressTableLookups: r,
              },
              s
            );
          return s.slice(0, a);
        }
        serializeInstructions() {
          let t = 0;
          const e = new Uint8Array(Xn);
          for (const n of this.compiledInstructions) {
            const r = Array();
            lr(r, n.accountKeyIndexes.length);
            const i = Array();
            lr(i, n.data.length);
            t += ve
              .n_([
                ve.u8("programIdIndex"),
                ve.Ik(r.length, "encodedAccountKeyIndexesLength"),
                ve.A9(ve.u8(), n.accountKeyIndexes.length, "accountKeyIndexes"),
                ve.Ik(i.length, "encodedDataLength"),
                ve.Ik(n.data.length, "data"),
              ])
              .encode(
                {
                  programIdIndex: n.programIdIndex,
                  encodedAccountKeyIndexesLength: new Uint8Array(r),
                  accountKeyIndexes: n.accountKeyIndexes,
                  encodedDataLength: new Uint8Array(i),
                  data: n.data,
                },
                e,
                t
              );
          }
          return e.slice(0, t);
        }
        serializeAddressTableLookups() {
          let t = 0;
          const e = new Uint8Array(Xn);
          for (const n of this.addressTableLookups) {
            const r = Array();
            lr(r, n.writableIndexes.length);
            const i = Array();
            lr(i, n.readonlyIndexes.length);
            t += ve
              .n_([
                sr("accountKey"),
                ve.Ik(r.length, "encodedWritableIndexesLength"),
                ve.A9(ve.u8(), n.writableIndexes.length, "writableIndexes"),
                ve.Ik(i.length, "encodedReadonlyIndexesLength"),
                ve.A9(ve.u8(), n.readonlyIndexes.length, "readonlyIndexes"),
              ])
              .encode(
                {
                  accountKey: n.accountKey.toBytes(),
                  encodedWritableIndexesLength: new Uint8Array(r),
                  writableIndexes: n.writableIndexes,
                  encodedReadonlyIndexesLength: new Uint8Array(i),
                  readonlyIndexes: n.readonlyIndexes,
                },
                e,
                t
              );
          }
          return e.slice(0, t);
        }
        static deserialize(t) {
          let e = [...t];
          const n = e.shift(),
            r = n & tr;
          dr(n !== r, "Expected versioned message but received legacy message");
          dr(
            0 === r,
            `Expected versioned message with version 0 but found version ${r}`
          );
          const i = {
              numRequiredSignatures: e.shift(),
              numReadonlySignedAccounts: e.shift(),
              numReadonlyUnsignedAccounts: e.shift(),
            },
            o = [],
            s = hr(e);
          for (let d = 0; d < s; d++) o.push(new Gn(e.splice(0, $n)));
          const a = fe().encode(e.splice(0, $n)),
            c = hr(e),
            u = [];
          for (let d = 0; d < c; d++) {
            const t = e.shift(),
              n = hr(e),
              r = e.splice(0, n),
              i = hr(e),
              o = new Uint8Array(e.splice(0, i));
            u.push({ programIdIndex: t, accountKeyIndexes: r, data: o });
          }
          const h = hr(e),
            l = [];
          for (let d = 0; d < h; d++) {
            const t = new Gn(e.splice(0, $n)),
              n = hr(e),
              r = e.splice(0, n),
              i = hr(e),
              o = e.splice(0, i);
            l.push({ accountKey: t, writableIndexes: r, readonlyIndexes: o });
          }
          return new yr({
            header: i,
            staticAccountKeys: o,
            recentBlockhash: a,
            compiledInstructions: u,
            addressTableLookups: l,
          });
        }
      }
      const gr = {
        deserializeMessageVersion(t) {
          const e = t[0],
            n = e & tr;
          return n === e ? "legacy" : n;
        },
        deserialize: (t) => {
          const e = gr.deserializeMessageVersion(t);
          if ("legacy" === e) return pr.from(t);
          if (0 === e) return yr.deserialize(t);
          throw new Error(
            `Transaction message version ${e} deserialization is not supported`
          );
        },
      };
      let mr = (function (t) {
        return (
          (t[(t.BLOCKHEIGHT_EXCEEDED = 0)] = "BLOCKHEIGHT_EXCEEDED"),
          (t[(t.PROCESSED = 1)] = "PROCESSED"),
          (t[(t.TIMED_OUT = 2)] = "TIMED_OUT"),
          (t[(t.NONCE_INVALID = 3)] = "NONCE_INVALID"),
          t
        );
      })({});
      const wr = i.Buffer.alloc(er).fill(0);
      class br {
        constructor(t) {
          (this.keys = void 0),
            (this.programId = void 0),
            (this.data = i.Buffer.alloc(0)),
            (this.programId = t.programId),
            (this.keys = t.keys),
            t.data && (this.data = t.data);
        }
        toJSON() {
          return {
            keys: this.keys.map(
              ({ pubkey: t, isSigner: e, isWritable: n }) => ({
                pubkey: t.toJSON(),
                isSigner: e,
                isWritable: n,
              })
            ),
            programId: this.programId.toJSON(),
            data: [...this.data],
          };
        }
      }
      class vr {
        get signature() {
          return this.signatures.length > 0
            ? this.signatures[0].signature
            : null;
        }
        constructor(t) {
          if (
            ((this.signatures = []),
            (this.feePayer = void 0),
            (this.instructions = []),
            (this.recentBlockhash = void 0),
            (this.lastValidBlockHeight = void 0),
            (this.nonceInfo = void 0),
            (this.minNonceContextSlot = void 0),
            (this._message = void 0),
            (this._json = void 0),
            t)
          )
            if (
              (t.feePayer && (this.feePayer = t.feePayer),
              t.signatures && (this.signatures = t.signatures),
              Object.prototype.hasOwnProperty.call(t, "nonceInfo"))
            ) {
              const { minContextSlot: e, nonceInfo: n } = t;
              (this.minNonceContextSlot = e), (this.nonceInfo = n);
            } else if (
              Object.prototype.hasOwnProperty.call(t, "lastValidBlockHeight")
            ) {
              const { blockhash: e, lastValidBlockHeight: n } = t;
              (this.recentBlockhash = e), (this.lastValidBlockHeight = n);
            } else {
              const { recentBlockhash: e, nonceInfo: n } = t;
              n && (this.nonceInfo = n), (this.recentBlockhash = e);
            }
        }
        toJSON() {
          return {
            recentBlockhash: this.recentBlockhash || null,
            feePayer: this.feePayer ? this.feePayer.toJSON() : null,
            nonceInfo: this.nonceInfo
              ? {
                  nonce: this.nonceInfo.nonce,
                  nonceInstruction: this.nonceInfo.nonceInstruction.toJSON(),
                }
              : null,
            instructions: this.instructions.map((t) => t.toJSON()),
            signers: this.signatures.map(({ publicKey: t }) => t.toJSON()),
          };
        }
        add(...t) {
          if (0 === t.length) throw new Error("No instructions");
          return (
            t.forEach((t) => {
              "instructions" in t
                ? (this.instructions = this.instructions.concat(t.instructions))
                : "data" in t && "programId" in t && "keys" in t
                ? this.instructions.push(t)
                : this.instructions.push(new br(t));
            }),
            this
          );
        }
        compileMessage() {
          if (
            this._message &&
            JSON.stringify(this.toJSON()) === JSON.stringify(this._json)
          )
            return this._message;
          let t, e, n;
          if (
            (this.nonceInfo
              ? ((t = this.nonceInfo.nonce),
                (e =
                  this.instructions[0] != this.nonceInfo.nonceInstruction
                    ? [this.nonceInfo.nonceInstruction, ...this.instructions]
                    : this.instructions))
              : ((t = this.recentBlockhash), (e = this.instructions)),
            !t)
          )
            throw new Error("Transaction recentBlockhash required");
          if (
            (e.length < 1 && console.warn("No instructions provided"),
            this.feePayer)
          )
            n = this.feePayer;
          else {
            if (!(this.signatures.length > 0 && this.signatures[0].publicKey))
              throw new Error("Transaction fee payer required");
            n = this.signatures[0].publicKey;
          }
          for (let p = 0; p < e.length; p++)
            if (void 0 === e[p].programId)
              throw new Error(
                `Transaction instruction index ${p} has undefined program id`
              );
          const r = [],
            i = [];
          e.forEach((t) => {
            t.keys.forEach((t) => {
              i.push({ ...t });
            });
            const e = t.programId.toString();
            r.includes(e) || r.push(e);
          }),
            r.forEach((t) => {
              i.push({ pubkey: new Gn(t), isSigner: !1, isWritable: !1 });
            });
          const o = [];
          i.forEach((t) => {
            const e = t.pubkey.toString(),
              n = o.findIndex((t) => t.pubkey.toString() === e);
            n > -1
              ? ((o[n].isWritable = o[n].isWritable || t.isWritable),
                (o[n].isSigner = o[n].isSigner || t.isSigner))
              : o.push(t);
          }),
            o.sort(function (t, e) {
              if (t.isSigner !== e.isSigner) return t.isSigner ? -1 : 1;
              if (t.isWritable !== e.isWritable) return t.isWritable ? -1 : 1;
              return t.pubkey
                .toBase58()
                .localeCompare(e.pubkey.toBase58(), "en", {
                  localeMatcher: "best fit",
                  usage: "sort",
                  sensitivity: "variant",
                  ignorePunctuation: !1,
                  numeric: !1,
                  caseFirst: "lower",
                });
            });
          const s = o.findIndex((t) => t.pubkey.equals(n));
          if (s > -1) {
            const [t] = o.splice(s, 1);
            (t.isSigner = !0), (t.isWritable = !0), o.unshift(t);
          } else o.unshift({ pubkey: n, isSigner: !0, isWritable: !0 });
          for (const p of this.signatures) {
            const t = o.findIndex((t) => t.pubkey.equals(p.publicKey));
            if (!(t > -1))
              throw new Error(`unknown signer: ${p.publicKey.toString()}`);
            o[t].isSigner ||
              ((o[t].isSigner = !0),
              console.warn(
                "Transaction references a signature that is unnecessary, only the fee payer and instruction signer accounts should sign a transaction. This behavior is deprecated and will throw an error in the next major version release."
              ));
          }
          let a = 0,
            c = 0,
            u = 0;
          const h = [],
            l = [];
          o.forEach(({ pubkey: t, isSigner: e, isWritable: n }) => {
            e
              ? (h.push(t.toString()), (a += 1), n || (c += 1))
              : (l.push(t.toString()), n || (u += 1));
          });
          const d = h.concat(l),
            f = e.map((t) => {
              const { data: e, programId: n } = t;
              return {
                programIdIndex: d.indexOf(n.toString()),
                accounts: t.keys.map((t) => d.indexOf(t.pubkey.toString())),
                data: fe().encode(e),
              };
            });
          return (
            f.forEach((t) => {
              dr(t.programIdIndex >= 0), t.accounts.forEach((t) => dr(t >= 0));
            }),
            new pr({
              header: {
                numRequiredSignatures: a,
                numReadonlySignedAccounts: c,
                numReadonlyUnsignedAccounts: u,
              },
              accountKeys: d,
              recentBlockhash: t,
              instructions: f,
            })
          );
        }
        _compile() {
          const t = this.compileMessage(),
            e = t.accountKeys.slice(0, t.header.numRequiredSignatures);
          if (this.signatures.length === e.length) {
            if (this.signatures.every((t, n) => e[n].equals(t.publicKey)))
              return t;
          }
          return (
            (this.signatures = e.map((t) => ({
              signature: null,
              publicKey: t,
            }))),
            t
          );
        }
        serializeMessage() {
          return this._compile().serialize();
        }
        async getEstimatedFee(t) {
          return (await t.getFeeForMessage(this.compileMessage())).value;
        }
        setSigners(...t) {
          if (0 === t.length) throw new Error("No signers");
          const e = new Set();
          this.signatures = t
            .filter((t) => {
              const n = t.toString();
              return !e.has(n) && (e.add(n), !0);
            })
            .map((t) => ({ signature: null, publicKey: t }));
        }
        sign(...t) {
          if (0 === t.length) throw new Error("No signers");
          const e = new Set(),
            n = [];
          for (const i of t) {
            const t = i.publicKey.toString();
            e.has(t) || (e.add(t), n.push(i));
          }
          this.signatures = n.map((t) => ({
            signature: null,
            publicKey: t.publicKey,
          }));
          const r = this._compile();
          this._partialSign(r, ...n);
        }
        partialSign(...t) {
          if (0 === t.length) throw new Error("No signers");
          const e = new Set(),
            n = [];
          for (const i of t) {
            const t = i.publicKey.toString();
            e.has(t) || (e.add(t), n.push(i));
          }
          const r = this._compile();
          this._partialSign(r, ...n);
        }
        _partialSign(t, ...e) {
          const n = t.serialize();
          e.forEach((t) => {
            const e = Dn(n, t.secretKey);
            this._addSignature(t.publicKey, Wn(e));
          });
        }
        addSignature(t, e) {
          this._compile(), this._addSignature(t, e);
        }
        _addSignature(t, e) {
          dr(64 === e.length);
          const n = this.signatures.findIndex((e) => t.equals(e.publicKey));
          if (n < 0) throw new Error(`unknown signer: ${t.toString()}`);
          this.signatures[n].signature = i.Buffer.from(e);
        }
        verifySignatures(t = !0) {
          return !this._getMessageSignednessErrors(this.serializeMessage(), t);
        }
        _getMessageSignednessErrors(t, e) {
          const n = {};
          for (const { signature: r, publicKey: i } of this.signatures)
            null === r
              ? e && (n.missing ||= []).push(i)
              : Un(r, t, i.toBytes()) || (n.invalid ||= []).push(i);
          return n.invalid || n.missing ? n : void 0;
        }
        serialize(t) {
          const { requireAllSignatures: e, verifySignatures: n } =
              Object.assign(
                { requireAllSignatures: !0, verifySignatures: !0 },
                t
              ),
            r = this.serializeMessage();
          if (n) {
            const t = this._getMessageSignednessErrors(r, e);
            if (t) {
              let e = "Signature verification failed.";
              throw (
                (t.invalid &&
                  (e += `\nInvalid signature for public key${
                    1 === t.invalid.length ? "" : "(s)"
                  } [\`${t.invalid.map((t) => t.toBase58()).join("`, `")}\`].`),
                t.missing &&
                  (e += `\nMissing signature for public key${
                    1 === t.missing.length ? "" : "(s)"
                  } [\`${t.missing.map((t) => t.toBase58()).join("`, `")}\`].`),
                new Error(e))
              );
            }
          }
          return this._serialize(r);
        }
        _serialize(t) {
          const { signatures: e } = this,
            n = [];
          lr(n, e.length);
          const r = n.length + 64 * e.length + t.length,
            o = i.Buffer.alloc(r);
          return (
            dr(e.length < 256),
            i.Buffer.from(n).copy(o, 0),
            e.forEach(({ signature: t }, e) => {
              null !== t &&
                (dr(64 === t.length, "signature has invalid length"),
                i.Buffer.from(t).copy(o, n.length + 64 * e));
            }),
            t.copy(o, n.length + 64 * e.length),
            dr(o.length <= Xn, `Transaction too large: ${o.length} > ${Xn}`),
            o
          );
        }
        get keys() {
          return (
            dr(1 === this.instructions.length),
            this.instructions[0].keys.map((t) => t.pubkey)
          );
        }
        get programId() {
          return (
            dr(1 === this.instructions.length), this.instructions[0].programId
          );
        }
        get data() {
          return dr(1 === this.instructions.length), this.instructions[0].data;
        }
        static from(t) {
          let e = [...t];
          const n = hr(e);
          let r = [];
          for (let o = 0; o < n; o++) {
            const t = e.splice(0, er);
            r.push(fe().encode(i.Buffer.from(t)));
          }
          return vr.populate(pr.from(e), r);
        }
        static populate(t, e = []) {
          const n = new vr();
          return (
            (n.recentBlockhash = t.recentBlockhash),
            t.header.numRequiredSignatures > 0 &&
              (n.feePayer = t.accountKeys[0]),
            e.forEach((e, r) => {
              const i = {
                signature: e == fe().encode(wr) ? null : fe().decode(e),
                publicKey: t.accountKeys[r],
              };
              n.signatures.push(i);
            }),
            t.instructions.forEach((e) => {
              const r = e.accounts.map((e) => {
                const r = t.accountKeys[e];
                return {
                  pubkey: r,
                  isSigner:
                    n.signatures.some(
                      (t) => t.publicKey.toString() === r.toString()
                    ) || t.isAccountSigner(e),
                  isWritable: t.isAccountWritable(e),
                };
              });
              n.instructions.push(
                new br({
                  keys: r,
                  programId: t.accountKeys[e.programIdIndex],
                  data: fe().decode(e.data),
                })
              );
            }),
            (n._message = t),
            (n._json = n.toJSON()),
            n
          );
        }
      }
      class kr {
        constructor(t) {
          (this.payerKey = void 0),
            (this.instructions = void 0),
            (this.recentBlockhash = void 0),
            (this.payerKey = t.payerKey),
            (this.instructions = t.instructions),
            (this.recentBlockhash = t.recentBlockhash);
        }
        static decompile(t, e) {
          const { header: n, compiledInstructions: r, recentBlockhash: i } = t,
            {
              numRequiredSignatures: o,
              numReadonlySignedAccounts: s,
              numReadonlyUnsignedAccounts: a,
            } = n,
            c = o - s;
          dr(c > 0, "Message header is invalid");
          const u = t.staticAccountKeys.length - o - a;
          dr(u >= 0, "Message header is invalid");
          const h = t.getAccountKeys(e),
            l = h.get(0);
          if (void 0 === l)
            throw new Error(
              "Failed to decompile message because no account keys were found"
            );
          const d = [];
          for (const f of r) {
            const t = [];
            for (const r of f.accountKeyIndexes) {
              const e = h.get(r);
              if (void 0 === e)
                throw new Error(
                  `Failed to find key for account key index ${r}`
                );
              let i;
              (i =
                r < o
                  ? r < c
                  : r < h.staticAccountKeys.length
                  ? r - o < u
                  : r - h.staticAccountKeys.length <
                    h.accountKeysFromLookups.writable.length),
                t.push({
                  pubkey: e,
                  isSigner: r < n.numRequiredSignatures,
                  isWritable: i,
                });
            }
            const e = h.get(f.programIdIndex);
            if (void 0 === e)
              throw new Error(
                `Failed to find program id for program id index ${f.programIdIndex}`
              );
            d.push(new br({ programId: e, data: Wn(f.data), keys: t }));
          }
          return new kr({ payerKey: l, instructions: d, recentBlockhash: i });
        }
        compileToLegacyMessage() {
          return pr.compile({
            payerKey: this.payerKey,
            recentBlockhash: this.recentBlockhash,
            instructions: this.instructions,
          });
        }
        compileToV0Message(t) {
          return yr.compile({
            payerKey: this.payerKey,
            recentBlockhash: this.recentBlockhash,
            instructions: this.instructions,
            addressLookupTableAccounts: t,
          });
        }
      }
      class Sr {
        get version() {
          return this.message.version;
        }
        constructor(t, e) {
          if (
            ((this.signatures = void 0), (this.message = void 0), void 0 !== e)
          )
            dr(
              e.length === t.header.numRequiredSignatures,
              "Expected signatures length to be equal to the number of required signatures"
            ),
              (this.signatures = e);
          else {
            const e = [];
            for (let n = 0; n < t.header.numRequiredSignatures; n++)
              e.push(new Uint8Array(er));
            this.signatures = e;
          }
          this.message = t;
        }
        serialize() {
          const t = this.message.serialize(),
            e = Array();
          lr(e, this.signatures.length);
          const n = ve.n_([
              ve.Ik(e.length, "encodedSignaturesLength"),
              ve.A9(ar(), this.signatures.length, "signatures"),
              ve.Ik(t.length, "serializedMessage"),
            ]),
            r = new Uint8Array(2048),
            i = n.encode(
              {
                encodedSignaturesLength: new Uint8Array(e),
                signatures: this.signatures,
                serializedMessage: t,
              },
              r
            );
          return r.slice(0, i);
        }
        static deserialize(t) {
          let e = [...t];
          const n = [],
            r = hr(e);
          for (let o = 0; o < r; o++) n.push(new Uint8Array(e.splice(0, er)));
          const i = gr.deserialize(new Uint8Array(e));
          return new Sr(i, n);
        }
        sign(t) {
          const e = this.message.serialize(),
            n = this.message.staticAccountKeys.slice(
              0,
              this.message.header.numRequiredSignatures
            );
          for (const r of t) {
            const t = n.findIndex((t) => t.equals(r.publicKey));
            dr(
              t >= 0,
              `Cannot sign with non signer key ${r.publicKey.toBase58()}`
            ),
              (this.signatures[t] = Dn(e, r.secretKey));
          }
        }
        addSignature(t, e) {
          dr(64 === e.byteLength, "Signature must be 64 bytes long");
          const n = this.message.staticAccountKeys
            .slice(0, this.message.header.numRequiredSignatures)
            .findIndex((e) => e.equals(t));
          dr(
            n >= 0,
            `Can not add signature; \`${t.toBase58()}\` is not required to sign this transaction`
          ),
            (this.signatures[n] = e);
        }
      }
      const Mr = new Gn("SysvarC1ock11111111111111111111111111111111"),
        Ir = new Gn("SysvarEpochSchedu1e111111111111111111111111"),
        Er = new Gn("Sysvar1nstructions1111111111111111111111111"),
        _r = new Gn("SysvarRecentB1ockHashes11111111111111111111"),
        Ar = new Gn("SysvarRent111111111111111111111111111111111"),
        xr = new Gn("SysvarRewards111111111111111111111111111111"),
        Lr = new Gn("SysvarS1otHashes111111111111111111111111111"),
        Tr = new Gn("SysvarS1otHistory11111111111111111111111111"),
        Nr = new Gn("SysvarStakeHistory1111111111111111111111111");
      async function Or(t, e, n, r) {
        const i = r && {
            skipPreflight: r.skipPreflight,
            preflightCommitment: r.preflightCommitment || r.commitment,
            maxRetries: r.maxRetries,
            minContextSlot: r.minContextSlot,
          },
          o = await t.sendTransaction(e, n, i);
        let s;
        if (null != e.recentBlockhash && null != e.lastValidBlockHeight)
          s = (
            await t.confirmTransaction(
              {
                abortSignal: r?.abortSignal,
                signature: o,
                blockhash: e.recentBlockhash,
                lastValidBlockHeight: e.lastValidBlockHeight,
              },
              r && r.commitment
            )
          ).value;
        else if (null != e.minNonceContextSlot && null != e.nonceInfo) {
          const { nonceInstruction: n } = e.nonceInfo,
            i = n.keys[0].pubkey;
          s = (
            await t.confirmTransaction(
              {
                abortSignal: r?.abortSignal,
                minContextSlot: e.minNonceContextSlot,
                nonceAccountPubkey: i,
                nonceValue: e.nonceInfo.nonce,
                signature: o,
              },
              r && r.commitment
            )
          ).value;
        } else
          null != r?.abortSignal &&
            console.warn(
              "sendAndConfirmTransaction(): A transaction with a deprecated confirmation strategy was supplied along with an `abortSignal`. Only transactions having `lastValidBlockHeight` or a combination of `nonceInfo` and `minNonceContextSlot` are abortable."
            ),
            (s = (await t.confirmTransaction(o, r && r.commitment)).value);
        if (s.err)
          throw new Error(`Transaction ${o} failed (${JSON.stringify(s)})`);
        return o;
      }
      function Br(t) {
        return new Promise((e) => setTimeout(e, t));
      }
      function jr(t, e) {
        const n = t.layout.span >= 0 ? t.layout.span : ur(t, e),
          r = i.Buffer.alloc(n),
          o = Object.assign({ instruction: t.index }, e);
        return t.layout.encode(o, r), r;
      }
      function Pr(t, e) {
        let n;
        try {
          n = t.layout.decode(e);
        } catch (r) {
          throw new Error("invalid instruction; " + r);
        }
        if (n.instruction !== t.index)
          throw new Error(
            `invalid instruction; instruction index mismatch ${n.instruction} != ${t.index}`
          );
        return n;
      }
      const Cr = ve._O("lamportsPerSignature"),
        Rr = ve.n_([
          ve.Jq("version"),
          ve.Jq("state"),
          sr("authorizedPubkey"),
          sr("nonce"),
          ve.n_([Cr], "feeCalculator"),
        ]),
        zr = Rr.span;
      class Dr {
        constructor(t) {
          (this.authorizedPubkey = void 0),
            (this.nonce = void 0),
            (this.feeCalculator = void 0),
            (this.authorizedPubkey = t.authorizedPubkey),
            (this.nonce = t.nonce),
            (this.feeCalculator = t.feeCalculator);
        }
        static fromAccountData(t) {
          const e = Rr.decode(Wn(t), 0);
          return new Dr({
            authorizedPubkey: new Gn(e.authorizedPubkey),
            nonce: new Gn(e.nonce).toString(),
            feeCalculator: e.feeCalculator,
          });
        }
      }
      const Ur =
        ((Wr = 8),
        (t) => {
          const e = (0, ve.Ik)(Wr, t),
            { encode: n, decode: r } = ((t) => ({
              decode: t.decode.bind(t),
              encode: t.encode.bind(t),
            }))(e),
            o = e;
          return (
            (o.decode = (t, e) => {
              const n = r(t, e);
              return (0, ke.oU)(i.Buffer.from(n));
            }),
            (o.encode = (t, e, r) => {
              const i = (0, ke.k$)(t, Wr);
              return n(i, e, r);
            }),
            o
          );
        });
      var Wr;
      class Kr {
        constructor() {}
        static decodeInstructionType(t) {
          this.checkProgramId(t.programId);
          const e = ve.Jq("instruction").decode(t.data);
          let n;
          for (const [r, i] of Object.entries(qr))
            if (i.index == e) {
              n = r;
              break;
            }
          if (!n)
            throw new Error(
              "Instruction type incorrect; not a SystemInstruction"
            );
          return n;
        }
        static decodeCreateAccount(t) {
          this.checkProgramId(t.programId), this.checkKeyLength(t.keys, 2);
          const { lamports: e, space: n, programId: r } = Pr(qr.Create, t.data);
          return {
            fromPubkey: t.keys[0].pubkey,
            newAccountPubkey: t.keys[1].pubkey,
            lamports: e,
            space: n,
            programId: new Gn(r),
          };
        }
        static decodeTransfer(t) {
          this.checkProgramId(t.programId), this.checkKeyLength(t.keys, 2);
          const { lamports: e } = Pr(qr.Transfer, t.data);
          return {
            fromPubkey: t.keys[0].pubkey,
            toPubkey: t.keys[1].pubkey,
            lamports: e,
          };
        }
        static decodeTransferWithSeed(t) {
          this.checkProgramId(t.programId), this.checkKeyLength(t.keys, 3);
          const {
            lamports: e,
            seed: n,
            programId: r,
          } = Pr(qr.TransferWithSeed, t.data);
          return {
            fromPubkey: t.keys[0].pubkey,
            basePubkey: t.keys[1].pubkey,
            toPubkey: t.keys[2].pubkey,
            lamports: e,
            seed: n,
            programId: new Gn(r),
          };
        }
        static decodeAllocate(t) {
          this.checkProgramId(t.programId), this.checkKeyLength(t.keys, 1);
          const { space: e } = Pr(qr.Allocate, t.data);
          return { accountPubkey: t.keys[0].pubkey, space: e };
        }
        static decodeAllocateWithSeed(t) {
          this.checkProgramId(t.programId), this.checkKeyLength(t.keys, 1);
          const {
            base: e,
            seed: n,
            space: r,
            programId: i,
          } = Pr(qr.AllocateWithSeed, t.data);
          return {
            accountPubkey: t.keys[0].pubkey,
            basePubkey: new Gn(e),
            seed: n,
            space: r,
            programId: new Gn(i),
          };
        }
        static decodeAssign(t) {
          this.checkProgramId(t.programId), this.checkKeyLength(t.keys, 1);
          const { programId: e } = Pr(qr.Assign, t.data);
          return { accountPubkey: t.keys[0].pubkey, programId: new Gn(e) };
        }
        static decodeAssignWithSeed(t) {
          this.checkProgramId(t.programId), this.checkKeyLength(t.keys, 1);
          const {
            base: e,
            seed: n,
            programId: r,
          } = Pr(qr.AssignWithSeed, t.data);
          return {
            accountPubkey: t.keys[0].pubkey,
            basePubkey: new Gn(e),
            seed: n,
            programId: new Gn(r),
          };
        }
        static decodeCreateWithSeed(t) {
          this.checkProgramId(t.programId), this.checkKeyLength(t.keys, 2);
          const {
            base: e,
            seed: n,
            lamports: r,
            space: i,
            programId: o,
          } = Pr(qr.CreateWithSeed, t.data);
          return {
            fromPubkey: t.keys[0].pubkey,
            newAccountPubkey: t.keys[1].pubkey,
            basePubkey: new Gn(e),
            seed: n,
            lamports: r,
            space: i,
            programId: new Gn(o),
          };
        }
        static decodeNonceInitialize(t) {
          this.checkProgramId(t.programId), this.checkKeyLength(t.keys, 3);
          const { authorized: e } = Pr(qr.InitializeNonceAccount, t.data);
          return { noncePubkey: t.keys[0].pubkey, authorizedPubkey: new Gn(e) };
        }
        static decodeNonceAdvance(t) {
          return (
            this.checkProgramId(t.programId),
            this.checkKeyLength(t.keys, 3),
            Pr(qr.AdvanceNonceAccount, t.data),
            {
              noncePubkey: t.keys[0].pubkey,
              authorizedPubkey: t.keys[2].pubkey,
            }
          );
        }
        static decodeNonceWithdraw(t) {
          this.checkProgramId(t.programId), this.checkKeyLength(t.keys, 5);
          const { lamports: e } = Pr(qr.WithdrawNonceAccount, t.data);
          return {
            noncePubkey: t.keys[0].pubkey,
            toPubkey: t.keys[1].pubkey,
            authorizedPubkey: t.keys[4].pubkey,
            lamports: e,
          };
        }
        static decodeNonceAuthorize(t) {
          this.checkProgramId(t.programId), this.checkKeyLength(t.keys, 2);
          const { authorized: e } = Pr(qr.AuthorizeNonceAccount, t.data);
          return {
            noncePubkey: t.keys[0].pubkey,
            authorizedPubkey: t.keys[1].pubkey,
            newAuthorizedPubkey: new Gn(e),
          };
        }
        static checkProgramId(t) {
          if (!t.equals(Hr.programId))
            throw new Error(
              "invalid instruction; programId is not SystemProgram"
            );
        }
        static checkKeyLength(t, e) {
          if (t.length < e)
            throw new Error(
              `invalid instruction; found ${t.length} keys, expected at least ${e}`
            );
        }
      }
      const qr = Object.freeze({
        Create: {
          index: 0,
          layout: ve.n_([
            ve.Jq("instruction"),
            ve.gM("lamports"),
            ve.gM("space"),
            sr("programId"),
          ]),
        },
        Assign: {
          index: 1,
          layout: ve.n_([ve.Jq("instruction"), sr("programId")]),
        },
        Transfer: {
          index: 2,
          layout: ve.n_([ve.Jq("instruction"), Ur("lamports")]),
        },
        CreateWithSeed: {
          index: 3,
          layout: ve.n_([
            ve.Jq("instruction"),
            sr("base"),
            cr("seed"),
            ve.gM("lamports"),
            ve.gM("space"),
            sr("programId"),
          ]),
        },
        AdvanceNonceAccount: {
          index: 4,
          layout: ve.n_([ve.Jq("instruction")]),
        },
        WithdrawNonceAccount: {
          index: 5,
          layout: ve.n_([ve.Jq("instruction"), ve.gM("lamports")]),
        },
        InitializeNonceAccount: {
          index: 6,
          layout: ve.n_([ve.Jq("instruction"), sr("authorized")]),
        },
        AuthorizeNonceAccount: {
          index: 7,
          layout: ve.n_([ve.Jq("instruction"), sr("authorized")]),
        },
        Allocate: {
          index: 8,
          layout: ve.n_([ve.Jq("instruction"), ve.gM("space")]),
        },
        AllocateWithSeed: {
          index: 9,
          layout: ve.n_([
            ve.Jq("instruction"),
            sr("base"),
            cr("seed"),
            ve.gM("space"),
            sr("programId"),
          ]),
        },
        AssignWithSeed: {
          index: 10,
          layout: ve.n_([
            ve.Jq("instruction"),
            sr("base"),
            cr("seed"),
            sr("programId"),
          ]),
        },
        TransferWithSeed: {
          index: 11,
          layout: ve.n_([
            ve.Jq("instruction"),
            Ur("lamports"),
            cr("seed"),
            sr("programId"),
          ]),
        },
        UpgradeNonceAccount: {
          index: 12,
          layout: ve.n_([ve.Jq("instruction")]),
        },
      });
      class Hr {
        constructor() {}
        static createAccount(t) {
          const e = jr(qr.Create, {
            lamports: t.lamports,
            space: t.space,
            programId: Wn(t.programId.toBuffer()),
          });
          return new br({
            keys: [
              { pubkey: t.fromPubkey, isSigner: !0, isWritable: !0 },
              { pubkey: t.newAccountPubkey, isSigner: !0, isWritable: !0 },
            ],
            programId: this.programId,
            data: e,
          });
        }
        static transfer(t) {
          let e, n;
          if ("basePubkey" in t) {
            (e = jr(qr.TransferWithSeed, {
              lamports: BigInt(t.lamports),
              seed: t.seed,
              programId: Wn(t.programId.toBuffer()),
            })),
              (n = [
                { pubkey: t.fromPubkey, isSigner: !1, isWritable: !0 },
                { pubkey: t.basePubkey, isSigner: !0, isWritable: !1 },
                { pubkey: t.toPubkey, isSigner: !1, isWritable: !0 },
              ]);
          } else {
            (e = jr(qr.Transfer, { lamports: BigInt(t.lamports) })),
              (n = [
                { pubkey: t.fromPubkey, isSigner: !0, isWritable: !0 },
                { pubkey: t.toPubkey, isSigner: !1, isWritable: !0 },
              ]);
          }
          return new br({ keys: n, programId: this.programId, data: e });
        }
        static assign(t) {
          let e, n;
          if ("basePubkey" in t) {
            (e = jr(qr.AssignWithSeed, {
              base: Wn(t.basePubkey.toBuffer()),
              seed: t.seed,
              programId: Wn(t.programId.toBuffer()),
            })),
              (n = [
                { pubkey: t.accountPubkey, isSigner: !1, isWritable: !0 },
                { pubkey: t.basePubkey, isSigner: !0, isWritable: !1 },
              ]);
          } else {
            (e = jr(qr.Assign, { programId: Wn(t.programId.toBuffer()) })),
              (n = [{ pubkey: t.accountPubkey, isSigner: !0, isWritable: !0 }]);
          }
          return new br({ keys: n, programId: this.programId, data: e });
        }
        static createAccountWithSeed(t) {
          const e = jr(qr.CreateWithSeed, {
            base: Wn(t.basePubkey.toBuffer()),
            seed: t.seed,
            lamports: t.lamports,
            space: t.space,
            programId: Wn(t.programId.toBuffer()),
          });
          let n = [
            { pubkey: t.fromPubkey, isSigner: !0, isWritable: !0 },
            { pubkey: t.newAccountPubkey, isSigner: !1, isWritable: !0 },
          ];
          return (
            t.basePubkey != t.fromPubkey &&
              n.push({ pubkey: t.basePubkey, isSigner: !0, isWritable: !1 }),
            new br({ keys: n, programId: this.programId, data: e })
          );
        }
        static createNonceAccount(t) {
          const e = new vr();
          "basePubkey" in t && "seed" in t
            ? e.add(
                Hr.createAccountWithSeed({
                  fromPubkey: t.fromPubkey,
                  newAccountPubkey: t.noncePubkey,
                  basePubkey: t.basePubkey,
                  seed: t.seed,
                  lamports: t.lamports,
                  space: zr,
                  programId: this.programId,
                })
              )
            : e.add(
                Hr.createAccount({
                  fromPubkey: t.fromPubkey,
                  newAccountPubkey: t.noncePubkey,
                  lamports: t.lamports,
                  space: zr,
                  programId: this.programId,
                })
              );
          const n = {
            noncePubkey: t.noncePubkey,
            authorizedPubkey: t.authorizedPubkey,
          };
          return e.add(this.nonceInitialize(n)), e;
        }
        static nonceInitialize(t) {
          const e = jr(qr.InitializeNonceAccount, {
              authorized: Wn(t.authorizedPubkey.toBuffer()),
            }),
            n = {
              keys: [
                { pubkey: t.noncePubkey, isSigner: !1, isWritable: !0 },
                { pubkey: _r, isSigner: !1, isWritable: !1 },
                { pubkey: Ar, isSigner: !1, isWritable: !1 },
              ],
              programId: this.programId,
              data: e,
            };
          return new br(n);
        }
        static nonceAdvance(t) {
          const e = jr(qr.AdvanceNonceAccount),
            n = {
              keys: [
                { pubkey: t.noncePubkey, isSigner: !1, isWritable: !0 },
                { pubkey: _r, isSigner: !1, isWritable: !1 },
                { pubkey: t.authorizedPubkey, isSigner: !0, isWritable: !1 },
              ],
              programId: this.programId,
              data: e,
            };
          return new br(n);
        }
        static nonceWithdraw(t) {
          const e = jr(qr.WithdrawNonceAccount, { lamports: t.lamports });
          return new br({
            keys: [
              { pubkey: t.noncePubkey, isSigner: !1, isWritable: !0 },
              { pubkey: t.toPubkey, isSigner: !1, isWritable: !0 },
              { pubkey: _r, isSigner: !1, isWritable: !1 },
              { pubkey: Ar, isSigner: !1, isWritable: !1 },
              { pubkey: t.authorizedPubkey, isSigner: !0, isWritable: !1 },
            ],
            programId: this.programId,
            data: e,
          });
        }
        static nonceAuthorize(t) {
          const e = jr(qr.AuthorizeNonceAccount, {
            authorized: Wn(t.newAuthorizedPubkey.toBuffer()),
          });
          return new br({
            keys: [
              { pubkey: t.noncePubkey, isSigner: !1, isWritable: !0 },
              { pubkey: t.authorizedPubkey, isSigner: !0, isWritable: !1 },
            ],
            programId: this.programId,
            data: e,
          });
        }
        static allocate(t) {
          let e, n;
          if ("basePubkey" in t) {
            (e = jr(qr.AllocateWithSeed, {
              base: Wn(t.basePubkey.toBuffer()),
              seed: t.seed,
              space: t.space,
              programId: Wn(t.programId.toBuffer()),
            })),
              (n = [
                { pubkey: t.accountPubkey, isSigner: !1, isWritable: !0 },
                { pubkey: t.basePubkey, isSigner: !0, isWritable: !1 },
              ]);
          } else {
            (e = jr(qr.Allocate, { space: t.space })),
              (n = [{ pubkey: t.accountPubkey, isSigner: !0, isWritable: !0 }]);
          }
          return new br({ keys: n, programId: this.programId, data: e });
        }
      }
      Hr.programId = new Gn("11111111111111111111111111111111");
      const Fr = Xn - 300;
      class Yr {
        constructor() {}
        static getMinNumSignatures(t) {
          return 2 * (Math.ceil(t / Yr.chunkSize) + 1 + 1);
        }
        static async load(t, e, n, r, o) {
          {
            const i = await t.getMinimumBalanceForRentExemption(o.length),
              s = await t.getAccountInfo(n.publicKey, "confirmed");
            let a = null;
            if (null !== s) {
              if (s.executable)
                return (
                  console.error(
                    "Program load failed, account is already executable"
                  ),
                  !1
                );
              s.data.length !== o.length &&
                ((a = a || new vr()),
                a.add(
                  Hr.allocate({ accountPubkey: n.publicKey, space: o.length })
                )),
                s.owner.equals(r) ||
                  ((a = a || new vr()),
                  a.add(
                    Hr.assign({ accountPubkey: n.publicKey, programId: r })
                  )),
                s.lamports < i &&
                  ((a = a || new vr()),
                  a.add(
                    Hr.transfer({
                      fromPubkey: e.publicKey,
                      toPubkey: n.publicKey,
                      lamports: i - s.lamports,
                    })
                  ));
            } else
              a = new vr().add(
                Hr.createAccount({
                  fromPubkey: e.publicKey,
                  newAccountPubkey: n.publicKey,
                  lamports: i > 0 ? i : 1,
                  space: o.length,
                  programId: r,
                })
              );
            null !== a && (await Or(t, a, [e, n], { commitment: "confirmed" }));
          }
          const s = ve.n_([
              ve.Jq("instruction"),
              ve.Jq("offset"),
              ve.Jq("bytesLength"),
              ve.Jq("bytesLengthPadding"),
              ve.A9(ve.u8("byte"), ve.cv(ve.Jq(), -8), "bytes"),
            ]),
            a = Yr.chunkSize;
          let c = 0,
            u = o,
            h = [];
          for (; u.length > 0; ) {
            const o = u.slice(0, a),
              l = i.Buffer.alloc(a + 16);
            s.encode(
              {
                instruction: 0,
                offset: c,
                bytes: o,
                bytesLength: 0,
                bytesLengthPadding: 0,
              },
              l
            );
            const d = new vr().add({
              keys: [{ pubkey: n.publicKey, isSigner: !0, isWritable: !0 }],
              programId: r,
              data: l,
            });
            if (
              (h.push(Or(t, d, [e, n], { commitment: "confirmed" })),
              t._rpcEndpoint.includes("solana.com"))
            ) {
              const t = 4;
              await Br(1e3 / t);
            }
            (c += a), (u = u.slice(a));
          }
          await Promise.all(h);
          {
            const o = ve.n_([ve.Jq("instruction")]),
              s = i.Buffer.alloc(o.span);
            o.encode({ instruction: 1 }, s);
            const a = new vr().add({
                keys: [
                  { pubkey: n.publicKey, isSigner: !0, isWritable: !0 },
                  { pubkey: Ar, isSigner: !1, isWritable: !1 },
                ],
                programId: r,
                data: s,
              }),
              c = "processed",
              u = await t.sendTransaction(a, [e, n], {
                preflightCommitment: c,
              }),
              { context: h, value: l } = await t.confirmTransaction(
                {
                  signature: u,
                  lastValidBlockHeight: a.lastValidBlockHeight,
                  blockhash: a.recentBlockhash,
                },
                c
              );
            if (l.err)
              throw new Error(`Transaction ${u} failed (${JSON.stringify(l)})`);
            for (;;) {
              try {
                if ((await t.getSlot({ commitment: c })) > h.slot) break;
              } catch {}
              await new Promise((t) => setTimeout(t, Math.round(200)));
            }
          }
          return !0;
        }
      }
      Yr.chunkSize = Fr;
      const Vr = new Gn("BPFLoader2111111111111111111111111111111111");
      class $r {
        static getMinNumSignatures(t) {
          return Yr.getMinNumSignatures(t);
        }
        static load(t, e, n, r, i) {
          return Yr.load(t, e, n, i, r);
        }
      }
      function Zr(t) {
        return t &&
          t.__esModule &&
          Object.prototype.hasOwnProperty.call(t, "default")
          ? t.default
          : t;
      }
      var Gr = Object.prototype.toString,
        Qr =
          Object.keys ||
          function (t) {
            var e = [];
            for (var n in t) e.push(n);
            return e;
          };
      function Jr(t, e) {
        var n, r, i, o, s, a, c;
        if (!0 === t) return "true";
        if (!1 === t) return "false";
        switch (typeof t) {
          case "object":
            if (null === t) return null;
            if (t.toJSON && "function" === typeof t.toJSON)
              return Jr(t.toJSON(), e);
            if ("[object Array]" === (c = Gr.call(t))) {
              for (i = "[", r = t.length - 1, n = 0; n < r; n++)
                i += Jr(t[n], !0) + ",";
              return r > -1 && (i += Jr(t[n], !0)), i + "]";
            }
            if ("[object Object]" === c) {
              for (r = (o = Qr(t).sort()).length, i = "", n = 0; n < r; )
                void 0 !== (a = Jr(t[(s = o[n])], !1)) &&
                  (i && (i += ","), (i += JSON.stringify(s) + ":" + a)),
                  n++;
              return "{" + i + "}";
            }
            return JSON.stringify(t);
          case "function":
          case "undefined":
            return e ? null : void 0;
          case "string":
            return JSON.stringify(t);
          default:
            return isFinite(t) ? t : null;
        }
      }
      var Xr = Zr(function (t) {
        var e = Jr(t, !1);
        if (void 0 !== e) return "" + e;
      });
      function ti(t) {
        let e = 0;
        for (; t > 1; ) (t /= 2), e++;
        return e;
      }
      class ei {
        constructor(t, e, n, r, i) {
          (this.slotsPerEpoch = void 0),
            (this.leaderScheduleSlotOffset = void 0),
            (this.warmup = void 0),
            (this.firstNormalEpoch = void 0),
            (this.firstNormalSlot = void 0),
            (this.slotsPerEpoch = t),
            (this.leaderScheduleSlotOffset = e),
            (this.warmup = n),
            (this.firstNormalEpoch = r),
            (this.firstNormalSlot = i);
        }
        getEpoch(t) {
          return this.getEpochAndSlotIndex(t)[0];
        }
        getEpochAndSlotIndex(t) {
          if (t < this.firstNormalSlot) {
            const n =
              ti(
                0 === (e = t + 32 + 1)
                  ? 1
                  : (e--,
                    (e |= e >> 1),
                    (e |= e >> 2),
                    (e |= e >> 4),
                    (e |= e >> 8),
                    (e |= e >> 16),
                    1 + (e |= e >> 32))
              ) -
              ti(32) -
              1;
            return [n, t - (this.getSlotsInEpoch(n) - 32)];
          }
          {
            const e = t - this.firstNormalSlot,
              n = Math.floor(e / this.slotsPerEpoch);
            return [this.firstNormalEpoch + n, e % this.slotsPerEpoch];
          }
          var e;
        }
        getFirstSlotInEpoch(t) {
          return t <= this.firstNormalEpoch
            ? 32 * (Math.pow(2, t) - 1)
            : (t - this.firstNormalEpoch) * this.slotsPerEpoch +
                this.firstNormalSlot;
        }
        getLastSlotInEpoch(t) {
          return this.getFirstSlotInEpoch(t) + this.getSlotsInEpoch(t) - 1;
        }
        getSlotsInEpoch(t) {
          return t < this.firstNormalEpoch
            ? Math.pow(2, t + ti(32))
            : this.slotsPerEpoch;
        }
      }
      class ni extends Error {
        constructor(t, e) {
          super(t), (this.logs = void 0), (this.logs = e);
        }
      }
      const ri = {
        JSON_RPC_SERVER_ERROR_BLOCK_CLEANED_UP: -32001,
        JSON_RPC_SERVER_ERROR_SEND_TRANSACTION_PREFLIGHT_FAILURE: -32002,
        JSON_RPC_SERVER_ERROR_TRANSACTION_SIGNATURE_VERIFICATION_FAILURE:
          -32003,
        JSON_RPC_SERVER_ERROR_BLOCK_NOT_AVAILABLE: -32004,
        JSON_RPC_SERVER_ERROR_NODE_UNHEALTHY: -32005,
        JSON_RPC_SERVER_ERROR_TRANSACTION_PRECOMPILE_VERIFICATION_FAILURE:
          -32006,
        JSON_RPC_SERVER_ERROR_SLOT_SKIPPED: -32007,
        JSON_RPC_SERVER_ERROR_NO_SNAPSHOT: -32008,
        JSON_RPC_SERVER_ERROR_LONG_TERM_STORAGE_SLOT_SKIPPED: -32009,
        JSON_RPC_SERVER_ERROR_KEY_EXCLUDED_FROM_SECONDARY_INDEX: -32010,
        JSON_RPC_SERVER_ERROR_TRANSACTION_HISTORY_NOT_AVAILABLE: -32011,
        JSON_RPC_SCAN_ERROR: -32012,
        JSON_RPC_SERVER_ERROR_TRANSACTION_SIGNATURE_LEN_MISMATCH: -32013,
        JSON_RPC_SERVER_ERROR_BLOCK_STATUS_NOT_AVAILABLE_YET: -32014,
        JSON_RPC_SERVER_ERROR_UNSUPPORTED_TRANSACTION_VERSION: -32015,
        JSON_RPC_SERVER_ERROR_MIN_CONTEXT_SLOT_NOT_REACHED: -32016,
      };
      class ii extends Error {
        constructor({ code: t, message: e, data: n }, r) {
          super(null != r ? `${r}: ${e}` : e),
            (this.code = void 0),
            (this.data = void 0),
            (this.code = t),
            (this.data = n),
            (this.name = "SolanaJSONRPCError");
        }
      }
      var oi = globalThis.fetch;
      class si extends Qe.Z {
        constructor(t, e, n) {
          super(
            (t) => {
              const n = (0, Je.Z)(t, {
                autoconnect: !0,
                max_reconnects: 5,
                reconnect: !0,
                reconnect_interval: 1e3,
                ...e,
              });
              return (this.underlyingSocket = "socket" in n ? n.socket : n), n;
            },
            t,
            e,
            n
          ),
            (this.underlyingSocket = void 0);
        }
        call(...t) {
          const e = this.underlyingSocket?.readyState;
          return 1 === e
            ? super.call(...t)
            : Promise.reject(
                new Error(
                  "Tried to call a JSON-RPC method `" +
                    t[0] +
                    "` but the socket was not `CONNECTING` or `OPEN` (`readyState` was " +
                    e +
                    ")"
                )
              );
        }
        notify(...t) {
          const e = this.underlyingSocket?.readyState;
          return 1 === e
            ? super.notify(...t)
            : Promise.reject(
                new Error(
                  "Tried to send a JSON-RPC notification `" +
                    t[0] +
                    "` but the socket was not `CONNECTING` or `OPEN` (`readyState` was " +
                    e +
                    ")"
                )
              );
        }
      }
      class ai {
        constructor(t) {
          (this.key = void 0),
            (this.state = void 0),
            (this.key = t.key),
            (this.state = t.state);
        }
        isActive() {
          const t = BigInt("0xffffffffffffffff");
          return this.state.deactivationSlot === t;
        }
        static deserialize(t) {
          const e = (function (t, e) {
              let n;
              try {
                n = t.layout.decode(e);
              } catch (r) {
                throw new Error("invalid instruction; " + r);
              }
              if (n.typeIndex !== t.index)
                throw new Error(
                  `invalid account data; account type mismatch ${n.typeIndex} != ${t.index}`
                );
              return n;
            })(ci, t),
            n = t.length - 56;
          dr(n >= 0, "lookup table is invalid"),
            dr(n % 32 === 0, "lookup table is invalid");
          const r = n / 32,
            { addresses: i } = ve
              .n_([ve.A9(sr(), r, "addresses")])
              .decode(t.slice(56));
          return {
            deactivationSlot: e.deactivationSlot,
            lastExtendedSlot: e.lastExtendedSlot,
            lastExtendedSlotStartIndex: e.lastExtendedStartIndex,
            authority:
              0 !== e.authority.length ? new Gn(e.authority[0]) : void 0,
            addresses: i.map((t) => new Gn(t)),
          };
        }
      }
      const ci = {
          index: 1,
          layout: ve.n_([
            ve.Jq("typeIndex"),
            Ur("deactivationSlot"),
            ve._O("lastExtendedSlot"),
            ve.u8("lastExtendedStartIndex"),
            ve.u8(),
            ve.A9(sr(), ve.cv(ve.u8(), -1), "authority"),
          ]),
        },
        ui = /^[^:]+:\/\/([^:[]+|\[[^\]]+\])(:\d+)?(.*)/i;
      const hi = $e(Ce(Gn), qe(), (t) => new Gn(t)),
        li = He([qe(), Re("base64")]),
        di = $e(Ce(i.Buffer), li, (t) => i.Buffer.from(t[0], "base64")),
        fi = 3e4;
      function pi(t) {
        let e, n;
        if ("string" === typeof t) e = t;
        else if (t) {
          const { commitment: r, ...i } = t;
          (e = r), (n = i);
        }
        return { commitment: e, config: n };
      }
      function yi(t) {
        return Ye([
          Fe({ jsonrpc: Re("2.0"), id: qe(), result: t }),
          Fe({
            jsonrpc: Re("2.0"),
            id: qe(),
            error: Fe({
              code: Ve(),
              message: qe(),
              data: We(Be("any", () => !0)),
            }),
          }),
        ]);
      }
      const gi = yi(Ve());
      function mi(t) {
        return $e(yi(t), gi, (e) =>
          "error" in e ? e : { ...e, result: Te(e.result, t) }
        );
      }
      function wi(t) {
        return mi(Fe({ context: Fe({ slot: Ue() }), value: t }));
      }
      function bi(t) {
        return Fe({ context: Fe({ slot: Ue() }), value: t });
      }
      function vi(t, e) {
        return 0 === t
          ? new yr({
              header: e.header,
              staticAccountKeys: e.accountKeys.map((t) => new Gn(t)),
              recentBlockhash: e.recentBlockhash,
              compiledInstructions: e.instructions.map((t) => ({
                programIdIndex: t.programIdIndex,
                accountKeyIndexes: t.accounts,
                data: fe().decode(t.data),
              })),
              addressTableLookups: e.addressTableLookups,
            })
          : new pr(e);
      }
      const ki = Fe({
          foundation: Ue(),
          foundationTerm: Ue(),
          initial: Ue(),
          taper: Ue(),
          terminal: Ue(),
        }),
        Si = mi(
          je(
            De(
              Fe({
                epoch: Ue(),
                effectiveSlot: Ue(),
                amount: Ue(),
                postBalance: Ue(),
                commission: We(De(Ue())),
              })
            )
          )
        ),
        Mi = je(Fe({ slot: Ue(), prioritizationFee: Ue() })),
        Ii = Fe({
          total: Ue(),
          validator: Ue(),
          foundation: Ue(),
          epoch: Ue(),
        }),
        Ei = Fe({
          epoch: Ue(),
          slotIndex: Ue(),
          slotsInEpoch: Ue(),
          absoluteSlot: Ue(),
          blockHeight: We(Ue()),
          transactionCount: We(Ue()),
        }),
        _i = Fe({
          slotsPerEpoch: Ue(),
          leaderScheduleSlotOffset: Ue(),
          warmup: Pe(),
          firstNormalEpoch: Ue(),
          firstNormalSlot: Ue(),
        }),
        Ai = Ke(qe(), je(Ue())),
        xi = De(Ye([Fe({}), qe()])),
        Li = Fe({ err: xi }),
        Ti = Re("receivedSignature"),
        Ni = Fe({ "solana-core": qe(), "feature-set": We(Ue()) }),
        Oi = wi(
          Fe({
            err: De(Ye([Fe({}), qe()])),
            logs: De(je(qe())),
            accounts: We(
              De(
                je(
                  De(
                    Fe({
                      executable: Pe(),
                      owner: qe(),
                      lamports: Ue(),
                      data: je(qe()),
                      rentEpoch: We(Ue()),
                    })
                  )
                )
              )
            ),
            unitsConsumed: We(Ue()),
            returnData: We(
              De(Fe({ programId: qe(), data: He([qe(), Re("base64")]) }))
            ),
          })
        ),
        Bi = wi(
          Fe({
            byIdentity: Ke(qe(), je(Ue())),
            range: Fe({ firstSlot: Ue(), lastSlot: Ue() }),
          })
        );
      const ji = mi(ki),
        Pi = mi(Ii),
        Ci = mi(Mi),
        Ri = mi(Ei),
        zi = mi(_i),
        Di = mi(Ai),
        Ui = mi(Ue()),
        Wi = wi(
          Fe({
            total: Ue(),
            circulating: Ue(),
            nonCirculating: Ue(),
            nonCirculatingAccounts: je(hi),
          })
        ),
        Ki = Fe({
          amount: qe(),
          uiAmount: De(Ue()),
          decimals: Ue(),
          uiAmountString: We(qe()),
        }),
        qi = wi(
          je(
            Fe({
              address: hi,
              amount: qe(),
              uiAmount: De(Ue()),
              decimals: Ue(),
              uiAmountString: We(qe()),
            })
          )
        ),
        Hi = wi(
          je(
            Fe({
              pubkey: hi,
              account: Fe({
                executable: Pe(),
                owner: hi,
                lamports: Ue(),
                data: di,
                rentEpoch: Ue(),
              }),
            })
          )
        ),
        Fi = Fe({ program: qe(), parsed: Ve(), space: Ue() }),
        Yi = wi(
          je(
            Fe({
              pubkey: hi,
              account: Fe({
                executable: Pe(),
                owner: hi,
                lamports: Ue(),
                data: Fi,
                rentEpoch: Ue(),
              }),
            })
          )
        ),
        Vi = wi(je(Fe({ lamports: Ue(), address: hi }))),
        $i = Fe({
          executable: Pe(),
          owner: hi,
          lamports: Ue(),
          data: di,
          rentEpoch: Ue(),
        }),
        Zi = Fe({ pubkey: hi, account: $i }),
        Gi = $e(Ye([Ce(i.Buffer), Fi]), Ye([li, Fi]), (t) =>
          Array.isArray(t) ? Te(t, di) : t
        ),
        Qi = Fe({
          executable: Pe(),
          owner: hi,
          lamports: Ue(),
          data: Gi,
          rentEpoch: Ue(),
        }),
        Ji = Fe({ pubkey: hi, account: Qi }),
        Xi = Fe({
          state: Ye([
            Re("active"),
            Re("inactive"),
            Re("activating"),
            Re("deactivating"),
          ]),
          active: Ue(),
          inactive: Ue(),
        }),
        to = mi(
          je(
            Fe({
              signature: qe(),
              slot: Ue(),
              err: xi,
              memo: De(qe()),
              blockTime: We(De(Ue())),
            })
          )
        ),
        eo = mi(
          je(
            Fe({
              signature: qe(),
              slot: Ue(),
              err: xi,
              memo: De(qe()),
              blockTime: We(De(Ue())),
            })
          )
        ),
        no = Fe({ subscription: Ue(), result: bi($i) }),
        ro = Fe({ pubkey: hi, account: $i }),
        io = Fe({ subscription: Ue(), result: bi(ro) }),
        oo = Fe({ parent: Ue(), slot: Ue(), root: Ue() }),
        so = Fe({ subscription: Ue(), result: oo }),
        ao = Ye([
          Fe({
            type: Ye([
              Re("firstShredReceived"),
              Re("completed"),
              Re("optimisticConfirmation"),
              Re("root"),
            ]),
            slot: Ue(),
            timestamp: Ue(),
          }),
          Fe({
            type: Re("createdBank"),
            parent: Ue(),
            slot: Ue(),
            timestamp: Ue(),
          }),
          Fe({
            type: Re("frozen"),
            slot: Ue(),
            timestamp: Ue(),
            stats: Fe({
              numTransactionEntries: Ue(),
              numSuccessfulTransactions: Ue(),
              numFailedTransactions: Ue(),
              maxTransactionsPerEntry: Ue(),
            }),
          }),
          Fe({ type: Re("dead"), slot: Ue(), timestamp: Ue(), err: qe() }),
        ]),
        co = Fe({ subscription: Ue(), result: ao }),
        uo = Fe({ subscription: Ue(), result: bi(Ye([Li, Ti])) }),
        ho = Fe({ subscription: Ue(), result: Ue() }),
        lo = Fe({
          pubkey: qe(),
          gossip: De(qe()),
          tpu: De(qe()),
          rpc: De(qe()),
          version: De(qe()),
        }),
        fo = Fe({
          votePubkey: qe(),
          nodePubkey: qe(),
          activatedStake: Ue(),
          epochVoteAccount: Pe(),
          epochCredits: je(He([Ue(), Ue(), Ue()])),
          commission: Ue(),
          lastVote: Ue(),
          rootSlot: De(Ue()),
        }),
        po = mi(Fe({ current: je(fo), delinquent: je(fo) })),
        yo = Ye([Re("processed"), Re("confirmed"), Re("finalized")]),
        go = Fe({
          slot: Ue(),
          confirmations: De(Ue()),
          err: xi,
          confirmationStatus: We(yo),
        }),
        mo = wi(je(De(go))),
        wo = mi(Ue()),
        bo = Fe({
          accountKey: hi,
          writableIndexes: je(Ue()),
          readonlyIndexes: je(Ue()),
        }),
        vo = Fe({
          signatures: je(qe()),
          message: Fe({
            accountKeys: je(qe()),
            header: Fe({
              numRequiredSignatures: Ue(),
              numReadonlySignedAccounts: Ue(),
              numReadonlyUnsignedAccounts: Ue(),
            }),
            instructions: je(
              Fe({ accounts: je(Ue()), data: qe(), programIdIndex: Ue() })
            ),
            recentBlockhash: qe(),
            addressTableLookups: We(je(bo)),
          }),
        }),
        ko = Fe({
          pubkey: hi,
          signer: Pe(),
          writable: Pe(),
          source: We(Ye([Re("transaction"), Re("lookupTable")])),
        }),
        So = Fe({ accountKeys: je(ko), signatures: je(qe()) }),
        Mo = Fe({ parsed: Ve(), program: qe(), programId: hi }),
        Io = Fe({ accounts: je(hi), data: qe(), programId: hi }),
        Eo = $e(
          Ye([Io, Mo]),
          Ye([
            Fe({ parsed: Ve(), program: qe(), programId: qe() }),
            Fe({ accounts: je(qe()), data: qe(), programId: qe() }),
          ]),
          (t) => Te(t, "accounts" in t ? Io : Mo)
        ),
        _o = Fe({
          signatures: je(qe()),
          message: Fe({
            accountKeys: je(ko),
            instructions: je(Eo),
            recentBlockhash: qe(),
            addressTableLookups: We(De(je(bo))),
          }),
        }),
        Ao = Fe({
          accountIndex: Ue(),
          mint: qe(),
          owner: We(qe()),
          uiTokenAmount: Ki,
        }),
        xo = Fe({ writable: je(hi), readonly: je(hi) }),
        Lo = Fe({
          err: xi,
          fee: Ue(),
          innerInstructions: We(
            De(
              je(
                Fe({
                  index: Ue(),
                  instructions: je(
                    Fe({ accounts: je(Ue()), data: qe(), programIdIndex: Ue() })
                  ),
                })
              )
            )
          ),
          preBalances: je(Ue()),
          postBalances: je(Ue()),
          logMessages: We(De(je(qe()))),
          preTokenBalances: We(De(je(Ao))),
          postTokenBalances: We(De(je(Ao))),
          loadedAddresses: We(xo),
          computeUnitsConsumed: We(Ue()),
        }),
        To = Fe({
          err: xi,
          fee: Ue(),
          innerInstructions: We(
            De(je(Fe({ index: Ue(), instructions: je(Eo) })))
          ),
          preBalances: je(Ue()),
          postBalances: je(Ue()),
          logMessages: We(De(je(qe()))),
          preTokenBalances: We(De(je(Ao))),
          postTokenBalances: We(De(je(Ao))),
          loadedAddresses: We(xo),
          computeUnitsConsumed: We(Ue()),
        }),
        No = Ye([Re(0), Re("legacy")]),
        Oo = Fe({
          pubkey: qe(),
          lamports: Ue(),
          postBalance: De(Ue()),
          rewardType: De(qe()),
          commission: We(De(Ue())),
        }),
        Bo = mi(
          De(
            Fe({
              blockhash: qe(),
              previousBlockhash: qe(),
              parentSlot: Ue(),
              transactions: je(
                Fe({ transaction: vo, meta: De(Lo), version: We(No) })
              ),
              rewards: We(je(Oo)),
              blockTime: De(Ue()),
              blockHeight: De(Ue()),
            })
          )
        ),
        jo = mi(
          De(
            Fe({
              blockhash: qe(),
              previousBlockhash: qe(),
              parentSlot: Ue(),
              rewards: We(je(Oo)),
              blockTime: De(Ue()),
              blockHeight: De(Ue()),
            })
          )
        ),
        Po = mi(
          De(
            Fe({
              blockhash: qe(),
              previousBlockhash: qe(),
              parentSlot: Ue(),
              transactions: je(
                Fe({ transaction: So, meta: De(Lo), version: We(No) })
              ),
              rewards: We(je(Oo)),
              blockTime: De(Ue()),
              blockHeight: De(Ue()),
            })
          )
        ),
        Co = mi(
          De(
            Fe({
              blockhash: qe(),
              previousBlockhash: qe(),
              parentSlot: Ue(),
              transactions: je(
                Fe({ transaction: _o, meta: De(To), version: We(No) })
              ),
              rewards: We(je(Oo)),
              blockTime: De(Ue()),
              blockHeight: De(Ue()),
            })
          )
        ),
        Ro = mi(
          De(
            Fe({
              blockhash: qe(),
              previousBlockhash: qe(),
              parentSlot: Ue(),
              transactions: je(
                Fe({ transaction: So, meta: De(To), version: We(No) })
              ),
              rewards: We(je(Oo)),
              blockTime: De(Ue()),
              blockHeight: De(Ue()),
            })
          )
        ),
        zo = mi(
          De(
            Fe({
              blockhash: qe(),
              previousBlockhash: qe(),
              parentSlot: Ue(),
              rewards: We(je(Oo)),
              blockTime: De(Ue()),
              blockHeight: De(Ue()),
            })
          )
        ),
        Do = mi(
          De(
            Fe({
              blockhash: qe(),
              previousBlockhash: qe(),
              parentSlot: Ue(),
              transactions: je(Fe({ transaction: vo, meta: De(Lo) })),
              rewards: We(je(Oo)),
              blockTime: De(Ue()),
            })
          )
        ),
        Uo = mi(
          De(
            Fe({
              blockhash: qe(),
              previousBlockhash: qe(),
              parentSlot: Ue(),
              signatures: je(qe()),
              blockTime: De(Ue()),
            })
          )
        ),
        Wo = mi(
          De(
            Fe({
              slot: Ue(),
              meta: De(Lo),
              blockTime: We(De(Ue())),
              transaction: vo,
              version: We(No),
            })
          )
        ),
        Ko = mi(
          De(
            Fe({
              slot: Ue(),
              transaction: _o,
              meta: De(To),
              blockTime: We(De(Ue())),
              version: We(No),
            })
          )
        ),
        qo = wi(
          Fe({
            blockhash: qe(),
            feeCalculator: Fe({ lamportsPerSignature: Ue() }),
          })
        ),
        Ho = wi(Fe({ blockhash: qe(), lastValidBlockHeight: Ue() })),
        Fo = wi(Pe()),
        Yo = mi(
          je(
            Fe({
              slot: Ue(),
              numTransactions: Ue(),
              numSlots: Ue(),
              samplePeriodSecs: Ue(),
            })
          )
        ),
        Vo = wi(De(Fe({ feeCalculator: Fe({ lamportsPerSignature: Ue() }) }))),
        $o = mi(qe()),
        Zo = mi(qe()),
        Go = Fe({ err: xi, logs: je(qe()), signature: qe() }),
        Qo = Fe({ result: bi(Go), subscription: Ue() }),
        Jo = { "solana-client": "js/0.0.0-development" };
      class Xo {
        constructor(t, e) {
          let n, r, i, o, s, a;
          (this._commitment = void 0),
            (this._confirmTransactionInitialTimeout = void 0),
            (this._rpcEndpoint = void 0),
            (this._rpcWsEndpoint = void 0),
            (this._rpcClient = void 0),
            (this._rpcRequest = void 0),
            (this._rpcBatchRequest = void 0),
            (this._rpcWebSocket = void 0),
            (this._rpcWebSocketConnected = !1),
            (this._rpcWebSocketHeartbeat = null),
            (this._rpcWebSocketIdleTimeout = null),
            (this._rpcWebSocketGeneration = 0),
            (this._disableBlockhashCaching = !1),
            (this._pollingBlockhash = !1),
            (this._blockhashInfo = {
              latestBlockhash: null,
              lastFetch: 0,
              transactionSignatures: [],
              simulatedSignatures: [],
            }),
            (this._nextClientSubscriptionId = 0),
            (this._subscriptionDisposeFunctionsByClientSubscriptionId = {}),
            (this._subscriptionHashByClientSubscriptionId = {}),
            (this._subscriptionStateChangeCallbacksByHash = {}),
            (this._subscriptionCallbacksByServerSubscriptionId = {}),
            (this._subscriptionsByHash = {}),
            (this._subscriptionsAutoDisposedByRpc = new Set()),
            (this.getBlockHeight = (() => {
              const t = {};
              return async (e) => {
                const { commitment: n, config: r } = pi(e),
                  i = this._buildArgs([], n, void 0, r),
                  o = Xr(i);
                return (
                  (t[o] =
                    t[o] ??
                    (async () => {
                      try {
                        const e = Te(
                          await this._rpcRequest("getBlockHeight", i),
                          mi(Ue())
                        );
                        if ("error" in e)
                          throw new ii(
                            e.error,
                            "failed to get block height information"
                          );
                        return e.result;
                      } finally {
                        delete t[o];
                      }
                    })()),
                  await t[o]
                );
              };
            })()),
            e && "string" === typeof e
              ? (this._commitment = e)
              : e &&
                ((this._commitment = e.commitment),
                (this._confirmTransactionInitialTimeout =
                  e.confirmTransactionInitialTimeout),
                (n = e.wsEndpoint),
                (r = e.httpHeaders),
                (i = e.fetch),
                (o = e.fetchMiddleware),
                (s = e.disableRetryOnRateLimit),
                (a = e.httpAgent)),
            (this._rpcEndpoint = (function (t) {
              if (!1 === /^https?:/.test(t))
                throw new TypeError(
                  "Endpoint URL must start with `http:` or `https:`."
                );
              return t;
            })(t)),
            (this._rpcWsEndpoint =
              n ||
              (function (t) {
                const e = t.match(ui);
                if (null == e)
                  throw TypeError(`Failed to validate endpoint URL \`${t}\``);
                const [n, r, i, o] = e,
                  s = t.startsWith("https:") ? "wss:" : "ws:",
                  a = null == i ? null : parseInt(i.slice(1), 10);
                return `${s}//${r}${null == a ? "" : `:${a + 1}`}${o}`;
              })(t)),
            (this._rpcClient = (function (t, e, n, r, i, o) {
              const s = n || oi;
              let a;
              return (
                null != o &&
                  console.warn(
                    "You have supplied an `httpAgent` when creating a `Connection` in a browser environment.It has been ignored; `httpAgent` is only used in Node environments."
                  ),
                r &&
                  (a = async (t, e) => {
                    const n = await new Promise((n, i) => {
                      try {
                        r(t, e, (t, e) => n([t, e]));
                      } catch (o) {
                        i(o);
                      }
                    });
                    return await s(...n);
                  }),
                new (Ge())(async (n, r) => {
                  const o = {
                    method: "POST",
                    body: n,
                    agent: void 0,
                    headers: Object.assign(
                      { "Content-Type": "application/json" },
                      e || {},
                      Jo
                    ),
                  };
                  try {
                    let e,
                      n = 5,
                      c = 500;
                    for (
                      ;
                      (e = a ? await a(t, o) : await s(t, o)),
                        429 === e.status && !0 !== i && ((n -= 1), 0 !== n);

                    )
                      console.error(
                        `Server responded with ${e.status} ${e.statusText}.  Retrying after ${c}ms delay...`
                      ),
                        await Br(c),
                        (c *= 2);
                    const u = await e.text();
                    e.ok
                      ? r(null, u)
                      : r(new Error(`${e.status} ${e.statusText}: ${u}`));
                  } catch (c) {
                    c instanceof Error && r(c);
                  }
                }, {})
              );
            })(t, r, i, o, s, a)),
            (this._rpcRequest = (function (t) {
              return (e, n) =>
                new Promise((r, i) => {
                  t.request(e, n, (t, e) => {
                    t ? i(t) : r(e);
                  });
                });
            })(this._rpcClient)),
            (this._rpcBatchRequest = (function (t) {
              return (e) =>
                new Promise((n, r) => {
                  0 === e.length && n([]);
                  const i = e.map((e) => t.request(e.methodName, e.args));
                  t.request(i, (t, e) => {
                    t ? r(t) : n(e);
                  });
                });
            })(this._rpcClient)),
            (this._rpcWebSocket = new si(this._rpcWsEndpoint, {
              autoconnect: !1,
              max_reconnects: 1 / 0,
            })),
            this._rpcWebSocket.on("open", this._wsOnOpen.bind(this)),
            this._rpcWebSocket.on("error", this._wsOnError.bind(this)),
            this._rpcWebSocket.on("close", this._wsOnClose.bind(this)),
            this._rpcWebSocket.on(
              "accountNotification",
              this._wsOnAccountNotification.bind(this)
            ),
            this._rpcWebSocket.on(
              "programNotification",
              this._wsOnProgramAccountNotification.bind(this)
            ),
            this._rpcWebSocket.on(
              "slotNotification",
              this._wsOnSlotNotification.bind(this)
            ),
            this._rpcWebSocket.on(
              "slotsUpdatesNotification",
              this._wsOnSlotUpdatesNotification.bind(this)
            ),
            this._rpcWebSocket.on(
              "signatureNotification",
              this._wsOnSignatureNotification.bind(this)
            ),
            this._rpcWebSocket.on(
              "rootNotification",
              this._wsOnRootNotification.bind(this)
            ),
            this._rpcWebSocket.on(
              "logsNotification",
              this._wsOnLogsNotification.bind(this)
            );
        }
        get commitment() {
          return this._commitment;
        }
        get rpcEndpoint() {
          return this._rpcEndpoint;
        }
        async getBalanceAndContext(t, e) {
          const { commitment: n, config: r } = pi(e),
            i = this._buildArgs([t.toBase58()], n, void 0, r),
            o = Te(await this._rpcRequest("getBalance", i), wi(Ue()));
          if ("error" in o)
            throw new ii(o.error, `failed to get balance for ${t.toBase58()}`);
          return o.result;
        }
        async getBalance(t, e) {
          return await this.getBalanceAndContext(t, e)
            .then((t) => t.value)
            .catch((e) => {
              throw new Error(
                "failed to get balance of account " + t.toBase58() + ": " + e
              );
            });
        }
        async getBlockTime(t) {
          const e = Te(
            await this._rpcRequest("getBlockTime", [t]),
            mi(De(Ue()))
          );
          if ("error" in e)
            throw new ii(e.error, `failed to get block time for slot ${t}`);
          return e.result;
        }
        async getMinimumLedgerSlot() {
          const t = Te(
            await this._rpcRequest("minimumLedgerSlot", []),
            mi(Ue())
          );
          if ("error" in t)
            throw new ii(t.error, "failed to get minimum ledger slot");
          return t.result;
        }
        async getFirstAvailableBlock() {
          const t = Te(
            await this._rpcRequest("getFirstAvailableBlock", []),
            Ui
          );
          if ("error" in t)
            throw new ii(t.error, "failed to get first available block");
          return t.result;
        }
        async getSupply(t) {
          let e = {};
          e =
            "string" === typeof t
              ? { commitment: t }
              : t
              ? { ...t, commitment: (t && t.commitment) || this.commitment }
              : { commitment: this.commitment };
          const n = Te(await this._rpcRequest("getSupply", [e]), Wi);
          if ("error" in n) throw new ii(n.error, "failed to get supply");
          return n.result;
        }
        async getTokenSupply(t, e) {
          const n = this._buildArgs([t.toBase58()], e),
            r = Te(await this._rpcRequest("getTokenSupply", n), wi(Ki));
          if ("error" in r) throw new ii(r.error, "failed to get token supply");
          return r.result;
        }
        async getTokenAccountBalance(t, e) {
          const n = this._buildArgs([t.toBase58()], e),
            r = Te(await this._rpcRequest("getTokenAccountBalance", n), wi(Ki));
          if ("error" in r)
            throw new ii(r.error, "failed to get token account balance");
          return r.result;
        }
        async getTokenAccountsByOwner(t, e, n) {
          const { commitment: r, config: i } = pi(n);
          let o = [t.toBase58()];
          "mint" in e
            ? o.push({ mint: e.mint.toBase58() })
            : o.push({ programId: e.programId.toBase58() });
          const s = this._buildArgs(o, r, "base64", i),
            a = Te(await this._rpcRequest("getTokenAccountsByOwner", s), Hi);
          if ("error" in a)
            throw new ii(
              a.error,
              `failed to get token accounts owned by account ${t.toBase58()}`
            );
          return a.result;
        }
        async getParsedTokenAccountsByOwner(t, e, n) {
          let r = [t.toBase58()];
          "mint" in e
            ? r.push({ mint: e.mint.toBase58() })
            : r.push({ programId: e.programId.toBase58() });
          const i = this._buildArgs(r, n, "jsonParsed"),
            o = Te(await this._rpcRequest("getTokenAccountsByOwner", i), Yi);
          if ("error" in o)
            throw new ii(
              o.error,
              `failed to get token accounts owned by account ${t.toBase58()}`
            );
          return o.result;
        }
        async getLargestAccounts(t) {
          const e = {
              ...t,
              commitment: (t && t.commitment) || this.commitment,
            },
            n = e.filter || e.commitment ? [e] : [],
            r = Te(await this._rpcRequest("getLargestAccounts", n), Vi);
          if ("error" in r)
            throw new ii(r.error, "failed to get largest accounts");
          return r.result;
        }
        async getTokenLargestAccounts(t, e) {
          const n = this._buildArgs([t.toBase58()], e),
            r = Te(await this._rpcRequest("getTokenLargestAccounts", n), qi);
          if ("error" in r)
            throw new ii(r.error, "failed to get token largest accounts");
          return r.result;
        }
        async getAccountInfoAndContext(t, e) {
          const { commitment: n, config: r } = pi(e),
            i = this._buildArgs([t.toBase58()], n, "base64", r),
            o = Te(await this._rpcRequest("getAccountInfo", i), wi(De($i)));
          if ("error" in o)
            throw new ii(
              o.error,
              `failed to get info about account ${t.toBase58()}`
            );
          return o.result;
        }
        async getParsedAccountInfo(t, e) {
          const { commitment: n, config: r } = pi(e),
            i = this._buildArgs([t.toBase58()], n, "jsonParsed", r),
            o = Te(await this._rpcRequest("getAccountInfo", i), wi(De(Qi)));
          if ("error" in o)
            throw new ii(
              o.error,
              `failed to get info about account ${t.toBase58()}`
            );
          return o.result;
        }
        async getAccountInfo(t, e) {
          try {
            return (await this.getAccountInfoAndContext(t, e)).value;
          } catch (n) {
            throw new Error(
              "failed to get info about account " + t.toBase58() + ": " + n
            );
          }
        }
        async getMultipleParsedAccounts(t, e) {
          const { commitment: n, config: r } = pi(e),
            i = t.map((t) => t.toBase58()),
            o = this._buildArgs([i], n, "jsonParsed", r),
            s = Te(
              await this._rpcRequest("getMultipleAccounts", o),
              wi(je(De(Qi)))
            );
          if ("error" in s)
            throw new ii(s.error, `failed to get info for accounts ${i}`);
          return s.result;
        }
        async getMultipleAccountsInfoAndContext(t, e) {
          const { commitment: n, config: r } = pi(e),
            i = t.map((t) => t.toBase58()),
            o = this._buildArgs([i], n, "base64", r),
            s = Te(
              await this._rpcRequest("getMultipleAccounts", o),
              wi(je(De($i)))
            );
          if ("error" in s)
            throw new ii(s.error, `failed to get info for accounts ${i}`);
          return s.result;
        }
        async getMultipleAccountsInfo(t, e) {
          return (await this.getMultipleAccountsInfoAndContext(t, e)).value;
        }
        async getStakeActivation(t, e, n) {
          const { commitment: r, config: i } = pi(e),
            o = this._buildArgs([t.toBase58()], r, void 0, {
              ...i,
              epoch: null != n ? n : i?.epoch,
            }),
            s = Te(await this._rpcRequest("getStakeActivation", o), mi(Xi));
          if ("error" in s)
            throw new ii(
              s.error,
              `failed to get Stake Activation ${t.toBase58()}`
            );
          return s.result;
        }
        async getProgramAccounts(t, e) {
          const { commitment: n, config: r } = pi(e),
            { encoding: i, ...o } = r || {},
            s = this._buildArgs([t.toBase58()], n, i || "base64", o),
            a = await this._rpcRequest("getProgramAccounts", s),
            c = je(Zi),
            u = !0 === o.withContext ? Te(a, wi(c)) : Te(a, mi(c));
          if ("error" in u)
            throw new ii(
              u.error,
              `failed to get accounts owned by program ${t.toBase58()}`
            );
          return u.result;
        }
        async getParsedProgramAccounts(t, e) {
          const { commitment: n, config: r } = pi(e),
            i = this._buildArgs([t.toBase58()], n, "jsonParsed", r),
            o = Te(await this._rpcRequest("getProgramAccounts", i), mi(je(Ji)));
          if ("error" in o)
            throw new ii(
              o.error,
              `failed to get accounts owned by program ${t.toBase58()}`
            );
          return o.result;
        }
        async confirmTransaction(t, e) {
          let n, r;
          if ("string" == typeof t) n = t;
          else {
            const e = t;
            if (e.abortSignal?.aborted)
              return Promise.reject(e.abortSignal.reason);
            n = e.signature;
          }
          try {
            r = fe().decode(n);
          } catch (i) {
            throw new Error("signature must be base58 encoded: " + n);
          }
          return (
            dr(64 === r.length, "signature has invalid length"),
            "string" === typeof t
              ? await this.confirmTransactionUsingLegacyTimeoutStrategy({
                  commitment: e || this.commitment,
                  signature: n,
                })
              : "lastValidBlockHeight" in t
              ? await this.confirmTransactionUsingBlockHeightExceedanceStrategy(
                  { commitment: e || this.commitment, strategy: t }
                )
              : await this.confirmTransactionUsingDurableNonceStrategy({
                  commitment: e || this.commitment,
                  strategy: t,
                })
          );
        }
        getCancellationPromise(t) {
          return new Promise((e, n) => {
            null != t &&
              (t.aborted
                ? n(t.reason)
                : t.addEventListener("abort", () => {
                    n(t.reason);
                  }));
          });
        }
        getTransactionConfirmationPromise({ commitment: t, signature: e }) {
          let n,
            r,
            i = !1;
          return {
            abortConfirmation: () => {
              r && (r(), (r = void 0)),
                null != n && (this.removeSignatureListener(n), (n = void 0));
            },
            confirmationPromise: new Promise((o, s) => {
              try {
                n = this.onSignature(
                  e,
                  (t, e) => {
                    n = void 0;
                    const r = { context: e, value: t };
                    o({ __type: mr.PROCESSED, response: r });
                  },
                  t
                );
                const a = new Promise((t) => {
                  null == n
                    ? t()
                    : (r = this._onSubscriptionStateChange(n, (e) => {
                        "subscribed" === e && t();
                      }));
                });
                (async () => {
                  if ((await a, i)) return;
                  const n = await this.getSignatureStatus(e);
                  if (i) return;
                  if (null == n) return;
                  const { context: r, value: c } = n;
                  if (null != c)
                    if (c?.err) s(c.err);
                    else {
                      switch (t) {
                        case "confirmed":
                        case "single":
                        case "singleGossip":
                          if ("processed" === c.confirmationStatus) return;
                          break;
                        case "finalized":
                        case "max":
                        case "root":
                          if (
                            "processed" === c.confirmationStatus ||
                            "confirmed" === c.confirmationStatus
                          )
                            return;
                      }
                      (i = !0),
                        o({
                          __type: mr.PROCESSED,
                          response: { context: r, value: c },
                        });
                    }
                })();
              } catch (a) {
                s(a);
              }
            }),
          };
        }
        async confirmTransactionUsingBlockHeightExceedanceStrategy({
          commitment: t,
          strategy: { abortSignal: e, lastValidBlockHeight: n, signature: r },
        }) {
          let i = !1;
          const o = new Promise((e) => {
              const r = async () => {
                try {
                  return await this.getBlockHeight(t);
                } catch (e) {
                  return -1;
                }
              };
              (async () => {
                let t = await r();
                if (!i) {
                  for (; t <= n; ) {
                    if ((await Br(1e3), i)) return;
                    if (((t = await r()), i)) return;
                  }
                  e({ __type: mr.BLOCKHEIGHT_EXCEEDED });
                }
              })();
            }),
            { abortConfirmation: s, confirmationPromise: a } =
              this.getTransactionConfirmationPromise({
                commitment: t,
                signature: r,
              }),
            c = this.getCancellationPromise(e);
          let u;
          try {
            const t = await Promise.race([c, a, o]);
            if (t.__type !== mr.PROCESSED) throw new nr(r);
            u = t.response;
          } finally {
            (i = !0), s();
          }
          return u;
        }
        async confirmTransactionUsingDurableNonceStrategy({
          commitment: t,
          strategy: {
            abortSignal: e,
            minContextSlot: n,
            nonceAccountPubkey: r,
            nonceValue: i,
            signature: o,
          },
        }) {
          let s = !1;
          const a = new Promise((e) => {
              let o = i,
                a = null;
              const c = async () => {
                try {
                  const { context: e, value: i } =
                    await this.getNonceAndContext(r, {
                      commitment: t,
                      minContextSlot: n,
                    });
                  return (a = e.slot), i?.nonce;
                } catch (e) {
                  return o;
                }
              };
              (async () => {
                if (((o = await c()), !s))
                  for (;;) {
                    if (i !== o)
                      return void e({
                        __type: mr.NONCE_INVALID,
                        slotInWhichNonceDidAdvance: a,
                      });
                    if ((await Br(2e3), s)) return;
                    if (((o = await c()), s)) return;
                  }
              })();
            }),
            { abortConfirmation: c, confirmationPromise: u } =
              this.getTransactionConfirmationPromise({
                commitment: t,
                signature: o,
              }),
            h = this.getCancellationPromise(e);
          let l;
          try {
            const e = await Promise.race([h, u, a]);
            if (e.__type === mr.PROCESSED) l = e.response;
            else {
              let r;
              for (;;) {
                const t = await this.getSignatureStatus(o);
                if (null == t) break;
                if (!(t.context.slot < (e.slotInWhichNonceDidAdvance ?? n))) {
                  r = t;
                  break;
                }
                await Br(400);
              }
              if (!r?.value) throw new ir(o);
              {
                const e = t || "finalized",
                  { confirmationStatus: n } = r.value;
                switch (e) {
                  case "processed":
                  case "recent":
                    if (
                      "processed" !== n &&
                      "confirmed" !== n &&
                      "finalized" !== n
                    )
                      throw new ir(o);
                    break;
                  case "confirmed":
                  case "single":
                  case "singleGossip":
                    if ("confirmed" !== n && "finalized" !== n) throw new ir(o);
                    break;
                  case "finalized":
                  case "max":
                  case "root":
                    if ("finalized" !== n) throw new ir(o);
                }
                l = { context: r.context, value: { err: r.value.err } };
              }
            }
          } finally {
            (s = !0), c();
          }
          return l;
        }
        async confirmTransactionUsingLegacyTimeoutStrategy({
          commitment: t,
          signature: e,
        }) {
          let n;
          const r = new Promise((e) => {
              let r = this._confirmTransactionInitialTimeout || 6e4;
              switch (t) {
                case "processed":
                case "recent":
                case "single":
                case "confirmed":
                case "singleGossip":
                  r = this._confirmTransactionInitialTimeout || 3e4;
              }
              n = setTimeout(
                () => e({ __type: mr.TIMED_OUT, timeoutMs: r }),
                r
              );
            }),
            { abortConfirmation: i, confirmationPromise: o } =
              this.getTransactionConfirmationPromise({
                commitment: t,
                signature: e,
              });
          let s;
          try {
            const t = await Promise.race([o, r]);
            if (t.__type !== mr.PROCESSED) throw new rr(e, t.timeoutMs / 1e3);
            s = t.response;
          } finally {
            clearTimeout(n), i();
          }
          return s;
        }
        async getClusterNodes() {
          const t = Te(
            await this._rpcRequest("getClusterNodes", []),
            mi(je(lo))
          );
          if ("error" in t)
            throw new ii(t.error, "failed to get cluster nodes");
          return t.result;
        }
        async getVoteAccounts(t) {
          const e = this._buildArgs([], t),
            n = Te(await this._rpcRequest("getVoteAccounts", e), po);
          if ("error" in n)
            throw new ii(n.error, "failed to get vote accounts");
          return n.result;
        }
        async getSlot(t) {
          const { commitment: e, config: n } = pi(t),
            r = this._buildArgs([], e, void 0, n),
            i = Te(await this._rpcRequest("getSlot", r), mi(Ue()));
          if ("error" in i) throw new ii(i.error, "failed to get slot");
          return i.result;
        }
        async getSlotLeader(t) {
          const { commitment: e, config: n } = pi(t),
            r = this._buildArgs([], e, void 0, n),
            i = Te(await this._rpcRequest("getSlotLeader", r), mi(qe()));
          if ("error" in i) throw new ii(i.error, "failed to get slot leader");
          return i.result;
        }
        async getSlotLeaders(t, e) {
          const n = [t, e],
            r = Te(await this._rpcRequest("getSlotLeaders", n), mi(je(hi)));
          if ("error" in r) throw new ii(r.error, "failed to get slot leaders");
          return r.result;
        }
        async getSignatureStatus(t, e) {
          const { context: n, value: r } = await this.getSignatureStatuses(
            [t],
            e
          );
          dr(1 === r.length);
          return { context: n, value: r[0] };
        }
        async getSignatureStatuses(t, e) {
          const n = [t];
          e && n.push(e);
          const r = Te(await this._rpcRequest("getSignatureStatuses", n), mo);
          if ("error" in r)
            throw new ii(r.error, "failed to get signature status");
          return r.result;
        }
        async getTransactionCount(t) {
          const { commitment: e, config: n } = pi(t),
            r = this._buildArgs([], e, void 0, n),
            i = Te(await this._rpcRequest("getTransactionCount", r), mi(Ue()));
          if ("error" in i)
            throw new ii(i.error, "failed to get transaction count");
          return i.result;
        }
        async getTotalSupply(t) {
          return (
            await this.getSupply({
              commitment: t,
              excludeNonCirculatingAccountsList: !0,
            })
          ).value.total;
        }
        async getInflationGovernor(t) {
          const e = this._buildArgs([], t),
            n = Te(await this._rpcRequest("getInflationGovernor", e), ji);
          if ("error" in n) throw new ii(n.error, "failed to get inflation");
          return n.result;
        }
        async getInflationReward(t, e, n) {
          const { commitment: r, config: i } = pi(n),
            o = this._buildArgs([t.map((t) => t.toBase58())], r, void 0, {
              ...i,
              epoch: null != e ? e : i?.epoch,
            }),
            s = Te(await this._rpcRequest("getInflationReward", o), Si);
          if ("error" in s)
            throw new ii(s.error, "failed to get inflation reward");
          return s.result;
        }
        async getInflationRate() {
          const t = Te(await this._rpcRequest("getInflationRate", []), Pi);
          if ("error" in t)
            throw new ii(t.error, "failed to get inflation rate");
          return t.result;
        }
        async getEpochInfo(t) {
          const { commitment: e, config: n } = pi(t),
            r = this._buildArgs([], e, void 0, n),
            i = Te(await this._rpcRequest("getEpochInfo", r), Ri);
          if ("error" in i) throw new ii(i.error, "failed to get epoch info");
          return i.result;
        }
        async getEpochSchedule() {
          const t = Te(await this._rpcRequest("getEpochSchedule", []), zi);
          if ("error" in t)
            throw new ii(t.error, "failed to get epoch schedule");
          const e = t.result;
          return new ei(
            e.slotsPerEpoch,
            e.leaderScheduleSlotOffset,
            e.warmup,
            e.firstNormalEpoch,
            e.firstNormalSlot
          );
        }
        async getLeaderSchedule() {
          const t = Te(await this._rpcRequest("getLeaderSchedule", []), Di);
          if ("error" in t)
            throw new ii(t.error, "failed to get leader schedule");
          return t.result;
        }
        async getMinimumBalanceForRentExemption(t, e) {
          const n = this._buildArgs([t], e),
            r = Te(
              await this._rpcRequest("getMinimumBalanceForRentExemption", n),
              wo
            );
          return "error" in r
            ? (console.warn(
                "Unable to fetch minimum balance for rent exemption"
              ),
              0)
            : r.result;
        }
        async getRecentBlockhashAndContext(t) {
          const e = this._buildArgs([], t),
            n = Te(await this._rpcRequest("getRecentBlockhash", e), qo);
          if ("error" in n)
            throw new ii(n.error, "failed to get recent blockhash");
          return n.result;
        }
        async getRecentPerformanceSamples(t) {
          const e = Te(
            await this._rpcRequest("getRecentPerformanceSamples", t ? [t] : []),
            Yo
          );
          if ("error" in e)
            throw new ii(e.error, "failed to get recent performance samples");
          return e.result;
        }
        async getFeeCalculatorForBlockhash(t, e) {
          const n = this._buildArgs([t], e),
            r = Te(
              await this._rpcRequest("getFeeCalculatorForBlockhash", n),
              Vo
            );
          if ("error" in r)
            throw new ii(r.error, "failed to get fee calculator");
          const { context: i, value: o } = r.result;
          return { context: i, value: null !== o ? o.feeCalculator : null };
        }
        async getFeeForMessage(t, e) {
          const n = Wn(t.serialize()).toString("base64"),
            r = this._buildArgs([n], e),
            i = Te(await this._rpcRequest("getFeeForMessage", r), wi(De(Ue())));
          if ("error" in i)
            throw new ii(i.error, "failed to get fee for message");
          if (null === i.result) throw new Error("invalid blockhash");
          return i.result;
        }
        async getRecentPrioritizationFees(t) {
          const e = t?.lockedWritableAccounts?.map((t) => t.toBase58()),
            n = e?.length ? [e] : [],
            r = Te(
              await this._rpcRequest("getRecentPrioritizationFees", n),
              Ci
            );
          if ("error" in r)
            throw new ii(r.error, "failed to get recent prioritization fees");
          return r.result;
        }
        async getRecentBlockhash(t) {
          try {
            return (await this.getRecentBlockhashAndContext(t)).value;
          } catch (e) {
            throw new Error("failed to get recent blockhash: " + e);
          }
        }
        async getLatestBlockhash(t) {
          try {
            return (await this.getLatestBlockhashAndContext(t)).value;
          } catch (e) {
            throw new Error("failed to get recent blockhash: " + e);
          }
        }
        async getLatestBlockhashAndContext(t) {
          const { commitment: e, config: n } = pi(t),
            r = this._buildArgs([], e, void 0, n),
            i = Te(await this._rpcRequest("getLatestBlockhash", r), Ho);
          if ("error" in i)
            throw new ii(i.error, "failed to get latest blockhash");
          return i.result;
        }
        async isBlockhashValid(t, e) {
          const { commitment: n, config: r } = pi(e),
            i = this._buildArgs([t], n, void 0, r),
            o = Te(await this._rpcRequest("isBlockhashValid", i), Fo);
          if ("error" in o)
            throw new ii(
              o.error,
              "failed to determine if the blockhash `" + t + "`is valid"
            );
          return o.result;
        }
        async getVersion() {
          const t = Te(await this._rpcRequest("getVersion", []), mi(Ni));
          if ("error" in t) throw new ii(t.error, "failed to get version");
          return t.result;
        }
        async getGenesisHash() {
          const t = Te(await this._rpcRequest("getGenesisHash", []), mi(qe()));
          if ("error" in t) throw new ii(t.error, "failed to get genesis hash");
          return t.result;
        }
        async getBlock(t, e) {
          const { commitment: n, config: r } = pi(e),
            i = this._buildArgsAtLeastConfirmed([t], n, void 0, r),
            o = await this._rpcRequest("getBlock", i);
          try {
            switch (r?.transactionDetails) {
              case "accounts": {
                const t = Te(o, Po);
                if ("error" in t) throw t.error;
                return t.result;
              }
              case "none": {
                const t = Te(o, jo);
                if ("error" in t) throw t.error;
                return t.result;
              }
              default: {
                const t = Te(o, Bo);
                if ("error" in t) throw t.error;
                const { result: e } = t;
                return e
                  ? {
                      ...e,
                      transactions: e.transactions.map(
                        ({ transaction: t, meta: e, version: n }) => ({
                          meta: e,
                          transaction: { ...t, message: vi(n, t.message) },
                          version: n,
                        })
                      ),
                    }
                  : null;
              }
            }
          } catch (s) {
            throw new ii(s, "failed to get confirmed block");
          }
        }
        async getParsedBlock(t, e) {
          const { commitment: n, config: r } = pi(e),
            i = this._buildArgsAtLeastConfirmed([t], n, "jsonParsed", r),
            o = await this._rpcRequest("getBlock", i);
          try {
            switch (r?.transactionDetails) {
              case "accounts": {
                const t = Te(o, Ro);
                if ("error" in t) throw t.error;
                return t.result;
              }
              case "none": {
                const t = Te(o, zo);
                if ("error" in t) throw t.error;
                return t.result;
              }
              default: {
                const t = Te(o, Co);
                if ("error" in t) throw t.error;
                return t.result;
              }
            }
          } catch (s) {
            throw new ii(s, "failed to get block");
          }
        }
        async getBlockProduction(t) {
          let e, n;
          if ("string" === typeof t) n = t;
          else if (t) {
            const { commitment: r, ...i } = t;
            (n = r), (e = i);
          }
          const r = this._buildArgs([], n, "base64", e),
            i = Te(await this._rpcRequest("getBlockProduction", r), Bi);
          if ("error" in i)
            throw new ii(i.error, "failed to get block production information");
          return i.result;
        }
        async getTransaction(t, e) {
          const { commitment: n, config: r } = pi(e),
            i = this._buildArgsAtLeastConfirmed([t], n, void 0, r),
            o = Te(await this._rpcRequest("getTransaction", i), Wo);
          if ("error" in o) throw new ii(o.error, "failed to get transaction");
          const s = o.result;
          return s
            ? {
                ...s,
                transaction: {
                  ...s.transaction,
                  message: vi(s.version, s.transaction.message),
                },
              }
            : s;
        }
        async getParsedTransaction(t, e) {
          const { commitment: n, config: r } = pi(e),
            i = this._buildArgsAtLeastConfirmed([t], n, "jsonParsed", r),
            o = Te(await this._rpcRequest("getTransaction", i), Ko);
          if ("error" in o) throw new ii(o.error, "failed to get transaction");
          return o.result;
        }
        async getParsedTransactions(t, e) {
          const { commitment: n, config: r } = pi(e),
            i = t.map((t) => ({
              methodName: "getTransaction",
              args: this._buildArgsAtLeastConfirmed([t], n, "jsonParsed", r),
            }));
          return (await this._rpcBatchRequest(i)).map((t) => {
            const e = Te(t, Ko);
            if ("error" in e)
              throw new ii(e.error, "failed to get transactions");
            return e.result;
          });
        }
        async getTransactions(t, e) {
          const { commitment: n, config: r } = pi(e),
            i = t.map((t) => ({
              methodName: "getTransaction",
              args: this._buildArgsAtLeastConfirmed([t], n, void 0, r),
            }));
          return (await this._rpcBatchRequest(i)).map((t) => {
            const e = Te(t, Wo);
            if ("error" in e)
              throw new ii(e.error, "failed to get transactions");
            const n = e.result;
            return n
              ? {
                  ...n,
                  transaction: {
                    ...n.transaction,
                    message: vi(n.version, n.transaction.message),
                  },
                }
              : n;
          });
        }
        async getConfirmedBlock(t, e) {
          const n = this._buildArgsAtLeastConfirmed([t], e),
            r = Te(await this._rpcRequest("getConfirmedBlock", n), Do);
          if ("error" in r)
            throw new ii(r.error, "failed to get confirmed block");
          const i = r.result;
          if (!i) throw new Error("Confirmed block " + t + " not found");
          const o = {
            ...i,
            transactions: i.transactions.map(({ transaction: t, meta: e }) => {
              const n = new pr(t.message);
              return { meta: e, transaction: { ...t, message: n } };
            }),
          };
          return {
            ...o,
            transactions: o.transactions.map(({ transaction: t, meta: e }) => ({
              meta: e,
              transaction: vr.populate(t.message, t.signatures),
            })),
          };
        }
        async getBlocks(t, e, n) {
          const r = this._buildArgsAtLeastConfirmed(
              void 0 !== e ? [t, e] : [t],
              n
            ),
            i = Te(await this._rpcRequest("getBlocks", r), mi(je(Ue())));
          if ("error" in i) throw new ii(i.error, "failed to get blocks");
          return i.result;
        }
        async getBlockSignatures(t, e) {
          const n = this._buildArgsAtLeastConfirmed([t], e, void 0, {
              transactionDetails: "signatures",
              rewards: !1,
            }),
            r = Te(await this._rpcRequest("getBlock", n), Uo);
          if ("error" in r) throw new ii(r.error, "failed to get block");
          const i = r.result;
          if (!i) throw new Error("Block " + t + " not found");
          return i;
        }
        async getConfirmedBlockSignatures(t, e) {
          const n = this._buildArgsAtLeastConfirmed([t], e, void 0, {
              transactionDetails: "signatures",
              rewards: !1,
            }),
            r = Te(await this._rpcRequest("getConfirmedBlock", n), Uo);
          if ("error" in r)
            throw new ii(r.error, "failed to get confirmed block");
          const i = r.result;
          if (!i) throw new Error("Confirmed block " + t + " not found");
          return i;
        }
        async getConfirmedTransaction(t, e) {
          const n = this._buildArgsAtLeastConfirmed([t], e),
            r = Te(await this._rpcRequest("getConfirmedTransaction", n), Wo);
          if ("error" in r) throw new ii(r.error, "failed to get transaction");
          const i = r.result;
          if (!i) return i;
          const o = new pr(i.transaction.message),
            s = i.transaction.signatures;
          return { ...i, transaction: vr.populate(o, s) };
        }
        async getParsedConfirmedTransaction(t, e) {
          const n = this._buildArgsAtLeastConfirmed([t], e, "jsonParsed"),
            r = Te(await this._rpcRequest("getConfirmedTransaction", n), Ko);
          if ("error" in r)
            throw new ii(r.error, "failed to get confirmed transaction");
          return r.result;
        }
        async getParsedConfirmedTransactions(t, e) {
          const n = t.map((t) => ({
            methodName: "getConfirmedTransaction",
            args: this._buildArgsAtLeastConfirmed([t], e, "jsonParsed"),
          }));
          return (await this._rpcBatchRequest(n)).map((t) => {
            const e = Te(t, Ko);
            if ("error" in e)
              throw new ii(e.error, "failed to get confirmed transactions");
            return e.result;
          });
        }
        async getConfirmedSignaturesForAddress(t, e, n) {
          let r = {},
            i = await this.getFirstAvailableBlock();
          for (; !("until" in r) && !(--e <= 0 || e < i); )
            try {
              const t = await this.getConfirmedBlockSignatures(e, "finalized");
              t.signatures.length > 0 &&
                (r.until = t.signatures[t.signatures.length - 1].toString());
            } catch (s) {
              if (s instanceof Error && s.message.includes("skipped")) continue;
              throw s;
            }
          let o = await this.getSlot("finalized");
          for (; !("before" in r) && !(++n > o); )
            try {
              const t = await this.getConfirmedBlockSignatures(n);
              t.signatures.length > 0 &&
                (r.before = t.signatures[t.signatures.length - 1].toString());
            } catch (s) {
              if (s instanceof Error && s.message.includes("skipped")) continue;
              throw s;
            }
          return (await this.getConfirmedSignaturesForAddress2(t, r)).map(
            (t) => t.signature
          );
        }
        async getConfirmedSignaturesForAddress2(t, e, n) {
          const r = this._buildArgsAtLeastConfirmed(
              [t.toBase58()],
              n,
              void 0,
              e
            ),
            i = Te(
              await this._rpcRequest("getConfirmedSignaturesForAddress2", r),
              to
            );
          if ("error" in i)
            throw new ii(
              i.error,
              "failed to get confirmed signatures for address"
            );
          return i.result;
        }
        async getSignaturesForAddress(t, e, n) {
          const r = this._buildArgsAtLeastConfirmed(
              [t.toBase58()],
              n,
              void 0,
              e
            ),
            i = Te(await this._rpcRequest("getSignaturesForAddress", r), eo);
          if ("error" in i)
            throw new ii(i.error, "failed to get signatures for address");
          return i.result;
        }
        async getAddressLookupTable(t, e) {
          const { context: n, value: r } = await this.getAccountInfoAndContext(
            t,
            e
          );
          let i = null;
          return (
            null !== r &&
              (i = new ai({ key: t, state: ai.deserialize(r.data) })),
            { context: n, value: i }
          );
        }
        async getNonceAndContext(t, e) {
          const { context: n, value: r } = await this.getAccountInfoAndContext(
            t,
            e
          );
          let i = null;
          return (
            null !== r && (i = Dr.fromAccountData(r.data)),
            { context: n, value: i }
          );
        }
        async getNonce(t, e) {
          return await this.getNonceAndContext(t, e)
            .then((t) => t.value)
            .catch((e) => {
              throw new Error(
                "failed to get nonce for account " + t.toBase58() + ": " + e
              );
            });
        }
        async requestAirdrop(t, e) {
          const n = Te(
            await this._rpcRequest("requestAirdrop", [t.toBase58(), e]),
            $o
          );
          if ("error" in n)
            throw new ii(n.error, `airdrop to ${t.toBase58()} failed`);
          return n.result;
        }
        async _blockhashWithExpiryBlockHeight(t) {
          if (!t) {
            for (; this._pollingBlockhash; ) await Br(100);
            const t = Date.now() - this._blockhashInfo.lastFetch >= fi;
            if (null !== this._blockhashInfo.latestBlockhash && !t)
              return this._blockhashInfo.latestBlockhash;
          }
          return await this._pollNewBlockhash();
        }
        async _pollNewBlockhash() {
          this._pollingBlockhash = !0;
          try {
            const t = Date.now(),
              e = this._blockhashInfo.latestBlockhash,
              n = e ? e.blockhash : null;
            for (let r = 0; r < 50; r++) {
              const t = await this.getLatestBlockhash("finalized");
              if (n !== t.blockhash)
                return (
                  (this._blockhashInfo = {
                    latestBlockhash: t,
                    lastFetch: Date.now(),
                    transactionSignatures: [],
                    simulatedSignatures: [],
                  }),
                  t
                );
              await Br(200);
            }
            throw new Error(
              `Unable to obtain a new blockhash after ${Date.now() - t}ms`
            );
          } finally {
            this._pollingBlockhash = !1;
          }
        }
        async getStakeMinimumDelegation(t) {
          const { commitment: e, config: n } = pi(t),
            r = this._buildArgs([], e, "base64", n),
            i = Te(
              await this._rpcRequest("getStakeMinimumDelegation", r),
              wi(Ue())
            );
          if ("error" in i)
            throw new ii(i.error, "failed to get stake minimum delegation");
          return i.result;
        }
        async simulateTransaction(t, e, n) {
          if ("message" in t) {
            const r = t.serialize(),
              o = i.Buffer.from(r).toString("base64");
            if (Array.isArray(e) || void 0 !== n)
              throw new Error("Invalid arguments");
            const s = e || {};
            (s.encoding = "base64"),
              "commitment" in s || (s.commitment = this.commitment);
            const a = [o, s],
              c = Te(await this._rpcRequest("simulateTransaction", a), Oi);
            if ("error" in c)
              throw new Error(
                "failed to simulate transaction: " + c.error.message
              );
            return c.result;
          }
          let r;
          if (t instanceof vr) {
            let e = t;
            (r = new vr()),
              (r.feePayer = e.feePayer),
              (r.instructions = t.instructions),
              (r.nonceInfo = e.nonceInfo),
              (r.signatures = e.signatures);
          } else (r = vr.populate(t)), (r._message = r._json = void 0);
          if (void 0 !== e && !Array.isArray(e))
            throw new Error("Invalid arguments");
          const o = e;
          if (r.nonceInfo && o) r.sign(...o);
          else {
            let t = this._disableBlockhashCaching;
            for (;;) {
              const e = await this._blockhashWithExpiryBlockHeight(t);
              if (
                ((r.lastValidBlockHeight = e.lastValidBlockHeight),
                (r.recentBlockhash = e.blockhash),
                !o)
              )
                break;
              if ((r.sign(...o), !r.signature)) throw new Error("!signature");
              const n = r.signature.toString("base64");
              if (
                !this._blockhashInfo.simulatedSignatures.includes(n) &&
                !this._blockhashInfo.transactionSignatures.includes(n)
              ) {
                this._blockhashInfo.simulatedSignatures.push(n);
                break;
              }
              t = !0;
            }
          }
          const s = r._compile(),
            a = s.serialize(),
            c = r._serialize(a).toString("base64"),
            u = { encoding: "base64", commitment: this.commitment };
          if (n) {
            const t = (Array.isArray(n) ? n : s.nonProgramIds()).map((t) =>
              t.toBase58()
            );
            u.accounts = { encoding: "base64", addresses: t };
          }
          o && (u.sigVerify = !0);
          const h = [c, u],
            l = Te(await this._rpcRequest("simulateTransaction", h), Oi);
          if ("error" in l) {
            let t;
            if (
              "data" in l.error &&
              ((t = l.error.data.logs), t && Array.isArray(t))
            ) {
              const e = "\n    ",
                n = e + t.join(e);
              console.error(l.error.message, n);
            }
            throw new ni(
              "failed to simulate transaction: " + l.error.message,
              t
            );
          }
          return l.result;
        }
        async sendTransaction(t, e, n) {
          if ("version" in t) {
            if (e && Array.isArray(e)) throw new Error("Invalid arguments");
            const n = t.serialize();
            return await this.sendRawTransaction(n, e);
          }
          if (void 0 === e || !Array.isArray(e))
            throw new Error("Invalid arguments");
          const r = e;
          if (t.nonceInfo) t.sign(...r);
          else {
            let e = this._disableBlockhashCaching;
            for (;;) {
              const n = await this._blockhashWithExpiryBlockHeight(e);
              if (
                ((t.lastValidBlockHeight = n.lastValidBlockHeight),
                (t.recentBlockhash = n.blockhash),
                t.sign(...r),
                !t.signature)
              )
                throw new Error("!signature");
              const i = t.signature.toString("base64");
              if (!this._blockhashInfo.transactionSignatures.includes(i)) {
                this._blockhashInfo.transactionSignatures.push(i);
                break;
              }
              e = !0;
            }
          }
          const i = t.serialize();
          return await this.sendRawTransaction(i, n);
        }
        async sendRawTransaction(t, e) {
          const n = Wn(t).toString("base64");
          return await this.sendEncodedTransaction(n, e);
        }
        async sendEncodedTransaction(t, e) {
          const n = { encoding: "base64" },
            r = e && e.skipPreflight,
            i = (e && e.preflightCommitment) || this.commitment;
          e && null != e.maxRetries && (n.maxRetries = e.maxRetries),
            e &&
              null != e.minContextSlot &&
              (n.minContextSlot = e.minContextSlot),
            r && (n.skipPreflight = r),
            i && (n.preflightCommitment = i);
          const o = [t, n],
            s = Te(await this._rpcRequest("sendTransaction", o), Zo);
          if ("error" in s) {
            let t;
            throw (
              ("data" in s.error && (t = s.error.data.logs),
              new ni("failed to send transaction: " + s.error.message, t))
            );
          }
          return s.result;
        }
        _wsOnOpen() {
          (this._rpcWebSocketConnected = !0),
            (this._rpcWebSocketHeartbeat = setInterval(() => {
              (async () => {
                try {
                  await this._rpcWebSocket.notify("ping");
                } catch {}
              })();
            }, 5e3)),
            this._updateSubscriptions();
        }
        _wsOnError(t) {
          (this._rpcWebSocketConnected = !1),
            console.error("ws error:", t.message);
        }
        _wsOnClose(t) {
          (this._rpcWebSocketConnected = !1),
            (this._rpcWebSocketGeneration =
              (this._rpcWebSocketGeneration + 1) % Number.MAX_SAFE_INTEGER),
            this._rpcWebSocketIdleTimeout &&
              (clearTimeout(this._rpcWebSocketIdleTimeout),
              (this._rpcWebSocketIdleTimeout = null)),
            this._rpcWebSocketHeartbeat &&
              (clearInterval(this._rpcWebSocketHeartbeat),
              (this._rpcWebSocketHeartbeat = null)),
            1e3 !== t
              ? ((this._subscriptionCallbacksByServerSubscriptionId = {}),
                Object.entries(this._subscriptionsByHash).forEach(([t, e]) => {
                  this._setSubscription(t, { ...e, state: "pending" });
                }))
              : this._updateSubscriptions();
        }
        _setSubscription(t, e) {
          const n = this._subscriptionsByHash[t]?.state;
          if (((this._subscriptionsByHash[t] = e), n !== e.state)) {
            const n = this._subscriptionStateChangeCallbacksByHash[t];
            n &&
              n.forEach((t) => {
                try {
                  t(e.state);
                } catch {}
              });
          }
        }
        _onSubscriptionStateChange(t, e) {
          const n = this._subscriptionHashByClientSubscriptionId[t];
          if (null == n) return () => {};
          const r = (this._subscriptionStateChangeCallbacksByHash[n] ||=
            new Set());
          return (
            r.add(e),
            () => {
              r.delete(e),
                0 === r.size &&
                  delete this._subscriptionStateChangeCallbacksByHash[n];
            }
          );
        }
        async _updateSubscriptions() {
          if (0 === Object.keys(this._subscriptionsByHash).length)
            return void (
              this._rpcWebSocketConnected &&
              ((this._rpcWebSocketConnected = !1),
              (this._rpcWebSocketIdleTimeout = setTimeout(() => {
                this._rpcWebSocketIdleTimeout = null;
                try {
                  this._rpcWebSocket.close();
                } catch (t) {
                  t instanceof Error &&
                    console.log(
                      `Error when closing socket connection: ${t.message}`
                    );
                }
              }, 500)))
            );
          if (
            (null !== this._rpcWebSocketIdleTimeout &&
              (clearTimeout(this._rpcWebSocketIdleTimeout),
              (this._rpcWebSocketIdleTimeout = null),
              (this._rpcWebSocketConnected = !0)),
            !this._rpcWebSocketConnected)
          )
            return void this._rpcWebSocket.connect();
          const t = this._rpcWebSocketGeneration,
            e = () => t === this._rpcWebSocketGeneration;
          await Promise.all(
            Object.keys(this._subscriptionsByHash).map(async (t) => {
              const n = this._subscriptionsByHash[t];
              if (void 0 !== n)
                switch (n.state) {
                  case "pending":
                  case "unsubscribed":
                    if (0 === n.callbacks.size)
                      return (
                        delete this._subscriptionsByHash[t],
                        "unsubscribed" === n.state &&
                          delete this
                            ._subscriptionCallbacksByServerSubscriptionId[
                            n.serverSubscriptionId
                          ],
                        void (await this._updateSubscriptions())
                      );
                    await (async () => {
                      const { args: r, method: i } = n;
                      try {
                        this._setSubscription(t, {
                          ...n,
                          state: "subscribing",
                        });
                        const e = await this._rpcWebSocket.call(i, r);
                        this._setSubscription(t, {
                          ...n,
                          serverSubscriptionId: e,
                          state: "subscribed",
                        }),
                          (this._subscriptionCallbacksByServerSubscriptionId[
                            e
                          ] = n.callbacks),
                          await this._updateSubscriptions();
                      } catch (o) {
                        if (
                          (o instanceof Error &&
                            console.error(
                              `${i} error for argument`,
                              r,
                              o.message
                            ),
                          !e())
                        )
                          return;
                        this._setSubscription(t, { ...n, state: "pending" }),
                          await this._updateSubscriptions();
                      }
                    })();
                    break;
                  case "subscribed":
                    0 === n.callbacks.size &&
                      (await (async () => {
                        const {
                          serverSubscriptionId: r,
                          unsubscribeMethod: i,
                        } = n;
                        if (this._subscriptionsAutoDisposedByRpc.has(r))
                          this._subscriptionsAutoDisposedByRpc.delete(r);
                        else {
                          this._setSubscription(t, {
                            ...n,
                            state: "unsubscribing",
                          }),
                            this._setSubscription(t, {
                              ...n,
                              state: "unsubscribing",
                            });
                          try {
                            await this._rpcWebSocket.call(i, [r]);
                          } catch (o) {
                            if (
                              (o instanceof Error &&
                                console.error(`${i} error:`, o.message),
                              !e())
                            )
                              return;
                            return (
                              this._setSubscription(t, {
                                ...n,
                                state: "subscribed",
                              }),
                              void (await this._updateSubscriptions())
                            );
                          }
                        }
                        this._setSubscription(t, {
                          ...n,
                          state: "unsubscribed",
                        }),
                          await this._updateSubscriptions();
                      })());
                }
            })
          );
        }
        _handleServerNotification(t, e) {
          const n = this._subscriptionCallbacksByServerSubscriptionId[t];
          void 0 !== n &&
            n.forEach((t) => {
              try {
                t(...e);
              } catch (n) {
                console.error(n);
              }
            });
        }
        _wsOnAccountNotification(t) {
          const { result: e, subscription: n } = Te(t, no);
          this._handleServerNotification(n, [e.value, e.context]);
        }
        _makeSubscription(t, e) {
          const n = this._nextClientSubscriptionId++,
            r = Xr([t.method, e], !0),
            i = this._subscriptionsByHash[r];
          return (
            void 0 === i
              ? (this._subscriptionsByHash[r] = {
                  ...t,
                  args: e,
                  callbacks: new Set([t.callback]),
                  state: "pending",
                })
              : i.callbacks.add(t.callback),
            (this._subscriptionHashByClientSubscriptionId[n] = r),
            (this._subscriptionDisposeFunctionsByClientSubscriptionId[n] =
              async () => {
                delete this._subscriptionDisposeFunctionsByClientSubscriptionId[
                  n
                ],
                  delete this._subscriptionHashByClientSubscriptionId[n];
                const e = this._subscriptionsByHash[r];
                dr(
                  void 0 !== e,
                  `Could not find a \`Subscription\` when tearing down client subscription #${n}`
                ),
                  e.callbacks.delete(t.callback),
                  await this._updateSubscriptions();
              }),
            this._updateSubscriptions(),
            n
          );
        }
        onAccountChange(t, e, n) {
          const r = this._buildArgs(
            [t.toBase58()],
            n || this._commitment || "finalized",
            "base64"
          );
          return this._makeSubscription(
            {
              callback: e,
              method: "accountSubscribe",
              unsubscribeMethod: "accountUnsubscribe",
            },
            r
          );
        }
        async removeAccountChangeListener(t) {
          await this._unsubscribeClientSubscription(t, "account change");
        }
        _wsOnProgramAccountNotification(t) {
          const { result: e, subscription: n } = Te(t, io);
          this._handleServerNotification(n, [
            { accountId: e.value.pubkey, accountInfo: e.value.account },
            e.context,
          ]);
        }
        onProgramAccountChange(t, e, n, r) {
          const i = this._buildArgs(
            [t.toBase58()],
            n || this._commitment || "finalized",
            "base64",
            r ? { filters: r } : void 0
          );
          return this._makeSubscription(
            {
              callback: e,
              method: "programSubscribe",
              unsubscribeMethod: "programUnsubscribe",
            },
            i
          );
        }
        async removeProgramAccountChangeListener(t) {
          await this._unsubscribeClientSubscription(
            t,
            "program account change"
          );
        }
        onLogs(t, e, n) {
          const r = this._buildArgs(
            ["object" === typeof t ? { mentions: [t.toString()] } : t],
            n || this._commitment || "finalized"
          );
          return this._makeSubscription(
            {
              callback: e,
              method: "logsSubscribe",
              unsubscribeMethod: "logsUnsubscribe",
            },
            r
          );
        }
        async removeOnLogsListener(t) {
          await this._unsubscribeClientSubscription(t, "logs");
        }
        _wsOnLogsNotification(t) {
          const { result: e, subscription: n } = Te(t, Qo);
          this._handleServerNotification(n, [e.value, e.context]);
        }
        _wsOnSlotNotification(t) {
          const { result: e, subscription: n } = Te(t, so);
          this._handleServerNotification(n, [e]);
        }
        onSlotChange(t) {
          return this._makeSubscription(
            {
              callback: t,
              method: "slotSubscribe",
              unsubscribeMethod: "slotUnsubscribe",
            },
            []
          );
        }
        async removeSlotChangeListener(t) {
          await this._unsubscribeClientSubscription(t, "slot change");
        }
        _wsOnSlotUpdatesNotification(t) {
          const { result: e, subscription: n } = Te(t, co);
          this._handleServerNotification(n, [e]);
        }
        onSlotUpdate(t) {
          return this._makeSubscription(
            {
              callback: t,
              method: "slotsUpdatesSubscribe",
              unsubscribeMethod: "slotsUpdatesUnsubscribe",
            },
            []
          );
        }
        async removeSlotUpdateListener(t) {
          await this._unsubscribeClientSubscription(t, "slot update");
        }
        async _unsubscribeClientSubscription(t, e) {
          const n = this._subscriptionDisposeFunctionsByClientSubscriptionId[t];
          n
            ? await n()
            : console.warn(
                `Ignored unsubscribe request because an active subscription with id \`${t}\` for '${e}' events could not be found.`
              );
        }
        _buildArgs(t, e, n, r) {
          const i = e || this._commitment;
          if (i || n || r) {
            let e = {};
            n && (e.encoding = n),
              i && (e.commitment = i),
              r && (e = Object.assign(e, r)),
              t.push(e);
          }
          return t;
        }
        _buildArgsAtLeastConfirmed(t, e, n, r) {
          const i = e || this._commitment;
          if (i && !["confirmed", "finalized"].includes(i))
            throw new Error(
              "Using Connection with default commitment: `" +
                this._commitment +
                "`, but method requires at least `confirmed`"
            );
          return this._buildArgs(t, e, n, r);
        }
        _wsOnSignatureNotification(t) {
          const { result: e, subscription: n } = Te(t, uo);
          "receivedSignature" !== e.value &&
            this._subscriptionsAutoDisposedByRpc.add(n),
            this._handleServerNotification(
              n,
              "receivedSignature" === e.value
                ? [{ type: "received" }, e.context]
                : [{ type: "status", result: e.value }, e.context]
            );
        }
        onSignature(t, e, n) {
          const r = this._buildArgs([t], n || this._commitment || "finalized"),
            i = this._makeSubscription(
              {
                callback: (t, n) => {
                  if ("status" === t.type) {
                    e(t.result, n);
                    try {
                      this.removeSignatureListener(i);
                    } catch (r) {}
                  }
                },
                method: "signatureSubscribe",
                unsubscribeMethod: "signatureUnsubscribe",
              },
              r
            );
          return i;
        }
        onSignatureWithOptions(t, e, n) {
          const { commitment: r, ...i } = {
              ...n,
              commitment:
                (n && n.commitment) || this._commitment || "finalized",
            },
            o = this._buildArgs([t], r, void 0, i),
            s = this._makeSubscription(
              {
                callback: (t, n) => {
                  e(t, n);
                  try {
                    this.removeSignatureListener(s);
                  } catch (r) {}
                },
                method: "signatureSubscribe",
                unsubscribeMethod: "signatureUnsubscribe",
              },
              o
            );
          return s;
        }
        async removeSignatureListener(t) {
          await this._unsubscribeClientSubscription(t, "signature result");
        }
        _wsOnRootNotification(t) {
          const { result: e, subscription: n } = Te(t, ho);
          this._handleServerNotification(n, [e]);
        }
        onRootChange(t) {
          return this._makeSubscription(
            {
              callback: t,
              method: "rootSubscribe",
              unsubscribeMethod: "rootUnsubscribe",
            },
            []
          );
        }
        async removeRootChangeListener(t) {
          await this._unsubscribeClientSubscription(t, "root change");
        }
      }
      class ts {
        constructor(t) {
          (this._keypair = void 0), (this._keypair = t ?? Cn());
        }
        static generate() {
          return new ts(Cn());
        }
        static fromSecretKey(t, e) {
          if (64 !== t.byteLength) throw new Error("bad secret key size");
          const n = t.slice(32, 64);
          if (!e || !e.skipValidation) {
            const e = t.slice(0, 32),
              r = Rn(e);
            for (let t = 0; t < 32; t++)
              if (n[t] !== r[t])
                throw new Error("provided secretKey is invalid");
          }
          return new ts({ publicKey: n, secretKey: t });
        }
        static fromSeed(t) {
          const e = Rn(t),
            n = new Uint8Array(64);
          return n.set(t), n.set(e, 32), new ts({ publicKey: e, secretKey: n });
        }
        get publicKey() {
          return new Gn(this._keypair.publicKey);
        }
        get secretKey() {
          return new Uint8Array(this._keypair.secretKey);
        }
      }
      const es = Object.freeze({
        CreateLookupTable: {
          index: 0,
          layout: ve.n_([
            ve.Jq("instruction"),
            Ur("recentSlot"),
            ve.u8("bumpSeed"),
          ]),
        },
        FreezeLookupTable: { index: 1, layout: ve.n_([ve.Jq("instruction")]) },
        ExtendLookupTable: {
          index: 2,
          layout: ve.n_([
            ve.Jq("instruction"),
            Ur(),
            ve.A9(sr(), ve.cv(ve.Jq(), -8), "addresses"),
          ]),
        },
        DeactivateLookupTable: {
          index: 3,
          layout: ve.n_([ve.Jq("instruction")]),
        },
        CloseLookupTable: { index: 4, layout: ve.n_([ve.Jq("instruction")]) },
      });
      class ns {
        constructor() {}
        static decodeInstructionType(t) {
          this.checkProgramId(t.programId);
          const e = ve.Jq("instruction").decode(t.data);
          let n;
          for (const [r, i] of Object.entries(es))
            if (i.index == e) {
              n = r;
              break;
            }
          if (!n)
            throw new Error(
              "Invalid Instruction. Should be a LookupTable Instruction"
            );
          return n;
        }
        static decodeCreateLookupTable(t) {
          this.checkProgramId(t.programId), this.checkKeysLength(t.keys, 4);
          const { recentSlot: e } = Pr(es.CreateLookupTable, t.data);
          return {
            authority: t.keys[1].pubkey,
            payer: t.keys[2].pubkey,
            recentSlot: Number(e),
          };
        }
        static decodeExtendLookupTable(t) {
          if ((this.checkProgramId(t.programId), t.keys.length < 2))
            throw new Error(
              `invalid instruction; found ${t.keys.length} keys, expected at least 2`
            );
          const { addresses: e } = Pr(es.ExtendLookupTable, t.data);
          return {
            lookupTable: t.keys[0].pubkey,
            authority: t.keys[1].pubkey,
            payer: t.keys.length > 2 ? t.keys[2].pubkey : void 0,
            addresses: e.map((t) => new Gn(t)),
          };
        }
        static decodeCloseLookupTable(t) {
          return (
            this.checkProgramId(t.programId),
            this.checkKeysLength(t.keys, 3),
            {
              lookupTable: t.keys[0].pubkey,
              authority: t.keys[1].pubkey,
              recipient: t.keys[2].pubkey,
            }
          );
        }
        static decodeFreezeLookupTable(t) {
          return (
            this.checkProgramId(t.programId),
            this.checkKeysLength(t.keys, 2),
            { lookupTable: t.keys[0].pubkey, authority: t.keys[1].pubkey }
          );
        }
        static decodeDeactivateLookupTable(t) {
          return (
            this.checkProgramId(t.programId),
            this.checkKeysLength(t.keys, 2),
            { lookupTable: t.keys[0].pubkey, authority: t.keys[1].pubkey }
          );
        }
        static checkProgramId(t) {
          if (!t.equals(rs.programId))
            throw new Error(
              "invalid instruction; programId is not AddressLookupTable Program"
            );
        }
        static checkKeysLength(t, e) {
          if (t.length < e)
            throw new Error(
              `invalid instruction; found ${t.length} keys, expected at least ${e}`
            );
        }
      }
      class rs {
        constructor() {}
        static createLookupTable(t) {
          const [e, n] = Gn.findProgramAddressSync(
              [t.authority.toBuffer(), (0, ke.k$)(BigInt(t.recentSlot), 8)],
              this.programId
            ),
            r = jr(es.CreateLookupTable, {
              recentSlot: BigInt(t.recentSlot),
              bumpSeed: n,
            }),
            i = [
              { pubkey: e, isSigner: !1, isWritable: !0 },
              { pubkey: t.authority, isSigner: !0, isWritable: !1 },
              { pubkey: t.payer, isSigner: !0, isWritable: !0 },
              { pubkey: Hr.programId, isSigner: !1, isWritable: !1 },
            ];
          return [new br({ programId: this.programId, keys: i, data: r }), e];
        }
        static freezeLookupTable(t) {
          const e = jr(es.FreezeLookupTable),
            n = [
              { pubkey: t.lookupTable, isSigner: !1, isWritable: !0 },
              { pubkey: t.authority, isSigner: !0, isWritable: !1 },
            ];
          return new br({ programId: this.programId, keys: n, data: e });
        }
        static extendLookupTable(t) {
          const e = jr(es.ExtendLookupTable, {
              addresses: t.addresses.map((t) => t.toBytes()),
            }),
            n = [
              { pubkey: t.lookupTable, isSigner: !1, isWritable: !0 },
              { pubkey: t.authority, isSigner: !0, isWritable: !1 },
            ];
          return (
            t.payer &&
              n.push(
                { pubkey: t.payer, isSigner: !0, isWritable: !0 },
                { pubkey: Hr.programId, isSigner: !1, isWritable: !1 }
              ),
            new br({ programId: this.programId, keys: n, data: e })
          );
        }
        static deactivateLookupTable(t) {
          const e = jr(es.DeactivateLookupTable),
            n = [
              { pubkey: t.lookupTable, isSigner: !1, isWritable: !0 },
              { pubkey: t.authority, isSigner: !0, isWritable: !1 },
            ];
          return new br({ programId: this.programId, keys: n, data: e });
        }
        static closeLookupTable(t) {
          const e = jr(es.CloseLookupTable),
            n = [
              { pubkey: t.lookupTable, isSigner: !1, isWritable: !0 },
              { pubkey: t.authority, isSigner: !0, isWritable: !1 },
              { pubkey: t.recipient, isSigner: !1, isWritable: !0 },
            ];
          return new br({ programId: this.programId, keys: n, data: e });
        }
      }
      rs.programId = new Gn("AddressLookupTab1e1111111111111111111111111");
      class is {
        constructor() {}
        static decodeInstructionType(t) {
          this.checkProgramId(t.programId);
          const e = ve.u8("instruction").decode(t.data);
          let n;
          for (const [r, i] of Object.entries(os))
            if (i.index == e) {
              n = r;
              break;
            }
          if (!n)
            throw new Error(
              "Instruction type incorrect; not a ComputeBudgetInstruction"
            );
          return n;
        }
        static decodeRequestUnits(t) {
          this.checkProgramId(t.programId);
          const { units: e, additionalFee: n } = Pr(os.RequestUnits, t.data);
          return { units: e, additionalFee: n };
        }
        static decodeRequestHeapFrame(t) {
          this.checkProgramId(t.programId);
          const { bytes: e } = Pr(os.RequestHeapFrame, t.data);
          return { bytes: e };
        }
        static decodeSetComputeUnitLimit(t) {
          this.checkProgramId(t.programId);
          const { units: e } = Pr(os.SetComputeUnitLimit, t.data);
          return { units: e };
        }
        static decodeSetComputeUnitPrice(t) {
          this.checkProgramId(t.programId);
          const { microLamports: e } = Pr(os.SetComputeUnitPrice, t.data);
          return { microLamports: e };
        }
        static checkProgramId(t) {
          if (!t.equals(ss.programId))
            throw new Error(
              "invalid instruction; programId is not ComputeBudgetProgram"
            );
        }
      }
      const os = Object.freeze({
        RequestUnits: {
          index: 0,
          layout: ve.n_([
            ve.u8("instruction"),
            ve.Jq("units"),
            ve.Jq("additionalFee"),
          ]),
        },
        RequestHeapFrame: {
          index: 1,
          layout: ve.n_([ve.u8("instruction"), ve.Jq("bytes")]),
        },
        SetComputeUnitLimit: {
          index: 2,
          layout: ve.n_([ve.u8("instruction"), ve.Jq("units")]),
        },
        SetComputeUnitPrice: {
          index: 3,
          layout: ve.n_([ve.u8("instruction"), Ur("microLamports")]),
        },
      });
      class ss {
        constructor() {}
        static requestUnits(t) {
          const e = jr(os.RequestUnits, t);
          return new br({ keys: [], programId: this.programId, data: e });
        }
        static requestHeapFrame(t) {
          const e = jr(os.RequestHeapFrame, t);
          return new br({ keys: [], programId: this.programId, data: e });
        }
        static setComputeUnitLimit(t) {
          const e = jr(os.SetComputeUnitLimit, t);
          return new br({ keys: [], programId: this.programId, data: e });
        }
        static setComputeUnitPrice(t) {
          const e = jr(os.SetComputeUnitPrice, {
            microLamports: BigInt(t.microLamports),
          });
          return new br({ keys: [], programId: this.programId, data: e });
        }
      }
      ss.programId = new Gn("ComputeBudget111111111111111111111111111111");
      const as = ve.n_([
        ve.u8("numSignatures"),
        ve.u8("padding"),
        ve.KB("signatureOffset"),
        ve.KB("signatureInstructionIndex"),
        ve.KB("publicKeyOffset"),
        ve.KB("publicKeyInstructionIndex"),
        ve.KB("messageDataOffset"),
        ve.KB("messageDataSize"),
        ve.KB("messageInstructionIndex"),
      ]);
      class cs {
        constructor() {}
        static createInstructionWithPublicKey(t) {
          const {
            publicKey: e,
            message: n,
            signature: r,
            instructionIndex: o,
          } = t;
          dr(
            32 === e.length,
            `Public Key must be 32 bytes but received ${e.length} bytes`
          ),
            dr(
              64 === r.length,
              `Signature must be 64 bytes but received ${r.length} bytes`
            );
          const s = as.span,
            a = s + e.length,
            c = a + r.length,
            u = i.Buffer.alloc(c + n.length),
            h = null == o ? 65535 : o;
          return (
            as.encode(
              {
                numSignatures: 1,
                padding: 0,
                signatureOffset: a,
                signatureInstructionIndex: h,
                publicKeyOffset: s,
                publicKeyInstructionIndex: h,
                messageDataOffset: c,
                messageDataSize: n.length,
                messageInstructionIndex: h,
              },
              u
            ),
            u.fill(e, s),
            u.fill(r, a),
            u.fill(n, c),
            new br({ keys: [], programId: cs.programId, data: u })
          );
        }
        static createInstructionWithPrivateKey(t) {
          const { privateKey: e, message: n, instructionIndex: r } = t;
          dr(
            64 === e.length,
            `Private key must be 64 bytes but received ${e.length} bytes`
          );
          try {
            const t = ts.fromSecretKey(e),
              i = t.publicKey.toBytes(),
              o = Dn(n, t.secretKey);
            return this.createInstructionWithPublicKey({
              publicKey: i,
              message: n,
              signature: o,
              instructionIndex: r,
            });
          } catch (i) {
            throw new Error(`Error creating instruction; ${i}`);
          }
        }
      }
      cs.programId = new Gn("Ed25519SigVerify111111111111111111111111111");
      jn.utils.isValidPrivateKey;
      const us = jn.getPublicKey,
        hs = ve.n_([
          ve.u8("numSignatures"),
          ve.KB("signatureOffset"),
          ve.u8("signatureInstructionIndex"),
          ve.KB("ethAddressOffset"),
          ve.u8("ethAddressInstructionIndex"),
          ve.KB("messageDataOffset"),
          ve.KB("messageDataSize"),
          ve.u8("messageInstructionIndex"),
          ve.Ik(20, "ethAddress"),
          ve.Ik(64, "signature"),
          ve.u8("recoveryId"),
        ]);
      class ls {
        constructor() {}
        static publicKeyToEthAddress(t) {
          dr(
            64 === t.length,
            `Public key must be 64 bytes but received ${t.length} bytes`
          );
          try {
            return i.Buffer.from(yn(Wn(t))).slice(-20);
          } catch (e) {
            throw new Error(`Error constructing Ethereum address: ${e}`);
          }
        }
        static createInstructionWithPublicKey(t) {
          const {
            publicKey: e,
            message: n,
            signature: r,
            recoveryId: i,
            instructionIndex: o,
          } = t;
          return ls.createInstructionWithEthAddress({
            ethAddress: ls.publicKeyToEthAddress(e),
            message: n,
            signature: r,
            recoveryId: i,
            instructionIndex: o,
          });
        }
        static createInstructionWithEthAddress(t) {
          const {
            ethAddress: e,
            message: n,
            signature: r,
            recoveryId: o,
            instructionIndex: s = 0,
          } = t;
          let a;
          (a =
            "string" === typeof e
              ? e.startsWith("0x")
                ? i.Buffer.from(e.substr(2), "hex")
                : i.Buffer.from(e, "hex")
              : e),
            dr(
              20 === a.length,
              `Address must be 20 bytes but received ${a.length} bytes`
            );
          const c = 12 + a.length,
            u = c + r.length + 1,
            h = i.Buffer.alloc(hs.span + n.length);
          return (
            hs.encode(
              {
                numSignatures: 1,
                signatureOffset: c,
                signatureInstructionIndex: s,
                ethAddressOffset: 12,
                ethAddressInstructionIndex: s,
                messageDataOffset: u,
                messageDataSize: n.length,
                messageInstructionIndex: s,
                signature: Wn(r),
                ethAddress: Wn(a),
                recoveryId: o,
              },
              h
            ),
            h.fill(Wn(n), hs.span),
            new br({ keys: [], programId: ls.programId, data: h })
          );
        }
        static createInstructionWithPrivateKey(t) {
          const { privateKey: e, message: n, instructionIndex: r } = t;
          dr(
            32 === e.length,
            `Private key must be 32 bytes but received ${e.length} bytes`
          );
          try {
            const t = Wn(e),
              o = us(t, !1).slice(1),
              s = i.Buffer.from(yn(Wn(n))),
              [a, c] = ((t, e) => {
                const n = jn.sign(t, e);
                return [n.toCompactRawBytes(), n.recovery];
              })(s, t);
            return this.createInstructionWithPublicKey({
              publicKey: o,
              message: n,
              signature: a,
              recoveryId: c,
              instructionIndex: r,
            });
          } catch (o) {
            throw new Error(`Error creating instruction; ${o}`);
          }
        }
      }
      var ds;
      ls.programId = new Gn("KeccakSecp256k11111111111111111111111111111");
      const fs = new Gn("StakeConfig11111111111111111111111111111111");
      class ps {
        constructor(t, e) {
          (this.staker = void 0),
            (this.withdrawer = void 0),
            (this.staker = t),
            (this.withdrawer = e);
        }
      }
      class ys {
        constructor(t, e, n) {
          (this.unixTimestamp = void 0),
            (this.epoch = void 0),
            (this.custodian = void 0),
            (this.unixTimestamp = t),
            (this.epoch = e),
            (this.custodian = n);
        }
      }
      (ds = ys), (ys.default = new ds(0, 0, Gn.default));
      class gs {
        constructor() {}
        static decodeInstructionType(t) {
          this.checkProgramId(t.programId);
          const e = ve.Jq("instruction").decode(t.data);
          let n;
          for (const [r, i] of Object.entries(ms))
            if (i.index == e) {
              n = r;
              break;
            }
          if (!n)
            throw new Error(
              "Instruction type incorrect; not a StakeInstruction"
            );
          return n;
        }
        static decodeInitialize(t) {
          this.checkProgramId(t.programId), this.checkKeyLength(t.keys, 2);
          const { authorized: e, lockup: n } = Pr(ms.Initialize, t.data);
          return {
            stakePubkey: t.keys[0].pubkey,
            authorized: new ps(new Gn(e.staker), new Gn(e.withdrawer)),
            lockup: new ys(n.unixTimestamp, n.epoch, new Gn(n.custodian)),
          };
        }
        static decodeDelegate(t) {
          return (
            this.checkProgramId(t.programId),
            this.checkKeyLength(t.keys, 6),
            Pr(ms.Delegate, t.data),
            {
              stakePubkey: t.keys[0].pubkey,
              votePubkey: t.keys[1].pubkey,
              authorizedPubkey: t.keys[5].pubkey,
            }
          );
        }
        static decodeAuthorize(t) {
          this.checkProgramId(t.programId), this.checkKeyLength(t.keys, 3);
          const { newAuthorized: e, stakeAuthorizationType: n } = Pr(
              ms.Authorize,
              t.data
            ),
            r = {
              stakePubkey: t.keys[0].pubkey,
              authorizedPubkey: t.keys[2].pubkey,
              newAuthorizedPubkey: new Gn(e),
              stakeAuthorizationType: { index: n },
            };
          return t.keys.length > 3 && (r.custodianPubkey = t.keys[3].pubkey), r;
        }
        static decodeAuthorizeWithSeed(t) {
          this.checkProgramId(t.programId), this.checkKeyLength(t.keys, 2);
          const {
              newAuthorized: e,
              stakeAuthorizationType: n,
              authoritySeed: r,
              authorityOwner: i,
            } = Pr(ms.AuthorizeWithSeed, t.data),
            o = {
              stakePubkey: t.keys[0].pubkey,
              authorityBase: t.keys[1].pubkey,
              authoritySeed: r,
              authorityOwner: new Gn(i),
              newAuthorizedPubkey: new Gn(e),
              stakeAuthorizationType: { index: n },
            };
          return t.keys.length > 3 && (o.custodianPubkey = t.keys[3].pubkey), o;
        }
        static decodeSplit(t) {
          this.checkProgramId(t.programId), this.checkKeyLength(t.keys, 3);
          const { lamports: e } = Pr(ms.Split, t.data);
          return {
            stakePubkey: t.keys[0].pubkey,
            splitStakePubkey: t.keys[1].pubkey,
            authorizedPubkey: t.keys[2].pubkey,
            lamports: e,
          };
        }
        static decodeMerge(t) {
          return (
            this.checkProgramId(t.programId),
            this.checkKeyLength(t.keys, 3),
            Pr(ms.Merge, t.data),
            {
              stakePubkey: t.keys[0].pubkey,
              sourceStakePubKey: t.keys[1].pubkey,
              authorizedPubkey: t.keys[4].pubkey,
            }
          );
        }
        static decodeWithdraw(t) {
          this.checkProgramId(t.programId), this.checkKeyLength(t.keys, 5);
          const { lamports: e } = Pr(ms.Withdraw, t.data),
            n = {
              stakePubkey: t.keys[0].pubkey,
              toPubkey: t.keys[1].pubkey,
              authorizedPubkey: t.keys[4].pubkey,
              lamports: e,
            };
          return t.keys.length > 5 && (n.custodianPubkey = t.keys[5].pubkey), n;
        }
        static decodeDeactivate(t) {
          return (
            this.checkProgramId(t.programId),
            this.checkKeyLength(t.keys, 3),
            Pr(ms.Deactivate, t.data),
            {
              stakePubkey: t.keys[0].pubkey,
              authorizedPubkey: t.keys[2].pubkey,
            }
          );
        }
        static checkProgramId(t) {
          if (!t.equals(bs.programId))
            throw new Error(
              "invalid instruction; programId is not StakeProgram"
            );
        }
        static checkKeyLength(t, e) {
          if (t.length < e)
            throw new Error(
              `invalid instruction; found ${t.length} keys, expected at least ${e}`
            );
        }
      }
      const ms = Object.freeze({
          Initialize: {
            index: 0,
            layout: ve.n_([
              ve.Jq("instruction"),
              ((t = "authorized") =>
                ve.n_([sr("staker"), sr("withdrawer")], t))(),
              ((t = "lockup") =>
                ve.n_(
                  [ve.gM("unixTimestamp"), ve.gM("epoch"), sr("custodian")],
                  t
                ))(),
            ]),
          },
          Authorize: {
            index: 1,
            layout: ve.n_([
              ve.Jq("instruction"),
              sr("newAuthorized"),
              ve.Jq("stakeAuthorizationType"),
            ]),
          },
          Delegate: { index: 2, layout: ve.n_([ve.Jq("instruction")]) },
          Split: {
            index: 3,
            layout: ve.n_([ve.Jq("instruction"), ve.gM("lamports")]),
          },
          Withdraw: {
            index: 4,
            layout: ve.n_([ve.Jq("instruction"), ve.gM("lamports")]),
          },
          Deactivate: { index: 5, layout: ve.n_([ve.Jq("instruction")]) },
          Merge: { index: 7, layout: ve.n_([ve.Jq("instruction")]) },
          AuthorizeWithSeed: {
            index: 8,
            layout: ve.n_([
              ve.Jq("instruction"),
              sr("newAuthorized"),
              ve.Jq("stakeAuthorizationType"),
              cr("authoritySeed"),
              sr("authorityOwner"),
            ]),
          },
        }),
        ws = Object.freeze({ Staker: { index: 0 }, Withdrawer: { index: 1 } });
      class bs {
        constructor() {}
        static initialize(t) {
          const { stakePubkey: e, authorized: n, lockup: r } = t,
            i = r || ys.default,
            o = jr(ms.Initialize, {
              authorized: {
                staker: Wn(n.staker.toBuffer()),
                withdrawer: Wn(n.withdrawer.toBuffer()),
              },
              lockup: {
                unixTimestamp: i.unixTimestamp,
                epoch: i.epoch,
                custodian: Wn(i.custodian.toBuffer()),
              },
            }),
            s = {
              keys: [
                { pubkey: e, isSigner: !1, isWritable: !0 },
                { pubkey: Ar, isSigner: !1, isWritable: !1 },
              ],
              programId: this.programId,
              data: o,
            };
          return new br(s);
        }
        static createAccountWithSeed(t) {
          const e = new vr();
          e.add(
            Hr.createAccountWithSeed({
              fromPubkey: t.fromPubkey,
              newAccountPubkey: t.stakePubkey,
              basePubkey: t.basePubkey,
              seed: t.seed,
              lamports: t.lamports,
              space: this.space,
              programId: this.programId,
            })
          );
          const { stakePubkey: n, authorized: r, lockup: i } = t;
          return e.add(
            this.initialize({ stakePubkey: n, authorized: r, lockup: i })
          );
        }
        static createAccount(t) {
          const e = new vr();
          e.add(
            Hr.createAccount({
              fromPubkey: t.fromPubkey,
              newAccountPubkey: t.stakePubkey,
              lamports: t.lamports,
              space: this.space,
              programId: this.programId,
            })
          );
          const { stakePubkey: n, authorized: r, lockup: i } = t;
          return e.add(
            this.initialize({ stakePubkey: n, authorized: r, lockup: i })
          );
        }
        static delegate(t) {
          const { stakePubkey: e, authorizedPubkey: n, votePubkey: r } = t,
            i = jr(ms.Delegate);
          return new vr().add({
            keys: [
              { pubkey: e, isSigner: !1, isWritable: !0 },
              { pubkey: r, isSigner: !1, isWritable: !1 },
              { pubkey: Mr, isSigner: !1, isWritable: !1 },
              { pubkey: Nr, isSigner: !1, isWritable: !1 },
              { pubkey: fs, isSigner: !1, isWritable: !1 },
              { pubkey: n, isSigner: !0, isWritable: !1 },
            ],
            programId: this.programId,
            data: i,
          });
        }
        static authorize(t) {
          const {
              stakePubkey: e,
              authorizedPubkey: n,
              newAuthorizedPubkey: r,
              stakeAuthorizationType: i,
              custodianPubkey: o,
            } = t,
            s = jr(ms.Authorize, {
              newAuthorized: Wn(r.toBuffer()),
              stakeAuthorizationType: i.index,
            }),
            a = [
              { pubkey: e, isSigner: !1, isWritable: !0 },
              { pubkey: Mr, isSigner: !1, isWritable: !0 },
              { pubkey: n, isSigner: !0, isWritable: !1 },
            ];
          return (
            o && a.push({ pubkey: o, isSigner: !0, isWritable: !1 }),
            new vr().add({ keys: a, programId: this.programId, data: s })
          );
        }
        static authorizeWithSeed(t) {
          const {
              stakePubkey: e,
              authorityBase: n,
              authoritySeed: r,
              authorityOwner: i,
              newAuthorizedPubkey: o,
              stakeAuthorizationType: s,
              custodianPubkey: a,
            } = t,
            c = jr(ms.AuthorizeWithSeed, {
              newAuthorized: Wn(o.toBuffer()),
              stakeAuthorizationType: s.index,
              authoritySeed: r,
              authorityOwner: Wn(i.toBuffer()),
            }),
            u = [
              { pubkey: e, isSigner: !1, isWritable: !0 },
              { pubkey: n, isSigner: !0, isWritable: !1 },
              { pubkey: Mr, isSigner: !1, isWritable: !1 },
            ];
          return (
            a && u.push({ pubkey: a, isSigner: !0, isWritable: !1 }),
            new vr().add({ keys: u, programId: this.programId, data: c })
          );
        }
        static splitInstruction(t) {
          const {
              stakePubkey: e,
              authorizedPubkey: n,
              splitStakePubkey: r,
              lamports: i,
            } = t,
            o = jr(ms.Split, { lamports: i });
          return new br({
            keys: [
              { pubkey: e, isSigner: !1, isWritable: !0 },
              { pubkey: r, isSigner: !1, isWritable: !0 },
              { pubkey: n, isSigner: !0, isWritable: !1 },
            ],
            programId: this.programId,
            data: o,
          });
        }
        static split(t, e) {
          const n = new vr();
          return (
            n.add(
              Hr.createAccount({
                fromPubkey: t.authorizedPubkey,
                newAccountPubkey: t.splitStakePubkey,
                lamports: e,
                space: this.space,
                programId: this.programId,
              })
            ),
            n.add(this.splitInstruction(t))
          );
        }
        static splitWithSeed(t, e) {
          const {
              stakePubkey: n,
              authorizedPubkey: r,
              splitStakePubkey: i,
              basePubkey: o,
              seed: s,
              lamports: a,
            } = t,
            c = new vr();
          return (
            c.add(
              Hr.allocate({
                accountPubkey: i,
                basePubkey: o,
                seed: s,
                space: this.space,
                programId: this.programId,
              })
            ),
            e &&
              e > 0 &&
              c.add(
                Hr.transfer({
                  fromPubkey: t.authorizedPubkey,
                  toPubkey: i,
                  lamports: e,
                })
              ),
            c.add(
              this.splitInstruction({
                stakePubkey: n,
                authorizedPubkey: r,
                splitStakePubkey: i,
                lamports: a,
              })
            )
          );
        }
        static merge(t) {
          const {
              stakePubkey: e,
              sourceStakePubKey: n,
              authorizedPubkey: r,
            } = t,
            i = jr(ms.Merge);
          return new vr().add({
            keys: [
              { pubkey: e, isSigner: !1, isWritable: !0 },
              { pubkey: n, isSigner: !1, isWritable: !0 },
              { pubkey: Mr, isSigner: !1, isWritable: !1 },
              { pubkey: Nr, isSigner: !1, isWritable: !1 },
              { pubkey: r, isSigner: !0, isWritable: !1 },
            ],
            programId: this.programId,
            data: i,
          });
        }
        static withdraw(t) {
          const {
              stakePubkey: e,
              authorizedPubkey: n,
              toPubkey: r,
              lamports: i,
              custodianPubkey: o,
            } = t,
            s = jr(ms.Withdraw, { lamports: i }),
            a = [
              { pubkey: e, isSigner: !1, isWritable: !0 },
              { pubkey: r, isSigner: !1, isWritable: !0 },
              { pubkey: Mr, isSigner: !1, isWritable: !1 },
              { pubkey: Nr, isSigner: !1, isWritable: !1 },
              { pubkey: n, isSigner: !0, isWritable: !1 },
            ];
          return (
            o && a.push({ pubkey: o, isSigner: !0, isWritable: !1 }),
            new vr().add({ keys: a, programId: this.programId, data: s })
          );
        }
        static deactivate(t) {
          const { stakePubkey: e, authorizedPubkey: n } = t,
            r = jr(ms.Deactivate);
          return new vr().add({
            keys: [
              { pubkey: e, isSigner: !1, isWritable: !0 },
              { pubkey: Mr, isSigner: !1, isWritable: !1 },
              { pubkey: n, isSigner: !0, isWritable: !1 },
            ],
            programId: this.programId,
            data: r,
          });
        }
      }
      (bs.programId = new Gn("Stake11111111111111111111111111111111111111")),
        (bs.space = 200);
      class vs {
        constructor(t, e, n, r) {
          (this.nodePubkey = void 0),
            (this.authorizedVoter = void 0),
            (this.authorizedWithdrawer = void 0),
            (this.commission = void 0),
            (this.nodePubkey = t),
            (this.authorizedVoter = e),
            (this.authorizedWithdrawer = n),
            (this.commission = r);
        }
      }
      class ks {
        constructor() {}
        static decodeInstructionType(t) {
          this.checkProgramId(t.programId);
          const e = ve.Jq("instruction").decode(t.data);
          let n;
          for (const [r, i] of Object.entries(Ss))
            if (i.index == e) {
              n = r;
              break;
            }
          if (!n)
            throw new Error(
              "Instruction type incorrect; not a VoteInstruction"
            );
          return n;
        }
        static decodeInitializeAccount(t) {
          this.checkProgramId(t.programId), this.checkKeyLength(t.keys, 4);
          const { voteInit: e } = Pr(Ss.InitializeAccount, t.data);
          return {
            votePubkey: t.keys[0].pubkey,
            nodePubkey: t.keys[3].pubkey,
            voteInit: new vs(
              new Gn(e.nodePubkey),
              new Gn(e.authorizedVoter),
              new Gn(e.authorizedWithdrawer),
              e.commission
            ),
          };
        }
        static decodeAuthorize(t) {
          this.checkProgramId(t.programId), this.checkKeyLength(t.keys, 3);
          const { newAuthorized: e, voteAuthorizationType: n } = Pr(
            Ss.Authorize,
            t.data
          );
          return {
            votePubkey: t.keys[0].pubkey,
            authorizedPubkey: t.keys[2].pubkey,
            newAuthorizedPubkey: new Gn(e),
            voteAuthorizationType: { index: n },
          };
        }
        static decodeAuthorizeWithSeed(t) {
          this.checkProgramId(t.programId), this.checkKeyLength(t.keys, 3);
          const {
            voteAuthorizeWithSeedArgs: {
              currentAuthorityDerivedKeyOwnerPubkey: e,
              currentAuthorityDerivedKeySeed: n,
              newAuthorized: r,
              voteAuthorizationType: i,
            },
          } = Pr(Ss.AuthorizeWithSeed, t.data);
          return {
            currentAuthorityDerivedKeyBasePubkey: t.keys[2].pubkey,
            currentAuthorityDerivedKeyOwnerPubkey: new Gn(e),
            currentAuthorityDerivedKeySeed: n,
            newAuthorizedPubkey: new Gn(r),
            voteAuthorizationType: { index: i },
            votePubkey: t.keys[0].pubkey,
          };
        }
        static decodeWithdraw(t) {
          this.checkProgramId(t.programId), this.checkKeyLength(t.keys, 3);
          const { lamports: e } = Pr(Ss.Withdraw, t.data);
          return {
            votePubkey: t.keys[0].pubkey,
            authorizedWithdrawerPubkey: t.keys[2].pubkey,
            lamports: e,
            toPubkey: t.keys[1].pubkey,
          };
        }
        static checkProgramId(t) {
          if (!t.equals(Is.programId))
            throw new Error(
              "invalid instruction; programId is not VoteProgram"
            );
        }
        static checkKeyLength(t, e) {
          if (t.length < e)
            throw new Error(
              `invalid instruction; found ${t.length} keys, expected at least ${e}`
            );
        }
      }
      const Ss = Object.freeze({
          InitializeAccount: {
            index: 0,
            layout: ve.n_([
              ve.Jq("instruction"),
              ((t = "voteInit") =>
                ve.n_(
                  [
                    sr("nodePubkey"),
                    sr("authorizedVoter"),
                    sr("authorizedWithdrawer"),
                    ve.u8("commission"),
                  ],
                  t
                ))(),
            ]),
          },
          Authorize: {
            index: 1,
            layout: ve.n_([
              ve.Jq("instruction"),
              sr("newAuthorized"),
              ve.Jq("voteAuthorizationType"),
            ]),
          },
          Withdraw: {
            index: 3,
            layout: ve.n_([ve.Jq("instruction"), ve.gM("lamports")]),
          },
          UpdateValidatorIdentity: {
            index: 4,
            layout: ve.n_([ve.Jq("instruction")]),
          },
          AuthorizeWithSeed: {
            index: 10,
            layout: ve.n_([
              ve.Jq("instruction"),
              ((t = "voteAuthorizeWithSeedArgs") =>
                ve.n_(
                  [
                    ve.Jq("voteAuthorizationType"),
                    sr("currentAuthorityDerivedKeyOwnerPubkey"),
                    cr("currentAuthorityDerivedKeySeed"),
                    sr("newAuthorized"),
                  ],
                  t
                ))(),
            ]),
          },
        }),
        Ms = Object.freeze({ Voter: { index: 0 }, Withdrawer: { index: 1 } });
      class Is {
        constructor() {}
        static initializeAccount(t) {
          const { votePubkey: e, nodePubkey: n, voteInit: r } = t,
            i = jr(Ss.InitializeAccount, {
              voteInit: {
                nodePubkey: Wn(r.nodePubkey.toBuffer()),
                authorizedVoter: Wn(r.authorizedVoter.toBuffer()),
                authorizedWithdrawer: Wn(r.authorizedWithdrawer.toBuffer()),
                commission: r.commission,
              },
            }),
            o = {
              keys: [
                { pubkey: e, isSigner: !1, isWritable: !0 },
                { pubkey: Ar, isSigner: !1, isWritable: !1 },
                { pubkey: Mr, isSigner: !1, isWritable: !1 },
                { pubkey: n, isSigner: !0, isWritable: !1 },
              ],
              programId: this.programId,
              data: i,
            };
          return new br(o);
        }
        static createAccount(t) {
          const e = new vr();
          return (
            e.add(
              Hr.createAccount({
                fromPubkey: t.fromPubkey,
                newAccountPubkey: t.votePubkey,
                lamports: t.lamports,
                space: this.space,
                programId: this.programId,
              })
            ),
            e.add(
              this.initializeAccount({
                votePubkey: t.votePubkey,
                nodePubkey: t.voteInit.nodePubkey,
                voteInit: t.voteInit,
              })
            )
          );
        }
        static authorize(t) {
          const {
              votePubkey: e,
              authorizedPubkey: n,
              newAuthorizedPubkey: r,
              voteAuthorizationType: i,
            } = t,
            o = jr(Ss.Authorize, {
              newAuthorized: Wn(r.toBuffer()),
              voteAuthorizationType: i.index,
            }),
            s = [
              { pubkey: e, isSigner: !1, isWritable: !0 },
              { pubkey: Mr, isSigner: !1, isWritable: !1 },
              { pubkey: n, isSigner: !0, isWritable: !1 },
            ];
          return new vr().add({ keys: s, programId: this.programId, data: o });
        }
        static authorizeWithSeed(t) {
          const {
              currentAuthorityDerivedKeyBasePubkey: e,
              currentAuthorityDerivedKeyOwnerPubkey: n,
              currentAuthorityDerivedKeySeed: r,
              newAuthorizedPubkey: i,
              voteAuthorizationType: o,
              votePubkey: s,
            } = t,
            a = jr(Ss.AuthorizeWithSeed, {
              voteAuthorizeWithSeedArgs: {
                currentAuthorityDerivedKeyOwnerPubkey: Wn(n.toBuffer()),
                currentAuthorityDerivedKeySeed: r,
                newAuthorized: Wn(i.toBuffer()),
                voteAuthorizationType: o.index,
              },
            }),
            c = [
              { pubkey: s, isSigner: !1, isWritable: !0 },
              { pubkey: Mr, isSigner: !1, isWritable: !1 },
              { pubkey: e, isSigner: !0, isWritable: !1 },
            ];
          return new vr().add({ keys: c, programId: this.programId, data: a });
        }
        static withdraw(t) {
          const {
              votePubkey: e,
              authorizedWithdrawerPubkey: n,
              lamports: r,
              toPubkey: i,
            } = t,
            o = jr(Ss.Withdraw, { lamports: r }),
            s = [
              { pubkey: e, isSigner: !1, isWritable: !0 },
              { pubkey: i, isSigner: !1, isWritable: !0 },
              { pubkey: n, isSigner: !0, isWritable: !1 },
            ];
          return new vr().add({ keys: s, programId: this.programId, data: o });
        }
        static safeWithdraw(t, e, n) {
          if (t.lamports > e - n)
            throw new Error(
              "Withdraw will leave vote account with insufficient funds."
            );
          return Is.withdraw(t);
        }
        static updateValidatorIdentity(t) {
          const {
              votePubkey: e,
              authorizedWithdrawerPubkey: n,
              nodePubkey: r,
            } = t,
            i = jr(Ss.UpdateValidatorIdentity),
            o = [
              { pubkey: e, isSigner: !1, isWritable: !0 },
              { pubkey: r, isSigner: !0, isWritable: !1 },
              { pubkey: n, isSigner: !0, isWritable: !1 },
            ];
          return new vr().add({ keys: o, programId: this.programId, data: i });
        }
      }
      (Is.programId = new Gn("Vote111111111111111111111111111111111111111")),
        (Is.space = 3762);
      const Es = new Gn("Va1idator1nfo111111111111111111111111111111"),
        _s = Fe({
          name: qe(),
          website: We(qe()),
          details: We(qe()),
          keybaseUsername: We(qe()),
        });
      class As {
        constructor(t, e) {
          (this.key = void 0),
            (this.info = void 0),
            (this.key = t),
            (this.info = e);
        }
        static fromConfigData(t) {
          let e = [...t];
          if (2 !== hr(e)) return null;
          const n = [];
          for (let r = 0; r < 2; r++) {
            const t = new Gn(e.splice(0, $n)),
              r = 1 === e.splice(0, 1)[0];
            n.push({ publicKey: t, isSigner: r });
          }
          if (n[0].publicKey.equals(Es) && n[1].isSigner) {
            const t = cr().decode(i.Buffer.from(e)),
              r = JSON.parse(t);
            return Le(r, _s), new As(n[1].publicKey, r);
          }
          return null;
        }
      }
      const xs = new Gn("Vote111111111111111111111111111111111111111"),
        Ls = ve.n_([
          sr("nodePubkey"),
          sr("authorizedWithdrawer"),
          ve.u8("commission"),
          ve._O(),
          ve.A9(
            ve.n_([ve._O("slot"), ve.Jq("confirmationCount")]),
            ve.cv(ve.Jq(), -8),
            "votes"
          ),
          ve.u8("rootSlotValid"),
          ve._O("rootSlot"),
          ve._O(),
          ve.A9(
            ve.n_([ve._O("epoch"), sr("authorizedVoter")]),
            ve.cv(ve.Jq(), -8),
            "authorizedVoters"
          ),
          ve.n_(
            [
              ve.A9(
                ve.n_([
                  sr("authorizedPubkey"),
                  ve._O("epochOfLastAuthorizedSwitch"),
                  ve._O("targetEpoch"),
                ]),
                32,
                "buf"
              ),
              ve._O("idx"),
              ve.u8("isEmpty"),
            ],
            "priorVoters"
          ),
          ve._O(),
          ve.A9(
            ve.n_([ve._O("epoch"), ve._O("credits"), ve._O("prevCredits")]),
            ve.cv(ve.Jq(), -8),
            "epochCredits"
          ),
          ve.n_([ve._O("slot"), ve._O("timestamp")], "lastTimestamp"),
        ]);
      class Ts {
        constructor(t) {
          (this.nodePubkey = void 0),
            (this.authorizedWithdrawer = void 0),
            (this.commission = void 0),
            (this.rootSlot = void 0),
            (this.votes = void 0),
            (this.authorizedVoters = void 0),
            (this.priorVoters = void 0),
            (this.epochCredits = void 0),
            (this.lastTimestamp = void 0),
            (this.nodePubkey = t.nodePubkey),
            (this.authorizedWithdrawer = t.authorizedWithdrawer),
            (this.commission = t.commission),
            (this.rootSlot = t.rootSlot),
            (this.votes = t.votes),
            (this.authorizedVoters = t.authorizedVoters),
            (this.priorVoters = t.priorVoters),
            (this.epochCredits = t.epochCredits),
            (this.lastTimestamp = t.lastTimestamp);
        }
        static fromAccountData(t) {
          const e = Ls.decode(Wn(t), 4);
          let n = e.rootSlot;
          return (
            e.rootSlotValid || (n = null),
            new Ts({
              nodePubkey: new Gn(e.nodePubkey),
              authorizedWithdrawer: new Gn(e.authorizedWithdrawer),
              commission: e.commission,
              votes: e.votes,
              rootSlot: n,
              authorizedVoters: e.authorizedVoters.map(Ns),
              priorVoters: Bs(e.priorVoters),
              epochCredits: e.epochCredits,
              lastTimestamp: e.lastTimestamp,
            })
          );
        }
      }
      function Ns({ authorizedVoter: t, epoch: e }) {
        return { epoch: e, authorizedVoter: new Gn(t) };
      }
      function Os({
        authorizedPubkey: t,
        epochOfLastAuthorizedSwitch: e,
        targetEpoch: n,
      }) {
        return {
          authorizedPubkey: new Gn(t),
          epochOfLastAuthorizedSwitch: e,
          targetEpoch: n,
        };
      }
      function Bs({ buf: t, idx: e, isEmpty: n }) {
        return n ? [] : [...t.slice(e + 1).map(Os), ...t.slice(0, e).map(Os)];
      }
      const js = {
        http: {
          devnet: "http://api.devnet.solana.com",
          testnet: "http://api.testnet.solana.com",
          "mainnet-beta": "http://api.mainnet-beta.solana.com/",
        },
        https: {
          devnet: "https://api.devnet.solana.com",
          testnet: "https://api.testnet.solana.com",
          "mainnet-beta": "https://api.mainnet-beta.solana.com/",
        },
      };
      function Ps(t, e) {
        const n = !1 === e ? "http" : "https";
        if (!t) return js[n].devnet;
        const r = js[n][t];
        if (!r) throw new Error(`Unknown ${n} cluster: ${t}`);
        return r;
      }
      async function Cs(t, e, n, r) {
        let i, o;
        (n &&
          Object.prototype.hasOwnProperty.call(n, "lastValidBlockHeight")) ||
        (n && Object.prototype.hasOwnProperty.call(n, "nonceValue"))
          ? ((i = n), (o = r))
          : (o = n);
        const s = o && {
            skipPreflight: o.skipPreflight,
            preflightCommitment: o.preflightCommitment || o.commitment,
            minContextSlot: o.minContextSlot,
          },
          a = await t.sendRawTransaction(e, s),
          c = o && o.commitment,
          u = i ? t.confirmTransaction(i, c) : t.confirmTransaction(a, c),
          h = (await u).value;
        if (h.err)
          throw new Error(`Raw transaction ${a} failed (${JSON.stringify(h)})`);
        return a;
      }
      const Rs = 1e9;
    },
    8162: function (t, e, n) {
      "use strict";
      var r = n(9509).Buffer;
      t.exports = function (t) {
        if (t.length >= 255) throw new TypeError("Alphabet too long");
        for (var e = new Uint8Array(256), n = 0; n < e.length; n++) e[n] = 255;
        for (var i = 0; i < t.length; i++) {
          var o = t.charAt(i),
            s = o.charCodeAt(0);
          if (255 !== e[s]) throw new TypeError(o + " is ambiguous");
          e[s] = i;
        }
        var a = t.length,
          c = t.charAt(0),
          u = Math.log(a) / Math.log(256),
          h = Math.log(256) / Math.log(a);
        function l(t) {
          if ("string" !== typeof t) throw new TypeError("Expected String");
          if (0 === t.length) return r.alloc(0);
          for (var n = 0, i = 0, o = 0; t[n] === c; ) i++, n++;
          for (
            var s = ((t.length - n) * u + 1) >>> 0, h = new Uint8Array(s);
            t[n];

          ) {
            var l = e[t.charCodeAt(n)];
            if (255 === l) return;
            for (var d = 0, f = s - 1; (0 !== l || d < o) && -1 !== f; f--, d++)
              (l += (a * h[f]) >>> 0),
                (h[f] = l % 256 >>> 0),
                (l = (l / 256) >>> 0);
            if (0 !== l) throw new Error("Non-zero carry");
            (o = d), n++;
          }
          for (var p = s - o; p !== s && 0 === h[p]; ) p++;
          var y = r.allocUnsafe(i + (s - p));
          y.fill(0, 0, i);
          for (var g = i; p !== s; ) y[g++] = h[p++];
          return y;
        }
        return {
          encode: function (e) {
            if (
              ((Array.isArray(e) || e instanceof Uint8Array) && (e = r.from(e)),
              !r.isBuffer(e))
            )
              throw new TypeError("Expected Buffer");
            if (0 === e.length) return "";
            for (var n = 0, i = 0, o = 0, s = e.length; o !== s && 0 === e[o]; )
              o++, n++;
            for (
              var u = ((s - o) * h + 1) >>> 0, l = new Uint8Array(u);
              o !== s;

            ) {
              for (
                var d = e[o], f = 0, p = u - 1;
                (0 !== d || f < i) && -1 !== p;
                p--, f++
              )
                (d += (256 * l[p]) >>> 0),
                  (l[p] = d % a >>> 0),
                  (d = (d / a) >>> 0);
              if (0 !== d) throw new Error("Non-zero carry");
              (i = f), o++;
            }
            for (var y = u - i; y !== u && 0 === l[y]; ) y++;
            for (var g = c.repeat(n); y < u; ++y) g += t.charAt(l[y]);
            return g;
          },
          decodeUnsafe: l,
          decode: function (t) {
            var e = l(t);
            if (e) return e;
            throw new Error("Non-base" + a + " character");
          },
        };
      };
    },
    9742: function (t, e) {
      "use strict";
      (e.byteLength = function (t) {
        var e = c(t),
          n = e[0],
          r = e[1];
        return (3 * (n + r)) / 4 - r;
      }),
        (e.toByteArray = function (t) {
          var e,
            n,
            o = c(t),
            s = o[0],
            a = o[1],
            u = new i(
              (function (t, e, n) {
                return (3 * (e + n)) / 4 - n;
              })(0, s, a)
            ),
            h = 0,
            l = a > 0 ? s - 4 : s;
          for (n = 0; n < l; n += 4)
            (e =
              (r[t.charCodeAt(n)] << 18) |
              (r[t.charCodeAt(n + 1)] << 12) |
              (r[t.charCodeAt(n + 2)] << 6) |
              r[t.charCodeAt(n + 3)]),
              (u[h++] = (e >> 16) & 255),
              (u[h++] = (e >> 8) & 255),
              (u[h++] = 255 & e);
          2 === a &&
            ((e = (r[t.charCodeAt(n)] << 2) | (r[t.charCodeAt(n + 1)] >> 4)),
            (u[h++] = 255 & e));
          1 === a &&
            ((e =
              (r[t.charCodeAt(n)] << 10) |
              (r[t.charCodeAt(n + 1)] << 4) |
              (r[t.charCodeAt(n + 2)] >> 2)),
            (u[h++] = (e >> 8) & 255),
            (u[h++] = 255 & e));
          return u;
        }),
        (e.fromByteArray = function (t) {
          for (
            var e, r = t.length, i = r % 3, o = [], s = 16383, a = 0, c = r - i;
            a < c;
            a += s
          )
            o.push(u(t, a, a + s > c ? c : a + s));
          1 === i
            ? ((e = t[r - 1]), o.push(n[e >> 2] + n[(e << 4) & 63] + "=="))
            : 2 === i &&
              ((e = (t[r - 2] << 8) + t[r - 1]),
              o.push(n[e >> 10] + n[(e >> 4) & 63] + n[(e << 2) & 63] + "="));
          return o.join("");
        });
      for (
        var n = [],
          r = [],
          i = "undefined" !== typeof Uint8Array ? Uint8Array : Array,
          o =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
          s = 0,
          a = o.length;
        s < a;
        ++s
      )
        (n[s] = o[s]), (r[o.charCodeAt(s)] = s);
      function c(t) {
        var e = t.length;
        if (e % 4 > 0)
          throw new Error("Invalid string. Length must be a multiple of 4");
        var n = t.indexOf("=");
        return -1 === n && (n = e), [n, n === e ? 0 : 4 - (n % 4)];
      }
      function u(t, e, r) {
        for (var i, o, s = [], a = e; a < r; a += 3)
          (i =
            ((t[a] << 16) & 16711680) +
            ((t[a + 1] << 8) & 65280) +
            (255 & t[a + 2])),
            s.push(
              n[((o = i) >> 18) & 63] +
                n[(o >> 12) & 63] +
                n[(o >> 6) & 63] +
                n[63 & o]
            );
        return s.join("");
      }
      (r["-".charCodeAt(0)] = 62), (r["_".charCodeAt(0)] = 63);
    },
    475: function (t, e, n) {
      "use strict";
      var r = n(8764).Buffer;
      (e.oU = function (t) {
        {
          const e = r.from(t);
          e.reverse();
          const n = e.toString("hex");
          return 0 === n.length ? BigInt(0) : BigInt(`0x${n}`);
        }
      }),
        (e.Q5 = function (t) {
          {
            const e = t.toString("hex");
            return 0 === e.length ? BigInt(0) : BigInt(`0x${e}`);
          }
        }),
        (e.k$ = function (t, e) {
          {
            const n = t.toString(16),
              i = r.from(n.padStart(2 * e, "0").slice(0, 2 * e), "hex");
            return i.reverse(), i;
          }
        }),
        (e.zP = function (t, e) {
          {
            const n = t.toString(16);
            return r.from(n.padStart(2 * e, "0").slice(0, 2 * e), "hex");
          }
        });
    },
    3550: function (t, e, n) {
      !(function (t, e) {
        "use strict";
        function r(t, e) {
          if (!t) throw new Error(e || "Assertion failed");
        }
        function i(t, e) {
          t.super_ = e;
          var n = function () {};
          (n.prototype = e.prototype),
            (t.prototype = new n()),
            (t.prototype.constructor = t);
        }
        function o(t, e, n) {
          if (o.isBN(t)) return t;
          (this.negative = 0),
            (this.words = null),
            (this.length = 0),
            (this.red = null),
            null !== t &&
              (("le" !== e && "be" !== e) || ((n = e), (e = 10)),
              this._init(t || 0, e || 10, n || "be"));
        }
        var s;
        "object" === typeof t ? (t.exports = o) : (e.BN = o),
          (o.BN = o),
          (o.wordSize = 26);
        try {
          s =
            "undefined" !== typeof window &&
            "undefined" !== typeof window.Buffer
              ? window.Buffer
              : n(6601).Buffer;
        } catch (x) {}
        function a(t, e) {
          var n = t.charCodeAt(e);
          return n >= 48 && n <= 57
            ? n - 48
            : n >= 65 && n <= 70
            ? n - 55
            : n >= 97 && n <= 102
            ? n - 87
            : void r(!1, "Invalid character in " + t);
        }
        function c(t, e, n) {
          var r = a(t, n);
          return n - 1 >= e && (r |= a(t, n - 1) << 4), r;
        }
        function u(t, e, n, i) {
          for (var o = 0, s = 0, a = Math.min(t.length, n), c = e; c < a; c++) {
            var u = t.charCodeAt(c) - 48;
            (o *= i),
              (s = u >= 49 ? u - 49 + 10 : u >= 17 ? u - 17 + 10 : u),
              r(u >= 0 && s < i, "Invalid character"),
              (o += s);
          }
          return o;
        }
        function h(t, e) {
          (t.words = e.words),
            (t.length = e.length),
            (t.negative = e.negative),
            (t.red = e.red);
        }
        if (
          ((o.isBN = function (t) {
            return (
              t instanceof o ||
              (null !== t &&
                "object" === typeof t &&
                t.constructor.wordSize === o.wordSize &&
                Array.isArray(t.words))
            );
          }),
          (o.max = function (t, e) {
            return t.cmp(e) > 0 ? t : e;
          }),
          (o.min = function (t, e) {
            return t.cmp(e) < 0 ? t : e;
          }),
          (o.prototype._init = function (t, e, n) {
            if ("number" === typeof t) return this._initNumber(t, e, n);
            if ("object" === typeof t) return this._initArray(t, e, n);
            "hex" === e && (e = 16), r(e === (0 | e) && e >= 2 && e <= 36);
            var i = 0;
            "-" === (t = t.toString().replace(/\s+/g, ""))[0] &&
              (i++, (this.negative = 1)),
              i < t.length &&
                (16 === e
                  ? this._parseHex(t, i, n)
                  : (this._parseBase(t, e, i),
                    "le" === n && this._initArray(this.toArray(), e, n)));
          }),
          (o.prototype._initNumber = function (t, e, n) {
            t < 0 && ((this.negative = 1), (t = -t)),
              t < 67108864
                ? ((this.words = [67108863 & t]), (this.length = 1))
                : t < 4503599627370496
                ? ((this.words = [67108863 & t, (t / 67108864) & 67108863]),
                  (this.length = 2))
                : (r(t < 9007199254740992),
                  (this.words = [67108863 & t, (t / 67108864) & 67108863, 1]),
                  (this.length = 3)),
              "le" === n && this._initArray(this.toArray(), e, n);
          }),
          (o.prototype._initArray = function (t, e, n) {
            if ((r("number" === typeof t.length), t.length <= 0))
              return (this.words = [0]), (this.length = 1), this;
            (this.length = Math.ceil(t.length / 3)),
              (this.words = new Array(this.length));
            for (var i = 0; i < this.length; i++) this.words[i] = 0;
            var o,
              s,
              a = 0;
            if ("be" === n)
              for (i = t.length - 1, o = 0; i >= 0; i -= 3)
                (s = t[i] | (t[i - 1] << 8) | (t[i - 2] << 16)),
                  (this.words[o] |= (s << a) & 67108863),
                  (this.words[o + 1] = (s >>> (26 - a)) & 67108863),
                  (a += 24) >= 26 && ((a -= 26), o++);
            else if ("le" === n)
              for (i = 0, o = 0; i < t.length; i += 3)
                (s = t[i] | (t[i + 1] << 8) | (t[i + 2] << 16)),
                  (this.words[o] |= (s << a) & 67108863),
                  (this.words[o + 1] = (s >>> (26 - a)) & 67108863),
                  (a += 24) >= 26 && ((a -= 26), o++);
            return this._strip();
          }),
          (o.prototype._parseHex = function (t, e, n) {
            (this.length = Math.ceil((t.length - e) / 6)),
              (this.words = new Array(this.length));
            for (var r = 0; r < this.length; r++) this.words[r] = 0;
            var i,
              o = 0,
              s = 0;
            if ("be" === n)
              for (r = t.length - 1; r >= e; r -= 2)
                (i = c(t, e, r) << o),
                  (this.words[s] |= 67108863 & i),
                  o >= 18
                    ? ((o -= 18), (s += 1), (this.words[s] |= i >>> 26))
                    : (o += 8);
            else
              for (
                r = (t.length - e) % 2 === 0 ? e + 1 : e;
                r < t.length;
                r += 2
              )
                (i = c(t, e, r) << o),
                  (this.words[s] |= 67108863 & i),
                  o >= 18
                    ? ((o -= 18), (s += 1), (this.words[s] |= i >>> 26))
                    : (o += 8);
            this._strip();
          }),
          (o.prototype._parseBase = function (t, e, n) {
            (this.words = [0]), (this.length = 1);
            for (var r = 0, i = 1; i <= 67108863; i *= e) r++;
            r--, (i = (i / e) | 0);
            for (
              var o = t.length - n,
                s = o % r,
                a = Math.min(o, o - s) + n,
                c = 0,
                h = n;
              h < a;
              h += r
            )
              (c = u(t, h, h + r, e)),
                this.imuln(i),
                this.words[0] + c < 67108864
                  ? (this.words[0] += c)
                  : this._iaddn(c);
            if (0 !== s) {
              var l = 1;
              for (c = u(t, h, t.length, e), h = 0; h < s; h++) l *= e;
              this.imuln(l),
                this.words[0] + c < 67108864
                  ? (this.words[0] += c)
                  : this._iaddn(c);
            }
            this._strip();
          }),
          (o.prototype.copy = function (t) {
            t.words = new Array(this.length);
            for (var e = 0; e < this.length; e++) t.words[e] = this.words[e];
            (t.length = this.length),
              (t.negative = this.negative),
              (t.red = this.red);
          }),
          (o.prototype._move = function (t) {
            h(t, this);
          }),
          (o.prototype.clone = function () {
            var t = new o(null);
            return this.copy(t), t;
          }),
          (o.prototype._expand = function (t) {
            for (; this.length < t; ) this.words[this.length++] = 0;
            return this;
          }),
          (o.prototype._strip = function () {
            for (; this.length > 1 && 0 === this.words[this.length - 1]; )
              this.length--;
            return this._normSign();
          }),
          (o.prototype._normSign = function () {
            return (
              1 === this.length && 0 === this.words[0] && (this.negative = 0),
              this
            );
          }),
          "undefined" !== typeof Symbol && "function" === typeof Symbol.for)
        )
          try {
            o.prototype[Symbol.for("nodejs.util.inspect.custom")] = l;
          } catch (x) {
            o.prototype.inspect = l;
          }
        else o.prototype.inspect = l;
        function l() {
          return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
        }
        var d = [
            "",
            "0",
            "00",
            "000",
            "0000",
            "00000",
            "000000",
            "0000000",
            "00000000",
            "000000000",
            "0000000000",
            "00000000000",
            "000000000000",
            "0000000000000",
            "00000000000000",
            "000000000000000",
            "0000000000000000",
            "00000000000000000",
            "000000000000000000",
            "0000000000000000000",
            "00000000000000000000",
            "000000000000000000000",
            "0000000000000000000000",
            "00000000000000000000000",
            "000000000000000000000000",
            "0000000000000000000000000",
          ],
          f = [
            0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6,
            5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
          ],
          p = [
            0, 0, 33554432, 43046721, 16777216, 48828125, 60466176, 40353607,
            16777216, 43046721, 1e7, 19487171, 35831808, 62748517, 7529536,
            11390625, 16777216, 24137569, 34012224, 47045881, 64e6, 4084101,
            5153632, 6436343, 7962624, 9765625, 11881376, 14348907, 17210368,
            20511149, 243e5, 28629151, 33554432, 39135393, 45435424, 52521875,
            60466176,
          ];
        (o.prototype.toString = function (t, e) {
          var n;
          if (((e = 0 | e || 1), 16 === (t = t || 10) || "hex" === t)) {
            n = "";
            for (var i = 0, o = 0, s = 0; s < this.length; s++) {
              var a = this.words[s],
                c = (16777215 & ((a << i) | o)).toString(16);
              (o = (a >>> (24 - i)) & 16777215),
                (i += 2) >= 26 && ((i -= 26), s--),
                (n =
                  0 !== o || s !== this.length - 1
                    ? d[6 - c.length] + c + n
                    : c + n);
            }
            for (0 !== o && (n = o.toString(16) + n); n.length % e !== 0; )
              n = "0" + n;
            return 0 !== this.negative && (n = "-" + n), n;
          }
          if (t === (0 | t) && t >= 2 && t <= 36) {
            var u = f[t],
              h = p[t];
            n = "";
            var l = this.clone();
            for (l.negative = 0; !l.isZero(); ) {
              var y = l.modrn(h).toString(t);
              n = (l = l.idivn(h)).isZero() ? y + n : d[u - y.length] + y + n;
            }
            for (this.isZero() && (n = "0" + n); n.length % e !== 0; )
              n = "0" + n;
            return 0 !== this.negative && (n = "-" + n), n;
          }
          r(!1, "Base should be between 2 and 36");
        }),
          (o.prototype.toNumber = function () {
            var t = this.words[0];
            return (
              2 === this.length
                ? (t += 67108864 * this.words[1])
                : 3 === this.length && 1 === this.words[2]
                ? (t += 4503599627370496 + 67108864 * this.words[1])
                : this.length > 2 &&
                  r(!1, "Number can only safely store up to 53 bits"),
              0 !== this.negative ? -t : t
            );
          }),
          (o.prototype.toJSON = function () {
            return this.toString(16, 2);
          }),
          s &&
            (o.prototype.toBuffer = function (t, e) {
              return this.toArrayLike(s, t, e);
            }),
          (o.prototype.toArray = function (t, e) {
            return this.toArrayLike(Array, t, e);
          });
        function y(t, e, n) {
          n.negative = e.negative ^ t.negative;
          var r = (t.length + e.length) | 0;
          (n.length = r), (r = (r - 1) | 0);
          var i = 0 | t.words[0],
            o = 0 | e.words[0],
            s = i * o,
            a = 67108863 & s,
            c = (s / 67108864) | 0;
          n.words[0] = a;
          for (var u = 1; u < r; u++) {
            for (
              var h = c >>> 26,
                l = 67108863 & c,
                d = Math.min(u, e.length - 1),
                f = Math.max(0, u - t.length + 1);
              f <= d;
              f++
            ) {
              var p = (u - f) | 0;
              (h +=
                ((s = (i = 0 | t.words[p]) * (o = 0 | e.words[f]) + l) /
                  67108864) |
                0),
                (l = 67108863 & s);
            }
            (n.words[u] = 0 | l), (c = 0 | h);
          }
          return 0 !== c ? (n.words[u] = 0 | c) : n.length--, n._strip();
        }
        (o.prototype.toArrayLike = function (t, e, n) {
          this._strip();
          var i = this.byteLength(),
            o = n || Math.max(1, i);
          r(i <= o, "byte array longer than desired length"),
            r(o > 0, "Requested array length <= 0");
          var s = (function (t, e) {
            return t.allocUnsafe ? t.allocUnsafe(e) : new t(e);
          })(t, o);
          return this["_toArrayLike" + ("le" === e ? "LE" : "BE")](s, i), s;
        }),
          (o.prototype._toArrayLikeLE = function (t, e) {
            for (var n = 0, r = 0, i = 0, o = 0; i < this.length; i++) {
              var s = (this.words[i] << o) | r;
              (t[n++] = 255 & s),
                n < t.length && (t[n++] = (s >> 8) & 255),
                n < t.length && (t[n++] = (s >> 16) & 255),
                6 === o
                  ? (n < t.length && (t[n++] = (s >> 24) & 255),
                    (r = 0),
                    (o = 0))
                  : ((r = s >>> 24), (o += 2));
            }
            if (n < t.length) for (t[n++] = r; n < t.length; ) t[n++] = 0;
          }),
          (o.prototype._toArrayLikeBE = function (t, e) {
            for (
              var n = t.length - 1, r = 0, i = 0, o = 0;
              i < this.length;
              i++
            ) {
              var s = (this.words[i] << o) | r;
              (t[n--] = 255 & s),
                n >= 0 && (t[n--] = (s >> 8) & 255),
                n >= 0 && (t[n--] = (s >> 16) & 255),
                6 === o
                  ? (n >= 0 && (t[n--] = (s >> 24) & 255), (r = 0), (o = 0))
                  : ((r = s >>> 24), (o += 2));
            }
            if (n >= 0) for (t[n--] = r; n >= 0; ) t[n--] = 0;
          }),
          Math.clz32
            ? (o.prototype._countBits = function (t) {
                return 32 - Math.clz32(t);
              })
            : (o.prototype._countBits = function (t) {
                var e = t,
                  n = 0;
                return (
                  e >= 4096 && ((n += 13), (e >>>= 13)),
                  e >= 64 && ((n += 7), (e >>>= 7)),
                  e >= 8 && ((n += 4), (e >>>= 4)),
                  e >= 2 && ((n += 2), (e >>>= 2)),
                  n + e
                );
              }),
          (o.prototype._zeroBits = function (t) {
            if (0 === t) return 26;
            var e = t,
              n = 0;
            return (
              0 === (8191 & e) && ((n += 13), (e >>>= 13)),
              0 === (127 & e) && ((n += 7), (e >>>= 7)),
              0 === (15 & e) && ((n += 4), (e >>>= 4)),
              0 === (3 & e) && ((n += 2), (e >>>= 2)),
              0 === (1 & e) && n++,
              n
            );
          }),
          (o.prototype.bitLength = function () {
            var t = this.words[this.length - 1],
              e = this._countBits(t);
            return 26 * (this.length - 1) + e;
          }),
          (o.prototype.zeroBits = function () {
            if (this.isZero()) return 0;
            for (var t = 0, e = 0; e < this.length; e++) {
              var n = this._zeroBits(this.words[e]);
              if (((t += n), 26 !== n)) break;
            }
            return t;
          }),
          (o.prototype.byteLength = function () {
            return Math.ceil(this.bitLength() / 8);
          }),
          (o.prototype.toTwos = function (t) {
            return 0 !== this.negative
              ? this.abs().inotn(t).iaddn(1)
              : this.clone();
          }),
          (o.prototype.fromTwos = function (t) {
            return this.testn(t - 1)
              ? this.notn(t).iaddn(1).ineg()
              : this.clone();
          }),
          (o.prototype.isNeg = function () {
            return 0 !== this.negative;
          }),
          (o.prototype.neg = function () {
            return this.clone().ineg();
          }),
          (o.prototype.ineg = function () {
            return this.isZero() || (this.negative ^= 1), this;
          }),
          (o.prototype.iuor = function (t) {
            for (; this.length < t.length; ) this.words[this.length++] = 0;
            for (var e = 0; e < t.length; e++)
              this.words[e] = this.words[e] | t.words[e];
            return this._strip();
          }),
          (o.prototype.ior = function (t) {
            return r(0 === (this.negative | t.negative)), this.iuor(t);
          }),
          (o.prototype.or = function (t) {
            return this.length > t.length
              ? this.clone().ior(t)
              : t.clone().ior(this);
          }),
          (o.prototype.uor = function (t) {
            return this.length > t.length
              ? this.clone().iuor(t)
              : t.clone().iuor(this);
          }),
          (o.prototype.iuand = function (t) {
            var e;
            e = this.length > t.length ? t : this;
            for (var n = 0; n < e.length; n++)
              this.words[n] = this.words[n] & t.words[n];
            return (this.length = e.length), this._strip();
          }),
          (o.prototype.iand = function (t) {
            return r(0 === (this.negative | t.negative)), this.iuand(t);
          }),
          (o.prototype.and = function (t) {
            return this.length > t.length
              ? this.clone().iand(t)
              : t.clone().iand(this);
          }),
          (o.prototype.uand = function (t) {
            return this.length > t.length
              ? this.clone().iuand(t)
              : t.clone().iuand(this);
          }),
          (o.prototype.iuxor = function (t) {
            var e, n;
            this.length > t.length
              ? ((e = this), (n = t))
              : ((e = t), (n = this));
            for (var r = 0; r < n.length; r++)
              this.words[r] = e.words[r] ^ n.words[r];
            if (this !== e)
              for (; r < e.length; r++) this.words[r] = e.words[r];
            return (this.length = e.length), this._strip();
          }),
          (o.prototype.ixor = function (t) {
            return r(0 === (this.negative | t.negative)), this.iuxor(t);
          }),
          (o.prototype.xor = function (t) {
            return this.length > t.length
              ? this.clone().ixor(t)
              : t.clone().ixor(this);
          }),
          (o.prototype.uxor = function (t) {
            return this.length > t.length
              ? this.clone().iuxor(t)
              : t.clone().iuxor(this);
          }),
          (o.prototype.inotn = function (t) {
            r("number" === typeof t && t >= 0);
            var e = 0 | Math.ceil(t / 26),
              n = t % 26;
            this._expand(e), n > 0 && e--;
            for (var i = 0; i < e; i++)
              this.words[i] = 67108863 & ~this.words[i];
            return (
              n > 0 &&
                (this.words[i] = ~this.words[i] & (67108863 >> (26 - n))),
              this._strip()
            );
          }),
          (o.prototype.notn = function (t) {
            return this.clone().inotn(t);
          }),
          (o.prototype.setn = function (t, e) {
            r("number" === typeof t && t >= 0);
            var n = (t / 26) | 0,
              i = t % 26;
            return (
              this._expand(n + 1),
              (this.words[n] = e
                ? this.words[n] | (1 << i)
                : this.words[n] & ~(1 << i)),
              this._strip()
            );
          }),
          (o.prototype.iadd = function (t) {
            var e, n, r;
            if (0 !== this.negative && 0 === t.negative)
              return (
                (this.negative = 0),
                (e = this.isub(t)),
                (this.negative ^= 1),
                this._normSign()
              );
            if (0 === this.negative && 0 !== t.negative)
              return (
                (t.negative = 0),
                (e = this.isub(t)),
                (t.negative = 1),
                e._normSign()
              );
            this.length > t.length
              ? ((n = this), (r = t))
              : ((n = t), (r = this));
            for (var i = 0, o = 0; o < r.length; o++)
              (e = (0 | n.words[o]) + (0 | r.words[o]) + i),
                (this.words[o] = 67108863 & e),
                (i = e >>> 26);
            for (; 0 !== i && o < n.length; o++)
              (e = (0 | n.words[o]) + i),
                (this.words[o] = 67108863 & e),
                (i = e >>> 26);
            if (((this.length = n.length), 0 !== i))
              (this.words[this.length] = i), this.length++;
            else if (n !== this)
              for (; o < n.length; o++) this.words[o] = n.words[o];
            return this;
          }),
          (o.prototype.add = function (t) {
            var e;
            return 0 !== t.negative && 0 === this.negative
              ? ((t.negative = 0), (e = this.sub(t)), (t.negative ^= 1), e)
              : 0 === t.negative && 0 !== this.negative
              ? ((this.negative = 0), (e = t.sub(this)), (this.negative = 1), e)
              : this.length > t.length
              ? this.clone().iadd(t)
              : t.clone().iadd(this);
          }),
          (o.prototype.isub = function (t) {
            if (0 !== t.negative) {
              t.negative = 0;
              var e = this.iadd(t);
              return (t.negative = 1), e._normSign();
            }
            if (0 !== this.negative)
              return (
                (this.negative = 0),
                this.iadd(t),
                (this.negative = 1),
                this._normSign()
              );
            var n,
              r,
              i = this.cmp(t);
            if (0 === i)
              return (
                (this.negative = 0),
                (this.length = 1),
                (this.words[0] = 0),
                this
              );
            i > 0 ? ((n = this), (r = t)) : ((n = t), (r = this));
            for (var o = 0, s = 0; s < r.length; s++)
              (o = (e = (0 | n.words[s]) - (0 | r.words[s]) + o) >> 26),
                (this.words[s] = 67108863 & e);
            for (; 0 !== o && s < n.length; s++)
              (o = (e = (0 | n.words[s]) + o) >> 26),
                (this.words[s] = 67108863 & e);
            if (0 === o && s < n.length && n !== this)
              for (; s < n.length; s++) this.words[s] = n.words[s];
            return (
              (this.length = Math.max(this.length, s)),
              n !== this && (this.negative = 1),
              this._strip()
            );
          }),
          (o.prototype.sub = function (t) {
            return this.clone().isub(t);
          });
        var g = function (t, e, n) {
          var r,
            i,
            o,
            s = t.words,
            a = e.words,
            c = n.words,
            u = 0,
            h = 0 | s[0],
            l = 8191 & h,
            d = h >>> 13,
            f = 0 | s[1],
            p = 8191 & f,
            y = f >>> 13,
            g = 0 | s[2],
            m = 8191 & g,
            w = g >>> 13,
            b = 0 | s[3],
            v = 8191 & b,
            k = b >>> 13,
            S = 0 | s[4],
            M = 8191 & S,
            I = S >>> 13,
            E = 0 | s[5],
            _ = 8191 & E,
            A = E >>> 13,
            x = 0 | s[6],
            L = 8191 & x,
            T = x >>> 13,
            N = 0 | s[7],
            O = 8191 & N,
            B = N >>> 13,
            j = 0 | s[8],
            P = 8191 & j,
            C = j >>> 13,
            R = 0 | s[9],
            z = 8191 & R,
            D = R >>> 13,
            U = 0 | a[0],
            W = 8191 & U,
            K = U >>> 13,
            q = 0 | a[1],
            H = 8191 & q,
            F = q >>> 13,
            Y = 0 | a[2],
            V = 8191 & Y,
            $ = Y >>> 13,
            Z = 0 | a[3],
            G = 8191 & Z,
            Q = Z >>> 13,
            J = 0 | a[4],
            X = 8191 & J,
            tt = J >>> 13,
            et = 0 | a[5],
            nt = 8191 & et,
            rt = et >>> 13,
            it = 0 | a[6],
            ot = 8191 & it,
            st = it >>> 13,
            at = 0 | a[7],
            ct = 8191 & at,
            ut = at >>> 13,
            ht = 0 | a[8],
            lt = 8191 & ht,
            dt = ht >>> 13,
            ft = 0 | a[9],
            pt = 8191 & ft,
            yt = ft >>> 13;
          (n.negative = t.negative ^ e.negative), (n.length = 19);
          var gt =
            (((u + (r = Math.imul(l, W))) | 0) +
              ((8191 & (i = ((i = Math.imul(l, K)) + Math.imul(d, W)) | 0)) <<
                13)) |
            0;
          (u = ((((o = Math.imul(d, K)) + (i >>> 13)) | 0) + (gt >>> 26)) | 0),
            (gt &= 67108863),
            (r = Math.imul(p, W)),
            (i = ((i = Math.imul(p, K)) + Math.imul(y, W)) | 0),
            (o = Math.imul(y, K));
          var mt =
            (((u + (r = (r + Math.imul(l, H)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(l, F)) | 0) + Math.imul(d, H)) | 0)) <<
                13)) |
            0;
          (u =
            ((((o = (o + Math.imul(d, F)) | 0) + (i >>> 13)) | 0) +
              (mt >>> 26)) |
            0),
            (mt &= 67108863),
            (r = Math.imul(m, W)),
            (i = ((i = Math.imul(m, K)) + Math.imul(w, W)) | 0),
            (o = Math.imul(w, K)),
            (r = (r + Math.imul(p, H)) | 0),
            (i = ((i = (i + Math.imul(p, F)) | 0) + Math.imul(y, H)) | 0),
            (o = (o + Math.imul(y, F)) | 0);
          var wt =
            (((u + (r = (r + Math.imul(l, V)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(l, $)) | 0) + Math.imul(d, V)) | 0)) <<
                13)) |
            0;
          (u =
            ((((o = (o + Math.imul(d, $)) | 0) + (i >>> 13)) | 0) +
              (wt >>> 26)) |
            0),
            (wt &= 67108863),
            (r = Math.imul(v, W)),
            (i = ((i = Math.imul(v, K)) + Math.imul(k, W)) | 0),
            (o = Math.imul(k, K)),
            (r = (r + Math.imul(m, H)) | 0),
            (i = ((i = (i + Math.imul(m, F)) | 0) + Math.imul(w, H)) | 0),
            (o = (o + Math.imul(w, F)) | 0),
            (r = (r + Math.imul(p, V)) | 0),
            (i = ((i = (i + Math.imul(p, $)) | 0) + Math.imul(y, V)) | 0),
            (o = (o + Math.imul(y, $)) | 0);
          var bt =
            (((u + (r = (r + Math.imul(l, G)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(l, Q)) | 0) + Math.imul(d, G)) | 0)) <<
                13)) |
            0;
          (u =
            ((((o = (o + Math.imul(d, Q)) | 0) + (i >>> 13)) | 0) +
              (bt >>> 26)) |
            0),
            (bt &= 67108863),
            (r = Math.imul(M, W)),
            (i = ((i = Math.imul(M, K)) + Math.imul(I, W)) | 0),
            (o = Math.imul(I, K)),
            (r = (r + Math.imul(v, H)) | 0),
            (i = ((i = (i + Math.imul(v, F)) | 0) + Math.imul(k, H)) | 0),
            (o = (o + Math.imul(k, F)) | 0),
            (r = (r + Math.imul(m, V)) | 0),
            (i = ((i = (i + Math.imul(m, $)) | 0) + Math.imul(w, V)) | 0),
            (o = (o + Math.imul(w, $)) | 0),
            (r = (r + Math.imul(p, G)) | 0),
            (i = ((i = (i + Math.imul(p, Q)) | 0) + Math.imul(y, G)) | 0),
            (o = (o + Math.imul(y, Q)) | 0);
          var vt =
            (((u + (r = (r + Math.imul(l, X)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(l, tt)) | 0) + Math.imul(d, X)) | 0)) <<
                13)) |
            0;
          (u =
            ((((o = (o + Math.imul(d, tt)) | 0) + (i >>> 13)) | 0) +
              (vt >>> 26)) |
            0),
            (vt &= 67108863),
            (r = Math.imul(_, W)),
            (i = ((i = Math.imul(_, K)) + Math.imul(A, W)) | 0),
            (o = Math.imul(A, K)),
            (r = (r + Math.imul(M, H)) | 0),
            (i = ((i = (i + Math.imul(M, F)) | 0) + Math.imul(I, H)) | 0),
            (o = (o + Math.imul(I, F)) | 0),
            (r = (r + Math.imul(v, V)) | 0),
            (i = ((i = (i + Math.imul(v, $)) | 0) + Math.imul(k, V)) | 0),
            (o = (o + Math.imul(k, $)) | 0),
            (r = (r + Math.imul(m, G)) | 0),
            (i = ((i = (i + Math.imul(m, Q)) | 0) + Math.imul(w, G)) | 0),
            (o = (o + Math.imul(w, Q)) | 0),
            (r = (r + Math.imul(p, X)) | 0),
            (i = ((i = (i + Math.imul(p, tt)) | 0) + Math.imul(y, X)) | 0),
            (o = (o + Math.imul(y, tt)) | 0);
          var kt =
            (((u + (r = (r + Math.imul(l, nt)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(l, rt)) | 0) + Math.imul(d, nt)) | 0)) <<
                13)) |
            0;
          (u =
            ((((o = (o + Math.imul(d, rt)) | 0) + (i >>> 13)) | 0) +
              (kt >>> 26)) |
            0),
            (kt &= 67108863),
            (r = Math.imul(L, W)),
            (i = ((i = Math.imul(L, K)) + Math.imul(T, W)) | 0),
            (o = Math.imul(T, K)),
            (r = (r + Math.imul(_, H)) | 0),
            (i = ((i = (i + Math.imul(_, F)) | 0) + Math.imul(A, H)) | 0),
            (o = (o + Math.imul(A, F)) | 0),
            (r = (r + Math.imul(M, V)) | 0),
            (i = ((i = (i + Math.imul(M, $)) | 0) + Math.imul(I, V)) | 0),
            (o = (o + Math.imul(I, $)) | 0),
            (r = (r + Math.imul(v, G)) | 0),
            (i = ((i = (i + Math.imul(v, Q)) | 0) + Math.imul(k, G)) | 0),
            (o = (o + Math.imul(k, Q)) | 0),
            (r = (r + Math.imul(m, X)) | 0),
            (i = ((i = (i + Math.imul(m, tt)) | 0) + Math.imul(w, X)) | 0),
            (o = (o + Math.imul(w, tt)) | 0),
            (r = (r + Math.imul(p, nt)) | 0),
            (i = ((i = (i + Math.imul(p, rt)) | 0) + Math.imul(y, nt)) | 0),
            (o = (o + Math.imul(y, rt)) | 0);
          var St =
            (((u + (r = (r + Math.imul(l, ot)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(l, st)) | 0) + Math.imul(d, ot)) | 0)) <<
                13)) |
            0;
          (u =
            ((((o = (o + Math.imul(d, st)) | 0) + (i >>> 13)) | 0) +
              (St >>> 26)) |
            0),
            (St &= 67108863),
            (r = Math.imul(O, W)),
            (i = ((i = Math.imul(O, K)) + Math.imul(B, W)) | 0),
            (o = Math.imul(B, K)),
            (r = (r + Math.imul(L, H)) | 0),
            (i = ((i = (i + Math.imul(L, F)) | 0) + Math.imul(T, H)) | 0),
            (o = (o + Math.imul(T, F)) | 0),
            (r = (r + Math.imul(_, V)) | 0),
            (i = ((i = (i + Math.imul(_, $)) | 0) + Math.imul(A, V)) | 0),
            (o = (o + Math.imul(A, $)) | 0),
            (r = (r + Math.imul(M, G)) | 0),
            (i = ((i = (i + Math.imul(M, Q)) | 0) + Math.imul(I, G)) | 0),
            (o = (o + Math.imul(I, Q)) | 0),
            (r = (r + Math.imul(v, X)) | 0),
            (i = ((i = (i + Math.imul(v, tt)) | 0) + Math.imul(k, X)) | 0),
            (o = (o + Math.imul(k, tt)) | 0),
            (r = (r + Math.imul(m, nt)) | 0),
            (i = ((i = (i + Math.imul(m, rt)) | 0) + Math.imul(w, nt)) | 0),
            (o = (o + Math.imul(w, rt)) | 0),
            (r = (r + Math.imul(p, ot)) | 0),
            (i = ((i = (i + Math.imul(p, st)) | 0) + Math.imul(y, ot)) | 0),
            (o = (o + Math.imul(y, st)) | 0);
          var Mt =
            (((u + (r = (r + Math.imul(l, ct)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(l, ut)) | 0) + Math.imul(d, ct)) | 0)) <<
                13)) |
            0;
          (u =
            ((((o = (o + Math.imul(d, ut)) | 0) + (i >>> 13)) | 0) +
              (Mt >>> 26)) |
            0),
            (Mt &= 67108863),
            (r = Math.imul(P, W)),
            (i = ((i = Math.imul(P, K)) + Math.imul(C, W)) | 0),
            (o = Math.imul(C, K)),
            (r = (r + Math.imul(O, H)) | 0),
            (i = ((i = (i + Math.imul(O, F)) | 0) + Math.imul(B, H)) | 0),
            (o = (o + Math.imul(B, F)) | 0),
            (r = (r + Math.imul(L, V)) | 0),
            (i = ((i = (i + Math.imul(L, $)) | 0) + Math.imul(T, V)) | 0),
            (o = (o + Math.imul(T, $)) | 0),
            (r = (r + Math.imul(_, G)) | 0),
            (i = ((i = (i + Math.imul(_, Q)) | 0) + Math.imul(A, G)) | 0),
            (o = (o + Math.imul(A, Q)) | 0),
            (r = (r + Math.imul(M, X)) | 0),
            (i = ((i = (i + Math.imul(M, tt)) | 0) + Math.imul(I, X)) | 0),
            (o = (o + Math.imul(I, tt)) | 0),
            (r = (r + Math.imul(v, nt)) | 0),
            (i = ((i = (i + Math.imul(v, rt)) | 0) + Math.imul(k, nt)) | 0),
            (o = (o + Math.imul(k, rt)) | 0),
            (r = (r + Math.imul(m, ot)) | 0),
            (i = ((i = (i + Math.imul(m, st)) | 0) + Math.imul(w, ot)) | 0),
            (o = (o + Math.imul(w, st)) | 0),
            (r = (r + Math.imul(p, ct)) | 0),
            (i = ((i = (i + Math.imul(p, ut)) | 0) + Math.imul(y, ct)) | 0),
            (o = (o + Math.imul(y, ut)) | 0);
          var It =
            (((u + (r = (r + Math.imul(l, lt)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(l, dt)) | 0) + Math.imul(d, lt)) | 0)) <<
                13)) |
            0;
          (u =
            ((((o = (o + Math.imul(d, dt)) | 0) + (i >>> 13)) | 0) +
              (It >>> 26)) |
            0),
            (It &= 67108863),
            (r = Math.imul(z, W)),
            (i = ((i = Math.imul(z, K)) + Math.imul(D, W)) | 0),
            (o = Math.imul(D, K)),
            (r = (r + Math.imul(P, H)) | 0),
            (i = ((i = (i + Math.imul(P, F)) | 0) + Math.imul(C, H)) | 0),
            (o = (o + Math.imul(C, F)) | 0),
            (r = (r + Math.imul(O, V)) | 0),
            (i = ((i = (i + Math.imul(O, $)) | 0) + Math.imul(B, V)) | 0),
            (o = (o + Math.imul(B, $)) | 0),
            (r = (r + Math.imul(L, G)) | 0),
            (i = ((i = (i + Math.imul(L, Q)) | 0) + Math.imul(T, G)) | 0),
            (o = (o + Math.imul(T, Q)) | 0),
            (r = (r + Math.imul(_, X)) | 0),
            (i = ((i = (i + Math.imul(_, tt)) | 0) + Math.imul(A, X)) | 0),
            (o = (o + Math.imul(A, tt)) | 0),
            (r = (r + Math.imul(M, nt)) | 0),
            (i = ((i = (i + Math.imul(M, rt)) | 0) + Math.imul(I, nt)) | 0),
            (o = (o + Math.imul(I, rt)) | 0),
            (r = (r + Math.imul(v, ot)) | 0),
            (i = ((i = (i + Math.imul(v, st)) | 0) + Math.imul(k, ot)) | 0),
            (o = (o + Math.imul(k, st)) | 0),
            (r = (r + Math.imul(m, ct)) | 0),
            (i = ((i = (i + Math.imul(m, ut)) | 0) + Math.imul(w, ct)) | 0),
            (o = (o + Math.imul(w, ut)) | 0),
            (r = (r + Math.imul(p, lt)) | 0),
            (i = ((i = (i + Math.imul(p, dt)) | 0) + Math.imul(y, lt)) | 0),
            (o = (o + Math.imul(y, dt)) | 0);
          var Et =
            (((u + (r = (r + Math.imul(l, pt)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(l, yt)) | 0) + Math.imul(d, pt)) | 0)) <<
                13)) |
            0;
          (u =
            ((((o = (o + Math.imul(d, yt)) | 0) + (i >>> 13)) | 0) +
              (Et >>> 26)) |
            0),
            (Et &= 67108863),
            (r = Math.imul(z, H)),
            (i = ((i = Math.imul(z, F)) + Math.imul(D, H)) | 0),
            (o = Math.imul(D, F)),
            (r = (r + Math.imul(P, V)) | 0),
            (i = ((i = (i + Math.imul(P, $)) | 0) + Math.imul(C, V)) | 0),
            (o = (o + Math.imul(C, $)) | 0),
            (r = (r + Math.imul(O, G)) | 0),
            (i = ((i = (i + Math.imul(O, Q)) | 0) + Math.imul(B, G)) | 0),
            (o = (o + Math.imul(B, Q)) | 0),
            (r = (r + Math.imul(L, X)) | 0),
            (i = ((i = (i + Math.imul(L, tt)) | 0) + Math.imul(T, X)) | 0),
            (o = (o + Math.imul(T, tt)) | 0),
            (r = (r + Math.imul(_, nt)) | 0),
            (i = ((i = (i + Math.imul(_, rt)) | 0) + Math.imul(A, nt)) | 0),
            (o = (o + Math.imul(A, rt)) | 0),
            (r = (r + Math.imul(M, ot)) | 0),
            (i = ((i = (i + Math.imul(M, st)) | 0) + Math.imul(I, ot)) | 0),
            (o = (o + Math.imul(I, st)) | 0),
            (r = (r + Math.imul(v, ct)) | 0),
            (i = ((i = (i + Math.imul(v, ut)) | 0) + Math.imul(k, ct)) | 0),
            (o = (o + Math.imul(k, ut)) | 0),
            (r = (r + Math.imul(m, lt)) | 0),
            (i = ((i = (i + Math.imul(m, dt)) | 0) + Math.imul(w, lt)) | 0),
            (o = (o + Math.imul(w, dt)) | 0);
          var _t =
            (((u + (r = (r + Math.imul(p, pt)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(p, yt)) | 0) + Math.imul(y, pt)) | 0)) <<
                13)) |
            0;
          (u =
            ((((o = (o + Math.imul(y, yt)) | 0) + (i >>> 13)) | 0) +
              (_t >>> 26)) |
            0),
            (_t &= 67108863),
            (r = Math.imul(z, V)),
            (i = ((i = Math.imul(z, $)) + Math.imul(D, V)) | 0),
            (o = Math.imul(D, $)),
            (r = (r + Math.imul(P, G)) | 0),
            (i = ((i = (i + Math.imul(P, Q)) | 0) + Math.imul(C, G)) | 0),
            (o = (o + Math.imul(C, Q)) | 0),
            (r = (r + Math.imul(O, X)) | 0),
            (i = ((i = (i + Math.imul(O, tt)) | 0) + Math.imul(B, X)) | 0),
            (o = (o + Math.imul(B, tt)) | 0),
            (r = (r + Math.imul(L, nt)) | 0),
            (i = ((i = (i + Math.imul(L, rt)) | 0) + Math.imul(T, nt)) | 0),
            (o = (o + Math.imul(T, rt)) | 0),
            (r = (r + Math.imul(_, ot)) | 0),
            (i = ((i = (i + Math.imul(_, st)) | 0) + Math.imul(A, ot)) | 0),
            (o = (o + Math.imul(A, st)) | 0),
            (r = (r + Math.imul(M, ct)) | 0),
            (i = ((i = (i + Math.imul(M, ut)) | 0) + Math.imul(I, ct)) | 0),
            (o = (o + Math.imul(I, ut)) | 0),
            (r = (r + Math.imul(v, lt)) | 0),
            (i = ((i = (i + Math.imul(v, dt)) | 0) + Math.imul(k, lt)) | 0),
            (o = (o + Math.imul(k, dt)) | 0);
          var At =
            (((u + (r = (r + Math.imul(m, pt)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(m, yt)) | 0) + Math.imul(w, pt)) | 0)) <<
                13)) |
            0;
          (u =
            ((((o = (o + Math.imul(w, yt)) | 0) + (i >>> 13)) | 0) +
              (At >>> 26)) |
            0),
            (At &= 67108863),
            (r = Math.imul(z, G)),
            (i = ((i = Math.imul(z, Q)) + Math.imul(D, G)) | 0),
            (o = Math.imul(D, Q)),
            (r = (r + Math.imul(P, X)) | 0),
            (i = ((i = (i + Math.imul(P, tt)) | 0) + Math.imul(C, X)) | 0),
            (o = (o + Math.imul(C, tt)) | 0),
            (r = (r + Math.imul(O, nt)) | 0),
            (i = ((i = (i + Math.imul(O, rt)) | 0) + Math.imul(B, nt)) | 0),
            (o = (o + Math.imul(B, rt)) | 0),
            (r = (r + Math.imul(L, ot)) | 0),
            (i = ((i = (i + Math.imul(L, st)) | 0) + Math.imul(T, ot)) | 0),
            (o = (o + Math.imul(T, st)) | 0),
            (r = (r + Math.imul(_, ct)) | 0),
            (i = ((i = (i + Math.imul(_, ut)) | 0) + Math.imul(A, ct)) | 0),
            (o = (o + Math.imul(A, ut)) | 0),
            (r = (r + Math.imul(M, lt)) | 0),
            (i = ((i = (i + Math.imul(M, dt)) | 0) + Math.imul(I, lt)) | 0),
            (o = (o + Math.imul(I, dt)) | 0);
          var xt =
            (((u + (r = (r + Math.imul(v, pt)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(v, yt)) | 0) + Math.imul(k, pt)) | 0)) <<
                13)) |
            0;
          (u =
            ((((o = (o + Math.imul(k, yt)) | 0) + (i >>> 13)) | 0) +
              (xt >>> 26)) |
            0),
            (xt &= 67108863),
            (r = Math.imul(z, X)),
            (i = ((i = Math.imul(z, tt)) + Math.imul(D, X)) | 0),
            (o = Math.imul(D, tt)),
            (r = (r + Math.imul(P, nt)) | 0),
            (i = ((i = (i + Math.imul(P, rt)) | 0) + Math.imul(C, nt)) | 0),
            (o = (o + Math.imul(C, rt)) | 0),
            (r = (r + Math.imul(O, ot)) | 0),
            (i = ((i = (i + Math.imul(O, st)) | 0) + Math.imul(B, ot)) | 0),
            (o = (o + Math.imul(B, st)) | 0),
            (r = (r + Math.imul(L, ct)) | 0),
            (i = ((i = (i + Math.imul(L, ut)) | 0) + Math.imul(T, ct)) | 0),
            (o = (o + Math.imul(T, ut)) | 0),
            (r = (r + Math.imul(_, lt)) | 0),
            (i = ((i = (i + Math.imul(_, dt)) | 0) + Math.imul(A, lt)) | 0),
            (o = (o + Math.imul(A, dt)) | 0);
          var Lt =
            (((u + (r = (r + Math.imul(M, pt)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(M, yt)) | 0) + Math.imul(I, pt)) | 0)) <<
                13)) |
            0;
          (u =
            ((((o = (o + Math.imul(I, yt)) | 0) + (i >>> 13)) | 0) +
              (Lt >>> 26)) |
            0),
            (Lt &= 67108863),
            (r = Math.imul(z, nt)),
            (i = ((i = Math.imul(z, rt)) + Math.imul(D, nt)) | 0),
            (o = Math.imul(D, rt)),
            (r = (r + Math.imul(P, ot)) | 0),
            (i = ((i = (i + Math.imul(P, st)) | 0) + Math.imul(C, ot)) | 0),
            (o = (o + Math.imul(C, st)) | 0),
            (r = (r + Math.imul(O, ct)) | 0),
            (i = ((i = (i + Math.imul(O, ut)) | 0) + Math.imul(B, ct)) | 0),
            (o = (o + Math.imul(B, ut)) | 0),
            (r = (r + Math.imul(L, lt)) | 0),
            (i = ((i = (i + Math.imul(L, dt)) | 0) + Math.imul(T, lt)) | 0),
            (o = (o + Math.imul(T, dt)) | 0);
          var Tt =
            (((u + (r = (r + Math.imul(_, pt)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(_, yt)) | 0) + Math.imul(A, pt)) | 0)) <<
                13)) |
            0;
          (u =
            ((((o = (o + Math.imul(A, yt)) | 0) + (i >>> 13)) | 0) +
              (Tt >>> 26)) |
            0),
            (Tt &= 67108863),
            (r = Math.imul(z, ot)),
            (i = ((i = Math.imul(z, st)) + Math.imul(D, ot)) | 0),
            (o = Math.imul(D, st)),
            (r = (r + Math.imul(P, ct)) | 0),
            (i = ((i = (i + Math.imul(P, ut)) | 0) + Math.imul(C, ct)) | 0),
            (o = (o + Math.imul(C, ut)) | 0),
            (r = (r + Math.imul(O, lt)) | 0),
            (i = ((i = (i + Math.imul(O, dt)) | 0) + Math.imul(B, lt)) | 0),
            (o = (o + Math.imul(B, dt)) | 0);
          var Nt =
            (((u + (r = (r + Math.imul(L, pt)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(L, yt)) | 0) + Math.imul(T, pt)) | 0)) <<
                13)) |
            0;
          (u =
            ((((o = (o + Math.imul(T, yt)) | 0) + (i >>> 13)) | 0) +
              (Nt >>> 26)) |
            0),
            (Nt &= 67108863),
            (r = Math.imul(z, ct)),
            (i = ((i = Math.imul(z, ut)) + Math.imul(D, ct)) | 0),
            (o = Math.imul(D, ut)),
            (r = (r + Math.imul(P, lt)) | 0),
            (i = ((i = (i + Math.imul(P, dt)) | 0) + Math.imul(C, lt)) | 0),
            (o = (o + Math.imul(C, dt)) | 0);
          var Ot =
            (((u + (r = (r + Math.imul(O, pt)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(O, yt)) | 0) + Math.imul(B, pt)) | 0)) <<
                13)) |
            0;
          (u =
            ((((o = (o + Math.imul(B, yt)) | 0) + (i >>> 13)) | 0) +
              (Ot >>> 26)) |
            0),
            (Ot &= 67108863),
            (r = Math.imul(z, lt)),
            (i = ((i = Math.imul(z, dt)) + Math.imul(D, lt)) | 0),
            (o = Math.imul(D, dt));
          var Bt =
            (((u + (r = (r + Math.imul(P, pt)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(P, yt)) | 0) + Math.imul(C, pt)) | 0)) <<
                13)) |
            0;
          (u =
            ((((o = (o + Math.imul(C, yt)) | 0) + (i >>> 13)) | 0) +
              (Bt >>> 26)) |
            0),
            (Bt &= 67108863);
          var jt =
            (((u + (r = Math.imul(z, pt))) | 0) +
              ((8191 & (i = ((i = Math.imul(z, yt)) + Math.imul(D, pt)) | 0)) <<
                13)) |
            0;
          return (
            (u =
              ((((o = Math.imul(D, yt)) + (i >>> 13)) | 0) + (jt >>> 26)) | 0),
            (jt &= 67108863),
            (c[0] = gt),
            (c[1] = mt),
            (c[2] = wt),
            (c[3] = bt),
            (c[4] = vt),
            (c[5] = kt),
            (c[6] = St),
            (c[7] = Mt),
            (c[8] = It),
            (c[9] = Et),
            (c[10] = _t),
            (c[11] = At),
            (c[12] = xt),
            (c[13] = Lt),
            (c[14] = Tt),
            (c[15] = Nt),
            (c[16] = Ot),
            (c[17] = Bt),
            (c[18] = jt),
            0 !== u && ((c[19] = u), n.length++),
            n
          );
        };
        function m(t, e, n) {
          (n.negative = e.negative ^ t.negative),
            (n.length = t.length + e.length);
          for (var r = 0, i = 0, o = 0; o < n.length - 1; o++) {
            var s = i;
            i = 0;
            for (
              var a = 67108863 & r,
                c = Math.min(o, e.length - 1),
                u = Math.max(0, o - t.length + 1);
              u <= c;
              u++
            ) {
              var h = o - u,
                l = (0 | t.words[h]) * (0 | e.words[u]),
                d = 67108863 & l;
              (a = 67108863 & (d = (d + a) | 0)),
                (i +=
                  (s =
                    ((s = (s + ((l / 67108864) | 0)) | 0) + (d >>> 26)) | 0) >>>
                  26),
                (s &= 67108863);
            }
            (n.words[o] = a), (r = s), (s = i);
          }
          return 0 !== r ? (n.words[o] = r) : n.length--, n._strip();
        }
        function w(t, e, n) {
          return m(t, e, n);
        }
        function b(t, e) {
          (this.x = t), (this.y = e);
        }
        Math.imul || (g = y),
          (o.prototype.mulTo = function (t, e) {
            var n = this.length + t.length;
            return 10 === this.length && 10 === t.length
              ? g(this, t, e)
              : n < 63
              ? y(this, t, e)
              : n < 1024
              ? m(this, t, e)
              : w(this, t, e);
          }),
          (b.prototype.makeRBT = function (t) {
            for (
              var e = new Array(t), n = o.prototype._countBits(t) - 1, r = 0;
              r < t;
              r++
            )
              e[r] = this.revBin(r, n, t);
            return e;
          }),
          (b.prototype.revBin = function (t, e, n) {
            if (0 === t || t === n - 1) return t;
            for (var r = 0, i = 0; i < e; i++)
              (r |= (1 & t) << (e - i - 1)), (t >>= 1);
            return r;
          }),
          (b.prototype.permute = function (t, e, n, r, i, o) {
            for (var s = 0; s < o; s++) (r[s] = e[t[s]]), (i[s] = n[t[s]]);
          }),
          (b.prototype.transform = function (t, e, n, r, i, o) {
            this.permute(o, t, e, n, r, i);
            for (var s = 1; s < i; s <<= 1)
              for (
                var a = s << 1,
                  c = Math.cos((2 * Math.PI) / a),
                  u = Math.sin((2 * Math.PI) / a),
                  h = 0;
                h < i;
                h += a
              )
                for (var l = c, d = u, f = 0; f < s; f++) {
                  var p = n[h + f],
                    y = r[h + f],
                    g = n[h + f + s],
                    m = r[h + f + s],
                    w = l * g - d * m;
                  (m = l * m + d * g),
                    (g = w),
                    (n[h + f] = p + g),
                    (r[h + f] = y + m),
                    (n[h + f + s] = p - g),
                    (r[h + f + s] = y - m),
                    f !== a &&
                      ((w = c * l - u * d), (d = c * d + u * l), (l = w));
                }
          }),
          (b.prototype.guessLen13b = function (t, e) {
            var n = 1 | Math.max(e, t),
              r = 1 & n,
              i = 0;
            for (n = (n / 2) | 0; n; n >>>= 1) i++;
            return 1 << (i + 1 + r);
          }),
          (b.prototype.conjugate = function (t, e, n) {
            if (!(n <= 1))
              for (var r = 0; r < n / 2; r++) {
                var i = t[r];
                (t[r] = t[n - r - 1]),
                  (t[n - r - 1] = i),
                  (i = e[r]),
                  (e[r] = -e[n - r - 1]),
                  (e[n - r - 1] = -i);
              }
          }),
          (b.prototype.normalize13b = function (t, e) {
            for (var n = 0, r = 0; r < e / 2; r++) {
              var i =
                8192 * Math.round(t[2 * r + 1] / e) +
                Math.round(t[2 * r] / e) +
                n;
              (t[r] = 67108863 & i),
                (n = i < 67108864 ? 0 : (i / 67108864) | 0);
            }
            return t;
          }),
          (b.prototype.convert13b = function (t, e, n, i) {
            for (var o = 0, s = 0; s < e; s++)
              (o += 0 | t[s]),
                (n[2 * s] = 8191 & o),
                (o >>>= 13),
                (n[2 * s + 1] = 8191 & o),
                (o >>>= 13);
            for (s = 2 * e; s < i; ++s) n[s] = 0;
            r(0 === o), r(0 === (-8192 & o));
          }),
          (b.prototype.stub = function (t) {
            for (var e = new Array(t), n = 0; n < t; n++) e[n] = 0;
            return e;
          }),
          (b.prototype.mulp = function (t, e, n) {
            var r = 2 * this.guessLen13b(t.length, e.length),
              i = this.makeRBT(r),
              o = this.stub(r),
              s = new Array(r),
              a = new Array(r),
              c = new Array(r),
              u = new Array(r),
              h = new Array(r),
              l = new Array(r),
              d = n.words;
            (d.length = r),
              this.convert13b(t.words, t.length, s, r),
              this.convert13b(e.words, e.length, u, r),
              this.transform(s, o, a, c, r, i),
              this.transform(u, o, h, l, r, i);
            for (var f = 0; f < r; f++) {
              var p = a[f] * h[f] - c[f] * l[f];
              (c[f] = a[f] * l[f] + c[f] * h[f]), (a[f] = p);
            }
            return (
              this.conjugate(a, c, r),
              this.transform(a, c, d, o, r, i),
              this.conjugate(d, o, r),
              this.normalize13b(d, r),
              (n.negative = t.negative ^ e.negative),
              (n.length = t.length + e.length),
              n._strip()
            );
          }),
          (o.prototype.mul = function (t) {
            var e = new o(null);
            return (
              (e.words = new Array(this.length + t.length)), this.mulTo(t, e)
            );
          }),
          (o.prototype.mulf = function (t) {
            var e = new o(null);
            return (e.words = new Array(this.length + t.length)), w(this, t, e);
          }),
          (o.prototype.imul = function (t) {
            return this.clone().mulTo(t, this);
          }),
          (o.prototype.imuln = function (t) {
            var e = t < 0;
            e && (t = -t), r("number" === typeof t), r(t < 67108864);
            for (var n = 0, i = 0; i < this.length; i++) {
              var o = (0 | this.words[i]) * t,
                s = (67108863 & o) + (67108863 & n);
              (n >>= 26),
                (n += (o / 67108864) | 0),
                (n += s >>> 26),
                (this.words[i] = 67108863 & s);
            }
            return (
              0 !== n && ((this.words[i] = n), this.length++),
              e ? this.ineg() : this
            );
          }),
          (o.prototype.muln = function (t) {
            return this.clone().imuln(t);
          }),
          (o.prototype.sqr = function () {
            return this.mul(this);
          }),
          (o.prototype.isqr = function () {
            return this.imul(this.clone());
          }),
          (o.prototype.pow = function (t) {
            var e = (function (t) {
              for (var e = new Array(t.bitLength()), n = 0; n < e.length; n++) {
                var r = (n / 26) | 0,
                  i = n % 26;
                e[n] = (t.words[r] >>> i) & 1;
              }
              return e;
            })(t);
            if (0 === e.length) return new o(1);
            for (
              var n = this, r = 0;
              r < e.length && 0 === e[r];
              r++, n = n.sqr()
            );
            if (++r < e.length)
              for (var i = n.sqr(); r < e.length; r++, i = i.sqr())
                0 !== e[r] && (n = n.mul(i));
            return n;
          }),
          (o.prototype.iushln = function (t) {
            r("number" === typeof t && t >= 0);
            var e,
              n = t % 26,
              i = (t - n) / 26,
              o = (67108863 >>> (26 - n)) << (26 - n);
            if (0 !== n) {
              var s = 0;
              for (e = 0; e < this.length; e++) {
                var a = this.words[e] & o,
                  c = ((0 | this.words[e]) - a) << n;
                (this.words[e] = c | s), (s = a >>> (26 - n));
              }
              s && ((this.words[e] = s), this.length++);
            }
            if (0 !== i) {
              for (e = this.length - 1; e >= 0; e--)
                this.words[e + i] = this.words[e];
              for (e = 0; e < i; e++) this.words[e] = 0;
              this.length += i;
            }
            return this._strip();
          }),
          (o.prototype.ishln = function (t) {
            return r(0 === this.negative), this.iushln(t);
          }),
          (o.prototype.iushrn = function (t, e, n) {
            var i;
            r("number" === typeof t && t >= 0),
              (i = e ? (e - (e % 26)) / 26 : 0);
            var o = t % 26,
              s = Math.min((t - o) / 26, this.length),
              a = 67108863 ^ ((67108863 >>> o) << o),
              c = n;
            if (((i -= s), (i = Math.max(0, i)), c)) {
              for (var u = 0; u < s; u++) c.words[u] = this.words[u];
              c.length = s;
            }
            if (0 === s);
            else if (this.length > s)
              for (this.length -= s, u = 0; u < this.length; u++)
                this.words[u] = this.words[u + s];
            else (this.words[0] = 0), (this.length = 1);
            var h = 0;
            for (u = this.length - 1; u >= 0 && (0 !== h || u >= i); u--) {
              var l = 0 | this.words[u];
              (this.words[u] = (h << (26 - o)) | (l >>> o)), (h = l & a);
            }
            return (
              c && 0 !== h && (c.words[c.length++] = h),
              0 === this.length && ((this.words[0] = 0), (this.length = 1)),
              this._strip()
            );
          }),
          (o.prototype.ishrn = function (t, e, n) {
            return r(0 === this.negative), this.iushrn(t, e, n);
          }),
          (o.prototype.shln = function (t) {
            return this.clone().ishln(t);
          }),
          (o.prototype.ushln = function (t) {
            return this.clone().iushln(t);
          }),
          (o.prototype.shrn = function (t) {
            return this.clone().ishrn(t);
          }),
          (o.prototype.ushrn = function (t) {
            return this.clone().iushrn(t);
          }),
          (o.prototype.testn = function (t) {
            r("number" === typeof t && t >= 0);
            var e = t % 26,
              n = (t - e) / 26,
              i = 1 << e;
            return !(this.length <= n) && !!(this.words[n] & i);
          }),
          (o.prototype.imaskn = function (t) {
            r("number" === typeof t && t >= 0);
            var e = t % 26,
              n = (t - e) / 26;
            if (
              (r(
                0 === this.negative,
                "imaskn works only with positive numbers"
              ),
              this.length <= n)
            )
              return this;
            if (
              (0 !== e && n++,
              (this.length = Math.min(n, this.length)),
              0 !== e)
            ) {
              var i = 67108863 ^ ((67108863 >>> e) << e);
              this.words[this.length - 1] &= i;
            }
            return this._strip();
          }),
          (o.prototype.maskn = function (t) {
            return this.clone().imaskn(t);
          }),
          (o.prototype.iaddn = function (t) {
            return (
              r("number" === typeof t),
              r(t < 67108864),
              t < 0
                ? this.isubn(-t)
                : 0 !== this.negative
                ? 1 === this.length && (0 | this.words[0]) <= t
                  ? ((this.words[0] = t - (0 | this.words[0])),
                    (this.negative = 0),
                    this)
                  : ((this.negative = 0),
                    this.isubn(t),
                    (this.negative = 1),
                    this)
                : this._iaddn(t)
            );
          }),
          (o.prototype._iaddn = function (t) {
            this.words[0] += t;
            for (var e = 0; e < this.length && this.words[e] >= 67108864; e++)
              (this.words[e] -= 67108864),
                e === this.length - 1
                  ? (this.words[e + 1] = 1)
                  : this.words[e + 1]++;
            return (this.length = Math.max(this.length, e + 1)), this;
          }),
          (o.prototype.isubn = function (t) {
            if ((r("number" === typeof t), r(t < 67108864), t < 0))
              return this.iaddn(-t);
            if (0 !== this.negative)
              return (
                (this.negative = 0), this.iaddn(t), (this.negative = 1), this
              );
            if (((this.words[0] -= t), 1 === this.length && this.words[0] < 0))
              (this.words[0] = -this.words[0]), (this.negative = 1);
            else
              for (var e = 0; e < this.length && this.words[e] < 0; e++)
                (this.words[e] += 67108864), (this.words[e + 1] -= 1);
            return this._strip();
          }),
          (o.prototype.addn = function (t) {
            return this.clone().iaddn(t);
          }),
          (o.prototype.subn = function (t) {
            return this.clone().isubn(t);
          }),
          (o.prototype.iabs = function () {
            return (this.negative = 0), this;
          }),
          (o.prototype.abs = function () {
            return this.clone().iabs();
          }),
          (o.prototype._ishlnsubmul = function (t, e, n) {
            var i,
              o,
              s = t.length + n;
            this._expand(s);
            var a = 0;
            for (i = 0; i < t.length; i++) {
              o = (0 | this.words[i + n]) + a;
              var c = (0 | t.words[i]) * e;
              (a = ((o -= 67108863 & c) >> 26) - ((c / 67108864) | 0)),
                (this.words[i + n] = 67108863 & o);
            }
            for (; i < this.length - n; i++)
              (a = (o = (0 | this.words[i + n]) + a) >> 26),
                (this.words[i + n] = 67108863 & o);
            if (0 === a) return this._strip();
            for (r(-1 === a), a = 0, i = 0; i < this.length; i++)
              (a = (o = -(0 | this.words[i]) + a) >> 26),
                (this.words[i] = 67108863 & o);
            return (this.negative = 1), this._strip();
          }),
          (o.prototype._wordDiv = function (t, e) {
            var n = (this.length, t.length),
              r = this.clone(),
              i = t,
              s = 0 | i.words[i.length - 1];
            0 !== (n = 26 - this._countBits(s)) &&
              ((i = i.ushln(n)), r.iushln(n), (s = 0 | i.words[i.length - 1]));
            var a,
              c = r.length - i.length;
            if ("mod" !== e) {
              ((a = new o(null)).length = c + 1),
                (a.words = new Array(a.length));
              for (var u = 0; u < a.length; u++) a.words[u] = 0;
            }
            var h = r.clone()._ishlnsubmul(i, 1, c);
            0 === h.negative && ((r = h), a && (a.words[c] = 1));
            for (var l = c - 1; l >= 0; l--) {
              var d =
                67108864 * (0 | r.words[i.length + l]) +
                (0 | r.words[i.length + l - 1]);
              for (
                d = Math.min((d / s) | 0, 67108863), r._ishlnsubmul(i, d, l);
                0 !== r.negative;

              )
                d--,
                  (r.negative = 0),
                  r._ishlnsubmul(i, 1, l),
                  r.isZero() || (r.negative ^= 1);
              a && (a.words[l] = d);
            }
            return (
              a && a._strip(),
              r._strip(),
              "div" !== e && 0 !== n && r.iushrn(n),
              { div: a || null, mod: r }
            );
          }),
          (o.prototype.divmod = function (t, e, n) {
            return (
              r(!t.isZero()),
              this.isZero()
                ? { div: new o(0), mod: new o(0) }
                : 0 !== this.negative && 0 === t.negative
                ? ((a = this.neg().divmod(t, e)),
                  "mod" !== e && (i = a.div.neg()),
                  "div" !== e &&
                    ((s = a.mod.neg()), n && 0 !== s.negative && s.iadd(t)),
                  { div: i, mod: s })
                : 0 === this.negative && 0 !== t.negative
                ? ((a = this.divmod(t.neg(), e)),
                  "mod" !== e && (i = a.div.neg()),
                  { div: i, mod: a.mod })
                : 0 !== (this.negative & t.negative)
                ? ((a = this.neg().divmod(t.neg(), e)),
                  "div" !== e &&
                    ((s = a.mod.neg()), n && 0 !== s.negative && s.isub(t)),
                  { div: a.div, mod: s })
                : t.length > this.length || this.cmp(t) < 0
                ? { div: new o(0), mod: this }
                : 1 === t.length
                ? "div" === e
                  ? { div: this.divn(t.words[0]), mod: null }
                  : "mod" === e
                  ? { div: null, mod: new o(this.modrn(t.words[0])) }
                  : {
                      div: this.divn(t.words[0]),
                      mod: new o(this.modrn(t.words[0])),
                    }
                : this._wordDiv(t, e)
            );
            var i, s, a;
          }),
          (o.prototype.div = function (t) {
            return this.divmod(t, "div", !1).div;
          }),
          (o.prototype.mod = function (t) {
            return this.divmod(t, "mod", !1).mod;
          }),
          (o.prototype.umod = function (t) {
            return this.divmod(t, "mod", !0).mod;
          }),
          (o.prototype.divRound = function (t) {
            var e = this.divmod(t);
            if (e.mod.isZero()) return e.div;
            var n = 0 !== e.div.negative ? e.mod.isub(t) : e.mod,
              r = t.ushrn(1),
              i = t.andln(1),
              o = n.cmp(r);
            return o < 0 || (1 === i && 0 === o)
              ? e.div
              : 0 !== e.div.negative
              ? e.div.isubn(1)
              : e.div.iaddn(1);
          }),
          (o.prototype.modrn = function (t) {
            var e = t < 0;
            e && (t = -t), r(t <= 67108863);
            for (var n = (1 << 26) % t, i = 0, o = this.length - 1; o >= 0; o--)
              i = (n * i + (0 | this.words[o])) % t;
            return e ? -i : i;
          }),
          (o.prototype.modn = function (t) {
            return this.modrn(t);
          }),
          (o.prototype.idivn = function (t) {
            var e = t < 0;
            e && (t = -t), r(t <= 67108863);
            for (var n = 0, i = this.length - 1; i >= 0; i--) {
              var o = (0 | this.words[i]) + 67108864 * n;
              (this.words[i] = (o / t) | 0), (n = o % t);
            }
            return this._strip(), e ? this.ineg() : this;
          }),
          (o.prototype.divn = function (t) {
            return this.clone().idivn(t);
          }),
          (o.prototype.egcd = function (t) {
            r(0 === t.negative), r(!t.isZero());
            var e = this,
              n = t.clone();
            e = 0 !== e.negative ? e.umod(t) : e.clone();
            for (
              var i = new o(1), s = new o(0), a = new o(0), c = new o(1), u = 0;
              e.isEven() && n.isEven();

            )
              e.iushrn(1), n.iushrn(1), ++u;
            for (var h = n.clone(), l = e.clone(); !e.isZero(); ) {
              for (
                var d = 0, f = 1;
                0 === (e.words[0] & f) && d < 26;
                ++d, f <<= 1
              );
              if (d > 0)
                for (e.iushrn(d); d-- > 0; )
                  (i.isOdd() || s.isOdd()) && (i.iadd(h), s.isub(l)),
                    i.iushrn(1),
                    s.iushrn(1);
              for (
                var p = 0, y = 1;
                0 === (n.words[0] & y) && p < 26;
                ++p, y <<= 1
              );
              if (p > 0)
                for (n.iushrn(p); p-- > 0; )
                  (a.isOdd() || c.isOdd()) && (a.iadd(h), c.isub(l)),
                    a.iushrn(1),
                    c.iushrn(1);
              e.cmp(n) >= 0
                ? (e.isub(n), i.isub(a), s.isub(c))
                : (n.isub(e), a.isub(i), c.isub(s));
            }
            return { a: a, b: c, gcd: n.iushln(u) };
          }),
          (o.prototype._invmp = function (t) {
            r(0 === t.negative), r(!t.isZero());
            var e = this,
              n = t.clone();
            e = 0 !== e.negative ? e.umod(t) : e.clone();
            for (
              var i, s = new o(1), a = new o(0), c = n.clone();
              e.cmpn(1) > 0 && n.cmpn(1) > 0;

            ) {
              for (
                var u = 0, h = 1;
                0 === (e.words[0] & h) && u < 26;
                ++u, h <<= 1
              );
              if (u > 0)
                for (e.iushrn(u); u-- > 0; )
                  s.isOdd() && s.iadd(c), s.iushrn(1);
              for (
                var l = 0, d = 1;
                0 === (n.words[0] & d) && l < 26;
                ++l, d <<= 1
              );
              if (l > 0)
                for (n.iushrn(l); l-- > 0; )
                  a.isOdd() && a.iadd(c), a.iushrn(1);
              e.cmp(n) >= 0 ? (e.isub(n), s.isub(a)) : (n.isub(e), a.isub(s));
            }
            return (i = 0 === e.cmpn(1) ? s : a).cmpn(0) < 0 && i.iadd(t), i;
          }),
          (o.prototype.gcd = function (t) {
            if (this.isZero()) return t.abs();
            if (t.isZero()) return this.abs();
            var e = this.clone(),
              n = t.clone();
            (e.negative = 0), (n.negative = 0);
            for (var r = 0; e.isEven() && n.isEven(); r++)
              e.iushrn(1), n.iushrn(1);
            for (;;) {
              for (; e.isEven(); ) e.iushrn(1);
              for (; n.isEven(); ) n.iushrn(1);
              var i = e.cmp(n);
              if (i < 0) {
                var o = e;
                (e = n), (n = o);
              } else if (0 === i || 0 === n.cmpn(1)) break;
              e.isub(n);
            }
            return n.iushln(r);
          }),
          (o.prototype.invm = function (t) {
            return this.egcd(t).a.umod(t);
          }),
          (o.prototype.isEven = function () {
            return 0 === (1 & this.words[0]);
          }),
          (o.prototype.isOdd = function () {
            return 1 === (1 & this.words[0]);
          }),
          (o.prototype.andln = function (t) {
            return this.words[0] & t;
          }),
          (o.prototype.bincn = function (t) {
            r("number" === typeof t);
            var e = t % 26,
              n = (t - e) / 26,
              i = 1 << e;
            if (this.length <= n)
              return this._expand(n + 1), (this.words[n] |= i), this;
            for (var o = i, s = n; 0 !== o && s < this.length; s++) {
              var a = 0 | this.words[s];
              (o = (a += o) >>> 26), (a &= 67108863), (this.words[s] = a);
            }
            return 0 !== o && ((this.words[s] = o), this.length++), this;
          }),
          (o.prototype.isZero = function () {
            return 1 === this.length && 0 === this.words[0];
          }),
          (o.prototype.cmpn = function (t) {
            var e,
              n = t < 0;
            if (0 !== this.negative && !n) return -1;
            if (0 === this.negative && n) return 1;
            if ((this._strip(), this.length > 1)) e = 1;
            else {
              n && (t = -t), r(t <= 67108863, "Number is too big");
              var i = 0 | this.words[0];
              e = i === t ? 0 : i < t ? -1 : 1;
            }
            return 0 !== this.negative ? 0 | -e : e;
          }),
          (o.prototype.cmp = function (t) {
            if (0 !== this.negative && 0 === t.negative) return -1;
            if (0 === this.negative && 0 !== t.negative) return 1;
            var e = this.ucmp(t);
            return 0 !== this.negative ? 0 | -e : e;
          }),
          (o.prototype.ucmp = function (t) {
            if (this.length > t.length) return 1;
            if (this.length < t.length) return -1;
            for (var e = 0, n = this.length - 1; n >= 0; n--) {
              var r = 0 | this.words[n],
                i = 0 | t.words[n];
              if (r !== i) {
                r < i ? (e = -1) : r > i && (e = 1);
                break;
              }
            }
            return e;
          }),
          (o.prototype.gtn = function (t) {
            return 1 === this.cmpn(t);
          }),
          (o.prototype.gt = function (t) {
            return 1 === this.cmp(t);
          }),
          (o.prototype.gten = function (t) {
            return this.cmpn(t) >= 0;
          }),
          (o.prototype.gte = function (t) {
            return this.cmp(t) >= 0;
          }),
          (o.prototype.ltn = function (t) {
            return -1 === this.cmpn(t);
          }),
          (o.prototype.lt = function (t) {
            return -1 === this.cmp(t);
          }),
          (o.prototype.lten = function (t) {
            return this.cmpn(t) <= 0;
          }),
          (o.prototype.lte = function (t) {
            return this.cmp(t) <= 0;
          }),
          (o.prototype.eqn = function (t) {
            return 0 === this.cmpn(t);
          }),
          (o.prototype.eq = function (t) {
            return 0 === this.cmp(t);
          }),
          (o.red = function (t) {
            return new _(t);
          }),
          (o.prototype.toRed = function (t) {
            return (
              r(!this.red, "Already a number in reduction context"),
              r(0 === this.negative, "red works only with positives"),
              t.convertTo(this)._forceRed(t)
            );
          }),
          (o.prototype.fromRed = function () {
            return (
              r(
                this.red,
                "fromRed works only with numbers in reduction context"
              ),
              this.red.convertFrom(this)
            );
          }),
          (o.prototype._forceRed = function (t) {
            return (this.red = t), this;
          }),
          (o.prototype.forceRed = function (t) {
            return (
              r(!this.red, "Already a number in reduction context"),
              this._forceRed(t)
            );
          }),
          (o.prototype.redAdd = function (t) {
            return (
              r(this.red, "redAdd works only with red numbers"),
              this.red.add(this, t)
            );
          }),
          (o.prototype.redIAdd = function (t) {
            return (
              r(this.red, "redIAdd works only with red numbers"),
              this.red.iadd(this, t)
            );
          }),
          (o.prototype.redSub = function (t) {
            return (
              r(this.red, "redSub works only with red numbers"),
              this.red.sub(this, t)
            );
          }),
          (o.prototype.redISub = function (t) {
            return (
              r(this.red, "redISub works only with red numbers"),
              this.red.isub(this, t)
            );
          }),
          (o.prototype.redShl = function (t) {
            return (
              r(this.red, "redShl works only with red numbers"),
              this.red.shl(this, t)
            );
          }),
          (o.prototype.redMul = function (t) {
            return (
              r(this.red, "redMul works only with red numbers"),
              this.red._verify2(this, t),
              this.red.mul(this, t)
            );
          }),
          (o.prototype.redIMul = function (t) {
            return (
              r(this.red, "redMul works only with red numbers"),
              this.red._verify2(this, t),
              this.red.imul(this, t)
            );
          }),
          (o.prototype.redSqr = function () {
            return (
              r(this.red, "redSqr works only with red numbers"),
              this.red._verify1(this),
              this.red.sqr(this)
            );
          }),
          (o.prototype.redISqr = function () {
            return (
              r(this.red, "redISqr works only with red numbers"),
              this.red._verify1(this),
              this.red.isqr(this)
            );
          }),
          (o.prototype.redSqrt = function () {
            return (
              r(this.red, "redSqrt works only with red numbers"),
              this.red._verify1(this),
              this.red.sqrt(this)
            );
          }),
          (o.prototype.redInvm = function () {
            return (
              r(this.red, "redInvm works only with red numbers"),
              this.red._verify1(this),
              this.red.invm(this)
            );
          }),
          (o.prototype.redNeg = function () {
            return (
              r(this.red, "redNeg works only with red numbers"),
              this.red._verify1(this),
              this.red.neg(this)
            );
          }),
          (o.prototype.redPow = function (t) {
            return (
              r(this.red && !t.red, "redPow(normalNum)"),
              this.red._verify1(this),
              this.red.pow(this, t)
            );
          });
        var v = { k256: null, p224: null, p192: null, p25519: null };
        function k(t, e) {
          (this.name = t),
            (this.p = new o(e, 16)),
            (this.n = this.p.bitLength()),
            (this.k = new o(1).iushln(this.n).isub(this.p)),
            (this.tmp = this._tmp());
        }
        function S() {
          k.call(
            this,
            "k256",
            "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
          );
        }
        function M() {
          k.call(
            this,
            "p224",
            "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001"
          );
        }
        function I() {
          k.call(
            this,
            "p192",
            "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff"
          );
        }
        function E() {
          k.call(
            this,
            "25519",
            "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"
          );
        }
        function _(t) {
          if ("string" === typeof t) {
            var e = o._prime(t);
            (this.m = e.p), (this.prime = e);
          } else
            r(t.gtn(1), "modulus must be greater than 1"),
              (this.m = t),
              (this.prime = null);
        }
        function A(t) {
          _.call(this, t),
            (this.shift = this.m.bitLength()),
            this.shift % 26 !== 0 && (this.shift += 26 - (this.shift % 26)),
            (this.r = new o(1).iushln(this.shift)),
            (this.r2 = this.imod(this.r.sqr())),
            (this.rinv = this.r._invmp(this.m)),
            (this.minv = this.rinv.mul(this.r).isubn(1).div(this.m)),
            (this.minv = this.minv.umod(this.r)),
            (this.minv = this.r.sub(this.minv));
        }
        (k.prototype._tmp = function () {
          var t = new o(null);
          return (t.words = new Array(Math.ceil(this.n / 13))), t;
        }),
          (k.prototype.ireduce = function (t) {
            var e,
              n = t;
            do {
              this.split(n, this.tmp),
                (e = (n = (n = this.imulK(n)).iadd(this.tmp)).bitLength());
            } while (e > this.n);
            var r = e < this.n ? -1 : n.ucmp(this.p);
            return (
              0 === r
                ? ((n.words[0] = 0), (n.length = 1))
                : r > 0
                ? n.isub(this.p)
                : void 0 !== n.strip
                ? n.strip()
                : n._strip(),
              n
            );
          }),
          (k.prototype.split = function (t, e) {
            t.iushrn(this.n, 0, e);
          }),
          (k.prototype.imulK = function (t) {
            return t.imul(this.k);
          }),
          i(S, k),
          (S.prototype.split = function (t, e) {
            for (var n = 4194303, r = Math.min(t.length, 9), i = 0; i < r; i++)
              e.words[i] = t.words[i];
            if (((e.length = r), t.length <= 9))
              return (t.words[0] = 0), void (t.length = 1);
            var o = t.words[9];
            for (e.words[e.length++] = o & n, i = 10; i < t.length; i++) {
              var s = 0 | t.words[i];
              (t.words[i - 10] = ((s & n) << 4) | (o >>> 22)), (o = s);
            }
            (o >>>= 22),
              (t.words[i - 10] = o),
              0 === o && t.length > 10 ? (t.length -= 10) : (t.length -= 9);
          }),
          (S.prototype.imulK = function (t) {
            (t.words[t.length] = 0),
              (t.words[t.length + 1] = 0),
              (t.length += 2);
            for (var e = 0, n = 0; n < t.length; n++) {
              var r = 0 | t.words[n];
              (e += 977 * r),
                (t.words[n] = 67108863 & e),
                (e = 64 * r + ((e / 67108864) | 0));
            }
            return (
              0 === t.words[t.length - 1] &&
                (t.length--, 0 === t.words[t.length - 1] && t.length--),
              t
            );
          }),
          i(M, k),
          i(I, k),
          i(E, k),
          (E.prototype.imulK = function (t) {
            for (var e = 0, n = 0; n < t.length; n++) {
              var r = 19 * (0 | t.words[n]) + e,
                i = 67108863 & r;
              (r >>>= 26), (t.words[n] = i), (e = r);
            }
            return 0 !== e && (t.words[t.length++] = e), t;
          }),
          (o._prime = function (t) {
            if (v[t]) return v[t];
            var e;
            if ("k256" === t) e = new S();
            else if ("p224" === t) e = new M();
            else if ("p192" === t) e = new I();
            else {
              if ("p25519" !== t) throw new Error("Unknown prime " + t);
              e = new E();
            }
            return (v[t] = e), e;
          }),
          (_.prototype._verify1 = function (t) {
            r(0 === t.negative, "red works only with positives"),
              r(t.red, "red works only with red numbers");
          }),
          (_.prototype._verify2 = function (t, e) {
            r(0 === (t.negative | e.negative), "red works only with positives"),
              r(t.red && t.red === e.red, "red works only with red numbers");
          }),
          (_.prototype.imod = function (t) {
            return this.prime
              ? this.prime.ireduce(t)._forceRed(this)
              : (h(t, t.umod(this.m)._forceRed(this)), t);
          }),
          (_.prototype.neg = function (t) {
            return t.isZero() ? t.clone() : this.m.sub(t)._forceRed(this);
          }),
          (_.prototype.add = function (t, e) {
            this._verify2(t, e);
            var n = t.add(e);
            return n.cmp(this.m) >= 0 && n.isub(this.m), n._forceRed(this);
          }),
          (_.prototype.iadd = function (t, e) {
            this._verify2(t, e);
            var n = t.iadd(e);
            return n.cmp(this.m) >= 0 && n.isub(this.m), n;
          }),
          (_.prototype.sub = function (t, e) {
            this._verify2(t, e);
            var n = t.sub(e);
            return n.cmpn(0) < 0 && n.iadd(this.m), n._forceRed(this);
          }),
          (_.prototype.isub = function (t, e) {
            this._verify2(t, e);
            var n = t.isub(e);
            return n.cmpn(0) < 0 && n.iadd(this.m), n;
          }),
          (_.prototype.shl = function (t, e) {
            return this._verify1(t), this.imod(t.ushln(e));
          }),
          (_.prototype.imul = function (t, e) {
            return this._verify2(t, e), this.imod(t.imul(e));
          }),
          (_.prototype.mul = function (t, e) {
            return this._verify2(t, e), this.imod(t.mul(e));
          }),
          (_.prototype.isqr = function (t) {
            return this.imul(t, t.clone());
          }),
          (_.prototype.sqr = function (t) {
            return this.mul(t, t);
          }),
          (_.prototype.sqrt = function (t) {
            if (t.isZero()) return t.clone();
            var e = this.m.andln(3);
            if ((r(e % 2 === 1), 3 === e)) {
              var n = this.m.add(new o(1)).iushrn(2);
              return this.pow(t, n);
            }
            for (
              var i = this.m.subn(1), s = 0;
              !i.isZero() && 0 === i.andln(1);

            )
              s++, i.iushrn(1);
            r(!i.isZero());
            var a = new o(1).toRed(this),
              c = a.redNeg(),
              u = this.m.subn(1).iushrn(1),
              h = this.m.bitLength();
            for (
              h = new o(2 * h * h).toRed(this);
              0 !== this.pow(h, u).cmp(c);

            )
              h.redIAdd(c);
            for (
              var l = this.pow(h, i),
                d = this.pow(t, i.addn(1).iushrn(1)),
                f = this.pow(t, i),
                p = s;
              0 !== f.cmp(a);

            ) {
              for (var y = f, g = 0; 0 !== y.cmp(a); g++) y = y.redSqr();
              r(g < p);
              var m = this.pow(l, new o(1).iushln(p - g - 1));
              (d = d.redMul(m)), (l = m.redSqr()), (f = f.redMul(l)), (p = g);
            }
            return d;
          }),
          (_.prototype.invm = function (t) {
            var e = t._invmp(this.m);
            return 0 !== e.negative
              ? ((e.negative = 0), this.imod(e).redNeg())
              : this.imod(e);
          }),
          (_.prototype.pow = function (t, e) {
            if (e.isZero()) return new o(1).toRed(this);
            if (0 === e.cmpn(1)) return t.clone();
            var n = new Array(16);
            (n[0] = new o(1).toRed(this)), (n[1] = t);
            for (var r = 2; r < n.length; r++) n[r] = this.mul(n[r - 1], t);
            var i = n[0],
              s = 0,
              a = 0,
              c = e.bitLength() % 26;
            for (0 === c && (c = 26), r = e.length - 1; r >= 0; r--) {
              for (var u = e.words[r], h = c - 1; h >= 0; h--) {
                var l = (u >> h) & 1;
                i !== n[0] && (i = this.sqr(i)),
                  0 !== l || 0 !== s
                    ? ((s <<= 1),
                      (s |= l),
                      (4 === ++a || (0 === r && 0 === h)) &&
                        ((i = this.mul(i, n[s])), (a = 0), (s = 0)))
                    : (a = 0);
              }
              c = 26;
            }
            return i;
          }),
          (_.prototype.convertTo = function (t) {
            var e = t.umod(this.m);
            return e === t ? e.clone() : e;
          }),
          (_.prototype.convertFrom = function (t) {
            var e = t.clone();
            return (e.red = null), e;
          }),
          (o.mont = function (t) {
            return new A(t);
          }),
          i(A, _),
          (A.prototype.convertTo = function (t) {
            return this.imod(t.ushln(this.shift));
          }),
          (A.prototype.convertFrom = function (t) {
            var e = this.imod(t.mul(this.rinv));
            return (e.red = null), e;
          }),
          (A.prototype.imul = function (t, e) {
            if (t.isZero() || e.isZero())
              return (t.words[0] = 0), (t.length = 1), t;
            var n = t.imul(e),
              r = n
                .maskn(this.shift)
                .mul(this.minv)
                .imaskn(this.shift)
                .mul(this.m),
              i = n.isub(r).iushrn(this.shift),
              o = i;
            return (
              i.cmp(this.m) >= 0
                ? (o = i.isub(this.m))
                : i.cmpn(0) < 0 && (o = i.iadd(this.m)),
              o._forceRed(this)
            );
          }),
          (A.prototype.mul = function (t, e) {
            if (t.isZero() || e.isZero()) return new o(0)._forceRed(this);
            var n = t.mul(e),
              r = n
                .maskn(this.shift)
                .mul(this.minv)
                .imaskn(this.shift)
                .mul(this.m),
              i = n.isub(r).iushrn(this.shift),
              s = i;
            return (
              i.cmp(this.m) >= 0
                ? (s = i.isub(this.m))
                : i.cmpn(0) < 0 && (s = i.iadd(this.m)),
              s._forceRed(this)
            );
          }),
          (A.prototype.invm = function (t) {
            return this.imod(t._invmp(this.m).mul(this.r2))._forceRed(this);
          });
      })((t = n.nmd(t)), this);
    },
    5532: function (t, e, n) {
      "use strict";
      var r = n(8764).Buffer,
        i =
          (this && this.__createBinding) ||
          (Object.create
            ? function (t, e, n, r) {
                void 0 === r && (r = n),
                  Object.defineProperty(t, r, {
                    enumerable: !0,
                    get: function () {
                      return e[n];
                    },
                  });
              }
            : function (t, e, n, r) {
                void 0 === r && (r = n), (t[r] = e[n]);
              }),
        o =
          (this && this.__setModuleDefault) ||
          (Object.create
            ? function (t, e) {
                Object.defineProperty(t, "default", {
                  enumerable: !0,
                  value: e,
                });
              }
            : function (t, e) {
                t.default = e;
              }),
        s =
          (this && this.__decorate) ||
          function (t, e, n, r) {
            var i,
              o = arguments.length,
              s =
                o < 3
                  ? e
                  : null === r
                  ? (r = Object.getOwnPropertyDescriptor(e, n))
                  : r;
            if (
              "object" === typeof Reflect &&
              "function" === typeof Reflect.decorate
            )
              s = Reflect.decorate(t, e, n, r);
            else
              for (var a = t.length - 1; a >= 0; a--)
                (i = t[a]) &&
                  (s = (o < 3 ? i(s) : o > 3 ? i(e, n, s) : i(e, n)) || s);
            return o > 3 && s && Object.defineProperty(e, n, s), s;
          },
        a =
          (this && this.__importStar) ||
          function (t) {
            if (t && t.__esModule) return t;
            var e = {};
            if (null != t)
              for (var n in t)
                "default" !== n &&
                  Object.hasOwnProperty.call(t, n) &&
                  i(e, t, n);
            return o(e, t), e;
          },
        c =
          (this && this.__importDefault) ||
          function (t) {
            return t && t.__esModule ? t : { default: t };
          };
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.deserializeUnchecked =
          e.deserialize =
          e.serialize =
          e.BinaryReader =
          e.BinaryWriter =
          e.BorshError =
          e.baseDecode =
          e.baseEncode =
            void 0);
      const u = c(n(3550)),
        h = c(n(7191)),
        l = a(n(1127)),
        d = new (
          "function" !== typeof TextDecoder ? l.TextDecoder : TextDecoder
        )("utf-8", { fatal: !0 });
      (e.baseEncode = function (t) {
        return (
          "string" === typeof t && (t = r.from(t, "utf8")),
          h.default.encode(r.from(t))
        );
      }),
        (e.baseDecode = function (t) {
          return r.from(h.default.decode(t));
        });
      const f = 1024;
      class p extends Error {
        constructor(t) {
          super(t), (this.fieldPath = []), (this.originalMessage = t);
        }
        addToFieldPath(t) {
          this.fieldPath.splice(0, 0, t),
            (this.message =
              this.originalMessage + ": " + this.fieldPath.join("."));
        }
      }
      e.BorshError = p;
      class y {
        constructor() {
          (this.buf = r.alloc(f)), (this.length = 0);
        }
        maybeResize() {
          this.buf.length < 16 + this.length &&
            (this.buf = r.concat([this.buf, r.alloc(f)]));
        }
        writeU8(t) {
          this.maybeResize(),
            this.buf.writeUInt8(t, this.length),
            (this.length += 1);
        }
        writeU16(t) {
          this.maybeResize(),
            this.buf.writeUInt16LE(t, this.length),
            (this.length += 2);
        }
        writeU32(t) {
          this.maybeResize(),
            this.buf.writeUInt32LE(t, this.length),
            (this.length += 4);
        }
        writeU64(t) {
          this.maybeResize(),
            this.writeBuffer(r.from(new u.default(t).toArray("le", 8)));
        }
        writeU128(t) {
          this.maybeResize(),
            this.writeBuffer(r.from(new u.default(t).toArray("le", 16)));
        }
        writeU256(t) {
          this.maybeResize(),
            this.writeBuffer(r.from(new u.default(t).toArray("le", 32)));
        }
        writeU512(t) {
          this.maybeResize(),
            this.writeBuffer(r.from(new u.default(t).toArray("le", 64)));
        }
        writeBuffer(t) {
          (this.buf = r.concat([
            r.from(this.buf.subarray(0, this.length)),
            t,
            r.alloc(f),
          ])),
            (this.length += t.length);
        }
        writeString(t) {
          this.maybeResize();
          const e = r.from(t, "utf8");
          this.writeU32(e.length), this.writeBuffer(e);
        }
        writeFixedArray(t) {
          this.writeBuffer(r.from(t));
        }
        writeArray(t, e) {
          this.maybeResize(), this.writeU32(t.length);
          for (const n of t) this.maybeResize(), e(n);
        }
        toArray() {
          return this.buf.subarray(0, this.length);
        }
      }
      function g(t, e, n) {
        const r = n.value;
        n.value = function (...t) {
          try {
            return r.apply(this, t);
          } catch (e) {
            if (e instanceof RangeError) {
              const t = e.code;
              if (
                ["ERR_BUFFER_OUT_OF_BOUNDS", "ERR_OUT_OF_RANGE"].indexOf(t) >= 0
              )
                throw new p("Reached the end of buffer when deserializing");
            }
            throw e;
          }
        };
      }
      e.BinaryWriter = y;
      class m {
        constructor(t) {
          (this.buf = t), (this.offset = 0);
        }
        readU8() {
          const t = this.buf.readUInt8(this.offset);
          return (this.offset += 1), t;
        }
        readU16() {
          const t = this.buf.readUInt16LE(this.offset);
          return (this.offset += 2), t;
        }
        readU32() {
          const t = this.buf.readUInt32LE(this.offset);
          return (this.offset += 4), t;
        }
        readU64() {
          const t = this.readBuffer(8);
          return new u.default(t, "le");
        }
        readU128() {
          const t = this.readBuffer(16);
          return new u.default(t, "le");
        }
        readU256() {
          const t = this.readBuffer(32);
          return new u.default(t, "le");
        }
        readU512() {
          const t = this.readBuffer(64);
          return new u.default(t, "le");
        }
        readBuffer(t) {
          if (this.offset + t > this.buf.length)
            throw new p(`Expected buffer length ${t} isn't within bounds`);
          const e = this.buf.slice(this.offset, this.offset + t);
          return (this.offset += t), e;
        }
        readString() {
          const t = this.readU32(),
            e = this.readBuffer(t);
          try {
            return d.decode(e);
          } catch (n) {
            throw new p(`Error decoding UTF-8 string: ${n}`);
          }
        }
        readFixedArray(t) {
          return new Uint8Array(this.readBuffer(t));
        }
        readArray(t) {
          const e = this.readU32(),
            n = Array();
          for (let r = 0; r < e; ++r) n.push(t());
          return n;
        }
      }
      function w(t) {
        return t.charAt(0).toUpperCase() + t.slice(1);
      }
      function b(t, e, n, r, i) {
        try {
          if ("string" === typeof r) i[`write${w(r)}`](n);
          else if (r instanceof Array)
            if ("number" === typeof r[0]) {
              if (n.length !== r[0])
                throw new p(
                  `Expecting byte array of length ${r[0]}, but got ${n.length} bytes`
                );
              i.writeFixedArray(n);
            } else if (2 === r.length && "number" === typeof r[1]) {
              if (n.length !== r[1])
                throw new p(
                  `Expecting byte array of length ${r[1]}, but got ${n.length} bytes`
                );
              for (let e = 0; e < r[1]; e++) b(t, null, n[e], r[0], i);
            } else
              i.writeArray(n, (n) => {
                b(t, e, n, r[0], i);
              });
          else if (void 0 !== r.kind)
            switch (r.kind) {
              case "option":
                null === n || void 0 === n
                  ? i.writeU8(0)
                  : (i.writeU8(1), b(t, e, n, r.type, i));
                break;
              case "map":
                i.writeU32(n.size),
                  n.forEach((n, o) => {
                    b(t, e, o, r.key, i), b(t, e, n, r.value, i);
                  });
                break;
              default:
                throw new p(`FieldType ${r} unrecognized`);
            }
          else v(t, n, i);
        } catch (o) {
          throw (o instanceof p && o.addToFieldPath(e), o);
        }
      }
      function v(t, e, n) {
        if ("function" === typeof e.borshSerialize)
          return void e.borshSerialize(n);
        const r = t.get(e.constructor);
        if (!r) throw new p(`Class ${e.constructor.name} is missing in schema`);
        if ("struct" === r.kind)
          r.fields.map(([r, i]) => {
            b(t, r, e[r], i, n);
          });
        else {
          if ("enum" !== r.kind)
            throw new p(
              `Unexpected schema kind: ${r.kind} for ${e.constructor.name}`
            );
          {
            const i = e[r.field];
            for (let o = 0; o < r.values.length; ++o) {
              const [s, a] = r.values[o];
              if (s === i) {
                n.writeU8(o), b(t, s, e[s], a, n);
                break;
              }
            }
          }
        }
      }
      function k(t, e, n, r) {
        try {
          if ("string" === typeof n) return r[`read${w(n)}`]();
          if (n instanceof Array) {
            if ("number" === typeof n[0]) return r.readFixedArray(n[0]);
            if ("number" === typeof n[1]) {
              const e = [];
              for (let i = 0; i < n[1]; i++) e.push(k(t, null, n[0], r));
              return e;
            }
            return r.readArray(() => k(t, e, n[0], r));
          }
          if ("option" === n.kind) {
            return r.readU8() ? k(t, e, n.type, r) : void 0;
          }
          if ("map" === n.kind) {
            let i = new Map();
            const o = r.readU32();
            for (let s = 0; s < o; s++) {
              const o = k(t, e, n.key, r),
                s = k(t, e, n.value, r);
              i.set(o, s);
            }
            return i;
          }
          return S(t, n, r);
        } catch (i) {
          throw (i instanceof p && i.addToFieldPath(e), i);
        }
      }
      function S(t, e, n) {
        if ("function" === typeof e.borshDeserialize)
          return e.borshDeserialize(n);
        const r = t.get(e);
        if (!r) throw new p(`Class ${e.name} is missing in schema`);
        if ("struct" === r.kind) {
          const r = {};
          for (const [i, o] of t.get(e).fields) r[i] = k(t, i, o, n);
          return new e(r);
        }
        if ("enum" === r.kind) {
          const i = n.readU8();
          if (i >= r.values.length)
            throw new p(`Enum index: ${i} is out of range`);
          const [o, s] = r.values[i];
          return new e({ [o]: k(t, o, s, n) });
        }
        throw new p(
          `Unexpected schema kind: ${r.kind} for ${e.constructor.name}`
        );
      }
      s([g], m.prototype, "readU8", null),
        s([g], m.prototype, "readU16", null),
        s([g], m.prototype, "readU32", null),
        s([g], m.prototype, "readU64", null),
        s([g], m.prototype, "readU128", null),
        s([g], m.prototype, "readU256", null),
        s([g], m.prototype, "readU512", null),
        s([g], m.prototype, "readString", null),
        s([g], m.prototype, "readFixedArray", null),
        s([g], m.prototype, "readArray", null),
        (e.BinaryReader = m),
        (e.serialize = function (t, e, n = y) {
          const r = new n();
          return v(t, e, r), r.toArray();
        }),
        (e.deserialize = function (t, e, n, r = m) {
          const i = new r(n),
            o = S(t, e, i);
          if (i.offset < n.length)
            throw new p(
              `Unexpected ${n.length - i.offset} bytes after deserialized data`
            );
          return o;
        }),
        (e.deserializeUnchecked = function (t, e, n, r = m) {
          return S(t, e, new r(n));
        });
    },
    7191: function (t, e, n) {
      var r = n(8162);
      t.exports = r(
        "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
      );
    },
    8764: function (t, e, n) {
      "use strict";
      const r = n(9742),
        i = n(645),
        o =
          "function" === typeof Symbol && "function" === typeof Symbol.for
            ? Symbol.for("nodejs.util.inspect.custom")
            : null;
      (e.Buffer = c),
        (e.SlowBuffer = function (t) {
          +t != t && (t = 0);
          return c.alloc(+t);
        }),
        (e.INSPECT_MAX_BYTES = 50);
      const s = 2147483647;
      function a(t) {
        if (t > s)
          throw new RangeError(
            'The value "' + t + '" is invalid for option "size"'
          );
        const e = new Uint8Array(t);
        return Object.setPrototypeOf(e, c.prototype), e;
      }
      function c(t, e, n) {
        if ("number" === typeof t) {
          if ("string" === typeof e)
            throw new TypeError(
              'The "string" argument must be of type string. Received type number'
            );
          return l(t);
        }
        return u(t, e, n);
      }
      function u(t, e, n) {
        if ("string" === typeof t)
          return (function (t, e) {
            ("string" === typeof e && "" !== e) || (e = "utf8");
            if (!c.isEncoding(e)) throw new TypeError("Unknown encoding: " + e);
            const n = 0 | y(t, e);
            let r = a(n);
            const i = r.write(t, e);
            i !== n && (r = r.slice(0, i));
            return r;
          })(t, e);
        if (ArrayBuffer.isView(t))
          return (function (t) {
            if (Z(t, Uint8Array)) {
              const e = new Uint8Array(t);
              return f(e.buffer, e.byteOffset, e.byteLength);
            }
            return d(t);
          })(t);
        if (null == t)
          throw new TypeError(
            "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
              typeof t
          );
        if (Z(t, ArrayBuffer) || (t && Z(t.buffer, ArrayBuffer)))
          return f(t, e, n);
        if (
          "undefined" !== typeof SharedArrayBuffer &&
          (Z(t, SharedArrayBuffer) || (t && Z(t.buffer, SharedArrayBuffer)))
        )
          return f(t, e, n);
        if ("number" === typeof t)
          throw new TypeError(
            'The "value" argument must not be of type number. Received type number'
          );
        const r = t.valueOf && t.valueOf();
        if (null != r && r !== t) return c.from(r, e, n);
        const i = (function (t) {
          if (c.isBuffer(t)) {
            const e = 0 | p(t.length),
              n = a(e);
            return 0 === n.length || t.copy(n, 0, 0, e), n;
          }
          if (void 0 !== t.length)
            return "number" !== typeof t.length || G(t.length) ? a(0) : d(t);
          if ("Buffer" === t.type && Array.isArray(t.data)) return d(t.data);
        })(t);
        if (i) return i;
        if (
          "undefined" !== typeof Symbol &&
          null != Symbol.toPrimitive &&
          "function" === typeof t[Symbol.toPrimitive]
        )
          return c.from(t[Symbol.toPrimitive]("string"), e, n);
        throw new TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
            typeof t
        );
      }
      function h(t) {
        if ("number" !== typeof t)
          throw new TypeError('"size" argument must be of type number');
        if (t < 0)
          throw new RangeError(
            'The value "' + t + '" is invalid for option "size"'
          );
      }
      function l(t) {
        return h(t), a(t < 0 ? 0 : 0 | p(t));
      }
      function d(t) {
        const e = t.length < 0 ? 0 : 0 | p(t.length),
          n = a(e);
        for (let r = 0; r < e; r += 1) n[r] = 255 & t[r];
        return n;
      }
      function f(t, e, n) {
        if (e < 0 || t.byteLength < e)
          throw new RangeError('"offset" is outside of buffer bounds');
        if (t.byteLength < e + (n || 0))
          throw new RangeError('"length" is outside of buffer bounds');
        let r;
        return (
          (r =
            void 0 === e && void 0 === n
              ? new Uint8Array(t)
              : void 0 === n
              ? new Uint8Array(t, e)
              : new Uint8Array(t, e, n)),
          Object.setPrototypeOf(r, c.prototype),
          r
        );
      }
      function p(t) {
        if (t >= s)
          throw new RangeError(
            "Attempt to allocate Buffer larger than maximum size: 0x" +
              s.toString(16) +
              " bytes"
          );
        return 0 | t;
      }
      function y(t, e) {
        if (c.isBuffer(t)) return t.length;
        if (ArrayBuffer.isView(t) || Z(t, ArrayBuffer)) return t.byteLength;
        if ("string" !== typeof t)
          throw new TypeError(
            'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' +
              typeof t
          );
        const n = t.length,
          r = arguments.length > 2 && !0 === arguments[2];
        if (!r && 0 === n) return 0;
        let i = !1;
        for (;;)
          switch (e) {
            case "ascii":
            case "latin1":
            case "binary":
              return n;
            case "utf8":
            case "utf-8":
              return Y(t).length;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return 2 * n;
            case "hex":
              return n >>> 1;
            case "base64":
              return V(t).length;
            default:
              if (i) return r ? -1 : Y(t).length;
              (e = ("" + e).toLowerCase()), (i = !0);
          }
      }
      function g(t, e, n) {
        let r = !1;
        if (((void 0 === e || e < 0) && (e = 0), e > this.length)) return "";
        if (((void 0 === n || n > this.length) && (n = this.length), n <= 0))
          return "";
        if ((n >>>= 0) <= (e >>>= 0)) return "";
        for (t || (t = "utf8"); ; )
          switch (t) {
            case "hex":
              return T(this, e, n);
            case "utf8":
            case "utf-8":
              return _(this, e, n);
            case "ascii":
              return x(this, e, n);
            case "latin1":
            case "binary":
              return L(this, e, n);
            case "base64":
              return E(this, e, n);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return N(this, e, n);
            default:
              if (r) throw new TypeError("Unknown encoding: " + t);
              (t = (t + "").toLowerCase()), (r = !0);
          }
      }
      function m(t, e, n) {
        const r = t[e];
        (t[e] = t[n]), (t[n] = r);
      }
      function w(t, e, n, r, i) {
        if (0 === t.length) return -1;
        if (
          ("string" === typeof n
            ? ((r = n), (n = 0))
            : n > 2147483647
            ? (n = 2147483647)
            : n < -2147483648 && (n = -2147483648),
          G((n = +n)) && (n = i ? 0 : t.length - 1),
          n < 0 && (n = t.length + n),
          n >= t.length)
        ) {
          if (i) return -1;
          n = t.length - 1;
        } else if (n < 0) {
          if (!i) return -1;
          n = 0;
        }
        if (("string" === typeof e && (e = c.from(e, r)), c.isBuffer(e)))
          return 0 === e.length ? -1 : b(t, e, n, r, i);
        if ("number" === typeof e)
          return (
            (e &= 255),
            "function" === typeof Uint8Array.prototype.indexOf
              ? i
                ? Uint8Array.prototype.indexOf.call(t, e, n)
                : Uint8Array.prototype.lastIndexOf.call(t, e, n)
              : b(t, [e], n, r, i)
          );
        throw new TypeError("val must be string, number or Buffer");
      }
      function b(t, e, n, r, i) {
        let o,
          s = 1,
          a = t.length,
          c = e.length;
        if (
          void 0 !== r &&
          ("ucs2" === (r = String(r).toLowerCase()) ||
            "ucs-2" === r ||
            "utf16le" === r ||
            "utf-16le" === r)
        ) {
          if (t.length < 2 || e.length < 2) return -1;
          (s = 2), (a /= 2), (c /= 2), (n /= 2);
        }
        function u(t, e) {
          return 1 === s ? t[e] : t.readUInt16BE(e * s);
        }
        if (i) {
          let r = -1;
          for (o = n; o < a; o++)
            if (u(t, o) === u(e, -1 === r ? 0 : o - r)) {
              if ((-1 === r && (r = o), o - r + 1 === c)) return r * s;
            } else -1 !== r && (o -= o - r), (r = -1);
        } else
          for (n + c > a && (n = a - c), o = n; o >= 0; o--) {
            let n = !0;
            for (let r = 0; r < c; r++)
              if (u(t, o + r) !== u(e, r)) {
                n = !1;
                break;
              }
            if (n) return o;
          }
        return -1;
      }
      function v(t, e, n, r) {
        n = Number(n) || 0;
        const i = t.length - n;
        r ? (r = Number(r)) > i && (r = i) : (r = i);
        const o = e.length;
        let s;
        for (r > o / 2 && (r = o / 2), s = 0; s < r; ++s) {
          const r = parseInt(e.substr(2 * s, 2), 16);
          if (G(r)) return s;
          t[n + s] = r;
        }
        return s;
      }
      function k(t, e, n, r) {
        return $(Y(e, t.length - n), t, n, r);
      }
      function S(t, e, n, r) {
        return $(
          (function (t) {
            const e = [];
            for (let n = 0; n < t.length; ++n) e.push(255 & t.charCodeAt(n));
            return e;
          })(e),
          t,
          n,
          r
        );
      }
      function M(t, e, n, r) {
        return $(V(e), t, n, r);
      }
      function I(t, e, n, r) {
        return $(
          (function (t, e) {
            let n, r, i;
            const o = [];
            for (let s = 0; s < t.length && !((e -= 2) < 0); ++s)
              (n = t.charCodeAt(s)),
                (r = n >> 8),
                (i = n % 256),
                o.push(i),
                o.push(r);
            return o;
          })(e, t.length - n),
          t,
          n,
          r
        );
      }
      function E(t, e, n) {
        return 0 === e && n === t.length
          ? r.fromByteArray(t)
          : r.fromByteArray(t.slice(e, n));
      }
      function _(t, e, n) {
        n = Math.min(t.length, n);
        const r = [];
        let i = e;
        for (; i < n; ) {
          const e = t[i];
          let o = null,
            s = e > 239 ? 4 : e > 223 ? 3 : e > 191 ? 2 : 1;
          if (i + s <= n) {
            let n, r, a, c;
            switch (s) {
              case 1:
                e < 128 && (o = e);
                break;
              case 2:
                (n = t[i + 1]),
                  128 === (192 & n) &&
                    ((c = ((31 & e) << 6) | (63 & n)), c > 127 && (o = c));
                break;
              case 3:
                (n = t[i + 1]),
                  (r = t[i + 2]),
                  128 === (192 & n) &&
                    128 === (192 & r) &&
                    ((c = ((15 & e) << 12) | ((63 & n) << 6) | (63 & r)),
                    c > 2047 && (c < 55296 || c > 57343) && (o = c));
                break;
              case 4:
                (n = t[i + 1]),
                  (r = t[i + 2]),
                  (a = t[i + 3]),
                  128 === (192 & n) &&
                    128 === (192 & r) &&
                    128 === (192 & a) &&
                    ((c =
                      ((15 & e) << 18) |
                      ((63 & n) << 12) |
                      ((63 & r) << 6) |
                      (63 & a)),
                    c > 65535 && c < 1114112 && (o = c));
            }
          }
          null === o
            ? ((o = 65533), (s = 1))
            : o > 65535 &&
              ((o -= 65536),
              r.push(((o >>> 10) & 1023) | 55296),
              (o = 56320 | (1023 & o))),
            r.push(o),
            (i += s);
        }
        return (function (t) {
          const e = t.length;
          if (e <= A) return String.fromCharCode.apply(String, t);
          let n = "",
            r = 0;
          for (; r < e; )
            n += String.fromCharCode.apply(String, t.slice(r, (r += A)));
          return n;
        })(r);
      }
      (e.kMaxLength = s),
        (c.TYPED_ARRAY_SUPPORT = (function () {
          try {
            const t = new Uint8Array(1),
              e = {
                foo: function () {
                  return 42;
                },
              };
            return (
              Object.setPrototypeOf(e, Uint8Array.prototype),
              Object.setPrototypeOf(t, e),
              42 === t.foo()
            );
          } catch (t) {
            return !1;
          }
        })()),
        c.TYPED_ARRAY_SUPPORT ||
          "undefined" === typeof console ||
          "function" !== typeof console.error ||
          console.error(
            "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
          ),
        Object.defineProperty(c.prototype, "parent", {
          enumerable: !0,
          get: function () {
            if (c.isBuffer(this)) return this.buffer;
          },
        }),
        Object.defineProperty(c.prototype, "offset", {
          enumerable: !0,
          get: function () {
            if (c.isBuffer(this)) return this.byteOffset;
          },
        }),
        (c.poolSize = 8192),
        (c.from = function (t, e, n) {
          return u(t, e, n);
        }),
        Object.setPrototypeOf(c.prototype, Uint8Array.prototype),
        Object.setPrototypeOf(c, Uint8Array),
        (c.alloc = function (t, e, n) {
          return (function (t, e, n) {
            return (
              h(t),
              t <= 0
                ? a(t)
                : void 0 !== e
                ? "string" === typeof n
                  ? a(t).fill(e, n)
                  : a(t).fill(e)
                : a(t)
            );
          })(t, e, n);
        }),
        (c.allocUnsafe = function (t) {
          return l(t);
        }),
        (c.allocUnsafeSlow = function (t) {
          return l(t);
        }),
        (c.isBuffer = function (t) {
          return null != t && !0 === t._isBuffer && t !== c.prototype;
        }),
        (c.compare = function (t, e) {
          if (
            (Z(t, Uint8Array) && (t = c.from(t, t.offset, t.byteLength)),
            Z(e, Uint8Array) && (e = c.from(e, e.offset, e.byteLength)),
            !c.isBuffer(t) || !c.isBuffer(e))
          )
            throw new TypeError(
              'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
            );
          if (t === e) return 0;
          let n = t.length,
            r = e.length;
          for (let i = 0, o = Math.min(n, r); i < o; ++i)
            if (t[i] !== e[i]) {
              (n = t[i]), (r = e[i]);
              break;
            }
          return n < r ? -1 : r < n ? 1 : 0;
        }),
        (c.isEncoding = function (t) {
          switch (String(t).toLowerCase()) {
            case "hex":
            case "utf8":
            case "utf-8":
            case "ascii":
            case "latin1":
            case "binary":
            case "base64":
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return !0;
            default:
              return !1;
          }
        }),
        (c.concat = function (t, e) {
          if (!Array.isArray(t))
            throw new TypeError('"list" argument must be an Array of Buffers');
          if (0 === t.length) return c.alloc(0);
          let n;
          if (void 0 === e)
            for (e = 0, n = 0; n < t.length; ++n) e += t[n].length;
          const r = c.allocUnsafe(e);
          let i = 0;
          for (n = 0; n < t.length; ++n) {
            let e = t[n];
            if (Z(e, Uint8Array))
              i + e.length > r.length
                ? (c.isBuffer(e) || (e = c.from(e)), e.copy(r, i))
                : Uint8Array.prototype.set.call(r, e, i);
            else {
              if (!c.isBuffer(e))
                throw new TypeError(
                  '"list" argument must be an Array of Buffers'
                );
              e.copy(r, i);
            }
            i += e.length;
          }
          return r;
        }),
        (c.byteLength = y),
        (c.prototype._isBuffer = !0),
        (c.prototype.swap16 = function () {
          const t = this.length;
          if (t % 2 !== 0)
            throw new RangeError("Buffer size must be a multiple of 16-bits");
          for (let e = 0; e < t; e += 2) m(this, e, e + 1);
          return this;
        }),
        (c.prototype.swap32 = function () {
          const t = this.length;
          if (t % 4 !== 0)
            throw new RangeError("Buffer size must be a multiple of 32-bits");
          for (let e = 0; e < t; e += 4)
            m(this, e, e + 3), m(this, e + 1, e + 2);
          return this;
        }),
        (c.prototype.swap64 = function () {
          const t = this.length;
          if (t % 8 !== 0)
            throw new RangeError("Buffer size must be a multiple of 64-bits");
          for (let e = 0; e < t; e += 8)
            m(this, e, e + 7),
              m(this, e + 1, e + 6),
              m(this, e + 2, e + 5),
              m(this, e + 3, e + 4);
          return this;
        }),
        (c.prototype.toString = function () {
          const t = this.length;
          return 0 === t
            ? ""
            : 0 === arguments.length
            ? _(this, 0, t)
            : g.apply(this, arguments);
        }),
        (c.prototype.toLocaleString = c.prototype.toString),
        (c.prototype.equals = function (t) {
          if (!c.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
          return this === t || 0 === c.compare(this, t);
        }),
        (c.prototype.inspect = function () {
          let t = "";
          const n = e.INSPECT_MAX_BYTES;
          return (
            (t = this.toString("hex", 0, n)
              .replace(/(.{2})/g, "$1 ")
              .trim()),
            this.length > n && (t += " ... "),
            "<Buffer " + t + ">"
          );
        }),
        o && (c.prototype[o] = c.prototype.inspect),
        (c.prototype.compare = function (t, e, n, r, i) {
          if (
            (Z(t, Uint8Array) && (t = c.from(t, t.offset, t.byteLength)),
            !c.isBuffer(t))
          )
            throw new TypeError(
              'The "target" argument must be one of type Buffer or Uint8Array. Received type ' +
                typeof t
            );
          if (
            (void 0 === e && (e = 0),
            void 0 === n && (n = t ? t.length : 0),
            void 0 === r && (r = 0),
            void 0 === i && (i = this.length),
            e < 0 || n > t.length || r < 0 || i > this.length)
          )
            throw new RangeError("out of range index");
          if (r >= i && e >= n) return 0;
          if (r >= i) return -1;
          if (e >= n) return 1;
          if (this === t) return 0;
          let o = (i >>>= 0) - (r >>>= 0),
            s = (n >>>= 0) - (e >>>= 0);
          const a = Math.min(o, s),
            u = this.slice(r, i),
            h = t.slice(e, n);
          for (let c = 0; c < a; ++c)
            if (u[c] !== h[c]) {
              (o = u[c]), (s = h[c]);
              break;
            }
          return o < s ? -1 : s < o ? 1 : 0;
        }),
        (c.prototype.includes = function (t, e, n) {
          return -1 !== this.indexOf(t, e, n);
        }),
        (c.prototype.indexOf = function (t, e, n) {
          return w(this, t, e, n, !0);
        }),
        (c.prototype.lastIndexOf = function (t, e, n) {
          return w(this, t, e, n, !1);
        }),
        (c.prototype.write = function (t, e, n, r) {
          if (void 0 === e) (r = "utf8"), (n = this.length), (e = 0);
          else if (void 0 === n && "string" === typeof e)
            (r = e), (n = this.length), (e = 0);
          else {
            if (!isFinite(e))
              throw new Error(
                "Buffer.write(string, encoding, offset[, length]) is no longer supported"
              );
            (e >>>= 0),
              isFinite(n)
                ? ((n >>>= 0), void 0 === r && (r = "utf8"))
                : ((r = n), (n = void 0));
          }
          const i = this.length - e;
          if (
            ((void 0 === n || n > i) && (n = i),
            (t.length > 0 && (n < 0 || e < 0)) || e > this.length)
          )
            throw new RangeError("Attempt to write outside buffer bounds");
          r || (r = "utf8");
          let o = !1;
          for (;;)
            switch (r) {
              case "hex":
                return v(this, t, e, n);
              case "utf8":
              case "utf-8":
                return k(this, t, e, n);
              case "ascii":
              case "latin1":
              case "binary":
                return S(this, t, e, n);
              case "base64":
                return M(this, t, e, n);
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return I(this, t, e, n);
              default:
                if (o) throw new TypeError("Unknown encoding: " + r);
                (r = ("" + r).toLowerCase()), (o = !0);
            }
        }),
        (c.prototype.toJSON = function () {
          return {
            type: "Buffer",
            data: Array.prototype.slice.call(this._arr || this, 0),
          };
        });
      const A = 4096;
      function x(t, e, n) {
        let r = "";
        n = Math.min(t.length, n);
        for (let i = e; i < n; ++i) r += String.fromCharCode(127 & t[i]);
        return r;
      }
      function L(t, e, n) {
        let r = "";
        n = Math.min(t.length, n);
        for (let i = e; i < n; ++i) r += String.fromCharCode(t[i]);
        return r;
      }
      function T(t, e, n) {
        const r = t.length;
        (!e || e < 0) && (e = 0), (!n || n < 0 || n > r) && (n = r);
        let i = "";
        for (let o = e; o < n; ++o) i += Q[t[o]];
        return i;
      }
      function N(t, e, n) {
        const r = t.slice(e, n);
        let i = "";
        for (let o = 0; o < r.length - 1; o += 2)
          i += String.fromCharCode(r[o] + 256 * r[o + 1]);
        return i;
      }
      function O(t, e, n) {
        if (t % 1 !== 0 || t < 0) throw new RangeError("offset is not uint");
        if (t + e > n)
          throw new RangeError("Trying to access beyond buffer length");
      }
      function B(t, e, n, r, i, o) {
        if (!c.isBuffer(t))
          throw new TypeError('"buffer" argument must be a Buffer instance');
        if (e > i || e < o)
          throw new RangeError('"value" argument is out of bounds');
        if (n + r > t.length) throw new RangeError("Index out of range");
      }
      function j(t, e, n, r, i) {
        K(e, r, i, t, n, 7);
        let o = Number(e & BigInt(4294967295));
        (t[n++] = o),
          (o >>= 8),
          (t[n++] = o),
          (o >>= 8),
          (t[n++] = o),
          (o >>= 8),
          (t[n++] = o);
        let s = Number((e >> BigInt(32)) & BigInt(4294967295));
        return (
          (t[n++] = s),
          (s >>= 8),
          (t[n++] = s),
          (s >>= 8),
          (t[n++] = s),
          (s >>= 8),
          (t[n++] = s),
          n
        );
      }
      function P(t, e, n, r, i) {
        K(e, r, i, t, n, 7);
        let o = Number(e & BigInt(4294967295));
        (t[n + 7] = o),
          (o >>= 8),
          (t[n + 6] = o),
          (o >>= 8),
          (t[n + 5] = o),
          (o >>= 8),
          (t[n + 4] = o);
        let s = Number((e >> BigInt(32)) & BigInt(4294967295));
        return (
          (t[n + 3] = s),
          (s >>= 8),
          (t[n + 2] = s),
          (s >>= 8),
          (t[n + 1] = s),
          (s >>= 8),
          (t[n] = s),
          n + 8
        );
      }
      function C(t, e, n, r, i, o) {
        if (n + r > t.length) throw new RangeError("Index out of range");
        if (n < 0) throw new RangeError("Index out of range");
      }
      function R(t, e, n, r, o) {
        return (
          (e = +e),
          (n >>>= 0),
          o || C(t, 0, n, 4),
          i.write(t, e, n, r, 23, 4),
          n + 4
        );
      }
      function z(t, e, n, r, o) {
        return (
          (e = +e),
          (n >>>= 0),
          o || C(t, 0, n, 8),
          i.write(t, e, n, r, 52, 8),
          n + 8
        );
      }
      (c.prototype.slice = function (t, e) {
        const n = this.length;
        (t = ~~t) < 0 ? (t += n) < 0 && (t = 0) : t > n && (t = n),
          (e = void 0 === e ? n : ~~e) < 0
            ? (e += n) < 0 && (e = 0)
            : e > n && (e = n),
          e < t && (e = t);
        const r = this.subarray(t, e);
        return Object.setPrototypeOf(r, c.prototype), r;
      }),
        (c.prototype.readUintLE = c.prototype.readUIntLE =
          function (t, e, n) {
            (t >>>= 0), (e >>>= 0), n || O(t, e, this.length);
            let r = this[t],
              i = 1,
              o = 0;
            for (; ++o < e && (i *= 256); ) r += this[t + o] * i;
            return r;
          }),
        (c.prototype.readUintBE = c.prototype.readUIntBE =
          function (t, e, n) {
            (t >>>= 0), (e >>>= 0), n || O(t, e, this.length);
            let r = this[t + --e],
              i = 1;
            for (; e > 0 && (i *= 256); ) r += this[t + --e] * i;
            return r;
          }),
        (c.prototype.readUint8 = c.prototype.readUInt8 =
          function (t, e) {
            return (t >>>= 0), e || O(t, 1, this.length), this[t];
          }),
        (c.prototype.readUint16LE = c.prototype.readUInt16LE =
          function (t, e) {
            return (
              (t >>>= 0),
              e || O(t, 2, this.length),
              this[t] | (this[t + 1] << 8)
            );
          }),
        (c.prototype.readUint16BE = c.prototype.readUInt16BE =
          function (t, e) {
            return (
              (t >>>= 0),
              e || O(t, 2, this.length),
              (this[t] << 8) | this[t + 1]
            );
          }),
        (c.prototype.readUint32LE = c.prototype.readUInt32LE =
          function (t, e) {
            return (
              (t >>>= 0),
              e || O(t, 4, this.length),
              (this[t] | (this[t + 1] << 8) | (this[t + 2] << 16)) +
                16777216 * this[t + 3]
            );
          }),
        (c.prototype.readUint32BE = c.prototype.readUInt32BE =
          function (t, e) {
            return (
              (t >>>= 0),
              e || O(t, 4, this.length),
              16777216 * this[t] +
                ((this[t + 1] << 16) | (this[t + 2] << 8) | this[t + 3])
            );
          }),
        (c.prototype.readBigUInt64LE = J(function (t) {
          q((t >>>= 0), "offset");
          const e = this[t],
            n = this[t + 7];
          (void 0 !== e && void 0 !== n) || H(t, this.length - 8);
          const r =
              e + 256 * this[++t] + 65536 * this[++t] + this[++t] * 2 ** 24,
            i = this[++t] + 256 * this[++t] + 65536 * this[++t] + n * 2 ** 24;
          return BigInt(r) + (BigInt(i) << BigInt(32));
        })),
        (c.prototype.readBigUInt64BE = J(function (t) {
          q((t >>>= 0), "offset");
          const e = this[t],
            n = this[t + 7];
          (void 0 !== e && void 0 !== n) || H(t, this.length - 8);
          const r =
              e * 2 ** 24 + 65536 * this[++t] + 256 * this[++t] + this[++t],
            i = this[++t] * 2 ** 24 + 65536 * this[++t] + 256 * this[++t] + n;
          return (BigInt(r) << BigInt(32)) + BigInt(i);
        })),
        (c.prototype.readIntLE = function (t, e, n) {
          (t >>>= 0), (e >>>= 0), n || O(t, e, this.length);
          let r = this[t],
            i = 1,
            o = 0;
          for (; ++o < e && (i *= 256); ) r += this[t + o] * i;
          return (i *= 128), r >= i && (r -= Math.pow(2, 8 * e)), r;
        }),
        (c.prototype.readIntBE = function (t, e, n) {
          (t >>>= 0), (e >>>= 0), n || O(t, e, this.length);
          let r = e,
            i = 1,
            o = this[t + --r];
          for (; r > 0 && (i *= 256); ) o += this[t + --r] * i;
          return (i *= 128), o >= i && (o -= Math.pow(2, 8 * e)), o;
        }),
        (c.prototype.readInt8 = function (t, e) {
          return (
            (t >>>= 0),
            e || O(t, 1, this.length),
            128 & this[t] ? -1 * (255 - this[t] + 1) : this[t]
          );
        }),
        (c.prototype.readInt16LE = function (t, e) {
          (t >>>= 0), e || O(t, 2, this.length);
          const n = this[t] | (this[t + 1] << 8);
          return 32768 & n ? 4294901760 | n : n;
        }),
        (c.prototype.readInt16BE = function (t, e) {
          (t >>>= 0), e || O(t, 2, this.length);
          const n = this[t + 1] | (this[t] << 8);
          return 32768 & n ? 4294901760 | n : n;
        }),
        (c.prototype.readInt32LE = function (t, e) {
          return (
            (t >>>= 0),
            e || O(t, 4, this.length),
            this[t] |
              (this[t + 1] << 8) |
              (this[t + 2] << 16) |
              (this[t + 3] << 24)
          );
        }),
        (c.prototype.readInt32BE = function (t, e) {
          return (
            (t >>>= 0),
            e || O(t, 4, this.length),
            (this[t] << 24) |
              (this[t + 1] << 16) |
              (this[t + 2] << 8) |
              this[t + 3]
          );
        }),
        (c.prototype.readBigInt64LE = J(function (t) {
          q((t >>>= 0), "offset");
          const e = this[t],
            n = this[t + 7];
          (void 0 !== e && void 0 !== n) || H(t, this.length - 8);
          const r =
            this[t + 4] + 256 * this[t + 5] + 65536 * this[t + 6] + (n << 24);
          return (
            (BigInt(r) << BigInt(32)) +
            BigInt(
              e + 256 * this[++t] + 65536 * this[++t] + this[++t] * 2 ** 24
            )
          );
        })),
        (c.prototype.readBigInt64BE = J(function (t) {
          q((t >>>= 0), "offset");
          const e = this[t],
            n = this[t + 7];
          (void 0 !== e && void 0 !== n) || H(t, this.length - 8);
          const r = (e << 24) + 65536 * this[++t] + 256 * this[++t] + this[++t];
          return (
            (BigInt(r) << BigInt(32)) +
            BigInt(
              this[++t] * 2 ** 24 + 65536 * this[++t] + 256 * this[++t] + n
            )
          );
        })),
        (c.prototype.readFloatLE = function (t, e) {
          return (
            (t >>>= 0), e || O(t, 4, this.length), i.read(this, t, !0, 23, 4)
          );
        }),
        (c.prototype.readFloatBE = function (t, e) {
          return (
            (t >>>= 0), e || O(t, 4, this.length), i.read(this, t, !1, 23, 4)
          );
        }),
        (c.prototype.readDoubleLE = function (t, e) {
          return (
            (t >>>= 0), e || O(t, 8, this.length), i.read(this, t, !0, 52, 8)
          );
        }),
        (c.prototype.readDoubleBE = function (t, e) {
          return (
            (t >>>= 0), e || O(t, 8, this.length), i.read(this, t, !1, 52, 8)
          );
        }),
        (c.prototype.writeUintLE = c.prototype.writeUIntLE =
          function (t, e, n, r) {
            if (((t = +t), (e >>>= 0), (n >>>= 0), !r)) {
              B(this, t, e, n, Math.pow(2, 8 * n) - 1, 0);
            }
            let i = 1,
              o = 0;
            for (this[e] = 255 & t; ++o < n && (i *= 256); )
              this[e + o] = (t / i) & 255;
            return e + n;
          }),
        (c.prototype.writeUintBE = c.prototype.writeUIntBE =
          function (t, e, n, r) {
            if (((t = +t), (e >>>= 0), (n >>>= 0), !r)) {
              B(this, t, e, n, Math.pow(2, 8 * n) - 1, 0);
            }
            let i = n - 1,
              o = 1;
            for (this[e + i] = 255 & t; --i >= 0 && (o *= 256); )
              this[e + i] = (t / o) & 255;
            return e + n;
          }),
        (c.prototype.writeUint8 = c.prototype.writeUInt8 =
          function (t, e, n) {
            return (
              (t = +t),
              (e >>>= 0),
              n || B(this, t, e, 1, 255, 0),
              (this[e] = 255 & t),
              e + 1
            );
          }),
        (c.prototype.writeUint16LE = c.prototype.writeUInt16LE =
          function (t, e, n) {
            return (
              (t = +t),
              (e >>>= 0),
              n || B(this, t, e, 2, 65535, 0),
              (this[e] = 255 & t),
              (this[e + 1] = t >>> 8),
              e + 2
            );
          }),
        (c.prototype.writeUint16BE = c.prototype.writeUInt16BE =
          function (t, e, n) {
            return (
              (t = +t),
              (e >>>= 0),
              n || B(this, t, e, 2, 65535, 0),
              (this[e] = t >>> 8),
              (this[e + 1] = 255 & t),
              e + 2
            );
          }),
        (c.prototype.writeUint32LE = c.prototype.writeUInt32LE =
          function (t, e, n) {
            return (
              (t = +t),
              (e >>>= 0),
              n || B(this, t, e, 4, 4294967295, 0),
              (this[e + 3] = t >>> 24),
              (this[e + 2] = t >>> 16),
              (this[e + 1] = t >>> 8),
              (this[e] = 255 & t),
              e + 4
            );
          }),
        (c.prototype.writeUint32BE = c.prototype.writeUInt32BE =
          function (t, e, n) {
            return (
              (t = +t),
              (e >>>= 0),
              n || B(this, t, e, 4, 4294967295, 0),
              (this[e] = t >>> 24),
              (this[e + 1] = t >>> 16),
              (this[e + 2] = t >>> 8),
              (this[e + 3] = 255 & t),
              e + 4
            );
          }),
        (c.prototype.writeBigUInt64LE = J(function (t, e = 0) {
          return j(this, t, e, BigInt(0), BigInt("0xffffffffffffffff"));
        })),
        (c.prototype.writeBigUInt64BE = J(function (t, e = 0) {
          return P(this, t, e, BigInt(0), BigInt("0xffffffffffffffff"));
        })),
        (c.prototype.writeIntLE = function (t, e, n, r) {
          if (((t = +t), (e >>>= 0), !r)) {
            const r = Math.pow(2, 8 * n - 1);
            B(this, t, e, n, r - 1, -r);
          }
          let i = 0,
            o = 1,
            s = 0;
          for (this[e] = 255 & t; ++i < n && (o *= 256); )
            t < 0 && 0 === s && 0 !== this[e + i - 1] && (s = 1),
              (this[e + i] = (((t / o) >> 0) - s) & 255);
          return e + n;
        }),
        (c.prototype.writeIntBE = function (t, e, n, r) {
          if (((t = +t), (e >>>= 0), !r)) {
            const r = Math.pow(2, 8 * n - 1);
            B(this, t, e, n, r - 1, -r);
          }
          let i = n - 1,
            o = 1,
            s = 0;
          for (this[e + i] = 255 & t; --i >= 0 && (o *= 256); )
            t < 0 && 0 === s && 0 !== this[e + i + 1] && (s = 1),
              (this[e + i] = (((t / o) >> 0) - s) & 255);
          return e + n;
        }),
        (c.prototype.writeInt8 = function (t, e, n) {
          return (
            (t = +t),
            (e >>>= 0),
            n || B(this, t, e, 1, 127, -128),
            t < 0 && (t = 255 + t + 1),
            (this[e] = 255 & t),
            e + 1
          );
        }),
        (c.prototype.writeInt16LE = function (t, e, n) {
          return (
            (t = +t),
            (e >>>= 0),
            n || B(this, t, e, 2, 32767, -32768),
            (this[e] = 255 & t),
            (this[e + 1] = t >>> 8),
            e + 2
          );
        }),
        (c.prototype.writeInt16BE = function (t, e, n) {
          return (
            (t = +t),
            (e >>>= 0),
            n || B(this, t, e, 2, 32767, -32768),
            (this[e] = t >>> 8),
            (this[e + 1] = 255 & t),
            e + 2
          );
        }),
        (c.prototype.writeInt32LE = function (t, e, n) {
          return (
            (t = +t),
            (e >>>= 0),
            n || B(this, t, e, 4, 2147483647, -2147483648),
            (this[e] = 255 & t),
            (this[e + 1] = t >>> 8),
            (this[e + 2] = t >>> 16),
            (this[e + 3] = t >>> 24),
            e + 4
          );
        }),
        (c.prototype.writeInt32BE = function (t, e, n) {
          return (
            (t = +t),
            (e >>>= 0),
            n || B(this, t, e, 4, 2147483647, -2147483648),
            t < 0 && (t = 4294967295 + t + 1),
            (this[e] = t >>> 24),
            (this[e + 1] = t >>> 16),
            (this[e + 2] = t >>> 8),
            (this[e + 3] = 255 & t),
            e + 4
          );
        }),
        (c.prototype.writeBigInt64LE = J(function (t, e = 0) {
          return j(
            this,
            t,
            e,
            -BigInt("0x8000000000000000"),
            BigInt("0x7fffffffffffffff")
          );
        })),
        (c.prototype.writeBigInt64BE = J(function (t, e = 0) {
          return P(
            this,
            t,
            e,
            -BigInt("0x8000000000000000"),
            BigInt("0x7fffffffffffffff")
          );
        })),
        (c.prototype.writeFloatLE = function (t, e, n) {
          return R(this, t, e, !0, n);
        }),
        (c.prototype.writeFloatBE = function (t, e, n) {
          return R(this, t, e, !1, n);
        }),
        (c.prototype.writeDoubleLE = function (t, e, n) {
          return z(this, t, e, !0, n);
        }),
        (c.prototype.writeDoubleBE = function (t, e, n) {
          return z(this, t, e, !1, n);
        }),
        (c.prototype.copy = function (t, e, n, r) {
          if (!c.isBuffer(t))
            throw new TypeError("argument should be a Buffer");
          if (
            (n || (n = 0),
            r || 0 === r || (r = this.length),
            e >= t.length && (e = t.length),
            e || (e = 0),
            r > 0 && r < n && (r = n),
            r === n)
          )
            return 0;
          if (0 === t.length || 0 === this.length) return 0;
          if (e < 0) throw new RangeError("targetStart out of bounds");
          if (n < 0 || n >= this.length)
            throw new RangeError("Index out of range");
          if (r < 0) throw new RangeError("sourceEnd out of bounds");
          r > this.length && (r = this.length),
            t.length - e < r - n && (r = t.length - e + n);
          const i = r - n;
          return (
            this === t && "function" === typeof Uint8Array.prototype.copyWithin
              ? this.copyWithin(e, n, r)
              : Uint8Array.prototype.set.call(t, this.subarray(n, r), e),
            i
          );
        }),
        (c.prototype.fill = function (t, e, n, r) {
          if ("string" === typeof t) {
            if (
              ("string" === typeof e
                ? ((r = e), (e = 0), (n = this.length))
                : "string" === typeof n && ((r = n), (n = this.length)),
              void 0 !== r && "string" !== typeof r)
            )
              throw new TypeError("encoding must be a string");
            if ("string" === typeof r && !c.isEncoding(r))
              throw new TypeError("Unknown encoding: " + r);
            if (1 === t.length) {
              const e = t.charCodeAt(0);
              (("utf8" === r && e < 128) || "latin1" === r) && (t = e);
            }
          } else
            "number" === typeof t
              ? (t &= 255)
              : "boolean" === typeof t && (t = Number(t));
          if (e < 0 || this.length < e || this.length < n)
            throw new RangeError("Out of range index");
          if (n <= e) return this;
          let i;
          if (
            ((e >>>= 0),
            (n = void 0 === n ? this.length : n >>> 0),
            t || (t = 0),
            "number" === typeof t)
          )
            for (i = e; i < n; ++i) this[i] = t;
          else {
            const o = c.isBuffer(t) ? t : c.from(t, r),
              s = o.length;
            if (0 === s)
              throw new TypeError(
                'The value "' + t + '" is invalid for argument "value"'
              );
            for (i = 0; i < n - e; ++i) this[i + e] = o[i % s];
          }
          return this;
        });
      const D = {};
      function U(t, e, n) {
        D[t] = class extends n {
          constructor() {
            super(),
              Object.defineProperty(this, "message", {
                value: e.apply(this, arguments),
                writable: !0,
                configurable: !0,
              }),
              (this.name = `${this.name} [${t}]`),
              this.stack,
              delete this.name;
          }
          get code() {
            return t;
          }
          set code(t) {
            Object.defineProperty(this, "code", {
              configurable: !0,
              enumerable: !0,
              value: t,
              writable: !0,
            });
          }
          toString() {
            return `${this.name} [${t}]: ${this.message}`;
          }
        };
      }
      function W(t) {
        let e = "",
          n = t.length;
        const r = "-" === t[0] ? 1 : 0;
        for (; n >= r + 4; n -= 3) e = `_${t.slice(n - 3, n)}${e}`;
        return `${t.slice(0, n)}${e}`;
      }
      function K(t, e, n, r, i, o) {
        if (t > n || t < e) {
          const r = "bigint" === typeof e ? "n" : "";
          let i;
          throw (
            ((i =
              o > 3
                ? 0 === e || e === BigInt(0)
                  ? `>= 0${r} and < 2${r} ** ${8 * (o + 1)}${r}`
                  : `>= -(2${r} ** ${8 * (o + 1) - 1}${r}) and < 2 ** ${
                      8 * (o + 1) - 1
                    }${r}`
                : `>= ${e}${r} and <= ${n}${r}`),
            new D.ERR_OUT_OF_RANGE("value", i, t))
          );
        }
        !(function (t, e, n) {
          q(e, "offset"),
            (void 0 !== t[e] && void 0 !== t[e + n]) ||
              H(e, t.length - (n + 1));
        })(r, i, o);
      }
      function q(t, e) {
        if ("number" !== typeof t)
          throw new D.ERR_INVALID_ARG_TYPE(e, "number", t);
      }
      function H(t, e, n) {
        if (Math.floor(t) !== t)
          throw (
            (q(t, n), new D.ERR_OUT_OF_RANGE(n || "offset", "an integer", t))
          );
        if (e < 0) throw new D.ERR_BUFFER_OUT_OF_BOUNDS();
        throw new D.ERR_OUT_OF_RANGE(
          n || "offset",
          `>= ${n ? 1 : 0} and <= ${e}`,
          t
        );
      }
      U(
        "ERR_BUFFER_OUT_OF_BOUNDS",
        function (t) {
          return t
            ? `${t} is outside of buffer bounds`
            : "Attempt to access memory outside buffer bounds";
        },
        RangeError
      ),
        U(
          "ERR_INVALID_ARG_TYPE",
          function (t, e) {
            return `The "${t}" argument must be of type number. Received type ${typeof e}`;
          },
          TypeError
        ),
        U(
          "ERR_OUT_OF_RANGE",
          function (t, e, n) {
            let r = `The value of "${t}" is out of range.`,
              i = n;
            return (
              Number.isInteger(n) && Math.abs(n) > 2 ** 32
                ? (i = W(String(n)))
                : "bigint" === typeof n &&
                  ((i = String(n)),
                  (n > BigInt(2) ** BigInt(32) ||
                    n < -(BigInt(2) ** BigInt(32))) &&
                    (i = W(i)),
                  (i += "n")),
              (r += ` It must be ${e}. Received ${i}`),
              r
            );
          },
          RangeError
        );
      const F = /[^+/0-9A-Za-z-_]/g;
      function Y(t, e) {
        let n;
        e = e || 1 / 0;
        const r = t.length;
        let i = null;
        const o = [];
        for (let s = 0; s < r; ++s) {
          if (((n = t.charCodeAt(s)), n > 55295 && n < 57344)) {
            if (!i) {
              if (n > 56319) {
                (e -= 3) > -1 && o.push(239, 191, 189);
                continue;
              }
              if (s + 1 === r) {
                (e -= 3) > -1 && o.push(239, 191, 189);
                continue;
              }
              i = n;
              continue;
            }
            if (n < 56320) {
              (e -= 3) > -1 && o.push(239, 191, 189), (i = n);
              continue;
            }
            n = 65536 + (((i - 55296) << 10) | (n - 56320));
          } else i && (e -= 3) > -1 && o.push(239, 191, 189);
          if (((i = null), n < 128)) {
            if ((e -= 1) < 0) break;
            o.push(n);
          } else if (n < 2048) {
            if ((e -= 2) < 0) break;
            o.push((n >> 6) | 192, (63 & n) | 128);
          } else if (n < 65536) {
            if ((e -= 3) < 0) break;
            o.push((n >> 12) | 224, ((n >> 6) & 63) | 128, (63 & n) | 128);
          } else {
            if (!(n < 1114112)) throw new Error("Invalid code point");
            if ((e -= 4) < 0) break;
            o.push(
              (n >> 18) | 240,
              ((n >> 12) & 63) | 128,
              ((n >> 6) & 63) | 128,
              (63 & n) | 128
            );
          }
        }
        return o;
      }
      function V(t) {
        return r.toByteArray(
          (function (t) {
            if ((t = (t = t.split("=")[0]).trim().replace(F, "")).length < 2)
              return "";
            for (; t.length % 4 !== 0; ) t += "=";
            return t;
          })(t)
        );
      }
      function $(t, e, n, r) {
        let i;
        for (i = 0; i < r && !(i + n >= e.length || i >= t.length); ++i)
          e[i + n] = t[i];
        return i;
      }
      function Z(t, e) {
        return (
          t instanceof e ||
          (null != t &&
            null != t.constructor &&
            null != t.constructor.name &&
            t.constructor.name === e.name)
        );
      }
      function G(t) {
        return t !== t;
      }
      const Q = (function () {
        const t = "0123456789abcdef",
          e = new Array(256);
        for (let n = 0; n < 16; ++n) {
          const r = 16 * n;
          for (let i = 0; i < 16; ++i) e[r + i] = t[n] + t[i];
        }
        return e;
      })();
      function J(t) {
        return "undefined" === typeof BigInt ? X : t;
      }
      function X() {
        throw new Error("BigInt not supported");
      }
    },
    6729: function (t) {
      "use strict";
      var e = Object.prototype.hasOwnProperty,
        n = "~";
      function r() {}
      function i(t, e, n) {
        (this.fn = t), (this.context = e), (this.once = n || !1);
      }
      function o(t, e, r, o, s) {
        if ("function" !== typeof r)
          throw new TypeError("The listener must be a function");
        var a = new i(r, o || t, s),
          c = n ? n + e : e;
        return (
          t._events[c]
            ? t._events[c].fn
              ? (t._events[c] = [t._events[c], a])
              : t._events[c].push(a)
            : ((t._events[c] = a), t._eventsCount++),
          t
        );
      }
      function s(t, e) {
        0 === --t._eventsCount ? (t._events = new r()) : delete t._events[e];
      }
      function a() {
        (this._events = new r()), (this._eventsCount = 0);
      }
      Object.create &&
        ((r.prototype = Object.create(null)), new r().__proto__ || (n = !1)),
        (a.prototype.eventNames = function () {
          var t,
            r,
            i = [];
          if (0 === this._eventsCount) return i;
          for (r in (t = this._events))
            e.call(t, r) && i.push(n ? r.slice(1) : r);
          return Object.getOwnPropertySymbols
            ? i.concat(Object.getOwnPropertySymbols(t))
            : i;
        }),
        (a.prototype.listeners = function (t) {
          var e = n ? n + t : t,
            r = this._events[e];
          if (!r) return [];
          if (r.fn) return [r.fn];
          for (var i = 0, o = r.length, s = new Array(o); i < o; i++)
            s[i] = r[i].fn;
          return s;
        }),
        (a.prototype.listenerCount = function (t) {
          var e = n ? n + t : t,
            r = this._events[e];
          return r ? (r.fn ? 1 : r.length) : 0;
        }),
        (a.prototype.emit = function (t, e, r, i, o, s) {
          var a = n ? n + t : t;
          if (!this._events[a]) return !1;
          var c,
            u,
            h = this._events[a],
            l = arguments.length;
          if (h.fn) {
            switch ((h.once && this.removeListener(t, h.fn, void 0, !0), l)) {
              case 1:
                return h.fn.call(h.context), !0;
              case 2:
                return h.fn.call(h.context, e), !0;
              case 3:
                return h.fn.call(h.context, e, r), !0;
              case 4:
                return h.fn.call(h.context, e, r, i), !0;
              case 5:
                return h.fn.call(h.context, e, r, i, o), !0;
              case 6:
                return h.fn.call(h.context, e, r, i, o, s), !0;
            }
            for (u = 1, c = new Array(l - 1); u < l; u++)
              c[u - 1] = arguments[u];
            h.fn.apply(h.context, c);
          } else {
            var d,
              f = h.length;
            for (u = 0; u < f; u++)
              switch (
                (h[u].once && this.removeListener(t, h[u].fn, void 0, !0), l)
              ) {
                case 1:
                  h[u].fn.call(h[u].context);
                  break;
                case 2:
                  h[u].fn.call(h[u].context, e);
                  break;
                case 3:
                  h[u].fn.call(h[u].context, e, r);
                  break;
                case 4:
                  h[u].fn.call(h[u].context, e, r, i);
                  break;
                default:
                  if (!c)
                    for (d = 1, c = new Array(l - 1); d < l; d++)
                      c[d - 1] = arguments[d];
                  h[u].fn.apply(h[u].context, c);
              }
          }
          return !0;
        }),
        (a.prototype.on = function (t, e, n) {
          return o(this, t, e, n, !1);
        }),
        (a.prototype.once = function (t, e, n) {
          return o(this, t, e, n, !0);
        }),
        (a.prototype.removeListener = function (t, e, r, i) {
          var o = n ? n + t : t;
          if (!this._events[o]) return this;
          if (!e) return s(this, o), this;
          var a = this._events[o];
          if (a.fn)
            a.fn !== e ||
              (i && !a.once) ||
              (r && a.context !== r) ||
              s(this, o);
          else {
            for (var c = 0, u = [], h = a.length; c < h; c++)
              (a[c].fn !== e ||
                (i && !a[c].once) ||
                (r && a[c].context !== r)) &&
                u.push(a[c]);
            u.length
              ? (this._events[o] = 1 === u.length ? u[0] : u)
              : s(this, o);
          }
          return this;
        }),
        (a.prototype.removeAllListeners = function (t) {
          var e;
          return (
            t
              ? ((e = n ? n + t : t), this._events[e] && s(this, e))
              : ((this._events = new r()), (this._eventsCount = 0)),
            this
          );
        }),
        (a.prototype.off = a.prototype.removeListener),
        (a.prototype.addListener = a.prototype.on),
        (a.prefixed = n),
        (a.EventEmitter = a),
        (t.exports = a);
    },
    645: function (t, e) {
      (e.read = function (t, e, n, r, i) {
        var o,
          s,
          a = 8 * i - r - 1,
          c = (1 << a) - 1,
          u = c >> 1,
          h = -7,
          l = n ? i - 1 : 0,
          d = n ? -1 : 1,
          f = t[e + l];
        for (
          l += d, o = f & ((1 << -h) - 1), f >>= -h, h += a;
          h > 0;
          o = 256 * o + t[e + l], l += d, h -= 8
        );
        for (
          s = o & ((1 << -h) - 1), o >>= -h, h += r;
          h > 0;
          s = 256 * s + t[e + l], l += d, h -= 8
        );
        if (0 === o) o = 1 - u;
        else {
          if (o === c) return s ? NaN : (1 / 0) * (f ? -1 : 1);
          (s += Math.pow(2, r)), (o -= u);
        }
        return (f ? -1 : 1) * s * Math.pow(2, o - r);
      }),
        (e.write = function (t, e, n, r, i, o) {
          var s,
            a,
            c,
            u = 8 * o - i - 1,
            h = (1 << u) - 1,
            l = h >> 1,
            d = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
            f = r ? 0 : o - 1,
            p = r ? 1 : -1,
            y = e < 0 || (0 === e && 1 / e < 0) ? 1 : 0;
          for (
            e = Math.abs(e),
              isNaN(e) || e === 1 / 0
                ? ((a = isNaN(e) ? 1 : 0), (s = h))
                : ((s = Math.floor(Math.log(e) / Math.LN2)),
                  e * (c = Math.pow(2, -s)) < 1 && (s--, (c *= 2)),
                  (e += s + l >= 1 ? d / c : d * Math.pow(2, 1 - l)) * c >= 2 &&
                    (s++, (c /= 2)),
                  s + l >= h
                    ? ((a = 0), (s = h))
                    : s + l >= 1
                    ? ((a = (e * c - 1) * Math.pow(2, i)), (s += l))
                    : ((a = e * Math.pow(2, l - 1) * Math.pow(2, i)), (s = 0)));
            i >= 8;
            t[n + f] = 255 & a, f += p, a /= 256, i -= 8
          );
          for (
            s = (s << i) | a, u += i;
            u > 0;
            t[n + f] = 255 & s, f += p, s /= 256, u -= 8
          );
          t[n + f - p] |= 128 * y;
        });
    },
    1198: function (t, e, n) {
      "use strict";
      const r = n(4880).v4,
        i = n(7741),
        o = function (t, e) {
          if (!(this instanceof o)) return new o(t, e);
          e || (e = {}),
            (this.options = {
              reviver: "undefined" !== typeof e.reviver ? e.reviver : null,
              replacer: "undefined" !== typeof e.replacer ? e.replacer : null,
              generator:
                "undefined" !== typeof e.generator
                  ? e.generator
                  : function () {
                      return r();
                    },
              version: "undefined" !== typeof e.version ? e.version : 2,
              notificationIdNull:
                "boolean" === typeof e.notificationIdNull &&
                e.notificationIdNull,
            }),
            (this.callServer = t);
        };
      (t.exports = o),
        (o.prototype.request = function (t, e, n, r) {
          const o = this;
          let s = null;
          const a = Array.isArray(t) && "function" === typeof e;
          if (1 === this.options.version && a)
            throw new TypeError("JSON-RPC 1.0 does not support batching");
          if (
            a ||
            (!a && t && "object" === typeof t && "function" === typeof e)
          )
            (r = e), (s = t);
          else {
            "function" === typeof n && ((r = n), (n = void 0));
            const o = "function" === typeof r;
            try {
              s = i(t, e, n, {
                generator: this.options.generator,
                version: this.options.version,
                notificationIdNull: this.options.notificationIdNull,
              });
            } catch (u) {
              if (o) return r(u);
              throw u;
            }
            if (!o) return s;
          }
          let c;
          try {
            c = JSON.stringify(s, this.options.replacer);
          } catch (u) {
            return r(u);
          }
          return (
            this.callServer(c, function (t, e) {
              o._parseResponse(t, e, r);
            }),
            s
          );
        }),
        (o.prototype._parseResponse = function (t, e, n) {
          if (t) return void n(t);
          if (!e) return n();
          let r;
          try {
            r = JSON.parse(e, this.options.reviver);
          } catch (t) {
            return n(t);
          }
          if (3 === n.length) {
            if (Array.isArray(r)) {
              const t = function (t) {
                  return "undefined" !== typeof t.error;
                },
                e = function (e) {
                  return !t(e);
                };
              return n(null, r.filter(t), r.filter(e));
            }
            return n(null, r.error, r.result);
          }
          n(null, r);
        });
    },
    7741: function (t, e, n) {
      "use strict";
      const r = n(4880).v4;
      t.exports = function (t, e, n, i) {
        if ("string" !== typeof t) throw new TypeError(t + " must be a string");
        const o = "number" === typeof (i = i || {}).version ? i.version : 2;
        if (1 !== o && 2 !== o) throw new TypeError(o + " must be 1 or 2");
        const s = { method: t };
        if ((2 === o && (s.jsonrpc = "2.0"), e)) {
          if ("object" !== typeof e && !Array.isArray(e))
            throw new TypeError(e + " must be an object, array or omitted");
          s.params = e;
        }
        if ("undefined" === typeof n) {
          const t =
            "function" === typeof i.generator
              ? i.generator
              : function () {
                  return r();
                };
          s.id = t(s, i);
        } else
          2 === o && null === n
            ? i.notificationIdNull && (s.id = null)
            : (s.id = n);
        return s;
      };
    },
    4019: function (t, e) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.getDomainLocale = function (t, e, n, r) {
          return !1;
        });
      ("function" === typeof e.default ||
        ("object" === typeof e.default && null !== e.default)) &&
        "undefined" === typeof e.default.__esModule &&
        (Object.defineProperty(e.default, "__esModule", { value: !0 }),
        Object.assign(e.default, e),
        (t.exports = e.default));
    },
    7942: function (t, e, n) {
      "use strict";
      var r = n(5696);
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var i = n(2648).Z,
        o = n(7273).Z,
        s = i(n(7294)),
        a = n(4957),
        c = n(7995),
        u = n(647),
        h = n(1992),
        l = n(639),
        d = n(4019),
        f = n(227),
        p = {};
      function y(t, e, n, r) {
        if (t && a.isLocalURL(e)) {
          Promise.resolve(t.prefetch(e, n, r)).catch(function (t) {
            0;
          });
          var i =
            r && "undefined" !== typeof r.locale ? r.locale : t && t.locale;
          p[e + "%" + n + (i ? "%" + i : "")] = !0;
        }
      }
      var g = s.default.forwardRef(function (t, e) {
        var n,
          i = t.href,
          g = t.as,
          m = t.children,
          w = t.prefetch,
          b = t.passHref,
          v = t.replace,
          k = t.shallow,
          S = t.scroll,
          M = t.locale,
          I = t.onClick,
          E = t.onMouseEnter,
          _ = t.onTouchStart,
          A = t.legacyBehavior,
          x = void 0 === A ? !0 !== Boolean(!1) : A,
          L = o(t, [
            "href",
            "as",
            "children",
            "prefetch",
            "passHref",
            "replace",
            "shallow",
            "scroll",
            "locale",
            "onClick",
            "onMouseEnter",
            "onTouchStart",
            "legacyBehavior",
          ]);
        (n = m),
          !x ||
            ("string" !== typeof n && "number" !== typeof n) ||
            (n = s.default.createElement("a", null, n));
        var T = !1 !== w,
          N = s.default.useContext(u.RouterContext),
          O = s.default.useContext(h.AppRouterContext);
        O && (N = O);
        var B,
          j = s.default.useMemo(
            function () {
              var t = a.resolveHref(N, i, !0),
                e = r(t, 2),
                n = e[0],
                o = e[1];
              return { href: n, as: g ? a.resolveHref(N, g) : o || n };
            },
            [N, i, g]
          ),
          P = j.href,
          C = j.as,
          R = s.default.useRef(P),
          z = s.default.useRef(C);
        x && (B = s.default.Children.only(n));
        var D = x ? B && "object" === typeof B && B.ref : e,
          U = l.useIntersection({ rootMargin: "200px" }),
          W = r(U, 3),
          K = W[0],
          q = W[1],
          H = W[2],
          F = s.default.useCallback(
            function (t) {
              (z.current === C && R.current === P) ||
                (H(), (z.current = C), (R.current = P)),
                K(t),
                D &&
                  ("function" === typeof D
                    ? D(t)
                    : "object" === typeof D && (D.current = t));
            },
            [C, D, P, H, K]
          );
        s.default.useEffect(
          function () {
            var t = q && T && a.isLocalURL(P),
              e = "undefined" !== typeof M ? M : N && N.locale,
              n = p[P + "%" + C + (e ? "%" + e : "")];
            t && !n && y(N, P, C, { locale: e });
          },
          [C, P, q, M, T, N]
        );
        var Y = {
          ref: F,
          onClick: function (t) {
            x || "function" !== typeof I || I(t),
              x &&
                B.props &&
                "function" === typeof B.props.onClick &&
                B.props.onClick(t),
              t.defaultPrevented ||
                (function (t, e, n, r, i, o, c, u, h, l) {
                  if (
                    "A" !== t.currentTarget.nodeName.toUpperCase() ||
                    (!(function (t) {
                      var e = t.currentTarget.target;
                      return (
                        (e && "_self" !== e) ||
                        t.metaKey ||
                        t.ctrlKey ||
                        t.shiftKey ||
                        t.altKey ||
                        (t.nativeEvent && 2 === t.nativeEvent.which)
                      );
                    })(t) &&
                      a.isLocalURL(n))
                  ) {
                    t.preventDefault();
                    var d = function () {
                      "beforePopState" in e
                        ? e[i ? "replace" : "push"](n, r, {
                            shallow: o,
                            locale: u,
                            scroll: c,
                          })
                        : e[i ? "replace" : "push"](n, {
                            forceOptimisticNavigation: !l,
                          });
                    };
                    h ? s.default.startTransition(d) : d();
                  }
                })(t, N, P, C, v, k, S, M, Boolean(O), T);
          },
          onMouseEnter: function (t) {
            x || "function" !== typeof E || E(t),
              x &&
                B.props &&
                "function" === typeof B.props.onMouseEnter &&
                B.props.onMouseEnter(t),
              (!T && O) || (a.isLocalURL(P) && y(N, P, C, { priority: !0 }));
          },
          onTouchStart: function (t) {
            x || "function" !== typeof _ || _(t),
              x &&
                B.props &&
                "function" === typeof B.props.onTouchStart &&
                B.props.onTouchStart(t),
              (!T && O) || (a.isLocalURL(P) && y(N, P, C, { priority: !0 }));
          },
        };
        if (!x || b || ("a" === B.type && !("href" in B.props))) {
          var V = "undefined" !== typeof M ? M : N && N.locale,
            $ =
              N &&
              N.isLocaleDomain &&
              d.getDomainLocale(C, V, N.locales, N.domainLocales);
          Y.href = $ || f.addBasePath(c.addLocale(C, V, N && N.defaultLocale));
        }
        return x
          ? s.default.cloneElement(B, Y)
          : s.default.createElement("a", Object.assign({}, L, Y), n);
      });
      (e.default = g),
        ("function" === typeof e.default ||
          ("object" === typeof e.default && null !== e.default)) &&
          "undefined" === typeof e.default.__esModule &&
          (Object.defineProperty(e.default, "__esModule", { value: !0 }),
          Object.assign(e.default, e),
          (t.exports = e.default));
    },
    639: function (t, e, n) {
      "use strict";
      var r = n(5696);
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.useIntersection = function (t) {
          var e = t.rootRef,
            n = t.rootMargin,
            u = t.disabled || !s,
            h = i.useState(!1),
            l = r(h, 2),
            d = l[0],
            f = l[1],
            p = i.useState(null),
            y = r(p, 2),
            g = y[0],
            m = y[1];
          i.useEffect(
            function () {
              if (s) {
                if (u || d) return;
                if (g && g.tagName) {
                  var t = (function (t, e, n) {
                    var r = (function (t) {
                        var e,
                          n = {
                            root: t.root || null,
                            margin: t.rootMargin || "",
                          },
                          r = c.find(function (t) {
                            return t.root === n.root && t.margin === n.margin;
                          });
                        if (r && (e = a.get(r))) return e;
                        var i = new Map(),
                          o = new IntersectionObserver(function (t) {
                            t.forEach(function (t) {
                              var e = i.get(t.target),
                                n = t.isIntersecting || t.intersectionRatio > 0;
                              e && n && e(n);
                            });
                          }, t);
                        return (
                          (e = { id: n, observer: o, elements: i }),
                          c.push(n),
                          a.set(n, e),
                          e
                        );
                      })(n),
                      i = r.id,
                      o = r.observer,
                      s = r.elements;
                    return (
                      s.set(t, e),
                      o.observe(t),
                      function () {
                        if ((s.delete(t), o.unobserve(t), 0 === s.size)) {
                          o.disconnect(), a.delete(i);
                          var e = c.findIndex(function (t) {
                            return t.root === i.root && t.margin === i.margin;
                          });
                          e > -1 && c.splice(e, 1);
                        }
                      }
                    );
                  })(
                    g,
                    function (t) {
                      return t && f(t);
                    },
                    { root: null == e ? void 0 : e.current, rootMargin: n }
                  );
                  return t;
                }
              } else if (!d) {
                var r = o.requestIdleCallback(function () {
                  return f(!0);
                });
                return function () {
                  return o.cancelIdleCallback(r);
                };
              }
            },
            [g, u, n, e, d]
          );
          var w = i.useCallback(function () {
            f(!1);
          }, []);
          return [m, d, w];
        });
      var i = n(7294),
        o = n(6286),
        s = "function" === typeof IntersectionObserver,
        a = new Map(),
        c = [];
      ("function" === typeof e.default ||
        ("object" === typeof e.default && null !== e.default)) &&
        "undefined" === typeof e.default.__esModule &&
        (Object.defineProperty(e.default, "__esModule", { value: !0 }),
        Object.assign(e.default, e),
        (t.exports = e.default));
    },
    1992: function (t, e, n) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.TemplateContext =
          e.GlobalLayoutRouterContext =
          e.LayoutRouterContext =
          e.AppRouterContext =
            void 0);
      var r = (0, n(2648).Z)(n(7294)),
        i = r.default.createContext(null);
      e.AppRouterContext = i;
      var o = r.default.createContext(null);
      e.LayoutRouterContext = o;
      var s = r.default.createContext(null);
      e.GlobalLayoutRouterContext = s;
      var a = r.default.createContext(null);
      e.TemplateContext = a;
    },
    3579: function (t, e, n) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = function (t, e) {
          var n = o.default,
            i = (null == e ? void 0 : e.suspense)
              ? {}
              : {
                  loading: function (t) {
                    t.error, t.isLoading;
                    return t.pastDelay, null;
                  },
                };
          t instanceof Promise
            ? (i.loader = function () {
                return t;
              })
            : "function" === typeof t
            ? (i.loader = t)
            : "object" === typeof t && (i = r({}, i, t));
          !1;
          (i = r({}, i, e)).suspense && (delete i.ssr, delete i.loading);
          i.loadableGenerated &&
            delete (i = r({}, i, i.loadableGenerated)).loadableGenerated;
          if ("boolean" === typeof i.ssr && !i.suspense) {
            if (!i.ssr) return delete i.ssr, s(n, i);
            delete i.ssr;
          }
          return n(i);
        }),
        (e.noSSR = s);
      var r = n(6495).Z,
        i = n(2648).Z,
        o = (i(n(7294)), i(n(3668)));
      function s(t, e) {
        return delete e.webpack, delete e.modules, t(e);
      }
      ("function" === typeof e.default ||
        ("object" === typeof e.default && null !== e.default)) &&
        "undefined" === typeof e.default.__esModule &&
        (Object.defineProperty(e.default, "__esModule", { value: !0 }),
        Object.assign(e.default, e),
        (t.exports = e.default));
    },
    3982: function (t, e, n) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.LoadableContext = void 0);
      var r = (0, n(2648).Z)(n(7294)).default.createContext(null);
      e.LoadableContext = r;
    },
    3668: function (t, e, n) {
      "use strict";
      var r = n(3227),
        i = n(8361);
      function o(t, e) {
        var n =
          ("undefined" !== typeof Symbol && t[Symbol.iterator]) ||
          t["@@iterator"];
        if (!n) {
          if (
            Array.isArray(t) ||
            (n = (function (t, e) {
              if (!t) return;
              if ("string" === typeof t) return s(t, e);
              var n = Object.prototype.toString.call(t).slice(8, -1);
              "Object" === n && t.constructor && (n = t.constructor.name);
              if ("Map" === n || "Set" === n) return Array.from(t);
              if (
                "Arguments" === n ||
                /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
              )
                return s(t, e);
            })(t)) ||
            (e && t && "number" === typeof t.length)
          ) {
            n && (t = n);
            var r = 0,
              i = function () {};
            return {
              s: i,
              n: function () {
                return r >= t.length
                  ? { done: !0 }
                  : { done: !1, value: t[r++] };
              },
              e: function (t) {
                throw t;
              },
              f: i,
            };
          }
          throw new TypeError(
            "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
          );
        }
        var o,
          a = !0,
          c = !1;
        return {
          s: function () {
            n = n.call(t);
          },
          n: function () {
            var t = n.next();
            return (a = t.done), t;
          },
          e: function (t) {
            (c = !0), (o = t);
          },
          f: function () {
            try {
              a || null == n.return || n.return();
            } finally {
              if (c) throw o;
            }
          },
        };
      }
      function s(t, e) {
        (null == e || e > t.length) && (e = t.length);
        for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
        return r;
      }
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.default = void 0);
      var a = n(6495).Z,
        c = (0, n(2648).Z)(n(7294)),
        u = n(3982),
        h = n(7294).useSyncExternalStore,
        l = [],
        d = [],
        f = !1;
      function p(t) {
        var e = t(),
          n = { loading: !0, loaded: null, error: null };
        return (
          (n.promise = e
            .then(function (t) {
              return (n.loading = !1), (n.loaded = t), t;
            })
            .catch(function (t) {
              throw ((n.loading = !1), (n.error = t), t);
            })),
          n
        );
      }
      var y = (function () {
        function t(e, n) {
          r(this, t),
            (this._loadFn = e),
            (this._opts = n),
            (this._callbacks = new Set()),
            (this._delay = null),
            (this._timeout = null),
            this.retry();
        }
        return (
          i(t, [
            {
              key: "promise",
              value: function () {
                return this._res.promise;
              },
            },
            {
              key: "retry",
              value: function () {
                var t = this;
                this._clearTimeouts(),
                  (this._res = this._loadFn(this._opts.loader)),
                  (this._state = { pastDelay: !1, timedOut: !1 });
                var e = this._res,
                  n = this._opts;
                e.loading &&
                  ("number" === typeof n.delay &&
                    (0 === n.delay
                      ? (this._state.pastDelay = !0)
                      : (this._delay = setTimeout(function () {
                          t._update({ pastDelay: !0 });
                        }, n.delay))),
                  "number" === typeof n.timeout &&
                    (this._timeout = setTimeout(function () {
                      t._update({ timedOut: !0 });
                    }, n.timeout))),
                  this._res.promise
                    .then(function () {
                      t._update({}), t._clearTimeouts();
                    })
                    .catch(function (e) {
                      t._update({}), t._clearTimeouts();
                    }),
                  this._update({});
              },
            },
            {
              key: "_update",
              value: function (t) {
                (this._state = a(
                  {},
                  this._state,
                  {
                    error: this._res.error,
                    loaded: this._res.loaded,
                    loading: this._res.loading,
                  },
                  t
                )),
                  this._callbacks.forEach(function (t) {
                    return t();
                  });
              },
            },
            {
              key: "_clearTimeouts",
              value: function () {
                clearTimeout(this._delay), clearTimeout(this._timeout);
              },
            },
            {
              key: "getCurrentValue",
              value: function () {
                return this._state;
              },
            },
            {
              key: "subscribe",
              value: function (t) {
                var e = this;
                return (
                  this._callbacks.add(t),
                  function () {
                    e._callbacks.delete(t);
                  }
                );
              },
            },
          ]),
          t
        );
      })();
      function g(t) {
        return (function (t, e) {
          var n = Object.assign(
            {
              loader: null,
              loading: null,
              delay: 200,
              timeout: null,
              webpack: null,
              modules: null,
              suspense: !1,
            },
            e
          );
          n.suspense && (n.lazy = c.default.lazy(n.loader));
          var r = null;
          function i() {
            if (!r) {
              var e = new y(t, n);
              r = {
                getCurrentValue: e.getCurrentValue.bind(e),
                subscribe: e.subscribe.bind(e),
                retry: e.retry.bind(e),
                promise: e.promise.bind(e),
              };
            }
            return r.promise();
          }
          if (!f) {
            var s = n.webpack ? n.webpack() : n.modules;
            s &&
              d.push(function (t) {
                var e,
                  n = o(s);
                try {
                  for (n.s(); !(e = n.n()).done; ) {
                    var r = e.value;
                    if (-1 !== t.indexOf(r)) return i();
                  }
                } catch (a) {
                  n.e(a);
                } finally {
                  n.f();
                }
              });
          }
          function l() {
            i();
            var t = c.default.useContext(u.LoadableContext);
            t &&
              Array.isArray(n.modules) &&
              n.modules.forEach(function (e) {
                t(e);
              });
          }
          var p = n.suspense
            ? function (t, e) {
                return (
                  l(), c.default.createElement(n.lazy, a({}, t, { ref: e }))
                );
              }
            : function (t, e) {
                l();
                var i = h(r.subscribe, r.getCurrentValue, r.getCurrentValue);
                return (
                  c.default.useImperativeHandle(
                    e,
                    function () {
                      return { retry: r.retry };
                    },
                    []
                  ),
                  c.default.useMemo(
                    function () {
                      return i.loading || i.error
                        ? c.default.createElement(n.loading, {
                            isLoading: i.loading,
                            pastDelay: i.pastDelay,
                            timedOut: i.timedOut,
                            error: i.error,
                            retry: r.retry,
                          })
                        : i.loaded
                        ? c.default.createElement(
                            (e = i.loaded) && e.__esModule ? e.default : e,
                            t
                          )
                        : null;
                      var e;
                    },
                    [t, i]
                  )
                );
              };
          return (
            (p.preload = function () {
              return i();
            }),
            (p.displayName = "LoadableComponent"),
            c.default.forwardRef(p)
          );
        })(p, t);
      }
      function m(t, e) {
        for (var n = []; t.length; ) {
          var r = t.pop();
          n.push(r(e));
        }
        return Promise.all(n).then(function () {
          if (t.length) return m(t, e);
        });
      }
      (g.preloadAll = function () {
        return new Promise(function (t, e) {
          m(l).then(t, e);
        });
      }),
        (g.preloadReady = function () {
          var t =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
          return new Promise(function (e) {
            var n = function () {
              return (f = !0), e();
            };
            m(d, t).then(n, n);
          });
        }),
        (window.__NEXT_PRELOADREADY = g.preloadReady);
      var w = g;
      e.default = w;
    },
    6072: function (t, e, n) {
      "use strict";
      n.d(e, {
        J: function () {
          return Tt;
        },
        w: function () {
          return Nt;
        },
      });
      var r = {};
      n.r(r),
        n.d(r, {
          Decoder: function () {
            return vt;
          },
          Encoder: function () {
            return wt;
          },
          PacketType: function () {
            return mt;
          },
          protocol: function () {
            return gt;
          },
        });
      var i = n(29),
        o = n(7794),
        s = n.n(o),
        a = n(7294);
      const c = Object.create(null);
      (c.open = "0"),
        (c.close = "1"),
        (c.ping = "2"),
        (c.pong = "3"),
        (c.message = "4"),
        (c.upgrade = "5"),
        (c.noop = "6");
      const u = Object.create(null);
      Object.keys(c).forEach((t) => {
        u[c[t]] = t;
      });
      const h = { type: "error", data: "parser error" },
        l =
          "function" === typeof Blob ||
          ("undefined" !== typeof Blob &&
            "[object BlobConstructor]" ===
              Object.prototype.toString.call(Blob)),
        d = "function" === typeof ArrayBuffer,
        f = (t) =>
          "function" === typeof ArrayBuffer.isView
            ? ArrayBuffer.isView(t)
            : t && t.buffer instanceof ArrayBuffer,
        p = ({ type: t, data: e }, n, r) =>
          l && e instanceof Blob
            ? n
              ? r(e)
              : y(e, r)
            : d && (e instanceof ArrayBuffer || f(e))
            ? n
              ? r(e)
              : y(new Blob([e]), r)
            : r(c[t] + (e || "")),
        y = (t, e) => {
          const n = new FileReader();
          return (
            (n.onload = function () {
              const t = n.result.split(",")[1];
              e("b" + (t || ""));
            }),
            n.readAsDataURL(t)
          );
        };
      function g(t) {
        return t instanceof Uint8Array
          ? t
          : t instanceof ArrayBuffer
          ? new Uint8Array(t)
          : new Uint8Array(t.buffer, t.byteOffset, t.byteLength);
      }
      let m;
      const w =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
        b = "undefined" === typeof Uint8Array ? [] : new Uint8Array(256);
      for (let Bt = 0; Bt < w.length; Bt++) b[w.charCodeAt(Bt)] = Bt;
      const v = "function" === typeof ArrayBuffer,
        k = (t, e) => {
          if ("string" !== typeof t) return { type: "message", data: M(t, e) };
          const n = t.charAt(0);
          if ("b" === n) return { type: "message", data: S(t.substring(1), e) };
          return u[n]
            ? t.length > 1
              ? { type: u[n], data: t.substring(1) }
              : { type: u[n] }
            : h;
        },
        S = (t, e) => {
          if (v) {
            const n = ((t) => {
              let e,
                n,
                r,
                i,
                o,
                s = 0.75 * t.length,
                a = t.length,
                c = 0;
              "=" === t[t.length - 1] && (s--, "=" === t[t.length - 2] && s--);
              const u = new ArrayBuffer(s),
                h = new Uint8Array(u);
              for (e = 0; e < a; e += 4)
                (n = b[t.charCodeAt(e)]),
                  (r = b[t.charCodeAt(e + 1)]),
                  (i = b[t.charCodeAt(e + 2)]),
                  (o = b[t.charCodeAt(e + 3)]),
                  (h[c++] = (n << 2) | (r >> 4)),
                  (h[c++] = ((15 & r) << 4) | (i >> 2)),
                  (h[c++] = ((3 & i) << 6) | (63 & o));
              return u;
            })(t);
            return M(n, e);
          }
          return { base64: !0, data: t };
        },
        M = (t, e) =>
          "blob" === e
            ? t instanceof Blob
              ? t
              : new Blob([t])
            : t instanceof ArrayBuffer
            ? t
            : t.buffer,
        I = String.fromCharCode(30);
      function E() {
        return new TransformStream({
          transform(t, e) {
            !(function (t, e) {
              l && t.data instanceof Blob
                ? t.data.arrayBuffer().then(g).then(e)
                : d && (t.data instanceof ArrayBuffer || f(t.data))
                ? e(g(t.data))
                : p(t, !1, (t) => {
                    m || (m = new TextEncoder()), e(m.encode(t));
                  });
            })(t, (n) => {
              const r = n.length;
              let i;
              if (r < 126)
                (i = new Uint8Array(1)), new DataView(i.buffer).setUint8(0, r);
              else if (r < 65536) {
                i = new Uint8Array(3);
                const t = new DataView(i.buffer);
                t.setUint8(0, 126), t.setUint16(1, r);
              } else {
                i = new Uint8Array(9);
                const t = new DataView(i.buffer);
                t.setUint8(0, 127), t.setBigUint64(1, BigInt(r));
              }
              t.data && "string" !== typeof t.data && (i[0] |= 128),
                e.enqueue(i),
                e.enqueue(n);
            });
          },
        });
      }
      let _;
      function A(t) {
        return t.reduce((t, e) => t + e.length, 0);
      }
      function x(t, e) {
        if (t[0].length === e) return t.shift();
        const n = new Uint8Array(e);
        let r = 0;
        for (let i = 0; i < e; i++)
          (n[i] = t[0][r++]), r === t[0].length && (t.shift(), (r = 0));
        return t.length && r < t[0].length && (t[0] = t[0].slice(r)), n;
      }
      function L(t) {
        if (t)
          return (function (t) {
            for (var e in L.prototype) t[e] = L.prototype[e];
            return t;
          })(t);
      }
      (L.prototype.on = L.prototype.addEventListener =
        function (t, e) {
          return (
            (this._callbacks = this._callbacks || {}),
            (this._callbacks["$" + t] = this._callbacks["$" + t] || []).push(e),
            this
          );
        }),
        (L.prototype.once = function (t, e) {
          function n() {
            this.off(t, n), e.apply(this, arguments);
          }
          return (n.fn = e), this.on(t, n), this;
        }),
        (L.prototype.off =
          L.prototype.removeListener =
          L.prototype.removeAllListeners =
          L.prototype.removeEventListener =
            function (t, e) {
              if (
                ((this._callbacks = this._callbacks || {}),
                0 == arguments.length)
              )
                return (this._callbacks = {}), this;
              var n,
                r = this._callbacks["$" + t];
              if (!r) return this;
              if (1 == arguments.length)
                return delete this._callbacks["$" + t], this;
              for (var i = 0; i < r.length; i++)
                if ((n = r[i]) === e || n.fn === e) {
                  r.splice(i, 1);
                  break;
                }
              return 0 === r.length && delete this._callbacks["$" + t], this;
            }),
        (L.prototype.emit = function (t) {
          this._callbacks = this._callbacks || {};
          for (
            var e = new Array(arguments.length - 1),
              n = this._callbacks["$" + t],
              r = 1;
            r < arguments.length;
            r++
          )
            e[r - 1] = arguments[r];
          if (n) {
            r = 0;
            for (var i = (n = n.slice(0)).length; r < i; ++r)
              n[r].apply(this, e);
          }
          return this;
        }),
        (L.prototype.emitReserved = L.prototype.emit),
        (L.prototype.listeners = function (t) {
          return (
            (this._callbacks = this._callbacks || {}),
            this._callbacks["$" + t] || []
          );
        }),
        (L.prototype.hasListeners = function (t) {
          return !!this.listeners(t).length;
        });
      const T =
        "undefined" !== typeof self
          ? self
          : "undefined" !== typeof window
          ? window
          : Function("return this")();
      function N(t, ...e) {
        return e.reduce(
          (e, n) => (t.hasOwnProperty(n) && (e[n] = t[n]), e),
          {}
        );
      }
      const O = T.setTimeout,
        B = T.clearTimeout;
      function j(t, e) {
        e.useNativeTimers
          ? ((t.setTimeoutFn = O.bind(T)), (t.clearTimeoutFn = B.bind(T)))
          : ((t.setTimeoutFn = T.setTimeout.bind(T)),
            (t.clearTimeoutFn = T.clearTimeout.bind(T)));
      }
      class P extends Error {
        constructor(t, e, n) {
          super(t),
            (this.description = e),
            (this.context = n),
            (this.type = "TransportError");
        }
      }
      class C extends L {
        constructor(t) {
          super(),
            (this.writable = !1),
            j(this, t),
            (this.opts = t),
            (this.query = t.query),
            (this.socket = t.socket);
        }
        onError(t, e, n) {
          return super.emitReserved("error", new P(t, e, n)), this;
        }
        open() {
          return (this.readyState = "opening"), this.doOpen(), this;
        }
        close() {
          return (
            ("opening" !== this.readyState && "open" !== this.readyState) ||
              (this.doClose(), this.onClose()),
            this
          );
        }
        send(t) {
          "open" === this.readyState && this.write(t);
        }
        onOpen() {
          (this.readyState = "open"),
            (this.writable = !0),
            super.emitReserved("open");
        }
        onData(t) {
          const e = k(t, this.socket.binaryType);
          this.onPacket(e);
        }
        onPacket(t) {
          super.emitReserved("packet", t);
        }
        onClose(t) {
          (this.readyState = "closed"), super.emitReserved("close", t);
        }
        pause(t) {}
        createUri(t, e = {}) {
          return (
            t +
            "://" +
            this._hostname() +
            this._port() +
            this.opts.path +
            this._query(e)
          );
        }
        _hostname() {
          const t = this.opts.hostname;
          return -1 === t.indexOf(":") ? t : "[" + t + "]";
        }
        _port() {
          return this.opts.port &&
            ((this.opts.secure && Number(443 !== this.opts.port)) ||
              (!this.opts.secure && 80 !== Number(this.opts.port)))
            ? ":" + this.opts.port
            : "";
        }
        _query(t) {
          const e = (function (t) {
            let e = "";
            for (let n in t)
              t.hasOwnProperty(n) &&
                (e.length && (e += "&"),
                (e += encodeURIComponent(n) + "=" + encodeURIComponent(t[n])));
            return e;
          })(t);
          return e.length ? "?" + e : "";
        }
      }
      const R =
          "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(
            ""
          ),
        z = {};
      let D,
        U = 0,
        W = 0;
      function K(t) {
        let e = "";
        do {
          (e = R[t % 64] + e), (t = Math.floor(t / 64));
        } while (t > 0);
        return e;
      }
      function q() {
        const t = K(+new Date());
        return t !== D ? ((U = 0), (D = t)) : t + "." + K(U++);
      }
      for (; W < 64; W++) z[R[W]] = W;
      let H = !1;
      try {
        H =
          "undefined" !== typeof XMLHttpRequest &&
          "withCredentials" in new XMLHttpRequest();
      } catch (Ot) {}
      const F = H;
      function Y(t) {
        const e = t.xdomain;
        try {
          if ("undefined" !== typeof XMLHttpRequest && (!e || F))
            return new XMLHttpRequest();
        } catch (n) {}
        if (!e)
          try {
            return new T[["Active"].concat("Object").join("X")](
              "Microsoft.XMLHTTP"
            );
          } catch (n) {}
      }
      function V() {}
      const $ = null != new Y({ xdomain: !1 }).responseType;
      class Z extends L {
        constructor(t, e) {
          super(),
            j(this, e),
            (this.opts = e),
            (this.method = e.method || "GET"),
            (this.uri = t),
            (this.data = void 0 !== e.data ? e.data : null),
            this.create();
        }
        create() {
          var t;
          const e = N(
            this.opts,
            "agent",
            "pfx",
            "key",
            "passphrase",
            "cert",
            "ca",
            "ciphers",
            "rejectUnauthorized",
            "autoUnref"
          );
          e.xdomain = !!this.opts.xd;
          const n = (this.xhr = new Y(e));
          try {
            n.open(this.method, this.uri, !0);
            try {
              if (this.opts.extraHeaders) {
                n.setDisableHeaderCheck && n.setDisableHeaderCheck(!0);
                for (let t in this.opts.extraHeaders)
                  this.opts.extraHeaders.hasOwnProperty(t) &&
                    n.setRequestHeader(t, this.opts.extraHeaders[t]);
              }
            } catch (r) {}
            if ("POST" === this.method)
              try {
                n.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
              } catch (r) {}
            try {
              n.setRequestHeader("Accept", "*/*");
            } catch (r) {}
            null === (t = this.opts.cookieJar) ||
              void 0 === t ||
              t.addCookies(n),
              "withCredentials" in n &&
                (n.withCredentials = this.opts.withCredentials),
              this.opts.requestTimeout &&
                (n.timeout = this.opts.requestTimeout),
              (n.onreadystatechange = () => {
                var t;
                3 === n.readyState &&
                  (null === (t = this.opts.cookieJar) ||
                    void 0 === t ||
                    t.parseCookies(n)),
                  4 === n.readyState &&
                    (200 === n.status || 1223 === n.status
                      ? this.onLoad()
                      : this.setTimeoutFn(() => {
                          this.onError(
                            "number" === typeof n.status ? n.status : 0
                          );
                        }, 0));
              }),
              n.send(this.data);
          } catch (r) {
            return void this.setTimeoutFn(() => {
              this.onError(r);
            }, 0);
          }
          "undefined" !== typeof document &&
            ((this.index = Z.requestsCount++), (Z.requests[this.index] = this));
        }
        onError(t) {
          this.emitReserved("error", t, this.xhr), this.cleanup(!0);
        }
        cleanup(t) {
          if ("undefined" !== typeof this.xhr && null !== this.xhr) {
            if (((this.xhr.onreadystatechange = V), t))
              try {
                this.xhr.abort();
              } catch (e) {}
            "undefined" !== typeof document && delete Z.requests[this.index],
              (this.xhr = null);
          }
        }
        onLoad() {
          const t = this.xhr.responseText;
          null !== t &&
            (this.emitReserved("data", t),
            this.emitReserved("success"),
            this.cleanup());
        }
        abort() {
          this.cleanup();
        }
      }
      if (
        ((Z.requestsCount = 0),
        (Z.requests = {}),
        "undefined" !== typeof document)
      )
        if ("function" === typeof attachEvent) attachEvent("onunload", G);
        else if ("function" === typeof addEventListener) {
          addEventListener("onpagehide" in T ? "pagehide" : "unload", G, !1);
        }
      function G() {
        for (let t in Z.requests)
          Z.requests.hasOwnProperty(t) && Z.requests[t].abort();
      }
      const Q =
          "function" === typeof Promise && "function" === typeof Promise.resolve
            ? (t) => Promise.resolve().then(t)
            : (t, e) => e(t, 0),
        J = T.WebSocket || T.MozWebSocket;
      n(8764).Buffer;
      const X =
        "undefined" !== typeof navigator &&
        "string" === typeof navigator.product &&
        "reactnative" === navigator.product.toLowerCase();
      const tt = {
          websocket: class extends C {
            constructor(t) {
              super(t), (this.supportsBinary = !t.forceBase64);
            }
            get name() {
              return "websocket";
            }
            doOpen() {
              if (!this.check()) return;
              const t = this.uri(),
                e = this.opts.protocols,
                n = X
                  ? {}
                  : N(
                      this.opts,
                      "agent",
                      "perMessageDeflate",
                      "pfx",
                      "key",
                      "passphrase",
                      "cert",
                      "ca",
                      "ciphers",
                      "rejectUnauthorized",
                      "localAddress",
                      "protocolVersion",
                      "origin",
                      "maxPayload",
                      "family",
                      "checkServerIdentity"
                    );
              this.opts.extraHeaders && (n.headers = this.opts.extraHeaders);
              try {
                this.ws = X ? new J(t, e, n) : e ? new J(t, e) : new J(t);
              } catch (Ot) {
                return this.emitReserved("error", Ot);
              }
              (this.ws.binaryType = this.socket.binaryType),
                this.addEventListeners();
            }
            addEventListeners() {
              (this.ws.onopen = () => {
                this.opts.autoUnref && this.ws._socket.unref(), this.onOpen();
              }),
                (this.ws.onclose = (t) =>
                  this.onClose({
                    description: "websocket connection closed",
                    context: t,
                  })),
                (this.ws.onmessage = (t) => this.onData(t.data)),
                (this.ws.onerror = (t) => this.onError("websocket error", t));
            }
            write(t) {
              this.writable = !1;
              for (let e = 0; e < t.length; e++) {
                const n = t[e],
                  r = e === t.length - 1;
                p(n, this.supportsBinary, (t) => {
                  try {
                    this.ws.send(t);
                  } catch (e) {}
                  r &&
                    Q(() => {
                      (this.writable = !0), this.emitReserved("drain");
                    }, this.setTimeoutFn);
                });
              }
            }
            doClose() {
              "undefined" !== typeof this.ws &&
                (this.ws.close(), (this.ws = null));
            }
            uri() {
              const t = this.opts.secure ? "wss" : "ws",
                e = this.query || {};
              return (
                this.opts.timestampRequests &&
                  (e[this.opts.timestampParam] = q()),
                this.supportsBinary || (e.b64 = 1),
                this.createUri(t, e)
              );
            }
            check() {
              return !!J;
            }
          },
          webtransport: class extends C {
            get name() {
              return "webtransport";
            }
            doOpen() {
              "function" === typeof WebTransport &&
                ((this.transport = new WebTransport(
                  this.createUri("https"),
                  this.opts.transportOptions[this.name]
                )),
                this.transport.closed
                  .then(() => {
                    this.onClose();
                  })
                  .catch((t) => {
                    this.onError("webtransport error", t);
                  }),
                this.transport.ready.then(() => {
                  this.transport.createBidirectionalStream().then((t) => {
                    const e = (function (t, e) {
                        _ || (_ = new TextDecoder());
                        const n = [];
                        let r = 0,
                          i = -1,
                          o = !1;
                        return new TransformStream({
                          transform(s, a) {
                            for (n.push(s); ; ) {
                              if (0 === r) {
                                if (A(n) < 1) break;
                                const t = x(n, 1);
                                (o = 128 === (128 & t[0])),
                                  (i = 127 & t[0]),
                                  (r = i < 126 ? 3 : 126 === i ? 1 : 2);
                              } else if (1 === r) {
                                if (A(n) < 2) break;
                                const t = x(n, 2);
                                (i = new DataView(
                                  t.buffer,
                                  t.byteOffset,
                                  t.length
                                ).getUint16(0)),
                                  (r = 3);
                              } else if (2 === r) {
                                if (A(n) < 8) break;
                                const t = x(n, 8),
                                  e = new DataView(
                                    t.buffer,
                                    t.byteOffset,
                                    t.length
                                  ),
                                  o = e.getUint32(0);
                                if (o > Math.pow(2, 21) - 1) {
                                  a.enqueue(h);
                                  break;
                                }
                                (i = o * Math.pow(2, 32) + e.getUint32(4)),
                                  (r = 3);
                              } else {
                                if (A(n) < i) break;
                                const t = x(n, i);
                                a.enqueue(k(o ? t : _.decode(t), e)), (r = 0);
                              }
                              if (0 === i || i > t) {
                                a.enqueue(h);
                                break;
                              }
                            }
                          },
                        });
                      })(Number.MAX_SAFE_INTEGER, this.socket.binaryType),
                      n = t.readable.pipeThrough(e).getReader(),
                      r = E();
                    r.readable.pipeTo(t.writable),
                      (this.writer = r.writable.getWriter());
                    const i = () => {
                      n.read()
                        .then(({ done: t, value: e }) => {
                          t || (this.onPacket(e), i());
                        })
                        .catch((t) => {});
                    };
                    i();
                    const o = { type: "open" };
                    this.query.sid && (o.data = `{"sid":"${this.query.sid}"}`),
                      this.writer.write(o).then(() => this.onOpen());
                  });
                }));
            }
            write(t) {
              this.writable = !1;
              for (let e = 0; e < t.length; e++) {
                const n = t[e],
                  r = e === t.length - 1;
                this.writer.write(n).then(() => {
                  r &&
                    Q(() => {
                      (this.writable = !0), this.emitReserved("drain");
                    }, this.setTimeoutFn);
                });
              }
            }
            doClose() {
              var t;
              null === (t = this.transport) || void 0 === t || t.close();
            }
          },
          polling: class extends C {
            constructor(t) {
              if (
                (super(t), (this.polling = !1), "undefined" !== typeof location)
              ) {
                const e = "https:" === location.protocol;
                let n = location.port;
                n || (n = e ? "443" : "80"),
                  (this.xd =
                    ("undefined" !== typeof location &&
                      t.hostname !== location.hostname) ||
                    n !== t.port);
              }
              const e = t && t.forceBase64;
              (this.supportsBinary = $ && !e),
                this.opts.withCredentials && (this.cookieJar = void 0);
            }
            get name() {
              return "polling";
            }
            doOpen() {
              this.poll();
            }
            pause(t) {
              this.readyState = "pausing";
              const e = () => {
                (this.readyState = "paused"), t();
              };
              if (this.polling || !this.writable) {
                let t = 0;
                this.polling &&
                  (t++,
                  this.once("pollComplete", function () {
                    --t || e();
                  })),
                  this.writable ||
                    (t++,
                    this.once("drain", function () {
                      --t || e();
                    }));
              } else e();
            }
            poll() {
              (this.polling = !0), this.doPoll(), this.emitReserved("poll");
            }
            onData(t) {
              ((t, e) => {
                const n = t.split(I),
                  r = [];
                for (let i = 0; i < n.length; i++) {
                  const t = k(n[i], e);
                  if ((r.push(t), "error" === t.type)) break;
                }
                return r;
              })(t, this.socket.binaryType).forEach((t) => {
                if (
                  ("opening" === this.readyState &&
                    "open" === t.type &&
                    this.onOpen(),
                  "close" === t.type)
                )
                  return (
                    this.onClose({
                      description: "transport closed by the server",
                    }),
                    !1
                  );
                this.onPacket(t);
              }),
                "closed" !== this.readyState &&
                  ((this.polling = !1),
                  this.emitReserved("pollComplete"),
                  "open" === this.readyState && this.poll());
            }
            doClose() {
              const t = () => {
                this.write([{ type: "close" }]);
              };
              "open" === this.readyState ? t() : this.once("open", t);
            }
            write(t) {
              (this.writable = !1),
                ((t, e) => {
                  const n = t.length,
                    r = new Array(n);
                  let i = 0;
                  t.forEach((t, o) => {
                    p(t, !1, (t) => {
                      (r[o] = t), ++i === n && e(r.join(I));
                    });
                  });
                })(t, (t) => {
                  this.doWrite(t, () => {
                    (this.writable = !0), this.emitReserved("drain");
                  });
                });
            }
            uri() {
              const t = this.opts.secure ? "https" : "http",
                e = this.query || {};
              return (
                !1 !== this.opts.timestampRequests &&
                  (e[this.opts.timestampParam] = q()),
                this.supportsBinary || e.sid || (e.b64 = 1),
                this.createUri(t, e)
              );
            }
            request(t = {}) {
              return (
                Object.assign(
                  t,
                  { xd: this.xd, cookieJar: this.cookieJar },
                  this.opts
                ),
                new Z(this.uri(), t)
              );
            }
            doWrite(t, e) {
              const n = this.request({ method: "POST", data: t });
              n.on("success", e),
                n.on("error", (t, e) => {
                  this.onError("xhr post error", t, e);
                });
            }
            doPoll() {
              const t = this.request();
              t.on("data", this.onData.bind(this)),
                t.on("error", (t, e) => {
                  this.onError("xhr poll error", t, e);
                }),
                (this.pollXhr = t);
            }
          },
        },
        et =
          /^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
        nt = [
          "source",
          "protocol",
          "authority",
          "userInfo",
          "user",
          "password",
          "host",
          "port",
          "relative",
          "path",
          "directory",
          "file",
          "query",
          "anchor",
        ];
      function rt(t) {
        if (t.length > 2e3) throw "URI too long";
        const e = t,
          n = t.indexOf("["),
          r = t.indexOf("]");
        -1 != n &&
          -1 != r &&
          (t =
            t.substring(0, n) +
            t.substring(n, r).replace(/:/g, ";") +
            t.substring(r, t.length));
        let i = et.exec(t || ""),
          o = {},
          s = 14;
        for (; s--; ) o[nt[s]] = i[s] || "";
        return (
          -1 != n &&
            -1 != r &&
            ((o.source = e),
            (o.host = o.host
              .substring(1, o.host.length - 1)
              .replace(/;/g, ":")),
            (o.authority = o.authority
              .replace("[", "")
              .replace("]", "")
              .replace(/;/g, ":")),
            (o.ipv6uri = !0)),
          (o.pathNames = (function (t, e) {
            const n = /\/{2,9}/g,
              r = e.replace(n, "/").split("/");
            ("/" != e.slice(0, 1) && 0 !== e.length) || r.splice(0, 1);
            "/" == e.slice(-1) && r.splice(r.length - 1, 1);
            return r;
          })(0, o.path)),
          (o.queryKey = (function (t, e) {
            const n = {};
            return (
              e.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function (t, e, r) {
                e && (n[e] = r);
              }),
              n
            );
          })(0, o.query)),
          o
        );
      }
      class it extends L {
        constructor(t, e = {}) {
          super(),
            (this.binaryType = "arraybuffer"),
            (this.writeBuffer = []),
            t && "object" === typeof t && ((e = t), (t = null)),
            t
              ? ((t = rt(t)),
                (e.hostname = t.host),
                (e.secure = "https" === t.protocol || "wss" === t.protocol),
                (e.port = t.port),
                t.query && (e.query = t.query))
              : e.host && (e.hostname = rt(e.host).host),
            j(this, e),
            (this.secure =
              null != e.secure
                ? e.secure
                : "undefined" !== typeof location &&
                  "https:" === location.protocol),
            e.hostname && !e.port && (e.port = this.secure ? "443" : "80"),
            (this.hostname =
              e.hostname ||
              ("undefined" !== typeof location
                ? location.hostname
                : "localhost")),
            (this.port =
              e.port ||
              ("undefined" !== typeof location && location.port
                ? location.port
                : this.secure
                ? "443"
                : "80")),
            (this.transports = e.transports || [
              "polling",
              "websocket",
              "webtransport",
            ]),
            (this.writeBuffer = []),
            (this.prevBufferLen = 0),
            (this.opts = Object.assign(
              {
                path: "/engine.io",
                agent: !1,
                withCredentials: !1,
                upgrade: !0,
                timestampParam: "t",
                rememberUpgrade: !1,
                addTrailingSlash: !0,
                rejectUnauthorized: !0,
                perMessageDeflate: { threshold: 1024 },
                transportOptions: {},
                closeOnBeforeunload: !1,
              },
              e
            )),
            (this.opts.path =
              this.opts.path.replace(/\/$/, "") +
              (this.opts.addTrailingSlash ? "/" : "")),
            "string" === typeof this.opts.query &&
              (this.opts.query = (function (t) {
                let e = {},
                  n = t.split("&");
                for (let r = 0, i = n.length; r < i; r++) {
                  let t = n[r].split("=");
                  e[decodeURIComponent(t[0])] = decodeURIComponent(t[1]);
                }
                return e;
              })(this.opts.query)),
            (this.id = null),
            (this.upgrades = null),
            (this.pingInterval = null),
            (this.pingTimeout = null),
            (this.pingTimeoutTimer = null),
            "function" === typeof addEventListener &&
              (this.opts.closeOnBeforeunload &&
                ((this.beforeunloadEventListener = () => {
                  this.transport &&
                    (this.transport.removeAllListeners(),
                    this.transport.close());
                }),
                addEventListener(
                  "beforeunload",
                  this.beforeunloadEventListener,
                  !1
                )),
              "localhost" !== this.hostname &&
                ((this.offlineEventListener = () => {
                  this.onClose("transport close", {
                    description: "network connection lost",
                  });
                }),
                addEventListener("offline", this.offlineEventListener, !1))),
            this.open();
        }
        createTransport(t) {
          const e = Object.assign({}, this.opts.query);
          (e.EIO = 4), (e.transport = t), this.id && (e.sid = this.id);
          const n = Object.assign(
            {},
            this.opts,
            {
              query: e,
              socket: this,
              hostname: this.hostname,
              secure: this.secure,
              port: this.port,
            },
            this.opts.transportOptions[t]
          );
          return new tt[t](n);
        }
        open() {
          let t;
          if (
            this.opts.rememberUpgrade &&
            it.priorWebsocketSuccess &&
            -1 !== this.transports.indexOf("websocket")
          )
            t = "websocket";
          else {
            if (0 === this.transports.length)
              return void this.setTimeoutFn(() => {
                this.emitReserved("error", "No transports available");
              }, 0);
            t = this.transports[0];
          }
          this.readyState = "opening";
          try {
            t = this.createTransport(t);
          } catch (e) {
            return this.transports.shift(), void this.open();
          }
          t.open(), this.setTransport(t);
        }
        setTransport(t) {
          this.transport && this.transport.removeAllListeners(),
            (this.transport = t),
            t
              .on("drain", this.onDrain.bind(this))
              .on("packet", this.onPacket.bind(this))
              .on("error", this.onError.bind(this))
              .on("close", (t) => this.onClose("transport close", t));
        }
        probe(t) {
          let e = this.createTransport(t),
            n = !1;
          it.priorWebsocketSuccess = !1;
          const r = () => {
            n ||
              (e.send([{ type: "ping", data: "probe" }]),
              e.once("packet", (t) => {
                if (!n)
                  if ("pong" === t.type && "probe" === t.data) {
                    if (
                      ((this.upgrading = !0),
                      this.emitReserved("upgrading", e),
                      !e)
                    )
                      return;
                    (it.priorWebsocketSuccess = "websocket" === e.name),
                      this.transport.pause(() => {
                        n ||
                          ("closed" !== this.readyState &&
                            (u(),
                            this.setTransport(e),
                            e.send([{ type: "upgrade" }]),
                            this.emitReserved("upgrade", e),
                            (e = null),
                            (this.upgrading = !1),
                            this.flush()));
                      });
                  } else {
                    const t = new Error("probe error");
                    (t.transport = e.name),
                      this.emitReserved("upgradeError", t);
                  }
              }));
          };
          function i() {
            n || ((n = !0), u(), e.close(), (e = null));
          }
          const o = (t) => {
            const n = new Error("probe error: " + t);
            (n.transport = e.name), i(), this.emitReserved("upgradeError", n);
          };
          function s() {
            o("transport closed");
          }
          function a() {
            o("socket closed");
          }
          function c(t) {
            e && t.name !== e.name && i();
          }
          const u = () => {
            e.removeListener("open", r),
              e.removeListener("error", o),
              e.removeListener("close", s),
              this.off("close", a),
              this.off("upgrading", c);
          };
          e.once("open", r),
            e.once("error", o),
            e.once("close", s),
            this.once("close", a),
            this.once("upgrading", c),
            -1 !== this.upgrades.indexOf("webtransport") && "webtransport" !== t
              ? this.setTimeoutFn(() => {
                  n || e.open();
                }, 200)
              : e.open();
        }
        onOpen() {
          if (
            ((this.readyState = "open"),
            (it.priorWebsocketSuccess = "websocket" === this.transport.name),
            this.emitReserved("open"),
            this.flush(),
            "open" === this.readyState && this.opts.upgrade)
          ) {
            let t = 0;
            const e = this.upgrades.length;
            for (; t < e; t++) this.probe(this.upgrades[t]);
          }
        }
        onPacket(t) {
          if (
            "opening" === this.readyState ||
            "open" === this.readyState ||
            "closing" === this.readyState
          )
            switch (
              (this.emitReserved("packet", t),
              this.emitReserved("heartbeat"),
              this.resetPingTimeout(),
              t.type)
            ) {
              case "open":
                this.onHandshake(JSON.parse(t.data));
                break;
              case "ping":
                this.sendPacket("pong"),
                  this.emitReserved("ping"),
                  this.emitReserved("pong");
                break;
              case "error":
                const e = new Error("server error");
                (e.code = t.data), this.onError(e);
                break;
              case "message":
                this.emitReserved("data", t.data),
                  this.emitReserved("message", t.data);
            }
        }
        onHandshake(t) {
          this.emitReserved("handshake", t),
            (this.id = t.sid),
            (this.transport.query.sid = t.sid),
            (this.upgrades = this.filterUpgrades(t.upgrades)),
            (this.pingInterval = t.pingInterval),
            (this.pingTimeout = t.pingTimeout),
            (this.maxPayload = t.maxPayload),
            this.onOpen(),
            "closed" !== this.readyState && this.resetPingTimeout();
        }
        resetPingTimeout() {
          this.clearTimeoutFn(this.pingTimeoutTimer),
            (this.pingTimeoutTimer = this.setTimeoutFn(() => {
              this.onClose("ping timeout");
            }, this.pingInterval + this.pingTimeout)),
            this.opts.autoUnref && this.pingTimeoutTimer.unref();
        }
        onDrain() {
          this.writeBuffer.splice(0, this.prevBufferLen),
            (this.prevBufferLen = 0),
            0 === this.writeBuffer.length
              ? this.emitReserved("drain")
              : this.flush();
        }
        flush() {
          if (
            "closed" !== this.readyState &&
            this.transport.writable &&
            !this.upgrading &&
            this.writeBuffer.length
          ) {
            const t = this.getWritablePackets();
            this.transport.send(t),
              (this.prevBufferLen = t.length),
              this.emitReserved("flush");
          }
        }
        getWritablePackets() {
          if (
            !(
              this.maxPayload &&
              "polling" === this.transport.name &&
              this.writeBuffer.length > 1
            )
          )
            return this.writeBuffer;
          let t = 1;
          for (let n = 0; n < this.writeBuffer.length; n++) {
            const r = this.writeBuffer[n].data;
            if (
              (r &&
                (t +=
                  "string" === typeof (e = r)
                    ? (function (t) {
                        let e = 0,
                          n = 0;
                        for (let r = 0, i = t.length; r < i; r++)
                          (e = t.charCodeAt(r)),
                            e < 128
                              ? (n += 1)
                              : e < 2048
                              ? (n += 2)
                              : e < 55296 || e >= 57344
                              ? (n += 3)
                              : (r++, (n += 4));
                        return n;
                      })(e)
                    : Math.ceil(1.33 * (e.byteLength || e.size))),
              n > 0 && t > this.maxPayload)
            )
              return this.writeBuffer.slice(0, n);
            t += 2;
          }
          var e;
          return this.writeBuffer;
        }
        write(t, e, n) {
          return this.sendPacket("message", t, e, n), this;
        }
        send(t, e, n) {
          return this.sendPacket("message", t, e, n), this;
        }
        sendPacket(t, e, n, r) {
          if (
            ("function" === typeof e && ((r = e), (e = void 0)),
            "function" === typeof n && ((r = n), (n = null)),
            "closing" === this.readyState || "closed" === this.readyState)
          )
            return;
          (n = n || {}).compress = !1 !== n.compress;
          const i = { type: t, data: e, options: n };
          this.emitReserved("packetCreate", i),
            this.writeBuffer.push(i),
            r && this.once("flush", r),
            this.flush();
        }
        close() {
          const t = () => {
              this.onClose("forced close"), this.transport.close();
            },
            e = () => {
              this.off("upgrade", e), this.off("upgradeError", e), t();
            },
            n = () => {
              this.once("upgrade", e), this.once("upgradeError", e);
            };
          return (
            ("opening" !== this.readyState && "open" !== this.readyState) ||
              ((this.readyState = "closing"),
              this.writeBuffer.length
                ? this.once("drain", () => {
                    this.upgrading ? n() : t();
                  })
                : this.upgrading
                ? n()
                : t()),
            this
          );
        }
        onError(t) {
          (it.priorWebsocketSuccess = !1),
            this.emitReserved("error", t),
            this.onClose("transport error", t);
        }
        onClose(t, e) {
          ("opening" !== this.readyState &&
            "open" !== this.readyState &&
            "closing" !== this.readyState) ||
            (this.clearTimeoutFn(this.pingTimeoutTimer),
            this.transport.removeAllListeners("close"),
            this.transport.close(),
            this.transport.removeAllListeners(),
            "function" === typeof removeEventListener &&
              (removeEventListener(
                "beforeunload",
                this.beforeunloadEventListener,
                !1
              ),
              removeEventListener("offline", this.offlineEventListener, !1)),
            (this.readyState = "closed"),
            (this.id = null),
            this.emitReserved("close", t, e),
            (this.writeBuffer = []),
            (this.prevBufferLen = 0));
        }
        filterUpgrades(t) {
          const e = [];
          let n = 0;
          const r = t.length;
          for (; n < r; n++) ~this.transports.indexOf(t[n]) && e.push(t[n]);
          return e;
        }
      }
      it.protocol = 4;
      it.protocol;
      const ot = "function" === typeof ArrayBuffer,
        st = Object.prototype.toString,
        at =
          "function" === typeof Blob ||
          ("undefined" !== typeof Blob &&
            "[object BlobConstructor]" === st.call(Blob)),
        ct =
          "function" === typeof File ||
          ("undefined" !== typeof File &&
            "[object FileConstructor]" === st.call(File));
      function ut(t) {
        return (
          (ot &&
            (t instanceof ArrayBuffer ||
              ((t) =>
                "function" === typeof ArrayBuffer.isView
                  ? ArrayBuffer.isView(t)
                  : t.buffer instanceof ArrayBuffer)(t))) ||
          (at && t instanceof Blob) ||
          (ct && t instanceof File)
        );
      }
      function ht(t, e) {
        if (!t || "object" !== typeof t) return !1;
        if (Array.isArray(t)) {
          for (let e = 0, n = t.length; e < n; e++) if (ht(t[e])) return !0;
          return !1;
        }
        if (ut(t)) return !0;
        if (
          t.toJSON &&
          "function" === typeof t.toJSON &&
          1 === arguments.length
        )
          return ht(t.toJSON(), !0);
        for (const n in t)
          if (Object.prototype.hasOwnProperty.call(t, n) && ht(t[n])) return !0;
        return !1;
      }
      function lt(t) {
        const e = [],
          n = t.data,
          r = t;
        return (
          (r.data = dt(n, e)),
          (r.attachments = e.length),
          { packet: r, buffers: e }
        );
      }
      function dt(t, e) {
        if (!t) return t;
        if (ut(t)) {
          const n = { _placeholder: !0, num: e.length };
          return e.push(t), n;
        }
        if (Array.isArray(t)) {
          const n = new Array(t.length);
          for (let r = 0; r < t.length; r++) n[r] = dt(t[r], e);
          return n;
        }
        if ("object" === typeof t && !(t instanceof Date)) {
          const n = {};
          for (const r in t)
            Object.prototype.hasOwnProperty.call(t, r) && (n[r] = dt(t[r], e));
          return n;
        }
        return t;
      }
      function ft(t, e) {
        return (t.data = pt(t.data, e)), delete t.attachments, t;
      }
      function pt(t, e) {
        if (!t) return t;
        if (t && !0 === t._placeholder) {
          if ("number" === typeof t.num && t.num >= 0 && t.num < e.length)
            return e[t.num];
          throw new Error("illegal attachments");
        }
        if (Array.isArray(t))
          for (let n = 0; n < t.length; n++) t[n] = pt(t[n], e);
        else if ("object" === typeof t)
          for (const n in t)
            Object.prototype.hasOwnProperty.call(t, n) && (t[n] = pt(t[n], e));
        return t;
      }
      const yt = [
          "connect",
          "connect_error",
          "disconnect",
          "disconnecting",
          "newListener",
          "removeListener",
        ],
        gt = 5;
      var mt;
      !(function (t) {
        (t[(t.CONNECT = 0)] = "CONNECT"),
          (t[(t.DISCONNECT = 1)] = "DISCONNECT"),
          (t[(t.EVENT = 2)] = "EVENT"),
          (t[(t.ACK = 3)] = "ACK"),
          (t[(t.CONNECT_ERROR = 4)] = "CONNECT_ERROR"),
          (t[(t.BINARY_EVENT = 5)] = "BINARY_EVENT"),
          (t[(t.BINARY_ACK = 6)] = "BINARY_ACK");
      })(mt || (mt = {}));
      class wt {
        constructor(t) {
          this.replacer = t;
        }
        encode(t) {
          return (t.type !== mt.EVENT && t.type !== mt.ACK) || !ht(t)
            ? [this.encodeAsString(t)]
            : this.encodeAsBinary({
                type: t.type === mt.EVENT ? mt.BINARY_EVENT : mt.BINARY_ACK,
                nsp: t.nsp,
                data: t.data,
                id: t.id,
              });
        }
        encodeAsString(t) {
          let e = "" + t.type;
          return (
            (t.type !== mt.BINARY_EVENT && t.type !== mt.BINARY_ACK) ||
              (e += t.attachments + "-"),
            t.nsp && "/" !== t.nsp && (e += t.nsp + ","),
            null != t.id && (e += t.id),
            null != t.data && (e += JSON.stringify(t.data, this.replacer)),
            e
          );
        }
        encodeAsBinary(t) {
          const e = lt(t),
            n = this.encodeAsString(e.packet),
            r = e.buffers;
          return r.unshift(n), r;
        }
      }
      function bt(t) {
        return "[object Object]" === Object.prototype.toString.call(t);
      }
      class vt extends L {
        constructor(t) {
          super(), (this.reviver = t);
        }
        add(t) {
          let e;
          if ("string" === typeof t) {
            if (this.reconstructor)
              throw new Error(
                "got plaintext data when reconstructing a packet"
              );
            e = this.decodeString(t);
            const n = e.type === mt.BINARY_EVENT;
            n || e.type === mt.BINARY_ACK
              ? ((e.type = n ? mt.EVENT : mt.ACK),
                (this.reconstructor = new kt(e)),
                0 === e.attachments && super.emitReserved("decoded", e))
              : super.emitReserved("decoded", e);
          } else {
            if (!ut(t) && !t.base64) throw new Error("Unknown type: " + t);
            if (!this.reconstructor)
              throw new Error(
                "got binary data when not reconstructing a packet"
              );
            (e = this.reconstructor.takeBinaryData(t)),
              e &&
                ((this.reconstructor = null), super.emitReserved("decoded", e));
          }
        }
        decodeString(t) {
          let e = 0;
          const n = { type: Number(t.charAt(0)) };
          if (void 0 === mt[n.type])
            throw new Error("unknown packet type " + n.type);
          if (n.type === mt.BINARY_EVENT || n.type === mt.BINARY_ACK) {
            const r = e + 1;
            for (; "-" !== t.charAt(++e) && e != t.length; );
            const i = t.substring(r, e);
            if (i != Number(i) || "-" !== t.charAt(e))
              throw new Error("Illegal attachments");
            n.attachments = Number(i);
          }
          if ("/" === t.charAt(e + 1)) {
            const r = e + 1;
            for (; ++e; ) {
              if ("," === t.charAt(e)) break;
              if (e === t.length) break;
            }
            n.nsp = t.substring(r, e);
          } else n.nsp = "/";
          const r = t.charAt(e + 1);
          if ("" !== r && Number(r) == r) {
            const r = e + 1;
            for (; ++e; ) {
              const n = t.charAt(e);
              if (null == n || Number(n) != n) {
                --e;
                break;
              }
              if (e === t.length) break;
            }
            n.id = Number(t.substring(r, e + 1));
          }
          if (t.charAt(++e)) {
            const r = this.tryParse(t.substr(e));
            if (!vt.isPayloadValid(n.type, r))
              throw new Error("invalid payload");
            n.data = r;
          }
          return n;
        }
        tryParse(t) {
          try {
            return JSON.parse(t, this.reviver);
          } catch (e) {
            return !1;
          }
        }
        static isPayloadValid(t, e) {
          switch (t) {
            case mt.CONNECT:
              return bt(e);
            case mt.DISCONNECT:
              return void 0 === e;
            case mt.CONNECT_ERROR:
              return "string" === typeof e || bt(e);
            case mt.EVENT:
            case mt.BINARY_EVENT:
              return (
                Array.isArray(e) &&
                ("number" === typeof e[0] ||
                  ("string" === typeof e[0] && -1 === yt.indexOf(e[0])))
              );
            case mt.ACK:
            case mt.BINARY_ACK:
              return Array.isArray(e);
          }
        }
        destroy() {
          this.reconstructor &&
            (this.reconstructor.finishedReconstruction(),
            (this.reconstructor = null));
        }
      }
      class kt {
        constructor(t) {
          (this.packet = t), (this.buffers = []), (this.reconPack = t);
        }
        takeBinaryData(t) {
          if (
            (this.buffers.push(t),
            this.buffers.length === this.reconPack.attachments)
          ) {
            const t = ft(this.reconPack, this.buffers);
            return this.finishedReconstruction(), t;
          }
          return null;
        }
        finishedReconstruction() {
          (this.reconPack = null), (this.buffers = []);
        }
      }
      function St(t, e, n) {
        return (
          t.on(e, n),
          function () {
            t.off(e, n);
          }
        );
      }
      const Mt = Object.freeze({
        connect: 1,
        connect_error: 1,
        disconnect: 1,
        disconnecting: 1,
        newListener: 1,
        removeListener: 1,
      });
      class It extends L {
        constructor(t, e, n) {
          super(),
            (this.connected = !1),
            (this.recovered = !1),
            (this.receiveBuffer = []),
            (this.sendBuffer = []),
            (this._queue = []),
            (this._queueSeq = 0),
            (this.ids = 0),
            (this.acks = {}),
            (this.flags = {}),
            (this.io = t),
            (this.nsp = e),
            n && n.auth && (this.auth = n.auth),
            (this._opts = Object.assign({}, n)),
            this.io._autoConnect && this.open();
        }
        get disconnected() {
          return !this.connected;
        }
        subEvents() {
          if (this.subs) return;
          const t = this.io;
          this.subs = [
            St(t, "open", this.onopen.bind(this)),
            St(t, "packet", this.onpacket.bind(this)),
            St(t, "error", this.onerror.bind(this)),
            St(t, "close", this.onclose.bind(this)),
          ];
        }
        get active() {
          return !!this.subs;
        }
        connect() {
          return (
            this.connected ||
              (this.subEvents(),
              this.io._reconnecting || this.io.open(),
              "open" === this.io._readyState && this.onopen()),
            this
          );
        }
        open() {
          return this.connect();
        }
        send(...t) {
          return t.unshift("message"), this.emit.apply(this, t), this;
        }
        emit(t, ...e) {
          if (Mt.hasOwnProperty(t))
            throw new Error('"' + t.toString() + '" is a reserved event name');
          if (
            (e.unshift(t),
            this._opts.retries && !this.flags.fromQueue && !this.flags.volatile)
          )
            return this._addToQueue(e), this;
          const n = { type: mt.EVENT, data: e, options: {} };
          if (
            ((n.options.compress = !1 !== this.flags.compress),
            "function" === typeof e[e.length - 1])
          ) {
            const t = this.ids++,
              r = e.pop();
            this._registerAckCallback(t, r), (n.id = t);
          }
          const r =
            this.io.engine &&
            this.io.engine.transport &&
            this.io.engine.transport.writable;
          return (
            (this.flags.volatile && (!r || !this.connected)) ||
              (this.connected
                ? (this.notifyOutgoingListeners(n), this.packet(n))
                : this.sendBuffer.push(n)),
            (this.flags = {}),
            this
          );
        }
        _registerAckCallback(t, e) {
          var n;
          const r =
            null !== (n = this.flags.timeout) && void 0 !== n
              ? n
              : this._opts.ackTimeout;
          if (void 0 === r) return void (this.acks[t] = e);
          const i = this.io.setTimeoutFn(() => {
              delete this.acks[t];
              for (let e = 0; e < this.sendBuffer.length; e++)
                this.sendBuffer[e].id === t && this.sendBuffer.splice(e, 1);
              e.call(this, new Error("operation has timed out"));
            }, r),
            o = (...t) => {
              this.io.clearTimeoutFn(i), e.apply(this, t);
            };
          (o.withError = !0), (this.acks[t] = o);
        }
        emitWithAck(t, ...e) {
          return new Promise((n, r) => {
            const i = (t, e) => (t ? r(t) : n(e));
            (i.withError = !0), e.push(i), this.emit(t, ...e);
          });
        }
        _addToQueue(t) {
          let e;
          "function" === typeof t[t.length - 1] && (e = t.pop());
          const n = {
            id: this._queueSeq++,
            tryCount: 0,
            pending: !1,
            args: t,
            flags: Object.assign({ fromQueue: !0 }, this.flags),
          };
          t.push((t, ...r) => {
            if (n !== this._queue[0]) return;
            return (
              null !== t
                ? n.tryCount > this._opts.retries &&
                  (this._queue.shift(), e && e(t))
                : (this._queue.shift(), e && e(null, ...r)),
              (n.pending = !1),
              this._drainQueue()
            );
          }),
            this._queue.push(n),
            this._drainQueue();
        }
        _drainQueue(t = !1) {
          if (!this.connected || 0 === this._queue.length) return;
          const e = this._queue[0];
          (e.pending && !t) ||
            ((e.pending = !0),
            e.tryCount++,
            (this.flags = e.flags),
            this.emit.apply(this, e.args));
        }
        packet(t) {
          (t.nsp = this.nsp), this.io._packet(t);
        }
        onopen() {
          "function" == typeof this.auth
            ? this.auth((t) => {
                this._sendConnectPacket(t);
              })
            : this._sendConnectPacket(this.auth);
        }
        _sendConnectPacket(t) {
          this.packet({
            type: mt.CONNECT,
            data: this._pid
              ? Object.assign({ pid: this._pid, offset: this._lastOffset }, t)
              : t,
          });
        }
        onerror(t) {
          this.connected || this.emitReserved("connect_error", t);
        }
        onclose(t, e) {
          (this.connected = !1),
            delete this.id,
            this.emitReserved("disconnect", t, e),
            this._clearAcks();
        }
        _clearAcks() {
          Object.keys(this.acks).forEach((t) => {
            if (!this.sendBuffer.some((e) => String(e.id) === t)) {
              const e = this.acks[t];
              delete this.acks[t],
                e.withError &&
                  e.call(this, new Error("socket has been disconnected"));
            }
          });
        }
        onpacket(t) {
          if (t.nsp === this.nsp)
            switch (t.type) {
              case mt.CONNECT:
                t.data && t.data.sid
                  ? this.onconnect(t.data.sid, t.data.pid)
                  : this.emitReserved(
                      "connect_error",
                      new Error(
                        "It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"
                      )
                    );
                break;
              case mt.EVENT:
              case mt.BINARY_EVENT:
                this.onevent(t);
                break;
              case mt.ACK:
              case mt.BINARY_ACK:
                this.onack(t);
                break;
              case mt.DISCONNECT:
                this.ondisconnect();
                break;
              case mt.CONNECT_ERROR:
                this.destroy();
                const e = new Error(t.data.message);
                (e.data = t.data.data), this.emitReserved("connect_error", e);
            }
        }
        onevent(t) {
          const e = t.data || [];
          null != t.id && e.push(this.ack(t.id)),
            this.connected
              ? this.emitEvent(e)
              : this.receiveBuffer.push(Object.freeze(e));
        }
        emitEvent(t) {
          if (this._anyListeners && this._anyListeners.length) {
            const e = this._anyListeners.slice();
            for (const n of e) n.apply(this, t);
          }
          super.emit.apply(this, t),
            this._pid &&
              t.length &&
              "string" === typeof t[t.length - 1] &&
              (this._lastOffset = t[t.length - 1]);
        }
        ack(t) {
          const e = this;
          let n = !1;
          return function (...r) {
            n || ((n = !0), e.packet({ type: mt.ACK, id: t, data: r }));
          };
        }
        onack(t) {
          const e = this.acks[t.id];
          "function" === typeof e &&
            (delete this.acks[t.id],
            e.withError && t.data.unshift(null),
            e.apply(this, t.data));
        }
        onconnect(t, e) {
          (this.id = t),
            (this.recovered = e && this._pid === e),
            (this._pid = e),
            (this.connected = !0),
            this.emitBuffered(),
            this.emitReserved("connect"),
            this._drainQueue(!0);
        }
        emitBuffered() {
          this.receiveBuffer.forEach((t) => this.emitEvent(t)),
            (this.receiveBuffer = []),
            this.sendBuffer.forEach((t) => {
              this.notifyOutgoingListeners(t), this.packet(t);
            }),
            (this.sendBuffer = []);
        }
        ondisconnect() {
          this.destroy(), this.onclose("io server disconnect");
        }
        destroy() {
          this.subs && (this.subs.forEach((t) => t()), (this.subs = void 0)),
            this.io._destroy(this);
        }
        disconnect() {
          return (
            this.connected && this.packet({ type: mt.DISCONNECT }),
            this.destroy(),
            this.connected && this.onclose("io client disconnect"),
            this
          );
        }
        close() {
          return this.disconnect();
        }
        compress(t) {
          return (this.flags.compress = t), this;
        }
        get volatile() {
          return (this.flags.volatile = !0), this;
        }
        timeout(t) {
          return (this.flags.timeout = t), this;
        }
        onAny(t) {
          return (
            (this._anyListeners = this._anyListeners || []),
            this._anyListeners.push(t),
            this
          );
        }
        prependAny(t) {
          return (
            (this._anyListeners = this._anyListeners || []),
            this._anyListeners.unshift(t),
            this
          );
        }
        offAny(t) {
          if (!this._anyListeners) return this;
          if (t) {
            const e = this._anyListeners;
            for (let n = 0; n < e.length; n++)
              if (t === e[n]) return e.splice(n, 1), this;
          } else this._anyListeners = [];
          return this;
        }
        listenersAny() {
          return this._anyListeners || [];
        }
        onAnyOutgoing(t) {
          return (
            (this._anyOutgoingListeners = this._anyOutgoingListeners || []),
            this._anyOutgoingListeners.push(t),
            this
          );
        }
        prependAnyOutgoing(t) {
          return (
            (this._anyOutgoingListeners = this._anyOutgoingListeners || []),
            this._anyOutgoingListeners.unshift(t),
            this
          );
        }
        offAnyOutgoing(t) {
          if (!this._anyOutgoingListeners) return this;
          if (t) {
            const e = this._anyOutgoingListeners;
            for (let n = 0; n < e.length; n++)
              if (t === e[n]) return e.splice(n, 1), this;
          } else this._anyOutgoingListeners = [];
          return this;
        }
        listenersAnyOutgoing() {
          return this._anyOutgoingListeners || [];
        }
        notifyOutgoingListeners(t) {
          if (this._anyOutgoingListeners && this._anyOutgoingListeners.length) {
            const e = this._anyOutgoingListeners.slice();
            for (const n of e) n.apply(this, t.data);
          }
        }
      }
      function Et(t) {
        (t = t || {}),
          (this.ms = t.min || 100),
          (this.max = t.max || 1e4),
          (this.factor = t.factor || 2),
          (this.jitter = t.jitter > 0 && t.jitter <= 1 ? t.jitter : 0),
          (this.attempts = 0);
      }
      (Et.prototype.duration = function () {
        var t = this.ms * Math.pow(this.factor, this.attempts++);
        if (this.jitter) {
          var e = Math.random(),
            n = Math.floor(e * this.jitter * t);
          t = 0 == (1 & Math.floor(10 * e)) ? t - n : t + n;
        }
        return 0 | Math.min(t, this.max);
      }),
        (Et.prototype.reset = function () {
          this.attempts = 0;
        }),
        (Et.prototype.setMin = function (t) {
          this.ms = t;
        }),
        (Et.prototype.setMax = function (t) {
          this.max = t;
        }),
        (Et.prototype.setJitter = function (t) {
          this.jitter = t;
        });
      class _t extends L {
        constructor(t, e) {
          var n;
          super(),
            (this.nsps = {}),
            (this.subs = []),
            t && "object" === typeof t && ((e = t), (t = void 0)),
            ((e = e || {}).path = e.path || "/socket.io"),
            (this.opts = e),
            j(this, e),
            this.reconnection(!1 !== e.reconnection),
            this.reconnectionAttempts(e.reconnectionAttempts || 1 / 0),
            this.reconnectionDelay(e.reconnectionDelay || 1e3),
            this.reconnectionDelayMax(e.reconnectionDelayMax || 5e3),
            this.randomizationFactor(
              null !== (n = e.randomizationFactor) && void 0 !== n ? n : 0.5
            ),
            (this.backoff = new Et({
              min: this.reconnectionDelay(),
              max: this.reconnectionDelayMax(),
              jitter: this.randomizationFactor(),
            })),
            this.timeout(null == e.timeout ? 2e4 : e.timeout),
            (this._readyState = "closed"),
            (this.uri = t);
          const i = e.parser || r;
          (this.encoder = new i.Encoder()),
            (this.decoder = new i.Decoder()),
            (this._autoConnect = !1 !== e.autoConnect),
            this._autoConnect && this.open();
        }
        reconnection(t) {
          return arguments.length
            ? ((this._reconnection = !!t), this)
            : this._reconnection;
        }
        reconnectionAttempts(t) {
          return void 0 === t
            ? this._reconnectionAttempts
            : ((this._reconnectionAttempts = t), this);
        }
        reconnectionDelay(t) {
          var e;
          return void 0 === t
            ? this._reconnectionDelay
            : ((this._reconnectionDelay = t),
              null === (e = this.backoff) || void 0 === e || e.setMin(t),
              this);
        }
        randomizationFactor(t) {
          var e;
          return void 0 === t
            ? this._randomizationFactor
            : ((this._randomizationFactor = t),
              null === (e = this.backoff) || void 0 === e || e.setJitter(t),
              this);
        }
        reconnectionDelayMax(t) {
          var e;
          return void 0 === t
            ? this._reconnectionDelayMax
            : ((this._reconnectionDelayMax = t),
              null === (e = this.backoff) || void 0 === e || e.setMax(t),
              this);
        }
        timeout(t) {
          return arguments.length ? ((this._timeout = t), this) : this._timeout;
        }
        maybeReconnectOnOpen() {
          !this._reconnecting &&
            this._reconnection &&
            0 === this.backoff.attempts &&
            this.reconnect();
        }
        open(t) {
          if (~this._readyState.indexOf("open")) return this;
          this.engine = new it(this.uri, this.opts);
          const e = this.engine,
            n = this;
          (this._readyState = "opening"), (this.skipReconnect = !1);
          const r = St(e, "open", function () {
              n.onopen(), t && t();
            }),
            i = (e) => {
              this.cleanup(),
                (this._readyState = "closed"),
                this.emitReserved("error", e),
                t ? t(e) : this.maybeReconnectOnOpen();
            },
            o = St(e, "error", i);
          if (!1 !== this._timeout) {
            const t = this._timeout,
              n = this.setTimeoutFn(() => {
                r(), i(new Error("timeout")), e.close();
              }, t);
            this.opts.autoUnref && n.unref(),
              this.subs.push(() => {
                this.clearTimeoutFn(n);
              });
          }
          return this.subs.push(r), this.subs.push(o), this;
        }
        connect(t) {
          return this.open(t);
        }
        onopen() {
          this.cleanup(),
            (this._readyState = "open"),
            this.emitReserved("open");
          const t = this.engine;
          this.subs.push(
            St(t, "ping", this.onping.bind(this)),
            St(t, "data", this.ondata.bind(this)),
            St(t, "error", this.onerror.bind(this)),
            St(t, "close", this.onclose.bind(this)),
            St(this.decoder, "decoded", this.ondecoded.bind(this))
          );
        }
        onping() {
          this.emitReserved("ping");
        }
        ondata(t) {
          try {
            this.decoder.add(t);
          } catch (e) {
            this.onclose("parse error", e);
          }
        }
        ondecoded(t) {
          Q(() => {
            this.emitReserved("packet", t);
          }, this.setTimeoutFn);
        }
        onerror(t) {
          this.emitReserved("error", t);
        }
        socket(t, e) {
          let n = this.nsps[t];
          return (
            n
              ? this._autoConnect && !n.active && n.connect()
              : ((n = new It(this, t, e)), (this.nsps[t] = n)),
            n
          );
        }
        _destroy(t) {
          const e = Object.keys(this.nsps);
          for (const n of e) {
            if (this.nsps[n].active) return;
          }
          this._close();
        }
        _packet(t) {
          const e = this.encoder.encode(t);
          for (let n = 0; n < e.length; n++) this.engine.write(e[n], t.options);
        }
        cleanup() {
          this.subs.forEach((t) => t()),
            (this.subs.length = 0),
            this.decoder.destroy();
        }
        _close() {
          (this.skipReconnect = !0),
            (this._reconnecting = !1),
            this.onclose("forced close"),
            this.engine && this.engine.close();
        }
        disconnect() {
          return this._close();
        }
        onclose(t, e) {
          this.cleanup(),
            this.backoff.reset(),
            (this._readyState = "closed"),
            this.emitReserved("close", t, e),
            this._reconnection && !this.skipReconnect && this.reconnect();
        }
        reconnect() {
          if (this._reconnecting || this.skipReconnect) return this;
          const t = this;
          if (this.backoff.attempts >= this._reconnectionAttempts)
            this.backoff.reset(),
              this.emitReserved("reconnect_failed"),
              (this._reconnecting = !1);
          else {
            const e = this.backoff.duration();
            this._reconnecting = !0;
            const n = this.setTimeoutFn(() => {
              t.skipReconnect ||
                (this.emitReserved("reconnect_attempt", t.backoff.attempts),
                t.skipReconnect ||
                  t.open((e) => {
                    e
                      ? ((t._reconnecting = !1),
                        t.reconnect(),
                        this.emitReserved("reconnect_error", e))
                      : t.onreconnect();
                  }));
            }, e);
            this.opts.autoUnref && n.unref(),
              this.subs.push(() => {
                this.clearTimeoutFn(n);
              });
          }
        }
        onreconnect() {
          const t = this.backoff.attempts;
          (this._reconnecting = !1),
            this.backoff.reset(),
            this.emitReserved("reconnect", t);
        }
      }
      const At = {};
      function xt(t, e) {
        "object" === typeof t && ((e = t), (t = void 0));
        const n = (function (t, e = "", n) {
            let r = t;
            (n = n || ("undefined" !== typeof location && location)),
              null == t && (t = n.protocol + "//" + n.host),
              "string" === typeof t &&
                ("/" === t.charAt(0) &&
                  (t = "/" === t.charAt(1) ? n.protocol + t : n.host + t),
                /^(https?|wss?):\/\//.test(t) ||
                  (t =
                    "undefined" !== typeof n
                      ? n.protocol + "//" + t
                      : "https://" + t),
                (r = rt(t))),
              r.port ||
                (/^(http|ws)$/.test(r.protocol)
                  ? (r.port = "80")
                  : /^(http|ws)s$/.test(r.protocol) && (r.port = "443")),
              (r.path = r.path || "/");
            const i = -1 !== r.host.indexOf(":") ? "[" + r.host + "]" : r.host;
            return (
              (r.id = r.protocol + "://" + i + ":" + r.port + e),
              (r.href =
                r.protocol +
                "://" +
                i +
                (n && n.port === r.port ? "" : ":" + r.port)),
              r
            );
          })(t, (e = e || {}).path || "/socket.io"),
          r = n.source,
          i = n.id,
          o = n.path,
          s = At[i] && o in At[i].nsps;
        let a;
        return (
          e.forceNew || e["force new connection"] || !1 === e.multiplex || s
            ? (a = new _t(r, e))
            : (At[i] || (At[i] = new _t(r, e)), (a = At[i])),
          n.query && !e.query && (e.query = n.queryKey),
          a.socket(n.path, e)
        );
      }
      Object.assign(xt, { Manager: _t, Socket: It, io: xt, connect: xt });
      var Lt = n(5893),
        Tt = (0, a.createContext)({ socket: null }),
        Nt = function (t) {
          var e = t.children,
            n = (0, a.useState)(void 0),
            r = n[0],
            o = n[1];
          (0, a.useEffect)(function () {
            return (
              c(),
              function () {
                return u();
              }
            );
          }, []);
          var c = (function () {
              var t = (0, i.Z)(
                s().mark(function t() {
                  var e;
                  return s().wrap(function (t) {
                    for (;;)
                      switch ((t.prev = t.next)) {
                        case 0:
                          console.log("server--url", "https://gatomeme.com"),
                            (e = xt("https://gatomeme.com")).connect(),
                            o(e),
                            console.log("socket--connect");
                        case 5:
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
            u = function () {
              console.log("socket------disconnect"),
                r && (r.close(), o(void 0));
            };
          return (0, Lt.jsx)(Tt.Provider, {
            value: { socket: r },
            children: e,
          });
        };
    },
    106: function (t, e, n) {
      "use strict";
      n.r(e),
        n.d(e, {
          default: function () {
            return pn;
          },
        });
      var r,
        i = n(9499),
        o = n(29),
        s = n(7794),
        a = n.n(s);
      !(function (t) {
        (t.Mainnet = "mainnet-beta"),
          (t.Testnet = "testnet"),
          (t.Devnet = "devnet");
      })(r || (r = {}));
      var c = n(282),
        u = n(7294),
        h = n(4718);
      const l = ({
        children: t,
        endpoint: e,
        config: n = { commitment: "confirmed" },
      }) => {
        const r = (0, u.useMemo)(() => new c.Connection(e, n), [e, n]);
        return u.createElement(h.h.Provider, { value: { connection: r } }, t);
      };
      var d = n(9607),
        f = n(5615);
      function p(t) {
        return "version" in t;
      }
      class y extends d.mI {
        async sendTransaction(t, e, n = {}) {
          let r = !0;
          try {
            if (p(t)) {
              if (!this.supportedTransactionVersions)
                throw new f.IW(
                  "Sending versioned transactions isn't supported by this wallet"
                );
              if (!this.supportedTransactionVersions.has(t.version))
                throw new f.IW(
                  `Sending transaction version ${t.version} isn't supported by this wallet`
                );
              try {
                const r = (t = await this.signTransaction(t)).serialize();
                return await e.sendRawTransaction(r, n);
              } catch (i) {
                if (i instanceof f.PY) throw ((r = !1), i);
                throw new f.IW(i?.message, i);
              }
            } else
              try {
                const { signers: r, ...i } = n;
                (t = await this.prepareTransaction(t, e, i)),
                  r?.length && t.partialSign(...r);
                const o = (t = await this.signTransaction(t)).serialize();
                return await e.sendRawTransaction(o, i);
              } catch (i) {
                if (i instanceof f.PY) throw ((r = !1), i);
                throw new f.IW(i?.message, i);
              }
          } catch (i) {
            throw (r && this.emit("error", i), i);
          }
        }
        async signAllTransactions(t) {
          for (const n of t)
            if (p(n)) {
              if (!this.supportedTransactionVersions)
                throw new f.PY(
                  "Signing versioned transactions isn't supported by this wallet"
                );
              if (!this.supportedTransactionVersions.has(n.version))
                throw new f.PY(
                  `Signing transaction version ${n.version} isn't supported by this wallet`
                );
            }
          const e = [];
          for (const n of t) e.push(await this.signTransaction(n));
          return e;
        }
      }
      class g extends y {}
      class m extends g {}
      new RegExp(
        "^(?<domain>[^\\n]+?) wants you to sign in with your Solana account:\\n(?<address>[^\\n]+)(?:\\n|$)(?:\\n(?<statement>[\\S\\s]*?)(?:\\n|$))??(?:\\nURI: (?<uri>[^\\n]+))?(?:\\nVersion: (?<version>[^\\n]+))?(?:\\nChain ID: (?<chainId>[^\\n]+))?(?:\\nNonce: (?<nonce>[^\\n]+))?(?:\\nIssued At: (?<issuedAt>[^\\n]+))?(?:\\nExpiration Time: (?<expirationTime>[^\\n]+))?(?:\\nNot Before: (?<notBefore>[^\\n]+))?(?:\\nRequest ID: (?<requestId>[^\\n]+))?(?:\\nResources:(?<resources>(?:\\n- [^\\n]+)*))?\\n*$"
      );
      function w(t) {
        let e = `${t.domain} wants you to sign in with your Solana account:\n`;
        (e += `${t.address}`), t.statement && (e += `\n\n${t.statement}`);
        const n = [];
        if (
          (t.uri && n.push(`URI: ${t.uri}`),
          t.version && n.push(`Version: ${t.version}`),
          t.chainId && n.push(`Chain ID: ${t.chainId}`),
          t.nonce && n.push(`Nonce: ${t.nonce}`),
          t.issuedAt && n.push(`Issued At: ${t.issuedAt}`),
          t.expirationTime && n.push(`Expiration Time: ${t.expirationTime}`),
          t.notBefore && n.push(`Not Before: ${t.notBefore}`),
          t.requestId && n.push(`Request ID: ${t.requestId}`),
          t.resources)
        ) {
          n.push("Resources:");
          for (const e of t.resources) n.push(`- ${e}`);
        }
        return n.length && (e += `\n\n${n.join("\n")}`), e;
      }
      const b = "ERROR_ASSOCIATION_PORT_OUT_OF_RANGE",
        v = "ERROR_FORBIDDEN_WALLET_BASE_URL",
        k = "ERROR_SECURE_CONTEXT_REQUIRED",
        S = "ERROR_SESSION_CLOSED",
        M = "ERROR_SESSION_TIMEOUT",
        I = "ERROR_WALLET_NOT_FOUND",
        E = "ERROR_INVALID_PROTOCOL_VERSION";
      class _ extends Error {
        constructor(...t) {
          const [e, n, r] = t;
          super(n),
            (this.code = e),
            (this.data = r),
            (this.name = "SolanaMobileWalletAdapterError");
        }
      }
      class A extends Error {
        constructor(...t) {
          const [e, n, r, i] = t;
          super(r),
            (this.code = n),
            (this.data = i),
            (this.jsonRpcMessageId = e),
            (this.name = "SolanaMobileWalletAdapterProtocolError");
        }
      }
      function x(t, e, n, r) {
        return new (n || (n = Promise))(function (i, o) {
          function s(t) {
            try {
              c(r.next(t));
            } catch (e) {
              o(e);
            }
          }
          function a(t) {
            try {
              c(r.throw(t));
            } catch (e) {
              o(e);
            }
          }
          function c(t) {
            var e;
            t.done
              ? i(t.value)
              : ((e = t.value),
                e instanceof n
                  ? e
                  : new n(function (t) {
                      t(e);
                    })).then(s, a);
          }
          c((r = r.apply(t, e || [])).next());
        });
      }
      function L(t) {
        return (
          (e = (function (t) {
            return w(t);
          })(t)),
          window.btoa(e)
        );
        var e;
      }
      const T = "solana:signTransactions",
        N = "solana:cloneAuthorization";
      function O(t, e) {
        return new Proxy(
          {},
          {
            get: (n, r) => (
              null == n[r] &&
                (n[r] = function (n) {
                  return x(this, void 0, void 0, function* () {
                    const { method: i, params: o } = (function (t, e, n) {
                        let r = e,
                          i = t
                            .toString()
                            .replace(/[A-Z]/g, (t) => `_${t.toLowerCase()}`)
                            .toLowerCase();
                        switch (t) {
                          case "authorize": {
                            let { chain: t } = r;
                            if ("legacy" === n) {
                              switch (t) {
                                case "solana:testnet":
                                  t = "testnet";
                                  break;
                                case "solana:devnet":
                                  t = "devnet";
                                  break;
                                case "solana:mainnet":
                                  t = "mainnet-beta";
                                  break;
                                default:
                                  t = r.cluster;
                              }
                              r.cluster = t;
                            } else {
                              switch (t) {
                                case "testnet":
                                case "devnet":
                                  t = `solana:${t}`;
                                  break;
                                case "mainnet-beta":
                                  t = "solana:mainnet";
                              }
                              r.chain = t;
                            }
                          }
                          case "reauthorize": {
                            const { auth_token: t, identity: e } = r;
                            if (t)
                              if ("legacy" === n)
                                (i = "reauthorize"),
                                  (r = { auth_token: t, identity: e });
                              else i = "authorize";
                            break;
                          }
                        }
                        return { method: i, params: r };
                      })(r, n, t),
                      s = yield e(i, o);
                    return (
                      "authorize" === i &&
                        o.sign_in_payload &&
                        !s.sign_in_result &&
                        (s.sign_in_result = yield (function (t, e, n) {
                          var r;
                          return x(this, void 0, void 0, function* () {
                            const i =
                                null !== (r = t.domain) && void 0 !== r
                                  ? r
                                  : window.location.host,
                              o = e.accounts[0].address,
                              s = L(
                                Object.assign(Object.assign({}, t), {
                                  domain: i,
                                  address: o,
                                })
                              );
                            return {
                              address: o,
                              signed_message: s,
                              signature: (yield n("sign_messages", {
                                addresses: [o],
                                payloads: [s],
                              })).signed_payloads[0].slice(s.length),
                            };
                          });
                        })(o.sign_in_payload, s, e)),
                      (function (t, e, n) {
                        if ("getCapabilities" === t) {
                          const t = e;
                          switch (n) {
                            case "legacy": {
                              const e = [T];
                              return (
                                !0 === t.supports_clone_authorization &&
                                  e.push(N),
                                Object.assign(Object.assign({}, t), {
                                  features: e,
                                })
                              );
                            }
                            case "v1":
                              return Object.assign(Object.assign({}, t), {
                                supports_sign_and_send_transactions: !0,
                                supports_clone_authorization:
                                  t.features.includes(N),
                              });
                          }
                        }
                        return e;
                      })(r, s, t)
                    );
                  });
                }),
              n[r]
            ),
            defineProperty: () => !1,
            deleteProperty: () => !1,
          }
        );
      }
      function B(t, e, n) {
        return x(this, void 0, void 0, function* () {
          const r = (function (t) {
              if (t >= 4294967296)
                throw new Error(
                  "Outbound sequence number overflow. The maximum sequence number is 32-bytes."
                );
              const e = new ArrayBuffer(4);
              return new DataView(e).setUint32(0, t, !1), new Uint8Array(e);
            })(e),
            i = new Uint8Array(12);
          crypto.getRandomValues(i);
          const o = yield crypto.subtle.encrypt(
              P(r, i),
              n,
              new TextEncoder().encode(t)
            ),
            s = new Uint8Array(r.byteLength + i.byteLength + o.byteLength);
          return (
            s.set(new Uint8Array(r), 0),
            s.set(new Uint8Array(i), r.byteLength),
            s.set(new Uint8Array(o), r.byteLength + i.byteLength),
            s
          );
        });
      }
      function j(t, e) {
        return x(this, void 0, void 0, function* () {
          const n = t.slice(0, 4),
            r = t.slice(4, 16),
            i = t.slice(16),
            o = yield crypto.subtle.decrypt(P(n, r), e, i);
          return (function () {
            void 0 === C && (C = new TextDecoder("utf-8"));
            return C;
          })().decode(o);
        });
      }
      function P(t, e) {
        return { additionalData: t, iv: e, name: "AES-GCM", tagLength: 128 };
      }
      let C;
      function R(t) {
        if (t < 49152 || t > 65535)
          throw new _(
            b,
            `Association port number must be between 49152 and 65535. ${t} given.`,
            { port: t }
          );
        return t;
      }
      function z(t) {
        return t.replace(/(^\/+|\/+$)/g, "").split("/");
      }
      function D(t, e, n, r = ["v1"]) {
        return x(this, void 0, void 0, function* () {
          const i = R(e),
            o = (function (t) {
              let e = "";
              const n = new Uint8Array(t),
                r = n.byteLength;
              for (let i = 0; i < r; i++) e += String.fromCharCode(n[i]);
              return window.btoa(e);
            })(yield crypto.subtle.exportKey("raw", t)),
            s = (function (t, e) {
              let n = null;
              if (e) {
                try {
                  n = new URL(e);
                } catch (i) {}
                if (
                  "https:" !==
                  (null === n || void 0 === n ? void 0 : n.protocol)
                )
                  throw new _(
                    v,
                    "Base URLs supplied by wallets must be valid `https` URLs"
                  );
              }
              n || (n = new URL("solana-wallet:/"));
              const r = t.startsWith("/")
                ? t
                : [...z(n.pathname), ...z(t)].join("/");
              return new URL(r, n);
            })("v1/associate/local", n);
          return (
            s.searchParams.set(
              "association",
              o.replace(/[/+=]/g, (t) => ({ "/": "_", "+": "-", "=": "." }[t]))
            ),
            s.searchParams.set("port", `${i}`),
            r.forEach((t) => {
              s.searchParams.set("v", t);
            }),
            s
          );
        });
      }
      const U = 0,
        W = 1;
      let K = null;
      function q(t, e) {
        return x(this, void 0, void 0, function* () {
          const n = R(49152 + Math.floor(16384 * Math.random())),
            r = yield D(t, n, e);
          if ("https:" === r.protocol) window.location.assign(r);
          else
            try {
              const t = -1 !== navigator.userAgent.indexOf("Firefox/") ? U : W;
              switch (t) {
                case U:
                  (i = r),
                    null == K &&
                      ((K = document.createElement("iframe")),
                      (K.style.display = "none"),
                      document.body.appendChild(K)),
                    (K.contentWindow.location.href = i.toString());
                  break;
                case W: {
                  const t = new Promise((t, e) => {
                    function n() {
                      clearTimeout(i), window.removeEventListener("blur", r);
                    }
                    function r() {
                      n(), t();
                    }
                    window.addEventListener("blur", r);
                    const i = setTimeout(() => {
                      n(), e();
                    }, 2e3);
                  });
                  window.location.assign(r), yield t;
                  break;
                }
              }
            } catch (o) {
              throw new _(
                I,
                "Found no installed wallet that supports the mobile wallet protocol."
              );
            }
          var i;
          return n;
        });
      }
      const H = {
        retryDelayScheduleMs: [150, 150, 200, 500, 500, 750, 750, 1e3],
        timeoutMs: 3e4,
      };
      function F(t) {
        return new DataView(t).getUint32(0, !1);
      }
      function Y(t, e) {
        return x(this, void 0, void 0, function* () {
          !(function () {
            if ("undefined" === typeof window || !0 !== window.isSecureContext)
              throw new _(
                k,
                "The mobile wallet adapter protocol must be used in a secure context (`https`)."
              );
          })();
          const n = yield (function () {
              return x(this, void 0, void 0, function* () {
                return yield crypto.subtle.generateKey(
                  { name: "ECDSA", namedCurve: "P-256" },
                  !1,
                  ["sign"]
                );
              });
            })(),
            r = yield q(
              n.publicKey,
              null === e || void 0 === e ? void 0 : e.baseUri
            ),
            i = `ws://localhost:${r}/solana-wallet`;
          let o;
          const s = (() => {
            const t = [...H.retryDelayScheduleMs];
            return () => (t.length > 1 ? t.shift() : t[0]);
          })();
          let a = 1,
            c = 0,
            u = { __type: "disconnected" };
          return new Promise((e, h) => {
            let l;
            const d = {},
              f = () =>
                x(this, void 0, void 0, function* () {
                  if ("connecting" !== u.__type)
                    return void console.warn(
                      `Expected adapter state to be \`connecting\` at the moment the websocket opens. Got \`${u.__type}\`.`
                    );
                  const { associationKeypair: t } = u;
                  l.removeEventListener("open", f);
                  const e = yield (function () {
                    return x(this, void 0, void 0, function* () {
                      return yield crypto.subtle.generateKey(
                        { name: "ECDH", namedCurve: "P-256" },
                        !1,
                        ["deriveKey", "deriveBits"]
                      );
                    });
                  })();
                  l.send(
                    yield (function (t, e) {
                      return x(this, void 0, void 0, function* () {
                        const n = yield crypto.subtle.exportKey("raw", t),
                          r = yield crypto.subtle.sign(
                            { hash: "SHA-256", name: "ECDSA" },
                            e,
                            n
                          ),
                          i = new Uint8Array(n.byteLength + r.byteLength);
                        return (
                          i.set(new Uint8Array(n), 0),
                          i.set(new Uint8Array(r), n.byteLength),
                          i
                        );
                      });
                    })(e.publicKey, t.privateKey)
                  ),
                    (u = {
                      __type: "hello_req_sent",
                      associationPublicKey: t.publicKey,
                      ecdhPrivateKey: e.privateKey,
                    });
                }),
              p = (t) => {
                t.wasClean
                  ? (u = { __type: "disconnected" })
                  : h(
                      new _(
                        S,
                        `The wallet session dropped unexpectedly (${t.code}: ${t.reason}).`,
                        { closeEvent: t }
                      )
                    ),
                  m();
              },
              y = (t) =>
                x(this, void 0, void 0, function* () {
                  m(),
                    Date.now() - o >= H.timeoutMs
                      ? h(
                          new _(
                            M,
                            `Failed to connect to the wallet websocket on port ${r}.`
                          )
                        )
                      : (yield new Promise((t) => {
                          const e = s();
                          w = window.setTimeout(t, e);
                        }),
                        b());
                }),
              g = (n) =>
                x(this, void 0, void 0, function* () {
                  const r = yield n.data.arrayBuffer();
                  switch (u.__type) {
                    case "connected":
                      try {
                        const t = F(r.slice(0, 4));
                        if (t !== c + 1)
                          throw new Error(
                            "Encrypted message has invalid sequence number"
                          );
                        c = t;
                        const e = yield (function (t, e) {
                            return x(this, void 0, void 0, function* () {
                              const n = yield j(t, e),
                                r = JSON.parse(n);
                              if (Object.hasOwnProperty.call(r, "error"))
                                throw new A(
                                  r.id,
                                  r.error.code,
                                  r.error.message
                                );
                              return r;
                            });
                          })(r, u.sharedSecret),
                          n = d[e.id];
                        delete d[e.id], n.resolve(e.result);
                      } catch (i) {
                        if (!(i instanceof A)) throw i;
                        {
                          const t = d[i.jsonRpcMessageId];
                          delete d[i.jsonRpcMessageId], t.reject(i);
                        }
                      }
                      break;
                    case "hello_req_sent": {
                      const n = yield (function (t, e, n) {
                          return x(this, void 0, void 0, function* () {
                            const [r, i] = yield Promise.all([
                                crypto.subtle.exportKey("raw", e),
                                crypto.subtle.importKey(
                                  "raw",
                                  t.slice(0, 65),
                                  { name: "ECDH", namedCurve: "P-256" },
                                  !1,
                                  []
                                ),
                              ]),
                              o = yield crypto.subtle.deriveBits(
                                { name: "ECDH", public: i },
                                n,
                                256
                              ),
                              s = yield crypto.subtle.importKey(
                                "raw",
                                o,
                                "HKDF",
                                !1,
                                ["deriveKey"]
                              );
                            return yield crypto.subtle.deriveKey(
                              {
                                name: "HKDF",
                                hash: "SHA-256",
                                salt: new Uint8Array(r),
                                info: new Uint8Array(),
                              },
                              s,
                              { name: "AES-GCM", length: 128 },
                              !1,
                              ["encrypt", "decrypt"]
                            );
                          });
                        })(r, u.associationPublicKey, u.ecdhPrivateKey),
                        o = r.slice(65),
                        s =
                          0 !== o.byteLength
                            ? yield (() =>
                                x(this, void 0, void 0, function* () {
                                  const t = F(o.slice(0, 4));
                                  if (t !== c + 1)
                                    throw new Error(
                                      "Encrypted message has invalid sequence number"
                                    );
                                  return (
                                    (c = t),
                                    (function (t, e) {
                                      return x(
                                        this,
                                        void 0,
                                        void 0,
                                        function* () {
                                          const n = yield j(t, e),
                                            r = JSON.parse(n);
                                          let i = "legacy";
                                          if (
                                            Object.hasOwnProperty.call(r, "v")
                                          )
                                            switch (r.v) {
                                              case 1:
                                              case "1":
                                              case "v1":
                                                i = "v1";
                                                break;
                                              case "legacy":
                                                i = "legacy";
                                                break;
                                              default:
                                                throw new _(
                                                  E,
                                                  `Unknown/unsupported protocol version: ${r.v}`
                                                );
                                            }
                                          return { protocol_version: i };
                                        }
                                      );
                                    })(o, n)
                                  );
                                }))()
                            : { protocol_version: "legacy" };
                      u = {
                        __type: "connected",
                        sharedSecret: n,
                        sessionProperties: s,
                      };
                      const f = O(s.protocol_version, (t, e) =>
                        x(this, void 0, void 0, function* () {
                          const r = a++;
                          return (
                            l.send(
                              yield (function (t, e) {
                                return x(this, void 0, void 0, function* () {
                                  return B(JSON.stringify(t), t.id, e);
                                });
                              })(
                                {
                                  id: r,
                                  jsonrpc: "2.0",
                                  method: t,
                                  params: null !== e && void 0 !== e ? e : {},
                                },
                                n
                              )
                            ),
                            new Promise((e, n) => {
                              d[r] = {
                                resolve(r) {
                                  switch (t) {
                                    case "authorize":
                                    case "reauthorize": {
                                      const { wallet_uri_base: t } = r;
                                      if (null != t)
                                        try {
                                          !(function (t) {
                                            let e;
                                            try {
                                              e = new URL(t);
                                            } catch (n) {
                                              throw new _(
                                                v,
                                                "Invalid base URL supplied by wallet"
                                              );
                                            }
                                            if ("https:" !== e.protocol)
                                              throw new _(
                                                v,
                                                "Base URLs supplied by wallets must be valid `https` URLs"
                                              );
                                          })(t);
                                        } catch (i) {
                                          return void n(i);
                                        }
                                      break;
                                    }
                                  }
                                  e(r);
                                },
                                reject: n,
                              };
                            })
                          );
                        })
                      );
                      try {
                        e(yield t(f));
                      } catch (i) {
                        h(i);
                      } finally {
                        m(), l.close();
                      }
                      break;
                    }
                  }
                });
            let m, w;
            const b = () => {
              m && m(),
                (u = { __type: "connecting", associationKeypair: n }),
                void 0 === o && (o = Date.now()),
                (l = new WebSocket(i, ["com.solana.mobilewalletadapter.v1"])),
                l.addEventListener("open", f),
                l.addEventListener("close", p),
                l.addEventListener("error", y),
                l.addEventListener("message", g),
                (m = () => {
                  window.clearTimeout(w),
                    l.removeEventListener("open", f),
                    l.removeEventListener("close", p),
                    l.removeEventListener("error", y),
                    l.removeEventListener("message", g);
                });
            };
            b();
          });
        });
      }
      var V = n(5019);
      function $(t, e) {
        var n = {};
        for (var r in t)
          Object.prototype.hasOwnProperty.call(t, r) &&
            e.indexOf(r) < 0 &&
            (n[r] = t[r]);
        if (null != t && "function" === typeof Object.getOwnPropertySymbols) {
          var i = 0;
          for (r = Object.getOwnPropertySymbols(t); i < r.length; i++)
            e.indexOf(r[i]) < 0 &&
              Object.prototype.propertyIsEnumerable.call(t, r[i]) &&
              (n[r[i]] = t[r[i]]);
        }
        return n;
      }
      function Z(t, e, n, r) {
        return new (n || (n = Promise))(function (i, o) {
          function s(t) {
            try {
              c(r.next(t));
            } catch (e) {
              o(e);
            }
          }
          function a(t) {
            try {
              c(r.throw(t));
            } catch (e) {
              o(e);
            }
          }
          function c(t) {
            var e;
            t.done
              ? i(t.value)
              : ((e = t.value),
                e instanceof n
                  ? e
                  : new n(function (t) {
                      t(e);
                    })).then(s, a);
          }
          c((r = r.apply(t, e || [])).next());
        });
      }
      function G(t) {
        return window.btoa(String.fromCharCode.call(null, ...t));
      }
      function Q(t) {
        return new Uint8Array(
          window
            .atob(t)
            .split("")
            .map((t) => t.charCodeAt(0))
        );
      }
      function J(t) {
        return G(
          "version" in t
            ? t.serialize()
            : t.serialize({ requireAllSignatures: !1, verifySignatures: !1 })
        );
      }
      function X(t) {
        const e = t[0] * c.SIGNATURE_LENGTH_IN_BYTES + 1;
        return "legacy" ===
          c.VersionedMessage.deserializeMessageVersion(t.slice(e, t.length))
          ? c.Transaction.from(t)
          : c.VersionedTransaction.deserialize(t);
      }
      function tt(t, e, n, r) {
        return new (n || (n = Promise))(function (i, o) {
          function s(t) {
            try {
              c(r.next(t));
            } catch (e) {
              o(e);
            }
          }
          function a(t) {
            try {
              c(r.throw(t));
            } catch (e) {
              o(e);
            }
          }
          function c(t) {
            var e;
            t.done
              ? i(t.value)
              : ((e = t.value),
                e instanceof n
                  ? e
                  : new n(function (t) {
                      t(e);
                    })).then(s, a);
          }
          c((r = r.apply(t, e || [])).next());
        });
      }
      function et(t) {
        return new Uint8Array(
          window
            .atob(t)
            .split("")
            .map((t) => t.charCodeAt(0))
        );
      }
      const nt = "Mobile Wallet Adapter";
      function rt(t) {
        return "version" in t;
      }
      class it extends m {
        constructor(t) {
          var e;
          super(),
            (this.supportedTransactionVersions = new Set(["legacy", 0])),
            (this.name = nt),
            (this.url = "https://solanamobile.com/wallets"),
            (this.icon =
              "data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjI4IiB3aWR0aD0iMjgiIHZpZXdCb3g9Ii0zIDAgMjggMjgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9SCM8yMDAwL3N2ZyI+PGcgZmlsbD0iI0RDQjhGRiI+PHBhdGggZD0iTTE3LjQgMTcuNEgxNXYyLjRoMi40di0yLjRabTEuMi05LjZoLTIuNHYyLjRoMi40VjcuOFoiLz48cGF0aCBkPSJNMjEuNiAzVjBoLTIuNHYzaC0zLjZWMGgtMi40djNoLTIuNHY2LjZINC41YTIuMSAyLjEgMCAxIDEgMC00LjJoMi43VjNINC41QTQuNSA0LjUgMCAwIDAgMCA3LjVWMjRoMjEuNnYtNi42aC0yLjR2NC4ySDIuNFYxMS41Yy41LjMgMS4yLjQgMS44LjVoNy41QTYuNiA2LjYgMCAwIDAgMjQgOVYzaC0yLjRabTAgNS43YTQuMiA0LjIgMCAxIDEtOC40IDBWNS40aDguNHYzLjNaIi8+PC9nPjwvc3ZnPg=="),
            (this._connecting = !1),
            (this._connectionGeneration = 0),
            (this._readyState =
              "undefined" !== typeof window &&
              window.isSecureContext &&
              "undefined" !== typeof document &&
              /android/i.test(navigator.userAgent)
                ? d.i1.Loadable
                : d.i1.Unsupported),
            (this._authorizationResultCache = t.authorizationResultCache),
            (this._addressSelector = t.addressSelector),
            (this._appIdentity = t.appIdentity),
            (this._chain =
              null !== (e = t.chain) && void 0 !== e ? e : t.cluster),
            (this._onWalletNotFound = t.onWalletNotFound),
            this._readyState !== d.i1.Unsupported &&
              this._authorizationResultCache.get().then((t) => {
                t && this.declareWalletAsInstalled();
              });
        }
        get publicKey() {
          if (null == this._publicKey && null != this._selectedAddress)
            try {
              this._publicKey = (function (t) {
                const e = et(t);
                return new c.PublicKey(e);
              })(this._selectedAddress);
            } catch (t) {
              throw new f.Nx(
                (t instanceof Error &&
                  (null === t || void 0 === t ? void 0 : t.message)) ||
                  "Unknown error",
                t
              );
            }
          return this._publicKey ? this._publicKey : null;
        }
        get connected() {
          return !!this._authorizationResult;
        }
        get connecting() {
          return this._connecting;
        }
        get readyState() {
          return this._readyState;
        }
        declareWalletAsInstalled() {
          this._readyState !== d.i1.Installed &&
            this.emit("readyStateChange", (this._readyState = d.i1.Installed));
        }
        runWithGuard(t) {
          return tt(this, void 0, void 0, function* () {
            try {
              return yield t();
            } catch (e) {
              throw (this.emit("error", e), e);
            }
          });
        }
        autoConnect_DO_NOT_USE_OR_YOU_WILL_BE_FIRED() {
          return tt(this, void 0, void 0, function* () {
            return yield this.autoConnect();
          });
        }
        autoConnect() {
          return tt(this, void 0, void 0, function* () {
            if (!this.connecting && !this.connected)
              return yield this.runWithGuard(() =>
                tt(this, void 0, void 0, function* () {
                  if (
                    this._readyState !== d.i1.Installed &&
                    this._readyState !== d.i1.Loadable
                  )
                    throw new f.OZ();
                  this._connecting = !0;
                  try {
                    const t = yield this._authorizationResultCache.get();
                    t && this.handleAuthorizationResult(t);
                  } catch (t) {
                    throw new f.$w(
                      (t instanceof Error && t.message) || "Unknown error",
                      t
                    );
                  } finally {
                    this._connecting = !1;
                  }
                })
              );
          });
        }
        connect() {
          return tt(this, void 0, void 0, function* () {
            if (!this.connecting && !this.connected)
              return yield this.runWithGuard(() =>
                tt(this, void 0, void 0, function* () {
                  if (
                    this._readyState !== d.i1.Installed &&
                    this._readyState !== d.i1.Loadable
                  )
                    throw new f.OZ();
                  this._connecting = !0;
                  try {
                    yield this.performAuthorization();
                  } catch (t) {
                    throw new f.$w(
                      (t instanceof Error && t.message) || "Unknown error",
                      t
                    );
                  } finally {
                    this._connecting = !1;
                  }
                })
              );
          });
        }
        performAuthorization(t) {
          return tt(this, void 0, void 0, function* () {
            try {
              const e = yield this._authorizationResultCache.get();
              return e
                ? (this.handleAuthorizationResult(e), e)
                : yield this.transact((e) =>
                    tt(this, void 0, void 0, function* () {
                      const n = yield e.authorize({
                        chain: this._chain,
                        identity: this._appIdentity,
                        sign_in_payload: t,
                      });
                      return (
                        Promise.all([
                          this._authorizationResultCache.set(n),
                          this.handleAuthorizationResult(n),
                        ]),
                        n
                      );
                    })
                  );
            } catch (e) {
              throw new f.$w(
                (e instanceof Error && e.message) || "Unknown error",
                e
              );
            }
          });
        }
        handleAuthorizationResult(t) {
          var e;
          return tt(this, void 0, void 0, function* () {
            const n =
              null == this._authorizationResult ||
              (null === (e = this._authorizationResult) || void 0 === e
                ? void 0
                : e.accounts.length) !== t.accounts.length ||
              this._authorizationResult.accounts.some(
                (e, n) => e.address !== t.accounts[n].address
              );
            if (
              ((this._authorizationResult = t),
              this.declareWalletAsInstalled(),
              n)
            ) {
              const e = yield this._addressSelector.select(
                t.accounts.map(({ address: t }) => t)
              );
              e !== this._selectedAddress &&
                ((this._selectedAddress = e),
                delete this._publicKey,
                this.emit("connect", this.publicKey));
            }
          });
        }
        performReauthorization(t, e) {
          return tt(this, void 0, void 0, function* () {
            try {
              const n = yield t.authorize({
                auth_token: e,
                identity: this._appIdentity,
              });
              Promise.all([
                this._authorizationResultCache.set(n),
                this.handleAuthorizationResult(n),
              ]);
            } catch (n) {
              throw (
                (this.disconnect(),
                new f.at(
                  (n instanceof Error &&
                    (null === n || void 0 === n ? void 0 : n.message)) ||
                    "Unknown error",
                  n
                ))
              );
            }
          });
        }
        disconnect() {
          return tt(this, void 0, void 0, function* () {
            this._authorizationResultCache.clear(),
              (this._connecting = !1),
              this._connectionGeneration++,
              delete this._authorizationResult,
              delete this._publicKey,
              delete this._selectedAddress,
              this.emit("disconnect");
          });
        }
        transact(t) {
          var e;
          return tt(this, void 0, void 0, function* () {
            const n =
                null === (e = this._authorizationResult) || void 0 === e
                  ? void 0
                  : e.wallet_uri_base,
              r = n ? { baseUri: n } : void 0,
              i = this._connectionGeneration;
            try {
              return yield (function (t, e) {
                return Z(this, void 0, void 0, function* () {
                  return yield Y((e) => {
                    const n = new Proxy(
                      {},
                      {
                        get(t, n) {
                          if (null == t[n])
                            switch (n) {
                              case "signAndSendTransactions":
                                t[n] = function (t) {
                                  var {
                                      minContextSlot: n,
                                      commitment: r,
                                      skipPreflight: i,
                                      maxRetries: o,
                                      waitForCommitmentToSendNextTransaction: s,
                                      transactions: a,
                                    } = t,
                                    c = $(t, [
                                      "minContextSlot",
                                      "commitment",
                                      "skipPreflight",
                                      "maxRetries",
                                      "waitForCommitmentToSendNextTransaction",
                                      "transactions",
                                    ]);
                                  return Z(this, void 0, void 0, function* () {
                                    const t = a.map(J),
                                      u = {
                                        min_context_slot: n,
                                        commitment: r,
                                        skip_preflight: i,
                                        max_retries: o,
                                        wait_for_commitment_to_send_next_transaction:
                                          s,
                                      },
                                      { signatures: h } =
                                        yield e.signAndSendTransactions(
                                          Object.assign(
                                            Object.assign(
                                              Object.assign({}, c),
                                              Object.values(u).some(
                                                (t) => null != t
                                              )
                                                ? { options: u }
                                                : null
                                            ),
                                            { payloads: t }
                                          )
                                        );
                                    return h.map(Q).map(V.encode);
                                  });
                                };
                                break;
                              case "signMessages":
                                t[n] = function (t) {
                                  var { payloads: n } = t,
                                    r = $(t, ["payloads"]);
                                  return Z(this, void 0, void 0, function* () {
                                    const t = n.map(G),
                                      { signed_payloads: i } =
                                        yield e.signMessages(
                                          Object.assign(Object.assign({}, r), {
                                            payloads: t,
                                          })
                                        );
                                    return i.map(Q);
                                  });
                                };
                                break;
                              case "signTransactions":
                                t[n] = function (t) {
                                  var { transactions: n } = t,
                                    r = $(t, ["transactions"]);
                                  return Z(this, void 0, void 0, function* () {
                                    const t = n.map(J),
                                      { signed_payloads: i } =
                                        yield e.signTransactions(
                                          Object.assign(Object.assign({}, r), {
                                            payloads: t,
                                          })
                                        );
                                    return i.map(Q).map(X);
                                  });
                                };
                                break;
                              default:
                                t[n] = e[n];
                            }
                          return t[n];
                        },
                        defineProperty: () => !1,
                        deleteProperty: () => !1,
                      }
                    );
                    return t(n);
                  }, e);
                });
              })(t, r);
            } catch (o) {
              throw (
                (this._connectionGeneration !== i &&
                  (yield new Promise(() => {})),
                o instanceof Error &&
                  "SolanaMobileWalletAdapterError" === o.name &&
                  "ERROR_WALLET_NOT_FOUND" === o.code &&
                  (yield this._onWalletNotFound(this)),
                o)
              );
            }
          });
        }
        assertIsAuthorized() {
          if (!this._authorizationResult || !this._selectedAddress)
            throw new f.oS();
          return {
            authToken: this._authorizationResult.auth_token,
            selectedAddress: this._selectedAddress,
          };
        }
        performSignTransactions(t) {
          return tt(this, void 0, void 0, function* () {
            const { authToken: e } = this.assertIsAuthorized();
            try {
              return yield this.transact((n) =>
                tt(this, void 0, void 0, function* () {
                  yield this.performReauthorization(n, e);
                  return yield n.signTransactions({ transactions: t });
                })
              );
            } catch (n) {
              throw new f.PY(
                null === n || void 0 === n ? void 0 : n.message,
                n
              );
            }
          });
        }
        sendTransaction(t, e, n) {
          return tt(this, void 0, void 0, function* () {
            return yield this.runWithGuard(() =>
              tt(this, void 0, void 0, function* () {
                const { authToken: r } = this.assertIsAuthorized(),
                  i = null === n || void 0 === n ? void 0 : n.minContextSlot;
                try {
                  return yield this.transact((o) =>
                    tt(this, void 0, void 0, function* () {
                      function s() {
                        let t, r;
                        switch (e.commitment) {
                          case "confirmed":
                          case "finalized":
                          case "processed":
                            t = e.commitment;
                            break;
                          default:
                            t = "finalized";
                        }
                        switch (
                          null === n || void 0 === n
                            ? void 0
                            : n.preflightCommitment
                        ) {
                          case "confirmed":
                          case "finalized":
                          case "processed":
                            r = n.preflightCommitment;
                            break;
                          case void 0:
                            r = t;
                            break;
                          default:
                            r = "finalized";
                        }
                        return ("finalized" === r
                          ? 2
                          : "confirmed" === r
                          ? 1
                          : 0) <
                          ("finalized" === t ? 2 : "confirmed" === t ? 1 : 0)
                          ? r
                          : t;
                      }
                      const [a, c, u] = yield Promise.all([
                        o.getCapabilities(),
                        this.performReauthorization(o, r),
                        rt(t)
                          ? null
                          : (() =>
                              tt(this, void 0, void 0, function* () {
                                var n;
                                if (
                                  (t.feePayer ||
                                    (t.feePayer =
                                      null !== (n = this.publicKey) &&
                                      void 0 !== n
                                        ? n
                                        : void 0),
                                  null == t.recentBlockhash)
                                ) {
                                  const { blockhash: n } =
                                    yield e.getLatestBlockhash({
                                      commitment: s(),
                                    });
                                  t.recentBlockhash = n;
                                }
                              }))(),
                      ]);
                      if (a.supports_sign_and_send_transactions) {
                        return (yield o.signAndSendTransactions({
                          minContextSlot: i,
                          transactions: [t],
                        }))[0];
                      }
                      {
                        const [r] = yield o.signTransactions({
                          transactions: [t],
                        });
                        if (rt(r)) return yield e.sendTransaction(r);
                        {
                          const t = r.serialize();
                          return yield e.sendRawTransaction(
                            t,
                            Object.assign(Object.assign({}, n), {
                              preflightCommitment: s(),
                            })
                          );
                        }
                      }
                    })
                  );
                } catch (o) {
                  throw new f.IW(
                    null === o || void 0 === o ? void 0 : o.message,
                    o
                  );
                }
              })
            );
          });
        }
        signTransaction(t) {
          return tt(this, void 0, void 0, function* () {
            return yield this.runWithGuard(() =>
              tt(this, void 0, void 0, function* () {
                const [e] = yield this.performSignTransactions([t]);
                return e;
              })
            );
          });
        }
        signAllTransactions(t) {
          return tt(this, void 0, void 0, function* () {
            return yield this.runWithGuard(() =>
              tt(this, void 0, void 0, function* () {
                return yield this.performSignTransactions(t);
              })
            );
          });
        }
        signMessage(t) {
          return tt(this, void 0, void 0, function* () {
            return yield this.runWithGuard(() =>
              tt(this, void 0, void 0, function* () {
                const { authToken: e, selectedAddress: n } =
                  this.assertIsAuthorized();
                try {
                  return yield this.transact((r) =>
                    tt(this, void 0, void 0, function* () {
                      yield this.performReauthorization(r, e);
                      const [i] = yield r.signMessages({
                        addresses: [n],
                        payloads: [t],
                      });
                      return i.slice(-64);
                    })
                  );
                } catch (r) {
                  throw new f.fk(
                    null === r || void 0 === r ? void 0 : r.message,
                    r
                  );
                }
              })
            );
          });
        }
        signIn(t) {
          return tt(this, void 0, void 0, function* () {
            return yield this.runWithGuard(() =>
              tt(this, void 0, void 0, function* () {
                var e, n;
                if (
                  this._readyState !== d.i1.Installed &&
                  this._readyState !== d.i1.Loadable
                )
                  throw new f.OZ();
                this._connecting = !0;
                try {
                  const r = yield this.performAuthorization(
                    Object.assign(Object.assign({}, t), {
                      domain:
                        null !==
                          (e =
                            null === t || void 0 === t ? void 0 : t.domain) &&
                        void 0 !== e
                          ? e
                          : window.location.host,
                    })
                  );
                  if (!r.sign_in_result)
                    throw new Error(
                      "Sign in failed, no sign in result returned by wallet"
                    );
                  const i = r.sign_in_result.address;
                  return {
                    account: Object.assign(
                      Object.assign(
                        {},
                        null !== (n = r.accounts.find((t) => t.address == i)) &&
                          void 0 !== n
                          ? n
                          : { address: i }
                      ),
                      { publicKey: et(i) }
                    ),
                    signedMessage: et(r.sign_in_result.signed_message),
                    signature: et(r.sign_in_result.signature),
                  };
                } catch (r) {
                  throw new f.$w(
                    (r instanceof Error && r.message) || "Unknown error",
                    r
                  );
                } finally {
                  this._connecting = !1;
                }
              })
            );
          });
        }
      }
      const ot = "SolanaMobileWalletAdapterDefaultAuthorizationCache";
      function st() {
        let t;
        try {
          t = window.localStorage;
        } catch (e) {}
        return {
          clear() {
            return tt(this, void 0, void 0, function* () {
              if (t)
                try {
                  t.removeItem(ot);
                } catch (e) {}
            });
          },
          get() {
            return tt(this, void 0, void 0, function* () {
              if (t)
                try {
                  return JSON.parse(t.getItem(ot)) || void 0;
                } catch (e) {}
            });
          },
          set(n) {
            return tt(this, void 0, void 0, function* () {
              if (t)
                try {
                  t.setItem(ot, JSON.stringify(n));
                } catch (e) {}
            });
          },
        };
      }
      function at(t) {
        return tt(this, void 0, void 0, function* () {
          "undefined" !== typeof window && window.location.assign(t.url);
        });
      }
      var ct = n(3149),
        ut = n(8112);
      const ht = "standard:connect",
        lt = "standard:events";
      const dt = function (t) {
        return (
          ht in t.features &&
          lt in t.features &&
          (ct.G in t.features || ut.R in t.features)
        );
      };
      var ft = n(1999);
      const pt = "solana:signIn",
        yt = "solana:mainnet",
        gt = "solana:devnet",
        mt = "solana:testnet",
        wt = "solana:localnet";
      const bt = "https://api.mainnet-beta.solana.com";
      function vt(t) {
        switch (t) {
          case "processed":
          case "confirmed":
          case "finalized":
          case void 0:
            return t;
          case "recent":
            return "processed";
          case "single":
          case "singleGossip":
            return "confirmed";
          case "max":
          case "root":
            return "finalized";
          default:
            return;
        }
      }
      const kt = "standard:disconnect";
      function St(t, e) {
        if (t === e) return !0;
        const n = t.length;
        if (n !== e.length) return !1;
        for (let r = 0; r < n; r++) if (t[r] !== e[r]) return !1;
        return !0;
      }
      new WeakMap(),
        new WeakMap(),
        new WeakMap(),
        new WeakMap(),
        new WeakMap(),
        new WeakMap();
      var Mt,
        It,
        Et,
        _t,
        At,
        xt,
        Lt,
        Tt,
        Nt,
        Ot,
        Bt,
        jt,
        Pt,
        Ct,
        Rt,
        zt,
        Dt,
        Ut,
        Wt = n(7191),
        Kt = function (t, e, n, r, i) {
          if ("m" === r) throw new TypeError("Private method is not writable");
          if ("a" === r && !i)
            throw new TypeError(
              "Private accessor was defined without a setter"
            );
          if ("function" === typeof e ? t !== e || !i : !e.has(t))
            throw new TypeError(
              "Cannot write private member to an object whose class did not declare it"
            );
          return "a" === r ? i.call(t, n) : i ? (i.value = n) : e.set(t, n), n;
        },
        qt = function (t, e, n, r) {
          if ("a" === n && !r)
            throw new TypeError(
              "Private accessor was defined without a getter"
            );
          if ("function" === typeof e ? t !== e || !r : !e.has(t))
            throw new TypeError(
              "Cannot read private member from an object whose class did not declare it"
            );
          return "m" === n ? r : "a" === n ? r.call(t) : r ? r.value : e.get(t);
        };
      class Ht extends d.mI {
        constructor({ wallet: t }) {
          super(),
            Mt.add(this),
            It.set(this, void 0),
            Et.set(this, void 0),
            _t.set(this, void 0),
            At.set(this, void 0),
            xt.set(this, void 0),
            Lt.set(this, void 0),
            Tt.set(this, void 0),
            Nt.set(
              this,
              "undefined" === typeof window || "undefined" === typeof document
                ? d.i1.Unsupported
                : d.i1.Installed
            ),
            Ct.set(this, (t) => {
              if ("accounts" in t) {
                const t = qt(this, Tt, "f").accounts[0];
                qt(this, It, "f") &&
                  !qt(this, At, "f") &&
                  t !== qt(this, It, "f") &&
                  (t
                    ? qt(this, Mt, "m", Bt).call(this, t)
                    : (this.emit("error", new f.at()),
                      qt(this, Mt, "m", jt).call(this)));
              }
              "features" in t && qt(this, Mt, "m", Pt).call(this);
            }),
            Kt(this, Tt, t, "f"),
            Kt(this, It, null, "f"),
            Kt(this, Et, null, "f"),
            Kt(this, _t, !1, "f"),
            Kt(this, At, !1, "f"),
            Kt(
              this,
              xt,
              qt(this, Tt, "f").features[lt].on("change", qt(this, Ct, "f")),
              "f"
            ),
            qt(this, Mt, "m", Pt).call(this);
        }
        get name() {
          return qt(this, Tt, "f").name;
        }
        get url() {
          return "https://github.com/solana-labs/wallet-standard";
        }
        get icon() {
          return qt(this, Tt, "f").icon;
        }
        get readyState() {
          return qt(this, Nt, "f");
        }
        get publicKey() {
          return qt(this, Et, "f");
        }
        get connecting() {
          return qt(this, _t, "f");
        }
        get supportedTransactionVersions() {
          return qt(this, Lt, "f");
        }
        get wallet() {
          return qt(this, Tt, "f");
        }
        get standard() {
          return !0;
        }
        destroy() {
          Kt(this, It, null, "f"),
            Kt(this, Et, null, "f"),
            Kt(this, _t, !1, "f"),
            Kt(this, At, !1, "f");
          const t = qt(this, xt, "f");
          t && (Kt(this, xt, null, "f"), t());
        }
        async autoConnect() {
          return qt(this, Mt, "m", Ot).call(this, { silent: !0 });
        }
        async connect() {
          return qt(this, Mt, "m", Ot).call(this);
        }
        async disconnect() {
          if (kt in qt(this, Tt, "f").features)
            try {
              Kt(this, At, !0, "f"),
                await qt(this, Tt, "f").features[kt].disconnect();
            } catch (t) {
              this.emit("error", new f.UG(t?.message, t));
            } finally {
              Kt(this, At, !1, "f");
            }
          qt(this, Mt, "m", jt).call(this);
        }
        async sendTransaction(t, e, n = {}) {
          try {
            const o = qt(this, It, "f");
            if (!o) throw new f.oS();
            let s;
            if (ct.G in qt(this, Tt, "f").features)
              if (o.features.includes(ct.G)) s = ct.G;
              else {
                if (
                  !(ut.R in qt(this, Tt, "f").features) ||
                  !o.features.includes(ut.R)
                )
                  throw new f.cO();
                s = ut.R;
              }
            else {
              if (!(ut.R in qt(this, Tt, "f").features)) throw new f.p6();
              if (!o.features.includes(ut.R)) throw new f.cO();
              s = ut.R;
            }
            const a = (r = e.rpcEndpoint).includes(bt)
              ? yt
              : /\bdevnet\b/i.test(r)
              ? gt
              : /\btestnet\b/i.test(r)
              ? mt
              : /\blocalhost\b/i.test(r) || /\b127\.0\.0\.1\b/.test(r)
              ? wt
              : yt;
            if (!o.chains.includes(a)) throw new f.IW();
            try {
              const { signers: r, ...i } = n;
              let c;
              if (
                (p(t)
                  ? (r?.length && t.sign(r), (c = t.serialize()))
                  : ((t = await this.prepareTransaction(t, e, i)),
                    r?.length && t.partialSign(...r),
                    (c = new Uint8Array(
                      t.serialize({
                        requireAllSignatures: !1,
                        verifySignatures: !1,
                      })
                    ))),
                s === ct.G)
              ) {
                const [t] = await qt(this, Tt, "f").features[
                  ct.G
                ].signAndSendTransaction({
                  account: o,
                  chain: a,
                  transaction: c,
                  options: {
                    preflightCommitment: vt(
                      i.preflightCommitment || e.commitment
                    ),
                    skipPreflight: i.skipPreflight,
                    maxRetries: i.maxRetries,
                    minContextSlot: i.minContextSlot,
                  },
                });
                return Wt.encode(t.signature);
              }
              {
                const [t] = await qt(this, Tt, "f").features[
                  ut.R
                ].signTransaction({
                  account: o,
                  chain: a,
                  transaction: c,
                  options: {
                    preflightCommitment: vt(
                      i.preflightCommitment || e.commitment
                    ),
                    minContextSlot: i.minContextSlot,
                  },
                });
                return await e.sendRawTransaction(t.signedTransaction, {
                  ...i,
                  preflightCommitment: vt(
                    i.preflightCommitment || e.commitment
                  ),
                });
              }
            } catch (i) {
              if (i instanceof f.lj) throw i;
              throw new f.IW(i?.message, i);
            }
          } catch (i) {
            throw (this.emit("error", i), i);
          }
          var r;
        }
      }
      (It = new WeakMap()),
        (Et = new WeakMap()),
        (_t = new WeakMap()),
        (At = new WeakMap()),
        (xt = new WeakMap()),
        (Lt = new WeakMap()),
        (Tt = new WeakMap()),
        (Nt = new WeakMap()),
        (Ct = new WeakMap()),
        (Mt = new WeakSet()),
        (Ot = async function (t) {
          try {
            if (this.connected || this.connecting) return;
            if (qt(this, Nt, "f") !== d.i1.Installed) throw new f.OZ();
            if ((Kt(this, _t, !0, "f"), !qt(this, Tt, "f").accounts.length))
              try {
                await qt(this, Tt, "f").features[ht].connect(t);
              } catch (e) {
                throw new f.$w(e?.message, e);
              }
            const n = qt(this, Tt, "f").accounts[0];
            if (!n) throw new f.cO();
            qt(this, Mt, "m", Bt).call(this, n);
          } catch (e) {
            throw (this.emit("error", e), e);
          } finally {
            Kt(this, _t, !1, "f");
          }
        }),
        (Bt = function (t) {
          let e;
          try {
            e = new c.PublicKey(t.address);
          } catch (n) {
            throw new f.Nx(n?.message, n);
          }
          Kt(this, It, t, "f"),
            Kt(this, Et, e, "f"),
            qt(this, Mt, "m", Pt).call(this),
            this.emit("connect", e);
        }),
        (jt = function () {
          Kt(this, It, null, "f"),
            Kt(this, Et, null, "f"),
            qt(this, Mt, "m", Pt).call(this),
            this.emit("disconnect");
        }),
        (Pt = function () {
          const t =
            ct.G in qt(this, Tt, "f").features
              ? qt(this, Tt, "f").features[ct.G].supportedTransactionVersions
              : qt(this, Tt, "f").features[ut.R].supportedTransactionVersions;
          Kt(this, Lt, St(t, ["legacy"]) ? null : new Set(t), "f"),
            ut.R in qt(this, Tt, "f").features &&
            qt(this, It, "f")?.features.includes(ut.R)
              ? ((this.signTransaction = qt(this, Mt, "m", Rt)),
                (this.signAllTransactions = qt(this, Mt, "m", zt)))
              : (delete this.signTransaction, delete this.signAllTransactions),
            ft.g in qt(this, Tt, "f").features &&
            qt(this, It, "f")?.features.includes(ft.g)
              ? (this.signMessage = qt(this, Mt, "m", Dt))
              : delete this.signMessage,
            pt in qt(this, Tt, "f").features
              ? (this.signIn = qt(this, Mt, "m", Ut))
              : delete this.signIn;
        }),
        (Rt = async function (t) {
          try {
            const n = qt(this, It, "f");
            if (!n) throw new f.oS();
            if (!(ut.R in qt(this, Tt, "f").features)) throw new f.p6();
            if (!n.features.includes(ut.R)) throw new f.cO();
            try {
              const e = (
                await qt(this, Tt, "f").features[ut.R].signTransaction({
                  account: n,
                  transaction: p(t)
                    ? t.serialize()
                    : new Uint8Array(
                        t.serialize({
                          requireAllSignatures: !1,
                          verifySignatures: !1,
                        })
                      ),
                })
              )[0].signedTransaction;
              return p(t)
                ? c.VersionedTransaction.deserialize(e)
                : c.Transaction.from(e);
            } catch (e) {
              if (e instanceof f.lj) throw e;
              throw new f.PY(e?.message, e);
            }
          } catch (e) {
            throw (this.emit("error", e), e);
          }
        }),
        (zt = async function (t) {
          try {
            const n = qt(this, It, "f");
            if (!n) throw new f.oS();
            if (!(ut.R in qt(this, Tt, "f").features)) throw new f.p6();
            if (!n.features.includes(ut.R)) throw new f.cO();
            try {
              const e = await qt(this, Tt, "f").features[ut.R].signTransaction(
                ...t.map((t) => ({
                  account: n,
                  transaction: p(t)
                    ? t.serialize()
                    : new Uint8Array(
                        t.serialize({
                          requireAllSignatures: !1,
                          verifySignatures: !1,
                        })
                      ),
                }))
              );
              return t.map((t, n) => {
                const r = e[n].signedTransaction;
                return p(t)
                  ? c.VersionedTransaction.deserialize(r)
                  : c.Transaction.from(r);
              });
            } catch (e) {
              throw new f.PY(e?.message, e);
            }
          } catch (e) {
            throw (this.emit("error", e), e);
          }
        }),
        (Dt = async function (t) {
          try {
            const n = qt(this, It, "f");
            if (!n) throw new f.oS();
            if (!(ft.g in qt(this, Tt, "f").features)) throw new f.p6();
            if (!n.features.includes(ft.g)) throw new f.cO();
            try {
              return (
                await qt(this, Tt, "f").features[ft.g].signMessage({
                  account: n,
                  message: t,
                })
              )[0].signature;
            } catch (e) {
              throw new f.fk(e?.message, e);
            }
          } catch (e) {
            throw (this.emit("error", e), e);
          }
        }),
        (Ut = async function (t = {}) {
          try {
            if (!(pt in qt(this, Tt, "f").features)) throw new f.p6();
            let n;
            try {
              [n] = await qt(this, Tt, "f").features[pt].signIn(t);
            } catch (e) {
              throw new f.bD(e?.message, e);
            }
            if (!n) throw new f.bD();
            return qt(this, Mt, "m", Bt).call(this, n.account), n;
          } catch (e) {
            throw (this.emit("error", e), e);
          }
        });
      var Ft,
        Yt = function (t, e, n, r, i) {
          if ("m" === r) throw new TypeError("Private method is not writable");
          if ("a" === r && !i)
            throw new TypeError(
              "Private accessor was defined without a setter"
            );
          if ("function" === typeof e ? t !== e || !i : !e.has(t))
            throw new TypeError(
              "Cannot write private member to an object whose class did not declare it"
            );
          return "a" === r ? i.call(t, n) : i ? (i.value = n) : e.set(t, n), n;
        },
        Vt = function (t, e, n, r) {
          if ("a" === n && !r)
            throw new TypeError(
              "Private accessor was defined without a getter"
            );
          if ("function" === typeof e ? t !== e || !r : !e.has(t))
            throw new TypeError(
              "Cannot read private member from an object whose class did not declare it"
            );
          return "m" === n ? r : "a" === n ? r.call(t) : r ? r.value : e.get(t);
        };
      let $t;
      const Zt = new Set(),
        Gt = {};
      function Qt() {
        if ($t) return $t;
        if (
          (($t = Object.freeze({ register: Jt, get: Xt, on: te })),
          "undefined" === typeof window)
        )
          return $t;
        const t = Object.freeze({ register: Jt });
        try {
          window.addEventListener(
            "wallet-standard:register-wallet",
            ({ detail: e }) => e(t)
          );
        } catch (e) {
          console.error(
            "wallet-standard:register-wallet event listener could not be added\n",
            e
          );
        }
        try {
          window.dispatchEvent(new ne(t));
        } catch (e) {
          console.error(
            "wallet-standard:app-ready event could not be dispatched\n",
            e
          );
        }
        return $t;
      }
      function Jt(...t) {
        return (t = t.filter((t) => !Zt.has(t))).length
          ? (t.forEach((t) => Zt.add(t)),
            Gt.register?.forEach((e) => ee(() => e(...t))),
            function () {
              t.forEach((t) => Zt.delete(t)),
                Gt.unregister?.forEach((e) => ee(() => e(...t)));
            })
          : () => {};
      }
      function Xt() {
        return [...Zt];
      }
      function te(t, e) {
        return (
          Gt[t]?.push(e) || (Gt[t] = [e]),
          function () {
            Gt[t] = Gt[t]?.filter((t) => e !== t);
          }
        );
      }
      function ee(t) {
        try {
          t();
        } catch (e) {
          console.error(e);
        }
      }
      class ne extends Event {
        constructor(t) {
          super("wallet-standard:app-ready", {
            bubbles: !1,
            cancelable: !1,
            composed: !1,
          }),
            Ft.set(this, void 0),
            Yt(this, Ft, t, "f");
        }
        get detail() {
          return Vt(this, Ft, "f");
        }
        get type() {
          return "wallet-standard:app-ready";
        }
        preventDefault() {
          throw new Error("preventDefault cannot be called");
        }
        stopImmediatePropagation() {
          throw new Error("stopImmediatePropagation cannot be called");
        }
        stopPropagation() {
          throw new Error("stopPropagation cannot be called");
        }
      }
      function re(t) {
        const e = ie(() => new Set()),
          { get: n, on: r } = ie(() =>
            (function () {
              if ($t) return $t;
              if ((($t = Qt()), "undefined" === typeof window)) return $t;
              const t = window.navigator.wallets || [];
              if (!Array.isArray(t))
                return (
                  console.error("window.navigator.wallets is not an array"), $t
                );
              const { register: e } = $t,
                n = (...t) => t.forEach((t) => ee(() => t({ register: e })));
              try {
                Object.defineProperty(window.navigator, "wallets", {
                  value: Object.freeze({ push: n }),
                });
              } catch (r) {
                return (
                  console.error("window.navigator.wallets could not be set"), $t
                );
              }
              return n(...t), $t;
            })()
          ),
          [i, o] = (0, u.useState)(() => oe(n()));
        (0, u.useEffect)(() => {
          const t = [
            r("register", (...t) => o((e) => [...e, ...oe(t)])),
            r("unregister", (...t) =>
              o((e) => e.filter((e) => t.some((t) => t === e.wallet)))
            ),
          ];
          return () => t.forEach((t) => t());
        }, [r]);
        const s = (function (t) {
          const e = (0, u.useRef)();
          return (
            (0, u.useEffect)(() => {
              e.current = t;
            }),
            e.current
          );
        })(i);
        return (
          (0, u.useEffect)(() => {
            if (!s) return;
            const t = new Set(i);
            new Set(s.filter((e) => !t.has(e))).forEach((t) => t.destroy());
          }, [s, i]),
          (0, u.useEffect)(() => () => i.forEach((t) => t.destroy()), []),
          (0, u.useMemo)(
            () => [
              ...i,
              ...t.filter(
                ({ name: t }) =>
                  !i.some((e) => e.name === t) ||
                  (e.has(t) ||
                    (e.add(t),
                    console.warn(
                      `${t} was registered as a Standard Wallet. The Wallet Adapter for ${t} can be removed from your app.`
                    )),
                  !1)
              ),
            ],
            [i, t, e]
          )
        );
      }
      function ie(t) {
        const e = (0, u.useRef)();
        return e.current || (e.current = { value: t() }), e.current.value;
      }
      function oe(t) {
        return t.filter(dt).map((t) => new Ht({ wallet: t }));
      }
      var se;
      (Ft = new WeakMap()),
        (function (t) {
          (t[(t.DESKTOP_WEB = 0)] = "DESKTOP_WEB"),
            (t[(t.MOBILE_WEB = 1)] = "MOBILE_WEB");
        })(se || (se = {}));
      class ae extends f.lj {
        constructor() {
          super(...arguments), (this.name = "WalletNotSelectedError");
        }
      }
      var ce = n(4306);
      function ue({
        children: t,
        wallets: e,
        adapter: n,
        isUnloadingRef: r,
        onAutoConnectRequest: i,
        onConnectError: o,
        onError: s,
        onSelectWallet: a,
      }) {
        const c = (0, u.useRef)(!1),
          [h, l] = (0, u.useState)(!1),
          p = (0, u.useRef)(!1),
          [y, g] = (0, u.useState)(!1),
          [m, w] = (0, u.useState)(() => n?.publicKey ?? null),
          [b, v] = (0, u.useState)(() => n?.connected ?? !1),
          k = (0, u.useRef)(s);
        (0, u.useEffect)(
          () => (
            (k.current = s),
            () => {
              k.current = void 0;
            }
          ),
          [s]
        );
        const S = (0, u.useRef)(
            (t, e) => (
              r.current ||
                (k.current
                  ? k.current(t, e)
                  : (console.error(t, e),
                    t instanceof f.OZ &&
                      "undefined" !== typeof window &&
                      e &&
                      window.open(e.url, "_blank"))),
              t
            )
          ),
          [M, I] = (0, u.useState)(() =>
            e
              .map((t) => ({ adapter: t, readyState: t.readyState }))
              .filter(({ readyState: t }) => t !== d.i1.Unsupported)
          );
        (0, u.useEffect)(() => {
          function t(t) {
            I((e) => {
              const n = e.findIndex(({ adapter: t }) => t === this);
              if (-1 === n) return e;
              const { adapter: r } = e[n];
              return [
                ...e.slice(0, n),
                { adapter: r, readyState: t },
                ...e.slice(n + 1),
              ].filter(({ readyState: t }) => t !== d.i1.Unsupported);
            });
          }
          return (
            I((t) =>
              e
                .map((e, n) => {
                  const r = t[n];
                  return r && r.adapter === e && r.readyState === e.readyState
                    ? r
                    : { adapter: e, readyState: e.readyState };
                })
                .filter(({ readyState: t }) => t !== d.i1.Unsupported)
            ),
            e.forEach((e) => e.on("readyStateChange", t, e)),
            () => {
              e.forEach((e) => e.off("readyStateChange", t, e));
            }
          );
        }, [n, e]);
        const E = (0, u.useMemo)(
          () => M.find((t) => t.adapter === n) ?? null,
          [n, M]
        );
        (0, u.useEffect)(() => {
          if (!n) return;
          const t = (t) => {
              w(t), (c.current = !1), l(!1), v(!0), (p.current = !1), g(!1);
            },
            e = () => {
              r.current ||
                (w(null),
                (c.current = !1),
                l(!1),
                v(!1),
                (p.current = !1),
                g(!1));
            },
            i = (t) => {
              S.current(t, n);
            };
          return (
            n.on("connect", t),
            n.on("disconnect", e),
            n.on("error", i),
            () => {
              n.off("connect", t),
                n.off("disconnect", e),
                n.off("error", i),
                e();
            }
          );
        }, [n, r]);
        const _ = (0, u.useRef)(!1);
        (0, u.useEffect)(
          () => () => {
            _.current = !1;
          },
          [n]
        ),
          (0, u.useEffect)(() => {
            _.current ||
              c.current ||
              b ||
              !i ||
              (E?.readyState !== d.i1.Installed &&
                E?.readyState !== d.i1.Loadable) ||
              ((c.current = !0),
              l(!0),
              (_.current = !0),
              (async function () {
                try {
                  await i();
                } catch {
                  o();
                } finally {
                  l(!1), (c.current = !1);
                }
              })());
          }, [b, i, o, E]);
        const A = (0, u.useCallback)(
            async (t, e, r) => {
              if (!n) throw S.current(new ae());
              if (!b) throw S.current(new f.oS(), n);
              return await n.sendTransaction(t, e, r);
            },
            [n, b]
          ),
          x = (0, u.useMemo)(
            () =>
              n && "signTransaction" in n
                ? async (t) => {
                    if (!b) throw S.current(new f.oS(), n);
                    return await n.signTransaction(t);
                  }
                : void 0,
            [n, b]
          ),
          L = (0, u.useMemo)(
            () =>
              n && "signAllTransactions" in n
                ? async (t) => {
                    if (!b) throw S.current(new f.oS(), n);
                    return await n.signAllTransactions(t);
                  }
                : void 0,
            [n, b]
          ),
          T = (0, u.useMemo)(
            () =>
              n && "signMessage" in n
                ? async (t) => {
                    if (!b) throw S.current(new f.oS(), n);
                    return await n.signMessage(t);
                  }
                : void 0,
            [n, b]
          ),
          N = (0, u.useMemo)(
            () =>
              n && "signIn" in n ? async (t) => await n.signIn(t) : void 0,
            [n]
          ),
          O = (0, u.useCallback)(async () => {
            if (c.current || p.current || E?.adapter.connected) return;
            if (!E) throw S.current(new ae());
            const { adapter: t, readyState: e } = E;
            if (e !== d.i1.Installed && e !== d.i1.Loadable)
              throw S.current(new f.OZ(), t);
            (c.current = !0), l(!0);
            try {
              await t.connect();
            } catch (n) {
              throw (o(), n);
            } finally {
              l(!1), (c.current = !1);
            }
          }, [o, E]),
          B = (0, u.useCallback)(async () => {
            if (!p.current && n) {
              (p.current = !0), g(!0);
              try {
                await n.disconnect();
              } finally {
                g(!1), (p.current = !1);
              }
            }
          }, [n]);
        return u.createElement(
          ce.z.Provider,
          {
            value: {
              autoConnect: !!i,
              wallets: M,
              wallet: E,
              publicKey: m,
              connected: b,
              connecting: h,
              disconnecting: y,
              select: a,
              connect: O,
              disconnect: B,
              sendTransaction: A,
              signTransaction: x,
              signAllTransactions: L,
              signMessage: T,
              signIn: N,
            },
          },
          t
        );
      }
      let he;
      function le(t) {
        return (
          (function ({ adapters: t, userAgentString: e }) {
            return t.some(
              (t) => t.name !== nt && t.readyState === d.i1.Installed
            )
              ? se.DESKTOP_WEB
              : e &&
                /android/i.test(e) &&
                !(function (t) {
                  return /(WebView|Version\/.+(Chrome)\/(\d+)\.(\d+)\.(\d+)\.(\d+)|; wv\).+(Chrome)\/(\d+)\.(\d+)\.(\d+)\.(\d+))/i.test(
                    t
                  );
                })(e)
              ? se.MOBILE_WEB
              : se.DESKTOP_WEB;
          })({
            adapters: t,
            userAgentString:
              (void 0 === he && (he = globalThis.navigator?.userAgent ?? null),
              he),
          }) === se.MOBILE_WEB
        );
      }
      function de() {
        const t = globalThis.location;
        if (t) return `${t.protocol}//${t.host}`;
      }
      function fe({
        children: t,
        wallets: e,
        autoConnect: n,
        localStorageKey: r = "walletName",
        onError: i,
      }) {
        const { connection: o } = (0, h.R)(),
          s = re(e),
          a = (0, u.useMemo)(() => {
            if (!le(s)) return null;
            const t = s.find((t) => t.name === nt);
            return (
              t ||
              new it({
                addressSelector: {
                  select(t) {
                    return tt(this, void 0, void 0, function* () {
                      return t[0];
                    });
                  },
                },
                appIdentity: { uri: de() },
                authorizationResultCache: st(),
                cluster:
                  ((e = o?.rpcEndpoint),
                  e
                    ? /devnet/i.test(e)
                      ? "devnet"
                      : /testnet/i.test(e)
                      ? "testnet"
                      : "mainnet-beta"
                    : "mainnet-beta"),
                onWalletNotFound: at,
              })
            );
            var e;
          }, [s, o?.rpcEndpoint]),
          c = (0, u.useMemo)(
            () => (null == a || -1 !== s.indexOf(a) ? s : [a, ...s]),
            [s, a]
          ),
          [l, d] = (function (t, e) {
            const n = (0, u.useState)(() => {
                try {
                  const e = localStorage.getItem(t);
                  if (e) return JSON.parse(e);
                } catch (n) {
                  "undefined" !== typeof window && console.error(n);
                }
                return e;
              }),
              r = n[0],
              i = (0, u.useRef)(!0);
            return (
              (0, u.useEffect)(() => {
                if (i.current) i.current = !1;
                else
                  try {
                    null === r
                      ? localStorage.removeItem(t)
                      : localStorage.setItem(t, JSON.stringify(r));
                  } catch (e) {
                    "undefined" !== typeof window && console.error(e);
                  }
              }, [r, t]),
              n
            );
          })(r, le(s) ? nt : null),
          f = (0, u.useMemo)(() => c.find((t) => t.name === l) ?? null, [c, l]),
          p = (0, u.useCallback)(
            (t) => {
              l !== t && (f && f.name !== nt && f.disconnect(), d(t));
            },
            [f, d, l]
          );
        (0, u.useEffect)(() => {
          if (f)
            return (
              f.on("disconnect", t),
              () => {
                f.off("disconnect", t);
              }
            );
          function t() {
            m.current || (l === nt && le(s)) || d(null);
          }
        }, [f, s, d, l]);
        const y = (0, u.useRef)(!1),
          g = (0, u.useMemo)(() => {
            if (n && f)
              return async () => {
                (!0 === n || (await n(f))) &&
                  (y.current ? await f.connect() : await f.autoConnect());
              };
          }, [n, f]),
          m = (0, u.useRef)(!1);
        (0, u.useEffect)(() => {
          if (l !== nt || !le(s))
            return (
              window.addEventListener("beforeunload", t),
              () => {
                window.removeEventListener("beforeunload", t);
              }
            );
          function t() {
            m.current = !0;
          }
          m.current = !1;
        }, [s, l]);
        const w = (0, u.useCallback)(() => {
            f && f.name !== nt && p(null);
          }, [f, p]),
          b = (0, u.useCallback)(
            (t) => {
              (y.current = !0), p(t);
            },
            [p]
          );
        return u.createElement(
          ue,
          {
            wallets: c,
            adapter: f,
            isUnloadingRef: m,
            onAutoConnectRequest: g,
            onConnectError: w,
            onError: i,
            onSelectWallet: b,
          },
          t
        );
      }
      class pe extends g {
        constructor(t = {}) {
          super(),
            (this.name = "Phantom"),
            (this.url = "https://phantom.app"),
            (this.icon =
              "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDgiIGhlaWdodD0iMTA4IiB2aWV3Qm94PSIwIDAgMTA4IDEwOCIgZmlsbD0ibm9uZSI+CjxyZWN0IHdpZHRoPSIxMDgiIGhlaWdodD0iMTA4IiByeD0iMjYiIGZpbGw9IiNBQjlGRjIiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00Ni41MjY3IDY5LjkyMjlDNDIuMDA1NCA3Ni44NTA5IDM0LjQyOTIgODUuNjE4MiAyNC4zNDggODUuNjE4MkMxOS41ODI0IDg1LjYxODIgMTUgODMuNjU2MyAxNSA3NS4xMzQyQzE1IDUzLjQzMDUgNDQuNjMyNiAxOS44MzI3IDcyLjEyNjggMTkuODMyN0M4Ny43NjggMTkuODMyNyA5NCAzMC42ODQ2IDk0IDQzLjAwNzlDOTQgNTguODI1OCA4My43MzU1IDc2LjkxMjIgNzMuNTMyMSA3Ni45MTIyQzcwLjI5MzkgNzYuOTEyMiA2OC43MDUzIDc1LjEzNDIgNjguNzA1MyA3Mi4zMTRDNjguNzA1MyA3MS41NzgzIDY4LjgyNzUgNzAuNzgxMiA2OS4wNzE5IDY5LjkyMjlDNjUuNTg5MyA3NS44Njk5IDU4Ljg2ODUgODEuMzg3OCA1Mi41NzU0IDgxLjM4NzhDNDcuOTkzIDgxLjM4NzggNDUuNjcxMyA3OC41MDYzIDQ1LjY3MTMgNzQuNDU5OEM0NS42NzEzIDcyLjk4ODQgNDUuOTc2OCA3MS40NTU2IDQ2LjUyNjcgNjkuOTIyOVpNODMuNjc2MSA0Mi41Nzk0QzgzLjY3NjEgNDYuMTcwNCA4MS41NTc1IDQ3Ljk2NTggNzkuMTg3NSA0Ny45NjU4Qzc2Ljc4MTYgNDcuOTY1OCA3NC42OTg5IDQ2LjE3MDQgNzQuNjk4OSA0Mi41Nzk0Qzc0LjY5ODkgMzguOTg4NSA3Ni43ODE2IDM3LjE5MzEgNzkuMTg3NSAzNy4xOTMxQzgxLjU1NzUgMzcuMTkzMSA4My42NzYxIDM4Ljk4ODUgODMuNjc2MSA0Mi41Nzk0Wk03MC4yMTAzIDQyLjU3OTVDNzAuMjEwMyA0Ni4xNzA0IDY4LjA5MTYgNDcuOTY1OCA2NS43MjE2IDQ3Ljk2NThDNjMuMzE1NyA0Ny45NjU4IDYxLjIzMyA0Ni4xNzA0IDYxLjIzMyA0Mi41Nzk1QzYxLjIzMyAzOC45ODg1IDYzLjMxNTcgMzcuMTkzMSA2NS43MjE2IDM3LjE5MzFDNjguMDkxNiAzNy4xOTMxIDcwLjIxMDMgMzguOTg4NSA3MC4yMTAzIDQyLjU3OTVaIiBmaWxsPSIjRkZGREY4Ii8+Cjwvc3ZnPg=="),
            (this.supportedTransactionVersions = new Set(["legacy", 0])),
            (this._readyState =
              "undefined" === typeof window || "undefined" === typeof document
                ? d.i1.Unsupported
                : d.i1.NotDetected),
            (this._disconnected = () => {
              const t = this._wallet;
              t &&
                (t.off("disconnect", this._disconnected),
                t.off("accountChanged", this._accountChanged),
                (this._wallet = null),
                (this._publicKey = null),
                this.emit("error", new f.at()),
                this.emit("disconnect"));
            }),
            (this._accountChanged = (t) => {
              const e = this._publicKey;
              if (e) {
                try {
                  t = new c.PublicKey(t.toBytes());
                } catch (n) {
                  return void this.emit("error", new f.Nx(n?.message, n));
                }
                e.equals(t) || ((this._publicKey = t), this.emit("connect", t));
              }
            }),
            (this._connecting = !1),
            (this._wallet = null),
            (this._publicKey = null),
            this._readyState !== d.i1.Unsupported &&
              ((0, d.H)()
                ? ((this._readyState = d.i1.Loadable),
                  this.emit("readyStateChange", this._readyState))
                : (0, d.su)(
                    () =>
                      !(
                        !window.phantom?.solana?.isPhantom &&
                        !window.solana?.isPhantom
                      ) &&
                      ((this._readyState = d.i1.Installed),
                      this.emit("readyStateChange", this._readyState),
                      !0)
                  ));
        }
        get publicKey() {
          return this._publicKey;
        }
        get connecting() {
          return this._connecting;
        }
        get readyState() {
          return this._readyState;
        }
        async autoConnect() {
          this.readyState === d.i1.Installed && (await this.connect());
        }
        async connect() {
          try {
            if (this.connected || this.connecting) return;
            if (this.readyState === d.i1.Loadable) {
              const t = encodeURIComponent(window.location.href),
                e = encodeURIComponent(window.location.origin);
              return void (window.location.href = `https://phantom.app/ul/browse/${t}?ref=${e}`);
            }
            if (this.readyState !== d.i1.Installed) throw new f.OZ();
            this._connecting = !0;
            const e = window.phantom?.solana || window.solana;
            if (!e.isConnected)
              try {
                await e.connect();
              } catch (t) {
                throw new f.$w(t?.message, t);
              }
            if (!e.publicKey) throw new f.cO();
            let n;
            try {
              n = new c.PublicKey(e.publicKey.toBytes());
            } catch (t) {
              throw new f.Nx(t?.message, t);
            }
            e.on("disconnect", this._disconnected),
              e.on("accountChanged", this._accountChanged),
              (this._wallet = e),
              (this._publicKey = n),
              this.emit("connect", n);
          } catch (t) {
            throw (this.emit("error", t), t);
          } finally {
            this._connecting = !1;
          }
        }
        async disconnect() {
          const t = this._wallet;
          if (t) {
            t.off("disconnect", this._disconnected),
              t.off("accountChanged", this._accountChanged),
              (this._wallet = null),
              (this._publicKey = null);
            try {
              await t.disconnect();
            } catch (e) {
              this.emit("error", new f.UG(e?.message, e));
            }
          }
          this.emit("disconnect");
        }
        async sendTransaction(t, e, n = {}) {
          try {
            const i = this._wallet;
            if (!i) throw new f.oS();
            try {
              const { signers: r, ...o } = n;
              p(t)
                ? r?.length && t.sign(r)
                : ((t = await this.prepareTransaction(t, e, o)),
                  r?.length && t.partialSign(...r)),
                (o.preflightCommitment = o.preflightCommitment || e.commitment);
              const { signature: s } = await i.signAndSendTransaction(t, o);
              return s;
            } catch (r) {
              if (r instanceof f.lj) throw r;
              throw new f.IW(r?.message, r);
            }
          } catch (r) {
            throw (this.emit("error", r), r);
          }
        }
        async signTransaction(t) {
          try {
            const n = this._wallet;
            if (!n) throw new f.oS();
            try {
              return (await n.signTransaction(t)) || t;
            } catch (e) {
              throw new f.PY(e?.message, e);
            }
          } catch (e) {
            throw (this.emit("error", e), e);
          }
        }
        async signAllTransactions(t) {
          try {
            const n = this._wallet;
            if (!n) throw new f.oS();
            try {
              return (await n.signAllTransactions(t)) || t;
            } catch (e) {
              throw new f.PY(e?.message, e);
            }
          } catch (e) {
            throw (this.emit("error", e), e);
          }
        }
        async signMessage(t) {
          try {
            const n = this._wallet;
            if (!n) throw new f.oS();
            try {
              const { signature: e } = await n.signMessage(t);
              return e;
            } catch (e) {
              throw new f.fk(e?.message, e);
            }
          } catch (e) {
            throw (this.emit("error", e), e);
          }
        }
      }
      var ye,
        ge = function (t, e, n, r, i) {
          if ("m" === r) throw new TypeError("Private method is not writable");
          if ("a" === r && !i)
            throw new TypeError(
              "Private accessor was defined without a setter"
            );
          if ("function" === typeof e ? t !== e || !i : !e.has(t))
            throw new TypeError(
              "Cannot write private member to an object whose class did not declare it"
            );
          return "a" === r ? i.call(t, n) : i ? (i.value = n) : e.set(t, n), n;
        },
        me = function (t, e, n, r) {
          if ("a" === n && !r)
            throw new TypeError(
              "Private accessor was defined without a getter"
            );
          if ("function" === typeof e ? t !== e || !r : !e.has(t))
            throw new TypeError(
              "Cannot read private member from an object whose class did not declare it"
            );
          return "m" === n ? r : "a" === n ? r.call(t) : r ? r.value : e.get(t);
        };
      function we(t) {
        const e = ({ register: e }) => e(t);
        try {
          window.dispatchEvent(new be(e));
        } catch (n) {
          console.error(
            "wallet-standard:register-wallet event could not be dispatched\n",
            n
          );
        }
        try {
          window.addEventListener(
            "wallet-standard:app-ready",
            ({ detail: t }) => e(t)
          );
        } catch (n) {
          console.error(
            "wallet-standard:app-ready event listener could not be added\n",
            n
          );
        }
      }
      class be extends Event {
        constructor(t) {
          super("wallet-standard:register-wallet", {
            bubbles: !1,
            cancelable: !1,
            composed: !1,
          }),
            ye.set(this, void 0),
            ge(this, ye, t, "f");
        }
        get detail() {
          return me(this, ye, "f");
        }
        get type() {
          return "wallet-standard:register-wallet";
        }
        preventDefault() {
          throw new Error("preventDefault cannot be called");
        }
        stopImmediatePropagation() {
          throw new Error("stopImmediatePropagation cannot be called");
        }
        stopPropagation() {
          throw new Error("stopPropagation cannot be called");
        }
      }
      ye = new WeakMap();
      var ve,
        ke,
        Se,
        Me,
        Ie,
        Ee,
        _e,
        Ae,
        xe,
        Le,
        Te,
        Ne,
        Oe,
        Be,
        je = function (t, e, n, r) {
          if ("a" === n && !r)
            throw new TypeError(
              "Private accessor was defined without a getter"
            );
          if ("function" === typeof e ? t !== e || !r : !e.has(t))
            throw new TypeError(
              "Cannot read private member from an object whose class did not declare it"
            );
          return "m" === n ? r : "a" === n ? r.call(t) : r ? r.value : e.get(t);
        },
        Pe = function (t, e, n, r, i) {
          if ("m" === r) throw new TypeError("Private method is not writable");
          if ("a" === r && !i)
            throw new TypeError(
              "Private accessor was defined without a setter"
            );
          if ("function" === typeof e ? t !== e || !i : !e.has(t))
            throw new TypeError(
              "Cannot write private member to an object whose class did not declare it"
            );
          return "a" === r ? i.call(t, n) : i ? (i.value = n) : e.set(t, n), n;
        };
      class Ce {
        constructor() {
          ve.add(this),
            ke.set(this, {}),
            Se.set(this, "1.0.0"),
            Me.set(this, "MetaMask"),
            Ie.set(
              this,
              "data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjMxIiB2aWV3Qm94PSIwIDAgMzEgMzEiIHdpZHRoPSIzMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGxpbmVhckdyYWRpZW50IGlkPSJhIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjIwLjI1IiB4Mj0iMjYuNTcxIiB5MT0iMjcuMTczIiB5Mj0iMTkuODU4Ij48c3RvcCBvZmZzZXQ9Ii4wOCIgc3RvcC1jb2xvcj0iIzk5NDVmZiIvPjxzdG9wIG9mZnNldD0iLjMiIHN0b3AtY29sb3I9IiM4NzUyZjMiLz48c3RvcCBvZmZzZXQ9Ii41IiBzdG9wLWNvbG9yPSIjNTQ5N2Q1Ii8+PHN0b3Agb2Zmc2V0PSIuNiIgc3RvcC1jb2xvcj0iIzQzYjRjYSIvPjxzdG9wIG9mZnNldD0iLjcyIiBzdG9wLWNvbG9yPSIjMjhlMGI5Ii8+PHN0b3Agb2Zmc2V0PSIuOTciIHN0b3AtY29sb3I9IiMxOWZiOWIiLz48L2xpbmVhckdyYWRpZW50PjxnIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iLjA5NCI+PHBhdGggZD0ibTI2LjEwOSAzLjY0My05LjM2OSA2Ljk1OSAxLjczMy00LjEwNSA3LjYzNy0yLjg1M3oiIGZpbGw9IiNlMjc2MWIiIHN0cm9rZT0iI2UyNzYxYiIvPjxnIGZpbGw9IiNlNDc2MWIiIHN0cm9rZT0iI2U0NzYxYiI+PHBhdGggZD0ibTQuNDgxIDMuNjQzIDkuMjk0IDcuMDI0LTEuNjQ4LTQuMTcxem0xOC4yNTggMTYuMTMtMi40OTUgMy44MjMgNS4zMzkgMS40NjkgMS41MzUtNS4yMDctNC4zNzgtLjA4NXptLTE5LjI0Ny4wODUgMS41MjUgNS4yMDcgNS4zMzktMS40NjktMi40OTUtMy44MjN6Ii8+PHBhdGggZD0ibTEwLjA1NSAxMy4zMTMtMS40ODggMi4yNTEgNS4zMDEuMjM1LS4xODgtNS42OTd6bTEwLjQ4IDAtMy42NzItMy4yNzctLjEyMiA1Ljc2MyA1LjI5Mi0uMjM1LTEuNDk3LTIuMjUxem0tMTAuMTc4IDEwLjI4MyAzLjE4My0xLjU1NC0yLjc0OS0yLjE0Ny0uNDMzIDMuNzAxem02LjY5NS0xLjU1NCAzLjE5MiAxLjU1NC0uNDQzLTMuNzAxeiIvPjwvZz48cGF0aCBkPSJtMjAuMjQ0IDIzLjU5Ni0zLjE5Mi0xLjU1NC4yNTQgMi4wODEtLjAyOC44NzZ6bS05Ljg4NyAwIDIuOTY2IDEuNDAzLS4wMTktLjg3Ni4yMzUtMi4wODEtMy4xODMgMS41NTR6IiBmaWxsPSIjZDdjMWIzIiBzdHJva2U9IiNkN2MxYjMiLz48cGF0aCBkPSJtMTMuMzY5IDE4LjUyMS0yLjY1NS0uNzgxIDEuODc0LS44NTd6bTMuODUxIDAgLjc4MS0xLjYzOCAxLjg4My44NTctMi42NjUuNzgxeiIgZmlsbD0iIzIzMzQ0NyIgc3Ryb2tlPSIjMjMzNDQ3Ii8+PHBhdGggZD0ibTEwLjM1NyAyMy41OTYuNDUyLTMuODIzLTIuOTQ3LjA4NXptOS40MzUtMy44MjMuNDUyIDMuODIzIDIuNDk1LTMuNzM4em0yLjI0MS00LjIwOS01LjI5Mi4yMzUuNDkgMi43MjEuNzgyLTEuNjM4IDEuODgzLjg1N3ptLTExLjMxOCAyLjE3NSAxLjg4My0uODU3Ljc3MiAxLjYzOC40OTktMi43MjEtNS4zMDEtLjIzNXoiIGZpbGw9IiNjZDYxMTYiIHN0cm9rZT0iI2NkNjExNiIvPjxwYXRoIGQ9Im04LjU2NyAxNS41NjQgMi4yMjIgNC4zMzEtLjA3NS0yLjE1NnptMTEuMzI4IDIuMTc1LS4wOTQgMi4xNTYgMi4yMzItNC4zMzEtMi4xMzcgMi4xNzV6bS02LjAyNi0xLjk0LS40OTkgMi43MjEuNjIxIDMuMjExLjE0MS00LjIyOC0uMjY0LTEuNzA0em0yLjg3MiAwLS4yNTQgMS42OTUuMTEzIDQuMjM3LjYzMS0zLjIxMXoiIGZpbGw9IiNlNDc1MWYiIHN0cm9rZT0iI2U0NzUxZiIvPjxwYXRoIGQ9Im0xNy4yMyAxOC41Mi0uNjMxIDMuMjExLjQ1Mi4zMTEgMi43NS0yLjE0Ny4wOTQtMi4xNTZ6bS02LjUxNi0uNzgxLjA3NSAyLjE1NiAyLjc1IDIuMTQ3LjQ1Mi0uMzExLS42MjItMy4yMTF6IiBmaWxsPSIjZjY4NTFiIiBzdHJva2U9IiNmNjg1MWIiLz48cGF0aCBkPSJtMTcuMjc3IDI0Ljk5OS4wMjgtLjg3Ni0uMjM1LS4yMDdoLTMuNTVsLS4yMTcuMjA3LjAxOS44NzYtMi45NjYtMS40MDMgMS4wMzYuODQ4IDIuMSAxLjQ1OWgzLjYwNmwyLjEwOS0xLjQ1OSAxLjAzNi0uODQ4eiIgZmlsbD0iI2MwYWQ5ZSIgc3Ryb2tlPSIjYzBhZDllIi8+PHBhdGggZD0ibTE3LjA1MSAyMi4wNDItLjQ1Mi0uMzExaC0yLjYwOGwtLjQ1Mi4zMTEtLjIzNSAyLjA4MS4yMTctLjIwN2gzLjU1bC4yMzUuMjA3LS4yNTQtMi4wODF6IiBmaWxsPSIjMTYxNjE2IiBzdHJva2U9IiMxNjE2MTYiLz48cGF0aCBkPSJtMjYuNTA1IDExLjA1My44LTMuODQyLTEuMTk2LTMuNTY5LTkuMDU4IDYuNzIzIDMuNDg0IDIuOTQ3IDQuOTI1IDEuNDQxIDEuMDkyLTEuMjcxLS40NzEtLjMzOS43NTMtLjY4Ny0uNTg0LS40NTIuNzUzLS41NzQtLjQ5OS0uMzc3em0tMjMuMjExLTMuODQxLjggMy44NDItLjUwOC4zNzcuNzUzLjU3NC0uNTc0LjQ1Mi43NTMuNjg3LS40NzEuMzM5IDEuMDgzIDEuMjcxIDQuOTI1LTEuNDQxIDMuNDg0LTIuOTQ3LTkuMDU5LTYuNzIzeiIgZmlsbD0iIzc2M2QxNiIgc3Ryb2tlPSIjNzYzZDE2Ii8+PHBhdGggZD0ibTI1LjQ2IDE0Ljc1NC00LjkyNS0xLjQ0MSAxLjQ5NyAyLjI1MS0yLjIzMiA0LjMzMSAyLjkzOC0uMDM4aDQuMzc4bC0xLjY1Ny01LjEwNHptLTE1LjQwNS0xLjQ0MS00LjkyNSAxLjQ0MS0xLjYzOCA1LjEwNGg0LjM2OWwyLjkyOC4wMzgtMi4yMjItNC4zMzEgMS40ODgtMi4yNTF6bTYuNjg1IDIuNDg2LjMxMS01LjQzMyAxLjQzMS0zLjg3aC02LjM1NmwxLjQxMyAzLjg3LjMyOSA1LjQzMy4xMTMgMS43MTQuMDA5IDQuMjE5aDIuNjFsLjAxOS00LjIxOS4xMjItMS43MTR6IiBmaWxsPSIjZjY4NTFiIiBzdHJva2U9IiNmNjg1MWIiLz48L2c+PGNpcmNsZSBjeD0iMjMuNSIgY3k9IjIzLjUiIGZpbGw9IiMwMDAiIHI9IjYuNSIvPjxwYXRoIGQ9Im0yNy40NzMgMjUuNTQ1LTEuMzEgMS4zNjhjLS4wMjkuMDMtLjA2My4wNTMtLjEwMS4wN2EuMzEuMzEgMCAwIDEgLS4xMjEuMDI0aC02LjIwOWMtLjAzIDAtLjA1OS0uMDA4LS4wODMtLjAyNGEuMTUuMTUgMCAwIDEgLS4wNTYtLjA2NWMtLjAxMi0uMDI2LS4wMTUtLjA1Ni0uMDEtLjA4NHMuMDE4LS4wNTUuMDM5LS4wNzZsMS4zMTEtMS4zNjhjLjAyOC0uMDMuMDYzLS4wNTMuMTAxLS4wNjlhLjMxLjMxIDAgMCAxIC4xMjEtLjAyNWg2LjIwOGMuMDMgMCAuMDU5LjAwOC4wODMuMDI0YS4xNS4xNSAwIDAgMSAuMDU2LjA2NWMuMDEyLjAyNi4wMTUuMDU2LjAxLjA4NHMtLjAxOC4wNTUtLjAzOS4wNzZ6bS0xLjMxLTIuNzU2Yy0uMDI5LS4wMy0uMDYzLS4wNTMtLjEwMS0uMDdhLjMxLjMxIDAgMCAwIC0uMTIxLS4wMjRoLTYuMjA5Yy0uMDMgMC0uMDU5LjAwOC0uMDgzLjAyNHMtLjA0NC4wMzgtLjA1Ni4wNjUtLjAxNS4wNTYtLjAxLjA4NC4wMTguMDU1LjAzOS4wNzZsMS4zMTEgMS4zNjhjLjAyOC4wMy4wNjMuMDUzLjEwMS4wNjlhLjMxLjMxIDAgMCAwIC4xMjEuMDI1aDYuMjA4Yy4wMyAwIC4wNTktLjAwOC4wODMtLjAyNGEuMTUuMTUgMCAwIDAgLjA1Ni0uMDY1Yy4wMTItLjAyNi4wMTUtLjA1Ni4wMS0uMDg0cy0uMDE4LS4wNTUtLjAzOS0uMDc2em0tNi40MzEtLjk4M2g2LjIwOWEuMzEuMzEgMCAwIDAgLjEyMS0uMDI0Yy4wMzgtLjAxNi4wNzMtLjA0LjEwMS0uMDdsMS4zMS0xLjM2OGMuMDItLjAyMS4wMzQtLjA0Ny4wMzktLjA3NnMuMDAxLS4wNTgtLjAxLS4wODRhLjE1LjE1IDAgMCAwIC0uMDU2LS4wNjVjLS4wMjUtLjAxNi0uMDU0LS4wMjQtLjA4My0uMDI0aC02LjIwOGEuMzEuMzEgMCAwIDAgLS4xMjEuMDI1Yy0uMDM4LjAxNi0uMDcyLjA0LS4xMDEuMDY5bC0xLjMxIDEuMzY4Yy0uMDIuMDIxLS4wMzQuMDQ3LS4wMzkuMDc2cy0uMDAxLjA1OC4wMS4wODQuMDMxLjA0OS4wNTYuMDY1LjA1NC4wMjQuMDgzLjAyNHoiIGZpbGw9InVybCgjYSkiLz48L3N2Zz4="
            ),
            Ee.set(this, null),
            _e.set(
              this,
              (t, e) => (
                je(this, ke, "f")[t]?.push(e) || (je(this, ke, "f")[t] = [e]),
                () => je(this, ve, "m", xe).call(this, t, e)
              )
            ),
            Le.set(this, async () => {
              if (!je(this, Ee, "f")) {
                let e;
                try {
                  e = (await n.e(525).then(n.bind(n, 9525))).default;
                } catch (t) {
                  throw new Error("Unable to load Solflare MetaMask SDK");
                }
                Pe(this, Ee, new e(), "f"),
                  je(this, Ee, "f").on("standard_change", (t) =>
                    je(this, ve, "m", Ae).call(this, "change", t)
                  );
              }
              return (
                this.accounts.length || (await je(this, Ee, "f").connect()),
                { accounts: this.accounts }
              );
            }),
            Te.set(this, async () => {
              je(this, Ee, "f") && (await je(this, Ee, "f").disconnect());
            }),
            Ne.set(this, async (...t) => {
              if (!je(this, Ee, "f")) throw new f.oS();
              return await je(this, Ee, "f").standardSignAndSendTransaction(
                ...t
              );
            }),
            Oe.set(this, async (...t) => {
              if (!je(this, Ee, "f")) throw new f.oS();
              return await je(this, Ee, "f").standardSignTransaction(...t);
            }),
            Be.set(this, async (...t) => {
              if (!je(this, Ee, "f")) throw new f.oS();
              return await je(this, Ee, "f").standardSignMessage(...t);
            });
        }
        get version() {
          return je(this, Se, "f");
        }
        get name() {
          return je(this, Me, "f");
        }
        get icon() {
          return je(this, Ie, "f");
        }
        get chains() {
          return [yt, gt, mt];
        }
        get features() {
          return {
            [ht]: { version: "1.0.0", connect: je(this, Le, "f") },
            [kt]: { version: "1.0.0", disconnect: je(this, Te, "f") },
            [lt]: { version: "1.0.0", on: je(this, _e, "f") },
            [ct.G]: {
              version: "1.0.0",
              supportedTransactionVersions: ["legacy", 0],
              signAndSendTransaction: je(this, Ne, "f"),
            },
            [ut.R]: {
              version: "1.0.0",
              supportedTransactionVersions: ["legacy", 0],
              signTransaction: je(this, Oe, "f"),
            },
            [ft.g]: { version: "1.0.0", signMessage: je(this, Be, "f") },
          };
        }
        get accounts() {
          return je(this, Ee, "f") ? je(this, Ee, "f").standardAccounts : [];
        }
      }
      (ke = new WeakMap()),
        (Se = new WeakMap()),
        (Me = new WeakMap()),
        (Ie = new WeakMap()),
        (Ee = new WeakMap()),
        (_e = new WeakMap()),
        (Le = new WeakMap()),
        (Te = new WeakMap()),
        (Ne = new WeakMap()),
        (Oe = new WeakMap()),
        (Be = new WeakMap()),
        (ve = new WeakSet()),
        (Ae = function (t, ...e) {
          je(this, ke, "f")[t]?.forEach((t) => t.apply(null, e));
        }),
        (xe = function (t, e) {
          je(this, ke, "f")[t] = je(this, ke, "f")[t]?.filter((t) => e !== t);
        });
      let Re = !1;
      async function ze() {
        const t = "solflare-detect-metamask";
        function e() {
          window.postMessage(
            {
              target: "metamask-contentscript",
              data: {
                name: "metamask-provider",
                data: { id: t, jsonrpc: "2.0", method: "wallet_getSnaps" },
              },
            },
            window.location.origin
          );
        }
        function n(r) {
          const i = r.data;
          "metamask-inpage" === i?.target &&
            "metamask-provider" === i.data?.name &&
            (i.data.data?.id === t
              ? (window.removeEventListener("message", n),
                i.data.data.error || Re || (we(new Ce()), (Re = !0)))
              : e());
        }
        window.addEventListener("message", n),
          window.setTimeout(
            () => window.removeEventListener("message", n),
            5e3
          ),
          e();
      }
      class De extends g {
        constructor(t = {}) {
          super(),
            (this.name = "Solflare"),
            (this.url = "https://solflare.com"),
            (this.icon =
              "data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjUwIiB2aWV3Qm94PSIwIDAgNTAgNTAiIHdpZHRoPSI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGxpbmVhckdyYWRpZW50IGlkPSJhIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNmZmMxMGIiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNmYjNmMmUiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0iYiIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSI2LjQ3ODM1IiB4Mj0iMzQuOTEwNyIgeGxpbms6aHJlZj0iI2EiIHkxPSI3LjkyIiB5Mj0iMzMuNjU5MyIvPjxyYWRpYWxHcmFkaWVudCBpZD0iYyIgY3g9IjAiIGN5PSIwIiBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KDQuOTkyMTg4MzIgMTIuMDYzODc5NjMgLTEyLjE4MTEzNjU1IDUuMDQwNzEwNzQgMjIuNTIwMiAyMC42MTgzKSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHI9IjEiIHhsaW5rOmhyZWY9IiNhIi8+PHBhdGggZD0ibTI1LjE3MDggNDcuOTEwNGMuNTI1IDAgLjk1MDcuNDIxLjk1MDcuOTQwM3MtLjQyNTcuOTQwMi0uOTUwNy45NDAyLS45NTA3LS40MjA5LS45NTA3LS45NDAyLjQyNTctLjk0MDMuOTUwNy0uOTQwM3ptLTEuMDMyOC00NC45MTU2NWMuNDY0Ni4wMzgzNi44Mzk4LjM5MDQuOTAyNy44NDY4MWwxLjEzMDcgOC4yMTU3NGMuMzc5OCAyLjcxNDMgMy42NTM1IDMuODkwNCA1LjY3NDMgMi4wNDU5bDExLjMyOTEtMTAuMzExNThjLjI3MzMtLjI0ODczLjY5ODktLjIzMTQ5Ljk1MDcuMDM4NTEuMjMwOS4yNDc3Mi4yMzc5LjYyNjk3LjAxNjEuODgyNzdsLTkuODc5MSAxMS4zOTU4Yy0xLjgxODcgMi4wOTQyLS40NzY4IDUuMzY0MyAyLjI5NTYgNS41OTc4bDguNzE2OC44NDAzYy40MzQxLjA0MTguNzUxNy40MjM0LjcwOTMuODUyNC0uMDM0OS4zNTM3LS4zMDc0LjYzOTUtLjY2MjguNjk0OWwtOS4xNTk0IDEuNDMwMmMtMi42NTkzLjM2MjUtMy44NjM2IDMuNTExNy0yLjEzMzkgNS41NTc2bDMuMjIgMy43OTYxYy4yNTk0LjMwNTguMjE4OC43NjE1LS4wOTA4IDEuMDE3OC0uMjYyMi4yMTcyLS42NDE5LjIyNTYtLjkxMzguMDIwM2wtMy45Njk0LTIuOTk3OGMtMi4xNDIxLTEuNjEwOS01LjIyOTctLjI0MTctNS40NTYxIDIuNDI0M2wtLjg3NDcgMTAuMzk3NmMtLjAzNjIuNDI5NS0uNDE3OC43NDg3LS44NTI1LjcxMy0uMzY5LS4wMzAzLS42NjcxLS4zMDk3LS43MTcxLS42NzIxbC0xLjM4NzEtMTAuMDQzN2MtLjM3MTctMi43MTQ0LTMuNjQ1NC0zLjg5MDQtNS42NzQzLTIuMDQ1OWwtMTIuMDUxOTUgMTAuOTc0Yy0uMjQ5NDcuMjI3MS0uNjM4MDkuMjExNC0uODY4LS4wMzUtLjIxMDk0LS4yMjYyLS4yMTczNS0uNTcyNC0uMDE0OTMtLjgwNmwxMC41MTgxOC0xMi4xMzg1YzEuODE4Ny0yLjA5NDIuNDg0OS01LjM2NDQtMi4yODc2LTUuNTk3OGwtOC43MTg3Mi0uODQwNWMtLjQzNDEzLS4wNDE4LS43NTE3Mi0uNDIzNS0uNzA5MzYtLjg1MjQuMDM0OTMtLjM1MzcuMzA3MzktLjYzOTQuNjYyNy0uNjk1bDkuMTUzMzgtMS40Mjk5YzIuNjU5NC0uMzYyNSAzLjg3MTgtMy41MTE3IDIuMTQyMS01LjU1NzZsLTIuMTkyLTIuNTg0MWMtLjMyMTctLjM3OTItLjI3MTMtLjk0NDMuMTEyNi0xLjI2MjEuMzI1My0uMjY5NC43OTYzLS4yNzk3IDEuMTMzNC0uMDI0OWwyLjY5MTggMi4wMzQ3YzIuMTQyMSAxLjYxMDkgNS4yMjk3LjI0MTcgNS40NTYxLTIuNDI0M2wuNzI0MS04LjU1OTk4Yy4wNDU3LS41NDA4LjUyNjUtLjk0MjU3IDEuMDczOS0uODk3Mzd6bS0yMy4xODczMyAyMC40Mzk2NWMuNTI1MDQgMCAuOTUwNjcuNDIxLjk1MDY3Ljk0MDNzLS40MjU2My45NDAzLS45NTA2Ny45NDAzYy0uNTI1MDQxIDAtLjk1MDY3LS40MjEtLjk1MDY3LS45NDAzcy40MjU2MjktLjk0MDMuOTUwNjctLjk0MDN6bTQ3LjY3OTczLS45NTQ3Yy41MjUgMCAuOTUwNy40MjEuOTUwNy45NDAzcy0uNDI1Ny45NDAyLS45NTA3Ljk0MDItLjk1MDctLjQyMDktLjk1MDctLjk0MDIuNDI1Ny0uOTQwMy45NTA3LS45NDAzem0tMjQuNjI5Ni0yMi40Nzk3Yy41MjUgMCAuOTUwNi40MjA5NzMuOTUwNi45NDAyNyAwIC41MTkzLS40MjU2Ljk0MDI3LS45NTA2Ljk0MDI3LS41MjUxIDAtLjk1MDctLjQyMDk3LS45NTA3LS45NDAyNyAwLS41MTkyOTcuNDI1Ni0uOTQwMjcuOTUwNy0uOTQwMjd6IiBmaWxsPSJ1cmwoI2IpIi8+PHBhdGggZD0ibTI0LjU3MSAzMi43NzkyYzQuOTU5NiAwIDguOTgwMi0zLjk3NjUgOC45ODAyLTguODgxOSAwLTQuOTA1My00LjAyMDYtOC44ODE5LTguOTgwMi04Ljg4MTlzLTguOTgwMiAzLjk3NjYtOC45ODAyIDguODgxOWMwIDQuOTA1NCA0LjAyMDYgOC44ODE5IDguOTgwMiA4Ljg4MTl6IiBmaWxsPSJ1cmwoI2MpIi8+PC9zdmc+"),
            (this.supportedTransactionVersions = new Set(["legacy", 0])),
            (this._readyState =
              "undefined" === typeof window || "undefined" === typeof document
                ? d.i1.Unsupported
                : d.i1.Loadable),
            (this._disconnected = () => {
              const t = this._wallet;
              t &&
                (t.off("disconnect", this._disconnected),
                (this._wallet = null),
                (this._publicKey = null),
                this.emit("error", new f.at()),
                this.emit("disconnect"));
            }),
            (this._accountChanged = (t) => {
              if (!t) return;
              const e = this._publicKey;
              if (e) {
                try {
                  t = new c.PublicKey(t.toBytes());
                } catch (n) {
                  return void this.emit("error", new f.Nx(n?.message, n));
                }
                e.equals(t) || ((this._publicKey = t), this.emit("connect", t));
              }
            }),
            (this._connecting = !1),
            (this._publicKey = null),
            (this._wallet = null),
            (this._config = t),
            this._readyState !== d.i1.Unsupported &&
              ((0, d.su)(
                () =>
                  !(!window.solflare?.isSolflare && !window.SolflareApp) &&
                  ((this._readyState = d.i1.Installed),
                  this.emit("readyStateChange", this._readyState),
                  !0)
              ),
              ze());
        }
        get publicKey() {
          return this._publicKey;
        }
        get connecting() {
          return this._connecting;
        }
        get connected() {
          return !!this._wallet?.connected;
        }
        get readyState() {
          return this._readyState;
        }
        async autoConnect() {
          (this.readyState === d.i1.Loadable && (0, d.H)()) ||
            (await this.connect());
        }
        async connect() {
          try {
            if (this.connected || this.connecting) return;
            if (
              this._readyState !== d.i1.Loadable &&
              this._readyState !== d.i1.Installed
            )
              throw new f.OZ();
            if (this.readyState === d.i1.Loadable && (0, d.H)()) {
              const t = encodeURIComponent(window.location.href),
                e = encodeURIComponent(window.location.origin);
              return void (window.location.href = `https://solflare.com/ul/v1/browse/${t}?ref=${e}`);
            }
            let e, r, i;
            try {
              e = (await n.e(119).then(n.bind(n, 119))).default;
            } catch (t) {
              throw new f.W8(t?.message, t);
            }
            try {
              r = new e({ network: this._config.network });
            } catch (t) {
              throw new f.p6(t?.message, t);
            }
            if (((this._connecting = !0), !r.connected))
              try {
                await r.connect();
              } catch (t) {
                throw new f.$w(t?.message, t);
              }
            if (!r.publicKey) throw new f.$w();
            try {
              i = new c.PublicKey(r.publicKey.toBytes());
            } catch (t) {
              throw new f.Nx(t?.message, t);
            }
            r.on("disconnect", this._disconnected),
              r.on("accountChanged", this._accountChanged),
              (this._wallet = r),
              (this._publicKey = i),
              this.emit("connect", i);
          } catch (t) {
            throw (this.emit("error", t), t);
          } finally {
            this._connecting = !1;
          }
        }
        async disconnect() {
          const t = this._wallet;
          if (t) {
            t.off("disconnect", this._disconnected),
              t.off("accountChanged", this._accountChanged),
              (this._wallet = null),
              (this._publicKey = null);
            try {
              await t.disconnect();
            } catch (e) {
              this.emit("error", new f.UG(e?.message, e));
            }
          }
          this.emit("disconnect");
        }
        async sendTransaction(t, e, n = {}) {
          try {
            const i = this._wallet;
            if (!i) throw new f.oS();
            try {
              const { signers: r, ...o } = n;
              return (
                p(t)
                  ? r?.length && t.sign(r)
                  : ((t = await this.prepareTransaction(t, e, o)),
                    r?.length && t.partialSign(...r)),
                (o.preflightCommitment = o.preflightCommitment || e.commitment),
                await i.signAndSendTransaction(t, o)
              );
            } catch (r) {
              if (r instanceof f.lj) throw r;
              throw new f.IW(r?.message, r);
            }
          } catch (r) {
            throw (this.emit("error", r), r);
          }
        }
        async signTransaction(t) {
          try {
            const n = this._wallet;
            if (!n) throw new f.oS();
            try {
              return (await n.signTransaction(t)) || t;
            } catch (e) {
              throw new f.PY(e?.message, e);
            }
          } catch (e) {
            throw (this.emit("error", e), e);
          }
        }
        async signAllTransactions(t) {
          try {
            const n = this._wallet;
            if (!n) throw new f.oS();
            try {
              return (await n.signAllTransactions(t)) || t;
            } catch (e) {
              throw new f.PY(e?.message, e);
            }
          } catch (e) {
            throw (this.emit("error", e), e);
          }
        }
        async signMessage(t) {
          try {
            const n = this._wallet;
            if (!n) throw new f.oS();
            try {
              return await n.signMessage(t, "utf8");
            } catch (e) {
              throw new f.fk(e?.message, e);
            }
          } catch (e) {
            throw (this.emit("error", e), e);
          }
        }
      }
      class Ue extends g {
        constructor(
          { params: t = { showTorusButton: !1 } } = {
            params: { showTorusButton: !1 },
          }
        ) {
          super(),
            (this.name = "Torus"),
            (this.url = "https://tor.us"),
            (this.icon =
              "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzMiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMyAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYuNSIgY3k9IjE2IiByPSIxNiIgZmlsbD0iIzAzNjRGRiIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTExLjIxODYgOS40OTIxOUMxMC40NTM5IDkuNDkyMTkgOS44MzM5OCAxMC4xMTIxIDkuODMzOTggMTAuODc2OFYxMi40ODk4QzkuODMzOTggMTMuMjU0NSAxMC40NTM5IDEzLjg3NDQgMTEuMjE4NiAxMy44NzQ0SDEzLjY2ODRWMjIuODk3NkMxMy42Njg0IDIzLjY2MjMgMTQuMjg4MyAyNC4yODIyIDE1LjA1MyAyNC4yODIySDE2LjY2NkMxNy40MzA3IDI0LjI4MjIgMTguMDUwNiAyMy42NjIzIDE4LjA1MDYgMjIuODk3NlYxMi41MDE1QzE4LjA1MDYgMTIuNDk3NiAxOC4wNTA2IDEyLjQ5MzcgMTguMDUwNiAxMi40ODk4VjEwLjg3NjhDMTguMDUwNiAxMC4xMTIxIDE3LjQzMDcgOS40OTIxOSAxNi42NjYgOS40OTIxOUgxNS4wNTNIMTEuMjE4NloiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0yMS4zMzc2IDEzLjg3NDRDMjIuNTQ3NyAxMy44NzQ0IDIzLjUyODcgMTIuODkzNCAyMy41Mjg3IDExLjY4MzNDMjMuNTI4NyAxMC40NzMyIDIyLjU0NzcgOS40OTIxOSAyMS4zMzc2IDkuNDkyMTlDMjAuMTI3NSA5LjQ5MjE5IDE5LjE0NjUgMTAuNDczMiAxOS4xNDY1IDExLjY4MzNDMTkuMTQ2NSAxMi44OTM0IDIwLjEyNzUgMTMuODc0NCAyMS4zMzc2IDEzLjg3NDRaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K"),
            (this.supportedTransactionVersions = null),
            (this._readyState =
              "undefined" === typeof window || "undefined" === typeof document
                ? d.i1.Unsupported
                : d.i1.Loadable),
            (this._connecting = !1),
            (this._wallet = null),
            (this._publicKey = null),
            (this._params = t);
        }
        get publicKey() {
          return this._publicKey;
        }
        get connecting() {
          return this._connecting;
        }
        get connected() {
          return !!this._wallet?.isLoggedIn;
        }
        get readyState() {
          return this._readyState;
        }
        async connect() {
          try {
            if (this.connected || this.connecting) return;
            if (this._readyState !== d.i1.Loadable) throw new f.OZ();
            let e, r, i, o;
            this._connecting = !0;
            try {
              e = (
                await Promise.all([
                  n.e(662),
                  n.e(794),
                  n.e(922),
                  n.e(507),
                ]).then(n.bind(n, 3922))
              ).default;
            } catch (t) {
              throw new f.W8(t?.message, t);
            }
            try {
              r = window.torus || new e();
            } catch (t) {
              throw new f.p6(t?.message, t);
            }
            if (!r.isInitialized)
              try {
                await r.init(this._params);
              } catch (t) {
                throw new f.$w(t?.message, t);
              }
            try {
              i = await r.login();
            } catch (t) {
              throw new f.cO(t?.message, t);
            }
            try {
              o = new c.PublicKey(i[0]);
            } catch (t) {
              throw new f.Nx(t?.message, t);
            }
            (this._wallet = r), (this._publicKey = o), this.emit("connect", o);
          } catch (t) {
            throw (this.emit("error", t), t);
          } finally {
            this._connecting = !1;
          }
        }
        async disconnect() {
          const t = this._wallet;
          if (t) {
            (this._wallet = null), (this._publicKey = null);
            try {
              t.isLoggedIn && (await t.cleanUp());
            } catch (e) {
              this.emit("error", new f.UG(e?.message, e));
            }
          }
          this.emit("disconnect");
        }
        async sendTransaction(t, e, n = {}) {
          try {
            const i = this._wallet;
            if (!i) throw new f.oS();
            try {
              const { signers: r, ...o } = n;
              (t = await this.prepareTransaction(t, e, o)),
                r?.length && t.partialSign(...r),
                (o.preflightCommitment = o.preflightCommitment || e.commitment);
              const { signature: s } = await i.signAndSendTransaction(t, o);
              return s;
            } catch (r) {
              if (r instanceof f.lj) throw r;
              throw new f.IW(r?.message, r);
            }
          } catch (r) {
            throw (this.emit("error", r), r);
          }
        }
        async signTransaction(t) {
          try {
            const n = this._wallet;
            if (!n) throw new f.oS();
            try {
              return (await n.signTransaction(t)) || t;
            } catch (e) {
              throw new f.PY(e?.message, e);
            }
          } catch (e) {
            throw (this.emit("error", e), e);
          }
        }
        async signAllTransactions(t) {
          try {
            const n = this._wallet;
            if (!n) throw new f.oS();
            try {
              return (await n.signAllTransactions(t)) || t;
            } catch (e) {
              throw new f.PY(e?.message, e);
            }
          } catch (e) {
            throw (this.emit("error", e), e);
          }
        }
        async signMessage(t) {
          try {
            const n = this._wallet;
            if (!n) throw new f.oS();
            try {
              return await n.signMessage(t);
            } catch (e) {
              throw new f.fk(e?.message, e);
            }
          } catch (e) {
            throw (this.emit("error", e), e);
          }
        }
      }
      var We = n(5893),
        Ke = (0, u.createContext)({});
      function qe() {
        return (0, u.useContext)(Ke);
      }
      var He = function (t) {
          var e = t.children,
            n = (0, u.useState)(function () {
              var t = localStorage.getItem("auto-connect");
              return !!t && JSON.parse(t);
            }),
            r = n[0],
            i = n[1];
          return (
            (0, u.useEffect)(
              function () {
                localStorage.setItem("auto-connect", JSON.stringify(r));
              },
              [r]
            ),
            (0, We.jsx)(Ke.Provider, {
              value: { autoConnect: r, setAutoConnect: i },
              children: e,
            })
          );
        },
        Fe = n(2224),
        Ye = n(5152),
        Ve = n.n(Ye),
        $e = n(6072),
        Ze = Ve()(
          (0, o.Z)(
            a().mark(function t() {
              return a().wrap(function (t) {
                for (;;)
                  switch ((t.prev = t.next)) {
                    case 0:
                      return (t.next = 2), n.e(337).then(n.bind(n, 5337));
                    case 2:
                      return t.abrupt("return", t.sent.WalletModalProvider);
                    case 3:
                    case "end":
                      return t.stop();
                  }
              }, t);
            })
          ),
          {
            ssr: !1,
            loadableGenerated: {
              webpack: function () {
                return [null];
              },
            },
          }
        ),
        Ge = function (t) {
          var e = t.children,
            n = qe().autoConnect,
            i = r.Mainnet,
            o = (0, u.useMemo)(
              function () {
                return [new pe(), new De(), new Ue()];
              },
              [i]
            ),
            s = (0, u.useCallback)(function (t) {
              (0, Fe.h)({
                type: "error",
                message: t.message
                  ? "".concat(t.name, ": ").concat(t.message)
                  : t.name,
              }),
                console.error(t);
            }, []);
          return (0, We.jsx)(l, {
            endpoint:
              "https://mainnet.helius-rpc.com/?api-key=44b42698-9981-437c-896e-ca47371afe89",
            children: (0, We.jsx)(fe, {
              wallets: o,
              onError: s,
              autoConnect: n,
              children: (0, We.jsx)(Ze, { children: e }),
            }),
          });
        },
        Qe = function (t) {
          var e = t.children;
          return (0, We.jsx)(He, {
            children: (0, We.jsx)(Ge, {
              children: (0, We.jsx)($e.w, { children: e }),
            }),
          });
        },
        Je = n(2640),
        Xe = function (t) {
          var e = qe(),
            n = (e.autoConnect, e.setAutoConnect);
          return (
            u.useEffect(function () {
              n(!0);
            }, []),
            (0, We.jsxs)("div", {
              className:
                " text-base-content  fixed top-0 z-30  h-16 w-full justify-center bg-opacity-90 backdrop-blur transition-shadow duration-100 [transform:translate3d(0,0,0)] ",
              children: [
                (0, We.jsxs)("div", {
                  className: "flex flex-row text-black navbar md:mb-2",
                  children: [
                    // (0, We.jsxs)("div", {
                    //   className: "md:ml-40 navbar-start",
                    //   children: [
                    //     (0, We.jsx)("label", {
                    //       htmlFor: "my-drawer",
                    //       className: "md:hidden btn btn-square btn-ghost",
                    //       children: (0, We.jsx)("svg", {
                    //         className: "inline-block w-6 h-6 stroke-current",
                    //         xmlns: "http://www.w3.org/2000/svg",
                    //         fill: "none",
                    //         viewBox: "0 0 24 24",
                    //         children: (0, We.jsx)("path", {
                    //           strokeLinecap: "round",
                    //           strokeLinejoin: "round",
                    //           strokeWidth: "2",
                    //           d: "M4 6h16M4 12h16M4 18h16",
                    //         }),
                    //       }),
                    //     }),
                    //     (0, We.jsx)("div", {
                    //       className: "hidden sm:inline w-22 h-22 md:p-2",
                    //       children: (0, We.jsx)("img", {
                    //         src: "../assets/king.png",
                    //         alt: "King",
                    //         width: 32,
                    //         height: 32,
                    //       }),
                    //     }),
                    //   ],
                    // }),
                    (0, We.jsx)("div", {
                      className: "hidden mr-10 md:inline md:navbar-center",
                      children: (0, We.jsx)("div", {
                        className: "items-center hidden gap-10 md:flex",
                      }),
                    }),
                    (0, We.jsxs)("div", {
                      className: "navbar-end",
                      children: [
                        (0, We.jsx)("div", {
                          className: "items-stretch hidden custom-md:flex",
                        }),
                        (0, We.jsx)("a", {
                          className: "text-[#3ed44f] text-4xl",
                          href: "https://app.uniswap.org/#/swap?inputCurrency=eth&outputCurrency=0xcomingsoon",
                          target: "_blank",
                          children: "Buy Now",
                        }),
                        // (0, We.jsx)(Je.a, {
                        //   className: "md:mr-40 btn btn-ghost",
                        // }),
                      ],
                    }),
                    
                  ],
                }),
                t.children,
              ],
            })
          );
        },
        tn = n(1664),
        en = n.n(tn),
        nn = function (t) {
          return (0, We.jsxs)("div", {
            className: " w-full",
            children: [
              (0, We.jsx)("input", {
                id: "my-drawer",
                type: "checkbox",
                className: "grow drawer-toggle",
              }),
              (0, We.jsx)("div", {
                className: "items-center drawer-content",
                children: t.children,
              }),
              (0, We.jsxs)("div", {
                className: "drawer-side",
                children: [
                  (0, We.jsx)("label", {
                    htmlFor: "my-drawer",
                    className: "drawer-overlay",
                  }),
                  (0, We.jsxs)("ul", {
                    className: "p-4 overflow-y-auto menu w-80",
                    children: [
                      (0, We.jsx)("li", {
                        children: (0, We.jsx)("h1", { children: "Menu" }),
                      }),
                      (0, We.jsx)("li", {
                        children: (0, We.jsx)(en(), {
                          href: "/play",
                          children: (0, We.jsx)("a", { children: "Play" }),
                        }),
                      }),
                    ],
                  }),
                ],
              }),
            ],
          });
        },
        rn = n(7812);
      var on = u.forwardRef(function (t, e) {
        return u.createElement(
          "svg",
          Object.assign(
            {
              xmlns: "http://www.w3.org/2000/svg",
              fill: "none",
              viewBox: "0 0 24 24",
              strokeWidth: 2,
              stroke: "currentColor",
              "aria-hidden": "true",
              ref: e,
            },
            t
          ),
          u.createElement("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
          })
        );
      });
      var sn = u.forwardRef(function (t, e) {
        return u.createElement(
          "svg",
          Object.assign(
            {
              xmlns: "http://www.w3.org/2000/svg",
              fill: "none",
              viewBox: "0 0 24 24",
              strokeWidth: 2,
              stroke: "currentColor",
              "aria-hidden": "true",
              ref: e,
            },
            t
          ),
          u.createElement("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
          })
        );
      });
      var an = u.forwardRef(function (t, e) {
        return u.createElement(
          "svg",
          Object.assign(
            {
              xmlns: "http://www.w3.org/2000/svg",
              fill: "none",
              viewBox: "0 0 24 24",
              strokeWidth: 2,
              stroke: "currentColor",
              "aria-hidden": "true",
              ref: e,
            },
            t
          ),
          u.createElement("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z",
          })
        );
      });
      var cn = u.forwardRef(function (t, e) {
          return u.createElement(
            "svg",
            Object.assign(
              {
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 20 20",
                fill: "currentColor",
                "aria-hidden": "true",
                ref: e,
              },
              t
            ),
            u.createElement("path", {
              fillRule: "evenodd",
              d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
              clipRule: "evenodd",
            })
          );
        }),
        un = n(2375),
        hn = function (t) {
          var e = t.type,
            n = t.message,
            r = t.description,
            i = t.txid,
            o = t.onHide;
          (0, h.R)().connection;
          return (
            (0, u.useEffect)(
              function () {
                var t = setTimeout(function () {
                  o();
                }, 2e3);
                return function () {
                  clearInterval(t);
                };
              },
              [o]
            ),
            (0, We.jsx)("div", {
              className:
                "absolute top-20 left-0 max-w-sm w-full bg-bkg-1 bg-black shadow-lg rounded-md mt-2 pointer-events-auto p-2 mx-4 mb-12 overflow-hidden",
              children: (0, We.jsx)("div", {
                className: "p-4 bg-black",
                children: (0, We.jsxs)("div", {
                  className: "flex items-center",
                  children: [
                    (0, We.jsxs)("div", {
                      className: "flex-shrink-0",
                      children: [
                        "success" === e
                          ? (0, We.jsx)(on, {
                              className: "h-8 w-8 mr-1 text-green",
                            })
                          : null,
                        "info" === e &&
                          (0, We.jsx)(sn, {
                            className: "h-8 w-8 mr-1 text-red",
                          }),
                        "error" === e &&
                          (0, We.jsx)(an, { className: "h-8 w-8 mr-1" }),
                      ],
                    }),
                    (0, We.jsxs)("div", {
                      className: "ml-2 w-0 flex-1",
                      children: [
                        (0, We.jsx)("div", {
                          className: "font-bold text-fgd-1",
                          children: n,
                        }),
                        r
                          ? (0, We.jsx)("p", {
                              className: "mt-0.5 text-sm text-fgd-2",
                              children: r,
                            })
                          : null,
                        i
                          ? (0, We.jsx)("div", {
                              className: "flex flex-row",
                              children: (0, We.jsxs)("a", {
                                href:
                                  "https://explorer.solana.com/tx/" +
                                  i +
                                  "?cluster=devnet",
                                target: "_blank",
                                rel: "noreferrer",
                                className: "flex flex-row link link-accent",
                                children: [
                                  (0, We.jsx)("svg", {
                                    className:
                                      "flex-shrink-0 h-4 ml-2 mt-0.5 text-primary-light w-4",
                                    xmlns: "http://www.w3.org/2000/svg",
                                    fill: "none",
                                    viewBox: "0 0 24 24",
                                    stroke: "currentColor",
                                    children: (0, We.jsx)("path", {
                                      strokeLinecap: "round",
                                      strokeLinejoin: "round",
                                      strokeWidth: "2",
                                      d: "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14",
                                    }),
                                  }),
                                  (0, We.jsxs)("div", {
                                    className: "flex mx-4",
                                    children: [
                                      i.slice(0, 8),
                                      "...",
                                      i.slice(i.length - 8),
                                    ],
                                  }),
                                ],
                              }),
                            })
                          : null,
                      ],
                    }),
                    (0, We.jsx)("div", {
                      className: "ml-4 flex-shrink-0 self-start flex",
                      children: (0, We.jsxs)("button", {
                        onClick: function () {
                          return o();
                        },
                        className:
                          "bg-bkg-2 default-transition rounded-md inline-flex text-fgd-3 hover:text-fgd-4 focus:outline-none",
                        children: [
                          (0, We.jsx)("span", {
                            className: "sr-only",
                            children: "Close",
                          }),
                          (0, We.jsx)(cn, { className: "w-5 h-5" }),
                        ],
                      }),
                    }),
                  ],
                }),
              }),
            })
          );
        },
        ln = function () {
          var t = (0, un.Z)(function (t) {
              return t;
            }),
            e = t.notifications,
            n = t.set,
            r = (0, rn.Z)(e).reverse();
          return (0, We.jsx)("div", {
            className:
              "z-20 fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6",
            children: (0, We.jsx)("div", {
              className: "flex flex-col w-full",
              children: r.map(function (t, i) {
                return (0, We.jsx)(
                  hn,
                  {
                    type: t.type,
                    message: t.message,
                    description: t.description,
                    txid: t.txid,
                    onHide: function () {
                      n(function (t) {
                        var n = r.length - 1 - i;
                        t.notifications = [].concat(
                          (0, rn.Z)(e.slice(0, n)),
                          (0, rn.Z)(e.slice(n + 1))
                        );
                      });
                    },
                  },
                  "".concat(t.message).concat(i)
                );
              }),
            }),
          });
        };
      function dn(t, e) {
        var n = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(t);
          e &&
            (r = r.filter(function (e) {
              return Object.getOwnPropertyDescriptor(t, e).enumerable;
            })),
            n.push.apply(n, r);
        }
        return n;
      }
      function fn(t) {
        for (var e = 1; e < arguments.length; e++) {
          var n = null != arguments[e] ? arguments[e] : {};
          e % 2
            ? dn(Object(n), !0).forEach(function (e) {
                (0, i.Z)(t, e, n[e]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
            : dn(Object(n)).forEach(function (e) {
                Object.defineProperty(
                  t,
                  e,
                  Object.getOwnPropertyDescriptor(n, e)
                );
              });
        }
        return t;
      }
      n(999), n(472);
      var pn = function (t) {
        var e = t.Component,
          n = t.pageProps;
        return (0, We.jsx)(We.Fragment, {
          children: (0, We.jsx)(Qe, {
            children: (0, We.jsxs)("div", {
              className: "flex flex-col h-screen ",
              children: [
                (0, We.jsx)(ln, {}),
                (0, We.jsx)(Xe, {}),
                (0, We.jsx)(nn, { children: (0, We.jsx)(e, fn({}, n)) }),
              ],
            }),
          }),
        });
      };
    },
    2375: function (t, e, n) {
      "use strict";
      n.d(e, {
        Z: function () {
          return it;
        },
      });
      var r = n(4671);
      function i(t) {
        for (
          var e = arguments.length, n = Array(e > 1 ? e - 1 : 0), r = 1;
          r < e;
          r++
        )
          n[r - 1] = arguments[r];
        throw Error(
          "[Immer] minified error nr: " +
            t +
            (n.length
              ? " " +
                n
                  .map(function (t) {
                    return "'" + t + "'";
                  })
                  .join(",")
              : "") +
            ". Find the full error at: https://bit.ly/3cXEKWf"
        );
      }
      function o(t) {
        return !!t && !!t[Y];
      }
      function s(t) {
        return (
          !!t &&
          ((function (t) {
            if (!t || "object" != typeof t) return !1;
            var e = Object.getPrototypeOf(t);
            if (null === e) return !0;
            var n =
              Object.hasOwnProperty.call(e, "constructor") && e.constructor;
            return (
              n === Object ||
              ("function" == typeof n && Function.toString.call(n) === V)
            );
          })(t) ||
            Array.isArray(t) ||
            !!t[F] ||
            !!t.constructor[F] ||
            f(t) ||
            p(t))
        );
      }
      function a(t, e, n) {
        void 0 === n && (n = !1),
          0 === c(t)
            ? (n ? Object.keys : $)(t).forEach(function (r) {
                (n && "symbol" == typeof r) || e(r, t[r], t);
              })
            : t.forEach(function (n, r) {
                return e(r, n, t);
              });
      }
      function c(t) {
        var e = t[Y];
        return e
          ? e.i > 3
            ? e.i - 4
            : e.i
          : Array.isArray(t)
          ? 1
          : f(t)
          ? 2
          : p(t)
          ? 3
          : 0;
      }
      function u(t, e) {
        return 2 === c(t)
          ? t.has(e)
          : Object.prototype.hasOwnProperty.call(t, e);
      }
      function h(t, e) {
        return 2 === c(t) ? t.get(e) : t[e];
      }
      function l(t, e, n) {
        var r = c(t);
        2 === r ? t.set(e, n) : 3 === r ? (t.delete(e), t.add(n)) : (t[e] = n);
      }
      function d(t, e) {
        return t === e ? 0 !== t || 1 / t == 1 / e : t != t && e != e;
      }
      function f(t) {
        return W && t instanceof Map;
      }
      function p(t) {
        return K && t instanceof Set;
      }
      function y(t) {
        return t.o || t.t;
      }
      function g(t) {
        if (Array.isArray(t)) return Array.prototype.slice.call(t);
        var e = Z(t);
        delete e[Y];
        for (var n = $(e), r = 0; r < n.length; r++) {
          var i = n[r],
            o = e[i];
          !1 === o.writable && ((o.writable = !0), (o.configurable = !0)),
            (o.get || o.set) &&
              (e[i] = {
                configurable: !0,
                writable: !0,
                enumerable: o.enumerable,
                value: t[i],
              });
        }
        return Object.create(Object.getPrototypeOf(t), e);
      }
      function m(t, e) {
        return (
          void 0 === e && (e = !1),
          b(t) ||
            o(t) ||
            !s(t) ||
            (c(t) > 1 && (t.set = t.add = t.clear = t.delete = w),
            Object.freeze(t),
            e &&
              a(
                t,
                function (t, e) {
                  return m(e, !0);
                },
                !0
              )),
          t
        );
      }
      function w() {
        i(2);
      }
      function b(t) {
        return null == t || "object" != typeof t || Object.isFrozen(t);
      }
      function v(t) {
        var e = G[t];
        return e || i(18, t), e;
      }
      function k() {
        return D;
      }
      function S(t, e) {
        e && (v("Patches"), (t.u = []), (t.s = []), (t.v = e));
      }
      function M(t) {
        I(t), t.p.forEach(_), (t.p = null);
      }
      function I(t) {
        t === D && (D = t.l);
      }
      function E(t) {
        return (D = { p: [], l: D, h: t, m: !0, _: 0 });
      }
      function _(t) {
        var e = t[Y];
        0 === e.i || 1 === e.i ? e.j() : (e.O = !0);
      }
      function A(t, e) {
        e._ = e.p.length;
        var n = e.p[0],
          r = void 0 !== t && t !== n;
        return (
          e.h.g || v("ES5").S(e, t, r),
          r
            ? (n[Y].P && (M(e), i(4)),
              s(t) && ((t = x(e, t)), e.l || T(e, t)),
              e.u && v("Patches").M(n[Y].t, t, e.u, e.s))
            : (t = x(e, n, [])),
          M(e),
          e.u && e.v(e.u, e.s),
          t !== H ? t : void 0
        );
      }
      function x(t, e, n) {
        if (b(e)) return e;
        var r = e[Y];
        if (!r)
          return (
            a(
              e,
              function (i, o) {
                return L(t, r, e, i, o, n);
              },
              !0
            ),
            e
          );
        if (r.A !== t) return e;
        if (!r.P) return T(t, r.t, !0), r.t;
        if (!r.I) {
          (r.I = !0), r.A._--;
          var i = 4 === r.i || 5 === r.i ? (r.o = g(r.k)) : r.o;
          a(3 === r.i ? new Set(i) : i, function (e, o) {
            return L(t, r, i, e, o, n);
          }),
            T(t, i, !1),
            n && t.u && v("Patches").R(r, n, t.u, t.s);
        }
        return r.o;
      }
      function L(t, e, n, r, i, a) {
        if (o(i)) {
          var c = x(
            t,
            i,
            a && e && 3 !== e.i && !u(e.D, r) ? a.concat(r) : void 0
          );
          if ((l(n, r, c), !o(c))) return;
          t.m = !1;
        }
        if (s(i) && !b(i)) {
          if (!t.h.F && t._ < 1) return;
          x(t, i), (e && e.A.l) || T(t, i);
        }
      }
      function T(t, e, n) {
        void 0 === n && (n = !1), t.h.F && t.m && m(e, n);
      }
      function N(t, e) {
        var n = t[Y];
        return (n ? y(n) : t)[e];
      }
      function O(t, e) {
        if (e in t)
          for (var n = Object.getPrototypeOf(t); n; ) {
            var r = Object.getOwnPropertyDescriptor(n, e);
            if (r) return r;
            n = Object.getPrototypeOf(n);
          }
      }
      function B(t) {
        t.P || ((t.P = !0), t.l && B(t.l));
      }
      function j(t) {
        t.o || (t.o = g(t.t));
      }
      function P(t, e, n) {
        var r = f(e)
          ? v("MapSet").N(e, n)
          : p(e)
          ? v("MapSet").T(e, n)
          : t.g
          ? (function (t, e) {
              var n = Array.isArray(t),
                r = {
                  i: n ? 1 : 0,
                  A: e ? e.A : k(),
                  P: !1,
                  I: !1,
                  D: {},
                  l: e,
                  t: t,
                  k: null,
                  o: null,
                  j: null,
                  C: !1,
                },
                i = r,
                o = Q;
              n && ((i = [r]), (o = J));
              var s = Proxy.revocable(i, o),
                a = s.revoke,
                c = s.proxy;
              return (r.k = c), (r.j = a), c;
            })(e, n)
          : v("ES5").J(e, n);
        return (n ? n.A : k()).p.push(r), r;
      }
      function C(t) {
        return (
          o(t) || i(22, t),
          (function t(e) {
            if (!s(e)) return e;
            var n,
              r = e[Y],
              i = c(e);
            if (r) {
              if (!r.P && (r.i < 4 || !v("ES5").K(r))) return r.t;
              (r.I = !0), (n = R(e, i)), (r.I = !1);
            } else n = R(e, i);
            return (
              a(n, function (e, i) {
                (r && h(r.t, e) === i) || l(n, e, t(i));
              }),
              3 === i ? new Set(n) : n
            );
          })(t)
        );
      }
      function R(t, e) {
        switch (e) {
          case 2:
            return new Map(t);
          case 3:
            return Array.from(t);
        }
        return g(t);
      }
      var z,
        D,
        U = "undefined" != typeof Symbol && "symbol" == typeof Symbol("x"),
        W = "undefined" != typeof Map,
        K = "undefined" != typeof Set,
        q =
          "undefined" != typeof Proxy &&
          void 0 !== Proxy.revocable &&
          "undefined" != typeof Reflect,
        H = U
          ? Symbol.for("immer-nothing")
          : (((z = {})["immer-nothing"] = !0), z),
        F = U ? Symbol.for("immer-draftable") : "__$immer_draftable",
        Y = U ? Symbol.for("immer-state") : "__$immer_state",
        V =
          ("undefined" != typeof Symbol && Symbol.iterator,
          "" + Object.prototype.constructor),
        $ =
          "undefined" != typeof Reflect && Reflect.ownKeys
            ? Reflect.ownKeys
            : void 0 !== Object.getOwnPropertySymbols
            ? function (t) {
                return Object.getOwnPropertyNames(t).concat(
                  Object.getOwnPropertySymbols(t)
                );
              }
            : Object.getOwnPropertyNames,
        Z =
          Object.getOwnPropertyDescriptors ||
          function (t) {
            var e = {};
            return (
              $(t).forEach(function (n) {
                e[n] = Object.getOwnPropertyDescriptor(t, n);
              }),
              e
            );
          },
        G = {},
        Q = {
          get: function (t, e) {
            if (e === Y) return t;
            var n = y(t);
            if (!u(n, e))
              return (function (t, e, n) {
                var r,
                  i = O(e, n);
                return i
                  ? "value" in i
                    ? i.value
                    : null === (r = i.get) || void 0 === r
                    ? void 0
                    : r.call(t.k)
                  : void 0;
              })(t, n, e);
            var r = n[e];
            return t.I || !s(r)
              ? r
              : r === N(t.t, e)
              ? (j(t), (t.o[e] = P(t.A.h, r, t)))
              : r;
          },
          has: function (t, e) {
            return e in y(t);
          },
          ownKeys: function (t) {
            return Reflect.ownKeys(y(t));
          },
          set: function (t, e, n) {
            var r = O(y(t), e);
            if (null == r ? void 0 : r.set) return r.set.call(t.k, n), !0;
            if (!t.P) {
              var i = N(y(t), e),
                o = null == i ? void 0 : i[Y];
              if (o && o.t === n) return (t.o[e] = n), (t.D[e] = !1), !0;
              if (d(n, i) && (void 0 !== n || u(t.t, e))) return !0;
              j(t), B(t);
            }
            return (
              (t.o[e] === n &&
                "number" != typeof n &&
                (void 0 !== n || e in t.o)) ||
              ((t.o[e] = n), (t.D[e] = !0), !0)
            );
          },
          deleteProperty: function (t, e) {
            return (
              void 0 !== N(t.t, e) || e in t.t
                ? ((t.D[e] = !1), j(t), B(t))
                : delete t.D[e],
              t.o && delete t.o[e],
              !0
            );
          },
          getOwnPropertyDescriptor: function (t, e) {
            var n = y(t),
              r = Reflect.getOwnPropertyDescriptor(n, e);
            return r
              ? {
                  writable: !0,
                  configurable: 1 !== t.i || "length" !== e,
                  enumerable: r.enumerable,
                  value: n[e],
                }
              : r;
          },
          defineProperty: function () {
            i(11);
          },
          getPrototypeOf: function (t) {
            return Object.getPrototypeOf(t.t);
          },
          setPrototypeOf: function () {
            i(12);
          },
        },
        J = {};
      a(Q, function (t, e) {
        J[t] = function () {
          return (arguments[0] = arguments[0][0]), e.apply(this, arguments);
        };
      }),
        (J.deleteProperty = function (t, e) {
          return J.set.call(this, t, e, void 0);
        }),
        (J.set = function (t, e, n) {
          return Q.set.call(this, t[0], e, n, t[0]);
        });
      var X = (function () {
          function t(t) {
            var e = this;
            (this.g = q),
              (this.F = !0),
              (this.produce = function (t, n, r) {
                if ("function" == typeof t && "function" != typeof n) {
                  var o = n;
                  n = t;
                  var a = e;
                  return function (t) {
                    var e = this;
                    void 0 === t && (t = o);
                    for (
                      var r = arguments.length,
                        i = Array(r > 1 ? r - 1 : 0),
                        s = 1;
                      s < r;
                      s++
                    )
                      i[s - 1] = arguments[s];
                    return a.produce(t, function (t) {
                      var r;
                      return (r = n).call.apply(r, [e, t].concat(i));
                    });
                  };
                }
                var c;
                if (
                  ("function" != typeof n && i(6),
                  void 0 !== r && "function" != typeof r && i(7),
                  s(t))
                ) {
                  var u = E(e),
                    h = P(e, t, void 0),
                    l = !0;
                  try {
                    (c = n(h)), (l = !1);
                  } finally {
                    l ? M(u) : I(u);
                  }
                  return "undefined" != typeof Promise && c instanceof Promise
                    ? c.then(
                        function (t) {
                          return S(u, r), A(t, u);
                        },
                        function (t) {
                          throw (M(u), t);
                        }
                      )
                    : (S(u, r), A(c, u));
                }
                if (!t || "object" != typeof t) {
                  if (
                    (void 0 === (c = n(t)) && (c = t),
                    c === H && (c = void 0),
                    e.F && m(c, !0),
                    r)
                  ) {
                    var d = [],
                      f = [];
                    v("Patches").M(t, c, d, f), r(d, f);
                  }
                  return c;
                }
                i(21, t);
              }),
              (this.produceWithPatches = function (t, n) {
                if ("function" == typeof t)
                  return function (n) {
                    for (
                      var r = arguments.length,
                        i = Array(r > 1 ? r - 1 : 0),
                        o = 1;
                      o < r;
                      o++
                    )
                      i[o - 1] = arguments[o];
                    return e.produceWithPatches(n, function (e) {
                      return t.apply(void 0, [e].concat(i));
                    });
                  };
                var r,
                  i,
                  o = e.produce(t, n, function (t, e) {
                    (r = t), (i = e);
                  });
                return "undefined" != typeof Promise && o instanceof Promise
                  ? o.then(function (t) {
                      return [t, r, i];
                    })
                  : [o, r, i];
              }),
              "boolean" == typeof (null == t ? void 0 : t.useProxies) &&
                this.setUseProxies(t.useProxies),
              "boolean" == typeof (null == t ? void 0 : t.autoFreeze) &&
                this.setAutoFreeze(t.autoFreeze);
          }
          var e = t.prototype;
          return (
            (e.createDraft = function (t) {
              s(t) || i(8), o(t) && (t = C(t));
              var e = E(this),
                n = P(this, t, void 0);
              return (n[Y].C = !0), I(e), n;
            }),
            (e.finishDraft = function (t, e) {
              var n = (t && t[Y]).A;
              return S(n, e), A(void 0, n);
            }),
            (e.setAutoFreeze = function (t) {
              this.F = t;
            }),
            (e.setUseProxies = function (t) {
              t && !q && i(20), (this.g = t);
            }),
            (e.applyPatches = function (t, e) {
              var n;
              for (n = e.length - 1; n >= 0; n--) {
                var r = e[n];
                if (0 === r.path.length && "replace" === r.op) {
                  t = r.value;
                  break;
                }
              }
              n > -1 && (e = e.slice(n + 1));
              var i = v("Patches").$;
              return o(t)
                ? i(t, e)
                : this.produce(t, function (t) {
                    return i(t, e);
                  });
            }),
            t
          );
        })(),
        tt = new X(),
        et = tt.produce,
        nt =
          (tt.produceWithPatches.bind(tt),
          tt.setAutoFreeze.bind(tt),
          tt.setUseProxies.bind(tt),
          tt.applyPatches.bind(tt),
          tt.createDraft.bind(tt),
          tt.finishDraft.bind(tt),
          et),
        rt = (0, r.Z)(function (t, e) {
          return {
            notifications: [],
            set: function (e) {
              return t(nt(e));
            },
          };
        }),
        it = rt;
    },
    2224: function (t, e, n) {
      "use strict";
      n.d(e, {
        h: function () {
          return c;
        },
      });
      var r = n(9499),
        i = n(7812),
        o = n(2375);
      function s(t, e) {
        var n = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(t);
          e &&
            (r = r.filter(function (e) {
              return Object.getOwnPropertyDescriptor(t, e).enumerable;
            })),
            n.push.apply(n, r);
        }
        return n;
      }
      function a(t) {
        for (var e = 1; e < arguments.length; e++) {
          var n = null != arguments[e] ? arguments[e] : {};
          e % 2
            ? s(Object(n), !0).forEach(function (e) {
                (0, r.Z)(t, e, n[e]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
            : s(Object(n)).forEach(function (e) {
                Object.defineProperty(
                  t,
                  e,
                  Object.getOwnPropertyDescriptor(n, e)
                );
              });
        }
        return t;
      }
      function c(t) {
        var e = o.Z.getState(),
          n = e.notifications;
        (0, e.set)(function (e) {
          e.notifications = [].concat((0, i.Z)(n), [a({ type: "success" }, t)]);
        });
      }
    },
    6840: function (t, e, n) {
      (window.__NEXT_P = window.__NEXT_P || []).push([
        "/_app",
        function () {
          return n(106);
        },
      ]);
    },
    999: function () {},
    472: function () {},
    5152: function (t, e, n) {
      t.exports = n(3579);
    },
    1664: function (t, e, n) {
      t.exports = n(7942);
    },
    6855: function (t, e, n) {
      "use strict";
      var r = n(8764).Buffer,
        i = n(4836);
      e.Z = void 0;
      var o = i(n(4687)),
        s = i(n(7156)),
        a = i(n(8698)),
        c = i(n(6690)),
        u = i(n(9728)),
        h = i(n(1655)),
        l = i(n(4993)),
        d = i(n(3808)),
        f = n(6729),
        p = n(395);
      function y(t) {
        var e = (function () {
          if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ("function" === typeof Proxy) return !0;
          try {
            return (
              Boolean.prototype.valueOf.call(
                Reflect.construct(Boolean, [], function () {})
              ),
              !0
            );
          } catch (t) {
            return !1;
          }
        })();
        return function () {
          var n,
            r = (0, d.default)(t);
          if (e) {
            var i = (0, d.default)(this).constructor;
            n = Reflect.construct(r, arguments, i);
          } else n = r.apply(this, arguments);
          return (0, l.default)(this, n);
        };
      }
      var g = function (t, e) {
          var n = {};
          for (var r in t)
            Object.prototype.hasOwnProperty.call(t, r) &&
              e.indexOf(r) < 0 &&
              (n[r] = t[r]);
          if (null != t && "function" === typeof Object.getOwnPropertySymbols) {
            var i = 0;
            for (r = Object.getOwnPropertySymbols(t); i < r.length; i++)
              e.indexOf(r[i]) < 0 &&
                Object.prototype.propertyIsEnumerable.call(t, r[i]) &&
                (n[r[i]] = t[r[i]]);
          }
          return n;
        },
        m = (function (t) {
          (0, h.default)(n, t);
          var e = y(n);
          function n(t) {
            var r,
              i =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : "ws://localhost:8080",
              o =
                arguments.length > 2 && void 0 !== arguments[2]
                  ? arguments[2]
                  : {},
              s = arguments.length > 3 ? arguments[3] : void 0,
              a = arguments.length > 4 ? arguments[4] : void 0;
            (0, c.default)(this, n);
            var u = o.autoconnect,
              h = void 0 === u || u,
              l = o.reconnect,
              d = void 0 === l || l,
              f = o.reconnect_interval,
              y = void 0 === f ? 1e3 : f,
              m = o.max_reconnects,
              w = void 0 === m ? 5 : m,
              b = g(o, [
                "autoconnect",
                "reconnect",
                "reconnect_interval",
                "max_reconnects",
              ]);
            return (
              ((r = e.call(this)).webSocketFactory = t),
              (r.queue = {}),
              (r.rpc_id = 0),
              (r.address = i),
              (r.autoconnect = h),
              (r.ready = !1),
              (r.reconnect = d),
              (r.reconnect_timer_id = void 0),
              (r.reconnect_interval = y),
              (r.max_reconnects = w),
              (r.rest_options = b),
              (r.current_reconnects = 0),
              (r.generate_request_id =
                s ||
                function () {
                  return ++r.rpc_id;
                }),
              (r.dataPack = a || new p.DefaultDataPack()),
              r.autoconnect &&
                r._connect(
                  r.address,
                  Object.assign(
                    {
                      autoconnect: r.autoconnect,
                      reconnect: r.reconnect,
                      reconnect_interval: r.reconnect_interval,
                      max_reconnects: r.max_reconnects,
                    },
                    r.rest_options
                  )
                ),
              r
            );
          }
          return (
            (0, u.default)(n, [
              {
                key: "connect",
                value: function () {
                  this.socket ||
                    this._connect(
                      this.address,
                      Object.assign(
                        {
                          autoconnect: this.autoconnect,
                          reconnect: this.reconnect,
                          reconnect_interval: this.reconnect_interval,
                          max_reconnects: this.max_reconnects,
                        },
                        this.rest_options
                      )
                    );
                },
              },
              {
                key: "call",
                value: function (t, e, n, r) {
                  var i = this;
                  return (
                    r ||
                      "object" !== (0, a.default)(n) ||
                      ((r = n), (n = null)),
                    new Promise(function (o, s) {
                      if (!i.ready) return s(new Error("socket not ready"));
                      var a = i.generate_request_id(t, e),
                        c = {
                          jsonrpc: "2.0",
                          method: t,
                          params: e || void 0,
                          id: a,
                        };
                      i.socket.send(i.dataPack.encode(c), r, function (t) {
                        if (t) return s(t);
                        (i.queue[a] = { promise: [o, s] }),
                          n &&
                            (i.queue[a].timeout = setTimeout(function () {
                              delete i.queue[a], s(new Error("reply timeout"));
                            }, n));
                      });
                    })
                  );
                },
              },
              {
                key: "login",
                value: (function () {
                  var t = (0, s.default)(
                    o.default.mark(function t(e) {
                      var n;
                      return o.default.wrap(
                        function (t) {
                          for (;;)
                            switch ((t.prev = t.next)) {
                              case 0:
                                return (t.next = 2), this.call("rpc.login", e);
                              case 2:
                                if ((n = t.sent)) {
                                  t.next = 5;
                                  break;
                                }
                                throw new Error("authentication failed");
                              case 5:
                                return t.abrupt("return", n);
                              case 6:
                              case "end":
                                return t.stop();
                            }
                        },
                        t,
                        this
                      );
                    })
                  );
                  return function (e) {
                    return t.apply(this, arguments);
                  };
                })(),
              },
              {
                key: "listMethods",
                value: (function () {
                  var t = (0, s.default)(
                    o.default.mark(function t() {
                      return o.default.wrap(
                        function (t) {
                          for (;;)
                            switch ((t.prev = t.next)) {
                              case 0:
                                return (t.next = 2), this.call("__listMethods");
                              case 2:
                                return t.abrupt("return", t.sent);
                              case 3:
                              case "end":
                                return t.stop();
                            }
                        },
                        t,
                        this
                      );
                    })
                  );
                  return function () {
                    return t.apply(this, arguments);
                  };
                })(),
              },
              {
                key: "notify",
                value: function (t, e) {
                  var n = this;
                  return new Promise(function (r, i) {
                    if (!n.ready) return i(new Error("socket not ready"));
                    var o = { jsonrpc: "2.0", method: t, params: e };
                    n.socket.send(n.dataPack.encode(o), function (t) {
                      if (t) return i(t);
                      r();
                    });
                  });
                },
              },
              {
                key: "subscribe",
                value: (function () {
                  var t = (0, s.default)(
                    o.default.mark(function t(e) {
                      var n;
                      return o.default.wrap(
                        function (t) {
                          for (;;)
                            switch ((t.prev = t.next)) {
                              case 0:
                                return (
                                  "string" === typeof e && (e = [e]),
                                  (t.next = 3),
                                  this.call("rpc.on", e)
                                );
                              case 3:
                                if (
                                  ((n = t.sent),
                                  "string" !== typeof e || "ok" === n[e])
                                ) {
                                  t.next = 6;
                                  break;
                                }
                                throw new Error(
                                  "Failed subscribing to an event '" +
                                    e +
                                    "' with: " +
                                    n[e]
                                );
                              case 6:
                                return t.abrupt("return", n);
                              case 7:
                              case "end":
                                return t.stop();
                            }
                        },
                        t,
                        this
                      );
                    })
                  );
                  return function (e) {
                    return t.apply(this, arguments);
                  };
                })(),
              },
              {
                key: "unsubscribe",
                value: (function () {
                  var t = (0, s.default)(
                    o.default.mark(function t(e) {
                      var n;
                      return o.default.wrap(
                        function (t) {
                          for (;;)
                            switch ((t.prev = t.next)) {
                              case 0:
                                return (
                                  "string" === typeof e && (e = [e]),
                                  (t.next = 3),
                                  this.call("rpc.off", e)
                                );
                              case 3:
                                if (
                                  ((n = t.sent),
                                  "string" !== typeof e || "ok" === n[e])
                                ) {
                                  t.next = 6;
                                  break;
                                }
                                throw new Error(
                                  "Failed unsubscribing from an event with: " +
                                    n
                                );
                              case 6:
                                return t.abrupt("return", n);
                              case 7:
                              case "end":
                                return t.stop();
                            }
                        },
                        t,
                        this
                      );
                    })
                  );
                  return function (e) {
                    return t.apply(this, arguments);
                  };
                })(),
              },
              {
                key: "close",
                value: function (t, e) {
                  this.socket.close(t || 1e3, e);
                },
              },
              {
                key: "_connect",
                value: function (t, e) {
                  var n = this;
                  clearTimeout(this.reconnect_timer_id),
                    (this.socket = this.webSocketFactory(t, e)),
                    this.socket.addEventListener("open", function () {
                      (n.ready = !0),
                        n.emit("open"),
                        (n.current_reconnects = 0);
                    }),
                    this.socket.addEventListener("message", function (t) {
                      var e = t.data;
                      e instanceof ArrayBuffer && (e = r.from(e).toString());
                      try {
                        e = n.dataPack.decode(e);
                      } catch (s) {
                        return;
                      }
                      if (
                        e.notification &&
                        n.listeners(e.notification).length
                      ) {
                        if (!Object.keys(e.params).length)
                          return n.emit(e.notification);
                        var i = [e.notification];
                        if (e.params.constructor === Object) i.push(e.params);
                        else
                          for (var o = 0; o < e.params.length; o++)
                            i.push(e.params[o]);
                        return Promise.resolve().then(function () {
                          n.emit.apply(n, i);
                        });
                      }
                      if (!n.queue[e.id])
                        return e.method
                          ? Promise.resolve().then(function () {
                              n.emit(
                                e.method,
                                null === e || void 0 === e ? void 0 : e.params
                              );
                            })
                          : void 0;
                      "error" in e === "result" in e &&
                        n.queue[e.id].promise[1](
                          new Error(
                            'Server response malformed. Response must include either "result" or "error", but not both.'
                          )
                        ),
                        n.queue[e.id].timeout &&
                          clearTimeout(n.queue[e.id].timeout),
                        e.error
                          ? n.queue[e.id].promise[1](e.error)
                          : n.queue[e.id].promise[0](e.result),
                        delete n.queue[e.id];
                    }),
                    this.socket.addEventListener("error", function (t) {
                      return n.emit("error", t);
                    }),
                    this.socket.addEventListener("close", function (r) {
                      var i = r.code,
                        o = r.reason;
                      n.ready &&
                        setTimeout(function () {
                          return n.emit("close", i, o);
                        }, 0),
                        (n.ready = !1),
                        (n.socket = void 0),
                        1e3 !== i &&
                          (n.current_reconnects++,
                          n.reconnect &&
                            (n.max_reconnects > n.current_reconnects ||
                              0 === n.max_reconnects) &&
                            (n.reconnect_timer_id = setTimeout(function () {
                              return n._connect(t, e);
                            }, n.reconnect_interval)));
                    });
                },
              },
            ]),
            n
          );
        })(f.EventEmitter);
      e.Z = m;
    },
    9062: function (t, e, n) {
      "use strict";
      var r = n(4836);
      e.Z = function (t, e) {
        return new h(t, e);
      };
      var i = r(n(6690)),
        o = r(n(9728)),
        s = r(n(1655)),
        a = r(n(4993)),
        c = r(n(3808));
      function u(t) {
        var e = (function () {
          if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ("function" === typeof Proxy) return !0;
          try {
            return (
              Boolean.prototype.valueOf.call(
                Reflect.construct(Boolean, [], function () {})
              ),
              !0
            );
          } catch (t) {
            return !1;
          }
        })();
        return function () {
          var n,
            r = (0, c.default)(t);
          if (e) {
            var i = (0, c.default)(this).constructor;
            n = Reflect.construct(r, arguments, i);
          } else n = r.apply(this, arguments);
          return (0, a.default)(this, n);
        };
      }
      var h = (function (t) {
        (0, s.default)(n, t);
        var e = u(n);
        function n(t, r, o) {
          var s;
          return (
            (0, i.default)(this, n),
            ((s = e.call(this)).socket = new window.WebSocket(t, o)),
            (s.socket.onopen = function () {
              return s.emit("open");
            }),
            (s.socket.onmessage = function (t) {
              return s.emit("message", t.data);
            }),
            (s.socket.onerror = function (t) {
              return s.emit("error", t);
            }),
            (s.socket.onclose = function (t) {
              s.emit("close", t.code, t.reason);
            }),
            s
          );
        }
        return (
          (0, o.default)(n, [
            {
              key: "send",
              value: function (t, e, n) {
                var r = n || e;
                try {
                  this.socket.send(t), r();
                } catch (i) {
                  r(i);
                }
              },
            },
            {
              key: "close",
              value: function (t, e) {
                this.socket.close(t, e);
              },
            },
            {
              key: "addEventListener",
              value: function (t, e, n) {
                this.socket.addEventListener(t, e, n);
              },
            },
          ]),
          n
        );
      })(n(6729).EventEmitter);
    },
    395: function (t, e, n) {
      "use strict";
      var r = n(4836);
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.DefaultDataPack = void 0),
        (e.createError = function (t, e) {
          var n = { code: t, message: s.get(t) || "Internal Server Error" };
          e && (n.data = e);
          return n;
        });
      var i = r(n(6690)),
        o = r(n(9728)),
        s = new Map([
          [-32e3, "Event not provided"],
          [-32600, "Invalid Request"],
          [-32601, "Method not found"],
          [-32602, "Invalid params"],
          [-32603, "Internal error"],
          [-32604, "Params not found"],
          [-32605, "Method forbidden"],
          [-32606, "Event forbidden"],
          [-32700, "Parse error"],
        ]),
        a = (function () {
          function t() {
            (0, i.default)(this, t);
          }
          return (
            (0, o.default)(t, [
              {
                key: "encode",
                value: function (t) {
                  return JSON.stringify(t);
                },
              },
              {
                key: "decode",
                value: function (t) {
                  return JSON.parse(t);
                },
              },
            ]),
            t
          );
        })();
      e.DefaultDataPack = a;
    },
    9509: function (t, e, n) {
      var r = n(8764),
        i = r.Buffer;
      function o(t, e) {
        for (var n in t) e[n] = t[n];
      }
      function s(t, e, n) {
        return i(t, e, n);
      }
      i.from && i.alloc && i.allocUnsafe && i.allocUnsafeSlow
        ? (t.exports = r)
        : (o(r, e), (e.Buffer = s)),
        (s.prototype = Object.create(i.prototype)),
        o(i, s),
        (s.from = function (t, e, n) {
          if ("number" === typeof t)
            throw new TypeError("Argument must not be a number");
          return i(t, e, n);
        }),
        (s.alloc = function (t, e, n) {
          if ("number" !== typeof t)
            throw new TypeError("Argument must be a number");
          var r = i(t);
          return (
            void 0 !== e
              ? "string" === typeof n
                ? r.fill(e, n)
                : r.fill(e)
              : r.fill(0),
            r
          );
        }),
        (s.allocUnsafe = function (t) {
          if ("number" !== typeof t)
            throw new TypeError("Argument must be a number");
          return i(t);
        }),
        (s.allocUnsafeSlow = function (t) {
          if ("number" !== typeof t)
            throw new TypeError("Argument must be a number");
          return r.SlowBuffer(t);
        });
    },
    4880: function (t, e, n) {
      "use strict";
      var r;
      n.d(e, {
        v4: function () {
          return l;
        },
      });
      var i = new Uint8Array(16);
      function o() {
        if (
          !r &&
          !(r =
            ("undefined" !== typeof crypto &&
              crypto.getRandomValues &&
              crypto.getRandomValues.bind(crypto)) ||
            ("undefined" !== typeof msCrypto &&
              "function" === typeof msCrypto.getRandomValues &&
              msCrypto.getRandomValues.bind(msCrypto)))
        )
          throw new Error(
            "crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported"
          );
        return r(i);
      }
      var s =
        /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
      for (
        var a = function (t) {
            return "string" === typeof t && s.test(t);
          },
          c = [],
          u = 0;
        u < 256;
        ++u
      )
        c.push((u + 256).toString(16).substr(1));
      var h = function (t) {
        var e =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
          n = (
            c[t[e + 0]] +
            c[t[e + 1]] +
            c[t[e + 2]] +
            c[t[e + 3]] +
            "-" +
            c[t[e + 4]] +
            c[t[e + 5]] +
            "-" +
            c[t[e + 6]] +
            c[t[e + 7]] +
            "-" +
            c[t[e + 8]] +
            c[t[e + 9]] +
            "-" +
            c[t[e + 10]] +
            c[t[e + 11]] +
            c[t[e + 12]] +
            c[t[e + 13]] +
            c[t[e + 14]] +
            c[t[e + 15]]
          ).toLowerCase();
        if (!a(n)) throw TypeError("Stringified UUID is invalid");
        return n;
      };
      var l = function (t, e, n) {
        var r = (t = t || {}).random || (t.rng || o)();
        if (((r[6] = (15 & r[6]) | 64), (r[8] = (63 & r[8]) | 128), e)) {
          n = n || 0;
          for (var i = 0; i < 16; ++i) e[n + i] = r[i];
          return e;
        }
        return h(r);
      };
    },
    4671: function (t, e, n) {
      "use strict";
      n.d(e, {
        Z: function () {
          return s;
        },
      });
      var r = n(7294);
      function i(t) {
        let e;
        const n = new Set(),
          r = (t, r) => {
            const i = "function" === typeof t ? t(e) : t;
            if (i !== e) {
              const t = e;
              (e = r ? i : Object.assign({}, e, i)), n.forEach((n) => n(e, t));
            }
          },
          i = () => e,
          o = {
            setState: r,
            getState: i,
            subscribe: (t, r, o) =>
              r || o
                ? ((t, r = i, o = Object.is) => {
                    console.warn(
                      "[DEPRECATED] Please use `subscribeWithSelector` middleware"
                    );
                    let s = r(e);
                    function a() {
                      const n = r(e);
                      if (!o(s, n)) {
                        const e = s;
                        t((s = n), e);
                      }
                    }
                    return n.add(a), () => n.delete(a);
                  })(t, r, o)
                : (n.add(t), () => n.delete(t)),
            destroy: () => n.clear(),
          };
        return (e = t(r, i, o)), o;
      }
      const o =
        "undefined" === typeof window ||
        !window.navigator ||
        /ServerSideRendering|^Deno\//.test(window.navigator.userAgent)
          ? r.useEffect
          : r.useLayoutEffect;
      function s(t) {
        const e = "function" === typeof t ? i(t) : t,
          n = (t = e.getState, n = Object.is) => {
            const [, i] = (0, r.useReducer)((t) => t + 1, 0),
              s = e.getState(),
              a = (0, r.useRef)(s),
              c = (0, r.useRef)(t),
              u = (0, r.useRef)(n),
              h = (0, r.useRef)(!1),
              l = (0, r.useRef)();
            let d;
            void 0 === l.current && (l.current = t(s));
            let f = !1;
            (a.current !== s ||
              c.current !== t ||
              u.current !== n ||
              h.current) &&
              ((d = t(s)), (f = !n(l.current, d))),
              o(() => {
                f && (l.current = d),
                  (a.current = s),
                  (c.current = t),
                  (u.current = n),
                  (h.current = !1);
              });
            const p = (0, r.useRef)(s);
            o(() => {
              const t = () => {
                  try {
                    const t = e.getState(),
                      n = c.current(t);
                    u.current(l.current, n) ||
                      ((a.current = t), (l.current = n), i());
                  } catch (t) {
                    (h.current = !0), i();
                  }
                },
                n = e.subscribe(t);
              return e.getState() !== p.current && t(), n;
            }, []);
            const y = f ? d : l.current;
            return (0, r.useDebugValue)(y), y;
          };
        return (
          Object.assign(n, e),
          (n[Symbol.iterator] = function () {
            console.warn(
              "[useStore, api] = create() is deprecated and will be removed in v4"
            );
            const t = [n, e];
            return {
              next() {
                const e = t.length <= 0;
                return { value: t.shift(), done: e };
              },
            };
          }),
          n
        );
      }
    },
    6601: function () {},
    6115: function (t) {
      (t.exports = function (t) {
        if (void 0 === t)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return t;
      }),
        (t.exports.__esModule = !0),
        (t.exports.default = t.exports);
    },
    7156: function (t) {
      function e(t, e, n, r, i, o, s) {
        try {
          var a = t[o](s),
            c = a.value;
        } catch (u) {
          return void n(u);
        }
        a.done ? e(c) : Promise.resolve(c).then(r, i);
      }
      (t.exports = function (t) {
        return function () {
          var n = this,
            r = arguments;
          return new Promise(function (i, o) {
            var s = t.apply(n, r);
            function a(t) {
              e(s, i, o, a, c, "next", t);
            }
            function c(t) {
              e(s, i, o, a, c, "throw", t);
            }
            a(void 0);
          });
        };
      }),
        (t.exports.__esModule = !0),
        (t.exports.default = t.exports);
    },
    6690: function (t) {
      (t.exports = function (t, e) {
        if (!(t instanceof e))
          throw new TypeError("Cannot call a class as a function");
      }),
        (t.exports.__esModule = !0),
        (t.exports.default = t.exports);
    },
    9728: function (t, e, n) {
      var r = n(4062);
      function i(t, e) {
        for (var n = 0; n < e.length; n++) {
          var i = e[n];
          (i.enumerable = i.enumerable || !1),
            (i.configurable = !0),
            "value" in i && (i.writable = !0),
            Object.defineProperty(t, r(i.key), i);
        }
      }
      (t.exports = function (t, e, n) {
        return (
          e && i(t.prototype, e),
          n && i(t, n),
          Object.defineProperty(t, "prototype", { writable: !1 }),
          t
        );
      }),
        (t.exports.__esModule = !0),
        (t.exports.default = t.exports);
    },
    3808: function (t) {
      function e(n) {
        return (
          (t.exports = e =
            Object.setPrototypeOf
              ? Object.getPrototypeOf.bind()
              : function (t) {
                  return t.__proto__ || Object.getPrototypeOf(t);
                }),
          (t.exports.__esModule = !0),
          (t.exports.default = t.exports),
          e(n)
        );
      }
      (t.exports = e),
        (t.exports.__esModule = !0),
        (t.exports.default = t.exports);
    },
    1655: function (t, e, n) {
      var r = n(6015);
      (t.exports = function (t, e) {
        if ("function" !== typeof e && null !== e)
          throw new TypeError(
            "Super expression must either be null or a function"
          );
        (t.prototype = Object.create(e && e.prototype, {
          constructor: { value: t, writable: !0, configurable: !0 },
        })),
          Object.defineProperty(t, "prototype", { writable: !1 }),
          e && r(t, e);
      }),
        (t.exports.__esModule = !0),
        (t.exports.default = t.exports);
    },
    4836: function (t) {
      (t.exports = function (t) {
        return t && t.__esModule ? t : { default: t };
      }),
        (t.exports.__esModule = !0),
        (t.exports.default = t.exports);
    },
    4993: function (t, e, n) {
      var r = n(8698).default,
        i = n(6115);
      (t.exports = function (t, e) {
        if (e && ("object" === r(e) || "function" === typeof e)) return e;
        if (void 0 !== e)
          throw new TypeError(
            "Derived constructors may only return object or undefined"
          );
        return i(t);
      }),
        (t.exports.__esModule = !0),
        (t.exports.default = t.exports);
    },
    7061: function (t, e, n) {
      var r = n(8698).default;
      function i() {
        "use strict";
        (t.exports = i =
          function () {
            return n;
          }),
          (t.exports.__esModule = !0),
          (t.exports.default = t.exports);
        var e,
          n = {},
          o = Object.prototype,
          s = o.hasOwnProperty,
          a =
            Object.defineProperty ||
            function (t, e, n) {
              t[e] = n.value;
            },
          c = "function" == typeof Symbol ? Symbol : {},
          u = c.iterator || "@@iterator",
          h = c.asyncIterator || "@@asyncIterator",
          l = c.toStringTag || "@@toStringTag";
        function d(t, e, n) {
          return (
            Object.defineProperty(t, e, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            }),
            t[e]
          );
        }
        try {
          d({}, "");
        } catch (e) {
          d = function (t, e, n) {
            return (t[e] = n);
          };
        }
        function f(t, e, n, r) {
          var i = e && e.prototype instanceof b ? e : b,
            o = Object.create(i.prototype),
            s = new O(r || []);
          return a(o, "_invoke", { value: x(t, n, s) }), o;
        }
        function p(t, e, n) {
          try {
            return { type: "normal", arg: t.call(e, n) };
          } catch (t) {
            return { type: "throw", arg: t };
          }
        }
        n.wrap = f;
        var y = "suspendedStart",
          g = "executing",
          m = "completed",
          w = {};
        function b() {}
        function v() {}
        function k() {}
        var S = {};
        d(S, u, function () {
          return this;
        });
        var M = Object.getPrototypeOf,
          I = M && M(M(B([])));
        I && I !== o && s.call(I, u) && (S = I);
        var E = (k.prototype = b.prototype = Object.create(S));
        function _(t) {
          ["next", "throw", "return"].forEach(function (e) {
            d(t, e, function (t) {
              return this._invoke(e, t);
            });
          });
        }
        function A(t, e) {
          function n(i, o, a, c) {
            var u = p(t[i], t, o);
            if ("throw" !== u.type) {
              var h = u.arg,
                l = h.value;
              return l && "object" == r(l) && s.call(l, "__await")
                ? e.resolve(l.__await).then(
                    function (t) {
                      n("next", t, a, c);
                    },
                    function (t) {
                      n("throw", t, a, c);
                    }
                  )
                : e.resolve(l).then(
                    function (t) {
                      (h.value = t), a(h);
                    },
                    function (t) {
                      return n("throw", t, a, c);
                    }
                  );
            }
            c(u.arg);
          }
          var i;
          a(this, "_invoke", {
            value: function (t, r) {
              function o() {
                return new e(function (e, i) {
                  n(t, r, e, i);
                });
              }
              return (i = i ? i.then(o, o) : o());
            },
          });
        }
        function x(t, n, r) {
          var i = y;
          return function (o, s) {
            if (i === g) throw new Error("Generator is already running");
            if (i === m) {
              if ("throw" === o) throw s;
              return { value: e, done: !0 };
            }
            for (r.method = o, r.arg = s; ; ) {
              var a = r.delegate;
              if (a) {
                var c = L(a, r);
                if (c) {
                  if (c === w) continue;
                  return c;
                }
              }
              if ("next" === r.method) r.sent = r._sent = r.arg;
              else if ("throw" === r.method) {
                if (i === y) throw ((i = m), r.arg);
                r.dispatchException(r.arg);
              } else "return" === r.method && r.abrupt("return", r.arg);
              i = g;
              var u = p(t, n, r);
              if ("normal" === u.type) {
                if (((i = r.done ? m : "suspendedYield"), u.arg === w))
                  continue;
                return { value: u.arg, done: r.done };
              }
              "throw" === u.type &&
                ((i = m), (r.method = "throw"), (r.arg = u.arg));
            }
          };
        }
        function L(t, n) {
          var r = n.method,
            i = t.iterator[r];
          if (i === e)
            return (
              (n.delegate = null),
              ("throw" === r &&
                t.iterator.return &&
                ((n.method = "return"),
                (n.arg = e),
                L(t, n),
                "throw" === n.method)) ||
                ("return" !== r &&
                  ((n.method = "throw"),
                  (n.arg = new TypeError(
                    "The iterator does not provide a '" + r + "' method"
                  )))),
              w
            );
          var o = p(i, t.iterator, n.arg);
          if ("throw" === o.type)
            return (
              (n.method = "throw"), (n.arg = o.arg), (n.delegate = null), w
            );
          var s = o.arg;
          return s
            ? s.done
              ? ((n[t.resultName] = s.value),
                (n.next = t.nextLoc),
                "return" !== n.method && ((n.method = "next"), (n.arg = e)),
                (n.delegate = null),
                w)
              : s
            : ((n.method = "throw"),
              (n.arg = new TypeError("iterator result is not an object")),
              (n.delegate = null),
              w);
        }
        function T(t) {
          var e = { tryLoc: t[0] };
          1 in t && (e.catchLoc = t[1]),
            2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
            this.tryEntries.push(e);
        }
        function N(t) {
          var e = t.completion || {};
          (e.type = "normal"), delete e.arg, (t.completion = e);
        }
        function O(t) {
          (this.tryEntries = [{ tryLoc: "root" }]),
            t.forEach(T, this),
            this.reset(!0);
        }
        function B(t) {
          if (t || "" === t) {
            var n = t[u];
            if (n) return n.call(t);
            if ("function" == typeof t.next) return t;
            if (!isNaN(t.length)) {
              var i = -1,
                o = function n() {
                  for (; ++i < t.length; )
                    if (s.call(t, i)) return (n.value = t[i]), (n.done = !1), n;
                  return (n.value = e), (n.done = !0), n;
                };
              return (o.next = o);
            }
          }
          throw new TypeError(r(t) + " is not iterable");
        }
        return (
          (v.prototype = k),
          a(E, "constructor", { value: k, configurable: !0 }),
          a(k, "constructor", { value: v, configurable: !0 }),
          (v.displayName = d(k, l, "GeneratorFunction")),
          (n.isGeneratorFunction = function (t) {
            var e = "function" == typeof t && t.constructor;
            return (
              !!e &&
              (e === v || "GeneratorFunction" === (e.displayName || e.name))
            );
          }),
          (n.mark = function (t) {
            return (
              Object.setPrototypeOf
                ? Object.setPrototypeOf(t, k)
                : ((t.__proto__ = k), d(t, l, "GeneratorFunction")),
              (t.prototype = Object.create(E)),
              t
            );
          }),
          (n.awrap = function (t) {
            return { __await: t };
          }),
          _(A.prototype),
          d(A.prototype, h, function () {
            return this;
          }),
          (n.AsyncIterator = A),
          (n.async = function (t, e, r, i, o) {
            void 0 === o && (o = Promise);
            var s = new A(f(t, e, r, i), o);
            return n.isGeneratorFunction(e)
              ? s
              : s.next().then(function (t) {
                  return t.done ? t.value : s.next();
                });
          }),
          _(E),
          d(E, l, "Generator"),
          d(E, u, function () {
            return this;
          }),
          d(E, "toString", function () {
            return "[object Generator]";
          }),
          (n.keys = function (t) {
            var e = Object(t),
              n = [];
            for (var r in e) n.push(r);
            return (
              n.reverse(),
              function t() {
                for (; n.length; ) {
                  var r = n.pop();
                  if (r in e) return (t.value = r), (t.done = !1), t;
                }
                return (t.done = !0), t;
              }
            );
          }),
          (n.values = B),
          (O.prototype = {
            constructor: O,
            reset: function (t) {
              if (
                ((this.prev = 0),
                (this.next = 0),
                (this.sent = this._sent = e),
                (this.done = !1),
                (this.delegate = null),
                (this.method = "next"),
                (this.arg = e),
                this.tryEntries.forEach(N),
                !t)
              )
                for (var n in this)
                  "t" === n.charAt(0) &&
                    s.call(this, n) &&
                    !isNaN(+n.slice(1)) &&
                    (this[n] = e);
            },
            stop: function () {
              this.done = !0;
              var t = this.tryEntries[0].completion;
              if ("throw" === t.type) throw t.arg;
              return this.rval;
            },
            dispatchException: function (t) {
              if (this.done) throw t;
              var n = this;
              function r(r, i) {
                return (
                  (a.type = "throw"),
                  (a.arg = t),
                  (n.next = r),
                  i && ((n.method = "next"), (n.arg = e)),
                  !!i
                );
              }
              for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                var o = this.tryEntries[i],
                  a = o.completion;
                if ("root" === o.tryLoc) return r("end");
                if (o.tryLoc <= this.prev) {
                  var c = s.call(o, "catchLoc"),
                    u = s.call(o, "finallyLoc");
                  if (c && u) {
                    if (this.prev < o.catchLoc) return r(o.catchLoc, !0);
                    if (this.prev < o.finallyLoc) return r(o.finallyLoc);
                  } else if (c) {
                    if (this.prev < o.catchLoc) return r(o.catchLoc, !0);
                  } else {
                    if (!u)
                      throw new Error("try statement without catch or finally");
                    if (this.prev < o.finallyLoc) return r(o.finallyLoc);
                  }
                }
              }
            },
            abrupt: function (t, e) {
              for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                var r = this.tryEntries[n];
                if (
                  r.tryLoc <= this.prev &&
                  s.call(r, "finallyLoc") &&
                  this.prev < r.finallyLoc
                ) {
                  var i = r;
                  break;
                }
              }
              i &&
                ("break" === t || "continue" === t) &&
                i.tryLoc <= e &&
                e <= i.finallyLoc &&
                (i = null);
              var o = i ? i.completion : {};
              return (
                (o.type = t),
                (o.arg = e),
                i
                  ? ((this.method = "next"), (this.next = i.finallyLoc), w)
                  : this.complete(o)
              );
            },
            complete: function (t, e) {
              if ("throw" === t.type) throw t.arg;
              return (
                "break" === t.type || "continue" === t.type
                  ? (this.next = t.arg)
                  : "return" === t.type
                  ? ((this.rval = this.arg = t.arg),
                    (this.method = "return"),
                    (this.next = "end"))
                  : "normal" === t.type && e && (this.next = e),
                w
              );
            },
            finish: function (t) {
              for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                var n = this.tryEntries[e];
                if (n.finallyLoc === t)
                  return this.complete(n.completion, n.afterLoc), N(n), w;
              }
            },
            catch: function (t) {
              for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                var n = this.tryEntries[e];
                if (n.tryLoc === t) {
                  var r = n.completion;
                  if ("throw" === r.type) {
                    var i = r.arg;
                    N(n);
                  }
                  return i;
                }
              }
              throw new Error("illegal catch attempt");
            },
            delegateYield: function (t, n, r) {
              return (
                (this.delegate = { iterator: B(t), resultName: n, nextLoc: r }),
                "next" === this.method && (this.arg = e),
                w
              );
            },
          }),
          n
        );
      }
      (t.exports = i),
        (t.exports.__esModule = !0),
        (t.exports.default = t.exports);
    },
    6015: function (t) {
      function e(n, r) {
        return (
          (t.exports = e =
            Object.setPrototypeOf
              ? Object.setPrototypeOf.bind()
              : function (t, e) {
                  return (t.__proto__ = e), t;
                }),
          (t.exports.__esModule = !0),
          (t.exports.default = t.exports),
          e(n, r)
        );
      }
      (t.exports = e),
        (t.exports.__esModule = !0),
        (t.exports.default = t.exports);
    },
    5036: function (t, e, n) {
      var r = n(8698).default;
      (t.exports = function (t, e) {
        if ("object" != r(t) || !t) return t;
        var n = t[Symbol.toPrimitive];
        if (void 0 !== n) {
          var i = n.call(t, e || "default");
          if ("object" != r(i)) return i;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return ("string" === e ? String : Number)(t);
      }),
        (t.exports.__esModule = !0),
        (t.exports.default = t.exports);
    },
    4062: function (t, e, n) {
      var r = n(8698).default,
        i = n(5036);
      (t.exports = function (t) {
        var e = i(t, "string");
        return "symbol" == r(e) ? e : String(e);
      }),
        (t.exports.__esModule = !0),
        (t.exports.default = t.exports);
    },
    8698: function (t) {
      function e(n) {
        return (
          (t.exports = e =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t &&
                    "function" == typeof Symbol &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? "symbol"
                    : typeof t;
                }),
          (t.exports.__esModule = !0),
          (t.exports.default = t.exports),
          e(n)
        );
      }
      (t.exports = e),
        (t.exports.__esModule = !0),
        (t.exports.default = t.exports);
    },
    4687: function (t, e, n) {
      var r = n(7061)();
      t.exports = r;
      try {
        regeneratorRuntime = r;
      } catch (i) {
        "object" === typeof globalThis
          ? (globalThis.regeneratorRuntime = r)
          : Function("r", "regeneratorRuntime = r")(r);
      }
    },
    9607: function (t, e, n) {
      "use strict";
      n.d(e, {
        H: function () {
          return c;
        },
        i1: function () {
          return r;
        },
        mI: function () {
          return s;
        },
        su: function () {
          return a;
        },
      });
      var r,
        i = n(6729),
        o = n(5615);
      !(function (t) {
        (t.Installed = "Installed"),
          (t.NotDetected = "NotDetected"),
          (t.Loadable = "Loadable"),
          (t.Unsupported = "Unsupported");
      })(r || (r = {}));
      class s extends i {
        get connected() {
          return !!this.publicKey;
        }
        async autoConnect() {
          await this.connect();
        }
        async prepareTransaction(t, e, n = {}) {
          const r = this.publicKey;
          if (!r) throw new o.oS();
          return (
            (t.feePayer = t.feePayer || r),
            (t.recentBlockhash =
              t.recentBlockhash ||
              (
                await e.getLatestBlockhash({
                  commitment: n.preflightCommitment,
                  minContextSlot: n.minContextSlot,
                })
              ).blockhash),
            t
          );
        }
      }
      function a(t) {
        if ("undefined" === typeof window || "undefined" === typeof document)
          return;
        const e = [];
        function n() {
          if (t()) for (const t of e) t();
        }
        const r = setInterval(n, 1e3);
        e.push(() => clearInterval(r)),
          "loading" === document.readyState &&
            (document.addEventListener("DOMContentLoaded", n, { once: !0 }),
            e.push(() => document.removeEventListener("DOMContentLoaded", n))),
          "complete" !== document.readyState &&
            (window.addEventListener("load", n, { once: !0 }),
            e.push(() => window.removeEventListener("load", n))),
          n();
      }
      function c() {
        if (!navigator) return !1;
        const t = navigator.userAgent.toLowerCase(),
          e = t.includes("iphone") || t.includes("ipad"),
          n = t.includes("safari");
        return e && n;
      }
    },
    5615: function (t, e, n) {
      "use strict";
      n.d(e, {
        $w: function () {
          return a;
        },
        IW: function () {
          return f;
        },
        Nx: function () {
          return l;
        },
        OZ: function () {
          return i;
        },
        PY: function () {
          return p;
        },
        UG: function () {
          return u;
        },
        W8: function () {
          return o;
        },
        at: function () {
          return c;
        },
        bD: function () {
          return g;
        },
        cO: function () {
          return h;
        },
        fk: function () {
          return y;
        },
        lj: function () {
          return r;
        },
        oS: function () {
          return d;
        },
        p6: function () {
          return s;
        },
      });
      class r extends Error {
        constructor(t, e) {
          super(t), (this.error = e);
        }
      }
      class i extends r {
        constructor() {
          super(...arguments), (this.name = "WalletNotReadyError");
        }
      }
      class o extends r {
        constructor() {
          super(...arguments), (this.name = "WalletLoadError");
        }
      }
      class s extends r {
        constructor() {
          super(...arguments), (this.name = "WalletConfigError");
        }
      }
      class a extends r {
        constructor() {
          super(...arguments), (this.name = "WalletConnectionError");
        }
      }
      class c extends r {
        constructor() {
          super(...arguments), (this.name = "WalletDisconnectedError");
        }
      }
      class u extends r {
        constructor() {
          super(...arguments), (this.name = "WalletDisconnectionError");
        }
      }
      class h extends r {
        constructor() {
          super(...arguments), (this.name = "WalletAccountError");
        }
      }
      class l extends r {
        constructor() {
          super(...arguments), (this.name = "WalletPublicKeyError");
        }
      }
      class d extends r {
        constructor() {
          super(...arguments), (this.name = "WalletNotConnectedError");
        }
      }
      class f extends r {
        constructor() {
          super(...arguments), (this.name = "WalletSendTransactionError");
        }
      }
      class p extends r {
        constructor() {
          super(...arguments), (this.name = "WalletSignTransactionError");
        }
      }
      class y extends r {
        constructor() {
          super(...arguments), (this.name = "WalletSignMessageError");
        }
      }
      class g extends r {
        constructor() {
          super(...arguments), (this.name = "WalletSignInError");
        }
      }
    },
    4293: function (t, e, n) {
      "use strict";
      n.d(e, {
        S: function () {
          return s;
        },
      });
      var r = n(7294),
        i = n(5664),
        o = n(6581);
      function s({ walletIcon: t, walletName: e, ...n }) {
        return r.createElement(i.z, {
          ...n,
          className: "wallet-adapter-button-trigger",
          startIcon:
            t && e
              ? r.createElement(o.o, {
                  wallet: { adapter: { icon: t, name: e } },
                })
              : void 0,
        });
      }
    },
    3962: function (t, e, n) {
      "use strict";
      n.d(e, {
        X: function () {
          return a;
        },
      });
      var r = n(4306),
        i = n(7294);
      var o = n(4293),
        s = n(3495);
      function a({ children: t, labels: e, ...n }) {
        const { setVisible: a } = (0, s.h)(),
          {
            buttonState: c,
            onConnect: u,
            onDisconnect: h,
            publicKey: l,
            walletIcon: d,
            walletName: f,
          } = (function ({ onSelectWallet: t }) {
            const {
              connect: e,
              connected: n,
              connecting: o,
              disconnect: s,
              disconnecting: a,
              publicKey: c,
              select: u,
              wallet: h,
              wallets: l,
            } = (0, r.O)();
            let d;
            d = o
              ? "connecting"
              : n
              ? "connected"
              : a
              ? "disconnecting"
              : h
              ? "has-wallet"
              : "no-wallet";
            const f = (0, i.useCallback)(() => {
                e().catch(() => {});
              }, [e]),
              p = (0, i.useCallback)(() => {
                s().catch(() => {});
              }, [s]);
            return {
              buttonState: d,
              onConnect: "has-wallet" === d ? f : void 0,
              onDisconnect:
                "disconnecting" !== d && "no-wallet" !== d ? p : void 0,
              onSelectWallet: (0, i.useCallback)(() => {
                t({ onSelectWallet: u, wallets: l });
              }, [t, u, l]),
              publicKey: c ?? void 0,
              walletIcon: h?.adapter.icon,
              walletName: h?.adapter.name,
            };
          })({
            onSelectWallet() {
              a(!0);
            },
          }),
          [p, y] = (0, i.useState)(!1),
          [g, m] = (0, i.useState)(!1),
          w = (0, i.useRef)(null);
        (0, i.useEffect)(() => {
          const t = (t) => {
            const e = w.current;
            e && !e.contains(t.target) && m(!1);
          };
          return (
            document.addEventListener("mousedown", t),
            document.addEventListener("touchstart", t),
            () => {
              document.removeEventListener("mousedown", t),
                document.removeEventListener("touchstart", t);
            }
          );
        }, []);
        const b = (0, i.useMemo)(() => {
          if (t) return t;
          if (l) {
            const t = l.toBase58();
            return t.slice(0, 4) + ".." + t.slice(-4);
          }
          return "connecting" === c || "has-wallet" === c
            ? e[c]
            : e["no-wallet"];
        }, [c, t, e, l]);
        return i.createElement(
          "div",
          { className: "wallet-adapter-dropdown" },
          i.createElement(
            o.S,
            {
              ...n,
              "aria-expanded": g,
              style: { pointerEvents: g ? "none" : "auto", ...n.style },
              onClick: () => {
                switch (c) {
                  case "no-wallet":
                    a(!0);
                    break;
                  case "has-wallet":
                    u && u();
                    break;
                  case "connected":
                    m(!0);
                }
              },
              walletIcon: d,
              walletName: f,
            },
            b
          ),
          i.createElement(
            "ul",
            {
              "aria-label": "dropdown-list",
              className: `wallet-adapter-dropdown-list ${
                g && "wallet-adapter-dropdown-list-active"
              }`,
              ref: w,
              role: "menu",
            },
            l
              ? i.createElement(
                  "li",
                  {
                    className: "wallet-adapter-dropdown-list-item",
                    onClick: async () => {
                      await navigator.clipboard.writeText(l.toBase58()),
                        y(!0),
                        setTimeout(() => y(!1), 400);
                    },
                    role: "menuitem",
                  },
                  p ? e.copied : e["copy-address"]
                )
              : null,
            i.createElement(
              "li",
              {
                className: "wallet-adapter-dropdown-list-item",
                onClick: () => {
                  a(!0), m(!1);
                },
                role: "menuitem",
              },
              e["change-wallet"]
            ),
            h
              ? i.createElement(
                  "li",
                  {
                    className: "wallet-adapter-dropdown-list-item",
                    onClick: () => {
                      h(), m(!1);
                    },
                    role: "menuitem",
                  },
                  e.disconnect
                )
              : null
          )
        );
      }
    },
    5664: function (t, e, n) {
      "use strict";
      n.d(e, {
        z: function () {
          return i;
        },
      });
      var r = n(7294);
      const i = (t) =>
        r.createElement(
          "button",
          {
            className: `wallet-adapter-button ${t.className || ""}`,
            disabled: t.disabled,
            style: t.style,
            onClick: t.onClick,
            tabIndex: t.tabIndex || 0,
            type: "button",
          },
          t.startIcon &&
            r.createElement(
              "i",
              { className: "wallet-adapter-button-start-icon" },
              t.startIcon
            ),
          t.children,
          t.endIcon &&
            r.createElement(
              "i",
              { className: "wallet-adapter-button-end-icon" },
              t.endIcon
            )
        );
    },
    6581: function (t, e, n) {
      "use strict";
      n.d(e, {
        o: function () {
          return i;
        },
      });
      var r = n(7294);
      const i = ({ wallet: t, ...e }) =>
        t &&
        r.createElement("img", {
          src: t.adapter.icon,
          alt: `${t.adapter.name} icon`,
          ...e,
        });
    },
    2640: function (t, e, n) {
      "use strict";
      n.d(e, {
        a: function () {
          return s;
        },
      });
      var r = n(7294),
        i = n(3962);
      const o = {
        "change-wallet": "Change wallet",
        connecting: "Connecting ...",
        "copy-address": "Copy address",
        copied: "Copied",
        disconnect: "Disconnect",
        "has-wallet": "Connect",
        "no-wallet": "Select Wallet",
      };
      function s(t) {
        return r.createElement(i.X, { ...t, labels: o });
      }
    },
    3495: function (t, e, n) {
      "use strict";
      n.d(e, {
        g: function () {
          return s;
        },
        h: function () {
          return a;
        },
      });
      var r = n(7294);
      const i = {
        setVisible(t) {
          console.error(o("call", "setVisible"));
        },
        visible: !1,
      };
      function o(t, e) {
        return `You have tried to  ${t} "${e}" on a WalletModalContext without providing one. Make sure to render a WalletModalProvider as an ancestor of the component that uses WalletModalContext`;
      }
      Object.defineProperty(i, "visible", {
        get: () => (console.error(o("read", "visible")), !1),
      });
      const s = (0, r.createContext)(i);
      function a() {
        return (0, r.useContext)(s);
      }
    },
    4718: function (t, e, n) {
      "use strict";
      n.d(e, {
        R: function () {
          return o;
        },
        h: function () {
          return i;
        },
      });
      var r = n(7294);
      const i = (0, r.createContext)({});
      function o() {
        return (0, r.useContext)(i);
      }
    },
    4306: function (t, e, n) {
      "use strict";
      n.d(e, {
        O: function () {
          return c;
        },
        z: function () {
          return a;
        },
      });
      var r = n(7294);
      const i = [],
        o = {
          autoConnect: !1,
          connecting: !1,
          connected: !1,
          disconnecting: !1,
          select() {
            s("call", "select");
          },
          connect: () => Promise.reject(s("call", "connect")),
          disconnect: () => Promise.reject(s("call", "disconnect")),
          sendTransaction: () => Promise.reject(s("call", "sendTransaction")),
          signTransaction: () => Promise.reject(s("call", "signTransaction")),
          signAllTransactions: () =>
            Promise.reject(s("call", "signAllTransactions")),
          signMessage: () => Promise.reject(s("call", "signMessage")),
          signIn: () => Promise.reject(s("call", "signIn")),
        };
      function s(t, e) {
        const n = new Error(
          `You have tried to ${t} "${e}" on a WalletContext without providing one. Make sure to render a WalletProvider as an ancestor of the component that uses WalletContext.`
        );
        return console.error(n), n;
      }
      Object.defineProperty(o, "wallets", {
        get: () => (s("read", "wallets"), i),
      }),
        Object.defineProperty(o, "wallet", {
          get: () => (s("read", "wallet"), null),
        }),
        Object.defineProperty(o, "publicKey", {
          get: () => (s("read", "publicKey"), null),
        });
      const a = (0, r.createContext)(o);
      function c() {
        return (0, r.useContext)(a);
      }
    },
    3149: function (t, e, n) {
      "use strict";
      n.d(e, {
        G: function () {
          return r;
        },
      });
      const r = "solana:signAndSendTransaction";
    },
    1999: function (t, e, n) {
      "use strict";
      n.d(e, {
        g: function () {
          return r;
        },
      });
      const r = "solana:signMessage";
    },
    8112: function (t, e, n) {
      "use strict";
      n.d(e, {
        R: function () {
          return r;
        },
      });
      const r = "solana:signTransaction";
    },
    2587: function (t, e, n) {
      "use strict";
      function r(t, e) {
        (null == e || e > t.length) && (e = t.length);
        for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
        return r;
      }
      n.d(e, {
        Z: function () {
          return r;
        },
      });
    },
    29: function (t, e, n) {
      "use strict";
      function r(t, e, n, r, i, o, s) {
        try {
          var a = t[o](s),
            c = a.value;
        } catch (u) {
          return void n(u);
        }
        a.done ? e(c) : Promise.resolve(c).then(r, i);
      }
      function i(t) {
        return function () {
          var e = this,
            n = arguments;
          return new Promise(function (i, o) {
            var s = t.apply(e, n);
            function a(t) {
              r(s, i, o, a, c, "next", t);
            }
            function c(t) {
              r(s, i, o, a, c, "throw", t);
            }
            a(void 0);
          });
        };
      }
      n.d(e, {
        Z: function () {
          return i;
        },
      });
    },
    9499: function (t, e, n) {
      "use strict";
      function r(t, e, n) {
        return (
          e in t
            ? Object.defineProperty(t, e, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (t[e] = n),
          t
        );
      }
      n.d(e, {
        Z: function () {
          return r;
        },
      });
    },
    7812: function (t, e, n) {
      "use strict";
      n.d(e, {
        Z: function () {
          return o;
        },
      });
      var r = n(2587);
      var i = n(2937);
      function o(t) {
        return (
          (function (t) {
            if (Array.isArray(t)) return (0, r.Z)(t);
          })(t) ||
          (function (t) {
            if (
              ("undefined" !== typeof Symbol && null != t[Symbol.iterator]) ||
              null != t["@@iterator"]
            )
              return Array.from(t);
          })(t) ||
          (0, i.Z)(t) ||
          (function () {
            throw new TypeError(
              "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
            );
          })()
        );
      }
    },
    2937: function (t, e, n) {
      "use strict";
      n.d(e, {
        Z: function () {
          return i;
        },
      });
      var r = n(2587);
      function i(t, e) {
        if (t) {
          if ("string" === typeof t) return (0, r.Z)(t, e);
          var n = Object.prototype.toString.call(t).slice(8, -1);
          return (
            "Object" === n && t.constructor && (n = t.constructor.name),
            "Map" === n || "Set" === n
              ? Array.from(t)
              : "Arguments" === n ||
                /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
              ? (0, r.Z)(t, e)
              : void 0
          );
        }
      }
    },
    1127: function (t, e, n) {
      "use strict";
      function r(t, e, n) {
        return e <= t && t <= n;
      }
      function i(t) {
        if (void 0 === t) return {};
        if (t === Object(t)) return t;
        throw TypeError("Could not convert argument to dictionary");
      }
      n.r(e),
        n.d(e, {
          TextDecoder: function () {
            return u;
          },
          TextEncoder: function () {
            return h;
          },
        });
      function o(t) {
        this.tokens = [].slice.call(t);
      }
      o.prototype = {
        endOfStream: function () {
          return !this.tokens.length;
        },
        read: function () {
          return this.tokens.length ? this.tokens.shift() : -1;
        },
        prepend: function (t) {
          if (Array.isArray(t))
            for (var e = t; e.length; ) this.tokens.unshift(e.pop());
          else this.tokens.unshift(t);
        },
        push: function (t) {
          if (Array.isArray(t))
            for (var e = t; e.length; ) this.tokens.push(e.shift());
          else this.tokens.push(t);
        },
      };
      var s = -1;
      function a(t, e) {
        if (t) throw TypeError("Decoder error");
        return e || 65533;
      }
      var c = "utf-8";
      function u(t, e) {
        if (!(this instanceof u)) return new u(t, e);
        if ((t = void 0 !== t ? String(t).toLowerCase() : c) !== c)
          throw new Error("Encoding not supported. Only utf-8 is supported");
        (e = i(e)),
          (this._streaming = !1),
          (this._BOMseen = !1),
          (this._decoder = null),
          (this._fatal = Boolean(e.fatal)),
          (this._ignoreBOM = Boolean(e.ignoreBOM)),
          Object.defineProperty(this, "encoding", { value: "utf-8" }),
          Object.defineProperty(this, "fatal", { value: this._fatal }),
          Object.defineProperty(this, "ignoreBOM", { value: this._ignoreBOM });
      }
      function h(t, e) {
        if (!(this instanceof h)) return new h(t, e);
        if ((t = void 0 !== t ? String(t).toLowerCase() : c) !== c)
          throw new Error("Encoding not supported. Only utf-8 is supported");
        (e = i(e)),
          (this._streaming = !1),
          (this._encoder = null),
          (this._options = { fatal: Boolean(e.fatal) }),
          Object.defineProperty(this, "encoding", { value: "utf-8" });
      }
      function l(t) {
        var e = t.fatal,
          n = 0,
          i = 0,
          o = 0,
          c = 128,
          u = 191;
        this.handler = function (t, h) {
          if (-1 === h && 0 !== o) return (o = 0), a(e);
          if (-1 === h) return s;
          if (0 === o) {
            if (r(h, 0, 127)) return h;
            if (r(h, 194, 223)) (o = 1), (n = h - 192);
            else if (r(h, 224, 239))
              224 === h && (c = 160),
                237 === h && (u = 159),
                (o = 2),
                (n = h - 224);
            else {
              if (!r(h, 240, 244)) return a(e);
              240 === h && (c = 144),
                244 === h && (u = 143),
                (o = 3),
                (n = h - 240);
            }
            return (n <<= 6 * o), null;
          }
          if (!r(h, c, u))
            return (n = o = i = 0), (c = 128), (u = 191), t.prepend(h), a(e);
          if (
            ((c = 128),
            (u = 191),
            (n += (h - 128) << (6 * (o - (i += 1)))),
            i !== o)
          )
            return null;
          var l = n;
          return (n = o = i = 0), l;
        };
      }
      function d(t) {
        t.fatal;
        this.handler = function (t, e) {
          if (-1 === e) return s;
          if (r(e, 0, 127)) return e;
          var n, i;
          r(e, 128, 2047)
            ? ((n = 1), (i = 192))
            : r(e, 2048, 65535)
            ? ((n = 2), (i = 224))
            : r(e, 65536, 1114111) && ((n = 3), (i = 240));
          for (var o = [(e >> (6 * n)) + i]; n > 0; ) {
            var a = e >> (6 * (n - 1));
            o.push(128 | (63 & a)), (n -= 1);
          }
          return o;
        };
      }
      (u.prototype = {
        decode: function (t, e) {
          var n;
          (n =
            "object" === typeof t && t instanceof ArrayBuffer
              ? new Uint8Array(t)
              : "object" === typeof t &&
                "buffer" in t &&
                t.buffer instanceof ArrayBuffer
              ? new Uint8Array(t.buffer, t.byteOffset, t.byteLength)
              : new Uint8Array(0)),
            (e = i(e)),
            this._streaming ||
              ((this._decoder = new l({ fatal: this._fatal })),
              (this._BOMseen = !1)),
            (this._streaming = Boolean(e.stream));
          for (
            var r, a = new o(n), c = [];
            !a.endOfStream() && (r = this._decoder.handler(a, a.read())) !== s;

          )
            null !== r && (Array.isArray(r) ? c.push.apply(c, r) : c.push(r));
          if (!this._streaming) {
            do {
              if ((r = this._decoder.handler(a, a.read())) === s) break;
              null !== r && (Array.isArray(r) ? c.push.apply(c, r) : c.push(r));
            } while (!a.endOfStream());
            this._decoder = null;
          }
          return (
            c.length &&
              (-1 === ["utf-8"].indexOf(this.encoding) ||
                this._ignoreBOM ||
                this._BOMseen ||
                (65279 === c[0]
                  ? ((this._BOMseen = !0), c.shift())
                  : (this._BOMseen = !0))),
            (function (t) {
              for (var e = "", n = 0; n < t.length; ++n) {
                var r = t[n];
                r <= 65535
                  ? (e += String.fromCharCode(r))
                  : ((r -= 65536),
                    (e += String.fromCharCode(
                      55296 + (r >> 10),
                      56320 + (1023 & r)
                    )));
              }
              return e;
            })(c)
          );
        },
      }),
        (h.prototype = {
          encode: function (t, e) {
            (t = t ? String(t) : ""),
              (e = i(e)),
              this._streaming || (this._encoder = new d(this._options)),
              (this._streaming = Boolean(e.stream));
            for (
              var n,
                r = [],
                a = new o(
                  (function (t) {
                    for (
                      var e = String(t), n = e.length, r = 0, i = [];
                      r < n;

                    ) {
                      var o = e.charCodeAt(r);
                      if (o < 55296 || o > 57343) i.push(o);
                      else if (56320 <= o && o <= 57343) i.push(65533);
                      else if (55296 <= o && o <= 56319)
                        if (r === n - 1) i.push(65533);
                        else {
                          var s = t.charCodeAt(r + 1);
                          if (56320 <= s && s <= 57343) {
                            var a = 1023 & o,
                              c = 1023 & s;
                            i.push(65536 + (a << 10) + c), (r += 1);
                          } else i.push(65533);
                        }
                      r += 1;
                    }
                    return i;
                  })(t)
                );
              !a.endOfStream() &&
              (n = this._encoder.handler(a, a.read())) !== s;

            )
              Array.isArray(n) ? r.push.apply(r, n) : r.push(n);
            if (!this._streaming) {
              for (; (n = this._encoder.handler(a, a.read())) !== s; )
                Array.isArray(n) ? r.push.apply(r, n) : r.push(n);
              this._encoder = null;
            }
            return new Uint8Array(r);
          },
        });
    },
  },
  function (t) {
    var e = function (e) {
      return t((t.s = e));
    };
    t.O(0, [774, 179], function () {
      return e(6840), e(9898);
    });
    var n = t.O();
    _N_E = n;
  },
]);
