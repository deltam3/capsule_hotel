import Spinner from "../../ui/Spinner";
import CapsuleRow from "./CapsuleRow";
import { useCapsules } from "./useCapsules";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { Database } from "../../../database.types";
import { useSearchParams } from "react-router-dom";

function CapsuleTable() {
  const { isPending, capsules } = useCapsules();
  const [searchParams] = useSearchParams();

  if (isPending) return <Spinner />;

  const filterValue = searchParams.get("discount") || "all";
  let filteredCapsules;
  if (filterValue === "all") {
    filteredCapsules = capsules;
  }
  if (filterValue === "no-discount") {
    filteredCapsules = capsules.filter((capsule) => capsule.discount === 0);
  }
  if (filterValue === "with-discount") {
    filteredCapsules = capsules.filter((capsule) => capsule.discount > 0);
  }

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
          data={filteredCapsules}
          render={(capsule: Database["public"]["Tables"]["capsules"]) => (
            <CapsuleRow capsule={capsule} key={capsule.id} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default CapsuleTable;
