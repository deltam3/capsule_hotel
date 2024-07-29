import React from "react";
import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

const ReservationTableOperations: React.FC = () => {
  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={[
          { value: "all", label: "전체" },
          { value: "checked-out", label: "체크아웃" },
          { value: "checked-in", label: "체크인" },
          { value: "unconfirmed", label: "미확인" },
        ]}
      />

      <SortBy
        options={[
          { value: "startDate-desc", label: "날짜별 정렬 (최근 항목 먼저)" },
          { value: "startDate-asc", label: "날짜별 정렬 (과거 항목 먼저)" },
          { value: "totalPrice-desc", label: "큰 금액 순으로 정렬" },
          { value: "totalPrice-asc", label: "작은 금액 순으로 정렬" },
        ]}
      />
    </TableOperations>
  );
};

export default ReservationTableOperations;
