import styled from "styled-components";

import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Logo from "../../ui/Logo";
import { useReservations } from "../reservations/useReservations";
import Spinner from "../../ui/Spinner";

const StyledMotivate = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  grid-column: 1 / span 2;
  padding-top: 2.4rem;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 3rem;
  text-align: center;
`;

function Motivate() {
  const { isPending, count } = useReservations();
  return (
    <StyledMotivate>
      <Row type="horizontal">
        <Heading as="h2">총 예약 기록 수</Heading>
      </Row>

      <StyledContainer>
        <Logo admin={false} />
        <StyledContainer>
          {isPending ? (
            <Spinner />
          ) : (
            <Heading as="h1">{count}번의 예약</Heading>
          )}
        </StyledContainer>
      </StyledContainer>
    </StyledMotivate>
  );
}

export default Motivate;
