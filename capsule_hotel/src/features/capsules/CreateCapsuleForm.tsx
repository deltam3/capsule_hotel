import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useCreateCapsule } from "./useCreateCapsule";
import { useEditCapsule } from "./useEditCapsule";

function CreateCapsuleForm({ capsuleToEdit = {} }) {
  const { isCreating, createCapsule } = useCreateCapsule();
  const { isEditing, editCapsule } = useEditCapsule();
  const isWorking = isCreating || isEditing;

  const { id: editId, ...editValues } = capsuleToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession)
      editCapsule(
        { newCapsuleData: { ...data, image }, id: editId },
        {
          onSuccess: (data) => {
            reset();
          },
        }
      );
    else
      createCapsule(
        { ...data, image: image },
        {
          onSuccess: (data) => {
            reset();
          },
        }
      );
  }

  function onError(errors) {
    console.error(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="캡슐 이름" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "필수",
          })}
        />
      </FormRow>

      <FormRow label="최대 인원" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "필수",
            min: {
              value: 1,
              message: "최소 1이상",
            },
          })}
        />
      </FormRow>

      <FormRow label="정가" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "필수",
            min: {
              value: 1,
              message: "최소 1달러 이상",
            },
          })}
        />
      </FormRow>

      <FormRow label="할인 값" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register("discount", {
            required: "필수",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "할인 값은 정가보다 낮아야 합니다.",
          })}
        />
      </FormRow>

      <FormRow label="설명" error={errors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          disabled={isWorking}
          {...register("description", {
            required: "필수",
          })}
        />
      </FormRow>

      <FormRow label="캡슐 사진">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "필수",
          })}
        />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset">
          취소
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "캡슐 수정" : "새로운 캡슐 만들기"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCapsuleForm;
