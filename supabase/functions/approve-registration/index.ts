import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

function generatePassword(length = 12): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$%";
  let password = "";
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  for (let i = 0; i < length; i++) {
    password += chars[array[i] % chars.length];
  }
  return password;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Verify caller is admin
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("Not authenticated");

    const token = authHeader.replace("Bearer ", "");
    const { data: { user: caller } } = await supabaseAdmin.auth.getUser(token);
    if (!caller) throw new Error("Invalid token");

    const { data: roleData } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", caller.id)
      .eq("role", "admin")
      .maybeSingle();

    if (!roleData) throw new Error("Not authorized - admin only");

    const { registrationId, manualPassword } = await req.json();
    if (!registrationId) throw new Error("registrationId is required");

    // Get registration
    const { data: reg, error: regError } = await supabaseAdmin
      .from("registrations")
      .select("*")
      .eq("id", registrationId)
      .single();

    if (regError || !reg) throw new Error("Registration not found");

    // Use manual password or generate one
    const password = manualPassword || generatePassword();

    // Create auth user
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: reg.email,
      password,
      email_confirm: true,
      user_metadata: { full_name: reg.full_name },
    });

    if (authError) {
      // If user already exists, just update password
      if (authError.message.includes("already been registered")) {
        const { data: { users } } = await supabaseAdmin.auth.admin.listUsers();
        const existingUser = users.find((u: any) => u.email === reg.email);
        if (existingUser) {
          await supabaseAdmin.auth.admin.updateUser(existingUser.id, { password });
          await supabaseAdmin.from("registrations").update({
            status: "approved",
            generated_password: password,
            user_id: existingUser.id,
          }).eq("id", registrationId);

          return new Response(
            JSON.stringify({ success: true, email: reg.email, password }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
      }
      throw authError;
    }

    // Update registration with user_id and password
    await supabaseAdmin.from("registrations").update({
      status: "approved",
      generated_password: password,
      user_id: authData.user.id,
    }).eq("id", registrationId);

    return new Response(
      JSON.stringify({ success: true, email: reg.email, password }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
