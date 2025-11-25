// import React, { useState } from "react";
// import { useRegisterMutation } from "../../features/auth/authAPI";
// const Register = () => {
//   const [register] = useRegisterMutation();
//   const [form, setForm] = useState({ name: "", email: "", password: "" });
//   const submit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     await register(form).unwrap();
//   };
//   return (
//     <form onSubmit={submit} className="bg-white p-6 rounded shadow">
//       <h3 className="mb-4">Register</h3>
//       <input required value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})} placeholder="Name" className="w-full mb-2 p-2" />
//       <input required value={form.email} onChange={(e)=>setForm({...form, email:e.target.value})} placeholder="Email" className="w-full mb-2 p-2" />
//       <input required type="password" value={form.password} onChange={(e)=>setForm({...form, password:e.target.value})} placeholder="Password" className="w-full mb-2 p-2" />
//       <button className="w-full p-2 bg-green-600 text-white rounded">Register</button>
//     </form>
//   );
// };
// export default Register;
