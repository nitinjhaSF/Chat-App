//react hook form
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

//zod
import zod from "zod";

//ui components
import { DotLoaderButton, Form } from "@/components/ui";

//next link
import Link from "next/link";

//next router
import { useGlobalContext } from "@/components/contexts/GlobalContextProvider";
import { ApiRoutes } from "@/lib/constants";
import { APIPusher } from "@/lib/services";
import { useRouter } from "next/router";

//recoil
import { Google } from "../icons";

function SignInForm() {
  //context
  const { addToaster } = useGlobalContext();

  //router
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted, isSubmitSuccessful },
  } = useForm<IZodSignInType>({
    resolver: zodResolver(zodSignInValidation),
  });

  const onSubmit = async (payload: IZodSignInType) => {
    try {
      const newPayload = {
        ...payload,
        client_id: process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID,
        client_secret: process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_SECRET,
      };

      const userTokenDetails = await APIPusher(
        ApiRoutes.USER_LOGIN_ENDPOINT,
        newPayload
      );

      router.push(`/chat?code=${userTokenDetails.data.code}`);
      addToaster({
        kind: "success",
        description: "Sign In Successfully",
      });
    } catch (err: any) {
      addToaster({
        kind: "warning",
        description: err?.data?.message || "Something Went Wrong.",
      });
      throw err;
    }
  };

  const googleAuthHandler = async () => {
    try {
      const body = {
        client_id: process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID,
        client_secret: process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_SECRET,
      };

      const myform = document.createElement("form");

      myform.method = "POST";
      myform.action = ApiRoutes.GOOGLE_LOGIN_ENDPOINT;
      myform.style.display = "none";
      myform.append("Content-Type", "application/x-www-form-urlencoded");
      Object.keys(body).forEach((key) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;

        input.value = (body as any)[key];
        myform.appendChild(input);
      });
      document.body.appendChild(myform);
      myform.submit();
    } catch (err: any) {
      addToaster({
        kind: "warning",
        description: err.data.error.message,
      });
    }
  };

  return (
    <div className="flex flex-col py-8 items-center h-full">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-center">Welcome Back!</h1>
        <p className="text-gray-700 font-medium dark:text-gray-400">
          {"We're "}so excited to see you again!
        </p>
      </header>

      <form className="p-4 w-full sm:max-w-lg space-y-4">
        <Form.Group>
          <Form.Label isRequired>Username</Form.Label>
          <Form.Input errors={errors} register={register} name="username" />
        </Form.Group>

        <Form.Group>
          <Form.Label isRequired>Password</Form.Label>
          <Form.Input
            errors={errors}
            type="password"
            register={register}
            name="password"
          />
          <Link
            href="/forgot-password"
            className="text-blue-500 hover:underline text-sm mt-2"
          >
            Forgot your password?
          </Link>
        </Form.Group>

        <DotLoaderButton
          disabled={isSubmitting || isSubmitSuccessful}
          onClick={handleSubmit(onSubmit)}
          className="w-full"
        >
          Sign In
        </DotLoaderButton>

        <div
          className="flex rounded border border-gray-300 px-3 py-2 text-sm font-normal cursor-pointer hover:bg-gray-50"
          onClick={googleAuthHandler}
        >
          <Google width={20} height={20} />

          <div className="text-center flex-1">Sign in with Google</div>
        </div>
      </form>

      <footer>
        <p>
          Need an account?{" "}
          <Link href={"/signup"} className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </footer>
    </div>
  );
}

export default SignInForm;

type IZodSignInType = zod.infer<typeof zodSignInValidation>;

export const zodSignInValidation = zod.object({
  username: zod
    .string({
      required_error: "*This field is required. Please enter a valid value",
    })
    .min(1, "*This field is required. Please enter a valid value")
    .trim(),
  password: zod
    .string({
      required_error: "*This field is required. Please enter a valid value",
    })
    .min(8, "The password length can't be less than 8."),
});
