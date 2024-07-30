import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Account() {
  return (
    <>
      <Heading as="h1">계정 업데이트하기</Heading>

      <Row>
        <Heading as="h3">사용자 정보 업데이트하기</Heading>
        <UpdateUserDataForm />
      </Row>

      <Row>
        <Heading as="h3">사용자 비밀번호 업데이트하기</Heading>
        <UpdatePasswordForm />
      </Row>
    </>
  );
}

export default Account;
