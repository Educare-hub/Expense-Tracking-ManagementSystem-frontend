// import React, { useState } from "react";
// import { useVerifyEmailMutation } from "../../features/auth/authAPI";

// const VerifyEmail = () => {
//   const [email, setEmail] = useState("");
//   const [code, setCode] = useState("");
//   const [verify] = useVerifyEmailMutation();

//   const submit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     await verify({ email, code }).unwrap();
//   };

//   return (
//     <form onSubmit={submit} className="bg-white p-6 rounded shadow">
//       <h3 className="mb-4">Verify Email</h3>
//       <input required value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" className="w-full mb-2 p-2" />
//       <input required value={code} onChange={(e)=>setCode(e.target.value)} placeholder="Verification code" className="w-full mb-2 p-2" />
//       <button className="w-full p-2 bg-indigo-600 text-white rounded">Verify</button>
//     </form>
//   );
// };

// export default VerifyEmail;
