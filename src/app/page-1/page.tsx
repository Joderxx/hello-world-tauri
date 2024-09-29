"use client"
import {useEffect} from "react";
import {calc, echo} from "@/lib/tauri-shell";

export default function Page() {

    useEffect(() => {
        calc().then(res => {
            console.log("返回", res)
        }).catch(err => console.log(err));

        echo("Tom").then(res => {
            console.log(res)
        }).catch(err => console.log(err));
    }, []);

    return (<div>页面1</div>)
}