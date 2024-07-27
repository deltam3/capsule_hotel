import React from "react";
import styled from "styled-components";
import { format, isToday } from "date-fns";
import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
} from "react-icons/hi2";

import DataItem from "../../ui/DataItem";
import { Flag } from "../../ui/Flag";
import { formatDistanceFromNow, formatCurrency } from "../../utils/helpers";

interface Reservation {
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numCustomers: number;
  capsulePrice: number;
  extrasPrice: number;
  totalPrice: number;
  hasMeal: boolean;
  observations?: string;
  isPaid: boolean;
  customers: {
    fullName: string;
    email: string;
    country: string;
    countryFlag?: string;
    nationalID: string;
  };
  capsules: {
    name: string;
  };
}

const StyledReservationDataBox = styled.section`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  overflow: hidden;
`;

const Header = styled.header`
  background-color: var(--color-brand-500);
  padding: 2rem 4rem;
  color: #e0e7ff;
  font-size: 1.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    height: 3.2rem;
    width: 3.2rem;
  }

  & div:first-child {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    font-weight: 600;
    font-size: 1.8rem;
  }

  & span {
    font-family: "Rubik";
    font-size: 2rem;
    margin-left: 4px;
  }
`;

const Section = styled.section`
  padding: 3.2rem 4rem 1.2rem;
`;

const Customer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 1.6rem;
  color: var(--color-grey-500);

  & p:first-of-type {
    font-weight: 500;
    color: var(--color-grey-700);
  }
`;

const Price = styled.div<{ isPaid: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem 3.2rem;
  border-radius: var(--border-radius-sm);
  margin-top: 2.4rem;

  background-color: ${(props) =>
    props.isPaid ? "var(--color-green-100)" : "var(--color-yellow-100)"};
  color: ${(props) =>
    props.isPaid ? "var(--color-green-700)" : "var(--color-yellow-700)"};

  & p:last-child {
    text-transform: uppercase;
    font-size: 1.4rem;
    font-weight: 600;
  }

  svg {
    height: 2.4rem;
    width: 2.4rem;
    color: currentColor !important;
  }
`;

const Footer = styled.footer`
  padding: 1.6rem 4rem;
  font-size: 1.2rem;
  color: var(--color-grey-500);
  text-align: right;
`;

interface ReservationDataBoxProps {
  reservation: Reservation;
}

const ReservationDataBox: React.FC<ReservationDataBoxProps> = ({
  reservation,
}) => {
  const {
    created_at,
    startDate,
    endDate,
    numNights,
    numCustomers,
    capsulePrice,
    extrasPrice,
    totalPrice,
    hasMeal,
    observations,
    isPaid,
    customers: {
      fullName: customerName,
      email,
      country,
      countryFlag,
      nationalID,
    },
    capsules: { name: capsuleName },
  } = reservation;

  return (
    <StyledReservationDataBox>
      <Header>
        <div>
          <HiOutlineHomeModern />
          <p>
            {numNights}일 숙박 예정 <span>{capsuleName}</span>
          </p>
        </div>

        <p>
          {format(new Date(startDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startDate))
            ? "오늘"
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
        </p>
      </Header>

      <Section>
        <Customer>
          {countryFlag && <Flag src={countryFlag} alt={`${country} 국가`} />}
          <p>
            {customerName}{" "}
            {numCustomers > 1 ? `+ ${numCustomers - 1} customers` : ""}
          </p>
          <span>&bull;</span>
          <p>{email}</p>
          <span>&bull;</span>
          <p>주민번호: {nationalID}</p>
        </Customer>

        {observations && (
          <DataItem
            icon={<HiOutlineChatBubbleBottomCenterText />}
            label="특이사항"
          >
            {observations}
          </DataItem>
        )}

        <DataItem icon={<HiOutlineCheckCircle />} label="식사 포함 여부">
          {hasMeal ? "Yes" : "No"}
        </DataItem>

        <Price isPaid={isPaid}>
          <DataItem icon={<HiOutlineCurrencyDollar />} label={`Total price`}>
            {formatCurrency(totalPrice)}

            {hasMeal &&
              ` (${formatCurrency(capsulePrice)} 숙박 비용 + ${formatCurrency(
                extrasPrice
              )} 식사 가격)`}
          </DataItem>

          <p>{isPaid ? "이미 결제" : "도착시 결제 예정"}</p>
        </Price>
      </Section>

      <Footer>
        <p>{format(new Date(created_at), "EEE, MMM dd yyyy, p")} 예약</p>
      </Footer>
    </StyledReservationDataBox>
  );
};

export default ReservationDataBox;
