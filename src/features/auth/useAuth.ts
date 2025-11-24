// src/features/auth/useAuth.ts
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";

export const useAuth = () => {
  // Use correct localStorage key "expensepro_token"
  const token = localStorage.getItem("expensepro_token");
  const role = localStorage.getItem("role");
  
  // Also check Redux store as fallback
  const reduxToken = useSelector((s: RootState) => s.auth.token);
  const reduxUser = useSelector((s: RootState) => s.auth.user);
  
  const finalToken = token || reduxToken;
  const finalRole = (role || reduxUser?.role)?.toLowerCase() || null;
  
  console.log("useAuth check:", {
    localStorageToken: !!token,
    localStorageRole: role,
    reduxToken: !!reduxToken,
    reduxRole: reduxUser?.role,
    finalToken: !!finalToken,
    finalRole: finalRole,
    isAuthenticated: !!finalToken
  });

  return {
    isAuthenticated: !!finalToken,
    role: finalRole,
    token: finalToken
  };
};