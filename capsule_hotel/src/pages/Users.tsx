import SignupForm from "../features/authentication/SignupForm";
import Heading from "../ui/Heading";

function NewUsers() {
  return (
    <>
      <Heading as="h1">새로운 직원 계정 만들기</Heading>
      <SignupForm />
    </>
  );
}

export default NewUsers;
