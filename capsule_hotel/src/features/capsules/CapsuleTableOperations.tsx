import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";

function CapsuleTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "전체" },
          { value: "no-discount", label: "할인 없는 방만" },
          { value: "with-discount", label: "할인 있는 방만" },
        ]}
      />
    </TableOperations>
  );
}

export default CapsuleTableOperations;
