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

    static async createEvent(event) {
        let endDate = new Date(event.end_date);
        endDate.setHours(24, 59, 59, 0);
        event.end_date = endDate;

        console.log("Data: ", event);

        try {
            let { data, error } = await supabase
                .from("events")
                .insert([
                    {
                        title: event.title,
                        description: event.description,
                        image: event.image,
                        start_date: event.start_date,
                        end_date: event.end_date,
                    },
                ])
                .select();
            if (error) {
                throw new Error(error.message);
            } else {
                return data;
            }
        } catch (error) {
            console.error(`Fejl: kan ikke oprette event, ${error}`);
        }
    }

    static async removeEvent(uuid) {
        try {
            let { data, error } = await supabase
                .from("events")
                .delete()
                .eq("uuid", uuid)
                .select();
            if (error) {
                throw new Error(error.message);
            } else {
                return data;
            }
        } catch (error) {
            console.error(`Fejl: kan ikke slette event, ${error}`);
        }
    }

    static async uploadImage(name, buffer, mimeType) {
        try {
            let { data, error } = await supabase.storage
                .from("images")
                .upload(name, buffer, {
                    contentType: mimeType,
                });
            if (error) {
                throw new Error(error.message);
            } else {
                return data;
            }
        } catch (error) {
            console.error(`Fejl: kan ikke uploade billede, ${error}`);
        }
    }
}
