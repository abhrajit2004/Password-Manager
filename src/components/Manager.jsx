import React from 'react'
import { useState, useRef, useEffect } from 'react'

const Manager = () => {
    const ref = useRef()
    const [form, setForm] = useState({site: "", username: "", password: ""})
    const [passwordArray, setPasswordArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if(passwords){
          setPasswordArray(JSON.parse(passwords))
        }
    }, [])
    

    const showPassword = ()=>{
        if(ref.current.src.includes("icons/eyecross.svg")){
            ref.current.src = "icons/eye.svg"
        }
        else{
            ref.current.src = "icons/eyecross.svg"
        }
    }

    const handleChange = (e) => {
      setForm({...form, [e.target.name]: e.target.value})
    }

    const savePassword = () => {
      setPasswordArray([...passwordArray, form])
      localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]))
      console.log([...passwordArray, form])
    }
    
    

  return (
    <>
      <div className= "bg-green-50 min-h-screen">
     <div className="mycontainer">
        <h1 className='text-4xl font-bold text-center'>
        <span className='text-green-500'>&lt;</span>
            Pass
            <span className='text-green-500'>OP/&gt;</span>
        </h1>
        <p className='text-green-900 text-lg text-center'>Your own Password Manager</p>

        <div className="flex flex-col p-4 gap-8 items-center">
        <input value={form.site} onChange={handleChange} placeholder='Enter website URL' className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name="site" id="" />
          <div className="flex w-full justify-between gap-8">
          <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name="username" id="" />

          <div className="relative">
          <input value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name="password" id="" />
          <span className='absolute right-0 top-0 cursor-pointer' onClick={showPassword}>
            <img ref={ref} className='p-1' width={35} src="icons/eye.svg" alt="" />
          </span>
          </div>

          </div>

          <button onClick={savePassword} className='flex justify-center items-center gap-2 bg-green-400 hover:bg-green-300 rounded-full px-8 py-2 w-fit border border-green-900'>
         <lord-icon
            src="https://cdn.lordicon.com/jgnvfzqg.json"
            trigger="hover">
        </lord-icon>
          Add Password
        </button>
        </div>

            <div className="passwords">
                <h2 className='font-bold text-xl py-2'>Your Passwords</h2>
                {passwordArray.length === 0 && <div>No passwords to show</div>}
                {passwordArray.length != 0 &&
                <table className="table-auto w-full rounded-md overflow-hidden">
                    <thead className='bg-green-800 text-white'>
                    <tr>
                    <th className='py-2'>Site</th>
                    <th className='py-2'>Username</th>
                    <th className='py-2'>Password</th>
                    </tr>
                    </thead>
                   <tbody className='bg-green-100'>
                    {passwordArray.map((item, index)=>{
                      return <tr key={index}>
                        <td className='py-2 border border-white text-center w-32'><a href={item.site} target='_blank'>{item.site}</a></td>
                        <td className='py-2 border border-white text-center w-32'>{item.username}</td>
                        <td className='py-2 border border-white text-center w-32'>{item.password}</td>
                      </tr>
                     })}
                </tbody>
                </table>}
            </div>

     </div>
     </div>
     </>
  )
}

export default Manager