import { QuickDB } from "quick.db";
import os from "os";
export const db = new QuickDB({
    filePath: `${os.homedir}/MTGCardTracker.sqlite`
});