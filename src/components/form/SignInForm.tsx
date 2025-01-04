import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "사용자 이름은 2자 이상이어야 합니다.",
  }),
  password: z.string().min(6, {
    message: "비밀번호는 6자 이상이어야 합니다.",
  }),
});

const SignInForm = () => {
  const navigate = useNavigate();
  const auth = useAuth(); // useAuth를 컴포넌트 외부로 초기화
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // onSubmit 함수 최적화
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { username, password } = values;
    try {
      await auth.signIn(username, password);

      await navigate({
        to: "/dashboard",
      });
    } catch (error: unknown) {
      console.error("로그인 실패", error);
      setError("사용자 이름 또는 비밀번호가 잘못되었습니다.");
      return;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
          로그인
        </h2>
        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit(onSubmit)();
            }}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Username</FormLabel>
                  <FormControl>
                    <Input
                      className="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your username"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="mt-1 text-sm text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      className="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="mt-1 text-sm text-red-500" />
                </FormItem>
              )}
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Link
              to="/SignUp"
              className="flex justify-end text-sm text-gray-500"
            >
              회원가입
            </Link>

            <Button
              type="submit"
              className="w-full py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              로그인
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignInForm;
