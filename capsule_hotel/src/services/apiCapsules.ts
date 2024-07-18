import supabase from "./supabase";

export async function getCapsules() {
  const { data: capsules, error } = await supabase.from("capsules").select("*");

  if (error) {
    throw new Error("캡슐 방들 로딩 실패");
  }

  return capsules;
}

export async function deleteCapsule(id: number) {
  const { data, error } = await supabase.from("capsules").delete().eq("id", id);

  if (error) {
    throw new Error("캡슐 방을 삭제할 수 없었습니다.");
  }

  return data;
}
