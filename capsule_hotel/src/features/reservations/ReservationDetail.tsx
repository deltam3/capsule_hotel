import styled from "styled-components";

import ReservationDataBox from "./ReservationDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function ReservationDetail() {
  const reservation = {};
  const status = "checked-in";

  const moveBack = useMoveBack();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">예약 번호</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; 뒤로가기</ButtonText>
      </Row>

      <ReservationDataBox reservation={reservation} />

      <ButtonGroup>
        <Button variation="secondary" onClick={moveBack}>
          뒤로가기
        </Button>
      </ButtonGroup>
    </>
  );
}

export default ReservationDetail;
