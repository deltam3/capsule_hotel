import styled from "styled-components";
import { useState } from "react";
import { formatCurrency } from "../../utils/helper";

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

const Capsule = styled.div`
  font-size: 1.6rem;
  font-family: "Rubik";
  font-weight: 600;
  color: var(--color-grey-600);
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

import { useDeleteCapsule } from "./useDeleteCapsule";
import { useCreateCapsule } from "./useCreateCapsule";

import Modal from "../../ui/Modal";
import CreateCapsuleForm from "./CreateCapsuleForm";
import ConfirmDelete from "../../ui/ConfirmDelete";

function CapsuleRow({ capsule }) {
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

  function handleDuplicate() {
    createCapsule({
      name: `${name} 복사본`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  }

  return (
    <>
      <TableRow role="row">
        <Img src={image} />
        <Capsule>{name}</Capsule>
        <div>최대인원 {maxCapacity}명</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <div>
          <button disabled={isCreating} onClick={handleDuplicate}>
            복사
          </button>
          <Modal>
            <Modal.Open opens="edit">
              <button onClick={() => setShowForm((show) => !show)}>수정</button>
            </Modal.Open>
            <Modal.Window name="edit">
              <CreateCapsuleForm capsuleToEdit={capsule}></CreateCapsuleForm>
            </Modal.Window>
            <Modal.Open opens="delete">
              <button>삭제</button>
            </Modal.Open>
            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="캡슐방"
                disabled={isDeleting}
                onConfirm={() => deleteCapsule(capsuleId)}
              />
            </Modal.Window>
          </Modal>
        </div>
      </TableRow>
    </>
  );
}

export default CapsuleRow;
