import {useState} from "react"
import SimpleSwitch from "../Components/SimpleSwitch"

const AddUsers = () => {
  const [enabled, setEnabled] = useState(false)
  return (
    <div className="m-3.5">
      <div>
        <h1 className="font-bold text-2xl">CREATE USER</h1>
        <h3 className="mt-3">Add a new user</h3>
      </div>

      <div className="flex mt-10 gap-5 items-center">
        <input type="text" className="border p-2.5 w-full text-sm" placeholder="Username" />
        <input type="email" className="border p-2.5 w-full text-sm" placeholder="Email" />
        <input type="password" className="border p-2.5 w-full text-sm" placeholder="Password" />
        <SimpleSwitch enabled={enabled} setEnabled={setEnabled} /><span>Admin</span>
      </div>

      <div className="justify-self-center mt-10">
        <button className="bg-green-600 text-white text-sm p-2 rounded-sm cursor-pointer">
          CREATE NEW USER
        </button>
      </div>
    </div>
  )
}

export default AddUsers