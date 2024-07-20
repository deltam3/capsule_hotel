import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSetting";

function UpdateSettingsForm() {
  const {
    isPending,
    settings: {
      minReservationLength,
      maxReservationLength,
      maxCustomersPerReservation,
      mealPrice,
    } = {},
  } = useSettings();
  const { isUpdating, updateSetting } = useUpdateSetting();

  if (isPending) return <Spinner />;

  function handleUpdate(e, field) {
    const { value } = e.target;

    if (!value) return;
    updateSetting({ [field]: value });
  }

  return (
    <Form>
      <FormRow label="예약당 최소 숙박일">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minReservationLength}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "minReservationLength")}
        />
      </FormRow>

      <FormRow label="예약당 최대 숙박일">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxReservationLength}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "maxReservationLength")}
        />
      </FormRow>

      <FormRow label="예약당 최대 수용 인원">
        <Input
          type="number"
          id="max-customers"
          defaultValue={maxCustomersPerReservation}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "maxCustomersPerReservation")}
        />
      </FormRow>

      <FormRow label="식사 가격">
        <Input
          type="number"
          id="meal-price"
          defaultValue={mealPrice}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, "mealPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
