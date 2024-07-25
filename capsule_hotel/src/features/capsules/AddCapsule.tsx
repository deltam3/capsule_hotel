import Button from "../../ui/Button";
import CreateCapsuleForm from "./CreateCapsuleForm";
import Modal from "../../ui/Modal";

function AddCapsule() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="capsule-form">
          <Button>새로운 캡슐방 추가하기</Button>
        </Modal.Open>
        <Modal.Window name="capsule-form">
          <CreateCapsuleForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddCapsule;
