(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/entity/schematics-core/utility/change", ["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * An operation that does nothing.
     */
    var NoopChange = /** @class */ (function () {
        function NoopChange() {
            this.description = 'No operation.';
            this.order = Infinity;
            this.path = null;
        }
        NoopChange.prototype.apply = function () {
            return Promise.resolve();
        };
        return NoopChange;
    }());
    exports.NoopChange = NoopChange;
    /**
     * Will add text to the source code.
     */
    var InsertChange = /** @class */ (function () {
        function InsertChange(path, pos, toAdd) {
            this.path = path;
            this.pos = pos;
            this.toAdd = toAdd;
            if (pos < 0) {
                throw new Error('Negative positions are invalid');
            }
            this.description = "Inserted " + toAdd + " into position " + pos + " of " + path;
            this.order = pos;
        }
        /**
         * This method does not insert spaces if there is none in the original string.
         */
        InsertChange.prototype.apply = function (host) {
            var _this = this;
            return host.read(this.path).then(function (content) {
                var prefix = content.substring(0, _this.pos);
                var suffix = content.substring(_this.pos);
                return host.write(_this.path, "" + prefix + _this.toAdd + suffix);
            });
        };
        return InsertChange;
    }());
    exports.InsertChange = InsertChange;
    /**
     * Will remove text from the source code.
     */
    var RemoveChange = /** @class */ (function () {
        function RemoveChange(path, pos, toRemove) {
            this.path = path;
            this.pos = pos;
            this.toRemove = toRemove;
            if (pos < 0) {
                throw new Error('Negative positions are invalid');
            }
            this.description = "Removed " + toRemove + " into position " + pos + " of " + path;
            this.order = pos;
        }
        RemoveChange.prototype.apply = function (host) {
            var _this = this;
            return host.read(this.path).then(function (content) {
                var prefix = content.substring(0, _this.pos);
                var suffix = content.substring(_this.pos + _this.toRemove.length);
                // TODO: throw error if toRemove doesn't match removed string.
                return host.write(_this.path, "" + prefix + suffix);
            });
        };
        return RemoveChange;
    }());
    exports.RemoveChange = RemoveChange;
    /**
     * Will replace text from the source code.
     */
    var ReplaceChange = /** @class */ (function () {
        function ReplaceChange(path, pos, oldText, newText) {
            this.path = path;
            this.pos = pos;
            this.oldText = oldText;
            this.newText = newText;
            if (pos < 0) {
                throw new Error('Negative positions are invalid');
            }
            this.description = "Replaced " + oldText + " into position " + pos + " of " + path + " with " + newText;
            this.order = pos;
        }
        ReplaceChange.prototype.apply = function (host) {
            var _this = this;
            return host.read(this.path).then(function (content) {
                var prefix = content.substring(0, _this.pos);
                var suffix = content.substring(_this.pos + _this.oldText.length);
                var text = content.substring(_this.pos, _this.pos + _this.oldText.length);
                if (text !== _this.oldText) {
                    return Promise.reject(new Error("Invalid replace: \"" + text + "\" != \"" + _this.oldText + "\"."));
                }
                // TODO: throw error if oldText doesn't match removed string.
                return host.write(_this.path, "" + prefix + _this.newText + suffix);
            });
        };
        return ReplaceChange;
    }());
    exports.ReplaceChange = ReplaceChange;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbmdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9lbnRpdHkvc2NoZW1hdGljcy1jb3JlL3V0aWxpdHkvY2hhbmdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0lBNEJBOztPQUVHO0lBQ0g7UUFBQTtZQUNFLGdCQUFXLEdBQUcsZUFBZSxDQUFDO1lBQzlCLFVBQUssR0FBRyxRQUFRLENBQUM7WUFDakIsU0FBSSxHQUFHLElBQUksQ0FBQztRQUlkLENBQUM7UUFIQywwQkFBSyxHQUFMO1lBQ0UsT0FBTyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDM0IsQ0FBQztRQUNILGlCQUFDO0lBQUQsQ0FBQyxBQVBELElBT0M7SUFQWSxnQ0FBVTtJQVN2Qjs7T0FFRztJQUNIO1FBSUUsc0JBQW1CLElBQVksRUFBUyxHQUFXLEVBQVMsS0FBYTtZQUF0RCxTQUFJLEdBQUosSUFBSSxDQUFRO1lBQVMsUUFBRyxHQUFILEdBQUcsQ0FBUTtZQUFTLFVBQUssR0FBTCxLQUFLLENBQVE7WUFDdkUsSUFBSSxHQUFHLEdBQUcsQ0FBQyxFQUFFO2dCQUNYLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0NBQWdDLENBQUMsQ0FBQzthQUNuRDtZQUNELElBQUksQ0FBQyxXQUFXLEdBQUcsY0FBWSxLQUFLLHVCQUFrQixHQUFHLFlBQU8sSUFBTSxDQUFDO1lBQ3ZFLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO1FBQ25CLENBQUM7UUFFRDs7V0FFRztRQUNILDRCQUFLLEdBQUwsVUFBTSxJQUFVO1lBQWhCLGlCQU9DO1lBTkMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxPQUFPO2dCQUN0QyxJQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxLQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7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QUksSUFBSSxLQUFLLEtBQUksQ0FBQyxPQUFPLEVBQUU7b0JBQ3pCLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FDbkIsSUFBSSxLQUFLLENBQUMsd0JBQXFCLElBQUksZ0JBQVMsS0FBSSxDQUFDLE9BQU8sUUFBSSxDQUFDLENBQzlELENBQUM7aUJBQ0g7Z0JBRUQsNkRBQTZEO2dCQUM3RCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSSxDQUFDLElBQUksRUFBRSxLQUFHLE1BQU0sR0FBRyxLQUFJLENBQUMsT0FBTyxHQUFHLE1BQVEsQ0FBQyxDQUFDO1lBQ3BFLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUNILG9CQUFDO0lBQUQsQ0FBQyxBQWpDRCxJQWlDQztJQWpDWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbIi8qIGlzdGFuYnVsIGlnbm9yZSBmaWxlICovXG4vKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5leHBvcnQgaW50ZXJmYWNlIEhvc3Qge1xuICB3cml0ZShwYXRoOiBzdHJpbmcsIGNvbnRlbnQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD47XG4gIHJlYWQocGF0aDogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENoYW5nZSB7XG4gIGFwcGx5KGhvc3Q6IEhvc3QpOiBQcm9taXNlPHZvaWQ+O1xuXG4gIC8vIFRoZSBmaWxlIHRoaXMgY2hhbmdlIHNob3VsZCBiZSBhcHBsaWVkIHRvLiBTb21lIGNoYW5nZXMgbWlnaHQgbm90IGFwcGx5IHRvXG4gIC8vIGEgZmlsZSAobWF5YmUgdGhlIGNvbmZpZykuXG4gIHJlYWRvbmx5IHBhdGg6IHN0cmluZyB8IG51bGw7XG5cbiAgLy8gVGhlIG9yZGVyIHRoaXMgY2hhbmdlIHNob3VsZCBiZSBhcHBsaWVkLiBOb3JtYWxseSB0aGUgcG9zaXRpb24gaW5zaWRlIHRoZSBmaWxlLlxuICAvLyBDaGFuZ2VzIGFyZSBhcHBsaWVkIGZyb20gdGhlIGJvdHRvbSBvZiBhIGZpbGUgdG8gdGhlIHRvcC5cbiAgcmVhZG9ubHkgb3JkZXI6IG51bWJlcjtcblxuICAvLyBUaGUgZGVzY3JpcHRpb24gb2YgdGhpcyBjaGFuZ2UuIFRoaXMgd2lsbCBiZSBvdXRwdXR0ZWQgaW4gYSBkcnkgb3IgdmVyYm9zZSBydW4uXG4gIHJlYWRvbmx5IGRlc2NyaXB0aW9uOiBzdHJpbmc7XG59XG5cbi8qKlxuICogQW4gb3BlcmF0aW9uIHRoYXQgZG9lcyBub3RoaW5nLlxuICovXG5leHBvcnQgY2xhc3MgTm9vcENoYW5nZSBpbXBsZW1lbnRzIENoYW5nZSB7XG4gIGRlc2NyaXB0aW9uID0gJ05vIG9wZXJhdGlvbi4nO1xuICBvcmRlciA9IEluZmluaXR5O1xuICBwYXRoID0gbnVsbDtcbiAgYXBwbHkoKSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG59XG5cbi8qKlxuICogV2lsbCBhZGQgdGV4dCB0byB0aGUgc291cmNlIGNvZGUuXG4gKi9cbmV4cG9ydCBjbGFzcyBJbnNlcnRDaGFuZ2UgaW1wbGVtZW50cyBDaGFuZ2Uge1xuICBvcmRlcjogbnVtYmVyO1xuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBwYXRoOiBzdHJpbmcsIHB1YmxpYyBwb3M6IG51bWJlciwgcHVibGljIHRvQWRkOiBzdHJpbmcpIHtcbiAgICBpZiAocG9zIDwgMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdOZWdhdGl2ZSBwb3NpdGlvbnMgYXJlIGludmFsaWQnKTtcbiAgICB9XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGBJbnNlcnRlZCAke3RvQWRkfSBpbnRvIHBvc2l0aW9uICR7cG9zfSBvZiAke3BhdGh9YDtcbiAgICB0aGlzLm9yZGVyID0gcG9zO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIGRvZXMgbm90IGluc2VydCBzcGFjZXMgaWYgdGhlcmUgaXMgbm9uZSBpbiB0aGUgb3JpZ2luYWwgc3RyaW5nLlxuICAgKi9cbiAgYXBwbHkoaG9zdDogSG9zdCkge1xuICAgIHJldHVybiBob3N0LnJlYWQodGhpcy5wYXRoKS50aGVuKGNvbnRlbnQgPT4ge1xuICAgICAgY29uc3QgcHJlZml4ID0gY29udGVudC5zdWJzdHJpbmcoMCwgdGhpcy5wb3MpO1xuICAgICAgY29uc3Qgc3VmZml4ID0gY29udGVudC5zdWJzdHJpbmcodGhpcy5wb3MpO1xuXG4gICAgICByZXR1cm4gaG9zdC53cml0ZSh0aGlzLnBhdGgsIGAke3ByZWZpeH0ke3RoaXMudG9BZGR9JHtzdWZmaXh9YCk7XG4gICAgfSk7XG4gIH1cbn1cblxuLyoqXG4gKiBXaWxsIHJlbW92ZSB0ZXh0IGZyb20gdGhlIHNvdXJjZSBjb2RlLlxuICovXG5leHBvcnQgY2xhc3MgUmVtb3ZlQ2hhbmdlIGltcGxlbWVudHMgQ2hhbmdlIHtcbiAgb3JkZXI6IG51bWJlcjtcbiAgZGVzY3JpcHRpb246IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgcGF0aDogc3RyaW5nLFxuICAgIHByaXZhdGUgcG9zOiBudW1iZXIsXG4gICAgcHJpdmF0ZSB0b1JlbW92ZTogc3RyaW5nXG4gICkge1xuICAgIGlmIChwb3MgPCAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05lZ2F0aXZlIHBvc2l0aW9ucyBhcmUgaW52YWxpZCcpO1xuICAgIH1cbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gYFJlbW92ZWQgJHt0b1JlbW92ZX0gaW50byBwb3NpdGlvbiAke3Bvc30gb2YgJHtwYXRofWA7XG4gICAgdGhpcy5vcmRlciA9IHBvcztcbiAgfVxuXG4gIGFwcGx5KGhvc3Q6IEhvc3QpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gaG9zdC5yZWFkKHRoaXMucGF0aCkudGhlbihjb250ZW50ID0+IHtcbiAgICAgIGNvbnN0IHByZWZpeCA9IGNvbnRlbnQuc3Vic3RyaW5nKDAsIHRoaXMucG9zKTtcbiAgICAgIGNvbnN0IHN1ZmZpeCA9IGNvbnRlbnQuc3Vic3RyaW5nKHRoaXMucG9zICsgdGhpcy50b1JlbW92ZS5sZW5ndGgpO1xuXG4gICAgICAvLyBUT0RPOiB0aHJvdyBlcnJvciBpZiB0b1JlbW92ZSBkb2Vzbid0IG1hdGNoIHJlbW92ZWQgc3RyaW5nLlxuICAgICAgcmV0dXJuIGhvc3Qud3JpdGUodGhpcy5wYXRoLCBgJHtwcmVmaXh9JHtzdWZmaXh9YCk7XG4gICAgfSk7XG4gIH1cbn1cblxuLyoqXG4gKiBXaWxsIHJlcGxhY2UgdGV4dCBmcm9tIHRoZSBzb3VyY2UgY29kZS5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlcGxhY2VDaGFuZ2UgaW1wbGVtZW50cyBDaGFuZ2Uge1xuICBvcmRlcjogbnVtYmVyO1xuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBwYXRoOiBzdHJpbmcsXG4gICAgcHJpdmF0ZSBwb3M6IG51bWJlcixcbiAgICBwdWJsaWMgb2xkVGV4dDogc3RyaW5nLFxuICAgIHB1YmxpYyBuZXdUZXh0OiBzdHJpbmdcbiAgKSB7XG4gICAgaWYgKHBvcyA8IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTmVnYXRpdmUgcG9zaXRpb25zIGFyZSBpbnZhbGlkJyk7XG4gICAgfVxuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBgUmVwbGFjZWQgJHtvbGRUZXh0fSBpbnRvIHBvc2l0aW9uICR7cG9zfSBvZiAke3BhdGh9IHdpdGggJHtuZXdUZXh0fWA7XG4gICAgdGhpcy5vcmRlciA9IHBvcztcbiAgfVxuXG4gIGFwcGx5KGhvc3Q6IEhvc3QpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gaG9zdC5yZWFkKHRoaXMucGF0aCkudGhlbihjb250ZW50ID0+IHtcbiAgICAgIGNvbnN0IHByZWZpeCA9IGNvbnRlbnQuc3Vic3RyaW5nKDAsIHRoaXMucG9zKTtcbiAgICAgIGNvbnN0IHN1ZmZpeCA9IGNvbnRlbnQuc3Vic3RyaW5nKHRoaXMucG9zICsgdGhpcy5vbGRUZXh0Lmxlbmd0aCk7XG4gICAgICBjb25zdCB0ZXh0ID0gY29udGVudC5zdWJzdHJpbmcodGhpcy5wb3MsIHRoaXMucG9zICsgdGhpcy5vbGRUZXh0Lmxlbmd0aCk7XG5cbiAgICAgIGlmICh0ZXh0ICE9PSB0aGlzLm9sZFRleHQpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KFxuICAgICAgICAgIG5ldyBFcnJvcihgSW52YWxpZCByZXBsYWNlOiBcIiR7dGV4dH1cIiAhPSBcIiR7dGhpcy5vbGRUZXh0fVwiLmApXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIC8vIFRPRE86IHRocm93IGVycm9yIGlmIG9sZFRleHQgZG9lc24ndCBtYXRjaCByZW1vdmVkIHN0cmluZy5cbiAgICAgIHJldHVybiBob3N0LndyaXRlKHRoaXMucGF0aCwgYCR7cHJlZml4fSR7dGhpcy5uZXdUZXh0fSR7c3VmZml4fWApO1xuICAgIH0pO1xuICB9XG59XG4iXX0=