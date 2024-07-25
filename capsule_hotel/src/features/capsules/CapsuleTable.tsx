import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import CapsuleRow from "./CapsuleRow";
import { useCapsules } from "./useCapsules";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

function CapsuleTable() {
  const { isPending, capsules } = useCapsules();

  if (isPending) return <Spinner />;

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>캡슐</div>
          <div>인원</div>
          <div>가격</div>
          <div>할인 값</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={capsules}
          render={(capsule) => (
            <CapsuleRow capsule={capsule} key={capsule.id} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default CapsuleTable;
