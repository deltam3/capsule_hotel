import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

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
      <SortBy
        options={[
          { value: "name-asc", label: "이름순으로 정렬" },
          { value: "name-desc", label: "역이름순으로 정렬" },
          {
            value: "regularPrice-asc",
            label: "가격으로 정렬 (낮은 가격 우선)",
          },
          {
            value: "regularPrice-desc",
            label: "가격으로 정렬 (높은 가격 우선)",
          },
          {
            value: "maxCapacity-asc",
            label: "최대인원으로 정렬 (낮은 인원 우선)",
          },
          {
            value: "maxCapacity-desc",
            label: "최대인원으로 정렬 (높은 인원 우선)",
          },
        ]}
      />
    </TableOperations>
  );
}

export default CapsuleTableOperations;
