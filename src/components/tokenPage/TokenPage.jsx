"use client"
import { useState } from "react";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const TokenPage = () => {

  const [token, setToken] = useState('')

  const handleChange = (e) => {
    setToken(e.target.value)
  }


  return (
    <div className="flex flex-col justify-center items-center">
      <div className="text-md font-semibold m-3">
        Canvasで取得したトークンを貼り付けてください
      </div>
      <Input placeholder="トークン入力してください" onChange={handleChange} />
      <Link href={`/home/${token}`} className="mt-3">送信</Link>
    </div>
  )
}

export default TokenPage