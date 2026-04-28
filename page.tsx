// Next.js App Router single-file starter package for deployment on Vercel
// File: app/page.tsx
'use client'
import { useMemo, useState } from 'react'

export default function Page(){
 const [code,setCode]=useState('')
 const [selected,setSelected]=useState<number[]>([])
 const [submitted,setSubmitted]=useState(false)
 const [admin,setAdmin]=useState(false)
 const [pwd,setPwd]=useState('')
 const guests = Array.from({length:20},(_,i)=>String(i+1).padStart(2,'0'))
 const stats = useMemo(()=>[{id:'03',votes:9},{id:'07',votes:8},{id:'12',votes:7}],[])
 const toggle=(n:number)=>{
   if(submitted) return
   if(selected.includes(n)) setSelected(selected.filter(x=>x!==n))
   else if(selected.length<3) setSelected([...selected,n])
 }
 if(admin){
  return <main className='min-h-screen p-6 bg-slate-950 text-white'>
   <button onClick={()=>setAdmin(false)} className='mb-4 bg-white/10 px-3 py-2 rounded-xl'>返回前台</button>
   <div className='max-w-md mx-auto bg-white/10 p-5 rounded-2xl'>
    <h1 className='text-2xl font-bold mb-4'>后台数据中心</h1>
    {pwd!=='deepblue2026' ? <input value={pwd} onChange={e=>setPwd(e.target.value)} placeholder='输入后台密码' className='w-full p-3 rounded-xl text-black'/> : <>
      <div className='space-y-3'>
       <div className='bg-pink-500/20 p-3 rounded-xl'>❤️ 互选名单：01↔03，07↔12</div>
       <div className='bg-white/10 p-3 rounded-xl'>已提交人数：18</div>
       {stats.map(s=><div key={s.id} className='bg-white/10 p-3 rounded-xl'>{s.id}号 {s.votes}票</div>)}
      </div>
    </>}
   </div>
  </main>
 }
 return <main className='min-h-screen p-6 bg-gradient-to-b from-slate-950 to-blue-950 text-white'>
  <div className='max-w-md mx-auto'>
   <div className='text-center py-8 relative'>
    <button onClick={()=>setAdmin(true)} className='absolute right-0 top-0 bg-white/10 px-3 py-2 rounded-xl text-xs'>后台</button>
    <h1 className='text-3xl font-bold'>深蓝计划</h1>
    <p className='text-blue-200'>心动选择</p>
   </div>
   <div className='bg-white/10 p-5 rounded-2xl'>
    <input value={code} onChange={e=>setCode(e.target.value)} placeholder='请输入编号 如 01' className='w-full p-3 rounded-xl text-black mb-4'/>
    <div className='grid grid-cols-2 gap-3'>
      {guests.map((g,i)=><button key={g} onClick={()=>toggle(i)} className={`p-4 rounded-2xl ${selected.includes(i)?'bg-blue-500':'bg-white/10'}`}>👤<div>{g}号</div></button>)}
    </div>
    <div className='text-center mt-4 text-sm'>已选择 {selected.length}/3</div>
    <button onClick={()=>setSubmitted(true)} className='w-full mt-3 bg-emerald-500 py-4 rounded-2xl font-bold'>提交选择</button>
    {submitted && <div className='text-center mt-3 text-emerald-300'>提交成功</div>}
   </div>
  </div>
 </main>
}

// Deploy steps:
// 1. Create Next.js app
// 2. Replace app/page.tsx with this file
// 3. Push to GitHub
// 4. Import repo into Vercel
