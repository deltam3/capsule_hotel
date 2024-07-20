import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Settings() {
  return (
    <Row>
      <Heading as="h1">관리자 설정 변경하기</Heading>
      <UpdateSettingsForm />
    </Row>
  );
}

export default Settings;
