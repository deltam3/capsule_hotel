import { getToday } from "../utils/helpers";
import supabase from "./supabase";

export async function getReservations() {
  const { data, error } = await supabase.from("reservations").select("*");

  if (error) {
    console.error(error);
    throw new Error("예약 가져오기 실패");
  }

  return data;
}

export async function getReservation(id) {
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

export async function getReservationsAfterDate(date) {
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

export async function getStaysAfterDate(date) {
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

export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("reservations")
    .select("*, customers(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  if (error) {
    console.error(error);
    throw new Error("예약 가져오기 실패");
  }
  return data;
}

export async function updateReservation(id, obj) {
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

export async function deleteReservation(id) {
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
