"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, CheckCircle, AlertTriangle, Info, AlertCircle } from "lucide-react"

export type NotificationType = "success" | "error" | "warning" | "info"

export interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  duration?: number
}

interface NotificationSystemProps {
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left"
}

// Create a global notifications state
let notificationsState: Notification[] = []
let setNotificationsState: React.Dispatch<React.SetStateAction<Notification[]>> | null = null

// Function to add a notification from anywhere in the app
export const addNotification = (notification: Omit<Notification, "id">) => {
  const id = Math.random().toString(36).substring(2, 9)
  const newNotification = { ...notification, id }

  if (setNotificationsState) {
    setNotificationsState((prev) => [...prev, newNotification])
  } else {
    notificationsState = [...notificationsState, newNotification]
  }

  return id
}

// Function to remove a notification
export const removeNotification = (id: string) => {
  if (setNotificationsState) {
    setNotificationsState((prev) => prev.filter((notification) => notification.id !== id))
  }
}

export default function NotificationSystem({ position = "top-right" }: NotificationSystemProps) {
  const [notifications, setNotifications] = useState<Notification[]>(notificationsState)

  // Set the global state setter
  useEffect(() => {
    setNotificationsState = setNotifications
    return () => {
      setNotificationsState = null
    }
  }, [])

  // Auto-remove notifications after their duration
  useEffect(() => {
    const timers = notifications.map((notification) => {
      const duration = notification.duration || 5000 // Default 5 seconds
      return setTimeout(() => {
        removeNotification(notification.id)
      }, duration)
    })

    return () => {
      timers.forEach(clearTimeout)
    }
  }, [notifications])

  // Position classes
  const positionClasses = {
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
  }

  // Icon by notification type
  const getIcon = (type: NotificationType) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />
    }
  }

  // Background color by notification type
  const getBgColor = (type: NotificationType) => {
    switch (type) {
      case "success":
        return "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
      case "error":
        return "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
      case "warning":
        return "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800"
      case "info":
        return "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
    }
  }

  return (
    <div className={`fixed z-50 ${positionClasses[position]} w-80 md:w-96 space-y-2 pointer-events-none`}>
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: position.startsWith("top") ? -20 : 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className={`pointer-events-auto rounded-lg border p-4 shadow-md ${getBgColor(notification.type)}`}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0">{getIcon(notification.type)}</div>
              <div className="ml-3 w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{notification.title}</p>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">{notification.message}</p>
              </div>
              <div className="ml-4 flex-shrink-0 flex">
                <button
                  onClick={() => removeNotification(notification.id)}
                  className="inline-flex text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 focus:outline-none"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
