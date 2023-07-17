import { SignUpForm } from "@/components/auth";
import { withOutUserLogin } from "@/lib/hoc";
import React from "react";

function SignUp() {
  return <SignUpForm />;
}

export default withOutUserLogin(SignUp);
