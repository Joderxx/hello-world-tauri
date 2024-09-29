import {getCurrentWebviewWindow} from "@tauri-apps/api/webviewWindow";


export function emitRsEvent(message: string, payload?: unknown) {
    // 获取当前窗口
    const window = getCurrentWebviewWindow();
    // 给当前窗口发送事件
    window.emitTo(window.label, message, payload).then();
    // 给全局发送事件
    // window.emit(message, payload).then()
}