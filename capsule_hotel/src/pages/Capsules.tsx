import Heading from "../ui/Heading";
import Row from "../ui/Row";

import { useEffect } from "react";
import { getCapsules } from "../services/apiCapsules";

function Capsules() {
  useEffect(function () {
    getCapsules().then((data) => console.log(data));
  }, []);

  return (
    <Row type="horizontal">
      <Heading as="h1">모든 방</Heading>
    </Row>
  );
}

export default Capsules;
