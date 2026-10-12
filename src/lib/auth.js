import { supabase } from "./supabase";

export async function signUp({ email, password, displayName, accountType, extras }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: displayName,
        account_type: accountType || "creative",
        ...extras,
      },
    },
  });
  if (error) return { error };
  if (data.user && data.user.identities && data.user.identities.length === 0) {
    return { error: { message: "An account with this email already exists." } };
  }
  return { data };
}

export async function logIn({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { data, error };

  if (data.user) {
    const meta = data.user.user_metadata || {};
    const updates = {};
    if (meta.display_name) updates.display_name = meta.display_name;
    if (meta.account_type) updates.account_type = meta.account_type;
    if (meta.agency_name) updates.agency_name = meta.agency_name;
    if (meta.agency_size) updates.agency_size = meta.agency_size;
    if (meta.craft) updates.craft = meta.craft;
    if (Object.keys(updates).length > 0) {
      await supabase.from("profiles").update(updates).eq("id", data.user.id);
    }
  }
  return { data, error };
}

export async function logOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

export async function getSession() {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

export async function getProfile() {
  const session = await getSession();
  if (!session) return null;
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", session.user.id)
    .single();
  return data;
}

export async function updateProfile(updates) {
  const session = await getSession();
  if (!session) return { error: { message: "Not logged in" } };
  const { data, error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", session.user.id)
    .select()
    .single();
  return { data, error };
}
