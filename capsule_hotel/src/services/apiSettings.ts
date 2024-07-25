import { Database } from "../../database.types";
import supabase from "./supabase";

export async function getSettings() {
  const { data, error } = await supabase.from("settings").select("*").single();

  if (error) {
    console.error(error);
    throw new Error("설정 로딩 실패");
  }
  return data;
}

export async function updateSetting(
  newSetting: Database["public"]["Tables"]["settings"]["Update"]
) {
  const { data, error } = await supabase
    .from("settings")
    .update(newSetting)
    .eq("id", 1)
    .single();

  if (error) {
    console.error(error);
    throw new Error("설정 업데이트 실패");
  }
  return data;
}
