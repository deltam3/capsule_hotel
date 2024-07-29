import styled from "styled-components";
import ReservationDataBox from "./ReservationDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useReservation } from "./useReservation";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { HiArrowUpOnSquare } from "react-icons/hi2";
import { useCheckout } from "../check-in-out/useCheckout";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteReservation } from "./useDeleteReservation";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

type ReservationStatus = "unconfirmed" | "checked-in" | "checked-out";

function ReservationDetail() {
  const { reservation, isPending } = useReservation();
  const { checkout, isCheckingOut } = useCheckout();
  const { deleteReservation, isDeleting } = useDeleteReservation();

  const moveBack = useMoveBack();
  const navigate = useNavigate();

  if (isPending) return <Spinner />;
  if (!reservation) return <Empty resourceName="예약" />;

  const { status, id: reservationId } = reservation;

  const statusToTagName: Record<ReservationStatus, string> = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">예약번호 #{reservationId}</Heading>
          <Tag type={statusToTagName[status]}>
            {status === "unconfirmed" && "미확인"}
            {status === "checked-in" && "체크인"}
            {status === "checked-out" && "체크아웃"}
          </Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; 뒤로가기</ButtonText>
      </Row>

      <ReservationDataBox reservation={reservation} />

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${reservationId}`)}>
            체크인하기
          </Button>
        )}

        {status === "checked-in" && (
          <Button
            icon={<HiArrowUpOnSquare />}
            onClick={() => checkout(reservationId)}
            disabled={isCheckingOut}
          >
            체크아웃하기
          </Button>
        )}

        <Modal>
          <Modal.Open opens="delete">
            <Button variation="danger">예약 삭제</Button>
          </Modal.Open>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="예약"
              disabled={isDeleting}
              onConfirm={() =>
                deleteReservation(reservationId, {
                  onSettled: () => navigate(-1),
                })
              }
            />
          </Modal.Window>
        </Modal>

        <Button variation="secondary" onClick={moveBack}>
          뒤로가기
        </Button>
      </ButtonGroup>
    </>
  );
}

export default ReservationDetail;
