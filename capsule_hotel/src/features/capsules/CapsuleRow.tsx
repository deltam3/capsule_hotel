import styled from "styled-components";
import { useState } from "react";
import { formatCurrency } from "../../utils/helper";
import Modal from "../../ui/Modal";
import CreateCapsuleForm from "./CreateCapsuleForm";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useDeleteCapsule } from "./useDeleteCapsule";
import { useCreateCapsule } from "./useCreateCapsule";

interface Capsule {
  id: string;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount?: number;
  image: string;
  description: string;
}

const TableRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  padding: 1.4rem 2.4rem;
  column-gap: 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  transform: scale(1.5) translateX(-7px);
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
`;

const CapsuleName = styled.div`
  font-size: 1.6rem;
  font-family: "Rubik";
  font-weight: 600;
  color: var(--color-grey-600);
`;

const Detail = styled.div`
  font-size: 1.4rem;
`;

const Price = styled.div`
  font-family: "Rubik";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Rubik";
  font-weight: 500;
  color: var(--color-green-700);
`;

interface CapsuleRowProps {
  capsule: Capsule;
}

const CapsuleRow: React.FC<CapsuleRowProps> = ({ capsule }) => {
  const { isCreating, createCapsule } = useCreateCapsule();
  const { isDeleting, deleteCapsule } = useDeleteCapsule();

  const {
    id: capsuleId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
  } = capsule;

  const handleDuplicate = () => {
    createCapsule({
      name: `${name} 복사본`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  };

  return (
    <TableRow role="row">
      <Img src={image} />
      <CapsuleName>{name}</CapsuleName>
      <Detail>최대인원 {maxCapacity}명</Detail>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={capsuleId} />

            <Menus.List id={capsuleId}>
              <Menus.Button icon={<HiSquare2Stack />} onClick={handleDuplicate}>
                복사
              </Menus.Button>

              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>편집</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>삭제</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="edit">
              <CreateCapsuleForm capsuleToEdit={capsule} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="캡슐방"
                disabled={isDeleting}
                onConfirm={() => deleteCapsule(+capsuleId)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </TableRow>
  );
};

export default CapsuleRow;
