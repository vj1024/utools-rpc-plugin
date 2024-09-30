import { log } from "./log";

export const SERVER_API = process.env.UTOOLS_RPC_SERVER || 'http://127.0.0.1:8000';
log("SERVER_API: " + SERVER_API);

import { Plugin, ListItem } from "utools-helper";
import Axios, { AxiosInstance } from "axios";
import { stringify } from "querystring";

export class RPC implements Plugin {
    delay = 5;
    code = "";
    request: AxiosInstance;

    async enter(): Promise<ListItem[]> {
        this.request = Axios.create({
            baseURL: SERVER_API,
            timeout: 10000,
        });
        return this.search("");
    }

    async search(word?: string): Promise<ListItem[]> {
        let queries = word.trim();
        const r = await this.request.get("/query?" + stringify({ "code": this.code, "q": queries }));
        const items: ListItem[] = r.data.items;
        let itemsNew: ListItem[] = [];
        if (items != null && items.length > 0) {
            items.forEach(v => {
                v.icon = SERVER_API + v.icon;
                itemsNew.push(v);
            });
        }
        return itemsNew;
    }

    select(item: ListItem) {
        this.request.get("/select?" + stringify({ "code": this.code, "data": item.data }));

        switch (item.operate) {
            case "open_path":
                // @ts-ignore
                utools.shellOpenPath(item.data);
                break;
            case "open_url":
                // @ts-ignore
                utools.shellOpenExternal(item.data);
                break;
            case "copy_text":
                // @ts-ignore
                utools.copyText(item.data);
                break;
            case "set_input":
                // @ts-ignore
                utools.setSubInputValue(item.data);
                return;
            case "show_notification":
                // @ts-ignore
                utools.showNotification(item.data);
                break
            default:
                // @ts-ignore
                utools.shellOpenPath(item.data);
                break;
        }
        // @ts-ignore
        utools.hideMainWindow();
    }
}

export function NewRPC(code: string): RPC {
    let rpc = new (RPC);
    rpc.code = code;
    return rpc;
}
