import styled from "styled-components";

import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import { useRecentStays } from "./useRecentStays";
import { useRecentReservations } from "./useRecentReservations";
import { useCapsules } from "../capsules/useCapsules";
import { Database } from "../../../database.types";

interface UseRecentReservationsResult {
  reservations: Database["public"]["Tables"]["reservations"][] | any;
  isPending: boolean;
}

interface UseRecentStaysResult {
  confirmedStays: Database["public"]["Tables"]["reservations"][] | any;
  isPending: boolean;
  numDays: number;
}

interface UseCapsulesResult {
  capsules: Database["public"]["Tables"]["capsules"][] | any;
  isPending: boolean;
}

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { reservations, isPending: isPending1 }: UseRecentReservationsResult =
    useRecentReservations();
  const {
    confirmedStays,
    isPending: isPending2,
    numDays,
  }: UseRecentStaysResult = useRecentStays();
  const { capsules, isPending: isPending3 }: UseCapsulesResult = useCapsules();

  if (isPending1 || isPending2 || isPending3) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        reservations={reservations}
        confirmedStays={confirmedStays}
        numDays={numDays}
        capsuleCount={capsules.length}
      />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
