import Heading from "../ui/Heading";
import Row from "../ui/Row";

import CapsuleTable from "../features/capsules/CapsuleTable";

import { useState } from "react";
import Button from "../ui/Button";
import CreateCapsuleForm from "../features/capsules/CreateCapsuleForm";

function Capsules() {
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">모든 캡슐 방</Heading>
        <span>정렬/필터</span>
      </Row>

      <Row>
        <CapsuleTable />
        <Button onClick={() => setShowForm((show) => !show)}>
          새로운 캡슐 방 추가하기
        </Button>
        {showForm && <CreateCapsuleForm />}
      </Row>
    </>
  );
}

export default Capsules;
