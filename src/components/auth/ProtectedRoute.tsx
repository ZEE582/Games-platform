import React from "react";
import { Navigate } from "react-router-dom";

type Props = {
  isAllowed: boolean;
  redirectTo?: string;
  children: React.ReactNode;
};

export default function ProtectedRoute({
  isAllowed,
  redirectTo = "/login",
  children,
}: Props) {
  if (!isAllowed) return <Navigate to={redirectTo} replace />;
  return <>{children}</>;
}
