import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useUpdateUser } from "./useUpdateUser";

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;

  const { updateUser, isUpdating } = useUpdateUser();

  function onSubmit({ password }) {
    updateUser({ password }, { onSuccess: reset });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label="새로운 비밀번호 (최소 8글자)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={isUpdating}
          {...register("password", {
            required: "필수 입력",
            minLength: {
              value: 8,
              message: "최소 8글자입니다.",
            },
          })}
        />
      </FormRow>

      <FormRow label="비밀번호 재확인" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          autoComplete="new-password"
          id="passwordConfirm"
          disabled={isUpdating}
          {...register("passwordConfirm", {
            required: "필수 입력",
            validate: (value) =>
              getValues().password === value || "비밀번호가 동일해야 합니다.",
          })}
        />
      </FormRow>
      <FormRow>
        <Button onClick={reset} type="reset" variation="secondary">
          취소
        </Button>
        <Button disabled={isUpdating}>비밀번호 수정</Button>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;
