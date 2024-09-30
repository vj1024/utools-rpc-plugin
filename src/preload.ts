import { log } from "./log";
import { InitPlugins } from "utools-helper";
import { SERVER_API, RPC, NewRPC } from "./rpc";
import axios from "axios";

axios.get(SERVER_API + "/features").then((resp) => {
    let plugins: RPC[] = [NewRPC("rpc")];
    let features: any[] = resp.data.features;

    log({ "features": features });

    features.forEach((f) => {
        // @ts-ignore
        utools.setFeature(f);
        plugins.push(NewRPC(f.code));
    })
    InitPlugins(plugins);
    log({ "plugins": plugins });
});
