"use client"

import {useEffect} from "react";
import {createMenu} from "@/lib/menu";
import {getCurrentWebviewWindow, WebviewWindow} from "@tauri-apps/api/webviewWindow";
import {UnlistenFn} from "@tauri-apps/api/event";

/**
 * 创建一个窗口
 * @param title 窗口标题
 * @param label 唯一ID，方便搜索
 * @param url 打开地址
 */
function createWin(
    title: string,
    label: string,
    url: string
): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
        console.log(title, label, url);
        //判断是否存在，是就聚焦就行
        const win = await WebviewWindow.getByLabel(label);
        if (win) {
            win.show().then(() => {
                win.setFocus().then(() => {
                    resolve();
                });
            });

            return;
        }

        const webviewWindow = new WebviewWindow(label, {
            width: 300,
            height: 200,
            title: title,
            visible: true,
            url,
        });

        await webviewWindow.once("tauri://created", function () {
            webviewWindow.center().then(() => {
                resolve();
            });
        });
        await webviewWindow.once("tauri://error", function (e) {
            console.log(e);
            reject();
        });
    });
}

export default function AppMenu() {

    useEffect(() => {
        createMenu().then()
    }, []);

    useEffect(() => {
        const window = getCurrentWebviewWindow();
        const handlers: UnlistenFn[] = []
        window.listen("menu:page1", async () => {
            await createWin("页面1", "page-1", "/page-1")
        }).then(handler => handlers.push(handler));

        window.listen<{ name: string, age: number }>("menu:page2", async event => {
            await createWin("页面2", "page-2", `/page-2?name=${event.payload.name}&age=${event.payload.age}`);
        }).then(handler => handlers.push(handler));

        return () => {
            for (const handler of handlers) {
                handler()
            }
        }
    }, []);

    return (
        <></>
    )
}
