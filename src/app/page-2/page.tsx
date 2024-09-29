"use client"
import {useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";

export default function Page() {
    const searchParams = useSearchParams();
    const [name, setName] = useState("")
    const [age, setAge] = useState(0)

    useEffect(() => {
        setName(searchParams.get("name") as string)
        setAge(parseInt(searchParams.get("age") as string || "0"))
    }, []);

    return (<div>
        <div>页面2</div>
        <div>名称: {name}</div>
        <div>年龄: {age}</div>
    </div>)
}