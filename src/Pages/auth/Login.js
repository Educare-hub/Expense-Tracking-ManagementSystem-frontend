// import React, { useState } from "react";
// import { useLoginMutation } from "../../features/auth/authAPI";
// import { useDispatch } from "react-redux";
// import { setAuthSuccess } from "../../features/auth/authSlice";
// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [login] = useLoginMutation();
//   const dispatch = useDispatch();
//   const submit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const resp = await login({ email, password }).unwrap();
//     if (resp?.token) {
//       dispatch(setAuthSuccess({ token: resp.token, user: resp.user }));
//       localStorage.setItem("expensepro_token", resp.token);
//     }
//   };
//   return (
//     <form onSubmit={submit} className="bg-white p-6 rounded shadow">
//       <h3 className="mb-4">Login</h3>
//       <input required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full mb-2 p-2" />
//       <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full mb-2 p-2" />
//       <button className="w-full p-2 bg-blue-600 text-white rounded">Login</button>
//     </form>
//   );
// };
// export default Login;
