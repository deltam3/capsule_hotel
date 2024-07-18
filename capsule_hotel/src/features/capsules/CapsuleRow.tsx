import styled from "styled-components";

import { formatCurrency } from "../../utils/helper";
import { deleteCapsule } from "../../services/apiCapsules";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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

function CapsuleRow({ capsule }) {
  const {
    id: capsuleId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
  } = capsule;

  const queryClient = useQueryClient();
  const { isPending: isDeleting, mutate } = useMutation({
    mutationFn: (id: number) => deleteCapsule(id),
    onSuccess: () => {
      alert("캡슐 삭제 완료");

      queryClient.invalidateQueries({
        queryKey: ["capsules"],
      });
    },
    onError: (err) => alert(err.message),
  });

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
          <button onClick={() => mutate(capsuleId)} disabled={isDeleting}>
            삭제
          </button>
        </div>
      </TableRow>
    </>
  );
}

export default CapsuleRow;
