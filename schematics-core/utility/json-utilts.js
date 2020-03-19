(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/entity/schematics-core/utility/json-utilts", ["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // https://github.com/angular/angular-cli/blob/master/packages/schematics/angular/utility/json-utils.ts
    function findPropertyInAstObject(node, propertyName) {
        let maybeNode = null;
        for (const property of node.properties) {
            if (property.key.value == propertyName) {
                maybeNode = property.value;
            }
        }
        return maybeNode;
    }
    exports.findPropertyInAstObject = findPropertyInAstObject;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi11dGlsdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL2VudGl0eS9zY2hlbWF0aWNzLWNvcmUvdXRpbGl0eS9qc29uLXV0aWx0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQUVBLHVHQUF1RztJQUN2RyxTQUFnQix1QkFBdUIsQ0FDckMsSUFBbUIsRUFDbkIsWUFBb0I7UUFFcEIsSUFBSSxTQUFTLEdBQXVCLElBQUksQ0FBQztRQUN6QyxLQUFLLE1BQU0sUUFBUSxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDdEMsSUFBSSxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssSUFBSSxZQUFZLEVBQUU7Z0JBQ3RDLFNBQVMsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDO2FBQzVCO1NBQ0Y7UUFFRCxPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDO0lBWkQsMERBWUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBKc29uQXN0Tm9kZSwgSnNvbkFzdE9iamVjdCB9IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9jb3JlJztcblxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci1jbGkvYmxvYi9tYXN0ZXIvcGFja2FnZXMvc2NoZW1hdGljcy9hbmd1bGFyL3V0aWxpdHkvanNvbi11dGlscy50c1xuZXhwb3J0IGZ1bmN0aW9uIGZpbmRQcm9wZXJ0eUluQXN0T2JqZWN0KFxuICBub2RlOiBKc29uQXN0T2JqZWN0LFxuICBwcm9wZXJ0eU5hbWU6IHN0cmluZ1xuKTogSnNvbkFzdE5vZGUgfCBudWxsIHtcbiAgbGV0IG1heWJlTm9kZTogSnNvbkFzdE5vZGUgfCBudWxsID0gbnVsbDtcbiAgZm9yIChjb25zdCBwcm9wZXJ0eSBvZiBub2RlLnByb3BlcnRpZXMpIHtcbiAgICBpZiAocHJvcGVydHkua2V5LnZhbHVlID09IHByb3BlcnR5TmFtZSkge1xuICAgICAgbWF5YmVOb2RlID0gcHJvcGVydHkudmFsdWU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG1heWJlTm9kZTtcbn1cbiJdfQ==