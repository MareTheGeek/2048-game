(function () {
    if (typeof window.Element === "undefined" || "classList" in document.documentElement) {
        return;
    }
    var prototype = Array.prototype
        , push = prototype.push
        , splice = prototype.splice
        , join = prototype.join;
    class DOMTokenList {
        constructor(el) {
            this.el = el;
            var classes = el.className.replace(/^\s+|\s+$/g, '').split(/\s+/);
            for (var i = 0; i < classes.length; i++) {
                push.call(this, classes[i]);
            }
        }
        add(token) {
            if (this.contains(token))
                return;
            push.call(this, token);
            this.el.className = this.toString();
        }
        contains(token) {
            return this.el.className.indexOf(token) != -1;
        }
        item(index) {
            return this[index] || null;
        }
        remove(token) {
            if (!this.contains(token))
                return;
            for (var i = 0; i < this.length; i++) {
                if (this[i] == token)
                    break;
            }
            splice.call(this, i, 1);
            this.el.className = this.toString();
        }
        toString() {
            return join.call(this, ' ');
        }
        toggle(token) {
            if (!this.contains(token)) {
                this.add(token);
            } else {
                this.remove(token);
            }
            return this.contains(token);
        }
    }
    window.DOMTokenList = DOMTokenList;
    function defineElementGetter(obj, prop, getter) {
        if (Object.defineProperty) {
            Object.defineProperty(obj, prop, {
                get: getter
            });
        } else {
            obj.__defineGetter__(prop, getter);
        }
    }
    defineElementGetter(HTMLElement.prototype, 'classList', function () {
        return new DOMTokenList(this);
    });
}
)();
