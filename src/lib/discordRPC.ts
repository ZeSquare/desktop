import { Client } from "discord-rpc";
import { getConfig } from "./config";

export var rpc: Client;

export async function connectRPC() {
    if (!getConfig().discordRPC) return;

    try {
        rpc = new Client({ transport: "ipc" });

        rpc.on("ready", () =>
            rpc.setActivity({
                state: "Exodus.icu",
                details: "Chatting with others",
                largeImageKey: "qr",
                largeImageText: "Communication is critical – use Exodus.",
                buttons: [
                    {
                        label: "Join Public Beta",
                        url: "https://blog.exodus.icu/public-beta",
                    },
                    { label: "Website", url: "https://exodus.icu" },
                ],
            }),
        );

        // @ts-ignore
        rpc.on("disconnected", reconnect);

        rpc.login({ clientId: "872068124005007420" });
    } catch (err) {
        reconnect();
    }
}

const reconnect = () => setTimeout(() => connectRPC(), 1e4);

export async function dropRPC() {
    rpc?.destroy();
}
