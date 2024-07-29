import styled from "styled-components";
import { format, isToday } from "date-fns";
import Tag from "../../ui/Tag";
import Table from "../../ui/Table";
import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";
import ConfirmDelete from "../../ui/ConfirmDelete";
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiTrash,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteReservation } from "./useDeleteReservation";

const Capsule = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Montserrat";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Rubik";
  font-weight: 500;
`;

interface Reservation {
  id: string;
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numCustomers: number;
  totalPrice: number;
  status: "unconfirmed" | "checked-in" | "checked-out";
  customers: {
    fullName: string;
    email: string;
  };
  capsules: {
    name: string;
  };
}

interface ReservationRowProps {
  reservation: Reservation;
}

function ReservationRow({ reservation }: ReservationRowProps) {
  const navigate = useNavigate();
  const { checkout, isCheckingOut } = useCheckout();
  const { deleteReservation, isDeleting } = useDeleteReservation();

  const statusToTagName: Record<Reservation["status"], string> = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <Table.Row>
      <Capsule>{reservation.capsules.name}</Capsule>

      <Stacked>
        <span>{reservation.customers.fullName}</span>
        <span>{reservation.customers.email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(reservation.startDate))
            ? "오늘"
            : formatDistanceFromNow(reservation.startDate)}{" "}
          &rarr; {reservation.numNights}일 숙박 예정
        </span>
        <span>
          {format(new Date(reservation.startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(reservation.endDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[reservation.status]}>
        {reservation.status === "unconfirmed" && "미확인"}
        {reservation.status === "checked-in" && "체크인"}
        {reservation.status === "checked-out" && "체크아웃"}
      </Tag>

      <Amount>{formatCurrency(reservation.totalPrice)}</Amount>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={reservation.id} />
          <Menus.List id={reservation.id}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/reservations/${reservation.id}`)}
            >
              자세히 보기
            </Menus.Button>

            {reservation.status === "unconfirmed" && (
              <Menus.Button
                icon={<HiArrowDownOnSquare />}
                onClick={() => navigate(`/checkin/${reservation.id}`)}
              >
                체크인하기
              </Menus.Button>
            )}

            {reservation.status === "checked-in" && (
              <Menus.Button
                icon={<HiArrowUpOnSquare />}
                onClick={() => checkout(reservation.id)}
                disabled={isCheckingOut}
              >
                체크아웃하기
              </Menus.Button>
            )}

            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />}>예약 삭제</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName="예약"
            disabled={isDeleting}
            onConfirm={() => deleteReservation(reservation.id)}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default ReservationRow;
