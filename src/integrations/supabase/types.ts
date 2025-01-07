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
      analytics: {
        Row: {
          beat_id: string | null
          download_count: number | null
          favorite_count: number | null
          id: string
          last_updated: string | null
          play_count: number | null
          view_count: number | null
        }
        Insert: {
          beat_id?: string | null
          download_count?: number | null
          favorite_count?: number | null
          id?: string
          last_updated?: string | null
          play_count?: number | null
          view_count?: number | null
        }
        Update: {
          beat_id?: string | null
          download_count?: number | null
          favorite_count?: number | null
          id?: string
          last_updated?: string | null
          play_count?: number | null
          view_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "analytics_beat_id_fkey"
            columns: ["beat_id"]
            isOneToOne: false
            referencedRelation: "beats"
            referencedColumns: ["id"]
          },
        ]
      }
      audio_analysis: {
        Row: {
          beat_id: string | null
          beat_markers: Json | null
          created_at: string | null
          frequency_data: Json | null
          id: string
          waveform_data: Json | null
        }
        Insert: {
          beat_id?: string | null
          beat_markers?: Json | null
          created_at?: string | null
          frequency_data?: Json | null
          id?: string
          waveform_data?: Json | null
        }
        Update: {
          beat_id?: string | null
          beat_markers?: Json | null
          created_at?: string | null
          frequency_data?: Json | null
          id?: string
          waveform_data?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "audio_analysis_beat_id_fkey"
            columns: ["beat_id"]
            isOneToOne: false
            referencedRelation: "beats"
            referencedColumns: ["id"]
          },
        ]
      }
      beat_tags: {
        Row: {
          beat_id: string
          tag_id: string
        }
        Insert: {
          beat_id: string
          tag_id: string
        }
        Update: {
          beat_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "beat_tags_beat_id_fkey"
            columns: ["beat_id"]
            isOneToOne: false
            referencedRelation: "beats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "beat_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
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
      comments: {
        Row: {
          beat_id: string | null
          content: string
          created_at: string | null
          id: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          beat_id?: string | null
          content: string
          created_at?: string | null
          id?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          beat_id?: string | null
          content?: string
          created_at?: string | null
          id?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "comments_beat_id_fkey"
            columns: ["beat_id"]
            isOneToOne: false
            referencedRelation: "beats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
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
      cube_faces: {
        Row: {
          content_data: Json | null
          content_type: Database["public"]["Enums"]["content_type"]
          created_at: string | null
          effects: Json | null
          id: string
          position: Database["public"]["Enums"]["face_position"]
          preset_id: string | null
        }
        Insert: {
          content_data?: Json | null
          content_type: Database["public"]["Enums"]["content_type"]
          created_at?: string | null
          effects?: Json | null
          id?: string
          position: Database["public"]["Enums"]["face_position"]
          preset_id?: string | null
        }
        Update: {
          content_data?: Json | null
          content_type?: Database["public"]["Enums"]["content_type"]
          created_at?: string | null
          effects?: Json | null
          id?: string
          position?: Database["public"]["Enums"]["face_position"]
          preset_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cube_faces_preset_id_fkey"
            columns: ["preset_id"]
            isOneToOne: false
            referencedRelation: "visualization_presets"
            referencedColumns: ["id"]
          },
        ]
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
      playlist_items: {
        Row: {
          added_at: string | null
          beat_id: string | null
          id: string
          playlist_id: string | null
          position: number
        }
        Insert: {
          added_at?: string | null
          beat_id?: string | null
          id?: string
          playlist_id?: string | null
          position: number
        }
        Update: {
          added_at?: string | null
          beat_id?: string | null
          id?: string
          playlist_id?: string | null
          position?: number
        }
        Relationships: [
          {
            foreignKeyName: "playlist_items_beat_id_fkey"
            columns: ["beat_id"]
            isOneToOne: false
            referencedRelation: "beats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "playlist_items_playlist_id_fkey"
            columns: ["playlist_id"]
            isOneToOne: false
            referencedRelation: "playlists"
            referencedColumns: ["id"]
          },
        ]
      }
      playlists: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_public: boolean | null
          name: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          name: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          name?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "playlists_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
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
      purchase_logs: {
        Row: {
          changed_at: string | null
          id: string
          new_amount: number | null
          old_amount: number | null
          purchase_id: string
        }
        Insert: {
          changed_at?: string | null
          id?: string
          new_amount?: number | null
          old_amount?: number | null
          purchase_id: string
        }
        Update: {
          changed_at?: string | null
          id?: string
          new_amount?: number | null
          old_amount?: number | null
          purchase_id?: string
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
      tags: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      user_settings: {
        Row: {
          audio_preferences: Json | null
          id: string
          interface_preferences: Json | null
          updated_at: string | null
          user_id: string | null
          visualization_preferences: Json | null
        }
        Insert: {
          audio_preferences?: Json | null
          id?: string
          interface_preferences?: Json | null
          updated_at?: string | null
          user_id?: string | null
          visualization_preferences?: Json | null
        }
        Update: {
          audio_preferences?: Json | null
          id?: string
          interface_preferences?: Json | null
          updated_at?: string | null
          user_id?: string | null
          visualization_preferences?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "user_settings_user_id_fkey"
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
