import { Database } from "../../database.types";
import supabase, { supabaseUrl } from "./supabase";

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

export async function createEditCapsule(
  newCapsule:
    | Database["public"]["Tables"]["capsules"]["Insert"]
    | Database["public"]["Tables"]["capsules"]["Update"],
  id: number
) {
  const hasImagePath = newCapsule.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCapsule.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCapsule.image
    : `${supabaseUrl}/storage/v1/object/public/capsule-images/${imageName}`;

  let query = supabase.from("capsules");

  if (!id) query = query.insert([{ ...newCapsule, image: imagePath }]);

  if (id)
    query = query.update({ ...newCapsule, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("캡슐 삭제 실패");
  }

  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("capsule-images")
    .upload(imageName, newCapsule.image);

  if (storageError) {
    await supabase.from("capsules").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error("새로운 캡슐 생성 실패");
  }

  return data;
}
