import Filter from "../../ui/Filter";

function DashboardFilter() {
  return (
    <Filter
      filterField="last"
      options={[
        { value: "7", label: "지난 7일" },
        { value: "30", label: "지난 30일" },
        { value: "90", label: "지난 90일" },
      ]}
    />
  );
}

export default DashboardFilter;
