type resourceType = {
  resourceName: string;
};

function Empty({ resourceName }: resourceType) {
  return <p>{resourceName}이 발견되지 않았습니다.</p>;
}

export default Empty;
