Notification System Design

Overview

-> The Campus Notification Service is a TypeScript-based microservice responsible for creating, managing, and delivering notifications to users. The service exposes REST APIs for creating and retrieving notifications and uses reusable logging middleware for monitoring requests and errors.


->folder structrure of the 
Volume serial number is 00000069 B285:D27C
C:.
│   app.ts
│   notification_system_design.md
│   
├───config
│       constants.ts
│       env.ts
│       
├───controllers
│       notificationController.ts
│       
├───data
│       notifications.json
│       
├───models
│       Notification.ts
│       User.ts
│       
├───routes
│       notificationRoutes.ts
│       
└───services
        notificationService.ts