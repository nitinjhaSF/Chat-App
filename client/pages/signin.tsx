import React from "react";
import { SignInForm } from "@/components/auth";
import { withOutUserLogin } from "@/lib/hoc";

function SignIn() {
  return <SignInForm />;
}

export default withOutUserLogin(SignIn);
