/// <amd-module name="@ngrx/entity/schematics-core/utility/project" />
import { Tree } from '@angular-devkit/schematics';
export declare function getProjectPath(host: Tree, options: {
    project?: string | undefined;
    path?: string | undefined;
}): string;
