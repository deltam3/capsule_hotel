import Heading from "../ui/Heading";
import Row from "../ui/Row";

import CapsuleTable from "../features/capsules/CapsuleTable";
import AddCapsule from "../features/capsules/AddCapsule";
import CapsuleTableOperations from "../features/capsules/CapsuleTableOperations";

function Capsules() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">모든 캡슐 방</Heading>
        {/* <span>정렬/필터</span> */}
        <CapsuleTableOperations />
      </Row>

      <Row>
        <CapsuleTable />
        <AddCapsule />
      </Row>
    </>
  );
}

export default Capsules;
