import { getToday } from "../utils/helpers";
import supabase from "./supabase";
import { PAGE_SIZE } from "../utils/constants";

interface Filter {
  method?: "eq" | "neq" | "gt" | "gte" | "lt" | "lte";
  field: string;
  value: any;
}

interface SortBy {
  field: string;
  direction: "asc" | "desc";
}

interface ReservationsParams {
  filter?: Filter | null;
  sortBy?: SortBy;
  page?: number;
}

interface Reservation {
  id: number;
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numCustomers: number;
  status: string;
  totalPrice: number;
  capsules: { name: string };
  customers: { fullName: string; email: string };
}

export async function getReservations({
  filter,
  sortBy,
  page,
}: ReservationsParams): Promise<{
  data: Reservation[] | null;
  count: number | null;
}> {
  let query = supabase
    .from("reservations")
    .select(
      "id, created_at, startDate, endDate, numNights, numCustomers, status, totalPrice, capsules(name), customers(fullName, email)",
      { count: "exact" }
    );

  if (filter) {
    query = query[filter.method || "eq"](filter.field, filter.value);
  }

  if (sortBy) {
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });
  }

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("예약 가져오기 실패");
  }

  return { data, count };
}

export async function getReservation(id: number): Promise<Reservation | null> {
  const { data, error } = await supabase
    .from("reservations")
    .select("*, capsules(*), customers(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("예약 가져오기 실패");
  }

  return data;
}

export async function getReservationsAfterDate(
  date: string
): Promise<Reservation[] | null> {
  const { data, error } = await supabase
    .from("reservations")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("예약 가져오기 실패");
  }

  return data;
}

export async function getStaysAfterDate(
  date: string
): Promise<Reservation[] | null> {
  const { data, error } = await supabase
    .from("reservations")
    .select("*, customers(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("예약 가져오기 실패");
  }

  return data;
}

interface UpdateReservationParams {
  [key: string]: any;
}

export async function updateReservation(
  id: number,
  obj: UpdateReservationParams
): Promise<Reservation | null> {
  const { data, error } = await supabase
    .from("reservations")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("예약 수정 실패");
  }

  return data;
}

export async function deleteReservation(
  id: number
): Promise<Reservation | null> {
  const { data, error } = await supabase
    .from("reservations")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("예약 삭제 실패");
  }

  return data;
}
