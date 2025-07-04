
```
MERN1
├─ project1
│  ├─ .env.development
│  ├─ .env.production
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ public
│  │  └─ index.html
│  ├─ README.md
│  └─ src
│     ├─ App.js
│     ├─ components
│     │  └─ UnauthorizedAccess.js
│     ├─ config
│     │  └─ config.js
│     ├─ index.js
│     ├─ layout
│     │  ├─ AppLayout.js
│     │  ├─ Footer.js
│     │  ├─ Header.js
│     │  ├─ UserFooter.js
│     │  ├─ UserHeader.js
│     │  └─ UserLayout.js
│     ├─ pages
│     │  ├─ Dashboard.js
│     │  ├─ Error.js
│     │  ├─ Home.js
│     │  ├─ links
│     │  │  └─ LinksDashboard.js
│     │  ├─ Login.js
│     │  ├─ Logout.js
│     │  ├─ Register.js
│     │  └─ users
│     │     └─ ManageUsers.js
│     ├─ rbac
│     │  ├─ Can.js
│     │  ├─ ProtectedRoute.js
│     │  └─ userPermissions.js
│     └─ redux
│        ├─ store.js
│        └─ user
│           ├─ actions.js
│           └─ reducer.js
└─ project1-server
   ├─ .env
   ├─ package-lock.json
   ├─ package.json
   ├─ scripts
   │  └─ addUser.js
   ├─ server.js
   └─ src
      ├─ constants
      │  ├─ paymentConstants.js
      │  ├─ permissions.js
      │  └─ userConstants.js
      ├─ controller
      │  ├─ authController.js
      │  ├─ linksController.js
      │  ├─ paymentController.js
      │  └─ userController.js
      ├─ dao
      ├─ middleware
      │  ├─ authMiddleware.js
      │  └─ authorizeMiddleware.js
      ├─ model
      │  ├─ Links.js
      │  └─ Users.js
      ├─ routes
      │  ├─ authRoutes.js
      │  ├─ linksRoutes.js
      │  └─ userRoutes.js
      └─ service
         └─ emailService.js

```