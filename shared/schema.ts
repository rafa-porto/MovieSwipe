import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Movies table to store movies from TMDB
export const movies = pgTable("movies", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
  overview: text("overview").notNull(),
  poster_path: text("poster_path"),
  backdrop_path: text("backdrop_path"),
  release_date: text("release_date"),
  vote_average: integer("vote_average"),
  runtime: integer("runtime"),
  genres: jsonb("genres").notNull(),
  mood: text("mood"),
  streaming_services: jsonb("streaming_services").notNull(),
});

export const insertMovieSchema = createInsertSchema(movies);

// UserPreferences table to store user's movie preferences
export const userPreferences = pgTable("user_preferences", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").notNull().references(() => users.id),
  liked_genres: jsonb("liked_genres").notNull(),
  liked_movies: jsonb("liked_movies").notNull(),
  disliked_movies: jsonb("disliked_movies").notNull(),
  streaming_services: jsonb("streaming_services").notNull(),
});

export const insertUserPreferencesSchema = createInsertSchema(userPreferences);

// UserActivity table to store user's movie interactions
export const userActivity = pgTable("user_activity", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").notNull().references(() => users.id),
  movie_id: integer("movie_id").notNull().references(() => movies.id),
  action: text("action").notNull(), // 'liked' or 'disliked'
  timestamp: timestamp("timestamp").notNull().defaultNow(),
});

export const insertUserActivitySchema = createInsertSchema(userActivity);

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Movie = typeof movies.$inferSelect;
export type InsertMovie = z.infer<typeof insertMovieSchema>;

export type UserPreference = typeof userPreferences.$inferSelect;
export type InsertUserPreference = z.infer<typeof insertUserPreferencesSchema>;

export type UserActivity = typeof userActivity.$inferSelect;
export type InsertUserActivity = z.infer<typeof insertUserActivitySchema>;
