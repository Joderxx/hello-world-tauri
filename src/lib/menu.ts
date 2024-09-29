import {Menu} from "@tauri-apps/api/menu/menu";
import {MenuItem} from "@tauri-apps/api/menu/menuItem";
import {Submenu} from "@tauri-apps/api/menu/submenu";
import {emitRsEvent} from "@/lib/event";

export async function createMenu() {
    const menu = await Menu.new({
        id: 'menu',
        items: [
            await MenuItem.new({
                text: "页面1",
                action: () => {
                    // 没有参数的事件
                    emitRsEvent("menu:page1")
                }
            }),
            await Submenu.new({
                text: "折叠菜单",
                items: [
                    await MenuItem.new({
                        text: "页面2",
                        action: () => {
                            // 发送携带参数的事件
                            emitRsEvent("menu:page2", {
                                name: "名字",
                                age: 20
                            })
                        }
                    })
                ]
            })
        ]
    })

    await menu.setAsWindowMenu()
}