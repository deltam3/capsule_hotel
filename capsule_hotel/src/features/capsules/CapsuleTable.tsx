import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import CapsuleRow from "./CapsuleRow";
import { useCapsules } from "./useCapsules";

const Table = styled.div`
  overflow: hidden;
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: 7px;
`;
const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  padding: 1.6rem 2.4rem;
`;

function CapsuleTable() {
  const { isPending, capsules } = useCapsules();

  if (isPending) return <Spinner />;

  return (
    <Table role="table">
      <TableHeader role="row">
        <div></div>
        <div>캡슐</div>
        <div>인원</div>
        <div>가격</div>
        <div>할인 값</div>
        <div></div>
      </TableHeader>
      {capsules.map((capsule) => (
        <CapsuleRow capsule={capsule} key={capsule.id} />
      ))}
    </Table>
  );
}

export default CapsuleTable;
