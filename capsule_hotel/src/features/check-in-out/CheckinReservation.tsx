import styled from "styled-components";
import ReservationDataBox from "../../features/reservations/ReservationDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useReservation } from "../reservations/useReservation";
import { useEffect, useState } from "react";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinReservation() {
  const [confirmPaid, setConfirmPaid] = useState<boolean>(false);
  const [addMeal, setAddMeal] = useState<boolean>(false);
  const { reservation, isPending } = useReservation();
  const { settings, isPending: isPendingSettings } = useSettings();

  useEffect(() => {
    setConfirmPaid(reservation?.isPaid ?? false);
  }, [reservation]);

  const moveBack = useMoveBack();
  const { checkin, isCheckingIn } = useCheckin();

  if (isPending || isPendingSettings) return <Spinner />;

  if (!reservation || !settings) return null;

  const {
    id: reservationId,
    customers,
    totalPrice,
    numCustomers,
    hasMeal,
    numNights,
  } = reservation;

  const optionalMealPrice = settings.mealPrice * numNights * numCustomers;

  function handleCheckin() {
    if (!confirmPaid) return;

    if (addMeal) {
      checkin({
        reservationId,
        meal: {
          hasMeal: true,
          extrasPrice: optionalMealPrice,
          totalPrice: totalPrice + optionalMealPrice,
        },
      });
    } else {
      checkin({ reservationId, meal: {} });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">예약번호 #{reservationId} 체크인하기</Heading>
        <ButtonText onClick={moveBack}>&larr; 뒤로가기</ButtonText>
      </Row>

      <ReservationDataBox reservation={reservation} />

      {!hasMeal && (
        <Box>
          <Checkbox
            checked={addMeal}
            onChange={() => {
              setAddMeal((prev) => !prev);
              setConfirmPaid(false);
            }}
            id="meal"
          >
            손님이 식사를 {formatCurrency(optionalMealPrice)}에
            추가하시겠습니까?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((prev) => !prev)}
          disabled={confirmPaid || isCheckingIn}
          id="confirm"
        >
          나는 손님 {customers.fullName}님이{" "}
          {!addMeal
            ? formatCurrency(totalPrice)
            : `${formatCurrency(
                totalPrice + optionalMealPrice
              )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalMealPrice
              )})`}
          을 지불했음을 확인했습니다.
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
          예약번호 #{reservationId} 체크인하기
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          뒤로가기
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinReservation;
