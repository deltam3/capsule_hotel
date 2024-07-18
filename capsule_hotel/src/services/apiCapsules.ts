import supabase from "./supabase";

export async function getCapsules() {
  const { data: capsules, error } = await supabase
    .from("capsules")
    .select("id");

  if (error) {
    throw new Error("캡슐 방들 로딩 실패");
  }

  return capsules;
}
