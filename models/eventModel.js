import { supabase } from "../config/supabase.js";

export class eventModel {
    static async getAllEvents() {
        try {
            let { data, error } = await supabase
                .from("events")
                .select("*")
                .order("start_date", { ascending: true });
            if (error) {
                throw new Error(error.message);
            } else {
                return data;
            }
        } catch (error) {
            console.error(`Fejl: kan ikke hente eventliste, ${error}`);
        }
    }
}
