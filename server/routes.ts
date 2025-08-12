import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertWorkoutSchema, insertUserWorkoutSchema, insertBodyMetricsSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get current user (hardcoded for demo)
  app.get("/api/user/current", async (req, res) => {
    try {
      const user = await storage.getUser("user1");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get user dashboard stats
  app.get("/api/dashboard/stats", async (req, res) => {
    try {
      const userId = "user1"; // hardcoded for demo
      const today = new Date().toISOString().split('T')[0];
      
      const todayWorkouts = await storage.getUserWorkoutsByDate(userId, today);
      const userPoints = await storage.getUserPoints(userId);
      const latestMetrics = await storage.getLatestBodyMetrics(userId);

      const stats = {
        todayWorkouts: todayWorkouts.length,
        streak: userPoints?.streak || 0,
        currentWeight: latestMetrics?.weight || "0",
        ranking: "#24", // simplified for demo
        points: userPoints?.points || 0,
        workoutsCompleted: userPoints?.workoutsCompleted || 0
      };

      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get today's workouts
  app.get("/api/workouts/today", async (req, res) => {
    try {
      const userId = "user1";
      const today = new Date().toISOString().split('T')[0];
      
      const userWorkouts = await storage.getUserWorkoutsByDate(userId, today);
      const workoutsWithDetails = await Promise.all(
        userWorkouts.map(async (uw) => {
          const workout = await storage.getWorkout(uw.workoutId!);
          return {
            ...uw,
            workout
          };
        })
      );

      res.json(workoutsWithDetails);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get all workouts
  app.get("/api/workouts", async (req, res) => {
    try {
      const workouts = await storage.getWorkouts();
      res.json(workouts);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Create workout
  app.post("/api/workouts", async (req, res) => {
    try {
      const validatedData = insertWorkoutSchema.parse(req.body);
      const workout = await storage.createWorkout(validatedData);
      res.status(201).json(workout);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Schedule workout
  app.post("/api/workouts/schedule", async (req, res) => {
    try {
      const validatedData = insertUserWorkoutSchema.parse(req.body);
      const userWorkout = await storage.createUserWorkout(validatedData);
      res.status(201).json(userWorkout);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Update workout progress
  app.patch("/api/workouts/:id/progress", async (req, res) => {
    try {
      const { id } = req.params;
      const { progress, completedDate } = req.body;
      
      const updatedWorkout = await storage.updateUserWorkout(id, {
        progress,
        completedDate: completedDate ? new Date(completedDate) : undefined
      });
      
      if (!updatedWorkout) {
        return res.status(404).json({ message: "Workout not found" });
      }
      
      res.json(updatedWorkout);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get body metrics
  app.get("/api/metrics", async (req, res) => {
    try {
      const userId = "user1";
      const metrics = await storage.getLatestBodyMetrics(userId);
      res.json(metrics);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Add body metrics
  app.post("/api/metrics", async (req, res) => {
    try {
      const validatedData = insertBodyMetricsSchema.parse(req.body);
      const metrics = await storage.createBodyMetrics(validatedData);
      res.status(201).json(metrics);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get workout plans (marketplace)
  app.get("/api/marketplace/plans", async (req, res) => {
    try {
      const plans = await storage.getWorkoutPlans();
      
      // Add trainer info to each plan
      const plansWithTrainers = await Promise.all(
        plans.map(async (plan) => {
          const trainer = await storage.getUser(plan.trainerId!);
          return {
            ...plan,
            trainer
          };
        })
      );
      
      res.json(plansWithTrainers);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get featured workout plans
  app.get("/api/marketplace/featured", async (req, res) => {
    try {
      const plans = await storage.getFeaturedWorkoutPlans();
      
      const plansWithTrainers = await Promise.all(
        plans.map(async (plan) => {
          const trainer = await storage.getUser(plan.trainerId!);
          return {
            ...plan,
            trainer
          };
        })
      );
      
      res.json(plansWithTrainers);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get ranking
  app.get("/api/ranking", async (req, res) => {
    try {
      const ranking = await storage.getUsersRanking();
      res.json(ranking);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get user's weekly calendar
  app.get("/api/calendar/week", async (req, res) => {
    try {
      const userId = "user1";
      const { startDate } = req.query;
      
      // For demo, return current week's workouts
      const userWorkouts = await storage.getUserWorkouts(userId);
      
      // Group by date
      const weekWorkouts = userWorkouts.reduce((acc, uw) => {
        if (uw.scheduledDate) {
          const dateKey = uw.scheduledDate.toISOString().split('T')[0];
          if (!acc[dateKey]) acc[dateKey] = [];
          acc[dateKey].push(uw);
        }
        return acc;
      }, {} as Record<string, typeof userWorkouts>);

      res.json(weekWorkouts);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Exercise endpoints
  app.get("/api/exercises", async (req, res) => {
    try {
      const exercises = await storage.getExercises();
      res.json(exercises);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching exercises: " + error.message });
    }
  });

  app.get("/api/exercises/muscle-group/:muscleGroup", async (req, res) => {
    try {
      const { muscleGroup } = req.params;
      const exercises = await storage.getExercisesByMuscleGroup(muscleGroup);
      res.json(exercises);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching exercises: " + error.message });
    }
  });

  // Subscription endpoints
  app.get("/api/subscription/current", async (req, res) => {
    try {
      // Using hardcoded user for now
      const subscription = await storage.getUserSubscription("user1");
      res.json(subscription);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching subscription: " + error.message });
    }
  });

  // Payment endpoints
  app.get("/api/payments/history", async (req, res) => {
    try {
      // Using hardcoded user for now
      const payments = await storage.getUserPayments("user1");
      res.json(payments);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching payments: " + error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
