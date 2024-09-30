import { writeFileSync } from 'fs';
import { join } from 'path';
import { homedir } from 'os';

const filePath = join(homedir(), 'utools-rpc-plugin.log');
export function log(data: any) {
    const time = new Date().toLocaleString();
    const msg = {
        "time": time,
        "build": "YYYY-mm-dd HH:MM:SS",
        "msg": data
    };
    writeFileSync(filePath, JSON.stringify(msg) + "\n", { flag: 'a' });
}
