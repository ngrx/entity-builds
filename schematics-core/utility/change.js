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
    class NoopChange {
        constructor() {
            this.description = 'No operation.';
            this.order = Infinity;
            this.path = null;
        }
        apply() {
            return Promise.resolve();
        }
    }
    exports.NoopChange = NoopChange;
    /**
     * Will add text to the source code.
     */
    class InsertChange {
        constructor(path, pos, toAdd) {
            this.path = path;
            this.pos = pos;
            this.toAdd = toAdd;
            if (pos < 0) {
                throw new Error('Negative positions are invalid');
            }
            this.description = `Inserted ${toAdd} into position ${pos} of ${path}`;
            this.order = pos;
        }
        /**
         * This method does not insert spaces if there is none in the original string.
         */
        apply(host) {
            return host.read(this.path).then(content => {
                const prefix = content.substring(0, this.pos);
                const suffix = content.substring(this.pos);
                return host.write(this.path, `${prefix}${this.toAdd}${suffix}`);
            });
        }
    }
    exports.InsertChange = InsertChange;
    /**
     * Will remove text from the source code.
     */
    class RemoveChange {
        constructor(path, pos, end) {
            this.path = path;
            this.pos = pos;
            this.end = end;
            if (pos < 0 || end < 0) {
                throw new Error('Negative positions are invalid');
            }
            this.description = `Removed text in position ${pos} to ${end} of ${path}`;
            this.order = pos;
        }
        apply(host) {
            return host.read(this.path).then(content => {
                const prefix = content.substring(0, this.pos);
                const suffix = content.substring(this.end);
                // TODO: throw error if toRemove doesn't match removed string.
                return host.write(this.path, `${prefix}${suffix}`);
            });
        }
    }
    exports.RemoveChange = RemoveChange;
    /**
     * Will replace text from the source code.
     */
    class ReplaceChange {
        constructor(path, pos, oldText, newText) {
            this.path = path;
            this.pos = pos;
            this.oldText = oldText;
            this.newText = newText;
            if (pos < 0) {
                throw new Error('Negative positions are invalid');
            }
            this.description = `Replaced ${oldText} into position ${pos} of ${path} with ${newText}`;
            this.order = pos;
        }
        apply(host) {
            return host.read(this.path).then(content => {
                const prefix = content.substring(0, this.pos);
                const suffix = content.substring(this.pos + this.oldText.length);
                const text = content.substring(this.pos, this.pos + this.oldText.length);
                if (text !== this.oldText) {
                    return Promise.reject(new Error(`Invalid replace: "${text}" != "${this.oldText}".`));
                }
                // TODO: throw error if oldText doesn't match removed string.
                return host.write(this.path, `${prefix}${this.newText}${suffix}`);
            });
        }
    }
    exports.ReplaceChange = ReplaceChange;
    function createReplaceChange(sourceFile, node, oldText, newText) {
        return new ReplaceChange(sourceFile.fileName, node.getStart(sourceFile), oldText, newText);
    }
    exports.createReplaceChange = createReplaceChange;
    function createChangeRecorder(tree, path, changes) {
        const recorder = tree.beginUpdate(path);
        for (const change of changes) {
            if (change instanceof InsertChange) {
                recorder.insertLeft(change.pos, change.toAdd);
            }
            else if (change instanceof RemoveChange) {
                recorder.remove(change.pos, change.end - change.pos);
            }
            else if (change instanceof ReplaceChange) {
                recorder.remove(change.pos, change.oldText.length);
                recorder.insertLeft(change.pos, change.newText);
            }
        }
        return recorder;
    }
    exports.createChangeRecorder = createChangeRecorder;
    function commitChanges(tree, path, changes) {
        if (changes.length === 0) {
            return false;
        }
        const recorder = createChangeRecorder(tree, path, changes);
        tree.commitUpdate(recorder);
        return true;
    }
    exports.commitChanges = commitChanges;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbmdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9lbnRpdHkvc2NoZW1hdGljcy1jb3JlL3V0aWxpdHkvY2hhbmdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0lBZ0NBOztPQUVHO0lBQ0gsTUFBYSxVQUFVO1FBQXZCO1lBQ0UsZ0JBQVcsR0FBRyxlQUFlLENBQUM7WUFDOUIsVUFBSyxHQUFHLFFBQVEsQ0FBQztZQUNqQixTQUFJLEdBQUcsSUFBSSxDQUFDO1FBSWQsQ0FBQztRQUhDLEtBQUs7WUFDSCxPQUFPLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUMzQixDQUFDO0tBQ0Y7SUFQRCxnQ0FPQztJQUVEOztPQUVHO0lBQ0gsTUFBYSxZQUFZO1FBSXZCLFlBQW1CLElBQVksRUFBUyxHQUFXLEVBQVMsS0FBYTtZQUF0RCxTQUFJLEdBQUosSUFBSSxDQUFRO1lBQVMsUUFBRyxHQUFILEdBQUcsQ0FBUTtZQUFTLFVBQUssR0FBTCxLQUFLLENBQVE7WUFDdkUsSUFBSSxHQUFHLEdBQUcsQ0FBQyxFQUFFO2dCQUNYLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0NBQWdDLENBQUMsQ0FBQzthQUNuRDtZQUNELElBQUksQ0FBQyxXQUFXLEdBQUcsWUFBWSxLQUFLLGtCQUFrQixHQUFHLE9BQU8sSUFBSSxFQUFFLENBQUM7WUFDdkUsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7UUFDbkIsQ0FBQztRQUVEOztXQUVHO1FBQ0gsS0FBSyxDQUFDLElBQVU7WUFDZCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRTtnQkFDekMsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUM5QyxNQUFNLE1BQU0sR0FB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QUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNuRCxRQUFRLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ2pEO1NBQ0Y7UUFDRCxPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDO0lBakJELG9EQWlCQztJQUVELFNBQWdCLGFBQWEsQ0FBQyxJQUFVLEVBQUUsSUFBWSxFQUFFLE9BQWlCO1FBQ3ZFLElBQUksT0FBTyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDeEIsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUVELE1BQU0sUUFBUSxHQUFHLG9CQUFvQixDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM1QixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFSRCxzQ0FRQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHRzIGZyb20gJ3R5cGVzY3JpcHQnO1xuaW1wb3J0IHsgVHJlZSwgVXBkYXRlUmVjb3JkZXIgfSBmcm9tICdAYW5ndWxhci1kZXZraXQvc2NoZW1hdGljcyc7XG5pbXBvcnQgeyBQYXRoIH0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L2NvcmUnO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgZmlsZSAqL1xuLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBIb3N0IHtcbiAgd3JpdGUocGF0aDogc3RyaW5nLCBjb250ZW50OiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+O1xuICByZWFkKHBhdGg6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDaGFuZ2Uge1xuICBhcHBseShob3N0OiBIb3N0KTogUHJvbWlzZTx2b2lkPjtcblxuICAvLyBUaGUgZmlsZSB0aGlzIGNoYW5nZSBzaG91bGQgYmUgYXBwbGllZCB0by4gU29tZSBjaGFuZ2VzIG1pZ2h0IG5vdCBhcHBseSB0b1xuICAvLyBhIGZpbGUgKG1heWJlIHRoZSBjb25maWcpLlxuICByZWFkb25seSBwYXRoOiBzdHJpbmcgfCBudWxsO1xuXG4gIC8vIFRoZSBvcmRlciB0aGlzIGNoYW5nZSBzaG91bGQgYmUgYXBwbGllZC4gTm9ybWFsbHkgdGhlIHBvc2l0aW9uIGluc2lkZSB0aGUgZmlsZS5cbiAgLy8gQ2hhbmdlcyBhcmUgYXBwbGllZCBmcm9tIHRoZSBib3R0b20gb2YgYSBmaWxlIHRvIHRoZSB0b3AuXG4gIHJlYWRvbmx5IG9yZGVyOiBudW1iZXI7XG5cbiAgLy8gVGhlIGRlc2NyaXB0aW9uIG9mIHRoaXMgY2hhbmdlLiBUaGlzIHdpbGwgYmUgb3V0cHV0dGVkIGluIGEgZHJ5IG9yIHZlcmJvc2UgcnVuLlxuICByZWFkb25seSBkZXNjcmlwdGlvbjogc3RyaW5nO1xufVxuXG4vKipcbiAqIEFuIG9wZXJhdGlvbiB0aGF0IGRvZXMgbm90aGluZy5cbiAqL1xuZXhwb3J0IGNsYXNzIE5vb3BDaGFuZ2UgaW1wbGVtZW50cyBDaGFuZ2Uge1xuICBkZXNjcmlwdGlvbiA9ICdObyBvcGVyYXRpb24uJztcbiAgb3JkZXIgPSBJbmZpbml0eTtcbiAgcGF0aCA9IG51bGw7XG4gIGFwcGx5KCkge1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxufVxuXG4vKipcbiAqIFdpbGwgYWRkIHRleHQgdG8gdGhlIHNvdXJjZSBjb2RlLlxuICovXG5leHBvcnQgY2xhc3MgSW5zZXJ0Q2hhbmdlIGltcGxlbWVudHMgQ2hhbmdlIHtcbiAgb3JkZXI6IG51bWJlcjtcbiAgZGVzY3JpcHRpb246IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgcGF0aDogc3RyaW5nLCBwdWJsaWMgcG9zOiBudW1iZXIsIHB1YmxpYyB0b0FkZDogc3RyaW5nKSB7XG4gICAgaWYgKHBvcyA8IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTmVnYXRpdmUgcG9zaXRpb25zIGFyZSBpbnZhbGlkJyk7XG4gICAgfVxuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBgSW5zZXJ0ZWQgJHt0b0FkZH0gaW50byBwb3NpdGlvbiAke3Bvc30gb2YgJHtwYXRofWA7XG4gICAgdGhpcy5vcmRlciA9IHBvcztcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCBkb2VzIG5vdCBpbnNlcnQgc3BhY2VzIGlmIHRoZXJlIGlzIG5vbmUgaW4gdGhlIG9yaWdpbmFsIHN0cmluZy5cbiAgICovXG4gIGFwcGx5KGhvc3Q6IEhvc3QpIHtcbiAgICByZXR1cm4gaG9zdC5yZWFkKHRoaXMucGF0aCkudGhlbihjb250ZW50ID0+IHtcbiAgICAgIGNvbnN0IHByZWZpeCA9IGNvbnRlbnQuc3Vic3RyaW5nKDAsIHRoaXMucG9zKTtcbiAgICAgIGNvbnN0IHN1ZmZpeCA9IGNvbnRlbnQuc3Vic3RyaW5nKHRoaXMucG9zKTtcblxuICAgICAgcmV0dXJuIGhvc3Qud3JpdGUodGhpcy5wYXRoLCBgJHtwcmVmaXh9JHt0aGlzLnRvQWRkfSR7c3VmZml4fWApO1xuICAgIH0pO1xuICB9XG59XG5cbi8qKlxuICogV2lsbCByZW1vdmUgdGV4dCBmcm9tIHRoZSBzb3VyY2UgY29kZS5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlbW92ZUNoYW5nZSBpbXBsZW1lbnRzIENoYW5nZSB7XG4gIG9yZGVyOiBudW1iZXI7XG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocHVibGljIHBhdGg6IHN0cmluZywgcHVibGljIHBvczogbnVtYmVyLCBwdWJsaWMgZW5kOiBudW1iZXIpIHtcbiAgICBpZiAocG9zIDwgMCB8fCBlbmQgPCAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05lZ2F0aXZlIHBvc2l0aW9ucyBhcmUgaW52YWxpZCcpO1xuICAgIH1cbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gYFJlbW92ZWQgdGV4dCBpbiBwb3NpdGlvbiAke3Bvc30gdG8gJHtlbmR9IG9mICR7cGF0aH1gO1xuICAgIHRoaXMub3JkZXIgPSBwb3M7XG4gIH1cblxuICBhcHBseShob3N0OiBIb3N0KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIGhvc3QucmVhZCh0aGlzLnBhdGgpLnRoZW4oY29udGVudCA9PiB7XG4gICAgICBjb25zdCBwcmVmaXggPSBjb250ZW50LnN1YnN0cmluZygwLCB0aGlzLnBvcyk7XG4gICAgICBjb25zdCBzdWZmaXggPSBjb250ZW50LnN1YnN0cmluZyh0aGlzLmVuZCk7XG5cbiAgICAgIC8vIFRPRE86IHRocm93IGVycm9yIGlmIHRvUmVtb3ZlIGRvZXNuJ3QgbWF0Y2ggcmVtb3ZlZCBzdHJpbmcuXG4gICAgICByZXR1cm4gaG9zdC53cml0ZSh0aGlzLnBhdGgsIGAke3ByZWZpeH0ke3N1ZmZpeH1gKTtcbiAgICB9KTtcbiAgfVxufVxuXG4vKipcbiAqIFdpbGwgcmVwbGFjZSB0ZXh0IGZyb20gdGhlIHNvdXJjZSBjb2RlLlxuICovXG5leHBvcnQgY2xhc3MgUmVwbGFjZUNoYW5nZSBpbXBsZW1lbnRzIENoYW5nZSB7XG4gIG9yZGVyOiBudW1iZXI7XG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIHBhdGg6IHN0cmluZyxcbiAgICBwdWJsaWMgcG9zOiBudW1iZXIsXG4gICAgcHVibGljIG9sZFRleHQ6IHN0cmluZyxcbiAgICBwdWJsaWMgbmV3VGV4dDogc3RyaW5nXG4gICkge1xuICAgIGlmIChwb3MgPCAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05lZ2F0aXZlIHBvc2l0aW9ucyBhcmUgaW52YWxpZCcpO1xuICAgIH1cbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gYFJlcGxhY2VkICR7b2xkVGV4dH0gaW50byBwb3NpdGlvbiAke3Bvc30gb2YgJHtwYXRofSB3aXRoICR7bmV3VGV4dH1gO1xuICAgIHRoaXMub3JkZXIgPSBwb3M7XG4gIH1cblxuICBhcHBseShob3N0OiBIb3N0KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIGhvc3QucmVhZCh0aGlzLnBhdGgpLnRoZW4oY29udGVudCA9PiB7XG4gICAgICBjb25zdCBwcmVmaXggPSBjb250ZW50LnN1YnN0cmluZygwLCB0aGlzLnBvcyk7XG4gICAgICBjb25zdCBzdWZmaXggPSBjb250ZW50LnN1YnN0cmluZyh0aGlzLnBvcyArIHRoaXMub2xkVGV4dC5sZW5ndGgpO1xuICAgICAgY29uc3QgdGV4dCA9IGNvbnRlbnQuc3Vic3RyaW5nKHRoaXMucG9zLCB0aGlzLnBvcyArIHRoaXMub2xkVGV4dC5sZW5ndGgpO1xuXG4gICAgICBpZiAodGV4dCAhPT0gdGhpcy5vbGRUZXh0KSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChcbiAgICAgICAgICBuZXcgRXJyb3IoYEludmFsaWQgcmVwbGFjZTogXCIke3RleHR9XCIgIT0gXCIke3RoaXMub2xkVGV4dH1cIi5gKVxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICAvLyBUT0RPOiB0aHJvdyBlcnJvciBpZiBvbGRUZXh0IGRvZXNuJ3QgbWF0Y2ggcmVtb3ZlZCBzdHJpbmcuXG4gICAgICByZXR1cm4gaG9zdC53cml0ZSh0aGlzLnBhdGgsIGAke3ByZWZpeH0ke3RoaXMubmV3VGV4dH0ke3N1ZmZpeH1gKTtcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUmVwbGFjZUNoYW5nZShcbiAgc291cmNlRmlsZTogdHMuU291cmNlRmlsZSxcbiAgbm9kZTogdHMuTm9kZSxcbiAgb2xkVGV4dDogc3RyaW5nLFxuICBuZXdUZXh0OiBzdHJpbmdcbik6IFJlcGxhY2VDaGFuZ2Uge1xuICByZXR1cm4gbmV3IFJlcGxhY2VDaGFuZ2UoXG4gICAgc291cmNlRmlsZS5maWxlTmFtZSxcbiAgICBub2RlLmdldFN0YXJ0KHNvdXJjZUZpbGUpLFxuICAgIG9sZFRleHQsXG4gICAgbmV3VGV4dFxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQ2hhbmdlUmVjb3JkZXIoXG4gIHRyZWU6IFRyZWUsXG4gIHBhdGg6IHN0cmluZyxcbiAgY2hhbmdlczogQ2hhbmdlW11cbik6IFVwZGF0ZVJlY29yZGVyIHtcbiAgY29uc3QgcmVjb3JkZXIgPSB0cmVlLmJlZ2luVXBkYXRlKHBhdGgpO1xuICBmb3IgKGNvbnN0IGNoYW5nZSBvZiBjaGFuZ2VzKSB7XG4gICAgaWYgKGNoYW5nZSBpbnN0YW5jZW9mIEluc2VydENoYW5nZSkge1xuICAgICAgcmVjb3JkZXIuaW5zZXJ0TGVmdChjaGFuZ2UucG9zLCBjaGFuZ2UudG9BZGQpO1xuICAgIH0gZWxzZSBpZiAoY2hhbmdlIGluc3RhbmNlb2YgUmVtb3ZlQ2hhbmdlKSB7XG4gICAgICByZWNvcmRlci5yZW1vdmUoY2hhbmdlLnBvcywgY2hhbmdlLmVuZCAtIGNoYW5nZS5wb3MpO1xuICAgIH0gZWxzZSBpZiAoY2hhbmdlIGluc3RhbmNlb2YgUmVwbGFjZUNoYW5nZSkge1xuICAgICAgcmVjb3JkZXIucmVtb3ZlKGNoYW5nZS5wb3MsIGNoYW5nZS5vbGRUZXh0Lmxlbmd0aCk7XG4gICAgICByZWNvcmRlci5pbnNlcnRMZWZ0KGNoYW5nZS5wb3MsIGNoYW5nZS5uZXdUZXh0KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlY29yZGVyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29tbWl0Q2hhbmdlcyh0cmVlOiBUcmVlLCBwYXRoOiBzdHJpbmcsIGNoYW5nZXM6IENoYW5nZVtdKSB7XG4gIGlmIChjaGFuZ2VzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGNvbnN0IHJlY29yZGVyID0gY3JlYXRlQ2hhbmdlUmVjb3JkZXIodHJlZSwgcGF0aCwgY2hhbmdlcyk7XG4gIHRyZWUuY29tbWl0VXBkYXRlKHJlY29yZGVyKTtcbiAgcmV0dXJuIHRydWU7XG59XG4iXX0=