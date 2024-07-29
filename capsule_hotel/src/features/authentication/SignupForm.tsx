import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignup } from "./useSignup";

interface SignupFormValues {
  fullName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

function SignupForm() {
  const { signup, isPending } = useSignup();
  const { register, formState, getValues, handleSubmit, reset } =
    useForm<SignupFormValues>();
  const { errors } = formState;

  const onSubmit: SubmitHandler<SignupFormValues> = ({
    fullName,
    email,
    password,
  }) => {
    signup(
      { fullName, email, password },
      {
        onSettled: () => reset(),
      }
    );
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="이름" error={errors.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isPending}
          {...register("fullName", { required: "필수 입력" })}
        />
      </FormRow>

      <FormRow label="이메일" error={errors.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isPending}
          {...register("email", {
            required: "필수 입력",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "올바른 이메일 주소를 입력해주세요.",
            },
          })}
        />
      </FormRow>

      <FormRow label="비밀번호 (최소 8글자)" error={errors.password?.message}>
        <Input
          type="password"
          id="password"
          disabled={isPending}
          {...register("password", {
            required: "필수 입력",
            minLength: {
              value: 8,
              message: "최소 8글자 입력해주세요.",
            },
          })}
        />
      </FormRow>

      <FormRow label="비밀번호 재입력" error={errors.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isPending}
          {...register("passwordConfirm", {
            required: "필수 입력",
            validate: (value) =>
              value === getValues().password || "비밀번호가 같지 않습니다.",
          })}
        />
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          disabled={isPending}
          onClick={() => reset()}
        >
          취소
        </Button>
        <Button disabled={isPending}>새로운 직원 계정 생성하기</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
