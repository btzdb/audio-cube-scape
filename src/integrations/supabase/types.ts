export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      beats: {
        Row: {
          artist_id: string | null
          audio_url: string
          bpm: number | null
          cover_image_url: string | null
          created_at: string | null
          description: string | null
          duration: number | null
          id: string
          key_signature: string | null
          price: number
          status: Database["public"]["Enums"]["beat_status"] | null
          title: string
          updated_at: string | null
          waveform_data: Json | null
        }
        Insert: {
          artist_id?: string | null
          audio_url: string
          bpm?: number | null
          cover_image_url?: string | null
          created_at?: string | null
          description?: string | null
          duration?: number | null
          id?: string
          key_signature?: string | null
          price: number
          status?: Database["public"]["Enums"]["beat_status"] | null
          title: string
          updated_at?: string | null
          waveform_data?: Json | null
        }
        Update: {
          artist_id?: string | null
          audio_url?: string
          bpm?: number | null
          cover_image_url?: string | null
          created_at?: string | null
          description?: string | null
          duration?: number | null
          id?: string
          key_signature?: string | null
          price?: number
          status?: Database["public"]["Enums"]["beat_status"] | null
          title?: string
          updated_at?: string | null
          waveform_data?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "beats_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      cities: {
        Row: {
          country_id: number | null
          created_at: string | null
          id: number
          name: string
        }
        Insert: {
          country_id?: number | null
          created_at?: string | null
          id?: never
          name: string
        }
        Update: {
          country_id?: number | null
          created_at?: string | null
          id?: never
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "cities_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
        ]
      }
      countries: {
        Row: {
          created_at: string | null
          id: number
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: never
          name: string
        }
        Update: {
          created_at?: string | null
          id?: never
          name?: string
        }
        Relationships: []
      }
      licenses: {
        Row: {
          beat_id: string | null
          created_at: string | null
          id: string
          price: number
          rights_description: string | null
          type: Database["public"]["Enums"]["license_type"]
        }
        Insert: {
          beat_id?: string | null
          created_at?: string | null
          id?: string
          price: number
          rights_description?: string | null
          type: Database["public"]["Enums"]["license_type"]
        }
        Update: {
          beat_id?: string | null
          created_at?: string | null
          id?: string
          price?: number
          rights_description?: string | null
          type?: Database["public"]["Enums"]["license_type"]
        }
        Relationships: [
          {
            foreignKeyName: "licenses_beat_id_fkey"
            columns: ["beat_id"]
            isOneToOne: false
            referencedRelation: "beats"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["user_role"] | null
          updated_at: string | null
          username: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          id: string
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string | null
          username: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string | null
          username?: string
        }
        Relationships: []
      }
      purchases: {
        Row: {
          amount: number
          beat_id: string | null
          created_at: string | null
          id: string
          license_id: string | null
          status: Database["public"]["Enums"]["payment_status"] | null
          user_id: string | null
        }
        Insert: {
          amount: number
          beat_id?: string | null
          created_at?: string | null
          id?: string
          license_id?: string | null
          status?: Database["public"]["Enums"]["payment_status"] | null
          user_id?: string | null
        }
        Update: {
          amount?: number
          beat_id?: string | null
          created_at?: string | null
          id?: string
          license_id?: string | null
          status?: Database["public"]["Enums"]["payment_status"] | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "purchases_beat_id_fkey"
            columns: ["beat_id"]
            isOneToOne: false
            referencedRelation: "beats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchases_license_id_fkey"
            columns: ["license_id"]
            isOneToOne: false
            referencedRelation: "licenses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchases_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      visualization_presets: {
        Row: {
          audio_settings: Json
          background_settings: Json
          created_at: string | null
          cube_settings: Json
          id: string
          is_public: boolean | null
          name: string
          user_id: string | null
        }
        Insert: {
          audio_settings: Json
          background_settings: Json
          created_at?: string | null
          cube_settings: Json
          id?: string
          is_public?: boolean | null
          name: string
          user_id?: string | null
        }
        Update: {
          audio_settings?: Json
          background_settings?: Json
          created_at?: string | null
          cube_settings?: Json
          id?: string
          is_public?: boolean | null
          name?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "visualization_presets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      beat_status: "active" | "sold" | "archived"
      content_type: "text" | "image" | "video" | "animation"
      face_position: "front" | "back" | "right" | "left" | "top" | "bottom"
      license_type: "basic" | "premium" | "exclusive"
      payment_status: "pending" | "completed" | "failed"
      user_role: "user" | "artist" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
