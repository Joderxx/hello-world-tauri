import {Child, Command} from "@tauri-apps/plugin-shell";

/**
 * 拉起系统计算器
 */
export function calc(): Promise<void> {
    return new Promise((resolve,reject) => {
        Command.create("calc").execute().then(res => {
            if (res.stderr) {
                reject(res.stderr);
                return
            }
            resolve();
        });
    })
}

/**
 * echo 回声
 * @param str
 */
export function echo(str: string): Promise<void> {
    return new Promise((resolve,reject) => {
        Command.sidecar("resources/echo", [str]).execute().then(res => {
            if (res.stderr) {
                reject(res.stderr);
                return
            }
            resolve();
        });
    })
}

/**
 * 调用进程
 * @param exePath 执行路径
 * @param args 参数
 */
export function childProcess(exePath: string, args: string[] = []): Promise<Child> {
    return new Promise(async (resolve) => {
        const command = Command.create("cmd", [
            "/C",
            exePath,
            ...args,
        ]);
        let child: Child | null = null;

        command.on("close", () => {

        });
        command.on("error", (err) => {
            console.log(err);
        });
        command.stdout.on("data", () => {});


        command.stderr.on("data", (err) => {
            console.error(err);
        });

        child = await command.spawn();
        resolve(child);
    })
}

/**
 * 关闭进程
 * @param process cmd的句柄
 */
export function closeProcess(process: Child): Promise<void> {
    return new Promise(async (resolve) => {
        Command.create("cmd", [
            "/C",
            "taskkill",
            "/pid",
            process.pid + "",
            "-t",
            "-f",
        ])
            .execute()
            .then(() => resolve())
            .catch((err) => {
                console.log(err);
                resolve();
            });
    });
}